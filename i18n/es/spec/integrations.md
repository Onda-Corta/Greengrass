# Integraciones externas

## Propósito

Este documento especifica la estrategia de integraciones externas de GreenGrass: los servicios, las fuentes de datos y los sistemas de terceros a los que se conecta la plataforma. Parte de la arquitectura del hub de integraciones definida en system.md (patrón de adaptador, interfaces comunes, configuración por organización) y resuelve lo que quedaba pendiente sobre fuentes de datos electorales, GIS y mapas, pasarelas de SMS, telefonía y monitoreo.

Toda integración externa sigue el mismo patrón: una interfaz común con adaptadores por proveedor, credenciales configurables por organización, límites de tasa, manejo de errores y registro en el registro de auditoría. Este documento especifica *con qué* nos integramos y *cómo*, no la arquitectura del adaptador en sí (eso está en system.md).

## Principios de integración

1. **Nada de dependencia de un proveedor.** Cada integración es un adaptador detrás de una interfaz común. Cambiar de proveedor implica escribir un adaptador nuevo, no rehacer la arquitectura.
2. **Flexibilidad por país.** Cada país necesita proveedores distintos. La plataforma soporta varios adaptadores activos por categoría de integración, elegidos por organización o por país.
3. **Las credenciales son de la organización.** Cada organización trae sus propias llaves de API y cuentas para los servicios externos. GreenGrass facilita la conexión pero no intermedia (coherente con la decisión de comercio directo en fundraising.md).
4. **Prioridad sin conexión donde aplique.** Las integraciones que sostienen la operación de campo (mapas, sincronización de datos) tienen que degradarse con gracia cuando no hay conectividad.
5. **Auditar todo.** Todos los datos que pasan por las integraciones quedan en el registro de auditoría.

## Datos electorales y padrones

### Datos de demarcación electoral

Las demarcaciones electorales (distritos, precintos, circunscripciones, centros de votación) son la base del trabajo de campo, el GOTV (Get Out The Vote — movilización del voto) y la segmentación de votantes. Cada país tiene una geografía administrativa completamente distinta.

#### Fuentes de datos por país

| País | Fuente | Formato de datos | Frecuencia de actualización | Método de acceso |
|---------|--------|------------|-----------------|--------------|
| Puerto Rico | US Census Bureau (TIGER/Line), Comisión Estatal de Elecciones de PR (CEE) | Shapefiles, GeoJSON | Tras la redistribución (cada 10 años para el Census, por ciclo para la CEE) | Descarga pública |
| Brasil | IBGE (Instituto Brasileiro de Geografia e Estatística), TSE | Shapefiles, CSV | Por ciclo electoral | Descarga pública |
| Tailandia | Election Commission of Thailand (ECT) | Varía — puede requerir digitalización manual | Por ciclo electoral | Publicación gubernamental, acceso digital posiblemente limitado |
| India | Election Commission of India (ECI), Survey of India | Shapefiles, KML | Por ejercicio de delimitación | Parcialmente público; algunos datos requieren solicitud oficial |
| Líbano | Ministerio del Interior, Administración Central de Estadística | Disponibilidad digital limitada | Poco frecuente — la última revisión mayor de demarcaciones fue con la Ley Electoral de 2017 | Puede requerir digitalización manual desde mapas oficiales |

**DECIDIDO: híbrido — mantenido por GreenGrass en los países objetivo + importación por la organización en los demás.** GreenGrass adquiere, limpia y mantiene conjuntos de datos curados de demarcaciones electorales para los cinco países objetivo, actualizados en cada ciclo electoral. Las organizaciones de otros países importan sus propios datos con las herramientas de importación de la plataforma (GeoJSON, Shapefile, KML). Un modelo de contribución comunitaria permite que las organizaciones devuelvan a GreenGrass los conjuntos que importaron, para sumarlos a la biblioteca curada. Meta a largo plazo: que GreenGrass sea una fuente única y confiable de datos de demarcación electoral, sobre todo en el Sur Global, donde esos datos están fragmentados y son difíciles de conseguir.

