# Especificación de la demostración de aprobación de campaña

**Una demostración que funciona, para abrirle la puerta a GreenGrass con candidaturas y comités regionales reales**

Estado: presentación, no especificación. Nada de lo que describe queda aceptado, y la [ADR-018](../decisions/018-ai-agent-posture.md) sigue propuesta.
Código: en un repositorio privado aparte, `Onda-Corta/campaign-agent-demo`. No es código de GreenGrass. En el momento de esta revisión contiene un plan de trabajo y ningún código de aplicación.
Versión independiente, para las candidaturas: [pitch.md](pitch.md).
Redactado: 2026-09-29
Revisado: 2026-10-04, para ajustarla al plan de trabajo del repositorio de la demostración (Telegram, titulares, registro en vivo)

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
- **El único dato personal real es el de cada persona:** sus mensajes, lo que dice de sí misma al registrarse (nombre, cargo, región, o el nombre y el cargo al que aspira el candidato) y las fotos que aporta una campaña. Los da a sabiendas, en la demostración. El primer mensaje dice que es una demostración, que todo se borra al terminar y que nada se publica. Se le dice que sus mensajes pasan por un proveedor de modelos. En GreenGrass ese sería el proveedor BYOM de su propia organización. Telegram también transporta la conversación, que es un proveedor más que nombrar en ese mensaje.
- **Todo se borra el mismo día**, al terminar la sesión, con un script de reinicio que deja solo al titular precargado. El plan anterior dejaba que una campaña pidiera quedarse con su registro; esa excepción ya no existe.
- **No publica.** No hay credenciales de redes sociales en ningún lado del sistema, y el publicador simulado rechaza cualquier salida que no esté marcada como de demostración.
- **Todo lo que genera lleva la marca de demostración**, en cada superficie: el arte, el PDF, cada mensaje del chat, la pantalla del equipo y el libro de registro. La marca la pone el arnés, nunca el modelo, así que ninguna instrucción puede quitarla. Importa más ahora que las personas invitadas pueden nombrar candidatos reales al registrarse.
- **Nunca inventa una cita.** En una candidatura cuya única fuente es lo que una persona escribió, la salida no lleva palabras ni posturas que no se le dieron. Los huecos se muestran, no se rellenan.

Tres cosas la cruzarían al otro lado, y ninguna se hace mientras la ADR-018 siga propuesta: cargar una lista de contactos, conectar una cuenta real de redes sociales, o que alguien siga usándola en su día a día después de la presentación. Si una candidatura pide quedarse con la herramienta, la respuesta honesta es *todavía no*, y la invitación es al piloto.

## 4. El guion

Dura unos quince minutos, y las horas de publicación corren en un reloj de demostración. En el prototipo anterior la mañana iba de las 5:30 a las 7:18, y el reloj comprime ese tramo. Hacen falta tres papeles el día de la presentación: quien narra, quien sostiene el teléfono del titular precargado y quien opera la pantalla del equipo en una computadora que el público puede ver. Quién toma cada uno todavía no está decidido (§13).

### Antes de empezar

1. El titular precargado abre el bot y presiona `/start`. En Telegram un bot no puede escribir primero hasta que la persona lo ha hecho una vez, así que eso deja constancia de su consentimiento. No interviene ninguna ventana ni plantilla aprobada.
2. El día antes, alguien ensaya el recorrido con la carpeta del titular precargado (§8). Para ese recorrido existe una alternativa de reserva grabada (§5).

### La mañana ensayada

