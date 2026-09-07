# Vistas por arquetipo

## Propósito

Este documento define cómo se ve la misma plataforma según el perfil de cada persona. Cada perfil ve una vista adaptada a su rol: distinta pantalla de inicio, distintos elementos de navegación, distinto conjunto de funcionalidades. Las funcionalidades fuera de su acceso no aparecen en absoluto en su vista (no atenuadas: invisibles).

Esta es la especificación de la UX adaptable al rol. Se apoya en el modelo de navegación (navigation-model.md) y referencia pantallas concretas del inventario de pantallas (screen-inventory.md).

## Resumen de arquetipos

| Perfil | Dispositivo principal | Duración de la sesión | Necesidades sin conexión | Funcionalidades disponibles |
|---------|---------------|---------------|--------------|----------------|
| Administrador de la organización | Escritorio | Corta (horas) | Ninguna | Todo |
| Director de comunicaciones | Escritorio | Jornada laboral | Ninguna | Comunicaciones, prensa, redes sociales, personas |
| Director de finanzas | Escritorio | Jornada laboral | Ninguna | Recaudación, cumplimiento, personas |
| Director de campo | Escritorio + móvil | Jornada laboral | Ninguna (como personal); modo de campo si además toca puertas | Operaciones de campo, GOTV (Get Out The Vote — movilización del voto), personas |
| Coordinador de voluntarios | Escritorio + móvil | Jornada laboral | Registro de entrada en eventos | Voluntarios, eventos, turnos |
| Gestor de datos | Escritorio | Jornada laboral | Ninguna | CRM, importación/exportación, calidad de datos |
| Voluntario | Móvil | Duración del turno (campo) / jornada laboral (general) | Modo de campo completo | Turnos, eventos, modo de campo, mensajes |
| Líder de equipo | Móvil | Duración del turno (campo) / jornada laboral (general) | Modo de campo completo + gestión del equipo | Todo lo que ve el voluntario + equipo |
| Candidato | Móvil + escritorio | Media (jornada laboral) | Leer mensajes | Panel curado, aprobaciones, mensajes |
| Simpatizante | Móvil | Larga (semanas) | Ninguna | Historial de donaciones, preferencias, eventos |

## Administrador de la organización

### Pantalla de inicio
**Panel general de la campaña** (DASH-001): el centro de la operación. Muestra:
- Recaudación: total recaudado, avance hacia la meta, número de donantes, donación promedio
- Campo: puertas tocadas, contactos con votantes, tasa de contacto, puntajes de apoyo agregados
- Comunicaciones: correos enviados, tasa de apertura, SMS entregados, interacción en redes
- Voluntarios: número de activos, horas registradas, turnos cubiertos frente a disponibles
- Eventos: eventos próximos, asistencia reciente
- Alertas: marcas de cumplimiento, problemas de sincronización, notificaciones del sistema

### Secciones de la barra lateral
Todas las secciones visibles. La barra lateral del Administrador de la organización es la unión de todas las áreas funcionales, organizada en grupos plegables:
- Resumen, Personas, Campo, Recaudación de fondos, Comunicaciones, Eventos, Activismo, Prensa, GOTV, Mensajería, Alianza, Configuración

### Experiencia en móvil
El Administrador de la organización trabaja sobre todo en escritorio. El móvil es para revisar paneles, leer mensajes y atender notificaciones urgentes sobre la marcha. Pestañas en móvil: Panel, Contactos, Donaciones, Mensajes, Más.

### Comportamientos especiales
- Ve el registro de auditoría completo
- Puede suplantar otros roles (para probar la configuración de las plantillas de rol), y la interfaz lo indica claramente
- Recibe todas las notificaciones a nivel de sistema (facturación, seguridad, estado de las integraciones)
- Puede activar el modo de día de elecciones
- Puede alternar entre la vista de su organización y la vista de la alianza (si pertenece a una)

---

## Director de comunicaciones

