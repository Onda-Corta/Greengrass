# Decisiones de UX — fase de wireframes

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `design/ux/04-wireframes/audit.md`, los 21 documentos de wireframes

## Propósito

Este documento recoge las decisiones de UX tomadas durante la fase de wireframes (fase 4) y la auditoría posterior. Establecen convenciones para la estructura de los wireframes, el uso de los tokens de diseño, la especificación del comportamiento sin conexión y la terminología. Complementan las decisiones de arquitectura de `decisions/011-design-system-ux.md`.

---

## Decisión 1: estructura de los documentos de wireframes

### Plantilla estándar de 8 secciones

Todos los documentos de wireframes tienen que seguir esta estructura:

1. **Propósito** — qué hace el área de funcionalidad y a quién sirve
2. **Alcance** — tabla que asocia cada ID de pantalla con su nombre, sus perfiles, su estado sin conexión, su contexto móvil y la sección del documento
3. **Contexto de navegación** — cómo aparece la funcionalidad en la barra lateral o en las pestañas para su perfil principal
4. **Wireframes de pantalla** — una sección `## ID: Screen Name` por pantalla, cada una con los wireframes de escritorio y de móvil, las especificaciones de interacción y las notas de diseño
5. **Resumen de estados vacíos** — los estados vacíos o sin datos de todas las pantallas, consolidados
6. **Notas de accesibilidad** — consideraciones de accesibilidad propias de la funcionalidad
7. **Decisiones de diseño** — tabla de las decisiones clave con la opción elegida y su fundamento
8. **Preguntas abiertas** — preguntas sin resolver para fases futuras

### Excepciones

- **El marco de navegación** usa «Variantes del marco» en lugar de «Alcance» (no tiene ID de pantalla: es el marco que rodea a todas las pantallas)
- **El modo de campo** conserva su organización por flujo (Shift Start → Walk List → Door Card → …) con los ID de pantalla añadidos como anotaciones en comentarios HTML en lugar de como encabezados de sección
- **La mensajería** se organiza por patrón de interfaz (vista dividida, redacción, briefings) con los ID de pantalla como anotaciones en comentarios HTML
- Los documentos donde el «Contexto de navegación» no aplica (navigation-shell, field-mode, alliance) pueden omitir o adaptar esa sección

### Fundamento

Los 12 documentos del lote posterior convergieron de forma natural en esta estructura. Normalizar los 9 del lote inicial para que coincidan permite leer cualquier documento con las mismas expectativas. La estructura además se corresponde directamente con las necesidades de implementación: las tablas de alcance guían la planificación de rutas, el contexto de navegación guía la configuración de la barra lateral y las decisiones de diseño guían las especificaciones de los componentes.

---

## Decisión 2: enfoque de integración de los tokens de diseño

### Anotar solo donde sea estructural, no en todas partes

Los documentos de wireframes deben referenciar nombres de tokens de diseño solo donde el valor concreto sea crítico para que el diseño sea correcto:

1. **Áreas táctiles en el modo de campo** — `--touch-target-min: 48px` y `--touch-target-field: 56px` son valores críticos para la seguridad. Se referencian por nombre.
2. **Espaciado que se aparta de los valores por defecto** — cuando un wireframe usa a propósito un espaciado no estándar, se referencia el token para dejar clara la intención.
3. **Semántica del color** — donde el significado (éxito, error, advertencia) importa más que la apariencia, se referencian `--color-success`, `--color-error` y `--color-warning`.

**No** hay que anotar los 21 documentos de wireframes con nombres de token para cada valor en píxeles y cada referencia de color. Eso añadiría ruido sin hacer los wireframes más claros.

### Fundamento

Los wireframes son descripciones de pantalla listas para implementar: los leen diseñadores y desarrolladores. Los valores en crudo (`16px`, `24px`) se entienden más rápido en un wireframe que los nombres de token (`--space-4`, `--space-6`). La anotación exhaustiva de tokens corresponde a la fase de diseño visual (los mockups de alta fidelidad) y a la de implementación de componentes. Los wireframes ya siguen implícitamente la escala de espaciado y la semántica de color del sistema de diseño.

---

## Decisión 3: especificación del comportamiento sin conexión

### Cada pantalla tiene que declarar su estado sin conexión

La tabla de alcance de cada documento de wireframes tiene que incluir una columna `Offline` que declare uno de estos tres valores:

- **Yes** — funciona por completo sin conexión
- **Partial** — parte de la funcionalidad está disponible sin conexión (el comportamiento concreto se describe en el wireframe)
- **No** — requiere conectividad; muestra datos en caché o un indicador de estar sin conexión

