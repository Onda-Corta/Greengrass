# Estructura de URL

## Propósito

Este documento mapea el inventario de pantallas (screen-inventory.md) a las rutas de SvelteKit. Define la jerarquía completa de URL de la plataforma e identifica qué rutas son públicas, autenticadas, capaces de funcionar sin conexión o exclusivas de móvil.

SvelteKit usa enrutamiento basado en archivos en `src/routes/`. Los grupos de rutas `(group)` afectan al anidamiento de la maquetación, pero no aparecen en la URL. Los segmentos dinámicos usan `[param]`. Esta estructura es el puente entre la arquitectura de la información y la implementación.

## Arquitectura de rutas

La aplicación usa seis layout groups de SvelteKit (grupos de rutas que comparten un marco, sin afectar la URL), cada uno con un marco de navegación distinto:

| Grupo | Marco | Propósito |
|-------|-------|---------|
| `(public)` | Elementos permanentes públicos mínimos | Páginas públicas — no requieren autenticación |
| `(auth)` | Maquetación propia de la autenticación | Flujos de inicio de sesión, recuperación y registro |
| `(app)` | Marco de navegación completo (barra lateral + barra superior) | Todas las pantallas autenticadas del personal, los voluntarios y el candidato |
| `(field-mode)` | Marco del modo de campo (reducido, a pantalla completa) | Trabajo de campo, jornadas de llamadas, inscripción de votantes y GOTV (Get Out The Vote — movilización del voto) durante un turno activo |
| `(portal)` | Marco del portal de simpatizantes | Autoservicio del simpatizante (navegación mínima) |
| `(wizard)` | Marco del asistente (pasos de progreso, sin navegación lateral) | Asistentes de puesta en marcha |

Cada grupo envuelve un `+layout.svelte` que define el marco de navegación de todas las rutas que contiene.

## Mapa de rutas

### Páginas públicas — `(public)`

No requieren autenticación. Llevan la identidad visual de la organización, pero son de acceso público.

| URL | ID de pantalla | Pantalla | Móvil |
|-----|-----------|--------|--------|
| `/p/[slug]` | PUB-001 | Página de perfil del candidato | Principal |
| `/o/[slug]` | PUB-002 | Página de perfil de la organización | Principal |
| `/donate/[formId]` | PUB-003, FUND-005 | Formulario de donación (alojado) | Principal |
| `/events/[eventId]` | PUB-004, EVT-007 | Página del evento | Principal |
| `/action/[actionId]` | PUB-005, ACT-005 | Página de acción (carta/correo) | Principal |
| `/petition/[petitionId]` | PUB-006, ACT-006 | Página de petición | Principal |
| `/volunteer` | PUB-007 | Página de inscripción de voluntarios | Principal |
| `/media-kit` | PUB-008 | Página del kit de prensa | Principal |
| `/events/[eventId]/rsvp` | EVT-006 | Formulario de confirmación de asistencia | Principal |

**Notas:**
- `/p/` y `/o/` son prefijos cortos para los perfiles públicos: mantienen las URL limpias para compartirlas en redes sociales, materiales impresos y SMS.
- `/donate/[formId]` es la ruta pública más sensible a la latencia: tiene que cargar rápido en dispositivos de gama baja y con conexiones lentas. Se prerrenderiza siempre que se pueda.
- Las páginas públicas de eventos se pueden compartir por URL sin necesidad de iniciar sesión. El formulario de confirmación de asistencia en `/events/[eventId]/rsvp` recoge la información sin requerir autenticación.

---

### Autenticación — `(auth)`

Pantallas del flujo de autenticación. Usan una maquetación mínima y enfocada: sin barra lateral, sin navegación de la aplicación.

| URL | ID de pantalla | Pantalla | Móvil |
|-----|-----------|--------|--------|
| `/login` | AUTH-001 | Inicio de sesión (passkey) | Principal |
| `/login/fallback` | AUTH-002 | Inicio de sesión alternativo (enlace mágico / OTP por SMS) | Principal |
| `/recover` | AUTH-003 | Recuperación de cuenta (contacto de confianza) | Principal |
| `/register` | AUTH-004 | Registro de passkey | Principal |
| `/register/trusted-contacts` | AUTH-005 | Configuración del contacto de confianza | Sí |
| `/authorize-device` | AUTH-006 | Autorización de dispositivo | Sí |
| `/session-expired` | AUTH-007 | Sesión expirada / volver a autenticarse | Principal |

**Notas:**
- `/login` detecta si hay passkey disponible y selecciona automáticamente el flujo adecuado. `/login/fallback` es para dispositivos sin soporte de passkey, o para cuando la persona lo pide explícitamente.
- Todas las rutas de autenticación funcionan en móvil: autenticarse es la primera experiencia de la mayoría de los usuarios.
- `/register` es el flujo de alta del passkey posterior a aceptar la invitación inicial.

---

### Aplicación autenticada — `(app)`

La aplicación principal. Usa el marco de navegación completo (barra superior + barra lateral en escritorio, pestañas inferiores en móvil). Todas las rutas requieren autenticación y el rol las bloquea: la plantilla de rol determina a qué rutas puede acceder cada persona. Entrar a una ruta fuera del propio rol devuelve un 404 (no un 403: las funcionalidades restringidas son invisibles, no prohibidas).

#### Paneles