### Pantalla de inicio
**Panel de comunicaciones** (DASH-004): centrado en el rendimiento del alcance.
- Rendimiento de las campañas de correo (envíos recientes, tasas de apertura, tasas de clic)
- Estadísticas de entrega de SMS/WhatsApp
- Resumen de interacción en redes sociales (en todas las plataformas)
- Envíos programados próximos
- Cobertura reciente (si también lleva prensa)

### Secciones de la barra lateral
- **Resumen:** Panel de comunicaciones
- **Comunicaciones:** Campañas de correo, SMS/WhatsApp, Plantillas
- **Redes sociales:** Panel, Redactor de publicaciones, Calendario, Analítica, Conexiones de cuentas
- **Prensa:** Contactos de medios, Comunicados, Avisos a medios, Declaraciones, Cobertura, Respaldos, Puntos de mensaje, Entrevistas
- **Personas:** Contactos, Segmentos (para segmentar las comunicaciones)
- **Mensajería:** Mensajes

### Experiencia en móvil
Escritorio como dispositivo principal para crear contenido (constructor de correos, redacción de comunicados). Móvil para revisar analítica, responder mensajes y aprobar envíos urgentes. Pestañas en móvil: Panel, Correo, Redes, Mensajes, Más.

### Lo que no ven
Sin acceso a: detalles de recaudación (donaciones, formularios, cumplimiento), operaciones de campo (trabajo de campo, territorios, jornadas de llamadas), gestión de voluntarios (lista del equipo, turnos, capacitación), ajustes (facturación, roles, integraciones), gestión de datos (importación/exportación, deduplicación), operaciones de GOTV (salvo que se les concedan plantillas adicionales).

---

## Director de finanzas

### Pantalla de inicio
**Panel de recaudación de fondos** (DASH-003): centrado en el dinero.
- Ingresos: hoy, esta semana, este mes, total (con líneas de tendencia)
- Termómetro de avance hacia la meta
- Datos de donantes: nuevos frente a recurrentes, donación promedio, salud de las recurrentes
- Estado del procesador de pagos (última sincronización, tasa de éxito)
- Alertas de cumplimiento: límites de contribución cerca de alcanzarse, donaciones marcadas que necesitan revisión
- Fechas límite de reporte próximas

### Secciones de la barra lateral
- **Resumen:** Panel de recaudación
- **Recaudación de fondos:** Donaciones, Formularios, Campañas, Recurrentes, Promesas de donación, Reembolsos, Efectivo, Marcas de cumplimiento, Pruebas A/B, Repartos de la alianza, Procesadores de pagos, Estados de cuenta
- **Personas:** Donantes, Segmentos
- **Mensajería:** Mensajes

### Experiencia en móvil
Escritorio como dispositivo principal para la gestión financiera, la construcción de formularios y la revisión de cumplimiento. Móvil para consultar totales y atender marcas de cumplimiento urgentes. Pestañas en móvil: Panel, Donaciones, Cumplimiento, Mensajes, Más.

### Lo que no ven
Sin acceso a: comunicaciones (correo, SMS, redes), operaciones de campo, gestión de voluntarios, prensa, GOTV, ajustes (salvo la configuración del procesador de pagos, a la que llegan desde Recaudación de fondos), gestión de datos.

---

## Director de campo

### Pantalla de inicio
**Panel de operaciones de campo** (DASH-002): centrado en el trabajo en terreno.
- Mapa de avance del trabajo de campo (territorios completos frente a pendientes)
- Tasa de contacto por territorio, equipo y voluntario
- Distribución de los puntajes de apoyo
- Métricas de las jornadas de llamadas (llamadas hechas, tasa de contacto, resultados)
- Estadísticas de las jornadas de inscripción de votantes
- Turnos activos y despliegue de voluntarios
- Campañas de trabajo de campo próximas

### Secciones de la barra lateral
- **Resumen:** Panel de campo
- **Campo:** Campañas de trabajo de campo, Jornadas de llamadas, Inscripción de votantes, Territorios, Listas de recorrido, Guiones
- **GOTV:** Constructor del universo, Concentración, Corte de territorios, Centro de mando, Transporte, Observadores, Resultados, Posterior a la elección
- **Personas:** Contactos, Segmentos
- **Mensajería:** Mensajes

