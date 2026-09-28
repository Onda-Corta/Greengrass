# Modelo de navegación

## Propósito

Este documento define cómo GreenGrass organiza su superficie de funcionalidades en una estructura navegable. Es el documento de arquitectura de información más importante de todos: cada pantalla, cada wireframe y cada diseño de componente dependen del modelo de navegación.

El reto central: 9 perfiles distintos, en contextos radicalmente diferentes, comparten una sola aplicación. Una voluntaria que toca puertas con un Android de gama baja en la India rural necesita una interfaz completamente distinta de la que necesita un Administrador de la organización que configura ajustes de cumplimiento desde una computadora de escritorio en Puerto Rico. El modelo de navegación tiene que servir a los dos sin ceder en ninguno.

## Paradigma de navegación

### Disposición de escritorio

**DECIDIDO: Híbrido — barra superior + barra lateral.** La barra superior se encarga del contexto ("dónde estoy"): identidad de la organización, búsqueda global, estado de sincronización, notificaciones, perfil de usuario. La barra lateral se encarga de la navegación por funcionalidades ("qué puedo hacer"): elementos adaptables al rol, organizados en secciones plegables. Separación limpia de responsabilidades.

#### Anatomía del marco de escritorio

```
┌────────────────────────────────────────────────────────────────────┐
│  [Logo/Organización]    [Buscar]          [Sinc] [Notif] [Avatar]  │  ← Barra superior
├────────────────┬───────────────────────────────────────────────────┤
│                │                                                   │
│  Barra lateral │            Área de contenido principal            │
│                │                                                   │
│  [elementos    │                                                   │
│   de           │                                                   │
│   navegación   │                                                   │
│   adaptados    │                                                   │
│   al rol]      │                                                   │
│                │                                                   │
│                │                                                   │
│                │                                                   │
│                ├──────────────────────────────┬────────────────────┤
│                │                              │ Panel de detalle   │
│                │                              │ (contextual,       │
│                │                              │  opcional)         │
├────────────────┴──────────────────────────────┴────────────────────┤
│  [Ayuda]  [Idioma]  [Configuración]                                │  ← Pie de la barra lateral
└────────────────────────────────────────────────────────────────────┘
```

**Barra superior (siempre visible):**
- Logo o nombre de la organización (enlaza al inicio). En contexto de alianza, muestra el nombre de la alianza con un desplegable para cambiar de organización.
- Barra de búsqueda global
- Indicador de estado de sincronización (ver offline-sync-patterns.md)
- Campana de notificaciones con contador de no leídas
- Avatar de usuario → menú desplegable (perfil, preferencias, cambiar de organización, cerrar sesión)

**Barra lateral (adaptable al rol):**
- Los elementos de navegación cambian según la plantilla o plantillas de rol activas del usuario
- Se pliega a un modo de solo iconos (guarda la preferencia del usuario)
- Zona de pie: acceso a ayuda y soporte, selector de idioma, enlace a configuración
- Ancho de la barra lateral: ~240px desplegada, ~64px plegada

**Área de contenido principal:**
- A todo el ancho cuando no hay ningún panel de detalle activo
- Se divide cuando hace falta un panel de detalle (detalle de contacto, hilo de mensajes, etc.)
- Ruta de navegación en la parte superior del área de contenido para la navegación profunda

**Panel de detalle (contextual):**
- Aparece a la derecha con información contextual (ver un contacto mientras se recorre una lista, leer un hilo de mensajes desde la bandeja de entrada)
- Se puede cerrar. En viewports (el área visible de la pantalla) de escritorio pequeños, se abre como superposición a pantalla completa en vez de como panel.

#### Consideraciones para RTL

En modo RTL (árabe):
- La barra lateral se mueve al lado derecho
- El panel de detalle se mueve a la izquierda
- Todos los iconos direccionales (flechas, chevrones) se reflejan
- La alineación del texto se invierte
- La ruta de navegación cambia de dirección
- Las propiedades lógicas de CSS (`inline-start`/`inline-end`) resuelven esto sin maquetaciones aparte

