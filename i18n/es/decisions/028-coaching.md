# ADR-028: Coaching

**Estado:** Propuesta
**Fecha:** 2026-11-25
**Actualizada:** 2026-11-26 — la revisión de la [ADR-018](018-ai-agent-posture.md) respondió las doce preguntas que esta ADR envió. El coach acotado no tiene ninguna de las cuatro características condicionadas y puede salir; los resúmenes del día, las acciones recomendadas, actuar desde un coach y leer registros están permitidos bajo la postura y siguen siendo trabajo de producto sin especificar. Las respuestas están en § Las respuestas de la revisión. El estado no cambia: quién puede escribir un coach y quién mantiene el conocimiento sobre organización siguen abiertos.
**Fuentes:** `spec/coaching.md`, `spec/users.md`, `spec/support.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`, `decisions/005-offline-first-sync.md`, `decisions/013-analytics-ai.md`, `decisions/014-volunteer-onboarding.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`, `decisions/026-two-lane-pricing.md`

## Contexto

El 2026-11-24 se le mostró al proyecto el entorno de prueba de un producto de organización distribuida. Le da a cada rol un coach de IA. Un coach de gestión de la organización ocupa la parte de arriba de la página de inicio del administrador, bajo la pregunta «¿Qué necesitas resolver hoy?», con sugerencias como *Un grupo está atascado* y *Puntos de mensaje para un anuncio*. Un coach para líderes de grupo le responde a una líder que cuenta que un miembro vino a hablarle en privado, y se lo explica con la idea de un autor, con nombre, sobre cómo se forman los grupos. La organización puede escribir coaches propios. Una capa de contexto que fija la organización (misión, marca, salvaguardas) informa a todos los coaches. Alrededor de los coaches hay un resumen del día, una lista ordenada de acciones recomendadas con los botones *Añadir tarea* y *Contactar*, entrada por voz, conversaciones anteriores, un botón para compartir y un aviso de que los coaches usan IA y pueden equivocarse.

