# GreenGrass

Una plataforma para manejar elecciones políticas de base en el Sur Global.

GreenGrass reúne en un solo lugar un gestor de relaciones con constituyentes (CRM), una base de datos de votantes, herramientas de recaudación de fondos, una suite de comunicaciones y analítica de datos. Está pensada para contextos de recursos limitados, conectividad intermitente, poblaciones multilingües y estructuras de organización descentralizadas.

## Qué está en español y qué no

Esta es la versión en español de los 14 documentos de especificación de producto. El resto de la documentación del proyecto —el diseño de UX (37 documentos), la arquitectura del sistema, los 17 registros de decisiones de arquitectura (ADR) y el diario del proyecto— por ahora existe solo en inglés. El botón **EN**, arriba a la derecha, te lleva a la documentación completa en inglés.

## Mercados objetivo

Puerto Rico (alfa), Brasil, Tailandia, India y Líbano — cada uno con su propio sistema electoral, sus idiomas, sus leyes de protección de datos y sus límites de infraestructura.

## Estado del proyecto

**Fase actual: especificación y diseño (completa)**

Las especificaciones de producto, los artefactos de diseño de UX y los documentos de arquitectura están terminados. El proyecto está listo para pasar a implementación.

## Orden de lectura

Si es tu primera vez con el proyecto, lee las especificaciones en este orden:

1. **[product.md](spec/product.md)** — Empieza aquí. Descripción general del producto, usuarios objetivo, conjunto de funcionalidades centrales.
2. **[mvp.md](spec/mvp.md)** — Plan de producto del MVP: el fideicomiso de datos de la coalición, y el piloto diseñado para probar el supuesto más riesgoso del proyecto.
3. **[users.md](spec/users.md)** — Perfiles de usuario, roles, modelo de permisos.
4. **[workflows.md](spec/workflows.md)** — 12 flujos de trabajo centrales: trabajo de campo, inscripción de votantes, recaudación de fondos, eventos, comunicaciones y más.
5. **[geography.md](spec/geography.md)** — Países objetivo, estrategia de localización, secuencia de despliegue.
6. **[security.md](spec/security.md)** — Modelo de amenazas, seguridad en 5 niveles, arquitectura de cifrado, autenticación.
7. **[compliance.md](spec/compliance.md)** — Ley electoral, protección de datos y financiamiento de campañas en los 5 países.
8. **[fundraising.md](spec/fundraising.md)** — Procesamiento de pagos, tipos de donación, recaudación en alianza, experiencia del donante.
9. **[integrations.md](spec/integrations.md)** — Sistemas externos: GIS y mapas, SMS, WhatsApp, telefonía, observabilidad.
10. **[support.md](spec/support.md)** — Superficie de soporte a las organizaciones, asistentes de puesta en marcha, base de conocimiento, modelo de acompañamiento.
11. **[gotv.md](spec/gotv.md)** — GOTV (Get Out The Vote — movilización del voto) y operaciones del día de la elección.
12. **[messaging.md](spec/messaging.md)** — Comunicaciones internas, notificaciones, cifrado de extremo a extremo.
13. **[press.md](spec/press.md)** — Prensa, medios, redes sociales, perfiles públicos, respaldos.
14. **[comms-intelligence.md](spec/comms-intelligence.md)** — Hoja de ruta post-MVP: inteligencia de medios, verificación de datos, mapa de medios, evaluación de candidaturas e investigación de oposición, ordenadas por iteraciones.

## Principios de diseño

- **Con prioridad sin conexión** — todo funciona sin conectividad y sincroniza cuando la hay
- **Soberanía primero** — cada organización es dueña de sus datos, con cifrado BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) por defecto
- **Multilingüe desde el día uno** — soporte RTL, traducción asistida por IA con revisión humana
- **La seguridad es una funcionalidad** — modelo de amenazas de 5 niveles, mensajería cifrada de extremo a extremo, autenticación con passkeys
- **El cumplimiento va incorporado** — las reglas de financiamiento de campañas, la protección de datos y el consentimiento son barandas, no agregados de última hora