3. En la pantalla del equipo, una persona toca **Iniciar día**. El Agente de Campaña saluda al titular por su nombre y le pregunta en qué se enfocan hoy. El prototipo anterior hacía que el agente escribiera solo a las 5:30; la demostración mantiene a una persona en ese papel (§7, punto 2).
4. El titular contesta con un mensaje de texto: el tema, el tono y lo que tenga en agenda, escrito o dictado con el teclado del propio teléfono. En la mañana precargada el tema es la salud, el Plan Universal de Salud. Una nota de voz recibe una respuesta de una línea que pide el texto. Se descartó la transcripción de notas de voz: los teléfonos ya dictan, y no es lo que vende la demostración.
5. El agente redacta los puntos de mensaje a partir de la carpeta del titular y los manda en un PDF, con un resumen de tres mensajes cortos. Cada punto cita la declaración pública en que se apoya. Donde la carpeta no tiene el dato, el agente deja un hueco a la vista en vez de inventarlo. Es la salvaguarda de la [ADR-013](../decisions/013-analytics-ai.md), y vale la pena señalarla en voz alta. En la mañana precargada los huecos son reales, como los fondos federales que el plan tendría que reemplazar.
6. El agente recomienda cuatro piezas: X, Facebook, un post de Instagram y una historia de Instagram. Cada una llega como su propia tarjeta: una imagen con el mockup de cómo se vería en la red, el número de la pieza, la red, la hora a la que saldría y tres botones: **Aprobado**, **Pedir cambios** y **Descartar**.
7. El titular toca un botón en cada tarjeta. La tarjeta se edita en el sitio para mostrar la decisión, y el agente confirma cuántas quedaron aprobadas.

### La ronda de cambios

8. Cuando el titular toca **Pedir cambios**, el agente le pregunta qué cambiaría y toma su próximo mensaje como el comentario. El comentario es obligatorio, como en el [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): «más corta y conectada con la entrevista», «otra foto». El pedido llega a la pantalla del equipo y abre una ronda nueva, y la aprobación anterior de la pieza queda anulada.
9. En la pantalla del equipo, alguien escribe la versión nueva y la manda. Llega al chat del titular como una tarjeta nueva, que él aprueba ahí. El equipo también puede editar una pieza por iniciativa propia; eso anula la aprobación de la misma manera.

### La sala se suma

10. Todas las demás personas abren un enlace compartido, `t.me/<bot>?start=<código>`. La primera pregunta es si trabajan para un comité o para la campaña de un candidato. Luego, nombre, cargo y región si es un comité, o el nombre y el cargo al que aspira el candidato si es una campaña, y un tema opcional. Con eso se crea un titular del tipo escogido a partir de una plantilla (§8), con la persona como aprobadora; en la campaña de un candidato, quien se registra hace las veces del candidato. Después corren su propia mañana, los pasos 3 al 9, sin guion. Abrir el enlace otra vez retoma el registro, y nunca crea un duplicado.

### Cierre

11. El reloj de demostración avanza. El publicador simulado marca cada pieza aprobada como publicada a su hora, y el agente le avisa al titular cuando sale cada una. Si alguna versión nueva quedó sin aprobar, queda retenida, y la pantalla lo muestra.
12. La pantalla del equipo enseña lo que el público no vio en sus teléfonos, en cuatro vistas:
    - Una **bandeja** con todos los hilos abiertos, de comités y de candidaturas, cada uno con su titular, su tipo, su estado (a la espera del titular, a la espera del equipo, aprobado, retenido), su última actividad y una insignia de no leído, ordenada por urgencia y actualizada en vivo.
    - Un **flujo de actividad** por titular: todo lo que ese titular hizo y todo lo que se hizo por él, filtrable por titular.
    - Un **detalle del hilo**: la conversación, las rondas de cada pieza lado a lado, quién aprobó qué versión y lo que costó cada llamada, trasladado al costo. El equipo puede tomar el control de un hilo cuando el modelo se atasca.
    - Los **controles**: registro abierto o cerrado, el código de inicio, un tope de titulares y de costo, un interruptor de emergencia y una lista de los titulares que se registraron solos, que se pueden eliminar.

## 5. Qué es real y qué se simula

| Paso | Estado | Cómo |
|---|---|---|
| Conversación de Telegram, tarjetas y botones | Real | API de bots de Telegram, con teclados integrados. Cada pieza es una tarjeta con la imagen y tres botones, que se edita en el sitio después del toque |
| Puntos de mensaje y texto de las piezas | Real | Un modelo de pesos abiertos en Workers AI, con salida estructurada y validación, sobre la carpeta del titular |
| PDF de los puntos de mensaje y los cuatro artes | Real | Un constructor de recursos aparte, a partir de plantillas, detrás de una interfaz acordada. No se genera ninguna imagen |
| Versiones, aprobaciones, auditoría y costo por llamada | Real | Un libro de registro que lee la pantalla del equipo |
| El equipo escribe la versión nueva | Real | La pantalla del equipo |
| Transcripción de notas de voz | Descartado | El titular escribe o dicta. Una nota de voz recibe una respuesta de una línea |
| Estrategia y base de conocimiento | Simplificado | Documentos enteros en el prompt. Sin recuperación |
| La agenda del titular | Simulado | Se lee de la carpeta del titular |
| Programación y publicación | Simulado | Un reloj de demostración comprime de 5:30 a 7:18; el publicador simulado solo toma versiones aprobadas y marcadas como de demostración. Nada llega a una red social |
| El número propio de negocio de la organización | Simulado | Un solo bot para todos, enrutado por usuario de Telegram (§8) |
| Quién aprobó | Simulado | Telegram no muestra el número de teléfono, así que quien aprueba es un nombre visible de Telegram vinculado a una persona con nombre en la carpeta |

