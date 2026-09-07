# Inventario de pantallas

## Propósito

Un catálogo completo de todas las pantallas distintas de la plataforma, organizado por área funcional. Cada entrada identifica qué perfiles pueden acceder a la pantalla, si funciona sin conexión y si está optimizada para móvil.

Este inventario se deriva de los 12 documentos de especificación y del modelo de navegación. Sirve de referencia maestra para el trabajo de wireframes, la planificación de rutas y la definición del alcance de la implementación.

## Cómo leer la tabla

- **ID de pantalla** — identificador único para las referencias cruzadas (formato: `AREA-NNN`)
- **Pantalla** — nombre legible de la pantalla
- **Arquetipos** — quién puede acceder a esta pantalla (abreviado: OA=Administrador de la organización, CD=Director de comunicaciones, FD=Director de finanzas, FiD=Director de campo, VC=Coordinador de voluntarios, DM=Gestor de datos, V=Voluntario, TL=Líder de equipo, C=Candidato, S=Simpatizante)
- **Sin conexión** — si la pantalla funciona sin conectividad (Sí, Parcial, No)
- **Móvil** — si la pantalla está diseñada para uso móvil (Principal=prioridad móvil, Sí=funciona en móvil, Escritorio=preferentemente de escritorio)
- **Ref. de especificación** — documento de especificación de origen y sección relevante

## 1. Paneles

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| DASH-001 | Panel general de la campaña | OA, C | No | Sí | workflows.md — informes |
| DASH-002 | Panel de operaciones de campo | OA, FiD | No | Sí | workflows.md — informes |
| DASH-003 | Panel de recaudación de fondos | OA, FD | No | Sí | workflows.md — informes |
| DASH-004 | Panel de comunicaciones | OA, CD | No | Sí | workflows.md — informes |
| DASH-005 | Panel de voluntarios | OA, VC | No | Sí | workflows.md — informes |
| DASH-006 | Panel de calidad de datos | OA, DM | No | Escritorio | workflows.md — informes |
| DASH-007 | Panel de cumplimiento | OA, FD | No | Escritorio | compliance.md — infraestructura |
| DASH-008 | Panel del centro de mando de GOTV | OA, FiD | No | Sí | gotv.md — panel de participación |
| DASH-009 | Panel del líder de equipo | TL | No | Principal | workflows.md — trabajo de campo |
| DASH-010 | Panel del candidato | C | No | Sí | users.md — perfil del candidato |
| DASH-011 | Panel de la alianza | OA | No | Sí | workflows.md — coordinación de alianzas |

## 2. CRM / Personas

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| CRM-001 | Lista de contactos | OA, CD, FD, FiD, VC, DM | No | Sí | users.md — registros del CRM |
| CRM-002 | Detalle del contacto | OA, CD, FD, FiD, VC, DM | Parcial | Sí | users.md — registros del CRM |
| CRM-003 | Crear/editar contacto | OA, CD, FD, FiD, VC, DM | No | Sí | users.md — registros del CRM |
| CRM-004 | Constructor de segmentos | OA, CD, FD, FiD, DM | No | Escritorio | workflows.md — comunicaciones |
| CRM-005 | Lista de segmentos | OA, CD, FD, FiD, DM | No | Sí | workflows.md — comunicaciones |
| CRM-006 | Cola de revisión de deduplicación | OA, DM | No | Escritorio | users.md — deduplicación |
| CRM-007 | Comparación lado a lado de la deduplicación | OA, DM | No | Escritorio | users.md — deduplicación |
| CRM-008 | Asistente de importación de datos — Carga de archivo | OA, DM | No | Escritorio | integrations.md — importación del padrón electoral |
| CRM-009 | Asistente de importación de datos — Mapeo de columnas | OA, DM | No | Escritorio | integrations.md — importación del padrón electoral |
| CRM-010 | Asistente de importación de datos — Vista previa de la deduplicación | OA, DM | No | Escritorio | integrations.md — importación del padrón electoral |
| CRM-011 | Asistente de importación de datos — Confirmación | OA, DM | No | Escritorio | integrations.md — importación del padrón electoral |
| CRM-012 | Historial de importaciones de datos | OA, DM | No | Escritorio | integrations.md — importación del padrón electoral |
| CRM-013 | Exportación de datos | OA, DM | No | Escritorio | workflows.md — importación/exportación de datos |
| CRM-014 | Informe de calidad de datos | OA, DM | No | Escritorio | workflows.md — importación/exportación de datos |
| CRM-015 | Gestión de etiquetas | OA, DM | No | Escritorio | users.md — registros del CRM |

