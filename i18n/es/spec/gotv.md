# GOTV y operaciones del día de elecciones

## Propósito

Este documento especifica las capacidades de GOTV (Get Out The Vote — movilización del voto) y de operaciones del día de elecciones de GreenGrass. El día de elecciones es el día más intenso, operativamente, de cualquier campaña: todo lo que la plataforma hizo antes — trabajo de campo, inscripción de votantes, recaudación de fondos, comunicaciones, capacitación — converge en unas pocas horas de ejecución donde todo está en juego.

Las operaciones de GOTV se distinguen del trabajo de campo normal (workflows.md) en varios sentidos:

- **Presión de tiempo.** Los centros de votación cierran a una hora fija. Cada minuto cuenta.
- **Coordinación en tiempo real.** La campaña necesita una imagen viva de quién votó y quién no, actualizada continuamente.
- **Muchas operaciones a la vez.** Puerta a puerta, jornadas de llamadas, transporte a las urnas, observación electoral y coordinación desde el centro de mando ocurren en paralelo.
- **El costo de fallar es más alto.** Un retraso de sincronización durante el trabajo de campo normal significa que el seguimiento se hace mañana. Un retraso de sincronización el día de elecciones significa que un votante no recibe contacto antes de que cierren los centros.

Esta especificación se apoya en: workflows.md (trabajo de campo, jornadas de llamadas, ciclo de vida de los turnos), integrations.md (mapas, SMS, telefonía), users.md (roles, permisos, alcance geográfico) y system.md (analítica en tiempo real, sincronización sin conexión, event sourcing — el estado se deriva de un registro inmutable de eventos).

## Filosofía de GOTV

1. **Todo contacto es un contacto de movilización.** El día de elecciones la única pregunta es "¿ya votaste?". Todo lo demás — persuasión, inscripción, educación sobre temas — ya terminó.
2. **En tiempo real o no sirve.** Datos viejos el día de elecciones son peores que ningún dato. El sistema tiene que priorizar la velocidad y la frescura de la sincronización.
3. **Capaz de trabajar sin conexión, pero optimizado para estar conectado.** Las operaciones del día de elecciones se benefician enormemente de la conectividad (seguimiento de participación en vivo, reasignación dinámica). Trabajar sin conexión es la red de seguridad, no el modo normal.
4. **Escalable al caos.** El día de elecciones genera la carga pico: todos los voluntarios activos, todos los votantes bajo seguimiento, todas las operaciones corriendo a la vez. El sistema tiene que aguantarlo sin despeinarse.

## Preparación previa al día de elecciones

### Definición del universo GOTV

Antes del día de elecciones, la campaña define su universo GOTV: la lista de votantes a los que va a movilizar.

- **Criterios del universo:** datos de trabajo de campo, puntajes de apoyo, historial de voto, demografía, focalización geográfica
- **Universo GOTV típico:** votantes identificados como simpatizantes (por trabajo de campo u otra identificación de votantes) que todavía no han votado (donde haya datos de voto adelantado)
- **Segmentos del universo:** las campañas suelen priorizar los contactos — primero los simpatizantes firmes, después los que se inclinan a favor, y después los no contactados pero probablemente simpatizantes

**DECIDIDO: Constructor automático de universo.** La plataforma genera el universo GOTV automáticamente a partir de criterios configurables (umbrales de puntaje de apoyo, filtros de historial de voto, filtros geográficos). El equipo de campaña revisa, ajusta, añade o quita segmentos y lo cierra. Reduce el trabajo manual y da consistencia sin quitarle al equipo el control sobre el universo final.

### Seguimiento del voto adelantado y ausente

Muchas jurisdicciones permiten votar antes del día de elecciones. La plataforma tiene que saber quién ya votó para no gastar recursos de GOTV en gente que no necesita recordatorio.

**DECIDIDO: Las dos cosas — alimentación por API donde exista, carga manual como recurso universal de reserva.** Alimentaciones en tiempo real o diarias desde las jurisdicciones que las publican (algunos estados de EE. UU.), con retiro automático del universo GOTV de quienes votaron adelantado o por voto ausente. Carga manual de las listas de voto adelantado como recurso universal de reserva. Consistente con la estrategia de importación del padrón electoral (integrations.md) y con el patrón de estar listos para API pero empezar por lo manual.

### Concentración de voluntarios

El día de elecciones se despliegan muchos voluntarios a la vez. La plataforma tiene que dar soporte a esa logística.