Queda además una **alternativa de reserva**: cada llamada al modelo se puede grabar y reproducir, así que la mañana con guion sobrevive a una falla del proveedor. Cubre solo el recorrido ensayado. Para las personas que se registran en vivo, una llamada fallida recibe una respuesta corta en el chat («dame un momento»), y la pantalla del equipo tiene un botón de reintento y la opción de tomar el control del hilo.

## 6. Cómo se traza sobre GreenGrass

Cada pieza de la presentación corresponde a algo que la especificación ya nombra, y en dos casos a algo que todavía está propuesto.

| En la presentación | En GreenGrass | Estado |
|---|---|---|
| La carpeta de un titular | Una organización ([users.md § Jerarquía organizativa](users.md#jerarquía-organizativa)): de tipo Candidato si es una candidata. La especificación no tiene un tipo de comité regional, así que un titular comité representa a una organización o campaña bajo un partido. Todo registro lleva la organización a la que pertenece | Aceptado para candidaturas; comité sin trazar |
| El adaptador de Telegram | Transporte por canal ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#transporte-por-canal)), sobre la arquitectura de [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp). Telegram no es un canal que la arquitectura nombre | Aceptado para el transporte; Telegram sin nombrar |
| La redacción de los puntos de mensaje y de las piezas | El constructor de texto ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos)), con una diferencia que importa: aquí lo invoca el agente, no una persona con un encargo | La diferencia es lo que decide la ADR-018 |
| El constructor de recursos y sus plantillas | Ninguno. Componen recursos que la campaña ya tiene y no generan nada, así que no son el constructor de imágenes | Fuera del punto de decisión |
| Piezas, rondas, versiones y aprobaciones | El [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): cada ronda se guarda y todo pedido de cambios lleva comentario | Aceptado |
| Los eventos de uso con su costo | La medición de uso y el traslado al costo de la [ADR-019](../decisions/019-central-services-and-metered-billing.md#dos-planos-de-facturación-y-sin-margen-en-el-segundo) | Aceptado |
| El registro de cada aprobación | La relación «en nombre de», propuesta para el punto 3 de la [ADR-018](../decisions/018-ai-agent-posture.md#qué-tiene-que-resolver-esta-adr) | Propuesto |
| El publicador simulado | El adaptador de redes sociales ([system.md § Redes sociales](../design/architecture/system.md#redes-sociales)), sin conectar | Aceptado, no usado |
| El Agente de Campaña | El arnés de agentes de la ADR-018, reducido a una sola conversación por titular | Propuesto |

## 7. Los seis puntos del ejemplo desarrollado, en la presentación

El ejemplo desarrollado de la ADR-018 toca el punto de decisión en seis lugares. La presentación no decide ninguno. Lo que hace es escoger, en cada uno, el lado más conservador que todavía deja ver el flujo.

| Punto | Qué hace la presentación |
|---|---|
| 1. El alcance de lectura | El agente de cada conversación lee los mensajes de ese titular y su carpeta: estrategia, declaraciones públicas, agenda. No lee nada de ningún otro titular. No hay contactos, registros de votantes ni donaciones que leer: no existen en la presentación. La pantalla del equipo ve a todos por diseño, y el texto de una persona invitada nunca anula las reglas de la carpeta ni llega a los datos de otro titular, lo cual se prueba con dos titulares simultáneos |
| 2. Habla primero | No. Una persona toca **Iniciar día**, y la conversación está abierta porque el titular presionó `/start` o abrió el enlace primero. La versión en que el agente escribe solo a una hora fija no se demuestra. Si el plan de trabajo mantiene esta lectura es una pregunta abierta (§13) |
| 3. Las imágenes generadas | No hay. Los artes salen de plantillas y, cuando las hay, de fotos reales de la campaña, usadas con su permiso. Un titular comité no tiene nombre ni foto personal alguna. La pregunta sobre la persona identificable queda intacta para la revisión |
| 4. Quién despacha | El agente coloca en la programación la versión aprobada, y nada más. El publicador simulado solo toma versiones aprobadas. El agente no tiene credencial para publicar, y en la presentación no existe ninguna. Así se ve la respuesta propuesta —el toque en Aprobado cuenta como el envío del titular— sin decidirla |
| 5. Los cambios después de la aprobación | Una versión nueva anula la aprobación anterior, y una aprobación está atada a una sola versión exacta. Si a su hora no está aprobada, no sale. La presentación puede dejar una versión sin aprobar a propósito para que se vea |
| 6. La auditoría | Cada aprobación registra a una persona con nombre como actor, al agente como canal y la versión exacta. En un comité el actor es su presidenta, un papel con nombre. Es un borrador de la relación «en nombre de», no el modelo de auditoría que la revisión tiene que definir |

## 8. Una carpeta por titular

La presentación tiene que poder correr con cualquier titular sin tocar el código. Todo lo que es propio de un titular vive en su carpeta, y la aplicación carga la que se le indique. Nada en el esquema supone un nombre de persona. Añadir un titular es trabajo de datos, no de programación, y para las personas invitadas ocurre solo, mediante el registro.

### Qué va en la carpeta

Un cargador con tipos valida cada carpeta. Una carpeta contiene:

- El tipo del titular, `person` o `committee`, que cambia solo la voz y la identidad: primera persona para una candidata, una voz institucional para un comité, y nunca una cita personal inventada.
- Una biografía o descripción; en un comité, su región y una aprobadora con nombre, la presidenta.
- Sus cuentas públicas en cada red.
- Tres a cinco temas.
- La agenda, que hace las veces de calendario.
- Un archivo de declaraciones públicas, con la URL de la fuente de cada afirmación. Es lo que permite demostrar «cita solo lo que está en la carpeta, muestra los huecos». En el titular precargado se arma con investigación con fuentes, y cada cita textual se revisa a ojo contra su fuente antes de entrar a los datos iniciales.
- Un manifiesto de fotos, de cinco a diez fotos con su descripción. En un comité, fotos de la región y de sus actividades en vez de una persona.
- El aspecto y la identidad que usa el constructor de recursos.

Los números de teléfono, los tokens del bot y las llaves de los proveedores nunca van en la carpeta; van en la configuración del despliegue.

### El titular precargado y las dos plantillas

Hay un solo titular precargado, **Juan Dalmau** (`person`). Su campaña ha dado su visto bueno. Su mañana trata de la salud, y su contenido sale solo de sus declaraciones públicas, cada una con su fuente. No hay otros titulares precargados, y el plan anterior de una primera ronda de cuatro candidaturas queda reemplazado por este.

Todas las demás personas reciben un titular a partir de una de dos plantillas de carpeta, **comité** o **campaña de un candidato**, completada con las respuestas del registro. Las plantillas son la superficie del producto para las personas invitadas, que aportan casi nada de material, así que traen temas por defecto sensatos y muestran huecos en vez de inventar. En la campaña de un candidato la única fuente es lo que dice quien se registra, así que la salida nunca inventa citas ni posturas del candidato nombrado.

### Plantillas de arte

Los artes salen de un constructor de recursos aparte, construido fuera de este repositorio a partir de las plantillas de la Alianza y al que se llega por una interfaz acordada. Su solicitud lleva el texto de la pieza, el formato (X, Facebook, post de Instagram, historia de Instagram o PDF), una foto, la identidad del titular, una marca `demo: true` y un `demo_label`. Rechaza toda solicitud que no lleve la marca. Sus plantillas funcionan con o sin nombre y foto de una persona.

### Un bot compartido, enrutado por remitente

En GreenGrass cada organización tiene su propia cuenta de WhatsApp Business ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). La presentación usa un solo bot de Telegram para todos e identifica a cada persona por su usuario de Telegram, la primera vez que abre el enlace. Cada persona se convierte en su propio titular, y la conversación se enruta a su carpeta. Una sola pantalla del equipo los ve a todos, así que el aislamiento entre titulares es una propiedad de lo que recibe cada prompt, no de pantallas separadas.

### Quién entra

El enlace se puede reenviar, así que el control es operativo y lo tiene el equipo: el registro está cerrado salvo durante la sesión, el código de inicio cambia después, el costo tiene tope por titular y en total, el número de titulares tiene tope (por ejemplo 25) y un interruptor de emergencia global detiene todas las llamadas al modelo en una sola solicitud. Quien sea desconocido mientras el registro está cerrado, o traiga un código equivocado, recibe una respuesta cortés de «demo cerrada», y no se guarda nada.

## 9. El público

El primer plan era una ronda de cuatro candidaturas de los dos partidos del piloto, con una carpeta cada una. El plan actual la reemplaza por una sola sala: una mañana narrada para una candidatura, y después las presidentas de comités regionales y el personal de campaña presente se registran solos.

El candidato precargado es de Puerto Rico y todo corre en español, así que la ronda pone a prueba cambiar de titular y de tipo, pero no de idioma. Cambiar de idioma está previsto, como un conjunto nuevo de textos del agente y de botones, y no se ejerce.

Siguen vigentes dos consecuencias del piloto. Cada titular es su propia organización, y nada de uno aparece en la presentación de otro, que es la misma regla que el piloto le promete a cada partido. Y [la asimetría entre los dos partidos](mvp.md#la-asimetría-es-el-hecho-más-importante-de-este-plan) aplica aquí también: GreenGrass arma las carpetas y las plantillas, y a quien se registra se le pide lo mínimo.

## 10. Qué aporta cada campaña

Para la parte en vivo, nada de antemano: Telegram en el teléfono y las respuestas del registro del paso 10 de §4. El contenido del titular precargado se armó con fuentes públicas.

Para una mañana ensayada propia, que solo se hace con una campaña que ha dado su visto bueno:

- Entre cinco y diez fotos que la campaña tenga derecho a usar, con una palabra o dos sobre de qué es cada una.
- Su identidad visual, o el permiso para usar la del partido o la de la Alianza.
- Sus cuentas públicas en cada red.
- Tres a cinco temas, con lo que la persona ya ha dicho en público sobre cada uno: el programa, comunicados, entrevistas. La carpeta se arma solo con eso, y cada punto de mensaje lo cita.
- Su cuenta de Telegram, que se guarda fuera de la carpeta.
- Su visto bueno a que sus mensajes pasen por el proveedor de modelos durante la presentación.
- Una hora de alguien del equipo para el ensayo.

## 11. Qué no prueba la presentación

- **Que los límites de la ADR-018 bastan.** Los aplica en el caso más angosto posible: una conversación por titular, sin datos de votantes, sin publicación real. La revisión sigue teniendo que decidir el alcance de lectura, el modelo de amenazas, la auditoría, el trabajo sin conexión y la pantalla de BYOM.
- **Nada sobre el constructor de imágenes.** Las plantillas de arte no generan imágenes, a propósito.
- **Que la base de conocimiento escala.** Unos pocos documentos caben enteros en el prompt. Una base real necesita recuperación, y con ella preguntas de alcance de lectura que aquí no aparecen.
- **Nada sobre WhatsApp ni sobre la puesta en marcha con Meta.** Telegram evita la verificación de negocio, la revisión del nombre visible y la ventana de 24 horas, que son la parte lenta y restrictiva ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). La presentación no dice nada de cómo salen.
- **Que el agente aguanta a una persona hostil o descuidada.** La sala es de invitados, el registro está controlado y los costos tienen tope. Es una prueba con una sala amistosa, no con una abierta.
- **Que la gente lo va a adoptar.** Que a una candidata o a una presidenta le guste en una demostración no dice que su campaña lo vaya a usar todos los días.
- **Lo que costaría.** Los costos que enseña la pantalla del equipo son reales pero de una sola mañana. Sirven de orden de magnitud, no de precio.

## 12. Cómo se construye

Una aplicación en TypeScript sobre Cloudflare Workers, con D1 como libro de registro y R2 para las imágenes y los PDF del constructor de recursos, y un modelo de pesos abiertos en Workers AI. El modelo se escoge con una prueba comparativa corta entre Kimi K2.6, GLM-5.3 y DeepSeek V4 Pro, y Kimi K2.6 si no hay un ganador claro. Este no es el stack decidido en [system.md](../design/architecture/system.md): la demostración es desechable, y D1 se escogió en parte para probarlo de primera mano. D1 no tiene un canal en tiempo real, así que la pantalla del equipo lo consulta cada uno o dos segundos.

El arnés recibe el webhook de Telegram, verifica su token secreto, procesa cada actualización una sola vez, responde de inmediato y hace el trabajo después, y contiene el enrutamiento, el registro, la máquina de estados de las aprobaciones, el reloj de demostración y el publicador simulado. El libro de registro guarda titulares, piezas, versiones, aprobaciones atadas a una versión exacta, eventos de costo y el registro de mensajes, todo marcado como de demostración.

El plan de trabajo, con responsables, dependencias y líneas de corte, está en el repositorio de la demostración, en `docs/work-plan.md`. La meta es una corrida limpia de quince minutos para el lunes 2026-10-12. El orden:

1. Decisiones: stack, modelo, fórmula del canal, titulares, registro, retención.
2. Cimientos: el esquema del libro de registro, la interfaz del constructor de recursos con una simulación, el formato de la carpeta y su contenido, el webhook, el flujo de registro y el cliente del canal. El bot en sí es una configuración manual de quince minutos.
3. El ciclo: el constructor de texto, la alternativa de reserva y la historia de la mañana precargada.
4. La máquina de estados de las aprobaciones, y después la integración con el constructor de recursos real.
5. La pantalla del equipo, el reloj de demostración, el script de reinicio y las protecciones para las personas invitadas en vivo.
6. Una primera corrida de punta a punta, y después arreglos, un ensayo cronometrado, un ensayo general con papeles fijos y una corrida limpia desde el estado reiniciado, con una grabación de pantalla de respaldo.

Si el tiempo se acorta, los recortes van en este orden: la pantalla del equipo se reduce a la bandeja y el detalle del hilo, la ronda de cambios a una pieza, la historia de Instagram a un mockup estático, y un constructor de recursos tardío a una sola plantilla reutilizada. Si el segundo tipo de titular no está listo, la demostración corre un tipo en vivo y enseña el otro desde la grabación. Si el registro abierto no está sólido, el equipo crea de antemano el titular de cada presidenta.

## 13. Preguntas abiertas

1. **Los papeles el día de la presentación.** Quién narra, quién sostiene el teléfono y quién opera la pantalla del equipo, y si quien construye el constructor de recursos está disponible el fin de semana anterior.
2. **El documento de la interfaz del constructor de recursos.** Tiene que llegar al repositorio de la demostración antes de poder escribir el contrato y su simulación.
3. **Iniciar día.** Si el saludo lo dispara una persona, como sostiene esta especificación, o el reloj de demostración a las 5:30. El plan de trabajo solo dice que el saludo pasa a ser un mensaje iniciado por el bot una vez que el destinatario presionó `/start`. Un temporizador sería el caso de acción autónoma que el punto 2 de §7 deja fuera.
4. **Quién escribe la versión nueva.** El plan de trabajo dice que la escribe y la manda el equipo, y también lista «generación de v2» dentro de la máquina de estados de las aprobaciones. Falta decidir si el agente ofrece un borrador nuevo para que el equipo lo edite.
5. **Las grabaciones.** Una grabación de la presentación tiene la voz o las palabras de una persona real diciendo cosas que redactó un agente. No se enseña a otra campaña sin su permiso por escrito. La grabación de pantalla de respaldo lleva la misma marca de demostración.
6. **Qué se le ofrece a quien diga que sí.** La respuesta a «quiero usarlo mañana» es el piloto, y el piloto espera por la revisión de la ADR-018 para todo lo que tenga características de agente. Hace falta decir eso bien, y antes de que lo pregunten.
7. **A qué corresponde un comité.** La especificación no tiene un tipo de organización de comité regional (§6). Si un comité es una campaña bajo un partido o algo nuevo no se decide aquí.
