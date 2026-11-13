# ADR-022: Core, módulos y carriles

**Estado:** Propuesta
**Fecha:** 2026-11-13
**Fuentes:** `spec/product.md`, `spec/users.md`, `spec/security.md`, `spec/comms-intelligence.md`, `spec/mvp.md`, `design/architecture/system.md`, `decisions/001-platform-architecture.md`, `decisions/015-product-scope.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/021-content-approval-pipeline.md`

## Contexto

[product.md](../spec/product.md) describe un producto todo en uno: un CRM, una base de datos de votantes, recaudación de fondos, comunicaciones y analítica en un solo paquete, para campañas políticas de base. Cada documento posterior se construyó sobre esa forma, y sobre el supuesto de que el cliente es político.

La dirección cambió. Las piezas se quedan y la forma no. Lo que el proyecto construye es una infraestructura de servicios compartidos para organizaciones: un producto central (Core), y un catálogo de módulos que cada cliente activa individualmente. Esa infraestructura se ofrece por dos carriles, diferenciados a nivel de marca y producto. Greengrass es el político. Basecamp es el comercial. Por eso «Greengrass» nombra ahora el producto político, no la infraestructura.

El corpus ya tiene la mayoría de las piezas que esto necesita. La [ADR-001](001-platform-architecture.md#arquitectura-de-organización-única-con-aislamiento-por-niveles) decidió un despliegue por organización, y esta ADR lo reafirma. La [ADR-019](019-central-services-and-metered-billing.md) les dio a las capacidades compartidas una casa, un catálogo y derechos de uso por organización. La [ADR-017](017-sharing-contract-trust-model.md) le dio a cada frontera un solo mecanismo de confianza. Lo que al corpus le falta es el vocabulario, el límite del Core, un contrato para los módulos y un lugar para una segunda clase de cliente.

Esta ADR está `Propuesta` porque dos cosas de las que depende siguen abiertas: dónde vive el padrón electoral y cómo se llama el Core. También registra varias cosas que quien dirige el producto ya decidió. La tabla de abajo dice cuál es cuál, y cada sección lo repite. Nada de lo que está marcado como propuesto o abierto puede leerse como resuelto.

| Punto | Situación |
|---|---|
| Dos carriles sobre una misma infraestructura, como se describe en [Dos carriles sobre una misma infraestructura](#dos-carriles-sobre-una-misma-infraestructura) | Decidido |
| Cada cliente corre su propia instancia, con sus propios datos y sus propias cuentas | Decidido ([ADR-001](001-platform-architecture.md), ADR-025) |
| El CRM es parte del Core | Decidido |
| Recaudación y pagos es un solo módulo con una capa de pagos compartida | Decidido |
| Los módulos los construye primero GreenGrass; el contrato de módulo se diseña para que terceros aprobados puedan construir después | Decidido |
| El vocabulario, incluido el cambio de nombre del «módulo interno» de la ADR-019 | Propuesto |
| Qué contiene el Core, más allá del CRM | Propuesto |
| Qué le exigen los carriles al diseño | Propuesto |
| El contrato de módulo y el catálogo de módulos | Propuesto |
| El padrón electoral como módulo del carril político, fuera del Core | Recomendado, no decidido |
| El Agente de Campaña como el chat con los módulos de contenido activados, no como módulo | Recomendado, no decidido |
| Un nombre para el Core; el acceso de los operadores por carril; los datos de un módulo desactivado; el nombre «Basecamp» | Abierto |

### Conflictos que resuelve esta ADR

Siguiendo a la [ADR-016](016-cross-cutting-resolutions.md), a la [ADR-017](017-sharing-contract-trust-model.md) y a la [ADR-019](019-central-services-and-metered-billing.md), los conflictos con el corpus existente se nombran aquí. Los que dependen de un punto decidido se resuelven abajo. Los que dependen de uno propuesto o abierto se nombran y se dejan en pie.

1. **[product.md](../spec/product.md)** describe un producto todo en uno y usa «GreenGrass» para la plataforma entera. El producto es ahora un Core con módulos, y Greengrass es uno de los dos productos construidos sobre él.
2. **[ADR-019 § Dos clases de capacidad: módulos internos y servicios centrales](019-central-services-and-metered-billing.md#dos-clases-de-capacidad-módulos-internos-y-servicios-centrales)** usa «módulo interno» para el código que corre dentro de la organización. Eso describe dónde corre el código, no qué activa un cliente. El término tiene que cambiar antes de que «módulo» pueda nombrar la unidad de producto.
3. **El corpus entero está escrito solo para clientes políticos.** Los niveles de amenaza ([security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza)), la ley electoral ([compliance.md](../spec/compliance.md)) y el padrón electoral ([integrations.md § Integración del padrón electoral](../spec/integrations.md#integración-del-padrón-electoral)) están escritos como propiedades de la plataforma. Con un carril comercial pasan a ser política del carril político.
4. **[security.md § Acceso del equipo de GreenGrass](../spec/security.md#acceso-del-equipo-de-greengrass)** supone un solo equipo de plataforma con acceso administrativo. Los dos carriles los manejan empresas distintas, y una agencia comercial puede trabajar para el oponente de un cliente político.
5. **[users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa)** hace de la alianza una «organización ligera» que no replica el conjunto completo de la plataforma. En esta dirección una alianza es un cliente como cualquier otro, con su propia instancia. La ADR-024 se ocupa de esto.
6. **[ADR-020 § Cuatro servicios centrales](020-central-service-line-up-and-builders.md#cuatro-servicios-centrales)** y [comms-intelligence.md](../spec/comms-intelligence.md) especifican un solo monitor de medios. El catálogo de abajo lista tres módulos de monitoreo. Los tres se apoyan en el único servicio de captura, así que esto es empaquetado y la arquitectura no cambia.
7. **[ADR-015](015-product-scope.md)** fijó los límites del alcance del producto. El catálogo nombra dos módulos, Manejo de crisis y Encuestas y sondeos, que ningún documento especifica.

## Decisión

### Vocabulario

Propuesto.

| Término | Significado |
|---|---|
| **Core** | Lo que toda instancia tiene siempre, en los dos carriles. Headless (sin interfaz propia: todo es primero una operación de la API), neutral respecto al carril, y nunca dependiente de un módulo. Necesita un nombre propio, ahora que Greengrass es un carril. |
| **Carril** | Un producto y una marca construidos sobre el Core: Greengrass (político) o Basecamp (comercial). Configuración, no una bifurcación. |
| **Cliente** | Una organización que contrata el producto de un carril. El corpus dice *organización* (`tenant`); las dos palabras nombran lo mismo desde dos lados. |
| **Instancia** | El despliegue propio de un cliente: su propia base de datos, su aplicación y sus llaves, como decidió la [ADR-001](001-platform-architecture.md#arquitectura-de-organización-única-con-aislamiento-por-niveles). |
| **Módulo** | La unidad que un cliente activa y que lista el catálogo. Compartido por los dos carriles salvo que esté marcado como de un solo carril. Lo describe un manifiesto. Está hecho de componentes de instancia, de llamadas a servicios centrales, o de las dos cosas. |
| **Componente de instancia** | Código que corre dentro de la instancia del cliente. Es el «módulo interno» de la ADR-019, con otro nombre. |
| **Servicio central** | Código que corre del lado de la plataforma para un cliente por llamada y no conserva nada ([ADR-019](019-central-services-and-metered-billing.md)): captura, análisis, constructores y transporte por canal ([ADR-020](020-central-service-line-up-and-builders.md)). Sin cambios. |
| **Superficie** | Donde una persona hace el trabajo: el chat, la UI de administración o la app de campo ([ADR-023](023-surfaces-chat-admin-field.md)). |
| **Conector** | Un enlace con una herramienta externa, como NationBuilder. Vive en el centro de integraciones y no es un módulo (ADR-027). |

Un ejemplo desarrollado. Monitoreo de radio y TV es un módulo. Está hecho del servicio central de captura con transcripción, una bandeja de monitoreo dentro de la instancia, los registros de medios y periodistas en el CRM del Core, y un resumen en el chat.

Los documentos escritos antes de esta ADR que dicen «módulo interno» se leen como «componente de instancia». No se reescriben uno por uno; la [ADR-019](019-central-services-and-metered-billing.md) y [system.md § Arquitectura de servicios centrales](../design/architecture/system.md#arquitectura-de-servicios-centrales) llevan una nota.

<!-- REVISIT: la descripción de los dos carriles escribe «Greengrass»; todos los documentos anteriores escriben «GreenGrass», y con ese nombre se refieren a la plataforma entera. Esta ADR usa «Greengrass» para el producto del carril político y deja los documentos anteriores como están. Hasta que el Core tenga nombre propio, «GreenGrass» en un documento anterior significa la infraestructura. -->

**Alternativas consideradas:** Se descartó mantener «módulo interno» y buscar otra palabra para lo que un cliente activa, porque *módulo* es la palabra con la que se vende el catálogo, y un término que significa una cosa en la lista de precios y otra en la arquitectura termina leyéndose mal.

### Dos carriles sobre una misma infraestructura

Decidido.

| | Carril político | Carril comercial |
|---|---|---|
| Producto | Greengrass | Basecamp (PR Media/Relacionistas.app) |
| Manejado por | Blimp.io y Onda Corta | R&R y Onda Corta |
| Para | Movimientos comunitarios, sindicatos y partidos políticos | Publicistas, relacionistas públicos, agencias y otras empresas comerciales |
| Primeros clientes | PIP, MVC, Alianza de País | Asociación de Publicistas |
| Precio | Al costo, más la comisión que cubre el costo de vender | El costo, más un margen de 30 % para la dueña del producto, más la comisión de la Comercializadora |

<!-- REVISIT: «la dueña del producto» (the product's owner) y «la Comercializadora» se usan tal como las dio quien dirige el producto, sin definición. Las dos necesitan una. Ver la ADR-026. -->

- **Módulos compartidos.** Todos los módulos del catálogo pueden correr dentro de cualquiera de los dos productos, aunque algunos módulos no son útiles para ambos carriles: la inteligencia electoral, por ejemplo, es solo del carril político.
- **Una instancia por cliente.** Cada cliente corre su propia instancia, con sus propios datos y sus propias cuentas.
- **Carriles independientes.** Un carril no espera por el otro. El trabajo con el PIP y el MVC no depende de lo que termine siendo la herramienta de la Asociación de Publicistas, ni al revés.
- **Mejoras compartidas.** Cuando un carril mejora un módulo compartido, la mejora le llega también al otro.

Los precios se deciden en la ADR-026.

### Qué le exigen los carriles al diseño

Propuesto. Esto es lo que hace falta para que las cuatro afirmaciones de arriba se sostengan a la vez.

- **Un carril es configuración sobre una sola base de código, nunca una bifurcación.** Un carril fija su marca, su vocabulario, qué módulos muestra su catálogo, sus reglas de precio y sus políticas: los valores de seguridad por defecto, los paquetes de cumplimiento, el punto de decisión de la IA.
- **El Core es neutral respecto al carril.** Nada electoral vive en él. La consecuencia principal es el padrón electoral, más abajo.
- **Cada carril tiene su propio tren de versiones.** Un carril fija las versiones del Core y de los módulos que corre y actualiza a su ritmo, así que nunca espera. Una mejora entra al módulo compartido, y el otro carril la recibe en su próxima actualización. El contrato de módulo tiene versiones, y un cambio incompatible necesita un plazo de retirada.
- **Una necesidad propia de un carril entra al módulo compartido** como configuración o como punto de extensión. Si no cabe, se vuelve un módulo de un solo carril.
- **Los operadores están separados por carril.** El modelo de amenazas de un cliente político incluye a los oponentes políticos ([security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza)), y una agencia comercial puede trabajar para uno. Los operadores de un carril solo pueden administrar las instancias de ese carril. Los registros de consultas contra los servicios compartidos siguen acotados al cliente y son invisibles de un carril al otro; la ADR-019 ya exige la primera mitad. Onda Corta está en los dos carriles, así que su acceso tiene que definirse de forma explícita. A los clientes políticos hay que decirles que la misma infraestructura atiende a clientes comerciales. Los detalles quedan abiertos, más abajo.
- **El corpus público compartido es la principal economía.** La radio, la TV, la prensa y las cuentas públicas de redes se capturan una vez y sirven a los dos carriles. Solo se comparten datos públicos, como ya dispone la [ADR-019 § Los servicios centrales se ejecutan por organización y no conservan nada](019-central-services-and-metered-billing.md#los-servicios-centrales-se-ejecutan-por-organización-y-no-conservan-nada).
- **El precio es una regla del carril, no del Core** (ADR-026).

**Alternativas consideradas:** Se descartó una bifurcación de la base de código por carril porque rompe la promesa de que una mejora en un carril le llega al otro, y duplica el costo de cada corrección de seguridad.

### Qué contiene el Core

Toda instancia recibe todo esto, siempre. El Core es headless: cada elemento es una API con eventos, y no tiene pantallas propias más allá de las que la UI de administración necesita para configurarlo.

| Grupo | Contenido | Ya decidido en |
|---|---|---|
| Confianza | Niveles de aislamiento, identidad y passkeys (un servicio de identidad por cliente, ADR-025), llaves y BYOK, contratos de intercambio, el registro de auditoría | [ADR-001](001-platform-architecture.md), [ADR-002](002-security-threat-model.md), [ADR-003](003-identity-access-organization.md), [ADR-017](017-sharing-contract-trust-model.md) |
| Datos: el CRM | Las personas y la lista única, tipos de registro, consentimiento por canal y por finalidad, deduplicación con sugerir y confirmar, segmentos, importación y exportación, sincronización con terceros (ADR-027) | [users.md](../spec/users.md), [ADR-004](004-data-model-integrity.md) |
| Contenido | Almacén de contenido, recursos versionados, flujo de aprobación por rondas | [ADR-021](021-content-approval-pipeline.md) |
| Entrega | Transporte por canal con verificación de consentimiento, topes de frecuencia, la ventana de silencio y la supresión mutua | [system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales), [ADR-016](016-cross-cutting-resolutions.md) §2, [ADR-019](019-central-services-and-metered-billing.md) |
| Comercio | Catálogo, derechos de uso, medición de uso | [ADR-019](019-central-services-and-metered-billing.md) |
| Eventos | El flujo de eventos de cada cliente y el bus (ADR-024) | [system.md § Arquitectura de analítica](../design/architecture/system.md#arquitectura-de-analítica) |
| Configuración de carril | Marca, vocabulario, visibilidad del catálogo, reglas de precio, políticas por defecto | Nuevo, arriba |
| Infraestructura común | Centro de integraciones y conectores, abstracción de IA (BYOM), localización, motor de sincronización sin conexión, API pública y webhooks | [system.md](../design/architecture/system.md), [ADR-005](005-offline-first-sync.md), [ADR-010](010-internationalization-localization.md), [ADR-016](016-cross-cutting-resolutions.md) §38 |

**El CRM es parte del Core. Decidido.** Un solo registro por persona, el consentimiento y la deduplicación sostienen casi todos los módulos. Mantenerlos en el Core es también lo que garantiza que la baja de una persona valga en todas partes dentro de una instancia. Un módulo que no usa el CRM, como el Agente de Campaña de la demostración ([demo.md](../spec/demo.md)), corre igual; el CRM simplemente está vacío.

**Dos primitivas de la inteligencia de comunicaciones resultan ser del Core. Propuesto.** [comms-intelligence.md § 5. Siete funcionalidades son tres primitivas](../spec/comms-intelligence.md#5-siete-funcionalidades-son-tres-primitivas) nombra tres. El grafo de actores (medios, propiedad, periodistas, analistas) son entidades y relaciones del CRM, así que extiende el CRM del Core. El libro de afirmaciones (afirmación, fuentes, estado de verificación, respuesta aprobada) es una pieza de contenido, así que extiende el almacén de contenido del Core. Solo el expediente compartimentado es propio de un módulo, y su mecanismo de acceso son los contratos de la ADR-017, que son del Core.

El resto de la tabla está propuesto. La identidad por cliente se decide en la ADR-025.

**Alternativas consideradas:** Se consideró y se descartó hacer del CRM un módulo. Casi todos los módulos dependerían entonces de él, y cada módulo tendría que hacer valer el consentimiento por su cuenta, que es como una baja se respeta en un sitio y se ignora en otro.

### El padrón electoral: recomendado como módulo del carril político, no decidido

Un primer borrador de esta dirección puso el padrón electoral en el Core. El modelo de dos carriles revierte eso. El Core tiene que ser neutral respecto al carril, y un padrón electoral no le dice nada a una agencia de publicidad.

La recomendación es que el padrón electoral se vuelva un módulo del carril político, Padrón electoral, que extiende el CRM del Core y que Greengrass puede activar por defecto. Operaciones de calle, el análisis electoral y el solapamiento entre miembros de una coalición se construyen sobre él. Sigue siendo una de las tres cosas que ningún competidor integra, junto con las herramientas de campo sin conexión y las herramientas para coaliciones de partidos. Pertenecería al producto Greengrass, no al Core compartido.

Esto no está decidido. Hasta que lo esté, nada se mueve: el modelo de datos de [system.md § Modelo de datos](../design/architecture/system.md#modelo-de-datos) y el manejo del padrón en [integrations.md § Integración del padrón electoral](../spec/integrations.md#integración-del-padrón-electoral) quedan como están escritos.

### El contrato de módulo

Propuesto, salvo donde se indica.

Todo módulo trae un manifiesto que declara:

- **Datos:** las extensiones de esquema a las entidades del Core, sus propias tablas, las clases de conservación.
- **Dependencias:** los módulos que requiere, y qué pasa con sus datos cuando se desactiva.
- **Eventos:** los eventos que publica y consume en el bus (ADR-024).
- **Acceso:** las plantillas de rol y los permisos que aporta ([ADR-003](003-identity-access-organization.md)).
- **Superficies:** sus operaciones de chat, cada una marcada como de lectura o de escritura, con la tarjeta de confirmación para las escrituras; sus pantallas de administración y sus entradas de navegación; sus capacidades de campo y su comportamiento sin conexión ([ADR-023](023-surfaces-chat-admin-field.md)).
- **Servicios:** los servicios centrales a los que llama, y por lo tanto los derechos de uso que necesita.
- **Perímetro:** qué datos salen de la frontera de cifrado, y qué niveles de aislamiento y jurisdicciones admite.
- **Situación frente a la ADR-018:** alcance de lectura, capacidad de invocar herramientas, autonomía y amplitud de credenciales, las cuatro características que la [ADR-018](018-ai-agent-posture.md#ninguna-capacidad-de-agente-llega-a-producción-hasta-que-se-acepte-esta-adr) condiciona.

**Entrega.** Los módulos propios vienen en la imagen de despliegue y se activan por derecho de uso. La ADR-001 no cambia: no hay despliegues por módulo.

**Quién construye. Decidido.** Los módulos los construye primero GreenGrass. El contrato se diseña para que terceros aprobados puedan construir después. Para eso hacen falta cuatro cosas que tienen que ser ciertas desde el principio: paridad de la API, a la que [system.md § API pública](../design/architecture/system.md#api-pública) ya se compromete; el manifiesto; paquetes de módulo firmados; y ninguna API de uso solo interno. Un proceso de revisión para los módulos de terceros puede esperar.

Qué pasa con los datos de un módulo cuando se desactiva queda abierto, más abajo.

### El catálogo de módulos

Propuesto. Los nombres son de quien dirige el producto. Todos los módulos pueden correr en cualquiera de los dos productos; la columna Carriles dice dónde son útiles.

| Módulo | Carriles | Se apoya en | Superficies principales | Punto de decisión o nota |
|---|---|---|---|---|
| Monitoreo de radio y TV | Los dos | Captura (medios de difusión, transcritos), grafo de actores | Chat (resumen), administración | Sondeo de corpus de la Iteración 0; la transcripción es un costo medido |
| Monitoreo de redes | Los dos | Captura (cuentas públicas) | Chat, administración | Sondeo de corpus de la Iteración 0; solo cuentas públicas |
| Resumen de prensa | Los dos | Captura (prensa), constructor de texto | Chat (resumen diario) | Sondeo de corpus de la Iteración 0 |
| Constructor de artes publicitarios | Los dos | Constructores, flujo de contenido, plantillas de identidad visual | Chat, administración | Las composiciones con plantilla están bien, como en la demostración; las imágenes generadas esperan a la [ADR-018](018-ai-agent-posture.md) |
| Distribución de contenido | Los dos | Transporte por canal, flujo de contenido, CRM | Chat, administración | El contacto de la especificación, más prensa y redes |
| Manejo de crisis | Los dos | Módulos de monitoreo, libro de afirmaciones, puntos de mensaje | Chat, administración | Nombrado, todavía sin especificar |
| Encuestas y sondeos | Los dos | CRM, transporte por canal | Administración, chat | Nombrado, todavía sin especificar |
| Manejo de eventos y voluntarios | Los dos | CRM | Chat, administración, campo (registro de entrada) | El voluntariado es sobre todo una necesidad política |
| Recaudación y pagos | Los dos | CRM, adaptadores de pago | Administración, chat (totales) | Capa de pagos compartida; las reglas de donación son configuración del carril político |
| Operaciones de calle | Político | Padrón electoral, motor sin conexión | Campo, administración | Trabajo de campo, inscripción de votantes, GOTV |
| Padrón electoral | Político | CRM del Core | Administración | Recomendado como módulo, no decidido (arriba) |
| Análisis electoral | Político | Análisis, Padrón electoral, geografía | Administración, chat | Sin iteración asignada ([ADR-020](020-central-service-line-up-and-builders.md)) |
| Fideicomiso de coalición | Los dos | CRM, bus, supresión mutua | Administración, chat | El MVP ([mvp.md](../spec/mvp.md)). Alianzas de partidos; asociaciones de agencias (ADR-024) |
| Investigación de la oposición e investigación propia | Político | Análisis, compartimentos | Administración | Compartimentos; revisión legal por país |
| Activismo | Político | CRM, constructor de texto | Páginas públicas, administración | Ninguno |

- **El único monitor de medios de la especificación son aquí tres módulos.** Los tres se apoyan en el único servicio de captura, así que es una decisión de empaquetado. La arquitectura de la ADR-020 no cambia, y los tres siguen detrás del sondeo de corpus, la Iteración 0 de [comms-intelligence.md § 9. Las iteraciones](../spec/comms-intelligence.md#9-las-iteraciones).
- **Manejo de crisis es el flujo de trabajo del libro de afirmaciones** de [comms-intelligence.md § 5.2 El libro de afirmaciones](../spec/comms-intelligence.md#52-el-libro-de-afirmaciones): un ataque aparece en el monitoreo, se vuelve una afirmación, se documenta con fuentes y se adjudica, y la respuesta se vuelve un punto de mensaje. La especificación tiene la primitiva y ningún módulo con este nombre.
- **Encuestas y sondeos no tiene especificación alguna.** La ADR-020 da una regla que hay que conservar: las encuestas propias de un cliente son datos suyos y nunca entran al corpus compartido.
- **Recaudación y pagos es un solo módulo con una capa de pagos compartida. Decidido.** En el carril comercial significa integración con ATH Móvil y otros servicios de micropagos y de pagos en línea, como Stripe. Esos son los adaptadores de pago que [system.md § Patrón de adaptadores de pago](../design/architecture/system.md#patrón-de-adaptadores-de-pago) ya especifica, así que los dos carriles comparten los adaptadores. El carril político añade encima el manejo de donaciones: límites de contribución, reportes de financiamiento de campaña y repartos de la alianza ([fundraising.md](../spec/fundraising.md), [compliance.md](../spec/compliance.md)).
- **El Agente de Campaña no es un módulo. Recomendado, no decidido.** Si el chat actúa como la persona ([ADR-023](023-surfaces-chat-admin-field.md)), el agente de la demostración es ese chat con los módulos de contenido activados.

**Nombrados, todavía sin especificar.** Manejo de crisis y Encuestas y sondeos están en el catálogo y no están especificados en ninguna parte. Esta ADR no los especifica. Cada uno necesita su propia especificación antes de construirse.

### Preguntas abiertas

Ninguna de estas se resuelve aquí. Donde la dirección tiene una recomendación, se da como tal.

1. **Un nombre para el Core**, ahora que Greengrass es un carril. También dónde vive su especificación: hoy todo está en el repositorio de Greengrass.
2. **El padrón electoral** como módulo del carril político, no como parte del Core. Recomendado arriba.
3. **El Agente de Campaña** como el chat con los módulos de contenido activados, no como módulo. Recomendado arriba.
4. **Los datos de un módulo desactivado:** se conservan en solo lectura, se exportan, o se purgan según el calendario de conservación operativa.
5. **El acceso de los operadores por carril,** incluido el acceso de Onda Corta a los dos, y qué se les dice a los clientes políticos.
6. **El nombre «Basecamp».** Es también el producto de gestión de proyectos de 37signals, en la misma categoría amplia de software. Necesita una verificación de marca registrada antes de aparecer en nada público.
7. **Definiciones.** «La dueña del producto» y «la Comercializadora» se usan tal como se dieron y no están definidas en ninguna parte.

### Orden interno: avisos de enmienda

Una ADR propuesta no enmienda nada hasta que se acepta. Esta ADR añade una línea **Enmienda propuesta por** a la [ADR-019](019-central-services-and-metered-billing.md), por el vocabulario, y a la [ADR-015](015-product-scope.md) y la [ADR-020](020-central-service-line-up-and-builders.md), por el catálogo. Cada una dice que la ADR sobre la que está queda como está escrita hasta que esta se acepte.

## Consecuencias

**Beneficios:**
- El producto se puede vender de módulo en módulo, a un cliente que conserva las herramientas que ya tiene
- Una segunda clase de cliente paga por el mismo Core, el mismo corpus de captura y los mismos módulos
- «Módulo» significa una sola cosa en el catálogo, en la lista de precios y en la arquitectura
- El Core tiene un límite, así que una capacidad nueva tiene una regla que dice adónde va
- Un tercero podría construir un módulo más adelante sin cambiar la arquitectura

**Costos:**
- El documento más antiguo del repositorio ya no describe el producto, y cada documento escrito para clientes políticos necesita que sus partes políticas queden marcadas como política del carril
- Dos trenes de versiones, dos grupos de operadores y una sola base de código son más difíciles de manejar que uno de cada uno
- Un Core neutral respecto al carril es una restricción sobre cada cambio futuro al Core: nada electoral puede entrar en él
- Si el padrón electoral se mueve, el modelo de datos y tres especificaciones cambian con él
- Dos módulos del catálogo tienen nombre y no tienen especificación

**Restricciones:**
- La [ADR-001](001-platform-architecture.md) no cambia: una instancia por cliente, sin despliegues por módulo
- Las reglas de la [ADR-019](019-central-services-and-metered-billing.md) para los servicios centrales no cambian: un cliente por llamada, nada conservado, solo se comparten datos públicos
- El Core nunca depende de un módulo
- Un carril es configuración, nunca una bifurcación
- El punto de decisión de la [ADR-018](018-ai-agent-posture.md) aplica a todo el Core, y por lo tanto a los dos carriles ([ADR-023](023-surfaces-chat-admin-field.md))
- Nada de lo que esta ADR marca como propuesto, recomendado o abierto puede usarse como base para construir como si estuviera decidido

**ADR relacionadas:** [ADR-001](001-platform-architecture.md) (una instancia por cliente, reafirmada), [ADR-015](015-product-scope.md) (enmienda propuesta: el catálogo nombra módulos fuera de su lista de alcance), [ADR-017](017-sharing-contract-trust-model.md) (los contratos son del Core), [ADR-018](018-ai-agent-posture.md) (el manifiesto declara la situación de cada módulo frente al punto de decisión), [ADR-019](019-central-services-and-metered-billing.md) (enmienda propuesta: «módulo interno» pasa a ser «componente de instancia»; el catálogo, los derechos de uso y la medición de uso son del Core), [ADR-020](020-central-service-line-up-and-builders.md) (enmienda propuesta: el único monitor de medios se empaqueta como tres módulos; los cuatro servicios no cambian), [ADR-021](021-content-approval-pipeline.md) (el flujo de contenido es del Core), [ADR-023](023-surfaces-chat-admin-field.md) (superficies), ADR-024 (el bus; alianzas y asociaciones), ADR-025 (identidad por cliente), ADR-026 (precios), ADR-027 (sincronización y conectores)
