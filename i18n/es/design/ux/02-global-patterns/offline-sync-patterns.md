# Patrones sin conexión y de sincronización

## Propósito

Este documento define cómo la plataforma comunica el estado de la conexión, la actualidad de los datos, el progreso de la sincronización y la resolución de conflictos. El funcionamiento sin conexión es una funcionalidad de pleno derecho, no una alternativa de reserva degradada: estos patrones tienen que hacer que trabajar sin conexión se sienta natural y confiable.

El objetivo de diseño: una voluntaria que va tocando puertas con conectividad intermitente nunca debería preguntarse "¿mis datos están al día?" ni "¿se guardó mi trabajo?". La interfaz tiene que responder las dos preguntas de un vistazo, en todo momento.

## Estados de conexión

La plataforma reconoce cinco estados de conexión. El tratamiento en la interfaz cambia según el contexto (app estándar frente a modo de campo).

### Definición de los estados

| Estado | Condición | Duración |
|-------|-----------|----------|
| **Conectado** | Conexión en tiempo real con el servidor. Sincronización activa. | Operación normal |
| **Conectado (desactualizado)** | Hay conexión, pero la última sincronización correcta fue hace más de 5 min | Transitorio: suele resolverse rápido |
| **Sincronizando** | Sincronizando datos activamente (subida o bajada) | Breve: de segundos a ~1 minuto |
| **Sin conexión** | Sin conexión con el servidor. Operación solo local. | De minutos a horas |
| **Error de sincronización** | Hay conexión, pero la sincronización falla | Hasta que se resuelva o se reintente |

### Indicador en la app estándar

En la barra superior, un indicador compacto muestra el estado actual:

```
Conectado:                [●]                                      (punto verde, sin texto — predeterminado discreto)
Desactualizado:           [● Última sincronización: hace 8 min]    (punto ámbar + marca de tiempo)
Sincronizando:            [↻]                                      (icono de sincronización animado, breve)
Sin conexión:             [◌ Sin conexión]                         (punto gris + rótulo, permanente)
Error de sincronización:  [⚠ Sincronización fallida · Reintentar]  (icono rojo + enlace de acción)
```

Al tocar el indicador, en cualquier estado, se abre un panel de detalle de sincronización que muestra:
- La hora de la última sincronización correcta
- El número de cambios locales pendientes (en cola para subir)
- El progreso de la sincronización en curso (si está sincronizando)
- El detalle del error (si está en estado de error)
- El disparador manual "Sincronizar ahora"

### Indicador en el modo de campo

En el modo de campo, el indicador de sincronización es más grande y más visible: los datos desactualizados durante el trabajo de campo son peligrosos en la operación (puedes tocar una puerta que otro voluntario ya tocó).

```
Conectado:                [● Sincronizado hace 30 s]               (verde, con la marca de tiempo siempre visible)
Desactualizado:           [● Sincronizado hace 12 min]             (ámbar, más urgente a medida que pasa el tiempo)
Sincronizando:            [↻ Sincronizando...]                     (animado, barra de ancho completo)
Sin conexión:             [◌ Sin conexión · 47 min]                (gris, con el tiempo transcurrido sin conexión)
Error de sincronización:  [⚠ Sincronización fallida · Reintentar]  (rojo, barra de ancho completo, imposible de ignorar)
```

**Por qué la marca de tiempo siempre está visible en el modo de campo:** en la app estándar, "conectado" no necesita anotación — la persona usuaria confía en que la app está al día. En el modo de campo, el voluntario necesita saber *cuán* al día. "Sincronizado hace 30 segundos" frente a "sincronizado hace 12 minutos" es la diferencia entre una lista de recorrido fiable y otra con asignaciones posiblemente desactualizadas.

---

## Actualidad de los datos

### Indicadores de actualidad en los registros

Al ver registros que pueden estar desactualizados (en caché desde una sincronización anterior), la interfaz muestra un indicador de actualidad:

```
┌────────────────────────────────────────────────────┐
│  Ana Martínez                                      │
│  Última actualización: hace 2 horas  [↻ Actualizar]│
│                                                    │
│  Teléfono: (787) 555-0123                          │
│  Dirección: Calle Sol 45, San Juan                 │
│  Puntaje de apoyo: 4                               │
│  Último contacto: 15 de ene. (trabajo de campo)    │
└────────────────────────────────────────────────────┘
```