| URL | ID de pantalla | Pantalla | Arquetipos | Sin conexión |
|-----|-----------|--------|----------|---------|
| `/dashboard` | DASH-001 | Panel general de la campaña | OA, C | No |
| `/dashboard/field` | DASH-002 | Panel de operaciones de campo | OA, FiD | No |
| `/dashboard/fundraising` | DASH-003 | Panel de recaudación de fondos | OA, FD | No |
| `/dashboard/communications` | DASH-004 | Panel de comunicaciones | OA, CD | No |
| `/dashboard/volunteers` | DASH-005 | Panel de voluntarios | OA, VC | No |
| `/dashboard/data` | DASH-006 | Panel de calidad de datos | OA, DM | No |
| `/dashboard/compliance` | DASH-007 | Panel de cumplimiento | OA, FD | No |
| `/dashboard/war-room` | DASH-008 | Panel del centro de mando de GOTV | OA, FiD | No |
| `/dashboard/team` | DASH-009 | Panel del líder de equipo | TL | No |
| `/dashboard/candidate` | DASH-010 | Panel del candidato | C | No |
| `/dashboard/alliance` | DASH-011 | Panel de la alianza | OA | No |

**Enrutamiento de la pantalla de inicio:** cada arquetipo tiene un panel por defecto. Cuando alguien entra a `/dashboard` (o inicia sesión), el servidor lo redirige al panel que le corresponde por su rol:
- Administrador de la organización → `/dashboard`
- Director de comunicaciones → `/dashboard/communications`
- Director de finanzas → `/dashboard/fundraising`
- Director de campo → `/dashboard/field`
- Coordinador de voluntarios → `/dashboard/volunteers`
- Gestor de datos → `/dashboard/data`
- Candidato → `/dashboard/candidate`
- Líder de equipo → `/dashboard/team`
- Voluntario → `/shifts` (no es un panel: va directo a los turnos)
- Simpatizante → redirigido al `(portal)`, en `/portal`

#### Personas / CRM

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/people` | CRM-001 | Lista de contactos | No |
| `/people/[contactId]` | CRM-002 | Detalle del contacto | Parcial |
| `/people/[contactId]/edit` | CRM-003 | Crear/editar contacto | No |
| `/people/new` | CRM-003 | Crear contacto (nueva) | No |
| `/people/segments` | CRM-005 | Lista de segmentos | No |
| `/people/segments/new` | CRM-004 | Constructor de segmentos (nueva) | No |
| `/people/segments/[segmentId]` | CRM-004 | Constructor de segmentos (edición) | No |
| `/people/dedup` | CRM-006 | Cola de revisión de deduplicación | No |
| `/people/dedup/[pairId]` | CRM-007 | Comparación lado a lado de la deduplicación | No |
| `/people/import` | CRM-008 | Asistente de importación de datos — Carga de archivo | No |
| `/people/import/[importId]/map` | CRM-009 | Asistente de importación de datos — Mapeo de columnas | No |
| `/people/import/[importId]/preview` | CRM-010 | Asistente de importación de datos — Vista previa de la deduplicación | No |
| `/people/import/[importId]/confirm` | CRM-011 | Asistente de importación de datos — Confirmación | No |
| `/people/import/history` | CRM-012 | Historial de importaciones de datos | No |
| `/people/export` | CRM-013 | Exportación de datos | No |
| `/people/data-quality` | CRM-014 | Informe de calidad de datos | No |
| `/people/tags` | CRM-015 | Gestión de etiquetas | No |

**Notas:**
- El asistente de importación de datos (de CRM-008 a CRM-011) usa una progresión de URL de varios pasos. Cada paso es una URL distinta, para que el estado del asistente se pueda guardar en marcadores y compartir.
- `/people/[contactId]` carga datos parciales sin conexión (contactos en caché), pero no puede guardar ediciones sin conexión.

#### Operaciones de campo

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/field/canvassing` | CANV-001 | Lista de campañas de trabajo de campo | No |
| `/field/canvassing/new` | CANV-002 | Crear campaña de trabajo de campo | No |
| `/field/canvassing/[campaignId]` | CANV-002 | Editar campaña de trabajo de campo | No |
| `/field/canvassing/[campaignId]/results` | CANV-013 | Revisión de resultados del trabajo de campo | No |
| `/field/canvassing/[campaignId]/progress` | CANV-014 | Mapa de avance del trabajo de campo | No |
| `/field/scripts/new` | CANV-003 | Constructor de guiones (trabajo de campo, nueva) | No |
| `/field/scripts/[scriptId]` | CANV-003 | Constructor de guiones (trabajo de campo, edición) | No |
| `/field/turfs` | CANV-004 | Mapa de gestión de territorios | No |
| `/field/turfs/auto-generate` | CANV-005 | Generación automática de territorios | No |
| `/field/walk-lists` | CANV-006 | Gestión de listas de recorrido | No |
| `/field/phone-banking` | PHONE-001 | Lista de campañas de jornada de llamadas | No |
| `/field/phone-banking/new` | PHONE-002 | Crear campaña de jornada de llamadas | No |
| `/field/phone-banking/[campaignId]` | PHONE-002 | Editar campaña de jornada de llamadas | No |
| `/field/phone-banking/[campaignId]/script` | PHONE-003 | Constructor de guiones de jornada de llamadas | No |
| `/field/phone-banking/[campaignId]/progress` | PHONE-007 | Panel de avance de la jornada de llamadas | No |
| `/field/voter-registration` | VREG-001 | Lista de jornadas de inscripción de votantes | No |
| `/field/voter-registration/new` | VREG-002 | Crear jornada de inscripción de votantes | No |
| `/field/voter-registration/[driveId]` | VREG-002 | Editar jornada de inscripción de votantes | No |
| `/field/voter-registration/[driveId]/templates` | VREG-003 | Selector de plantilla de jurisdicción | No |
| `/field/voter-registration/[driveId]/results` | VREG-006 | Revisión de resultados de inscripción de votantes | No |

