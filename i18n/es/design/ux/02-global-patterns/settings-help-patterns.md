# Patrones de ajustes y ayuda

## Propósito

Este documento define los patrones de UX de la configuración de la plataforma, la ayuda contextual, la base de conocimiento, el cambio de idioma y los flujos de incorporación. Son las estructuras de apoyo que ayudan a configurar la plataforma y a encontrar respuestas cuando alguien se atasca.

## Arquitectura de los ajustes

### Jerarquía de los ajustes

La configuración se organiza en tres niveles:

| Nivel | Alcance | Quién la configura | Dónde |
|------|-------|----------------|-------|
| **Organización** | Aplica a todos los usuarios de la organización | Administrador de la organización | `/settings/*` |
| **Funcionalidad** | Aplica a un área funcional concreta | Quien es dueño del área funcional | Dentro del área funcional |
| **Personal** | Aplica a cada usuario | Cada usuario | `/profile/*` |

### Ajustes de la organización

Se llega por la sección Configuración de la barra lateral (solo Administrador de la organización). Está organizada en grupos plegables:

```
Configuración
├── Perfil e identidad visual  # Nombre, logo, idiomas, identidad visual
├── Roles y permisos           # Plantillas de rol, ajustes de permisos
│   ├── Editor de plantillas de rol
│   └── Gestión del personal
├── Campaña                    # Período de campaña, ámbito geográfico
│   ├── Período de campaña
│   └── Ámbito geográfico
├── Cumplimiento               # Límites de contribución, avisos legales, conservación
│   ├── Límites de contribución
│   ├── Avisos legales
│   └── Conservación de datos
├── Integraciones              # Conexiones con terceros
│   ├── WhatsApp Business
│   ├── Proveedor de SMS
│   ├── Dominio de correo
│   ├── Cuentas de redes sociales
│   └── Webhooks
├── Pagos                      # Configuración del procesador de pagos
├── Seguridad                  # Cifrado, nivel de seguridad, registro de auditoría
│   ├── Gestión de llaves de cifrado
│   ├── Ajustes de seguridad
│   └── Registro de auditoría
├── Desarrolladores            # Llaves de API, webhooks
│   ├── Llaves de API
│   └── Configuración de webhooks
└── Facturación                # Suscripción, método de pago
```

### Ajustes por funcionalidad

Los ajustes acotados a un área funcional concreta se manejan dentro de esa funcionalidad, no en la configuración global:

- **Preferencias de comunicación** (gestión de consentimiento, reglas de baja) → dentro de Comunicaciones
- **Valores predeterminados de los formularios de recaudación** (montos sugeridos, opciones de recurrencia) → dentro de Recaudación de fondos
- **Guiones de campo** (guiones predeterminados, opciones de respuesta) → dentro de Campo
- **Cuentas de redes sociales** → dentro de Redes sociales (también accesibles desde Configuración > Integraciones)

Así se evita una página de configuración monolítica. Los ajustes de una funcionalidad viven donde vive la funcionalidad.

### Ajustes personales

Se llega por el menú de perfil de usuario (disponible para todo el mundo):

```
Perfil
├── Perfil personal                 # Nombre, avatar, datos de contacto
├── Preferencias de notificaciones  # Configuración de notificaciones por fuente
├── Seguridad                       # Gestión de passkeys, contactos de confianza
├── Idioma                          # Preferencia de idioma de la interfaz
└── Selector de organización        # Para quien pertenece a varias organizaciones
```

### Patrón de UX de los ajustes

Todas las pantallas de configuración comparten la misma disposición:

