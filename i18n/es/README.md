# GreenGrass

Una plataforma para manejar elecciones políticas de base en el Sur Global.

GreenGrass reúne en un solo lugar un gestor de relaciones con constituyentes (CRM), una base de datos de votantes, herramientas de recaudación de fondos, una suite de comunicaciones y analítica de datos. Está pensada para contextos de recursos limitados, conectividad intermitente, poblaciones multilingües y estructuras de organización descentralizadas.

## Qué está en español y qué no

En español está casi todo: las 14 especificaciones de producto, la arquitectura del sistema, los 21 ADR más el registro de decisiones de UX y los 15 documentos de diseño de UX que no son wireframes. Cincuenta y dos documentos.

Falta una cosa, y es grande: los 24 documentos de wireframes —240 pantallas, más de la mitad de todo lo que hay escrito en este proyecto— siguen solo en inglés, igual que el diario. Si sigues un enlace a un wireframe desde una página en español, vas a terminar en inglés. No está roto: es lo que todavía no se ha traducido. El botón **EN**, arriba a la derecha, te lleva a la documentación completa en cualquier momento.

## Mercados objetivo

Puerto Rico (alfa), Brasil, Tailandia, India y Líbano — cada uno con su propio sistema electoral, sus idiomas, sus leyes de protección de datos y sus límites de infraestructura.

## Estado del proyecto

**Fase actual: especificación y diseño (completa)**

Las especificaciones de producto, los artefactos de diseño de UX y los documentos de arquitectura están terminados. El proyecto está listo para pasar a implementación.

## Orden de lectura

### Empieza por el producto

1. **[product.md](spec/product.md)** — Empieza aquí. Descripción general del producto, usuarios objetivo, conjunto de funcionalidades centrales.
2. **[mvp.md](spec/mvp.md)** — Plan de producto del MVP: el fideicomiso de datos de la coalición, y el piloto diseñado para probar el supuesto más riesgoso del proyecto.
3. **[users.md](spec/users.md)** — Arquetipos de usuario, roles, modelo de permisos.
4. **[workflows.md](spec/workflows.md)** — 12 flujos de trabajo centrales: trabajo de campo, inscripción de votantes, recaudación de fondos, eventos, comunicaciones y más.
5. **[geography.md](spec/geography.md)** — Países objetivo, estrategia de localización, secuencia de despliegue.
6. **[security.md](spec/security.md)** — Modelo de amenazas, seguridad en 5 niveles, arquitectura de cifrado, autenticación.
7. **[compliance.md](spec/compliance.md)** — Ley electoral, protección de datos y financiamiento de campañas en los 5 países.
8. **[fundraising.md](spec/fundraising.md)** — Procesamiento de pagos, tipos de donación, recaudación en alianza, experiencia del donante.
9. **[integrations.md](spec/integrations.md)** — Sistemas externos: GIS y mapas, SMS, WhatsApp, telefonía, observabilidad.
10. **[support.md](spec/support.md)** — Superficie de soporte a las organizaciones, asistentes de puesta en marcha, base de conocimiento, modelo de acompañamiento.
11. **[gotv.md](spec/gotv.md)** — GOTV (Get Out The Vote — movilización del voto) y operaciones del día de elecciones.
12. **[messaging.md](spec/messaging.md)** — Comunicaciones internas, notificaciones, cifrado de extremo a extremo.
13. **[press.md](spec/press.md)** — Prensa, medios, redes sociales, perfiles públicos, respaldos.
14. **[comms-intelligence.md](spec/comms-intelligence.md)** — Hoja de ruta post-MVP: inteligencia de medios, verificación de datos, mapa de medios, evaluación de candidaturas e investigación de oposición, ordenadas por iteraciones.

### Después, cómo está construida

15. **[system.md](design/architecture/system.md)** — La arquitectura del sistema completa: topología, modelo de datos, cifrado, sincronización, conservación de datos, stack tecnológico.
16. **[00-overview.md](design/ux/00-overview.md)** — Puerta de entrada al diseño de UX: orden de lectura, glosario y las convenciones que sigue el resto.

### Y por qué está construida así

Los 21 ADR registran cada decisión de arquitectura, con su contexto, sus alternativas descartadas y lo que cuesta cada una.