### Incluso «No» es una decisión

La mayoría de las pantallas de administración son genuinamente solo en línea: muestran datos agregados en el servidor (paneles), ejecutan operaciones del lado del servidor (importaciones, exportaciones) o configuran estado compartido (ajustes). Declarar `Offline: No` no es un hueco: es una especificación correcta y deliberada. Quien implementa no tendría que adivinar.

### Las pantallas que funcionan sin conexión necesitan detalle explícito

Toda pantalla marcada como `Yes` o `Partial` tiene que describir:
- qué datos se guardan en caché de antemano
- qué acciones están disponibles sin conexión
- cómo se sincronizan los cambios hechos sin conexión cuando vuelve la conectividad
- cómo se ve la interfaz durante la sincronización

El modo de campo (`field-mode.md`) es el ejemplo de referencia para especificar el comportamiento sin conexión. Los patrones de sincronización sin conexión de `02-global-patterns/offline-sync-patterns.md` definen el marco de trabajo.

### Fundamento

La auditoría de wireframes encontró que los documentos del lote inicial no declaraban su estado sin conexión, lo que dejaba ambigüedad para quien implementa. Como el diseño para funcionar sin conexión primero (offline-first) es un principio central de la plataforma, cada pantalla necesita una declaración explícita, aunque la respuesta sea «esta pantalla no funciona sin conexión».

---

## Decisión 4: convenciones de terminología

### Términos canónicos

| Término | Definición | Contexto de uso |
|------|-----------|-------------|
| **Contacto** | Cualquier persona en la base de datos del CRM | CRM, importación de datos, segmentos, cualquier contexto que se refiera al registro de datos |
| **Simpatizante** | Una persona que ha hecho algo público (donar, firmar una petición, confirmar asistencia, ser voluntaria) | Portal de simpatizantes, páginas públicas, activismo, cualquier contexto de cara al usuario |
| **Donante** | Un simpatizante que ha hecho una contribución económica | Informes de recaudación, cumplimiento, recibos, declaraciones fiscales |
| **Personal** | Una persona autenticada con una plantilla de rol de la organización | Ajustes, permisos, incorporación, registro de auditoría |
| **Voluntario** | Un miembro del personal con la plantilla de rol Voluntario | Modo de campo, manejo de turnos, capacitación |

### Jerarquía

«Donante» ⊂ «Simpatizante» ⊂ «Contacto»

Usa el término más específico que aplique. Quien donó es «donante» en el contexto de recaudación, «simpatizante» en el portal y «contacto» en el CRM.

### Aplicación

- Corrige la terminología solo en las secciones que se estén modificando durante la normalización estructural, o al añadir wireframes nuevos
- Nada de buscar y reemplazar globalmente en los 21 documentos
- Estos términos canónicos quedan anotados aquí como referencia; se hacen cumplir durante el diseño visual y la implementación

### Fundamento

La auditoría encontró que en algunos documentos de wireframes se usaban «simpatizante», «donante» y «contacto» de forma intercambiable. Aunque el contexto casi siempre desambigua, los términos tienen significados distintos en el modelo de datos (un contacto puede tener cero interacciones; un simpatizante tiene al menos una; un donante tiene al menos una interacción económica). Fijar ahora las definiciones canónicas evita confusiones durante la implementación.

---

## Decisión 5: asignación de los ID de pantalla

### Cada pantalla con wireframe tiene que tener un ID de pantalla de `screen-inventory.md`

Los ID de pantalla siguen el formato `AREA-NNN` (por ejemplo, `CANV-007`, `FUND-001`, `AUTH-003`). Son:
- la referencia cruzada principal entre los wireframes, el inventario de pantallas, la estructura de URL y la implementación
- estables entre ediciones del documento: una vez asignado, un ID de pantalla no cambia
- los encabezados de sección `## ID: Screen Name` de los documentos de wireframes

### Excepciones

- **Las variantes del marco de navegación** (escritorio desplegado, plegado, móvil, modo de campo, etc.) son marcos estructurales, no pantallas individuales. No reciben ID de pantalla.
- **Los documentos organizados por flujo** (field-mode, messaging) pueden usar anotaciones en comentarios HTML (`<!-- CANV-007 -->`) en lugar de encabezados con ID de pantalla, cuando la organización por flujo resulta más natural.

### Fundamento

La auditoría encontró 25 pantallas con contenido de wireframe pero sin encabezados con ID de pantalla. Los ID de pantalla son el pegamento entre documentos: el índice de referencias cruzadas de `README.md` depende de ellos. Poner ID a todas las pantallas con wireframe hace posible una trazabilidad fiable de la especificación a la implementación.
