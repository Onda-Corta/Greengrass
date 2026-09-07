# Fundamentos del sistema de diseño

## Propósito

Este documento define las primitivas visuales y espaciales del sistema de diseño de GreenGrass: espaciado, color, tipografía, cuadrícula, elevación, iconografía y movimiento. De estos fundamentos salen todos los componentes y todas las pantallas de la plataforma.

Todavía no hay marca. Este sistema de diseño está hecho para que se le apliquen temas: cada organización pone su propia identidad visual encima de estos fundamentos estructurales. Los fundamentos definen las *reglas*; el tema define el *aspecto*. En `theming-strategy.md` está cómo funciona la identidad visual por organización.

## Tokens de diseño

Todos los valores fundamentales se expresan como tokens de diseño: valores con nombre, reutilizables, que cada tema puede sobrescribir. Los tokens se implementan como propiedades personalizadas de CSS (variables) y se referencian por nombre, nunca con el valor crudo.

```css
/* Nunca así: */
padding: 16px;
color: #2563eb;

/* Siempre así: */
padding: var(--space-4);
color: var(--color-primary);
```

Esa indirección es lo que permite aplicar temas por organización sin tocar el código de los componentes.

---

## Espaciado

### Escala

Una unidad base de 8px con una escala geométrica. Todo valor espacial del sistema —relleno, margen, separación, tamaño de los componentes— usa esta escala.

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-0` | 0px | Reinicio, estados plegados |
| `--space-px` | 1px | Bordes, separadores |
| `--space-0.5` | 2px | Espaciado en línea ajustado |
| `--space-1` | 4px | Relleno de iconos, espaciado de distintivos |
| `--space-2` | 8px | Relleno interno compacto, separaciones pequeñas |
| `--space-3` | 12px | Separación en línea por defecto, relleno de elementos de lista |
| `--space-4` | 16px | Relleno estándar de componentes, relleno de tarjetas |
| `--space-5` | 20px | Relleno holgado de secciones |
| `--space-6` | 24px | Separación entre secciones, espaciado entre campos de formulario |
| `--space-8` | 32px | Separaciones grandes entre secciones |
| `--space-10` | 40px | Espaciado entre secciones de página |
| `--space-12` | 48px | Separaciones mayores de maquetación |
| `--space-16` | 64px | Márgenes de página (escritorio) |
| `--space-20` | 80px | Espaciado amplio de maquetación |
| `--space-24` | 96px | Referencia de altura máxima de componente |

### Pautas de uso

- **Relleno interno de los componentes:** `--space-3` (compacto) o `--space-4` (estándar)
- **Espacio entre campos de formulario:** `--space-6`
- **Espacio entre secciones:** `--space-8` o `--space-10`
- **Relleno de tarjetas:** `--space-4` (móvil) o `--space-6` (escritorio)
- **Margen de página (móvil):** `--space-4`
- **Margen de página (escritorio):** de `--space-8` a `--space-16`

### Áreas táctiles

Tamaño mínimo del área táctil en móvil: **44x44px** (WCAG 2.1 AA). Es un piso duro: ningún elemento interactivo puede ser más pequeño.

En el modo de campo, las áreas táctiles suben a **48x48px** como mínimo. El modo de campo está pensado para usarse con una mano en condiciones difíciles: las áreas más grandes reducen los errores.

---

## Color

### Arquitectura de color

El sistema de color tiene tres capas:

1. **Paleta primitiva:** valores de color crudos (códigos hex). No se usan directamente en los componentes.
2. **Tokens semánticos:** colores con nombre que describen su *propósito*, no su *matiz*. Son los que referencian los componentes.
3. **Sobrescrituras de tema:** personalizaciones por organización que reasignan los tokens semánticos a otros valores primitivos.

### Tokens de color semánticos

| Token | Propósito | Valor predeterminado | Notas |
|-------|---------|--------------|-------|
| **Superficie** | | | |
| `--color-surface` | Fondo de la página o la aplicación | `#ffffff` | |
| `--color-surface-raised` | Tarjetas, paneles, modales | `#ffffff` | Se diferencia por la sombra de elevación |
| `--color-surface-sunken` | Áreas hundidas, fondos de campos | `#f8fafc` | |
| `--color-surface-overlay` | Fondos de superposición de modales y paneles laterales | `rgba(0,0,0,0.5)` | |
| **Texto** | | | |
| `--color-text` | Texto principal | `#0f172a` | |
| `--color-text-secondary` | Texto secundario o de ayuda | `#475569` | |
| `--color-text-tertiary` | Texto de ejemplo, texto deshabilitado | `#94a3b8` | |
| `--color-text-inverse` | Texto sobre fondos oscuros | `#ffffff` | |
| `--color-text-link` | Enlaces | `--color-primary` | |
| **Principal** | | | |
| `--color-primary` | Acciones principales, estados activos | `#2563eb` | La organización puede aplicarle su marca |
| `--color-primary-hover` | Estado del principal al pasar el cursor | `#1d4ed8` | |
| `--color-primary-active` | Estado del principal al presionarlo | `#1e40af` | |
| `--color-primary-subtle` | Fondos del principal, distintivos | `#eff6ff` | |
| `--color-on-primary` | Texto sobre el principal | `#ffffff` | Se calcula solo para el contraste |
| **Estado** | | | |
| `--color-success` | Estados de éxito, confirmaciones | `#16a34a` | |
| `--color-success-subtle` | Fondos de éxito | `#f0fdf4` | |
| `--color-warning` | Advertencias, requiere atención | `#d97706` | |
| `--color-warning-subtle` | Fondos de advertencia | `#fffbeb` | |
| `--color-error` | Errores, acciones destructivas | `#dc2626` | |
| `--color-error-subtle` | Fondos de error | `#fef2f2` | |
| `--color-info` | Informativo | `#2563eb` | |
| `--color-info-subtle` | Fondos informativos | `#eff6ff` | |
| **Interactivo** | | | |
| `--color-border` | Bordes por defecto | `#e2e8f0` | |
| `--color-border-strong` | Bordes enfatizados | `#cbd5e1` | |
| `--color-border-focus` | Anillos de foco | `--color-primary` | |
| `--color-input-border` | Bordes de los campos de formulario | `#cbd5e1` | |
| `--color-disabled` | Fondos deshabilitados | `#f1f5f9` | |
| `--color-disabled-text` | Texto deshabilitado | `#94a3b8` | |
| **Sincronización y conectividad** | | | |
| `--color-sync-connected` | En línea o sincronizado | `#16a34a` | Punto verde |
| `--color-sync-stale` | Conectado pero desactualizado | `#d97706` | Ámbar |
| `--color-sync-offline` | Sin conexión | `#94a3b8` | Gris |
| `--color-sync-error` | Error de sincronización | `#dc2626` | Rojo |
| **Visualización de datos** | | | |
| De `--color-chart-1` a `--color-chart-8` | Series de gráficas | Paleta secuencial | Se distinguen en simulaciones de daltonismo |

