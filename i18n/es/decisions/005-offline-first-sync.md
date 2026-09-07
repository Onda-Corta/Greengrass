# ADR-005: Prioridad sin conexión y sincronización

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `design/architecture/system.md`, `spec/workflows.md`, `design/ux/02-global-patterns/offline-sync-patterns.md`

## Contexto

Las operaciones de campo centrales de GreenGrass —trabajo de campo, inscripción de votantes, registro de entrada en eventos, puerta a puerta de GOTV (Get Out The Vote — movilización del voto)— ocurren en lugares con mala conectividad o sin ninguna: zonas rurales, eventos al aire libre, barrios urbanos densos con cobertura irregular. Son además los flujos de trabajo más sensibles al tiempo de toda la plataforma. Un voluntario parado frente a una puerta no puede esperar una petición de red. Una jornada de inscripción de votantes en una plaza de mercado rural no puede detenerse por la conectividad. En esas rutas críticas, la plataforma tiene que funcionar de forma confiable sin ninguna conexión de red.

Al mismo tiempo, los datos capturados sin conexión tienen que sincronizarse tarde o temprano con el servidor, y que varios dispositivos capturen datos sobre los mismos registros sin conexión genera conflictos que hay que resolver sin perder datos.

## Decisión

### Prioridad sin conexión en las operaciones de campo

El trabajo de campo, la inscripción de votantes, el registro de entrada en eventos y el puerta a puerta de GOTV funcionan por completo sin conexión: están diseñados para funcionar sin conexión primero (offline-first). Los datos se capturan localmente en el dispositivo, cifrados con SQLCipher, y se sincronizan con el servidor cuando hay conectividad. Las listas de recorrido, las teselas de mapa, los guiones de trabajo de campo y los formularios de inscripción de votantes se descargan por adelantado al comenzar el turno. Un voluntario puede completar un turno de campo entero sin conectarse nunca a la red.

Los flujos de trabajo que no son de campo (paneles, comunicaciones, recaudación de fondos, informes) requieren conectividad y se degradan de forma controlada cuando no hay conexión: las funcionalidades quedan atenuadas y con un distintivo de sin conexión, nunca ocultas.

**Alternativas consideradas:** Se descartó la prioridad en línea con caché porque falla por completo cuando la conectividad se cae en medio de una operación de campo, que es lo normal en los entornos objetivo. Se descartó el funcionamiento sin conexión para todas las funcionalidades por ser alcance innecesario: los flujos de trabajo administrativos no ganan nada con poder operar sin conexión y aumentarían mucho la complejidad.

### Event sourcing para el protocolo de sincronización

El protocolo de sincronización se basa en event sourcing (el estado se deriva de un registro inmutable de eventos): cada cambio de datos se captura como un evento inmutable (quién cambió qué, cuándo y desde qué dispositivo). Los eventos se guardan localmente y se reproducen contra el servidor cuando hay conexión. Esto aporta tres capacidades a la vez:

1. **Sincronización sin conexión** — los eventos se acumulan localmente y se sincronizan por lotes cuando hay conexión
2. **Registro de auditoría** — el registro de eventos es el registro de auditoría, no un sistema aparte
3. **Detección de conflictos** — los eventos de distintos dispositivos se pueden comparar para identificar conflictos

Los eventos se sincronizan en orden cronológico con garantías de idempotencia: reproducir el mismo evento dos veces no tiene ningún efecto. El protocolo de sincronización maneja las conexiones interrumpidas de forma controlada.

**Alternativas consideradas:** Se consideró la sincronización basada en CRDT, pero se descartó por ser sobreingeniería para este dominio: la mayoría de los campos de datos de campaña no ganan nada con la resolución automática de conflictos y, además, el requisito de registro de auditoría obliga a tener registros de evento explícitos de todas formas. Se descartó el simple *gana la última escritura* porque descarta datos en silencio.

### Actualización híbrida de la lista de recorrido: push y pull

