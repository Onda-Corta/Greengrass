# ADR-013: Analítica e IA

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/workflows.md`, `design/architecture/system.md`

## Contexto

Las decisiones de campaña dependen de datos oportunos. Un Director de campo, en un día de puerta a puerta, necesita tasas de contacto y cobertura de territorio en tiempo real. El centro de mando del día de elecciones necesita paneles de participación electoral en vivo que se actualicen en segundos. Pero un Gerente de campaña que revisa la recaudación del trimestre pasado puede esperar al consolidado por lotes. Hacer analítica en tiempo real para todo es caro e innecesario; hacer solo analítica por lotes falla justo en los momentos de más riesgo.

La plataforma también usa IA para tareas operativas concretas —generar mensajes de activismo personalizados y ayudar con la traducción—, donde la IA redacta el borrador y una persona lo revisa antes de que salga nada.

## Decisión

### Analítica en tiempo real para la operación activa, por lotes para lo histórico

Dos niveles de analítica cubren necesidades de actualidad distintas:

**Tiempo real:** Paneles del día de campo (puertas tocadas, tasa de contacto, avance del equipo), paneles de jornadas de llamadas (llamadas hechas, desenlaces), seguimiento de la participación el día de elecciones, termómetro de recaudación en vivo durante una convocatoria, métricas del centro de mando de GOTV (Get Out The Vote — movilización del voto). Los datos se actualizan según van llegando desde la calle. El panel del día de elecciones tiene que actualizarse en menos de 30 segundos desde que cambian los datos de origen.

**Por lotes:** Informes de tendencias históricas (recaudación en el tiempo, crecimiento del voluntariado, tendencias de participación), comparaciones entre campañas, informes de cumplimiento, análisis de segmentación de donantes. Se agregan según un calendario definido (cada hora o cada día, según la métrica).

La arquitectura de event sourcing (el estado se deriva de un registro inmutable de eventos; ver la [ADR-005](005-offline-first-sync.md)) es la base de las dos: la analítica en tiempo real consume el flujo de eventos según van llegando, y la analítica por lotes agrega sobre los datos históricos de eventos.

**Alternativas consideradas:** Se descartó el tiempo real para todo porque es caro y no aporta nada útil al análisis histórico. Se descartó lo puramente por lotes porque el día de elecciones y las jornadas de campo exigen datos en vivo: el día de elecciones, datos desactualizados son peores que no tener datos.

### Mensajes personalizados generados por IA para el activismo

En las campañas de activismo (envío de cartas, comentarios públicos), la IA genera mensajes únicos y personalizados a partir de los puntos de mensaje de la campaña y de lo que aporta el simpatizante. No hay dos mensajes iguales, así que los destinatarios no pueden descartarlos como astroturfing en serie. El simpatizante revisa el mensaje generado en la interfaz, puede editarlo y tiene que aprobarlo antes de que se envíe.

La IA se apoya en los puntos de mensaje de la campaña para mantener la coherencia, y varía el tono, la estructura y el encuadre personal. Las salvaguardas de contenido impiden que la IA se salga del mensaje. La aprobación del simpatizante deja constancia de su consentimiento en el registro de auditoría.

**Alternativas consideradas:** Se descartaron los mensajes de plantilla porque quien los recibe descarta fácilmente como astroturfing los mensajes idénticos. Se descartó que el simpatizante los escribiera por completo porque las tasas de finalización son mucho más bajas: la fricción de escribir desde cero reduce la participación.

## Consecuencias

**Beneficios:**
- La analítica en tiempo real para la operación activa permite decidir con datos en el campo cuando el momento es lo que más importa
- El procesamiento por lotes para el análisis histórico evita el costo de mantener infraestructura en tiempo real para datos que no la necesitan
- Los mensajes de activismo generados por IA suben mucho las tasas de finalización sin perder autenticidad
- El event sourcing da un cimiento de datos unificado para la analítica en tiempo real y para la de lotes

**Costos:**
- La cadena de procesamiento de la analítica en tiempo real (flujo de eventos, agregación, envío a los paneles) es infraestructura considerable
- El pico de carga del día de elecciones (todos los voluntarios activos, los paneles actualizándose sin parar, las comunicaciones saliendo) obliga a planificar la capacidad
- La generación de mensajes con IA tiene un costo por generación y necesita salvaguardas de contenido para no salirse del mensaje
- Tener dos niveles de analítica añade complejidad operativa frente a un enfoque único

**Restricciones:**
- Los paneles del día de elecciones tienen que aguantar 10 veces la carga concurrente normal
- Los envíos de comunicaciones durante el GOTV tienen que completarse dentro de las ventanas de tiempo configuradas, sin que los retrase la acumulación de la cola de analítica
- Los mensajes generados por IA tienen que ser revisados y aprobados por el simpatizante: no sale nada sin consentimiento expreso
- La infraestructura de analítica en tiempo real tiene que estar afinada para los intervalos de sincronización del día de elecciones (actualizaciones de 30 segundos)

**ADR relacionados:** [ADR-005](005-offline-first-sync.md) (event sourcing como base de la analítica), [ADR-006](006-field-operations-gotv.md) (paneles del día de elecciones, sugerencias de reasignación), [ADR-010](010-internationalization-localization.md) (traducción asistida por IA)
