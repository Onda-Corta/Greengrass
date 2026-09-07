# ADR-003: Identidad, acceso y organización

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/users.md`, `spec/workflows.md`

## Contexto

Quienes usan GreenGrass suelen participar en varias organizaciones: una voluntaria puede trabajar a la vez para un candidato, un partido y una alianza. La plataforma tiene que manejar esa realidad multiorganización sin crear identidades duplicadas ni filtrar datos entre organizaciones. Al mismo tiempo, el modelo de roles y permisos tiene que dar cabida a estructuras de campaña muy distintas: desde la campaña de un candidato con tres personas, donde una sola lleva comunicaciones y finanzas, hasta un partido nacional con cientos de personas en el equipo repartidas por regiones geográficas acotadas.

La aprobación de voluntarios es otro punto de tensión: las campañas de baja amenaza quieren que la gente se inscriba y trabaje el mismo día, mientras que las campañas expuestas a la infiltración necesitan revisar cada inscripción.

## Decisión

### Identidad federada con perfiles por organización

Una persona tiene una sola identidad a nivel de plataforma (credenciales de acceso, nombre, datos de contacto, idioma preferido, consentimiento expreso o baja de comunicaciones, historial de donaciones como registro del donante) y un perfil por cada organización a la que pertenece (rol, permisos, horas de voluntariado, asignaciones de trabajo de campo, etiquetas internas, notas del personal). La plataforma sabe que es la misma persona —lo que permite deduplicar y coordinar entre organizaciones al nivel de la alianza—, pero cada organización solo ve sus propios datos sobre esa persona.

La identidad de plataforma de una persona es independiente de cualquier organización. Puede irse de una organización, entrar a otra o existir sin afiliación. Los datos básicos de identidad viajan con la persona; los datos operativos específicos de cada organización se quedan con la organización.

**Alternativas consideradas:** Se descartaron las identidades por organización (una cuenta distinta en cada una) porque crean registros duplicados, fragmentan el historial de donaciones y hacen imposible la coordinación al nivel de la alianza. Se descartaron los perfiles totalmente compartidos porque filtran datos operativos entre organizaciones.

### Reparto entre la identidad de plataforma y los datos que son de la persona

| Pertenece a la persona (nivel de plataforma) | Pertenece a la organización |
|---|---|
| Credenciales de acceso (login, 2FA) | Rol y permisos dentro de esa organización |
| Nombre, datos de contacto, idioma preferido | Horas de voluntariado, historial de turnos |
| Preferencias de alta y baja en comunicaciones | Asignaciones de trabajo de campo y notas de campo |
| Historial de donaciones (como registro propio del donante) | Etiquetas, puntajes y segmentos internos |
| Membresías e historial de afiliaciones | Notas del personal sobre la persona |

Este reparto garantiza la portabilidad de los datos (una persona puede llevarse su identidad) sin dejar de respetar la soberanía de cada organización sobre sus datos operativos.

### Plantillas de rol híbridas con sobrescrituras por usuario

La plataforma trae plantillas de rol de personal por defecto (Director de comunicaciones, Director de finanzas, Director de campo, Coordinador de voluntarios, Gestor de datos, Candidato, Adjunto). Los administradores de la organización pueden asignar las plantillas tal cual, apilar varias plantillas sobre una misma persona (el caso de la campaña de tres personas), sobrescribir permisos individuales o crear plantillas propias. Las plantillas se suman al apilarse: una revocación explícita prevalece sobre una concesión.

El modelo de permisos es híbrido, RBAC más acotación por atributos: las plantillas de rol determinan qué acciones puede ejecutar un usuario, y las asignaciones de ámbito (geográfico, de equipo, de campaña o sin ámbito) determinan sobre qué datos aplican esas acciones.

**Alternativas consideradas:** Se descartó el RBAC puro sin ámbitos porque las campañas necesitan control de acceso geográfico y por equipo. Se descartó el ABAC puro por ser demasiado complejo de administrar para el personal de campaña. Se descartaron los roles fijos sin personalización porque no hay dos estructuras de campaña iguales.

### Todos los tipos de recurso se pueden compartir en una alianza

Las alianzas permiten cooperar dentro de límites definidos. Entre los recursos que se pueden compartir están las bolsas de voluntarios, los datos de contacto de votantes, la infraestructura de eventos, la recaudación de fondos (con repartos configurables), las listas de comunicación y la analítica. Compartir es opcional: lo activa cada organización, recurso por recurso, y es revocable, auditado y respeta el consentimiento de cada persona. Nada se comparte por defecto: cada organización miembro elige explícitamente qué comparte.

### Política de aprobación de voluntarios configurable

Cada organización define su propia política: aprobación automática (los voluntarios quedan activos de inmediato) o aprobación requerida (el Coordinador de voluntarios revisa cada inscripción). El valor por defecto se fija a nivel de la organización, con sobrescrituras por canal de inscripción (por ejemplo, aprobar automáticamente a quienes llegan por referencia y exigir aprobación a las inscripciones espontáneas).

**Alternativas consideradas:** Se descartó aprobar siempre de forma automática porque las campañas de alta amenaza necesitan revisar cada inscripción para detectar infiltraciones. Se descartó exigir aprobación siempre porque crea fricción innecesaria en entornos de baja amenaza.

### Modelos de gobernanza de la alianza configurables

Cada alianza elige un modelo de gobernanza para cada campaña conjunta:
- **Controlada por la alianza** — el Administrador de la alianza dirige la operación y las organizaciones miembro aportan recursos
- **Controlada por cada organización** — cada organización miembro opera de forma independiente y la alianza aporta la coordinación
- **Gobernanza compartida** — campaña conjunta con su propia estructura de roles y personal de varias organizaciones

Campañas distintas dentro de una misma alianza pueden usar modelos distintos.

## Consecuencias

**Beneficios:**
- Una persona puede participar en varias organizaciones sin identidades duplicadas
- El reparto de la propiedad de los datos protege a la vez la portabilidad de la persona y la soberanía de la organización
- Apilar plantillas cubre todo el rango de tamaños de campaña sin tener que diseñar roles a medida
- Compartir dentro de la alianza es lo bastante granular para la política de coalición real sin sacrificar la autonomía de cada organización
- Las políticas de aprobación configurables sirven tanto a campañas abiertas como a campañas sensibles en materia de seguridad

**Costos:**
- La identidad federada complica la deduplicación, sobre todo cuando la misma persona entra en una organización a la vez como registro de votante y como usuario activo
- El híbrido de RBAC y ámbitos exige hacerlo cumplir con cuidado en el servidor para evitar fugas de ámbito
- Las reglas para compartir dentro de una alianza crean cadenas de control de acceso complejas que hay que auditar

**Restricciones:**
- Los límites entre organizaciones son el ámbito más externo: ningún usuario ve nunca datos de una organización a la que no pertenece
- La visibilidad que tiene la alianza sobre personas presentes en varias organizaciones se limita a metadatos de coordinación, salvo que existan reglas explícitas para compartir
- El consentimiento de la persona prevalece sobre la configuración de intercambio de la organización

**ADR relacionados:** [ADR-001](001-platform-architecture.md) (modelo de federación), [ADR-002](002-security-threat-model.md) (métodos de autenticación), [ADR-004](004-data-model-integrity.md) (registro de auditoría para los cambios de permisos), [ADR-008](008-communications-messaging.md) (cifrado de las comunicaciones de la alianza)