### Accesibilidad del color

- **Contraste del texto:** todo el texto cumple el mínimo de WCAG 2.1 AA: 4.5:1 en texto normal, 3:1 en texto grande (18px+ o 14px+ en negrita).
- **Contraste de los componentes de interfaz:** los elementos interactivos (botones, campos, iconos) cumplen 3:1 frente a los colores adyacentes.
- **Nada codificado solo con color:** toda información que transmite el color se transmite además con texto, icono o patrón. Un distintivo rojo dice además "Error". Un punto verde dice además "Conectado" (o lo dice su globo de ayuda).
- **Seguridad para el daltonismo:** la paleta de visualización de datos se prueba contra simulaciones de deuteranopía, protanopía y tritanopía. Los colores de estado (éxito, advertencia, error) se diferencian por matiz y luminancia, no solo por matiz.
- **Modo oscuro:** todos los tokens tienen equivalente en modo oscuro. Ver `theming-strategy.md`.

### Modo de alto contraste

Para quienes necesitan el máximo contraste (ajuste en las preferencias de accesibilidad):
- Todos los bordes pasan a `2px solid` en vez de `1px solid`
- Los colores de texto se reducen a dos valores: texto principal (`#000000`) y texto secundario (`#333333`)
- Los colores de fondo se reducen a `#ffffff` y `#f5f5f5`
- Los anillos de foco pasan a `3px solid` con desplazamiento
- Todos los colores de fondo sutiles se vuelven más marcados

