# ADR-023: Superficies — un Core headless, chat, administración y campo

**Estado:** Propuesta
**Fecha:** 2026-11-13
**Fuentes:** `spec/pitch.md`, `spec/demo.md`, `design/architecture/system.md`, `design/ux/01-information-architecture/navigation-model.md`, `design/ux/01-information-architecture/screen-inventory.md`, `decisions/005-offline-first-sync.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/022-core-modules-and-lanes.md`

## Contexto

El corpus de UX dibuja una sola aplicación. [navigation-model.md](../design/ux/01-information-architecture/navigation-model.md) organiza cada funcionalidad dentro de un solo marco, y [screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md) cataloga 240 pantallas dentro de él.

La nueva dirección es un Core headless, es decir, sin interfaz propia ([ADR-022](022-core-modules-and-lanes.md)). Todo lo que hace la plataforma es primero una operación de la API. Un UI de chat debe cargar con el 70 a 80 % del trabajo diario del equipo, una UI de administración carga con el resto, que es lo complejo, y la app de campo se queda como la superficie sin conexión.

La arquitectura ya lo permite. [system.md § API pública](../design/architecture/system.md#api-pública) se compromete a que la API pública sea la misma API que consume el frontend, sin «puertas traseras privadas». Ese compromiso es lo que hace posible un Core headless: toda superficie es un consumidor de la API, y ninguna tiene privilegios.

Lo que la arquitectura todavía no permite es el chat. Un chat que hace la mayor parte del trabajo diario lee a través de las funcionalidades, guarda credenciales e invoca operaciones. Ese es el agente que la [ADR-018](018-ai-agent-posture.md) condiciona. Es la consecuencia más grande de la nueva dirección, y esta ADR la enfrenta de frente: registra una decisión sobre el punto de decisión, y manda una propuesta a la revisión.

Esta ADR está `Propuesta`. Una cosa en ella está decidida, y está marcada.

### Conflictos que resuelve esta ADR

1. **[ADR-018 § Ninguna capacidad de agente llega a producción hasta que se acepte esta ADR](018-ai-agent-posture.md#ninguna-capacidad-de-agente-llega-a-producción-hasta-que-se-acepte-esta-adr)** condiciona exactamente el agente que supone una superficie donde el chat va primero. El punto de decisión sigue en pie. Esta ADR no lo resuelve, y dice qué espera detrás de él.
2. **[ADR-005](005-offline-first-sync.md)** hace de la operación con prioridad sin conexión la base del trabajo de campo. El chat necesita conectividad y una llamada a un modelo por construcción, como la ADR-018 ya dice de toda funcionalidad mediada por un agente.
3. **[navigation-model.md](../design/ux/01-information-architecture/navigation-model.md)** y **[screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md)** suponen que cada funcionalidad existe en una sola UI para toda organización.
4. **[pitch.md](../spec/pitch.md)** y **[demo.md](../spec/demo.md)** muestran el flujo de aprobación en WhatsApp en el prototipo y en Telegram en la demostración, porque los términos comerciales de WhatsApp excluyen a los partidos políticos. Ninguno nombra un canal por defecto para el producto.

## Decisión

### Un Core headless y tres superficies

Propuesto.

Headless quiere decir que toda superficie llama a la misma API pública. Una superficie es donde una persona hace el trabajo, y hay tres.

| Chat (meta: 70 a 80 % del trabajo diario) | UI de administración | App de campo |
|---|---|---|
| Aprobar contenido, como en la demostración | Importaciones y mapeo de columnas | Trabajo de campo puerta a puerta |
| Preguntas: «¿cuántas puertas ayer en Carolina?» | Contratos de intercambio y configuración de la coalición | Inscripción de votantes |
| Redactar con un constructor | Ceremonias de llaves, BYOK, ajustes de seguridad | Registro de entrada a eventos |
| Notificaciones y resúmenes del día | Corte de territorios y mapas | Resultados de observadores electorales |
| Actualizaciones sencillas de registros: «marca a Ana como voluntaria» | Construcción de segmentos | |
| Resumen del monitoreo de medios | Revisión de duplicados a escala | |
| Totales de recaudación, conteos de confirmaciones de asistencia | Informes y presentaciones de cumplimiento | |
| | El centro de mando de GOTV | |
| | Ajustes de módulos y conectores | |

La cifra de 70 a 80 % es trabajo del equipo y de la candidatura, no trabajo de campo.

Cada módulo declara en su manifiesto qué pone en cada superficie ([ADR-022 § El contrato de módulo](022-core-modules-and-lanes.md#el-contrato-de-módulo)).

**Alternativas consideradas:** Se descartó el chat como única superficie porque dos de las tres cosas que ningún competidor integra, el padrón electoral y las herramientas de campo sin conexión, no tienen forma de chat, y el diseño tiene que aceptarlo.

### La app de campo se queda, como la superficie sin conexión

Propuesto, y reafirma la [ADR-005](005-offline-first-sync.md).

Las herramientas de campo sin conexión son una de las cosas que ningún competidor integra. El chat no puede ser la superficie para el trabajo que se hace sin señal. La app de campo sigue siendo la tercera superficie, con el motor de sincronización, el almacenamiento en el dispositivo y las reglas de conflicto que decidió la ADR-005. El chat no se usa para el trabajo de campo.

### La mayoría de los wireframes sobrevive como la UI de administración

Propuesto.

La mayoría de las 240 pantallas con wireframe sobrevive como la UI de administración. El inventario de pantallas necesita reclasificarse por superficie, no volver a dibujarse. Las pantallas cuyo trabajo se muda al chat, como los paneles que se leen a diario, las colas de aprobación y los centros de notificaciones, pasan a ser secundarias en la UI de administración. La navegación se arma a partir de los módulos que un cliente tiene activados, porque cada módulo aporta sus propias pantallas y entradas de navegación.

La reclasificación es trabajo pendiente. Requiere un juicio por pantalla y no se hace aquí. Esta ADR no vuelve a dibujar ningún wireframe.

### El punto de decisión de la ADR-018 abarca todo el Core

**Decidido.** La revisión de la ADR-018 aplica al Core, y por lo tanto a los dos carriles. El chat es una superficie del Core, así que ni Greengrass ni Basecamp lo llevan a producción antes de que la revisión se acepte. La ADR-018 sigue `Propuesta`.

- **Este es el único lugar donde los carriles no son independientes.** [ADR-022 § Dos carriles sobre una misma infraestructura](022-core-modules-and-lanes.md#dos-carriles-sobre-una-misma-infraestructura) dice que un carril no espera por el otro. Los dos esperan por la revisión. Está en la ruta crítica de ambos.
- **Qué puede salir antes de la revisión:** la UI de administración, la app de campo, y cualquier módulo que no tenga ninguna de las cuatro características condicionadas.
- **Los prototipos quedan fuera del punto de decisión,** como ya dice [ADR-018 § La revisión condiciona la producción, no la experimentación](018-ai-agent-posture.md#la-revisión-condiciona-la-producción-no-la-experimentación) y como [demo.md](../spec/demo.md) da por sentado: todo lo que no guarde registros reales de clientes.

**Alternativas consideradas:** Se descartó aplicar el punto de decisión solo al carril político porque el chat es una superficie del Core, y el Core es el mismo en los dos carriles.

### El chat como las manos de la persona

Propuesto, como insumo para la revisión de la ADR-018. Nada de esto está aceptado, y esta ADR no puede aceptarse para la superficie de chat antes que la ADR-018.

La posición es que el chat es las manos de la persona, no un segundo actor:

- **Actúa bajo el rol, los ámbitos y los contratos de intercambio de la persona que lo invoca.** Quien usa el chat no puede hacer nada que no podría hacer en la UI de administración.
- **Cada escritura la confirma la persona con un toque en una tarjeta,** como en la demostración. Las lecturas no necesitan confirmación; las escrituras, siempre.
- **Nunca actúa en segundo plano.** Un resumen programado es una programación que fijó una persona, como [ADR-020 § Transporte por canal](020-central-service-line-up-and-builders.md#transporte-por-canal) ya permite para los envíos.
- **El registro de auditoría anota a la persona como el actor y al chat como el canal.** La demostración ya lo hace.
- **Los módulos declaran sus operaciones de chat en el manifiesto,** incluidas cuáles son escrituras. El modelo elige entre las operaciones declaradas y no puede inventar otras.

Esa posición da respuestas propuestas a varios puntos de la ADR-018: el alcance de lectura (el de la persona), la capacidad de invocar herramientas (solo las operaciones declaradas), la autonomía (ninguna sin confirmación) y el actor de auditoría (la persona más el canal). No resuelve la revisión. La inyección de prompts desde el contenido que el chat lee, como un artículo monitoreado o un mensaje entrante, sigue sin respuesta.

La posición queda registrada en [ADR-018 § La propuesta en revisión](018-ai-agent-posture.md#la-propuesta-en-revisión), donde la revisión la va a evaluar junto al arnés por organización que ya está ahí.

### Costo y canal

Dos consecuencias prácticas, las dos abiertas.

- **Costo.** El chat es inferencia en cada turno. Bajo la [ADR-019](019-central-services-and-metered-billing.md) eso es un costo medido, o la factura propia del cliente bajo BYOM. Cuando el chat es la superficie principal, este costo deja de ser marginal, y los precios tienen que contar con él ([ADR-026](026-two-lane-pricing.md)).
- **Canal.** La propuesta es que el chat tenga por defecto su casa dentro de la app del propio producto, con Telegram o Signal como opciones por cliente. WhatsApp no debe ser el canal que se da por sentado, porque sus términos comerciales prohíben la actividad de partidos políticos ([pitch.md](../spec/pitch.md)).

### Preguntas abiertas

1. **¿Es el chat como las manos de la persona la posición que se manda a la revisión de la ADR-018?** Queda registrada ahí como propuesta en cualquier caso.
2. **El canal de chat por defecto:** primero el chat dentro de la app, Telegram o Signal por cliente, WhatsApp no se da por sentado.
3. **La inyección de prompts** desde el contenido que el chat lee. Sin respuesta, y le corresponde al punto 1 de la ADR-018.
4. **El Agente de Campaña** como este chat con los módulos de contenido activados ([ADR-022 § El catálogo de módulos](022-core-modules-and-lanes.md#el-catálogo-de-módulos)). Recomendado, no decidido.

## Consecuencias

**Beneficios:**
- El equipo y las candidaturas trabajan donde ya están, y el producto no tiene que ganarse un lugar en su pantalla de inicio
- Toda capacidad existe como operación de la API antes de existir como pantalla, que es lo que necesitan tanto un módulo de un tercero como una app nativa
- Las 240 pantallas se conservan; el trabajo es reclasificar, no volver a dibujar
- La pregunta de los agentes tiene una posición concreta sobre la mesa para su caso más grande

**Costos:**
- La superficie principal de los dos productos espera por la revisión de la ADR-018
- La inferencia se vuelve un costo del trabajo diario ordinario
- Tres superficies tienen que mantenerse coherentes entre sí, y el manifiesto es lo que las mantiene así
- El modelo de navegación y el inventario de pantallas describen una sola aplicación, y los dos necesitan una pasada antes de describir tres superficies

**Restricciones:**
- Ninguna superficie de chat llega a producción en ninguno de los dos carriles antes de que se acepte la ADR-018
- La app de campo funciona sin conectividad ([ADR-005](005-offline-first-sync.md)); ninguna tarea de campo puede depender del chat
- Ninguna superficie es un cliente privilegiado del Core: no hay ninguna API de uso solo interno
- Quien usa el chat no puede hacer nada que no podría hacer en la UI de administración
- La posición sobre el chat es una propuesta; nada puede construirse sobre ella para producción

**ADR relacionadas:** [ADR-005](005-offline-first-sync.md) (la app de campo sigue siendo la superficie sin conexión), [ADR-011](011-design-system-ux.md) (el sistema de diseño que la UI de administración y la app de campo conservan), [ADR-018](018-ai-agent-posture.md) (el punto de decisión abarca todo el Core; la posición sobre el chat se manda a su revisión), [ADR-019](019-central-services-and-metered-billing.md) (la inferencia es un costo medido), [ADR-020](020-central-service-line-up-and-builders.md) (un envío es la acción de una persona o una programación que fijó una persona), [ADR-022](022-core-modules-and-lanes.md) (el Core headless; el manifiesto declara las superficies de cada módulo), [ADR-026](026-two-lane-pricing.md) (el costo del chat en el precio)
