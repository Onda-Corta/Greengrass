# Catálogo de patrones

## Propósito

Este documento inventaría los patrones de interfaz que se repiten en GreenGrass. Cada patrón es un modelo de interacción reutilizable que aparece en varias pantallas y áreas funcionales. Definirlos aquí garantiza la coherencia: el mismo patrón debe verse y comportarse igual en todos los lugares donde aparece.

Este catálogo es la referencia para el diseño de componentes (fase 3) y para los wireframes (fase 4). Los patrones que necesitan una especificación profunda (sincronización sin conexión, notificaciones, búsqueda, seguridad) tienen su propio documento en este directorio.

## Resumen de patrones

| # | Patrón | Cantidad de pantallas | Sin conexión | Prioridad móvil | Arquetipos clave |
|---|---------|-------------|---------|----------------|-------------|
| 1 | Vista de lista | ~23 | Parcial | Algunas | Todo el personal |
| 2 | Vista de detalle | ~14 | Parcial | Algunas | Todo el personal |
| 3 | Formulario de creación/edición | ~29 | No | Pocas | Personal que crea contenido |
| 4 | Interfaz de constructor | ~8 | No | No | Personal que crea contenido |
| 5 | Flujo de asistente | 8 | No | 2 | OA, V |
| 6 | Panel | ~21 | No | Algunas | Todo el personal, C |
| 7 | Interfaz de mapa | 6 | 1 | 1 | OA, FiD, V, TL |
| 8 | Calendario/programación | ~4 | No | Algunas | OA, VC, CD |
| 9 | Redactor | ~5 | No | Algunas | OA, CD, FiD |
| 10 | Cola de aprobaciones | ~3 | No | 1 | C, CD, FD |
| 11 | Cola de revisión | ~5 | Parcial | 1 | OA, DM, FiD |
| 12 | Herramienta de registro de entrada | 4 | Sí | Todas | VC, TL, V |
| 13 | Flujo/kanban | 1 | No | No | OA, CD |
| 14 | Flujo de importación/exportación | 5 | No | No | OA, DM |
| 15 | Panel de configuración | ~16 | No | No | OA |
| 16 | Comparación lado a lado | ~3 | No | No | OA, DM |
| 17 | Vista dividida / panel de detalle | ~6 | Parcial | No | Todo el personal |
| 18 | Modo de campo (pantalla completa) | ~16 | Sí | Todas | V, TL |
| 19 | Panel en tiempo real | ~3 | No | Algunas | OA, FiD |
| 20 | Hilo contextual | ~4 | Parcial | Sí | Todo el personal |

---

## 1. Vista de lista

El patrón más común de la plataforma. Una colección de registros que se puede filtrar, ordenar y buscar.

### Dónde aparece

Contactos (CRM-001), Segmentos (CRM-005), Historial de importaciones (CRM-012), Campañas de trabajo de campo (CANV-001), Listas de recorrido (CANV-006), Campañas de jornada de llamadas (PHONE-001), Jornadas de inscripción de votantes (VREG-001), Donaciones (FUND-001), Campañas de recaudación (FUND-018), Campañas de correo (COMM-001), Plantillas de correo (COMM-004), Eventos (EVT-001), Campañas de activismo (ACT-001), Contactos de medios (PRESS-001), Listas de medios (PRESS-003), Registro de cobertura (PRESS-010), Puntos de mensaje (PRESS-014), Bandeja de mensajes (MSG-001), Lista del personal (SET-004), Miembros de la alianza (ALLY-002), Problemas de observadores electorales (GOTV-016).

### Anatomía

