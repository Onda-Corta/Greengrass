# Prensa, medios y comunicaciones públicas

## Propósito

Este documento especifica las capacidades de prensa y medios de GreenGrass: cómo una campaña maneja sus relaciones con periodistas, distribuye materiales de prensa, da seguimiento a la cobertura, administra el contenido de cara al público y coordina su presencia en redes sociales.

Las campañas viven y mueren por los medios ganados —la cobertura que no se paga—. Para campañas con recursos limitados en el Sur Global, los medios ganados suelen ser la forma más barata de llegar a los votantes, mucho más que la publicidad pagada. Un comunicado de prensa bien puesto, una publicación viral o una nota favorable pueden pesar más que semanas de puerta a puerta. La plataforma tiene que poner las operaciones de prensa al alcance de campañas que quizá no tengan un secretario de prensa dedicado.

Esta especificación se apoya en: workflows.md (integración con redes sociales, eventos de entrega de activismo), users.md (rol de Director de comunicaciones, perfiles públicos, tipo de registro Contacto), messaging.md (solicitudes de aprobación del candidato para contenido de prensa), compliance.md (avisos legales en contenido público) y system.md (arquitectura de adaptadores de redes sociales).

## Filosofía de prensa y medios

1. **Los medios ganados son el alcance más barato que tiene una campaña.** Con presupuesto limitado, la cobertura de prensa compra más atención por peso que cualquier otro canal. Las operaciones de prensa merecen en la plataforma el mismo soporte que el trabajo de campo o la recaudación de fondos.
2. **Relaciones, no envíos masivos.** El trabajo de prensa que funciona se basa en relaciones con periodistas concretos, no en correos masivos. El manejo de contactos del CRM tiene que tratar las relaciones con medios como asunto de primer orden.
3. **Comunicación pública consciente del cumplimiento.** Todo contenido de cara al público — comunicados, publicaciones en redes, declaraciones — tiene que llevar el aviso legal que corresponda a su jurisdicción (compliance.md). La plataforma lo hace cumplir automáticamente.
4. **La voz pública la controla el candidato.** Nada sale al público sin que el candidato lo sepa. El flujo de aprobación (messaging.md) asegura que revise el contenido público antes de que se distribuya.

## Manejo de contactos de medios

### Los contactos de medios son registros del CRM

