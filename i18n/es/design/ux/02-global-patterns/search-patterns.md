# Patrones de búsqueda

## Propósito

Este documento define cómo funciona la búsqueda en toda la plataforma: la búsqueda global, la búsqueda contextual dentro de cada área funcional, el filtrado y las búsquedas guardadas. La búsqueda es la forma en que las personas usuarias encuentran cosas en una plataforma con 236 pantallas y potencialmente millones de registros.

## Búsqueda global

### Acceso

- **Escritorio:** barra de búsqueda siempre visible en la barra superior. Atajo de teclado: `/` o `Cmd+K` para enfocarla.
- **Móvil:** icono de búsqueda en la barra superior. Al tocarlo se abre una interfaz de búsqueda a pantalla completa, con el campo enfocado automáticamente.

### Alcance de la búsqueda

La búsqueda global consulta todos los tipos de registro a los que la persona usuaria tiene acceso:

| Tipo de registro | Campos consultables | Disponible para |
|-------------|-------------------|-------------|
| Contactos | Nombre, correo, teléfono, dirección, etiquetas | OA, CD, FD, FiD, VC, DM |
| Donaciones | Nombre del donante, monto, ID de transacción | OA, FD |
| Eventos | Nombre del evento, lugar, descripción | OA, VC, V, TL, S |
| Campañas de correo | Línea de asunto, nombre de la campaña | OA, CD |
| Voluntarios | Nombre, correo, teléfono, equipo, destrezas | OA, VC, FiD |
| Contactos de medios | Nombre, medio, fuente | OA, CD |
| Comunicados de prensa | Título, contenido | OA, CD |
| Mensajes | Contenido del mensaje, nombres de participantes | Toda persona autenticada |
| Respaldos | Nombre de quien respalda, organización | OA, CD |
| Base de conocimiento | Título del artículo, contenido | Toda persona autenticada |

**Filtrado por rol:** los resultados solo incluyen los registros a los que la persona usuaria tiene acceso. Un voluntario que busca "María" ve solo los contactos con los que ha interactuado, no el CRM completo. Un Director de finanzas ve los registros de donaciones, pero no el detalle de las campañas de trabajo de campo.

### Resultados de búsqueda

Los resultados se agrupan por tipo de registro y se ordenan por relevancia:

```
┌───────────────────────────────────────────────────────────┐
│  Búsqueda: "martinez"                               [✗]   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  CONTACTOS (3)                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │  Ana Martínez · (787) 555-0123 · San Juan          │   │
│  │  Carlos Martínez · Voluntario · Equipo A           │   │
│  │  Sofía Martínez-Rivera · Donante · Recurrente      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  DONACIONES (1)                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │  $250 de Ana Martínez · 15 de ene. de 2026         │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  MENSAJES (2)                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │  Conversación con Ana Martínez · hace 3 días       │   │
│  │  Grupo "Equipo A" · menciona a Martínez · 1 semana │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  [Mostrar todos los resultados →]                         │
└───────────────────────────────────────────────────────────┘
```

### Comportamientos

- **Búsqueda predictiva** — los resultados aparecen mientras se escribe (con un retardo de 300 ms). Mínimo 2 caracteres.
- **Búsquedas recientes** — cuando la barra de búsqueda está enfocada pero vacía, muestra las 5 búsquedas más recientes.
- **Sin resultados** — "No hay resultados para 'xyz'. Prueba con otro término o revisa la ortografía". Nunca una pantalla en blanco.
- **Clic en un resultado** — lleva directamente a la vista de detalle del registro. La búsqueda se cierra.
- **"Mostrar todos los resultados"** — abre una página completa de resultados con filtrado avanzado.
- **Navegación con el teclado** — flechas para recorrer los resultados, Enter para seleccionar, Esc para cerrar.
- **La búsqueda ocurre en el servidor** — necesita conexión. Sin conexión, la barra de búsqueda muestra: "Requiere conexión. Puedes navegar por los registros en caché".

### Búsqueda sin conexión

Sin conexión, la búsqueda global no está disponible (ocurre en el servidor). Aun así:
- **Búsqueda local** en el modo de campo: los voluntarios pueden buscar en su lista de recorrido por nombre o dirección. Usa los datos de la lista de recorrido guardados en la caché local.
- **Búsqueda en los mensajes en caché:** se puede buscar entre los mensajes ya sincronizados.
- **La barra de búsqueda no se oculta** sin conexión. Las funcionalidades que necesitan conexión aparecen atenuadas, con un distintivo de sin conexión, y la búsqueda no es la excepción: sigue el mismo patrón de degradación sin conexión.