**Notas:**
- Las rutas `/field/scripts` se comparten entre el trabajo de campo y las jornadas de llamadas. Los guiones se crean aquí y las campañas los referencian.
- Todas las pantallas de gestión de campo son preferentemente de escritorio. El trabajo de campo real (tocar puertas, llamar, inscribir) ocurre en el modo de campo, que es un layout group aparte.

#### Recaudación de fondos

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/fundraising/donations` | FUND-001 | Lista de donaciones | No |
| `/fundraising/donations/[donationId]` | FUND-002 | Detalle de la donación | No |
| `/fundraising/forms` | FUND-003 | Constructor de formularios de donación (lista) | No |
| `/fundraising/forms/new` | FUND-003 | Constructor de formularios de donación (nueva) | No |
| `/fundraising/forms/[formId]` | FUND-003 | Constructor de formularios de donación (edición) | No |
| `/fundraising/forms/[formId]/preview` | FUND-004 | Vista previa del formulario de donación | No |
| `/fundraising/forms/[formId]/embed` | FUND-006 | Configuración de incrustación | No |
| `/fundraising/campaigns` | FUND-018 | Lista de campañas de recaudación | No |
| `/fundraising/campaigns/new` | FUND-019 | Crear campaña de recaudación | No |
| `/fundraising/campaigns/[campaignId]` | FUND-019 | Editar campaña de recaudación | No |
| `/fundraising/recurring` | FUND-007 | Gestión de donaciones recurrentes | No |
| `/fundraising/pledges` | FUND-008 | Gestión de promesas de donación | No |
| `/fundraising/refunds` | FUND-009 | Procesamiento de reembolsos | No |
| `/fundraising/cash` | FUND-010 | Registro de donaciones en efectivo | Parcial |
| `/fundraising/cash/reconciliation` | FUND-011 | Conciliación de efectivo | No |
| `/fundraising/compliance` | FUND-012 | Revisión de marcas de cumplimiento | No |
| `/fundraising/ab-tests` | FUND-013 | Configuración de la prueba A/B (lista) | No |
| `/fundraising/ab-tests/new` | FUND-013 | Configuración de la prueba A/B (nueva) | No |
| `/fundraising/ab-tests/[testId]` | FUND-014 | Resultados de la prueba A/B | No |
| `/fundraising/alliance-splits` | FUND-015 | Configuración del reparto de la alianza | No |
| `/fundraising/alliance-reports` | FUND-016 | Informe de recaudación de la alianza | No |
| `/fundraising/processors` | FUND-017 | Configuración del procesador de pagos | No |
| `/fundraising/statements` | FUND-020 | Generador de estados de cuenta anuales | No |

#### Comunicaciones

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/communications/email` | COMM-001 | Lista de campañas de correo | No |
| `/communications/email/new` | COMM-002 | Constructor de campañas de correo (nueva) | No |
| `/communications/email/[campaignId]` | COMM-002 | Constructor de campañas de correo (edición) | No |
| `/communications/email/templates` | COMM-004 | Biblioteca de plantillas de correo | No |
| `/communications/email/templates/new` | COMM-003 | Constructor de plantillas de correo (nueva) | No |
| `/communications/email/templates/[templateId]` | COMM-003 | Constructor de plantillas de correo (edición) | No |
| `/communications/sms` | COMM-005 | Redactor de SMS/WhatsApp | No |
| `/communications/analytics` | COMM-006 | Analítica de comunicaciones | No |
| `/communications/consent` | COMM-007 | Gestión del consentimiento | No |
| `/communications/preferences` | COMM-008 | Preferencias de comunicación (personal) | No |
| `/communications/unsubscribes` | COMM-009 | Gestión de bajas | No |

#### Redes sociales

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/social` | SOCIAL-001 | Panel de redes sociales | No |
| `/social/compose` | SOCIAL-002 | Redactor de publicaciones (multiplataforma) | No |
| `/social/calendar` | SOCIAL-003 | Calendario / programación de publicaciones | No |
| `/social/analytics` | SOCIAL-004 | Analítica de publicaciones | No |
| `/social/accounts` | SOCIAL-005 | Conexión de cuentas de redes sociales | No |

**Notas:**
- Las redes sociales son una ruta de primer nivel (`/social`) en vez de ir anidadas bajo `/communications`, porque son un área funcional distinta en la barra lateral (la sección de Prensa del Director de comunicaciones).
- La vista previa por plataforma (SOCIAL-006) es un componente dentro del redactor de publicaciones, no una ruta aparte.

#### Eventos

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/events` | EVT-001 | Lista de eventos | No |
| `/events/new` | EVT-002 | Crear evento | No |
| `/events/[eventId]/manage` | EVT-002 | Editar evento | No |
| `/events/[eventId]` | EVT-003 | Detalle del evento | No |
| `/events/[eventId]/rsvps` | EVT-004 | Gestión de confirmaciones de asistencia | No |
| `/events/[eventId]/check-in` | EVT-005 | Herramienta de registro de entrada al evento | Sí |
| `/events/[eventId]/metrics` | EVT-008 | Métricas del evento | No |
| `/events/[eventId]/virtual` | EVT-009 | Configuración de evento virtual | No |
| `/events/[eventId]/survey` | EVT-010 | Constructor de encuestas posteriores al evento | No |

