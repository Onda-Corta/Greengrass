# ADR-019: Servicios centrales y facturación medida

**Estado:** Aceptada
**Fecha:** 2026-09-28
**Fuentes:** `spec/fundraising.md`, `spec/product.md`, `spec/users.md`, `spec/mvp.md`, `spec/comms-intelligence.md`, `spec/workflows.md`, `design/architecture/system.md`

## Contexto

La arquitectura tiene tres capas ([system.md § Topología del sistema](../design/architecture/system.md#topología-del-sistema)): una capa de plataforma que ve a través de las organizaciones y aloja la identidad, el aprovisionamiento, la administración y la facturación; una capa de federación que media el flujo entre organizaciones bajo reglas de intercambio y que, por diseño, nunca guarda datos de nadie; y una capa de organización donde cada capacidad corre como una instancia por organización. Esa descomposición ha aguantado cada funcionalidad que el corpus especificó, porque hasta ahora cada funcionalidad corre sobre los datos de la propia organización, dentro de su propia instancia.

El trabajo de comunicaciones de la alianza y la hoja de ruta posterior al MVP describen capacidades que no caben en esa forma. Capturar la cobertura de prensa, radio, televisión y redes desde fuentes públicas ([comms-intelligence.md § 9. Las iteraciones](../spec/comms-intelligence.md#9-las-iteraciones), Iteración 3), analizar resultados electorales públicos, generar texto, imágenes y video, y transportar mensajes a través de los proveedores de canal son capacidades compartidas con consumo por organización. Correr un corpus de medios una vez por organización es un despilfarro; correrlo una vez para todas y dejar que cada una lo consulte es el diseño obvio. La capa de plataforma no tiene sitio para eso: ni catálogo de lo que existe, ni registro de qué organización activó qué, ni manera de medir el uso.

La decisión de precios tampoco encaja. [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) decidió niveles de suscripción fija, «no atados al volumen de donaciones, al número de usuarios ni a ninguna métrica de uso», y [ADR-007 § Cero comisión de la plataforma sobre las donaciones](007-fundraising-payments.md#cero-comisión-de-la-plataforma-sobre-las-donaciones) lo repite: «planes fijos, no por uso». La descripción del producto ya había dejado abierta la excepción que la plataforma iba a necesitar: una tarifa fija «con la excepción de costos variables inevitables como los envíos de SMS, que el proveedor normalmente cobra por volumen» ([product.md](../spec/product.md)). La inferencia de modelos, la captura de medios y la generación de contenido son esa clase de costo. La [ADR-018](018-ai-agent-posture.md) nombró la inferencia por token frente al precio fijo como una de las cosas que su revisión tiene que resolver; esta ADR la responde.

Un hecho más da forma a la decisión. Los dos partidos del piloto son desiguales en herramientas y en recursos, y [mvp.md § La asimetría es el hecho más importante de este plan](../spec/mvp.md#la-asimetría-es-el-hecho-más-importante-de-este-plan) advierte que la fricción de las herramientas no puede confundirse con falta de voluntad. La medición hace visible el costo por organización. Eso quita un problema de quien se beneficia sin aportar y crea uno de asequibilidad, y el diseño tiene que responder a los dos.

### Conflictos que resuelve esta ADR

Siguiendo a la [ADR-016](016-cross-cutting-resolutions.md) y a la [ADR-017](017-sharing-contract-trust-model.md), los conflictos con decisiones aceptadas se nombran aquí y se resuelven abajo.

1. **[fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma)** descarta «cualquier métrica de uso». El traslado al costo es una métrica de uso.
2. **[ADR-007 § Cero comisión de la plataforma sobre las donaciones](007-fundraising-payments.md#cero-comisión-de-la-plataforma-sobre-las-donaciones)** dice que los ingresos vienen de «planes fijos, no por uso». Siguen viniendo de ahí; lo que cambia es que los costos medidos pasan al lado de esos ingresos sin volverse parte de ellos.
3. **[system.md § Topología del sistema](../design/architecture/system.md#topología-del-sistema)** no le da casa al procesamiento compartido. Su capa de plataforma enumera identidad, aprovisionamiento, administración y facturación, y su capa de federación nunca guarda datos, expresamente.

## Decisión

### Dos clases de capacidad: módulos internos y servicios centrales

Cada capacidad que ofrece la plataforma es una de dos cosas, y la distinción es estructural para el aislamiento, para los precios y para el requisito bloqueante de los agentes por igual.

| | Módulo interno | Servicio central |
|---|---|---|
| Ejemplos | CRM, operaciones de campo, GOTV, recaudación de fondos, eventos, mensajería interna, redacción de comunicaciones | Captura de medios, análisis electoral, entrega de investigación de la oposición, generación de texto, imagen y video, transporte por canal |
| Dónde corre | Dentro de la instancia propia de la organización | Del lado de la plataforma, ejecutado por organización |
| Los datos de la organización cruzan el muro de la organización | Nunca | Sí, durante la llamada, bajo las llaves y los contratos de la organización |
| Cómo lo obtiene una organización | Activado por organización como parte de su plan | Activado por organización y por servicio, desde el catálogo |
| Plano de facturación | Suscripción fija | Traslado al costo, medido por uso |
| Disponibilidad por nivel de aislamiento | Todos los niveles | Ver abajo |

Un módulo interno activado por organización es activar funcionalidades por configuración dentro de una instancia de organización única. Nada de la [ADR-001](001-platform-architecture.md#arquitectura-de-organización-única-con-aislamiento-por-niveles) cambia para él. Un servicio central es nuevo, y el resto de esta ADR trata de él.

**Alternativas consideradas:** Se descartó correr toda capacidad como módulo interno, incluida la captura de medios, porque un corpus de medios públicos por organización es inasequible para las campañas para las que existe la plataforma y duplica un trabajo que no lleva datos de ninguna organización. Se descartó hacer de los servicios centrales una cuarta capa arquitectónica porque no ven a través de las organizaciones como lo hace la capa de plataforma, y darles una capa propia invitaría exactamente a eso.

### Los servicios centrales se ejecutan por organización y no conservan nada

Un servicio central es código compartido, no estado compartido.

- **Cada llamada corre en nombre de exactamente una organización**, bajo las credenciales, las llaves y los contratos de intercambio de esa organización. La plataforma nunca es parte de un contrato ([ADR-017 § El contrato de intercambio es el único mecanismo para el flujo de datos a través de los límites](017-sharing-contract-trust-model.md#el-contrato-de-intercambio-es-el-único-mecanismo-para-el-flujo-de-datos-a-través-de-los-límites)), así que un servicio que actúa para la organización A no tiene vía hacia los datos de la organización B, y ningún servicio actúa para dos organizaciones en una misma llamada.
- **El resultado aterriza donde digan los contratos de la organización.** La investigación de la oposición que entrega un servicio central se escribe en el compartimento de la organización que la pidió, donde [comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención) aplica por completo: el Administrador de la organización no puede leerla, el Administrador de la plataforma no puede leerla en absoluto, y cualquier agente futuro la lee solo bajo el contrato del usuario que invoca.
- **El servicio no guarda corpus, índice, memoria ni caché de material derivado de la organización entre llamadas.** Si lo hiciera, el servicio mismo sería la vía de lectura de superusuario que la hoja de ruta prohíbe. El estado de trabajo vive dentro de la organización, cifrado con sus llaves.
- **Los datos públicos son la única excepción, y solo los datos.** Un corpus de captura de medios se construye a partir de fuentes públicas y puede compartirse entre organizaciones dentro de un país. Lo que una organización le pregunta no es público: las consultas revelan qué está vigilando una campaña. Los registros de consulta se acotan por organización y nunca se agregan, el mismo razonamiento que llevó a la [ADR-012](012-external-integrations.md) a alojar las teselas de mapa por cuenta propia para que ningún tercero vea los patrones del trabajo de campo.

**Alternativas consideradas:** Se descartó un servicio central con índice propio entre organizaciones —por ejemplo, un único almacén de investigación con vistas por organización— porque recrea la vía de lectura de superusuario con otro nombre. Se descartaron los registros de consulta compartidos por país para planificar capacidad, por la razón de las teselas de mapa.

### Dos planos de facturación, y sin margen en el segundo

El modelo de ingresos pasa a tener dos planos. El primero es la decisión existente, sin cambio de fondo. El segundo es la excepción que la descripción del producto siempre permitió, hecha explícita.

**Plano 1: la suscripción fija.** Precio mensual o anual fijo según el plan. Cubre la instancia de la organización, cada módulo interno que el plan incluya, y el costo propio de GreenGrass por construir y operar los servicios centrales: cómputo, almacenamiento, personal y la operación continua de cualquier corpus público compartido. Los cuatro principios de precios de [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) se mantienen: no por usuario, no por transacción, accesible para campañas con pocos recursos, transparente.

**Plano 2: traslado al costo, medido por uso.** Los servicios centrales cargan costos que le llegan a GreenGrass medidos, facturados por unidad por alguien a quien GreenGrass no puede dejar de pagar, y que por eso no se pueden volver fijos: tokens de inferencia que factura un proveedor de modelos, cargos por mensaje de las pasarelas de SMS y de WhatsApp, cargos por generación de los proveedores de generación de medios, cuotas por fuente de los proveedores de datos, e infraestructura que un proveedor de nube le factura a GreenGrass por unidad de uso para correr el servicio. Esos costos se trasladan a la organización que los generó.

**GreenGrass no le carga margen a los costos medidos.** El precio del proveedor es el precio de la organización. Sin recargo, sin redondeo hacia arriba, sin empaquetar en unidades opacas, sin consumo mínimo. Cuando un proveedor le factura a GreenGrass en conjunto y no por organización, el método de reparto se publica y la organización paga su parte y nada más. Cuando las condiciones de un proveedor hacen imposible el traslado exacto, se usa la aproximación más cercana alcanzable y la desviación queda documentada en la entrada del catálogo. Los ingresos de GreenGrass vienen únicamente de la suscripción. Es el mismo principio de cero comisión sobre las donaciones, aplicado a los servicios: la plataforma gana por la calidad de la plataforma, nunca por el volumen.

Lo que esto excluye importa tanto como lo que permite. La prueba es si GreenGrass recibe ella misma una factura medida, no de quién es la infraestructura sobre la que corre el costo. El cómputo, el almacenamiento y el personal propios de GreenGrass para correr un servicio central son costo de la suscripción cuando GreenGrass los paga fijos, como capacidad reservada o como salarios. Cuando un proveedor de nube le factura a GreenGrass por unidad por correr un servicio —por invocación o por segundo de GPU—, ese cargo se traslada como cualquier otra factura medida, al costo. Un servicio que no le genera a GreenGrass ninguna factura medida no tiene plano medido en absoluto. La medición existe para trasladar lo que a GreenGrass le cobran por unidad, no para ponerle precio al uso.

**Obligaciones de transparencia.** Antes de activar un servicio medido, la organización ve el precio unitario, el proveedor del que viene y una estimación con números. La organización puede fijar un tope de gasto por servicio, con un aviso y un corte. Un estado de cuenta mensual detalla cada servicio medido por unidades y por costo. Nada viene activado por defecto.

**Alternativas consideradas:** Se descartó absorber todo el costo variable de terceros en la suscripción porque o bien pone el precio de la suscripción al nivel del usuario más pesado, lo que incumple el principio de accesibilidad, o bien subsidia a los usuarios pesados con los livianos, que es un subsidio cruzado oculto que el principio de transparencia prohíbe. Se descartó un margen sobre el traslado para financiar la plataforma porque le da a GreenGrass un incentivo para empujar el consumo, el incentivo que la ADR-007 rechazó para las donaciones. Se descartó cobrar por uso el cómputo propio de GreenGrass de costo fijo porque es precio por uso con otro nombre; solo se traslada el cómputo que a GreenGrass misma le facturan por unidad.

### El catálogo, los derechos de uso y la medición viven en la capa de plataforma

La capa de plataforma gana un componente con tres partes. Es la única superficie nueva entre organizaciones que crea esta ADR, y solo guarda metadatos.

- **Catálogo de servicios.** Qué servicios centrales existen, en qué países, en qué niveles de aislamiento, de qué proveedores, a qué precio unitario trasladado, y qué datos salen del perímetro de la organización en cada llamada.
- **Derechos de uso.** Un registro por organización y por servicio, creado cuando un Administrador de la organización activa el servicio. Cada derecho de uso lleva una credencial acotada a ese único servicio y a esa única organización. Los servicios centrales se consumen a través de la misma capa de adaptadores por organización que las integraciones externas ([system.md § Arquitectura de integraciones](../design/architecture/system.md#arquitectura-de-integraciones)): un adaptador por servicio, el mismo monitoreo de estado, el mismo registro de auditoría. Activar un servicio cuyas llamadas llevan datos de la organización fuera del perímetro de cifrado exige la misma aceptación explícita que ya exige la configuración de BYOM ([system.md § Arquitectura BYOM](../design/architecture/system.md#arquitectura-byom)).
- **Medición.** Cada llamada a un servicio central emite un evento de uso en el flujo de eventos propio de la organización: organización, servicio, unidad, cantidad, costo del proveedor, el actor que la invocó y el contrato bajo el que corrió. Los eventos de uso son metadatos del registro de auditoría según la [ADR-016](016-cross-cutting-resolutions.md) §4 y no conservan contenido. La cadena de facturación los consume; también la vista de auditoría de la propia organización.

**Los derechos de uso son el límite de credenciales de cualquier agente futuro.** La [ADR-018](018-ai-agent-posture.md#qué-tiene-que-resolver-esta-adr) condiciona la producción, entre otras cosas, a la amplitud de las credenciales. Bajo esta ADR, un agente que actúa para una organización no puede tener credencial a ningún servicio que la organización no haya activado, y cada llamada que hace es un evento medido y registrado con un actor. Esta ADR no resuelve la ADR-018 y no añade ninguna capacidad de agente; aporta el mecanismo sobre el que esa revisión puede construir.

**Alternativas consideradas:** Se descartó guardar los derechos de uso dentro de cada instancia de organización porque el catálogo tiene que consultarse antes de que exista la instancia, durante el aprovisionamiento, y porque la facturación necesita una vista de metadatos entre organizaciones que la capa de organización, por construcción, no puede dar.

### Una alianza puede pagar por sus miembros, como ajuste de la puesta en marcha

La medición por organización responde a la preocupación por quien se beneficia sin aportar de [mvp.md § 8. Qué cuesta lo «igualitario» en la arquitectura](../spec/mvp.md#8-qué-cuesta-lo-igualitario-en-la-arquitectura) y levanta la de la asequibilidad. La respuesta es un modo de facturación en la afiliación.

- **`billing_mode` en la afiliación**, con dos valores: `member_pays`, el valor por defecto, y `alliance_pays`. Bajo `alliance_pays`, los costos medidos que genera el uso de servicios centrales por parte del miembro se facturan al estado de cuenta de la organización alianza.
- **Se fija en la puesta en marcha.** La alianza elige su valor por defecto cuando se pone en marcha ([workflows.md § 1. Puesta en marcha de una organización](../spec/workflows.md#1-puesta-en-marcha-de-una-organización)); cada solicitud de afiliación le muestra al miembro qué modo aplica antes de que el miembro acepte. Cambiar el modo en una afiliación activa requiere a los Administradores de la organización de la alianza y del miembro, la misma regla que la ADR-007 aplica a los cambios en el reparto de donaciones. Una alianza que deja de pagar lo hace al cierre de un período de facturación, con aviso previo; los derechos de uso del miembro continúan pagados por el miembro salvo que este los desactive.
- **Pagar no es ver.** Los resultados siguen aterrizando en la organización miembro, bajo las llaves del miembro, dentro del compartimento que especifiquen sus contratos. La alianza recibe el estado de cuenta: servicio, unidades, costo. Nunca el contenido, nunca las consultas. Las líneas del estado de cuenta son la misma clase de metadatos que los eventos de uso.
- **Los servicios sobre datos públicos son el caso natural.** La captura sobre medios públicos se comparte limpiamente; que la alianza la pague y cada miembro la consulte es la forma prevista. La investigación de la oposición no se comparte, y la investigación pagada por la alianza sigue aterrizando por miembro, por compartimento.

**Alternativas consideradas:** Se descartaron los derechos de uso a nivel de alianza compartidos por los miembros —la alianza tiene la credencial y los miembros llaman a través de ella— porque convierten a la alianza en parte de cada llamada de cada miembro y difuminan qué llaves y qué contratos rigen el resultado. Se descartó para esta ADR la facturación agrupada con un libro de aportes, porque [mvp.md](../spec/mvp.md) ya señala ese libro como un posible pasivo entre partes desiguales y lo pone a prueba.

### Disponibilidad por nivel de aislamiento

- **Estándar y Reforzado.** Todos los servicios centrales están disponibles.
- **Máximo.** Los servicios cuyas llamadas llevan datos de la organización más allá del perímetro —la generación y el análisis entre ellos— están disponibles solo con la aceptación explícita de la frontera de cifrado. La captura, cuyas llamadas llevan consultas pero devuelven datos públicos, está disponible con la misma aceptación acotada a los metadatos de consulta.
- **Autoalojado.** Los servicios centrales son llamadas remotas a la infraestructura de GreenGrass y vienen desactivados por defecto. Una organización autoalojada puede activarlos bajo la misma aceptación, o correr su propia instancia de un servicio cuando GreenGrass publique una como parte del paquete autoalojado, en espejo de la opción de modelo autoalojado bajo BYOM.

### Diferido: una asignación medida en el plan gratuito

Si el plan gratuito o de costo muy bajo incluye alguna asignación medida —y, de ser así, cuánta y para qué servicios— queda diferido. El principio de accesibilidad se mantiene tal como está escrito: ese plan tiene que existir y ser genuinamente usable. Si «usable» incluye un saldo inicial de servicios medidos es una decisión de precios que el piloto debería informar, y queda registrada como abierta en [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) para que no se lea como decidida en ningún sentido.

### Orden interno: avisos de enmienda

Las ADR que decisiones posteriores enmiendan ahora lo dicen al principio. Esta ADR añade una línea **Enmendada por** a la [ADR-007](007-fundraising-payments.md), que apunta aquí. También añade un aviso aclaratorio a la [ADR-013](013-analytics-ai.md), que resuelve la primera inconsistencia registrada en [ADR-018 § Inconsistencias registradas, no corregidas](018-ai-agent-posture.md#inconsistencias-registradas-no-corregidas): `system.md` afirma que la «decisión sobre el modelo de IA» de la ADR-013 quedó sustituida por la ADR-016 §38, pero la ADR-013 nunca eligió modelo ni proveedor. El modelo híbrido de llave gestionada frente a BYOK que se dice que decidió vivió solo en las preguntas abiertas del propio `system.md`. El aviso deja constancia de que nada de la ADR-013 queda sustituido y de que la ADR-016 §38 rige la elección del modelo.

## Consecuencias

**Beneficios:**
- Las capacidades compartidas obtienen una casa arquitectónica sin una cuarta capa y sin debilitar el aislamiento: código compartido, ejecución por organización, nada conservado
- El modelo de precios sigue siendo honesto. Suscripción fija por la plataforma, traslado al costo de lo que no se puede volver fijo, y ningún incentivo en ninguna parte para que GreenGrass empuje el consumo
- Una organización puede ver exactamente qué cuesta un servicio antes de activarlo y ponerle tope a lo que gasta, que es más transparencia de la que el modelo fijo daba para los costos de SMS que ya exceptuaba
- Una alianza puede absorber los costos medidos de sus miembros, así que la parte con menos recursos de una coalición no queda fuera de las capacidades que la coalición existe para compartir
- Los derechos de uso le dan a la ADR-018 un límite de credenciales concreto y un evento de auditoría por llamada, sin decidir nada de lo que esa revisión tiene que decidir
- La verificación de supresión mutua del piloto es la primera entrada del catálogo, lo que convierte al piloto y a la plataforma en un solo diseño continuo en lugar de dos

**Costos:**
- La capa de plataforma crece con una cadena de facturación: catálogo, derechos de uso, medición, estados de cuenta, reparto de las facturas conjuntas de los proveedores. Es infraestructura real que no existía bajo el precio fijo
- El traslado al costo significa que GreenGrass lleva los cambios de precio de los proveedores directo a las organizaciones, y tiene que comunicarlos
- La regla de ejecución por organización hace que algunos servicios sean más caros de construir de lo que sería un diseño con estado compartido, y prohíbe optimizaciones que de otro modo serían obvias
- Dos planos de facturación son más difíciles de explicar que uno, y las obligaciones de transparencia están ahí porque la simplicidad de la decisión original se perdió
- La facturación pagada por la alianza añade una superficie de gobernanza a afiliaciones que antes trataban solo de intercambio de datos

**Restricciones:**
- La organización sigue siendo el límite de aislamiento ([ADR-001](001-platform-architecture.md)); un servicio central nunca persiste estado derivado de la organización fuera de ella
- La plataforma nunca es parte de un contrato ([ADR-017](017-sharing-contract-trust-model.md)); un servicio central actúa para una organización por llamada y hereda sus contratos
- Sin vía de lectura de superusuario ([comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención)); esto obliga a los servicios centrales y a la cadena de medición, que solo ve metadatos
- Los eventos de uso no conservan contenido, según la [ADR-016](016-cross-cutting-resolutions.md) §4
- Nada de esto añade capacidad de agente ni resuelve la [ADR-018](018-ai-agent-posture.md); el requisito bloqueante se mantiene
- La pregunta de la asignación del plan gratuito queda diferida, no decidida; nada de esta ADR puede leerse como si la zanjara

**ADR relacionadas:** [ADR-001](001-platform-architecture.md) (aislamiento por organización, sin cambios), [ADR-007](007-fundraising-payments.md) (enmendada — el modelo de ingresos gana un plano medido), [ADR-012](012-external-integrations.md) (precedente de no visibilidad para terceros, aplicado a los registros de consulta), [ADR-013](013-analytics-ai.md) (aviso aclaratorio añadido), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, conservación escalonada §4), [ADR-017](017-sharing-contract-trust-model.md) (la plataforma nunca es parte; compartimentos), [ADR-018](018-ai-agent-posture.md) (punto de costo respondido, límite de credenciales aportado, requisito bloqueante sin cambios)
