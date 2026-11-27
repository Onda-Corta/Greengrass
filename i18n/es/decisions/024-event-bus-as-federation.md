# ADR-024: El bus de eventos entre instancias

**Estado:** Aceptada
**Fecha:** 2026-11-13
**Aceptada:** 2026-11-26 — el bus reemplaza la capa central, la alianza es un cliente como cualquier otro («ligera» quiere decir con pocos módulos activados), y el filtro de exportación y el destino de importación se nombran como componentes del Core. Las funciones de NATS que el bus necesita siguen marcadas **Verificar:** hasta que se confirmen.
**Fuentes:** `spec/users.md`, `spec/mvp.md`, `design/architecture/system.md`, `diary/13-services-a-la-carte.md`, `decisions/001-platform-architecture.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/022-core-modules-and-lanes.md`

## Contexto

[system.md § Topología del sistema](../design/architecture/system.md#topología-del-sistema) dibuja tres capas. La del medio es una capa de federación que «media las interacciones entre organizaciones»: coordinación de alianzas, recursos compartidos, deduplicación entre organizaciones y campañas conjuntas. Opera sobre reglas de intercambio explícitas y, por diseño, nunca guarda datos de las organizaciones. Sigue siendo un componente central por el que pasa todo flujo entre organizaciones, y hay que confiarle ese flujo.

Dos cosas del corpus apuntan a otra forma. Cada instancia ya corre su propio flujo de eventos en NATS JetStream, para la analítica ([system.md § Arquitectura de analítica](../design/architecture/system.md#arquitectura-de-analítica)). Y el tablero de servicios de la alianza que recoge la [entrada 13 del diario](../diary/13-services-a-la-carte.md) dibujó tres enclaves sellados —la alianza, el MVC y el PIP— con flujos entre ellos y nada en el medio que guarde datos.

La nueva dirección lo dice sin rodeos: despliegues separados por organización, un bus de eventos entre ellos, y la alianza como una tercera organización que se suscribe.

Esta ADR estaba `Propuesta` al escribirse y queda aceptada a partir del 2026-11-26. Lo que decide va marcado.

### Conflictos que resuelve esta ADR

1. **[system.md § Topología del sistema](../design/architecture/system.md#topología-del-sistema)** tenía una capa central de federación. Esta ADR la reemplaza por exportaciones de eventos entre instancias, filtradas por contrato.
2. **[ADR-001 § Afiliación en vez de multiorganización monolítica](001-platform-architecture.md#afiliación-en-vez-de-multiorganización-monolítica)** y **[users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa)** hacían de la alianza una «organización cliente ligera, dedicada a la coordinación», que no replica toda la plataforma. Resuelto: la alianza es un cliente como cualquier otro, con su propia instancia, y bajo la [ADR-022](022-core-modules-and-lanes.md) las dos lecturas se encuentran —«ligera» quiere decir una instancia con pocos módulos activados.
3. **[system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales)** especificaba la supresión mutua como un servicio central que le pregunta a cada miembro y combina las marcas ([ADR-019](019-central-services-and-metered-billing.md)). Esta ADR la convierte en solicitud y respuesta sobre el bus. Las reglas son las mismas; cambia lo que las transporta.
4. **[users.md § Pertenencia a varias organizaciones](../spec/users.md#pertenencia-a-varias-organizaciones)** dejaba que «la capa de alianza» viera que una persona existe en varias organizaciones miembro. Sin capa central y sin identidad compartida ([ADR-025](025-identity-per-client.md)), esa visibilidad existe solo como un término de contrato entre instancias.

## Decisión

### Dentro de una organización: el flujo de eventos se vuelve la columna vertebral de integración

Decidido el 2026-11-26.

El flujo de eventos de cada instancia deja de ser solo una cadena de procesamiento de analítica y pasa a ser la columna vertebral de integración de la instancia. El Core y los módulos publican eventos de dominio: `person.created`, `consent.changed`, `interaction.recorded`, `donation.received`, `content.approved`. Los módulos, los conectores y los paneles los consumen. El manifiesto de cada módulo dice qué publica y qué consume ([ADR-022 § El contrato de módulo](022-core-modules-and-lanes.md#el-contrato-de-módulo)).

Los eventos de uso ya viajan por este flujo ([ADR-019 § El catálogo, los derechos de uso y la medición viven en la capa de plataforma](019-central-services-and-metered-billing.md#el-catálogo-los-derechos-de-uso-y-la-medición-viven-en-la-capa-de-plataforma)). En ellos no cambia nada.

### Entre organizaciones: exportaciones filtradas por contrato

Decidido el 2026-11-26.

Cada organización exporta un subconjunto filtrado de su flujo hacia las instancias con las que tiene contratos. La alianza es una tercera organización con su propia instancia. Se suscribe a las exportaciones de sus miembros y publica de vuelta: campañas conjuntas, solicitudes de supresión, puntos de mensaje compartidos.

Dos componentes del Core lo transportan, nombrados aquí y especificados en [system.md § El bus de eventos entre instancias](../design/architecture/system.md#el-bus-de-eventos-entre-instancias):

- **El filtro de exportación.** El componente que convierte un contrato de intercambio en el filtro en el origen sobre el flujo de la instancia: campo por campo y con denegación por defecto, antes de que se publique nada. Un cambio en el contrato recompila el filtro; una revocación detiene ahí la exportación.
- **El destino de importación.** El componente que escribe los eventos entregados en el almacén de la instancia receptora, marcados con el contrato con el que llegaron y como contenido no confiable al incorporarlos. Una vez incorporado, un evento entregado se lee bajo las reglas de datos compartimentados —por las personas ([ADR-017](017-sharing-contract-trust-model.md)) y por el arnés igual ([spec/harness.md § Alcance de lectura](../spec/harness.md#alcance-de-lectura)).

Los esquemas de eventos son un contrato entre instancias que pueden correr versiones distintas. Las versiones de esquema se declaran por exportación, y una exportación nunca emite una versión que la instancia receptora no haya dicho que entiende.

Las reglas que lo hacen seguro:

- **Filtrado en el origen.** Lo que sale de una instancia lo decide el contrato de intercambio antes de publicarse, campo por campo y con denegación por defecto ([ADR-017](017-sharing-contract-trust-model.md)). Nada cruza en bruto para filtrarse después.
- **Opaco en tránsito.** Las cargas van cifradas con las llaves del contrato, que están en manos de los miembros. Cualquier retransmisor que opere GreenGrass ve metadatos de enrutamiento, nunca contenido. Eso mantiene a la plataforma fuera de todo contrato, como exige [ADR-017 § Consecuencias](017-sharing-contract-trust-model.md#consecuencias).
- **La revocación detiene la exportación.** Los eventos ya entregados no se recuperan, que es la regla que ya tiene la ADR-017. Las dos partes ven quién cortó el acceso y cuándo.
- **El consentimiento viaja primero.** Los eventos `consent.changed` cruzan todo contrato que cubra a la persona, antes que los demás eventos.
- **La supresión mutua es solicitud y respuesta sobre el bus.** El cruce usa el segundo índice ciego, con llave del contrato de la alianza ([system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales)). Un miembro que no responde no es un veto.
- **Los consumidores duraderos absorben las conexiones intermitentes.** Una instancia que se queda sin conexión se pone al día desde donde se quedó.
- **Los eventos del bus son datos no confiables.** Una carga entregada bajo un contrato es dato, nunca instrucciones. El destino de importación la marca como no confiable al incorporarla, como [security.md § Inyección de prompts](../spec/security.md#inyección-de-prompts) nombra los eventos del bus de contrapartes como vector de inyección.

**Verificar:** que NATS permite exportar e importar flujos entre cuentas y nodos hoja de la manera que esto necesita. La topología de despliegue es de clústeres separados, a veces en nubes separadas ([ADR-001](001-platform-architecture.md)), y hay que confirmar que funciona así antes de comprometer nada.

**Alternativas consideradas:** Se descartó mantener la capa central de federación y poner el bus a su lado, porque deja en pie la única pieza central a la que hay que confiarle el flujo entre organizaciones, que es justo lo que el bus quita. Se descartó exportar los eventos en bruto y filtrarlos en el receptor, o en un retransmisor, porque pone datos sin filtrar de un miembro fuera de su instancia, donde la parte que otorgó el contrato ya no puede hacerlo cumplir.

### El bus reemplaza la capa central

Decidido el 2026-11-26.

El flujo entre organizaciones pasa a ser exportaciones de eventos entre instancias, filtradas por contrato, sin ningún componente central que guarde o medie datos entre organizaciones. Es una simplificación: quita la única pieza central a la que había que confiarle el flujo entre organizaciones. La topología de tres capas de [system.md § Topología del sistema](../design/architecture/system.md#topología-del-sistema) queda sin efecto; el documento conserva la capa anterior visible como el diseño que esto reemplaza.

Lo que la capa anterior llevaba se reubica, no se pierde: la coordinación de la alianza y las campañas conjuntas viven en la instancia propia de la alianza y viajan como eventos; los puntos de mensaje compartidos se publican de vuelta de la misma manera; la supresión mutua es solicitud y respuesta sobre el bus. La deduplicación entre organizaciones —la promesa de la capa anterior de ver que una persona existe en varias organizaciones miembro— no tiene reemplazo: sin identidad compartida ([ADR-025](025-identity-per-client.md)) y sin capa central, hacer coincidir personas entre instancias existe solo como un término de contrato, y el índice ciego con llave de contrato de la supresión mutua es el único término de ese tipo especificado. Todo lo demás queda abierto, y la [ADR-025](025-identity-per-client.md) ya anota la brecha.

La capa de plataforma se queda con lo que no lleva datos de las organizaciones: el aprovisionamiento, el catálogo, los derechos de uso y la medición, y cualquier retransmisor, que solo ve metadatos de enrutamiento. La identidad sale de ella con la [ADR-025](025-identity-per-client.md).

### La misma forma en el carril comercial

**Decidido.** La Asociación de Publicistas funciona exactamente igual que la Alianza. Tiene su propia instancia, cada agencia miembro tiene la suya, y se conectan por contratos de intercambio y por el bus. No hace falta nada nuevo:

- El intercambio es con denegación por defecto y campo por campo, y cualquier miembro puede cortarlo por su cuenta ([ADR-017 § Términos uniformes en cada peldaño](017-sharing-contract-trust-model.md#términos-uniformes-en-cada-peldaño)).
- La Asociación puede pagar los costos medidos de sus miembros, con el modo de facturación `alliance_pays` que ya define [ADR-019 § Una alianza puede pagar por sus miembros, como ajuste de la puesta en marcha](019-central-services-and-metered-billing.md#una-alianza-puede-pagar-por-sus-miembros-como-ajuste-de-la-puesta-en-marcha).
- El Fideicomiso de coalición es, por lo tanto, un módulo para los dos carriles ([ADR-022 § El catálogo de módulos](022-core-modules-and-lanes.md#el-catálogo-de-módulos)).

Lo decidido es la forma: una asociación de agencias es una alianza de partidos con otro nombre, y no recibe un mecanismo propio. Con esta ADR aceptada, la conexión entre instancias corre sobre el bus decidido arriba.

### Preguntas abiertas

1. ~~**¿El bus reemplaza la capa central?**~~ — **RESUELTO el 2026-11-26.** Sí; esta ADR queda aceptada.
2. **La comprobación de NATS** marcada *Verificar* arriba. Sin resolver; el marcador sigue hasta que se confirme.
3. ~~**La alianza como cliente completo o como organización ligera.**~~ — **RESUELTO el 2026-11-26.** Cliente completo; «ligera» quiere decir con pocos módulos activados (el conflicto 2 de arriba).
4. **Un ejercicio de comprobación.** La dirección propone una prueba técnica en el carril político con una exportación real del MVC: el CSV de ida y vuelta de la [ADR-027](027-third-party-crm-sync-and-connectors.md), y después la supresión mutua entre dos instancias sobre el bus. No tiene fecha.

### Orden interno: avisos de enmienda

La línea de **Enmienda propuesta por** que esta ADR ponía en la [ADR-001](001-platform-architecture.md) se convirtió en **Enmendada por** al aceptarse, y la sección de afiliación de allá quedó reescrita a tono.

## Consecuencias

**Beneficios:**
- Ningún componente central guarda ni media datos entre organizaciones, así que hay una cosa menos en la que confiar y una cosa menos que vulnerar
- El mecanismo que conecta a dos partidos conecta a una asociación con sus agencias, sin maquinaria nueva
- La plataforma queda fuera de todo contrato tanto en tránsito como en reposo
- La conectividad intermitente entre instancias la absorbe el flujo; no la maneja cada funcionalidad por su cuenta
- Los módulos, los conectores y los paneles se enteran de un cambio de una sola manera

**Costos:**
- Un cambio de arquitectura sobre una topología ya decidida, con la migración de toda funcionalidad entre organizaciones a eventos
- Los esquemas de eventos se vuelven un contrato entre instancias que pueden correr versiones distintas ([ADR-022 § Qué le exigen los carriles al diseño](022-core-modules-and-lanes.md#qué-le-exigen-los-carriles-al-diseño))
- Hacer cumplir el contrato en el origen significa que un error de filtrado es una fuga, el costo que la [ADR-017](017-sharing-contract-trust-model.md) ya nombra para los contratos
- La topología depende de funciones de NATS que todavía no están verificadas entre clústeres y nubes separados

**Restricciones:**
- La plataforma nunca es parte de un contrato ([ADR-017](017-sharing-contract-trust-model.md)); un retransmisor nunca ve contenido
- De una instancia no sale nada que el contrato de intercambio no haya permitido, campo por campo, antes de publicarse
- El consentimiento de cada persona está por encima de los términos del contrato, y los cambios de consentimiento se entregan primero
- Un miembro que no responde nunca es un veto
- Los eventos entregados se marcan como no confiables al incorporarlos y se leen bajo las reglas de datos compartimentados
- Las funciones de NATS que el bus necesita están marcadas **Verificar:** y siguen sin verificarse; nada aquí las da por ciertas

**ADR relacionadas:** [ADR-001](001-platform-architecture.md) (enmendada: la capa central del modelo de afiliación; el aislamiento por instancia no cambia), [ADR-017](017-sharing-contract-trust-model.md) (el contrato filtra toda exportación), [ADR-018](018-ai-agent-posture.md) (el arnés lee el material entre organizaciones solo como eventos del bus ya entregados), [ADR-019](019-central-services-and-metered-billing.md) (enmendada: la supresión mutua sale del catálogo; los eventos de uso van por el mismo flujo; `alliance_pays`), [ADR-022](022-core-modules-and-lanes.md) (los eventos son del Core; el Fideicomiso de coalición es un módulo para los dos carriles), [ADR-025](025-identity-per-client.md) (no hay identidad compartida con la que hacer coincidir a las personas), [ADR-027](027-third-party-crm-sync-and-connectors.md) (el proceso de conectores queda detrás del bus)