---

## Tipografía

### Pila de fuentes

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji';
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
             'DejaVu Sans Mono', monospace;
```

**Por qué fuentes del sistema:** cero carga de fuentes. Ninguna solicitud de red, nada de FOIT/FOUT, ningún salto de maquetación. El texto se dibuja al instante con la fuente que el dispositivo ya tiene, algo crítico en celulares de gama baja con conexiones lentas, donde descargar una fuente propia añade segundos al first contentful paint. Las fuentes del sistema también tienen el mejor soporte nativo de escrituras: San Francisco en Apple, Segoe UI en Windows, Roboto en Android y Noto Sans como alternativa de reserva amplia de Unicode, que cubre de forma nativa el latino, el tailandés, el hindi, el árabe y los diacríticos del portugués.

**Sin fuentes propias, sin dependencia de Google Fonts.** Es una restricción deliberada. Todo dispositivo de nuestros mercados objetivo trae una sans-serif de sistema de buena calidad, optimizada para su propia pantalla. Cargar una fuente web para reemplazarla cambia rendimiento por control de marca, y todavía no hay marca. Si más adelante se adopta una tipografía de marca, se puede poner al frente de la pila sin tocar el código de ningún componente.

**Cobertura de escrituras:** las pilas de fuentes del sistema manejan de forma nativa el renderizado multiescritura. `system-ui` en Android resuelve a Roboto para el latino y a Noto Sans Thai/Devanagari/Arabic para esas escrituras. En iOS, San Francisco delega en la fuente adecuada de la plataforma según la escritura. No hace falta ninguna sobrescritura de fuente por idioma: lo resuelve el sistema operativo.

### Escala tipográfica

Una escala modular con razón 1.25 (tercera mayor), anclada en el texto de cuerpo de 16px.

| Token | Tamaño | Interlineado | Peso | Uso |
|-------|------|-------------|--------|-----|
| `--text-xs` | 12px | 16px | 400 | Distintivos, epígrafes, marcas de tiempo |
| `--text-sm` | 14px | 20px | 400 | Texto de ayuda, rótulos secundarios, celdas de tabla |
| `--text-base` | 16px | 24px | 400 | Texto de cuerpo, campos de formulario, elementos de lista |
| `--text-lg` | 18px | 28px | 500 | Cuerpo enfatizado, títulos de tarjeta |
| `--text-xl` | 20px | 28px | 600 | Encabezados de sección, títulos de diálogo |
| `--text-2xl` | 24px | 32px | 600 | Títulos de página, encabezados de los widgets del panel |
| `--text-3xl` | 30px | 36px | 700 | Encabezados mayores |
| `--text-4xl` | 36px | 40px | 700 | Métricas destacadas del panel |
| `--text-5xl` | 48px | 48px | 700 | Total del termómetro de recaudación, resultados de la noche electoral |

### Pesos tipográficos

| Token | Peso | Uso |
|-------|--------|-----|
| `--font-normal` | 400 | Texto de cuerpo, la mayoría del contenido |
| `--font-medium` | 500 | Texto enfatizado, elementos de navegación, rótulos de formulario |
| `--font-semibold` | 600 | Encabezados, texto de los botones, títulos de tarjeta |
| `--font-bold` | 700 | Encabezados mayores, métricas destacadas |

### Reglas de tipografía

- **Largo de línea:** máximo 75 caracteres por línea en el texto de cuerpo (legibilidad). En escritorio, las áreas de contenido limitan el ancho; en móvil, el ancho completo es aceptable con los tamaños de fuente móviles.
- **Espaciado entre párrafos:** `--space-4`.
- **Espaciado de los encabezados:** `--space-8` arriba y `--space-3` debajo (más espacio arriba para separarlos del contenido anterior, menos abajo para unirlos con el que sigue).
- **Nada de texto menor de 12px.** Ni siquiera en los epígrafes y las marcas de tiempo: 12px es el piso. En pantallas móviles de baja resolución, un texto más chico no se lee.
- **Tamaños tipográficos del modo de campo:** el texto de cuerpo en modo de campo es `--text-lg` (18px) como mínimo. Los rótulos de formulario son `--text-base` (16px). Los botones de opción de respuesta usan `--text-lg`. Más grandes que lo estándar porque quien está en campo puede estar leyendo en malas condiciones.

---

## Cuadrícula

### Cuadrícula de maquetación de escritorio

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  Barra lateral (240px / 64px)  │  Contenido (fluido)                               │
│                                │                                                   │
│                                │  ┌──────────────────────────────────────────────┐ │
│                                │  │  Cuadrícula de 12 columnas                   │ │
│                                │  │  Separación entre columnas: --space-6 (24px) │ │
│                                │  │  Ancho máximo: 1280px                        │ │
│                                │  │  Margen: auto (centrado)                     │ │
│                                │  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────┘
```

