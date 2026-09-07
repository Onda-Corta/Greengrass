# Patrones de notificaciones

## Propósito

Este documento define cómo la plataforma entrega notificaciones — el centro de notificaciones, los canales de entrega, los niveles de prioridad, la agrupación y el comportamiento propio de cada arquetipo. Las notificaciones son el tejido conectivo de la plataforma: dicen qué pasó, qué necesita atención y qué viene en camino.

La restricción de diseño: las notificaciones tienen que ser útiles sin abrumar. Un Coordinador de voluntarios, en un fin de semana cargado de eventos, puede recibir 50 notificaciones en una hora (altas de voluntarios, cancelaciones de turno, confirmaciones de registro de entrada). Un Administrador de la organización el día de elecciones puede recibir 200. El sistema tiene que mostrar lo que importa y suprimir lo que no.

## Anatomía de la notificación

Toda notificación tiene la misma estructura:

```
┌──────────────────────────────────────────────────────┐
│  [Icono]  Fuente · Hora                      [⋯]     │
│                                                      │
│  Título (negrita, conciso — qué pasó)                │
│  Cuerpo (1-2 líneas — contexto y detalle)            │
│                                                      │
│  [Acción principal]  [Acción secundaria]             │
└──────────────────────────────────────────────────────┘
```

### Campos

| Campo | Propósito | Ejemplo |
|-------|---------|---------|
| **Icono** | Identificador visual de la fuente de la notificación | 💬 Mensajes, 🚨 Cumplimiento, 📋 Turnos |
| **Fuente** | Área funcional que generó la notificación | "Recaudación de fondos", "GOTV", "Mensajería" |
| **Hora** | Marca de tiempo relativa | "hace 2 min", "hace 1 hora", "Ayer" |
| **Título** | Qué pasó — conciso, accionable | "Donación nueva: $250 de Ana Martínez" |
| **Cuerpo** | Contexto — lo justo para decidir si hay que actuar ahora | "Recurrente · Primera donación en esta campaña" |
| **Acción principal** | La acción más probable | "Ver donación" |
| **Acción secundaria** | Acción alternativa | "Descartar" |

---

## Centro de notificaciones

### Acceso

- **Escritorio:** icono de campana en la barra superior. El contador muestra las notificaciones sin leer. Al hacer clic se abre la bandeja de notificaciones desde el borde derecho.
- **Móvil:** icono de campana en la barra superior. Al tocarlo se abre una vista de notificaciones a pantalla completa.

### Disposición

```
┌────────────────────────────────────────────────────────────┐
│  Notificaciones (12 sin leer)    [Marcar todo como leído]  │
├────────────────────────────────────────────────────────────┤
│  [Todas]  [Mensajes]  [Turnos]  [Alertas]  [Otras]         │  ← Pestañas de filtro
├────────────────────────────────────────────────────────────┤
│                                                            │
│  HOY                                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  🚨 Cumplimiento · hace 15 min                       │  │
│  │  Límite de contribución cerca                        │  │
│  │  John Smith: $2,700 de $2,900 del límite             │  │
│  │  [Revisar]  [Descartar]                              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📋 Turnos · hace 1 hora                             │  │
│  │  Cancelación de turno: Maria Lopez                   │  │
│  │  Mañana 2pm-6pm · Territorio 12 · Sin reemplazo      │  │
│  │  [Buscar reemplazo]  [Descartar]                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  AYER                                                      │
│  ...                                                       │
│                                                            │
│  [Preferencias de notificaciones]                          │
└────────────────────────────────────────────────────────────┘
```

### Agrupación

Las notificaciones se agrupan por tiempo (Hoy, Ayer, Esta semana, Anteriores) y se pueden filtrar por categoría de fuente:

| Filtro | Incluye |
|--------|----------|
| Todas | Todo |
| Mensajes | Mensajes directos, mensajes de grupo, difusiones, hilos contextuales |
| Turnos | Asignaciones de turno, cancelaciones, recordatorios, alertas de registro de entrada |
| Alertas | Marcas de cumplimiento, alertas de seguridad, errores de sincronización, problemas del sistema |
| Otras | Confirmaciones de asistencia a eventos, notificaciones de donaciones, capacitaciones completadas, etc. |

### Comportamientos

- **Indicador de sin leer** — las notificaciones sin leer llevan un borde izquierdo de color o un fondo tintado. Las leídas se ven atenuadas.
- **Marcar como leída** — al hacer clic en una notificación se marca como leída. Arriba hay un botón "Marcar todo como leído".
- **Descartar** — quita la notificación del centro. No afecta al evento subyacente.
- **Enlace directo** — al tocar una notificación se navega a la pantalla relevante (el detalle de la donación, la página de gestión del turno, la conversación, etc.).
- **Notificaciones críticas persistentes** — las notificaciones marcadas como críticas (fechas límite de cumplimiento, alertas de seguridad) no se pueden descartar: solo se resuelven actuando sobre ellas.
- **Contador** — aparece en el icono de campana. En móvil aparece además en la pestaña inferior correspondiente (la pestaña Mensajes muestra los mensajes sin leer, la pestaña Turnos muestra las notificaciones de turno pendientes).

