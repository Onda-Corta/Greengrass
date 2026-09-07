# Inventario de componentes

## Propósito

Este documento cataloga las categorías de componentes, las convenciones de nombres y las definiciones de estado del sistema de diseño de GreenGrass. Une los fundamentos de diseño (tokens, espaciado, color) con los elementos de interfaz que se construyen a partir de ellos.

Esto no es una biblioteca de componentes: es un inventario de lo que hay que construir. Los detalles de implementación (las API de los componentes Svelte, las definiciones de props) llegan durante el desarrollo. Este documento garantiza que el sistema de diseño cubra, con un vocabulario de componentes consistente, todos los patrones identificados en el catálogo de patrones (pattern-catalog.md).

## Convenciones de nombres

### Nombres de componente

Los componentes usan PascalCase, con la categoría como prefijo:

```
Category/ComponentName
```

Ejemplos: `Button/Primary`, `Form/TextInput`, `Layout/Sidebar`, `Data/Table`.

### Nombres de variante

Las variantes usan sufijos descriptivos:

```
Button/Primary
Button/Secondary
Button/Ghost
Button/Danger
```

### Nombres de estado

Los estados siguen un vocabulario estándar:

| Estado | Descripción |
|-------|-------------|
| `default` | Estado normal en reposo |
| `hover` | El cursor está encima (solo en escritorio) |
| `focus` | Foco de teclado (con anillo de foco visible) |
| `active` | Mientras se presiona o se hace clic |
| `disabled` | No interactivo, atenuado |
| `loading` | Esperando una operación asíncrona |
| `error` | Fallo de validación o estado de error |
| `selected` | Seleccionado en este momento (en una lista, un interruptor, etc.) |
| `expanded` | El elemento plegable está desplegado |
| `collapsed` | El elemento plegable está plegado |
| `offline` | Funcionalidad no disponible por la conectividad |
| `empty` | No hay datos que mostrar |

---

## Categorías de componentes

### 1. Primitivas

Los bloques de construcción de más bajo nivel. Se usan dentro de otros componentes; rara vez se usan directamente en la disposición de una página.

| Componente | Descripción | Estados |
|-----------|-------------|--------|
| `Icon` | Dibuja los iconos de Lucide en los tamaños estándar. Maneja el reflejo en RTL de los iconos direccionales. | default |
| `Badge` | Rótulo pequeño para contadores, estados y etiquetas. | default, variantes: status (success/warning/error/info), count, tag |
| `Avatar` | Foto o iniciales de la persona o la organización. Circular. | default, tamaños: sm/md/lg/xl |
| `Divider` | Línea separadora horizontal o vertical. | default, with-label |
| `Spinner` | Indicador de carga. Respeta el movimiento reducido. | default |
| `Skeleton` | Marcador de posición para el contenido que se está cargando. | text, circle, rectangle |
| `Tooltip` | Texto contextual al pasar el cursor o al tocar. | default |
| `VisuallyHidden` | Texto solo para lectores de pantalla. | default |

### 2. Tipografía

Componentes de renderizado de texto, con HTML semántico y aplicación de tokens incorporados.

| Componente | Descripción | Variantes |
|-----------|-------------|----------|
| `Heading` | h1-h6 con el tamaño de token que corresponde. | nivel: 1-6 |
| `Text` | Texto de cuerpo con variantes de tamaño, peso y color. | tamaño: xs/sm/base/lg, peso: normal/medium/semibold |
| `Label` | Rótulos de los campos de formulario. Se asocia al campo con `for`. | default, required |
| `HelpText` | Texto explicativo debajo del campo. | default, error |
| `Link` | Texto de enlace con el color y el comportamiento de subrayado que corresponden. | default, external |
| `Code` | Código en línea o en bloque con fuente monoespaciada. | inline, block |
| `Timestamp` | Muestra el tiempo relativo ("hace 2 min"). Se actualiza automáticamente. | default |

### 3. Botones

Elementos interactivos que disparan acciones.