**Notas:**
- `/events/[eventId]` es la vista de detalle de solo lectura; `/events/[eventId]/manage` es el formulario de edición. Así se evita sobrecargar la misma URL con el estado de ver/editar.
- `/events/[eventId]/check-in` es una de las pocas rutas autenticadas que funciona por completo sin conexión. Descarga los datos de las personas inscritas al cargar y funciona desconectada.

#### Activismo

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/activism` | ACT-001 | Lista de campañas de activismo | No |
| `/activism/letter/new` | ACT-002 | Configuración de acción de cartas/correos (nueva) | No |
| `/activism/letter/[actionId]` | ACT-002 | Configuración de acción de cartas/correos (edición) | No |
| `/activism/petition/new` | ACT-003 | Configuración de petición (nueva) | No |
| `/activism/petition/[petitionId]` | ACT-003 | Configuración de petición (edición) | No |
| `/activism/public-comment/new` | ACT-004 | Configuración de campaña de comentarios públicos (nueva) | No |
| `/activism/public-comment/[campaignId]` | ACT-004 | Configuración de campaña de comentarios públicos (edición) | No |
| `/activism/[campaignId]/analytics` | ACT-008 | Analítica de campañas de activismo | No |
| `/activism/[campaignId]/delivery` | ACT-009 | Documentación del acto de entrega | No |

**Notas:**
- Las páginas de acción de cara al público (`/action/[actionId]`, `/petition/[petitionId]`) están en el grupo `(public)`. Estas rutas del personal son para crear y gestionar las campañas.
- La vista previa de mensajes generados por IA (ACT-007) es un componente dentro de la página pública de acción, no una ruta del personal aparte.

#### Prensa y medios

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/press/contacts` | PRESS-001 | Lista de contactos de medios | No |
| `/press/contacts/[contactId]` | PRESS-002 | Detalle del contacto de medios | No |
| `/press/lists` | PRESS-003 | Gestión de listas de medios | No |
| `/press/releases` | PRESS-004 | Constructor de comunicados de prensa (lista) | No |
| `/press/releases/new` | PRESS-004 | Constructor de comunicados de prensa (nueva) | No |
| `/press/releases/[releaseId]` | PRESS-004 | Constructor de comunicados de prensa (edición) | No |
| `/press/releases/[releaseId]/preview` | PRESS-005 | Vista previa del comunicado de prensa | No |
| `/press/releases/[releaseId]/distribute` | PRESS-006 | Distribución del comunicado de prensa | No |
| `/press/advisories/new` | PRESS-007 | Constructor de avisos a medios (nueva) | No |
| `/press/advisories/[advisoryId]` | PRESS-007 | Constructor de avisos a medios (edición) | No |
| `/press/statements/new` | PRESS-008 | Constructor de declaraciones (nueva) | No |
| `/press/statements/[statementId]` | PRESS-008 | Constructor de declaraciones (edición) | No |
| `/press/media-kit` | PRESS-009 | Gestión del kit de prensa | No |
| `/press/coverage` | PRESS-010 | Registro de cobertura | No |
| `/press/coverage/analytics` | PRESS-011 | Analítica de cobertura | No |
| `/press/endorsements` | PRESS-012 | Flujo de respaldos | No |
| `/press/endorsements/[endorsementId]` | PRESS-013 | Detalle del respaldo | No |
| `/press/talking-points` | PRESS-014 | Biblioteca de puntos de mensaje | No |
| `/press/interviews` | PRESS-015 | Agenda de entrevistas | No |
| `/press/spokespersons` | PRESS-016 | Configuración de voceros | No |
| `/press/content` | CONTENT-001 | Panel de contenido | No |
| `/press/content/[itemId]` | CONTENT-002 | Revisión de contenido | No |
| `/press/content/approvals` | CONTENT-003 | Cola de aprobación | No |
| `/press/content/approvals/[itemId]` | CONTENT-004 | Aprobación | No |

#### GOTV y día de elecciones

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/gotv/universe` | GOTV-001 | Constructor del universo GOTV | No |
| `/gotv/early-voting` | GOTV-002 | Carga de datos de voto adelantado | No |
| `/gotv/staging` | GOTV-003 | Configuración de los puntos de concentración de voluntarios | No |
| `/gotv/staging/check-in` | GOTV-023 | Registro de entrada en el punto de concentración | No |
| `/gotv/turfs` | GOTV-004 | Corte de territorios para GOTV | No |
| `/gotv/comms-plan` | GOTV-005 | Plan de comunicaciones del día de elecciones | No |
| `/gotv/poll-watchers` | GOTV-006 | Registro de observadores electorales | No |
| `/gotv/poll-watchers/credentials` | GOTV-007 | Seguimiento de credenciales de observadores electorales | No |
| `/gotv/poll-watchers/issues` | GOTV-016 | Cola de problemas de observadores electorales | No |
| `/gotv/rides` | GOTV-012 | Coordinación de transporte — Vista del despachador | No |
| `/gotv/turnout` | GOTV-017 | Panel de participación — Vista de mapa | No |
| `/gotv/turnout/segments` | GOTV-018 | Panel de participación — Vista por segmentos | No |
| `/gotv/reallocation` | GOTV-019 | Sugerencias de reasignación | No |
| `/gotv/results/entry` | GOTV-020 | Ingreso de resultados de la noche electoral | No |
| `/gotv/results` | GOTV-021 | Panel de resultados de la noche electoral | No |
| `/gotv/analysis` | GOTV-022 | Análisis posterior a la elección | No |

**Pantallas de GOTV en modo de campo:** GOTV-008, GOTV-009 y GOTV-010 (ficha de puerta, lista de recorrido y llamadas de seguimiento de GOTV) están en el grupo `(field-mode)`, no aquí.

**Pantallas de GOTV de cara al voluntario:** GOTV-011 (solicitud de transporte), GOTV-014 (registro de entrada del observador electoral) y GOTV-015 (reporte de problemas) están bajo `/shifts/...` — ver las pantallas del voluntario más abajo.

#### Mensajería

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/messages` | MSG-001 | Lista de mensajes (bandeja de entrada) | Parcial |
| `/messages/[conversationId]` | MSG-002, MSG-003 | Vista de conversación (mensaje directo o grupo) | Parcial |
| `/messages/[conversationId]/thread/[threadId]` | MSG-004 | Vista de hilo | Parcial |
| `/messages/new-group` | MSG-005 | Crear grupo | No |
| `/messages/[conversationId]/settings` | MSG-005 | Editar grupo | No |
| `/messages/broadcast` | MSG-006 | Redactor de difusiones | No |
| `/messages/war-room` | MSG-007 | Canal del centro de mando | No |
| `/messages/alliance` | MSG-014 | Canal de la alianza | No |

