# Estrategia de temas

## Propósito

Este documento define cómo GreenGrass admite la identidad visual por organización, las disposiciones RTL, el modo oscuro y los temas de accesibilidad. Todas las organizaciones corren el mismo código de aplicación: los temas se aplican enteramente sobrescribiendo tokens de diseño, no cambiando código.

## Identidad visual por organización

### Qué pueden personalizar las organizaciones

| Elemento | ¿Personalizable? | Cómo |
|---------|-------------|-----|
| **Color principal** | Sí | Se asigna a `--color-primary` y sus derivados |
| **Logo** | Sí | Se sube en los ajustes de la organización; aparece en la barra superior y en las páginas públicas |
| **Favicon** | Sí | Se sube; reemplaza al predeterminado en la pestaña del navegador |
| **Nombre de marca** | Sí | Texto de la barra superior, títulos de documento, plantillas de correo |
| **Color de acento** | Opcional | Color de marca secundario para la visualización de datos y las gráficas |
| **Fuente** | No | Pila de fuentes del sistema. Las organizaciones no la pueden cambiar. |
| **Maquetación** | No | La estructura de navegación, el espaciado y la cuadrícula son fijos. |
| **Estilos de los componentes** | No | Las formas de los botones, los estilos de tarjeta y los estilos de campo son fijos. |
| **Iconos** | No | El juego de iconos de Lucide es fijo. |

### Por qué la fuente y la maquetación son fijas

Personalizar la fuente y la maquetación por organización:
- Rompería el espaciado y la alineación (cada fuente tiene métricas distintas)
- Obligaría a probar todas las pantallas organización por organización
- Aumentaría el tamaño del paquete (cargar fuentes distintas por organización)
- Crearía una carga de mantenimiento que crece con el número de organizaciones

El intercambio es deliberado: las organizaciones consiguen personalizar color y logo (lo que cubre el 90 % de sus necesidades de expresión de marca) sin el costo de ingeniería de una personalización más profunda.

### Sobrescritura de tokens de tema

El tema de una organización se expresa como un conjunto de sobrescrituras de propiedades personalizadas de CSS:

```css
/* Tema por defecto (los valores por defecto de GreenGrass) */
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e40af;
  --color-primary-subtle: #eff6ff;
  --color-on-primary: #ffffff;
}

/* Override de la organización (por ejemplo, Partido Verde: marca verde) */
:root[data-theme="partido-verde"] {
  --color-primary: #16a34a;
  --color-primary-hover: #15803d;
  --color-primary-active: #166534;
  --color-primary-subtle: #f0fdf4;
  --color-on-primary: #ffffff;
}
```

### Colores derivados automáticos

Cuando una organización fija su color principal, el sistema genera automáticamente:
- **Estado al pasar el cursor:** 10 % más oscuro
- **Estado activo o presionado:** 20 % más oscuro
- **Fondo sutil:** 95 % más claro (un tinte casi blanco)
- **Texto sobre el principal:** blanco o negro, el que cumpla una relación de contraste de 4.5:1 contra el color principal

Esa generación automática corre en el servidor durante la configuración del tema. El Administrador de la organización ve una vista previa antes de guardar.

### Experiencia de configuración del tema

En Ajustes > Perfil de la organización e identidad visual:

```
┌───────────────────────────────────────────────────────────────┐
│  Identidad visual                                             │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Nombre de la organización: [Partido Verde de Puerto Rico  ]  │
│                                                               │
│  Logo:  [Logo actual]  [Subir nuevo]                          │
│  Favicon: [Icono actual]  [Subir nuevo]                       │
│                                                               │
│  Color de marca:                                              │
│  [#16a34a]  [Selector de color ▾]                             │
│                                                               │
│  Vista previa:                                                │
│  ┌──────────────────────────────────────────────────┐         │
│  │  [Logo]  Partido Verde    [●] [🔔] [👤]          │         │
│  │  ┌──────┐                                        │         │
│  │  │ Nav  │  [Botón principal]  [Texto de enlace]  │         │
│  │  │ ítem │  [Pestaña activa]  [Pestaña inactiva]  │         │
│  │  └──────┘                                        │         │
│  └──────────────────────────────────────────────────┘         │
│                                                               │
│  ⚠ Si tu color de marca tiene poco contraste contra el        │
│    blanco, el texto cambiará automáticamente a oscuro.        │
│                                                               │
│  [Cancelar]                                        [Guardar]  │
└───────────────────────────────────────────────────────────────┘
```