| Componente | Descripción | Estados |
|-----------|-------------|--------|
| `Button/Primary` | Llamada a la acción principal. Fondo relleno con el color principal. | default, hover, focus, active, disabled, loading |
| `Button/Secondary` | Acción secundaria. Estilo con contorno. | igual |
| `Button/Ghost` | Acción terciaria. Solo texto, sin fondo. | igual |
| `Button/Danger` | Acción destructiva. Estilo en rojo. Exige confirmación en las acciones críticas. | igual |
| `Button/Icon` | Botón de solo icono. Exige aria-label. | igual |
| `Button/Group` | Grupo horizontal de botones relacionados. | default |
| `Button/FloatingAction` | FAB de móvil para las acciones principales. | default, expanded (con subacciones) |
| `Button/FieldAction` | Botón de área táctil grande para el modo de campo. Altura mínima de 48px. | default, active, disabled |

### 4. Formularios

Componentes de entrada de datos.

| Componente | Descripción | Estados |
|-----------|-------------|--------|
| `Form/TextInput` | Campo de texto de una línea. | default, focus, error, disabled, with-icon, with-clear |
| `Form/TextArea` | Campo de texto de varias líneas. Crece automáticamente. | default, focus, error, disabled |
| `Form/Select` | Desplegable de selección única. | default, focus, error, disabled, open |
| `Form/MultiSelect` | Selección múltiple con chips. | igual |
| `Form/Checkbox` | Casilla booleana (marcada/desmarcada). | default, checked, indeterminate, disabled |
| `Form/Radio` | Selección única entre opciones. | default, selected, disabled |
| `Form/Toggle` | Interruptor de encendido y apagado. | default, on, disabled |
| `Form/DatePicker` | Selección de fecha (calendario emergente). | default, focus, error, range |
| `Form/TimePicker` | Selección de hora. | default, focus, error |
| `Form/NumberInput` | Campo numérico con incremento y decremento. | default, focus, error, disabled |
| `Form/CurrencyInput` | Campo con formato de moneda y símbolo. | default, focus, error |
| `Form/PhoneInput` | Número de teléfono con selector de código de país. | default, focus, error |
| `Form/FileUpload` | Selección de archivos con arrastrar y soltar. | default, dragging, uploading, complete, error |
| `Form/ColorPicker` | Selección de color (para personalizar la marca). | default, open |
| `Form/SearchInput` | Campo de texto con icono de búsqueda y botón para limpiar. | default, focus, loading, with-results |
| `Form/FieldGroup` | Agrupa campos de formulario relacionados bajo un rótulo. Plegable. | default, expanded, collapsed |

### 5. Maquetación

Componentes estructurales que organizan el contenido de la página.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Layout/Shell` | El marco de la aplicación de nivel superior (barra superior + barra lateral + contenido). | Barra lateral adaptable al rol. Ver navigation-model.md. |
| `Layout/FieldShell` | Marco del modo de campo (barra superior de campo + contenido de la tarea + acciones). | Pantalla completa exclusiva. |
| `Layout/PortalShell` | Marco del portal de simpatizantes (barra superior mínima + contenido). | Navegación simplificada. |
| `Layout/WizardShell` | Marco del asistente (encabezado de progreso + contenido del paso + navegación). | Reemplaza la barra lateral por los pasos. |
| `Layout/Page` | Envoltorio de página con título, ruta de navegación y área de acciones. | |
| `Layout/Section` | Sección de contenido con encabezado y separador opcionales. | |
| `Layout/Card` | Contenedor de contenido elevado. | elevation-1, hover: elevation-2 |
| `Layout/Grid` | Envoltorio de CSS grid con número de columnas adaptable. | 4/8/12 columnas |
| `Layout/Stack` | Pila vertical con separación consistente. | gap: de space-2 a space-8 |
| `Layout/Cluster` | Flex horizontal con ajuste de línea y separación consistente. | |
| `Layout/SplitView` | Disposición redimensionable de dos paneles (lista + detalle). | Solo en escritorio. |
| `Layout/DetailPanel` | Panel de detalle que se despliega desde la derecha. | Se puede cerrar y redimensionar. |

### 6. Navegación

Componentes que ayudan a moverse por la aplicación.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Nav/Sidebar` | Barra lateral de escritorio con secciones adaptables al rol. | Plegable, con elementos agrupados. |
| `Nav/SidebarItem` | Elemento de navegación individual de la barra lateral. | default, active, with-badge, disabled (sin conexión) |
| `Nav/SidebarSection` | Encabezado de grupo plegable en la barra lateral. | expanded, collapsed |
| `Nav/BottomTabBar` | Navegación inferior de móvil. Pestañas adaptables al rol. | |
| `Nav/BottomTab` | Pestaña individual de la barra inferior. | default, active, with-badge |
| `Nav/Breadcrumb` | Ruta de navegación para las jerarquías profundas. | |
| `Nav/Pagination` | Navegación por páginas en las listas. | |
| `Nav/StepIndicator` | Indicador de pasos de un asistente o un proceso. | pending, active, complete, error |
| `Nav/Tabs` | Barra horizontal de pestañas para las secciones de contenido. | |
| `Nav/Tab` | Pestaña individual. | default, active, disabled |