#### Formato de los datos de demarcación

- **Almacenamiento interno:** GeoJSON (estándar, bien soportado, legible por humanos)
- **Soporte de importación:** GeoJSON, Shapefiles (.shp), KML/KMZ, TopoJSON
- **Soporte de exportación:** GeoJSON, Shapefiles
- **Sistema de coordenadas:** WGS 84 (EPSG:4326) — coordenadas GPS estándar, universales

#### Jerarquía de demarcaciones

Cada país tiene una jerarquía administrativa distinta. La jerarquía geográfica configurable de la plataforma (system.md) tiene que poder mapear a:

| País | Jerarquía (de arriba → abajo) |
|---------|------------------------|
| Puerto Rico | Isla → Distrito Senatorial → Distrito Representativo → Municipio → Barrio → Precinto |
| Brasil | Estado (Estado) → Municipio (Município) → Zona Electoral (Zona Eleitoral) → Sección Electoral (Seção Eleitoral) |
| Tailandia | Provincia (Changwat) → Distrito (Amphoe) → Subdistrito (Tambon) → Circunscripción |
| India | Estado → Circunscripción Parlamentaria → Circunscripción de Asamblea → Centro de Votación (Booth) |
| Líbano | Gobernación (Muhafazah) → Distrito (Qada) → Circunscripción (según la ley de 2017) |

### Integración del padrón electoral

El padrón electoral (los registros oficiales de inscripción de votantes) es una fuente de datos central para cualquier campaña. El acceso, el formato y la legalidad varían muchísimo de un país a otro.

#### Acceso al padrón electoral por país

| País | Disponibilidad del padrón | Formato | Método de acceso | Restricciones legales |
|---------|----------------------|--------|---------------|-------------------|
| Puerto Rico | Disponible en la CEE | Exportación CSV/base de datos | Solicitud oficial o registros públicos | Aplican las regulaciones estadounidenses sobre padrones |
| Brasil | El TSE provee datos de votantes (limitados) | CSV | Portal de datos abiertos del TSE (campos limitados) | La LGPD restringe el uso de datos personales |
| Tailandia | La ECT mantiene los padrones | Varía | Acceso público limitado | Restricciones de la PDPA sobre datos políticos |
| India | La ECI provee los padrones electorales | PDF (!) y formatos digitales limitados | Acceso a nivel estatal, descargable del sitio de la ECI | Algunos estados restringen el acceso masivo |
| Líbano | El Ministerio del Interior mantiene los padrones | Disponibilidad digital limitada | Los partidos políticos reciben padrones actualizados antes de las elecciones | Los datos de registro confesional son políticamente sensibles |

**DECIDIDO: ambos — sincronización por API + importación estructurada con mapeo inteligente.** Sincronización por API cuando exista (para estar listos a medida que las comisiones electorales se modernicen). Carga de archivos con mapeo inteligente como respaldo universal: mapeador de columnas configurable, detección de codificación, sugerencias de campo, vista previa de deduplicación. La interfaz de importación con mapeo inteligente es una prioridad de UX — los padrones vienen sucios y la mayoría del personal de campaña no son ingenieros de datos. Que este flujo sea intuitivo es crítico.

#### Manejo de los datos del padrón

- Todos los datos de padrón importados quedan sujetos al mismo cifrado y a los mismos controles de acceso que el resto de los datos del CRM
- Aplica la clasificación de datos políticos (todo se trata como sensible, según compliance.md)
- La importación crea entradas en el registro de auditoría (quién importó, cuándo, cuántos registros, hash del archivo de origen)
- La deduplicación corre automáticamente contra los registros existentes con coincidencia compuesta (teléfono como campo principal, según users.md)
- Los registros importados quedan etiquetados con su origen y su fecha de importación, para poder rastrear la procedencia

