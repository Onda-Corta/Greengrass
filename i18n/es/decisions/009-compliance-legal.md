# ADR-009: Cumplimiento y marco legal

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/compliance.md`, `spec/workflows.md`

## Contexto

GreenGrass opera en la intersección de la organización política, el tratamiento de datos personales y las transacciones financieras: tres de los sectores más regulados en cada jurisdicción objetivo. La plataforma abarca cinco países (Puerto Rico/EE. UU., Brasil, Tailandia, India, Líbano) con leyes electorales, regímenes de protección de datos, reglas de financiamiento de campañas y formas de hacer cumplir la ley radicalmente distintas. El cumplimiento no puede ser algo que se añade al final ni un parche por jurisdicción: tiene que ser estructural.

La tensión está entre construir una sola plataforma que funcione en todo el mundo y respetar requisitos legales muy distintos en cada jurisdicción. Construir al estándar más débil y adaptarlo después no alcanza; construir cinco sistemas de cumplimiento separados es insostenible.

## Decisión

### Filosofía de cumplimiento por principios

GreenGrass diseña primero para la jurisdicción más estricta y después afloja donde la ley local lo permite. Esto significa protección de datos al nivel de la LGPD y el GDPR en todas partes, incluso en jurisdicciones con leyes más débiles (Líbano, que no tiene una ley integral de protección de datos, recibe el GDPR como base por compromiso contractual). Se prefiere el cumplimiento por arquitectura al cumplimiento por política: donde se puede, incumplir se vuelve técnicamente imposible en lugar de depender de promesas. Con BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado), GreenGrass no puede entregar los datos de la organización.

**Alternativas consideradas:** Cumplir el mínimo de cada jurisdicción se descartó porque crea una colcha de retazos de protecciones distintas, más difícil de mantener y con garantías más débiles para las personas usuarias. Aplicar lo más estricto en todas partes sin aflojar nunca se descartó por innecesariamente restrictivo en las jurisdicciones de menor riesgo.

### Gestión de canales según el TSE para Brasil

Durante los períodos de campaña configurados en Brasil, la plataforma hace cumplir las reglas del TSE: límites de volumen de mensajes, restricciones de contenido, nada de envíos masivos por WhatsApp. Fuera de las ventanas de campaña se permite un uso más amplio. La plataforma codifica las reglas del TSE y las hace cumplir según el contexto, a partir de las fechas configuradas del período de campaña.

**Alternativas consideradas:** Desactivar WhatsApp por completo para las organizaciones brasileñas se descartó porque WhatsApp es demasiado importante en Brasil: las restricciones del TSE son propias del período de campaña, no permanentes. Ignorar las reglas del TSE y dejarle el cumplimiento a la organización se descartó porque incumplir puede terminar en la anulación de la candidatura.

### Advertencias visibles y responsabilidad de la organización para Tailandia

Para las organizaciones tailandesas, la plataforma muestra advertencias claras y visibles sobre las restricciones de lesa majestad —un delito penal grave en Tailandia— cuando se crea contenido. Sin filtrado automático de contenido: es técnicamente poco confiable y produce un efecto inhibidor. La organización y la persona usuaria son responsables de su contenido.

**Alternativas consideradas:** El filtrado automático de contenido por lesa majestad se descartó porque es técnicamente poco confiable (el delito está definido de forma amplia y política), produce un efecto inhibidor sobre el discurso político y pone a GreenGrass en el papel de censurar comunicación política. Ignorar el riesgo por completo se descartó porque la lesa majestad es un delito penal grave: la gente tiene que saberlo.

### Formularios de inscripción de votantes específicos por jurisdicción

Plantillas ya hechas para los países objetivo, que incorporan requisitos de elegibilidad, campos obligatorios, reglas de documentación y procedimientos de entrega. Constructor de formularios a medida para las jurisdicciones sin plantilla. Un modelo de contribución comunitaria permite que las organizaciones compartan sus configuraciones para incluirlas en la biblioteca curada.

### La aplicación del período de campaña es estricta por defecto

Cada organización elige aplicación estricta o flexible por jurisdicción. La aplicación estricta (la plataforma bloquea las acciones restringidas durante los períodos de campaña configurados) es la opción por defecto. Las organizaciones con experiencia y asesoría legal propia pueden cambiar a la aplicación flexible (solo advertencias).

### Filtrado de contribuciones extranjeras en dos niveles

Los donantes evidentemente inelegibles (sin ciudadanía, sin residencia, sin vínculo que califique) se bloquean en el momento del pago, en tiempo real. Los casos límite (diáspora, doble ciudadanía, información incompleta) se aceptan pero quedan en retención en custodia, marcados para revisión de cumplimiento, y requieren aprobación manual antes de liberar los fondos.

### Informes de cumplimiento: integrados en las jurisdicciones prioritarias, exportación estructurada en todas

Los módulos de informes específicos por jurisdicción se construyen a medida que arrancan los pilotos (primero la FEC para el alfa, después el TSE para Brasil, etc.), siguiendo el patrón de adaptador por jurisdicción. La exportación de datos estructurados en formatos limpios está disponible desde el primer día como alternativa de reserva universal: cualquier organización puede generar informes que cumplan aunque el módulo de su jurisdicción todavía no exista.

### Estructura corporativa: una sola entidad con opción de filiales

Se empieza con una sola compañía en la jurisdicción de constitución (una con privacidad fuerte: Estonia o Suiza son las candidatas), que opera globalmente mediante contratos. Se establecen filiales locales cuando una jurisdicción concreta exija presencia local (probablemente India, por la fiscalización de la FCRA; posiblemente Brasil, por los requisitos del TSE).

## Consecuencias

**Beneficios:**
- Diseñar para la jurisdicción más estricta significa que toda organización recibe protecciones fuertes, sin importar la ley local
- El cumplimiento por arquitectura (BYOK) es más fuerte que el cumplimiento por política: es técnicamente imposible violarlo
- La gestión de canales según el TSE deja que las campañas brasileñas usen WhatsApp legalmente y las protege de infringir sin darse cuenta
- El filtrado de contribuciones extranjeras en dos niveles equilibra la seguridad (bloquear las violaciones evidentes) con la justicia (no rechazar a donantes legítimos de la diáspora)
- El cumplimiento como funcionalidad del producto (informes, manejo del consentimiento, registros de auditoría) es una ventaja competitiva

**Costos:**
- Los módulos de cumplimiento por jurisdicción son una inversión de ingeniería considerable en cada país
- La aplicación estricta por defecto puede frustrar a las organizaciones con experiencia, que entienden las reglas mejor que la codificación de la plataforma
- Las filiales locales complican la estructura corporativa y traen implicaciones fiscales
- Las fechas del período de campaña hay que configurarlas a mano en cada organización y mantenerlas al día

**Restricciones:**
- Cada lanzamiento de país exige trabajar con asesoría legal local: no se lanza sobre supuestos
- El posicionamiento frente a la FCRA en India (proveedor de tecnología, no proveedor de servicios políticos) requiere una opinión legal formal antes del piloto
- El registro ante el TSE en Brasil necesita que lo determine la asesoría legal
- Las plantillas de cumplimiento hay que mantenerlas a medida que cambian las leyes electorales: un costo permanente

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (BYOK como mecanismo de cumplimiento, legalidad del cifrado por jurisdicción), [ADR-004](004-data-model-integrity.md) (conservación de la auditoría por 10 años), [ADR-007](007-fundraising-payments.md) (informes de financiamiento de campañas, bloqueo de contribuciones extranjeras), [ADR-008](008-communications-messaging.md) (aplicación del consentimiento, reglas del TSE para la mensajería)