### Experiencia en móvil
Escritorio para planificar (corte de territorios, configuración de campañas, construcción de guiones). Móvil para monitorear las operaciones activas en el terreno y consultar paneles. Pestañas en móvil: Panel, Trabajo de campo, Territorios, Mensajes, Más.

### Día de elecciones
Durante el modo de día de elecciones, la pantalla de inicio del Director de campo cambia al Panel del centro de mando (DASH-008). Los elementos de GOTV suben al principio de su barra lateral.

### Lo que no ven
Sin acceso a: recaudación (donaciones, formularios, cumplimiento), comunicaciones (correo, SMS, redes), gestión de voluntarios (lista del equipo, incorporación, capacitación: ven a los voluntarios desde la óptica del campo, no desde la de la gestión), prensa, ajustes, gestión de datos.

---

## Coordinador de voluntarios

### Pantalla de inicio
**Panel de voluntarios** (DASH-005): centrado en las personas.
- Número de voluntarios activos e inscripciones recientes
- Tasas de cobertura de turnos (hoy, esta semana)
- Horas de voluntariado (esta semana, total)
- Aprobaciones pendientes (inscripciones nuevas a la espera de revisión)
- Tasas de finalización de la capacitación
- Eventos próximos con su estado de confirmaciones de asistencia
- Panorama del estado de los equipos

### Secciones de la barra lateral
- **Resumen:** Panel de voluntarios
- **Voluntarios:** Lista de voluntarios, Configuración de la incorporación, Módulos de capacitación, Editor de contenidos de capacitación, Turnos, Equipos, Certificaciones
- **Eventos:** Eventos, Registro de entrada, Posterior al evento
- **Mensajería:** Mensajes

### Experiencia en móvil
Escritorio para la configuración (contenidos de capacitación, programación de turnos, gestión de equipos). Móvil para registrar la entrada de voluntarios en los eventos, vigilar la cobertura de turnos y mensajear. Pestañas en móvil: Panel, Lista de voluntarios, Turnos, Mensajes, Más.

### Lo que no ven
Sin acceso a: recaudación, comunicaciones, operaciones de campo (gestionan a los voluntarios, pero no la estrategia de campo: de las campañas de trabajo de campo y los territorios se encarga el Director de campo), prensa, GOTV (salvo que se les conceda), ajustes, gestión de datos.

---

## Gestor de datos

### Pantalla de inicio
**Panel de calidad de datos** (DASH-006): centrado en la salud de los datos.
- Registros por tipo y estado
- Importaciones recientes y sus puntajes de calidad
- Tamaño de la cola de deduplicación (revisiones pendientes)
- Marcas de calidad de datos (registros incompletos, duplicados potenciales, registros desactualizados)
- Historial de exportaciones
- Actividad reciente de fusiones

### Secciones de la barra lateral
- **Resumen:** Panel de datos
- **Personas:** Contactos, Segmentos, Importación, Exportación, Cola de deduplicación, Calidad de datos, Etiquetas
- **Mensajería:** Mensajes

### Experiencia en móvil
Solo escritorio para prácticamente todo el trabajo (importación de datos, revisión de deduplicación, exportación). Móvil solo para mensajes. Pestañas en móvil: Contactos, Importación, Deduplicación, Mensajes, Más.

### Lo que no ven
Sin acceso a: recaudación, comunicaciones, operaciones de campo, gestión de voluntarios, prensa, GOTV, ajustes (salvo los ajustes relacionados con datos, a los que llegan desde Personas). El Gestor de datos trabaja con la capa de datos, no con la capa operativa.

---

## Voluntario

### Pantalla de inicio
**Mis turnos**: un inicio sencillo y orientado a la acción.
- Turnos de hoy (con lugar, hora y rol)
- Turnos próximos (siguientes 7 días)
- Botón de acción «Iniciar turno» (destacado, si hay un turno activo)
- Número de mensajes sin leer
- Eventos próximos a los que confirmó asistencia
- Avance en la capacitación (si tiene módulos asignados)