```
┌────────────────────────────────────────────────────────────┐
│  Configuración > [Nombre de la sección]                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ▾ [Nombre del grupo]                                      │
│    ┌──────────────────────────────────────────────────┐    │
│    │ Rótulo del ajuste             [valor / control]  │    │
│    │ Texto de ayuda que explica qué hace este ajuste  │    │
│    │                                                  │    │
│    │ Rótulo del ajuste *           [valor / control]  │    │
│    │ Texto de ayuda (ajuste obligatorio)              │    │
│    └──────────────────────────────────────────────────┘    │
│                                                            │
│  ▸ [Otro grupo]                                            │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Última modificación: 15 ene. 2026 por admin@org.org       │
│  [Cancelar]                                     [Guardar]  │
└────────────────────────────────────────────────────────────┘
```

**Comportamientos:**
- Grupos plegables — uno desplegado a la vez (patrón de acordeón)
- Texto de ayuda en cada ajuste — explicación breve de qué hace y por qué
- Seguimiento de cambios — pie con "Última modificación por X el Y"
- Aviso de cambios sin guardar — diálogo de confirmación al salir con cambios pendientes
- Validación — en línea, campo por campo, con mensajes de error claros
- Valores predeterminados sensatos — precargados donde se puede, señalados claramente como predeterminados

---

## Sistema de ayuda y soporte

### Puntos de acceso a la ayuda

Se llega a la ayuda desde varios puntos de entrada, en línea con el patrón de elementos permanentes de la interfaz:

1. **Pie de la barra lateral** (escritorio) — el enlace "Ayuda" abre el panel de ayuda
2. **Menú de usuario** (móvil) — el elemento "Ayuda y soporte"
3. **Icono "?"** — icono de ayuda flotante en las pantallas complejas; abre la ayuda contextual
4. **Estados vacíos** — enlaces "Más información" en los mensajes de estado vacío
5. **Texto de ayuda de los ajustes** — ayuda desplegable "¿Por qué es obligatorio?" en los ajustes de cumplimiento
6. **Pasos del asistente** — ayuda en línea dentro de cada paso del asistente

### Ayuda contextual

Cuando alguien hace clic en "?" o en el enlace "Ayuda" de una pantalla, el sistema busca contenido de ayuda contextual para esa pantalla:

```
┌──────────────────────────────────────────────────────────────┐
│  Ayuda: Constructor de segmentos                 [✗ Cerrar]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Los segmentos te permiten definir grupos de                 │
│  contactos a partir de criterios. Úsalos para                │
│  dirigir comunicaciones, filtrar reportes y                  │
│  asignar voluntarios.                                        │
│                                                              │
│  Inicio rápido:                                              │
│  1. Elige un campo de criterio (p. ej., "Puntaje de apoyo")  │
│  2. Fija la condición (p. ej., "mayor que 3")                │
│  3. Haz clic en "Vista previa" para ver qué contactos cruzan │
│  4. Guarda tu segmento                                       │
│                                                              │
│  [📖 Artículo completo: Crear segmentos →]                   │
│  [💬 Preguntarle al concierge de IA →]                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Escritorio:** la ayuda contextual se abre como un panel lateral desde la derecha (no tapa el contenido principal).
**Móvil:** la ayuda contextual se abre como una hoja inferior (media pantalla) o como un artículo a pantalla completa.

### Base de conocimiento

Se llega en `/help`. Una biblioteca de artículos de ayuda con búsqueda, organizada por área funcional.

```
┌──────────────────────────────────────────────────────┐
│  Centro de ayuda                                     │
├──────────────────────────────────────────────────────┤
│  [Buscar en los artículos de ayuda...]               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Primeros pasos                                      │
│  ├── Configurar tu organización                      │
│  ├── Invitar a integrantes del equipo                │
│  ├── Configurar los ajustes de cumplimiento          │
│  └── Tu primer formulario de donación                │
│                                                      │
│  Personas y CRM                                      │
│  ├── Importar padrones electorales                   │
│  ├── Crear segmentos                                 │
│  ├── Deduplicación                                   │
│  └── Calidad de datos                                │
│                                                      │
│  Trabajo de campo                                    │
│  ├── Crear campañas de trabajo de campo              │
│  ├── Cortar territorios                              │
│  ├── Crear guiones                                   │
│  └── Guía del modo de campo para voluntarios         │
│                                                      │
│  ... (más categorías)                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Comportamientos:**
- **Búsqueda** — búsqueda de texto completo en todos los artículos de ayuda. Los resultados se ordenan por relevancia.
- **Categorizada** — organizada por área funcional, siguiendo la estructura de la barra lateral.
- **Filtrada por rol** — los artículos llevan etiquetas de los arquetipos a los que sirven. Un Voluntario ve primero los artículos de voluntarios; un Administrador de la organización ve primero los de administración.
- **Multilingüe** — los artículos están disponibles en los idiomas configurados por la organización. Si no existe la traducción, cae al inglés.
- **Parcialmente sin conexión** — los artículos vistos antes quedan en caché para leerlos sin conexión.