## 3. Trabajo de campo

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| CANV-001 | Lista de campañas de trabajo de campo | OA, FiD | No | Sí | workflows.md — trabajo de campo |
| CANV-002 | Crear/editar campaña de trabajo de campo | OA, FiD | No | Escritorio | workflows.md — trabajo de campo |
| CANV-003 | Constructor de guiones | OA, FiD | No | Escritorio | workflows.md — trabajo de campo |
| CANV-004 | Mapa de gestión de territorios | OA, FiD | No | Escritorio | integrations.md — GIS/mapas |
| CANV-005 | Generación automática de territorios | OA, FiD | No | Escritorio | integrations.md — GIS/mapas |
| CANV-006 | Gestión de listas de recorrido | OA, FiD | No | Escritorio | workflows.md — trabajo de campo |
| CANV-007 | Modo de campo — Inicio del turno | V, TL | Sí | Principal | workflows.md — trabajo de campo |
| CANV-008 | Modo de campo — Vista de la lista de recorrido | V, TL | Sí | Principal | workflows.md — trabajo de campo |
| CANV-009 | Modo de campo — Vista de mapa | V, TL | Sí | Principal | integrations.md — mapas sin conexión |
| CANV-010 | Modo de campo — Ficha de puerta | V, TL | Sí | Principal | workflows.md — trabajo de campo |
| CANV-011 | Modo de campo — Formulario de interacción | V, TL | Sí | Principal | workflows.md — trabajo de campo |
| CANV-012 | Modo de campo — Fin del turno / balance | V, TL | Parcial | Principal | workflows.md — trabajo de campo |
| CANV-013 | Revisión de resultados del trabajo de campo | OA, FiD | No | Sí | workflows.md — trabajo de campo |
| CANV-014 | Mapa de avance del trabajo de campo | OA, FiD | No | Escritorio | workflows.md — informes |

## 4. Jornadas de llamadas

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| PHONE-001 | Lista de campañas de jornada de llamadas | OA, FiD | No | Sí | workflows.md — jornadas de llamadas |
| PHONE-002 | Crear/editar campaña de jornada de llamadas | OA, FiD | No | Escritorio | workflows.md — jornadas de llamadas |
| PHONE-003 | Constructor de guiones de jornada de llamadas | OA, FiD | No | Escritorio | workflows.md — jornadas de llamadas |
| PHONE-004 | Jornada de llamadas — Interfaz de llamada (BYOP) | V | No | Principal | workflows.md — jornadas de llamadas |
| PHONE-005 | Jornada de llamadas — Interfaz de llamada (integrada) | V | No | Principal | integrations.md — telefonía |
| PHONE-006 | Jornada de llamadas — Formulario de resultado de la llamada | V | No | Principal | workflows.md — jornadas de llamadas |
| PHONE-007 | Panel de avance de la jornada de llamadas | OA, FiD | No | Sí | workflows.md — jornadas de llamadas |

## 5. Inscripción de votantes

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| VREG-001 | Lista de jornadas de inscripción de votantes | OA, FiD | No | Sí | workflows.md — inscripción de votantes |
| VREG-002 | Crear/editar jornada de inscripción de votantes | OA, FiD | No | Escritorio | workflows.md — inscripción de votantes |
| VREG-003 | Selector de plantilla de jurisdicción para inscripción de votantes | OA, FiD | No | Escritorio | workflows.md — inscripción de votantes |
| VREG-004 | Modo de campo — Formulario de inscripción de votantes | V, TL | Sí | Principal | workflows.md — inscripción de votantes |
| VREG-005 | Modo de campo — Verificación de elegibilidad | V, TL | Sí | Principal | workflows.md — inscripción de votantes |
| VREG-006 | Revisión de resultados de inscripción de votantes | OA, FiD | No | Sí | workflows.md — inscripción de votantes |

