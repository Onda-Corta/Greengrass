# Estrategia de diseño adaptable

## Propósito

Este documento define cómo GreenGrass se adapta a distintos tamaños de pantalla, dispositivos y capacidades de plataforma. Cubre los puntos de quiebre, el comportamiento propio de cada dispositivo, la estrategia del envoltorio nativo de Capacitor y cómo se transforman los componentes según el viewport (el área visible de la pantalla).

## Puntos de quiebre

### Definición

| Token | Ancho | Nombre | Objetivo |
|-------|-------|------|--------|
| `--bp-sm` | 640px | Pequeño | Celulares grandes (horizontal), tabletas pequeñas |
| `--bp-md` | 768px | Mediano | Tabletas (vertical) |
| `--bp-lg` | 1024px | Grande | Tabletas (horizontal), laptops pequeñas |
| `--bp-xl` | 1280px | Extra grande | Laptops, monitores de escritorio |
| `--bp-2xl` | 1536px | 2x extra grande | Monitores de escritorio grandes |

### Rangos de viewport

| Rango | Cuadrícula | Navegación | Marco | Objetivo principal |
|-------|------|-----|-------|----------------|
| <640px | 4 col. | Pestañas inferiores | Marco móvil | Celulares |
| 640-767px | 4 col. | Pestañas inferiores | Marco móvil | Celulares grandes |
| 768-1023px | 8 col. | Barra lateral plegada (superposición) | Marco de tableta | Tabletas |
| 1024-1279px | 12 col. | Barra lateral (plegable) | Marco de escritorio | Laptops pequeñas |
| 1280px+ | 12 col. | Barra lateral (desplegada por defecto) | Marco de escritorio | Escritorio |

### Uso

Los puntos de quiebre se usan con media queries de CSS y un enfoque de prioridad móvil:

```css
/* Los estilos base aplican al viewport más pequeño */
.component { /* estilos de móvil */ }

@media (min-width: 768px) { /* ajustes para tableta */ }
@media (min-width: 1024px) { /* ajustes para escritorio */ }
```

Prioridad móvil significa que los estilos por defecto (sin media query) son los de la pantalla más pequeña. Las mejoras se añaden en los puntos de quiebre más anchos. Así los celulares de gama baja, que procesan CSS despacio, reciben la hoja de estilo más simple.

---

## Categorías de dispositivo

### Celular (< 768px)

El dispositivo principal de los voluntarios, los Líderes de equipo, los simpatizantes y los candidatos.

**Disposición:**
- Contenido a pantalla completa, sin barra lateral
- Barra de pestañas inferior (4-5 pestañas adaptables al rol)
- Barra superior: atrás o menú, título, acciones contextuales
- Las listas son de tarjetas (no de tablas)
- Las vistas de detalle son a pantalla completa (tocar para entrar, atrás para salir)

**Comportamiento:**
- Solo interacciones táctiles (sin estados al pasar el cursor)
- Deslizar para actualizar en las listas
- Desplazamiento infinito en vez de paginación
- Gestos de deslizamiento en las tarjetas (descartar, archivar)
- Hoja inferior para los filtros y las opciones (no desplegables)
- Los campos de formulario usan los teclados nativos del celular (numérico, correo, teléfono)

**Rendimiento:**
- El paquete más pequeño posible (división de código agresiva)
- Imágenes con carga diferida y tamaño optimizado
- Estados de carga con esqueleto (sin indicadores de carga a pantalla completa)
- Service worker para cachear el marco sin conexión

### Tableta (768px - 1023px)

La usa parte del personal y, de vez en cuando, los Directores de campo que monitorean las operaciones desde un punto de concentración.

**Disposición:**
- Cuadrícula de 8 columnas
- Barra lateral plegada por defecto, se despliega como superposición
- Los paneles de detalle pueden aparecer como superposición a la derecha (no como división en línea)
- Las tablas alternan entre vista de tarjetas y vista de tabla según el número de columnas

**Comportamiento:**
- Interacciones táctiles + interacciones limitadas con puntero
- Los desplegables se muestran como hojas inferiores cuando se disparan con un toque
- Vista dividida disponible en la mensajería (lista de conversaciones + hilo)
- Arrastrar y soltar funciona, pero no es el modelo de interacción principal

### Escritorio (1024px+)

El dispositivo principal de los Administradores de la organización, los Directores de comunicaciones, los Directores de finanzas, los Gestores de datos y los Coordinadores de voluntarios.