**Reglas:**
- Registros actualizados dentro del último ciclo de sincronización: sin indicador de actualidad (están al día)
- Registros con más de 1 hora desde la última actualización: marca de tiempo discreta ("Última actualización: hace 2 horas")
- Registros con más de 24 horas desde la última actualización: indicador ámbar ("Los datos pueden estar desactualizados")
- Registros con más de 7 días desde la última actualización: advertencia destacada ("Datos desactualizados: hay que sincronizar")

### Actualidad en el modo de campo

Los registros de la lista de recorrido en el modo de campo muestran la actualidad de otra manera: el estado de la asignación importa más que la antigüedad del registro:

- **Asignado a ti, sincronizado hace poco:** sin indicador (confía en la asignación)
- **Asignado a ti, pero otro voluntario puede haber pasado desde la última sincronización:** distintivo ámbar ("Puede que ya lo hayan visitado: verifica antes de tocar")
- **Reasignado desde tu última sincronización:** distintivo rojo ("Ya no está en tu lista: sáltalo"), con la actualización real aplicada en la siguiente sincronización

---

## Cola de cambios pendientes

Cuando la persona usuaria hace cambios sin conexión (registrar una interacción de trabajo de campo, redactar un mensaje, actualizar un contacto), los cambios se guardan localmente y quedan en cola para sincronizar.

### Indicador de la cola

El panel de detalle de sincronización muestra los cambios pendientes:

```
┌───────────────────────────────────────────────┐
│  Cambios pendientes (7)                       │
│                                               │
│  3 interacciones de trabajo de campo          │
│  2 actualizaciones de contactos               │
│  1 mensaje (en cola)                          │
│  1 registro de entrada a un evento            │
│                                               │
│  Estos cambios se subirán cuando              │
│  vuelvas a tener conexión.                    │
│                                               │
│  [Sincronizar ahora]  (atenuado sin conexión) │
└───────────────────────────────────────────────┘
```

### Iconos de estado de los cambios

Cada cambio pendiente muestra su estado:

| Icono | Estado | Significado |
|------|--------|---------|
| ◌ | Pendiente | Guardado localmente, esperando conexión |
| ↻ | Subiendo | Se está enviando al servidor |
| ✓ | Sincronizado | Subido correctamente |
| ⚠ | Conflicto | El servidor tiene una versión más nueva: hay que resolverlo |
| ✗ | Fallido | Falló la subida: se reintentará |

### Indicadores en contexto

Los registros con cambios locales pendientes muestran un indicador discreto en las vistas de lista y de detalle:

```
│  Ana Martínez        ◌ Editado localmente  │
```

Esto le dice a la persona usuaria: "Tus cambios están guardados en este dispositivo, pero todavía no llegaron al servidor". Es informativo, no alarmante: los cambios locales son el estado normal cuando se trabaja sin conexión.

---

## Comportamiento de la sincronización

### Sincronización automática

Cuando hay conexión, la app sincroniza automáticamente:
- **Al abrir la app:** sincronización completa de todos los cambios desde la última sesión
- **En segundo plano:** sincronización incremental cada 60 segundos (app estándar) o cada 30 segundos (modo de campo)
- **Tras una acción significativa:** intento de sincronización inmediato después de crear o actualizar un registro (si hay conexión)
- **Al recuperar la conexión:** sincronización completa al pasar de sin conexión a con conexión

### Sincronización manual

Hay una acción "Sincronizar ahora" disponible:
- En el panel de detalle de sincronización (tocando el indicador de sincronización)
- En el modo de campo, como botón en el encabezado de campo
- Deslizar para actualizar en las vistas de lista dispara una sincronización

### Progreso de la sincronización

Durante una sincronización con un volumen de datos considerable (sincronización inicial, sincronización masiva después de un período sin conexión), se muestra el progreso:

