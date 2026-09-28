# ADR-016: Resoluciones transversales

**Estado:** Aceptada
**Fecha:** 2026-03-04
**Fuentes:** `design/ux/04-wireframes/audit.md` (Apéndice A: preguntas abiertas consolidadas)
**Enmendada por:** [ADR-019](019-central-services-and-metered-billing.md) — §2: una tercera capa en el momento del envío, la supresión mutua entre organizaciones, corre después de las dos que se deciden más abajo para una organización en una alianza cuyo contrato incluye el término de supresión ([system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales)). Las dos capas decididas aquí no cambian. [ADR-020](020-central-service-line-up-and-builders.md) — #25: la edición de video dentro de la plataforma sigue siendo externa, como se decide más abajo; generar video a partir de un encargo es otra capacidad, propuesta y condicionada a la [ADR-018](018-ai-agent-posture.md). Hasta que se acepte, el #25 aplica a todo video.

## Contexto

La auditoría de wireframes identificó 89 preguntas abiertas en 21 documentos. De ellas, 2 contradicciones y 3 grupos de solapamiento abarcan varias áreas funcionales y no se pueden resolver dentro de un solo documento. Esta ADR resuelve primero los asuntos transversales y establece las políticas sobre las que se apoyan las resoluciones de cada área.

### Contradicciones

1. **Delegación de ajustes:** la ADR-011 y `settings.md` establecieron "Toda la configuración es solo del OA (Org Admin, el Administrador de la organización), sin delegación". La pregunta abierta #52 plantea si ciertas categorías se pueden delegar a roles que no sean OA.
2. **Topes de frecuencia frente a la orquestación entre canales:** `communications.md` decidió aplicar topes de frecuencia por canal para toda la organización. La pregunta abierta #21 plantea cómo evitar que el mismo tema llegue por canales distintos el mismo día.

### Grupos de solapamiento