### 7. Presentación de datos

Componentes para presentar datos.

| Componente | Descripción | Estados |
|-----------|-------------|--------|
| `Data/Table` | Tabla de datos completa, con ordenamiento, selección y acciones. | default, loading, empty, error |
| `Data/TableRow` | Fila de tabla. | default, selected, hover, expanded (fila de detalle) |
| `Data/List` | Lista vertical de elementos (alternativa a la tabla, apta para móvil). | default, loading, empty |
| `Data/ListItem` | Elemento de lista individual. Se puede tocar. | default, selected, with-actions |
| `Data/CardGrid` | Cuadrícula de tarjetas (widgets del panel, resultados de búsqueda). | default, loading, empty |
| `Data/MetricCard` | Muestra un solo KPI (valor + rótulo + tendencia). | default, loading, positive-trend, negative-trend |
| `Data/Thermometer` | Barra de progreso hacia una meta. | default, with-label, complete |
| `Data/Chart` | Envoltorio de los componentes de gráfica (líneas, barras, pastel). | default, loading, empty, error |
| `Data/Timeline` | Lista cronológica de eventos (flujos de actividad). | default, loading |
| `Data/TimelineItem` | Entrada individual de la línea de tiempo. | default |
| `Data/EmptyState` | Marcador de posición sin datos, con mensaje y llamada a la acción. | contenido según el contexto |
| `Data/KeyValue` | Par rótulo-valor para las vistas de detalle. | default, inline, stacked |

### 8. Retroalimentación

Componentes que comunican el estado del sistema y la respuesta a lo que hace la persona.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Feedback/Toast` | Notificación pasajera, abajo (escritorio) o arriba (móvil). | success, error, warning, info |
| `Feedback/Alert` | Banner de alerta persistente, en línea. | success, error, warning, info, dismissable |
| `Feedback/ProgressBar` | Progreso determinado o indeterminado. | default, indeterminate |
| `Feedback/SyncIndicator` | Muestra el estado de conectividad y sincronización. | connected, stale, syncing, offline, error |
| `Feedback/FieldSyncIndicator` | Indicador de sincronización ampliado para el modo de campo. | los mismos estados, más grandes |
| `Feedback/OfflineBadge` | Distintivo pequeño que indica que una funcionalidad no está disponible sin conexión. | default |
| `Feedback/FreshnessIndicator` | Muestra la antigüedad de los datos ("Última actualización: hace 2 horas"). | current, stale, warning |

### 9. Superposiciones

Componentes que aparecen sobre la capa de contenido principal.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Overlay/Modal` | Diálogo centrado. Atrapa el foco. | tamaños: sm/md/lg |
| `Overlay/Drawer` | Panel lateral que entra desde un borde. | dirección: left/right, tamaños: sm/md/lg |
| `Overlay/BottomSheet` | Hoja inferior de móvil (sube desde abajo). | tamaños: half/full |
| `Overlay/Dropdown` | Se posiciona debajo del elemento que lo dispara. | opción with-search |
| `Overlay/Popover` | Se posiciona junto al disparador, con flecha. | |
| `Overlay/ConfirmDialog` | Modal con confirmar y cancelar para las acciones destructivas. | default, danger |
| `Overlay/NotificationDrawer` | Bandeja de notificaciones que se despliega. | |
| `Overlay/CommandPalette` | Superposición para buscarlo todo (Cmd+K). | |