### Secciones de la barra lateral
- **Lo mío:** Mis turnos, Mis tareas, Mi equipo
- **Eventos:** Eventos
- **Mensajería:** Mensajes
- **Capacitación:** Módulos, Certificaciones
- **Campo:** Iniciar turno (botón de acción)

### Experiencia en móvil
**El móvil es el dispositivo principal.** Toda la experiencia del voluntario está diseñada para el celular. El escritorio es una opción secundaria (para quienes prefieren revisar sus turnos desde una computadora).

Pestañas en móvil: Turnos, Eventos, Mensajes, Iniciar turno

La pestaña «Iniciar turno» se distingue visualmente: es un botón relleno o de color, no un icono de pestaña estándar. Es la acción principal del voluntario.

### Modo de campo
Cuando el voluntario toca «Iniciar turno», la aplicación entra al modo de campo (ver navigation-model.md). El marco de navegación normal desaparece por completo. El mundo del voluntario pasa a ser:
1. Lista de recorrido / lista de llamadas / cola de inscripciones
2. Ficha de puerta / ficha de llamada / formulario de inscripción (de a uno)
3. Captura de la respuesta
4. Siguiente elemento
5. Terminar el turno → balance del turno → volver al marco normal

### Funcionalidades sin conexión
En el modo de campo, todo funciona sin conexión:
- Lista de recorrido con la información de los votantes
- Teselas de mapa (precacheadas)
- Ficha de puerta y formulario de interacción
- Todos los datos se guardan localmente y se sincronizan al haber conexión
- El indicador de estado de sincronización se muestra bien visible

Fuera del modo de campo, hay menos disponible sin conexión:
- Leer los mensajes sincronizados
- Redactar mensajes (quedan en cola)
- Ver la información de turnos y eventos que está en caché

### Lo que no ven
Sin acceso a: ninguna funcionalidad del personal. Ni paneles (más allá de su vista personal de turnos), ni gestión del CRM, ni ajustes, ni datos financieros, ni configuración de campañas. El voluntario ve solo sus propios turnos, eventos, mensajes y capacitación.

---

## Líder de equipo

### Pantalla de inicio
Igual que la del Voluntario, pero con una sección de **Equipo** adicional:
- Lista del equipo (quién registró su entrada, quién falta)
- Avance del equipo (puertas tocadas, llamadas hechas: en agregado)
- Registros de entrada pendientes
- Problemas a nivel de equipo

### Secciones de la barra lateral
Todo lo que ve un Voluntario, más:
- **Mi equipo:** Lista del equipo, Avance del equipo, Registro de entrada

### Experiencia en móvil
Igual que la del Voluntario: prioridad móvil. La pestaña «Turnos» muestra por defecto la vista de equipo (con los turnos de todos los integrantes) en vez de solo la vista personal.

### Modo de campo
El mismo modo de campo que el del Voluntario, pero el Líder de equipo además puede:
- Ver el avance general de su equipo
- Reasignar puertas o llamadas dentro de su equipo
- Registrar la entrada de los integrantes del equipo en los puntos de concentración
- Escalar problemas al centro de mando (durante el GOTV)

### Lo que no ven
Las mismas restricciones que el Voluntario. Los líderes de equipo son voluntarios con un liderazgo de equipo acotado: no ganan acceso a ninguna funcionalidad del personal. Ven a su equipo, no a la organización.

---

## Candidato

### Pantalla de inicio
**Panel del candidato** (DASH-010): deliberadamente curado y simplificado.
- Termómetro de recaudación (total recaudado frente a la meta, sin desglosar hasta las donaciones individuales)
- Número de voluntarios (voluntarios activos, sin acceso a la lista del equipo)
- Asistencia a eventos (eventos próximos, participación reciente, sin gestión de eventos)
- Avance en campo (a alto nivel: «X % de los votantes objetivo contactados», sin detalle por territorio)
- Mensajes sin leer (destacados: la mensajería es una actividad central del candidato)
- Aprobaciones pendientes (comunicados de prensa y publicaciones en redes a la espera de su revisión)