## 6. Recaudación de fondos

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| FUND-001 | Lista de donaciones | OA, FD | No | Sí | fundraising.md — tipos de donación |
| FUND-002 | Detalle de la donación | OA, FD | No | Sí | fundraising.md — tipos de donación |
| FUND-003 | Constructor de formularios de donación | OA, FD | No | Escritorio | fundraising.md — formularios de donación |
| FUND-004 | Vista previa del formulario de donación | OA, FD | No | Sí | fundraising.md — formularios de donación |
| FUND-005 | Formulario de donación — Público (alojado) | S, Público | No | Principal | fundraising.md — formularios de donación |
| FUND-006 | Formulario de donación — Configuración de incrustación | OA, FD | No | Escritorio | fundraising.md — formularios de donación |
| FUND-007 | Gestión de donaciones recurrentes | OA, FD | No | Escritorio | fundraising.md — recurrentes |
| FUND-008 | Gestión de promesas de donación | OA, FD | No | Escritorio | fundraising.md — promesas de donación |
| FUND-009 | Procesamiento de reembolsos | OA, FD | No | Escritorio | fundraising.md — reembolsos |
| FUND-010 | Registro de donaciones en efectivo | OA, FD, V | Parcial | Principal | fundraising.md — manejo de efectivo |
| FUND-011 | Conciliación de efectivo | OA, FD | No | Escritorio | fundraising.md — manejo de efectivo |
| FUND-012 | Revisión de marcas de cumplimiento | OA, FD | No | Escritorio | fundraising.md — prevención de fraude |
| FUND-013 | Configuración de la prueba A/B | OA, FD | No | Escritorio | fundraising.md — pruebas A/B |
| FUND-014 | Resultados de la prueba A/B | OA, FD | No | Escritorio | fundraising.md — pruebas A/B |
| FUND-015 | Configuración del reparto de la alianza | OA, FD | No | Escritorio | fundraising.md — recaudación en alianza |
| FUND-016 | Informe de recaudación de la alianza | OA, FD | No | Escritorio | fundraising.md — recaudación en alianza |
| FUND-017 | Configuración del procesador de pagos | OA | No | Escritorio | fundraising.md — procesadores |
| FUND-018 | Lista de campañas de recaudación | OA, FD | No | Sí | fundraising.md — analítica |
| FUND-019 | Crear/editar campaña de recaudación | OA, FD | No | Escritorio | fundraising.md — analítica |
| FUND-020 | Generador de estados de cuenta anuales | OA, FD | No | Escritorio | fundraising.md — experiencia del donante |

## 7. Comunicaciones

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| COMM-001 | Lista de campañas de correo | OA, CD | No | Sí | workflows.md — comunicaciones |
| COMM-002 | Constructor de campañas de correo | OA, CD | No | Escritorio | workflows.md — comunicaciones |
| COMM-003 | Constructor de plantillas de correo | OA, CD | No | Escritorio | workflows.md — comunicaciones |
| COMM-004 | Biblioteca de plantillas de correo | OA, CD | No | Sí | workflows.md — comunicaciones |
| COMM-005 | Redactor de SMS/WhatsApp | OA, CD | No | Sí | workflows.md — comunicaciones |
| COMM-006 | Analítica de comunicaciones | OA, CD | No | Escritorio | workflows.md — informes |
| COMM-007 | Gestión del consentimiento | OA, CD, DM | No | Escritorio | compliance.md — consentimiento |
| COMM-008 | Preferencias de comunicación (personal) | OA, CD | No | Escritorio | compliance.md — consentimiento |
| COMM-009 | Gestión de bajas | OA, CD | No | Escritorio | compliance.md — consentimiento |
| COMM-010 | Configuración del dominio de envío de correo | OA | No | Escritorio | integrations.md — correo |