**Hilos contextuales:** de MSG-008 a MSG-011 (hilos de evento, de turno, de problema y de donación marcada) se abren desde su contexto padre (por ejemplo, la página de detalle de un evento muestra una pestaña «Discusión» que renderiza el hilo contextual en línea). Comparten el componente de vista de conversación, pero se llega a ellos desde la entidad padre, no desde la bandeja de entrada de mensajes.

**Vistas propias del candidato:** MSG-012 (vista de informes) y MSG-013 (cola de aprobaciones) reutilizan la maquetación de mensajes, pero con vistas filtradas:
| `/messages?view=briefings` | MSG-012 | Vista de informes del candidato | Parcial |
| `/approvals` | MSG-013 | Cola de aprobaciones del candidato | No |

#### Voluntarios (pantallas del coordinador)

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/volunteers/roster` | — | Lista del equipo de voluntarios | No |
| `/volunteers/onboarding` | — | Configuración de la incorporación | No |
| `/volunteers/training` | HELP-008 | Editor de contenidos de capacitación | No |
| `/volunteers/training/modules` | HELP-004 | Lista de módulos de capacitación (vista de gestión) | No |
| `/volunteers/shifts` | — | Gestión de turnos | No |
| `/volunteers/teams` | — | Gestión de equipos | No |
| `/volunteers/certifications` | HELP-007 | Estado de certificación (vista de gestión) | No |

#### Pantallas de autoservicio del voluntario

Son las pantallas que voluntarios y líderes de equipo ven para su propio trabajo.

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/shifts` | — | Mis turnos (pantalla de inicio del voluntario) | Parcial |
| `/shifts/[shiftId]` | — | Detalle del turno | Parcial |
| `/tasks` | — | Mis tareas | Parcial |
| `/team` | — | Mi equipo (solo líderes de equipo) | No |
| `/team/roster` | — | Lista del equipo | No |
| `/team/progress` | — | Avance del equipo | No |
| `/training` | HELP-004 | Lista de módulos de capacitación | Parcial |
| `/training/[moduleId]` | HELP-005 | Contenido del módulo de capacitación | Parcial |
| `/training/[moduleId]/quiz` | HELP-006 | Cuestionario de capacitación | Parcial |
| `/training/certifications` | HELP-007 | Estado de certificación | No |

**Notas:**
- `/shifts` es el inicio del voluntario. Cuando un voluntario entra a la raíz (`/`), se le redirige aquí.
- La acción «Iniciar turno» desde `/shifts/[shiftId]` lleva a la persona al grupo `(field-mode)`.

#### Pantallas de GOTV para voluntarios

Pantallas que voluntarios y líderes de equipo usan durante las operaciones de GOTV, fuera del modo de campo.

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/gotv/ride-request` | GOTV-011 | Formulario de solicitud de transporte | Parcial |
| `/gotv/ride-request/drive` | GOTV-013 | Coordinación de transporte — Vista del conductor | No |
| `/gotv/poll-watch/check-in` | GOTV-014 | Registro de entrada del observador electoral | No |
| `/gotv/poll-watch/report` | GOTV-015 | Formulario de reporte de problemas del observador electoral | Parcial |

#### Alianza

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/alliance` | ALLY-001 | Panel de la alianza | No |
| `/alliance/members` | ALLY-002 | Lista de miembros de la alianza | No |
| `/alliance/join` | ALLY-003 | Formulario de solicitud de afiliación | No |
| `/alliance/requests` | ALLY-004 | Cola de solicitudes de afiliación | No |
| `/alliance/sharing` | ALLY-005 | Configuración del intercambio | No |
| `/alliance/campaigns` | ALLY-006 | Configuración de campaña conjunta | No |
| `/alliance/analytics` | ALLY-007 | Analítica compartida | No |
| `/alliance/gotv` | ALLY-008 | Coordinación de GOTV en la alianza | No |