El corpus decidió sobre IA cinco veces ([ADR-018 § Context](018-ai-agent-posture.md#contexto)). Dos de esas decisiones se parecen a un coach y no lo son. El concierge de IA ([ADR-014](014-volunteer-onboarding.md#concierge-de-soporte-con-ia-primero-y-escalamiento-a-personas)) ayuda con la plataforma y está anclado estrictamente en la base de conocimiento. Un constructor de texto ([ADR-020](020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos)) convierte un encargo en un borrador. Nada en el corpus ayuda a una persona a pensar su propio trabajo: cómo llevar una reunión, qué hacer con un grupo que se estancó, qué decir en un anuncio.

Lo más parecido es el chat de la [ADR-023](023-surfaces-chat-admin-field.md#el-chat-como-las-manos-de-la-persona). Un coach tiene su misma forma, una conversación con un modelo, y buena parte del coaching del entorno de prueba necesita exactamente lo que necesita el chat: leer a través de funcionalidades, actuar sobre registros, hablar primero. Ese es el agente que la revisión de la ADR-018 existe para resolver.

Esta ADR está `Propuesta`. Dos cosas en ella están decididas, y van marcadas.

| Punto | Situación |
|---|---|
| El Coaching es parte del Core | Decidido |
| El nombre: *Coach*, en inglés y en español | Decidido |
| Qué es un coach, y en qué se distingue del concierge, los constructores y el chat | Propuesto |
| Los coaches del rol y los coaches que escribe la organización | Propuesto |
| El coach acotado | Decidido, y fuera del punto de decisión ([ADR-018 § The review](018-ai-agent-posture.md#la-revisión)) |
| La capa de contexto de la organización | Propuesto |
| Resúmenes del día, acciones recomendadas, actuar desde un coach, leer registros | Respondidos por la revisión; permitidos bajo la postura, todavía sin especificar |
| Quién puede escribir un coach; quién escribe y mantiene el conocimiento sobre organización del que se nutren los coaches | Abierto |

### Conflictos que resuelve esta ADR

1. **[ADR-022 § What the Core contains](022-core-modules-and-lanes.md#qué-contiene-el-core)** no menciona el coaching. Esta ADR lo añade, como decidido. El Core tiene que seguir siendo neutral respecto al carril, y el coaching lo es: lo que un coach sabe sobre organizar es contexto del cliente y configuración del carril, no del Core.
2. **[system.md § AI concierge](../design/architecture/system.md#concierge-de-ia)** ancla el concierge estrictamente en la base de conocimiento y la documentación de la plataforma, «sin razonamiento más amplio ni conocimiento externo». El coach del entorno de prueba se nutre de conocimiento general sobre cómo funcionan los grupos. La regla del concierge sigue en pie tal como está escrita, para el concierge. El anclaje del coach se propone más abajo y es otra regla.
3. **[users.md § Volunteer Team Lead](../spec/users.md#líder-de-equipo-de-voluntarios)** es un rol de campo para una operación: un día de puerta a puerta, un banco telefónico. La líder de grupo del entorno de prueba lleva un grupo local estable durante meses. Ningún rol del corpus describe eso. Se nombra y no se resuelve: esta ADR les da coaches a los roles que existen y no añade ninguno.
4. **[ADR-018 § No agent capability reaches production until this ADR is accepted](018-ai-agent-posture.md#ninguna-capacidad-de-agente-llega-a-producción-hasta-que-se-acepte-esta-adr)** condiciona tres características que tiene el coaching del entorno de prueba. El resumen del día y las recomendaciones leen grupos, historial de contacto y estado de la puesta en marcha: alcance de lectura más amplio que una sola funcionalidad. *Añadir tarea* y *Contactar* actúan: capacidad de invocar herramientas. El resumen aparece antes de que nadie lo pida: acción autónoma. El punto de decisión sigue en pie. Esta ADR divide el coaching en un coach acotado, dibujado para no tener ninguna de las cuatro características, y el resto, que espera.
5. **La [ADR-016](016-cross-cutting-resolutions.md) §49** se compromete a que «el personal pueda ver exactamente por qué se hizo una sugerencia», y por eso hizo basadas en reglas las sugerencias de reasignación de la v1. Las acciones recomendadas por un modelo no pueden cumplir ese compromiso tal como está escrito. Se nombra, y se envía a la revisión junto con las recomendaciones.

## Decisión

### El Coaching es parte del Core

**Decidido.** Toda instancia tiene Coaching, en los dos carriles, como toda instancia tiene el CRM.

La razón es la postura ante los agentes. El Coaching es donde la mayoría de las personas se va a encontrar con lo que resuelva la [ADR-018](018-ai-agent-posture.md): alcance de lectura, capacidad de invocar herramientas, autonomía, auditoría. Si el coaching fuera un módulo, cada cliente que lo activara cargaría su propia versión de esas reglas, y las reglas podrían separarse entre lo que hace el chat y lo que hace un coach. En el Core, el coaching se construye sobre la misma postura que el chat y cambia cuando cambia la postura. Es el razonamiento del CRM aplicado a la IA: un solo lugar donde la regla se cumple, para que no se respete en un sitio y se ignore en otro.

Lo que se sigue de eso:

- **El Core nunca depende de un módulo** ([ADR-022](022-core-modules-and-lanes.md)). Si algún día se permite que un coach lea los datos de un módulo, los lee a través de las operaciones que el módulo declara en su manifiesto, y solo cuando el módulo está activado.
- **Estar en el Core no pone al coaching del otro lado del punto de decisión.** El punto de decisión de la ADR-018 abarca todo el Core ([ADR-023 § The ADR-018 gate binds the whole Core](023-surfaces-chat-admin-field.md#el-punto-de-decisión-de-la-adr-018-abarca-todo-el-core)). Antes de la revisión solo puede salir lo que no tiene ninguna de las cuatro características condicionadas.
- **El costo se mide por uso.** Cada turno es una llamada de inferencia, medida bajo la [ADR-019](019-central-services-and-metered-billing.md) y cobrada según la regla de precio de cada carril ([ADR-026](026-two-lane-pricing.md)), o facturada al cliente por su propio proveedor bajo BYOM ([ADR-016](016-cross-cutting-resolutions.md) §38).

**Alternativas consideradas:** El coaching como módulo del catálogo se descartó por la razón de arriba: un módulo que en la práctica es un agente repetiría la postura ante los agentes cliente por cliente. El coaching como módulo del carril político se descartó porque el mecanismo es neutral respecto al carril. Los equipos de cuenta de un cliente comercial también tienen roles y oficio. Fundir los coaches en el chat, sin un concepto aparte, no se decidió ni en un sentido ni en el otro, y se envía a la revisión (pregunta 12, abajo).

### El nombre

**Decidido.** La capacidad es el *Coaching* y cada asistente es un *coach*, en inglés y en español. En español las dos palabras se quedan como están: *el coach*, *los coaches*, *el Coaching*. El «eCoach» del entorno de prueba es de otro producto y no se usa. Tampoco *asistente*, que el glosario le da a `wizard`, ni *agente*, que es el agente de IA que condiciona la ADR-018, ni *concierge*, que es el de soporte.

### Qué es un coach

Propuesto.

Un coach es una conversación con un modelo, preparada para un rol o un propósito, que ayuda a una persona con su propio trabajo. Aconseja, explica y redacta. No es ninguna de las tres funcionalidades de IA que tiene al lado:

| | Concierge de IA | Constructor de texto | Chat | Coach |
|---|---|---|---|---|
| Para | Ayuda con la plataforma | Un borrador a partir de un encargo | Hacer el trabajo | Pensar el trabajo |
| Lee | La base de conocimiento y la documentación de la plataforma | Lo que la persona le entrega | Lo que la persona puede leer, cuando lo pide | La conversación, los adjuntos y el contexto que designa la organización |
| Actúa | No; escala a una persona | No; devuelve un borrador | Sí; cada escritura confirmada | No (el coach acotado) |
| Situación | Aceptado ([ADR-014](014-volunteer-onboarding.md)) | Aceptado ([ADR-020](020-central-service-line-up-and-builders.md)) | Propuesto y condicionado ([ADR-023](023-surfaces-chat-admin-field.md)) | Propuesto (esta ADR) |

Hay dos clases:

- **Coaches del rol.** Uno por cada plantilla de rol de [users.md § Permissions Model](../spec/users.md#modelo-de-permisos) salvo Simpatizante: para el OA (Org Admin, el Administrador de la organización), cada plantilla de personal, el Voluntario, el Líder de equipo de voluntarios y el Candidato. El carril pone sus instrucciones iniciales; el carril comercial pone sus propios roles.
- **Coaches que escribe la organización.** Un nombre, un propósito, instrucciones, los documentos de contexto que puede usar y los roles que pueden abrirlo. Quién puede escribir uno está abierto.

### El coach acotado

Propuesto. Son los límites de la [ADR-020 § Builders](020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos), aplicados a una conversación.

- **Lo abre una persona.** Un coach nunca habla primero y nunca corre en segundo plano.
- **Lee tres cosas:** la conversación, lo que la persona adjunta y los documentos de contexto que la organización designó para ese coach. No tiene ruta de lectura hacia contactos, registros de votantes, grupos, mensajes, donaciones, eventos, datos de auditoría ni compartimentos.
- **Devuelve texto.** No ejecuta ninguna operación de la plataforma. Un borrador sale de la conversación solo cuando la persona lo copia a otro lugar, y una vez allí entra en la aprobación que ese tipo de contenido ya tenga ([ADR-021](021-content-approval-pipeline.md)).
- **Tiene una sola credencial:** la del proveedor del modelo, bajo el derecho de uso del cliente o su propio proveedor BYOM.
- **Mantiene las salvaguardas de la ADR-013.** No afirma ningún hecho, cifra ni dato sobre la organización que no esté en la conversación o en el contexto.
- **Dice en qué se apoya.** Una afirmación tomada de un documento de contexto cita el documento. Una idea tomada de un autor publicado nombra al autor y la obra. Todo lo demás se ofrece como consejo del propio coach. Esto adapta [comms-intelligence.md § 8.2 Provenance is mandatory](../spec/comms-intelligence.md#82-la-procedencia-es-obligatoria) al consejo, porque allí la regla está escrita para hallazgos.
- **Necesita conexión.** Ninguna tarea de campo depende de un coach ([ADR-005](005-offline-first-sync.md), [ADR-023](023-surfaces-chat-admin-field.md)).

| Característica condicionada | El coach acotado |
|---|---|
| Alcance de lectura | La conversación, los adjuntos y los documentos de contexto designados. Si los documentos designados cuentan como «más amplio que una sola funcionalidad» es la pregunta 1, abajo |
| Capacidad de invocar herramientas | Ninguna |
| Acción autónoma | Ninguna |
| Amplitud de credenciales | Solo el proveedor del modelo |

Un coach sin documentos de contexto lee solo lo que la persona le entrega, que es exactamente el alcance de lectura de un constructor de texto. Un coach con documentos de contexto esperaba por la pregunta 1. La revisión la respondió: el contexto designado no es alcance de lectura más amplio que una sola funcionalidad, porque la designación es un acto deliberado y registrado de la organización ([§ Las respuestas de la revisión](#las-respuestas-de-la-revisión)). El coach acotado, con o sin documentos de contexto, no tiene ninguna de las cuatro características condicionadas y puede salir.

### La capa de contexto de la organización

Propuesto.

La organización escribe una vez aquello sobre lo que se construye cada coach:

- **Misión y voz:** para qué existe la organización y cómo habla.
- **Salvaguardas:** temas que un coach declina, posiciones que nunca toma, lenguaje que evita.
- **Documentos de contexto:** piezas del almacén de contenido ([ADR-021](021-content-approval-pipeline.md)) que la organización designa, como su estrategia, sus materiales de capacitación ([support.md § In-Platform Training Module](../spec/support.md#módulo-de-capacitación-dentro-de-la-plataforma)) y su base de conocimiento. Cada coach usa los documentos designados para él.

La capa vive en la instancia y nunca pasa a otra. Un documento sujeto a un contrato de intercambio no puede designarse, porque la plataforma nunca es parte de un contrato ([ADR-017](017-sharing-contract-trust-model.md)). Los cambios a la capa quedan registrados con la persona que los hizo. El carril pone los valores por defecto.

La capa de contexto es lo que el dibujo del arnés de la ADR-018 llama *Estrategia* y *Base de conocimiento* ([ADR-018 § The per-tenant harness, as drawn](018-ai-agent-posture.md#el-arnés-por-organización-tal-como-está-dibujado)), especificado para los coaches. Eso la convierte en la entrada del arnés, no en el arnés, y deja fuera las otras dos fuentes del arnés, los datos geográficos y el CRM.

### A la espera de la revisión de la ADR-018

*Respondido el 2026-11-26: la revisión permite cada una de estas cosas bajo la postura —ver [§ Las respuestas de la revisión](#las-respuestas-de-la-revisión). Nada de esto está todavía especificado para producción; cada pieza necesita su propia especificación antes de salir. La sección se conserva tal como se escribió, como registro de lo que se mostró.*

Se registra aquí para que la revisión vea todo lo que se mostró. Nada de esto está especificado para producción, y nada puede construirse sobre ello como si estuviera decidido.

1. **Resúmenes del día.** Un resumen diario del alcance de la persona: grupos activos, personas a las que toca contactar, puestas en marcha sin terminar. Lee más allá de la conversación, y o bien habla primero o bien corre según un horario que fijó una persona.
2. **Acciones recomendadas.** Una lista ordenada del tipo «Hace 54 días que no hablas con un miembro». Lee el historial de contacto, choca con el compromiso de explicabilidad de la ADR-016 §49 y ordena a personas identificables.
3. **Actuar desde un coach.** *Añadir tarea* y *Contactar*. Bajo la propuesta del chat como las manos de la persona serían operaciones declaradas, cada una confirmada con una tarjeta.
4. **Leer registros en la conversación.** Una líder pregunta por su grupo y el coach lee su lista de miembros y su actividad.
5. **Coaches en otros canales.** Un coach en Telegram o Signal, lo que depende del canal de chat por defecto ([ADR-023 § Cost and channel](023-surfaces-chat-admin-field.md#costo-y-canal)).

Los resúmenes del día y las recomendaciones tienen una versión fuera del punto de decisión: conteos y reglas calculados sin un modelo y mostrados como un panel cualquiera, como hizo la ADR-016 §49 con la reasignación. Esa versión necesita una especificación de los grupos locales que el corpus no tiene (conflicto 3).

### Preguntas enviadas a la revisión de la ADR-018

Registradas en [ADR-018 § Questions recorded by later ADRs](018-ai-agent-posture.md#preguntas-anotadas-por-adr-posteriores). Las doce están respondidas en [§ Las respuestas de la revisión](#las-respuestas-de-la-revisión); las preguntas se conservan tal como se hicieron.

1. **Contexto designado y alcance de lectura.** ¿Leer los documentos de contexto que una organización designó para un coach cuenta como alcance de lectura más amplio que una sola funcionalidad? Esto decide si el coach acotado queda fuera del punto de decisión. *Alcance de lectura.*
2. **Registros.** ¿Puede un coach leer grupos, miembros, historial de contacto o el CRM, para resumir, para recomendar o para responder? Si es así, ¿dentro del propio alcance de la persona, como dice la propuesta del chat como las manos de la persona, o más estrecho, fuente por fuente? *Alcance de lectura; punto 2.*
3. **Hablar de personas.** Que una líder describa la conducta de un miembro con nombre, y que un coach analice el lugar de esa persona en el grupo, es elaborar un perfil de una persona identificable en una plataforma política. ¿Está permitido, y con qué base? *Punto 2.*
4. **Actuar.** ¿*Añadir tarea* y *Contactar* son escrituras confirmadas con una tarjeta, o enlaces a la UI de administración que la persona completa allí? *Capacidad de invocar herramientas; punto 6.*
5. **Resúmenes del día.** ¿Un resumen diario es un horario que fijó una persona, que la ADR-020 y la ADR-023 ya permiten para los envíos, o un coach que habla primero? *Acción autónoma; punto 6.*
6. **Conservación y quién puede leer una conversación.** Cuánto tiempo se conservan las conversaciones, bajo qué nivel de la [ADR-016 § 4](016-cross-cutting-resolutions.md#4-política-de-conservación-de-datos-por-niveles); qué registra la bitácora de auditoría; si alguien más que la persona puede leerlas, incluido el OA, dada la regla de que no hay ruta de lectura de superusuario en [comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-acceso-y-retención); y qué hace compartir una conversación. *Punto 3.*
7. **Inyección de prompts** desde los adjuntos, desde los documentos designados y desde las instrucciones de un coach que escribió la organización. *Punto 1.*
8. **Sin conexión.** Qué ve una persona sin conexión, dado que quienes dirigen grupos locales trabajan cerca del campo. *Punto 4.*
9. **Costo.** Quién paga cuando un voluntario habla con un coach, y qué incluye el plan por defecto. *Punto 5; ADR-026.*
10. **Contratos.** Si un coach puede leer alguna vez datos sujetos a un contrato de intercambio, como los de una coalición. Lo que se propone aquí: nunca se designan como contexto. *Punto 7.*
11. **El proveedor del modelo.** Si un coach puede usar un proveedor BYOM externo cuando las conversaciones llevan nombres de miembros, que entonces salen de la frontera de cifrado ([system.md § El arnés y el enrutador de modelos](../design/architecture/system.md#el-arnés-y-el-enrutador-de-modelos)). *Punto 8.*
12. **Los coaches y el chat.** ¿Un coach es el chat de la ADR-023 con las instrucciones de un rol y sin operaciones, o una superficie propia? Esto se ata a la recomendación del Agente de Campaña en [ADR-022 § The module catalogue](022-core-modules-and-lanes.md#el-catálogo-de-módulos), que no está decidida. *La propuesta del chat como las manos de la persona.*

### Preguntas abiertas

Estas no dependen de la revisión. No se resuelven aquí.

1. **Quién puede escribir un coach.** Solo el OA, el personal, los líderes de equipo, o una alianza o asociación para sus miembros a través del bus ([ADR-024](024-event-bus-as-federation.md)).
2. **Quién escribe y mantiene el conocimiento sobre organización del que se nutren los coaches.** GreenGrass, el carril, el cliente o terceros, y en qué idiomas.

## Las respuestas de la revisión

La revisión de la ADR-018 del 2026-11-26 respondió las doce preguntas. Cada respuesta; el mecanismo detrás está en [spec/harness.md](../spec/harness.md).

1. **Contexto designado y alcance de lectura.** Leer los documentos de contexto que una organización designó para un coach no es alcance de lectura más amplio que una sola funcionalidad. La designación es un acto deliberado, registrado y auditable de la organización, que nombra exactamente ese corpus para exactamente ese coach. El coach acotado no tiene ninguna de las cuatro características condicionadas y queda fuera del punto de decisión.
2. **Registros.** Un coach con operaciones de lectura declaradas en el manifiesto lee dentro del alcance de la propia persona que lo invoca, la misma regla que el chat. El coach acotado sigue sin leer registros; añadir lecturas de registros es una operación declarada, no una postura nueva.
3. **Hablar de personas.** Permitido dentro del alcance de la propia persona. Es consejo para una persona, no una decisión sobre el sujeto —la plataforma no toma decisiones significativas únicamente automatizadas ([compliance.md § Automated processing and the harness](../spec/compliance.md#procesamiento-automatizado-y-el-arnés)). La procedencia y las salvaguardas de la capa de contexto aplican.
4. **Actuar.** *Añadir tarea* y *Contactar* son escrituras: operaciones declaradas, cada una confirmada con una tarjeta en el momento en que ocurre.
5. **Resúmenes del día.** Una programación que una persona fijó. El resumen lee fuentes designadas y lo que la persona suscriptora puede leer, evaluado bajo su alcance en el momento de la preparación; nunca datos compartimentados.
6. **Conservación y quién puede leer una conversación.** Las conversaciones son cuerpos de prompts y respuestas: el nivel Operacional de la [ADR-016 § 4](016-cross-cutting-resolutions.md#4-política-de-conservación-de-datos-por-niveles) (90 días a 5 años, 2 por defecto), con los metadatos de la llamada conservados indefinidamente en el nivel de auditoría. Una conversación con un coach es privada de su persona; el OA ve metadatos —conteos, costo— nunca el contenido, bajo la regla de que no hay ruta de lectura de superusuario. Compartir manda una copia de solo lectura a las personas elegidas, registrada.
7. **Inyección de prompts.** Los adjuntos son contenido no confiable: dato, nunca instrucciones ([security.md § Prompt injection](../spec/security.md#inyección-de-prompts)). Los documentos designados y las instrucciones de coach escritas por la organización son confiables por designación, y los cambios de designación quedan registrados —lo que convierte a quién puede escribir un coach en una pregunta de seguridad, registrada en [ADR-018 § The review](018-ai-agent-posture.md#la-revisión).
8. **Sin conexión.** Un coach necesita conexión; la página del coach lo dice y ofrece las conversaciones en caché. Ninguna tarea de campo depende de un coach.
9. **Costo.** Medido al cliente bajo la [ADR-019](019-central-services-and-metered-billing.md), con precio según la regla del carril ([ADR-026](026-two-lane-pricing.md)); con BYOM el propio proveedor del cliente le factura. Qué incluye el plan por defecto sigue abierto en la ADR-026.
10. **Contratos.** Un coach lee datos sujetos a un contrato de intercambio solo bajo el contrato de la persona que lo invocó, nunca más de lo que esa persona podría leer, y nunca en segundo plano. Lo propuesto aquí se mantiene: un documento bajo contrato nunca se designa como contexto.
11. **El proveedor del modelo.** El contenido de una conversación es datos personales, y se enruta solo según las reglas por clase de datos de la organización bajo [spec/harness.md § The model router](../spec/harness.md#el-enrutador-de-modelos). Una organización que quiera que los nombres de sus miembros no salgan nunca enruta esa clase solo a endpoints dentro de la frontera de cifrado.
12. **Los coaches y el chat.** Un coach es una persona del arnés: instrucciones, contexto designado y un conjunto de operaciones declaradas. El coach acotado es el caso de cero operaciones; el chat es el caso general. Un solo arnés, muchas personas ([spec/harness.md § Personas](../spec/harness.md#personas)).

## Consecuencias

**Beneficios:**
- Cada persona recibe ayuda con su propio trabajo, en su idioma, sin que haga falta una capacitadora en la sala
- Una organización escribe una vez su misión, su voz y sus salvaguardas, y todos los coaches las respetan
- La postura ante los agentes se aplica a los coaches y al chat desde un solo lugar
- El coach acotado es un caso concreto y pequeño para la revisión, con sus cuatro características dichas

**Costos:**
- Casi todo lo que hacía útil el coaching del entorno de prueba, el resumen del día y las recomendaciones, espera por la revisión
- Cada turno es inferencia, y el coaching invita a conversaciones largas
- Las conversaciones van a contener lo que la gente dice de otra gente, antes de que nadie haya decidido cuánto tiempo se conservan
- Unos coaches neutrales respecto al carril necesitan conocimiento sobre organización que alguien tiene que escribir, y todavía no hay nadie nombrado

**Restricciones:**
- El coach acotado sale dentro de sus límites: nunca habla primero, nunca actúa y nunca lee registros. Los resúmenes del día, actuar y leer registros están permitidos por la revisión bajo la postura —una programación que una persona fijó, operaciones declaradas confirmadas con una tarjeta, el alcance de la persona que lo invoca— y cada uno se especifica antes de salir
- Ninguna tarea de campo depende de un coach
- Un documento sujeto a un contrato de intercambio nunca es contexto de un coach
- La regla de anclaje del concierge no cambia

**ADR relacionadas:** [ADR-005](005-offline-first-sync.md) (los coaches necesitan conexión; el trabajo de campo no), [ADR-013](013-analytics-ai.md) (las salvaguardas que mantienen los coaches), [ADR-014](014-volunteer-onboarding.md) (el concierge, que un coach no es), [ADR-016](016-cross-cutting-resolutions.md) (§4 conservación, §38 BYOM, §49 explicabilidad), [ADR-017](017-sharing-contract-trust-model.md) (los contratos nunca son contexto de un coach), [ADR-018](018-ai-agent-posture.md) (el punto de decisión; doce preguntas enviadas a la revisión), [ADR-019](019-central-services-and-metered-billing.md) (la inferencia se mide por uso), [ADR-020](020-central-service-line-up-and-builders.md) (los límites del constructor que sigue el coach acotado), [ADR-021](021-content-approval-pipeline.md) (los documentos de contexto salen del almacén de contenido; los borradores entran en su aprobación), [ADR-022](022-core-modules-and-lanes.md) (el Coaching es parte del Core), [ADR-023](023-surfaces-chat-admin-field.md) (el punto de decisión abarca todo el Core; el chat al que se parece un coach), [ADR-024](024-event-bus-as-federation.md) (si los coaches viajan por el bus está abierto), [ADR-026](026-two-lane-pricing.md) (el precio de una conversación)