1. **Entradas de pago a eventos (#27) + reembolsos de recaudación (#31):** los eventos de pago se solapan con la cadena de recaudación de fondos. Los ingresos por entradas necesitan un lugar claro.
2. **Conservación de datos (#14, #51, #84):** la conservación de mensajes, la conservación de datos de GOTV (Get Out The Vote — movilización del voto) y las ventanas de reversión de importación se preguntaron por separado, pero comparten la misma pregunta de política de fondo.
3. **Coordinación entre canales (#21) + canales de recordatorio de promesas de donación (#32):** las dos requieren un modelo de orquestación entre canales.

---

## Decisión

### 1. Delegación de ajustes — solo el OA en la v1

La configuración sigue siendo exclusiva del OA en la v1. No hay mecanismo de delegación.

**Fundamento:** un contexto sensible en materia de seguridad exige un único punto de responsabilidad. El patrón existente de sobrescrituras solo aditivas (ADR-011) sienta la base para delegar en una versión futura. Las organizaciones de la v1 serán lo bastante pequeñas como para que el cuello de botella del OA sea manejable. Añadir la delegación después es aditivo; quitarla después rompería flujos de trabajo.

**Cierra:** la pregunta abierta #52.

---

### 2. Orquestación de canales en dos capas

Las comunicaciones se rigen por dos mecanismos complementarios:

**Capa 1 — Topes de frecuencia por canal (decisión existente)**
Techos para toda la organización sobre la cantidad de contactos por canal y por período. Ejemplo: máximo 2 correos por semana, máximo 1 SMS por día. Lo configura el OA en la configuración de comunicaciones.

**Capa 2 — Ventana de silencio entre canales (nueva)**
Después de contactar a una persona por *cualquier* canal sobre un tema específico, los mensajes sobre ese mismo tema en otros canales quedan suprimidos durante una ventana configurable (por defecto: 24 horas). Temas distintos en canales distintos sí se permiten, hasta el tope de cada canal.

El sistema hace cumplir las dos capas en el momento del envío. Un mensaje que pasa el tope por canal todavía puede quedar aplazado por la ventana de silencio entre canales.

**Fundamento:** los topes por canal y la orquestación entre canales resuelven problemas distintos. Los topes evitan el exceso de mensajes en un solo canal. La ventana de silencio evita que a la misma persona la contacten por lo mismo por correo, luego por SMS y luego por WhatsApp el mismo día. Hacen falta las dos; ninguna sustituye a la otra.

**Cierra:** las preguntas abiertas #21 y #32.

---

### 3. Los ingresos por entradas pasan por la cadena de recaudación de fondos

Las entradas de pago a eventos se procesan por la cadena de recaudación de fondos. La compra de una entrada es un registro de donación con metadatos del evento (ID del evento, tipo de entrada, cantidad).

- **El sistema de eventos** maneja: inscripción, seguimiento de asistencia, registro de entrada, aforo
- **El sistema de recaudación** maneja: procesamiento de pagos, generación de recibos, seguimiento de cumplimiento, reembolsos
- **La política de reembolsos** es única: se rige por la política del procesador de pagos más una ventana máxima configurable por la organización (por defecto: 90 días)

Las pantallas de eventos muestran los ingresos por entradas como métrica, pero enlazan al sistema de recaudación para el detalle financiero. No hay una cadena de pagos aparte para los eventos.

**Fundamento:** en la mayoría de las jurisdicciones, las entradas a eventos políticos se tratan legalmente como contribuciones. Tener cadenas de pago separadas multiplica la complejidad de integración, la superficie de cumplimiento y el trabajo de conciliación. Una sola cadena significa un solo conjunto de reglas de cumplimiento, un solo generador de recibos y un solo flujo de conciliación.

**Cierra:** las preguntas abiertas #27 y #31.

---

### 4. Política de conservación de datos por niveles

La conservación de datos se rige por una política única con cuatro niveles. Cada nivel define qué se guarda, cuánto tiempo se conserva y si se puede borrar.

#### Definición de los niveles

| Nivel | Qué se guarda | Conservación por defecto | Mínimo | Máximo | ¿Se puede borrar? |
|------|---------------|-------------------|---------|---------|------------|
| **Operativo** | Contenido completo: cuerpos de los mensajes, adjuntos, respuestas de trabajo de campo, datos operativos de GOTV, bitácoras de turno | 2 años | 90 días | 5 años | Sí, pasado el período mínimo |
| **Cumplimiento** | Registros financieros: detalle de donaciones, recibos, documentos fiscales, presentaciones de cumplimiento | Según la ley local | 5 años | 10 años | No, hasta que venza el mínimo legal |
| **Registro de auditoría** | Solo metadatos de la acción (ver abajo) | Indefinida | — | — | No |
| **Reversión de importación** | Capacidad de deshacer importaciones de datos | 30 días | 7 días | 90 días | Vence automáticamente |

#### Distinción crítica: el registro de auditoría guarda metadatos, no contenido

El registro de auditoría deja constancia de **que una acción ocurrió** — quién hizo qué, cuándo y sobre qué entidad. **No** guarda el contenido de la acción.

**Ejemplo — se envía un mensaje y después se purga al cerrarse la ventana de conservación:**

| Nivel | Qué existe antes de la purga | Qué existe después de la purga |
|------|------------------------|----------------------|
| Operativo | El mensaje completo: cuerpo, adjuntos, contexto del hilo | **Borrado.** El cuerpo del mensaje y los adjuntos ya no están. |
| Registro de auditoría | Entrada de registro: "El miembro del personal A envió un SMS al contacto B el 2026-03-04 a las 14:32 UTC" | **Conservada.** La entrada permanece indefinidamente. |

El registro de auditoría es un **esqueleto**: prueba que las acciones ocurrieron, pero no conserva su contenido. Esta distinción es crítica por tres razones:

1. **Cumplimiento en materia de privacidad:** cuando un simpatizante solicita el borrado de sus datos, el contenido de sus mensajes se purga del nivel operativo. El registro de auditoría conserva solo el metadato de que hubo comunicación — ningún contenido personal.
2. **Almacenamiento:** conservar indefinidamente registros que son solo metadatos es viable. Conservar indefinidamente cuerpos de mensajes completos, adjuntos y grabaciones de audio de trabajo de campo no lo es.
3. **Exposición legal:** si se ve obligada por vía legal a entregar registros, la organización entrega metadatos (quién, qué, cuándo) — no el contenido completo de comunicaciones que puede haberse purgado legítimamente.

#### Configuración

- El OA configura los períodos de conservación dentro de los límites definidos arriba
- El sistema hace cumplir los mínimos — un OA no puede fijar la conservación de mensajes por debajo de 90 días
- Los mínimos del nivel de cumplimiento se derivan de la jurisdicción o jurisdicciones configuradas por la organización
- Las ventanas de reversión de importación vencen automáticamente — no hace falta limpieza manual

**Cierra:** las preguntas abiertas #14, #51 y #84.

---

---

## Resoluciones por categoría

Las secciones siguientes resuelven las preguntas abiertas propias de cada funcionalidad, agrupadas por categoría.

### Navegación y disposición (5 preguntas: #1–#5)

#### #1: Persistencia del plegado de las secciones de la barra lateral → Se conserva entre sesiones

El estado plegado o desplegado de las secciones de la barra lateral se conserva entre sesiones. Se guarda en localStorage (funciona sin conexión) y se sincroniza al servidor cuando hay conectividad, para que el estado siga a la persona de un dispositivo a otro.

La gente desarrolla memoria muscular con la disposición de su barra lateral. Reiniciarla en cada inicio de sesión obliga a reconfigurar sin motivo. localStorage no supone ninguna carga en dispositivos de gama baja.

#### #2: Memoria del panel de detalle → Se reinicia al navegar, se restaura con atrás/adelante del navegador

Cuando alguien navega a otra área funcional y vuelve, el panel de detalle regresa a cerrado. El contexto anterior del panel está desactualizado — los datos pueden haber cambiado y la tarea ya es otra. Cerrado es el valor por defecto predecible.

Los botones de atrás y adelante del navegador restauran el estado del panel mediante la History API. Esa es una acción explícita de "vuélveme a donde estaba" y debe respetar la intención de la persona.

#### #3: Tope del contador de notificaciones → Se topa en 99+

El contador de notificaciones se topa en "99+". La cantidad exacta de mensajes sin leer se ve dentro de la bandeja de notificaciones.

Los números por encima de 99 no cambian el comportamiento — de todos modos van a abrir la bandeja. Los números grandes no caben bien en un contador, sobre todo en pantallas de gama baja. Esto sigue la convención establecida (iOS, Android, WhatsApp).

#### #4: Personalización de los paneles → No en la v1

Los paneles usan disposiciones fijas, filtradas por rol. En la v1 no se pueden reordenar ni ocultar secciones.

Los paneles ya vienen curados por rol (el candidato recibe una vista simplificada; el gerente de campaña recibe el detalle operativo). La personalización añade gestión de estado de arrastrar y soltar, sincronización por persona y una complejidad de soporte donde el panel de cada quien se ve distinto. Se reevalúa en la v2 si la gente lo pide.

#### #5: Intervalo de actualización de los paneles → Por niveles según la urgencia, con indicador de actualidad obligatorio

**Intervalos de actualización:**

| Tipo de panel | Intervalo de actualización automática | Fundamento |
|---------------|----------------------|-----------|
| Operativo (centro de mando de GOTV, operaciones de campo) | 30 segundos | Crítico en el tiempo durante operaciones activas |
| De campaña (recaudación de fondos, comunicaciones, eventos) | 5 minutos | Los datos cambian a lo largo del día, no segundo a segundo |
| Administrativo (cumplimiento, calidad de datos, configuración) | 15 minutos | Datos que cambian despacio |
| Candidato | 15 minutos | Resumen curado, no operativo |

**Comportamiento de la actualización:**

- **El botón de actualización manual es obligatorio** en todos los paneles. Siempre visible, siempre accesible. Nadie debe tener que adivinar si está viendo datos actuales ni esperar al siguiente ciclo de actualización automática.
- La actualización automática se pausa cuando la pestaña del navegador no está visible (ahorra ancho de banda en redes de baja conectividad).
- Actualización inmediata al reconectarse tras un período sin conexión.
- Usa sondeo periódico, no WebSockets — más simple y con degradación controlada en conexiones intermitentes.

**El indicador de actualidad de los datos es obligatorio** en todos los paneles. El panel siempre debe comunicar el estado de sus datos:

| Estado | Indicador | Comportamiento |
|-------|-----------|----------|
| **Actual** | Marca de tiempo discreta: "Actualizado hace 30 s" | Discreto; no reclama atención |
| **Actualizando** | Indicador de carga o barra de progreso en lugar de la marca de tiempo | Confirmación visible de que se están cargando datos nuevos |
| **Desactualizado** | Distintivo de advertencia: "Los datos tienen más de 5 minutos", en ámbar | Aparece cuando la antigüedad de los datos supera 2× el intervalo de actualización del panel |
| **Desconectado** | Banner persistente: "Sin conexión — se muestran datos en caché de [marca de tiempo]", en rojo o ámbar | No se puede descartar mientras no haya conexión |

En los **paneles operativos** (centro de mando de GOTV, operaciones de campo), el indicador de actualidad es información ambiental de alta visibilidad — siempre prominente, no escondido en una esquina. Quien toma decisiones urgentes durante las operaciones del día de elecciones nunca debe confundir datos desactualizados con datos actuales. El indicador debe usar color, posición y tamaño para que se note sin atención activa.

En **todos los demás paneles**, el indicador de actualidad sigue el mismo modelo de estados, pero puede usar una presentación más compacta (por ejemplo, una marca de tiempo junto al encabezado de la página que pasa a estado de advertencia cuando los datos están desactualizados o no hay conexión).

### Operaciones de campo (8 preguntas: #6–#13)

#### #6: Orden de la lista de recorrido → Optimizada por ruta por defecto; el Director de campo puede sobrescribirla

Las listas de recorrido se ordenan por ruta a pie optimizada de manera predeterminada (ya está especificado en el wireframe field-mode.md). Optimizar la ruta significa más puertas por hora — la restricción principal para el voluntariado a pie. El puntaje de prioridad se maneja mejor a nivel de asignación de territorios (dale los territorios de alta prioridad a tus mejores voluntarios) que dentro del orden de la lista de recorrido.

**Sobrescritura:** el Director de campo puede cambiar una lista de recorrido concreta a orden por prioridad. Es útil para las listas de seguimiento de GOTV, donde llegar a personas específicas importa más que la eficiencia del recorrido.

#### #7: Motivos de omisión en la ficha de puerta → 3× Not Home = baja de prioridad; Refused = alto inmediato

| Resultado | ¿Cuenta para el límite? | Efecto |
|---------|:-------------------:|--------|
| Not Home | Sí | Tras 3×, el contacto pasa a la cola de intentos por teléfono o SMS y sale de las listas de recorrido futuras |
| Refused | Inmediato | 1× = el contacto queda marcado como rechazado y sale de todo el trabajo de campo futuro de esta campaña |
| Come Back Later | No | Vuelve a la cola dentro del mismo turno o del siguiente; aplazamiento intencional |

El umbral (por defecto: 3) lo configura el Director de campo por campaña. El sistema muestra los contactos que se acercan al límite en la revisión de resultados (CANV-013) para que el Director de campo decida el escalamiento.

#### #8: Tamaño de las teselas de mapa sin conexión → Territorio asignado + margen de 500 m con zoom a nivel de calle

El sistema guarda en caché por adelantado las teselas de mapa del territorio asignado al voluntario más un margen de 500 m alrededor del límite del territorio, con zoom a nivel de calle (normalmente zoom 16–17 en los esquemas de teselas estándar).

El wireframe ya usa una vista esquemática simplificada (no imágenes de satélite), lo que reduce mucho las teselas necesarias. La pantalla de verificación previa al turno valida "Teselas de mapa en caché ✓" — el voluntariado sabe antes de salir si sus mapas están listos. Si se hace zoom más allá del área en caché: marcador de posición gris con "Mapa no disponible sin conexión" (ya está especificado en el wireframe).

El tamaño exacto en MB depende del proveedor de teselas y de la densidad de la región — eso es un detalle de implementación. El contrato de UX es: tu territorio asignado siempre está disponible sin conexión.

#### #9: Versionado del guion en campo → Los turnos activos quedan fijados a una versión; las actualizaciones urgentes llegan en la próxima puerta

Cuando empieza un turno, se carga la versión actual del guion y queda fijada para ese turno. A quien está en medio del trabajo de campo no le cambia el guion bajo los pies.

Si el Director de campo actualiza un guion a mitad del día, el voluntariado que ya está en campo mantiene su versión hasta que termine el turno.

**Sobrescritura por actualización urgente:** el Director de campo puede empujar una actualización marcada como "urgente". Aparece como notificación en la próxima ficha de puerta del voluntario — nunca durante la interacción en curso. El voluntario ve: "Guion actualizado — toca para revisar los cambios antes de seguir". Al empezar un turno nuevo siempre se carga la última versión del guion.

El historial de versiones del guion es visible para el Director de campo en el constructor de guiones.

#### #10: Reutilización de guiones entre campañas → Copia como plantilla, no enlace

"Guardar como plantilla" copia un guion en una biblioteca compartida de plantillas. Al crear un guion de campaña nuevo se ofrece "Empezar desde una plantilla" o "Empezar en blanco".

Una vez copiado, el guion de campaña es independiente — editarlo no afecta a la plantilla ni a otras campañas. Las plantillas son de toda la organización; cualquier Director de campo puede usarlas.

Es el patrón estándar de copiar en vez de enlazar: evita la contaminación accidental entre campañas y a la vez permite reutilizar.

#### #11: Restricciones de la generación automática de territorios → Valores por defecto configurables con vista previa obligatoria

| Restricción | Por defecto | Mín. | Máx. | Fundamento |
|-----------|---------|-----|-----|-----------|
| Contactos por territorio | 50 | 10 | 150 | 50 ≈ un turno de trabajo de campo de 2 horas a ~2.5 min por puerta |
| Tiempo de recorrido estimado | 2 horas | 30 min | 4 horas | Fatiga del voluntariado; duración del turno |
| Margen entre territorios | 0 (sin solapamiento) | — | — | Evita tocar dos veces la misma puerta |

Restricciones geográficas: no dividir territorios cruzando vías principales, ríos o vías férreas. Respetar los límites administrativos (barrios, precintos) cuando estén disponibles. Por debajo de 10 contactos, fusionar con el territorio adyacente.

La generación automática siempre produce una **vista previa** — el Director de campo revisa los territorios propuestos en el mapa y ajusta los límites antes de confirmar. Ningún resultado de la generación automática entra en producción sin aprobación humana.

#### #12: Reasignación de la lista de recorrido a mitad de turno → Sí; las puertas completadas se quedan, quien recibe la lista continúa

Las listas de recorrido se pueden reasignar a mitad de turno (voluntarios que no llegan, fatiga del voluntariado, prioridades que cambian).

- Las puertas completadas siguen completadas, sin importar la reasignación
- La lista de recorrido de quien recibe la asignación empieza en la primera puerta sin completar
- Si el voluntario original tiene datos sin sincronizar cuando ocurre la reasignación, se fusionan en la próxima sincronización — no se pierde nada
- **Resolución de conflictos:** si el voluntario anterior y el nuevo tocaron la misma puerta (condición de carrera durante la reasignación), el sistema conserva la interacción cronológicamente más reciente y marca el conflicto para que el Director de campo lo revise en CANV-013

#### #13: Conservación de los datos de resultados de trabajo de campo → Ya resuelto (ADR-016 §4)

Los registros individuales de interacción de campo (respuestas en la puerta, marcas de tiempo, notas del voluntariado) caen en el nivel operativo de la política de conservación de datos por niveles: 2 años por defecto, configurable entre 90 días y 5 años.

### Mensajería y comunicaciones (8 preguntas: #15–#20, #22–#23)

*Las preguntas #14 y #21 se resolvieron en la sección transversal de arriba.*

#### #15: Búsqueda de mensajes frente al cifrado E2E → La búsqueda solo está disponible con custodia de llaves

La ADR-008 estableció que las organizaciones pueden activar la custodia de llaves en el servidor (lo que desactiva el cifrado E2E). El comportamiento de la búsqueda de mensajes se desprende directamente:

| Modo de cifrado | Capacidad de búsqueda |
|----------------|-------------------|
| Cifrado E2E (por defecto) | Solo metadatos: emisor, fecha y hora, nombre de la conversación. El servidor no puede leer el contenido. |
| Custodia de llaves activada | Búsqueda de texto completo en el contenido de los mensajes. El servidor tiene acceso mediante la llave de custodia. |
| Ambos modos | Búsqueda local en el cliente de los mensajes ya guardados en caché en el dispositivo. |

La interfaz hace explícito el compromiso. Las conversaciones E2E muestran "Búsqueda limitada a los metadatos del mensaje" con una explicación breve del porqué. No es una limitación que haya que arreglar — es consecuencia directa del modelo de seguridad que eligió la organización.

#### #16: Confirmaciones de lectura → Cada persona puede desactivarlas; visibles por defecto

Las confirmaciones de lectura están activadas por defecto (convención estándar de mensajería). Cualquier persona puede desactivarlas en la configuración de su perfil. La desactivación es simétrica: oculta su estado de lectura a quien envía *y* le oculta a esa persona el estado de lectura de las demás.

En conversaciones de grupo, las confirmaciones de lectura se muestran como un conteo discreto ("Leído por 4") en vez de listar nombres, para evitar dinámicas de presión social.

**Consideración de seguridad:** en modo de coacción, las confirmaciones de lectura se desactivan automáticamente para impedir el rastreo de actividad.

#### #17: Contenido condicional en el constructor de correos → No en la v1; solo campos de combinación

Los bloques de contenido condicional (mostrar el párrafo A si es donante, el B si es voluntario) requieren una interfaz de lógica condicional, vista previa por variante y una matriz de pruebas. Es una complejidad considerable para el constructor.

La v1 admite: campos de combinación (`{{first_name}}`, `{{org_name}}`) y envíos por segmento (enviar campañas distintas a segmentos distintos). Eso cubre la gran mayoría de las necesidades de personalización sin lógica condicional dentro de la plantilla. Los bloques de contenido condicional se pueden añadir al constructor de correos en una versión futura.

#### #18: Estado de aprobación de las plantillas de WhatsApp → Sí, visible en el redactor

La API de WhatsApp Business exige plantillas de mensaje aprobadas de antemano. El redactor muestra el estado de aprobación de la plantilla en línea:

| Estado | Presentación | Comportamiento |
|--------|---------|----------|
| Aprobada | Distintivo verde | Lista para enviar |
| Pendiente | Distintivo ámbar | No se puede enviar; muestra el tiempo estimado de revisión |
| Rechazada | Distintivo rojo con el motivo | No se puede enviar; muestra el motivo de rechazo de Meta y un enlace para editar |

Esto evita el flujo frustrante de redactar un mensaje, darle a enviar y descubrir que Meta lo rechazó.

#### #19: Pruebas A/B por SMS → Se aplaza a la v2

Los SMS son más cortos y más caros que el correo electrónico. Las listas de SMS de campaña en el contexto objetivo (organización de base del Sur Global) suelen ser más pequeñas que las de correo. Las pruebas A/B requieren significancia estadística — con públicos más pequeños y un costo por mensaje más alto, la matemática casi nunca cuadra.

Las pruebas A/B se concentran en el correo (COMM-008), donde los volúmenes lo permiten. Se pueden reevaluar para SMS si los volúmenes de SMS de las organizaciones crecen lo suficiente.

#### #20: Constructor de secuencias escalonadas → Reglas lineales simples en la v1; el constructor visual de flujos es un pilar de la v2

Las secuencias escalonadas de la v1 usan un formato de reglas lineal:

```
Evento disparador → esperar N días → enviar mensaje → esperar N días → enviar mensaje
```

Sin lógica de ramificación. Las secuencias lineales cubren los casos de uso principales: series de bienvenida, recordatorios de promesas de donación, seguimiento posterior a eventos.

**Funcionalidad pilar de la v2: Constructor visual de flujos.** Un constructor de flujos en grafo de nodos con lógica de ramificación (si lo abre → camino A, si no → camino B), arrastrar y soltar visual y orquestación entre canales dentro de un mismo flujo. Es una capacidad insignia de la v2 — lleva al sistema de comunicaciones de enviar un mensaje a la vez a ejecutar secuencias ramificadas y multicanal. Debe diseñarse y dimensionarse como una funcionalidad mayor, no añadirse a pedazos.

#### #22: Flujo de aprobación de publicaciones en redes sociales → Configurable; por defecto, todas las publicaciones

En el contexto de una campaña política, cualquier publicación en redes sociales puede convertirse en una crisis. Por defecto: todas las publicaciones requieren aprobación antes de publicarse. El OA puede relajarlo a "solo las publicaciones marcadas" si la organización ya confía en su equipo de redes sociales.

La pantalla de aprobación muestra la publicación tal como se verá en cada plataforma (vista previa lado a lado, ya diseñada en SOCIAL-003).

#### #23: Biblioteca de contenidos → Carga de archivos en la v1; la biblioteca compartida de recursos es un pilar de la v2

v1: cada campaña o publicación tiene carga directa de archivos. Una sección de "cargas recientes" muestra los últimos 20 archivos subidos en toda la organización, lo que permite una reutilización ligera sin gestión dedicada de recursos.

**Funcionalidad pilar de la v2: Biblioteca compartida de contenidos.** Un sistema centralizado de gestión de recursos con etiquetado, búsqueda, seguimiento de uso, gestión de derechos, colecciones de recursos aprobados por marca y reutilización entre funcionalidades (una imagen subida para una publicación en redes se encuentra al armar una campaña de correo o una página de evento). Igual que el constructor visual de flujos, es una capacidad insignia de la v2 que debe diseñarse como un solo sistema, no como un añadido tardío.

### Redes sociales (2 preguntas: #24–#25)

#### #24: Analítica de la publicación cruzada → 1 publicación con desglose por plataforma

El modelo mental que establece SOCIAL-001 es "un mensaje, varios canales". La analítica lo refleja: una publicación cruzada muestra el alcance y la interacción agregados arriba, con un desglose por plataforma debajo (impresiones, clics, interacción por plataforma). Refuerza el modelo unificado del redactor y permite al equipo de comunicaciones comparar el rendimiento de cada plataforma con el mismo contenido.

#### #25: Creación de video para TikTok → Solo externa; se suben videos terminados

Editar video dentro de la plataforma es un alcance enorme — editores de línea de tiempo, efectos, transiciones, licencias de música. El contenido de TikTok se crea mejor en las herramientas del propio TikTok o en apps de video dedicadas. GreenGrass se encarga de: la carga, la programación, la redacción del texto, el flujo de aprobación y la analítica. El redactor acepta la carga de archivos de video y muestra una miniatura de vista previa.

### Eventos (4 preguntas: #26, #28–#30)

*La pregunta #27 se resolvió en la sección transversal de arriba.*

#### #26: Eventos de varios días → Un solo evento con varias franjas de fecha

Una conferencia o capacitación de varios días es conceptualmente un solo evento — una inscripción, una lista de asistentes, una encuesta posterior. La pantalla de detalle del evento (EVT-002) admite varias franjas de fecha y hora dentro de un mismo registro de evento. Cada franja puede tener su propia ubicación, su propio aforo y su propia lista de registro de entrada. Así se evita fragmentar los datos de asistencia entre eventos enlazados y coincide con la forma en que quienes organizan piensan los encuentros de varios días.

#### #28: Eventos recurrentes → Se crean instancias automáticamente, con editar o cancelar una o todas

Al crear un evento recurrente (capacitación semanal de trabajo de campo, asamblea comunitaria mensual), el sistema genera automáticamente las instancias según la regla de recurrencia. Cada instancia tiene su propia lista de asistentes y sus propios datos de registro de entrada.

**Editar** una instancia ofrece: "Editar solo este evento" o "Editar este y todos los eventos futuros" — el patrón estándar de calendario.

**Cancelar** una instancia ofrece el mismo patrón: "Cancelar solo este evento" o "Cancelar este y todos los eventos futuros". Cancelar una instancia no afecta a las demás. Las instancias canceladas siguen visibles en el calendario (atenuadas, marcadas como "Cancelado") para que el equipo vea lo que estaba planificado. Quienes habían confirmado asistencia a una instancia cancelada reciben una notificación de cancelación.

#### #29: Difusión durante el evento → Al personal por la app; a las personas asistentes por SMS

Las difusiones durante el evento sirven a dos públicos distintos por canales distintos:

**Difusión al personal (en la app):** durante un evento, los Gerentes de eventos pueden enviar una notificación push a todo el personal del evento (p. ej., "Mover el registro de entrada a la puerta 2", "El ponente lleva 15 min de retraso"). Usa el sistema de notificaciones existente — un anuncio unidireccional, no una conversación. Solo disponible para el personal con el rol de Gerente de eventos.

**Difusión a las personas asistentes (SMS):** la mayoría de las personas asistentes no va a tener la app instalada. Para los anuncios dirigidos a ellas (p. ej., "La sesión 2 se movió al salón B"), los Gerentes de eventos pueden enviar un SMS a todas las que ya registraron su entrada y dieron un número de teléfono al inscribirse o al confirmar asistencia. Usa la capacidad de SMS del sistema de comunicaciones, sujeta al modelo de consentimiento de SMS de la organización. Se limita a quienes registraron su entrada para no enviar mensajes a quienes no llegaron.

La pantalla de detalle del evento ofrece dos acciones de difusión distintas: "Notificar al personal" (en la app) y "Enviar mensaje a asistentes" (SMS), lo que deja explícitos el público y el canal.

<!-- REVISIT: el encabezado dice "gana la última escritura" y el cuerpo dice que gana la
marca de tiempo más temprana. Son reglas opuestas. La incoherencia viene del original. -->

#### #30: Registro de entrada sin conexión con varias personas del equipo → Gana la última escritura, con detección de duplicados

Cuando varias personas del equipo registran entradas sin conexión al mismo tiempo (sede grande, varios puntos de acceso), cada dispositivo mantiene su propia lista de registro de entrada. Al sincronizar, el sistema fusiona: si dos dispositivos registraron a la misma persona, gana la marca de tiempo más temprana y el duplicado queda anotado. Nadie aparece con la entrada registrada dos veces.

La pantalla de registro de entrada muestra un indicador de estado de sincronización (siguiendo el patrón de actualidad de los paneles de #5) para que el equipo sepa si está viendo el cuadro completo o trabajando con una vista solo local.

### Recaudación de fondos (4 preguntas: #33–#36)

*Las preguntas #31 y #32 se resolvieron en la sección transversal de arriba.*

#### #33: Requisito de foto para donaciones en efectivo → Obligatoria por encima de un umbral configurable (por defecto, el equivalente de $100 USD)

Por debajo del umbral: la foto es opcional pero recomendada. Por encima del umbral: la captura con la cámara es obligatoria antes de poder guardar el registro de la donación en efectivo. La foto se adjunta al registro de la donación para efectos del registro de auditoría.

El umbral lo configura la organización (por defecto: el equivalente de $100 USD en moneda local). Esto equilibra el rigor de auditoría con la fricción en campo — las donaciones pequeñas (colectas en puestos de mercado, puerta a puerta) no deberían obligar a pelearse con la cámara, pero las cantidades de efectivo más grandes necesitan documentación.

#### #34: Cantidad de variantes en las pruebas A/B → 2 variantes en la v1

Solo A/B (no A/B/C/D). Dos variantes bastan para la mayoría de las pruebas de páginas de recaudación (titulares distintos, montos solicitados distintos, imágenes distintas). Más variantes exigen públicos más grandes para alcanzar significancia estadística — el mismo problema matemático que las pruebas A/B por SMS (#19). La pantalla de resultados de la prueba (ya diseñada aparte de la de configuración, según decisión de diseño) muestra una comparación limpia cara a cara. Se puede añadir soporte para más variantes después sin cambiar el modelo de datos.

#### #35: Resolución de disputas sobre el reparto en una alianza → Escalamiento al líder de la alianza + plazo configurable

Si una organización miembro rechaza un reparto de recaudación propuesto, el rechazo incluye un motivo obligatorio. El líder de la alianza (o el comité, según el modelo de gobernanza de alliance.md) recibe el rechazo y media.

Si no hay resolución dentro de un plazo configurable (por defecto: 14 días), el reparto vuelve a la proporción por defecto de la alianza. No hay sistema formal de arbitraje — eso es gobernanza organizativa, no software.

#### #36: Actualidad de los datos del panel de recaudación → Cubierto por #5

Los paneles de recaudación caen en el nivel "De campaña" de #5: actualización automática cada 5 minutos, indicador de actualidad obligatorio y botón de actualización manual. Durante los empujones activos de recaudación (p. ej., el cierre de trimestre), el Gerente de campaña usa el botón de actualización manual para ver totales al momento.

### Activismo (5 preguntas: #37–#41)

#### #37: Campañas con varios destinatarios → Sí; una campaña, varios destinatarios, una carta por destinatario

Una campaña como "Dile a tus representantes que voten por X" puede dirigirse a varios legisladores. El simpatizante ve una sola página de acción. El sistema genera un mensaje de IA único para cada destinatario (con el modelo de generación ya diseñado en ACT-005). El simpatizante revisa y aprueba cada carta antes de enviarla.

El panel de la campaña muestra las tasas de respuesta por destinatario para que el equipo vea qué destinatarios están recibiendo más presión de sus constituyentes.

#### #38: Elección del modelo de IA → Bring Your Own Model (BYOM), independiente del proveedor

Cada vez más organizaciones tienen su propio entorno de IA — acuerdos empresariales, restricciones de cumplimiento sobre residencia de datos, modelos ajustados a su discurso y su tono, contexto de sus demás flujos de trabajo. La plataforma debe conectarse a esa infraestructura existente, no reemplazarla.

- **Configuración de BYOM:** BYOM es *Bring Your Own Model* — la organización configura su propio proveedor de IA. El OA lo configura en los ajustes, siguiendo el mismo patrón que BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) para el cifrado. La organización aporta un endpoint de API y credenciales. Las funcionalidades de IA de la plataforma (generación de mensajes, concierge, etc.) pasan por el proveedor que la organización configuró.
- **Valor por defecto de la plataforma:** las organizaciones sin infraestructura de IA propia reciben un modelo gestionado por la plataforma. Así todas las funcionalidades de IA funcionan de entrada para las organizaciones más pequeñas.
- **Interfaz independiente del proveedor:** la plataforma define qué necesita del modelo (generación de texto con soporte de idiomas), no qué modelo concreto es. Una capa de abstracción absorbe las diferencias de API de cada proveedor.
- **Continuidad del contexto:** usar el entorno de IA propio de la organización significa que los modelos que su equipo usa en el resto de su trabajo — con su tono, su terminología y su contexto institucional — son los mismos que mueven las funcionalidades de GreenGrass.

Esto conecta con el patrón BYOK existente: las organizaciones a las que les importa controlar su infraestructura pueden hacerlo; las que no, reciben valores por defecto sensatos.

#### #39: Cartas imprimibles → Sí; "Descargar como PDF" en la página de acción del simpatizante

Algunos destinatarios (oficinas de gobierno local, organismos reguladores) aceptan cartas físicas. Después de que el simpatizante aprueba su mensaje generado por IA, puede enviarlo por correo electrónico o descargar un PDF con formato para imprimirlo y enviarlo por correo postal. El PDF incluye la dirección postal del destinatario, el cuerpo de la carta con formato y el nombre del simpatizante.

Es un añadido de bajo costo — es el mismo contenido renderizado en otro formato de salida.

#### #40: Verificación del envío de comentarios → Verificación manual por el equipo + seguimiento de la entrega

Antes de lanzar una campaña de comentarios ante un regulador, el equipo tiene que verificar el punto de envío (dirección de correo o URL de un formulario web) y marcarlo como verificado en la configuración de la campaña. El sistema no verifica solo — los procesos de envío regulatorio varían demasiado de una jurisdicción a otra.

Después de que los simpatizantes envían, la campaña hace seguimiento del estado de entrega: Enviado, Entregado (confirmación de entrega del correo), Rebotado. Los envíos rebotados se marcan para revisión del equipo. No hay garantía de aceptación por parte del organismo regulador — eso queda fuera del control de la plataforma.

#### #41: Verificación de identidad del simpatizante → Opcional por campaña; por defecto, autodeclarada

Algunas campañas requieren validar la circunscripción (solo los constituyentes del Distrito 5 deberían escribirle al representante del Distrito 5). Quien crea la campaña puede activar la verificación de circunscripción, que añade un campo de dirección o de código postal a la página de acción y lo valida contra los límites de la circunscripción del destinatario.

Por defecto: desactivada (solo nombre y correo autodeclarados), porque cada campo adicional reduce la participación. Cuando se activa, el sistema es transparente: "Verificamos tu dirección para asegurar que tu mensaje llegue al representante correcto".

---

## Funcionalidades pilares de la v2

Funcionalidades explícitamente aplazadas de la v1 y designadas como capacidades mayores de la v2:

| Funcionalidad | Origen | Descripción |
|---------|--------|-------------|
| **Constructor visual de flujos** | #20 | Constructor de secuencias escalonadas en grafo de nodos, con lógica de ramificación, orquestación entre canales y arrastrar y soltar |
| **Biblioteca compartida de contenidos** | #23 | Gestión centralizada de recursos con etiquetado, búsqueda, seguimiento de uso, gestión de derechos y reutilización entre funcionalidades |
| **Delegación de ajustes** | #52 | Delegación controlada de categorías de configuración de bajo riesgo a roles que no son OA |

<!-- REVISIT: esta tabla lista tres funcionalidades pilares de la v2 y la línea correspondiente de las Consecuencias lista cuatro (añade las pruebas A/B de páginas públicas). La incoherencia viene del original en inglés y se conserva a propósito; no se arregla aquí. -->

### Prensa y medios (5 preguntas: #42–#46)

#### #42: Aplicación del embargo informativo → Seguimiento basado en la confianza, con registro de auditoría

La aplicación técnica (bloquear el acceso antes de la hora del embargo) es frágil — el contenido ya se compartió con los periodistas por correo. La plataforma registra: qué periodistas recibieron material embargado, cuándo y si se respetó el embargo.

La pantalla del comunicado de prensa muestra el estado del embargo (Activo / Levantado / Roto) y una línea de tiempo periodista por periodista. Si alguien rompe un embargo, el equipo puede marcarlo en su registro de contacto — eso informa decisiones futuras sobre quién recibe acceso anticipado. El sistema es una herramienta de seguimiento, no un sistema de DRM.

#### #43: Comunicación de crisis → Marca de urgente con flujo simplificado, no un modo aparte

Un "modo de crisis" dedicado implica un estado binario en el que hay que entrar y del que hay que salir — ceremonia justo cuando más importa la velocidad. En cambio: cualquier comunicado o declaración se puede marcar como "Urgente", lo que:

- Dispara un flujo de aprobación simplificado (menos personas aprobadoras requeridas, plazos más cortos)
- Lo pone al principio de la cola del equipo de comunicaciones
- Envía notificación inmediata a los contactos de crisis designados

El constructor de declaraciones (ya diseñado como simplificado, según decisión de diseño) es la herramienta de crisis. No necesita un modo aparte.

#### #44: Tono de la cobertura → Solo manual en la v1

El análisis automático del tono de los titulares requiere procesamiento de lenguaje natural (PLN) que rinde mal con medios multilingües del Sur Global (pocos datos de entrenamiento, contexto cultural, sarcasmo). El etiquetado manual del tono (Positivo / Neutral / Negativo / Mixto) por parte del equipo de prensa que sí lee la cobertura es más preciso.

La pantalla del registro de cobertura muestra un gráfico de distribución del tono. La sugerencia automática se puede explorar en una versión futura si la infraestructura de IA con BYOM (#38) hace viable el tono multilingüe.

#### #45: Presentación pública de los respaldos → Tres ubicaciones

1. **Endorsement pipeline Kanban (PRESS-011)** — la vista de gestión para que el equipo de prensa haga seguimiento del estado de los respaldos
2. **Candidate dashboard (DASH-002)** — un conteo resumen y una tarjeta de respaldos recientes, porque los respaldos son métricas de alto impacto para las candidaturas
3. **Public endorsement page (PUB-004 o sección dedicada)** — una lista de cara al público, que el OA puede restringir, para kits de prensa y comunicaciones dirigidas a simpatizantes

#### #46: Comunicados de prensa en varios idiomas → Un solo comunicado con variantes por idioma

Un solo registro de comunicado de prensa con varias versiones de idioma, gestionadas como pestañas dentro del editor de comunicados (PRESS-003). Todas las variantes de idioma comparten el mismo embargo, la misma lista de distribución y los mismos metadatos. Cada variante puede tener su propia sublista de distribución a periodistas (los periodistas francófonos reciben la versión en francés).

Así el comunicado sigue siendo una sola entidad lógica y a la vez admite distribución multilingüe.

### GOTV y día de elecciones (4 preguntas: #47–#50)

*La pregunta #51 se resolvió en la sección transversal de arriba.*

#### #47: Flujos oficiales de datos electorales → Capa de abstracción con alternativa manual de reserva

Las API de las autoridades electorales varían enormemente de un país a otro y muchas veces no existen en el Sur Global. La plataforma define un esquema estándar de datos electorales (centros de votación, listas de candidaturas, límites de distrito, resultados) y ofrece dos vías de ingesta:

1. **Conector de API** para las jurisdicciones que ofrecen flujos legibles por máquina, configurado por organización
2. **Importación manual** por CSV u hoja de cálculo para todo lo demás

En la v1 no se promete la integración con ninguna autoridad electoral concreta. El valor está en el esquema estándar y en el flujo de importación manual. Los conectores de API se pueden añadir por jurisdicción según la demanda lo justifique.

#### #48: Transporte compartido en la alianza → Sí, opcional; lo activa el líder de la alianza

Los miembros de la alianza pueden aportar conductores a una bolsa compartida para el transporte a las urnas del día de elecciones. El líder de la alianza lo activa en la configuración de GOTV.

- Los conductores de cada organización miembro siguen siendo visibles para esa organización
- Las solicitudes de transporte se pueden enrutar a cualquier conductor disponible de la bolsa compartida
- **Prioridad de asignación de conductores:** primero la misma organización, después la bolsa de la alianza
- Cada organización solo ve en sus propios informes los viajes que cubrieron sus propios conductores
- El panel de la alianza muestra métricas agregadas

#### #49: Algoritmo de reasignación → Basado en reglas en la v1

Las sugerencias de reasignación (ya sujetas a intervención humana, según decisión de diseño) usan reglas simples: si la cobertura de voluntariado de un centro de votación baja de un umbral configurable, se sugiere reasignar desde centros con exceso de personal.

Las reglas son transparentes y auditables — el equipo puede ver exactamente por qué se hizo una sugerencia. Los modelos predictivos (predicción de participación electoral con aprendizaje automático, asignación óptima) requieren datos de entrenamiento que no existen para la mayoría de las elecciones del Sur Global. Basarse en reglas es lo correcto para la v1; lo predictivo se puede explorar a través de la infraestructura de BYOM (#38) en versiones futuras.

#### #50: Seguridad en la captura de resultados → Verificación en varias capas sin frenar la velocidad

| Capa | Mecanismo | Propósito |
|-------|-----------|---------|
| Identidad | Solo los observadores electorales registrados (GOTV-012) pueden enviar resultados | Impide envíos anónimos |
| Geolocalización | Sello GPS opcional en el envío (quien observa debe estar cerca del centro de votación) | Disuade la fabricación a distancia; opcional porque el GPS puede no funcionar bajo techo |
| Evidencia fotográfica | Foto de la pizarra o el acta oficial de resultados adjunta al envío | Artefacto principal de verificación |
| Cotejo cruzado | Comparación lado a lado cuando varias personas observadoras envían desde el mismo centro | Marca las discrepancias para revisión en el centro de mando |
| Registro de auditoría | Todos los envíos son inmutables, con fecha y hora, ID de quien envía e información del dispositivo | No se puede borrar, según la política de conservación |

Ninguna capa por sí sola bloquea — un observador electoral sin señal de GPS igual puede enviar. Pero las capas se acumulan: una captura fraudulenta necesitaría un observador registrado, en el centro correcto, con una foto convincente y que además cuadre con los envíos de otros observadores. El panel del centro de mando destaca las discrepancias para revisión humana.

### Configuración y administración (4 preguntas: #53–#56)

*La pregunta #52 se resolvió en la sección transversal de arriba.*

#### #53: Aprobación de dos OA → Sí, solo para operaciones destructivas

Las operaciones destructivas requieren la confirmación de un segundo OA:

- Borrar la organización
- Revocar todas las llaves de API
- Bajar el nivel de seguridad
- Quitar la última integración de un tipo crítico (procesador de pagos, proveedor de SMS)

Los cambios rutinarios de configuración (actualizar el nombre de la organización, ajustar los topes de frecuencia, editar plantillas de rol) no requieren aprobación de dos OA.

**Alternativa de reserva con un solo OA:** si la organización tiene un único OA, las operaciones destructivas exigen en su lugar un período de espera de 48 horas con confirmación por correo. Esto evita cambios catastróficos accidentales o forzados sin añadir fricción a la administración diaria.

#### #54: Importación y exportación de la configuración → Solo exportación en la v1

Los OA pueden exportar su configuración como una instantánea JSON para documentación, copia de seguridad o para compartirla con consultores.

La importación entre organizaciones (aplicar la configuración de la organización A a la B) queda aplazada — exige validar que la organización de destino tenga las mismas integraciones, los mismos procesadores de pago y la misma jurisdicción de cumplimiento. Una instantánea de la configuración es útil como referencia aunque no haya importación automática.

#### #55: Límites de solicitudes de la API → Valores por defecto por plan, con sobrescritura por llave

Cada plan de precios define límites de solicitudes por defecto. Los OA pueden ajustar los límites por llave de API dentro del techo del plan — p. ej., darle a la llave de sincronización del padrón electoral un límite más alto que a la llave de informes.

La pantalla de configuración de la API (SET-017) muestra el uso actual frente a los límites de cada llave. Todas las respuestas de la API incluyen encabezados de límite de solicitudes según la convención estándar (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

#### #56: Monitoreo del estado de las integraciones → Verificaciones de estado proactivas con escalamiento de alertas

El centro de integraciones (SET-012) muestra el estado en tiempo real de cada integración: Conectada (verde), Degradada (ámbar), Fallida (rojo). El sistema ejecuta verificaciones de estado periódicas (ping a la API, validez del token, marca de tiempo de la última sincronización exitosa).

**Escalamiento de alertas:**

1. Notificación en la app al OA tras el primer fallo
2. Alerta por correo tras 3 fallos consecutivos
3. Banner de advertencia en el panel si una integración crítica (procesador de pagos, proveedor de SMS) está caída

La pantalla de detalle de la integración muestra una línea de tiempo del estado (últimos 30 días) para que el OA distinga los problemas intermitentes de los fallos sostenidos.

### Autenticación y seguridad (4 preguntas: #57–#60)

#### #57: Sincronización de passkeys → Se permiten los passkeys sincronizados en la nube

Los passkeys atados solo al dispositivo (llaves de seguridad de hardware) son más seguros, pero crean un problema grave de usabilidad: si pierdes el celular, pierdes el acceso. En el contexto objetivo (Sur Global, dispositivos de gama baja, dispositivos compartidos en familia), perder y reemplazar el dispositivo es común.

Los passkeys sincronizados en la nube (iCloud Keychain, Google Password Manager) dan la resistencia al phishing de WebAuthn con una recuperación práctica. La configuración del nivel de seguridad puede restringirlos a los atados al dispositivo para las organizaciones en el nivel Máximo.

#### #58: TOTP como alternativa de reserva → Sí, opcional en los niveles de seguridad Reforzado y Máximo

La autenticación con passkey requiere un viaje breve de ida y vuelta por la red. En zonas con conectividad intermitente, eso puede fallar. TOTP (Google Authenticator, etc.) funciona completamente sin conexión después de la configuración inicial.

Los OA en el nivel de seguridad Reforzado o Máximo pueden activar TOTP como método de autenticación de reserva. El nivel Estándar se apoya solo en el passkey más la recuperación por contacto de confianza (configuración más simple para organizaciones pequeñas).

#### #59: Recuperación del OA sin contactos de confianza → Asistida por la plataforma, con verificación de identidad

Este es el "problema de arranque" — el primer OA no tiene pares que respondan por él.

**Resolución:** el OA contacta al soporte de GreenGrass, que verifica su identidad por el canal original de registro de la organización (el correo usado al inscribirse, el método de pago en archivo). Tras la verificación, el soporte inicia una **recuperación con período de espera de 72 horas** (más largo que las 24 horas estándar porque no hay verificación por pares). Durante el período de espera, todos los contactos de correo de la organización reciben una notificación.

Es lento y visible a propósito — es la vía de recuperación de mayor riesgo.

#### #60: Compatibilidad de passkeys en dispositivos de gama baja → Android 9+ / iOS 16+ / Chrome 109+

Esto cubre la gran mayoría de los dispositivos en uso activo en el Sur Global (Android 9 es de 2018). Los dispositivos por debajo de ese umbral recurren a la autenticación por enlace mágico (basada en correo, sin WebAuthn).

La pantalla de inicio de sesión detecta automáticamente el soporte de WebAuthn y muestra el flujo adecuado — nadie tiene que decidir nada.

### Perfil de usuario (3 preguntas: #61–#63)

#### #61: Privacidad de la foto de perfil → Solo interna por defecto

Las fotos de perfil aparecen en la mensajería interna, en los directorios del personal y en las pantallas de asignación. No se muestran en contextos de cara a los simpatizantes (portal, correos, páginas públicas) salvo que la persona active explícitamente "Mostrar mi foto a los simpatizantes" en la configuración de su perfil.

Por defecto: desactivado. Esto protege la identidad del personal en contextos sensibles en materia de seguridad.

#### #62: Sonidos de notificación → Solo el predeterminado del sistema operativo

Los sonidos de notificación personalizados requieren gestión de archivos de audio y sincronización por dispositivo, y no aportan valor real. La plataforma usa el sonido de notificación predeterminado del dispositivo. Quien quiera sonidos personalizados puede configurarlos a nivel del sistema operativo para la app de GreenGrass.

La configuración del perfil ofrece: sonidos activados o desactivados, vibración activada o desactivada.

#### #63: Notificaciones de varias organizaciones → Sí, con distintivo de organización; configurable por organización

Quienes trabajan con varias organizaciones (consultores, coordinadores de alianzas) necesitan ver las notificaciones de las organizaciones que no están activas — si no, se perderían mensajes urgentes.

Cada notificación muestra un distintivo de organización (avatar y nombre). Se pueden silenciar las notificaciones por organización en la configuración del perfil. Las notificaciones de la organización activa siempre se muestran; las de las organizaciones no activas se agrupan en una sección aparte de la bandeja de notificaciones.

### Soporte y ayuda (4 preguntas: #64–#67)

#### #64: Idioma del concierge de IA → Se detecta a partir de la pregunta; por defecto, el configurado

Si alguien escribe en francés, se le responde en francés — aunque el idioma de su perfil sea el inglés. La detección de idioma da una experiencia más natural a las personas multilingües que cambian de idioma.

Si la confianza de la detección es baja (consulta muy corta, idiomas mezclados), se recurre al idioma configurado en el perfil. El concierge siempre ofrece "Cambiar a [idioma configurado]" como acción rápida.

#### #65: La capacitación completada como requisito bloqueante → Sí, solo para la capacitación crítica de seguridad

El OA marca ciertos módulos de capacitación como "obligatorios antes de salir a campo" (p. ej., protocolos de seguridad, desescalada, pautas de interacción con votantes). Los voluntarios que no completaron los módulos obligatorios no se pueden asignar a turnos — la pantalla de asignación muestra "Capacitación incompleta" con un enlace al módulo pendiente.

La capacitación no obligatoria (tutoriales de la plataforma, buenas prácticas) se recomienda, pero no bloquea nada.

#### #66: Contenido externo en la base de conocimiento → Sí, con distinción visual clara

Los artículos de la base de conocimiento pueden enlazar a recursos externos (guías de organizaciones aliadas, páginas de autoridades electorales de gobierno, videos de capacitación de terceros). Los enlaces externos se distinguen visualmente (icono + rótulo "Enlace externo") y se abren en una pestaña nueva.

El sistema de ayuda no incrusta ni guarda en caché contenido externo — es un enlace, no un espejo. Así se evitan copias en caché desactualizadas y a la vez las organizaciones pueden curar recursos más allá de lo que hay en la base de conocimiento de la plataforma.

#### #67: Prevención de respuestas inventadas de la IA → Anclado en la base de conocimiento, con un "no sé" explícito

El concierge de IA está anclado estrictamente en la base de conocimiento de la organización y en la documentación de la plataforma GreenGrass. Si una pregunta no se puede responder desde esas fuentes, el concierge dice "No tengo información sobre eso" y ofrece conectar a la persona con soporte o buscar en la base de conocimiento.

Sin razonamiento más amplio ni conocimiento externo. Esta es una plataforma política — una respuesta inventada sobre ley electoral o cumplimiento puede tener consecuencias reales.

### Páginas públicas (4 preguntas: #68–#71)

#### #68: Dominios personalizados → Sí, en la v1

Las organizaciones pueden apuntar un dominio personalizado (p. ej., `join.partyname.org`) a sus páginas públicas. La plataforma se encarga del aprovisionamiento del certificado SSL (Let's Encrypt). Se configura en SET-012 (integraciones). Por defecto: las páginas se sirven bajo un subdominio de GreenGrass (`partyname.greengrass.app`).

Los dominios personalizados son críticos para la credibilidad de la marca — quien hace clic en un enlace de donación necesita ver el dominio de la organización, no el de la plataforma.

#### #69: Analítica de páginas → Analítica ligera integrada; sin rastreo de terceros

Las páginas públicas registran: vistas, visitantes únicos, tasa de conversión (envíos de formulario / vistas) y origen de referencia (parámetros UTM). Se muestra en el panel de páginas públicas.

Sin analítica de terceros (Google Analytics, Meta Pixel) en la v1 — plantean problemas de privacidad y añaden complejidad de consentimiento de cookies en las jurisdicciones de GDPR y LGPD. Los OA que necesiten analítica más profunda pueden añadir scripts externos mediante un campo de inyección de código personalizado (ajuste avanzado, desactivado por defecto).

#### #70: Pruebas A/B en el registro de voluntarios → Se aplaza a la v2

Las pruebas A/B en páginas públicas requieren repartir el tráfico, servir variantes y hacer análisis estadístico. La infraestructura de pruebas A/B de recaudación (#34) está acotada a las páginas de donación. Extenderla a las páginas de registro de voluntarios es trabajo adicional. En la v1, las organizaciones iteran a mano el texto de su página de registro. Cuando la infraestructura de pruebas A/B madure, extenderla a las páginas públicas es sencillo.

#### #71: Imágenes de Open Graph → Generadas automáticamente, con sobrescritura manual

La plataforma genera automáticamente las imágenes OG a partir del título de la página + el logo de la organización + los colores de marca (composición simple de plantilla, no IA). Los OA pueden sobrescribirla subiendo a mano una imagen por página.

La generación automática asegura que todo enlace compartido tenga imagen de vista previa (crítico para compartir en redes sociales) sin exigir trabajo de diseño en cada página.

### Puesta en marcha (3 preguntas: #72–#74)

#### #72: Comportamiento al omitir pasos del asistente → Núcleo obligatorio (3 pasos), extensiones opcionales

Tres pasos no se pueden omitir: nombre de la organización + cuenta de administrador + selección del nivel de seguridad. La plataforma no puede funcionar sin ellos.

Todos los demás pasos del asistente (procesador de pagos, configuración de cumplimiento, WhatsApp, SMS, importación del padrón electoral) muestran una opción de "Omitir por ahora" que los añade a la lista de verificación posterior al asistente.

**Camino mínimo viable:** 3 pasos hasta una organización funcionando con funcionalidades básicas, y después configuración progresiva por lista de verificación.

#### #73: Reanudar el asistente → Sí, con guardado automático tras cada paso completado

Si se abandona el asistente (se cierra el navegador, expira la sesión), el siguiente inicio de sesión retoma desde el último paso completado. Los pasos completados aparecen como hechos con una marca de cotejo; el paso actual viene prellenado con lo que ya se había escrito. No se pierden datos al abandonarlo. El estado del asistente persiste hasta que el asistente se completa o el OA lo reinicia explícitamente.

#### #74: Lista de verificación posterior al asistente → Persiste hasta completar los elementos obligatorios; después se puede descartar

La lista de verificación aparece en el panel después del asistente. Los elementos obligatorios (los que se omitieron durante el asistente) no se pueden descartar uno a uno — la lista se queda hasta que estén hechos. Los elementos opcionales ("Invita a la primera persona de tu equipo", "Crea tu primer evento") sí se pueden descartar uno a uno.

Una vez completados todos los elementos obligatorios, toda la lista se puede descartar con la acción "Entendido, ocultar la lista".

### Portal de simpatizantes (3 preguntas: #75–#77)

#### #75: Niveles de autenticación → Ya decidido (enlace mágico + cuenta completa)

Magic link para el acceso básico (ver el historial de donaciones, descargar recibos). Cuenta completa (con passkey) para las acciones de gestión (actualizar el método de pago, cambiar las preferencias de comunicación). Esto quedó registrado en la tabla de decisiones de diseño de supporter-portal.md. Aquí se confirma como canónico.

#### #76: Identidad visual del portal → Logo, colores y contenido; no la disposición

El portal de simpatizantes usa el logo de la organización, sus colores de marca principal y secundario y un texto de bienvenida propio. La disposición, la estructura de navegación y el diseño de los componentes son fijos (los controla la plataforma).

Así se asegura una UX consistente entre organizaciones y a la vez cada una conserva su identidad visual. No se admite personalización a nivel de CSS (fuentes propias, sobrescrituras de la maquetación) — genera carga de soporte y rompe las garantías de accesibilidad.

#### #77: Portal en móvil → Web adaptable, no una app aparte

El portal de simpatizantes es una aplicación web adaptable que funciona en los navegadores de los celulares. No hay app nativa para simpatizantes — la barrera de instalación mataría la adopción. El portal ya está diseñado con prioridad móvil (según la decisión de diseño de las páginas públicas).

Las capacidades de PWA (añadir a la pantalla de inicio, ver recibos sin conexión) se pueden añadir de forma incremental sin necesidad de estar en una tienda de apps.

### Alianza (5 preguntas: #78–#82)

#### #78: Visibilidad de datos entre organizaciones de la alianza → Se comparte la existencia del contacto; los detalles de interacción son privados

**Compartido por defecto:** la existencia del contacto (evita el contacto duplicado) y las métricas agregadas de campaña (total de puertas tocadas, total recaudado).

**Privado por defecto:** los registros individuales de interacción, las notas internas y el historial de comunicación con el simpatizante.

La pantalla de configuración de intercambio de la alianza (ya diseñada con vistas por categoría y por organización) controla estos límites. Los OA pueden aflojar el intercambio por categoría.

#### #79: Jerarquía de la alianza → Plana en la v1

Una alianza es un grupo de un solo nivel de organizaciones miembro. Sin subalianzas, sin jerarquías anidadas. Las alianzas jerárquicas añaden bastante complejidad a la gobernanza, a las reglas de intercambio de datos y a la agregación en los paneles.

Las alianzas planas cubren el caso de uso principal: socios de una coalición que se coordinan para una elección. Si hacen falta subalianzas, se pueden modelar como alianzas separadas con membresía solapada.

#### #80: Propiedad de los datos de una campaña conjunta → La organización líder los conserva; cada miembro conserva los suyos

Cuando termina una campaña conjunta:

- La **organización líder** (o el comité, según el modelo de gobernanza) conserva el registro de la campaña conjunta, los resultados agregados y los recursos compartidos
- Cada **organización miembro** conserva acceso completo a las interacciones que hicieron sus propios voluntarios y a los contactos que aportó a la campaña
- Los **contactos compartidos** (contactados por varias organizaciones) permanecen en el CRM de cada una de forma independiente — no hay deduplicación forzada entre organizaciones

Ninguna organización miembro pierde acceso a los datos que generó su gente.

#### #81: Permisos del panel de la alianza → Solo datos agregados; por miembro, con su consentimiento

El panel de la alianza muestra métricas agregadas (total de puertas, total recaudado, total de eventos) de todos los miembros. El rendimiento de cada miembro solo lo ve el líder de la alianza, y cada miembro el suyo propio.

El líder de la alianza puede activar la visibilidad por miembro si todos consienten (se configura en los ajustes de la alianza y requiere el consentimiento expreso del OA de cada miembro).

#### #82: SLA de las solicitudes de afiliación → Plazo de 30 días con recordatorios

Una solicitud de afiliación que queda sin respuesta durante 30 días vence sola. El sistema envía recordatorios a los 7, 14 y 21 días al OA de la organización destinataria. Después del vencimiento, la organización solicitante puede volver a enviarla. No hay aprobación automática — el silencio significa no.

La organización solicitante ve el estado de la solicitud (Pendiente / Aceptada / Rechazada / Vencida) en su pantalla de alianza.

### CRM y datos (4 preguntas: #83, #85–#87)

*La pregunta #84 se resolvió en la sección transversal de arriba.*

#### #83: Umbral de confianza de la deduplicación → Tres niveles según la confianza del cruce

| Confianza | Acción | Ejemplo |
|-----------|--------|---------|
| 95%+ (exacto) | Fusión automática con anotación en el registro de auditoría | Mismo correo electrónico, mismo número de teléfono |
| 70–94% (probable) | Se muestra en la cola de revisión de duplicados para fusión manual | Nombre parecido + mismo código postal |
| Menos de 70% | Se ignora salvo búsqueda manual | Solo el mismo apellido |

Los umbrales los configura la organización. La pantalla de revisión de duplicados (ya diseñada como comparación lado a lado) atiende el nivel de revisión manual. Los registros fusionados automáticamente quedan anotados en el registro de auditoría con el motivo del cruce, y se puede deshacer la fusión dentro de la ventana de reversión de importación.

#### #85: Actualización de segmentos → Al acceder + actualización diaria en segundo plano

Los segmentos dinámicos se recalculan cuando alguien abre el segmento (para asegurar datos actuales) y una vez al día en un proceso en segundo plano (para que la segmentación de las campañas esté al día).

La lista de segmentos muestra "Última actualización: [marca de tiempo]" en cada uno. Los segmentos grandes (más de 50 000 contactos) pueden tardar segundos en recalcularse — la interfaz muestra un estado de carga en vez de datos desactualizados. La actualización manual está disponible con un botón en la pantalla de detalle del segmento.

#### #86: Auditoría de las exportaciones de datos → Se exige un motivo en las exportaciones masivas (más de 100 registros)

Exportar más de 100 registros obliga a elegir un motivo de una lista predefinida: Informe de cumplimiento / Operaciones de campaña / Migración de datos / Intercambio con la alianza / Otro + texto libre. El motivo queda anotado en el registro de auditoría junto con los metadatos de la exportación (quién, cuándo, cuántos registros, qué campos).

Ver registros individuales y las exportaciones pequeñas (menos de 100 registros) no requieren motivo — eso añadiría fricción al uso normal del CRM.

#### #87: Taxonomía de etiquetas → Plana, con convención de prefijos opcional

Las etiquetas son cadenas planas. No se impone jerarquía ni relaciones de padre e hijo. Las organizaciones que quieren jerarquía usan una convención de nombres: `region:north`, `region:south`, `issue:education`, `issue:healthcare`.

El selector de etiquetas admite el filtrado por prefijo (escribe "region:" para ver todas las etiquetas de región). Da la flexibilidad de la jerarquía sin la complejidad de una estructura de árbol.

### Transversales (2 preguntas: #88–#89)

#### #88: Paneles en tiempo real frente a sondeo periódico → Sondeo periódico en la v1 (cubierto por #5)

Todos los paneles usan sondeo periódico a intervalos por niveles (de 30 s a 15 min según el tipo de panel). Los WebSockets añaden complejidad de infraestructura (gestión de conexiones, lógica de reconexión, configuración del balanceador de carga) sin un beneficio proporcional de UX, dados esos intervalos de actualización.

El indicador de actualidad obligatorio (#5) hace transparente el modelo de sondeo para quien lo usa. Los WebSockets se pueden evaluar para la v2 si los paneles operativos necesitan actualizaciones de menos de un segundo.

#### #89: Biblioteca de widgets del panel → Vocabulario fijo de widgets en la v1

Todos los paneles se arman con un conjunto estándar de tipos de widget:

- Tarjeta de métrica (un solo número + tendencia)
- Gráfico de barras
- Gráfico de líneas
- Tabla
- Mapa
- Lista de estado
- Barra de progreso
- Banner de alerta

Sin constructor de widgets personalizados ni visualizaciones definidas por quien usa la plataforma. Esto asegura consistencia visual, simplifica la implementación y mantiene los paneles predecibles. El conjunto de widgets se puede ampliar a medida que maduren las necesidades de los paneles.

---

## Consecuencias

- **Las 89 preguntas abiertas quedan resueltas**
- **Las dos contradicciones quedan resueltas:** la delegación de la configuración se aplaza; los topes de frecuencia y la orquestación entre canales se vuelven complementarios
- **Nuevas capacidades del sistema que hacen falta:**
  - Ventana de silencio entre canales (orquestación de capa 2)
  - Componente de indicador de actualidad para los paneles
  - Biblioteca de plantillas de guiones
  - Presentación del estado de aprobación de las plantillas de WhatsApp en el redactor
  - Capa de abstracción de proveedores de IA con BYOM (Bring Your Own Model) y su pantalla de configuración
  - Generación de cartas en PDF para las campañas de activismo
  - Esquema estándar de datos electorales con vías de conector de API e importación por CSV
  - Verificación en varias capas de la captura de resultados (identidad, geolocalización, foto, cotejo cruzado)
  - Flujo de aprobación de dos OA para las operaciones destructivas de configuración
  - Monitoreo del estado de las integraciones con escalamiento de alertas
  - Vía de recuperación del OA asistida por la plataforma (período de espera de 72 horas)
  - La capacitación completada como requisito bloqueante para la asignación de turnos
  - Soporte de dominios personalizados con aprovisionamiento de SSL
  - Imágenes de Open Graph generadas automáticamente
  - Motor de confianza de deduplicación de tres niveles (fusión automática / cola de revisión / ignorar)
- **Funcionalidades pilares de la v2 identificadas:** Constructor visual de flujos, Biblioteca compartida de contenidos, Delegación de ajustes, Pruebas A/B de páginas públicas
- **La integración entre eventos y recaudación se aprieta:** la implementación debe admitir registros de donación con metadatos del evento
- **La conservación de datos es un asunto de nivel de plataforma:** debe implementarse como infraestructura, no funcionalidad por funcionalidad
- **No quedan preguntas abiertas.** El Apéndice A de la auditoría de wireframes queda totalmente resuelto. Todas las resoluciones están registradas en esta ADR con referencias de sección rastreables.
