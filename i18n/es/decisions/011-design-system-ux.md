# ADR-011: Sistema de diseño y fundamentos de UX

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `design/ux/01-information-architecture/navigation-model.md`, `design/ux/03-design-system/foundations.md`, `design/ux/03-design-system/theming-strategy.md`, `design/ux/03-design-system/responsive-strategy.md`

## Contexto

GreenGrass tiene que correr en celulares Android de gama baja sobre conexiones 3G en el Sur Global y, a la vez, ofrecer una experiencia de escritorio completa al personal de campaña que maneja operaciones complejas. El sistema de diseño tiene que soportar la identidad visual por organización (las campañas políticas necesitan sus colores y sus logos), la dirección de texto RTL, los requisitos de accesibilidad y una interfaz de modo de campo pensada para usarse con una mano mientras se camina. Cada decisión de diseño afecta el rendimiento, y el rendimiento es un requisito de supervivencia: una carga de 10 segundos en 3G significa que el voluntario que está en la puerta se da por vencido.

## Decisión

### Escritorio: navegación híbrida de barra superior y barra lateral

En escritorio se usa una barra superior para el contexto (identidad de la organización, búsqueda global, estado de sincronización, notificaciones, perfil) y una barra lateral plegable para la navegación de funcionalidades adaptable al rol. La barra lateral muestra elementos distintos según la plantilla de rol de la persona: las funcionalidades restringidas no aparecen, no se muestran atenuadas. Las secciones de la barra lateral se pliegan de forma independiente y su estado persiste por usuario.

En móvil se usa una barra de pestañas inferior (4-5 pestañas adaptables al rol) con contenido a pantalla completa y navegación de retroceso o de menú en la barra superior. El modo de campo es una pantalla completa exclusiva, sin barra lateral ni pestañas: solo navegación anterior/siguiente, indicador de posición y los botones de terminar turno y de pánico.

**Alternativas consideradas:** Se descartó usar solo la barra superior (sin barra lateral) porque las plataformas de campaña tienen demasiadas áreas de funcionalidad para una navegación puramente horizontal. Se descartó la barra de pestañas inferior con menú hamburguesa en escritorio porque esconde la navegación detrás de un clic más. Se descartó usar la misma navegación en todos los dispositivos porque el celular, la tableta y el escritorio tienen patrones de interacción radicalmente distintos.

### Pila de fuentes del sistema, sin fuentes personalizadas

La plataforma usa `system-ui` con alternativas de reserva a las fuentes propias de cada plataforma: Roboto (Android), San Francisco (iOS), Noto Sans (cobertura Unicode). No se carga ninguna fuente web personalizada. Así no hay demora por carga de fuentes, se logra la mejor cobertura posible de las escrituras latina, tailandesa, devanagari y árabe, y el renderizado es consistente en cada plataforma.

**Alternativas consideradas:** Se consideraron —y al principio se usaron— fuentes web personalizadas (Inter y similares), y luego se descartaron porque añaden tiempo de carga en conexiones lentas, obligan a manejar alternativas de reserva y no cubren las escrituras tailandesa, devanagari y árabe con la fiabilidad de las fuentes del sistema.

### Personalización por organización solo de color y logo

Las organizaciones pueden personalizar su color principal, su logo y su favicon. La fuente, la maquetación, los estilos de los componentes y el espaciado son fijos. Esto evita que la personalización de la organización rompa el espaciado o la alineación, y reduce la matriz de pruebas a las variantes de color.

### Generación automática de colores derivados a partir del color principal

El color principal de la organización genera automáticamente el color de hover (10 % más oscuro), el de estado activo (20 % más oscuro), el de fondo sutil (95 % más claro) y el del texto sobre el color principal (blanco o negro, el que dé una relación de contraste de 4.5:1). Si el color de marca se parece demasiado a los colores de estado (rojo, ámbar, verde), el sistema avisa durante la configuración. La generación de colores usa algoritmos de color perceptual (OKLCH antes que HSL).

### Unidad base de espaciado de 8px con escala geométrica

