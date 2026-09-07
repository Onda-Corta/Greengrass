# ADR-001: Arquitectura y despliegue de la plataforma

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `design/architecture/system.md`, `spec/users.md`, `spec/workflows.md`, `spec/product.md`

## Contexto

GreenGrass da servicio a campañas políticas del Sur Global: organizaciones que operan bajo vigilancia activa, en entornos políticos hostiles, en países con realidades regulatorias y de infraestructura radicalmente distintas. La arquitectura de la plataforma tiene que priorizar el aislamiento de seguridad, la soberanía de datos, la accesibilidad desde el celular y la independencia operativa de cada organización. Las arquitecturas SaaS multiorganización tradicionales optimizan la eficiencia operativa a costa de un radio de impacto compartido, un control de la infraestructura compartido y una personalización limitada por organización: todas ellas concesiones inaceptables en este modelo de amenazas.

## Decisión

### Arquitectura de organización única con aislamiento por niveles

Cada organización tiene su propia base de datos, su propia instancia de la aplicación y sus propios recursos. Los niveles de aislamiento escalan según el perfil de amenaza y las necesidades de cada organización:

| Nivel | Nivel de aislamiento | Para quién |
|------|----------------|----------|
| Estándar | Contenedores separados, clúster compartido | Campañas pequeñas, organizaciones de incidencia, entornos de baja amenaza |
| Reforzado | Clúster separado | Campañas medianas, entornos de amenaza elevada, padrones electorales grandes |
| Máximo | Cuenta de proveedor de nube separada | Campañas de alto riesgo bajo vigilancia estatal activa, partidos grandes |
| Autoalojado | Infraestructura propia de la organización | Organizaciones que requieren control físico y administrativo total |

Cada organización elige su nivel durante el aprovisionamiento y puede subir de nivel sin tiempo de inactividad por migración de datos.

**Alternativas consideradas:** Se descartó la arquitectura multiorganización con aislamiento lógico porque comprometer una organización podría exponer a las demás, y porque hacer cumplir políticas de seguridad por organización (llaves de cifrado, residencia de datos, nivel de aislamiento) se vuelve exponencialmente más difícil en una base de datos compartida. Se consideró la multiorganización con aislamiento físico, pero no ofrece ninguna ventaja real frente a la organización única y añade complejidad de coordinación.

### Modelo de federación en vez de multiorganización monolítica

Las organizaciones son entidades soberanas conectadas por afiliación voluntaria, no subdivisiones de un sistema monolítico. Cada entidad (partido, candidato, organización de incidencia) es una organización cliente completa, con sus propios datos, su propia facturación y su propio control administrativo. Las alianzas son organizaciones cliente ligeras, dedicadas a la coordinación, que permiten compartir recursos entre miembros soberanos sin transferir la propiedad. Las campañas heredan de su entidad matriz.

**Alternativas consideradas:** Se descartó un modelo de propiedad jerárquico (el partido es dueño de los datos del candidato) porque contradice el principio de soberanía: los datos de un candidato son del candidato, y una alianza no puede obligar a sus miembros a compartir datos.

### Residencia de datos por país

Los datos de cada organización se guardan en el país que ella misma elige durante el aprovisionamiento. La arquitectura de organización única hace que esto sea natural: colocar una organización aislada en un país concreto es una cuestión operativa, no un rediseño de la arquitectura. GreenGrass administra infraestructura en cada país objetivo (proveedores de nube o centros de datos locales). Las organizaciones autoalojadas controlan por completo su propia residencia de datos.

### Diseño con prioridad móvil

La interfaz principal es un celular, no una computadora de escritorio. Todo flujo de trabajo tiene que poder usarse desde un celular; el escritorio es la experiencia ampliada. Esto refleja la realidad de la organización política en el Sur Global, donde los voluntarios y simpatizantes acceden a la plataforma sobre todo desde dispositivos móviles, a menudo de gama baja y con conexiones lentas.

### Aprovisionamiento de organizaciones totalmente automatizado

Crear una organización es autoservicio, sin intervención humana. La cadena de procesamiento del aprovisionamiento se encarga de principio a fin del levantamiento de la infraestructura, la creación de la base de datos, la configuración de las llaves de cifrado —flujo BYOK (Bring Your Own Key: la organización controla su propia llave de cifrado) o llaves administradas por la plataforma—, el alojamiento en el país que corresponda y la configuración inicial.

**Alternativas consideradas:** Se descartó el aprovisionamiento con intervención humana porque crea un cuello de botella que socava los objetivos de accesibilidad de la plataforma: las campañas del Sur Global necesitan arrancar de inmediato, no esperar al horario laboral de otro huso horario.

## Consecuencias

**Beneficios:**
- Comprometer una organización no puede exponer a otra: el radio de impacto se limita a una sola organización
- Las políticas de seguridad por organización (llaves de cifrado, residencia de datos, controles de acceso) se hacen cumplir desde la arquitectura, no solo por configuración
- Se puede colocar una organización en cualquier país sin cambios de arquitectura
- El modelo de federación respeta la soberanía de cada organización, algo crítico en contextos políticos donde la propiedad de los datos tiene consecuencias para la seguridad de las personas
- La prioridad móvil garantiza que la plataforma funcione en los dispositivos que los voluntarios realmente usan

**Costos:**
- La complejidad operativa es mucho mayor que en multiorganización: cada organización es su propio despliegue y exige una automatización sólida
- Los costos de infraestructura crecen de forma lineal con la cantidad de organizaciones, en vez de amortizarse entre recursos compartidos
- Automatizar el aprovisionamiento en varios países y con varios proveedores de nube es una inversión de infraestructura considerable
- Las instalaciones autoalojadas fragmentan las versiones y complican el soporte

**Restricciones:**
- Todo cambio de infraestructura tiene que funcionar en todos los niveles de aislamiento
- Las actualizaciones tienen que poder desplegarse a cientos de organizaciones independientes sin tiempo de inactividad
- La cadena de procesamiento del aprovisionamiento tiene que ser lo bastante sólida para manejar proveedores de alojamiento distintos en cada país y escenarios de fallo y reversión

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (la arquitectura de seguridad depende del aislamiento de organización única), [ADR-005](005-offline-first-sync.md) (la prioridad móvil impulsa los requisitos de funcionamiento sin conexión), [ADR-010](010-internationalization-localization.md) (el despliegue por país sustenta la residencia de datos)
