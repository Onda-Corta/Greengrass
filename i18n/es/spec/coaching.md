# Coaching

**Coaches de IA para cada rol, construidos sobre lo que la organización dice de sí misma**

Estado: propuesto en la [ADR-028](../decisions/028-coaching.md). Dos cosas están decididas: el Coaching es parte del Core, y el nombre es *Coach* en inglés y en español. Todo lo demás aquí es una propuesta. Nada de esto llega a producción en ningún carril antes de que se acepte la revisión de la [ADR-018](../decisions/018-ai-agent-posture.md), y lo que aparece en [A la espera de la revisión de la ADR-018](#a-la-espera-de-la-revisión-de-la-adr-018) está registrado, no especificado.
Redactado: 2026-11-25

---

## Propósito

Quien organiza aprende el oficio de otra gente: cómo llevar una primera reunión, qué hacer cuando un grupo se estanca, cómo integrar a un miembro callado, qué decir cuando una decisión cae mal. En los lugares para los que se construye GreenGrass, rara vez hay una capacitadora en la sala cuando surge la pregunta.

Un coach es esa ayuda, dentro del producto, en el momento en que hace falta. Es una conversación con un modelo, preparada para un rol o un propósito, que aconseja, explica y redacta. Trabaja con lo que la persona le cuenta y con lo que la organización escribió sobre sí misma, y no hace nada por su cuenta.

## Qué es un coach

Un coach ayuda a una persona con su propio trabajo. Tiene al lado tres funcionalidades de IA, y cada una hace otra cosa.

| | Concierge de IA | Constructor de texto | Chat | Coach |
|---|---|---|---|---|
| Para | Ayuda con la plataforma | Un borrador a partir de un encargo | Hacer el trabajo | Pensar el trabajo |
| Lee | La base de conocimiento y la documentación de la plataforma | Lo que la persona le entrega | Lo que la persona puede leer, cuando lo pide | La conversación, los adjuntos y el contexto que designa la organización |
| Actúa | No; escala a una persona | No; devuelve un borrador | Sí; cada escritura confirmada | No |
| Dónde se decide | [support.md § Onboarding Concierge](support.md#acompañamiento-en-la-puesta-en-marcha) | [ADR-020](../decisions/020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos) | [ADR-023](../decisions/023-surfaces-chat-admin-field.md#el-chat-como-las-manos-de-la-persona), propuesto | Este documento, propuesto |

Preguntas típicas para un coach:

- «Dos miembros chocan en todas las reuniones y el resto se quedó callado. ¿Qué hago?»
- «Perdimos la votación del presupuesto. Ayúdame a escribir el anuncio.»
- «El sábado llegan cuatro voluntarios nuevos. ¿Cómo llevo la primera hora?»
- «De estas tres prioridades, ¿cuál debería atacar primero el comité, según nuestra estrategia?»

## Quién tiene un coach

### Coaches del rol

Cada plantilla de rol de [users.md § Permissions Model](users.md#modelo-de-permisos) tiene un coach, salvo Simpatizante: el OA (Org Admin, el Administrador de la organización), cada plantilla de personal, el Voluntario, el Líder de equipo de voluntarios y el Candidato. Una persona ve los coaches de los roles que tiene.

El carril pone las instrucciones iniciales de cada coach del rol. En Greengrass hablan de organización política; Basecamp pone sus propios roles y sus propias instrucciones. Después la capa de contexto de la organización se aplica a todos.

### Coaches que escribe la organización

Una organización puede añadir coaches para sus propios fines: uno para quienes presiden un comité por primera vez, uno para sus voluntarios de prensa, uno para sus capitanes del día de elecciones. Un coach escrito tiene:

- **Un nombre y un propósito de una línea,** que se muestran donde la gente elige un coach.
- **Instrucciones:** con qué ayuda, cómo debe hablar, para qué debe mandar a la gente a otro lado.
- **Documentos de contexto:** cuáles de los documentos designados por la organización puede usar.
- **Quién puede abrirlo:** por rol.
- **Inicios sugeridos:** unos cuantos mensajes que se muestran antes del primero, como *Un grupo está atascado*.

Quién puede escribir un coach está abierto ([Preguntas abiertas](#preguntas-abiertas)).

## La capa de contexto de la organización

La organización escribe una vez aquello sobre lo que se construye cada coach.

- **Misión y voz.** Para qué existe la organización, a quién sirve, cómo habla.
- **Salvaguardas.** Temas que un coach declina, posiciones que nunca toma, palabras que evita. Un coach que llega a una salvaguarda lo dice y remite a la persona a alguien de la organización.
- **Documentos de contexto.** Piezas del almacén de contenido ([ADR-021](../decisions/021-content-approval-pipeline.md)) que la organización designa como contexto de los coaches: su estrategia, sus materiales de capacitación ([support.md § In-Platform Training Module](support.md#módulo-de-capacitación-dentro-de-la-plataforma)), su base de conocimiento. Cada coach usa solo los documentos designados para él.

Reglas:

- La capa pertenece a una instancia y nunca pasa a otra.
- Un documento sujeto a un contrato de intercambio no puede designarse ([ADR-017](../decisions/017-sharing-contract-trust-model.md)).
- Cada cambio a la capa queda registrado con la persona que lo hizo.
- El carril pone los valores por defecto, para que los coaches de una organización nueva funcionen antes de que haya escrito nada.

## Una conversación con un coach

- **Empezar.** Desde la página de un coach, desde la caja del coach en la página de inicio de un rol, o desde un inicio sugerido.
- **Entrada.** Escribiendo, o con una nota de voz transcrita en el idioma de la persona.
- **Adjuntos.** Un documento o una imagen que la persona añade forma parte solo de esa conversación.
- **Conversaciones anteriores.** Una persona puede volver a sus propias conversaciones anteriores. Cuánto tiempo se conservan, y si alguien más puede leerlas, es una pregunta para la revisión.
- **Compartir.** Un botón de compartir le manda a otra persona de la instancia una copia de solo lectura de la conversación. Qué implica eso para la conservación y para las personas que se nombran en ella es una pregunta para la revisión; hasta que se responda, compartir está dibujado y no especificado.
- **El aviso.** Cada conversación muestra que los coaches usan IA y pueden equivocarse, y que la información importante debe comprobarse antes de actuar sobre ella.

## Anclaje en fuentes y citas

Un coach dice en qué se apoya cada parte de su respuesta.

- **De la organización:** una afirmación tomada de un documento de contexto cita el documento.
- **De un autor publicado:** una idea tomada de un libro o un estudio nombra al autor y la obra, para que la persona pueda buscarla y juzgarla.
- **Su propio consejo:** todo lo demás se ofrece como consejo, no como un hecho.

Un coach no afirma ningún hecho, cifra ni dato sobre la organización que no esté en la conversación o en el contexto, como la [ADR-013](../decisions/013-analytics-ai.md) les exige a los mensajes generados. Esto adapta [comms-intelligence.md § 8.2 Provenance is mandatory](comms-intelligence.md#82-la-procedencia-es-obligatoria) al consejo. El concierge mantiene su regla más estricta, la base de conocimiento y nada más ([system.md § AI concierge](../design/architecture/system.md#concierge-de-ia)), porque una respuesta equivocada sobre ley electoral o cumplimiento tiene consecuencias reales, y un coach que se topa con una pregunta así remite a la persona al concierge o al personal.

## Límites de un coach

Mientras la revisión de la ADR-018 no diga otra cosa:

- **Nunca habla primero.** Ningún mensaje, resumen ni recordatorio llega de un coach si la persona no abrió la conversación.
- **Nunca actúa.** No cambia ningún registro, no crea tareas, no le envía nada a nadie. Un borrador sale de la conversación solo cuando la persona lo copia, y entonces entra en la aprobación que tenga ese tipo de contenido.
- **Nunca lee registros.** Ni contactos, ni registros de votantes, ni grupos, mensajes, donaciones, eventos, datos de auditoría o compartimentos. Si la persona pega algo, el coach lee lo que se pegó.
- **Nunca decide sobre una persona.** No puntúa, no ordena ni etiqueta a nadie.

## Idiomas

Un coach responde en el idioma en que la persona escribe, y si no, en el idioma de su perfil, como el concierge. Las instrucciones de los coaches del rol y los valores por defecto del carril se escriben primero en inglés y en español, y en cada idioma nuevo antes de que abra un país. Una organización escribe su capa de contexto en los idiomas en que trabaja. Se puede usar un documento de contexto en otro idioma, y el coach dice cuándo está citando de un idioma a otro.

## Costo

Cada turno es una llamada de inferencia. Se mide por uso bajo la [ADR-019](../decisions/019-central-services-and-metered-billing.md) y se cobra según la regla de precio del carril ([ADR-026](../decisions/026-two-lane-pricing.md)), o se la factura a la organización su propio proveedor bajo BYOM. La organización puede fijar un tope de gasto para el coaching, como para cualquier servicio medido por uso. Quién paga cuando un voluntario habla con un coach, y qué incluye el plan por defecto, está abierto.

## Sin conexión

Un coach necesita conexión. Sin ella, la página del coach lo dice y ofrece las conversaciones anteriores de la persona si se guardan en el dispositivo, lo que también es una pregunta para la revisión. Ninguna tarea de campo depende de un coach ([ADR-005](../decisions/005-offline-first-sync.md)).

## A la espera de la revisión de la ADR-018

El producto que dio pie a este documento hace más de lo que permiten los límites de arriba. Cada una de estas cosas se registra para que la revisión lo vea todo, y ninguna está especificada para producción.

### Resúmenes del día

Un resumen del alcance de la persona al empezar el día: cuántos grupos están activos, a quién le toca contacto, quién no ha terminado la puesta en marcha, qué grupo se estancó. Lee más allá de la conversación, y o bien habla primero o bien corre según un horario que fijó una persona.

### Acciones recomendadas

Una lista ordenada de sugerencias, cada una con su razón: «Hace 54 días que no hablas con un miembro: a los callados es fácil pasarlos por alto». Lee el historial de contacto y ordena a personas identificables, y el compromiso de la [ADR-016](../decisions/016-cross-cutting-resolutions.md) §49, que el personal pueda ver exactamente por qué se hizo una sugerencia, no se cumple con un modelo.

### Actuar desde un coach

*Añadir tarea* y *Contactar*, en una recomendación o dentro de una conversación. Bajo la propuesta del chat como las manos de la persona, cada una sería una operación declarada, confirmada con una tarjeta.

### Leer registros

Una líder pregunta por su propio grupo, y el coach lee la lista de miembros, la asistencia y la actividad reciente del grupo para responder.

### Coaches en otros canales

Un coach en Telegram o Signal en vez de dentro de la app. Esto depende del canal de chat por defecto ([ADR-023 § Cost and channel](../decisions/023-surfaces-chat-admin-field.md#costo-y-canal)).

Los resúmenes del día y las acciones recomendadas tienen una versión fuera del punto de decisión: conteos y reglas calculados sin un modelo y mostrados como un panel cualquiera. Esa versión necesita una especificación de los grupos locales estables y de quienes los dirigen, que el corpus no tiene ([users.md § Volunteer Team Lead](users.md#líder-de-equipo-de-voluntarios) es un rol para una operación, no para un grupo durante meses).

Las doce preguntas que esto le envía a la revisión están en [ADR-028 § Questions sent to the ADR-018 review](../decisions/028-coaching.md#preguntas-enviadas-a-la-revisión-de-la-adr-018).

## Preguntas abiertas

1. **Quién puede escribir un coach.** Solo el OA, el personal, los líderes de equipo, o una alianza o asociación para sus miembros a través del bus ([ADR-024](../decisions/024-event-bus-as-federation.md), también propuesta).
2. **Quién escribe y mantiene el conocimiento sobre organización del que se nutren los coaches.** GreenGrass, el carril, el cliente o terceros, y en qué idiomas.