### 10. Mensajería

Componentes propios del sistema de mensajería.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Messaging/ConversationList` | Lista de conversaciones con vista previa. | default, filtered |
| `Messaging/ConversationItem` | Una conversación de la lista. | default, unread, selected, muted |
| `Messaging/MessageBubble` | Mensaje individual dentro de un hilo. | sent, received, system |
| `Messaging/MessageComposer` | Campo de texto con botón de enviar y adjuntos. | default, with-attachments |
| `Messaging/ThreadIndicator` | Indicador en línea de que un mensaje tiene hilo. | default, with-count |
| `Messaging/EncryptionBadge` | Indicador del estado del cifrado de extremo a extremo (E2E). | encrypted, unencrypted |
| `Messaging/VoiceMessage` | Reproductor de mensajes de voz (solo en contextos de campo). | default, playing |

### 11. Modo de campo

Componentes propios de la interfaz del modo de campo.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Field/ShiftHeader` | Barra superior del modo de campo (sincronización, cronómetro, indicador de grabación). | |
| `Field/TaskNav` | Navegación anterior/siguiente con contador de posición. | |
| `Field/DoorCard` | Ficha con la información del votante para el trabajo de campo. | default, visited, skipped |
| `Field/ResponseForm` | Captura de respuestas guiada por el guion. | single-select, multi-select, text |
| `Field/ResponseOption` | Botón grande para tocar, con las opciones de respuesta. | default, selected |
| `Field/MapView` | Mapa que funciona sin conexión para visualizar la lista de recorrido. | |
| `Field/WalkListItem` | Elemento de la lista de recorrido. | pending, complete, skipped, not-home |
| `Field/PanicButton` | Botón de bloqueo y pánico. Siempre accesible. | default |
| `Field/ShiftTimer` | Muestra el tiempo transcurrido del turno. | running, paused |
| `Field/EndShiftButton` | Acción de terminar el turno, con confirmación. | default |

### 12. Panel

Componentes para los widgets y las métricas del panel.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Dashboard/WidgetGrid` | Contenedor de cuadrícula adaptable para los widgets del panel. | |
| `Dashboard/Widget` | Envoltorio base del widget (título, contenido, área de acciones). | default, loading, error, empty |
| `Dashboard/AlertWidget` | Widget con los elementos que necesitan atención. | with-count, priority-sorted |
| `Dashboard/ActivityFeed` | Widget con el flujo de actividad reciente. | |
| `Dashboard/GoalProgress` | Widget termómetro de metas de recaudación o de campo. | |
| `Dashboard/MapWidget` | Widget con un mapa incrustado. | |
| `Dashboard/ElectionDayBanner` | Banner persistente de "Día de elecciones activo". | active, countdown |

### 13. Especializados

Componentes para funcionalidades concretas con patrones de interacción propios.

| Componente | Descripción | Notas |
|-----------|-------------|-------|
| `Special/CheckInTool` | Interfaz rápida de registro de entrada con búsqueda y QR. | |
| `Special/CheckInItem` | Elemento individual de la lista de registro de entrada. | pending, checked-in, absent |
| `Special/ApprovalCard` | Elemento de la cola de aprobaciones con vista previa y acciones. | pending, approved, rejected |
| `Special/ComparisonView` | Comparación de registros lado a lado (deduplicación). | |
| `Special/MergeControl` | Decisión de fusión campo por campo (quedarse con la izquierda, la derecha o ambas). | |
| `Special/PipelineColumn` | Columna kanban en las vistas de flujo de etapas. | |
| `Special/PipelineCard` | Tarjeta arrastrable en las vistas de flujo de etapas. | |
| `Special/ImportMapper` | Interfaz de correspondencia de columnas para la importación de datos. | |
| `Special/FilterBar` | Muestra los filtros activos con chips y una acción para limpiarlos. | |
| `Special/FilterPanel` | Configuración de filtros a pantalla completa (móvil). | |
| `Special/SavedFilterSelector` | Desplegable para elegir filtros guardados. | |
| `Special/RideRequestCard` | Muestra una solicitud de transporte de GOTV (Get Out The Vote — movilización del voto). | pending, assigned, complete |
| `Special/IssueReportForm` | Reporte de problemas del observador electoral (funciona sin conexión). | |

---

## Patrones de composición de componentes

### Componentes compuestos

Algunos patrones de interfaz se componen de varios componentes que trabajan juntos:

| Patrón | Componentes |
|---------|------------|
| **Vista de lista** | `Layout/Page` + `Special/FilterBar` + `Data/Table` (escritorio) o `Data/List` (móvil) + `Nav/Pagination` + `Data/EmptyState` |
| **Vista de detalle** | `Layout/Page` + `Layout/Card` + `Data/KeyValue` + `Nav/Tabs` + `Data/Timeline` |
| **Página de formulario** | `Layout/Page` + `Form/FieldGroup` (varios) + `Button/Primary` + `Button/Secondary` |
| **Panel** | `Layout/Page` + `Dashboard/WidgetGrid` + `Dashboard/Widget` (varios) |
| **Vista dividida** | `Layout/SplitView` + `Data/List` (izquierda) + `Layout/DetailPanel` (derecha) |
| **Asistente** | `Layout/WizardShell` + `Nav/StepIndicator` + contenido propio de cada paso + `Button/Primary` + `Button/Secondary` |

### Patrón de slots

Los componentes que aceptan contenido hijo usan un patrón de slots:

```
Layout/Card
  └── [slot: default] → cualquier contenido
  └── [slot: header] → título + acciones
  └── [slot: footer] → contenido del pie