```
┌──────────────────────────────────────────────────────────┐
│  [Buscar...]        [Filtrar ▾]  [Ordenar ▾]  [+ Nuevo]  │  ← Barra de acciones
├──────────────────────────────────────────────────────────┤
│  ☐  Nombre           Estado      Fecha        Acciones   │  ← Encabezados de columna
├──────────────────────────────────────────────────────────┤
│  ☐  Registro 1       Activo      15 ene       ⋯          │
│  ☐  Registro 2       Borrador    14 ene       ⋯          │
│  ☐  Registro 3       Activo      13 ene       ⋯          │
│  ...                                                     │
├──────────────────────────────────────────────────────────┤
│  ◀  Página 1 de 12  ▶        Mostrando 1-25 de 287       │  ← Paginación
└──────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Búsqueda** — búsqueda de texto sobre los campos clave (nombre, correo, título), con retardo entre pulsaciones. Se resuelve en el servidor.
- **Filtros** — según el tipo de lista. Los filtros activos se muestran como chips encima de la lista. "Limpiar todo" los reinicia.
- **Orden** — se ordena al hacer clic en el encabezado de columna. Alterna entre ascendente y descendente. El orden por defecto varía según la lista (lo más reciente primero para la actividad, alfabético para los contactos).
- **Acciones masivas** — se seleccionan varias filas con las casillas. Aparece una barra de acciones masivas arriba (borrar, exportar, etiquetar, asignar). Limitada a operaciones seguras.
- **Acciones de fila** — menú de desbordamiento (⋯) en cada fila para acciones rápidas (editar, duplicar, borrar, archivar).
- **Clic en la fila** — lleva a la vista de detalle. En escritorio con panel de detalle, se abre en el panel derecho. En móvil, lleva a una vista de detalle a pantalla completa.
- **Estado vacío** — cuando la lista no tiene registros, muestra un mensaje según el perfil ("Crea tu primera campaña de trabajo de campo" para un Director de campo, "Importa tu padrón electoral" para un Gestor de datos).
- **Carga** — filas de esqueleto de carga (no un indicador de carga) mientras llegan los datos.
- **Paginación** — paginación en el servidor. 25 filas por defecto. Se puede cambiar a 50 o 100. Desplazamiento infinito en móvil.

### Variante móvil

En móvil, la vista de lista se convierte en una lista vertical de tarjetas:
- Sin columnas de tabla: cada registro es una tarjeta con la información clave apilada en vertical
- Búsqueda y filtro accesibles desde los iconos de la barra superior
- Acciones al deslizar sobre las tarjetas (archivar, borrar) cuando corresponde
- Deslizar para actualizar
- Desplazamiento infinito en vez de paginación

### Variante sin conexión

La mayoría de las listas necesitan conectividad. Excepción: la bandeja de mensajes (MSG-001) muestra las conversaciones en caché cuando no hay conexión, con un banner que advierte que la lista puede no estar al día.

---

## 2. Vista de detalle

Una vista completa de un solo registro, con todos sus campos, los registros relacionados, el historial y las acciones disponibles.

### Dónde aparece

Detalle del contacto (CRM-002), Detalle de la donación (FUND-002), Detalle del evento (EVT-003), Detalle del contacto de medios (PRESS-002), Detalle del respaldo (PRESS-013), Vista de conversación (MSG-002/003), Perfil del simpatizante (SUP-006), Resultados del trabajo de campo (CANV-013).

### Anatomía

```
┌────────────────────────────────────────────────────────────┐
│  ← Volver   Nombre del registro          [Editar] [⋯]      │  ← Encabezado
├────────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌─────────────────────────┐    │
│  │ Información clave     │  │ Estado / etiquetas      │    │
│  │ (nombre, tipo, fecha) │  │ (activo, marcado, etc.) │    │
│  └───────────────────────┘  └─────────────────────────┘    │
├────────────────────────────────────────────────────────────┤
│  [General] [Actividad] [Relacionados] [Notas]              │  ← Pestañas
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Contenido de la pestaña (campos, cronología, registros)   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Encabezado** — nombre o título del registro, estado principal, botón de editar, menú de desbordamiento (borrar, duplicar, fusionar, exportar).
- **Pestañas** — organizan la información relacionada sin abrumar. Pestañas habituales: General (campos principales), Actividad (cronología de interacciones), Relacionados (registros enlazados: las donaciones, los eventos y las comunicaciones de un contacto), Notas (notas libres).
- **Acción de editar** — lleva al formulario de edición (o habilita la edición en línea para los campos simples).
- **Registros relacionados** — se muestran como minilistas dentro de las pestañas. Al hacer clic en uno se va a su vista de detalle.
- **Cronología de actividad** — flujo cronológico de todas las interacciones con este registro (correos enviados, donaciones recibidas, eventos a los que asistió, notas añadidas, cambios de estado). Cada entrada enlaza a su origen.

### Variante móvil

- Vista a pantalla completa. El botón de volver regresa a la lista.
- Las pestañas se convierten en una barra horizontal desplazable o en secciones plegables.
- La tarjeta de información clave queda fija arriba al desplazarse.

### Escritorio con panel de detalle

En escritorio, las vistas de detalle pueden abrirse en el panel derecho (vista dividida) mientras la lista sigue visible a la izquierda. La persona usuaria puede moverse entre registros de la lista sin perder el contexto del panel de detalle. El panel se puede cerrar o expandir a pantalla completa.

---

## 3. Formulario de creación/edición

Entrada estructurada de datos para crear o modificar registros. El patrón más variado: los formularios van desde la creación de un contacto con 3 campos hasta la configuración de una campaña con más de 20.

### Dónde aparece

Crear/editar contacto (CRM-003), Crear/editar campaña (CANV-002, PHONE-002, VREG-002, FUND-019), Crear/editar evento (EVT-002), Crear/editar grupo (MSG-005), Procesamiento de reembolsos (FUND-009), Gestión de promesas de donación (FUND-008) y muchos más: unas 29 pantallas.

### Anatomía