- **Ancho de la barra lateral:** 240px desplegada, 64px plegada (la preferencia se guarda)
- **Área de contenido:** fluida, llena el espacio restante
- **Cuadrícula de contenido:** 12 columnas dentro del área de contenido
- **Separación entre columnas:** `--space-6` (24px)
- **Ancho máximo del contenido:** 1280px (centrado en el área de contenido cuando el viewport lo supera)
- **Relleno del contenido:** `--space-8` a cada lado

### Cuadrícula de maquetación móvil

```
┌──────────────────────────────────────────────┐
│  Contenido a ancho completo                  │
│                                              │
│  Cuadrícula de 4 columnas                    │
│  Separación entre columnas: --space-4 (16px) │
│  Margen de página: --space-4 (16px)          │
│                                              │
└──────────────────────────────────────────────┘
```

- **Sin barra lateral:** contenido a ancho completo
- **4 columnas** dentro del área de contenido
- **Separación entre columnas:** `--space-4` (16px)
- **Margen de página:** `--space-4` (16px) a cada lado

### Cuadrícula de tableta

- **8 columnas**
- **Separación entre columnas:** `--space-4` (16px)
- **Barra lateral:** plegada por defecto, se despliega como superposición

### Patrones de disposición comunes

| Patrón | Columnas en escritorio | Tableta | Móvil |
|---------|----------------|--------|--------|
| Contenido a ancho completo | 12 | 8 | 4 |
| Contenido + detalle en barra lateral | 8 + 4 | 5 + 3 | Apilado (completo + completo) |
| Formulario de dos columnas | 6 + 6 | 4 + 4 | Apilado |
| Panel de tres columnas | 4 + 4 + 4 | 4 + 4 (la tercera pasa de línea) | Apilado |
| Página de ajustes | 3 (navegación) + 9 (contenido) | Completa (pestañas en vez de navegación) | Completa |

---

## Elevación

La elevación (la profundidad de la sombra) comunica el apilamiento: qué está encima de qué.

| Token | Sombra | Uso |
|-------|--------|-----|
| `--elevation-0` | ninguna | Elementos planos, filas de tabla |
| `--elevation-1` | `0 1px 2px rgba(0,0,0,0.05)` | Tarjetas, superficies elevadas |
| `--elevation-2` | `0 2px 4px rgba(0,0,0,0.1)` | Desplegables, globos contextuales |
| `--elevation-3` | `0 4px 8px rgba(0,0,0,0.1)` | Modales, paneles laterales, paneles flotantes |
| `--elevation-4` | `0 8px 16px rgba(0,0,0,0.15)` | Avisos emergentes, snackbars |

### Reglas