## 8. Redes sociales

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| SOCIAL-001 | Panel de redes sociales | OA, CD | No | Sí | press.md — redes sociales |
| SOCIAL-002 | Redactor de publicaciones (multiplataforma) | OA, CD | No | Escritorio | press.md — creación de publicaciones |
| SOCIAL-003 | Calendario / programación de publicaciones | OA, CD | No | Escritorio | press.md — programación |
| SOCIAL-004 | Analítica de publicaciones | OA, CD | No | Escritorio | press.md — analítica |
| SOCIAL-005 | Conexión de cuentas de redes sociales | OA | No | Escritorio | press.md — OAuth/alternativa |
| SOCIAL-006 | Vista previa por plataforma | OA, CD | No | Escritorio | press.md — creación de publicaciones |

## 9. Eventos

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| EVT-001 | Lista de eventos | OA, VC, V, TL, S | No | Sí | workflows.md — eventos |
| EVT-002 | Crear/editar evento | OA, VC | No | Escritorio | workflows.md — eventos |
| EVT-003 | Detalle del evento | OA, VC, V, TL, S | No | Sí | workflows.md — eventos |
| EVT-004 | Gestión de confirmaciones de asistencia | OA, VC | No | Sí | workflows.md — eventos |
| EVT-005 | Herramienta de registro de entrada al evento | OA, VC, TL | Sí | Principal | workflows.md — eventos |
| EVT-006 | Formulario de confirmación de asistencia (público) | S, Público | No | Principal | workflows.md — eventos |
| EVT-007 | Página del evento (pública) | Público | No | Principal | workflows.md — eventos |
| EVT-008 | Métricas del evento | OA, VC | No | Escritorio | workflows.md — eventos |
| EVT-009 | Configuración de evento virtual | OA, VC | No | Escritorio | workflows.md — eventos |
| EVT-010 | Constructor de encuestas posteriores al evento | OA, VC | No | Escritorio | workflows.md — eventos |

## 10. Activismo

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| ACT-001 | Lista de campañas de activismo | OA, CD | No | Sí | workflows.md — activismo |
| ACT-002 | Configuración de acción de cartas/correos | OA, CD | No | Escritorio | workflows.md — activismo |
| ACT-003 | Configuración de petición | OA, CD | No | Escritorio | workflows.md — activismo |
| ACT-004 | Configuración de campaña de comentarios públicos | OA, CD | No | Escritorio | workflows.md — activismo |
| ACT-005 | Página de acción (pública) | S, Público | No | Principal | workflows.md — activismo |
| ACT-006 | Página de petición (pública) | S, Público | No | Principal | workflows.md — activismo |
| ACT-007 | Vista previa de mensajes generados por IA | S | No | Principal | workflows.md — activismo |
| ACT-008 | Analítica de campañas de activismo | OA, CD | No | Escritorio | workflows.md — activismo |
| ACT-009 | Documentación del acto de entrega | OA, CD | No | Sí | workflows.md — activismo |

## 11. Prensa y medios

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| PRESS-001 | Lista de contactos de medios | OA, CD | No | Sí | press.md — contactos de medios |
| PRESS-002 | Detalle del contacto de medios | OA, CD | No | Sí | press.md — contactos de medios |
| PRESS-003 | Gestión de listas de medios | OA, CD | No | Escritorio | press.md — listas de medios |
| PRESS-004 | Constructor de comunicados de prensa | OA, CD | No | Escritorio | press.md — comunicados de prensa |
| PRESS-005 | Vista previa del comunicado de prensa | OA, CD | No | Sí | press.md — comunicados de prensa |
| PRESS-006 | Distribución del comunicado de prensa | OA, CD | No | Escritorio | press.md — comunicados de prensa |
| PRESS-007 | Constructor de avisos a medios | OA, CD | No | Escritorio | press.md — avisos a medios |
| PRESS-008 | Constructor de declaraciones | OA, CD | No | Escritorio | press.md — declaraciones |
| PRESS-009 | Gestión del kit de prensa | OA, CD | No | Escritorio | press.md — kit de prensa |
| PRESS-010 | Registro de cobertura | OA, CD | No | Escritorio | press.md — seguimiento de cobertura |
| PRESS-011 | Analítica de cobertura | OA, CD | No | Escritorio | press.md — analítica de cobertura |
| PRESS-012 | Flujo de respaldos | OA, CD | No | Escritorio | press.md — respaldos |
| PRESS-013 | Detalle del respaldo | OA, CD | No | Sí | press.md — respaldos |
| PRESS-014 | Biblioteca de puntos de mensaje | OA, CD | No | Sí | press.md — voceros |
| PRESS-015 | Agenda de entrevistas | OA, CD | No | Sí | press.md — actos con medios |
| PRESS-016 | Configuración de voceros | OA | No | Escritorio | press.md — voceros |