- **[ADR-001](decisions/001-platform-architecture.md)** — Arquitectura y despliegue de la plataforma
- **[ADR-002](decisions/002-security-threat-model.md)** — Seguridad y modelo de amenazas
- **[ADR-003](decisions/003-identity-access-organization.md)** — Identidad, acceso y organización
- **[ADR-004](decisions/004-data-model-integrity.md)** — Modelo de datos e integridad
- **[ADR-005](decisions/005-offline-first-sync.md)** — Prioridad sin conexión y sincronización
- **[ADR-006](decisions/006-field-operations-gotv.md)** — Operaciones de campo y GOTV
- **[ADR-007](decisions/007-fundraising-payments.md)** — Recaudación de fondos y pagos
- **[ADR-008](decisions/008-communications-messaging.md)** — Comunicaciones y mensajería
- **[ADR-009](decisions/009-compliance-legal.md)** — Cumplimiento y marco legal
- **[ADR-010](decisions/010-internationalization-localization.md)** — Internacionalización y localización
- **[ADR-011](decisions/011-design-system-ux.md)** — Sistema de diseño y fundamentos de UX
- **[ADR-012](decisions/012-external-integrations.md)** — Integraciones externas
- **[ADR-013](decisions/013-analytics-ai.md)** — Analítica e IA
- **[ADR-014](decisions/014-volunteer-onboarding.md)** — Voluntariado e incorporación
- **[ADR-015](decisions/015-product-scope.md)** — Límites del alcance del producto
- **[ADR-016](decisions/016-cross-cutting-resolutions.md)** — Resoluciones transversales: las 89 preguntas abiertas de la fase de wireframes, resueltas
- **[ADR-017](decisions/017-sharing-contract-trust-model.md)** — El contrato de intercambio como primitiva universal de confianza
- **[ADR-018](decisions/018-ai-agent-posture.md)** — Postura ante los agentes de IA (propuesta)
- **[ADR-019](decisions/019-central-services-and-metered-billing.md)** — Servicios centrales y facturación medida
- **[ADR-020](decisions/020-central-service-line-up-and-builders.md)** — Los cuatro servicios centrales y los constructores
- **[ADR-021](decisions/021-content-approval-pipeline.md)** — Flujo de aprobación de contenido
- **[ux-decisions.md](decisions/ux-decisions.md)** — Decisiones de UX de la fase de wireframes

### El diseño en detalle

**Arquitectura de la información** — qué pantallas existen, cómo se llega a ellas y qué ve cada quien.

- **[screen-inventory.md](design/ux/01-information-architecture/screen-inventory.md)** — Las 240 pantallas, con su ID, quién accede y si funcionan sin conexión
- **[navigation-model.md](design/ux/01-information-architecture/navigation-model.md)** — Modelo de navegación
- **[persona-views.md](design/ux/01-information-architecture/persona-views.md)** — Vistas por arquetipo
- **[url-structure.md](design/ux/01-information-architecture/url-structure.md)** — Estructura de URL

**Patrones globales** — lo que se comporta igual en toda la plataforma.

- **[pattern-catalog.md](design/ux/02-global-patterns/pattern-catalog.md)** — Los 20 patrones de interfaz que se repiten
- **[offline-sync-patterns.md](design/ux/02-global-patterns/offline-sync-patterns.md)** — Patrones sin conexión y de sincronización
- **[notification-patterns.md](design/ux/02-global-patterns/notification-patterns.md)** — Patrones de notificaciones
- **[search-patterns.md](design/ux/02-global-patterns/search-patterns.md)** — Patrones de búsqueda
- **[security-ux-patterns.md](design/ux/02-global-patterns/security-ux-patterns.md)** — Patrones de UX de seguridad
- **[settings-help-patterns.md](design/ux/02-global-patterns/settings-help-patterns.md)** — Patrones de ajustes y ayuda

**Sistema de diseño** — de qué está hecha la interfaz.

- **[foundations.md](design/ux/03-design-system/foundations.md)** — Fundamentos: tokens, color, tipografía, cuadrícula, movimiento
- **[component-inventory.md](design/ux/03-design-system/component-inventory.md)** — Inventario de componentes
- **[theming-strategy.md](design/ux/03-design-system/theming-strategy.md)** — Estrategia de temas: identidad visual por organización, RTL, modo oscuro
- **[responsive-strategy.md](design/ux/03-design-system/responsive-strategy.md)** — Estrategia de diseño adaptable

## Principios de diseño

- **Con prioridad sin conexión** — todo funciona sin conectividad y sincroniza cuando la hay
- **Soberanía primero** — cada organización es dueña de sus datos, con cifrado BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) por defecto
- **Multilingüe desde el día uno** — soporte RTL, traducción asistida por IA con revisión humana
- **La seguridad es una funcionalidad** — modelo de amenazas de 5 niveles, mensajería cifrada de extremo a extremo, autenticación con passkeys
- **El cumplimiento va incorporado** — las reglas de financiamiento de campañas, la protección de datos y el consentimiento son barandas, no agregados de última hora