### Concierge de IA

Se llega en `/help/chat` o por el enlace "Preguntarle al concierge de IA" de los paneles de ayuda. Un asistente conversacional de IA que responde preguntas sobre la plataforma.

```
┌──────────────────────────────────────────────────────────┐
│  Concierge de IA                              [✗ Cerrar] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ¿En qué te puedo ayudar?                                │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Tú: ¿Cómo configuro los límites de                │  │
│  │      contribución para Puerto Rico?                │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Concierge: los límites de contribución de         │  │
│  │  Puerto Rico se configuran en Configuración >      │  │
│  │  Cumplimiento > Límites de contribución. En        │  │
│  │  Puerto Rico el límite individual es de            │  │
│  │  $2,900...                                         │  │
│  │                                                    │  │
│  │  [Ir a Límites de contribución →]                  │  │
│  │  [Leer el artículo completo: Cumplimiento en PR →] │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [Escribe tu pregunta...]                    [Enviar]    │
└──────────────────────────────────────────────────────────┘
```

**Comportamientos:**
- **Consciente del contexto** — el concierge sabe en qué pantalla está la persona y puede dar orientación contextual.
- **Enlaces a acciones** — las respuestas incluyen enlaces directos a las pantallas relevantes y a los artículos de la base de conocimiento.
- **Escalamiento** — si el concierge no puede resolver la pregunta, ofrece abrir un ticket de soporte (para las organizaciones con soporte premium).
- **Requiere conexión** — no está disponible sin conexión (la inferencia de IA necesita servidor).
- **Historial de conversaciones** — las conversaciones anteriores se guardan y se consultan desde la interfaz de chat.

---

## Cambio de idioma

### Preferencia de idioma

Cada persona fija su idioma preferido para la interfaz. Esto afecta a:
- Todo el texto de la interfaz (rótulos, botones, navegación, textos de ayuda)
- Los mensajes generados por el sistema (notificaciones, mensajes de error)
- La selección de idioma de los artículos de la base de conocimiento

**No** afecta a:
- El contenido escrito por las personas (notas, mensajes y respuestas de trabajo de campo quedan en el idioma en que se escribieron)
- Los datos de los registros (el nombre y la dirección de un contacto se guardan tal como se ingresaron)
- Los avisos legales de cumplimiento (se configuran por jurisdicción, no por idioma del usuario)

### Ubicación del selector de idioma

- **Escritorio:** desde el pie de la barra lateral y desde el menú de perfil de usuario.
- **Móvil:** desde el menú de perfil de usuario.

### Comportamiento del cambio

```
┌──────────────────────────────────────┐
│  Idioma                              │
│                                      │
│  ● English                           │
│  ○ Español                           │
│  ○ Português                         │
│  ○ ไทย                               │
│  ○ हिन्दी                              │
│  ○ العربية                           │
│                                      │
│  Los idiomas disponibles los define  │
│  tu organización.                    │
└──────────────────────────────────────┘
```