### Disposición móvil

```
┌──────────────────────────────────┐
│  [≡/Atrás]  [Título]  [Acciones] │  ← Barra superior (contextual)
├──────────────────────────────────┤
│                                  │
│                                  │
│        Área de contenido         │
│       a pantalla completa        │
│                                  │
│                                  │
│                                  │
│                                  │
├──────────────────────────────────┤
│  [Pest1] [Pest2] [Pest3] [Más]   │  ← Barra de pestañas inferior
└──────────────────────────────────┘
```

**Barra superior:**
- Izquierda: menú hamburguesa (en el nivel superior) o flecha de retroceso (al navegar en profundidad)
- Centro: título de la pantalla actual
- Derecha: acciones contextuales (buscar, filtrar, redactar — varía según la pantalla)

**Área de contenido:**
- A pantalla completa. Sin barra lateral, sin vistas divididas.
- Las listas y los detalles son pantallas separadas (tocar para entrar al detalle, atrás para volver)

**Barra de pestañas inferior:**
- Máximo de 4 a 5 elementos por rol (el resto se abre en una hoja "Más")
- Los elementos cambian según la plantilla de rol del usuario
- La pestaña activa se indica con relleno o resaltado
- Contadores en las pestañas relevantes (mensajes sin leer, aprobaciones pendientes)

**RTL:** el orden de las pestañas se invierte. La flecha de retroceso apunta a la derecha.

### Modo de campo (solo en móvil)

El modo de campo es una **pantalla completa exclusiva** que sustituye por completo el marco de navegación normal. Se activa cuando un voluntario inicia un turno de trabajo de campo, una sesión de inscripción de votantes o una operación de GOTV (Get Out The Vote — movilización del voto).

```
┌──────────────────────────────────────┐
│  [Sinc: hace 2 min]  [●REC] 2:34     │  ← Encabezado de campo
├──────────────────────────────────────┤
│                                      │
│                                      │
│   Contenido específico de la tarea   │
│   (lista de recorrido, ficha de      │
│    puerta, formulario de inscripción,│
│    ficha de llamada)                 │
│                                      │
│                                      │
│                                      │
│                                      │
├──────────────────────────────────────┤
│ [◀ Ant.]   [3 de 47]   [Sig. ▶]      │  ← Navegación entre tareas
├──────────────────────────────────────┤
│  [Terminar turno]   [🔒 Bloquear]    │  ← Acciones de campo
└──────────────────────────────────────┘
```

**Encabezado de campo:**
- Estado de sincronización con el tiempo transcurrido desde la última (destacado: los datos desactualizados son peligrosos el día de elecciones)
- Indicador de grabación (el turno está activo)
- Cronómetro del turno (tiempo transcurrido)
- Sin navegación global, sin barra lateral, sin pestañas inferiores

**Contenido específico de la tarea:**
- La pantalla entera se dedica a la tarea actual (la puerta que se está tocando, la llamada que se está haciendo, el votante que se está inscribiendo)
- El contenido varía según el flujo de trabajo, pero siempre muestra: los datos de la persona, el guion o formulario y la interfaz para capturar la respuesta

**Navegación entre tareas:**
- Avance lineal por la lista de tareas (lista de recorrido, lista de llamadas)
- Anterior/Siguiente con indicador de posición ("3 de 47")
- Se puede saltar a un elemento concreto desde una vista de lista

**Acciones de campo:**
- Terminar turno: dispara el cierre del turno (sincronización, balance del turno, registro de horas, liberación del territorio)
- Bloquear: botón de pánico — bloquea la app de inmediato y exige autenticarse otra vez (security.md)
- No hay más navegación. El mundo del voluntario es la lista de recorrido hasta que termina el turno.

**Por qué se apodera de toda la pantalla y no es solo otra disposición de pestañas:**
El modo de campo responde a un modelo mental radicalmente distinto. La persona voluntaria va caminando, con una sola mano, quizá con mala luz. Necesita áreas táctiles grandes, mínimas decisiones de navegación y cero distracción. El marco normal (barra lateral, pestañas, notificaciones) sería ruido. El modo de campo es la app reducida a su tarea esencial.