### Integración con comisiones electorales

La integración directa por API con las comisiones electorales es rara, pero vale mucho donde existe.

| País | Disponibilidad de API | Integraciones posibles |
|---------|-----------------|----------------------|
| Puerto Rico | FEC API (federal), CEE (limitada) | Verificación de radicaciones ante la FEC, estado de registro de la campaña |
| Brasil | APIs del TSE (DivulgaCandContas, Candidaturas) | Divulgación de financiamiento de campaña en tiempo real, datos de registro de candidaturas |
| India | APIs limitadas de la ECI | Consulta del padrón electoral (limitada), calendario electoral |
| Tailandia | ECT — no se conoce API pública | Intercambio manual de datos |
| Líbano | SCE — no se conoce API pública | Intercambio manual de datos |

**DECIDIDO: listos para API, pero manual primero.** Diseñar los puntos de integración (los espacios de adaptador) para todas las APIs de comisiones electorales, pero implementar flujos manuales (carga y descarga de archivos) para todos los países al inicio. Construir las integraciones por API solo cuando un piloto concreto lo exija (por ejemplo, la divulgación en tiempo real del TSE en Brasil puede forzar el tema). Nada de integraciones especulativas con comisiones cuyas APIs no hemos validado.

## GIS y mapas

### Proveedor de mapas

La plataforma necesita mapas para: visualizar los territorios de campo, trazar rutas de listas de recorrido, ver la distribución geográfica de los votantes, mostrar ubicaciones de eventos y hacer analítica geográfica.

**DECIDIDO: híbrido, con OSM por defecto.** Teselas de OSM autoalojadas (vía OpenMapTiles o Protomaps) como opción por defecto para todo el despliegue de mapas — gratis, soberano, y ningún tercero ve los patrones del trabajo de campo. Los servicios comerciales quedan como respaldo donde la calidad o la cobertura de las teselas OSM no alcance para una región específica. La infraestructura de teselas se autoaloja en el clúster de K8s de cada país.

### Mapas sin conexión

La operación de campo (trabajo de campo, jornadas de inscripción de votantes) tiene que funcionar sin conectividad. La capa de mapas debe soportar:

- **Teselas descargadas por adelantado** para los territorios asignados — se descargan al inicio del turno y se usan sin conexión
- **Geocodificación sin conexión** — resolución básica de dirección a coordenadas sin red (se acepta precisión limitada)
- **Rutas sin conexión** — indicaciones básicas paso a paso o a pie dentro del área descargada
- **Sincronización al reconectar** — todo dato de ubicación capturado sin conexión se sincroniza cuando vuelve la conectividad

### Geocodificación

Convertir direcciones en coordenadas (y al revés) hace falta para procesar el padrón, asignar trabajo de campo y hacer analítica geográfica.

**DECIDIDO: híbrido, autoalojado por defecto.** Pelias o Nominatim autoalojados para las operaciones masivas (procesamiento del padrón, geocodificación por lotes) — los datos se mantienen soberanos en las cargas pesadas. Geocodificación comercial (el proveedor se define en la implementación) para la experiencia en tiempo real (autocompletado de direcciones en formularios, consulta de una sola dirección) donde la precisión del autoalojado no alcance. El mismo patrón de soberanía primero que en los mapas.

### Manejo de territorios

El territorio (el área geográfica que se asigna a un equipo de campo) es un concepto central de la plataforma. La integración de mapas tiene que soportar:

- **Dibujar territorios** sobre un mapa — el equipo traza los límites haciendo clic o tocando el mapa
- **Territorios autogenerados** — la plataforma sugiere límites según la densidad de votantes, la distancia a pie y los accidentes geográficos
- **Asignación de territorios** — asignar territorios a voluntarios o equipos y seguir la cobertura
- **Optimización de la lista de recorrido** — generar rutas a pie eficientes dentro de un territorio
- **Visualización de cobertura** — mapas de calor que muestran las áreas ya recorridas y las que faltan