## 12. GOTV y día de elecciones

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| GOTV-001 | Constructor del universo GOTV | OA, FiD | No | Escritorio | gotv.md — definición del universo |
| GOTV-002 | Carga de datos de voto adelantado | OA, FiD, DM | No | Escritorio | gotv.md — voto adelantado |
| GOTV-003 | Configuración de los puntos de concentración de voluntarios | OA, FiD, VC | No | Escritorio | gotv.md — concentración |
| GOTV-004 | Corte de territorios para GOTV | OA, FiD | No | Escritorio | gotv.md — corte de territorios |
| GOTV-005 | Plan de comunicaciones del día de elecciones | OA, FiD, CD | No | Escritorio | gotv.md — plan de comunicaciones |
| GOTV-006 | Registro de observadores electorales | OA, FiD | No | Escritorio | gotv.md — preparación de observadores |
| GOTV-007 | Seguimiento de credenciales de observadores electorales | OA, FiD | No | Escritorio | gotv.md — preparación de observadores |
| GOTV-008 | Modo de campo — Ficha de puerta de GOTV | V, TL | Sí | Principal | gotv.md — trabajo de campo de GOTV |
| GOTV-009 | Modo de campo — Lista de recorrido de GOTV | V, TL | Sí | Principal | gotv.md — trabajo de campo de GOTV |
| GOTV-010 | Interfaz de llamadas de seguimiento | V | No | Principal | gotv.md — llamadas de seguimiento |
| GOTV-011 | Formulario de solicitud de transporte | V, TL, S | Parcial | Principal | gotv.md — transporte a las urnas |
| GOTV-012 | Coordinación de transporte — Vista del despachador | OA, FiD, VC | No | Sí | gotv.md — transporte a las urnas |
| GOTV-013 | Coordinación de transporte — Vista del conductor | V | No | Principal | gotv.md — transporte a las urnas |
| GOTV-014 | Registro de entrada del observador electoral | V | No | Principal | gotv.md — observación electoral |
| GOTV-015 | Formulario de reporte de problemas del observador electoral | V | Parcial | Principal | gotv.md — reporte de problemas |
| GOTV-016 | Cola de problemas de observadores electorales | OA, FiD | No | Sí | gotv.md — escalamiento de problemas |
| GOTV-017 | Panel de participación — Vista de mapa | OA, FiD | No | Sí | gotv.md — seguimiento de participación |
| GOTV-018 | Panel de participación — Vista por segmentos | OA, FiD | No | Escritorio | gotv.md — seguimiento de participación |
| GOTV-019 | Sugerencias de reasignación | OA, FiD | No | Sí | gotv.md — reasignación dinámica |
| GOTV-020 | Ingreso de resultados de la noche electoral | V | No | Principal | gotv.md — seguimiento de resultados |
| GOTV-021 | Panel de resultados de la noche electoral | OA, FiD | No | Sí | gotv.md — seguimiento de resultados |
| GOTV-022 | Análisis posterior a la elección | OA, FiD | No | Escritorio | gotv.md — posterior a la elección |
| GOTV-023 | Registro de entrada en el punto de concentración | TL | No | Principal | gotv.md — concentración de voluntarios |