**Entrada y salida:**
- Entrada: el voluntario toca "Iniciar turno" desde su pantalla de turnos. La app descarga los datos de la lista de recorrido, confirma que todo está listo y cambia al modo de campo.
- Salida: el voluntario toca "Terminar turno". La app sincroniza los datos pendientes, muestra el balance del turno, registra las horas y vuelve al marco normal.
- Salida anormal: si la app se cae o el dispositivo se apaga, el turno se retoma donde quedó en el siguiente arranque (los datos se guardan localmente después de cada interacción).

## Navegación adaptable al rol

### Cómo afectan las plantillas de rol a la navegación

La barra lateral (escritorio) y la barra de pestañas inferior (móvil) muestran elementos distintos según la plantilla o plantillas de rol activas del usuario. Cada persona ve solo las funcionalidades a las que tiene acceso: las funcionalidades restringidas no aparecen, no están atenuadas.

**DECIDIDO: Secciones agrupadas.** La barra lateral agrupa los elementos de navegación por rol, con encabezados de sección plegables (por ejemplo, "Comunicaciones", "Finanzas", "Campo"). Quien tiene varios roles ve varias secciones, cada una plegable por separado. Da un modelo mental claro —"ahora estoy haciendo trabajo de comunicaciones"— y permite plegar las secciones que no se están usando para reducir el ruido visual.

### Elementos de navegación por arquetipo

Las tablas siguientes definen lo que ve cada arquetipo. Los elementos marcados con (M) están también en las pestañas inferiores del móvil (máximo de 4 a 5 por arquetipo).

#### Administrador de la organización

El Administrador de la organización lo ve todo. Su barra lateral es la unión de todas las áreas funcionales.

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel (M), Flujo de actividad |
| **Personas** | Contactos (M), Segmentos, Importación/Exportación, Cola de deduplicación |
| **Campo** | Trabajo de campo, Jornadas de llamadas, Inscripción de votantes, Territorios |
| **Recaudación de fondos** | Donaciones (M), Formularios, Campañas, Cumplimiento, Repartos de la alianza |
| **Comunicaciones** | Correo, SMS/WhatsApp, Redes sociales, Plantillas |
| **Eventos** | Eventos (M), Registro de entrada |
| **Activismo** | Campañas, Peticiones, Comentarios públicos |
| **Prensa** | Contactos de medios, Contenido, Comunicados, Cobertura, Respaldos, Redes |
| **GOTV** | Universo, Concentración, Centro de mando, Transporte, Observadores, Resultados |
| **Mensajería** | Mensajes (M) |
| **Alianza** | Panel de la alianza, Miembros, Campañas conjuntas |
| **Configuración** | Perfil de la organización, Identidad visual, Roles, Cumplimiento, Integraciones, Facturación |

Pestañas en móvil: Panel, Contactos, Donaciones, Mensajes, Más

#### Director de comunicaciones

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de comunicaciones (M) |
| **Comunicaciones** | Campañas de correo (M), SMS/WhatsApp, Redes sociales (M), Plantillas |
| **Prensa** | Contactos de medios, Contenido, Comunicados, Cobertura, Respaldos, Puntos de mensaje |
| **Personas** | Contactos, Segmentos |
| **Mensajería** | Mensajes (M) |

Pestañas en móvil: Panel, Correo, Redes, Mensajes, Más

#### Director de finanzas

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de recaudación (M) |
| **Recaudación de fondos** | Donaciones (M), Formularios, Campañas, Recurrentes, Reembolsos, Efectivo, Cumplimiento (M) |
| **Personas** | Donantes, Segmentos |
| **Mensajería** | Mensajes (M) |

Pestañas en móvil: Panel, Donaciones, Cumplimiento, Mensajes, Más

#### Director de campo

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de campo (M) |
| **Campo** | Trabajo de campo (M), Jornadas de llamadas, Inscripción de votantes, Territorios (M) |
| **GOTV** | Universo, Concentración, Centro de mando, Transporte, Observadores |
| **Personas** | Contactos, Segmentos |
| **Mensajería** | Mensajes (M) |