**DECIDIDO: ruteo integrado.** Motor de ruteo de código abierto autoalojado (OSRM, Valhalla o GraphHopper — la elección concreta se hace en la implementación). Las rutas se precalculan al inicio del turno y quedan en caché en el dispositivo para uso totalmente sin conexión. Coherente con el patrón de soberanía primero y prioridad sin conexión que atraviesa todas las integraciones de GIS.

## Pasarelas de SMS y mensajería

### Estrategia de proveedores de SMS

Ya decidido en system.md: una capa de adaptadores agnóstica del proveedor, con proveedores por país. Esta sección especifica la estrategia país por país.

**DECIDIDO: híbrido — proveedor global como respaldo + proveedores locales donde convenga.** El mismo patrón que en pagos, mapas y geocodificación. Un proveedor global (Twilio, Vonage o MessageBird) como base y respaldo. Proveedores locales en los países donde ofrezcan ventajas claras de entregabilidad o precio. El patrón de adaptador hace que esto sea transparente para la aplicación.

#### Panorama de SMS por país

| País | Proveedores locales | Cobertura de proveedores globales | Notas |
|---------|----------------|------------------------|-------|
| Puerto Rico | Los proveedores estadounidenses funcionan | Twilio, Vonage — cobertura completa en EE. UU. | Infraestructura SMS estadounidense estándar. El cumplimiento de TCPA es crítico. |
| Brasil | Zenvia, Infobip (regional), Twilio | Buena cobertura global | Cultura de alto volumen de SMS. Los códigos cortos son comunes. La mensajería A2P requiere aprobación regulatoria. |
| Tailandia | AIS, DTAC, TrueMove (directo con la operadora o vía agregadores) | Twilio está disponible pero sale más caro | Hace falta un número tailandés para mensajería doméstica. Los agregadores locales tienen mejores tarifas. |
| India | Kaleyra, MSG91, Gupshup, Twilio | Twilio disponible | El SMS A2P exige registro DLT. El registro de Sender ID es obligatorio. Mensajería basada en plantillas. Volumen altísimo, costo bajísimo. |
| Líbano | Alfa, Touch (dos operadoras, ambas con influencia estatal) | Cobertura limitada de proveedores globales | Infraestructura poco confiable. La entrega de SMS puede ser inconsistente. WhatsApp suele ser más confiable que el SMS. |

### WhatsApp Business API

Ya decidido: manejo de canales con conciencia del TSE para Brasil. La integración con WhatsApp vía Business API requiere:

- **Verificación de negocio** ante Meta
- **Mensajes de plantilla** — plantillas de mensaje preaprobadas para los envíos salientes (lo exige la política de WhatsApp)
- **Mensajería de sesión** — respuestas de formato libre dentro de la ventana de 24 horas después de que el usuario inicia el contacto
- **Una cuenta de WhatsApp Business por organización** — cada organización necesita su propia cuenta de negocio verificada (coherente con el patrón de comercio directo)

**DECIDIDO: API directa con Meta, más acompañamiento en la puesta en marcha.** Cada organización se registra directamente con Meta — sin sobreprecio de intermediarios, y la relación es suya. El proceso de verificación de Meta es complicado, así que GreenGrass ofrece un servicio de acompañamiento (humano o asistido por IA) para guiar a la organización por la verificación, la creación de la cuenta de negocio y la aprobación de plantillas. Mejor una fricción de una sola vez al arrancar que un sobreprecio permanente por mensaje de un BSP.

### Provisión de números

El SMS necesita números de envío (long codes, short codes o números libres de cargo, según el país y el caso de uso).