**Disposición:**
- Cuadrícula de 12 columnas
- Barra lateral siempre visible (se pliega a solo iconos)
- Vistas divididas para los patrones de lista + detalle
- Los paneles de detalle se despliegan desde la derecha
- Los modales son diálogos centrados (no a pantalla completa)
- Las tablas son tablas de datos completas, con ordenamiento por columna y selección

**Comportamiento:**
- Interacciones con mouse y teclado
- Estados al pasar el cursor sobre los elementos interactivos
- Atajos de teclado disponibles
- Arrastrar y soltar en los constructores, el kanban y el calendario
- Menús contextuales con clic derecho donde corresponda
- Globos de ayuda al pasar el cursor (información disponible sin tener que tocar)

---

## Adaptación de los componentes

Cómo se transforman los componentes según el punto de quiebre:

### Navegación

| Componente | Celular | Tableta | Escritorio |
|-----------|-------|--------|---------|
| Navegación principal | Barra de pestañas inferior | Barra lateral plegada (superposición) | Barra lateral (desplegada o plegada) |
| Navegación secundaria | Hoja inferior "Más" | Hoja inferior "Más" | Secciones de la barra lateral |
| Ruta de navegación | Oculta (flecha de atrás en su lugar) | Visible (abreviada) | Visible (ruta completa) |
| Búsqueda | Superposición a pantalla completa | Superposición a pantalla completa | En línea en la barra superior |
| Menú de usuario | Perfil a pantalla completa | Hoja inferior | Desplegable |

### Presentación de datos

| Componente | Celular | Tableta | Escritorio |
|-----------|-------|--------|---------|
| Tabla de datos | Lista de tarjetas | Lista de tarjetas o tabla compacta | Tabla completa con columnas |
| Lista + detalle | Apilados (cada uno a pantalla completa) | Vista dividida opcional | Vista dividida (redimensionable) |
| Widgets del panel | Una columna, apilados | Dos columnas | Tres o cuatro columnas |
| Gráficas | Simplificadas (menos rótulos) | Estándar | Completas (leyendas, anotaciones) |
| Calendario | Vista de agenda (lista) | Vista de semana | Vistas de mes, semana y día |
| Kanban / flujo de etapas | Una sola columna con desplazamiento | Dos columnas visibles | Todas las columnas visibles |

### Formularios

| Componente | Celular | Tableta | Escritorio |
|-----------|-------|--------|---------|
| Disposición del formulario | Una columna, apilada | Una columna | Dos columnas posibles |
| Campos de selección | Selector nativo del celular | Hoja inferior | Desplegable |
| Selector de fecha | Selector nativo del celular | Calendario emergente | Calendario emergente |
| Subida de archivos | Cámara + selector de archivos | Arrastrar y soltar + selector de archivos | Arrastrar y soltar + selector de archivos |
| Selector de color | Pantalla completa | Globo contextual | Globo contextual |
| Formularios de varios pasos | Pantalla completa por paso | Pantalla completa por paso | En línea con indicador de pasos |

### Superposiciones

| Componente | Celular | Tableta | Escritorio |
|-----------|-------|--------|---------|
| Modales | Pantalla completa | Diálogo centrado (mediano) | Diálogo centrado |
| Paneles laterales | Pantalla completa u hoja inferior | Panel lateral (altura completa) | Panel lateral (altura completa) |
| Notificaciones | Lista a pantalla completa | Panel lateral | Panel lateral |
| Diálogos de confirmación | Hoja inferior | Diálogo centrado | Diálogo centrado |
| Globos de ayuda | Hoja inferior (al tocar) | Globo contextual (al tocar o al pasar el cursor) | Globo contextual (al pasar el cursor) |

### Modo de campo

El modo de campo es solo para celular, por diseño. Si se accede desde un viewport de tableta o de escritorio:

- **Tableta:** se dibuja en un viewport del tamaño de un celular (centrado, con relleno). El modo de campo está pensado para usarse con una mano en el celular: escalarlo a las dimensiones de una tableta dejaría áreas táctiles desproporcionadamente grandes y desperdiciaría pantalla.
- **Escritorio:** redirige a la vista de gestión (por ejemplo, `/field/canvassing/[campaignId]` en vez de `/field-mode/canvass/[shiftId]`). El personal no hace trabajo de campo desde un escritorio.

---

## Consideraciones propias de Capacitor

GreenGrass usa Capacitor para envolver la aplicación web de SvelteKit como aplicación móvil nativa. Eso trae consideraciones propias:

### Acceso a las API nativas