```
┌────────────────────────────────────────────────┐
│  Sincronizando...                              │
│  ████████████░░░░░░  67%                       │
│  Subiendo 5 de 7 cambios                       │
│  Descargando la lista de recorrido actualizada │
└────────────────────────────────────────────────┘
```

En las sincronizaciones incrementales de rutina (pequeñas y rápidas) no hay indicador de progreso: solo el breve icono animado de sincronización en el encabezado.

---

## Resolución de conflictos

Los conflictos ocurren cuando el mismo registro se modifica localmente y en el servidor antes de una sincronización. La arquitectura de event sourcing (el estado se deriva de un registro inmutable de eventos) descrita en system.md resuelve la mayoría de los conflictos automáticamente, pero algunos necesitan la atención de la persona usuaria.

### Resolución automática

El servidor resuelve la mayoría de los conflictos con reglas propias del dominio:
- **Gana la última escritura** en los campos simples (número de teléfono, dirección, estado)
- **Fusión aditiva** en el historial de interacciones (las respuestas del trabajo de campo nunca se pierden: se conservan las dos versiones)
- **Gana el servidor** en los cambios de asignación (si un territorio se reasigna, la asignación del servidor tiene prioridad)
- **Gana el cliente** en el trabajo de campo en curso (si un voluntario está a mitad de turno, sus datos locales tienen prioridad hasta que termina el turno)

### Conflictos que ve la persona usuaria

Poco frecuentes, pero posibles. Cuando la resolución automática no basta, la persona usuaria ve una notificación de conflicto:

```
┌──────────────────────────────────────────────────────────┐
│  ⚠ Conflicto de sincronización                           │
│                                                          │
│  Contacto: Ana Martínez                                  │
│  Otra persona actualizó el número de                     │
│  teléfono mientras estabas sin conexión.                 │
│                                                          │
│  Tu versión:           (787) 555-0123                    │
│  Versión del servidor: (787) 555-0456                    │
│                                                          │
│  [Quedarme con la mía]  [Quedarme con la suya]  [Ambas]  │
└──────────────────────────────────────────────────────────┘
```

**Reglas para presentar los conflictos:**
- Mostrar solo los conflictos que la persona usuaria puede resolver de verdad (no mostrar los conflictos a nivel de sistema)
- Optar por defecto por la opción más segura (ante la duda, conservar las dos versiones y dejar que una persona lo resuelva)
- Los conflictos quedan en cola en el sistema de notificaciones y persisten hasta resolverse
- Nunca impedir que la persona usuaria siga trabajando mientras haya conflictos pendientes

---

## Funcionalidades disponibles sin conexión

### Matriz de disponibilidad de funcionalidades

| Funcionalidad | Con conexión | Sin conexión | Notas |
|---------|--------|---------|-------|
| Modo de campo (trabajo de campo) | Completa | Completa | La lista de recorrido se descarga antes de iniciar el turno |
| Modo de campo (inscripción de votantes) | Completa | Completa | Los formularios funcionan localmente; el envío queda en cola |
| Modo de campo (puerta a puerta de GOTV) | Completa | Completa | Igual que el trabajo de campo |
| Registro de entrada a eventos | Completa | Completa | La lista de asistentes se descarga por adelantado |
| Leer mensajes | Completa | En caché | Muestra los mensajes ya sincronizados |
| Redactar mensajes | Completa | En cola | Se redactan localmente y se envían al sincronizar |
| Ver contactos | Completa | En caché | Solo lectura, contactos ya sincronizados |
| Ver turnos | Completa | En caché | Horario de turnos ya sincronizado |
| Módulos de capacitación | Completa | En caché | Disponibles los módulos ya vistos |
| Solicitud de transporte | Completa | En cola | La solicitud se crea localmente y se envía al sincronizar |
| Reporte de problemas del observador electoral | Completa | En cola | El reporte queda en cola localmente |
| Registro de donaciones en efectivo | Completa | En cola | Se registra localmente con recibo |
| Paneles | Completa | No disponible | Requiere agregación en el servidor |
| Configuración y ajustes | Completa | No disponible | Requiere validación del servidor |
| Constructores (correo, formularios, etc.) | Completa | No disponible | Dependencias complejas del lado del servidor |
| Búsqueda | Completa | Limitada | Solo puede buscar en los datos locales en caché |
| Jornada de llamadas | Completa | No disponible | Requiere conectividad para llamar |
| Importación/exportación de datos | Completa | No disponible | El manejo de archivos requiere servidor |
| Publicación en redes sociales | Completa | No disponible | Requiere conectividad con las API |