**DECIDIDO: los provee la organización, con orientación de GreenGrass.** Los números son de la organización. GreenGrass ofrece guías de configuración por país, recomendaciones de tipo de número (long code contra short code contra libre de cargo) y listas de verificación de cumplimiento (registro DLT en India, registro 10DLC en EE. UU., aprobación A2P en Brasil, etc.). Coherente con el patrón de comercio directo que atraviesa todas las integraciones.

## Telefonía (jornadas de llamadas)

### Estrategia de proveedores

Ya decidido en workflows.md: BYOP para el MVP, integración híbrida para el piloto. La integración híbrida necesita un proveedor de telefonía.

**DECIDIDO: híbrido — base global + proveedores locales donde salga a cuenta.** El mismo patrón que en SMS, pagos y mapas. Un proveedor global (Twilio Voice o equivalente) como base, y proveedores VoIP locales donde ofrezcan ventajas de costo significativas para llamadas de alto volumen.

### Funcionalidades de la jornada de llamadas (fase piloto)

Cuando la plataforma pase de BYOP a telefonía integrada:

- **Llamada con un clic** — el voluntario hace clic en un contacto dentro de la plataforma y la llamada se inicia a través del proveedor
- **Registro de llamadas** — duración, resultado (contestó, buzón de voz, no contestó, número equivocado) y notas se registran automáticamente
- **Enmascaramiento de número** — el número personal del voluntario no le queda visible a quien recibe la llamada (funcionalidad de privacidad crítica que BYOP no tiene)
- **Marcador con vista previa** — el voluntario ve los datos del contacto antes de que empiece la llamada (no es un marcador predictivo ni automático — esos tienen implicaciones de TCPA en EE. UU.)
- **Guiones de llamada** — el guion se muestra junto a la interfaz de llamada, con ramificaciones según las respuestas
- **Lista de no llamar** — la plataforma aplica las listas DNC (federales, estatales, y las bajas por campaña)

## Integración con plataformas de video y eventos

Ya decidido en workflows.md: integración externa con puente de inscripción.

### Plataformas soportadas

**DECIDIDO: Zoom + Jitsi.** Zoom para el uso mayoritario (cuota de mercado dominante), Jitsi para las organizaciones que quieran video de código abierto y autoalojado (alineado con los valores de soberanía de la plataforma). Dos adaptadores cubren la enorme mayoría de los casos. Se pueden añadir más plataformas con el patrón de adaptador si la demanda lo justifica.

### Capacidades de integración

Con cualquier plataforma:
- **Creación de eventos** — el equipo crea el evento en GreenGrass y la reunión se crea automáticamente en la plataforma de video
- **Enlaces de acceso únicos** — cada persona inscrita recibe un enlace único para poder registrar su asistencia
- **Sincronización de asistencia** — quién entró de verdad y cuánto tiempo participó, sincronizado de vuelta al CRM
- **Enlace de la grabación** — si el evento se graba, el enlace se guarda en el registro del evento y se puede compartir con quienes se inscribieron y no pudieron asistir
- **Integración con el calendario** — los detalles del evento se envían al calendario de las personas inscritas (formato iCal/ICS, universal)

## Integración con calendarios

Los eventos creados en GreenGrass deben integrarse con los sistemas de calendario externos.

- **Exportación ICS/iCal** — cada evento genera un archivo .ics, que se adjunta al correo de confirmación. Funciona con cualquier aplicación de calendario.
- **Google Calendar, Apple Calendar, Outlook** — enlaces directos de "Añadir al calendario" para estas plataformas en las confirmaciones de evento
- **Sin sincronización de calendario entrante** — GreenGrass es la fuente de verdad de los eventos de la campaña. Las integraciones con calendarios externos son solo salientes (los eventos se empujan hacia afuera, no se traen de afuera).

## Importación y exportación de datos

### Formatos de importación

La plataforma tiene que lidiar con archivos de datos reales y desordenados que vienen de fuentes muy diversas.