Todo el espaciado usa una escala geométrica anclada en 8px: 0, 1px, 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px. Los márgenes en móvil son de 16px; en escritorio, de 32-64px. Un espaciado consistente crea ritmo visual y elimina los valores en píxeles improvisados.

### CSS con prioridad móvil y división de código agresiva

Los estilos base apuntan al viewport (el área visible de la pantalla) más pequeño; las mejoras se añaden con media queries. Puntos de quiebre: 640px (celulares grandes), 768px (tabletas), 1024px (laptops pequeñas), 1280px (laptops), 1536px (monitores grandes). La división de código es por ruta y por funcionalidad: los mapas, las gráficas, los constructores de formularios, las herramientas de administración y el modo de campo se cargan solo cuando hacen falta.

### Presupuestos de rendimiento orientados a 3G

| Métrica | Presupuesto |
|--------|--------|
| JS inicial | <150KB comprimido con gzip |
| CSS | <30KB |
| First Contentful Paint | <2s en 3G |
| Time to Interactive | <4s en 3G |
| Fragmento por ruta | <50KB |
| Fuentes web | 0KB (fuentes del sistema) |

Las imágenes usan WebP con PNG como alternativa de reserva, `srcset` para el tamaño adaptable, carga diferida para los avatares y teselas precargadas en caché para los mapas. Los logos van en SVG.

El sistema de diseño usa propiedades personalizadas de CSS (tokens de diseño) para todos los valores visuales, nunca valores en crudo. Esto permite aplicar temas por organización en tiempo de ejecución sin cambiar código. La arquitectura de tokens tiene tres capas: la paleta primitiva (colores en crudo, que no se usan directamente), los tokens semánticos (describen su propósito: `--color-surface-primary`, `--color-text-secondary`) y los overrides de tema (la personalización por organización). El modo oscuro reasigna los tokens de superficie, texto y borde. Los temas de accesibilidad (alto contraste, texto grande, movimiento reducido) se aplican como atributos de datos.

## Consecuencias

**Beneficios:**
- Las fuentes del sistema no añaden ninguna demora de carga y dan la mejor cobertura de escrituras, algo crítico en contextos multilingües y de bajo ancho de banda
- Limitar la personalización por organización al color mantiene manejable la matriz de pruebas sin renunciar a la identidad visual de la campaña
- La generación automática de colores derivados garantiza la accesibilidad sin exigirle conocimientos de diseño al personal de campaña
- Los presupuestos de rendimiento orientados a 3G aseguran que la plataforma funcione en las redes y los dispositivos que los voluntarios usan de verdad
- La arquitectura de tokens de diseño permite aplicar temas en tiempo de ejecución, el modo oscuro y los temas de accesibilidad con un solo mecanismo

**Costos:**
- Usar la pila de fuentes del sistema hace que la tipografía de la plataforma varíe un poco de un sistema operativo a otro
- Personalizar solo el color puede frustrar a las campañas con identidades visuales fuertes que van más allá del color
- La división de código agresiva exige un manejo cuidadoso de las dependencias para evitar cargas en cascada
- El presupuesto de 150KB de JS es extremadamente ajustado y exigirá vigilancia constante a medida que se añadan funcionalidades

**Restricciones:**
- Cada componente tiene que funcionar en todos los puntos de quiebre, en LTR y en RTL, y con el tema claro y el oscuro
- Las áreas táctiles del modo de campo (56px como mínimo) exigen un tratamiento de disposición distinto al del modo estándar (44px)
- Hay que respetar `prefers-reduced-motion`: todo el movimiento es funcional, sin animaciones decorativas
- Las pruebas tienen que priorizar los dispositivos Android económicos (360x640) como objetivo crítico

**ADR relacionados:** [ADR-010](010-internationalization-localization.md) (soporte de RTL con propiedades lógicas, cobertura tipográfica multilingüe), [ADR-006](006-field-operations-gotv.md) (interfaz del modo de campo, áreas táctiles), [ADR-001](001-platform-architecture.md) (diseño con prioridad móvil)