### Presentación de las funcionalidades sin conexión

Según el modelo de navegación (navigation-model.md), las funcionalidades no disponibles sin conexión aparecen **atenuadas, con un distintivo de sin conexión**, no ocultas. Al tocar un elemento atenuado se muestra:

```
┌───────────────────────────────────────────┐
│  ◌  Requiere conexión                     │
│                                           │
│  Ahora mismo estás sin conexión. Esta     │
│  funcionalidad estará disponible cuando   │
│  te vuelvas a conectar.                   │
│                                           │
│  Mientras tanto puedes:                   │
│  • Ver los contactos en caché             │
│  • Leer los mensajes sincronizados        │
│  • Continuar tu turno de trabajo de campo │
│                                           │
│  [Descartar]                              │
└───────────────────────────────────────────┘
```

La sección "Mientras tanto puedes" redirige la atención hacia lo que sí está disponible: nunca hay que dejar a la persona usuaria en un callejón sin salida.

---

## Precarga y caché

### Precarga del turno

Cuando un voluntario toca "Iniciar turno", la app descarga todo lo necesario para el turno antes de entrar al modo de campo:

1. La lista de recorrido (los registros de votantes del territorio asignado)
2. Las teselas de mapa del área del territorio
3. El guion y las opciones de respuesta
4. La lista del equipo (para los líderes de equipo)

El progreso se muestra así:

```
┌────────────────────────────────────┐
│  Preparando tu turno...            │
│                                    │
│  ✓ Lista de recorrido (47 puertas) │
│  ✓ Teselas de mapa                 │
│  ↻ Guion y formularios...          │
│  ○ Lista del equipo                │
│                                    │
│  ████████████████░░░  82%          │
│                                    │
│  [Cancelar]                        │
└────────────────────────────────────┘
```

**Si se cae la conexión durante la precarga:** la precarga se reanuda cuando vuelve la conexión. Si el voluntario no puede esperar, puede iniciar el turno con los datos que se hayan descargado (con una advertencia sobre los datos incompletos).

### Caché en segundo plano

La app guarda en caché de forma proactiva los datos que la persona usuaria probablemente vaya a necesitar:
- **Mensajes:** las últimas 100 conversaciones, sincronizadas de forma incremental
- **Contactos:** los contactos vistos hace poco (los últimos 50)
- **Turnos:** los próximos 7 días del horario de turnos
- **Capacitación:** los módulos ya empezados
- **Eventos:** los próximos eventos con confirmación de asistencia

La caché se gestiona automáticamente: los datos más antiguos se desalojan cuando se alcanzan los límites de almacenamiento. La persona usuaria nunca gestiona la caché a mano.

### Caché de teselas de mapa

Las teselas de mapa para uso sin conexión se guardan en caché de dos maneras:
- **Automática:** al precargar un turno se descargan las teselas del área del territorio
- **Proactiva:** si el voluntario tiene Wi-Fi, las teselas de todos sus territorios próximos se descargan por adelantado en segundo plano

El tamaño de la caché de teselas está acotado (configurable, ~200 MB por defecto) para no llenar el almacenamiento de los celulares de gama baja.

---

## Ritmo de sincronización y batería

### Adaptación a la batería

En móvil, la frecuencia de sincronización se adapta al nivel de batería:
- **Batería >50 %:** intervalo de sincronización normal (30 s en modo de campo, 60 s en la app estándar)
- **Batería 20-50 %:** intervalo reducido (60 s en modo de campo, 120 s en la app estándar)
- **Batería <20 %:** sincronización mínima (solo manual, o cada 5 minutos para los datos críticos del modo de campo)

A la persona usuaria nunca se le avisa de esta adaptación: ocurre en silencio. El único efecto visible es que la marca de tiempo de la última sincronización se actualiza con menos frecuencia cuando queda poca batería.

### Adaptación al consumo de datos