**Formatos de importación soportados:**
- CSV (con delimitador configurable y detección de codificación, incluyendo UTF-8, Latin-1, Windows-1252)
- Excel (.xlsx, .xls)
- JSON
- vCard (.vcf) — para importar contactos
- GeoJSON, Shapefile, KML — para datos geográficos

### Flujo de importación

1. **Carga** — el usuario sube un archivo o da una URL
2. **Detección de formato** — la plataforma detecta automáticamente formato y codificación
3. **Mapeo de columnas** — mapeador de columnas interactivo con sugerencias inteligentes (por ejemplo, "esta columna parece contener números de teléfono")
4. **Vista previa** — se muestra una muestra de los registros mapeados para validarlos
5. **Vista previa de deduplicación** — la plataforma identifica posibles duplicados contra los registros existentes y propone las fusiones
6. **Confirmación** — el usuario confirma el mapeo y las decisiones de deduplicación
7. **Importación** — se crean o fusionan los registros y la importación queda en el registro de auditoría
8. **Reporte posterior** — resumen: registros creados, fusionados, omitidos (con sus motivos) y errores

### Formatos de exportación

**Formatos de exportación soportados:**
- CSV (UTF-8)
- Excel (.xlsx)
- JSON
- GeoJSON (para datos geográficos)
- PDF (para reportes)

**Capacidades de exportación:**
- Exportación completa de los datos de la organización (derecho contractual, según workflows.md)
- Exportaciones por entidad (contactos, donaciones, eventos, interacciones)
- Exportaciones filtradas (por etiqueta, segmento, rango de fechas, geografía)
- Exportaciones programadas (exportación recurrente a una URL de webhook o a almacenamiento de archivos)
- Exportaciones de reportes de cumplimiento (en el formato de cada jurisdicción)

### Migración desde otras plataformas

Las campañas que se pasan a GreenGrass desde otras herramientas (NationBuilder, NGP VAN, Action Network, CiviCRM, etc.) necesitan apoyo para migrar.

**DECIDIDO: guías de migración + importación genérica.** Documentación detallada para migrar desde las plataformas de campaña más comunes (NationBuilder, NGP VAN, Action Network, CiviCRM): qué exportar, cómo mapear los campos, a qué prestarle atención. Más las herramientas genéricas de importación con mapeo inteligente. Si alguna plataforma de origen se convierte en la ruta de migración dominante, después se puede construir un importador dedicado.

## Monitoreo y observabilidad

### Monitoreo de la plataforma

GreenGrass en sí necesita monitoreo de su salud operativa.

#### Monitoreo de infraestructura

- **Métricas:** CPU, memoria, disco y red en todos los clústeres de Kubernetes
- **Orquestación de contenedores:** métricas de Kubernetes (salud de los pods, estado de los despliegues, uso de recursos)
- **Base de datos:** métricas de PostgreSQL (conexiones, latencia de consultas, retraso de replicación, almacenamiento)
- **Cola de mensajes:** métricas de NATS JetStream (retraso de consumidores, throughput de mensajes, almacenamiento)

**DECIDIDO: Prometheus + Grafana.** Monitoreo de código abierto y estándar en la industria. Autoalojado, sin dependencia de proveedor, funciona igual en despliegues alojados en la nube y autoalojados. Prometheus para recolectar métricas y alertar, Grafana para los paneles. Coherente con los valores de soberanía de la plataforma.

#### Monitoreo de la aplicación

- **Trazado de peticiones:** trazado distribuido entre servicios (OpenTelemetry)
- **Seguimiento de errores:** registro estructurado de errores con contexto (Sentry o un equivalente autoalojado)
- **Métricas de aplicación:** latencia de peticiones, tasas de error, uso de endpoints, usuarios activos
- **Métricas de negocio:** organizaciones activas, volumen de donaciones, tasas de entrega de mensajes, latencia de sincronización

#### Alertas

