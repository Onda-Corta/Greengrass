# Arquitectura del sistema

## Resumen

GreenGrass es una plataforma federada y de organización única para la gestión de campañas políticas de base. Este documento define la arquitectura del sistema — cómo encajan los componentes, cómo fluyen los datos y cómo la infraestructura sostiene los requisitos de producto definidos en los documentos de especificación.

### Impulsores de la arquitectura

Estas decisiones de producto (tomadas en las especificaciones) son las que más pesan en la arquitectura:

1. **Aislamiento de organización única** con niveles de seguridad escalonados (contenedor → clúster → cuenta de proveedor de nube → autoalojado)
2. **Modelo de federación** — entidades soberanas conectadas por afiliación, no un sistema monolítico multiorganización
3. **BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) por defecto** — la plataforma no puede leer los datos de una organización a menos que esta opte por llaves gestionadas
4. **Residencia de datos por país** — los datos de la organización se quedan en el país que ella elija
5. **Diseño con prioridad sin conexión (offline-first) para las operaciones de campo** — el trabajo de campo, la inscripción de votantes y el registro de entrada en eventos tienen que funcionar sin conectividad
6. **Prioridad móvil** — la interfaz principal es un celular, no una computadora de escritorio
7. **RTL y multilingüe desde el primer día** — la arquitectura tiene que soportar texto bidireccional y localización de contenido
8. **Registro de auditoría completo** — cada modificación de datos queda registrada
9. **Identidad federada** — una identidad de plataforma, perfiles por organización
10. **Analítica en tiempo real para las operaciones activas** — los paneles del día de campo y del día de elecciones se actualizan en vivo

---

## Topología del sistema

```
┌──────────────────────────────────────────────────────────────────┐
│                        CAPA DE PLATAFORMA                        │
│                                                                  │
│  ┌───────────────┐  ┌─────────────────────┐  ┌────────────────┐  │
│  │  Servicio de  │  │  Servicio de        │  │  Admin. de la  │  │
│  │  identidad    │  │  aprovisionamiento  │  │  plataforma    │  │
│  └──────┬────────┘  └──────┬──────────────┘  └────────────────┘  │
│         │                  │                                     │
│  ┌──────┴──────────────────┴──────────────────────────────────┐  │
│  │   Catálogo de servicios · Derechos de uso · Medición       │  │
│  │   (qué existe, quién lo activó, qué costó — solo           │  │
│  │    metadatos; ADR-019)                                     │  │
│  └──────┬──────────────────┬──────────────────────────────────┘  │
│  ┌──────┴──────────────────┴──────────────────────────────────┐  │
│  │                Capa de federación / alianza                │  │
│  │ (coordinación entre organizaciones, reglas de intercambio, │  │
│  │   deduplicación, no volver a tocar, campañas conjuntas)    │  │
│  └──────┬──────────────────┬──────────────────────────────────┘  │
│  ┌──────┴──────────────────┴──────────────────────────────────┐  │
│  │   Servicios centrales (captura, análisis, constructores,   │  │
│  │   transporte por canal) — código compartido, ejecutado     │  │
│  │   por organización bajo sus llaves, nada se conserva       │  │
│  └──────┬──────────────────┬──────────────────────────────────┘  │
└─────────┼──────────────────┼─────────────────────────────────────┘
          │                  │
    ┌─────┴──────────┐   ┌───┴────────────┐
    │ ORGANIZACIÓN A │   │ ORGANIZACIÓN B │    ... (una por organización o candidatura)
    │                │   │                │
    │  ┌──────────┐  │   │  ┌──────────┐  │
    │  │ Servidor │  │   │  │ Servidor │  │
    │  │ de app   │  │   │  │ de app   │  │
    │  ├──────────┤  │   │  ├──────────┤  │
    │  │    BD    │  │   │  │    BD    │  │
    │  ├──────────┤  │   │  ├──────────┤  │
    │  │  Caché   │  │   │  │  Caché   │  │
    │  ├──────────┤  │   │  ├──────────┤  │
    │  │   Cola   │  │   │  │   Cola   │  │
    │  └──────────┘  │   │  └──────────┘  │
    │                │   │                │
    └────────────────┘   └────────────────┘
```

### Arquitectura de tres capas:

1. **Capa de plataforma** — servicios compartidos que existen fuera de cualquier organización: identidad, aprovisionamiento, administración de la plataforma, facturación. Es la única capa que ve a través de las organizaciones.

2. **Capa de federación** — media las interacciones entre organizaciones: coordinación de alianzas, gestión de recursos compartidos, deduplicación entre organizaciones, orquestación de campañas conjuntas. Opera sobre reglas de intercambio explícitas y nunca tiene acceso general a los datos de una organización.

3. **Capa de organización** — una instancia de aplicación completa y aislada por cada entidad soberana (partido, organización o candidatura). Cada organización tiene su propio servidor de aplicación, base de datos, caché y cola de trabajos. Ninguna organización puede ver los datos de otra salvo a través de las reglas de intercambio de la capa de federación.