```
┌──────────────────────────────────────────────────────────────┐
│  ← Volver   Crear [tipo de registro]   [Guardar] [Cancelar]  │  ← Encabezado
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Sección: Información básica                         [▾]     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Rótulo del campo *        [valor introducido  ]        │  │
│  │ Rótulo del campo          [valor introducido  ]        │  │
│  │ Rótulo del campo *        [desplegable ▾      ]        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Sección: Detalles adicionales                       [▸]     │  ← Plegada
│                                                              │
│  Sección: Ajustes                                    [▸]     │  ← Plegada
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [Cancelar]                                       [Guardar]  │  ← Pie fijo
└──────────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Revelación progresiva** — los campos se organizan en secciones plegables. Los campos obligatorios se ven por defecto; los opcionales y avanzados quedan en secciones plegadas. Reduce la carga cognitiva en los casos simples.
- **Validación** — validación en línea al salir del campo (no en cada pulsación). Los mensajes de error aparecen debajo del campo. Los campos obligatorios llevan asterisco. Validación de todo el formulario al enviar, si pasan las verificaciones en línea.
- **Guardado automático** — en los formularios complejos (creación de campañas, configuración de eventos) se guarda un borrador cada 30 segundos. Los borradores se ven en la lista superior con el distintivo de estado "Borrador".
- **Guardar/cancelar fijos** — los botones de acción quedan pegados al borde inferior del viewport (el área visible de la pantalla) para que estén siempre a mano en los formularios largos.
- **Cambios sin guardar** — si se sale del formulario con cambios pendientes, aparece un diálogo de confirmación ("Tienes cambios sin guardar. ¿Descartarlos?").
- **Texto de ayuda** — una explicación breve debajo de los campos complejos. En los campos sensibles para el cumplimiento, se incluye una ayuda desplegable de "¿Por qué se requiere esto?".

### Variante móvil

- Formulario a pantalla completa. Las secciones se apilan en vertical.
- Campos de entrada grandes, con el teclado móvil adecuado (numérico para el teléfono, de correo para el correo).
- Botón de guardar fijo al pie de la pantalla.
- Las secciones plegadas muestran una vista previa de su contenido (el valor del primer campo).

---

## 4. Interfaz de constructor

Editores visuales e interactivos para componer contenido estructurado complejo. Son las herramientas de mayor potencia de la plataforma, y su complejidad justifica un diseño solo para escritorio.

### Subtipos

#### Constructor de correos (COMM-002, COMM-003)

Editor visual por bloques. Bloques de contenido que se arrastran y sueltan (texto, imagen, botón, separador, columnas). Inserción de tokens de personalización (`{{first_name}}`, `{{donation_amount}}`). Interruptor de vista previa móvil. El aviso legal de cumplimiento se inserta solo, según la jurisdicción.

#### Constructor de guiones (CANV-003, PHONE-003)

Editor de lógica ramificada. Pregunta → opciones de respuesta → pregunta siguiente condicional. Diagrama visual del flujo con las ramas. Modo de prueba para recorrer el guion tal como lo viviría un voluntario.

#### Constructor de segmentos (CRM-004)

Constructor de consultas por criterios. Se añaden criterios (campo, operador, valor) y se combinan con lógica Y/O. El recuento de registros que coinciden se actualiza en tiempo real a medida que cambian los criterios. Se guarda como segmento reutilizable.

#### Constructor de formularios de donación (FUND-003)

Editor de la disposición del formulario. Configura montos sugeridos, métodos de pago, opciones recurrentes, campos personalizados, identidad visual y avisos legales de cumplimiento. Vista previa en vivo del formulario público de donación.

#### Constructor de encuestas (EVT-010)

Editor de preguntas. Se añaden preguntas (opción múltiple, abiertas, escala de valoración, NPS). Reordenamiento arrastrando. Reglas de visualización condicional. Modo de vista previa.

### Comportamientos comunes

- **Vista previa en vivo** — todos los constructores muestran el resultado en tiempo real. En los de correo y formularios de donación, con interruptor de vista previa móvil.
- **Biblioteca de plantillas** — se empieza desde una plantilla o en blanco. El trabajo actual se puede guardar como plantilla nueva.
- **Deshacer/rehacer** — imprescindible para la edición compleja. Atajos de teclado (Ctrl+Z/Ctrl+Y).
- **Historial de versiones** — versiones guardadas automáticamente. Se puede restaurar una anterior.
- **Solo en escritorio** — los constructores necesitan pantallas anchas para el lienzo de edición más el panel de vista previa. No están disponibles en móvil.

---

## 5. Flujo de asistente

Procesos guiados de varios pasos para tareas de configuración complejas. Ver también: `settings-help-patterns.md` para los detalles de la incorporación.

### Dónde aparece

Configuración de la organización (WIZ-001), Procesador de pagos (WIZ-002), Generación de llaves BYOK (WIZ-003), Configuración de cumplimiento (WIZ-004), Configuración de WhatsApp Business (WIZ-005), Configuración del número de SMS (WIZ-006), Importación del padrón electoral (WIZ-007), Incorporación de voluntarios (WIZ-008).

### Anatomía

```
┌────────────────────────────────────────────────────────────┐
│  [Logo]           Paso 3 de 7          [Guardar y salir]   │  ← Encabezado del asistente
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ○───●───●───○───○───○───○                                 │  ← Barra de progreso
│       Paso 1  Paso 2  Paso 3                               │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  Contenido específico del paso                       │  │
│  │  (campos, instrucciones, confirmación)               │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  [← Atrás]                                  [Siguiente →]  │  ← Navegación entre pasos
└────────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Indicador de progreso** — muestra los pasos completados, el actual y los que faltan. Los pasos pueden ir rotulados o numerados.
- **Validación por paso** — cada paso se valida antes de dejar avanzar. Volver atrás está siempre disponible.
- **Guardar y salir** — conserva el estado del asistente. Al volver, se retoma en el último paso completado.
- **Ayuda contextual** — cada paso puede llevar texto de ayuda en línea y enlaces a artículos de la base de conocimiento.
- **Estado de finalización** — el último paso resume lo que quedó configurado y sugiere los siguientes pasos.
- **Barra lateral sustituida** — durante un asistente, la barra lateral muestra los nombres de los pasos en vez de la navegación normal (según navigation-model.md).