Durante las operaciones de GOTV, el servidor envía en tiempo real las actualizaciones de la lista de recorrido a los dispositivos conectados (quitando a los votantes de quienes ya se confirmó el voto). Los voluntarios pueden deslizar para actualizar como alternativa de reserva cuando la conectividad es intermitente. Las entradas desactualizadas se marcan visualmente con un indicador de actualidad que muestra el tiempo transcurrido desde la última sincronización.

Así se equilibra la necesidad de listas de recorrido al día el día de elecciones —donde los datos desactualizados hacen perder tiempo con votantes que ya votaron— con la realidad de que la conectividad en el campo no es confiable.

### Cinco estados de conectividad, con tratamiento propio en el modo de campo

La plataforma distingue cinco estados de conectividad: Conectado, Desactualizado, Sincronizando, Sin conexión y Error. Cada estado tiene un tratamiento de interfaz distinto, que varía según el contexto:

- **Aplicación estándar:** "Conectado" no necesita anotación; los problemas se van mostrando de forma progresiva
- **Modo de campo:** las marcas de tiempo de sincronización siempre están visibles, porque los datos desactualizados son operativamente peligrosos. Las advertencias ganan urgencia a medida que crece el tiempo sin conexión (ámbar a partir de los 12 minutos)

Los indicadores de actualidad de los datos muestran cuándo se sincronizó cada registro por última vez: los registros con más de 1 hora de desactualización llevan marcas de tiempo discretas, los de más de 24 horas llevan advertencias en ámbar y los de más de 7 días llevan advertencias destacadas de "sincronización requerida". Los cambios locales pendientes muestran su estado de sincronización: pendiente, subiendo, sincronizado, en conflicto o fallido.

La sincronización consciente de la batería adapta su frecuencia al nivel de carga (normal por encima del 50%, reducida entre 20% y 50%, mínima por debajo del 20%) sin que el usuario lo vea.

## Consecuencias

**Beneficios:**
- Los voluntarios de campo pueden trabajar de forma confiable sin importar la conectividad: ningún flujo de trabajo se interrumpe
- El event sourcing unifica sincronización, auditoría y detección de conflictos en un solo mecanismo
- La actualización de listas de recorrido con push y pull mantiene los datos de GOTV tan al día como permita la conectividad
- El modelo de cinco estados de conectividad evita que un voluntario trabaje sin saberlo con datos peligrosamente desactualizados
- La sincronización consciente de la batería alarga la carga del dispositivo durante los turnos de campo largos

**Costos:**
- La prioridad sin conexión aumenta mucho la complejidad del lado del cliente (base de datos local, cifrado, motor de sincronización, interfaz de conflictos)
- El event sourcing genera más almacenamiento que el CRUD tradicional: cada cambio es un evento, no una mutación
- Descargar por adelantado listas de recorrido, teselas de mapa y guiones al comenzar el turno exige un ancho de banda y un almacenamiento en el dispositivo nada triviales (con un tope de ~200 MB para las teselas de mapa)
- La resolución de conflictos, incluso con reglas automáticas para los campos no conflictivos, exige capacidad del Gestor de datos para los conflictos marcados

**Restricciones:**
- El almacenamiento local tiene que estar cifrado (SQLCipher) y borrarse al terminar la sesión
- La sincronización tiene que ser idempotente: una sincronización interrumpida tiene que poder reanudarse sin riesgo
- La caché de teselas de mapa tiene que caber en los límites de almacenamiento de los celulares Android de gama baja
- El día de elecciones, la sincronización tiene que priorizar las actualizaciones del estado de los votantes por encima de cualquier otro tipo de evento

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (cifrado en el dispositivo, minimización de datos), [ADR-004](004-data-model-integrity.md) (resolución de conflictos con fusionar y marcar, el event sourcing como registro de auditoría), [ADR-006](006-field-operations-gotv.md) (actualización de la lista de recorrido en GOTV, prioridad de sincronización el día de elecciones)
