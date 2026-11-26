# ADR-018: Postura ante los agentes de IA

**Estado:** Aceptada
**Fecha:** 2026-09-07
**Actualizada:** 2026-09-28 — se agrega la propuesta en revisión; más tarde ese mismo día, su ejemplo desarrollado se reemplaza por el flujo de aprobación por WhatsApp. El estado no cambia: nada de lo que contiene está aceptado. 2026-11-13 — se deja anotado que el punto de decisión abarca todo el Core, en los dos carriles; se agrega a la propuesta en revisión el chat como las manos de la persona. El estado no cambia. 2026-11-25 — se anotan las preguntas de la ADR-028 (Coaching). El estado no cambia. 2026-11-26 — se celebra la revisión. Esta ADR queda aceptada, con sus ocho puntos resueltos y sus propuestas zanjadas como registra [§ La revisión](#la-revisión). El mecanismo que la revisión especifica vive en `spec/harness.md`.
**Fuentes:** `spec/security.md`, `spec/compliance.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/021-content-approval-pipeline.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`, `decisions/026-two-lane-pricing.md`, `decisions/028-coaching.md`, `design/ux/04-wireframes/content-ops/content-ops.md`

## Contexto

GreenGrass ha decidido sobre IA cinco veces, y cada decisión dibujó una funcionalidad acotada con una persona haciendo de compuerta a la salida.

1. La [ADR-013](013-analytics-ai.md) genera un mensaje de activismo personalizado; quien apoya lo edita, lo aprueba, y esa aprobación queda como registro de consentimiento.
2. La [ADR-010](010-internationalization-localization.md) redacta borradores de traducción para que los apruebe una persona, con revisión obligatoria para los avisos de seguridad, los textos legales y el lenguaje de consentimiento.
3. La [ADR-014](014-volunteer-onboarding.md) pone un concierge de IA en el primer contacto de soporte, que escala a una persona en cuanto hay algo delicado.
4. La [ADR-016](016-cross-cutting-resolutions.md) §38 eligió BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA): la organización aporta su proveedor, su endpoint y sus credenciales.
5. [system.md § Integración de IA](../design/architecture/system.md#integración-de-ia) implementa las cuatro detrás de una capa de abstracción independiente del proveedor, con salvaguardas de contenido.

Cada una es sólida por separado. Ninguna hace la pregunta de fondo: qué cambia si los agentes de IA operan *a lo largo de todo* el producto y no dentro de cinco cajas —leyendo entre funcionalidades, con credenciales propias, invocando herramientas y actuando entre un punto de control humano y el siguiente.

Esa pregunta no está hecha, y los documentos que tendrían que responderla callan. [security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza) y la [ADR-002](002-security-threat-model.md) no mencionan la IA ni una sola vez. [compliance.md § Acuerdos de tratamiento de datos](../spec/compliance.md#acuerdos-de-tratamiento-de-datos) contiene la única mención a la IA de todo el marco de cumplimiento, y es como obligación de declarar subencargados.

Mientras tanto, la puerta ya está abierta. [integrations.md § Principios de integración](../spec/integrations.md#principios-de-integración) establece que «las organizaciones traen sus propias llaves de API y sus propias cuentas de servicios externos», y [system.md § El arnés y el enrutador de modelos](../design/architecture/system.md#el-arnés-y-el-enrutador-de-modelos) ya admite que los datos del prompt en BYOM «salen de su frontera de cifrado». La plataforma tiene la fontanería para los agentes y no tiene la postura.

### Vacíos que esta ADR nombra

**El modelo de amenazas no modela a un actor no humano.** [security.md § Principios de seguridad](../spec/security.md#principios-de-seguridad) dice que «ninguna credencial, llave o persona por sí sola debería poder exponer toda la plataforma». Un agente que sostiene credenciales acotadas repartidas entre varias áreas del producto es exactamente esa concentración, y no es una credencial, ni una llave, ni una persona. No hay tratamiento alguno de la inyección de prompts, de la exfiltración de modelo ni de la autoridad de un agente en [security.md § Seguridad de la aplicación](../spec/security.md#seguridad-de-la-aplicación).

**Cumplimiento no tiene sección sobre decisiones automatizadas ni sobre elaboración de perfiles.** La plataforma asigna puntajes de apoyo del 1 al 5 a votantes identificables ([users.md § La lista única y la deduplicación](../spec/users.md#la-lista-única-y-la-deduplicación), [security.md § En reposo](../spec/security.md#en-reposo)) en jurisdicciones regidas por el artículo 22 del RGPD y el artículo 20 de la LGPD. Un prompt que lleva datos personales de votantes a un endpoint externo es una transferencia según [compliance.md § Transferencias transfronterizas de datos](../spec/compliance.md#transferencias-transfronterizas-de-datos), y esa sección no lo contempla. La [ADR-009](009-compliance-legal.md) ya rechazó el filtrado automático de contenido por lesa majestad por poco fiable y por su efecto inhibidor; un agente con acceso de lectura al contenido de una organización tailandesa contradice ese rechazo.

**El modelo de auditoría tampoco tiene un actor no humano.** La [ADR-004](004-data-model-integrity.md) registra las mutaciones por usuario; [settings.md § SET-018: Visor del registro de auditoría](../design/ux/04-wireframes/settings/settings.md#set-018-audit-trail-viewer) muestra actor, IP y user agent. No hay tipo de actor para un agente, ni relación de «actuando en nombre de», ni modelo de retención para prompts y respuestas. La [ADR-016](016-cross-cutting-resolutions.md) §49 se compromete a que «el personal pueda ver exactamente por qué se hizo una sugerencia», una garantía de explicabilidad que un modelo de lenguaje no puede cumplir tal como está escrita.

**El trabajo sin conexión es una restricción fundacional que los agentes no pueden cumplir.** La [ADR-005](005-offline-first-sync.md) existe porque el trabajo de campo ocurre donde no hay señal. Toda funcionalidad mediada por un agente exige conectividad por construcción, como ya dice [settings-help-patterns.md § Concierge de IA](../design/ux/02-global-patterns/settings-help-patterns.md#concierge-de-ia).

**El modelo de costos contradice al modelo de precios.** [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) decidió niveles de suscripción planos, «no atados al volumen de donaciones, a la cantidad de usuarios ni a ninguna métrica de uso». El costo por token de inferencia es una métrica de uso. Nada en el corpus concilia las dos frases.

**Hay una doctrina sin nombre haciendo trabajo de carga.** *La máquina propone, la persona dispone* aparece por separado en [ADR-006 § Constructor automático del universo GOTV](006-field-operations-gotv.md#constructor-automático-del-universo-gotv), [gotv.md § Reasignación dinámica de recursos](../spec/gotv.md#reasignación-dinámica-de-recursos), [ADR-010 § Localización asistida por IA con revisión humana](010-internationalization-localization.md#localización-asistida-por-ia-con-revisión-humana), [ADR-013 § Mensajes personalizados generados por IA para el activismo](013-analytics-ai.md#mensajes-personalizados-generados-por-ia-para-el-activismo) y [ADR-004 § Deduplicación con sugerir y confirmar](004-data-model-integrity.md#deduplicación-con-sugerir-y-confirmar). Está enunciada cinco veces y ni una sola como principio.

**Una decisión anterior ya responde a la pregunta, en sentido contrario.** La [ADR-012](012-external-integrations.md) eligió alojar los mosaicos de mapa por cuenta propia para que ningún tercero vea los patrones del trabajo de campo. [comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención) exige que «el Administrador de la organización no pueda leer» y que «el Administrador de la plataforma no pueda leer en absoluto». Un agente con alcance de lectura entre funcionalidades es una vía de lectura de superusuario, que ese documento prohíbe por diseño.

### Inconsistencias registradas, no corregidas

Al armar esta ADR aparecieron tres contradicciones. Siguiendo la práctica establecida para la traducción, quedan nombradas y no corregidas en silencio, para que corregirlas sea una decisión que alguien tome a propósito.

1. La [ADR-013](013-analytics-ai.md) sigue con `**Estado:** Aceptada` y sin aviso de sustitución, aunque [system.md § Integración de IA](../design/architecture/system.md#integración-de-ia) dice que su decisión sobre el modelo de IA quedó sustituida por la [ADR-016](016-cross-cutting-resolutions.md) §38. *Resuelto por la [ADR-019](019-central-services-and-metered-billing.md): un aviso aclaratorio deja constancia de que la ADR-013 nunca tomó una decisión sobre el modelo y de que rige la ADR-016 §38.*
2. [dashboards.md § Centro de mando — diferencias clave con los demás paneles](../design/ux/04-wireframes/dashboards/dashboards.md#war-room-key-differences-from-other-dashboards) describe las sugerencias de reasignación como «generadas por IA», después de que la [ADR-016](016-cross-cutting-resolutions.md) §49 las hiciera basadas en reglas para la v1.
3. La [ADR-016](016-cross-cutting-resolutions.md) enumera como capacidad nueva requerida una capa de abstracción de proveedores BYOM *y una pantalla de configuración*. Esa pantalla no existe ni en [settings.md](../design/ux/04-wireframes/settings/settings.md) (de SET-001 a SET-022) ni en [screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md).

## Decisión

### Ninguna capacidad de agente llega a producción hasta que se acepte esta ADR

*Desactivado el 2026-11-26: esta ADR está aceptada. El propósito del punto de decisión está cumplido. Las cuatro propiedades de abajo siguen siendo la prueba contra la que se mide toda capacidad nueva —ahora contra la postura de [§ La revisión](#la-revisión), declarada en el manifiesto de cada módulo.*

Las cinco decisiones enumeradas arriba salen tal como están especificadas. Son acotadas, están revisadas y este punto de decisión no las toca.

Todo lo que vaya más allá queda condicionado. En concreto, una capacidad queda condicionada si tiene alguna de estas características:

- **Alcance de lectura más amplio que una sola funcionalidad** — acceso a contactos, registros de votantes, mensajes, donaciones o datos de auditoría fuera de la frontera de la funcionalidad acotada que la invoca.
- **Capacidad de invocar herramientas** — poder ejecutar operaciones de la plataforma en lugar de devolver texto para que una persona actúe.
- **Acción autónoma** — cualquier cambio de estado, envío o llamada externa que ninguna persona aprobó en el momento en que ocurrió.
- **Amplitud de credenciales** — una llave con alcance mayor que la única integración a la que sirve.

**Alternativas consideradas:** Dejar que el trabajo con agentes avance en paralelo a la revisión se descartó porque las decisiones de arquitectura que un agente implica —modelo de actores, alcance de credenciales, esquema de auditoría— son justamente las caras de revertir, y las fija la construcción de la Fase 2 del piloto ([mvp.md § 7. Fases](../spec/mvp.md#7-fases)). Escribir ahora una postura completa sobre agentes, antes de la revisión, se descartó porque los vacíos abarcan seguridad, cumplimiento, auditoría, trabajo sin conexión y precios, y resolverlos de una sentada repetiría el error de decidir funcionalidad por funcionalidad que esta ADR existe para corregir.

### La revisión condiciona la producción, no la experimentación

Nada de esto restringe experimentar con datos sintéticos en un entorno de desarrollo. El punto de decisión está sobre producción y sobre cualquier despliegue que contenga registros reales de votantes, donantes o afiliados. La distinción importa porque el piloto es el primer lugar donde las dos cosas convergen.

### El punto de decisión abarca todo el Core, en los dos carriles

Agregado el 2026-11-13, y decidido en [ADR-023 § El punto de decisión de la ADR-018 abarca todo el Core](023-surfaces-chat-admin-field.md#el-punto-de-decisión-de-la-adr-018-abarca-todo-el-core). La plataforma es ahora un Core que se vende por dos carriles, un producto político y uno comercial ([ADR-022](022-core-modules-and-lanes.md)). Esta revisión se aplica al Core, y por lo tanto a los dos. Ninguno de los dos productos lleva a producción una superficie de chat, ni ninguna otra capacidad condicionada, antes de que se acepte esta ADR. Lo que puede salir antes es lo que el punto de decisión nunca cubrió: la UI de administración, la app de campo y cualquier módulo que no tenga ninguna de las cuatro propiedades de arriba.

## Qué tiene que resolver esta ADR

Aceptarla exige una respuesta a cada uno de estos puntos, registrada aquí o en el documento que se nombra. **Resueltos el 2026-11-26** — la respuesta de cada punto está en [§ Los ocho puntos, respondidos](#los-ocho-puntos-respondidos).

1. **Extensión del modelo de amenazas** — un actor no humano en [security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza), que cubra la inyección de prompts, la exfiltración de modelo y el problema de concentración del principio 8 de [security.md § Principios de seguridad](../spec/security.md#principios-de-seguridad).
2. **Decisiones automatizadas y elaboración de perfiles** — una sección nueva en [compliance.md § Requisitos transversales de cumplimiento](../spec/compliance.md#requisitos-transversales-de-cumplimiento) que cubra el artículo 22 del RGPD, el artículo 20 de la LGPD, el estatus de los puntajes de apoyo y los datos del prompt como transferencia internacional.
3. **Modelo de auditoría** — un tipo de actor no humano, una relación de «en nombre de» y una regla de retención para prompts y respuestas coherente con la retención por niveles de la [ADR-016](016-cross-cutting-resolutions.md) §4.
4. **Postura sin conexión** — qué ve una persona en campo cuando una capacidad mediada por un agente no está disponible, y si alguna de esas capacidades puede siquiera situarse en un camino que la [ADR-005](005-offline-first-sync.md) exige que funcione sin conexión.
5. **Costo** — conciliación del costo por token de inferencia con [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma), incluido quién paga bajo BYOM y qué pasa en el nivel con modelo por defecto de la plataforma.
6. **El principio de la compuerta humana** — elevar *la máquina propone, la persona dispone* a principio transversal enunciado, con sus excepciones enumeradas en lugar de quedar implícitas.
7. **Datos compartimentados** — si un agente puede llegar a leer datos regidos por un contrato de intercambio bajo la [ADR-017](017-sharing-contract-trust-model.md), dado que la plataforma nunca es parte de un contrato.
8. **Pantalla de configuración de BYOM** — la pantalla a la que la [ADR-016](016-cross-cutting-resolutions.md) ya se comprometió, incorporada a los wireframes y al inventario de pantallas, con la advertencia sobre la frontera de cifrado ya especificada en [system.md § El arnés y el enrutador de modelos](../design/architecture/system.md#el-arnés-y-el-enrutador-de-modelos).

## La propuesta en revisión

Todo lo que contiene esta sección era una propuesta para que la revisión la evaluara. *Resuelta el 2026-11-26 — la revisión aceptó la tesis, acotada como registra [§ La revisión](#la-revisión). La sección se conserva tal como se escribió, como registro de lo que se evaluó.*

### Qué cambió desde que se abrió la revisión

Desde que se abrió esta ADR se aceptaron tres decisiones, cada una a propósito sin llegar al punto de decisión:

- La [ADR-019](019-central-services-and-metered-billing.md) agregó los servicios centrales, los derechos de uso por organización y la facturación medida por uso con traslado al costo.
- La [ADR-020](020-central-service-line-up-and-builders.md) nombró los cuatro servicios centrales y aceptó los constructores de texto. A un constructor de texto lo invoca una persona, lee solo lo que esa persona le entrega, devuelve un borrador y no puede enviar, así que no tiene ninguna de las cuatro propiedades que condicionan de arriba. Los constructores de imágenes y de video siguen propuestos hasta que esta ADR se acepte con el punto 6 respondido.
- La [ADR-021](021-content-approval-pipeline.md) generalizó la aprobación de publicaciones en un flujo de contenido revisado por rondas. Su primera versión también especificaba un programa para manejar creadores de contenido, y reservaba aquí las tres pantallas de IA de ese prototipo; las dos cosas se retiraron el mismo día.

### El arnés por organización, tal como está dibujado

El tablero de servicios de la alianza que recoge la [entrada 13 del diario](../diary/13-services-a-la-carte.md) dibuja un arnés de agentes por organización, dentro del enclave de cada una:

```
  Estrategia ─┐
  Base de     │
  conocim.  ──┼──► AGENTES (memoria, recup., ──► PERSONAS ──► Despacho de constructores
  Datos geo ──┤     habilidades, contexto,       (equipos,     (texto, imagen, video)
  CRM ────────┘     enrutador de modelos)         comités,
                                                  militancia,  ──► Despacho de salida
       Captura ──► (hacia cada organización)      voceros,         (correo, SMS,
       Análisis ─► (hacia cada organización)      candidaturas)    WhatsApp, redes)
                                                               ▲
                                          supresión mutua ─────┘ antes de cada envío
```

Tres propiedades del dibujo le importan a la revisión:

1. **El arnés es por organización.** Cada enclave tiene su propia estrategia, base de conocimiento, datos geográficos, CRM y agentes. Ningún agente lee las fuentes de otra organización, y la alianza no dibuja ningún arnés por encima de sus miembros.
2. **Los agentes alimentan a personas, y solo las personas despachan.** Toda flecha hacia el despacho de constructores y el despacho de salida sale de una persona. Ninguna flecha va del arnés a un envío.
3. **El arnés lee cuatro fuentes.** Eso es un alcance de lectura mayor que una sola funcionalidad, la primera propiedad que condiciona de arriba. El dibujo no dice otra cosa.

### Lo que la propuesta responde

Para tres de los ocho puntos de la revisión, y para una de sus cuatro propiedades que condicionan, el dibujo y las tres ADR nuevas aportan una respuesta propuesta. Cada una es para que la revisión la acepte, la enmiende o la rechace.

- **Punto 5, el costo.** El plano medido de la ADR-019: los costos de inferencia y de generación se trasladan a la organización al costo, sin margen; con BYOM, el proveedor propio de la organización le factura a ella directamente. Qué incluye el plan por defecto de la plataforma, y si el plan gratuito trae alguna asignación medida, sigue abierto, como lo dejó anotado la ADR-019. *Enmendado por la [ADR-026](026-two-lane-pricing.md): la medición de uso sigue respondiendo a este punto, pero «al costo, sin margen» ya no describe lo que paga un cliente. Cada carril le suma su propia regla de precio al costo medido, y qué incluye el «costo» queda abierto allí.*
- **La amplitud de las credenciales.** Los derechos de uso de la ADR-019: una credencial por organización y por servicio central. Un agente que actúe para una organización no podría tener credencial para un servicio que la organización no activó, y cada llamada suya sería un evento de uso medido con un actor. Esto acota lo que el arnés puede *llamar*. No acota lo que puede *leer* dentro de su propia organización, que es la pregunta abierta de más abajo.
- **Punto 6, la compuerta humana.** El principio propuesto es *la máquina propone, la persona dispone*, y el dibujo aporta su primera forma enumerada: **ningún agente despacha.** Un agente no tiene credencial para el transporte por canal ni para el despacho de constructores, y nada de lo que produce llega a un destinatario salvo por el envío de una persona. La ADR-020 y la ADR-021 ya lo aplican a los constructores y al flujo de contenido; la propuesta lo extiende a todo agente. Las demás formas y sus excepciones le toca enumerarlas a la revisión.
- **Punto 7, los datos compartimentados.** La respuesta propuesta: un agente lee datos compartimentados solo bajo el contrato de la persona que lo invocó, y nunca más de lo que esa persona podría leer. La investigación que entrega el servicio de análisis aterriza en el compartimento que nombra su contrato (ADR-019), y un agente invocado por alguien de fuera de ese compartimento no la puede ver. La propuesta además descarta por completo las lecturas en segundo plano de datos compartimentados. Una lectura en nombre de alguien se registra como lectura de esa persona, a través del agente, según [ADR-017 § Observabilidad: una distinción dentro de la escala de metadatos, no un peldaño nuevo](017-sharing-contract-trust-model.md#observabilidad-una-distinción-dentro-de-la-escala-de-metadatos-no-un-peldaño-nuevo).

### Lo que deja abierto

El dibujo no dice nada sobre cuatro puntos y vuelve más agudo uno de ellos.

- **El alcance de lectura.** Esta es la decisión central que tiene que tomar la revisión. El ejemplo desarrollado de más abajo lee el mensaje del propio candidato, los documentos de estrategia, la base de conocimiento y el calendario del candidato, y no llega a los registros de votantes. El arnés, tal como está dibujado, lee estrategia, base de conocimiento, datos geográficos y el CRM entero, puntajes de apoyo incluidos. La revisión tiene que decidir, fuente por fuente, hasta dónde puede leer un agente.
- **Punto 2, decisiones automatizadas y elaboración de perfiles.** La flecha del CRM hacia los agentes significa un agente leyendo puntajes de apoyo de votantes identificables. Es exactamente el caso que nombra el punto 2, y el dibujo lo vuelve concreto en vez de hipotético.
- **Punto 1, el modelo de amenazas; punto 3, el modelo de auditoría; punto 4, el funcionamiento sin conexión; punto 8, la pantalla de configuración de BYOM.** Sin respuesta. La relación «en nombre de» propuesta en el punto 7 es un comienzo para el punto 3, no una respuesta.

### El chat como las manos de la persona

Agregado el 2026-11-13. Como todo en esta sección, es una propuesta para que la revisión la acepte, la enmiende o la rechace.

La [ADR-023](023-surfaces-chat-admin-field.md) propone un Core headless (sin interfaz propia: todo es primero una operación de la API) con una superficie de chat pensada para cargar entre el 70 y el 80 % del trabajo diario del equipo. Ese chat lee a través de las funcionalidades, tiene credenciales e invoca operaciones. Es el agente que esta ADR condiciona, a la escala del producto entero y no de una sola funcionalidad.

La posición que la ADR-023 le manda a esta revisión es que el chat es las manos de la persona, no un segundo actor:

- **Actúa con el rol, los ámbitos y los contratos de intercambio de la propia persona que lo invoca.** Quien usa el chat no puede hacer nada que no pudiera hacer en la UI de administración.
- **Cada escritura la confirma la persona con un toque en una tarjeta.** Las lecturas no necesitan confirmación; las escrituras, siempre.
- **Nunca actúa en segundo plano.** Un resumen programado es una programación que fijó una persona, como la [ADR-020](020-central-service-line-up-and-builders.md) ya permite para los envíos.
- **El registro de auditoría anota a la persona como actor y al chat como canal.**
- **Los módulos declaran sus operaciones de chat en un manifiesto,** incluyendo cuáles son escrituras ([ADR-022 § El contrato de módulo](022-core-modules-and-lanes.md#el-contrato-de-módulo)). El modelo elige entre las operaciones declaradas y no puede inventar otras.

**Qué respondería, si se acepta.** Alcance de lectura: el ámbito de la persona. Capacidad de invocar herramientas: solo las operaciones declaradas. Acción autónoma: ninguna sin confirmación. El actor de auditoría del punto 3: la persona, con el chat como canal.

**En qué se diferencia del arnés tal como está dibujado.** El arnés lee cuatro fuentes por cuenta propia. El chat lee lo que puede leer la persona que lo invocó, cuando ella lo pide, y nada más. Eso acota el chat por la persona y no por la funcionalidad. Para una persona con un rol amplio el ámbito de la persona es amplio, puntajes de apoyo incluidos, así que el punto 2 queda tan concreto bajo esta posición como lo dejó el arnés.

**Qué no responde.** La inyección de prompts desde el contenido que el chat lee, como un artículo monitoreado o un mensaje entrante, que le corresponde al punto 1. Los puntos 2, 4 y 8. Y la retención de prompts y respuestas del punto 3.

### Ejemplo desarrollado: aprobar las publicaciones del día por WhatsApp

Una conversación de prototipo, compartida junto con el tablero de servicios de la alianza y trazada sobre él, muestra a un candidato que lleva un día de redes sociales desde WhatsApp. Aquí se propone como funcionalidad acotada, la primera que se evalúa bajo esta revisión, y no está aceptada.

**Qué hace.** Al empezar el día, el Agente de Campaña de la organización le escribe al candidato por WhatsApp y le pregunta en qué enfocarse. El candidato contesta con una nota de voz: el tema, el tono y una entrevista más tarde esa mañana. El agente la transcribe, lee la estrategia de la organización, su base de conocimiento y el calendario del candidato, y le devuelve en un PDF los puntos de mensaje para la entrevista. Después recomienda cuatro piezas para redes sociales, cada una con su red y la hora a la que saldría. Cada pieza llega como su propia tarjeta de WhatsApp con tres botones: Aprobado, Pedir cambios y Descartar. Las piezas aprobadas entran a la programación. Más tarde, alguien del equipo revisa las imágenes en GreenGrass y pide cambios en dos piezas. El agente los hace y le manda las segundas versiones al candidato, que las aprueba desde WhatsApp. Cada pieza se publica a su hora, y el agente avisa cuando sale.

**Dónde toca el punto de decisión.** En seis lugares, cada uno para que la revisión lo decida:

1. **El alcance de lectura.** El agente lee la estrategia, la base de conocimiento y el calendario: más que una sola funcionalidad, la primera propiedad que condiciona. No lee registros de votantes, lo que lo pone entre los dos extremos de la pregunta sobre el alcance de lectura de más arriba.
2. **Habla primero.** El agente abre la conversación a una hora fija, antes de que nadie le pida nada: acción autónoma, la tercera propiedad que condiciona. WhatsApp agrega su propia regla, porque un mensaje que inicia la empresa fuera de la ventana de 24 horas tiene que ser una plantilla preaprobada ([integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api)).
3. **Las imágenes generadas.** Las piezas llevan imágenes generadas, y los constructores de imágenes están propuestos, no aceptados ([ADR-020](020-central-service-line-up-and-builders.md)). Si una pieza muestra al candidato, es la pregunta sobre la persona identificable que queda anotada más abajo.
4. **Quién despacha.** El agente programa lo que el candidato aprobó, y la propuesta de arriba dice que ningún agente despacha. La revisión tiene que decidir si el toque en Aprobado de una persona, atado a una versión de una pieza a una hora, cuenta como el envío de esa persona, y el agente solo la coloca en la programación.
5. **Los cambios después de la aprobación.** El equipo cambia una pieza que el candidato ya aprobó. La [ADR-021](021-content-approval-pipeline.md) dice que la aprobación cubre una ronda y que no se publica nada sin aprobar. La revisión tiene que confirmar que el agente queda atado a la misma regla cuando la versión nueva no está aprobada a su hora.
6. **La auditoría.** Cada aprobación tiene que registrar al candidato como actor y al agente como el canal por el que pasó. El modelo de auditoría todavía no tiene un actor no humano (punto 3).

**Límites propuestos:**
- **Alcance de lectura:** los mensajes del candidato, los documentos de estrategia y la base de conocimiento que la organización designe, y el calendario. Ni contactos, ni registros de votantes, ni donaciones, ni otros mensajes.
- **Nada sale sin un toque:** toda pieza publicada lleva la aprobación de una persona con nombre para esa versión exacta. Una versión nueva la anula.
- **Sin capacidad de invocar herramientas más allá de la programación:** el agente puede colocar una pieza aprobada en la programación y nada más. No tiene credencial para publicar, ni para el transporte por canal más allá de su propia conversación con el candidato.
- **Credenciales:** el proveedor BYOM de la organización o el de la plataforma por defecto, bajo un derecho de uso, y el número de WhatsApp Business propio de la organización.
- **Citas obligatorias:** los puntos de mensaje citan los pasajes de la base de conocimiento en que se apoyan, según la regla de procedencia de [comms-intelligence.md § 8.2 La procedencia es obligatoria](../spec/comms-intelligence.md#82-la-procedencia-es-obligatoria).
- **Un camino sin el agente:** el equipo puede redactar las mismas piezas y el candidato puede aprobarlas en las pantallas propias del flujo de contenido.

**Una presentación lo corre.** [demo.md](../spec/demo.md) documenta una demostración que funciona de este ejemplo, construida fuera del corpus para abrirle la puerta a GreenGrass con candidaturas. Corre del lado de la experimentación del punto de decisión y dentro de los límites de arriba, y no acepta nada de lo que hay aquí.

### Preguntas anotadas por ADR posteriores

*Respondidas el 2026-11-26: las dos de la ADR-020 en [§ Las propuestas en revisión, resueltas](#las-propuestas-en-revisión-resueltas); las doce de la ADR-028 en [ADR-028 § The review's answers](028-coaching.md#las-respuestas-de-la-revisión).*

- **De la ADR-020:** si un constructor de imágenes o de video puede retratar alguna vez a una persona real e identificable, y qué identificación como contenido generado debe llevar una imagen o un video generado cuando se publica. Corresponden al punto 6 y, en lo que toca a la divulgación, a la sección de cumplimiento del punto 2.
- **De la ADR-028:** doce preguntas sobre los coaches, enumeradas en [ADR-028 § Questions sent to the ADR-018 review](028-coaching.md#preguntas-enviadas-a-la-revisión-de-la-adr-018). La primera decide si un coach que lee solo la conversación, los adjuntos y los documentos que una organización designó para él queda fuera del punto de decisión. Las demás tratan de leer registros, hablar de personas con nombre, actuar, los resúmenes del día, la conservación, la inyección de prompts, el trabajo sin conexión, el costo, los contratos, el proveedor del modelo y si un coach es el chat. El Coaching es parte del Core, así que el punto de decisión lo abarca en los dos carriles.

## La revisión

Celebrada el 2026-11-26, después de que el cambio de dirección de noviembre zanjara lo que la revisión necesitaba delante: dos carriles, un Core headless y el chat propuesto como superficie principal. La revisión aceptó esta ADR y respondió sus ocho puntos. Esta sección registra lo que se decidió y lo que queda abierto; el mecanismo está especificado en [spec/harness.md](../spec/harness.md).

### La tesis: el Core es un arnés de agentes por cliente

Decidido.

- **El Core es un arnés de agentes por cliente.** Un arnés por instancia, dentro del enclave de la propia organización; nunca de varias organizaciones ([ADR-025](025-identity-per-client.md)). Lee fuentes designadas, solo tiene las credenciales para las que la organización tiene derechos de uso ([ADR-019](019-central-services-and-metered-billing.md)), y llega a la acción solo a través de operaciones declaradas en los manifiestos de los módulos ([ADR-022 § El contrato de módulo](022-core-modules-and-lanes.md#el-contrato-de-módulo)). Las cinco funcionalidades de IA aceptadas quedan como configuraciones acotadas del arnés, con sus límites sin cambiar.
- **El chat es la interfaz principal del arnés, y actúa como las manos de la persona.** Se adopta la posición que propuso la [ADR-023](023-surfaces-chat-admin-field.md): el arnés actúa con el rol, los ámbitos y los contratos de intercambio de la propia persona que lo invoca; las lecturas no necesitan confirmación, las escrituras siempre; nunca actúa en segundo plano; el registro de auditoría anota a la persona como actor y al chat como canal; el modelo elige solo entre operaciones declaradas y no puede inventar otras.
- ***La máquina propone, la persona dispone* es un principio transversal enunciado.** Sus formas: (a) **ningún agente despacha** —nada llega a un destinatario salvo por el envío de una persona o una programación que una persona fijó; (b) **cada escritura la confirma la persona** en el momento en que ocurre; (c) **las excepciones se enumeran**, no se dejan implícitas —las compuertas humanas de las cinco funcionalidades aceptadas son la enumeración.

Una capacidad que se mantiene dentro de esta postura —el alcance de la persona, operaciones declaradas, escrituras confirmadas, credenciales con derecho de uso, el enrutador de modelos de más abajo— no necesita ninguna revisión más. Cualquier cosa más allá es una ADR nueva.

### Alcance de lectura

Decidido, por fuente. La pregunta central que esta ADR dejaba abierta.

- **Lecturas interactivas: el alcance de la persona que lo invoca.** El arnés lee lo que esa persona puede leer, en el momento en que lo pide —el CRM, los puntajes de apoyo, los totales de donaciones, todo lo que su rol y sus contratos incluyen. Esto deja sin efecto el «lee cuatro fuentes por cuenta propia» del dibujo: el arnés no tiene alcance de lectura propio. Una persona cuyo rol incluye los puntajes de apoyo puede preguntarle al arnés por ellos, lo que vuelve concreto el punto 2; recibe su respuesta de cumplimiento más abajo, no una prohibición de lectura.
- **Fuentes designadas: un acto de la organización, no de una persona.** La organización designa los corpus en los que el arnés se puede anclar sin importar el alcance de quien lo invoca —los documentos de estrategia, la base de conocimiento, la capa de contexto ([ADR-028](028-coaching.md)), los datos geográficos— por audiencia: para toda la organización, por rol, por coach. La designación es un acto del OA, registrado, y la lista completa está en un solo lugar que el cliente puede auditar.
- **Datos compartimentados.** Responde el punto 7: el arnés lee datos compartimentados solo bajo el contrato de intercambio de la persona que lo invocó, nunca más de lo que esa persona podría leer, y nunca en segundo plano. Una lectura en nombre de alguien se registra como lectura de esa persona a través del arnés —la distinción dentro de la escala de metadatos que aporta [ADR-017 § Observabilidad](017-sharing-contract-trust-model.md#observabilidad-una-distinción-dentro-de-la-escala-de-metadatos-no-un-peldaño-nuevo), no un peldaño nuevo. La regla de la vía de lectura de superusuario prohibida de [comms-intelligence.md § 8.5](../spec/comms-intelligence.md#85-acceso-y-retención) vincula al arnés de forma absoluta, operadores y soporte incluidos.
- **Lecturas en segundo plano: solo para programaciones que una persona fijó.** Un resumen del día o un resumen puede prepararse en segundo plano, leyendo solo fuentes designadas y lo que la persona suscriptora puede leer, evaluado bajo su alcance en el momento de la preparación. Nunca datos compartimentados. Cada lectura en segundo plano se remonta a una programación que una persona fijó —la primera forma de la compuerta humana aplicada a las lecturas.
- **Exclusiones y la regla entre organizaciones.** El arnés nunca lee credenciales, llaves ni secretos; los mensajes privados de una persona que no están dirigidos a quien lo invoca ni compartidos con ella; nada que la política de un carril marque como prohibido. Y nunca se mete en la instancia de otra organización. El material entre organizaciones llega solo como eventos filtrados por contrato en el bus ([ADR-024](024-event-bus-as-federation.md)) —filtrado en el origen, campo por campo, denegación por defecto— y una vez entregado queda en esta instancia bajo el contrato con el que llegó, leído solo bajo la regla de datos compartimentados de arriba. El arnés de una alianza lee la propia instancia de la alianza, nunca el enclave de un miembro; no se dibuja ningún arnés por encima de los miembros. Los manifiestos siguen declarando el alcance de lectura de cada módulo como exige la [ADR-022](022-core-modules-and-lanes.md); estas son las reglas contra las que se miden esas declaraciones.

### Soberanía de proveedores: el enrutador de modelos

Decidido.

- **Un enrutador de modelos por organización es el único camino a un modelo.** Cada llamada a un modelo —chat, coaches, constructores, traducción, concierge— pasa por el enrutador de esa organización. Ninguna funcionalidad llama directamente a un proveedor. El enrutador guarda la política de proveedores de la organización, elige proveedor y modelo en cada llamada, y cada llamada es un evento de uso medido con un actor ([ADR-019](019-central-services-and-metered-billing.md)).
- **La política de proveedores es por organización.** BYOM sigue en pie ([ADR-016](016-cross-cutting-resolutions.md) §38) y llega a cualquier endpoint que la organización nombre, incluido un modelo autoalojado, así que la inferencia puede quedarse por completo dentro de la infraestructura propia de la organización. El proveedor por defecto de la plataforma se mide y se cobra según la regla del carril ([ADR-026](026-two-lane-pricing.md)). Reglas de enrutado por clase de datos: la organización, con los valores por defecto que pone el carril, dice qué proveedores pueden llevar qué clases —el material de corpus público puede ir a una API externa; los prompts con datos personales solo a proveedores que cumplen las reglas de residencia de la organización; los datos compartimentados nunca salen de la frontera de cifrado de la organización y solo llegan a endpoints dentro de esa frontera.
- **Requisitos permanentes para cualquier proveedor,** BYOM o de la plataforma: no entrenar con los prompts ni los datos de la organización; límites de conservación declarados; declarado como subencargado donde la ley lo exija; y la advertencia de la frontera de cifrado de [system.md § El arnés y el enrutador de modelos](../design/architecture/system.md#el-arnés-y-el-enrutador-de-modelos) mostrada al configurar, en lenguaje llano.
- **La pantalla de ajustes existe.** Responde el punto 8: una pantalla en la UI de administración —una pantalla SET nueva, con su entrada en el inventario de pantallas y su wireframe— para proveedores, credenciales, reglas de enrutado por clase de datos, la advertencia de la frontera y la medición actual. Las credenciales viven en el almacén de llaves de la organización como cualquier otra credencial propia.

### Auditoría

Decidido. Responde el punto 3.

- **Persona = actor, arnés = canal; nunca se añade un tipo de actor no humano.** Cada lectura y escritura mediada por el arnés registra a la persona como actor, al componente del arnés como canal (el chat, un coach nombrado, un constructor), la operación del manifiesto invocada, y para las escrituras la referencia de confirmación. La revisión responde al tipo de actor no humano del punto con una negativa: el arnés nunca actúa, las personas actúan a través de él. El visor de auditoría de [settings.md § SET-018](../design/ux/04-wireframes/settings/settings.md#set-018-audit-trail-viewer) gana una faceta de canal.
- **«En nombre de» es un campo de disparador,** no una relación nueva: cada entrada registra a qué respondía el arnés —la petición de una persona, un toque de confirmación o una programación que una persona fijó. Un resumen del día programado registra a la persona suscriptora como actor, al arnés como canal y a su programación como disparador.
- **Los prompts y las respuestas caen en los niveles existentes de la [ADR-016](016-cross-cutting-resolutions.md) §4; sin nivel nuevo.** Los cuerpos van al nivel Operacional (configurable por el OA entre 90 días y 5 años, 2 años por defecto, purgados como los cuerpos de mensajes). Los metadatos de la llamada van al nivel de registro de auditoría, indefinidos: quién preguntó, canal, proveedor y modelo, versión de la política del enrutador, tokens y costo, operación, referencia de confirmación. La conservación del lado del proveedor está acotada por los requisitos permanentes de arriba.
- **La promesa de explicabilidad de la ADR-016 §49 queda enmendada.** Las sugerencias basadas en reglas siguen mostrando su regla y sus entradas. La salida de un modelo muestra procedencia en su lugar: las fuentes designadas y el contexto en que se apoyó, la operación, el modelo y el proveedor, y citas donde afirma hechos —[comms-intelligence.md § 8.2](../spec/comms-intelligence.md#82-la-procedencia-es-obligatoria). El personal siempre puede ver en qué se apoyó, nunca una cadena de razonamiento ficticia.

### El modelo de amenazas

Decidido. Responde el punto 1; especificado en [security.md § The agent harness](../spec/security.md#el-arnés-de-agentes) y [§ Prompt injection](../spec/security.md#inyección-de-prompts).

- **El arnés es una superficie de ataque, no un principal.** Entra al modelo de amenazas como el delegado confundido: un atacante lo dirige, a través del contenido que lee, para que abuse del alcance de una persona legítima, o engaña a una persona para que confirme una mala acción. Nunca es un actor confiable —no tiene alcance propio.
- **La inyección de prompts es una amenaza nombrada, con contramedidas arquitectónicas.** Vectores: artículos y publicaciones monitoreados, mensajes y correos entrantes, importaciones de CSV, páginas web y eventos del bus de contrapartes —un dato entregado bajo contrato es adversarial si la otra organización está comprometida. Contramedidas: el contenido no confiable es dato, nunca instrucciones; la inyección puede proponer, nunca disponer —un arnés dirigido sigue teniendo solo operaciones declaradas, y cada escritura necesita un toque, con la tarjeta de confirmación mostrando la operación y su destino en lenguaje llano; los intentos quedan registrados.
- **La exfiltración de modelo está acotada por el enrutado, no por la vigilancia.** Las reglas por clase de datos hacen que los datos compartimentados nunca lleguen a un endpoint externo y que los datos personales solo lleguen a proveedores que cumplen las reglas de residencia; un arnés dirigido no puede exfiltrar lo que no puede enrutar. Las credenciales de proveedor de la organización están en su almacén de llaves.
- **El problema de concentración está diseñado para no existir.** El principio 8 sigue en pie porque el arnés no es una credencial, una llave ni una persona, y no tiene ninguna: un derecho de uso por organización y por servicio, sin alcance de lectura propio, sin alcance entre organizaciones, sin vía de despacho.

### Cumplimiento

Decidido. Responde el punto 2; especificado en [compliance.md § Automated processing and the harness](../spec/compliance.md#procesamiento-automatizado-y-el-arnés).

- **La plataforma no toma decisiones significativas únicamente automatizadas, y el arnés lo mantiene así.** Los puntajes de apoyo son elaboración de perfiles anterior al arnés: calculados por reglas, leídos solo bajo el alcance de quien lo invoca, con la base jurídica y el análisis del artículo 22 del RGPD / artículo 20 de la LGPD a cargo de la organización como responsable del tratamiento. La plataforma garantiza, como encargada: las personas deciden; cada acción se remonta a una persona; la procedencia es inspeccionable; la supresión y la exportación llegan a los cuerpos de prompts y respuestas. El rechazo del filtrado automático de contenido de la [ADR-009](009-compliance-legal.md) sigue intacto.
- **Un prompt que lleva datos personales a un endpoint externo es una transferencia transfronteriza, y el enrutado es el mecanismo de cumplimiento.** Las reglas por clase de datos son las decisiones de transferencia de la organización expresadas como configuración; el enrutador las hace cumplir; el registro de auditoría anota proveedor, modelo y versión de la política en cada llamada —el registro de transferencias de la organización. Los datos compartimentados nunca cruzan. La advertencia al configurar es la declaración en lenguaje llano de que la transferencia existe.
- **Los proveedores de modelos son subencargados del tratamiento.** El DPA y la lista de subencargados de la plataforma nombran a los proveedores por defecto; un proveedor BYOM es subencargado de la propia organización, declarado por ella. Las organizaciones reciben un documento permanente del manejo de datos del arnés: las reglas de alcance de lectura, el enrutado, la conservación y las garantías de la compuerta humana, legible por sus oficiales de cumplimiento y por las autoridades electorales.

### Sin conexión y costo

Decidido. Responde los puntos 4 y 5.

- **Ningún paso del arnés está en un camino que deba funcionar sin conexión.** Trabajo de campo, inscripción de votantes, registro de entrada a eventos, resultados de observadores electorales, sincronización: los caminos de la [ADR-005](005-offline-first-sync.md) no tienen ningún paso mediado por el arnés. Un manifiesto no puede declarar una capacidad de campo que dependa de una llamada a un modelo.
- **La indisponibilidad degrada de forma explícita.** Las superficies del arnés dicen claramente «necesita conexión»; las conversaciones en caché siguen legibles; la UI de administración y la app de campo no se ven afectadas. No existen escrituras en cola por diseño —cada escritura se confirma en vivo, así que no hay nada que encolar. Un resumen programado que falta está visiblemente ausente, no en silencio.
- **Costo: resuelto por la [ADR-026](026-two-lane-pricing.md).** La inferencia es un evento de uso medido, con precio según la regla de cada carril; con BYOM el proveedor le factura directamente a la organización. Con el chat como superficie principal, la inferencia es un costo del trabajo diario ordinario, no uno marginal —las reglas de precio de los carriles la tratan como una línea del estado de cuenta. Lo que queda —qué incluye el «costo», las comisiones, lo que incluye el plan por defecto de la plataforma, el plan gratuito— sigue abierto en la ADR-026, que es donde le toca.

### Los ocho puntos, respondidos

| # | Punto | Respuesta |
|---|---|---|
| 1 | Extensión del modelo de amenazas | El arnés entra en [security.md § The agent harness](../spec/security.md#el-arnés-de-agentes) como superficie de ataque, no como principal; la inyección de prompts queda nombrada con contramedidas arquitectónicas; la concentración está diseñada para no existir |
| 2 | Decisiones automatizadas y elaboración de perfiles | [compliance.md § Automated processing and the harness](../spec/compliance.md#procesamiento-automatizado-y-el-arnés): sin decisiones significativas únicamente automatizadas; los puntajes de apoyo quedan como análisis de la organización como responsable; los prompts son transferencias, enrutados y registrados |
| 3 | Modelo de auditoría | Persona = actor, arnés = canal; un campo de disparador, no una relación nueva; prompts y respuestas en los niveles existentes de la [ADR-016](016-cross-cutting-resolutions.md) §4; la promesa de §49 enmendada a procedencia |
| 4 | Postura sin conexión | Ningún paso del arnés en un camino sin conexión; degradación explícita de «necesita conexión»; sin escrituras en cola |
| 5 | Costo | Resuelto por la [ADR-026](026-two-lane-pricing.md): medido bajo [ADR-019](019-central-services-and-metered-billing.md), precio por regla del carril, BYOM facturado directo; la aritmética sigue abierta en la ADR-026 |
| 6 | El principio de la compuerta humana | Enunciado: ningún agente despacha; cada escritura confirmada en el momento en que ocurre; excepciones enumeradas |
| 7 | Datos compartimentados | Solo bajo el contrato de la persona que lo invoca, nunca más de lo que ella podría leer, nunca en segundo plano, registrado como lectura suya |
| 8 | Pantalla de configuración de BYOM | Debida: una pantalla SET nueva, con su entrada en el inventario y su wireframe, con la advertencia de la frontera y la medición |

### Las propuestas en revisión, resueltas

- **El arnés por organización, tal como está dibujado,** queda aceptado, acotado por la posición de las manos de la persona. Dos de las tres propiedades del dibujo se mantienen: el arnés es por organización, y los agentes alimentan a personas mientras solo las personas despachan. La tercera no: el arnés no lee ninguna fuente por cuenta propia —lee lo que la persona que lo invoca puede leer, más lo que la organización designó.
- **El chat como las manos de la persona** queda aceptado, como registra la tesis de arriba.
- **El ejemplo desarrollado pasa el punto de decisión** como funcionalidad acotada bajo sus límites enunciados. Sus seis lugares de contacto: (1) su alcance de lectura es una designación válida más los mensajes del propio candidato; (2) hablar primero es una programación que el candidato fijó, y la regla de plantillas de WhatsApp no cambia; (3) las imágenes generadas siguen la respuesta sobre constructores de imágenes de abajo; (4) el toque del candidato en Aprobado es el envío de esa persona, y el agente solo coloca la pieza en la programación; (5) una versión nueva anula la aprobación, y el agente queda atado —si no está aprobada a su hora, la pieza no sale; (6) cada aprobación registra al candidato como actor y al agente como canal.
- **Las dos preguntas de la ADR-020 quedan respondidas.** Los constructores de imágenes y de video son mecánicamente idénticos a los de texto —los invoca una persona, leen lo que ella les entrega, devuelven un borrador, nada envían— así que quedan fuera del punto de decisión y aceptados en los mismos términos. Un constructor puede retratar a una persona real e identificable solo con el consentimiento documentado de esa persona, registrado y adjunto al recurso. Los medios generados que se publican llevan metadatos de procedencia —generado, modelo, fecha— y una identificación visible como contenido generado donde muestren a una persona real o la ley lo exija; un carril puede exigir más.
- **Las doce preguntas de la ADR-028 quedan respondidas** en [ADR-028 § The review's answers](028-coaching.md#las-respuestas-de-la-revisión). La que sostiene las demás: leer los documentos de contexto que una organización designó para un coach no es alcance de lectura más amplio que una sola funcionalidad, porque la designación es un acto deliberado y registrado de la organización. El coach acotado no tiene ninguna de las cuatro propiedades condicionadas y puede salir.

### Lo que queda abierto

- **La aritmética de los precios.** Qué incluye el «costo», cómo se calcula cada comisión, qué incluye el plan por defecto de la plataforma, si algún plan gratuito lleva saldo medido —preguntas abiertas de la [ADR-026](026-two-lane-pricing.md), que es donde les toca.
- **Las dos preguntas de producto de la ADR-028.** Quién puede escribir un coach —ahora también una pregunta de seguridad, porque las instrucciones escritas por la organización son confiables por designación— y quién escribe y mantiene el conocimiento sobre organización del que se nutren los coaches.
- **Las pantallas debidas.** La pantalla de ajustes de proveedores (punto 8), la faceta de canal del visor de auditoría, y las entradas en el inventario de pantallas y en los wireframes que las dos necesitan.
- **Las preguntas abiertas de la ADR-022** quedan intactas: un nombre para el Core, el acceso de operadores por carril, el bus de eventos en lugar de la capa de federación, el padrón electoral como módulo del carril político, Parsons como capa de conectores, y qué pasa con los datos de un módulo desactivado.

## Consecuencias

**Beneficios:**
- La revisión es un ejercicio de lectura ahora y una migración después. El corpus son 89 documentos en inglés y nada de código; después del piloto es un sistema vivo con un padrón electoral, registros de donaciones y notas de trabajo de campo sobre la política de personas identificables
- El punto de decisión es explícito y citable, así que el trabajo con agentes no puede llegar a cuentagotas por cinco decisiones de producto separadas, que es exactamente como llegó la IA
- Las cinco funcionalidades de IA aceptadas quedan desbloqueadas, así que nada de lo ya especificado espera por esto
- Tres inconsistencias de larga data quedan registradas donde se ven

**Costos:**
- El proyecto declaró terminadas la especificación y el diseño. Esto los reabre, y el estado de fase en `README.md` y `CLAUDE.md` tiene que decirlo
- Cualquier capacidad basada en agentes se retrasa lo que dure la revisión
- Una ADR `Propuesta` es un estado nuevo en este corpus —todas las demás están `Aceptada`— y hay que impedir que se lea como si estuviera zanjada

**Restricciones:**
- La plataforma nunca es parte de un contrato de intercambio ([ADR-017](017-sharing-contract-trust-model.md)), así que a ningún agente se le puede dar una vía de lectura que un contrato no conceda
- La regla de que no existe vía de lectura de superusuario en [comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención) obliga a cualquier diseño futuro de agentes, sin excepción por soporte ni por depuración
- Que las organizaciones sean dueñas de sus credenciales ([integrations.md § Principios de integración](../spec/integrations.md#principios-de-integración)) vale para los proveedores de modelos igual que para cualquier otra integración
- Esta ADR no agrega ninguna capacidad nueva ni revierte ninguna decisión aceptada. Deja registrado un punto de decisión y las preguntas que hay detrás

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (modelo de amenazas por extender), [ADR-004](004-data-model-integrity.md) (registro de auditoría por extender), [ADR-005](005-offline-first-sync.md) (restricción de trabajo sin conexión), [ADR-009](009-compliance-legal.md) (filtrado automático rechazado), [ADR-010](010-internationalization-localization.md) (traducción con IA y revisión), [ADR-012](012-external-integrations.md) (precedente de no dar visibilidad a terceros), [ADR-013](013-analytics-ai.md) (mensajes con IA; elección de modelo sustituida), [ADR-014](014-volunteer-onboarding.md) (concierge de IA), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, reasignación basada en reglas §49, retención por niveles §4), [ADR-017](017-sharing-contract-trust-model.md) (los contratos rigen toda frontera), [ADR-019](019-central-services-and-metered-billing.md) (el punto del costo y la frontera de credenciales, propuestos), [ADR-020](020-central-service-line-up-and-builders.md) (constructores de texto aceptados fuera del punto de decisión; imágenes y video esperan al punto 6), [ADR-021](021-content-approval-pipeline.md) (el flujo de contenido al que entrarían las piezas de un agente; su pregunta sobre la aprobación por WhatsApp apunta aquí), [ADR-022](022-core-modules-and-lanes.md) (el Core y sus dos carriles; el manifiesto de un módulo declara su situación frente al punto de decisión), [ADR-023](023-surfaces-chat-admin-field.md) (el punto de decisión abarca todo el Core; la posición sobre el chat, propuesta a esta revisión), [ADR-026](026-two-lane-pricing.md) (el punto del costo: la medición se mantiene, «sin margen» no), [ADR-028](028-coaching.md) (el Coaching es parte del Core; doce preguntas enviadas a esta revisión)