---

## Niveles de prioridad

### Definiciones

| Prioridad | Tratamiento visual | Persistencia | Sonido/vibración | Ejemplos |
|----------|-----------------|-------------|-----------------|----------|
| **Crítica** | Acento rojo, no se puede descartar | Hasta que se resuelva | Sí (salvo silenciado) | Brecha de seguridad, procesador de pagos caído, violación de cumplimiento |
| **Alta** | Acento ámbar, prominente | 7 días | Sí (salvo silenciado) | Marca de cumplimiento, cancelación de turno sin reemplazo, escalamiento de GOTV |
| **Normal** | Estándar | 30 días | Notificación push (configurable) | Donación nueva, alta de voluntario, mensaje recibido, confirmación de asistencia a evento |
| **Baja** | Sutil, se puede agrupar | 7 días | Ninguno | Capacitación completada, importación de datos terminada, resumen semanal |

### Prioridad configurable por el usuario

Según la decisión de `messaging.md`, cada persona configura la prioridad de las notificaciones fuente por fuente. La plataforma trae valores predeterminados sensatos por arquetipo, y cada quien los ajusta:

```
┌────────────────────────────────────────────────────────────┐
│  Preferencias de notificaciones                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Mensajes                                                  │
│    Mensajes directos      [● Alta   ▾] [Push ✓] [Correo ✓] │
│    Mensajes de grupo      [● Normal ▾] [Push ✓] [Correo ☐] │
│    Difusiones             [● Normal ▾] [Push ☐] [Correo ✓] │
│                                                            │
│  Turnos                                                    │
│    Recordatorios de turno [● Alta   ▾] [Push ✓] [Correo ✓] │
│    Cancelaciones          [● Alta   ▾] [Push ✓] [Correo ✓] │
│    Asignaciones nuevas    [● Normal ▾] [Push ✓] [Correo ☐] │
│                                                            │
│  Recaudación de fondos                                     │
│    Donaciones nuevas      [● Normal ▾] [Push ☐] [Correo ✓] │
│    Marcas de cumplimiento [● Crítica]  [Push ✓] [Correo ✓] │  ← No se puede cambiar
│    ...                                                     │
│                                                            │
│  [Restablecer valores predeterminados]                     │
└────────────────────────────────────────────────────────────┘
```

**No configurables:** algunas notificaciones son siempre críticas y no se pueden bajar de nivel: alertas de seguridad, violaciones de cumplimiento, errores del sistema. En las preferencias aparecen marcadas como "No se puede cambiar".

---

## Canales de entrega

Las notificaciones llegan por varios canales. Qué canales hay disponibles depende de la fuente de la notificación y de las preferencias de cada persona.

### Matriz de canales

| Canal | Latencia | Caso de uso | Disponible para |
|---------|---------|----------|-------------|
| **En la app** | Inmediata | Todas las notificaciones | Todos los usuarios |
| **Push** | Inmediata | Notificaciones sensibles al tiempo | Usuarios de móvil con la app instalada |
| **Correo** | Minutos | Resúmenes, contenido detallado, recibos | Todos los usuarios con correo |
| **SMS** | Inmediata | Solo alertas críticas, para quien no tiene la app | Solo con consentimiento expreso, eventos críticos |

### Lógica de selección de canal

1. **En la app** — siempre se entrega. Esta es la notificación canónica.
2. **Push** — se entrega si la persona tiene push activado y la prioridad de la notificación es >= el umbral que configuró para esa fuente.
3. **Correo** — se entrega si la persona tiene activadas las notificaciones por correo para esa fuente. Los correos se pueden agrupar (ver Resúmenes más abajo).
4. **SMS** — se entrega solo para notificaciones críticas y cuando la persona se dio de alta en las alertas por SMS. Es el canal de último recurso para quien puede no tener la app abierta (por ejemplo, el Administrador de la organización durante un incidente de seguridad).

### Prevención de duplicados

Si alguien ve una notificación por push y después abre la app, la notificación dentro de la app ya debería estar marcada como "vista" (no necesariamente "leída" — vio el push, pero puede que no haya actuado). Así el centro de notificaciones no muestra notificaciones que la persona ya descartó desde el push.

---

## Valores predeterminados por arquetipo

Cada perfil trae valores predeterminados de notificación ajustados a su rol y a su patrón de uso típico.

### Administrador de la organización

