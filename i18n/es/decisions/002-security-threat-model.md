# ADR-002: Seguridad y modelo de amenazas

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/security.md`, `design/architecture/system.md`, `design/ux/02-global-patterns/security-ux-patterns.md`

## Contexto

GreenGrass opera en entornos políticos donde una falla de seguridad tiene consecuencias reales: vigilancia, hostigamiento, arresto o violencia. El modelo de amenazas incluye actores estatales con capacidad de interceptar la red, adversarios políticos que pueden infiltrarse como voluntarios y dispositivos que pueden ser incautados físicamente en un retén o en un allanamiento. Las medidas de seguridad empresariales estándar no bastan: la arquitectura tiene que dar por hecho el compromiso, minimizar el radio de impacto y ofrecer funcionalidades diseñadas específicamente para entornos políticos hostiles.

## Decisión

### Cifrado BYOK por defecto

Cada organización genera y custodia sus propias llaves de cifrado. GreenGrass no puede descifrar los datos de una organización y, por lo tanto, no puede verse obligada por vía legal a entregarlos. Esto es lo predeterminado, no una opción avanzada: BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) se presenta como la opción recomendada durante la puesta en marcha, con generación guiada de llaves, flujos seguros de copia de seguridad (incluido el reparto de secretos de Shamir entre varios administradores de la organización) y documentación clara de que perder la llave significa perder los datos para siempre.

Las organizaciones que eligen explícitamente la comodidad por encima de la soberanía pueden optar por llaves administradas por GreenGrass, lo que habilita la recuperación de datos asistida por soporte y simplifica la operación de las organizaciones menos técnicas.

**Alternativas consideradas:** Se descartó dejar las llaves administradas por defecto y BYOK como opción que la organización activa, porque invierte el modelo de confianza: la plataforma tendría por defecto las llaves de datos políticos sensibles, lo que la convierte en blanco de requerimientos legales. La opción de solo llaves administradas por la plataforma nunca se consideró, dado el modelo de amenazas.

### TLS 1.2+ con preferencia por TLS 1.3

Toda la comunicación de red va cifrada. Los clientes compatibles con TLS 1.3 lo negocian automáticamente; los dispositivos más viejos recurren a TLS 1.2 con las suites de cifrado débiles deshabilitadas. Así se equilibra la seguridad con la accesibilidad de los dispositivos en el Sur Global, donde abundan los equipos antiguos. HTTPS con HSTS y fijación de certificados en los clientes móviles; TLS mutuo para la comunicación entre servicios internos.

### Arquitectura que da por hecho el compromiso

Cada capa se diseña asumiendo que la capa de encima ya está comprometida. Defensa en profundidad, no seguridad perimetral. La arquitectura de organización única limita el radio de impacto: comprometer una organización no expone a otra. El cifrado a nivel de aplicación protege los campos de alta sensibilidad (puntuaciones de inclinación política, notas de trabajo de campo, identidad de los donantes, comunicaciones de los candidatos, números de identificación nacional) por encima del cifrado a nivel de almacenamiento, de modo que comprometer la base de datos, por sí solo, no expone los datos más sensibles.

### Modo de coacción con interfaz saneada

Un passkey secundario da entrada a una vista saneada de la aplicación, que parece funcional pero no contiene datos sensibles. El inicio de sesión bajo coacción es indistinguible de uno normal: sin señales visuales, sin diferencias en el comportamiento de carga. Dispara una alerta silenciosa a los contactos de confianza de la persona y al Administrador de la organización. Disponible en el nivel de seguridad agresivo para las organizaciones que operan en entornos políticos hostiles.

<!-- REVISIT: El original dice "the aggressive security tier", que mezcla el eje de protección de metadatos (moderado / agresivo) con el eje de aislamiento (Estándar / Reforzado / Máximo / Autoalojado). No existe un "nivel de seguridad agresivo": `spec/security.md` sitúa el modo de coacción en el nivel agresivo de protección de metadatos. La contradicción se traduce tal cual y hay que arreglarla en el inglés. -->

La vista saneada muestra contenido verosímil pero depurado: una estructura de cuenta real con datos mínimos, no una pantalla en blanco ni un estado obviamente falso. Así resiste la inspección superficial de un adversario.

**Alternativas consideradas:** Se descartó no tener modo de coacción (dejarlo fuera del alcance) porque la incautación física de dispositivos es una amenaza real en los países objetivo. Se descartaron las aplicaciones señuelo evidentes porque no resisten una inspección.

### Solo datos operativos en los dispositivos de campo

Lo que se descarga de una lista de recorrido contiene solo lo operativamente necesario: nombre, dirección, edad, resultado del contacto anterior y el guion de trabajo de campo. Las notas detalladas de visitas anteriores, las etiquetas y puntajes internos, el historial de donaciones, la identificación nacional y el historial completo de comunicaciones se quedan en el servidor. Si incautan un dispositivo, la exposición es limitada. Todos los datos en el dispositivo van cifrados (SQLCipher) y se borran al terminar la sesión.

## Consecuencias

**Beneficios:**
- BYOK deja a GreenGrass arquitectónicamente incapaz de atender un requerimiento de datos para la mayoría de las organizaciones: el modelo de confianza más fuerte posible
- La arquitectura que da por hecho el compromiso implica que ningún punto único de compromiso puede exponer la plataforma entera
- El modo de coacción da protección de seguridad física a los activistas en entornos hostiles
- Llevar datos mínimos en los dispositivos de campo limita la exposición ante el vector de ataque físico más probable: la incautación del dispositivo

**Costos:**
- La gestión de llaves BYOK impone una carga considerable a la experiencia de usuario, que hay que resolver con flujos guiados y el reparto de secretos de Shamir
- Perder la llave es perder los datos para siempre: el flujo de puesta en marcha tiene que dejar esa consecuencia inequívocamente clara
- El modo de coacción exige un diseño cuidadoso para ser indistinguible de un inicio de sesión normal, lo que añade complejidad de implementación
- El cifrado a nivel de aplicación por encima del cifrado de almacenamiento añade complejidad a las consultas sobre campos cifrados

**Restricciones:**
- Todas las funcionalidades de seguridad tienen que funcionar en los dispositivos de gama baja habituales en el Sur Global
- Las alertas silenciosas de coacción tienen que resistir el monitoreo de la red: la alerta misma no puede ser lo que delate la coacción
- La seguridad tiene que ser invisible durante la operación normal: una experiencia de seguridad intrusiva socava la adopción

**ADR relacionados:** [ADR-001](001-platform-architecture.md) (el aislamiento de organización única es un control de seguridad), [ADR-003](003-identity-access-organization.md) (autenticación y gestión de sesiones), [ADR-005](005-offline-first-sync.md) (cifrado de los datos sin conexión), [ADR-008](008-communications-messaging.md) (cifrado de extremo a extremo para la mensajería)
