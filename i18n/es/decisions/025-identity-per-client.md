# ADR-025: Identidad por cliente

**Estado:** Aceptada
**Fecha:** 2026-11-13
**Fuentes:** `spec/users.md`, `spec/compliance.md`, `spec/workflows.md`, `design/architecture/system.md`, `decisions/001-platform-architecture.md`, `decisions/003-identity-access-organization.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/022-core-modules-and-lanes.md`

## Contexto

[ADR-003 § Identidad federada con perfiles por organización](003-identity-access-organization.md#identidad-federada-con-perfiles-por-organización) decidió que una persona tiene una sola identidad a nivel de plataforma y un perfil por cada organización. [system.md § Arquitectura de identidad y autenticación](../design/architecture/system.md#arquitectura-de-identidad-y-autenticación) lo construyó: un servicio de identidad compartido por todas las organizaciones, fuera de todas ellas, con un principal centralizado en la jurisdicción de constitución y réplicas de lectura en cada país. [users.md § Pertenencia a varias organizaciones](../spec/users.md#pertenencia-a-varias-organizaciones) describe lo que ve la persona: un solo inicio de sesión para todas sus organizaciones, y un selector de organización cuando pertenece a más de una.

Ese servicio es el único lugar de la arquitectura donde los datos de las personas de todas las organizaciones están juntos. Se aceptó porque hacía posible una persona, un inicio de sesión, y porque dejaba que la capa de alianza viera que una persona existía en varias organizaciones miembro.

Quien dirige el producto decidió otra cosa, en una oración de la descripción de los dos carriles ([ADR-022 § Dos carriles sobre una misma infraestructura](022-core-modules-and-lanes.md#dos-carriles-sobre-una-misma-infraestructura)): cada cliente corre su propia instancia, con sus propios datos y sus propias cuentas. La identidad es por cliente.

### Conflictos que resuelve esta ADR

Esta ADR revierte una decisión aceptada. Los conflictos se nombran para que la reversión quede a la vista.

1. **[ADR-003 § Identidad federada con perfiles por organización](003-identity-access-organization.md#identidad-federada-con-perfiles-por-organización)** y **[ADR-003 § Reparto entre la identidad de plataforma y los datos que son de la persona](003-identity-access-organization.md#reparto-entre-la-identidad-de-plataforma-y-los-datos-que-son-de-la-persona)** deciden una sola identidad a nivel de plataforma por persona. Queda sin efecto.
2. **[system.md § Arquitectura de identidad y autenticación](../design/architecture/system.md#arquitectura-de-identidad-y-autenticación)** especifica un servicio de identidad compartido de la plataforma, con un principal centralizado y réplicas de lectura por país. Queda sin efecto.
3. **[users.md § Pertenencia a varias organizaciones](../spec/users.md#pertenencia-a-varias-organizaciones)** especifica un solo inicio de sesión para varias organizaciones y un selector de organización. Se elimina tal como estaba especificado.
4. **[ADR-016](016-cross-cutting-resolutions.md) §59** especifica la recuperación asistida por la plataforma para un Administrador de la organización que perdió el acceso, a cargo del soporte de GreenGrass y contra el servicio compartido. Pasa a ser un procedimiento del operador de cada instancia.
5. **[compliance.md § Transferencias transfronterizas de datos](../spec/compliance.md#transferencias-transfronterizas-de-datos)** pone los datos de identidad de plataforma en la jurisdicción de constitución, con réplicas en cada país. Sin datos de identidad de plataforma, esa línea no tiene nada que describir.

## Decisión

### Cada instancia corre su propio servicio de identidad y guarda sus propias cuentas

La instancia de cada cliente corre su propio servicio de identidad: su propio almacén de credenciales, su propio gestor de sesiones y su propio servicio de recuperación. Una cuenta existe en una instancia y en ningún otro lugar. No hay ningún componente de identidad fuera de las instancias, ni principal centralizado, ni réplicas por país.

Todo lo que tiene que ver con cómo se autentica una persona queda igual: passkeys primero, las alternativas y los niveles de la ADR-016 §57 a §60, la autenticación en modo de campo, la recuperación por contactos de confianza, la duración de sesión según el rol. Esas eran decisiones sobre el comportamiento del servicio. Esta ADR cambia dónde corre el servicio y de quién son las cuentas que guarda.

**Alternativas consideradas:** El servicio de identidad compartido de la plataforma era el diseño aceptado y es lo que esta ADR reemplaza. Lo que daba era un solo inicio de sesión para una persona en varias organizaciones, y una vista a nivel de plataforma de la misma persona en todas ellas. La decisión renuncia a las dos cosas, y a cambio quita un componente central y los datos entre clientes que guardaba. La ADR-003 había descartado las identidades por organización porque crean registros duplicados, fragmentan el historial de donaciones y hacen imposible la coordinación a nivel de alianza. Esos costos son reales y están listados en Consecuencias.

### Lo que se sigue de ahí

- **Desaparece un componente central más,** junto con los datos entre clientes que guardaba. La capa de plataforma ya no contiene la identidad.
- **Las instancias autoalojadas se simplifican.** Un cliente autoalojado ya no depende de un servicio de identidad que no corre él.
- **La pertenencia a varias organizaciones desaparece tal como estaba especificada.** Una persona que trabaja en el PIP y en la Alianza tiene dos cuentas, y no hay selector de organización.
- **La recuperación de un Administrador de la organización que perdió el acceso pasa a ser un procedimiento del operador de cada instancia.** La ADR-016 §59 pone al soporte de GreenGrass a hacerla contra el servicio compartido. Esta ADR cambia quién la hace y dónde, y nada más: la verificación, el período de espera de 72 horas y la notificación a los contactos de la organización quedan como los decidió §59.
- **El inicio de sesión único entre una alianza y sus miembros no es parte de este diseño.** Si más adelante se quiere, se puede agregar como una confianza opcional entre instancias.

### Qué guardaba la identidad de plataforma, y adónde va

[ADR-003 § Reparto entre la identidad de plataforma y los datos que son de la persona](003-identity-access-organization.md#reparto-entre-la-identidad-de-plataforma-y-los-datos-que-son-de-la-persona) le dio a la persona un registro a nivel de plataforma: credenciales, nombre y datos de contacto, idioma preferido, consentimiento expreso o baja de comunicaciones, el historial de donaciones como registro del propio donante, y las organizaciones a las que pertenece. El reparto entre lo que es de la persona y lo que es de la organización sigue describiendo lo que una instancia guarda de su propia gente. Lo que cambia es que no hay nada por encima de las instancias que guarde una sola vez, para todas, el lado de la persona.

- **Las credenciales, el nombre, los datos de contacto y el idioma preferido** se guardan por instancia, en la cuenta.
- **El consentimiento y las preferencias de comunicación** se guardan por instancia, en el CRM del Core ([ADR-022 § Qué contiene el Core](022-core-modules-and-lanes.md#qué-contiene-el-core)). Una baja registrada en una instancia vale en toda esa instancia. Llega a otra organización solo bajo un contrato de intercambio entre las dos ([ADR-017](017-sharing-contract-trust-model.md)); la [ADR-024](024-event-bus-as-federation.md) propone cómo.
- **Cruzar a la misma persona entre organizaciones** ya no tiene una identidad compartida en la que apoyarse. La supresión mutua ya hace el cruce sobre un índice ciego con llave del contrato de la alianza, en manos de los miembros ([system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales)), así que no se ve afectada.

Tres cosas que daba la identidad de plataforma no tienen reemplazo en esta ADR, y quedan anotadas como abiertas, no respondidas:

1. **El registro del propio donante entre organizaciones.** El historial de donaciones de una persona era suyo a nivel de plataforma. Ahora cada instancia guarda solo las donaciones que esa persona le hizo a ella.
2. **La portabilidad.** Una persona podía irse de una organización y conservar su identidad. Ahora una cuenta termina con la instancia en la que vive, a menos que se diseñe algo que la lleve.
3. **Una baja del intercambio de datos, a nivel de la persona, que obligue a todas las organizaciones a la vez.** [users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza) lee esa preferencia de «sus preferencias de plataforma». Ahora hay que registrarla en cada instancia que tenga a la persona.

### Qué se reescribe y qué se marca

Esta ADR reescribe las secciones que definen la identidad: [system.md § Arquitectura de identidad y autenticación](../design/architecture/system.md#arquitectura-de-identidad-y-autenticación), las entidades a nivel de plataforma de [system.md § Modelo de datos](../design/architecture/system.md#modelo-de-datos), y [users.md § Pertenencia a varias organizaciones](../spec/users.md#pertenencia-a-varias-organizaciones). Le agrega una línea de **Enmendada por** a la [ADR-003](003-identity-access-organization.md) y amplía la de la [ADR-016](016-cross-cutting-resolutions.md) por §59.

No persigue cada oración que da por sentada una identidad de plataforma. Las que quedan están en [workflows.md](../spec/workflows.md), [geography.md](../spec/geography.md), [compliance.md](../spec/compliance.md), los wireframes y otras partes de `system.md`. Cuando una de ellas aparece en un documento que este cambio toca, se marca `REVISIT:` y se deja como está escrita. Una revisión de conciliación sobre el resto queda como trabajo pendiente.

## Consecuencias

**Beneficios:**
- Ningún componente guarda cuentas ni datos personales de varios clientes; desaparece el mayor almacén entre clientes de la arquitectura
- Un cliente político y un cliente comercial no comparten ninguna infraestructura de identidad
- Una instancia está completa por sí sola, que es lo que piden tanto el autoalojamiento como la residencia de datos por país
- El principal en la jurisdicción de constitución, sus réplicas y su conmutación ante fallos ya no se construyen ni se operan

**Costos:**
- Una persona en varias organizaciones tiene varias cuentas y varios inicios de sesión
- La misma persona es un registro aparte en cada instancia, y el cruce entre organizaciones existe solo donde un contrato lo provee
- El registro del donante entre organizaciones, la portabilidad de la identidad y una sola baja del intercambio a nivel de la persona se quedan sin casa, y todavía nada los reemplaza
- La recuperación del Administrador de la organización depende del operador de cada instancia, y un cliente autoalojado tiene que hacer el procedimiento él mismo
- Se revierte una decisión aceptada, y los documentos que la daban por sentada necesitan una revisión de conciliación que no se hace aquí

**Restricciones:**
- Ningún dato de identidad se guarda fuera de la instancia de un cliente
- Los métodos de autenticación, los niveles y las salvaguardas de recuperación quedan como los decidió la ADR-016 §57 a §60
- El consentimiento de cada persona sigue por encima de los términos del contrato ([ADR-017](017-sharing-contract-trust-model.md)); se registra por instancia
- El inicio de sesión único entre instancias, si se agrega, es opcional y es una confianza entre instancias, nunca un servicio compartido

**ADR relacionadas:** [ADR-001](001-platform-architecture.md) (una instancia por cliente; la identidad sigue ahora la misma regla), [ADR-002](002-security-threat-model.md) (métodos de autenticación, sin cambios), [ADR-003](003-identity-access-organization.md) (enmendada: la identidad federada de plataforma y la pertenencia a varias organizaciones quedan sin efecto; los roles, los ámbitos, el intercambio y la gobernanza no cambian), [ADR-016](016-cross-cutting-resolutions.md) (§57 a §60 sin cambios de fondo; la recuperación de §59 pasa a ser un procedimiento por instancia), [ADR-017](017-sharing-contract-trust-model.md) (los contratos llevan lo que antes llevaba una identidad compartida), [ADR-022](022-core-modules-and-lanes.md) (la identidad es del Core, un servicio por cliente), [ADR-024](024-event-bus-as-federation.md) (propone cómo cruza el consentimiento entre instancias)