## 13. Mensajería

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| MSG-001 | Lista de mensajes (bandeja de entrada) | Toda persona autenticada | Parcial | Principal | messaging.md — mensajes directos |
| MSG-002 | Vista de conversación (mensaje directo) | Toda persona autenticada | Parcial | Principal | messaging.md — mensajes directos |
| MSG-003 | Vista de conversación (grupo) | Toda persona autenticada | Parcial | Principal | messaging.md — grupos |
| MSG-004 | Vista de hilo | Toda persona autenticada | Parcial | Principal | messaging.md — hilos |
| MSG-005 | Crear/editar grupo | OA, CD, FD, FiD, VC | No | Sí | messaging.md — grupos |
| MSG-006 | Redactor de difusiones | OA, CD, FiD, VC | No | Escritorio | messaging.md — difusiones |
| MSG-007 | Canal del centro de mando | OA, FiD, CD, VC | No | Sí | messaging.md — centro de mando |
| MSG-008 | Hilo contextual (evento) | OA, VC, TL | Parcial | Sí | messaging.md — contextuales |
| MSG-009 | Hilo contextual (turno) | OA, FiD, VC, TL | Parcial | Sí | messaging.md — contextuales |
| MSG-010 | Hilo contextual (problema) | OA, FiD | No | Sí | messaging.md — contextuales |
| MSG-011 | Hilo contextual (donación marcada) | OA, FD | No | Escritorio | messaging.md — contextuales |
| MSG-012 | Vista de informes del candidato | C | Parcial | Principal | messaging.md — candidato |
| MSG-013 | Cola de aprobaciones del candidato | C | No | Principal | messaging.md — candidato |
| MSG-014 | Canal de la alianza | OA | No | Sí | messaging.md — alianza |

## 14. Ajustes y administración

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| SET-001 | Perfil e identidad visual de la organización | OA | No | Escritorio | workflows.md — puesta en marcha |
| SET-002 | Editor de plantillas de rol | OA | No | Escritorio | users.md — permisos |
| SET-003 | Panel de ajuste de permisos | OA | No | Escritorio | users.md — permisos |
| SET-004 | Lista de gestión del personal | OA | No | Escritorio | users.md — personal |
| SET-005 | Flujo de invitación del personal | OA | No | Escritorio | workflows.md — puesta en marcha |
| SET-006 | Configuración del ámbito geográfico | OA | No | Escritorio | users.md — ámbitos |
| SET-007 | Configuración del período de campaña | OA | No | Escritorio | compliance.md — períodos de campaña |
| SET-008 | Configuración de cumplimiento | OA | No | Escritorio | compliance.md — configuración por organización |
| SET-009 | Configuración de límites de contribución | OA | No | Escritorio | compliance.md — financiamiento de campañas |
| SET-010 | Configuración del texto del aviso legal | OA | No | Escritorio | compliance.md — avisos legales |
| SET-011 | Política de conservación de datos | OA | No | Escritorio | compliance.md — conservación |
| SET-012 | Centro de ajustes de integraciones | OA | No | Escritorio | integrations.md |
| SET-013 | Configuración de WhatsApp Business | OA | No | Escritorio | integrations.md — WhatsApp |
| SET-014 | Configuración del proveedor de SMS | OA | No | Escritorio | integrations.md — SMS |
| SET-015 | Configuración del dominio de correo | OA | No | Escritorio | integrations.md — correo |
| SET-016 | Conexiones de cuentas de redes sociales | OA | No | Escritorio | press.md — redes sociales |
| SET-017 | Facturación y suscripción | OA | No | Escritorio | fundraising.md — precios |
| SET-018 | Visor del registro de auditoría | OA | No | Escritorio | security.md — auditoría |
| SET-019 | Ajustes de seguridad | OA | No | Escritorio | security.md — configuración de niveles |
| SET-020 | Gestión de llaves de cifrado | OA | No | Escritorio | security.md — BYOK |
| SET-021 | Gestión de llaves de API | OA | No | Escritorio | integrations.md — API pública |
| SET-022 | Configuración de webhooks | OA | No | Escritorio | integrations.md — webhooks |