- **Puntos de concentración** — lugares físicos donde los voluntarios se reúnen antes de salir a sus asignaciones (oficinas de campaña, centros comunitarios, iglesias, etc.)
- **Manejo de puntos de concentración:** crear ubicaciones con dirección, capacidad, persona de contacto y horario
- **Asignación de voluntarios a puntos de concentración** — cada voluntario sabe dónde presentarse
- **Registro de llegada en el punto de concentración** — el Líder de equipo registra a los voluntarios y verifica que tengan la app y sus asignaciones cargadas
- **Control de materiales** — seguimiento opcional de lo que se reparte en la concentración (material impreso, letreros, agua, etc.)

### Corte de territorios para GOTV

Los territorios del día de elecciones no son como los del trabajo de campo normal:

- **Más pequeños y compactos** — se diseñan para completarse en 1-2 horas, no en un turno entero
- **Optimizados por densidad** — se priorizan por densidad de simpatizantes, no por cobertura geográfica
- **Dinámicos** — se pueden volver a cortar durante el día según los datos de participación (ver Operaciones en tiempo real más abajo)
- **Pasadas múltiples** — el mismo territorio puede asignarse a distintos voluntarios para la pasada de la mañana, la de la tarde y la de la noche

Las herramientas de manejo de territorios que ya existen (integrations.md — dibujo, generación automática, asignación, optimización de listas de recorrido, visualización de cobertura) aplican aquí con parámetros específicos del día de elecciones.

### Preparación de observadores electorales

Los observadores electorales vigilan los centros de votación para detectar irregularidades. En casi todas las jurisdicciones es un rol definido por ley.

- **Inscripción de observadores** — muchas jurisdicciones exigen inscribir a los observadores ante las autoridades electorales con antelación. La plataforma registra qué observadores están acreditados para cada centro.
- **Capacitación de observadores** — capacitación específica de cada jurisdicción sobre lo que un observador puede y no puede hacer, qué mirar y cómo reportar incidentes. Se entrega por el módulo de capacitación (workflows.md).
- **Asignación a centros de votación** — asignar observadores a centros específicos, con suplentes por si alguien no aparece.
- **Manejo de credenciales** — control de las credenciales o certificados que emiten las autoridades electorales.

### Plan de comunicaciones del día de elecciones

La secuencia de comunicaciones del día se configura de antemano:

- **Recordatorio de la mañana** — "Hoy son las elecciones. Los centros abren [horario]. Tu centro de votación es [lugar]." Se envía a todo el universo GOTV por los canales configurados (SMS, WhatsApp, correo electrónico).
- **Seguimiento del mediodía** — se envía a los votantes que todavía no están confirmados como votados. "¿Ya votaste? Los centros cierran a las [hora]."
- **Empuje de la tarde** — mensaje más urgente a los simpatizantes que faltan. "Los centros cierran en [X] horas."
- **Empuje final** — mensaje de última oportunidad. "Los centros cierran en 1 hora. Si necesitas transporte, [contacto]."

**DECIDIDO: Configurable por oleada.** La campaña elige, para cada oleada, si va totalmente automatizada o si se dispara a mano. El recordatorio de la mañana puede ir automático, mientras que el empuje final quizá requiera disparo manual después de mirar los datos de participación en tiempo real. Cada oleada de la secuencia se configura por separado como envío automático o disparo manual.

## Operaciones del día de elecciones

### Trabajo de campo GOTV (puerta a puerta)

El puerta a puerta del día de elecciones usa la misma infraestructura de trabajo de campo (workflows.md), con diferencias clave:

- **El guion es más simple** — "¿Ya votaste hoy? ¿Necesitas transporte para ir a votar?" Sin persuasión, sin discusión de temas.
- **Los resultados son binarios** — votó, todavía no votó (necesita seguimiento), no estaba, no puede o no va a votar
- **La velocidad importa** — interacciones más cortas, movimiento más rápido entre puertas
- **Listas de recorrido dinámicas** — a medida que llegan datos de participación, los votantes confirmados como votados salen de las listas activas

#### Actualización de las listas de recorrido GOTV

**DECIDIDO: Híbrido — el servidor empuja cuando hay conexión, el dispositivo jala como reserva.** El servidor empuja las actualizaciones de la lista a los dispositivos en tiempo real cuando hay conexión. Los voluntarios pueden deslizar para actualizar cuando la conexión es intermitente. Las entradas viejas se marcan visualmente con un indicador de actualidad que muestra cuánto pasó desde la última sincronización. Consistente con la filosofía de la plataforma: capaz de trabajar sin conexión, pero optimizada para estar conectada.