- **Cambio inmediato** — al elegir un idioma la interfaz se actualiza al instante (no hace falta recargar la página — la reactividad de SvelteKit se encarga)
- **Persistente** — la preferencia de idioma se guarda en el perfil (del lado del servidor), así que se mantiene entre dispositivos
- **Idiomas disponibles** — los determina la configuración de la organización (no todos los idiomas están disponibles para toda organización)
- **Manejo de RTL** — al elegir árabe (`العربية`) toda la maquetación se voltea a RTL (la barra lateral se va a la derecha, la alineación del texto se invierte, los iconos direccionales se reflejan)

---

## Flujos de incorporación

### Experiencia del primer inicio

La primera vez que alguien inicia sesión ve una bienvenida breve, propia de su rol:

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ¡Te damos la bienvenida a GreenGrass, Maria!        │
│                                                      │
│  Estás configurada como Directora de campo.          │
│  Aquí es donde empezar:                              │
│                                                      │
│  1. Configura tu primera campaña de trabajo de campo │
│  2. Corta territorios para tus voluntarios           │
│  3. Crea un guion de trabajo de campo                │
│                                                      │
│  [Empezar]            [Explorar por mi cuenta]       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Primeras acciones por arquetipo:**

| Arquetipo | Primeras acciones |
|---------|--------------|
| Administrador de la organización | Completar el asistente de configuración de la organización → configurar el cumplimiento → invitar al personal |
| Director de comunicaciones | Conectar el dominio de correo → crear la primera plantilla de correo → construir un segmento |
| Director de finanzas | Configurar el procesador de pagos → configurar los límites de contribución → crear el primer formulario de donación |
| Director de campo | Crear la primera campaña de trabajo de campo → cortar territorios → construir un guion |
| Coordinador de voluntarios | Configurar los módulos de capacitación → crear la incorporación de voluntarios → crear el primer evento |
| Gestor de datos | Importar el padrón electoral → revisar la cola de deduplicación → verificar la calidad de los datos |
| Voluntario | Completar el asistente de incorporación → ver el primer turno → empezar la capacitación |
| Líder de equipo | Lo mismo que el Voluntario, más: ver tu equipo |
| Candidato | Revisar el panel → configurar el perfil público → revisar las aprobaciones pendientes |
| Simpatizante | Revisar el perfil → revisar el historial de donaciones → actualizar las preferencias |

### Flujos de los asistentes de incorporación

Los flujos detallados de los asistentes están definidos en el inventario de pantallas (WIZ-001 a WIZ-008). Patrones de UX clave:

- **El asistente reemplaza la barra lateral** — mientras dura el asistente, la barra lateral muestra los nombres de sus pasos en vez de la navegación normal
- **Indicador de progreso** — paso N de M, con lo completado, lo actual y lo que falta a la vista
- **Guardar y salir** — se puede salir y retomar después (el avance se guarda del lado del servidor)
- **Validación por paso** — cada paso valida antes de dejar avanzar
- **Celebración al terminar** — el último paso muestra un mensaje de éxito con acciones siguientes claras
- **Lista de verificación posterior** — al terminar un asistente, el panel muestra una lista "Primeros pasos" con las tareas de configuración que quedan

### Revelación progresiva en los ajustes

Para la configuración inicial, la plataforma usa revelación progresiva:

1. **Primero lo obligatorio** — los ajustes que exige el cumplimiento (límites de contribución, avisos legales) se presentan dentro del asistente
2. **Lo recomendado, destacado** — los ajustes opcionales pero recomendados se destacan en el panel de configuración con un distintivo de "Recomendado"
3. **Lo avanzado, oculto** — los ajustes de uso poco frecuente (llaves de API, webhooks, conservación del registro de auditoría) van en secciones plegadas

---

## Globos de ayuda y ayuda en línea

### Patrón de globo de ayuda

Ayuda contextual breve, pegada a un elemento concreto de la interfaz:

