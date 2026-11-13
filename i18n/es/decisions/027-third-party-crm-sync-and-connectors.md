# ADR-027: Sincronización del CRM con terceros y conectores

**Estado:** Propuesta
**Fecha:** 2026-11-13
**Fuentes:** `spec/integrations.md`, `spec/mvp.md`, `spec/compliance.md`, `design/architecture/system.md`, `decisions/002-security-threat-model.md`, `decisions/004-data-model-integrity.md`, `decisions/005-offline-first-sync.md`, `decisions/012-external-integrations.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/024-event-bus-as-federation.md`

## Contexto

[integrations.md § Migración desde otras plataformas](../spec/integrations.md#migración-desde-otras-plataformas) decidió cómo llega una organización desde otra herramienta: guías de migración más la importación genérica. Es un camino de una sola vía. Da por sentado que la organización deja la herramienta que tenía.

Victoria Ciudadana corre NationBuilder ([mvp.md § MVC — Movimiento Victoria Ciudadana](../spec/mvp.md#mvc-movimiento-victoria-ciudadana)). Sin sincronización, adoptar la plataforma significa dejar NationBuilder, que es la mudanza que el MVP evitó a propósito. Con sincronización, una organización puede mantener NationBuilder como su sistema de referencia y sumarle módulos al lado, empezando por las herramientas de coalición. «Sin mudanza» pasa a ser una posición de producto, no solo un atajo del piloto.

La dirección también propone Parsons, la librería de Python de Movement Co-op, como capa de conectores, por la interoperabilidad con las herramientas que la izquierda de Estados Unidos ya corre y por la visibilidad entre quienes las corren.

Esta ADR está `Propuesta`. Un requisito en ella está decidido, y va marcado: la sincronización con NationBuilder, empezando por un CSV de ida y vuelta. La sincronización por API y Parsons están propuestos, y tres datos en los que se apoyan todavía no están verificados.

### Conflictos que resuelve esta ADR

1. **[integrations.md § Migración desde otras plataformas](../spec/integrations.md#migración-desde-otras-plataformas)** decide «guías de migración + importación genérica», en una sola vía. La sincronización va en las dos.
2. **La [ADR-012](012-external-integrations.md)** es la estrategia de integraciones, y no tiene ninguna decisión sobre otras plataformas de campaña. La decisión sobre la migración vive solo en `integrations.md`. La ADR-012 recibe un aviso para que quien lea la ADR de integraciones encuentre esta.
3. **[system.md § Stack tecnológico](../design/architecture/system.md#stack-tecnológico)** decide un backend en TypeScript. Parsons es Python.
4. **[mvp.md § 1. Contexto](../spec/mvp.md#1-contexto)** describe la plataforma completa como una que «le pide a un partido político migrar todo lo que hace a una herramienta nueva». Con sincronización ya no hace falta.

## Decisión

### La sincronización con NationBuilder es un requisito, empezando por CSV

**Decidido.** El CRM del Core se sincroniza en las dos direcciones con herramientas de terceros. NationBuilder va primero, y el CSV va primero, para traer al MVC.

La sincronización con NationBuilder es una prioridad del carril político. Las reglas de sincronización y los conectores viven en el Core, así que el carril comercial los recibe para sus propias herramientas sin trabajo adicional.

### Fase A: el CSV de ida y vuelta

Decidido como requisito. Los detalles de abajo son el diseño que se propone para cumplirlo.

- **De entrada:** importar la exportación de personas de NationBuilder. `mvp.md` ya lista sus nombres de campo estables, de `nationbuilder_id` a `mobile_opt_in`. Esos campos se mapean una vez y el mapeo se guarda.
- **De salida:** exportar los cambios como un CSV que NationBuilder pueda importar, con `nationbuilder_id` como clave.
- **Ritmo:** el que lleve la organización. Es lo que el MVP ya da por sentado.
- **Sin acceso permanente:** esto no necesita acceso a la API, ni una aplicación OAuth, ni credenciales guardadas de forma continua en la instancia.

La Fase A amplía el flujo de importación y los formatos de exportación que `integrations.md` ya especifica. Lo nuevo es que los dos forman un par: un mapeo guardado, un identificador externo y una exportación que la otra herramienta puede volver a leer.

### Fase B: sincronización por API

Propuesto.

El mismo mapeo, corriendo de forma continua a través de un conector, con webhooks o con sondeo periódico y cursores incrementales. Las reglas de la Fase A pasan sin cambios.

### Las reglas viven en el CRM del Core, no en el conector

Propuesto. Aplican a las dos fases.

- **Correspondencia de identidades.** Cada persona tiene un mapa de identificadores externos (`nationbuilder_id` ↔ el ID propio de la persona). Los registros que entran pasan por la deduplicación de sugerir y confirmar ([ADR-004 § Deduplicación con sugerir y confirmar](004-data-model-integrity.md#deduplicación-con-sugerir-y-confirmar)). La sincronización nunca fusiona personas por su cuenta.
- **Sistema de referencia por campo.** La organización elige, campo por campo, qué lado prevalece. Lo fija una vez, cuando se conecta.
- **Los conflictos se guardan en los dos lados y se marcan para que una persona los vea,** como ya hace fusionar y marcar en la sincronización sin conexión ([ADR-005](005-offline-first-sync.md)).
- **El consentimiento es asimétrico.** Una baja o un `do_not_contact` cruza en las dos direcciones y gana el valor más restrictivo, sin importar de quién sea el campo. Un consentimiento expreso nunca pasa por encima de una baja más reciente.
- **Los campos incluidos son con denegación por defecto.** `support_level`, `tags` y los campos cifrados se quedan fuera a menos que se activen. Los campos que entran por sincronización siguen sujetos a los contratos de intercambio: llegar por sincronización nunca pone un campo en la vista compartida de una coalición ([ADR-017](017-sharing-contract-trust-model.md)).
- **El perímetro.** Los datos que se envían a NationBuilder salen de la frontera de BYOK. Eso exige la misma aceptación explícita que exige BYOM ([system.md § Arquitectura BYOM](../design/architecture/system.md#arquitectura-byom)). Para el alfa de Puerto Rico, el alojamiento de NationBuilder en Estados Unidos es la misma jurisdicción, así que ahí la residencia de datos es una pregunta menor. En Brasil o en India no lo es, y aplica [compliance.md § Transferencias transfronterizas de datos](../spec/compliance.md#transferencias-transfronterizas-de-datos).
- **Auditoría.** Cada lote de sincronización es una entrada de auditoría, con el conector como actor.

**Alternativas consideradas:** Se descartó dejar las reglas en los scripts de cada conector, porque entonces cada conector volvería a implementar de otra manera la correspondencia de identidades, qué lado prevalece por campo, la precedencia del consentimiento y el manejo de conflictos, y el consentimiento es la única regla que no puede variar según la herramienta.

### La sincronización no es un módulo

Propuesto.

La sincronización es una capacidad del CRM del Core que se expone a través de conectores. Un conector es un enlace con una herramienta externa; vive en el centro de integraciones ([system.md § Arquitectura de integraciones](../design/architecture/system.md#arquitectura-de-integraciones)) y no es un módulo ([ADR-022 § Vocabulario](022-core-modules-and-lanes.md#vocabulario)). Los conectores se catalogan y se activan por organización, igual que las integraciones.

### Parsons como capa de conectores

Propuesto, a la espera de las comprobaciones de abajo.

Por qué encaja:

- Es de código abierto y está hecho para organizaciones progresistas.
- Ya se conecta con buena parte de las herramientas de la izquierda de Estados Unidos: VAN/EveryAction, ActBlue, Action Network, Mobilize, Google Sheets y almacenes de datos.
- Aportarle un conector a Parsons haría de la plataforma un destino en las cadenas de procesamiento de otras organizaciones. Eso es visibilidad de verdad, no una frase de mercadeo.

Para qué hay que prepararse:

- **Stack.** El backend decidido es TypeScript. Parsons es Python. Correría como un contenedor aparte, el proceso de conectores, en cada instancia, consumiendo del bus de eventos y publicando en él ([ADR-024](024-event-bus-as-federation.md)). El bus es lo que hace limpia la separación de lenguajes: el proceso nunca toca la base de datos directamente.
- **Por lotes frente a sincronización.** Parsons es una librería de ETL hecha para trabajos por lotes. Eso le sirve a la Fase A y a las sincronizaciones programadas. Las reglas de dos direcciones de arriba tienen que vivir en el CRM del Core, no en scripts de Parsons.
- **Alcance.** Sus conectores son en gran parte de Estados Unidos. Brasil, Tailandia, India y Líbano van a necesitar conectores que Parsons no tiene. Parsons es la capa de interoperabilidad para la izquierda de Estados Unidos y para Puerto Rico, no toda la historia de los conectores.
- **Modelo de amenazas.** Un árbol grande de dependencias de Python es una superficie de ataque de la cadena de suministro bajo la [ADR-002](002-security-threat-model.md). Hay que fijar las versiones y guardar copia de las dependencias. El proceso corre en un entorno restringido y tiene solo la credencial de su propio conector, que saca de Vault.

**Verificar antes de comprometerse.** Nada de esto se afirma aquí:

- **Verificar:** que Parsons tiene un conector de NationBuilder, y qué cubre: solo personas, o también donaciones y eventos.
- **Verificar:** la licencia de Parsons.
- **Verificar:** los límites de solicitudes de la API de NationBuilder y qué cubren sus webhooks, para la Fase B.

**Alternativas consideradas:** Escribir cada conector en TypeScript dentro de la aplicación era lo que el stack daba por defecto. Parsons se propone en su lugar por los conectores que ya tiene y por el lugar que da entre las organizaciones que lo usan. Ninguno de los dos argumentos se sostiene si las comprobaciones de arriba fallan.

### Preguntas abiertas

1. **Parsons:** adoptarlo como capa de conectores para la izquierda de Estados Unidos y para Puerto Rico, después de la verificación de arriba.
2. **Los tres puntos marcados *Verificar*.**
3. **Un ejercicio de comprobación.** La dirección propone una prueba técnica en el carril político con una exportación real del MVC: el CSV de ida y vuelta de la Fase A con Parsons, y después la supresión mutua entre dos instancias sobre el bus ([ADR-024](024-event-bus-as-federation.md)). No tiene fecha.
4. **El piloto.** [mvp.md](../spec/mvp.md) especifica el piloto como de solo ingesta. Si la mitad de salida de la Fase A entra al piloto no se decide aquí, y el plan del piloto no cambia.

### Orden interno: avisos de enmienda

Esta ADR le agrega a la [ADR-012](012-external-integrations.md) una línea de **Enmendada por**, por el requisito decidido, que también anota lo que está propuesto.

## Consecuencias

**Beneficios:**
- Una organización puede adoptar la plataforma sin dejar la herramienta que corre hoy
- El MVC llega con sus datos de NationBuilder y sus marcas de consentimiento intactos, y puede mandar cambios de vuelta
- Un solo juego de reglas de sincronización les sirve a todos los conectores y a los dos carriles
- La Fase A no necesita credenciales ni API, así que puede existir antes que cualquier conector
- Si Parsons aguanta, la plataforma alcanza un conjunto de herramientas que de otro modo integraría una por una

**Costos:**
- La sincronización en dos direcciones es más difícil que la importación en una: conflictos, qué lado prevalece por campo y un identificador externo en cada persona
- Un segundo lenguaje y un segundo entorno de ejecución en cada instancia, si se adopta Parsons
- Los datos que se envían a un CRM externo salen de la frontera de cifrado, y el cliente tiene que aceptarlo a sabiendas
- La propuesta de Parsons se apoya en tres datos sin verificar

**Restricciones:**
- La sincronización nunca fusiona personas por su cuenta; la deduplicación es de sugerir y confirmar ([ADR-004](004-data-model-integrity.md))
- Una baja siempre cruza, y gana el valor de consentimiento más restrictivo
- Los campos sensibles se quedan fuera de la sincronización a menos que se activen, y un campo sincronizado nunca entra a una vista compartida por el hecho de llegar
- Un conector tiene solo su propia credencial y nunca llega directamente a la base de datos
- Nada marcado *Verificar* se puede tratar como cierto

**ADR relacionadas:** [ADR-002](002-security-threat-model.md) (la superficie de ataque de la cadena de suministro del proceso de conectores), [ADR-004](004-data-model-integrity.md) (deduplicación de sugerir y confirmar; entradas de auditoría por lote), [ADR-005](005-offline-first-sync.md) (manejo de conflictos con fusionar y marcar), [ADR-012](012-external-integrations.md) (enmendada: la sincronización del CRM con herramientas de terceros entra a la estrategia de integraciones), [ADR-017](017-sharing-contract-trust-model.md) (los campos sincronizados siguen bajo los contratos de intercambio), [ADR-022](022-core-modules-and-lanes.md) (la sincronización es del Core; un conector no es un módulo), [ADR-024](024-event-bus-as-federation.md) (el proceso de conectores queda detrás del bus)