- **Alertas de infraestructura:** agotamiento de recursos, fallos de pods, problemas de base de datos, retraso de replicación
- **Alertas de aplicación:** tasas de error elevadas, picos de latencia, fallos en el procesamiento de pagos, fallos de sincronización
- **Alertas de seguridad:** anomalías de autenticación, patrones inusuales de acceso a datos, fallos en operaciones de cifrado
- **Alertas de cumplimiento:** límites de retención próximos a vencer, fallos en el procesamiento de consentimientos, fechas de reporte incumplidas

**DECIDIDO: empezar simple y escalar cuando haga falta.** Alertas por correo y por webhook de Slack/Matrix para el alfa y los primeros pilotos. Adoptar PagerDuty u Opsgenie cuando el equipo de operaciones crezca y haga falta una rotación formal de guardias. Nada de comprometerse con proveedores antes de tiempo.

### Monitoreo de disponibilidad

- **Chequeos de salud externos** — monitoreo de disponibilidad independiente, desde fuera de la infraestructura (por ejemplo, UptimeRobot, Pingdom o una alternativa autoalojada)
- **Página de estado pública** — página de estado de cara a las organizaciones, que muestra la salud de la plataforma (por país y por servicio)

**DECIDIDO: página de estado autoalojada.** De código abierto (Upptime, Cachet o Gatus — la elección concreta se hace en la implementación). Bajo control total, sin dependencia de proveedor. Coherente con los valores de soberanía de la plataforma.

### Registro de logs

- **Registro estructurado** — logs en formato JSON con IDs de correlación entre servicios
- **Agregación centralizada de logs** — todos los logs se recolectan en un solo sistema donde se puede buscar

**DECIDIDO: Loki + Grafana.** Grafana Loki para agregar los logs, Grafana para consultarlos. Es liviano y se enchufa al stack de Prometheus/Grafana que ya está en pie — métricas, logs y paneles en un solo lugar, consultados de la misma forma. La indexación basada en etiquetas mantiene bajo el uso de recursos.

## Integración de terceros por la API pública

Ya decidido en system.md: REST + webhooks desde el primer día. La API pública permite que las organizaciones y los terceros construyan sus propias integraciones.

### Eventos de webhook

La plataforma emite eventos de webhook para las acciones clave. Cada organización configura sus endpoints de webhook por tipo de evento.

**Categorías de eventos de webhook:**
- **CRM:** contacto creado/actualizado/fusionado, etiqueta aplicada/quitada, cambio de pertenencia a un segmento
- **Donaciones:** donación recibida, donación recurrente creada/cancelada/fallida, reembolso procesado, promesa creada/cumplida/vencida
- **Comunicaciones:** mensaje enviado/entregado/rebotado/abierto/con clic, consentimiento otorgado/revocado
- **Eventos:** evento creado, confirmación de asistencia recibida, asistencia registrada
- **Trabajo de campo:** interacción registrada, territorio asignado, turno iniciado/terminado
- **Cumplimiento:** límite de contribución próximo a alcanzarse, donación extranjera marcada, solicitud de titular de datos recibida
- **Sistema:** importación de datos completada, exportación lista, sincronización completada

### Límites de tasa de la API

- Límites de tasa por organización y por llave de API
- Configurables según el nivel de suscripción
- Encabezados de límite de tasa en las respuestas (X-RateLimit-Remaining, X-RateLimit-Reset)
- Reintento de webhooks con retroceso exponencial cuando falla la entrega

### Documentación para desarrolladores

- **Referencia de la API** — generada automáticamente desde la especificación OpenAPI, interactiva (Swagger UI o similar)
- **Documentación de webhooks** — esquemas de eventos, garantías de entrega, comportamiento de reintento
- **SDKs** — SDK de JavaScript/TypeScript (de primera clase), SDK de Python (comunitario o de primera clase, según la demanda)
- **Entorno de pruebas** — entorno de prueba por organización, con datos semilla, para desarrollar integraciones

## Hoja de ruta de integraciones

### Alfa (Puerto Rico)

