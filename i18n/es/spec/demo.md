# Especificación de la demostración de aprobación de campaña

**Una demostración que funciona, para abrirle la puerta a GreenGrass con candidaturas y comités regionales reales**

Estado: presentación, no especificación. Nada de lo que describe queda aceptado, y la [ADR-018](../decisions/018-ai-agent-posture.md) sigue propuesta.
Código: en un repositorio privado aparte, `Onda-Corta/campaign-agent-demo`. No es código de GreenGrass. En el momento de esta revisión contiene código que funciona para la mayor parte de su plan de trabajo: el bot y el registro, la redacción, las aprobaciones, la pantalla del equipo, el reloj de demostración, las protecciones y el reinicio. El constructor de recursos se está construyendo ahí ahora, y una simulación dibuja los artes hasta que esté listo.
Versión independiente, para las candidaturas: [pitch.md](pitch.md).
Redactado: 2026-09-29
Revisado: 2026-10-04, para ajustarla al plan de trabajo del repositorio de la demostración (Telegram, titulares, registro en vivo)
Revisado: 2026-10-06, para ajustarla al código del repositorio de la demostración y a su decisión de construir el constructor de recursos por su cuenta

---

## 1. Para qué es

GreenGrass tiene una especificación completa y nada que se pueda enseñar. A una candidata no se le vende con 21 ADR. Se le vende con algo que le pase en su propio celular.

