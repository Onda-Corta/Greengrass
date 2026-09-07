# ADR-006: Operaciones de campo y GOTV

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/gotv.md`, `spec/workflows.md`, `design/ux/04-wireframes/field-mode/field-mode.md`, `design/ux/03-design-system/foundations.md`

## Contexto

Las operaciones de campo —trabajo de campo, jornadas de inscripción de votantes, jornadas de llamadas y GOTV (Get Out The Vote — movilización del voto)— son los flujos de trabajo más intensos de la plataforma. El día de elecciones, en particular, comprime toda la actividad de campaña en unas pocas horas con plazos fijos (los centros de votación cierran). Estos flujos de trabajo exigen una interfaz hecha a propósito, optimizada para usarse con una sola mano en el celular mientras se camina, con iluminación variable y conectividad poco confiable. La interfaz estándar de la plataforma, diseñada para escritorio y uso móvil general, es demasiado compleja y tiene áreas táctiles demasiado pequeñas para las condiciones de campo.

Las operaciones de GOTV también exigen que la plataforma tome decisiones de asignación de recursos en tiempo real: mover a quienes tocan puertas de zonas de alta participación a zonas de baja participación, enrutar las solicitudes de transporte a los conductores cercanos y manejar las oleadas de comunicación hacia los simpatizantes que todavía no han votado.

## Decisión

### Constructor automático del universo GOTV

La plataforma genera el universo GOTV automáticamente a partir de criterios configurables: umbrales de puntaje de apoyo, filtros de historial de voto, filtros geográficos. El equipo de campaña revisa, ajusta segmentos, añade o quita votantes y lo cierra. Esto reduce el trabajo manual de armar la lista objetivo y da consistencia, sin quitarle a las personas el control del universo final.

Los datos de participación electoral (voto adelantado, reportes de quienes tocan puertas, confirmaciones de las jornadas de llamadas, autorreportes de votantes) retroalimentan el universo con confirmaciones ponderadas por confianza: los datos oficiales de la elección sacan al votante de las listas de contacto por completo, mientras que los reportes de campo y de llamadas lo despriorizan sin sacarlo del todo (porque tienen menos certeza).

**Alternativas consideradas:** Armar el universo de forma totalmente manual se descartó porque es propenso a errores a escala y gasta tiempo del equipo en trabajo mecánico. Automatizarlo sin revisión se descartó porque el equipo de campaña entiende matices políticos que el algoritmo no capta.

### Integración de datos electorales lista para API, pero manual primero

Los puntos de integración con las comisiones electorales se diseñan como puntos de conexión para adaptadores, pero todos los países arrancan con flujos de trabajo manuales (subida y descarga de archivos). Las integraciones por API se construyen solo cuando un piloto concreto lo exige. Las API de las comisiones electorales son escasas, poco confiables y varían muchísimo de un país a otro: trabajar en una API por especulación sería trabajo perdido.

Los datos de voto adelantado y voto ausente siguen el mismo patrón: flujos en tiempo real donde la jurisdicción los ofrece, subida manual como alternativa de reserva universal.

### Oleadas de comunicación GOTV configurables

La secuencia de comunicación del día de elecciones (recordatorio de la mañana, seguimiento del mediodía, empuje de la tarde, empuje final) se configura de forma independiente en cada oleada: cada una puede ir totalmente automatizada o dispararse a mano. Los recordatorios de la mañana pueden enviarse solos, mientras que el empuje final puede esperar a que el equipo revise los datos de participación en tiempo real antes de dispararse.

**Alternativas consideradas:** Automatizar todas las oleadas se descartó porque la decisión del empuje final depende de un contexto en tiempo real que solo el equipo del centro de mando puede evaluar. Hacerlas todas a mano se descartó porque los recordatorios de la mañana son rutina y no deberían requerir intervención humana.

### El modo de campo se muestra a tamaño de celular en dispositivos más grandes

El modo de campo se apodera de toda la pantalla y reemplaza por completo la navegación normal: sin barra lateral, sin pestañas, sin notificaciones ajenas. El mundo del voluntario es la lista de recorrido hasta que termina el turno. En tabletas o computadoras de escritorio, el modo de campo se sigue mostrando con dimensiones de celular para mantener la interfaz de una sola mano, optimizada para caminar. Las tabletas y computadoras que entran a operaciones de campo se redirigen a la vista de gestión.

El ciclo de vida del turno es un límite de eventos de pleno derecho: iniciar el turno descarga los datos → modo de campo activo → terminar el turno dispara la sincronización + el balance del turno + el registro de horas + la liberación del territorio → regreso al marco normal. La recuperación tras un fallo muestra la última posición y permite retomar.

### Áreas táctiles de 44px por defecto, 48px en modo de campo

Las áreas táctiles predeterminadas son de 44px como mínimo (WCAG 2.1 AAA). El modo de campo sube a 56px como mínimo para tener en cuenta que se camina, que se usa una sola mano, que hay poca luz y que a veces se llevan guantes. Las casillas de problemas en los formularios de observación electoral usan áreas táctiles de 44px. «No estaba» avanza solo después de 3 segundos para reducir el tiempo entre puertas.

<!-- REVISIT: El encabezado dice 48px y el cuerpo dice 56px. La incoherencia viene del original en inglés y se conserva a propósito; no la armonices aquí ni en el inglés sin decidir primero cuál es la cifra correcta. -->

La reasignación dinámica de recursos el día de elecciones funciona con sugerencias automáticas y aprobación humana: la plataforma analiza los datos de participación en tiempo real y muestra recomendaciones de reasignación («Precinto 7 con 35% de participación: considera mover gente que toca puertas desde el Precinto 12, que va en 78%»). El equipo del centro de mando aprueba, rechaza o modifica cada sugerencia.

## Consecuencias

**Beneficios:**
- El constructor automático del universo escala a campañas con cientos de miles de votantes objetivo
- La integración de datos electorales manual primero evita trabajo perdido en API poco confiables y deja la arquitectura lista para automatizar más adelante
- Las oleadas de comunicación configurables equilibran la eficiencia de la automatización con el criterio humano en las decisiones de más peso
- Que el modo de campo se apodere de toda la pantalla elimina distracciones y asegura que se pueda usar en condiciones físicas difíciles
- Las áreas táctiles más grandes del modo de campo reducen errores al caminar y al usar una sola mano

**Costos:**
- El modo de campo es, en la práctica, un marco de aplicación aparte, con su propio diseño, sus propias pruebas y su propio mantenimiento
- El constructor del universo GOTV hay que afinarlo país por país (cambian los datos de historial de voto y los modelos de puntaje de apoyo)
- La prioridad de sincronización del día de elecciones y el motor de reasignación imponen requisitos de infraestructura en tiempo real considerables
- El modo de campo en tabletas y computadoras, con una interfaz a tamaño de celular, no es lo ideal para quien quiere aprovechar una pantalla grande en el campo

**Restricciones:**
- El modo de campo tiene que funcionar por completo sin conexión (ver [ADR-005](005-offline-first-sync.md))
- Los datos de la lista de recorrido tienen que poder descargarse por adelantado dentro de límites razonables de ancho de banda y almacenamiento
- El intervalo de sincronización del día de elecciones baja a casi tiempo real (cada 30 segundos): la infraestructura tiene que aguantarlo con la carga máxima de voluntarios
- Las sugerencias de reasignación tienen que actualizarse dentro de los 30 segundos siguientes a cualquier cambio en los datos de participación

**ADR relacionados:** [ADR-005](005-offline-first-sync.md) (operaciones de campo con prioridad sin conexión), [ADR-011](011-design-system-ux.md) (áreas táctiles, espaciado, presupuestos de rendimiento), [ADR-013](013-analytics-ai.md) (analítica en tiempo real para los paneles del día de elecciones)
