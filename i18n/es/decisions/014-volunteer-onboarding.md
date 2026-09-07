# ADR-014: Voluntariado e incorporación

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/workflows.md`, `spec/support.md`

## Contexto

Los voluntarios son el grupo de usuarios más numeroso y el más dispar en alfabetización técnica y en capacidad de sus dispositivos. El camino de «quiero ayudar» a «estoy listo para tocar puertas» tiene que ser lo bastante rápido para no perder el entusiasmo del voluntario y lo bastante completo para que sepa usar las herramientas de forma efectiva y segura. Las campañas en entornos de alta amenaza además necesitan requisitos bloqueantes de capacitación: a un voluntario que no ha terminado la capacitación de trabajo de campo no se le da una lista de recorrido con datos de votantes.

La superficie de soporte a las organizaciones es amplia: configuración del procesador de pagos, verificación de WhatsApp Business, manejo de llaves BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado), configuración de cumplimiento, importación del padrón electoral. Las organizaciones necesitan ayuda guiada en cada paso, y la plataforma tiene que darla a escala en cinco países y siete idiomas.

## Decisión

### Módulo completo de incorporación con capacitación

La plataforma trae un sistema propio de incorporación y capacitación, no solo globos de ayuda:

- **Recorrido guiado por la plataforma** — recorrido interactivo por las herramientas que el voluntario va a usar
- **Contenido personalizable por la organización** — la organización añade sus propios materiales de capacitación (discurso de la campaña, contexto local, protocolos de seguridad)
- **Cuestionarios y verificaciones de conocimiento** — comprobaciones que confirman que el voluntario entiende las herramientas y lo que se espera de él
- **Requisitos bloqueantes de certificación** — la organización puede exigir que se completen módulos de capacitación concretos antes de dar acceso a las herramientas de campo
- **Consulta sin conexión** — los materiales de capacitación quedan en caché para consultarlos sin conexión después de la descarga inicial

La misma infraestructura de incorporación sirve para la puesta en marcha de las organizaciones (asistente de configuración de la organización, configuración del procesador de pagos, generación de la llave BYOK, configuración de cumplimiento), con asistentes guiados paso a paso para cada tarea de configuración compleja.

**Alternativas consideradas:** Se descartó la capacitación externa (solo documentación, o un LMS de terceros) porque fragmenta la experiencia y no se integra con los permisos de la plataforma (no hay requisitos bloqueantes de certificación). Se descartó la incorporación mínima (solo crear la cuenta) porque los voluntarios del Sur Global pueden tener niveles muy distintos de alfabetización digital: la plataforma tiene que enseñar activamente a usarla.

### Requisitos bloqueantes de capacitación antes del primer turno

Cada organización configura qué módulos de capacitación son obligatorios antes de que un voluntario pueda acceder a las herramientas de campo. A un voluntario que no ha terminado la capacitación de trabajo de campo no se le puede asignar una lista de recorrido. Los requisitos bloqueantes se configuran por organización: las de baja amenaza pueden prescindir de ellos, y las campañas sensibles a la seguridad pueden exigir la capacitación en protocolos de seguridad antes de cualquier trabajo de campo.

**Alternativas consideradas:** Se descartó no poner ningún requisito bloqueante (capacitación opcional) porque, en entornos de alta amenaza, un voluntario sin capacitar con una lista de recorrido llena de datos de votantes es un riesgo de seguridad. Se descartó hacerlos obligatorios para todo el mundo porque las campañas pequeñas e informales necesitan flexibilidad para poner a la gente a trabajar rápido.

### Concierge de soporte con IA primero y escalamiento a personas

El soporte a las organizaciones en las tareas de configuración complejas (verificación de WhatsApp Business, manejo de llaves BYOK, configuración del procesador de pagos, configuración de cumplimiento, mudanza desde otra plataforma) usa un concierge de IA como primer contacto: disponible 24/7, multilingüe, capaz de resolver las preguntas estándar y de guiar la configuración. Cuando la IA no puede resolver, o cuando la organización lo pide, escala a un especialista humano. Las personas se concentran en los casos límite, las preguntas jurisdiccionales complejas y las configuraciones de alto riesgo.

**Alternativas consideradas:** Se descartó el soporte solo humano porque no escala a cinco países y siete idiomas sin una plantilla enorme. Se descartó el soporte solo con IA porque las tareas de alto riesgo (el manejo de llaves BYOK, donde perder la llave significa perder los datos para siempre) exigen verificación humana.

## Consecuencias

**Beneficios:**
- La capacitación integrada baja la barrera para participar como voluntario y hace que la incorporación tenga una calidad pareja
- Los requisitos bloqueantes de certificación protegen los datos sensibles al asegurar que los voluntarios estén capacitados antes de acceder a las herramientas de campo
- El contenido de capacitación personalizable por la organización deja que cada campaña añada el contexto de su entorno político y de sus necesidades de seguridad
- El concierge de soporte con IA primero escala a más países e idiomas sin que la plantilla crezca en la misma proporción

**Costos:**
- La gestión del contenido de los módulos de capacitación (redactarlo, organizarlo, versionarlo) es un área de producto que necesita inversión continua
- Los requisitos bloqueantes de certificación añaden fricción a la incorporación de voluntarios: hay que justificarlos con claridad o reducirán la conversión
- El concierge de IA necesita datos de entrenamiento y actualizaciones continuas a medida que la plataforma evoluciona

**Restricciones:**
- Los materiales de capacitación tienen que estar disponibles en todos los idiomas que cada organización tenga configurados
- El almacenamiento en caché de los materiales de capacitación tiene que caber dentro de los límites de almacenamiento de los dispositivos
- Configurar los requisitos bloqueantes tiene que ser simple para los Administradores de la organización, no una matriz de permisos compleja

**ADR relacionados:** [ADR-003](003-identity-access-organization.md) (política configurable de aprobación de voluntarios), [ADR-002](002-security-threat-model.md) (capacitación en seguridad para entornos de alta amenaza), [ADR-010](010-internationalization-localization.md) (contenido de capacitación multilingüe)