| Funcionalidad | Solo web | Con Capacitor |
|---------|----------|----------------|
| Autenticación con passkey | API de WebAuthn | Solicitud biométrica nativa |
| Cámara (registro de entrada con QR) | API `getUserMedia` | Cámara nativa con lector de QR |
| Almacenamiento sin conexión | IndexedDB (limitado) | SQLite con SQLCipher (cifrado, más grande) |
| Notificaciones push | API de Web Push | Push nativo (APNs/FCM) |
| Caché de teselas de mapa | Caché del service worker | Caché en el sistema de archivos (más grande, persistente) |
| Sincronización en segundo plano | Service worker (limitado) | Tareas nativas en segundo plano |
| Retroalimentación háptica | API de vibración (limitada) | Acceso completo al motor háptico |
| Enlaces directos | Manejo de URL | Universal links / App links |

### Áreas seguras

iOS y Android tienen áreas seguras (el notch, la barra de estado, el indicador de inicio, la barra de navegación) que no se pueden solapar con contenido interactivo:

```css
/* Respeta las áreas seguras del dispositivo */
.app-shell {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

La barra de pestañas inferior queda por encima del indicador de inicio. La barra superior queda por debajo de la barra de estado y del notch. El botón de pánico del modo de campo tiene que quedar fuera del área segura y aun así poder tocarse.

### Barra de estado

- **Aplicación estándar:** barra de estado clara (texto oscuro sobre fondo claro)
- **Modo oscuro:** barra de estado oscura (texto claro sobre fondo oscuro)
- **Modo de campo:** barra de estado oculta (modo inmersivo a pantalla completa) para maximizar el espacio de contenido
- **El color acompaña al encabezado:** el color de fondo de la barra de estado coincide con el de la barra superior de la aplicación

### Icono de la aplicación y pantalla de bienvenida

- **Icono de la aplicación:** lo personaliza la organización. El icono de GreenGrass es el predeterminado de la plataforma. En las compilaciones con la marca de la organización se usa su logo (si funciona en formato cuadrado).
- **Pantalla de bienvenida:** breve (< 2 segundos). Muestra el logo de la organización sobre un fondo con su color de marca. Pasa a la aplicación cuando cargan los datos iniciales.

### Manejo del teclado

En móvil, que el teclado virtual tape los campos de formulario es un problema común:

- **Desplazamiento hasta el campo activo:** cuando un campo recibe el foco, el viewport se desplaza para mantenerlo visible por encima del teclado.
- **Los elementos fijos al pie se reposicionan:** la barra de pestañas inferior y los botones de acción flotantes suben por encima del teclado cuando está abierto.
- **Modo de campo:** los campos están en la parte de arriba de la pantalla, así que el teclado no los tapa. Los botones de opción de respuesta son lo bastante grandes para seguir tocándose por encima del teclado.

---

## Presupuestos de rendimiento

El rendimiento es una restricción central: la persona objetivo usa un Android de gama baja con conexión lenta.

### Objetivos de tamaño de paquete

| Recurso | Objetivo | Notas |
|----------|--------|-------|
| Paquete inicial de JS | < 150KB comprimidos con gzip | La salida compilada de SvelteKit ayuda aquí |
| CSS inicial | < 30KB comprimidos con gzip | Tokens de diseño + estilos base |
| First contentful paint | < 2s en 3G | El renderizado en el servidor es crítico |
| Time to interactive | < 4s en 3G | La hidratación tiene que ser rápida |
| Fragmento por ruta | < 50KB comprimidos con gzip | División de código agresiva |
| Fuentes | 0KB | Pila de fuentes del sistema: no se cargan por red |

### Estrategia de imágenes

- **Logo e identidad visual:** SVG cuando se pueda, PNG como alternativa de reserva < 20KB
- **Imágenes de avatar:** miniaturas de 48x48px, con carga diferida
- **Teselas de mapa:** PNG de 256x256px, cacheadas de forma agresiva
- **Nada de imágenes decorativas.** Toda imagen cumple una función.
- **Imágenes adaptables:** `srcset` con variantes de tamaño para los distintos viewports
- **WebP con PNG como alternativa de reserva** en las imágenes ráster

### Estrategia de división de código

La división de código por rutas de SvelteKit resuelve la mayoría de los casos. Divisiones adicionales:

| División | Disparador |
|-------|---------|
| Componentes de mapa | Solo se cargan en las pantallas con mapas |
| Biblioteca de gráficas | Solo se carga en las pantallas de panel y de analítica |
| Componentes de constructor | Solo se cargan en las pantallas de constructor (correo, formulario, guion) |
| Modo de campo | Solo se carga al entrar en el modo de campo |
| Administración y ajustes | Solo se cargan para el rol de Administrador de la organización |

Eso significa que la aplicación de un voluntario carga bastante menos código que la de un Administrador de la organización: nunca descarga los fragmentos del constructor, de los ajustes ni de la analítica.

---

## Mejora progresiva

La aplicación de SvelteKit usa renderizado en el servidor (SSR) con mejora progresiva:

### Sin JavaScript

La aplicación no es del todo funcional sin JavaScript (la hidratación de SvelteKit hace falta para la interactividad). Aun así, el SSR garantiza que:
- El contenido se ve antes de que cargue el JS (paneles legibles, listas de contactos)
- Los enlaces funcionan antes de la hidratación (se navega con cargas de página completas)
- Los campos de formulario se ven (aunque enviarlos exige JS)
- Los buscadores pueden indexar las páginas públicas

### Sin service worker

Sin service worker, la aplicación funciona solo en línea. El service worker añade:
- Caché del marco sin conexión (la navegación sigue funcionando)
- Sincronización en segundo plano de las operaciones en cola
- Manejo de las notificaciones push
- Caché de teselas de mapa

La aplicación nativa de Capacitor siempre tiene capacidades de service worker. Quienes entran solo por la web (desde el navegador) puede que no, pero la experiencia central se degrada de forma controlada.

### Ajustes para dispositivos de gama baja

Para dispositivos con poca RAM y poca CPU:
- **Listas virtualizadas:** las listas largas dibujan solo los elementos visibles (desplazamiento virtual)
- **Animación reducida:** se respeta `prefers-reduced-motion` y, además, los dispositivos con menos de 4GB de RAM reciben transiciones reducidas
- **Reducción de la calidad de imagen:** a las conexiones lentas se les sirven imágenes de menor resolución
- **Carga aplazada:** la interfaz no crítica (gráficas, widgets secundarios) carga después del renderizado inicial
- **Caché consciente de la memoria:** los límites de la caché son más bajos en los dispositivos con poca memoria

---

## Matriz de pruebas

### Viewports de prueba obligatorios

| Viewport | Dispositivo representativo | Prioridad |
|----------|----------------------|----------|
| 360x640 | Celular Android económico (serie Samsung Galaxy A) | Crítica |
| 375x812 | iPhone SE / iPhone 13 Mini | Crítica |
| 390x844 | iPhone 14 / 15 | Alta |
| 412x915 | Google Pixel / Android de gama media | Alta |
| 768x1024 | iPad (vertical) | Media |
| 1024x768 | iPad (horizontal) / laptop pequeña | Media |
| 1280x800 | Laptop estándar | Alta |
| 1440x900 | Laptop grande | Media |
| 1920x1080 | Monitor de escritorio | Media |

### Escenarios de prueba prioritarios

1. **Android económico + 3G lento:** la ruta crítica. Si funciona aquí, funciona en todas partes.
2. **iPhone + LTE:** el otro gran escenario móvil.
3. **Escritorio + banda ancha:** la experiencia del personal.
4. **Tableta + wifi:** caso de uso ocasional.
5. **RTL en todo lo anterior:** pruebas de maquetación en árabe.
6. **Modo oscuro en todo lo anterior:** contraste de color y legibilidad.
7. **Modo de campo en un Android económico:** la experiencia de usuario de mayor riesgo del sistema.

---

## Preguntas abiertas

1. **Dispositivos plegables.** El Samsung Galaxy Z Fold y otros plegables tienen dos viewports (plegado y desplegado). ¿Debería la aplicación manejar explícitamente el pliegue y el cambio de viewport? Prioridad baja, pero mercado en crecimiento.

2. **PWA frente a distribución solo nativa.** ¿Debería la aplicación poder instalarse como Progressive Web App (desde el navegador), además de la aplicación nativa envuelta en Capacitor? La PWA reduce la fricción (no hace falta tienda de aplicaciones), pero tiene menos acceso a las API nativas.

3. **Proveedor de mapas sin conexión.** Para precachear teselas de mapa, ¿qué proveedor ofrece el mejor soporte de teselas sin conexión en los países objetivo? Las teselas de OSM son gratis, pero pesadas. Las teselas vectoriales (Mapbox/MapLibre) son más livianas, pero exigen más potencia de renderizado en los dispositivos de gama baja.

<!-- REVISIT: Los presupuestos de rendimiento son objetivos, no garantías. Medir el rendimiento real contra los dispositivos objetivo de verdad (celulares Android económicos en los mercados objetivo) es imprescindible durante el desarrollo. Probar en laboratorio con conexiones limitadas es un comienzo, pero no captura toda la realidad de las condiciones de red en las zonas rurales de Brasil o de la India. -->
