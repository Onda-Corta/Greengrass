# ADR-004: Modelo de datos e integridad

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/security.md`, `spec/compliance.md`, `spec/workflows.md`, `spec/users.md`, `design/architecture/system.md`

## Contexto

GreenGrass maneja datos políticamente sensibles —registros de contacto con votantes que incluyen puntuaciones de inclinación política, identidad de los donantes, notas de trabajo de campo, comunicaciones de los candidatos— en entornos donde la integridad de los datos tiene consecuencias para la seguridad de las personas. Los registros en conflicto que llegan del trabajo de campo sin conexión hay que resolverlos sin perder datos en silencio. La deduplicación tiene que lidiar con datos del mundo real, desordenados (números de teléfono compartidos, nombres inconsistentes), sin atribuir mal una donación ni un historial de trabajo de campo. Y toda mutación de datos tiene que ser rastreable, por integridad electoral, por reporte de cumplimiento y por auditoría de seguridad.

## Decisión

### Registro de auditoría completo para todas las mutaciones de datos

Todo cambio de datos queda registrado: quién, qué, cuándo y desde dónde. Esto incluye ediciones en el CRM, transacciones financieras, cambios de permisos, inicios de sesión, exportaciones de datos, fusiones de registros, acciones masivas y eventos de sesión. El registro de auditoría es inmutable: ningún usuario puede modificar ni borrar una entrada, ni siquiera el Administrador de la plataforma. Un registro de auditoría aparte, el del Administrador de la plataforma, recoge todas las acciones del equipo de GreenGrass.

La conservación del registro de auditoría es de 10 años en todos lados, igualando el requisito libanés para registros comerciales, el más largo entre los países objetivo. Una sola regla en todas partes elimina el riesgo de borrado prematuro por una lógica de conservación específica por jurisdicción mal implementada.

**Alternativas consideradas:** Se descartaron los períodos de conservación por jurisdicción porque almacenar datos de eventos estructurados es barato frente al riesgo de cumplimiento que supone equivocarse con la conservación de cada jurisdicción.

### Resolución de conflictos con fusionar y marcar

Cuando se sincronizan registros en conflicto desde varios dispositivos (algo común en el trabajo de campo sin conexión), se conservan los dos registros y se marcan para revisión humana. El Gestor de datos ve los dos registros lado a lado —quién anotó qué, cuándo y desde qué dispositivo— y decide cómo resolverlos. Ningún dato se descarta en silencio. Esto es coherente con el enfoque de deduplicación de sugerir y confirmar.

En los campos no conflictivos, el protocolo de sincronización aplica reglas de resolución automática: gana la última escritura en los campos simples, fusión aditiva en las interacciones, gana el servidor en las asignaciones y gana el cliente en el trabajo de campo en curso. Los conflictos que llegan al usuario son raros y se presentan con la opción segura por defecto de conservar las dos versiones.

**Alternativas consideradas:** Se descartó aplicar *gana la última escritura* en todo, porque descartar en silencio datos de trabajo de campo o registros de donaciones es inaceptable en un contexto político. Se descartó la resolución totalmente manual porque generaría una acumulación inmanejable durante las jornadas de campo de alto volumen.

### Los datos políticos se tratan como sensibles en todas partes

Todos los datos de la plataforma se tratan como sensibles sin importar la ley local: protecciones al nivel de LGPD y GDPR aplicadas en todo el mundo. GreenGrass es una plataforma de organización política; todo dato que vive en ella es político por naturaleza. Un solo nivel de protección, sin ambigüedad y sin lógica de clasificación por jurisdicción que mantener. El cifrado a nivel de aplicación protege los campos de mayor sensibilidad por encima del cifrado a nivel de almacenamiento.

### Deduplicación con sugerir y confirmar

El motor de deduplicación usa un cruce compuesto: el número de celular como identificador principal (el de mayor peso en contextos de prioridad móvil), el correo electrónico como secundario, la identificación nacional o electoral como dato definitivo cuando está disponible, y el nombre más la dirección como señal de apoyo, con cruce aproximado. Los pesos del cruce se configuran en cada despliegue para tener en cuenta la calidad de los datos de cada país.

El sistema marca los posibles duplicados y los muestra en una cola de revisión. Una persona con los permisos adecuados revisa y decide si fusionar, descartar o aplazar. No hay fusión automática: el riesgo de atribuir mal una donación o de perder historial de trabajo de campo es demasiado alto.

**Alternativas consideradas:** Se descartó la fusión automática por encima de un umbral de confianza porque un falso positivo en un CRM político tiene consecuencias desproporcionadas (donaciones mal atribuidas, registros fusionados de dos personas distintas que comparten un teléfono). Se descartó la detección solo manual porque el volumen de registros en campañas con padrones electorales grandes la vuelve impracticable.

### Exportación completa con los datos de relación en formatos abiertos

Cada organización puede exportar todo lo que le pertenece: contactos, registros de donantes, historial de donaciones, historial de comunicaciones, datos de trabajo de campo, registros y horas de voluntariado, datos de eventos, analítica, etiquetas, segmentos, notas y registros de auditoría. Se conservan las referencias cruzadas (qué donantes asistieron a qué eventos, qué voluntarios trabajaron qué territorios). La exportación usa formatos estándar abiertos (CSV, JSON) con esquema documentado. La portabilidad de los datos es una garantía contractual en los términos de servicio: no es solo una funcionalidad, es un derecho exigible.

**Alternativas consideradas:** Se descartó la exportación en tablas planas porque despoja a los datos de su valor relacional. Los formatos propietarios nunca se consideraron: la dependencia del proveedor es contraria a los principios de soberanía de la plataforma.

## Consecuencias

**Beneficios:**
- Un registro de auditoría completo da garantías de integridad electoral y evidencia de cumplimiento
- Fusionar y marcar evita la pérdida silenciosa de datos en las operaciones de mayor riesgo (jornadas de campo, día de elecciones)
- Tratar todos los datos como sensibles elimina el riesgo de clasificarlos mal entre jurisdicciones
- La deduplicación de sugerir y confirmar evita fusiones erróneas costosas y mantiene manejable la carga de revisión
- La exportación completa con los datos de relación garantiza que no haya dependencia del proveedor

**Costos:**
- Registrar todo en auditoría genera un volumen de almacenamiento considerable, aunque los eventos estructurados se comprimen bien
- La conservación de 10 años implica que el almacenamiento de auditoría crece indefinidamente (se mitiga con almacenamiento por niveles y archivado)
- La revisión humana de conflictos y de candidatos a duplicado exige capacidad del Gestor de datos durante las operaciones de alto volumen
- La exportación relacional completa es más compleja de implementar que un volcado de tablas planas

**Restricciones:**
- La inmutabilidad del registro de auditoría tiene que hacerse cumplir a nivel de infraestructura, no solo a nivel de aplicación
- Los pesos de cruce de la deduplicación tienen que validarse país por país antes del despliegue
- La exportación tiene que estar disponible cuando se pida, sin colas de aprobación: la organización no tiene que explicar por qué

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (cifrado a nivel de aplicación para los campos sensibles), [ADR-003](003-identity-access-organization.md) (la identidad federada complica la deduplicación), [ADR-005](005-offline-first-sync.md) (resolución de conflictos en la sincronización sin conexión), [ADR-009](009-compliance-legal.md) (requisitos de conservación por jurisdicción)