### Secciones de la barra lateral
- **Resumen:** Panel de la campaña
- **Perfil:** Mi perfil público
- **Aprobaciones:** Aprobaciones pendientes
- **Mensajería:** Mensajes

### Experiencia en móvil
Para el Candidato, móvil y escritorio importan por igual. Revisa el panel y los mensajes desde el celular, y revisa y aprueba contenido desde donde esté.

Pestañas en móvil: Panel, Perfil, Aprobaciones, Mensajes

### Patrones de mensajería
La experiencia de mensajería del Candidato pone el énfasis en:
- Los **mensajes informativos** se ven distintos de la conversación casual (con formato y estructura)
- Las **solicitudes de aprobación** aparecen tanto en la sección de Aprobaciones como en los mensajes, con acciones de aprobar, rechazar y comentar
- Las conversaciones con el personal clave (Gerente de campaña, Director de comunicaciones) van fijadas arriba
- Las conversaciones de grupo de las que forma parte (por ejemplo, «Equipo de liderazgo») son fáciles de alcanzar

### Lo que no ven
La vista del Candidato está limitada a propósito a información de alto nivel. Sin acceso a: paneles operativos, detalles del CRM, lista del equipo de voluntarios, detalles financieros (donaciones individuales, cumplimiento), ajustes, gestión de datos, detalles del trabajo de campo, jornadas de llamadas, operaciones de GOTV. Ven resúmenes, no los datos de origen.

**Excepción:** como el rol de Candidato es una plantilla, el Administrador de la organización puede concederle permisos adicionales a los candidatos que quieran meterse más a fondo. Pero lo predeterminado es la vista curada.

---

## Simpatizante

### Pantalla de inicio
**Inicio del simpatizante** (SUP-001): un portal personal mínimo.
- Actividad reciente (última donación, último evento al que asistió)
- Acciones rápidas: Donar, Ver eventos, Actualizar preferencias
- Estado de sus preferencias de comunicación (a qué está suscrito)

### Secciones de la barra lateral
- **Mi perfil:** Perfil, Preferencias, Preferencias de comunicación
- **Donaciones:** Historial de donaciones, Recurrentes, Recibos
- **Eventos:** Mis eventos

### Experiencia en móvil
**Prioridad móvil.** Los simpatizantes interactúan con la plataforma sobre todo desde el celular: los formularios de donación, las confirmaciones de asistencia y la gestión del perfil están todos pensados con prioridad móvil.

Pestañas en móvil: Perfil, Donaciones, Eventos

### Autenticación
Los simpatizantes tienen acceso por niveles:
- **Enlace mágico** (poca fricción): tocar un enlace en un correo para entrar al historial de donaciones y a los recibos
- **Cuenta completa** (passkey o inicio de sesión por correo): obligatoria para las acciones de gestión (modificar donaciones recurrentes, actualizar el método de pago, cambiar datos personales)

### Lo que no ven
Los simpatizantes ven solo sus propios datos y el contenido público. Sin acceso a ninguna funcionalidad interna de la plataforma: ni CRM, ni campañas, ni herramientas del personal, ni funcionalidades de voluntariado. Su vista es un portal personal, no una herramienta de gestión de campaña.

---

## Patrones comunes a todos los perfiles

### Comportamiento de las notificaciones por arquetipo