Para quienes usan conexiones con límite de datos (habituales en las geografías objetivo):
- La sincronización inicial y la precarga del turno muestran el tamaño estimado ("Esto usará aproximadamente 15 MB")
- La sincronización en segundo plano usa el mínimo de ancho de banda (solo diferencias, comprimidas)
- La descarga de teselas de mapa es opcional y muestra advertencias de tamaño en las conexiones con límite de datos

---

## Ciclo de vida del turno y sincronización

Un turno de trabajo de campo tiene un ciclo de vida de sincronización propio:

1. **Antes del turno:** descarga completa de la lista de recorrido, las teselas de mapa y el guion. Estado de sincronización: "Listo".
2. **Durante el turno:** cada interacción completada se guarda localmente de inmediato. La sincronización en segundo plano sube las interacciones completadas cada 30 segundos cuando hay conexión. Sin conexión, las interacciones se acumulan localmente.
3. **Pausa del turno:** si el voluntario hace una pausa, la sincronización sigue en segundo plano. Al reanudar, se retoma donde quedó.
4. **Fin del turno:** el voluntario toca "Terminar turno". La app intenta una sincronización final de todos los datos restantes. Sin conexión, muestra: "Tienes X interacciones sin subir. Se subirán cuando vuelvas a tener conexión. Puedes cerrar la app sin problema".
5. **Después del turno:** aviso de balance del turno (horas, notas, problemas). Se sincroniza cuando se puede. El turno queda "cerrado" localmente aunque el balance todavía no se haya sincronizado.
6. **Salida anormal:** la app se cae o el dispositivo se apaga. En el siguiente arranque, el turno se retoma en la última posición guardada. No se pierden datos: cada interacción se persiste localmente en el momento en que se registra.

---

## Recuperación ante errores

### Estrategia de reintentos de sincronización

Las sincronizaciones fallidas se reintentan con espera exponencial:
- Primer reintento: inmediato
- Segundo reintento: a los 30 segundos
- Tercer reintento: a los 2 minutos
- Reintentos siguientes: cada 5 minutos
- Tras 10 fallos: se detiene el reintento automático y se muestra un error permanente con un botón manual "Reintentar"

### Salvaguardas de integridad de los datos

- **Los datos locales nunca se borran hasta confirmar que se sincronizaron.** La app conserva copias locales de todas las interacciones hasta que el servidor acusa recibo.
- **Acuses de recibo de sincronización.** El servidor devuelve un acuse por cada evento sincronizado. Solo después de confirmarlo se marca la copia local como sincronizada.
- **Sincronización idempotente.** Si el mismo evento se envía dos veces (por ejemplo, tras un tiempo de espera agotado en el que el servidor lo recibió pero el cliente no recibió el acuse), el servidor deduplica. Las interacciones no se cuentan dos veces.

---

## Preguntas abiertas

1. **Notificación de sincronización al reconectar.** Cuando alguien vuelve a tener conexión después de un uso prolongado sin ella, ¿la app debería mostrar una notificación que resuma lo que se sincronizó? ("Volviste a tener conexión. Se subieron 23 interacciones y la lista de recorrido se actualizó con 3 cambios"). Es útil, pero puede volverse ruidoso.

2. **Monitoreo de la frecuencia de conflictos.** ¿La plataforma debería seguir la tasa de conflictos por territorio y por equipo para detectar problemas operativos? Una tasa alta puede indicar asignaciones solapadas o una distribución de datos desactualizada: problemas que necesitan intervención humana, no solo patrones de interfaz.

3. **Límites de duración sin conexión.** ¿Debería haber una duración máxima sin conexión a partir de la cual la lista de recorrido se considere demasiado desactualizada para usarse? Si un voluntario no sincroniza en 24 horas, su lista de recorrido puede estar completamente equivocada. ¿La app debería advertir o bloquear?

<!-- REVISIT: Los tamaños exactos de datos para la precarga (lista de recorrido + teselas de mapa + guion) hay que medirlos contra volúmenes de datos reales una vez implementado el modelo de datos. El límite de 200 MB para la caché de teselas y las estimaciones de la precarga del turno son valores provisionales. -->