#### Ajustes

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/settings` | — | Centro de ajustes | No |
| `/settings/org` | SET-001 | Perfil e identidad visual de la organización | No |
| `/settings/roles` | SET-002 | Editor de plantillas de rol (lista) | No |
| `/settings/roles/[roleId]` | SET-002 | Editor de plantillas de rol (detalle) | No |
| `/settings/roles/[roleId]/permissions` | SET-003 | Panel de ajuste de permisos | No |
| `/settings/staff` | SET-004 | Lista de gestión del personal | No |
| `/settings/staff/invite` | SET-005 | Flujo de invitación del personal | No |
| `/settings/geography` | SET-006 | Configuración del ámbito geográfico | No |
| `/settings/campaign-period` | SET-007 | Configuración del período de campaña | No |
| `/settings/compliance` | SET-008 | Configuración de cumplimiento | No |
| `/settings/contribution-limits` | SET-009 | Configuración de límites de contribución | No |
| `/settings/disclaimers` | SET-010 | Configuración del texto del aviso legal | No |
| `/settings/data-retention` | SET-011 | Política de conservación de datos | No |
| `/settings/integrations` | SET-012 | Centro de ajustes de integraciones | No |
| `/settings/integrations/whatsapp` | SET-013 | Configuración de WhatsApp Business | No |
| `/settings/integrations/sms` | SET-014 | Configuración del proveedor de SMS | No |
| `/settings/integrations/email` | SET-015, COMM-010 | Configuración del dominio de correo | No |
| `/settings/integrations/social` | SET-016 | Conexiones de cuentas de redes sociales | No |
| `/settings/billing` | SET-017 | Facturación y suscripción | No |
| `/settings/audit-trail` | SET-018 | Visor del registro de auditoría | No |
| `/settings/security` | SET-019 | Ajustes de seguridad | No |
| `/settings/encryption` | SET-020 | Gestión de llaves de cifrado | No |
| `/settings/api-keys` | SET-021 | Gestión de llaves de API | No |
| `/settings/webhooks` | SET-022 | Configuración de webhooks | No |

#### Ayuda y soporte

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/help` | HELP-001 | Navegador de la base de conocimiento | No |
| `/help/[articleSlug]` | HELP-002 | Artículo de la base de conocimiento | Parcial |
| `/help/chat` | HELP-003 | Chat del concierge de IA | No |

#### Perfil y preferencias de usuario

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/profile` | PROF-001 | Perfil personal | No |
| `/profile/notifications` | PROF-002 | Preferencias de notificaciones | No |
| `/profile/security` | PROF-003 | Ajustes de seguridad (personales) | No |
| `/profile/language` | PROF-004 | Preferencia de idioma | No |
| `/profile/switch-tenant` | PROF-005 | Selector de organización | No |

---

### Modo de campo — `(field-mode)`

Marco de pantalla completa exclusiva. Sin barra lateral, sin pestañas inferiores, sin navegación estándar. Solo la barra superior de campo (estado de sincronización, cronómetro del turno) y la navegación entre tareas (anterior/siguiente/terminar turno).

Todas las rutas del modo de campo requieren un turno activo. Entrar a una URL del modo de campo sin turno activo redirige a `/shifts`.

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/field-mode/canvass/[shiftId]` | CANV-007 | Modo de campo — Inicio del turno | Sí |
| `/field-mode/canvass/[shiftId]/list` | CANV-008 | Modo de campo — Vista de la lista de recorrido | Sí |
| `/field-mode/canvass/[shiftId]/map` | CANV-009 | Modo de campo — Vista de mapa | Sí |
| `/field-mode/canvass/[shiftId]/door/[voterId]` | CANV-010 | Modo de campo — Ficha de puerta | Sí |
| `/field-mode/canvass/[shiftId]/door/[voterId]/interact` | CANV-011 | Modo de campo — Formulario de interacción | Sí |
| `/field-mode/canvass/[shiftId]/debrief` | CANV-012 | Modo de campo — Fin del turno / balance | Parcial |
| `/field-mode/phone-bank/[sessionId]` | PHONE-004, PHONE-005 | Jornada de llamadas — Interfaz de llamada | No |
| `/field-mode/phone-bank/[sessionId]/result` | PHONE-006 | Jornada de llamadas — Formulario de resultado de la llamada | No |
| `/field-mode/voter-reg/[sessionId]` | VREG-004 | Formulario de inscripción de votantes | Sí |
| `/field-mode/voter-reg/[sessionId]/eligibility` | VREG-005 | Verificación de elegibilidad | Sí |
| `/field-mode/gotv/[shiftId]` | GOTV-009 | Lista de recorrido de GOTV | Sí |
| `/field-mode/gotv/[shiftId]/door/[voterId]` | GOTV-008 | Ficha de puerta de GOTV | Sí |
| `/field-mode/gotv/[shiftId]/chase/[voterId]` | GOTV-010 | Interfaz de llamadas de seguimiento | No |

**Notas:**
- Las URL del modo de campo llevan el ID del turno o de la sesión, para que una aplicación que se cierre inesperadamente pueda retomar exactamente donde se quedó.
- El modo de campo del trabajo de campo es el más complejo: admite vista de lista, vista de mapa y fichas de puerta individuales. El voluntario avanza linealmente por la lista de recorrido, pero puede alternar entre la vista de lista y la de mapa.
- El modo de campo de las jornadas de llamadas no funciona sin conexión (requiere conectividad para llamar).
- El modo de campo de GOTV es una variante simplificada del de trabajo de campo, con un guion y una ficha de puerta propios de GOTV.

---

### Portal de simpatizantes — `(portal)`

