# Presentación pre-MVP: aprobar las piezas del día por WhatsApp

**Una demostración que funciona, para abrirle la puerta a GreenGrass con candidaturas reales**

Estado: presentación, no especificación. Nada de lo que describe queda aceptado, y la [ADR-018](../decisions/018-ai-agent-posture.md) sigue propuesta.
Código: en un repositorio aparte, `greengrass-demo`. No es código de GreenGrass.
Redactado: 2026-09-29

---

## 1. Para qué es

GreenGrass tiene una especificación completa y nada que se pueda enseñar. A una candidata no se le vende con 21 ADR. Se le vende con algo que le pase en su propio celular.

Esta presentación le enseña a una candidatura una sola cosa funcionando: el Agente de Campaña le escribe por WhatsApp, ella le contesta con una nota de voz, recibe sus puntos de mensaje y cuatro piezas para redes, aprueba cada una con un botón, el equipo pide cambios en dos y ella aprueba las versiones nuevas. Es el ejemplo desarrollado de la [ADR-018](../decisions/018-ai-agent-posture.md#ejemplo-desarrollado-aprobar-las-publicaciones-del-día-por-whatsapp), tal como lo dibujó el prototipo, con la candidata sosteniendo el teléfono.

Se escogió este flujo por tres razones:

1. **Pasa donde ya vive la candidata.** En los mercados objetivo, la campaña corre por WhatsApp. La presentación no le pide instalar nada ni aprender una pantalla nueva.
2. **Enseña la regla que hace confiable a GreenGrass.** Nada sale sin que una persona con nombre apruebe esa versión exacta. En la presentación eso no es una promesa: se ve.
3. **Le sirve a la revisión de la ADR-018.** Correr el ejemplo desarrollado con candidaturas reales deja evidencia concreta sobre los seis lugares donde toca el punto de decisión (§7).

## 2. Qué no es

- **No es el MVP.** El [MVP](mvp.md) prueba si organizaciones políticas soberanas van a juntar sus datos. Esta presentación no prueba ese supuesto ni ningún otro: sirve para abrir la conversación con las candidaturas. Las dos cosas no deben confundirse.
- **No es código de GreenGrass.** Vive en `greengrass-demo`, fuera de este corpus. Nada de ese código pasa a la plataforma sin cruzar antes la revisión de la ADR-018.
- **No acepta la ADR-018.** Corre dentro de los límites que la propuesta en revisión sugiere, y así los pone a prueba, pero no los decide. La ADR-018 sigue propuesta.
- **No publica nada.** Ninguna pieza llega a una cuenta real de X, Facebook ni Instagram.

## 3. Del lado seguro del punto de decisión

La [ADR-018 § La revisión condiciona la producción, no la experimentación](../decisions/018-ai-agent-posture.md#la-revisión-condiciona-la-producción-no-la-experimentación) pone la raya en producción y en cualquier despliegue que contenga registros reales de votantes, donantes o afiliados. La presentación se queda de este lado de la raya:

- **No contiene registros de votantes, donantes ni afiliados.** No hay CRM, no hay listas y no se carga ninguna.
- **El único dato personal real es el de la candidata:** sus mensajes, sus notas de voz y las fotos que su campaña aporta. Los da a sabiendas, en la demostración, y se le dice antes que su voz pasa por un proveedor de transcripción y sus mensajes por un proveedor de modelos. En GreenGrass esos serían los proveedores BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA) de su propia organización.
- **Todo se borra cuando termina la presentación**, salvo que la campaña pida quedarse con el registro.
- **No publica.** No hay credenciales de redes sociales en ningún lado del sistema.

Tres cosas la cruzarían al otro lado, y ninguna se hace mientras la ADR-018 siga propuesta: cargar una lista de contactos, conectar una cuenta real de redes sociales, o que la candidata siga usándolo en su día a día después de la presentación. Si una candidatura pide quedarse con la herramienta, la respuesta honesta es *todavía no*, y la invitación es al piloto.

## 4. El guion

Hacen falta dos personas. La candidata sostiene su teléfono. Alguien del equipo de GreenGrass, o de la campaña, opera la pantalla del equipo en una computadora que el público puede ver. En el prototipo la mañana va de las 5:30 a las 7:18. En la presentación dura unos quince minutos, y las horas de publicación corren en un reloj de demostración.

### Antes de empezar

1. La candidata guarda el número del Agente de Campaña y le escribe «Hola» desde un enlace `wa.me` o un código QR. Eso abre la ventana de conversación de 24 horas y deja constancia de su consentimiento expreso. Sin ese primer mensaje, el agente solo podría escribirle con un mensaje de plantilla aprobado por Meta.
2. El día antes, alguien de su equipo ensaya el recorrido con la carpeta ficticia (§8).

### La mañana

3. En la pantalla del equipo, una persona toca **Iniciar día**. El Agente de Campaña saluda a la candidata por su nombre y le pregunta en qué se enfocan hoy.
4. La candidata contesta con una nota de voz: el tema, el tono y lo que tenga en agenda. En el prototipo, la falta de servicio de agua, con tono firme pero no alarmista, y una entrevista de radio esa mañana.
5. El agente transcribe la nota, redacta los puntos de mensaje a partir de la base de conocimiento de la candidatura y los manda en un PDF, con un resumen de tres mensajes cortos. Cada punto cita el pasaje en que se apoya. Donde la base no tiene el dato, deja un marcador como `[PROPUESTA]` en vez de inventarlo. Es la salvaguarda de la [ADR-013](../decisions/013-analytics-ai.md), y vale la pena señalarla en voz alta.
6. El agente recomienda cuatro piezas. Cada una llega como su propia tarjeta de WhatsApp: una imagen con el mockup de cómo se vería en la red, el número de la pieza, la red, la hora a la que saldría y tres botones: **Aprobado**, **Pedir cambios** y **Descartar**.
7. La candidata toca un botón en cada tarjeta. El agente confirma cuántas quedaron aprobadas.

### La ronda de cambios

8. En la pantalla del equipo, alguien pide cambios en dos piezas. El comentario es obligatorio, como en el [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): «más corta y conectada con la entrevista», «la foto del camión cisterna en vez de la conferencia». Cada pedido abre una ronda nueva y anula la aprobación anterior de esa pieza.
9. El agente hace los cambios y le manda a la candidata las segundas versiones, que ella aprueba desde WhatsApp. Si es ella quien toca **Pedir cambios**, el agente le pregunta qué cambiaría y toma su próximo mensaje, de texto o de voz, como el comentario. Es el mismo camino que el pedido del equipo.

### Cierre

10. El reloj de demostración avanza. El publicador simulado marca cada pieza como publicada a su hora, y el agente le avisa a la candidata cuando sale cada una. Si alguna versión nueva quedó sin aprobar, no sale, y la pantalla lo muestra.
11. La pantalla del equipo enseña lo que el público no vio en el teléfono: el espejo de la conversación, las rondas de cada pieza lado a lado, quién aprobó qué versión y por qué canal, y lo que costó cada llamada, trasladado al costo.

## 5. Qué es real y qué se simula

| Paso | Estado | Cómo |
|---|---|---|
| Conversación de WhatsApp, tarjetas y botones | Real | WhatsApp Cloud API. Cada pieza es un mensaje interactivo con la imagen en el encabezado y tres botones de respuesta |
| Transcripción de la nota de voz | Real | Un proveedor de transcripción |
| Puntos de mensaje y texto de las piezas | Real | Un proveedor de modelos, con salida estructurada |
| PDF de los puntos de mensaje | Real | Plantilla HTML convertida a PDF |
| Artes y mockups de cada red | Real | Plantillas de arte convertidas a imagen, con las fotos de la campaña. No se genera ninguna imagen |
| Rondas, versiones y aprobaciones | Real | Base de datos de la presentación |
| Pedido de cambios del equipo | Real | La pantalla del equipo |
| Estrategia y base de conocimiento | Simplificado | Documentos cortos que entran enteros al prompt. Sin recuperación |
| Calendario de la candidata | Simulado | Un archivo en la carpeta de la candidatura |
| Programación y publicación | Simulado | Reloj de demostración y publicador simulado. Nada llega a una red social |
| Número propio de WhatsApp Business de la organización | Simulado | Un número de la presentación, compartido por todas las candidaturas (§8) |

Queda además una **alternativa de reserva**: para el tema acordado con cada campaña, la carpeta guarda una salida ya generada. Si el proveedor de modelos o la red fallan en vivo, la conversación sigue con esa salida. La parte de WhatsApp sigue siendo real.

## 6. Cómo se traza sobre GreenGrass

Cada pieza de la presentación corresponde a algo que la especificación ya nombra, y en dos casos a algo que todavía está propuesto.

| En la presentación | En GreenGrass | Estado |
|---|---|---|
| La carpeta de una candidatura | Una organización de tipo Candidato ([users.md § Jerarquía organizativa](users.md#jerarquía-organizativa)). Todo registro lleva la organización a la que pertenece | Aceptado |
| El adaptador de WhatsApp | Transporte por canal ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#transporte-por-canal)), sobre la arquitectura de [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp) | Aceptado |
| La redacción de los puntos de mensaje y de las piezas | El constructor de texto ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#constructores-el-texto-se-acepta-las-imágenes-y-el-video-quedan-propuestos)), con una diferencia que importa: aquí lo invoca el agente, no una persona con un encargo | La diferencia es lo que decide la ADR-018 |
| Las plantillas de arte | Ninguno. Componen recursos que la campaña ya tiene y no generan nada, así que no son el constructor de imágenes | Fuera del punto de decisión |
| Piezas, rondas, versiones y aprobaciones | El [flujo de contenido](../decisions/021-content-approval-pipeline.md#el-flujo-de-contenido-generaliza-la-aprobación-de-publicaciones): cada ronda se guarda y todo pedido de cambios lleva comentario | Aceptado |
| Los eventos de uso con su costo | La medición de uso y el traslado al costo de la [ADR-019](../decisions/019-central-services-and-metered-billing.md#dos-planos-de-facturación-y-sin-margen-en-el-segundo) | Aceptado |
| El registro de cada aprobación | La relación «en nombre de», propuesta para el punto 3 de la [ADR-018](../decisions/018-ai-agent-posture.md#qué-tiene-que-resolver-esta-adr) | Propuesto |
| El publicador simulado | El adaptador de redes sociales ([system.md § Redes sociales](../design/architecture/system.md#redes-sociales)), sin conectar | Aceptado, no usado |
| El Agente de Campaña | El arnés de agentes de la ADR-018, reducido a una sola conversación | Propuesto |

## 7. Los seis puntos del ejemplo desarrollado, en la presentación

El ejemplo desarrollado de la ADR-018 toca el punto de decisión en seis lugares. La presentación no decide ninguno. Lo que hace es escoger, en cada uno, el lado más conservador que todavía deja ver el flujo.

| Punto | Qué hace la presentación |
|---|---|
| 1. El alcance de lectura | El agente lee los mensajes de la candidata, la estrategia y la base de conocimiento de su carpeta, y el calendario. No hay contactos, registros de votantes ni donaciones que leer: no existen en la presentación |
| 2. Habla primero | No. Una persona toca **Iniciar día**, y la conversación ya está abierta porque la candidata escribió primero. La versión en que el agente escribe solo a una hora fija no se demuestra |
| 3. Las imágenes generadas | No hay. Los artes salen de plantillas y de fotos reales de la campaña, usadas con su permiso. La pregunta sobre la persona identificable queda intacta para la revisión |
| 4. Quién despacha | El agente coloca en la programación la versión aprobada, y nada más. El publicador simulado solo toma versiones aprobadas. El agente no tiene credencial para publicar, y en la presentación no existe ninguna. Así se ve la respuesta propuesta —el toque en Aprobado cuenta como el envío de la candidata— sin decidirla |
| 5. Los cambios después de la aprobación | Una versión nueva anula la aprobación anterior. Si a su hora no está aprobada, no sale. La presentación puede dejar una versión sin aprobar a propósito para que se vea |
| 6. La auditoría | Cada aprobación registra a la candidata como actor, al agente como canal y la versión exacta. Es un borrador de la relación «en nombre de», no el modelo de auditoría que la revisión tiene que definir |

## 8. Una carpeta por candidatura

La presentación tiene que poder correr con cualquier candidatura sin tocar el código. Todo lo que es propio de una candidatura vive en su carpeta, y la aplicación carga la que se le indique. Añadir una candidatura es trabajo de datos, no de programación.

### Qué va en la carpeta

```
packs/
  _example/            candidatura ficticia; para desarrollo y ensayos
  juan-dalmau/
    pack.yaml          nombre, cuentas por red, partido, idioma, zona horaria,
                       redes activas, horarios de publicación, identidad visual
                       y juego de plantillas que usa
    photos/            fotos de la campaña + photos.yaml (temas, crédito,
                       si sale la candidata)
    knowledge/         estrategia, guía de tono, un documento por tema
    calendar.yaml      calendario simulado
    replay/            alternativa de reserva para el tema acordado
brands/
  pip/  mvc/  alianza/ logo, tipografías, tokens de diseño, dominio, etiquetas
templates/
  sets/<nombre>/       juegos de plantillas de arte
  frames/              mockups de X, Facebook, Instagram y stories
  documents/           el PDF de los puntos de mensaje
locales/
  es-PR.yaml           los textos del agente y de los botones
```

La identidad visual vive aparte de la carpeta porque se comparte: dos candidaturas del mismo partido usan la misma, y cada carpeta dice si usa la de su partido o la de la Alianza. Los números de teléfono y las llaves de los proveedores nunca van en la carpeta; van en la configuración del despliegue. Así una carpeta se puede compartir sin exponer el teléfono de nadie.

### Las plantillas de arte se cambian aparte

Un juego de plantillas de arte trae las disposiciones —titular sobre foto, solo tipografía, tarjeta de evento para stories, cita— y no trae colores ni tipografías: los toma de los tokens de diseño de la identidad visual. Una carpeta escoge un juego y puede reemplazar una plantilla suelta. Los mockups de cada red son de todas. Cada plantilla con foto tiene su variante de solo tipografía, que se usa cuando el banco de fotos no tiene nada para el tema del día.

### Un número compartido, enrutado por remitente

En GreenGrass cada organización tiene su propia cuenta de WhatsApp Business ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). La presentación usa un solo número para todas las candidaturas, identifica a cada una por el número del que escribe y enruta la conversación a su carpeta. Una carpeta puede traer su propio número si la campaña lo tiene. La pantalla del equipo es una por candidatura, con su propio código de acceso: lo de una campaña nunca aparece en la presentación de otra.

### Añadir una candidatura

- `pack:new <nombre>` copia la carpeta ficticia.
- `pack:check <nombre>` valida la carpeta, genera todas las plantillas con textos de muestra en una hoja de contactos, y falla si alguna se rompe con las tipografías de esa identidad visual o con el largo de ese nombre.
- Los ensayos corren siempre con la carpeta ficticia y el teléfono de quien desarrolla. La carpeta de una candidatura real solo se usa en el último ensayo y en la presentación.

## 9. La primera ronda de candidaturas

| Candidatura | Partido | Carpeta |
|---|---|---|
| Juan Dalmau | PIP | `juan-dalmau` |
| María de Lourdes Santiago | PIP | `maria-de-lourdes-santiago` |
| Eva Prados | MVC | `eva-prados` |
| Manuel Natal | MVC | `manuel-natal` |

Las cuatro son de Puerto Rico y en español, así que la ronda pone a prueba cambiar de candidatura y de identidad visual, pero no de idioma. Cambiar de idioma está previsto —un archivo nuevo en `locales/` y una plantilla de WhatsApp aprobada en ese idioma— y no se ejerce.

Son los dos partidos del [piloto](mvp.md#3-los-partidos). Eso tiene dos consecuencias. Cada candidatura es su propia organización, y nada de una aparece en la presentación de otra, que es la misma regla que el piloto le promete a cada partido. Y [la asimetría entre los dos partidos](mvp.md#la-asimetría-es-el-hecho-más-importante-de-este-plan) aplica aquí también: la carpeta la arma GreenGrass, y a la campaña se le pide lo mínimo.

## 10. Qué aporta cada campaña

- Entre cinco y diez fotos que la campaña tenga derecho a usar, con una palabra o dos sobre de qué es cada una.
- Su identidad visual, o el permiso para usar la del partido o la de la Alianza.
- Sus cuentas públicas en cada red.
- Tres a cinco temas, con lo que la candidata ya ha dicho en público sobre cada uno: el programa, comunicados, entrevistas. La base de conocimiento se arma solo con eso, y cada punto de mensaje lo cita.
- El número de WhatsApp de la candidata, que se guarda fuera de la carpeta.
- El visto bueno de la candidata a que su voz y sus mensajes pasen por los proveedores de transcripción y de modelos durante la presentación.
- Una hora de alguien del equipo para el ensayo.

## 11. Qué no prueba la presentación

- **Que los límites de la ADR-018 bastan.** Los aplica en el caso más angosto posible: una conversación, sin datos de votantes, sin publicación real. La revisión sigue teniendo que decidir el alcance de lectura, el modelo de amenazas, la auditoría, el trabajo sin conexión y la pantalla de BYOM.
- **Nada sobre el constructor de imágenes.** Las plantillas de arte no generan imágenes, a propósito.
- **Que la base de conocimiento escala.** Unos pocos documentos caben enteros en el prompt. Una base real necesita recuperación, y con ella preguntas de alcance de lectura que aquí no aparecen.
- **La puesta en marcha con Meta.** El número compartido evita la verificación de negocio de cada organización, que es la parte lenta ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)).
- **Que las candidaturas lo van a adoptar.** Que a una candidata le guste en una demostración no dice que su campaña lo vaya a usar todos los días.
- **Lo que costaría.** Los costos que enseña la pantalla del equipo son reales pero de una sola mañana. Sirven de orden de magnitud, no de precio.

## 12. Cómo se construye

Una aplicación en TypeScript con SvelteKit, del stack decidido en [system.md](../design/architecture/system.md), que atiende el webhook de WhatsApp, la pantalla del equipo y los trabajos en segundo plano en un solo proceso. SQLite como base de datos, que puede pasar a PostgreSQL. Playwright para convertir las plantillas en imágenes y en PDF.

El orden:

0. **La cuenta con Meta**, primero, porque la revisión del nombre visible y de la plantilla toma días: cuenta de negocio, aplicación, número dedicado, nombre visible, plantilla de saludo.
1. Un webhook y una tarjeta con tres botones que llega a un teléfono.
2. El formato de la carpeta, la carpeta ficticia, `pack:new` y `pack:check`.
3. Las plantillas convertidas en imagen y en PDF, con la hoja de contactos.
4. Piezas, versiones, aprobaciones, auditoría y eventos de uso.
5. El flujo del agente: saludo, nota de voz, transcripción, redacción, PDF y cuatro tarjetas.
6. La ronda de cambios, desde el equipo y desde la candidata, y la pantalla del equipo.
7. El publicador simulado, el reloj de demostración, el panel de auditoría y costos, y el espejo de la conversación.
8. La alternativa de reserva, los ensayos con la carpeta ficticia, y después la carpeta de cada candidatura.

## 13. Preguntas abiertas

1. **El nombre visible del número.** Meta puede rechazar uno genérico como «Agente de Campaña». La alternativa es registrarlo como «GreenGrass» y que cada candidata guarde el contacto con el nombre del agente.
2. **La identidad visual de cada candidatura:** la de su partido o la de la Alianza. La decide cada campaña.
3. **Cuánto se guarda después.** La regla es borrar todo al terminar. Falta decidir si una campaña puede quedarse con su registro y por cuánto tiempo.
4. **Las grabaciones.** Una grabación de la presentación tiene la voz de una candidata real diciendo cosas que redactó un agente. No se enseña a otra campaña sin su permiso por escrito.
5. **Qué se le ofrece a quien diga que sí.** La respuesta a «quiero usarlo mañana» es el piloto, y el piloto espera por la revisión de la ADR-018 para todo lo que tenga características de agente. Hace falta decir eso bien, y antes de que lo pregunten.