## 15. Asistentes de puesta en marcha

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| WIZ-001 | Asistente de configuración de la organización | OA | No | Sí | support.md — asistentes de puesta en marcha |
| WIZ-002 | Asistente del procesador de pagos | OA | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-003 | Asistente de generación de llaves BYOK | OA | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-004 | Asistente de configuración de cumplimiento | OA | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-005 | Asistente de configuración de WhatsApp Business | OA | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-006 | Asistente de configuración del número de SMS | OA | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-007 | Asistente de importación del padrón electoral | OA, DM | No | Escritorio | support.md — asistentes de puesta en marcha |
| WIZ-008 | Asistente de incorporación de voluntarios | V | No | Principal | support.md — asistentes de puesta en marcha |

## 16. Soporte y ayuda

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| HELP-001 | Navegador de la base de conocimiento | Toda persona autenticada | No | Sí | support.md — base de conocimiento |
| HELP-002 | Artículo de la base de conocimiento | Toda persona autenticada | Parcial | Sí | support.md — base de conocimiento |
| HELP-003 | Chat del concierge de IA | Toda persona autenticada | No | Sí | support.md — concierge |
| HELP-004 | Lista de módulos de capacitación | V, TL | Parcial | Principal | support.md — capacitación |
| HELP-005 | Contenido del módulo de capacitación | V, TL | Parcial | Principal | support.md — capacitación |
| HELP-006 | Cuestionario de capacitación | V, TL | Parcial | Principal | support.md — capacitación |
| HELP-007 | Estado de certificación | V, TL, VC | No | Sí | support.md — capacitación |
| HELP-008 | Editor de contenidos de capacitación | OA, VC | No | Escritorio | support.md — capacitación |

## 17. Portal de simpatizantes

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| SUP-001 | Inicio del simpatizante | S | No | Principal | fundraising.md — portal del donante |
| SUP-002 | Historial de donaciones | S | No | Principal | fundraising.md — portal del donante |
| SUP-003 | Vista del recibo de donación | S | No | Principal | fundraising.md — recibos |
| SUP-004 | Gestión de donaciones recurrentes | S | No | Principal | fundraising.md — portal del donante |
| SUP-005 | Actualización del método de pago | S | No | Principal | fundraising.md — portal del donante |
| SUP-006 | Perfil del simpatizante | S | No | Principal | users.md — simpatizantes |
| SUP-007 | Preferencias de comunicación | S | No | Principal | compliance.md — consentimiento |
| SUP-008 | Mis eventos | S | No | Principal | workflows.md — eventos |
| SUP-009 | Descarga del estado de cuenta anual | S | No | Principal | fundraising.md — estados de cuenta |

## 18. Alianza

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| ALLY-001 | Panel de la alianza | OA | No | Sí | workflows.md — alianza |
| ALLY-002 | Lista de miembros de la alianza | OA | No | Escritorio | workflows.md — alianza |
| ALLY-003 | Formulario de solicitud de afiliación | OA | No | Escritorio | workflows.md — alianza |
| ALLY-004 | Cola de solicitudes de afiliación | OA | No | Escritorio | workflows.md — alianza |
| ALLY-005 | Configuración del intercambio | OA | No | Escritorio | workflows.md — alianza |
| ALLY-006 | Configuración de campaña conjunta | OA | No | Escritorio | workflows.md — alianza |
| ALLY-007 | Analítica compartida | OA | No | Escritorio | workflows.md — alianza |
| ALLY-008 | Coordinación de GOTV en la alianza | OA, FiD | No | Escritorio | gotv.md — GOTV en alianza |