Pestañas en móvil: Panel, Trabajo de campo, Territorios, Mensajes, Más

#### Coordinador de voluntarios

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de voluntarios (M) |
| **Voluntarios** | Lista de voluntarios (M), Incorporación, Capacitación, Turnos (M), Equipos |
| **Eventos** | Eventos (M), Registro de entrada |
| **Mensajería** | Mensajes (M) |

Pestañas en móvil: Panel, Lista de voluntarios, Turnos, Mensajes, Más

#### Gestor de datos

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de datos |
| **Personas** | Contactos (M), Segmentos, Importación (M), Exportación, Cola de deduplicación (M), Calidad de datos |
| **Mensajería** | Mensajes (M) |

Pestañas en móvil: Contactos, Importación, Deduplicación, Mensajes, Más

#### Voluntario

| Sección | Elementos |
|---------|-------|
| **Lo mío** | Mis turnos (M), Mis tareas, Mi equipo |
| **Eventos** | Eventos (M) |
| **Mensajería** | Mensajes (M) |
| **Capacitación** | Módulos, Certificaciones |
| **Campo** | Iniciar turno (M) → entra al modo de campo |

Pestañas en móvil: Turnos, Eventos, Mensajes, Iniciar turno

La pestaña "Iniciar turno" es un botón de acción destacado (visualmente distinto — relleno o de color) que entra al modo de campo.

#### Líder de equipo

Todo lo que ve un Voluntario, más:

| Sección | Elementos adicionales |
|---------|-----------------|
| **Mi equipo** | Lista del equipo, Avance del equipo, Registro de entrada |
| **Campo** | Asignaciones del equipo (solo lectura) |

Pestañas en móvil: las mismas que las del Voluntario, pero la pestaña "Turnos" muestra por defecto la vista de equipo

#### Candidato

| Sección | Elementos |
|---------|-------|
| **Resumen** | Panel de la campaña (M) — curado, simplificado |
| **Perfil** | Mi perfil público (M) |
| **Aprobaciones** | Aprobaciones pendientes (M) — comunicados de prensa, publicaciones en redes |
| **Mensajería** | Mensajes (M) — las sesiones informativas van destacadas |

Pestañas en móvil: Panel, Perfil, Aprobaciones, Mensajes

El Candidato ve una vista deliberadamente limitada. Sin ajustes operativos, sin gestión de datos, sin configuración de cumplimiento. El panel muestra métricas de alto nivel (totales de recaudación, número de voluntarios, asistencia a eventos, avance general del trabajo de campo) sin desglosar hasta el detalle operativo.

#### Simpatizante

Los simpatizantes interactúan sobre todo con páginas públicas (sin necesidad de autenticarse). Si inician sesión:

| Sección | Elementos |
|---------|-------|
| **Mi perfil** | Perfil (M), Preferencias, Preferencias de comunicación |
| **Donaciones** | Historial de donaciones (M), Recurrentes, Recibos |
| **Eventos** | Mis eventos (M) |

Pestañas en móvil: Perfil, Donaciones, Eventos

Los simpatizantes no ven ninguna funcionalidad interna de la plataforma. Su navegación es un portal personal simple.

## Elementos permanentes de la interfaz

Elementos presentes en todos los contextos de navegación (salvo el modo de campo, que lo quita todo):

### Indicador de estado de sincronización

Siempre visible en la barra superior. Estados:
- **Conectado (en tiempo real)** — punto verde discreto o marca de verificación. Sin texto: por defecto tiene que pasar desapercibido.
- **Conectado (desactualizado)** — indicador ámbar con "Última sincronización: hace X min". Aparece si la sincronización no se ha completado en más de 5 minutos.
- **Sincronizando** — indicador animado (pulso discreto o indicador de carga). Breve: normalmente segundos.
- **Sin conexión** — indicador destacado: "Sin conexión — los cambios se sincronizarán cuando vuelva la conexión". Persiste hasta que se reconecta.
- **Error de sincronización** — indicador rojo con "Falló la sincronización — toca para reintentar". Al tocarlo se muestra el detalle del error.

