# ADR-020: Los cuatro servicios centrales y los constructores

**Estado:** Aceptada
**Fecha:** 2026-09-28
**Fuentes:** `spec/comms-intelligence.md`, `spec/press.md`, `design/architecture/system.md`, `decisions/013-analytics-ai.md`, `decisions/015-product-scope.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`

## Contexto

La [ADR-019](019-central-services-and-metered-billing.md) les dio casa a los servicios centrales: un catálogo, derechos de uso por organización, medición de uso, ejecución para una sola organización por llamada y nada conservado entre llamadas. Nombró las clases de capacidad que vivirían ahí y dejó para después cuáles serían. El tablero de servicios de la alianza que recoge la [entrada 13 del diario](../diary/13-services-a-la-carte.md) dibuja cuatro servicios, con la supresión mutua consultada antes de cada envío: captura, análisis, constructores y despacho de salida.

Tres de los cuatro ya existen en el corpus con otros nombres. La captura es el monitoreo automatizado de medios que [comms-intelligence.md § 9. Las iteraciones](../spec/comms-intelligence.md#9-las-iteraciones) ordena como Iteración 3 y que la [ADR-015](015-product-scope.md#aplazado-monitoreo-automatizado-de-medios) aplaza. El análisis es el trabajo de expedientes de las Iteraciones 4 a 6, más el análisis de resultados electorales publicados. El despacho de salida es el transporte por canal que [system.md § Infraestructura de comunicaciones](../design/architecture/system.md#infraestructura-de-comunicaciones) ya especifica y que la ADR-019 cuenta como servicio central.

Los constructores son lo nuevo. El corpus ha aceptado exactamente una funcionalidad de generación: [ADR-013 § Mensajes personalizados generados por IA para el activismo](013-analytics-ai.md#mensajes-personalizados-generados-por-ia-para-el-activismo), donde un simpatizante revisa, edita y aprueba el borrador de un mensaje antes de que se envíe. El servicio de constructores del tablero redacta textos, imágenes y videos para el equipo de campaña. La [ADR-016](016-cross-cutting-resolutions.md) #25 dejó la creación de video fuera de la plataforma. Y la [ADR-018](018-ai-agent-posture.md) condiciona cualquier capacidad de IA con alcance de lectura amplio, capacidad de invocar herramientas, acción autónoma o credenciales amplias a que se acepte su revisión.

### Conflictos que resuelve esta ADR

1. **[ADR-015 § Aplazado: monitoreo automatizado de medios](015-product-scope.md#aplazado-monitoreo-automatizado-de-medios)** aplaza el monitoreo "como iniciativa de producto dedicada". La captura lo especifica.
2. **[ADR-016](016-cross-cutting-resolutions.md) #25** decide que la creación de video para TikTok es "solo externa; se suben videos terminados". El tablero pone el video entre los constructores.

## Decisión

### Cuatro servicios centrales

| Servicio | Qué hace | Sobre qué trabaja | Dónde aterriza el resultado | Cuándo |
|---|---|---|---|---|
| **Captura** | Recoge prensa publicada, medios de difusión (TV, radio y pódcasts, transcritos), cuentas públicas de redes sociales y encuestas publicadas | Fuentes públicas. El corpus puede compartirse dentro de un país; las consultas contra él se acotan por organización | La bandeja de monitoreo de la organización | Iteración 3 de inteligencia de comunicaciones, condicionada a la Iteración 0 |
| **Análisis** | Análisis electoral sobre resultados publicados; entrega de hallazgos de investigación de la oposición y de investigación propia | Resultados publicados, que se comparten como el corpus de captura. Investigación, que nunca se comparte | La organización. La investigación aterriza en el compartimento que nombre su contrato | Investigación: Iteraciones 4 a 6, puntos de decisión sin cambios. Análisis electoral: sin iteración asignada |
| **Constructores** | Redactan texto, imágenes y video a partir de un encargo que entrega una persona | Solo lo que le entrega la persona que lo invoca | Un borrador dentro de la organización | Texto: nueva Iteración 7. Imágenes y video: propuestos, ver más abajo |
| **Transporte por canal** | Envía correo, SMS y WhatsApp, y distribuye a cuentas de redes sociales | Los mensajes propios de la organización | El destinatario | Ya especificado; la supresión mutua corre antes de cada envío |

Todos corren bajo la ADR-019 sin excepción: un derecho de uso por organización, una organización por llamada, nada conservado, costos medidos de proveedores trasladados al costo.

**Alternativas consideradas:** Se descartó una "plataforma de monitoreo" aparte, fuera del modelo de servicios centrales, porque necesitaría su propia historia de aislamiento y de facturación, y la ADR-019 ya aporta las dos. Se descartó meter el análisis electoral dentro de la captura porque produce análisis y no un corpus, y esa diferencia decide dónde aterriza el resultado.

### Captura: el monitoreo automatizado de medios pasa de aplazado a especificado

La ADR-015 aplazó el monitoreo automatizado hasta que pudiera ser una iniciativa de producto dedicada. [comms-intelligence.md](../spec/comms-intelligence.md) es esa iniciativa, y la ADR-019 le da casa en la arquitectura. Queda especificado como el servicio de captura. **Su construcción sigue condicionada a la Iteración 0**, el sondeo de corpus de [comms-intelligence.md § 7.4 El sondeo de corpus — hazlo temprano, cuesta tres semanas](../spec/comms-intelligence.md#74-el-sondeo-de-corpus-hazlo-temprano-cuesta-tres-semanas), y el criterio de cancelación se mantiene: menos del 30 % de cobertura alcanzable en Brasil elimina el servicio.

- **Solo fuentes publicadas.** Los grupos cerrados de mensajería nunca se capturan, como compromiso y no como limitación ([comms-intelligence.md § 7.2 Las noticias no circulan por la web](../spec/comms-intelligence.md#72-las-noticias-no-circulan-por-la-web)). Capturar redes sociales significa cuentas públicas.
- **Los medios de difusión necesitan transcripción.** Es la línea de costo que nombra el §7.2. Cuando un proveedor de transcripción factura por minuto, es un costo medido y se traslada al costo.
- **Las encuestas publicadas son datos públicos. Las encuestas propias de una organización, no.** Las encuestas que encarga una campaña son datos de la organización. Se quedan en ella y nunca entran al corpus compartido.

### Análisis: compartido donde los datos son públicos, compartimentado donde no

El análisis electoral sobre resultados publicados no lleva datos personales ni contrato, y se comparte dentro de un país como el corpus de captura. Los hallazgos de investigación de la oposición y de investigación propia se entregan en el compartimento de la organización que los pide, bajo [comms-intelligence.md § 8. La doctrina](../spec/comms-intelligence.md#8-la-doctrina). Las Iteraciones 4, 5 y 6, su orden y sus puntos de decisión no cambian: ningún trabajo de expedientes antes de la primitiva de compartimentación, y ninguna investigación de la oposición antes de la revisión legal en cada jurisdicción. El análisis electoral es una entrada del catálogo sin iteración asignada. Cuándo se construye es una pregunta de producto abierta, anotada en [comms-intelligence.md § 12. Preguntas abiertas](../spec/comms-intelligence.md#12-preguntas-abiertas).

### Constructores: el texto se acepta, las imágenes y el video quedan propuestos

Todo constructor, produzca lo que produzca, trabaja dentro de los mismos límites:

- **Lo invoca una persona con un encargo.** Nada dispara un constructor en segundo plano.
- **Lee solo lo que esa persona le entrega:** el encargo, los puntos de mensaje que elige, los archivos que adjunta. No tiene vía de lectura hacia contactos, registros de votantes, mensajes, donaciones ni compartimentos.
- **Devuelve un borrador, nunca un envío.** El borrador aterriza en la organización marcado como generado y entra en los flujos de aprobación que ya aplican a ese tipo de contenido ([ADR-016](016-cross-cutting-resolutions.md) #22 para las publicaciones en redes). Un constructor no tiene credencial para el transporte por canal. El resultado llega a un destinatario solo por la acción de envío de una persona.
- **Mantiene las salvaguardas de la ADR-013:** nada de hechos, cifras ni afirmaciones que no estén en el material de origen.
- **Su costo se mide por uso.** Los cargos de inferencia y de generación se trasladan al costo según la ADR-019. Con BYOM ([ADR-016](016-cross-cutting-resolutions.md) §38), el proveedor propio de la organización le factura a ella directamente, y no hay nada que trasladar.

Dentro de estos límites, un constructor no tiene ninguna de las cuatro propiedades que condiciona la ADR-018: su alcance de lectura es un encargo, no invoca ninguna operación de la plataforma, no cambia nada sin una persona, y su credencial está acotada a un servicio.

**Los constructores de texto se aceptan.** Tienen la forma de la ADR-013, extendida de los simpatizantes al equipo: un borrador hecho a partir de material entregado, que una persona revisa, edita y aprueba antes de que pase nada.

**Los constructores de imágenes y de video quedan propuestos, no aceptados.** Tienen entrada en el catálogo, y esas entradas no se pueden activar hasta que la ADR-018 se acepte con su punto 6, el principio de la compuerta humana, respondido. Los límites de arriba son necesarios para ellos, pero no suficientes. Las imágenes y los videos sintéticos de personas identificables son el peor mal uso posible de la generación en un producto electoral, y las reglas de divulgación sobre medios sintéticos políticos cambian de una jurisdicción objetivo a otra. Quedan dos preguntas anotadas para la revisión, sin decidir aquí: si un constructor puede retratar alguna vez a una persona real e identificable, y qué identificación como contenido generado debe llevar una imagen o un video generado cuando se publica.

**Alternativas consideradas:** Se descartó aceptar los tres constructores ahora porque decidiría el principio de la compuerta humana para los medios de más riesgo antes de la revisión que existe para enunciarlo. Se descartó dejar los constructores fuera de los cuatro servicios porque redactar texto tiene la misma forma que una funcionalidad ya aceptada, y retenerlo condicionaría algo que la ADR-018 no condiciona.

### ADR-016 #25: la edición sigue siendo externa; la generación es otra pregunta

El #25 descartó la *edición* de video dentro de la plataforma (editores de línea de tiempo, efectos, transiciones, licencias de música) por alcance. Eso se mantiene: GreenGrass no construye un editor de video. Generar un video a partir de un encargo es otra capacidad, con otro costo: una llamada a un proveedor, no un editor. Queda propuesta arriba y condicionada. Hasta que se acepte, el #25 aplica a todo video, y las campañas suben archivos terminados. Si se acepta el constructor de video, lo que produce es un archivo terminado que entra al redactor exactamente como describe el #25: subida, programación, redacción del texto, aprobación y analítica.

### Transporte por canal

Nada cambia en el transporte por canal. Se nombra aquí como cuarto servicio para que la lista quede completa. Los cargos por mensaje de las pasarelas de SMS y WhatsApp se trasladan al costo; el correo autoalojado es un costo fijo para GreenGrass y no tiene plano medido. La supresión mutua corre antes de cada envío, como tercera capa en [system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales). Un envío es siempre la acción de una persona o una programación que fijó una persona.

### Orden interno: avisos de enmienda

Esta ADR agrega una línea **Enmendada por** a la [ADR-015](015-product-scope.md) por el monitoreo automatizado de medios y amplía la de la [ADR-016](016-cross-cutting-resolutions.md) para cubrir el #25.

## Consecuencias

**Beneficios:**
- Los cuatro servicios del tablero caben en una sola arquitectura y una sola hoja de ruta. Ningún documento de especificación nuevo, ningún plan paralelo
- El monitoreo de medios, aparcado en marzo con una nota para retomarlo, tiene especificación y punto de decisión
- La redacción de textos para el equipo sale en los mismos términos que una funcionalidad ya aceptada, sin esperar una revisión que no necesita
- La generación de más riesgo, imágenes y video de personas, espera a la revisión hecha para decidirla

**Costos:**
- La captura trae operación continua del corpus y costos de transcripción que ninguna estimación incluía antes de inteligencia de comunicaciones
- Un constructor que solo lee lo que se le entrega produce borradores más flojos que uno que pudiera leer el CRM. Es el precio de quedarse fuera del punto de decisión de la ADR-018, y se paga a propósito
- El análisis electoral queda nombrado y sin iteración asignada, lo que deja una entrada del catálogo sin fecha de entrega

**Restricciones:**
- Todos los servicios de la lista se rigen por la ADR-019: ejecución por organización, nada conservado, medición al costo
- La construcción de la captura está condicionada a la Iteración 0; sus fuentes son solo publicadas, nunca mensajería cerrada
- Las Iteraciones 4 a 6 y sus puntos de decisión no cambian
- Ningún constructor tiene capacidad de enviar, disparadores en segundo plano ni acceso de lectura más allá de su encargo
- Los constructores de imágenes y de video no se pueden activar hasta que la ADR-018 se acepte con el punto 6 respondido

**ADR relacionadas:** [ADR-013](013-analytics-ai.md) (la forma aceptada que extienden los constructores de texto), [ADR-015](015-product-scope.md) (enmendada — el monitoreo automatizado de medios pasa de aplazado a especificado), [ADR-016](016-cross-cutting-resolutions.md) (enmendada — el #25 se mantiene para la edición, la generación queda propuesta; la aprobación del #22 aplica a los borradores de los constructores; BYOM del §38), [ADR-018](018-ai-agent-posture.md) (los constructores de imágenes y de video esperan al punto 6; el punto de decisión no cambia), [ADR-019](019-central-services-and-metered-billing.md) (el modelo bajo el que corren todos los servicios de la lista)