Esta presentación enseña una sola cosa funcionando: el Agente de Campaña le escribe en un chat a la persona para quien trabaja, ella le cuenta de qué trata el día, recibe sus puntos de mensaje y cuatro piezas para redes, aprueba cada una con un botón, el equipo escribe las versiones nuevas de las piezas en que ella pidió cambios, y ella las aprueba. Es el ejemplo desarrollado de la [ADR-018](../decisions/018-ai-agent-posture.md#ejemplo-desarrollado-aprobar-las-publicaciones-del-día-por-whatsapp), tal como lo dibujó el prototipo anterior, con la persona sosteniendo el teléfono y, en esta versión, el público sosteniendo los suyos.

El público es más amplio de lo que suponía el primer plan. Incluye a presidentas de comités regionales además de campañas, así que la unidad para la que trabaja el agente es un **titular** (`principal` en el código): una candidata (`person`) o un comité regional (`committee`). La mañana narrada es la de una candidatura. El resto de la sala se registra en vivo y recibe una mañana propia.

Se escogió este flujo por tres razones:

1. **Pasa en un chat, en su propio celular.** La presentación no le pide a nadie aprender una pantalla nueva. En los mercados objetivo la campaña corre por WhatsApp, y la demostración corre en Telegram como sustituto (§2), así que lo único que pide es una aplicación gratuita.
2. **Enseña la regla que hace confiable a GreenGrass.** Nada sale sin que una persona con nombre apruebe esa versión exacta. En la presentación eso no es una promesa: se ve.
3. **Le sirve a la revisión de la ADR-018.** Correr el ejemplo desarrollado con personas reales deja evidencia concreta sobre los seis lugares donde toca el punto de decisión (§7).

## 2. Qué no es

- **No es el MVP.** El [MVP](mvp.md) prueba si organizaciones políticas soberanas van a juntar sus datos. Esta presentación no prueba ese supuesto ni ningún otro: sirve para abrir la conversación. Las dos cosas no deben confundirse.
- **No es código de GreenGrass.** Vive en `Onda-Corta/campaign-agent-demo`, fuera de este corpus. Nada de ese código pasa a la plataforma sin cruzar antes la revisión de la ADR-018.
- **No acepta la ADR-018.** Corre dentro de los límites que la propuesta en revisión sugiere, y así los pone a prueba, pero no los decide. La ADR-018 sigue propuesta.
- **No publica nada.** Ninguna pieza llega a una cuenta real de X, Facebook ni Instagram.
- **No ata a GreenGrass a Telegram ni a WhatsApp.** La demostración corre en Telegram porque no exige verificación de negocio, revisión del nombre visible ni plantillas aprobadas: un bot se monta en minutos. Los términos comerciales de WhatsApp prohíben la actividad de partidos políticos, así que la presentación tampoco promete WhatsApp. La fórmula en las láminas y en el guion es «la demostración corre en Telegram; el canal de producción se decide con cada campaña». La demostración mantiene el canal detrás de una interfaz delgada para poder añadir otro.

## 3. Del lado seguro del punto de decisión

La [ADR-018 § La revisión condiciona la producción, no la experimentación](../decisions/018-ai-agent-posture.md#la-revisión-condiciona-la-producción-no-la-experimentación) pone la raya en producción y en cualquier despliegue que contenga registros reales de votantes, donantes o afiliados. La presentación se queda de este lado de la raya:

- **No contiene registros de votantes, donantes ni afiliados.** No hay CRM, no hay listas y no se carga ninguna.
- **El único dato personal real es el de cada persona:** sus mensajes, lo que dice de sí misma al registrarse (nombre, cargo, región, o el nombre y el cargo al que aspira el candidato) y las fotos que aporta una campaña. Los da a sabiendas, en la demostración. El primer mensaje dice que es una demostración, que todo se borra al terminar la sesión y que nada se publica. También dice que lo que escriba pasa por un modelo: un modelo de pesos abiertos que corre en Cloudflare. En GreenGrass ese sería el proveedor BYOM de su propia organización. Telegram también transporta la conversación, que es un proveedor más que nombrar en ese mensaje.
- **Todo se borra el mismo día**, al terminar la sesión, con un reinicio: un botón en la pantalla del equipo, o un solo comando. Cierra el registro con un código de inicio nuevo, borra los mensajes de los propios chats de Telegram, vacía el libro de registro de todo menos el titular precargado y vacía el almacén de artes y PDF generados. Telegram solo deja que un bot borre un mensaje en las 48 horas siguientes a enviarlo, que es una razón más para correr el reinicio el mismo día; lo que no puede borrar queda informado. Las grabaciones del modelo que conserva son solo de la mañana del titular precargado, así que no guardan nada de lo que escribió una persona invitada. El plan anterior dejaba que una campaña pidiera quedarse con su registro; esa excepción ya no existe.
- **No publica.** No hay credenciales de redes sociales en ningún lado del sistema, y el publicador simulado rechaza cualquier salida que no esté marcada como de demostración.
- **Todo lo que genera lleva la marca de demostración**, en cada superficie: el arte, el PDF, cada mensaje del chat, la pantalla del equipo y el libro de registro. La marca la pone el arnés, nunca el modelo, así que ninguna instrucción puede quitarla. Importa más ahora que las personas invitadas pueden nombrar candidatos reales al registrarse.
- **Nunca inventa una cita.** Cada respuesta del modelo se revisa antes de que algo llegue al chat: una cita tiene que aparecer palabra por palabra en una declaración pública que alguien revisó a ojo contra su fuente, una cifra tiene que aparecer en la carpeta o en el mensaje del titular, y cada fuente tiene que estar en la carpeta del propio titular. Una respuesta que falla vuelve al modelo con la lista de problemas, hasta tres veces, y después la mañana falla en vez de salir. En una candidatura cuya única fuente es lo que una persona escribió, la salida no lleva palabras ni posturas que no se le dieron. Los huecos se muestran, no se rellenan.

Tres cosas la cruzarían al otro lado, y ninguna se hace mientras la ADR-018 siga propuesta: cargar una lista de contactos, conectar una cuenta real de redes sociales, o que alguien siga usándola en su día a día después de la presentación. Si una candidatura pide quedarse con la herramienta, la respuesta honesta es *todavía no*, y la invitación es al piloto.

## 4. El guion

Dura unos quince minutos, en ocho segmentos: el problema, la propuesta y la regla, la mañana del titular precargado, la sala que se suma, lo que la demostración no hace (contado mientras se redactan las mañanas de la sala), lo que le llegó a una persona invitada, el pedido y el cierre. El guion minuto a minuto, con lo que hace y dice cada persona, está en el repositorio de la demostración, en `docs/run-of-show.md`. La mañana corre en un reloj de demostración de las 5:30 a las 7:18. En la mañana precargada el reloj corre a velocidad real y la pantalla del equipo lo adelanta a cada momento del guion, así que la mañana entera dura unos cinco minutos y el reloj nunca se adelanta a lo que se está diciendo. Hacen falta tres papeles el día de la presentación: quien narra, quien sostiene el teléfono del titular precargado y quien opera la pantalla del equipo y el reloj en una computadora que el público puede ver. Quién toma cada uno todavía no está decidido (§13).

### Antes de empezar

1. El teléfono del titular precargado abre el bot y presiona `/start`. En Telegram un bot no puede escribir primero hasta que la persona lo ha hecho una vez, así que eso deja constancia de su consentimiento. No interviene ninguna ventana ni plantilla aprobada. Mientras no se use el teléfono del propio candidato, uno del equipo hace sus veces, y quien narra lo dice.
2. Alguien ensaya el recorrido con la carpeta del titular precargado (§8), y sus llamadas al modelo se graban para que la mañana se pueda reproducir (§5). Antes de abrir las puertas se corre el reinicio, las llamadas del titular precargado se ponen en reproducción, el reloj queda en las 5:30, y se revisan los topes de costo y el interruptor de emergencia.

### La mañana ensayada

3. En la pantalla del equipo, quien opera arranca el reloj de demostración. A las 5:30 de ese reloj el Agente de Campaña le escribe primero al titular precargado: buenos días, la agenda del día sacada de la carpeta (marcada como simulada) y en qué se enfocan hoy. Solo el titular precargado recibe este saludo; las personas invitadas escriben primero. La revisión anterior de esta especificación hacía que una persona tocara **Iniciar día**; el repositorio de la demostración escogió el reloj (§7, punto 2).
4. El titular contesta con un mensaje de texto: el tema, el tono y lo que tenga en agenda, escrito o dictado con el teclado del propio teléfono. En la mañana precargada el tema es la salud, el Plan Universal de Salud. Un mensaje demasiado corto para trabajar recibe un pedido de más, y una nota de voz recibe una respuesta de una línea que pide el texto. Se descartó la transcripción de notas de voz: los teléfonos ya dictan, y no es lo que vende la demostración. Mientras el modelo trabaja, el agente dice que necesita un momento.
5. El agente manda tres mensajes clave en el chat, y después los puntos de mensaje redactados a partir de la carpeta del titular, en un PDF. Cada punto cita la declaración pública en que se apoya, con su medio y su fecha. Donde la carpeta no tiene el dato, el agente deja un hueco a la vista en vez de inventarlo. Es la salvaguarda de la [ADR-013](../decisions/013-analytics-ai.md), y vale la pena señalarla en voz alta. En la mañana precargada los huecos son reales, como el precipicio fiscal de Medicaid en 2027, sobre el que el candidato no ha dicho nada en público.
6. El agente recomienda cuatro piezas: X, Facebook, un post de Instagram y una historia de Instagram. Cada una llega como su propia tarjeta: el arte de la pieza, la red, la versión, el titular del arte, el texto de la publicación y tres botones: **Aprobado**, **Pedir cambios** y **Descartar**.
7. El titular toca un botón en cada tarjeta. La tarjeta se edita en el sitio para mostrar la decisión, con el nombre de quien aprueba y la hora: «Aprobada por Juan Dalmau · 6:46 a. m.». Mientras la mañana corre en el reloj de demostración, la hora de la tarjeta es la del reloj; el libro de registro guarda la real.

### La ronda de cambios

8. Cuando el titular toca **Pedir cambios**, el agente le pregunta qué cambiaría y toma su próximo mensaje como el comentario. El comentario es obligatorio, como en el [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): en la mañana precargada, «que diga que hoy a las 10 visito el CDT». Hasta que llega el comentario no se registra nada, y el titular todavía puede aprobar o descartar. Después el pedido llega a la pantalla del equipo y abre una ronda nueva.
9. En la pantalla del equipo, alguien escribe la versión nueva, a partir de la última y con los mismos límites de largo que el texto del modelo, y la manda. Llega al chat del titular como una tarjeta nueva que dice quién la escribió y cita el cambio que se pidió, y las tarjetas anteriores se reescriben como reemplazadas, sin botones. El titular la aprueba ahí. El equipo también puede editar una pieza por iniciativa propia; una versión nueva anula cualquier aprobación anterior. El equipo escribe todas las versiones nuevas: el agente no ofrece un borrador nuevo.

### La sala se suma

10. Todas las demás personas abren un enlace compartido, `t.me/<bot>?start=<código>`. La primera pregunta es si trabajan para un comité o para la campaña de un candidato. Luego, nombre, cargo y región si es un comité, o el nombre y el cargo al que aspira el candidato si es una campaña, y un tema opcional. Con eso se crea un titular del tipo escogido a partir de una plantilla (§8), con la persona como aprobadora; en la campaña de un candidato, quien se registra hace las veces del candidato. Después escriben su propio mensaje de la mañana y corren los pasos 4 al 9, sin guion, con llamadas al modelo en vivo. Abrir el enlace otra vez retoma el registro, y nunca crea un duplicado. Cuando se llega al tope de personas, a la siguiente se le dice que la demostración está llena, y no se guarda nada.

### Cierre

11. El reloj de demostración llega a las 7:18 y el publicador simulado resuelve cada pieza abierta: **publicada** si una persona con nombre aprobó su última versión y esa aprobación sigue en pie, **retenida** si no, con el motivo. Las dos son definitivas. Publicar es una fila en el libro de registro y nada más: ninguna red, ninguna cuenta y ningún mensaje en el chat. La mañana ensayada deja una pieza sin aprobar a propósito, para que se vea una pieza retenida.
12. La pantalla del equipo enseña lo que el público no vio en sus teléfonos:
    - Los **hilos** de comités y candidaturas, agrupados por quién tiene que actuar (el equipo, el agente, el titular o nadie), los más urgentes primero. Cada uno nombra a su titular y su tipo, dice a quién espera y desde cuándo, y se marca cuando pasó algo nuevo en él. Un hilo que lleva más de noventa segundos esperando al agente se marca como atascado.
    - Un **flujo de actividad** por titular: todo lo que ese titular hizo y todo lo que se hizo por él, filtrable por titular.
    - Un **detalle del hilo**. En una pieza: sus versiones lado a lado, quién escribió cada una, cada decisión sobre ella, la mañana de la que salió con sus fuentes y sus huecos, y lo que costó cada llamada, al modelo y al constructor, trasladado al costo. En una conversación: el chat, donde el equipo puede escribirle al titular, reintentar una mañana que falló, tomar el control del hilo cuando el modelo se atasca, fijar el tope de costo propio de ese titular o sacar a una persona invitada.
    - Los **controles**: registro abierto o cerrado, el enlace compartido y su código, el tope de personas y de costo con lo que se ha gastado, un interruptor de emergencia para todas las llamadas al modelo, el reinicio y el reloj, en un panel propio.

## 5. Qué es real y qué se simula

| Paso | Estado | Cómo |
|---|---|---|
| Conversación de Telegram, tarjetas y botones | Real | API de bots de Telegram, con teclados integrados. Cada pieza es una tarjeta con su arte y tres botones, que se edita en el sitio después del toque |
| Mensajes clave, puntos de mensaje y texto de las piezas | Real | GLM-5.3, un modelo de pesos abiertos en Workers AI escogido por una prueba comparativa, con salida estructurada, revisión de citas, cifras y fuentes, y hasta tres llamadas, sobre la carpeta del titular |
| PDF de los puntos de mensaje y los cuatro artes | Real | Un constructor de recursos dentro del propio código de la demostración: composiciones dibujadas con un motor de código abierto y pintadas en un navegador sin interfaz, con un kit de marca por juego de plantillas de arte. No se genera ninguna imagen. Una simulación los dibuja hasta que el constructor esté listo (§8) |
| Fotos en los artes | Todavía no | Por ahora ningún arte lleva foto. Añadir las fotos de la campaña es trabajo opcional antes de la presentación (§13) |
| Versiones, aprobaciones, auditoría y costo por llamada | Real | Un libro de registro que lee la pantalla del equipo |
| El equipo escribe la versión nueva | Real | La pantalla del equipo |
| Transcripción de notas de voz | Descartado | El titular escribe o dicta. Una nota de voz recibe una respuesta de una línea |
| Estrategia y base de conocimiento | Simplificado | Documentos enteros en el prompt. Sin recuperación |
| La agenda del titular | Simulado | Se lee de la carpeta del titular, y se marca como simulada dondequiera que se muestra |
| Programación y publicación | Simulado | Un reloj de demostración corre de 5:30 a 7:18; a las 7:18 el publicador simulado publica las versiones aprobadas y marcadas como de demostración, y retiene las demás. Nada llega a una red social |
| El número propio de negocio de la organización | Simulado | Un solo bot para todos, enrutado por usuario de Telegram (§8) |
| Quién aprobó | Simulado | Quien aprueba es quien tiene la cuenta de Telegram vinculada al titular. El nombre en la tarjeta y en el libro de registro sale de la carpeta (el candidato, o la presidenta del comité), nunca de Telegram |

Quedan además **alternativas de reserva**. Cada llamada al modelo se puede grabar y reproducir, así que la mañana con guion sobrevive a una falla del proveedor; cubre solo el recorrido ensayado, y la mañana precargada reproduce su grabación el día de la presentación. Para las personas que se registran en vivo, una llamada fallida recibe una respuesta corta en el chat, y la pantalla del equipo tiene un botón de reintento y la opción de tomar el control del hilo. Si falla el navegador del constructor de recursos, la simulación dibuja el arte. Si aun así falla un arte, su tarjeta sale como texto; si falla el PDF, se omite y las tarjetas salen igual.

## 6. Cómo se traza sobre GreenGrass

Cada pieza de la presentación corresponde a algo que la especificación ya nombra, y en dos casos a algo que todavía está propuesto.

| En la presentación | En GreenGrass | Estado |
|---|---|---|
| La carpeta de un titular | Una organización ([users.md § Jerarquía organizativa](users.md#jerarquía-organizativa)): de tipo Candidato si es una candidata. La especificación no tiene un tipo de comité regional, así que un titular comité representa a una organización o campaña bajo un partido. Todo registro lleva la organización a la que pertenece | Aceptado para candidaturas; comité sin trazar |
| El adaptador de Telegram | Transporte por canal ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#transporte-por-canal)), sobre la arquitectura de [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp). Telegram no es un canal que la arquitectura nombre | Aceptado para el transporte; Telegram sin nombrar |
| La redacción de los puntos de mensaje y de las piezas | El constructor de texto ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos)), con una diferencia que importa: aquí lo invoca el agente, no una persona con un encargo | La diferencia es lo que decide la ADR-018 |
| El constructor de recursos, sus composiciones y sus kits de marca | Ninguno. Pone un titular aprobado, un nombre y una fecha sobre los colores, la tipografía y el logotipo de una campaña, y no genera nada, así que no es el constructor de imágenes. Es código propio de la demostración, no un componente de GreenGrass | Fuera del punto de decisión |
| Piezas, rondas, versiones y aprobaciones | El [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): cada ronda se guarda y todo pedido de cambios lleva comentario | Aceptado |
| Los eventos de uso con su costo | La medición de uso y el traslado al costo de la [ADR-019](../decisions/019-central-services-and-metered-billing.md#dos-planos-de-facturación-y-sin-margen-en-el-segundo) | Aceptado |
| El registro de cada aprobación | La relación «en nombre de», propuesta para el punto 3 de la [ADR-018](../decisions/018-ai-agent-posture.md#qué-tiene-que-resolver-esta-adr) | Propuesto |
| El publicador simulado | El adaptador de redes sociales ([system.md § Redes sociales](../design/architecture/system.md#redes-sociales)), sin conectar | Aceptado, no usado |
| El Agente de Campaña | El arnés de agentes de la ADR-018, reducido a una sola conversación por titular | Propuesto |

## 7. Los seis puntos del ejemplo desarrollado, en la presentación

El ejemplo desarrollado de la ADR-018 toca el punto de decisión en seis lugares. La presentación no decide ninguno. Lo que hace es escoger, en cada uno, el lado más conservador que todavía deja ver el flujo.

| Punto | Qué hace la presentación |
|---|---|
| 1. El alcance de lectura | El agente de cada conversación lee los mensajes de ese titular y su carpeta: estrategia, declaraciones públicas, agenda. No lee nada de ningún otro titular. No hay contactos, registros de votantes ni donaciones que leer: no existen en la presentación. La pantalla del equipo ve a todos por diseño. El mensaje de una persona invitada va cercado en el prompt como material, no como instrucciones, y una respuesta que cite algo fuera de la carpeta de ese titular se rechaza. Las pruebas corren dos titulares a la vez, incluida una persona invitada que intenta que el agente copie la carpeta del titular precargado, y comprueban que ni el prompt, ni el chat, ni las tarjetas de uno llegan al otro |
| 2. Habla primero | En un solo caso, y angosto. A las 5:30 del reloj de demostración el agente le escribe primero al titular precargado, con la agenda y una pregunta. El reloj lo arranca una persona en la pantalla del equipo, la conversación la abrió el titular al presionar `/start`, y las personas invitadas siempre escriben primero. Así que el agente habla a una hora fija, pero solo en un reloj que alguien arranca, a alguien que dio su consentimiento, en un recorrido escenificado. La revisión anterior de esta especificación dejaba ese papel a una persona que tocaba **Iniciar día**; el repositorio de la demostración escogió el reloj. Si un límite así basta es la pregunta de la revisión |
| 3. Las imágenes generadas | No hay. El arte se compone a partir de un kit de marca, con el titular aprobado encima, y por ahora no lleva fotos. Si se añaden fotos, son fotos reales de la campaña, usadas con su permiso. Un titular comité no tiene nombre ni foto personal alguna. La pregunta sobre la persona identificable queda intacta para la revisión |
| 4. Quién despacha | El agente coloca en la programación la versión aprobada, y nada más. El publicador simulado solo toma versiones aprobadas: la base de datos rechaza una fila de publicación salvo que la versión sea la última y su aprobación siga en pie. El agente no tiene credencial para publicar, y en la presentación no existe ninguna. Así se ve la respuesta propuesta —el toque en Aprobado cuenta como el envío del titular— sin decidirla |
| 5. Los cambios después de la aprobación | Una versión nueva anula la aprobación anterior, y una aprobación está atada a una sola versión exacta. Si a su hora no está aprobada, no sale. La mañana ensayada deja una pieza sin aprobar a propósito, y el publicador la retiene |
| 6. La auditoría | Cada aprobación registra como actor a la persona con nombre de la carpeta del titular, la cuenta de Telegram que tocó el botón, la hora, al agente como canal y la versión exacta. En un comité el actor es su presidenta, un papel con nombre. Es un borrador de la relación «en nombre de», no el modelo de auditoría que la revisión tiene que definir |

## 8. Una carpeta por titular

La presentación tiene que poder correr con cualquier titular sin tocar el código. Todo lo que es propio de un titular vive en su carpeta, y la aplicación carga la que se le indique. Nada en el esquema supone un nombre de persona. Añadir un titular es trabajo de datos, no de programación, y para las personas invitadas ocurre solo, mediante el registro.

### Qué va en la carpeta

Un cargador con tipos valida cada carpeta. Una carpeta contiene:

- El tipo del titular, `person` o `committee`, que cambia solo la voz y la identidad: primera persona para una candidata, una voz institucional para un comité, y nunca una cita personal inventada.
- Una biografía o descripción, cada dato con su fuente; en un comité, su región y una aprobadora con nombre, la presidenta.
- Sus cuentas públicas en cada red.
- De uno a cinco temas.
- La agenda, que hace las veces de calendario y se marca como simulada.
- Un archivo de declaraciones públicas, con la URL de la fuente de cada afirmación. Cada declaración se marca como textual, que se puede citar, o como paráfrasis, que nunca se convierte en cita. Es lo que permite demostrar «cita solo lo que está en la carpeta, muestra los huecos». En el titular precargado se arma con investigación con fuentes, y cada cita textual se revisa a ojo contra su fuente antes de que se pueda citar.
- Los huecos: datos que la carpeta no tiene, que se muestran en el PDF y nunca se rellenan.
- Un manifiesto de fotos, de hasta diez fotos con su descripción. En un comité, fotos de la región y de sus actividades en vez de una persona.
- Qué juego de plantillas de arte usa el constructor de recursos y, si se quiere, un color de acento.

Los números de teléfono, los tokens del bot y las llaves de los proveedores nunca van en la carpeta; van en la configuración del despliegue.

### El titular precargado y las dos plantillas

Hay un solo titular precargado, **Juan Dalmau** (`person`). Su campaña ha dado su visto bueno. Su mañana trata de la salud, y su contenido sale solo de sus declaraciones públicas, cada una con su fuente. No hay otros titulares precargados, y el plan anterior de una primera ronda de cuatro candidaturas queda reemplazado por este.

Todas las demás personas reciben un titular a partir de una de dos plantillas de carpeta, **comité** o **campaña de un candidato**, completada con las respuestas del registro. Las plantillas son la superficie del producto para las personas invitadas, que aportan casi nada de material, así que traen temas por defecto sensatos y muestran huecos en vez de inventar. Ninguna de las dos plantillas trae declaraciones públicas, y sus huecos lo dicen. En la campaña de un candidato la única fuente es lo que dice quien se registra, así que la salida nunca inventa citas ni posturas del candidato nombrado.

### Plantillas de arte

Los artes y el PDF salen de un constructor de recursos que, desde el 2026-10-06, el repositorio de la demostración construye por su cuenta, como parte de la misma aplicación. Un plan anterior lo hacía construir aparte, fuera de ese repositorio, detrás de una interfaz acordada; la interfaz se queda, ahora entre las dos mitades de la aplicación. Su solicitud lleva el titular y el texto, el formato (X, Facebook, post de Instagram, historia de Instagram o PDF), una foto, la identidad del titular, una marca `demo: true` y un `demo_label`. Rechaza toda solicitud que no lleve la marca. Funciona con o sin nombre y foto de una persona.

El constructor tiene una mitad fija y una mitad reemplazable. La mitad fija se construye una vez: la interfaz, el renderizador, la marca de demostración, las revisiones, la alternativa de reserva y una página de vista previa donde se pinta cada muestra en cada formato. La mitad reemplazable es el aspecto: las composiciones, los formatos y sus tamaños, los kits de marca y el cuerpo del PDF. Se espera rediseñar los artes, las composiciones y los formatos, así que nada en la mitad fija depende de una composición ni de un tamaño en particular. La primera composición es provisional, adaptada de un diseño de código abierto para tarjetas de redes sociales, para que lleguen artes reales a las tarjetas antes del rediseño; si el rediseño llega antes de la presentación está abierto (§13).

- **El motor.** Los artes se dibujan con el motor de un proyecto de código abierto de tarjetas para redes, `tarjetas-sociales`: un pintor de escenas, un ajuste de texto que busca el tamaño más grande que cabe y avisa cuando se desborda, y una auditoría de contraste. Cada arte es una escena pintada sobre un lienzo en un navegador sin interfaz que se mantiene encendido entre una pieza y otra; el PDF es HTML que imprime el mismo navegador. Las tipografías van incluidas con la aplicación y nunca se descargan al dibujar.
- **La marca de demostración** la añade el arnés después de que la composición arma la escena, dentro de las zonas seguras del formato, así que ninguna composición, actual o rediseñada, puede omitirla. La página se niega a pintar una escena sin ella, y la auditoría de contraste la revisa como cualquier otro texto. El PDF lleva un encabezado y un pie de demostración en cada página y una línea que dice que su contenido es generado y no verificado.
- **Los kits de marca.** Uno por juego de plantillas de arte, candidatura y comité: una tinta, una familia tipográfica y un logotipo. Los aporta la persona del equipo a cargo del diseño; mientras tanto, una tipografía y unas tintas por defecto.
- **Qué va en un arte.** El titular aprobado, el nombre y el cargo del titular (o el comité y su región), la fecha de la mañana y la cuenta cuando la hay. El texto de la publicación queda fuera de la imagen. Un titular que no cabe se señala en vez de dibujarse encima del resto.

### Un bot compartido, enrutado por remitente

En GreenGrass cada organización tiene su propia cuenta de WhatsApp Business ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). La presentación usa un solo bot de Telegram para todos e identifica a cada persona por su usuario de Telegram, la primera vez que abre el enlace. Cada persona se convierte en su propio titular, y la conversación se enruta a su carpeta. Una sola pantalla del equipo los ve a todos, así que el aislamiento entre titulares es una propiedad de lo que recibe cada prompt, no de pantallas separadas.

### Quién entra

El enlace se puede reenviar, así que el control es operativo y lo tiene el equipo: el registro está cerrado salvo durante la sesión, el código de inicio cambia después, el costo tiene tope por titular y en total, el número de titulares tiene tope (25 por defecto) y un interruptor de emergencia global detiene la próxima llamada al modelo, incluida la próxima llamada de una mañana que ya se está redactando. Quien sea desconocido mientras el registro está cerrado, o traiga un código equivocado, recibe una respuesta cortés de «demo cerrada», y no se guarda nada.

## 9. El público

El primer plan era una ronda de cuatro candidaturas de los dos partidos del piloto, con una carpeta cada una. El plan actual la reemplaza por una sola sala: una mañana narrada para una candidatura, y después las presidentas de comités regionales y el personal de campaña presente se registran solos.

El candidato precargado es de Puerto Rico y todo corre en español, así que la ronda pone a prueba cambiar de titular y de tipo, pero no de idioma. Cambiar de idioma está previsto, como un conjunto nuevo de textos del agente y de botones, y no se ejerce.

Siguen vigentes dos consecuencias del piloto. Cada titular es su propia organización, y nada de uno aparece en la presentación de otro, que es la misma regla que el piloto le promete a cada partido. Y [la asimetría entre los dos partidos](mvp.md#la-asimetría-es-el-hecho-más-importante-de-este-plan) aplica aquí también: GreenGrass arma las carpetas y las plantillas, y a quien se registra se le pide lo mínimo.

## 10. Qué aporta cada campaña

Para la parte en vivo, nada de antemano: Telegram en el teléfono y las respuestas del registro del paso 10 de §4. El contenido del titular precargado se armó con fuentes públicas.

Para una mañana ensayada propia, que solo se hace con una campaña que ha dado su visto bueno:

- Entre cinco y diez fotos que la campaña tenga derecho a usar, con una palabra o dos sobre de qué es cada una.
- Su identidad visual (un color, una tipografía que pueda usar en la web y su logotipo), o el permiso para usar la del partido o la de la Alianza.
- Sus cuentas públicas en cada red.
- Tres a cinco temas, con lo que la persona ya ha dicho en público sobre cada uno: el programa, comunicados, entrevistas. La carpeta se arma solo con eso, y cada punto de mensaje lo cita.
- Su cuenta de Telegram, que se guarda fuera de la carpeta.
- Su visto bueno a que sus mensajes pasen por el proveedor de modelos durante la presentación.
- Una hora de alguien del equipo para el ensayo.

## 11. Qué no prueba la presentación

- **Que los límites de la ADR-018 bastan.** Los aplica en el caso más angosto posible: una conversación por titular, sin datos de votantes, sin publicación real. La revisión sigue teniendo que decidir el alcance de lectura, el modelo de amenazas, la auditoría, el trabajo sin conexión y la pantalla de BYOM.
- **Nada sobre el constructor de imágenes.** El constructor de recursos no genera imágenes, a propósito.
- **Que el agente nunca tergiversa una postura.** Las revisiones atrapan citas, cifras, fuentes y enlaces inventados. No pueden atrapar un argumento inventado en la voz del titular que la carpeta no respalda; la prueba comparativa produjo uno. La salvaguarda es la aprobación: nada sale hasta que una persona con nombre aprueba esa versión exacta, y los puntos de mensaje llevan sus fuentes para que la persona pueda revisarlos.
- **Que la base de conocimiento escala.** Unos pocos documentos caben enteros en el prompt. Una base real necesita recuperación, y con ella preguntas de alcance de lectura que aquí no aparecen.
- **Nada sobre WhatsApp ni sobre la puesta en marcha con Meta.** Telegram evita la verificación de negocio, la revisión del nombre visible y la ventana de 24 horas, que son la parte lenta y restrictiva ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). La presentación no dice nada de cómo salen.
- **Que el agente aguanta a una persona hostil o descuidada.** La sala es de invitados, el registro está controlado y los costos tienen tope. Es una prueba con una sala amistosa, no con una abierta.
- **Que la gente lo va a adoptar.** Que a una candidata o a una presidenta le guste en una demostración no dice que su campaña lo vaya a usar todos los días.
- **Lo que costaría.** Los costos que enseña la pantalla del equipo son reales pero de una sola mañana: alrededor de un centavo y medio de modelo para la mañana precargada y alrededor de medio centavo para la de una persona invitada. Sirven de orden de magnitud, no de precio.

## 12. Cómo se construye

Una aplicación en TypeScript sobre Cloudflare Workers, con D1 como libro de registro y R2 para las imágenes y los PDF generados. El modelo es GLM-5.3, un modelo de pesos abiertos en Workers AI, con razonamiento bajo. Una prueba comparativa corta lo escogió por encima de Kimi K2.6 y DeepSeek V4 Pro: escribió el mejor texto en español, devolvió salida estructurada válida a la primera y tardó de 13 a 60 segundos por mañana. Este no es el stack decidido en [system.md](../design/architecture/system.md): la demostración es desechable, y D1 se escogió en parte para probarlo de primera mano. D1 no tiene un canal en tiempo real, así que la pantalla del equipo lo consulta cada dos segundos.

El arnés recibe el webhook de Telegram, verifica su token secreto, procesa cada actualización una sola vez, responde de inmediato y hace el trabajo después, y contiene el enrutamiento, el registro, la máquina de estados de las aprobaciones, el reloj de demostración y el publicador simulado. Redactar una mañana tarda más de lo que puede durar un webhook, así que pasa por una cola. El libro de registro guarda titulares, piezas, versiones, aprobaciones atadas a una versión exacta, publicaciones, eventos de costo y el registro de mensajes, todo marcado como de demostración. El constructor de recursos es parte de la misma aplicación: un solo proceso de larga vida mantiene encendido un navegador sin interfaz y abre una pestaña por pieza, en Cloudflare Browser Rendering.

El plan de trabajo, con responsables, dependencias y líneas de corte, está en el repositorio de la demostración, en `docs/work-plan.md`. La meta es una corrida limpia de quince minutos para el lunes 2026-10-12. El orden:

1. Decisiones: stack, modelo, fórmula del canal, titulares, registro, retención.
2. Cimientos: el esquema del libro de registro, la interfaz del constructor de recursos con una simulación, el formato de la carpeta y su contenido, el webhook, el flujo de registro y el cliente del canal. El bot en sí es una configuración manual de quince minutos.
3. El ciclo: el constructor de texto, la alternativa de reserva y la historia de la mañana precargada.
4. La máquina de estados de las aprobaciones, y después la integración con el constructor de recursos real.
5. La pantalla del equipo, el reloj de demostración, el reinicio y las protecciones para las personas invitadas en vivo.
6. Una primera corrida de punta a punta, y después arreglos, un ensayo cronometrado, un ensayo general con papeles fijos y una corrida limpia desde el estado reiniciado, con una grabación de pantalla de respaldo.

En el momento de esta revisión están hechos los pasos 1 a 3 y el 5, y el paso 4 está hecho salvo el constructor de recursos real. Falta ese constructor (la tubería, la composición provisional, el PDF y, de forma opcional, las fotos), hacerlo el predeterminado en lugar de la simulación, los kits de marca, el rediseño si se hace antes de la presentación, y el paso 6.

Si el tiempo se acorta, los recortes van en este orden: la pantalla del equipo se reduce a la bandeja y el detalle del hilo, la ronda de cambios a una pieza, la historia de Instagram a un mockup estático, y un constructor de recursos tardío a la composición provisional sin fotos, y después a la simulación. Un rediseño que no esté listo deja la composición provisional. Si el segundo tipo de titular no está listo, la demostración corre un tipo en vivo y enseña el otro desde la grabación. Si el registro abierto no está sólido, el equipo crea de antemano el titular de cada presidenta.

## 13. Preguntas abiertas

1. **Los papeles el día de la presentación.** Quién narra, quién sostiene el teléfono y quién opera la pantalla del equipo, y si la persona del equipo a cargo del diseño está disponible el fin de semana anterior para las láminas y una revisión de los artes.
2. **El rediseño.** La primera composición es provisional. Si los artes, las composiciones y los formatos se rediseñan antes del 2026-10-12 o después de la presentación no está decidido. El resto del constructor de recursos no cambia en ningún caso.
3. **Las fotos.** Si los artes llevan las fotos de la campaña en la presentación. Por ahora ningún arte lleva foto, y añadirlas es trabajo opcional. Una demostración sin fotos igual enseña el flujo, pero se parece menos a lo que publica una campaña.
4. **Las grabaciones.** Una grabación de la presentación tiene la voz o las palabras de una persona real diciendo cosas que redactó un agente. No se enseña a otra campaña sin su permiso por escrito. La grabación de pantalla de respaldo lleva la misma marca de demostración.
5. **Qué se le ofrece a quien diga que sí.** La respuesta a «quiero usarlo mañana» es el piloto, y el piloto espera por la revisión de la ADR-018 para todo lo que tenga características de agente. Hace falta decir eso bien, y antes de que lo pregunten.
6. **A qué corresponde un comité.** La especificación no tiene un tipo de organización de comité regional (§6). Si un comité es una campaña bajo un partido o algo nuevo no se decide aquí.
