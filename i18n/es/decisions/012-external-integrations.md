# ADR-012: Integraciones externas

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/workflows.md`, `spec/integrations.md`

## Contexto

GreenGrass tiene que integrarse con una gran variedad de servicios externos —proveedores de telefonía, plataformas de video, servicios de mapas, pasarelas de SMS, herramientas de monitoreo— en cinco países con proveedores, API e infraestructura de calidad distinta. Ningún proveedor global cubre por sí solo todas las necesidades en todos los mercados. La estrategia de integración tiene que evitar la dependencia del proveedor, permitir elegir proveedor país por país y degradarse de forma controlada donde la infraestructura es escasa.

## Decisión

### Telefonía BYOP para el MVP, híbrido Twilio/local para el piloto

En el MVP, las jornadas de llamadas se hacen con BYOP (Bring Your Own Phone — se usan los celulares personales de los voluntarios): la plataforma muestra el contacto y el guion, y registra el resultado sin necesidad de infraestructura de telefonía. En la fase piloto se integran proveedores de telefonía (Twilio Voice como base global, proveedores locales de VoIP donde salga más barato) para la llamada con un clic, el registro de llamadas, el enmascaramiento de números, el marcador con vista previa y la aplicación de la lista de no llamar.

**Alternativas consideradas:** Se descartó construir la telefonía desde el lanzamiento porque no hace falta para el MVP (BYOP funciona) y retrasaría la entrega. Se descartó usar un único proveedor global porque los proveedores locales ofrecen tarifas mucho mejores para el llamado de alto volumen en los mercados objetivo.

### Integración externa para los eventos virtuales

GreenGrass maneja todo el ciclo de vida del evento (creación, promoción, confirmaciones de asistencia, recordatorios, seguimiento, analítica), pero se integra con proveedores externos de video para el alojamiento del video en sí. Dos adaptadores cubren la mayoría de los casos de uso: Zoom (cuota de mercado dominante) y Jitsi (código abierto, autoalojado, alineado con los valores de soberanía). Los enlaces de acceso únicos por persona inscrita permiten hacer seguimiento de la asistencia desde la propia integración.

**Alternativas consideradas:** Se descartó construir el alojamiento de video: es un problema de producto aparte. Se descartó un proveedor único (solo Zoom) porque las campañas con requisitos de soberanía necesitan una opción de código abierto y autoalojada.

### Mapas: híbrido de OSM por defecto y alternativa comercial de reserva

Las teselas de OpenStreetMap autoalojadas (vía OpenMapTiles o Protomaps) son la opción por defecto para mostrar cualquier mapa. Son gratuitas, soberanas y ningún tercero ve los patrones del trabajo de campo (dónde están tocando puertas los voluntarios). Los servicios comerciales de mapas quedan como alternativa de reserva donde la cobertura o la calidad de OSM no alcanzan para una región concreta. La infraestructura de teselas se autoaloja en el clúster de Kubernetes de cada país.

La geocodificación autoalojada (Pelias o Nominatim) se encarga de las operaciones masivas (procesamiento del padrón electoral, geocodificación por lotes), donde importa la soberanía de datos. La geocodificación comercial es la alternativa de reserva para la experiencia en tiempo real (autocompletado de direcciones), donde la precisión de lo autoalojado se queda corta. Las rutas de las listas de recorrido se calculan con un motor de cálculo de rutas de código abierto y autoalojado (OSRM, Valhalla o GraphHopper), precalculadas al inicio del turno y guardadas en caché para usarlas sin conexión.

**Alternativas consideradas:** Se descartó usar solo mapas comerciales (Google Maps, Mapbox) porque expone los patrones del trabajo de campo a terceros: dónde están tocando puertas los voluntarios revela la estrategia de campaña. Se descartó usar solo OSM sin alternativa comercial de reserva porque los huecos de cobertura de OSM en algunas regiones objetivo degradarían la experiencia de usuario.

### Monitoreo: Prometheus + Grafana + Loki

El monitoreo de la infraestructura usa Prometheus (recolección de métricas y alertas) y Grafana (paneles). La agregación de bitácoras usa Grafana Loki. Todo autoalojado, sin dependencia del proveedor, y funciona igual en los despliegues en la nube y en los autoalojados. Las alertas empiezan simples (correo y webhooks de Slack/Matrix) y suben a PagerDuty/Opsgenie cuando crezca el equipo de operaciones. La página de estado es autoalojada (Upptime, Cachet o Gatus).

**Alternativas consideradas:** Se descartó el monitoreo comercial (Datadog, New Relic) porque añade dependencia del proveedor y no sirve para los despliegues autoalojados. La pila de observabilidad tiene que ser la misma en todas partes.

## Consecuencias

**Beneficios:**
- La telefonía BYOP elimina el costo y la complejidad de infraestructura en el MVP mientras el producto valida los flujos de trabajo de las jornadas de llamadas
- Los mapas autoalojados aseguran que ningún tercero pueda observar los patrones de trabajo de campo de la campaña
- Prometheus, Grafana y Loki dan una pila de observabilidad unificada que funciona igual en los despliegues en la nube y en los autoalojados
- El patrón de adaptadores en todas las integraciones permite cambiar de proveedor sin rehacer la arquitectura

**Costos:**
- Las teselas de mapa, la geocodificación y el cálculo de rutas autoalojados exigen experiencia en infraestructura SIG y mantenimiento continuo
- Cada adaptador de telefonía o de SMS es un miniproyecto de integración, con contratos de API y formatos de webhook propios de cada proveedor
- Con la telefonía BYOP, los números personales de los voluntarios quedan a la vista de quienes reciben la llamada (la integración híbrida lo resuelve con el enmascaramiento de números)
- La calidad de las teselas de OSM varía según la región: configurar la alternativa comercial de reserva añade trabajo operativo país por país

**Restricciones:**
- Los mapas sin conexión requieren teselas descargadas de antemano, con un tope de ~200MB por el almacenamiento de los celulares de gama baja
- Todas las credenciales de integración son de la organización y se guardan en el gestor de secretos (HashiCorp Vault)
- Los flujos de datos de las integraciones quedan asentados en el registro de auditoría
- Las integraciones con redes sociales tienen que tener OAuth y una alternativa de reserva de copiar y pegar, dadas las restricciones crecientes de las API para el contenido político

**ADR relacionados:** [ADR-001](001-platform-architecture.md) (infraestructura por país), [ADR-005](005-offline-first-sync.md) (mapas sin conexión, rutas precargadas en caché), [ADR-006](006-field-operations-gotv.md) (jornadas de llamadas, manejo de territorios), [ADR-011](011-design-system-ux.md) (presupuestos de rendimiento para recursos externos)