Los contactos de medios usan el tipo de registro Contacto que ya existe ([users.md § Contacto](users.md#contacto)) con campos propios de prensa:

- **Medio** — la publicación, emisora o plataforma donde trabaja el periodista
- **Fuente** — qué cubre el periodista (política, gobierno local, educación, trabajo, etc.)
- **Área de cobertura** — alcance geográfico de su cobertura (nacional, estatal o provincial, ciudad, distrito)
- **Preferencias de contacto** — cómo prefiere recibir propuestas (correo, teléfono, WhatsApp, Signal)
- **Idioma** — en qué idiomas trabaja
- **Estado de la relación** — fría, tibia, establecida, cercana (seguimiento informal para el equipo de prensa)
- **Notas** — notas libres sobre la relación (cifradas según el modelo de datos)
- **Fecha del último contacto** — se llena sola desde el historial de comunicación

### Listas de medios

Listas curadas de periodistas para contacto dirigido:

- **Creación de listas** — el equipo crea listas con nombre (por ejemplo, "Reporteros de política — San Juan", "Fuente nacional de educación", "Columnistas amigables")
- **Listas dinámicas** — se definen por criterios (fuente + área de cobertura + idioma) y se actualizan solas a medida que se añaden o modifican contactos
- **Listas estáticas** — curadas a mano para fines específicos (por ejemplo, "Grupo de prensa de la noche del debate")
- **Compartir listas** — las listas de medios son un recurso de la organización, visible para todo el personal con permisos de prensa

### Registro de interacciones con medios

Cada interacción con un contacto de medios queda registrada:

- **Propuesta enviada** — qué se propuso, cuándo, por qué canal y quién lo hizo
- **Respuesta recibida** — qué contestó el periodista (interesado, pasó, necesita más información, sin respuesta)
- **Entrevista agendada** — fecha, hora, formato (presencial, teléfono, video), tema, quién da la entrevista (el candidato o un vocero)
- **Cobertura obtenida** — enlace al artículo o segmento resultante, tono (positivo, neutral, negativo, mixto)
- **Seguimiento pendiente** — recordatorio para volver a hablar con un periodista después de un evento, un anuncio o una propuesta

Esto arma una foto completa de las relaciones de la campaña con la prensa y le permite a personal nuevo ponerse al día rápido (algo crítico dada la rotación en las campañas).

## Contenido de prensa

### Comunicados de prensa

- **Constructor de comunicados** — plantilla estructurada con: titular, subtítulo, lugar y fecha, cuerpo, bloques de cita (atribuidos a personas con nombre), texto institucional (descripción de la organización) e información de contacto
- **Integración con cumplimiento** — el aviso legal se añade automáticamente según la jurisdicción (compliance.md). Los comunicados de campañas políticas suelen requerir "pagado por" o su equivalente.
- **Flujo de aprobación** — los comunicados pasan por el flujo de aprobación del candidato ([messaging.md § Comunicación en alianzas](messaging.md#comunicación-en-alianzas)). El candidato aprueba, rechaza o comenta. La aprobación queda registrada para auditoría.
- **Distribución** — envío del comunicado aprobado a las listas de medios seleccionadas por correo. Admite personalización (nombre del periodista, notas específicas por medio).
- **Embargo informativo** — se puede marcar un comunicado como embargado hasta una fecha y hora. El aviso de embargo va incluido en la distribución. La plataforma registra quién recibió el material embargado.
- **Versionado** — los comunicados guardan historial de versiones. Si uno se actualiza después de distribuirse (corrección, actualización), la plataforma puede enviar la versión nueva señalando los cambios.

### Avisos a medios

Notificaciones más cortas para alertar a la prensa sobre eventos próximos:

- **Plantilla de aviso** — formato de quién, qué, cuándo, dónde y por qué. Más simple que un comunicado completo.
- **Integración con eventos** — los avisos se pueden crear directamente desde un evento de la plataforma (workflows.md). Los datos del evento llenan los campos del aviso.
- **Distribución** — la misma distribución por listas de medios que los comunicados.

### Declaraciones

Declaraciones oficiales de la campaña en respuesta a hechos:

- **Plantilla de declaración** — atribuida a una persona con nombre (candidato, vocero, liderazgo de la organización). Más corta y más reactiva que un comunicado.
- **Aprobación rápida** — las declaraciones suelen tener que salir ya. El flujo de aprobación admite marcar prioridad para contenido urgente.
- **Distribución** — a listas de medios, a los perfiles públicos y a redes sociales.

### Kit de prensa

Una colección permanente de materiales de campaña para consulta de los periodistas:

- **Componentes:** biografía del candidato, fotos en alta resolución (retrato, fotos en acción), descripción y texto institucional de la organización, posiciones clave de política pública, hojas informativas, logo y recursos de marca
- **Alojamiento** — el kit vive en la página pública de la campaña (ver Perfiles públicos más abajo). Se puede descargar como ZIP o navegar en línea.
- **Registro de acceso** — opcionalmente se registra qué periodistas acceden al kit (requiere que el periodista deje su correo o haga clic en un enlace rastreado).

**DECIDIDO: Configurable por recurso.** La campaña controla el acceso recurso por recurso. La biografía y el texto institucional pueden ser completamente públicos, mientras que las fotos en alta resolución o las hojas informativas internas pueden quedar restringidas (el periodista deja su correo para acceder). El acceso restringido crea automáticamente el registro de contacto de medios en el CRM. Cada campaña decide por su cuenta dónde está la línea entre alcance y recolección de información.

## Seguimiento de cobertura

### Registro de cobertura

Cuando la interacción con un contacto de medios produce cobertura:

- **Entrada de cobertura** — el equipo registra: medio, periodista, fecha de publicación, titular, URL (si es en línea), formato (artículo, segmento de TV, radio, pódcast, mención en redes), tono (positivo, neutral, negativo, mixto), etiquetas de tema, alcance estimado (si se sabe)
- **Cobertura ligada a la propuesta** — cada entrada de cobertura enlaza de vuelta a la propuesta o interacción que la generó, cerrando el circuito de propuesta a cobertura
- **Cobertura ligada al comunicado** — si la cobertura salió de un comunicado específico, ese vínculo queda registrado

**DECIDIDO: Aplazado, pero marcado como oportunidad estratégica.** Por ahora, solo registro manual. El monitoreo automático de medios se aplaza no por falta de importancia, sino porque merece una inversión seria y no una integración pegada con cinta adhesiva. Los servicios de monitoreo que existen (Meltwater, Cision, etc.) son caros, están centrados en Occidente y cubren mal a los medios regionales y locales del Sur Global. Ahí hay un hueco de mercado grande. Un monitoreo de medios nativo de GreenGrass —especialmente uno que cubra medios en lenguas locales de los países objetivo— podría ser un diferenciador mayor. Retomarlo como iniciativa de producto dedicada, no como añadido.

### Analítica de cobertura

- **Volumen de cobertura** — cobertura total en el tiempo, por medio y por tono
- **Tasa de propuesta a cobertura** — porcentaje de propuestas que terminaron en cobertura
- **Capacidad de respuesta de periodistas** — qué periodistas responden más a las propuestas de la campaña
- **Análisis de temas** — qué temas de la campaña generan más cobertura
- **Alcance estimado** — alcance agregado de toda la cobertura (donde haya datos de alcance del medio)

## Contenido de cara al público

### Perfiles públicos

Según product.md: perfiles públicos para candidatos, organizaciones y, opcionalmente, otros usuarios.

#### Perfil del candidato

- **Contenido:** nombre, foto, biografía, posiciones de política pública, respaldos, información de contacto de la campaña, enlaces a redes sociales
- **Multilingüe:** el contenido está disponible en los idiomas configurados por la organización (geography.md)
- **Aviso legal:** se muestra automáticamente el aviso que exija la jurisdicción
- **Integración de donaciones** — formulario de donación embebido o botón de donar prominente que lleva a la página de donaciones de la campaña (fundraising.md)
- **Eventos** — los próximos eventos públicos se muestran en el perfil (desde el sistema de eventos, workflows.md)

#### Perfil de la organización

- **Contenido:** nombre, logo, misión, liderazgo, información de contacto, enlaces a redes sociales
- **Mostrar la alianza** — si la organización pertenece a una alianza, hay opción de mostrar esa membresía y enlazar a los perfiles de las organizaciones aliadas
- **Integración de donaciones** — igual que en el perfil del candidato

#### Alojamiento de los perfiles

**DECIDIDO: Las dos cosas — alojamiento en la plataforma por defecto + acceso por API.** Los perfiles alojados en la plataforma funcionan de entrada en el subdominio de la organización o en un dominio propio, con un constructor de perfiles basado en plantillas. El acceso por API queda disponible para campañas que quieran mostrar el contenido en su propio sitio con control total del diseño. La versión alojada siempre está ahí como respaldo, para que toda campaña tenga presencia pública sin importar su capacidad técnica.

### Manejo de redes sociales

Según workflows.md (486-488) y system.md (632-643), el manejo de redes sociales está dentro de alcance con estas capacidades:

#### Creación y programación de publicaciones

- **Editor multiplataforma** — crear publicaciones para varias plataformas desde una sola interfaz. La vista previa por plataforma muestra cómo se va a ver la publicación en cada una (límites de caracteres, formatos de medios, vistas previas de enlaces).
- **Programación** — programar publicaciones a futuro. La vista de calendario muestra todo lo programado y lo publicado.
- **Adjuntos** — adjuntar imágenes, video, enlaces. Formato específico por plataforma (por ejemplo, Instagram requiere imágenes; Twitter/X tiene límite de caracteres).
- **Integración con cumplimiento** — los requisitos de aviso legal para publicidad política en redes varían según la plataforma y la jurisdicción. La plataforma advierte cuando una publicación puede necesitar aviso legal y ayuda a añadirlo en el formato que corresponde.

#### Plataformas admitidas

Según system.md, una arquitectura modular de adaptadores permite integrar cada plataforma:

- **Plataformas de lanzamiento:** Facebook, Instagram, Twitter/X
- **Plataformas futuras:** TikTok, LinkedIn, YouTube (se añaden escribiendo adaptadores nuevos)
- **Prioridades por país:** WhatsApp Status (Brasil), LINE (Tailandia); las preferencias de plataforma varían según el mercado

**DECIDIDO: Las dos cosas — OAuth + alternativa de copiar y pegar.** Conexión directa por OAuth donde exista y la plataforma la apruebe. Alternativa de copiar y pegar, con descarga del material, para plataformas donde el acceso por API no exista o esté restringido para contenido político. La vía de copiar y pegar es una red de seguridad crítica dada la tendencia de las plataformas a restringir cada vez más el acceso por API al contenido político: la plataforma nunca puede quedar en una posición donde un cambio de política de un tercero le rompa a una campaña su capacidad de publicar.

#### Flujo de aprobación de publicaciones

- **Borrador → Revisión → Aprobación → Programar o publicar** — las publicaciones en redes siguen el mismo flujo de aprobación del candidato que los comunicados de prensa ([messaging.md § Comunicación en alianzas](messaging.md#comunicación-en-alianzas)).
- **Aprobación por lote** — el candidato puede revisar y aprobar varias publicaciones programadas en una sola sesión.
- **Salida de emergencia** — el Administrador de la organización o el Director de comunicaciones puede publicar sin aprobación del candidato cuando la respuesta es urgente (queda registrado para auditoría y se le avisa al candidato después).

#### Analítica

- **Métricas por publicación** — interacción (me gusta, compartidos, comentarios, clics), alcance, impresiones. Se traen de las APIs de cada plataforma donde estén disponibles.
- **Panel multiplataforma** — desempeño agregado en redes sociales a través de todas las plataformas.
- **Desempeño por tipo de contenido** — qué tipo de contenido (política pública, personal, ataque, promoción de eventos) funciona mejor en cada plataforma.
- **Crecimiento de audiencia** — tendencias de seguidores o suscriptores en el tiempo, por plataforma.

### Manejo de respaldos

Un respaldo es otra persona diciendo, con sus propias palabras, que apoya al candidato. Para casi toda campaña es el activo de comunicación pública más valioso que tiene.

- **Registros de respaldo** — se registra: nombre de quien respalda, cargo, organización (si aplica), fecha en que se recibió, si es público o privado, el texto del respaldo (la cita) y foto
- **Quien respalda es un Contacto** — quienes respaldan se llevan como registros de Contacto en el CRM ([users.md § Contacto](users.md#contacto)), lo que liga el respaldo a la relación más amplia
- **Despliegue público** — los respaldos aprobados se pueden mostrar en el perfil público del candidato, organizados por categoría (cargos electos, organizaciones, líderes comunitarios, personas individuales)
- **Anuncio del respaldo** — cuando llega un respaldo nuevo, la plataforma puede generar un comunicado de prensa a partir de una plantilla (cita de quien respalda, cita de respuesta del candidato, texto institucional) y una publicación para redes

**DECIDIDO: Embudo completo.** Los respaldos se manejan como un embudo: identificado → contactado → considerando → comprometido → público. Le da a la campaña una vista clara de su estrategia de respaldos, de su avance y de sus huecos. Cada etapa puede tener notas, personal asignado y fechas objetivo. Cuando un respaldo pasa a "público", se dispara el flujo de anuncio (plantilla de comunicado + generación de publicación en redes).

## Manejo de voceros

### Voceros designados

- **Designación de voceros** — el Administrador de la organización designa qué personas del equipo están autorizadas a hablar con la prensa en nombre de la campaña. Es una marca de permiso, no un rol aparte.
- **Asignación de temas** — a los voceros se les pueden asignar áreas temáticas (por ejemplo, "preguntas de política pública → Director de política", "preguntas de recaudación → Director de finanzas", "todo lo demás → Gerente de campaña")
- **Enrutamiento de contactos** — cuando un periodista contacta a la campaña por la plataforma (formulario del perfil público o kit de prensa), la consulta se enruta al vocero que corresponde según el tema

### Puntos de mensaje

- **Biblioteca de puntos de mensaje** — una colección administrada de puntos de mensaje aprobados, organizada por tema. El equipo y el candidato la consultan al prepararse para entrevistas o al escribir contenido.
- **Control de versiones** — los puntos de mensaje se versionan. Cuando una posición evoluciona, la versión vieja se archiva y se publica la nueva. El equipo siempre ve el lenguaje aprobado vigente.
- **Distribución** — los puntos de mensaje se pueden empujar al personal designado por el sistema de mensajería interna (messaging.md) cuando se actualizan.
- **Integración con los informes al candidato** — los puntos de mensaje alimentan los mensajes de informe al candidato ([messaging.md § Comunicación en alianzas](messaging.md#comunicación-en-alianzas)). Antes de una entrevista o un acto de prensa, el candidato recibe los puntos relevantes.

## Eventos de prensa

### Manejo de conferencias de prensa y actos con medios

- **Creación del evento** — las conferencias de prensa y los actos con medios usan el sistema de eventos que ya existe (workflows.md) con campos propios de prensa: aviso a medios enviado (sí/no/fecha), grupo de prensa invitado (qué lista de medios), formato de cobertura esperado (TV, prensa escrita, foto)
- **Confirmaciones de prensa** — registro de qué periodistas confirmaron asistencia
- **Después del acto** — registrar la cobertura resultante y enlazarla a las entradas de cobertura

### Agendado de entrevistas

- **Solicitudes de entrevista** — se registran las solicitudes que entran con: periodista, medio, tema, formato pedido, fecha y hora pedidas, a quién se quiere entrevistar
- **Preparación** — la plataforma trae a la vista los puntos de mensaje relevantes al tema y la cobertura reciente del medio que pide la entrevista
- **Seguimiento** — después de la entrevista se registra el resultado (salió al aire o se publicó, se cayó, pendiente) y se enlaza a la cobertura resultante

## Consideraciones por jurisdicción

### Avisos legales de publicidad política en redes sociales

Según compliance.md, el contenido de cara al público requiere avisos legales específicos por jurisdicción:

- **EE. UU. y Puerto Rico** — "Pagado por [nombre del comité]" en toda publicidad política, incluidos los anuncios en redes. Las publicaciones orgánicas también pueden necesitar aviso, según la jurisdicción y el contenido.
- **Brasil** — el TSE exige identificar la publicidad política. Las publicaciones en redes durante el período de campaña tienen que cumplir las reglas del TSE.
- **Tailandia** — regulaciones de la ECT sobre publicidad política. Las restricciones del período de campaña aplican a las redes sociales.
- **India** — el Código Modelo de Conducta de la ECI restringe ciertas comunicaciones durante los períodos electorales. Las publicaciones en redes pueden requerir certificación previa si son pagadas.
- **Líbano** — requisitos menos formales, pero la ley electoral restringe ciertas comunicaciones de campaña durante el período de veda.

La plataforma advierte automáticamente cuando una publicación puede necesitar aviso legal y ayuda a aplicarlo en el formato que corresponde (por ejemplo, texto sobrepuesto en imágenes, primera línea del pie en publicaciones de texto).

### Diferencias en el panorama de medios

- **Puerto Rico** — mercado de medios bilingüe (español/inglés). TV y radio locales fuertes. Los medios digitales creciendo. Los medios nacionales de EE. UU. cubren las elecciones de PR de vez en cuando.
- **Brasil** — mercado de redes sociales enorme. WhatsApp es el canal dominante (incluso para compartir noticias). La TV sigue siendo influyente. El TSE obliga a dar tiempo gratuito de TV y radio a las campañas (*horário eleitoral*).
- **Tailandia** — LINE es una plataforma mayor junto a Facebook. Influencia del gobierno sobre los medios tradicionales. Los medios independientes en línea pesan. Las leyes de lesa majestad afectan lo que se puede decir en público (compliance.md).
- **India** — mercado de medios enorme y fragmentado. WhatsApp y YouTube son los canales digitales dominantes. Los medios en lenguas regionales son críticos. La ECI monitorea las redes sociales durante las elecciones.
- **Líbano** — panorama de medios confesional (medios alineados con grupos políticos y religiosos). WhatsApp domina la mensajería. Las redes sociales son el canal principal para llegar a los votantes jóvenes. Hay mercados de medios en árabe, francés e inglés.

## Requisitos técnicos

### Arquitectura de adaptadores de redes sociales

Según system.md (632-643):

```
Tenant App → Post Scheduler → Platform Adapter → Social Media API
```

- Un adaptador por plataforma
- Interfaz común: `publish(post)`, `schedule(post, time)`, `getAnalytics(post_id)`, `getAudience()`
- Los adaptadores absorben las rarezas de cada plataforma (límites de caracteres, formatos de medios, límites de tasa de la API, autenticación)
- Las plataformas nuevas se añaden escribiendo adaptadores nuevos, sin tocar el núcleo
- Límite de tasa según lo que exija la API de cada plataforma
- Manejo de refresco de token y reautenticación

### Renderizado de los perfiles públicos

- **Renderizado en el servidor** — los perfiles públicos se renderizan del lado del servidor, por SEO y por velocidad de carga
- **Adaptable a dispositivos móviles** — los perfiles se ven bien en cualquier dispositivo
- **Multilingüe** — los perfiles sirven el contenido en el idioma preferido de quien visita (con anulación manual, según geography.md)
- **Rendimiento** — los perfiles públicos tienen que cargar rápido incluso con conexiones lentas (crítico en los mercados objetivo). Optimizar imágenes, minimizar JavaScript.
- **Accesibilidad** — los perfiles públicos cumplen con WCAG 2.1 AA

### Manejo de recursos de medios

- **Almacenamiento de imágenes** — las imágenes en alta resolución se guardan en almacenamiento de objetos ([system.md § Qué hay dentro de una organización](../design/architecture/system.md#whats-inside-a-tenant)). Se generan varias resoluciones para distintos usos (miniatura, web, calidad de impresión).
- **Recursos de marca** — logo, paleta de colores y tipografías se guardan como recursos de la organización. Disponibles en todas las herramientas de creación de contenido (comunicados, publicaciones en redes, perfiles públicos, plantillas de correo).
- **Biblioteca de recursos** — biblioteca buscable de recursos aprobados (fotos, gráficas, clips de video). El equipo navega y usa recursos aprobados al crear contenido.
- **Control de derechos de uso** — campo opcional para registrar los derechos de uso de cada recurso (crédito del fotógrafo, tipo de licencia, fecha de vencimiento).

## Preguntas abiertas

1. **Publicidad pagada en redes sociales** — ¿debería la plataforma permitir crear y manejar anuncios pagados (Facebook Ads, Google Ads, etc.)? Es un área de producto grande, con requisitos de cumplimiento complejos (leyes de transparencia en publicidad política). Quizá se atienda mejor con herramientas especializadas.

2. **Integración con servicios de monitoreo de prensa** — ¿debería la plataforma integrarse con servicios de recortes y monitoreo de medios (Meltwater, Cision, etc.)? Son caros y sirven sobre todo a campañas grandes. Puede que no apliquen al mercado objetivo.

3. **Comunicación de crisis** — ¿debería haber un flujo dedicado de comunicación de crisis (plantilla de respuesta rápida, modo de centro de mando para comunicaciones, secuencia de notificación a las partes interesadas)? ¿O alcanza con la infraestructura que ya hay de mensajería + comunicados + redes sociales?

4. **Valoración de los medios ganados** — ¿debería el seguimiento de cobertura incluir una estimación del valor de los medios ganados (lo que habría costado esa cobertura en publicidad)? Es común en relaciones públicas, pero metodológicamente cuestionable.

5. **El *horário eleitoral* de Brasil** — el tiempo obligatorio y gratuito de TV y radio para las campañas es un requisito de medios único. ¿Debería la plataforma permitir programar y dar seguimiento al contenido de ese formato, o queda fuera de alcance?

<!-- REVISIT: El acceso por API al contenido político está cada vez más restringido en las plataformas de redes sociales (Meta, Twitter/X). La arquitectura de adaptadores tiene que absorber con elegancia los cambios de acceso, las reducciones de límite de tasa y los cambios de política de plataforma. La alternativa de copiar y pegar es una red de seguridad crítica. -->
<!-- REVISIT: Los requisitos de aviso legal en redes sociales están cambiando rápido en todas las jurisdicciones. La integración de cumplimiento para redes sociales tiene que ser fácil de actualizar a medida que cambian las leyes. -->