```

Esa capacidad de composición significa menos componentes especializados y una reutilización más flexible.

---

## Resumen del conteo de componentes

| Categoría | Cantidad | Notas |
|----------|-------|-------|
| Primitivas | 8 | Elementos fundacionales |
| Tipografía | 7 | Renderizado de texto |
| Botones | 8 | Disparadores interactivos |
| Formularios | 16 | Entrada de datos |
| Maquetación | 12 | Estructura |
| Navegación | 10 | Movimiento |
| Presentación de datos | 12 | Presentación de datos |
| Retroalimentación | 7 | Comunicación de estado |
| Superposiciones | 8 | Elementos en capas |
| Mensajería | 7 | Propios del chat |
| Modo de campo | 10 | Propios del campo |
| Panel | 7 | Propios del panel |
| Especializados | 13 | Propios de una funcionalidad |
| **Total** | **~125** | |

Unos **125 componentes** componen el sistema de diseño completo. Es un sistema moderadamente grande, comparable con sistemas de diseño maduros como Carbon (IBM) o Polaris (Shopify), lo que refleja la amplitud de la plataforma.

---

## Preguntas abiertas

1. **Documentación de los componentes.** ¿Debería cada componente tener su propia página de documentación (como las historias de Storybook) desde el primer día, o se documenta a medida que se construyen? Empezar por Storybook garantiza que los componentes queden bien probados de forma aislada, pero añade sobrecarga al desarrollo.

2. **Componentes de animación.** ¿Debería el sistema de diseño incluir componentes envoltorio de transición (FadeIn, SlideUp) o manejar todo el movimiento con clases de CSS? Las transiciones basadas en componentes son más explícitas, pero suman al conteo de componentes.

3. **Biblioteca de gráficas.** ¿Qué biblioteca de gráficas debería envolver el componente `Data/Chart`? Las opciones incluyen Chart.js (liviana, basada en canvas), D3 (potente, basada en SVG, más pesada) o una opción nativa de Svelte como LayerCake. La elección afecta el tamaño del paquete y la profundidad de la personalización.

<!-- REVISIT: Las API de los componentes (definiciones de props, firmas de eventos, contratos de slots) quedan aplazadas a la implementación. Este inventario define *qué* existe; la implementación define *cómo* funciona cada componente. -->