Ve el conjunto más amplio de notificaciones — estado del sistema, cumplimiento y alertas transversales.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Alertas de seguridad | Crítica | En la app, Push, Correo, SMS |
| Marcas de cumplimiento | Crítica | En la app, Push, Correo |
| Problemas del sistema (sincronización, integraciones) | Alta | En la app, Push, Correo |
| Facturación | Alta | En la app, Correo |
| Actividad del personal (contrataciones nuevas, cambios de rol) | Normal | En la app, Correo |
| Solicitudes de alianza | Normal | En la app, Correo |

### Director de comunicaciones

Centrado en la entrega de contenido y en la interacción.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Fallos de entrega de correo | Alta | En la app, Push, Correo |
| Respuestas a aprobaciones de contenido | Alta | En la app, Push |
| Alertas de rendimiento de campaña | Normal | En la app, Correo |
| Cobertura de prensa | Normal | En la app |

### Director de finanzas

Centrado en el dinero y en el cumplimiento.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Marcas de cumplimiento | Crítica | En la app, Push, Correo |
| Problemas del procesador de pagos | Crítica | En la app, Push, Correo |
| Donaciones grandes (por encima del umbral) | Alta | En la app, Push |
| Fallos de donaciones recurrentes | Alta | En la app, Correo |
| Resumen diario de donaciones | Baja | Correo |

### Director de campo

Centrado en las operaciones y en el GOTV.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Escalamientos de GOTV | Crítica | En la app, Push |
| Alertas de operación activa | Alta | En la app, Push |
| Hitos de avance del trabajo de campo | Normal | En la app |
| Problemas de observadores electorales | Alta | En la app, Push |

### Coordinador de voluntarios

Centrado en las personas.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Cancelaciones de turno | Alta | En la app, Push, Correo |
| Altas de voluntarios nuevos | Normal | En la app, Push |
| Alertas de ausencia sin aviso | Alta | En la app, Push |
| Capacitaciones completadas | Baja | En la app |
| Hitos de registro de entrada en eventos | Normal | En la app |

### Gestor de datos

Centrado en las operaciones de datos.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Importación completada | Normal | En la app, Correo |
| Actualizaciones de la cola de deduplicación | Normal | En la app |
| Alertas de calidad de datos | Alta | En la app, Correo |

### Voluntario

Notificaciones mínimas, orientadas a la acción.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Recordatorios de turno | Alta | En la app, Push |
| Cambios de asignación | Alta | En la app, Push |
| Mensajes del Líder de equipo | Alta | En la app, Push |
| Asignaciones de capacitación | Normal | En la app, Push |
| Recordatorios de eventos | Normal | En la app, Push |

### Líder de equipo

Todo lo que recibe un Voluntario, más la gestión del equipo.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Problemas de integrantes del equipo | Alta | En la app, Push |
| Ausencias sin aviso en el equipo | Alta | En la app, Push |
| Solicitudes de escalamiento del centro de mando (GOTV) | Crítica | En la app, Push |

### Candidato

Curadas, solo lo importante.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Solicitudes de aprobación | Alta | En la app, Push |
| Informes del equipo | Alta | En la app, Push |
| Mensajes del equipo clave | Normal | En la app, Push |
| Resúmenes de hitos de campaña | Baja | En la app |

### Simpatizante

Mínimas, transaccionales.

| Fuente | Prioridad predeterminada | Canales predeterminados |
|--------|-----------------|-----------------|
| Recibos de donación | Normal | Correo |
| Cambios de estado de una donación recurrente | Alta | Correo, Push (si se dio de alta) |
| Recordatorios de eventos | Normal | Correo, Push (si se dio de alta) |

---

## Resúmenes por correo

Para las notificaciones que no exigen atención inmediata, la plataforma ofrece resúmenes por correo que agrupan varias notificaciones en un envío periódico.

### Opciones de resumen

| Frecuencia | Contenido | Destinatarios predeterminados |
|-----------|---------|-------------------|
| **En tiempo real** | Cada notificación se envía de inmediato | Alertas de seguridad, marcas de cumplimiento |
| **Cada hora** | Resumen de las notificaciones de la última hora | No viene activado — el usuario se da de alta |
| **Diario** | Resumen de fin de día | Director de finanzas (resumen de donaciones), Coordinador de voluntarios (actividad diaria de los voluntarios) |
| **Semanal** | Métricas y lo más destacado de la semana | Candidato (avance de la campaña), Administrador de la organización (panorama semanal) |

Cada quien configura sus preferencias de resumen en los ajustes de notificaciones. Los correos de resumen son resúmenes bien armados, no simples listas de notificaciones: traen contexto, tendencias y enlaces directos a las pantallas relevantes.

---

## Comportamiento de las notificaciones el día de elecciones

Cuando se activa el modo GOTV / día de elecciones, el sistema de notificaciones cambia:

### Cambios

- **Las notificaciones de GOTV suben de prioridad.** Todas las notificaciones relacionadas con GOTV (actualizaciones de participación electoral, escalamientos, sugerencias de reasignación de recursos, solicitudes de transporte, problemas de observadores electorales) pasan a prioridad alta sin importar la configuración de cada persona.
- **Las notificaciones que no son de GOTV se suprimen.** Las notificaciones operativas normales (altas de voluntarios nuevos, importaciones de datos, mensajes de rutina) se agrupan en un resumen poselectoral. No desaparecen: se aplazan.
- **Feed del centro de mando.** El personal del centro de mando ve un feed continuo de notificaciones integrado en el panel del centro de mando. Es un feed en vivo, no el centro de notificaciones estándar: se desplaza solo a medida que llegan eventos nuevos.
- **Las notificaciones de escalamiento son modales.** Los escalamientos críticos de GOTV (problema de seguridad de un observador electoral, anomalía grande de participación) aparecen como diálogos modales que exigen acuse de recibo: no se pueden pasar por alto desplazándose.

### Después de las elecciones

Cuando el modo de día de elecciones se desactiva, las notificaciones aplazadas se entregan en un correo de resumen ("Esto es lo que pasó mientras estabas en modo de día de elecciones"). El centro de notificaciones vuelve a su comportamiento normal.

---

## Elementos de interfaz relacionados con las notificaciones

### Contadores

Los contadores aparecen en:
- **Icono de campana** (barra superior) — total de notificaciones sin leer
- **Pestañas inferiores en móvil** — contadores por pestaña donde aplica:
  - Pestaña Mensajes: mensajes sin leer
  - Pestaña Turnos: notificaciones de turno pendientes
  - Pestaña Aprobaciones (Candidato): aprobaciones pendientes
- **Elementos de la barra lateral** (escritorio) — contadores discretos en los elementos de navegación relevantes

### Avisos emergentes

Notificaciones transitorias, para retroalimentación inmediata (no quedan guardadas en el centro de notificaciones):

```
┌──────────────────────────────────────┐
│  ✓  Contacto guardado                │  ← Aviso emergente de éxito (3 segundos)
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  ⚠  Error al guardar · Reintentar    │  ← Aviso emergente de error (persiste hasta que se actúe)
└──────────────────────────────────────┘
```

- **Avisos emergentes de éxito** — aparecen un momento (3 segundos) y se van solos. Confirman que una acción se completó.
- **Avisos emergentes de error** — persisten hasta que se descartan o se reintenta. Incluyen una acción de reintento para los errores recuperables.
- **Posición** — abajo al centro en escritorio, arriba al centro en móvil (para no chocar con la barra de pestañas inferior).

### Sonidos de notificación

- **Notificaciones críticas** — sonido de alerta del sistema (respeta el silenciado del dispositivo)
- **Notificaciones altas** — sonido de notificación discreto
- **Normales y bajas** — sin sonido (solo vibración del push, si está activada)
- **Modo de campo** — todos los sonidos se suprimen salvo los críticos (quien está tocando puertas no debería distraerse)

---

## No molestar

Cualquiera puede activar el modo No molestar:

- **Interruptor manual** — desde el menú de usuario
- **Programado** — con horas fijas (por ejemplo, de 10pm a 7am)
- **Durante los turnos** — se activa solo durante los turnos activos en modo de campo (solo pasan las notificaciones críticas y las del turno)

Cuando No molestar está activo:
- Las notificaciones push se silencian
- Las notificaciones en la app se siguen acumulando (visibles cuando la persona las revisa)
- Las notificaciones críticas atraviesan No molestar (seguridad, cumplimiento)
- Un indicador discreto de "No molestar activo" aparece en la barra superior

---

## Preguntas abiertas

1. **Vida útil de las notificaciones.** ¿Cuánto deberían persistir las notificaciones en el centro de notificaciones? Lo propuesto ahora: 30 días para las normales, 7 días para las bajas, hasta que se resuelvan para las críticas. ¿30 días es demasiado?

2. **Sincronización de notificaciones entre dispositivos.** Si alguien descarta una notificación en su celular, ¿debería descartarse también en su computadora? (Sí, probablemente — las notificaciones deberían sincronizarse entre dispositivos.)

3. **Analítica de notificaciones.** ¿Debería la plataforma medir las tasas de interacción con las notificaciones (qué porcentaje se abre, se atiende, se descarta)? Ese dato podría alimentar los valores predeterminados de prioridad y el horario de los resúmenes.

<!-- REVISIT: Las fuentes exactas de notificación por arquetipo van a crecer a medida que se implementen las funcionalidades. Este documento define los patrones y los valores predeterminados; la implementación irá añadiendo los tipos de notificación específicos según se construya cada funcionalidad. -->