### Restricciones del color de marca

El Administrador de la organización puede elegir cualquier color de marca, pero el sistema hace cumplir la accesibilidad:
- Si el color elegido no tiene suficiente contraste con el texto blanco, `--color-on-primary` cambia solo a texto oscuro.
- Si el color elegido es demasiado claro para usarse como texto de enlace sobre fondos blancos, `--color-text-link` usa una variante oscurecida.
- Aparece una advertencia si el color se parece a los colores de estado (rojo, ámbar, verde): "Este color se parece a los indicadores de error, advertencia y éxito, y puede causar confusión."

### Temas en las páginas públicas

Las páginas públicas (formularios de donación, páginas de eventos, perfiles de candidatura) heredan el tema de la organización de forma más agresiva:
- El logo de la organización, prominente en el encabezado
- El color principal se usa en botones, enlaces y acentos
- Color o imagen de fondo destacada, opcional
- Los avisos legales de cumplimiento se quedan con la fuente y el estilo estándar del sistema (sin marca: son requisitos legales)

---

## Soporte de RTL

### Enfoque estructural

RTL no es un tema: es un modo de maquetación. La aplicación entera se invierte cuando el idioma de la interfaz es RTL (árabe, hebreo).

```css
/* LTR (por defecto) */
html[dir="ltr"] {
  --sidebar-position: inline-start;  /* izquierda */
  --detail-panel-position: inline-end;  /* derecha */
}

/* RTL */
html[dir="rtl"] {
  --sidebar-position: inline-start;  /* derecha */
  --detail-panel-position: inline-end;  /* izquierda */
}
```

### Qué se invierte

| Elemento | LTR | RTL |
|---------|-----|-----|
| Posición de la barra lateral | Izquierda | Derecha |
| Posición del panel de detalle | Derecha | Izquierda |
| Alineación del texto | A la izquierda | A la derecha |
| Flechas y chevrones de navegación | Apuntan a la derecha (hacia adelante) | Apuntan a la izquierda (hacia adelante) |
| Dirección de la ruta de navegación | Izquierda → Derecha | Derecha → Izquierda |
| Orden de la barra de pestañas | De izquierda a derecha | De derecha a izquierda |
| Barras de progreso | Se llenan de izquierda a derecha | Se llenan de derecha a izquierda |
| Rótulos de formulario | A la izquierda del campo (o arriba) | A la derecha del campo (o arriba) |
| Iconos de los elementos de lista | A la izquierda | A la derecha |
| Bandeja de notificaciones | Entra desde la derecha | Entra desde la izquierda |
| Flechas del campo numérico | A la derecha | A la izquierda |

### Qué NO se invierte

| Elemento | Comportamiento | Por qué |
|---------|----------|-----|
| Números de teléfono | Siempre LTR | Estándar internacional |
| Direcciones de correo | Siempre LTR | Estándar técnico |
| URL | Siempre LTR | Estándar técnico |
| Montos de dinero | Siempre LTR | Estándar internacional |
| Código y texto técnico | Siempre LTR | Universal |
| Mapas | No se invierten | El norte, el sur, el este y el oeste geográficos no se invierten |
| Controles de reproducción | No se invierten | Convención universal |
| Marcas de verificación | No se invierten | No son direccionales |
| Botones de cerrar (✗) | No se invierten | No son direccionales |

### Implementación

RTL se resuelve enteramente con propiedades lógicas de CSS:

```css
/* Nunca así: */
margin-left: var(--space-4);
padding-right: var(--space-2);
text-align: left;

/* Siempre así: */
margin-inline-start: var(--space-4);
padding-inline-end: var(--space-2);
text-align: start;
```