**Los servicios centrales no son una cuarta capa.** Son capacidades alojadas en la plataforma que una organización activa desde el catálogo y que se ejecutan por organización, bajo sus llaves y sus contratos, sin conservar nada entre llamadas ([ADR-019](../../decisions/019-central-services-and-metered-billing.md)). El catálogo, los derechos de uso y la medición que los rigen son componentes de la capa de plataforma que guardan solo metadatos. Ver [Arquitectura de servicios centrales](#arquitectura-de-servicios-centrales).

---

## Arquitectura de la organización

### Qué hay dentro de una organización

Cada organización es un despliegue de aplicación autocontenido:

| Componente | Función |
|-----------|---------|
| Servidor de aplicación | API, lógica de negocio, renderizado en el servidor |
| Base de datos principal | CRM, datos de votantes, donaciones, eventos, historial de comunicaciones, registro de auditoría |
| Capa de caché | Gestión de sesiones, datos calientes, limitación de frecuencia |
| Cola de trabajos | Tareas asíncronas: envíos de correo, despacho de SMS, importaciones de datos, procesamiento de sincronización |
| Almacenamiento de objetos | Cargas de archivos, medios, archivos de exportación, instantáneas de copia de seguridad |
| Índice de búsqueda | Búsqueda de texto completo en registros del CRM, comunicaciones y notas |

### Niveles de aislamiento

(Decidido en security.md)

| Nivel | Implementación | Límite |
|------|---------------|----------|
| Estándar | Contenedores dedicados en un clúster de Kubernetes compartido | Aislamiento por contenedor y espacio de nombres. Una instancia de base de datos separada por organización. Nodos de cómputo compartidos. |
| Reforzado | Grupo de nodos dedicado dentro de un clúster | Los contenedores de la organización corren en hardware dedicado. Sin cómputo compartido con otras organizaciones. Instancia de base de datos separada. |
| Máximo | Cuenta de proveedor de nube separada | Toda la pila de infraestructura queda aislada a nivel del proveedor de nube. Ningún recurso compartido. |
| Autoalojado | Infraestructura propia de la organización | GreenGrass entrega el paquete de la aplicación. La organización lo gestiona todo. |

**DECIDIDO:** Kubernetes con herramientas independientes del proveedor de nube. Sin dependencia de Google Cloud.

K8s es software libre gobernado por la CNCF y corre sobre cualquier infraestructura. GreenGrass usa Kubernetes en todos los países con una capa de gestión independiente del proveedor de nube (Rancher o Crossplane) que abstrae los distintos proveedores de cada país. Donde hay ofertas gestionadas de K8s (EKS, alternativas que no sean de Google, o proveedores locales) se usan para reducir la carga operativa; donde no las hay, K8s autogestionado (k3s o distribuciones ligeras similares). GKE no.

### Cadena de aprovisionamiento de organizaciones

(Decidido en workflows.md — totalmente automatizado, de autoservicio)

```
Solicitud de registro
  → Validar los datos de la organización y elegir país y nivel
  → Generar el ID de organización y las llaves de cifrado (flujo BYOK o gestionado)
  → Elegir la infraestructura de destino (clúster del país o cuenta de proveedor de nube)
  → Aprovisionar la base de datos (crear, aplicar el esquema, sembrar los valores por defecto)
  → Aprovisionar la instancia de aplicación (desplegar el contenedor, configurar la red)
  → Configurar el DNS (subdominio de la organización o dominio propio)
  → Configurar el bucket de almacenamiento de objetos
  → Configurar la cola de trabajos
  → Ejecutar las verificaciones de estado
  → Entregar las credenciales de puesta en marcha al Administrador de la organización
  → La organización está en vivo
```

**DECIDIDO:** Subdominio por defecto, con soporte para dominio propio.

- **Por defecto:** `nombreorg.greengrass.app`. Se aprovisiona automáticamente durante la puesta en marcha. DNS comodín y TLS vía Let's Encrypt.
- **Dominio propio:** Las organizaciones pueden configurar su propio dominio (por ejemplo, `organizar.campana.org`). Requiere que la organización actualice sus registros DNS (CNAME). La plataforma se encarga sola del aprovisionamiento del certificado TLS una vez configurado el DNS. Los certificados SSL se aprovisionan vía Let's Encrypt, con emisión automática disparada por la validación de DNS ([ADR-016 §68](../../decisions/016-cross-cutting-resolutions.md)). Los dominios propios son críticos para la credibilidad de la marca — quien hace clic en un enlace de donación necesita ver el dominio de la organización.
- **Los dos pueden convivir.** El subdominio siempre funciona como alternativa de reserva aunque haya un dominio propio configurado.

### Infraestructura de páginas públicas

**Imágenes de Open Graph** ([ADR-016 §71](../../decisions/016-cross-cutting-resolutions.md)): La plataforma genera automáticamente las imágenes OG a partir del título de la página, el logo de la organización y los colores de marca (composición de plantilla en el servidor, no IA). Los OA (Org Admin, el Administrador de la organización) pueden sustituirlas subiendo una imagen manualmente por página. Así todo enlace compartido tiene una imagen de vista previa en redes sociales sin que nadie tenga que diseñarla.

**Analítica liviana integrada** ([ADR-016 §69](../../decisions/016-cross-cutting-resolutions.md)): Las páginas públicas registran vistas, visitantes únicos, tasa de conversión y fuente de referencia (parámetros UTM). Nada de analítica de terceros (Google Analytics, Meta Pixel) en la v1 — eso levanta complejidad de privacidad y de consentimiento de cookies. Los OA pueden añadir scripts externos mediante un campo de inyección de código personalizado (ajuste avanzado, desactivado por defecto).

**Referencia anticipada a la v2:** [Pruebas A/B de páginas públicas](../../decisions/016-cross-cutting-resolutions.md) (pilar de la v2) extenderá la infraestructura de pruebas A/B de recaudación de fondos a las páginas de registro de voluntarios y a las demás páginas públicas.

### Exportación de la configuración

(Decidido en [ADR-016 §54](../../decisions/016-cross-cutting-resolutions.md))

Los OA pueden exportar la configuración de su organización como una instantánea JSON para documentarla, guardar una copia de seguridad o compartirla con consultores. La importación entre organizaciones (aplicar la configuración de la organización A a la organización B) queda aplazada a una versión futura — requiere validar que la organización de destino tenga las mismas integraciones, los mismos procesadores de pago y la misma jurisdicción de cumplimiento.

---

## Modelo de datos

### Entidades a nivel de plataforma (compartidas entre organizaciones)

```
PlatformIdentity
├── id (UUID)
├── primary_phone (E.164, cifrado)
├── primary_email (cifrado)
├── name
├── language_preference
├── communication_preferences (consentimiento por canal y por finalidad)
├── passkey_credentials[]
├── trusted_contacts[] → PlatformIdentity
├── tenant_memberships[] → TenantProfile
├── created_at
└── updated_at

TenantRegistration
├── id (UUID)
├── entity_type (alliance | party_org | candidate)
├── tenant_type (lightweight | full)
├── name
├── country
├── hosting_tier (standard | enhanced | maximum | self_hosted)
├── encryption_model (byok | managed)
├── encryption_key_reference (ruta en Vault o en poder de la organización)
├── affiliations[] → TenantRegistration (con affiliation_type)
├── billing_info
├── entitlements[] → Entitlement (servicios centrales que esta organización activó)
├── status (provisioning | active | suspended | decommissioned)
├── created_at
└── updated_at

Affiliation
├── id (UUID)
├── parent_tenant → TenantRegistration (alianza o partido)
├── child_tenant → TenantRegistration (partido, organización o candidatura)
├── affiliation_type (alliance_member | party_candidate)
├── sharing_rules (marcas de activación por recurso)
├── billing_mode (member_pays | alliance_pays) — se fija en la puesta en marcha; solo lo cambian los dos OA
├── status (pending | active | revoked)
├── created_at
└── updated_at

ServiceCatalogueEntry
├── id (UUID)
├── service (capture | electoral_analysis | opposition_research | builder_text | builder_image | builder_video | channel_transport | mutual_suppression)
├── countries[] (dónde se ofrece)
├── hosting_tiers[] (standard | enhanced | maximum | self_hosted)
├── supplier (quién factura el costo variable; nulo si no hay)
├── unit, unit_price_passthrough (el precio del proveedor, sin margen)
├── allocation_method (per_tenant | published_allocation — para proveedores que facturan en conjunto)
├── data_leaves_perimeter (booleano — dispara la aceptación de la frontera de cifrado)
└── updated_at

Entitlement
├── id (UUID)
├── tenant → TenantRegistration
├── catalogue_entry → ServiceCatalogueEntry
├── credential_reference (acotada a esta organización y a este servicio únicamente)
├── acknowledged_perimeter_exit (booleano, con actor y marca de tiempo)
├── spend_cap (soft_warning, hard_stop — en la moneda de facturación de la organización)
├── billed_to → TenantRegistration (la propia organización, o la alianza bajo alliance_pays)
├── status (enabled | suspended_by_cap | disabled)
├── enabled_by → PlatformIdentity
└── created_at

UsageEvent (solo metadatos — sin contenido; nivel de conservación del registro de auditoría)
├── id (UUID)
├── tenant → TenantRegistration
├── entitlement → Entitlement
├── actor (PlatformIdentity, o un tipo de actor no humano cuando la ADR-018 defina uno)
├── contract_reference (el contrato de intercambio bajo el que corrió la llamada, si lo hay)
├── units, quantity
├── supplier_cost, currency
├── billed_to → TenantRegistration
└── occurred_at
```

### Entidades a nivel de organización (base de datos por organización)

```
Person (el registro de la lista única)
├── id (UUID)
├── platform_identity_id → PlatformIdentity (nullable — no todo el mundo tiene inicio de sesión)
├── name, address, phone, email (algunos cifrados a nivel de aplicación)
├── record_types[] (voter | donor | volunteer | supporter | contact | candidate | staff)
├── voter_data
│   ├── precinct / electoral_district
│   ├── registration_status
│   ├── voting_history[] (elecciones en las que participó)
│   ├── support_score
│   └── demographics (edad, idioma)
├── donor_data
│   ├── donation_history[] → Donation
│   ├── recurring_status
│   └── compliance_info (empleador, ocupación — cifrado)
├── volunteer_data
│   ├── role_templates[] → RoleTemplate
│   ├── scopes[] → Scope
│   ├── team_assignment → Team
│   ├── shift_history[] → Shift
│   ├── hours_logged
│   └── training_completion[] (incluye la marca required_before_field por módulo)
├── tags[]
├── segments[]
├── communication_history[] → CommunicationEvent
├── household → Household
├── notes[] (cifradas a nivel de aplicación)
├── created_at
├── updated_at
└── merged_from[] (registro de auditoría de las fusiones por deduplicación)

Campaign
├── id (UUID)
├── name
├── type (electoral | advocacy | voter_registration | fundraising | gotv)
├── status (planning | active | completed | archived)
├── geographic_scope → GeographicArea
├── date_range
└── parent_entity (partido/organización/candidatura/alianza dueña de esta campaña)

GeographicArea (jerárquica)
├── id (UUID)
├── name
├── level (country | region | state | district | precinct | turf)
├── parent → GeographicArea
├── boundary_data (GeoJSON)
└── metadata (población, cantidad de votantes, etc.)

Turf (unidad de asignación del trabajo de campo)
├── id (UUID)
├── geographic_area → GeographicArea
├── walk_list[] → Person (secuencia ordenada de direcciones)
├── campaign → Campaign
├── assigned_to → Person (voluntario)
├── status (unassigned | assigned | in_progress | complete)
└── stats (doors_total, doors_knocked, contact_rate)

CanvassingInteraction
├── id (UUID)
├── person → Person (el votante contactado)
├── canvasser → Person (el voluntario)
├── turf → Turf
├── campaign → Campaign
├── contact_result (spoke | not_home | refused | moved | etc.)
├── script_responses[] (question_id, response)
├── notes (cifradas a nivel de aplicación)
├── recorded_at (marca de tiempo del dispositivo)
├── synced_at (marca de tiempo del servidor)
├── device_id
└── location (lat/lng, opcional)

CanvassingScript
├── id (UUID)
├── campaign → Campaign
├── name
├── version (incremental — los turnos activos quedan fijados a una versión)
├── questions[] (lista ordenada de preguntas del guion con sus opciones de respuesta)
├── language_variants[] → ContentItem
├── status (draft | active | archived)
├── created_by → Person
├── created_at
└── updated_at

ScriptTemplate
├── id (UUID)
├── name
├── description
├── source_script → CanvassingScript (referencia de copia, no un enlace vivo)
├── questions[] (copiadas del origen al crear la plantilla)
├── created_by → Person
└── created_at
```

**Flujo de trabajo de las plantillas de guion** ([ADR-016 §9–10](../../decisions/016-cross-cutting-resolutions.md)): "Guardar como plantilla" copia el guion de una campaña a la biblioteca de plantillas de toda la organización. Al crear un guion de campaña nuevo se ofrece "Empezar desde una plantilla" o "Empezar en blanco". Una vez copiado, el guion de la campaña es independiente — editarlo no afecta a la plantilla ni a otras campañas. El versionado del guion es por campaña: los turnos activos quedan fijados a una versión; las actualizaciones urgentes aparecen en la siguiente ficha de puerta del voluntario, nunca a mitad de una interacción.

**La capacitación incompleta bloquea el trabajo de campo** ([ADR-016 §65](../../decisions/016-cross-cutting-resolutions.md)): El OA marca módulos de capacitación específicos como `required_before_field`. El flujo de asignación de turnos revisa esa marca — los voluntarios que no completaron los módulos requeridos no pueden ser asignados a turnos. La pantalla de asignación muestra "Capacitación incompleta" con un enlace al módulo pendiente. La capacitación que no es requerida se fomenta, pero no bloquea.

```
Donation
├── id (UUID)
├── donor → Person
├── campaign → Campaign (opcional)
├── amount
├── currency
├── type (one_time | recurring)
├── method (card | pix | upi | promptpay | cash | etc.)
├── payment_processor_reference
├── covers_fees (boolean)
├── event_id → Event (nullable — se fija cuando la donación es la compra de una entrada)
├── ticket_type (nullable — por ejemplo, general, vip, student)
├── ticket_quantity (nullable — cantidad de entradas en esta transacción)
├── compliance_data (cifrado)
├── receipt_sent (boolean)
├── created_at
└── audit_trail

Event
├── id (UUID)
├── name, description
├── type (rally | town_hall | fundraiser | training | canvass_launch | phone_bank | virtual)
├── location (dirección física o referencia de la plataforma virtual)
├── date_range
├── capacity
├── rsvp_settings (open | invite_only | approval_required)
├── rsvps[] → RSVP
├── attendance[] → AttendanceRecord
├── campaign → Campaign (opcional)
└── follow_up_status

Communication
├── id (UUID)
├── channel (email | sms | whatsapp)
├── purpose (transactional | event | fundraising | gotv | activism | newsletter)
├── template → MessageTemplate
├── audience_segment → Segment
├── status (draft | scheduled | sending | sent | failed)
├── stats (sent, delivered, opened, clicked, bounced, unsubscribed)
├── scheduled_at
├── sent_at
└── campaign → Campaign (opcional)

AuditEntry
├── id (UUID)
├── actor → Person o PlatformAdmin
├── action (create | update | delete | export | login | permission_change | etc.)
├── entity_type
├── entity_id
├── changes (diferencia antes/después, cifrada)
├── ip_address
├── device_info
├── timestamp
└── tenant_id
```

### Modelo de datos geográficos

(Aplazado desde users.md — se resuelve aquí)

El modelo geográfico es jerárquico y lo bastante flexible para representar la geografía política de distintos países:

```
País
└── Región / Estado / Provincia
    └── Distrito / Municipio
        └── Precinto / Barrio / Centro de votación
            └── Territorio (unidad de asignación del trabajo de campo — la define el personal de campaña)
```

**Decisiones de diseño clave:**

- **Los niveles se configuran por país.** Puerto Rico tiene municipios y precintos. India tiene estados, circunscripciones parlamentarias, circunscripciones de asamblea y centros de votación. La profundidad de la jerarquía y los nombres los configura cada organización.
- **Los datos de límites se guardan como GeoJSON.** Permiten cortar territorios sobre el mapa, visualizar el avance del trabajo de campo y asignar ámbito geográfico a los permisos.
- **Los territorios los define la campaña, no son administrativos.** Un territorio es una lista de recorrido — un conjunto de direcciones asignado a quien toca puertas. Puede abarcar partes de varios precintos o ser un subconjunto de uno. Los territorios los crean los Directores de campo, no se importan de los datos electorales.

**DECIDIDO:** Las dos cosas — precargados para los países objetivo, con capacidad de importación para todo lo demás.

- **Precargados:** GreenGrass incluye los límites electorales oficiales (distritos, precintos, centros de votación) de los países objetivo de la hoja de ruta de despliegue. Una campaña en Puerto Rico elige su municipio y los precintos ya están ahí, listos para cortar territorios.
- **Importación:** Las organizaciones en países sin datos precargados pueden importar sus propios límites geográficos (GeoJSON, shapefiles). El proceso de importación valida, muestra una vista previa y confirma antes de aplicar.
- **Aporte de la comunidad:** Las organizaciones que importan datos geográficos de una jurisdicción nueva pueden enviarlos de vuelta a GreenGrass como conjunto de datos candidato para otras organizaciones del mismo país.
- **Mantenimiento:** Los límites electorales cambian. Los datos precargados están versionados y se actualizan cada ciclo electoral en los países activos.
- **Facilidad de uso:** La entrada, importación y exportación de datos en toda la plataforma debe ser lo más fácil posible — vale para los datos geográficos, los padrones electorales y todos los demás tipos de datos.

### Política de auditoría de exportaciones

(Decidido en [ADR-016 §86](../../decisions/016-cross-cutting-resolutions.md))

Exportar más de 100 registros obliga a quien exporta a elegir un motivo de una lista predefinida (Reporte de cumplimiento / Operaciones de campaña / Migración de datos / Intercambio con la alianza / Otro + texto libre). El motivo queda en el registro de auditoría junto con los metadatos de la exportación (quién, cuándo, cuántos registros, qué campos). Las vistas de registros individuales y las exportaciones pequeñas (<100 registros) no requieren motivo.

### Motor de confianza de la deduplicación

(Decidido en [ADR-016 §83](../../decisions/016-cross-cutting-resolutions.md). Refina el enfoque de sugerir y confirmar de la [ADR-004](../../decisions/004-data-model-integrity.md).)

El motor de deduplicación aplica tres niveles según la confianza del cruce:

| Confianza | Acción | Ejemplo |
|-----------|--------|---------|
| 95 % o más (exacto) | Fusión automática con registro de auditoría | Misma dirección de correo + mismo número de teléfono |
| 70–94 % (probable) | Se muestra en la cola de revisión de duplicados para fusión manual | Nombre parecido + mismo código postal |
| Menos del 70 % | Se ignora salvo búsqueda manual | Solo el mismo apellido |

Los umbrales los configura cada organización. Los registros fusionados automáticamente quedan en el registro de auditoría con el motivo del cruce, y la fusión se puede deshacer dentro de la ventana de reversión de importaciones (30 días por defecto). Esto refina la postura de "sin fusión automática" de la ADR-004: los cruces exactos (95 % o más) con varios identificadores que se corroboran entre sí son seguros de fusionar automáticamente; la cola de revisión sigue ahí para los casos ambiguos.

### Actualización de los segmentos dinámicos

(Decidido en [ADR-016 §85](../../decisions/016-cross-cutting-resolutions.md))

Los segmentos dinámicos se recalculan por dos disparadores: **al acceder** (cuando alguien abre el segmento) y **por un trabajo diario en segundo plano** (para que la segmentación de campaña esté al día). La lista de segmentos muestra "Última actualización: [marca de tiempo]" en cada segmento. Los segmentos grandes (más de 50 000 contactos) muestran un estado de carga mientras se recalculan, en vez de datos desactualizados. La actualización manual está disponible con un botón en la pantalla de detalle del segmento.

---

## Arquitectura de identidad y autenticación

### Servicio de identidad de la plataforma

El servicio de identidad es un componente compartido de la plataforma, separado de cualquier organización:

```
┌───────────────────────────────────────────┐
│           Servicio de identidad           │
│                                           │
│  ┌────────────────┐ ┌──────────────────┐  │
│  │  Almacén de    │ │  Federación de   │  │
│  │  credenciales  │ │  perfiles        │  │
│  │  (passkeys,    │ │  (membresías de  │  │
│  │   OTP, etc.)   │ │   organización)  │  │
│  └────────────────┘ └──────────────────┘  │
│  ┌────────────────┐ ┌──────────────────┐  │
│  │  Gestor de     │ │  Servicio de     │  │
│  │  sesiones      │ │  recuperación    │  │
│  └────────────────┘ └──────────────────┘  │
└───────────────────────────────────────────┘
```

**Almacén de credenciales:** Llaves públicas de los passkeys, hashes de correo y contraseña (argon2id), tokens de enlace mágico, semillas de OTP, secretos TOTP. Nunca guarda credenciales en texto plano. Separado de las bases de datos de las organizaciones.

**Niveles de método de autenticación** (decidido en [ADR-016 §57–60](../../decisions/016-cross-cutting-resolutions.md)):

| Método | Disponibilidad | Notas |
|--------|-------------|-------|
| Passkeys sincronizados en la nube (iCloud Keychain, Google Password Manager) | Por defecto en todos los niveles | Resistencia al phishing + recuperación práctica. Atados al dispositivo solo en el nivel Máximo. |
| TOTP (Google Authenticator, etc.) | Opcional en los niveles Reforzado y Máximo | Funciona completamente sin conexión una vez configurado — crítico con conectividad intermitente |
| Enlace mágico (por correo) | Alternativa de reserva para dispositivos anteriores a WebAuthn (por debajo de Android 9 / iOS 16 / Chrome 109) | Se detecta automáticamente; la pantalla de inicio de sesión muestra el flujo adecuado |
| Contraseña (argon2id) | Disponible, pero no se fomenta | Reserva heredada |

La pantalla de inicio de sesión detecta automáticamente el soporte de WebAuthn. Los dispositivos por debajo del umbral de passkey reciben autenticación por enlace mágico de forma automática — nadie tiene que decidir nada.

**Federación de perfiles:** Mapea una identidad de plataforma con sus perfiles por organización. Cuando alguien inicia sesión, el servicio de identidad determina a qué organizaciones pertenece y a cuál dirigirla (o presenta un selector de organización si hay varias).

**Gestor de sesiones:** Emite y valida los tokens de sesión. Aplica la duración de sesión según el rol (decidido en users.md). Maneja la revocación remota — cuando un Coordinador de voluntarios revoca una sesión, el gestor invalida el token de inmediato.

**Servicio de recuperación:** Maneja el flujo de recuperación por contactos de confianza. Enruta las solicitudes de recuperación a los contactos designados. Emite flujos de configuración de credenciales nuevas después de una recuperación aprobada.

**Recuperación del OA — el problema del arranque** (decidido en [ADR-016 §59](../../decisions/016-cross-cutting-resolutions.md)): Cuando el primer OA no tiene contactos de confianza que respondan por él, aplica la recuperación asistida por la plataforma. El OA contacta al soporte de GreenGrass, que verifica su identidad por el canal de registro original (correo de alta, método de pago en archivo). Tras la verificación empieza un **período de espera de recuperación de 72 horas** — más largo que las 24 horas de la vía verificada entre pares, porque aquí no hay verificación entre pares. Durante el período de espera, todos los contactos de correo de la organización reciben una notificación. Es deliberadamente lenta y visible — es la vía de recuperación de mayor riesgo.

**DECIDIDO:** Principal centralizado en la jurisdicción de constitución, con réplicas de lectura por país.

- **Principal:** Los datos de identidad autoritativos viven en la jurisdicción de constitución (Estonia/Suiza). Todas las escrituras (creación de cuentas, cambios de credenciales, recuperación) van al principal. Protegido por el marco legal más fuerte disponible.
- **Réplicas de lectura:** Cada país con infraestructura de organizaciones tiene una réplica local para validar autenticación y sesiones con baja latencia. La replicación es de consistencia eventual con un retraso corto (segundos).
- **Conmutación ante fallos:** Si el principal no está accesible, las réplicas de lectura pueden seguir validando las sesiones existentes (tokens en caché). La creación de cuentas y los cambios de credenciales quedan en cola hasta que el principal se recupere.

### Flujo de autenticación

```
1. La persona entra a la app (subdominio de la organización o página de inicio de sesión)
2. El servicio de identidad presenta las opciones de autenticación (passkey, enlace mágico, OTP, contraseña)
3. La persona se autentica:
   a. Passkey: desafío WebAuthn → biometría del dispositivo → respuesta firmada → verificada
   b. Enlace mágico: se envía el correo → la persona hace clic → token verificado
   c. OTP: se envía el SMS → la persona escribe el código → verificado
   d. Contraseña: se envía → se compara el hash argon2id → verificada
4. El servicio de identidad emite el token de sesión:
   a. Token de acceso (de corta duración, JWT u opaco)
   b. Token de refresco (de mayor duración, guardado en el servidor)
   c. El token incluye: platform_identity_id, tenant_id, role_template_ids, scope_ids
5. Se dirige a la persona a la aplicación de la organización
6. La aplicación de la organización valida el token con el servicio de identidad en cada solicitud
```

### Autenticación en modo de campo

Para el trabajo de campo y las operaciones de campo:

```
1. El voluntario entra en modo de campo antes de quedarse sin conexión
2. El sistema emite un token de sesión de campo de duración extendida (lo que dura el turno)
3. Los datos de la lista de recorrido se descargan y se cifran en el dispositivo
4. Sin conexión: el token de sesión de campo se valida localmente (el dispositivo guarda un token firmado)
5. Cuando vuelve la conectividad: el token se revalida con el servicio de identidad y los datos se sincronizan
6. Al terminar el turno: el token expira y los datos se borran del dispositivo
```

### Aprobación de operaciones destructivas

(Decidido en [ADR-016 §53](../../decisions/016-cross-cutting-resolutions.md))

Las operaciones destructivas requieren la confirmación de un segundo OA:

- Eliminar la organización
- Revocar todas las llaves de API
- Bajar el nivel de seguridad
- Quitar la última integración de un tipo crítico (procesador de pagos, proveedor de SMS)

Los cambios de configuración rutinarios no requieren la aprobación de dos OA.

**Alternativa de reserva con un solo OA:** Si la organización tiene un solo OA, las operaciones destructivas requieren en su lugar un período de espera de 48 horas con confirmación por correo. Esto evita cambios catastróficos accidentales o hechos bajo coacción sin bloquear a las organizaciones con un único administrador.

**Referencia anticipada a la v2:** [Delegación de ajustes](../../decisions/016-cross-cutting-resolutions.md) (pilar de la v2) introducirá la delegación controlada de ajustes de bajo riesgo a roles que no sean OA. El flujo de aprobación de dos OA garantiza que, incluso con delegación, las operaciones más peligrosas sigan protegidas.

---

## Arquitectura de cifrado

### Jerarquía de llaves

```
Llave maestra de la plataforma (en poder de GreenGrass, respaldada por HSM)
├── Llave de cifrado del servicio de identidad (cifra los datos de identidad de plataforma)
├── Llave de la capa de federación (cifra los datos de coordinación entre organizaciones)
└── Llaves por organización
    ├── BYOK: llave maestra de la organización (generada y en poder de la organización)
    │   ├── Llaves de cifrado de datos (DEK — por tabla o por campo)
    │   └── Llaves de mensajería (llaves de cifrado E2E de las comunicaciones internas)
    └── Gestionada: llave maestra de la organización (en poder de GreenGrass, en Vault)
        ├── Llaves de cifrado de datos (DEK)
        └── Llaves de mensajería
```

### Cifrado de sobre

Todos los datos de la organización se cifran con cifrado de sobre:

1. Los datos se cifran con una **llave de cifrado de datos (DEK)** — una llave simétrica única para una tabla, un campo o una clase de registro.
2. La DEK se cifra con la **llave maestra de la organización (TMK)**.
3. La DEK cifrada se guarda junto a los datos cifrados.
4. Para descifrar: se recupera la TMK (del almacén de llaves de la organización en BYOK, o de Vault en el modo gestionado), se descifra la DEK y se descifran los datos.

**En las organizaciones con BYOK:** La TMK nunca toca la infraestructura de GreenGrass. La tiene la organización, en su propio sistema de gestión de llaves, o generada en el dispositivo de su administrador y con copia de seguridad mediante el reparto de secreto de Shamir entre varios Administradores de la organización.

### Cifrado a nivel de aplicación

(Decidido en security.md — los campos de alta sensibilidad llevan cifrado a nivel de aplicación además del de almacenamiento)

**Campos cifrados:** Puntajes de inclinación política, notas del trabajo de campo, identidad y datos de cumplimiento de los donantes, comunicaciones privadas de la candidatura, números de identificación nacional o electoral.

**Implementación:** Estos campos se cifran y se descifran en la capa de aplicación con DEK específicas del campo, antes de escribirse en la base de datos o de leerse de ella. La base de datos solo ve texto cifrado.

**El compromiso con la búsqueda:** Los campos cifrados no se pueden buscar ni indexar directamente. Opciones:
- **Índice ciego:** Se hashea el valor del campo con una llave específica de la organización para crear un índice buscable que no revela nada del texto plano. Solo admite coincidencia exacta.
- **Cifrado determinista:** El mismo texto plano produce siempre el mismo texto cifrado, lo que permite buscar por igualdad. Seguridad más débil (revela duplicados).
- **Descifrado en lectura:** Sin capacidad de búsqueda. Hay que cargar y descifrar para filtrar. Aceptable para campos que casi nunca se buscan, como las notas.

**DECIDIDO:** Cifrado buscable, con un enfoque por campo.

| Campo | Enfoque | Justificación |
|-------|----------|-----------|
| Teléfono, correo, identificación nacional | Índice ciego | Hace falta búsqueda exacta para deduplicar. Índice hasheado con una llave específica de la organización. |
| Notas del trabajo de campo, datos de cumplimiento | Descifrado en lectura | Se buscan pocas veces y la prioridad es la seguridad. Hay que cargar y descifrar para filtrar. |
| Puntajes de inclinación política | Descifrado en lectura | Se agregan en las cadenas de analítica, no se buscan uno por uno. |

### Cifrado de extremo a extremo en la mensajería

(Decidido en security.md — E2E por defecto, con custodia de llaves opcional)

```
Dispositivo emisor                                        Dispositivo receptor
┌────────────────┐                                        ┌────────────────┐
│ Genera la      │                                        │ Descifra el    │
│ llave de       │                                        │ mensaje        │
│ mensaje (MK)   │                                        │ con la MK      │
│                │      ┌──────────────────────┐          │                │
│ Cifra el       │─────→│ El servidor guarda:  │─────────→│ Descifra la MK │
│ mensaje        │      │ - el mensaje cifrado │          │ con su llave   │
│ con la MK      │      │ - la MK cifrada con  │          │ privada        │
│                │      │   la llave pública   │          │                │
│ Cifra la MK    │      │   de cada            │          └────────────────┘
│ con la llave   │      │   destinatario       │
│ pública de     │      └──────────────────────┘
│ cada           │
│ destinatario   │
└────────────────┘
```

**Gestión de llaves para E2E:**
- Cada persona genera un par de llaves pública y privada en su dispositivo durante la incorporación.
- Las llaves públicas se registran en el servicio de identidad.
- Las llaves privadas nunca salen del dispositivo.
- Varios dispositivos: cuando alguien añade un dispositivo nuevo, el dispositivo existente tiene que autorizarlo (transferir la llave privada cifrada con una llave específica del dispositivo, o volver a cifrar el historial de mensajes para el dispositivo nuevo).

**Modo de custodia de llaves (opcional, por organización):**
- Si la organización activa la custodia de llaves, las llaves de cifrado de los mensajes se cifran además con la llave maestra de la organización y se guardan en el servidor.
- El servidor puede descifrar los mensajes si hace falta (búsqueda, cumplimiento, recuperación).
- La interfaz indica claramente cuándo la custodia está activa.

### Experiencia de uso de la gestión de llaves BYOK

(Aplazado desde security.md — se resuelve aquí)

**Generación de llaves:**
1. Durante la puesta en marcha de la organización, el Administrador de la organización genera una llave maestra de la organización en su dispositivo.
2. La llave nunca se transmite a los servidores de GreenGrass.

**Copia de seguridad de la llave con el reparto de secreto de Shamir:**
1. La TMK se divide en N partes con un umbral de K (por ejemplo, 5 partes, 3 necesarias para reconstruirla).
2. Las partes se reparten entre los titulares designados (Administrador de la organización, Adjuntos, miembros de confianza de la junta).
3. Cada parte se muestra como código QR o como tarjeta de recuperación imprimible.
4. Ninguna persona sola tiene partes suficientes para reconstruir la llave.
5. Reconstruir la llave requiere que K titulares combinen sus partes, físicamente o de forma digital mediante una ceremonia segura.

**Rotación de llaves:**
- La rotación periódica se recomienda, pero no se obliga.
- La rotación vuelve a cifrar todas las DEK con una TMK nueva. Los datos en sí no se vuelven a cifrar (el cifrado de sobre lo permite).
- La rotación requiere acceso a la TMK actual (tienen que participar los titulares actuales).

**DECIDIDO:** Decide la organización, con orientación firme.

- La plataforma no impone un calendario de rotación. La organización elige cuándo rotar.
- **Orientación firme:** La plataforma recomienda activamente rotar ante eventos de seguridad — un titular de llave deja la organización, un dispositivo comprometido, después de una brecha, cambios grandes de personal. Aparece como avisos dentro de la aplicación, no solo en la documentación.
- **Fácil de ejecutar:** La rotación de llaves es un proceso guiado y de baja fricción en la interfaz de administración. Vuelve a cifrar las DEK con la TMK nueva. El Administrador de la organización la inicia y los titulares de llaves participan.
- **Recordatorios:** Si no hay rotación en 12 meses o más, la plataforma muestra un recordatorio no bloqueante al Administrador de la organización.

---

## Arquitectura sin conexión

### Motor de sincronización

El motor de sincronización sin conexión es el componente más complejo de la arquitectura. Tiene que manejar:

- **Descarga:** Listas de recorrido, registros de votantes (el subconjunto operativo), guiones de trabajo de campo, listas de equipo — en caché en el dispositivo para usarlos sin conexión.
- **Subida:** Interacciones del trabajo de campo, datos de inscripción de votantes, eventos de fin de turno — quedan en cola en el dispositivo y se sincronizan cuando vuelve la conectividad.
- **Resolución de conflictos:** Fusionar y marcar (decidido en workflows.md) — los registros en conflicto se conservan y se marcan para revisión humana.

```
┌─────────────────┐            ┌───────────────────┐           ┌──────────────┐
│  Dispositivo    │            │  Servidor de      │           │ BD de la     │
│                 │            │  sincronización   │           │ organización │
│ BD local        │◄──────────►│ Cola de sinc.     │──────────►│ BD principal │
│ (cifrada)       │  sincroniza│ Detección de      │  aplica   │              │
│                 │  cuando hay│ conflictos        │           │ Registro de  │
│ Cola de cambios │  conexión  │ Fusionar y marcar │           │ auditoría    │
│ pendientes      │            │                   │           │              │
└─────────────────┘            └───────────────────┘           └──────────────┘
```

### Almacenamiento en el dispositivo

- **Base de datos:** SQLite (cifrada con SQLCipher) en el dispositivo. Guarda los datos descargados de la lista de recorrido y las interacciones pendientes.
- **Cifrado:** La base de datos del dispositivo se cifra con una llave derivada del token de sesión de campo. Cuando la sesión expira o se revoca, la llave se destruye y los datos quedan ilegibles.
- **Alcance de los datos:** Solo datos operativos (decidido en workflows.md) — nombre, dirección, edad, resultado del contacto anterior, guion. Nada de registros completos de votantes.
- **Capacidad:** Las listas de recorrido tienen normalmente entre 50 y 200 direcciones. Los requisitos de almacenamiento en el dispositivo son modestos.

### Protocolo de sincronización

```
1. ANTES DEL TURNO (con conexión):
   a. El voluntario entra en modo de campo
   b. El dispositivo descarga la lista de recorrido asignada + el guion + la lista del equipo
   c. Los datos se cifran y se guardan localmente
   d. Se registra el punto de control de sincronización (el servidor sabe qué tiene el dispositivo)

2. DURANTE EL TURNO (sin conexión o intermitente):
   a. El voluntario registra las interacciones → quedan en la cola local de pendientes
   b. Cada registro lleva: device_id, local_timestamp, entity_id, change_type, payload
   c. Cuando se detecta conectividad:
      - Empujar los cambios pendientes al servidor de sincronización
      - Traer las actualizaciones (reasignaciones de territorio, direcciones nuevas en la lista de recorrido)
      - Actualizar el punto de control de sincronización

3. FIN DEL TURNO (con conexión):
   a. Sincronización final: empujar todos los cambios pendientes que queden
   b. El servidor de sincronización confirma la recepción
   c. Se dispara el evento de ciclo de vida del turno
   d. La base de datos local se borra (se destruye la llave de cifrado)

4. MANEJO DE CONFLICTOS:
   a. El servidor de sincronización detecta escrituras en conflicto (mismo entity_id, distintos device_id)
   b. Se guardan las dos versiones con una marca de conflicto
   c. El Gestor de datos ve los conflictos en la cola de revisión
   d. Resolución manual: elegir una, fusionar campos o crear registros separados
```

**DECIDIDO:** Event sourcing (el estado se deriva de un registro inmutable de eventos).

Todas las modificaciones de datos — con y sin conexión — se guardan como un registro de eventos inmutable. El estado se reconstruye reproduciendo los eventos.

**Por qué encaja:**
- El requisito de registro de auditoría completo significa que ya estamos guardando cada cambio. Con event sourcing, el registro de auditoría es la fuente de verdad y no una bitácora secundaria.
- Las interacciones sin conexión son eventos por naturaleza (se tocó una puerta, se registró una respuesta, se completó una inscripción), generados en un dispositivo y reproducidos en el servidor cuando vuelve la conectividad.
- Un conflicto son dos flujos de eventos de la misma entidad desde dispositivos distintos. Los dos flujos se conservan; el proceso de fusionar y marcar (decidido en workflows.md) es una persona revisando historiales de eventos que compiten entre sí.
- Permite consultas temporales ("cómo se veían los datos a las 3 de la tarde del día de trabajo de campo") para depuración, resolución de disputas y cumplimiento.

**Flujo de sincronización:**
- El dispositivo genera los eventos localmente con device_id y marcas de tiempo locales.
- Al sincronizar, los eventos se empujan al servidor y se añaden al registro de eventos de la organización.
- El servidor detecta los conflictos (eventos solapados de la misma entidad desde dispositivos distintos) y los marca.
- El estado actual es una vista materializada del registro de eventos, reconstruida por reproducción de eventos o mantenida de forma incremental.

---

## Arquitectura de conservación de datos

(Decidido en [ADR-016 §4](../../decisions/016-cross-cutting-resolutions.md). Deja sin efecto la conservación uniforme de 10 años de la [ADR-004](../../decisions/004-data-model-integrity.md) con un modelo escalonado más afinado.)

### Modelo de conservación de cuatro niveles

| Nivel | Qué se guarda | Conservación por defecto | Límites | ¿Se puede borrar? |
|------|---------------|-------------------|--------|------------|
| **Operativo** | Contenido completo: cuerpos de mensaje, adjuntos, respuestas del trabajo de campo, datos operativos de GOTV (Get Out The Vote — movilización del voto), bitácoras de turno | 2 años | 90 días – 5 años | Sí, pasado el mínimo |
| **Cumplimiento** | Registros financieros: detalles de donaciones, recibos, documentos fiscales, declaraciones de cumplimiento | Según la ley local | 5 – 10 años | No, hasta que venza el mínimo legal |
| **Registro de auditoría** | Solo metadatos de la acción (ver abajo) | Indefinida | — | No |
| **Reversión de importaciones** | Capacidad de deshacer importaciones de datos | 30 días | 7 – 90 días | Expira sola |

### Distinción entre metadatos y contenido

El registro de auditoría anota **que una acción ocurrió** — quién hizo qué, cuándo y sobre qué entidad. **No** guarda el contenido de la acción.

**Ejemplo — se envía un mensaje y luego se purga al vencer la ventana de conservación operativa:**

| Qué existe antes de la purga | Qué existe después de la purga |
|------------------------|----------------------|
| Nivel operativo: cuerpo completo del mensaje, adjuntos, contexto del hilo | **Borrado.** El cuerpo del mensaje y los adjuntos ya no están. |
| Registro de auditoría: "El miembro del personal A le envió un SMS al contacto B el 2026-03-04 a las 14:32 UTC" | **Conservado.** La entrada de metadatos permanece indefinidamente. |

Esta distinción es crítica por tres razones:

1. **Cumplimiento de privacidad:** Cuando un simpatizante pide que se borren sus datos, el contenido se purga del nivel operativo. El registro de auditoría conserva solo el registro de metadatos — nada de contenido personal.
2. **Almacenamiento:** Conservar indefinidamente registros de solo metadatos es viable. Conservar indefinidamente cuerpos de mensaje y adjuntos completos no lo es.
3. **Exposición legal:** Si se ve obligada por vía legal a entregar registros, la organización entrega metadatos (quién, qué, cuándo) — no el contenido completo de comunicaciones que pudo haberse purgado legítimamente.

### Cómo se concilia con la ADR-004

La ADR-004 estableció una "conservación de 10 años en todo el mundo" para los registros de auditoría, a partir del requisito de registros mercantiles de Líbano. La ADR-016 lo afina: el registro de auditoría (solo metadatos) se conserva **indefinidamente** — más de 10 años — mientras que el contenido operativo (cuerpos de mensaje, respuestas del trabajo de campo) sigue el nivel operativo, más corto. El nivel de cumplimiento (registros financieros) conserva entre 5 y 10 años según la jurisdicción, y abarca la intención original de la ADR-004. El efecto neto es una conservación *más fuerte* de lo que importa (los metadatos de auditoría) y una conservación *adecuada* del contenido (acotada por la privacidad y el almacenamiento).

### Ciclo de vida de la purga

```
El contenido entra al nivel operativo → el reloj de conservación arranca al crearlo
  → El OA configura la conservación dentro de los límites (por defecto: 2 años)
  → Al vencer: el contenido se purga, los metadatos de auditoría se conservan
  → Contenido del nivel de cumplimiento: la purga se bloquea hasta que venza el mínimo legal
  → Reversión de importaciones: expira sola, el OA no tiene que hacer nada
```

El OA configura los períodos de conservación dentro de los límites. El sistema hace cumplir los mínimos — un OA no puede poner la conservación de mensajes por debajo de 90 días. Los mínimos del nivel de cumplimiento se derivan de las jurisdicciones configuradas de la organización.

---

## Infraestructura de comunicaciones

### Correo electrónico

```
App de la organización → Cola de mensajes → Renderizador de correo → Servicio de envío → Destinatario
                                                                             │
                                                              Bucle de retroalimentación
                                                                (rebotes, quejas,
                                                                 aperturas, clics)
                                                                             │
                                                                  BD de participación
                                                                             │
                                                                Actualización del CRM
```

**Arquitectura de entregabilidad:**
- **Dominios de envío por organización** — cada organización configura SPF, DKIM y DMARC en su propio dominio (o en un subdominio de GreenGrass). Aísla la reputación de remitente por organización.
- **Calentamiento de IP** — las organizaciones nuevas empiezan en grupos de IP compartidas y pasan a IP dedicadas a medida que crecen el volumen y la reputación.
- **Procesamiento de rebotes y quejas** — supresión automática de los rebotes duros, bajas a partir de las quejas.
- **Limitación de frecuencia** — límites de tasa de envío por organización para proteger la entregabilidad.

**DECIDIDO:** Autoalojado, por país.

La infraestructura de correo se autoaloja en el despliegue de cada país. El contenido del correo son datos de la organización — no sale del país a través de un servicio de terceros.

- **MTA:** Autoalojado (Haraka o Postfix), desplegado dentro del clúster de K8s de cada país.
- **Dominios de envío por organización:** Cada organización configura SPF, DKIM y DMARC en su propio dominio. Aísla la reputación de remitente.
- **Gestión de IP:** Grupos de IP dedicadas por país. Las organizaciones nuevas se calientan poco a poco.
- **Monitoreo de entregabilidad:** Procesamiento automático de rebotes y quejas, seguimiento de reputación, paneles de entregabilidad.
- **Costo operativo:** Es significativo — la infraestructura de correo exige atención continua. La experiencia en entregabilidad debe formar parte del equipo de operaciones de GreenGrass.

<!-- REVISIT: Para la fase alfa en Puerto Rico, un servicio transaccional gestionado (Postmark, SES) puede ser lo pragmático mientras se construye la infraestructura autoalojada. La arquitectura permite cambiar el adaptador de correo por país. -->

### SMS / WhatsApp

```
App de la organización → Cola de mensajes → Enrutador de canales → Adaptador de proveedor → Pasarela de SMS / API de WhatsApp
                                                                              │
                                                                  Reportes de entrega
                                                              Enrutamiento de respuestas
```

**Arquitectura de canales:**
- **Capa de adaptadores independiente del proveedor** — abstrae SMS y WhatsApp tras una interfaz común, con adaptadores por proveedor y por país (Twilio, Vonage, proveedores locales).
- **API de WhatsApp Business** — requiere verificación del negocio, tiene reglas de mensajería basadas en plantillas y precio por mensaje. Los mensajes salientes tienen que usar plantillas preaprobadas; la mensajería libre solo dentro de la ventana de respuesta de 24 horas. La plataforma sigue el estado de aprobación de cada plantilla (Aprobada / Pendiente / Rechazada) consultando periódicamente la API de WhatsApp Business. El estado se muestra en línea en el redactor de mensajes, para que nadie intente enviar una plantilla rechazada o pendiente ([ADR-016 §18](../../decisions/016-cross-cutting-resolutions.md)).
- **Aplicación del consentimiento** — el enrutador de canales revisa el estado de consentimiento (por canal y por finalidad, decidido en workflows.md) antes de despachar cualquier mensaje.

### Redes sociales

```
App de la organización → Programador de publicaciones → Adaptador de plataforma → API de la red social
                                                                   │
                                                    Recolector de analítica → Panel
```

**Patrón de adaptadores modular:**
- Un adaptador por plataforma (Facebook, Instagram, Twitter/X, TikTok, etc.)
- Interfaz común: publish(post), schedule(post, time), getAnalytics(post_id)
- Los adaptadores absorben las particularidades de cada plataforma (límites de caracteres, formatos de medios, límites de solicitudes de la API)
- Se añaden plataformas nuevas escribiendo adaptadores nuevos, sin tocar el núcleo

### Motor de orquestación entre canales

(Capas 1 y 2 decididas en [ADR-016 §2](../../decisions/016-cross-cutting-resolutions.md); capa 3 en la [ADR-019](../../decisions/019-central-services-and-metered-billing.md))

Las comunicaciones se rigen por tres capas que se aplican al momento de enviar, en orden. Las dos primeras son de la propia organización. La tercera aplica solo a una organización que está en una alianza cuyo contrato de intercambio incluye el término de supresión.

**Capa 1 — Topes de frecuencia por canal** (decisión existente): Techos para toda la organización de contactos por canal y por período. Por ejemplo: máximo 2 correos por semana, máximo 1 SMS por día. Los configura el OA en los ajustes de comunicaciones.

**Capa 2 — Ventana de silencio entre canales** (nueva): Después de contactar a una persona por *cualquier* canal sobre un tema concreto, los mensajes del mismo tema por otros canales se suprimen durante una ventana configurable (por defecto: 24 horas). Se permiten temas distintos por canales distintos, hasta el tope de cada canal.

**Capa 3 — Supresión mutua entre organizaciones** (el primer servicio central, [ADR-019](../../decisions/019-central-services-and-metered-billing.md)): Para los destinatarios que pasan las capas 1 y 2, el enrutador le pregunta al servicio de supresión mutua si algún otro miembro de la alianza contactó a cada uno en los últimos N días, donde N es un término del contrato de intercambio de la alianza. La respuesta es una marca de sí/no por destinatario. No dice qué miembro, ni cuándo, ni por qué canal. Es la primitiva del piloto ([mvp.md § La primitiva de coordinación central: la supresión mutua](../../spec/mvp.md#la-primitiva-de-coordinación-central-la-supresión-mutua)) puesta en la ruta de envío.

- **Va última a propósito.** Una organización les pregunta a sus socios solo por las personas a las que de verdad está a punto de escribirles, nunca por su lista entera. Por quien las capas 1 y 2 retienen no se pregunta nunca.
- **Corre solo para la organización que envía.** Cada uno de los otros miembros responde desde su propio historial de contacto, dentro de su propia instancia, y lo que sale de esa instancia es la marca. El servicio combina las marcas y no guarda nada. A los otros miembros no se les representa: responden bajo el contrato que concedieron. No existe ningún libro compartido fuera de las organizaciones.
- **Direccional y revocable.** Un miembro solo responde a quien su contrato le concede el término de supresión. Retirar el término es unilateral y tiene efecto desde la llamada siguiente. Un registro cuya persona se dio de baja del intercambio de datos nunca produce una marca ([users.md § Intercambio entre organizaciones dentro de una alianza](../../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza)).
- **El cruce necesita un índice con llave de la alianza.** El índice ciego descrito en [Cifrado a nivel de aplicación](#cifrado-a-nivel-de-aplicación) lleva la llave de cada organización, así que por diseño no puede cruzar entre organizaciones. La supresión cruza sobre un segundo índice ciego de teléfono y correo normalizados, con una llave por contrato de alianza, porque las llaves se acotan a los contratos ([ADR-017 § Los compartimentos son el peldaño más bajo, no una primitiva nueva](../../decisions/017-sharing-contract-trust-model.md#los-compartimentos-son-el-peldaño-más-bajo-no-una-primitiva-nueva)). La llave la tienen los miembros, nunca GreenGrass, y rota cuando cambia la membresía, como las llaves de mensajería de la alianza según la [ADR-008](../../decisions/008-communications-messaging.md). El servicio ve tokens que no puede revertir.
- **Un miembro que no responde no es un veto.** Si la instancia de un miembro no responde dentro de la ventana de envío, el envío sigue sin las marcas de ese miembro y el registro del envío anota qué miembro no respondió. La caída de un miembro nunca detiene las operaciones de otro.
- **Preguntar queda a la vista.** El registro de auditoría de cada miembro que responde anota cada consulta que contesta: quién preguntó, bajo qué contrato, por cuántos destinatarios, cuántas marcas. Nunca los destinatarios mismos. Un miembro con la llave de la alianza podría calcular tokens de personas con las que no tiene relación y preguntar por ellas. El enrutador nunca lo hace, pero un miembro hostil podría saltarse su propio enrutador. El registro de auditoría deja ese tanteo a la vista y la revocación le pone fin; no se puede eliminar por diseño, por la misma razón que da [mvp.md § 8. Qué cuesta lo «igualitario» en la arquitectura](../../spec/mvp.md#8-qué-cuesta-lo-igualitario-en-la-arquitectura) sobre el poder de negociación.
- **Sin plano medido salvo que a GreenGrass le facturen por llamada.** La verificación no tiene proveedor. Salvo que un proveedor de nube le facture a GreenGrass por unidad por correrla, no genera ninguna factura medida, y según la ADR-019 entonces no hay nada que trasladar. Igual necesita un derecho de uso, y cada llamada igual emite un evento de uso, porque el evento es el registro de auditoría. Sus llamadas llevan solo tokens que GreenGrass no puede revertir, así que no sale del perímetro de cifrado y no necesita la aceptación explícita en el nivel Máximo.

**Aplicación:** El enrutador de canales revisa las tres capas, en orden, antes de despachar cualquier mensaje. Un mensaje que pasa el tope de su canal puede quedar aplazado igualmente por la ventana de silencio entre canales. Los mensajes aplazados se vuelven a evaluar en la siguiente ventana de envío. Un destinatario marcado por la supresión mutua se omite en vez de aplazarse, porque aplazarlo daría la misma respuesta hasta que se cumplan los N días, y la omisión queda anotada en el envío para que el equipo vea por qué bajó el conteo.

**Bitácora de contacto por persona:** El historial de contacto reciente de cada persona (canal, tema, marca de tiempo) se mantiene en la capa de caché para consultarlo rápido al momento de enviar. El historial de contacto de la organización es también desde donde responde a las consultas de supresión mutua de los otros miembros, a través del índice con llave de la alianza.

**Referencia anticipada a la v2:** El [Constructor visual de flujos](../../decisions/016-cross-cutting-resolutions.md) (pilar de la v2) orquestará secuencias multicanal dentro de un solo flujo. El modelo de tres capas aporta el sustrato de aplicación por el que enruta el constructor de flujos.

---

## Arquitectura de pagos

(Impulsada por geography.md — cada país tiene una infraestructura de pagos radicalmente distinta)

```
Formulario de donación → Enrutador de pagos → Adaptador de proveedor → Procesador de pagos
                                 │                                             │
                           Conversión                        Resultado de la transacción
                           de moneda                                          │
                           (si hace falta)                   Registro de la donación
                                                                              │
                                                             Actualización del CRM
                                                             Recibo
                                                             Bitácora de cumplimiento
```

### Patrón de adaptadores de pago

El mismo patrón modular que en comunicaciones — una interfaz común con adaptadores por proveedor:

| Adaptador | Países | Tipo |
|---------|-----------|------|
| Stripe | Global (alternativa de reserva) | Tarjetas, algunos métodos locales |
| ATH Móvil | Puerto Rico | Pago móvil |
| PIX | Brasil | Pago instantáneo (Banco Central) |
| PromptPay | Tailandia | Pago instantáneo |
| UPI | India | Ecosistema de pago instantáneo |
| OMT | Líbano | Transferencia de dinero |
| Efectivo | Todos | Registro presencial (sin procesador externo) |

**Interfaz común:**
```
PaymentAdapter {
  createPaymentIntent(amount, currency, donor_info) → PaymentIntent
  processPayment(payment_intent) → TransactionResult
  refund(transaction_id, amount) → RefundResult
  getTransactionStatus(transaction_id) → Status
  listTransactions(filters) → Transaction[]
  generateComplianceReport(date_range) → Report
}
```

**Multidivisa:** Las donaciones se registran en la moneda en que se hicieron. Los reportes pueden mostrarse en la moneda preferida de la organización, con las tasas de cambio registradas al momento de la transacción.

**Reparto de donaciones en la alianza:** Cuando una donación entra por una página de recaudación conjunta, el enrutador de pagos aplica las reglas de reparto (configuradas por campaña, decidido en workflows.md), registra la donación completa y atribuye las porciones repartidas a los registros financieros de cada organización miembro.

### Enrutamiento de las entradas a eventos

(Decidido en [ADR-016 §3](../../decisions/016-cross-cutting-resolutions.md))

Las entradas de pago a eventos se procesan por la cadena de recaudación de fondos. La compra de una entrada es un registro Donation con metadatos de evento (`event_id`, `ticket_type`, `ticket_quantity`). No hay una cadena de pagos aparte para los eventos.

- El **sistema de eventos** maneja: inscripción, seguimiento de asistencia, registro de entrada, capacidad
- El **sistema de recaudación de fondos** maneja: procesamiento de pagos, generación de recibos, seguimiento de cumplimiento, reembolsos
- La **política de reembolsos** es unificada: la rige la política del procesador de pagos más una ventana máxima configurable por la organización (por defecto: 90 días)

Las pantallas de eventos muestran los ingresos por entradas como métrica, pero enlazan al sistema de recaudación para el detalle financiero. En la mayoría de las jurisdicciones, las entradas a actos políticos se tratan legalmente como contribuciones — una sola cadena significa un solo conjunto de reglas de cumplimiento, un solo generador de recibos, un solo flujo de conciliación.

---

## Arquitectura de analítica

(Decidido en workflows.md — híbrido de tiempo real y por lotes)

```
┌────────────────────────┐     ┌──────────────────┐     ┌──────────────┐
│ App de la organización │────→│ Flujo de eventos │────→│ Agregador en │
│ (eventos)              │     │ (Kafka/NATS)     │     │ tiempo real  │──→ Paneles en vivo
└────────────────────────┘     └──────┬───────────┘     └──────────────┘
                                      │
                                      ▼
                               ┌────────────────────┐     ┌──────────────┐
                               │ Almacén de eventos │────→│ Procesador   │
                               │ (de solo adición)  │     │ por lotes    │──→ Reportes históricos
                               └────────────────────┘     └──────────────┘
```

### Cadena en tiempo real (operaciones activas)

- Los eventos que emite la aplicación de la organización (se tocó una puerta, se hizo una llamada, se recibió una donación, un voluntario registró su entrada) fluyen a un flujo de eventos.
- Un agregador en tiempo real mantiene contadores en marcha y empuja las actualizaciones a los paneles por WebSocket.
- Se usa durante: días de trabajo de campo, jornadas de llamadas, día de elecciones, campañas de recaudación en vivo.

### Cadena por lotes (análisis histórico)

- Los eventos se guardan de forma duradera en un almacén de eventos de solo adición.
- Los procesadores por lotes corren según un calendario (cada hora para los datos recientes, a diario para los más viejos) y calculan agregados, tendencias y reportes.
- Se usa para: tendencias de recaudación, crecimiento de voluntarios, análisis de participación, reportes de cumplimiento.

### Infraestructura de sondeo de los paneles

(Decidido en [ADR-016 §5, §88](../../decisions/016-cross-cutting-resolutions.md))

Todos los paneles usan sondeo periódico (no WebSockets) a intervalos escalonados. El sondeo se degrada de forma controlada en conexiones intermitentes; los WebSockets añaden complejidad de gestión de conexiones sin un beneficio proporcional a estas frecuencias de actualización.

**Intervalos de actualización escalonados:**

| Tipo de panel | Intervalo | Justificación |
|---------------|----------|-----------|
| Operativo (centro de mando de GOTV, operaciones de campo) | 30 segundos | Crítico en tiempo durante las operaciones activas |
| De campaña (recaudación de fondos, comunicaciones, eventos) | 5 minutos | Cambia a lo largo del día, no segundo a segundo |
| Administrativo (cumplimiento, calidad de datos, ajustes) | 15 minutos | Datos que se mueven despacio |

**Máquina de estados de actualidad** — obligatoria en todos los paneles:

| Estado | Indicador | Disparador |
|-------|-----------|---------|
| **Actual** | Marca de tiempo discreta: "Actualizado hace 30 s" | Antigüedad del dato < intervalo de actualización |
| **Actualizando** | Indicador de carga en lugar de la marca de tiempo | Sondeo en curso |
| **Desactualizado** | Aviso ámbar: "Los datos tienen más de 5 minutos" | Antigüedad del dato > 2× el intervalo de actualización |
| **Desconectado** | Banner rojo o ámbar permanente: "Sin conexión — mostrando datos en caché de [marca de tiempo]" | Red inalcanzable; no se puede descartar |

En los **paneles operativos** (centro de mando de GOTV, operaciones de campo), el indicador de actualidad es información ambiental de alta visibilidad — el color, la posición y el tamaño garantizan que se note sin prestarle atención activa. Quien toma decisiones urgentes el día de elecciones no puede confundir jamás datos desactualizados con datos actuales.

**El botón de actualización manual es obligatorio** en todos los paneles. La actualización automática se pausa cuando la pestaña del navegador no está visible (ahorra ancho de banda). Actualización inmediata al reconectar tras un período sin conexión.

**DECIDIDO:** NATS JetStream.

Transmisión de eventos liviana y duradera. Más simple de operar que Kafka y suficiente para el volumen de eventos por organización (miles de eventos al día, no millones por segundo). Un solo binario, fácil de desplegar por organización o como servicio compartido dentro del clúster de un país. Admite suscripciones duraderas para la cadena de analítica en tiempo real y reproducción de eventos para la arquitectura de event sourcing. Los eventos de uso de los servicios centrales ([ADR-019](../../decisions/019-central-services-and-metered-billing.md)) se publican en el mismo flujo por organización; la cadena de medición es un suscriptor duradero más.

---

## Arquitectura del día de elecciones

(Decidido en [ADR-016 §47–50](../../decisions/016-cross-cutting-resolutions.md))

El día de elecciones es el momento operativo de mayor riesgo. La arquitectura sostiene tres capacidades distintas: la ingesta de datos electorales, la verificación de la entrada de resultados y el transporte compartido en la alianza.

### Esquema e ingesta de los datos electorales

La plataforma define un **esquema estándar de datos electorales** para centros de votación, listas de candidaturas, límites de distrito y resultados. Dos vías de ingesta alimentan ese esquema:

| Vía | Cuándo | Cómo |
|------|------|-----|
| **Conector de API** | Jurisdicciones con fuentes legibles por máquina | Configuración por organización que apunta a la API de la autoridad electoral. Un adaptador por jurisdicción. |
| **Importación de CSV u hoja de cálculo** | En todos los demás casos (la mayoría de los contextos del Sur Global) | Carga manual con mapeo de columnas, validación y vista previa antes de confirmar. |

En la v1 no se promete la integración con ninguna autoridad electoral concreta. El valor está en el esquema estándar y en el flujo de importación manual. Los conectores de API se añaden por jurisdicción según la demanda.

### Cadena de verificación de la entrada de resultados

Los observadores electorales envían los resultados desde la app móvil. Cinco capas de verificación se acumulan sin frenar la velocidad:

| Capa | Mecanismo | ¿Bloquea? |
|-------|-----------|-----------|
| **Identidad** | Solo pueden enviar los observadores electorales registrados (vía GOTV-012) | Sí — el envío exige una identidad de observador autenticada |
| **Geolocalización** | Sello de GPS opcional (el observador cerca del centro de votación) | No — el GPS puede no estar disponible bajo techo |
| **Evidencia fotográfica** | Foto del acta o de la pizarra oficial de resultados | No — se adjunta para la auditoría, no bloquea |
| **Contraste cruzado** | Comparación lado a lado cuando varios observadores envían desde el mismo centro | No — marca las discrepancias para que las revise el centro de mando |
| **Registro de auditoría** | Todos los envíos son inmutables, con marca de tiempo, ID de quien envía e información del dispositivo | Siempre activo — no se puede borrar, por la política de conservación |

Ninguna capa bloquea por sí sola (salvo la identidad). Las capas se acumulan: una entrada fraudulenta necesitaría un observador registrado, en el lugar correcto, con una foto convincente y que cuadre con los envíos de los demás observadores. El panel del centro de mando resalta las discrepancias para revisión humana.

### Transporte compartido en la alianza

(Decidido en [ADR-016 §48](../../decisions/016-cross-cutting-resolutions.md))

Las organizaciones miembro de una alianza pueden aportar conductores a una bolsa compartida para el transporte a las urnas el día de elecciones. Es opcional por alianza y lo activa quien lidera la alianza en los ajustes de GOTV.

**Prioridad de asignación:** Primero los conductores de la propia organización, después la bolsa de la alianza. Cada organización ve en sus reportes solo los traslados que cubrieron sus propios conductores. El panel de la alianza muestra métricas agregadas de traslados.

**Límite de los datos:** Los datos de la solicitud de transporte (nombre del votante, dirección de recogida) se comparten solo con la organización del conductor asignado y solo mientras dura el traslado. Del transporte no queda ningún intercambio de datos permanente entre organizaciones.

---

## Arquitectura de localización

### Marco de internacionalización (i18n)

- **El soporte de RTL está diseñado desde el primer día.** Toda la maquetación tiene que usar propiedades lógicas (start/end), no físicas (left/right). Nada de RTL como añadido posterior.
- **Externalización de cadenas:** Todas las cadenas de la interfaz en archivos de idioma, nunca escritas a mano en el código. ICU MessageFormat para plurales, género y formatos complejos.
- **Negociación de idioma:** Preferencia de idioma de la identidad de plataforma → idioma por defecto de la organización → idioma del navegador → inglés como último recurso.

### Modelo de datos de la localización de contenido

(Aplazado desde geography.md — se resuelve aquí)

Los objetos de contenido (plantillas de correo, guiones de trabajo de campo, texto de los formularios de donación, descripciones de eventos, texto de las páginas de acción) guardan varias variantes de idioma:

```
ContentItem
├── id (UUID)
├── content_type (email_template | script | form_text | event_description | action_page)
├── variants[]
│   ├── language (etiqueta BCP 47: es, pt-BR, th, hi, ar, fr, en)
│   ├── body (el contenido)
│   ├── status (draft | ai_generated | human_reviewed | published)
│   ├── reviewed_by → Person (nullable)
│   └── reviewed_at
├── source_language (el idioma en que se redactó originalmente)
├── created_by → Person
└── created_at
```

**Integración de la traducción con IA:**
- Cuando alguien del equipo crea contenido en un idioma, la plataforma puede generar traducciones a los demás idiomas configurados de la organización.
- Las traducciones generadas por IA se marcan como `ai_generated` y tienen que revisarse antes de publicarse (decidido en geography.md).
- Memoria de traducción: las traducciones revisadas se guardan y se usan para mejorar la coherencia de las futuras traducciones con IA.

**Referencia anticipada a la v2:** La [Biblioteca compartida de contenidos](../../decisions/016-cross-cutting-resolutions.md) (pilar de la v2) ofrecerá gestión centralizada de activos con etiquetado, búsqueda, seguimiento de uso, gestión de derechos y reutilización entre funcionalidades. La v1 usa carga directa de archivos por campaña o publicación, con una sección de "cargas recientes" para una reutilización ligera.

---

## Integración de IA

**DECIDIDO:** BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA) — independiente del proveedor, configurado por la organización. Deja sin efecto el modelo híbrido anterior (llave gestionada frente a BYOK), según la [ADR-016 §38](../../decisions/016-cross-cutting-resolutions.md). Deja sin efecto la decisión de modelo de IA de la [ADR-013](../../decisions/013-analytics-ai.md).

### Arquitectura BYOM

```
┌─────────────────────────────────────────────────────────────────┐
│                    Capa de abstracción de IA                    │
│                                                                 │
│  Interfaz común: generate(prompt, context)                      │
│  Capacidades: generación de texto, traducción,                  │
│                resumen, preguntas y respuestas ancladas         │
│                en la base de conocimiento                       │
│                                                                 │
│  ┌────────────────┐  ┌────────────────────┐  ┌───────────────┐  │
│  │  Proveedor     │  │  Predeterminado    │  │  Registro de  │  │
│  │  propio de la  │  │  de la plataforma  │  │  proveedores  │  │
│  │  organización  │  │  (reserva)         │  │               │  │
│  │  (BYOM)        │  │                    │  │               │  │
│  └───────┬────────┘  └─────────┬──────────┘  └───────────────┘  │
└──────────┼─────────────────────┼────────────────────────────────┘
           │                     │
     API de IA de la       Modelo gestionado
     organización          por la plataforma
```

**Configuración de BYOM:** El OA configura su proveedor de IA en los ajustes — endpoint de la API, credenciales e identificador del modelo. Las funcionalidades de IA de la plataforma (generación de mensajes, traducción, concierge) pasan por el proveedor que configuró la organización. Sigue el mismo patrón de autosoberanía que BYOK para el cifrado.

**Predeterminado de la plataforma:** Las organizaciones sin infraestructura de IA propia reciben un modelo gestionado por la plataforma. Todas las funcionalidades de IA funcionan de entrada para las organizaciones más chicas.

**Interfaz independiente del proveedor:** La plataforma define lo que necesita (generación de texto con soporte de idiomas, salida estructurada, anclaje en fuentes), no qué modelo concreto. Una capa de abstracción absorbe las diferencias de API entre proveedores — el mismo patrón de adaptadores que se usa en pagos y comunicaciones.

**Interacción entre BYOK y BYOM:** Cuando una organización con BYOK configura un proveedor BYOM externo, los datos que se envían al proveedor de IA salen del perímetro de cifrado de la organización. Es una decisión informada de la organización — la plataforma muestra una advertencia clara durante la configuración de BYOM: *"Tu proveedor de IA recibirá los datos del prompt sin cifrar. Estos datos salen de tu límite de cifrado."* El OA tiene que aceptar ese compromiso. Las organizaciones en el nivel de seguridad Máximo que necesiten que los datos no salgan de su perímetro tienen que autoalojar su modelo de IA.

### Generación de mensajes de activismo

(Decidido en workflows.md — la IA genera un mensaje único por simpatizante, aprobado antes de enviarse)

```
Puntos de mensaje de la campaña + contexto del simpatizante
              │
              ▼
┌────────────────────────────┐
│  Servicio de               │
│  generación de             │
│  mensajes                  │
│                            │
│  - Puntos de mensaje       │
│  - Datos del simpatizante  │
│  - Datos del destinatario  │
│  - Tono y estilo           │
│  - Salvaguardas            │
└─────────────┬──────────────┘
              │
              ▼
  Mensaje generado
  (se le presenta al simpatizante para revisar, editar y aprobar)
```

**Salvaguardas:**
- El mensaje tiene que ceñirse a los puntos de mensaje de la campaña.
- Nada de hechos, estadísticas o afirmaciones inventadas que no estén en el material de origen.
- Idioma y tono apropiados para el destinatario (cargo electo, ente regulador).
- La información personal identificable se usa solo tal como la aporta el simpatizante.

**Formatos de salida:** Los mensajes se pueden enviar por correo o descargar como PDF con formato, para imprimirlos y enviarlos por correo postal ([ADR-016 §39](../../decisions/016-cross-cutting-resolutions.md)). El PDF incluye la dirección postal del destinatario, el cuerpo de la carta con formato y el nombre del simpatizante. El PDF se genera con el mismo contenido — solo cambia el formato de salida — así que es una cadena liviana de renderizado en el servidor, no una vía de generación aparte.

### Servicio de traducción

```
Contenido de origen → Servicio de traducción → Borrador generado por IA
                                                          │
                                               Cola de revisión humana
                                                          │
                                               Traducción publicada
```

La traducción usa la misma capa de abstracción BYOM. Las organizaciones con capacidades de IA multilingüe en su propio proveedor ganan continuidad de tono y terminología entre GreenGrass y sus otras herramientas.

### Concierge de IA

El concierge de ayuda dentro de la aplicación está anclado estrictamente en la base de conocimiento de la organización y en la documentación de la plataforma GreenGrass. Sin razonamiento más amplio ni conocimiento externo — una respuesta inventada sobre ley electoral o cumplimiento tiene consecuencias reales. Si una pregunta no se puede responder desde fuentes ancladas, el concierge dice "No tengo información sobre eso" y ofrece poner a la persona en contacto con soporte.

Detección de idioma: responde en el idioma en que se le escribe. Si la confianza de la detección es baja, recurre al idioma configurado en el perfil.

**Referencia anticipada a la v2:** La infraestructura BYOM permite que las organizaciones usen sus propios modelos ajustados para el concierge — modelos que entienden su terminología específica, su contexto organizativo y sus patrones de operación. Es aditivo; la restricción de anclaje (solo la base de conocimiento) se mantiene sea cual sea el modelo de fondo.

---

## Arquitectura de integraciones

### Integraciones con sistemas externos

```
┌──────────────┐     ┌──────────────────┐     ┌───────────────────┐
│ App de la    │◄───►│ Centro de        │◄───►│ Sistemas          │
│ organización │     │ integraciones    │     │ externos          │
│              │     │ ┌──────────────┐ │     │                   │
│              │     │ │ Adaptador:   │ │     │ - Comisión        │
│              │     │ │ comisión     │ │     │   electoral       │
│              │     │ │ electoral    │ │     │ - Pasarela de SMS │
│              │     │ ├──────────────┤ │     │ - Procesador      │
│              │     │ │ Adaptador:   │ │     │   de pagos        │
│              │     │ │ mapas y SIG  │ │     │ - Datos de mapas  │
│              │     │ ├──────────────┤ │     │ - Plataforma      │
│              │     │ │ Adaptador:   │ │     │   de video        │
│              │     │ │ plataforma   │ │     │ - API de redes    │
│              │     │ │ de video     │ │     │   sociales        │
│              │     │ └──────────────┘ │     └───────────────────┘
│              │     └──────────────────┘
└──────────────┘
```

**Patrón del centro de integraciones:**
- Todas las integraciones externas pasan por una capa común de adaptadores.
- Cada adaptador maneja la autenticación, la limitación de frecuencia, el manejo de errores y el mapeo de datos de un sistema externo.
- Los adaptadores son por organización (cada organización configura sus propias llaves de API, cuentas, etc.).
- Los datos que pasan por las integraciones quedan en el registro de auditoría.
- Los servicios centrales ([ADR-019](../../decisions/019-central-services-and-metered-billing.md)) se consumen a través de esta misma capa: un adaptador por servicio, una credencial acotada a esta organización y a este servicio, el mismo monitoreo de estado y el mismo registro de auditoría. Para la instancia de la organización, un servicio alojado en la plataforma y uno externo se ven igual.

**Monitoreo del estado de las integraciones** (decidido en [ADR-016 §56](../../decisions/016-cross-cutting-resolutions.md)):

El centro de integraciones ejecuta verificaciones de estado periódicas por integración (ping a la API, validez del token, marca de tiempo de la última sincronización correcta). El estado se muestra en la pantalla de ajustes de integraciones: Conectada (verde), Degradada (ámbar), Fallida (roja).

Escalamiento de las alertas:
1. Notificación en la aplicación al OA tras el primer fallo
2. Alerta por correo tras 3 fallos consecutivos
3. Banner de advertencia en el panel si una integración crítica (procesador de pagos, proveedor de SMS) está caída

La pantalla de detalle de la integración muestra una línea de tiempo de estado (últimos 30 días) para que el OA distinga los problemas intermitentes de los fallos sostenidos.

### API pública

**DECIDIDO:** REST + webhooks. API pública desde el primer día.

- **API REST:** Documentada, versionada, autenticada con OAuth2. CRUD completo sobre los recursos de la organización (contactos, donaciones, eventos, campañas, etc.), acotado por el rol y los permisos de quien llama.
- **Webhooks:** Notificaciones de eventos en tiempo real — donación recibida, alta de un voluntario, interacción de trabajo de campo registrada, confirmación de asistencia a un evento, etc. Las organizaciones configuran sus endpoints de webhook y eligen a qué eventos suscribirse.
- **Límite de solicitudes:** Por organización y por llave de API. Cada plan de precios define los límites por defecto. Los OA pueden ajustar los límites de cada llave de API dentro del techo de su plan ([ADR-016 §55](../../decisions/016-cross-cutting-resolutions.md)). Encabezados estándar en todas las respuestas: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- **No es un añadido posterior:** La API pública es la misma API que consume el frontend de GreenGrass. No hay puertas traseras privadas fuera del alcance de la API pública. Una organización puede construir sobre GreenGrass cualquier cosa que GreenGrass pueda construir.

Es un compromiso central con el modelo de soberanía — quien puede construir sobre la plataforma no queda atrapado en ella.

---

## Arquitectura de servicios centrales

(Decidido en la [ADR-019](../../decisions/019-central-services-and-metered-billing.md))

### Módulos internos y servicios centrales

Cada capacidad es una de dos cosas. Un **módulo interno** corre dentro de la instancia de la organización sobre sus propios datos: CRM, operaciones de campo, GOTV, recaudación de fondos, eventos, mensajería interna, redacción de comunicaciones. Activar uno por organización es activar funcionalidades por configuración dentro de una instalación de organización única; nada del aislamiento cambia. Un **servicio central** es una capacidad alojada en la plataforma que una organización activa desde el catálogo: captura de medios desde fuentes públicas, análisis electoral, entrega de investigación de la oposición, generación de texto, imagen y video, transporte por canal, y la verificación de supresión mutua del piloto. Los módulos internos los cubre la suscripción fija. Los servicios centrales cargan costos que a GreenGrass misma le facturan por unidad, y que se trasladan a la organización al costo, sin margen ([fundraising.md § Modelo de ingresos de la plataforma](../../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma)).

### Ejecución por organización

```
App de la organización ──► Adaptador (credencial acotada) ──► Servicio central ──► Proveedor
                                                                    │
                                                         corre bajo las llaves y
                                                         los contratos de la organización
                                                                    │
                                                         el resultado se escribe de vuelta
                                                         en la organización (en el compartimento,
                                                         si el contrato lo dice)
                                                                    │
                                                         evento de uso → flujo de la organización
                                                         (solo metadatos)
```

- **Una organización por llamada.** Un servicio central actúa para exactamente una organización, bajo su credencial, sus llaves y sus contratos de intercambio. La plataforma nunca es parte de un contrato, así que no hay vía desde una llamada hecha para la organización A hacia los datos de la organización B.
- **Nada se conserva.** El servicio no guarda corpus, índice, memoria ni caché de material derivado de la organización entre llamadas. El estado de trabajo vive dentro de la organización, cifrado con sus llaves. Un servicio que conservara estado derivado de la organización sería él mismo la vía de lectura de superusuario que la hoja de ruta de inteligencia de comunicaciones prohíbe.
- **El resultado aterriza según el contrato.** La investigación entregada a una organización aterriza en el compartimento que sus contratos especifiquen. El Administrador de la organización no puede leerla ahí; el Administrador de la plataforma no puede leerla en absoluto.
- **Los datos públicos son la excepción, y solo los datos.** Un corpus de captura construido a partir de medios públicos puede compartirse entre organizaciones dentro de un país. Las consultas contra él se acotan por organización y nunca se agregan, porque qué está vigilando una campaña no es público. Es el razonamiento de las teselas de mapa de la [ADR-012](../../decisions/012-external-integrations.md) aplicado a un corpus.

### Catálogo, derechos de uso y medición

La capa de plataforma gana un componente en tres partes, que guarda solo metadatos. Sus entidades están en el [Modelo de datos](#modelo-de-datos).

- **Catálogo.** Qué servicios existen, en qué países y en qué niveles de aislamiento, de qué proveedor, a qué precio unitario trasladado, y si una llamada lleva datos de la organización más allá del perímetro de cifrado.
- **Derechos de uso.** Uno por organización y por servicio, creado por un Administrador de la organización. Cada uno lleva una credencial acotada a esa organización y a ese servicio, consumida a través de la capa de adaptadores del centro de integraciones. Activar un servicio marcado como que sale del perímetro exige la misma aceptación explícita que la configuración de BYOM ([Arquitectura BYOM](#arquitectura-byom)). Cada derecho de uso lleva un tope de gasto con un aviso y un corte. Nada viene activado por defecto.
- **Medición.** Cada llamada emite un evento de uso en el flujo de eventos propio de la organización: organización, servicio, unidades, costo del proveedor, actor que invoca y contrato que rige. Los eventos de uso son metadatos del registro de auditoría según la ADR-016 §4 y nunca conservan contenido. La cadena de facturación y la vista de auditoría de la propia organización son ambas suscriptoras.

**Los derechos de uso acotan a cualquier agente futuro.** Un agente que actúa para una organización no puede tener credencial a ningún servicio que la organización no haya activado, y cada llamada que hace es un evento medido con un actor. Esto aporta el mecanismo de amplitud de credenciales que pide la [ADR-018](../../decisions/018-ai-agent-posture.md) sin resolver esa ADR ni añadir ninguna capacidad de agente.

### Derechos de uso pagados por la alianza

Una afiliación lleva un `billing_mode`: `member_pays` (por defecto) o `alliance_pays`. La alianza elige su valor por defecto en la puesta en marcha; cada miembro ve el modo que aplica antes de aceptar la afiliación; cambiarlo en una afiliación activa requiere a los dos Administradores de la organización. Bajo `alliance_pays`, los eventos de uso de los derechos de uso del miembro se facturan al estado de cuenta de la alianza. Pagar no es ver: los resultados siguen aterrizando en la organización miembro bajo sus llaves, y la alianza recibe servicio, unidades y costo, nunca contenido ni consultas.

### Disponibilidad por nivel de aislamiento

| Nivel | Servicios centrales |
|------|------------------|
| Estándar, Reforzado | Todos disponibles |
| Máximo | Los servicios cuyas llamadas llevan datos de la organización más allá del perímetro exigen la aceptación explícita de la frontera de cifrado. La captura la exige acotada a los metadatos de consulta. |
| Autoalojado | Llamadas remotas a la infraestructura de GreenGrass, desactivadas por defecto. Se activan bajo la misma aceptación, o se corre el paquete propio del servicio dentro del perímetro cuando GreenGrass publique uno. |

---

## Stack tecnológico

<!-- DECISION NEEDED: Decisiones de tecnología del núcleo.

Son las decisiones de mayor impacto en la velocidad de desarrollo, la contratación y el mantenimiento a largo plazo.

### Backend
Opciones:
- Node.js (TypeScript) — ecosistema grande, la E/S asíncrona encaja con las aplicaciones web, TypeScript aporta seguridad de tipos. La mayoría de quienes se contratan saben JS.
- Go — concurrencia excelente, compila a un solo binario (bueno para el autoalojamiento), rápido. Ecosistema más chico para aplicaciones web.
- Rust — máximo rendimiento y seguridad, curva de aprendizaje empinada, desarrollo más lento.
- Python (Django/FastAPI) — desarrollo rápido, ecosistema enorme, bueno para datos e integración con IA. Límites de rendimiento a escala.
- Elixir (Phoenix) — modelo de concurrencia excelente, funcionalidades en tiempo real de fábrica (LiveView), bolsa de talento más chica.

### Frontend
Opciones:
- React / Next.js — ecosistema dominante, comunidad enorme, soporte de SSR. Preocupa el tamaño del paquete con prioridad móvil.
- SvelteKit — paquetes más chicos, mejor rendimiento en dispositivos de gama baja, menos ecosistema.
- Progressive Web App (PWA) — basada en web, instalable, funciona sin conexión. Evita el control de acceso de las tiendas de apps.
- React Native / Flutter — apps móviles nativas. Mejor rendimiento, pero dos bases de código (o el sobrecosto de un framework multiplataforma).

### Database
Opciones:
- PostgreSQL — rica en funcionalidades, excelente para datos estructurados, soporte de JSON, PostGIS para datos geográficos. Estándar de la industria.
- SQLite (base de datos por organización) + PostgreSQL (plataforma) — SQLite por organización es liviana y basada en archivos, natural para el aislamiento de organización única. Pero con concurrencia limitada.
- CockroachDB — distribuida y compatible con PostgreSQL, con replicación integrada. Más compleja, puede ser excesiva por organización.

### Mobile / Offline
Opciones:
- PWA con service workers + IndexedDB — funcionamiento sin conexión basado en web, sin tienda de apps. Acceso limitado a las API nativas.
- PWA con SQLite (vía WASM o Capacitor) — basada en web con una base de datos sin conexión robusta.
- App nativa (React Native / Flutter) con SQLite — la mejor experiencia sin conexión, exige distribución por tienda de apps.
- Capacitor (envoltorio de web a nativo) — se escribe código web y se empaqueta como app nativa. Acceso a las API nativas, una sola base de código.

Estas decisiones están profundamente entrelazadas. La sección de recomendación de abajo propone un stack coherente. -->

### Stack decidido

| Capa | Tecnología | Justificación |
|-------|-----------|-----------|
| Backend | TypeScript (Node.js) con un framework por definir | Bolsa de talento grande, mismo lenguaje que el frontend, tipado fuerte, buena E/S asíncrona. Adecuado para una carga de trabajo cargada de integraciones. |
| Frontend | SvelteKit | Paquetes más chicos, algo crítico en dispositivos de gama baja y con bajo ancho de banda. SSR para la mejora progresiva. Menos ecosistema que React, pero mejor perfil de rendimiento para el contexto objetivo. |
| Móvil | Capacitor (SvelteKit → envoltorio nativo) | Una sola base de código para el lanzamiento. Web primero, con acceso a las API nativas cuando hace falta (cámara para el registro de entrada por QR, biometría para los passkeys, almacenamiento sin conexión). |
| Base de datos | PostgreSQL (por organización) | Rica en funcionalidades, PostGIS para datos geográficos, excelente soporte de JSON, probada a escala. Una instancia por organización. |
| Base de datos sin conexión | SQLite (SQLCipher) vía Capacitor | Almacenamiento cifrado sin conexión en el dispositivo. Liviana, probada, sin dependencia del servidor. |
| Caché | Redis | Gestión de sesiones, limitación de frecuencia, contadores en tiempo real. Una instancia o un espacio de nombres por organización. |
| Cola de trabajos | BullMQ (sobre Redis) o basada en PostgreSQL (Graphile Worker) | Procesamiento de tareas asíncronas: envíos de correo, despacho de SMS, importaciones de datos, sincronización. |
| Flujo de eventos | NATS JetStream | Transmisión de eventos liviana y duradera para la analítica en tiempo real. Más simple de operar por organización que Kafka. |
| Búsqueda | Meilisearch o texto completo de PostgreSQL | Meilisearch para búsqueda rápida y tolerante a erratas. El FTS de PostgreSQL como alternativa más simple que evita un servicio extra. |
| Almacenamiento de objetos | Compatible con S3 (MinIO para el autoalojamiento) | Cargas de archivos, medios, exportaciones, copias de seguridad. MinIO da API de S3 sobre cualquier infraestructura. |
| Gestión de secretos | HashiCorp Vault | Llaves de cifrado por organización, credenciales de API, rotación de secretos. |
| Orquestación de contenedores | Kubernetes (independiente del proveedor de nube) | Despliegue de contenedores por organización en todos los países. K8s gestionado donde lo haya, autogestionado donde haga falta. GKE no. |
| IaC | Terraform / OpenTofu | Infraestructura como código para aprovisionar la infraestructura de las organizaciones en distintos proveedores y países. |

### Hoja de ruta de iOS nativo

La app de SvelteKit envuelta en Capacitor es la estrategia de lanzamiento, pero la arquitectura tiene que permitir una futura app nativa de iOS en Swift sin exigir cambios en el backend.

**Restricciones de diseño que preservan esa opción:**
- **Arquitectura con la API primero:** El backend expone toda su funcionalidad por la API REST pública + webhooks. El frontend de SvelteKit y la app de Capacitor son consumidores de la API, no clientes privilegiados. Una futura app en Swift es un consumidor más.
- **Nada de lógica de negocio en el frontend:** Toda la autorización, la validación y el procesamiento de datos ocurren en el servidor. El frontend es una capa de presentación. Una app nativa puede replicar la experiencia sin reimplementar reglas de negocio.
- **El protocolo de sincronización sin conexión es independiente del cliente:** El protocolo de sincronización por event sourcing (empuje y traída de eventos, detección de conflictos) está definido a nivel de API, no acoplado a una implementación de cliente concreta. Una app en Swift implementa el mismo protocolo contra los mismos endpoints.
- **SQLCipher está disponible de forma nativa en iOS:** La base de datos sin conexión elegida (SQLite + SQLCipher) tiene soporte de pleno derecho en Swift, así que la arquitectura sin conexión se traslada directamente a una app nativa.
- **WebAuthn y los passkeys son nativos de la plataforma en iOS:** El flujo de autenticación con passkey funciona de forma nativa en los dispositivos de Apple — una app en Swift no necesita el puente de Capacitor.

---

## Arquitectura de despliegue

### Despliegue por país

```
País A (p. ej., EE. UU./Puerto Rico)      País B (p. ej., Brasil)
┌───────────────────────────────────┐     ┌───────────────────────────────────┐
│  Clúster de K8s                   │     │  Clúster de K8s                   │
│  ┌────────┐ ┌────────┐            │     │  ┌────────┐ ┌────────┐            │
│  │ Org. 1 │ │ Org. 2 │            │     │  │ Org. 5 │ │ Org. 6 │            │
│  └────────┘ └────────┘            │     │  └────────┘ └────────┘            │
│  ┌────────┐                       │     │  ┌────────┐                       │
│  │ Org. 3 │                       │     │  │ Org. 7 │                       │
│  └────────┘                       │     │  └────────┘                       │
│                                   │     │                                   │
│  Servicios de plataforma (locales)│     │  Servicios de plataforma (locales)│
│  - Réplica de identidad           │     │  - Réplica de identidad           │
│  - Agente de aprovisionamiento    │     │  - Agente de aprovisionamiento    │
│  - Monitoreo                      │     │  - Monitoreo                      │
└───────────────────────────────────┘     └───────────────────────────────────┘
                  │                                         │
                  └────────────────────┬────────────────────┘
                                       │
                        ┌─────────────────────────────┐
                        │  Plataforma central         │
                        │  (jurisdicción de           │
                        │   constitución)             │
                        │                             │
                        │  - Identidad principal      │
                        │  - Capa de federación       │
                        │  - Admin. de la plataforma  │
                        │  - Facturación              │
                        │  - Orquestador de           │
                        │    aprovisionamiento        │
                        └─────────────────────────────┘
```

### Despliegue autoalojado

Para las organizaciones autoalojadas, GreenGrass entrega:

- **Paquete de la aplicación:** Imágenes de contenedor, charts de Helm, plantillas de configuración.
- **Documentación de instalación:** Guía de despliegue paso a paso.
- **Mecanismo de actualización:** Versiones publicadas, scripts de migración, proceso de actualización con un solo comando.
- **Endpoint de verificación de estado:** Las instalaciones autoalojadas pueden, si quieren, reportarse para recibir avisos de actualización y monitoreo de estado (opcional, no obligatorio).
- **Sin telemetría por defecto.** Las organizaciones autoalojadas no comparten nada con GreenGrass a menos que lo elijan.

**DECIDIDO:** Actualización automática con reversión y notificaciones prominentes.

- **Actualización automática por defecto:** Las instalaciones autoalojadas buscan actualizaciones y las aplican solas durante una ventana de mantenimiento configurable. Reversión automática si falla — si las verificaciones de estado no pasan después de actualizar, el sistema vuelve a la versión anterior.
- **Notificaciones prominentes:** Antes, durante y después de cada actualización, el Administrador de la organización recibe notificaciones claras y prominentes — qué se actualiza, cuándo, qué cambió y si la actualización funcionó o se revirtió. Nada de actualizaciones silenciosas.
- **Las actualizaciones de seguridad son inmediatas:** Los parches críticos de seguridad se saltan la ventana de mantenimiento y se aplican lo antes posible, con notificación.
- **Opción de aplazar:** El Administrador de la organización puede aplazar las actualizaciones que no sean de seguridad por un tiempo limitado (por ejemplo, hasta 2 semanas) si el momento es malo (a mitad de una elección). Los parches de seguridad no se pueden aplazar.
- **Transparencia del changelog:** Cada actualización incluye un registro de cambios legible. Que el código de la aplicación sea abierto significa que la organización puede inspeccionar cada cambio antes o después de aplicarlo.

---

## Preguntas abiertas — todas resueltas

1. ~~Orquestación de contenedores~~ → Kubernetes, independiente del proveedor de nube, sin GKE
2. ~~Ubicación del servicio de identidad~~ → Principal centralizado + réplicas de lectura por país
3. ~~Datos geográficos~~ → Precargados + importación + aporte de la comunidad
4. ~~Cifrado buscable~~ → Índice ciego para los identificadores, descifrado en lectura para notas y puntajes
5. ~~Rotación de llaves~~ → Decide la organización, con orientación firme
6. ~~Protocolo de sincronización~~ → Event sourcing
7. ~~Transmisión de eventos~~ → NATS JetStream
8. ~~Infraestructura de correo~~ → Autoalojada, por país
9. ~~Modelos de IA~~ → ~~Híbrido (API externa con llave gestionada, autoalojado para BYOK)~~ → **BYOM** (Bring Your Own Model) — las organizaciones configuran su propio proveedor de IA; la plataforma ofrece un modelo por defecto como alternativa de reserva. Deja sin efecto el modelo híbrido, según la [ADR-016 §38](../../decisions/016-cross-cutting-resolutions.md).
10. ~~API pública~~ → REST + webhooks, desde el primer día
11. ~~Stack tecnológico~~ → Validado (TypeScript/SvelteKit/Capacitor/PostgreSQL), con la vía a iOS nativo preservada
12. ~~Actualizaciones de las instalaciones autoalojadas~~ → Actualización automática con reversión + notificaciones prominentes
13. ~~URL de las organizaciones~~ → Subdominio por defecto + soporte de dominio propio
14. ~~Conservación de datos~~ → Escalonada (operativa / cumplimiento / auditoría / reversión de importaciones), según la [ADR-016 §4](../../decisions/016-cross-cutting-resolutions.md). Deja sin efecto la política uniforme de 10 años de la ADR-004.
15. ~~89 preguntas abiertas de los wireframes~~ → Todas resueltas, según la [ADR-016](../../decisions/016-cross-cutting-resolutions.md)
16. ~~Capacidades compartidas y costo por uso~~ → Servicios centrales ejecutados por organización, con traslado al costo medido por uso y sin margen, según la [ADR-019](../../decisions/019-central-services-and-metered-billing.md). Enmienda el modelo de ingresos solo fijo de la ADR-007.