### Llamadas de seguimiento (jornadas de llamadas)

Las jornadas de llamadas del día de elecciones apuntan a los votantes que todavía no han votado, con la misma infraestructura de siempre (workflows.md, integrations.md) y estas modificaciones:

- **Guion:** "Hola, soy [nombre] de [campaña]. ¿Ya votaste hoy? Los centros están abiertos hasta las [hora] en [lugar]. ¿Te podemos ayudar con algo, transporte o direcciones?"
- **Lista de llamadas:** sale del universo GOTV, filtrada para quitar a los votantes ya confirmados como votados
- **Actualización de la lista:** la misma actualización dinámica de las listas de recorrido — los confirmados como votados salen
- **Registro de resultados:** votó, va a votar más tarde (agendar rellamada), necesita transporte (genera solicitud de transporte), no va a votar, no contesta
- **Disparo de transporte:** si un votante necesita transporte, quien está llamando crea la solicitud directamente desde la interfaz de llamada (ver Transporte a las urnas más abajo)

### Transporte a las urnas

Llevar gente a votar es un servicio central del GOTV, sobre todo en zonas con poco transporte público, para votantes mayores y para votantes con discapacidad.

#### Flujo de una solicitud de transporte

1. **Se crea la solicitud** — por quien está llamando (desde la llamada), por quien toca puertas (desde el contacto), por el propio votante (por la línea de texto de la campaña o un formulario web), o por el equipo (a mano)
2. **La solicitud contiene:** nombre del votante, dirección de recogida, teléfono, necesidades de accesibilidad (silla de ruedas, andador, etc.), hora preferida, centro de votación (asignado automáticamente según la dirección registrada del votante)
3. **La solicitud entra a la cola** — visible para el Coordinador de transporte (un rol del equipo o una subasignación de Líder de equipo)
4. **Se asigna conductor** — del grupo de conductores voluntarios. La asignación considera: cercanía, capacidad del vehículo, accesibilidad y ventana de tiempo.
5. **Se notifica al conductor** — recibe los detalles de la recogida por la app o por SMS
6. **Recogida confirmada** — el conductor confirma cuando recoge al votante
7. **Entrega confirmada** — el conductor confirma cuando deja al votante en el centro de votación
8. **Se marca al votante** — el estado de transporte del votante se actualiza en el seguimiento GOTV

#### Manejo de conductores

- **Registro de conductores** — los voluntarios se inscriben como conductores con: tipo de vehículo, capacidad, características de accesibilidad, ventana de disponibilidad, zona geográfica
- **Cola de conductores** — los conductores disponibles se le muestran al Coordinador de transporte, ordenados por cercanía a las solicitudes pendientes
- **Seguimiento de ida y vuelta** — el sistema rastrea la disponibilidad de cada conductor (disponible, en camino a recoger, transportando, de regreso)
- **Viajes con varios pasajeros** — a un conductor se le pueden asignar varias recogidas en secuencia si las direcciones están agrupadas

**DECIDIDO: Los dos modos disponibles — la campaña elige.** Modo despachador para campañas que quieren control manual total (el Coordinador de transporte empareja solicitudes con conductores sobre un mapa). Asignación automática con anulación para campañas que quieren que la plataforma empareje por cercanía, compatibilidad del vehículo y ventana de tiempo, y que el Coordinador pueda anular. La campaña elige el modo según su capacidad de voluntarios y su complejidad operativa.

### Observación electoral

Los observadores vigilan los centros de votación y reportan incidentes en tiempo real.

#### Registro de llegada del observador

- El observador llega a su centro asignado y registra su llegada desde la app
- La plataforma confirma: centro correcto, observador acreditado para ese centro, credenciales vigentes
- Estado del observador: llegada registrada, activo, incidente reportado, turno terminado

#### Reporte de incidentes

Los observadores reportan incidentes con un formulario estructurado:

- **Categorías de incidente:** filas largas, intimidación de votantes, falla de máquina, problemas de accesibilidad, proselitismo dentro de la zona restringida, listas de votantes ausentes o incorrectas, conducta del personal de mesa, otro
- **Severidad:** informativo, preocupante, urgente, emergencia
- **Detalles:** descripción libre, foto o video opcional
- **Ubicación:** se etiqueta automáticamente al centro de votación asignado al observador
- **Fecha y hora:** automática

#### Escalamiento de incidentes