- **Las tarjetas** usan `--elevation-1`. Al pasar el cursor (si son interactivas), suben a `--elevation-2`.
- **Los desplegables y los globos contextuales** usan `--elevation-2`.
- **Los modales y los paneles laterales** usan `--elevation-3`.
- **Los avisos emergentes** usan `--elevation-4` (el más alto: flotan por encima de todo).
- **La barra lateral** usa `--elevation-1` en escritorio. En móvil (como superposición), `--elevation-3`.
- **La elevación no se acumula:** si un modal contiene un desplegable, el desplegable usa `--elevation-3` (el mismo que el modal, pero dibujado encima con z-index), no `--elevation-5`.

---

## Bordes y radio

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-none` | 0px | Sin redondeo (celdas de tabla, algunos campos) |
| `--radius-sm` | 4px | Distintivos, etiquetas, elementos pequeños |
| `--radius-md` | 6px | Botones, campos, tarjetas |
| `--radius-lg` | 8px | Tarjetas grandes, modales, paneles laterales |
| `--radius-xl` | 12px | Cuadros de diálogo, paneles flotantes |
| `--radius-full` | 9999px | Avatares, distintivos en forma de píldora, botones circulares |

### Reglas

- **Botones:** `--radius-md`
- **Campos de formulario:** `--radius-md`
- **Tarjetas:** `--radius-lg`
- **Modales:** `--radius-xl` (solo las esquinas superiores en las hojas inferiores de móvil)
- **Avatares:** `--radius-full`
- **Etiquetas y distintivos:** `--radius-sm`

---

## Iconografía

### Sistema de iconos

- **Biblioteca de iconos:** Lucide Icons (código abierto, licencia MIT, cuadrícula consistente de 24px, más de 1000 iconos). Autoalojada, sin dependencia externa.
- **Tamaño por defecto:** 20px (dentro de una caja de 24px que deja relleno para el área táctil)
- **Grosor de trazo:** 1.5px (coincide con el peso visual de la fuente Inter en los tamaños de cuerpo)

<!-- REVISIT: El original justifica el grosor de trazo diciendo que "coincide con el peso visual de la fuente Inter", pero este mismo documento y la ADR-011 descartan Inter y fijan la pila de fuentes del sistema. La afirmación se traduce tal como está, sin corregirla. -->

### Tamaños de icono

| Token | Tamaño | Uso |
|-------|------|-----|
| `--icon-xs` | 14px | En línea con texto pequeño, iconos de distintivo |
| `--icon-sm` | 16px | En línea con el texto de cuerpo, iconos de los campos de formulario |
| `--icon-md` | 20px | Elementos de navegación, iconos de botón, iconos de los elementos de lista |
| `--icon-lg` | 24px | Encabezados de sección, iconos sueltos |
| `--icon-xl` | 32px | Iconos de funcionalidad, ilustraciones de estado vacío |
| `--icon-2xl` | 48px | Ilustraciones destacadas, incorporación |

### Reglas de los iconos

- **Los iconos direccionales se reflejan en RTL.** Las flechas, los chevrones y los indicadores direccionales se invierten en horizontal en modo RTL. Los iconos no direccionales (marcas de verificación, estrellas, etc.) no se invierten. El componente de icono lo resuelve reconociendo las propiedades lógicas de CSS.
- **El color sigue al texto.** Los iconos heredan por defecto el color del texto adyacente. Solo se sobrescribe en los indicadores de estado (marcas verdes, errores en rojo).
- **Nada de iconos decorativos.** Todo icono transmite un significado o ayuda a navegar. Los iconos van acompañados de rótulos de texto (salvo en los botones de solo icono, que exigen un globo de ayuda o un aria-label).
- **Iconos del modo de campo:** `--icon-lg` (24px) como mínimo. La mayoría de los iconos de acción usan `--icon-xl` (32px) para que sea más fácil tocarlos.

---

## Movimiento

### Transiciones predeterminadas

| Token | Duración | Curva de aceleración | Uso |
|-------|----------|--------|-----|
| `--duration-fast` | 100ms | ease-out | Estados al pasar el cursor, anillos de foco |
| `--duration-normal` | 200ms | ease-in-out | Apertura y cierre de paneles, cambio de pestañas |
| `--duration-slow` | 300ms | ease-in-out | Apertura y cierre de modales, deslizamiento del panel lateral |
| `--duration-slower` | 500ms | ease-in-out | Transiciones de página, animaciones de elementos grandes |

### Reglas de movimiento

- **Respeta `prefers-reduced-motion`.** Cuando el sistema operativo está configurado para reducir el movimiento, todas las transiciones son instantáneas (duration: 0ms). No es opcional: es un requisito de accesibilidad.
- **Nada de rebotes ni física de resorte.** El movimiento es funcional, no lúdico. Los elementos se mueven para comunicar cambios de estado (un panel que se abre, un elemento que se añade o se quita, una carga), no para entretener.
- **Modo de campo: movimiento mínimo.** En el modo de campo, las transiciones bajan a `--duration-fast` o se eliminan. En campo se trabaja rápido y la interfaz tiene que seguirle el paso.
- **Indicadores de carga:** un pulso o una rotación sutil, no animaciones complejas. El icono de sincronización gira; los esqueletos de carga laten. Hasta ahí llegan los estados de carga animados.
- **Nada de animaciones de entrada al cargar la página.** El contenido aparece de inmediato. Las entradas escalonadas pierden tiempo y empeoran el rendimiento percibido, justo lo contrario de lo que necesitan los dispositivos de gama baja.

---

## Escala de z-index

Una escala de z-index acotada para evitar las guerras de z-index:

| Token | Valor | Uso |
|-------|-------|-----|
| `--z-base` | 0 | Contenido por defecto |
| `--z-raised` | 10 | Encabezados fijos, botones de acción flotantes |
| `--z-dropdown` | 20 | Desplegables, globos contextuales, globos de ayuda |
| `--z-sidebar` | 30 | Barra lateral (cuando se superpone al contenido en móvil) |
| `--z-modal` | 40 | Modales, paneles laterales |
| `--z-toast` | 50 | Avisos emergentes |
| `--z-overlay` | 60 | Fondos de superposición de los modales |
| `--z-panic` | 100 | Pantalla de bloqueo del botón de pánico (siempre encima) |

---

## Densidad

El sistema de diseño admite dos modos de densidad para adaptarse a contextos distintos:

| Modo | Uso | Diferencias |
|------|-----|-------------|
| **Predeterminada** | Móvil, modo de campo, interfaces de cara al voluntariado | Áreas táctiles más grandes (44px+), más espaciado, texto más grande |
| **Compacta** | Administración en escritorio, pantallas con mucha información | Filas más bajas (36px), espaciado más ajustado, las tablas de datos muestran más en pantalla |

La densidad no la configura quien usa el sistema: la determinan el dispositivo y el contexto:
- **Móvil:** siempre densidad predeterminada
- **Modo de campo:** siempre densidad predeterminada
- **Escritorio:** densidad compacta en las vistas de lista y las tablas de datos, densidad predeterminada en los formularios y las áreas de contenido

---

## Preguntas abiertas

1. **Personalización de los iconos.** ¿Deberían las organizaciones poder personalizar el juego de iconos (por ejemplo, reemplazar el icono de "persona" por defecto con una alternativa culturalmente adecuada)? Prioridad baja, pero relevante en contextos del Sur Global.

2. **Estilos de impresión.** ¿Debería el sistema de diseño incluir tokens específicos para impresión? Algunas pantallas se imprimirán (informes de cumplimiento, estados de fin de año, hojas de registro de entrada a los eventos). Los tokens de impresión quitarían el color, ajustarían el espaciado al papel y usarían fuentes serif para la legibilidad.

<!-- REVISIT: Los valores por defecto de la paleta de color son deliberadamente genéricos (azul principal, neutros pizarra). Cuando GreenGrass establezca una identidad de marca, hay que actualizar la paleta por defecto para reflejarla. El sistema de tokens hace que ese cambio se propague sin tocar el código de los componentes. -->
<!-- REVISIT: La paleta de color para visualización de datos (chart-1 a chart-8) necesita cerrarse con una paleta secuencial y otra categórica seguras para el daltonismo. Considerar paletas ya establecidas como ColorBrewer o las de Tableau. -->