**Integraciones requeridas:**
- Pagos: procesador de tarjetas de crédito (Stripe o equivalente), adaptador de ATH Móvil
- SMS: proveedor estadounidense (Twilio o equivalente) con cumplimiento de TCPA
- Correo: servicio administrado para el alfa (Postmark o SES), con MTA autoalojado en desarrollo
- Mapas: el proveedor elegido, con soporte de teselas sin conexión
- Geocodificación: para procesar el padrón y validar direcciones
- Importación de datos: CSV/Excel con mapeo de columnas para padrones
- FEC API: para radicar reportes de cumplimiento (si se construye el reporte a la FEC para el alfa)
- API pública: REST + webhooks operativos

### Piloto 1 (Brasil)

**Integraciones adicionales:**
- Pagos: adaptador de PIX (procesador local), adaptador de Boleto
- SMS: proveedor brasileño o Twilio con número de Brasil
- WhatsApp: integración con la Business API (crítica en Brasil)
- APIs del TSE: DivulgaCandContas para la divulgación de financiamiento de campaña
- Mapas: verificación de la cobertura de teselas específica de Brasil
- Geocodificación: soporte del formato de dirección brasileño

### Piloto 2 (Tailandia)

**Integraciones adicionales:**
- Pagos: adaptador de PromptPay, adaptador de TrueMoney
- SMS: proveedor tailandés para mensajería doméstica
- WhatsApp: Business API (WhatsApp también es popular en Tailandia)
- Mapas: soporte del formato de dirección y de la escritura tailandesa
- Mensajería Line: considerar la integración con Line (muy popular en Tailandia)

### Piloto 3 (India)

**Integraciones adicionales:**
- Pagos: adaptador de UPI (Razorpay o Cashfree), adaptadores de Paytm/PhonePe
- SMS: proveedor indio con registro DLT, mensajería basada en plantillas
- WhatsApp: Business API (WhatsApp es dominante en India)
- Datos de la ECI: herramientas de importación del padrón electoral, datos de demarcación de circunscripciones
- Mapas: geocodificación específica de India (los Plus Codes pueden servir en zonas sin direcciones formales)

### Piloto 4 (Líbano)

**Integraciones adicionales:**
- Pagos: interfaz de registro manual de OMT, seguimiento de transferencias bancarias
- SMS: integración con las operadoras libanesas (confiabilidad limitada)
- WhatsApp: Business API (canal principal de mensajería, dada la poca confiabilidad del SMS)
- Mapas: fuertemente sin conexión — con esa inestabilidad de infraestructura, los mapas sin conexión son esenciales, no opcionales
- Seguimiento de efectivo: integración completa de cadena de custodia (según fundraising.md)

## Preguntas abiertas

1. **Integración con Line para Tailandia** — Line es más popular que WhatsApp en Tailandia. ¿Añadimos un adaptador de Line? Probablemente sí, pero hay que investigar qué permite la Business API de Line y qué restricciones tiene para mensajería política.

2. **Plus Codes en India** — los Plus Codes de Google dan dirección a zonas sin direcciones formales. Útiles para el trabajo de campo en la India rural. ¿Vale la pena integrarlos como sistema complementario de geocodificación y direccionamiento?

3. **Manejo de la relación con las comisiones electorales** — en los países donde queremos acceso por API o datos oficiales, ¿quién maneja esa relación? ¿GreenGrass corporativo? ¿Asesoría legal local? ¿La organización?

4. **Monitoreo para las organizaciones autoalojadas** — las organizaciones que se autoalojan GreenGrass también necesitan monitoreo. ¿Incluimos el stack de monitoreo en el paquete autoalojado, o esperamos que traigan el suyo?

<!-- REVISIT: Each integration adapter needs its own technical specification during implementation — API contracts, authentication flows, error handling, rate limit strategies, webhook formats. These are implementation details that belong in engineering docs, not this spec. -->