---

## Búsqueda contextual

Dentro de cada área funcional, la búsqueda va acotada a ese contexto y trae filtros propios del dominio.

### Búsqueda en la lista de contactos

```
┌────────────────────────────────────────────────────────┐
│  [Buscar contactos...]                                 │
│                                                        │
│  Filtros:                                              │
│  [Etiqueta ▾]  [Segmento ▾]  [Estado ▾]  [Ubicación ▾] │
│  [Puntaje de apoyo ▾]  [Último contacto ▾]  [+ Más]    │
└────────────────────────────────────────────────────────┘
```

### Búsqueda en la lista de donaciones

```
┌─────────────────────────────────────────────────────────┐
│  [Buscar por nombre del donante o ID de transacción...] │
│                                                         │
│  Filtros:                                               │
│  [Monto ▾]  [Rango de fechas ▾]  [Tipo ▾]  [Estado ▾]   │
│  [Campaña ▾]  [Método de pago ▾]  [+ Más]               │
└─────────────────────────────────────────────────────────┘
```

### Búsqueda de eventos

```
┌───────────────────────────────────────────────────────────┐
│  [Buscar eventos...]                                      │
│                                                           │
│  Filtros:                                                 │
│  [Rango de fechas ▾]  [Tipo ▾]  [Estado ▾]  [Ubicación ▾] │
└───────────────────────────────────────────────────────────┘
```

### Búsqueda de mensajes

```
┌──────────────────────────────────────────────────────┐
│  [Buscar mensajes...]                                │
│                                                      │
│  Filtros:                                            │
│  [De ▾]  [Rango de fechas ▾]  [En la conversación ▾] │
│  [Tiene adjuntos ☐]                                  │
└──────────────────────────────────────────────────────┘
```

**Nota:** la búsqueda de mensajes en conversaciones cifradas de extremo a extremo es limitada. Solo se pueden buscar los mensajes que ya se descifraron en el cliente. Buscar mensajes cifrados en el servidor es imposible por diseño.

### Comportamientos comunes de la búsqueda contextual

- **Chips de filtro** — los filtros activos se muestran como chips descartables encima de los resultados. "Limpiar todo" para restablecer.
- **Persistencia de los filtros** — los filtros se mantienen dentro de una sesión (salir y volver los conserva). No se conservan entre sesiones.
- **Filtros guardados** — se puede guardar una combinación de filtros para reutilizarla (por ejemplo, "Donantes de alto valor en San Juan" = Monto > $500 + Ubicación = San Juan).
- **Resultados vacíos** — mensaje contextual con sugerencias. "Ningún contacto coincide con estos filtros. Prueba a quitar el filtro 'Etiqueta: Voluntario'".

---

## Patrones de filtrado

### Tipos de filtro

| Tipo | Elemento de interfaz | Ejemplo |
|------|-----------|---------|
| **Texto** | Campo de búsqueda | Nombre, correo, dirección |
| **Selección** | Menú desplegable | Estado (Activo/Inactivo/Todos), Tipo |
| **Selección múltiple** | Desplegable con casillas | Etiquetas, segmentos, equipos |
| **Rango** | Dos campos o control deslizante | Monto ($50-$500), rango de fechas |
| **Fecha** | Selector de fecha | Creado después de, Último contacto antes de |
| **Booleano** | Interruptor o casilla | Tiene correo, Es recurrente, Ha donado |
| **Geoespacial** | Selección en el mapa o campo de ubicación | Dentro del territorio, Dentro de un radio |

### Patrones de interfaz de los filtros

**Escritorio:** los filtros se muestran como una barra horizontal encima de la lista. Los filtros complejos se despliegan en un panel. Los filtros activos se muestran como chips.

```
┌─────────────────────────────────────────────────────────┐
│  [Buscar...]  [Etiqueta: Voluntario ✗]  [Monto: $50+ ✗] │
│  [Limpiar todos los filtros]           [Guardar filtro] │
└─────────────────────────────────────────────────────────┘
```

**Móvil:** se accede a los filtros con un botón "Filtro" que abre un panel de filtros a pantalla completa. El botón muestra el número de filtros activos ("Filtro (2)").