**DECIDIDO: Reglas de escalamiento configurables.** La campaña define el enrutamiento según la severidad y la categoría del incidente. Las campañas pequeñas mandan todo a una sola persona. Las grandes usan escalamiento por niveles (lo rutinario a coordinadores regionales, lo urgente y las emergencias al centro de mando y al equipo legal). Las reglas se configuran durante la preparación del día de elecciones.

#### Integración con protección electoral

Para campañas que participan en esfuerzos de protección electoral (líneas directas no partidistas de protección al votante, redes de observadores legales):

- **Número de línea directa a la vista** — el número de la línea de protección electoral se configura y se muestra de forma prominente en la interfaz del observador y en la mensajería GOTV a los votantes
- **Reenvío de incidentes** — opción de reenviar los reportes de los observadores a organizaciones externas de protección electoral (con el consentimiento correspondiente para compartir datos)
- **Alertas al equipo legal** — los incidentes urgentes pueden disparar alertas al equipo legal de la campaña por el sistema de notificaciones de la plataforma

### Seguimiento de la participación en tiempo real

El sistema nervioso central de las operaciones del día: una vista en vivo de qué votantes del universo ya votaron y cuáles no.

#### Fuentes de datos de participación

Los datos de participación pueden venir de varias fuentes:

1. **Datos oficiales de voto adelantado y ausente** — cargados o sincronizados antes del día de elecciones
2. **Confirmaciones de puerta a puerta** — quien toca puertas reporta "el votante dice que ya votó"
3. **Confirmaciones telefónicas** — quien llama confirma que el votante ya votó
4. **Observaciones de observadores electorales** — los observadores en los centros pueden confirmar votantes específicos (donde sea legal y práctico)
5. **Datos oficiales de participación del día** — algunas jurisdicciones publican actualizaciones periódicas de participación durante el día
6. **Autorreporte del votante** — votantes que responden a los mensajes de la campaña confirmando que votaron

**DECIDIDO: Confirmaciones ponderadas por confianza.** Cada fuente de datos de participación recibe un nivel de confianza distinto:
- **Confirmado** — datos electorales oficiales (archivos de voto adelantado, alimentaciones de participación del día). El votante sale de las listas de contacto GOTV.
- **Probablemente votó** — reporte de quien toca puertas, de quien llama, observación de un observador, autorreporte del votante. El votante baja de prioridad en las listas (se va al final) pero no sale del todo.
La fuente siempre queda anotada en el registro de auditoría, para validar los modelos después de la elección.

#### Panel de participación

El panel del día de elecciones es la interfaz principal del centro de mando:

- **Participación general** — porcentaje del universo GOTV que ya votó, actualizado en tiempo real
- **Participación por geografía** — vista de mapa con las tasas de participación por precinto o territorio, con código de color (rojo = participación baja, verde = alta)
- **Participación por segmento** — desglose por fuerza del apoyo, demografía y geografía
- **Contactos pendientes** — cuántos simpatizantes no han votado y no han sido contactados hoy
- **Estado de las operaciones** — cuántos están tocando puertas, cuántos llamando, solicitudes de transporte pendientes, cobertura de observadores
- **Tiempo restante** — cuenta regresiva al cierre de los centros, con proyección de participación final al ritmo actual
- **Alertas** — incidentes de observadores, retrasos de sincronización, acumulación de solicitudes de transporte, problemas de entrega de mensajes

### Reasignación dinámica de recursos

A medida que avanza el día, la campaña tiene que mover recursos hacia donde más hacen falta.

- **Identificar zonas de baja participación** — el panel resalta los precintos o territorios donde los simpatizantes del universo están por debajo de lo esperado
- **Reasignar el puerta a puerta** — mover voluntarios de zonas con participación alta (donde el trabajo ya está hecho) a zonas de participación baja
- **Redirigir las llamadas** — priorizar las listas de llamadas de los precintos con participación baja
- **Reforzar el transporte** — si una zona concentra muchas solicitudes de transporte, mover conductores para allá

**DECIDIDO: Sugerencias automáticas + aprobación humana en el centro de mando.** La plataforma analiza los datos de participación en tiempo real y genera sugerencias de reasignación (por ejemplo: "El precinto 7 va en 35% de participación con 3 horas por delante — considera mover 2 voluntarios del precinto 12, que va en 78%"). Las sugerencias aparecen en el panel del centro de mando. El equipo del centro de mando aprueba, rechaza o modifica cada una. Apoyo a la decisión basado en datos, ejecución controlada por personas.

## Coordinación de GOTV en alianzas

Las alianzas que corren operaciones conjuntas de GOTV (decidido en workflows.md) necesitan coordinación adicional:

- **Universo GOTV compartido** — universo a nivel de alianza que combina los datos de simpatizantes de las organizaciones miembro, deduplicados, con la regla de "no volver a tocar" aplicada entre organizaciones
- **Asignación coordinada de territorios** — sin solapamiento entre los territorios de las organizaciones miembro
- **Panel de participación compartido** — vista a nivel de alianza de la participación en los territorios de todas las organizaciones miembro
- **Transporte coordinado entre organizaciones** — las solicitudes de transporte de los contactos de cualquier organización miembro las puede atender un conductor de cualquier otra
- **Comunicaciones unificadas** — opción de mensajería del día de elecciones a nivel de alianza junto con los mensajes de cada organización (con consentimiento, según compliance.md)

## Después del día de elecciones

### Inmediato (noche electoral)

- **Seguimiento de resultados** — a medida que llegan los resultados oficiales, la plataforma los muestra junto a los datos internos de la campaña (participación, puntajes de apoyo) para analizarlos
- **Captura de resultados** — en jurisdicciones donde los resultados se publican físicamente en los centros de votación, los observadores pueden capturarlos en la plataforma para un conteo interno más rápido

**DECIDIDO: Panel completo de resultados, con énfasis en la captura por observadores.** La plataforma ofrece:
- **Captura de resultados por observadores** — formulario estructurado para que los observadores y el equipo de la campaña ingresen los resultados de sus centros asignados a medida que se publican. Esta es la entrada principal de datos: los ojos propios de la campaña en el terreno.
- **Panel de agregación de resultados** — despliegue en tiempo real de los resultados ingresados junto a los datos internos de la campaña (tasas de participación, puntajes de apoyo) para el análisis del centro de mando en la noche electoral.
- **Integración de resultados oficiales** — donde las fuentes oficiales publiquen resultados legibles por máquina (APIs de comisiones electorales, alimentaciones de medios), la plataforma los puede ingerir. Pero la captura por observadores da la foto temprana más rápida y más confiable.

### Análisis posterior a la elección (días después)

- **Análisis de participación** — comparar la participación real contra las metas, por precinto y por segmento
- **Efectividad de las operaciones** — tasas de contacto en campo, conversión de las jornadas de llamadas, tasa de viajes completados
- **Validación de modelos** — comparar los puntajes de apoyo contra los resultados reales para mejorar la identificación de votantes a futuro
- **Desempeño de los voluntarios** — turnos completados, contactos hechos, incidentes reportados (para reconocer a los voluntarios, no para castigarlos)
- **Revisión de la asignación de recursos** — dónde sobraron y dónde faltaron recursos respecto a la necesidad

### Limpieza de datos

- **Actualización del padrón electoral** — marcar votantes que se mudaron, fallecieron o necesitan otro cambio de estado según los datos del día
- **Datos del cierre con voluntarios** — recoger la retroalimentación de los voluntarios sobre qué funcionó y qué no
- **Archivo de los datos del día** — los datos operativos del día de elecciones se archivan según la política de retención para auditoría (10 años, según compliance.md)

## Consideraciones por jurisdicción

### Puerto Rico (alfa)

- Aplica la ley electoral de EE. UU. El GOTV es una práctica bien establecida en la cultura política estadounidense.
- La CEE administra las elecciones. Los centros de votación son información pública.
- Hay voto adelantado y voto ausente.
- Mensajería GOTV bilingüe (español/inglés).

### Brasil (piloto 1)

- El voto es obligatorio. El foco del GOTV pasa de "convencer de votar" a "convencer de votar por nosotros" — la participación ya es alta.
- Urnas electrónicas: los resultados llegan rápido.
- El TSE restringe la campaña el día de elecciones — la plataforma tiene que hacer cumplir las reglas del período de campaña.
- El artículo 16 del Código Electoral restringe ciertas actividades de GOTV el propio día de elecciones.

### Tailandia (piloto 2)

- La ley electoral tailandesa restringe las actividades de campaña en las 24-48 horas previas a la votación (la veda electoral). La plataforma tiene que hacerla cumplir.
- Se prohíbe la venta de alcohol durante el período electoral — no es asunto de la plataforma, pero importa para planificar actividades.
- Con un historial de intervención militar, las operaciones de GOTV tienen que elegir el nivel de seguridad con criterio agresivo.

### India (piloto 3)

