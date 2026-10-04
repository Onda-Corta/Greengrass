# Presentación pre-MVP

**Un asistente de campaña en Telegram que redacta las piezas del día, y una persona que las aprueba una por una**

Redactado: 2026-09-29
Revisado: 2026-10-04

---

## La idea

Cada mañana una campaña tiene que decidir qué va a decir ese día y convertirlo en piezas para redes. Eso cuesta horas del equipo y una candidata, o una presidenta de comité, a la que es difícil encontrar.

El Agente de Campaña hace la redacción. La persona para quien trabaja decide desde su propio teléfono, en un chat. No aprende una pantalla nueva. La demostración corre en Telegram, una aplicación gratuita; en [qué no es](#qué-no-es) se explica por qué.

Trabaja para una **candidata**, cuyas piezas se redactan en primera persona, o para un **comité regional**, cuyas piezas se redactan con la voz del comité, sin nombre ni foto personal, y las aprueba su presidenta.

## Cómo va una mañana

Las capturas son de un prototipo anterior del mismo flujo, tal como se veía en un teléfono. Ese prototipo corría en WhatsApp y la demostración corre en Telegram, así que el chat que rodea las tarjetas es distinto. Las tarjetas y los botones son los mismos.

1. El Agente de Campaña le escribe a la persona en el chat y le pregunta en qué se enfocan hoy.
2. Ella contesta con un mensaje de texto: el tema, el tono, lo que tiene en agenda. Lo puede escribir o dictar con el teclado del propio teléfono. Una nota de voz recibe una respuesta de una línea que pide el texto.
3. El agente le devuelve los puntos de mensaje en un PDF, sacados solo de lo que la persona ya ha dicho en público. Cada punto cita de dónde sale. Donde falta un dato, el agente deja un hueco a la vista en vez de inventarlo.

   <img src="../../../spec/img/pitch/02-talking-points.jpg" alt="Un PDF de puntos de mensaje con tres mensajes cortos; el tercero deja un hueco [PROPUESTA] donde falta un dato" width="360">

4. El agente propone cuatro piezas. Cada una llega como su propia tarjeta: una imagen de cómo se verá la pieza, la red, la hora a la que saldría y tres botones: **Aprobado**, **Pedir cambios** y **Descartar**.

   <img src="../../../spec/img/pitch/04-four-posts.jpg" alt="Cuatro tarjetas lado a lado: una pieza para X, una para Facebook, una para Instagram y una historia de Instagram, cada una con los botones Aprobado, Pedir cambios y Descartar" width="720">

5. La persona toca un botón en cada tarjeta. Pedir cambios exige un comentario, para que el equipo sepa qué cambiar.

   <img src="../../../spec/img/pitch/03-approve.jpg" alt="El candidato toca Aprobado en la pieza 1 de 4, para X" width="360">

6. El equipo de campaña, desde una pantalla en una computadora, ve el pedido y escribe la versión nueva. También puede editar cualquier pieza por su cuenta. La versión nueva llega al chat como una tarjeta nueva, y necesita una aprobación nueva.
7. A su hora, cada pieza aprobada sale. Una versión que nadie aprobó no sale.

   <img src="../../../spec/img/pitch/06-scheduled.jpg" alt="El candidato aprueba la versión 2 de la pieza para Facebook; el agente confirma que hay cuatro piezas programadas para hoy" width="360">

8. La pantalla del equipo guarda el registro completo: cada conversación, cada versión, quién aprobó cuál y lo que costó cada paso.

## La regla

Nada sale sin que una persona con nombre apruebe esa versión exacta. Cambiar una pieza anula su aprobación.

## La demostración

Dura unos quince minutos. Alguien narra, alguien sostiene el teléfono y alguien opera la pantalla del equipo en una computadora que el público puede ver.

1. **Una mañana ensayada.** Recorremos la mañana de Juan Dalmau, cuya campaña ha dado su visto bueno. El tema es la salud, el Plan Universal de Salud. Las piezas se arman solo con sus declaraciones públicas, cada una con su fuente, y los puntos de mensaje muestran los huecos donde no ha dicho nada.
2. **Le toca a usted.** Todas las personas en la sala abren un mismo enlace en su propio teléfono y contestan unas preguntas: si trabajan para un comité o para la campaña de un candidato, y su nombre, cargo y región (o el nombre y el cargo al que aspira el candidato). Pueden añadir un tema. Reciben su propia mañana, y su conversación aparece en la pantalla del equipo junto a las demás.

- **Real:** la conversación de Telegram, la redacción, los puntos de mensaje, los artes y las aprobaciones.
- **Simulado:** la publicación y la agenda. Un reloj de demostración adelanta el día, y ninguna pieza llega a una cuenta real.
- **Sin imágenes hechas con IA.** Los artes salen de plantillas y, cuando la persona las tiene, de las fotos de la propia campaña.
- **Marcado como demostración, en todas partes.** Cada imagen de pieza, el PDF, cada mensaje del chat y la pantalla del equipo lo dicen. La marca la pone el sistema, no la IA, así que nada de lo que alguien escriba puede quitarla.

## Qué protege

- **Ningún dato de votantes, donantes ni afiliados.** No hay listas de contactos, y no se carga ninguna.
- **No publica nada.** No tiene acceso a ninguna cuenta de redes sociales.
- **El único dato personal es el de la propia persona:** lo que escribe en el chat y lo que dice de sí misma al registrarse. En el primer mensaje se le dice que esto es una demostración y que lo que escriba pasa por un proveedor de modelos de IA.
- **Nunca inventa una cita.** Si de un candidato solo sabe lo que ha dicho en público, o lo que la persona le cuenta, las piezas no llevan palabras ni posturas que no se le dieron. Donde no tiene nada, muestra un hueco.
- **Todo se borra el mismo día**, al terminar la sesión. El primer mensaje lo dice.
- **Cada persona va aparte.** Lo que una persona escribe y recibe nunca lo ve otra, aunque la pantalla del equipo muestre a todas.
- **El registro está controlado.** El enlace se comparte solo con las personas en la sala. El registro se abre y se cierra desde la pantalla del equipo, el código del enlace cambia después, y hay un tope de personas y de costo por persona. Un interruptor de emergencia detiene a la vez todas las llamadas a la IA.

## Qué aporta cada campaña

Nada de antemano, para la parte en vivo. Telegram en el teléfono y unas respuestas al abrir el enlace.

Para una mañana ensayada propia, que solo hacemos con una campaña que ha dado su visto bueno:

- Entre cinco y diez fotos que la campaña tenga derecho a usar.
- Su identidad visual, o el permiso para usar la de su partido.
- Sus cuentas públicas en cada red.
- Tres a cinco temas, con lo que la persona ya ha dicho en público sobre cada uno.
- Su cuenta de Telegram y su visto bueno.
- Una hora de alguien del equipo para ensayar.

## Qué no es

- **No está atada a Telegram.** La demostración usa Telegram porque se puede montar en minutos, sin verificación de negocio. Las campañas viven en WhatsApp, pero los términos comerciales de WhatsApp prohíben la actividad de partidos políticos. El canal de producción se decide con cada campaña.
- **Todavía no es un producto.** Si una campaña quiere seguir usándolo al día siguiente, la respuesta honesta es *todavía no*.
- **No prueba lo que costaría.** Enseña lo que cuesta una mañana, no lo que pagaría una campaña.