```
┌─────────────────────────────────────┐
│  [Buscar...]           [Filtro (2)] │
└─────────────────────────────────────┘

Panel de filtros (a pantalla completa en móvil):
┌──────────────────────────────────────────┐
│  ← Filtros                  [Restablecer]│
├──────────────────────────────────────────┤
│  Etiqueta                                │
│  [✓ Voluntario] [☐ Donante] [☐ Personal] │
│                                          │
│  Monto                                   │
│  [Mín: $50    ] — [Máx:          ]       │
│                                          │
│  Rango de fechas                         │
│  [1 de ene. de 2026] — [Hoy            ] │
│                                          │
├──────────────────────────────────────────┤
│  [Aplicar filtros]                       │
└──────────────────────────────────────────┘
```

---

## Búsquedas y filtros guardados

### Guardar

Se puede guardar una consulta de búsqueda junto con su combinación de filtros para reutilizarla:

```
┌─────────────────────────────────────────────┐
│  Guardar este filtro                        │
│                                             │
│  Nombre: [Donantes de alto valor, San Juan] │
│                                             │
│  Filtros:                                   │
│  • Monto > $500                             │
│  • Ubicación = San Juan                     │
│  • Estado = Activo                          │
│                                             │
│  [Cancelar]                      [Guardar]  │
└─────────────────────────────────────────────┘
```

### Acceso a los filtros guardados

Los filtros guardados aparecen en un desplegable en la parte superior de la lista correspondiente:

```
┌───────────────────────────────────────────────────────────────┐
│  Filtros guardados: [Donantes de alto valor ▾]  [Buscar...]   │
└───────────────────────────────────────────────────────────────┘
```

Los filtros guardados son personales (no se comparten entre personas usuarias) salvo que el Administrador de la organización los comparta explícitamente.

---

## Rendimiento de la búsqueda

### Objetivos de tiempo de respuesta

| Tipo de búsqueda | Objetivo | Notas |
|-------------|--------|-------|
| Búsqueda predictiva (global) | <500 ms | Con retardo, en el servidor |
| Filtro de lista contextual | <300 ms | Puede ser en el cliente para listas pequeñas |
| Página completa de resultados | <1 s | En el servidor, con paginación |
| Búsqueda sin conexión en la lista de recorrido | <100 ms | Consulta SQLite local |

### Conjuntos de resultados grandes

- **Paginación** — los resultados se paginan (25 por página). "Cargar más" para el desplazamiento infinito en móvil.
- **Número de resultados** — siempre se muestra el total de coincidencias ("Mostrando 1-25 de 1,247 resultados").
- **Sin recorridos completos de tabla** — las consultas de búsqueda usan índices. La búsqueda se implementa con el índice de búsqueda (system.md), no con consultas directas a la base de datos.

---

## Restricciones del cifrado

Para las organizaciones con cifrado BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado):
- **Búsqueda por índice ciego** — los contactos se pueden encontrar por identificador (correo, teléfono) mediante índices ciegos, pero la consulta y los resultados viajan cifrados. El índice de búsqueda contiene hashes ciegos, no texto plano.
- **Límites de la búsqueda de texto completo** — la búsqueda de texto completo en notas, historial de interacciones y campos libres solo es posible en el cliente (después de descifrar). El servidor no admite la búsqueda de texto completo sobre contenido cifrado.
- **Implicación para la interfaz** — la búsqueda global puede devolver menos resultados en las organizaciones con BYOK. La barra de búsqueda no debe prometer de más. Texto de ayuda: "Busca en nombres, correos e identificadores. El contenido de las notas se puede buscar dentro de cada registro".

---

## Preguntas abiertas

1. **Analítica de búsqueda.** ¿La plataforma debería registrar lo que buscan las personas usuarias (para mejorar la relevancia de los resultados y detectar necesidades no cubiertas)? Es útil para el desarrollo del producto, pero tiene implicaciones de privacidad: las consultas pueden revelar intereses políticos.

2. **Cruce aproximado.** ¿La búsqueda debería admitir el cruce aproximado (encontrar "Martínez" cuando se escribe "Martines")? Importa en contextos multilingües, donde la escritura de los nombres varía. La complejidad de implementación es moderada.

3. **Búsqueda entre organizaciones en el contexto de una alianza.** Cuando un Administrador de la organización tiene acceso a la alianza, ¿la búsqueda global debería incluir los registros compartidos por los miembros de la alianza? Y si es así, ¿cómo se distinguen visualmente los resultados (registros propios frente a registros de la alianza)?

<!-- REVISIT: Hay que decidir durante la implementación la tecnología del índice de búsqueda (ElasticSearch, Meilisearch o el texto completo de PostgreSQL). Los patrones de interfaz son los mismos sea cual sea el backend, pero las características de rendimiento cambian. -->