---

## 6. Panel

Resúmenes visuales de las métricas clave, organizados en cuadrículas de widgets. Cada perfil tiene un panel predeterminado distinto.

### Dónde aparece

General de la campaña (DASH-001), Operaciones de campo (DASH-002), Recaudación de fondos (DASH-003), Comunicaciones (DASH-004), Voluntarios (DASH-005), Calidad de datos (DASH-006), Cumplimiento (DASH-007), Centro de mando (DASH-008), Líder de equipo (DASH-009), Candidato (DASH-010), Alianza (DASH-011).

### Tipos de widget

| Widget | Descripción | Ejemplo |
|--------|-------------|---------|
| Tarjeta de métrica | Un solo KPI con indicador de tendencia | "Total recaudado: $47,320 ↑12 %" |
| Termómetro | Barra de progreso hacia una meta | Meta de recaudación: 63 % de $100K |
| Gráfico de líneas | Tendencia en el tiempo | Totales diarios de donaciones, vista de 30 días |
| Gráfico de barras | Comparación entre categorías | Puertas tocadas por territorio |
| Mapa de calor | Distribución geográfica | Participación por precinto |
| Distribución | Desglose por categoría | Donantes por nivel de monto |
| Lista de alertas | Elementos que requieren atención | Marcas de cumplimiento, errores de sincronización |
| Flujo de actividad | Acciones recientes | Últimas donaciones, altas de voluntarios |

### Comportamientos

- **Filtro de rango de fechas** — cada panel arranca con un rango pertinente (hoy para el centro de mando, este mes para recaudación, esta campaña para campo). Se puede ajustar.
- **Desglose** — al hacer clic en una tarjeta de métrica o en un gráfico se llega a la lista o a la vista de detalle que hay debajo. La tarjeta de métrica es un atajo, no un callejón sin salida.
- **Actualización** — los paneles muestran la marca de "Última actualización: X". Hay un botón de actualización manual. El panel del centro de mando se actualiza solo cada 30 segundos.
- **Cuadrícula adaptable** — los widgets se reacomodan según el viewport. Escritorio: de 2 a 4 columnas. Tableta: 2 columnas. Móvil: 1 columna, apilada en vertical.
- **Estados vacíos** — cuando una métrica no tiene datos, el widget muestra un mensaje contextual ("Todavía no hay donaciones — configura tu primer formulario de donación", con enlace al constructor de formularios).

### Variante móvil

Los widgets se apilan en vertical por orden de prioridad (la métrica más importante primero). Los gráficos se simplifican a lo esencial (menos rótulos de eje, sin leyenda en los gráficos pequeños). Las tarjetas de métrica pasan a ocupar todo el ancho.

---

## 7. Interfaz de mapa

Visualizaciones geográficas interactivas para datos espaciales: territorios, avance del trabajo de campo, distribución de votantes, participación.

### Dónde aparece

Gestión de territorios (CANV-004), Generación automática de territorios (CANV-005), Mapa del modo de campo (CANV-009), Avance del trabajo de campo (CANV-014), Corte de territorios para GOTV (GOTV-004), Mapa de participación (GOTV-017).

### Subtipos

#### Mapa de gestión (escritorio)

Mapa completo para crear y gestionar territorios. Herramientas de dibujo (polígono, rectángulo), capas de límites (precintos, distritos), superposiciones de datos (densidad de votantes, puntajes de apoyo). Lo usan los Directores de campo para planificar las operaciones.

#### Mapa de campo (móvil, sin conexión)

Mapa simplificado para los voluntarios en la calle. Muestra la ubicación actual, la ruta de la lista de recorrido y las puertas visitadas frente a las que faltan. Teselas de mapa precargadas en caché para usarlo sin conexión. Áreas táctiles grandes para seleccionar puertas. Sin herramientas de dibujo: solo lectura.

#### Mapa de analítica (escritorio)

Superposiciones de mapa de calor para entender los patrones geográficos. Participación por precinto, cobertura del trabajo de campo, distribución de los puntajes de apoyo. Leyendas con código de color. Acercamiento a zonas concretas.

### Comportamientos comunes