Eso significa cero hojas de estilo duplicadas, cero archivos CSS específicos de RTL, cero clases condicionales. Una sola hoja de estilo sirve para las dos direcciones. El atributo `dir` en `<html>` dispara el comportamiento correcto.

### Consideraciones tipográficas para RTL

La escritura árabe exige atención tipográfica específica:
- **El texto en árabe usa fuentes del sistema:** la pila de fuentes cae en Noto Sans Arabic, Arabic UI Text o las fuentes árabes del sistema.
- **Texto de dirección mixta:** un párrafo en árabe que contiene un nombre de marca en inglés o una dirección de correo usa el algoritmo bidireccional de Unicode (BiDi) para cambiar de dirección en línea. En la mayoría de los casos no hace falta intervención manual.
- **Numerales:** la interfaz en árabe usa los numerales arábigos occidentales (0-9), no los orientales (٠-٩), para ser consistente con las visualizaciones de datos y los estándares internacionales. Si hace falta, se puede configurar por organización.

### Pruebas en RTL

Hay que probar todos los componentes y todas las pantallas en modo RTL. El entorno de desarrollo incluye un interruptor de idioma que cambia entre LTR y RTL al instante para la verificación visual.

---

## Modo oscuro

### Enfoque

El modo oscuro es una preferencia de cada persona, no un ajuste de la organización. Aplica a toda la aplicación.

### Correspondencia de tokens

El modo oscuro reasigna todos los tokens de superficie, texto y borde:

| Token | Claro | Oscuro |
|-------|-------|------|
| `--color-surface` | `#ffffff` | `#0f172a` |
| `--color-surface-raised` | `#ffffff` | `#1e293b` |
| `--color-surface-sunken` | `#f8fafc` | `#020617` |
| `--color-text` | `#0f172a` | `#f1f5f9` |
| `--color-text-secondary` | `#475569` | `#94a3b8` |
| `--color-text-tertiary` | `#94a3b8` | `#64748b` |
| `--color-border` | `#e2e8f0` | `#334155` |
| `--color-border-strong` | `#cbd5e1` | `#475569` |
| `--color-input-border` | `#cbd5e1` | `#475569` |
| `--color-disabled` | `#f1f5f9` | `#1e293b` |

### El color principal en modo oscuro

El color principal de la organización puede necesitar ajustes en modo oscuro:
- Si el color principal es oscuro (por ejemplo, azul oscuro), puede quedarse sin contraste contra el fondo oscuro. El sistema lo aclara automáticamente para el modo oscuro.
- Si el color principal ya es claro (por ejemplo, amarillo), se puede usar tal cual o saturarlo un poco.
- `--color-primary-subtle` se invierte: en vez de un tinte casi blanco, pasa a ser un tinte casi negro del color principal.

### Los colores de estado en modo oscuro

Los colores de estado (éxito, advertencia, error) pasan a variantes un poco más claras y saturadas en modo oscuro, para mantener la visibilidad contra los fondos oscuros.

### Activación del modo oscuro

- **Ajuste personal:** un interruptor en las preferencias del perfil personal
- **Preferencia del sistema:** por defecto respeta la media query `prefers-color-scheme: dark`
- **Sobrescritura:** se puede sobrescribir la preferencia del sistema (forzar claro, forzar oscuro o seguir al sistema)
- **Persistencia:** la elección se guarda en el perfil (en el servidor) y aplica en todos los dispositivos

### Exclusiones del modo oscuro

Algunos elementos no cambian en modo oscuro:
- **Los formularios públicos de donación:** siempre usan el tema de marca que configuró la organización (normalmente claro). El modo oscuro aplica a la plataforma, no a las páginas públicas.
- **Las vistas de impresión:** siempre claras.
- **Las teselas de mapa:** los proveedores de mapas tienen sus propias teselas de modo oscuro (opcional).

### El modo oscuro en el centro de mando

El panel del centro de mando arranca en modo oscuro durante las operaciones de la noche electoral (se puede sobrescribir). El modo oscuro cansa menos la vista en un monitoreo prolongado en salas con poca luz, y las pantallas grandes del centro de mando se ven mejor con fondos oscuros.