- Escala enorme: cientos de millones de votantes en varias fases (las elecciones indias duran semanas, no un día).
- Al ser por fases, el GOTV se repite para distintas circunscripciones en distintos días.
- El manejo a nivel de mesa de votación es crítico: las campañas indias se organizan por mesa.
- El Código Modelo de Conducta de la ECI restringe las actividades del día de elecciones.

### Líbano (piloto 4)

- El sistema de escaños confesionales hace que el GOTV apunte a grupos específicos.
- Llevar gente a votar es un reto logístico mayor, dada la inestabilidad de la infraestructura.
- Múltiples preocupaciones de seguridad: las operaciones de GOTV en distintas zonas enfrentan niveles de amenaza distintos.
- La economía funciona en efectivo, así que los reembolsos de transporte pueden necesitar control de efectivo (según la cadena de custodia de efectivo en fundraising.md).

## Requisitos técnicos

### Prioridad de sincronización el día de elecciones

El protocolo de sincronización por event sourcing (system.md) tiene que estar afinado para el día de elecciones:

- **Los cambios de estado del votante tienen la máxima prioridad de sincronización** — los eventos de "el votante ya votó" tienen que llegar a todos los clientes lo más rápido posible
- **Sube la frecuencia de sincronización** — durante las operaciones del día, el intervalo baja de su cadencia normal a casi tiempo real (cada 30 segundos cuando hay conexión)
- **La resolución de conflictos favorece lo más reciente** — si dos fuentes reportan estados contradictorios de un votante, gana el reporte más reciente
- **Optimización de ancho de banda** — durante el GOTV los paquetes de sincronización deben ser mínimos (solo los cambios de estado, no los registros completos)

### Manejo de carga

El día de elecciones es la carga pico de la plataforma:

- Todos los voluntarios activos usando la app a la vez
- El panel de participación refrescándose sin parar desde el centro de mando
- Comunicaciones saliendo por oleadas a todo el universo GOTV
- Solicitudes de transporte entrando de forma continua
- Reportes de observadores llegando en flujo

El sistema tiene que:
- Aguantar 10 veces la carga concurrente normal
- Actualizar el panel dentro de los 30 segundos de que cambien los datos subyacentes
- Completar los envíos de comunicaciones dentro de las ventanas de tiempo configuradas (sin retrasarse por acumulación en la cola)
- Mantener el retraso de sincronización bajo 2 minutos incluso en carga pico

### Resiliencia sin conexión

Si se pierde la conectividad durante el día de elecciones:

- Quienes tocan puertas siguen trabajando con las listas de recorrido en caché (igual que en el trabajo de campo normal)
- Las jornadas de llamadas no pueden operar (las llamadas requieren conexión)
- Las solicitudes de transporte se encolan localmente y salen cuando hay conexión
- Los reportes de incidentes de observadores se encolan localmente y salen cuando hay conexión
- **Diferencia crítica con el trabajo de campo normal:** el día de elecciones, una lista de recorrido vieja hace perder tiempo con votantes que ya votaron. Hay que insistirle fuerte a los voluntarios para que se reconecten y actualicen.

## Preguntas abiertas

1. **Seguimiento de boletas** — algunas jurisdicciones de EE. UU. permiten rastrear boletas (el votante puede verificar si su boleta por correo se recibió y se contó). ¿Debería la plataforma integrarse con esos sistemas?

2. **Encuestas a boca de urna** — ¿debería la plataforma dar soporte a encuestas informales a boca de urna (preguntarle a los votantes que salen cómo votaron)? Legalmente complicado en muchas jurisdicciones.

3. **Soporte para elecciones en varias fases** — en India las elecciones se extienden por semanas, con distintos estados votando en distintos días. El sistema GOTV tiene que manejar varios días de elecciones para una sola campaña. ¿Cómo afecta eso al manejo del universo, la programación de voluntarios y el seguimiento de participación?

4. **Excepción de gamificación** — la gamificación está en general fuera de alcance (según workflows.md), pero motivar a los voluntarios el día de elecciones es excepcionalmente importante. ¿Debería el panel mostrar tablas de posiciones o progreso de completitud solo para el día de elecciones?

<!-- REVISIT: La metodología de pruebas de carga para el día de elecciones hay que definirla durante la planificación de la implementación. El supuesto de 10x necesita validarse contra el número real de voluntarios en campañas del tamaño objetivo. -->
<!-- REVISIT: Hacer cumplir la veda electoral (Tailandia, el MCC de India) necesita integrarse con el sistema de control del período de campaña (compliance.md). El día de elecciones y la veda son un subconjunto de las restricciones del período de campaña. -->