En el modo de campo, el indicador de sincronización es más grande y muestra el tiempo exacto desde la última sincronización, porque los datos desactualizados son peligrosos en la operación.

### Campana de notificaciones

- Contador de notificaciones sin leer
- Al tocarla se abre la bandeja de notificaciones (entra desde la derecha, o a pantalla completa en móvil)
- Las notificaciones se agrupan por origen (mensajería, asignaciones, GOTV, recaudación de fondos, etc.)
- Cada notificación enlaza a la pantalla correspondiente
- Acción "Marcar todo como leído"
- Enlace a las preferencias de notificación

### Menú de usuario

- Avatar o iniciales del usuario → desplegable (escritorio) o menú de perfil a pantalla completa (móvil)
- Contiene: ajustes de perfil, preferencias de notificación, idioma, ajustes de seguridad (gestión de passkeys, contactos de confianza), cambio de organización (si pertenece a varias), cerrar sesión
- En modo de coacción: muestra la misma estructura de menú, pero con datos saneados

### Selector de idioma

- Disponible desde el menú de usuario y desde el pie de la barra lateral (escritorio)
- Muestra los idiomas configurados por la organización
- Cambiar de idioma actualiza la interfaz al instante (se guarda en el perfil del usuario)
- No afecta al idioma de los datos (una nota de trabajo de campo escrita en español sigue en español, sea cual sea el idioma de la interfaz)

### Acceso a la ayuda

- Icono "?" o enlace "Ayuda" en el pie de la barra lateral (escritorio), y accesible desde el menú de usuario (móvil)
- Abre: ayuda contextual (si la hay para la pantalla actual), búsqueda en la base de conocimiento, chat con el concierge de IA
- La ayuda contextual aparece como panel lateral en escritorio y a pantalla completa en móvil

## Contextos de navegación especiales

### Modo día de elecciones

Cuando se activan las operaciones de GOTV (acción explícita del Administrador de la organización):

- El personal del centro de mando ve un banner destacado de "Día de elecciones activo" en la parte superior de la pantalla
- Su navegación se amplía con el Centro de mando de GOTV como elemento principal (fijado arriba en la barra lateral, o sustituyendo la primera pestaña del móvil)
- La prioridad de las notificaciones cambia: las de GOTV suben
- La pantalla del Centro de mando pasa a ser el inicio predeterminado del personal del centro de mando
- Desactivación: el Administrador de la organización la desactiva explícitamente, o se desactiva sola a una hora configurada (después del cierre de las urnas)

### Contexto de alianza

**DECIDIDO: Sección propia de alianza en la barra lateral.** Las funcionalidades de alianza aparecen como una sección plegable más de la barra lateral, en línea con el patrón de agrupación por rol. Contiene: Panel de la alianza, Miembros, Campañas conjuntas, Coordinación. No hace falta cambiar de contexto: la alianza es parte del espacio de trabajo del usuario, no un mundo aparte. Es fácil de encontrar y es coherente con el patrón de secciones agrupadas.

### Modo de coacción (nivel de seguridad agresivo)

Cuando alguien inicia sesión con su passkey de coacción:

**DECIDIDO: Estructura real con datos saneados.** La vista de coacción presenta la estructura de navegación real con datos verosímiles pero depurados. Los elementos de navegación, las secciones de la barra lateral y el marco se ven idénticos a los de una sesión normal. El contenido va saneado: las listas de contactos muestran unos pocos contactos inocuos (sin marcadores de sensibilidad política), los paneles muestran cifras bajas y verosímiles, no hay datos de trabajo de campo ni puntajes de identificación de votantes, y las notas sensibles se eliminan. Es la opción más convincente: quien observa ve lo que parece una cuenta real de poca actividad. Las reglas detalladas de saneamiento por área funcional se definirán en `security-ux-patterns.md`.

### Contexto del asistente de puesta en marcha