---

## Temas de accesibilidad

Más allá del modo oscuro, el sistema de diseño admite sobrescrituras de accesibilidad:

### Modo de alto contraste

Se activa en las preferencias personales de accesibilidad. Sobrescribe:

| Cambio | Efecto |
|--------|--------|
| Ancho de los bordes | Todos los bordes pasan de `1px` a `2px` |
| Anillos de foco | De `2px` a `3px`, con `2px` de desplazamiento |
| Contraste del texto | Todo el texto cumple una relación de 7:1 (WCAG AAA) |
| Simplificación del color | Los colores de fondo sutiles se vuelven más distinguibles |
| Indicadores de estado | Se añaden iconos a todos los indicadores que solo usan color |
| Subrayado de los enlaces | Todos los enlaces van subrayados (no solo al pasar el cursor) |

### Modo de texto grande

Para quienes necesitan texto más grande sin hacer zoom (el zoom puede romper la maquetación):

| Cambio | Efecto |
|--------|--------|
| Tamaño de fuente base | 16px → 20px |
| Tamaño mínimo de fuente | 12px → 16px |
| Interlineados | Aumentan proporcionalmente |
| Áreas táctiles | De 44px a 52px como mínimo |
| Espaciado | Aumenta proporcionalmente |

**Nota:** el modo de texto grande puede hacer que algunas disposiciones de escritorio se comporten como las de tableta (menos contenido visible, más desplazamiento). Es aceptable: la usabilidad va antes que la densidad de información.

### Modo de movimiento reducido

Respeta `prefers-reduced-motion: reduce`:
- Todas las transiciones: `duration: 0ms`
- Sin indicadores de carga animados (un icono estático en su lugar)
- Sin desplazamiento automático en el flujo del centro de mando (solo desplazamiento manual)
- Sin latido en los esqueletos de carga (bloques grises estáticos en su lugar)

---

## Composición de temas

Los temas se componen: varios aspectos se aplican a la vez:

```
Tokens base (foundations.md)
  └── Override de marca de la organización (color principal, logo)
      └── Modo de color (claro / oscuro)
          └── Sobrescrituras de accesibilidad (alto contraste, texto grande)
              └── Sobrescrituras de contexto (densidad del modo de campo, centro de mando en oscuro)
```

Cada capa sobrescribe solo lo que necesita. El tema de alto contraste en modo oscuro de una organización = tokens base + marca de la organización + paleta oscura + ajustes de alto contraste. La cascada de CSS lo resuelve de forma natural por especificidad:

```css
:root { /* base */ }
:root[data-theme="partido-verde"] { /* organización */ }
:root[data-color-mode="dark"] { /* modo oscuro */ }
:root[data-high-contrast="true"] { /* accesibilidad */ }
:root[data-context="field-mode"] { /* contexto */ }
```

---

## Preguntas abiertas

1. **Modo oscuro predeterminado por organización.** ¿Deberían las organizaciones poder fijar un modo de color predeterminado (claro u oscuro) para las personas nuevas? Algunas campañas trabajan de noche; ahí el modo oscuro por defecto podría ser lo adecuado.

2. **Temas de temporada o de campaña.** ¿Deberían las organizaciones poder configurar sobrescrituras de tema por tiempo limitado (tema de día de elecciones, tema de campaña de recaudación)? Añade dinamismo visual, pero aumenta la complejidad.

3. **Profundidad de la marca blanca.** Algunas organizaciones (sobre todo las autoalojadas) pueden querer una marca blanca más profunda: nombre de aplicación propio, pantalla de inicio de sesión propia, plantillas de correo propias. ¿Hasta dónde llegan los temas? Hoy se limitan a color + logo. Una marca blanca completa exigiría otra arquitectura.

<!-- REVISIT: La generación automática de los colores derivados (al pasar el cursor, activo, sutil, sobre el principal) necesita un algoritmo que funcione en toda la gama de color. Manipular HSL es simple, pero da malos resultados con algunos matices. Considerar OKLCH u otro espacio de color perceptual para mejores resultados. -->