Marco de navegación mínimo para simpatizantes. Maquetación separada de la aplicación principal: sin barra lateral, sin funcionalidades del personal. Un portal personal sencillo.

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/portal` | SUP-001 | Inicio del simpatizante | No |
| `/portal/donations` | SUP-002 | Historial de donaciones | No |
| `/portal/donations/[donationId]` | SUP-003 | Vista del recibo de donación | No |
| `/portal/recurring` | SUP-004 | Gestión de donaciones recurrentes | No |
| `/portal/payment-methods` | SUP-005 | Actualización del método de pago | No |
| `/portal/profile` | SUP-006 | Perfil del simpatizante | No |
| `/portal/preferences` | SUP-007 | Preferencias de comunicación | No |
| `/portal/events` | SUP-008 | Mis eventos | No |
| `/portal/statements` | SUP-009 | Descarga del estado de cuenta anual | No |

**Notas:**
- El portal de simpatizantes usa autenticación por enlace mágico por defecto (poca fricción). Las funciones completas de la cuenta (modificar donaciones recurrentes, actualizar métodos de pago) requieren passkey o inicio de sesión por correo.
- Las rutas del portal van bajo el prefijo `/portal` para separarlas del espacio de nombres de la aplicación principal.

---

### Asistentes de puesta en marcha — `(wizard)`

El marco del asistente sustituye la barra lateral por indicadores de pasos. Los elementos permanentes globales (barra superior, sincronización, notificaciones) se mantienen.

| URL | ID de pantalla | Pantalla | Sin conexión |
|-----|-----------|--------|---------|
| `/wizard/org-setup` | WIZ-001 | Asistente de configuración de la organización | No |
| `/wizard/payment-processor` | WIZ-002 | Asistente del procesador de pagos | No |
| `/wizard/byok` | WIZ-003 | Asistente de generación de llaves BYOK | No |
| `/wizard/compliance` | WIZ-004 | Asistente de configuración de cumplimiento | No |
| `/wizard/whatsapp` | WIZ-005 | Asistente de configuración de WhatsApp Business | No |
| `/wizard/sms` | WIZ-006 | Asistente de configuración del número de SMS | No |
| `/wizard/voter-import` | WIZ-007 | Asistente de importación del padrón electoral | No |
| `/wizard/volunteer-onboarding` | WIZ-008 | Asistente de incorporación de voluntarios | No |

**Notas:**
- Cada asistente gestiona el estado de sus pasos en el componente, no en segmentos de la URL. La URL se queda en `/wizard/org-setup` durante todos los pasos: el avance se guarda en el estado del componente y se persiste en el servidor.
- `/wizard/volunteer-onboarding` es el único asistente de prioridad móvil. Todos los demás son preferentemente de escritorio.
- Los asistentes se pueden abandonar y retomar. Volver a la URL del asistente lo retoma en el último paso completado.

---

## Estructura de archivos de SvelteKit

La jerarquía de rutas se mapea al sistema de archivos de SvelteKit:

```
src/routes/
├── (public)/
│   ├── +layout.svelte              # Marco de página pública (identidad visual mínima)
│   ├── p/[slug]/+page.svelte       # Perfil del candidato
│   ├── o/[slug]/+page.svelte       # Perfil de la organización
│   ├── donate/[formId]/+page.svelte
│   ├── events/[eventId]/
│   │   ├── +page.svelte            # Página pública del evento
│   │   └── rsvp/+page.svelte       # Formulario de confirmación de asistencia
│   ├── action/[actionId]/+page.svelte
│   ├── petition/[petitionId]/+page.svelte
│   ├── volunteer/+page.svelte
│   └── media-kit/+page.svelte
│
├── (auth)/
│   ├── +layout.svelte              # Maquetación del flujo de autenticación
│   ├── login/
│   │   ├── +page.svelte            # Inicio de sesión con passkey
│   │   └── fallback/+page.svelte   # Enlace mágico / OTP por SMS
│   ├── recover/+page.svelte
│   ├── register/
│   │   ├── +page.svelte            # Alta de passkey
│   │   └── trusted-contacts/+page.svelte
│   ├── authorize-device/+page.svelte
│   └── session-expired/+page.svelte
│
├── (app)/
│   ├── +layout.svelte              # Marco de la aplicación (barra superior + barra lateral + pestañas)
│   ├── +layout.server.ts           # Guardia de autenticación, resolución del rol
│   ├── dashboard/
│   │   ├── +page.svelte            # Panel general de la campaña (+ lógica de redirección)
│   │   ├── field/+page.svelte
│   │   ├── fundraising/+page.svelte
│   │   ├── communications/+page.svelte
│   │   ├── volunteers/+page.svelte
│   │   ├── data/+page.svelte
│   │   ├── compliance/+page.svelte
│   │   ├── war-room/+page.svelte
│   │   ├── team/+page.svelte
│   │   ├── candidate/+page.svelte
│   │   └── alliance/+page.svelte
│   ├── people/
│   │   ├── +page.svelte            # Lista de contactos
│   │   ├── [contactId]/
│   │   │   ├── +page.svelte        # Detalle del contacto
│   │   │   └── edit/+page.svelte
│   │   ├── new/+page.svelte
│   │   ├── segments/...
│   │   ├── dedup/...
│   │   ├── import/...
│   │   ├── export/+page.svelte
│   │   ├── data-quality/+page.svelte
│   │   └── tags/+page.svelte
│   ├── field/...                    # Gestión de campo
│   ├── fundraising/...              # Gestión de la recaudación
│   ├── communications/...           # Correo, SMS
│   ├── social/...                   # Redes sociales
│   ├── events/...                   # Gestión de eventos
│   ├── activism/...                 # Campañas de activismo
│   ├── press/...                    # Prensa y medios
│   ├── gotv/...                     # Operaciones de GOTV
│   ├── messages/...                 # Mensajería
│   ├── volunteers/...               # Gestión de voluntarios
│   ├── shifts/...                   # Autoservicio del voluntario
│   ├── team/...                     # Líder de equipo
│   ├── training/...                 # Módulos de capacitación
│   ├── approvals/+page.svelte      # Aprobaciones del candidato
│   ├── alliance/...                 # Gestión de la alianza
│   ├── settings/...                 # Ajustes y administración
│   ├── help/...                     # Base de conocimiento y soporte
│   └── profile/...                  # Perfil y preferencias de usuario
│
├── (field-mode)/
│   ├── +layout.svelte              # Marco del modo de campo (sincronización, cronómetro, navegación)
│   ├── +layout.server.ts           # Guardia de turno activo
│   └── field-mode/
│       ├── canvass/[shiftId]/...
│       ├── phone-bank/[sessionId]/...
│       ├── voter-reg/[sessionId]/...
│       └── gotv/[shiftId]/...
│
├── (portal)/
│   ├── +layout.svelte              # Marco del portal de simpatizantes
│   └── portal/...
│
└── (wizard)/
    ├── +layout.svelte              # Marco del asistente (indicadores de pasos)
    └── wizard/...