```
┌─────────────────────────────────────┐
│  Puntaje de apoyo [?]   [4 ▾]       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Un puntaje del 1 al 5 que   │    │
│  │ indica qué tan probable es  │    │
│  │ que este contacto apoye a   │    │
│  │ tu candidatura o causa.     │    │
│  │                             │    │
│  │ 5 = Simpatizante firme      │    │
│  │ 1 = Opositor firme          │    │
│  │                             │    │
│  │ [Más información →]         │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Comportamientos:**
- **Disparador** — pasar el cursor (escritorio) o tocar (móvil) el icono "?"
- **Descartar** — hacer clic o tocar afuera, o moverse a otro elemento
- **Enlace** — "Más información" lleva al artículo correspondiente de la base de conocimiento
- **Posicionamiento** — el globo de ayuda aparece encima o debajo del elemento, nunca tapando el campo que describe
- **Sin globos de ayuda en móvil para lo esencial** — si la información es esencial, tiene que verse en línea en móvil, no escondida detrás de un área táctil

### Texto de ayuda en formularios

Texto de ayuda fijo debajo de los campos de formulario complejos:

```
│  Límite de contribución *    [$2,900    ]  │
│  Contribución individual máxima por ciclo  │
│  electoral en tu jurisdicción.             │
│  [¿Por qué es obligatorio? →]              │
```

- Siempre visible (no al pasar el cursor)
- Breve — una línea de preferencia, dos como máximo
- Con enlaces a explicaciones detalladas donde haga falta

---

## Atajos de teclado

### Atajos disponibles

| Atajo | Acción | Contexto |
|----------|--------|---------|
| `/` o `Cmd+K` | Poner el foco en la búsqueda global | Cualquier pantalla |
| `Esc` | Cerrar modal, panel o búsqueda | Cualquier pantalla |
| `?` | Abrir la referencia de atajos de teclado | Cualquier pantalla |
| `G luego D` | Ir al panel | Marco de la app |
| `G luego M` | Ir a Mensajes | Marco de la app |
| `G luego P` | Ir a Personas | Marco de la app |
| `G luego S` | Ir a Configuración | Marco de la app (Administrador de la organización) |
| `N` | Nuevo (según el contexto: contacto nuevo, evento nuevo, etc.) | Vistas de lista |
| `J` / `K` | Subir y bajar en las listas | Vistas de lista |
| `Enter` | Abrir el elemento seleccionado | Vistas de lista |

### Descubrimiento de los atajos

- **Tecla "?"** — abre una superposición con la referencia de atajos
- **Pista la primera vez** — en la primera visita aparece una pista discreta: "Presiona ? para ver los atajos de teclado"
- **No son críticos** — los atajos son para usuarios avanzados. La plataforma funciona por completo sin ellos.

---

## Preguntas abiertas

1. **Anuncios dentro de la app.** ¿Debería la plataforma tener un mecanismo para anuncios a nivel de plataforma (funcionalidades nuevas, ventanas de mantenimiento, avisos de seguridad)? Aparecerían como un banner o una notificación, distintos de las notificaciones entre usuarios.

2. **Recorridos guiados.** Más allá de la bienvenida del primer inicio, ¿debería la plataforma ofrecer recorridos guiados de funcionalidades concretas? ("Nuevo: programación de publicaciones en redes sociales — ¿quieres un recorrido rápido?") Pueden ayudar, pero también molestar. Considerar que solo se activen a petición.

3. **Retroalimentación sobre los artículos de ayuda.** ¿Deberían los artículos de la base de conocimiento tener un mecanismo de "¿Te sirvió esto?"? Es útil para mejorar la documentación, pero añade complejidad a la interfaz.

<!-- REVISIT: El contenido de la base de conocimiento hay que escribirlo a medida que se construyan las funcionalidades. Este documento define los patrones para acceder a la ayuda y mostrarla, no el contenido en sí. -->