- **Mapa base** — callejero por defecto. Satélite disponible para las zonas rurales donde el callejero es pobre.
- **Capas** — las capas de datos se activan y desactivan. Capas de límites (precintos, territorios) y capas de datos (mapas de calor, marcadores).
- **Búsqueda** — búsqueda por dirección para ir a un punto concreto.
- **Zoom y desplazamiento** — controles de mapa estándar. Ajuste automático a los límites de los datos al cargar.

---

## 8. Vista de calendario / programación

Visualización basada en el tiempo para eventos, turnos y contenido programado.

### Dónde aparece

Calendario de publicaciones (SOCIAL-003), Agenda de entrevistas (PRESS-015), programación de eventos (dentro de EVT-002), programación de turnos (dentro de la gestión de voluntarios).

### Comportamientos

- **Modos de vista** — mes, semana, día. El predeterminado varía según el contexto (semana para eventos, mes para el calendario de contenido).
- **Código de color** — los eventos se colorean por tipo, estado o asignación.
- **Clic para crear** — al hacer clic en una franja vacía se abre un formulario de creación para esa fecha y hora.
- **Clic para ver** — al hacer clic en un elemento existente se abre su vista de detalle.
- **Arrastrar para reprogramar** — solo en escritorio. Los elementos se arrastran a otra franja horaria.

### Variante móvil

En móvil, la vista de agenda (lista vertical ordenada por fecha) sustituye a la cuadrícula del calendario. Selector de fecha para navegar. Cada elemento es una tarjeta que se puede tocar.

---

## 9. Interfaz de redactor

Composición de contenido en tiempo real, con vista previa y verificación de cumplimiento.

### Dónde aparece

Redactor de SMS/WhatsApp (COMM-005), Redactor de publicaciones (SOCIAL-002), Constructor de comunicados de prensa (PRESS-004), Aviso a medios (PRESS-007), Constructor de declaraciones (PRESS-008).

### Comportamientos comunes

- **Contador de caracteres** — en SMS y publicaciones sociales, muestra los caracteres que quedan y avisa al llegar a los umbrales.
- **Vista previa en vivo** — vista previa en tiempo real del resultado tal como lo verá quien lo reciba. En redes sociales, vistas previas por plataforma (cómo se ve en Twitter frente a Instagram).
- **Tokens de personalización** — insertan campos de combinación para contenido específico de cada destinatario.
- **Inserción automática de cumplimiento** — los avisos legales propios de cada jurisdicción se añaden solos, según la configuración de la organización.
- **Adjuntos multimedia** — carga de imágenes y archivos con vista previa.
- **Programar o enviar** — envío inmediato, envío programado (selector de fecha y hora) o guardado como borrador.
- **Enrutamiento a aprobación** — si el tipo de contenido requiere aprobación (comunicados de prensa que aprueba el candidato, publicaciones sociales), el flujo de redacción lo manda a la cola de aprobaciones en vez de enviarlo directamente.

---

## 10. Cola de aprobaciones

Revisar y aprobar o rechazar contenido y acciones que necesitan autorización.

### Dónde aparece

Cola de aprobaciones del candidato (MSG-013), Revisión de marcas de cumplimiento (FUND-012), flujos de aprobación de comunicados de prensa, aprobación de publicaciones en redes sociales.

### Anatomía