```

## Patrones de enrutamiento

### Guardias de autenticación

Todas las rutas de `(app)`, `(field-mode)` y `(wizard)` requieren autenticación, y la hace cumplir `+layout.server.ts` a nivel de grupo:

- **Solicitud sin autenticar** → redirige a `/login` con el parámetro `?redirect=`
- **Autenticada pero con el rol equivocado** → 404 (no 403: las funcionalidades restringidas son invisibles)
- **Autenticada pero sin turno activo (modo de campo)** → redirige a `/shifts`

### Redirección a la pantalla de inicio

`/` redirige según el rol de cada persona:
- Roles del personal → su panel específico de rol
- Voluntario / Líder de equipo → `/shifts`
- Candidato → `/dashboard/candidate`
- Simpatizante → `/portal`

### Enlaces directos

Todas las pantallas admiten enlace directo por diseño. El modo de campo conserva en la URL la posición exacta dentro de una lista de recorrido (`/field-mode/canvass/[shiftId]/door/[voterId]`), lo que permite recuperarse de un cierre inesperado y pasar de un dispositivo a otro.

### Rutas que funcionan sin conexión

Las rutas marcadas como capaces de funcionar sin conexión usan un service worker para cachear el marco de la página y una base de datos SQLite local (vía Capacitor) para los datos. La función `load` de `+page.ts` de SvelteKit detecta la conectividad y alterna entre traer del servidor y consultar la base de datos local:

- **Con conexión:** carga de datos estándar desde el servidor
- **Sin conexión:** carga desde la SQLite local, muestra el distintivo «Sin conexión» y deja las escrituras en cola para sincronizar

Rutas que funcionan sin conexión: todas las de trabajo de campo, inscripción de votantes y GOTV de `(field-mode)`, `/events/[eventId]/check-in`, `/messages` (solo lectura), `/shifts` (en caché) y `/training` (módulos en caché).

### Comportamiento de las URL en RTL

El modo RTL no afecta a las URL: las rutas siguen siendo LTR sea cual sea el idioma de la interfaz. Del volteo visual de la maquetación se encargan el atributo `lang` de `<html>` y las propiedades lógicas de CSS. El soporte de RTL no requiere ningún cambio en las URL.

### Páginas de eventos públicas frente a autenticadas

Los eventos tienen dos patrones de URL:
- `/events/[eventId]` (pública, en el grupo `(public)`) — la página pública que se comparte
- `/events/[eventId]/manage` (autenticada, en el grupo `(app)`) — la vista de gestión

SvelteKit lo resuelve por precedencia de layout groups: la ruta `/events/[eventId]` del grupo `(public)` existe solo como página pública. Las rutas autenticadas de gestión de eventos llevan los sufijos `/manage`, `/rsvps`, `/check-in` y `/metrics` para evitar la colisión.

## Preguntas abiertas

1. **URL personalizadas para los perfiles públicos.** ¿Deberían las organizaciones poder configurar slugs propios para sus páginas de perfil de candidato o de organización (por ejemplo, `/maria-santos` en vez de `/p/maria-santos`)? Haría falta una ruta comodín que compruebe los slugs personalizados antes de caer al 404.

2. **Espacio de nombres de las rutas de API.** Las rutas de API de SvelteKit (endpoints de servidor) deberían llevar un prefijo para no colisionar con las rutas de página. Probablemente `/api/v1/...`, pero eso se solapa con la API REST pública que menciona el documento de arquitectura. Hay que alinear las rutas de servidor de SvelteKit con la API independiente.

3. **URL localizadas.** ¿Deberían localizarse las rutas de las URL (por ejemplo, `/personas` en vez de `/people` en español, o `/contacts` en francés)? La mayoría de las aplicaciones internacionalizadas mantienen las URL en inglés con el contenido localizado: implementación más simple y enlaces directos consistentes. Pero algunas jurisdicciones pueden tener requisitos sobre el idioma de las URL oficiales.

<!-- REVISIT: El enrutamiento de la página pública de eventos hay que implementarlo con cuidado para evitar conflictos entre los grupos (public) y (app). Las reglas de resolución de rutas de SvelteKit pueden exigir otro enfoque: quizá un matcher de rutas, o una sola ruta de eventos que elija la maquetación de forma condicional según el estado de autenticación. -->
<!-- REVISIT: La estructura de URL del modo de campo asume que los ID de turno son seguros para usarse en una URL. Con UUID no hay problema. Con ID secuenciales, conviene considerar alternativas basadas en slug por legibilidad. -->