| Perfil | Notificaciones de alta prioridad | Canales de entrega |
|---------|---------------------------|-------------------|
| Administrador de la organización | Alertas de seguridad, fechas límite de cumplimiento, problemas del sistema, facturación | En la aplicación, push, correo, SMS (solo lo crítico) |
| Director de comunicaciones | Fallos de entrega de campañas, respuestas a aprobaciones | En la aplicación, push, correo |
| Director de finanzas | Marcas de cumplimiento, pagos fallidos, problemas con donaciones recurrentes | En la aplicación, push, correo |
| Director de campo | Alertas de operaciones activas, escalamientos de GOTV | En la aplicación, push, correo |
| Coordinador de voluntarios | Inscripciones nuevas de voluntarios, cancelaciones de turno, ausencias | En la aplicación, push, correo |
| Gestor de datos | Importaciones completadas, cambios en la cola de deduplicación, alertas de calidad de datos | En la aplicación, correo |
| Voluntario | Recordatorios de turno, cambios de asignación, mensajes del Líder de equipo | En la aplicación, push |
| Líder de equipo | Problemas de los integrantes del equipo, recordatorios de turno, escalamientos al centro de mando (GOTV) | En la aplicación, push |
| Candidato | Solicitudes de aprobación, informes, mensajes del personal clave | En la aplicación, push |
| Simpatizante | Recibos de donación, recordatorios de eventos, estado de las donaciones recurrentes | Correo, push (si dio consentimiento expreso) |

### Gestión de sesiones por arquetipo

| Perfil | Duración de la sesión | Requisito de reautenticación | Modo de campo |
|---------|---------------|--------------------| -----------|
| Administrador de la organización | Corta (horas) | Reautenticación para acciones sensibles | No |
| Personal (todo) | Media (jornada laboral) | Reautenticación para acciones sensibles | No (salvo que además sea voluntario) |
| Voluntario | Media (jornada laboral) / duración del turno (campo) | Reautenticación al terminar el turno | Sí |
| Líder de equipo | Media (jornada laboral) / duración del turno (campo) | Reautenticación al terminar el turno | Sí |
| Candidato | Media (jornada laboral) | Estándar | No |
| Simpatizante | Larga (semanas) | Reautenticación para cambios de pago | No |

### Cambios de vista en el día de elecciones

Cuando se activa el modo de día de elecciones:

| Perfil | Cambio de vista |
|---------|-------------|
| Administrador de la organización | El Panel del centro de mando sube al principio de la barra lateral. Banner de «Día de elecciones activo». |
| Director de campo | La pantalla de inicio cambia al Panel del centro de mando. La sección de GOTV sube de posición. |
| Coordinador de voluntarios | Suben de posición las herramientas de registro de entrada en los puntos de concentración. Se enfatiza la gestión de turnos. |
| Director de comunicaciones | El plan de comunicaciones del día de elecciones queda activo. Se ven los controles de envío de cada oleada. |
| Voluntario | Modo de campo específico de GOTV (fichas de puerta de GOTV, guion simplificado). |
| Líder de equipo | Se ve el avance de GOTV del equipo. Está disponible el botón de escalamiento al centro de mando. |
| Todos los demás | Sin cambios (Candidato, Simpatizante, Gestor de datos, Director de finanzas). |

## Preguntas abiertas

1. **Vista previa de la plantilla de rol.** Cuando un Administrador de la organización configura una plantilla de rol, ¿puede previsualizar cómo se ve la vista de ese rol? Un modo de «previsualizar como este rol» ayudaría a los Administradores de la organización a entender el impacto de las decisiones de permisos que toman.

2. **Experiencia de primer uso por arquetipo.** ¿Debería cada arquetipo ver un recorrido guiado breve, propio de su rol, la primera vez que inicia sesión? («Bienvenido, Director de campo: aquí es donde configuras las campañas de trabajo de campo…»)

3. **Estados vacíos por arquetipo.** Cuando la pantalla de inicio de un perfil todavía no tiene datos (sin turnos creados, sin campañas activas), el estado vacío debería guiar a la persona hacia su primera acción. Tienen que ser propios de cada arquetipo: el estado vacío de un Director de finanzas dice «Configura tu primer formulario de donación», mientras que el de un Director de campo dice «Crea tu primera campaña de trabajo de campo».

<!-- REVISIT: La selección de pestañas de móvil por arquetipo son estimaciones basadas en el análisis de las specs. Los datos de uso real de las pruebas alfa deberían servir para ajustarlas. -->