```
┌──────────────────────────────────────────────────────────────┐
│  Aprobaciones pendientes (3)                      [Filtros]  │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Comunicado de prensa: "Declaración sobre edu..."    │    │
│  │  Enviado por: Maria · hace 2 horas  · URGENTE        │    │
│  │  [Vista previa]  [Aprobar]  [Rechazar]  [Comentar]   │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Publicación social: Instagram · Programada hoy 3pm  │    │
│  │  Enviado por: Carlos · hace 45 min                   │    │
│  │  [Vista previa]  [Aprobar]  [Rechazar]  [Comentar]   │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Vista previa** — vista previa completa del contenido tal como se verá al publicarse o enviarse.
- **Aprobar/rechazar** — botones de una sola acción. Rechazar exige un motivo (comentario).
- **Comentar** — deja una observación sin aprobar ni rechazar. Dispara una notificación a quien lo envió.
- **Prioridad** — los elementos urgentes se distinguen visualmente (color, posición, distintivo).
- **Contador** — el número de elementos de la cola de aprobaciones aparece como contador en la pestaña móvil y en el elemento de la barra lateral.

---

## 11. Cola de revisión

Revisión estructurada para la calidad de los datos, el cumplimiento y las decisiones operativas. Parecida a la cola de aprobaciones, pero centrada en datos y no en contenido.

### Dónde aparece

Cola de revisión de deduplicación (CRM-006), Comparación de deduplicación (CRM-007), Revisión de marcas de cumplimiento (FUND-012), Cola de problemas de observadores electorales (GOTV-016), Reporte de problemas del observador electoral (GOTV-015).

### Comportamientos

- **Comparación lado a lado** — en la deduplicación, se muestran dos registros uno junto al otro con las diferencias resaltadas. Controles de fusión campo por campo (quedarse con el izquierdo, con el derecho o con ambos).
- **Categorización** — los elementos se clasifican por tipo y severidad. Se filtran por categoría.
- **Escalamiento** — un elemento puede escalarse a una autoridad superior (los problemas de los observadores electorales al equipo legal, las marcas de cumplimiento al Administrador de la organización).
- **Resolución** — cada elemento exige una acción de resolución (fusionar, descartar, marcar, escalar). La resolución queda anotada en el registro de auditoría.

---

## 12. Herramienta de registro de entrada

Interfaces rápidas y con prioridad móvil para confirmar la asistencia a eventos y operaciones.

### Dónde aparece

Registro de entrada al evento (EVT-005), Registro de entrada en el punto de concentración (GOTV-023), Registro de entrada del observador electoral (GOTV-014).

### Anatomía

```
┌────────────────────────────────────────┐
│  Registro al evento    12 de 45 ✓      │
├────────────────────────────────────────┤
│  [Buscar nombre...]                    │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Ana Martínez               [✓]  │  │
│  │  Carlos Reyes               [ ]  │  │
│  │  Diana Flores               [✓]  │  │
│  │  Eduardo Vega               [ ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [Escanear código QR]                  │
└────────────────────────────────────────┘
```

### Comportamientos

- **Búsqueda rápida** — búsqueda predictiva para encontrar a una persona concreta. Salto por primera letra.
- **Escaneo de QR** — lectura de códigos QR con la cámara para registrar la entrada rápido (si el voluntario trae el código QR de su invitación).
- **Tocar para registrar la entrada** — áreas táctiles grandes. La marca de verificación aparece de inmediato, con una confirmación háptica y visual breve.
- **Deshacer** — un registro de entrada por error se puede deshacer dentro de los 10 segundos siguientes.
- **Contador** — cuenta corriente de quienes ya registraron la entrada frente a los esperados ("12 de 45 registrados").
- **Sin conexión** — funciona por completo sin conexión. Los datos se guardan en el dispositivo y se sincronizan al reconectar. Indicador claro del estado de sincronización.

---

## 13. Vista de flujo / kanban

Vista por etapas para los elementos que avanzan a lo largo de un proceso.

### Dónde aparece

Flujo de respaldos (PRESS-012): identificado → contactado → considerando → comprometido → público.

### Comportamientos

- **Columnas** — una por etapa. Las tarjetas de cada columna representan los elementos.
- **Arrastrar para avanzar** — se arrastra una tarjeta de una columna a la siguiente para cambiarla de etapa.
- **Contenido de la tarjeta** — la información clave se ve en la tarjeta (nombre, fecha de entrada a la etapa, urgencia).
- **Clic para el detalle** — al hacer clic en una tarjeta se abre la vista de detalle completa.
- **Recuentos** — el encabezado de cada columna muestra cuántos elementos hay en esa etapa.
- **Solo en escritorio** — los tableros kanban necesitan espacio horizontal. En móvil se muestran como una lista filtrable, con la etapa en un desplegable.

---

## 14. Flujo de importación/exportación

Movimiento de datos hacia dentro y hacia fuera de la plataforma.

### Dónde aparece

Asistente de importación de datos (CRM-008 a CRM-011), Historial de importaciones (CRM-012), Exportación de datos (CRM-013), Carga de voto adelantado (GOTV-002).

### Flujo de importación

1. **Carga** — arrastrar y soltar, o selector de archivos. Valida el formato (CSV, Excel). Muestra una vista previa del archivo.
2. **Mapeo de columnas** — detecta los encabezados de columna y deja confirmar o ajustar el mapeo. Muestra datos de muestra de cada campo mapeado.
3. **Vista previa** — muestra qué se creará, qué se actualizará y qué se omitirá. Destaca los posibles duplicados.
4. **Confirmación** — resumen de las acciones. Botón de "Importar X registros".
5. **Progreso** — barra de progreso durante la importación. No bloquea la navegación: la importación corre en segundo plano y notifica al terminar.
6. **Informe** — resumen posterior a la importación: X creados, Y actualizados, Z omitidos, W errores. Enlace para revisar los errores.

### Flujo de exportación

1. **Seleccionar los datos** — elige el tipo de registro y aplica filtros (segmento, rango de fechas, etiquetas).
2. **Elegir los campos** — selecciona qué campos van en la exportación.
3. **Elegir el formato** — CSV, Excel, JSON.
4. **Exportar** — corre en segundo plano. Notificación con enlace de descarga cuando esté listo.

---

## 15. Panel de configuración

Interfaces de ajustes para configurar la plataforma, las funcionalidades y las integraciones.

### Dónde aparece

Perfil de la organización (SET-001), Plantillas de rol (SET-002), Configuración de cumplimiento (SET-008), Ajustes de integraciones (SET-012 a SET-016), Facturación (SET-017), Seguridad (SET-019), Cifrado (SET-020).

### Anatomía

```
┌────────────────────────────────────────────────────────────┐
│  Ajustes > Cumplimiento                                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ▾ Límites de contribución                                 │
│    Límite individual    [$2,900    ]                       │
│    Límite de PAC        [$5,000    ]                       │
│    ⓘ Basado en los requisitos de tu jurisdicción           │
│                                                            │
│  ▸ Período de campaña                                      │
│  ▸ Avisos legales                                          │
│  ▸ Conservación de datos                                   │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Última modificación: 15 ene. 2026 por admin@campaign.org  │
│  [Cancelar]                                     [Guardar]  │
└────────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Secciones plegables** — agrupan los ajustes relacionados. Solo una o dos secciones desplegadas a la vez.
- **Valores predeterminados inteligentes** — vienen rellenados según la jurisdicción y el contexto. Se rotulan con claridad como predeterminados.
- **Texto de ayuda** — explicaciones contextuales para cada ajuste. Los ajustes de cumplimiento incluyen enlaces de "¿Por qué se requiere esto?".
- **Seguimiento de cambios** — muestra quién hizo la última modificación y cuándo. Registro de auditoría de todos los cambios.
- **Botón de prueba** — en las integraciones, un botón de "Probar conexión" verifica que la configuración funciona.
- **Solo en escritorio** — las interfaces de configuración necesitan disposiciones a todo el ancho para los formularios complejos.

---

## 16. Comparación lado a lado

Interfaz de dos paneles para comparar registros, versiones o variantes.

### Dónde aparece

Comparación de deduplicación (CRM-007), Resultados de la prueba A/B (FUND-014), comparación de versiones de puntos de mensaje.

### Comportamientos

- **Disposición de dos columnas** — el registro A a la izquierda, el registro B a la derecha. Alineados campo por campo.
- **Resaltado de diferencias** — los campos que difieren quedan resaltados (con código de color). Los idénticos se atenúan.
- **Controles de fusión** — en la deduplicación, cada campo distinto tiene los controles "Quedarme con la izquierda" / "Quedarme con la derecha" / "Ambas".
- **Vista previa** — antes de confirmar una fusión, muestra el registro resultante.
- **Solo en escritorio** — necesita espacio horizontal. En tableta, conviene una comparación apilada en vertical. No está disponible en celular.

---

## 17. Vista dividida / panel de detalle

Disposición de dos paneles con una lista o vista padre a un lado y una vista de detalle al otro. Definida en navigation-model.md como patrón central de interacción en escritorio.

### Dónde aparece

Lista de contactos + detalle, bandeja de mensajes + conversación, lista de donaciones + detalle, lista de eventos + detalle, cola de problemas + detalle.

### Comportamientos

- **Solo en escritorio** — en móvil, la lista y el detalle son vistas separadas a pantalla completa.
- **Redimensionable** — se arrastra el separador para ajustar la proporción entre paneles. La preferencia se conserva.
- **Se puede cerrar** — el botón de cerrar del panel de detalle devuelve la lista a todo el ancho.
- **Navegación dentro del panel** — flechas de anterior y siguiente en el encabezado del panel de detalle, para recorrer los elementos de la lista sin cerrarlo.
- **Alternativa de reserva para viewports pequeños** — en viewports de escritorio estrechos, el panel de detalle se abre como superposición en vez de como división lado a lado.

---

## 18. Modo de campo (pantalla completa exclusiva)

La interfaz de trabajo de campo, jornada de llamadas, inscripción de votantes y GOTV (Get Out The Vote — movilización del voto) del voluntariado. Un paradigma de navegación completamente distinto al del resto de la aplicación. Se define en detalle en navigation-model.md.

### Dónde aparece

Trabajo de campo (CANV-007 a CANV-012), Jornada de llamadas (PHONE-004 a PHONE-006), Inscripción de votantes (VREG-004, VREG-005), GOTV (GOTV-008 a GOTV-010).

### Características clave

- **Pantalla completa** — sin barra lateral, sin pestañas inferiores, sin navegación estándar. Solo el encabezado de campo y los controles de la tarea.
- **Progresión lineal** — se avanza de un elemento a otro, uno por uno (la puerta siguiente, la llamada siguiente, el votante siguiente).
- **Áreas táctiles grandes** — pensadas para usarse con una sola mano, de pie, caminando o con mala luz.
- **Con prioridad sin conexión** — diseñado para funcionar sin conexión primero (offline-first): todos los datos vienen precargados. Funciona sin conectividad. Se sincroniza cuando hay conexión.
- **Decisiones mínimas** — la interfaz guía al voluntario por cada interacción con opciones claras y simples.
- **Recuperación tras un fallo** — la posición dentro de la lista de recorrido o de llamadas se guarda en el dispositivo después de cada interacción. La app se reinicia exactamente en el mismo punto.

Ver también: `offline-sync-patterns.md` para el comportamiento de sincronización durante el modo de campo.

---

## 19. Panel en tiempo real (centro de mando)

Panel operativo que se actualiza en vivo, para el día de elecciones y las operaciones de campo activas.

### Dónde aparece

Panel del centro de mando (DASH-008), Panel de participación (GOTV-017, GOTV-018), Canal del centro de mando (MSG-007).

### Diferencias clave con los paneles estándar

- **Actualización automática** — los datos se actualizan cada 30 segundos (o por WebSocket donde esté disponible). No hace falta actualizar a mano.
- **Priorización de alertas** — los elementos urgentes (zonas de baja participación, problemas escalados, faltantes de recursos) se muestran de forma destacada.
- **Botones de acción** — los widgets del panel llevan botones de acción en línea (aprobar una reasignación de recursos, enviar una oleada de mensajes, escalar un problema). El centro de mando es un centro de acción, no solo una pantalla informativa.
- **Integración de comunicaciones** — el canal del centro de mando (MSG-007) está integrado en la vista del panel y muestra las actualizaciones estructuradas en tiempo real junto a los datos.

---

## 20. Hilo contextual

Hilos de discusión adjuntos a objetos concretos de la plataforma (eventos, turnos, problemas, donaciones) para revisar y coordinar en equipo.

### Dónde aparece

Hilo del evento (MSG-008), Hilo del turno (MSG-009), Hilo del problema (MSG-010), Hilo de la donación marcada (MSG-011).

### Comportamientos

- **Adjunto al objeto padre** — al hilo se llega desde la vista de detalle del objeto padre (por ejemplo, una pestaña "Discusión" en la página de detalle del evento), no desde la bandeja de mensajes.
- **Misma interfaz de conversación** — usa los mismos componentes de redacción y presentación de mensajes que los mensajes directos y los grupos.
- **Participantes** — incluye automáticamente a las personas asociadas al objeto padre (quienes organizan el evento, el voluntariado del turno, quienes revisan el cumplimiento).
- **Notificaciones** — los mensajes nuevos en los hilos contextuales avisan a los participantes por el sistema de notificaciones estándar.
- **Sin conexión** — los hilos en caché se pueden leer sin conexión. Los mensajes nuevos quedan en cola para sincronizarse.

---

## Aspectos transversales

### Estados vacíos

Todos los patrones tienen un estado vacío: lo que se ve cuando todavía no hay datos. Los estados vacíos son específicos de cada arquetipo:
- Reconocen que no hay datos sin que la persona se sienta perdida
- Sugieren una acción siguiente clara ("Crea tu primer evento", "Importa tu padrón electoral")
- Enlazan directamente a la acción que sugieren
- Nunca son un simple "No se encontraron datos": eso es un mensaje del sistema, no una experiencia de uso

### Estados de carga

- **Listas** — filas de esqueleto de carga (bloques grises que imitan la disposición de las filas reales)
- **Paneles** — widgets de esqueleto de carga
- **Vistas de detalle** — esqueleto con la estructura de la disposición visible
- **Nunca un indicador de carga a pantalla completa** — la persona siempre debe ver dónde está, incluso mientras cargan los datos

### Estados de error

- **Errores en línea** — los errores de validación del formulario aparecen debajo del campo correspondiente
- **Avisos emergentes** — los errores pasajeros (tiempo de espera de red agotado, fallo al guardar) aparecen como avisos emergentes con una acción de reintentar
- **Error a pantalla completa** — solo para errores irrecuperables (404, servidor caído). Muestra un mensaje claro y un enlace de "Ir al inicio"
- **Errores propios de estar sin conexión** — "Esta funcionalidad requiere conexión", con una explicación y una sugerencia de qué sí se puede hacer sin conexión

### Accesibilidad

Todos los patrones deben cumplir WCAG 2.1 AA:
- Navegables con teclado (orden de tabulación, indicadores de foco, atajos de teclado)
- Compatibles con lectores de pantalla (rótulos ARIA, roles, regiones activas para el contenido dinámico)
- Relaciones de contraste de color (4.5:1 para texto, 3:1 para texto grande y componentes de la interfaz)
- Áreas táctiles de 44x44px como mínimo en móvil
- Ninguna información se transmite solo con color (siempre acompañada de texto, icono o patrón)

## Preguntas abiertas

1. **Arrastrar y soltar en móvil.** Varios patrones usan arrastrar y soltar en escritorio (constructores, kanban, calendario). ¿Cuál es el equivalente en móvil? ¿Pulsación larga para reordenar? ¿O sustituirlo por botones explícitos de mover?

2. **Atajos de teclado.** ¿Debe la plataforma tener una capa de atajos de teclado para quienes la usan a fondo (por ejemplo, `G` y luego `D` para el panel, `G` y luego `M` para los mensajes)? Prioridad baja, pero de mucho valor para el personal que pasa el día entero en la plataforma.

3. **Modo oscuro.** Algunos patrones (sobre todo los mapas y los paneles) ganarían con un modo oscuro para la noche electoral y el centro de mando. ¿El modo oscuro debe elegirlo la persona usuaria, activarse solo según la hora o existir solo en ciertas funcionalidades (únicamente el centro de mando)?

<!-- REVISIT: El desglose exacto de componentes (qué patrones se convierten en qué componentes) queda aplazado al component-inventory.md de la fase 3. Este catálogo define los patrones; el inventario de componentes define las unidades de implementación. -->