## 19. Páginas públicas (sin autenticación)

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| PUB-001 | Página de perfil del candidato | Público | No | Principal | press.md — perfiles públicos |
| PUB-002 | Página de perfil de la organización | Público | No | Principal | press.md — perfiles públicos |
| PUB-003 | Formulario de donación (alojado) | Público | No | Principal | fundraising.md — formularios |
| PUB-004 | Página del evento | Público | No | Principal | workflows.md — eventos |
| PUB-005 | Página de acción (carta/correo) | Público | No | Principal | workflows.md — activismo |
| PUB-006 | Página de petición | Público | No | Principal | workflows.md — activismo |
| PUB-007 | Página de inscripción de voluntarios | Público | No | Principal | workflows.md — incorporación de voluntarios |
| PUB-008 | Página del kit de prensa | Público | No | Principal | press.md — kit de prensa |

## 20. Autenticación

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| AUTH-001 | Inicio de sesión (passkey) | Todos | No | Principal | security.md — autenticación |
| AUTH-002 | Inicio de sesión alternativo (enlace mágico / OTP por SMS) | Todos | No | Principal | security.md — autenticación |
| AUTH-003 | Recuperación de cuenta (contacto de confianza) | Todos | No | Principal | security.md — recuperación |
| AUTH-004 | Registro de passkey | Todos | No | Principal | security.md — autenticación |
| AUTH-005 | Configuración del contacto de confianza | Todos | No | Sí | security.md — recuperación |
| AUTH-006 | Autorización de dispositivo | Todos | No | Sí | security.md — varios dispositivos |
| AUTH-007 | Sesión expirada / volver a autenticarse | Todos | No | Principal | security.md — sesiones |

## 21. Perfil y preferencias de usuario

| ID | Pantalla | Arquetipos | Sin conexión | Móvil | Ref. de especificación |
|----|--------|----------|---------|--------|----------|
| PROF-001 | Perfil personal | Toda persona autenticada | No | Sí | users.md — perfiles |
| PROF-002 | Preferencias de notificaciones | Toda persona autenticada | No | Sí | messaging.md — notificaciones |
| PROF-003 | Ajustes de seguridad (personales) | Toda persona autenticada | No | Sí | security.md — passkeys |
| PROF-004 | Preferencia de idioma | Toda persona autenticada | No | Sí | geography.md — localización |
| PROF-005 | Selector de organización | Usuarios multiorganización | No | Sí | users.md — federación |

## Resumen

| Área funcional | Cantidad de pantallas | Pantallas sin conexión | Pantallas de prioridad móvil |
|-------------|-------------|-----------------|----------------------|
| Paneles | 11 | 0 | 0 |
| CRM / Personas | 15 | 1 | 0 |
| Trabajo de campo | 14 | 6 | 6 |
| Jornadas de llamadas | 7 | 0 | 3 |
| Inscripción de votantes | 6 | 2 | 2 |
| Recaudación de fondos | 20 | 1 | 1 |
| Comunicaciones | 10 | 0 | 0 |
| Redes sociales | 6 | 0 | 0 |
| Eventos | 10 | 1 | 2 |
| Activismo | 9 | 0 | 2 |
| Prensa y medios | 16 | 0 | 0 |
| GOTV / día de elecciones | 23 | 3 | 6 |
| Mensajería | 14 | 7 | 5 |
| Ajustes y administración | 22 | 0 | 0 |
| Asistentes de puesta en marcha | 8 | 0 | 1 |
| Soporte y ayuda | 8 | 3 | 3 |
| Portal de simpatizantes | 9 | 0 | 9 |
| Alianza | 8 | 0 | 0 |
| Páginas públicas | 8 | 0 | 8 |
| Autenticación | 7 | 0 | 5 |
| Perfil de usuario | 5 | 0 | 0 |
| **Total** | **236** | **24** | **53** |

La plataforma tiene aproximadamente **236 pantallas distintas**, de las cuales **24 funcionan sin conexión** y **53 son de prioridad móvil** (diseñadas sobre todo para usarse en el celular). Las demás funcionan en móvil, pero están diseñadas con prioridad de escritorio (configuración compleja, tablas de datos, constructores).

<!-- REVISIT: Este inventario va a crecer a medida que la implementación revele subpantallas y flujos modales que este nivel de análisis no captura. Los ID de pantalla dan un sistema de referencia estable para lo que se añada. -->