Cuando alguien está dentro de un asistente de puesta en marcha (configuración inicial, configuración del procesador de pagos, etc.):

- El asistente se apodera del área de contenido principal, pero los elementos permanentes de la interfaz (barra superior, sincronización, notificaciones) siguen visibles
- La barra lateral muestra los pasos del asistente en vez de la navegación normal
- Una opción "Guardar y salir" permite dejar el asistente y volver a él más tarde
- El estado del asistente se guarda: al volver, se retoma donde se quedó

## Persistencia del estado de navegación

- **Estado de plegado de la barra lateral** — se guarda como preferencia del usuario (almacenamiento local)
- **Última pantalla visitada** — en el siguiente inicio de sesión, la persona vuelve a la última pantalla que visitó (o al inicio si la sesión expiró)
- **Estado del modo de campo** — si la app se cierra durante un turno, al volver a abrirla se entra directamente al modo de campo, en la última posición de la lista de recorrido
- **Estado del asistente** — el progreso incompleto de un asistente se guarda y se puede retomar

## Comportamiento de la navegación sin conexión

**DECIDIDO: Atenuar con distintivo de sin conexión.** Las funcionalidades que necesitan conexión aparecen atenuadas, con un pequeño distintivo de sin conexión en cada elemento no disponible. Al tocar un elemento atenuado se muestra el mensaje "Requiere conexión". La estructura de navegación se mantiene estable sea cual sea el estado de la conexión: no hay elementos que aparecen y desaparecen según fluctúa. Las personas usuarias siempre saben qué puede hacer la plataforma, aunque ahora mismo no lo puedan hacer.

**Funcionalidades disponibles sin conexión:**
- Modo de campo (trabajo de campo, inscripción de votantes, puerta a puerta de GOTV)
- Registro de entrada en eventos
- Leer mensajes ya sincronizados
- Redactar mensajes (quedan en cola para enviarse)
- Ver contactos del CRM en caché (solo lectura)
- Crear solicitudes de transporte (quedan en cola)
- Reportes de problemas de observadores electorales (quedan en cola)

**Funcionalidades que requieren conexión:**
- Todos los paneles y la analítica
- Ajustes y configuración
- Importación y exportación de datos
- Jornadas de llamadas (requieren conectividad para llamar)
- Envíos de comunicaciones (correo, SMS, WhatsApp)
- Publicar en redes sociales
- Centro de mando de GOTV en tiempo real
- Búsqueda (en el servidor)
- Asistentes de puesta en marcha (algunos pasos requieren validación del servidor)

## Preguntas abiertas

1. **Navegación contextual frente a navegación permanente.** ¿La barra lateral debe mostrar siempre la navegación completa del rol, o debe adaptarse al contexto (por ejemplo, al ver una campaña de trabajo de campo, mostrar solo la subnavegación de trabajo de campo)? La permanente es más simple; la contextual reduce el desorden, pero puede desorientar.

2. **Navegación por teclado.** ¿La plataforma debe tener atajos de teclado para usuarios avanzados (por ejemplo, `G luego D` para ir al panel, `G luego M` para ir a los mensajes)? Es común en herramientas como GitHub y Gmail. Prioridad baja, pero de mucho valor para el personal que usa la plataforma todo el día.

3. **Rutas de navegación.** ¿Hasta qué profundidad llega la ruta de navegación? Para un camino como Panel → Trabajo de campo → Campaña X → Territorio Y → Lista de recorrido, ¿la ruta muestra todos los niveles o se trunca?

<!-- REVISIT: Los elementos exactos de la barra de pestañas inferior por arquetipo hay que validarlos contra los patrones de uso reales, una vez que estén activos los primeros usuarios alfa. El mapeo inicial de arriba se basa en el análisis de las specs, pero el uso real puede diferir. -->
<!-- REVISIT: El panel de detalle (el panel derecho en escritorio) necesita reglas cuidadosas de tamaño y comportamiento. ¿Cuándo aparece? ¿Se puede fijar abierto? ¿Se puede redimensionar? Son detalles de diseño de interacción para la fase de wireframes. -->
