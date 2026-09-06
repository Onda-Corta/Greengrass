# Soporte y puesta en marcha de organizaciones

## Propósito

Este documento cataloga cada lugar donde GreenGrass tiene que enseñar, guiar o acompañar a una organización a través de un proceso. Salió de un patrón que se repite en todas las demás especificaciones: configurar el procesador de pagos, verificar WhatsApp, conseguir números de SMS, configurar el cumplimiento, manejar llaves BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado), importar el padrón electoral, migrar desde otra plataforma. Las organizaciones necesitan ayuda a cada paso.

Esto no es la especificación de un sistema de tickets de soporte. Es un inventario de la **superficie de soporte** — cada punto de contacto donde GreenGrass tiene que dar orientación — y la estrategia para entregar esa orientación a escala, en cinco países, siete idiomas y niveles de sofisticación técnica que van de un extremo al otro.

## Filosofía de soporte

1. **La plataforma es el canal de soporte principal.** Asistentes guiados, ayuda contextual, valores por defecto inteligentes y barandas de cumplimiento deberían resolver el 80% de las necesidades de soporte. Si una organización necesita ayuda humana de forma habitual para algo, la UX falló.
2. **La orientación de cumplimiento no es opcional.** Reglas de financiamiento de campaña, obligaciones de protección de datos, requisitos de consentimiento — la organización tiene que entender todo eso. GreenGrass hace del cumplimiento el camino de menor resistencia con plantillas, verificaciones automáticas y advertencias claras.
3. **Soporte localizado.** Todo recurso de soporte tiene que estar disponible en el idioma configurado por la organización. La traducción asistida por IA con revisión humana (según geography.md) aplica al contenido de soporte, no solo a la interfaz.
4. **Modelo de soporte por niveles.** Autoservicio para lo común, acompañamiento para la configuración compleja, soporte humano para los casos límite. Escalar el soporte sin escalar la plantilla en la misma proporción.

## Inventario de la superficie de soporte

### Nivel 1: autoservicio dentro de la plataforma

Son puntos de orientación construidos directamente en la interfaz de la plataforma. No hace falta intervención humana.

#### Asistentes de puesta en marcha

| Asistente | Se dispara con | Pasos | Referencia de especificación |
|--------|-------------|-------|---------------|
| **Configuración de la organización** | Aprovisionamiento de una organización nueva | Configurar passkey → perfil de la organización (nombre, marca, idiomas) → invitar al equipo → configurar jurisdicción | [workflows.md § 1. Incorporación de organizaciones](workflows.md#1-puesta-en-marcha-de-una-organización) |
| **Procesador de pagos** | Primera visita a la configuración de recaudación | Elegir jurisdicción → elegir procesador o procesadores de la lista soportada → ingresar credenciales → donación de prueba → verificar | [fundraising.md § Puesta en marcha del procesador](fundraising.md#puesta-en-marcha-del-procesador) |
| **Generación de llave BYOK** | La organización elige BYOK durante la configuración | Explicar las implicaciones → generar la llave → respaldo seguro (opción Shamir) → confirmar el plan de recuperación → reconocer las consecuencias de perder la llave | [security.md § Manejo de secretos](security.md#gestión-de-secretos), [system.md § Aprobación de operaciones destructivas](../design/architecture/system.md#destructive-operation-approval) |
| **Configuración de cumplimiento** | Después de elegir la jurisdicción | Precargar las plantillas de la jurisdicción → configurar los límites de contribución → fijar las fechas del período de campaña → configurar el texto del aviso legal → fijar la política de retención | [compliance.md § Configuración de cumplimiento por organización](compliance.md#configuración-de-cumplimiento-por-organización) |
| **Configuración de WhatsApp Business** | Al activar el canal de WhatsApp | Recorrido por la verificación de Meta → creación de la cuenta de negocio → registro del número de teléfono → primer envío de plantilla → mensaje de prueba | [integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api) |
| **Configuración del número de SMS** | Al activar el canal de SMS | Guía específica del país → tipo de número recomendado → creación de la cuenta con el proveedor → adquisición del número → registro DLT/10DLC (si aplica) → mensaje de prueba | [integrations.md § Provisión de números](integrations.md#provisión-de-números) |
| **Importación del padrón electoral** | Primera importación de datos | Subir el archivo → detección de formato → mapeo de columnas con sugerencias → vista previa → vista previa de deduplicación → confirmar → reporte posterior | [integrations.md § Formatos de importación](integrations.md#formatos-de-importación) |
| **Incorporación de voluntarios** | Primer inicio de sesión del voluntario | Configurar passkey o respaldo → designar contacto de confianza → recorrido por la plataforma → capacitación propia de la organización → verificaciones de conocimiento → certificación (si se configuró) | [workflows.md § 2. Incorporación de voluntarios](workflows.md#2-incorporación-de-voluntarios) |

#### Ayuda contextual

Orientación en contexto, que aparece justo donde el usuario la necesita:

- **Globos de ayuda y paneles informativos** — todo campo de configuración con implicaciones de cumplimiento trae una explicación de por qué importa y qué exige la jurisdicción
- **Valores por defecto inteligentes, con explicación** — cuando la plataforma precarga un valor (por ejemplo, los límites de contribución para una contienda federal estadounidense), muestra por qué y deja que la organización lo cambie
- **Avisos de advertencia** — cuando una acción puede violar las restricciones del período de campaña, las reglas sobre contribuciones extranjeras o los requisitos de consentimiento, una advertencia clara explica el riesgo antes de que el usuario siga
- **Advertencias de lesa majestad** — advertencias prominentes y persistentes para las organizaciones tailandesas al crear contenido (según compliance.md)
- **Orientación para solicitudes de titulares de datos** — cuando llega una solicitud de borrado, el panel de cumplimiento muestra las obligaciones de retención de esa jurisdicción junto a la solicitud

#### Plantillas y contenido preconstruido

| Tipo de plantilla | Qué aporta | Referencia de especificación |
|--------------|-----------------|---------------|
| **Plantillas de cumplimiento por jurisdicción** | Límites de contribución precargados, umbrales de divulgación, reglas del período de campaña, restricciones de comunicación, texto del aviso legal | [compliance.md § Configuración de cumplimiento por organización](compliance.md#configuración-de-cumplimiento-por-organización) |
| **Plantillas de formulario de inscripción de votantes** | Requisitos de elegibilidad por jurisdicción, campos obligatorios, reglas de documentación, procedimientos de presentación | [workflows.md § Consideraciones de cumplimiento](workflows.md#consideraciones-de-cumplimiento) |
| **Acuerdo de procesamiento de datos (DPA)** | Plantilla estándar de DPA que cubre categorías de datos, propósitos, subprocesadores, medidas de seguridad, notificación de brechas y derechos de auditoría | [compliance.md § Acuerdos de procesamiento de datos](compliance.md#acuerdos-de-tratamiento-de-datos) |
| **Evaluación de impacto en protección de datos (DPIA)** | Plantilla de DPIA para organizaciones que procesan datos políticos sensibles a escala (obligatoria bajo LGPD y PDPA) | [compliance.md § Acuerdos de procesamiento de datos](compliance.md#acuerdos-de-tratamiento-de-datos) |
| **Plantillas de rol** | Configuraciones de rol preconstruidas (Administrador de la organización, Gerente de campaña, Director de finanzas, Director de comunicaciones, Director de campo, Coordinador de voluntarios, Gestor de datos, Voluntario, Líder de equipo, Candidato, Adjunto) | [users.md § Coordinador de voluntarios](users.md#coordinador-de-voluntarios) |
| **Plantillas de correo** | Constructor visual de plantillas de correo, con prioridad al celular y diseños preconstruidos | [workflows.md § Flujo de campaña por correo](workflows.md#flujo-de-campaña-por-correo) |
| **Guiones de trabajo de campo** | Constructor de guiones con lógica de ramificación según las respuestas | [workflows.md § Requisitos sin conexión](workflows.md#requisitos-sin-conexión) |

#### Verificaciones automáticas de cumplimiento

La plataforma monitorea y alerta de forma continua:

- **En tiempo real:** verificación de límites de contribución, filtrado de donantes extranjeros, verificación del consentimiento al momento del envío, presencia del aviso legal en las comunicaciones salientes
- **Por lotes:** límites de contribución próximos a alcanzarse, alertas de vencimiento de consentimiento, datos obligatorios del donante que faltan, aplicación de las restricciones del período de campaña
- **Previas al reporte:** verificaciones de completitud de datos antes de las fechas de radicación, conciliación de los registros de donación
- **Panel de cumplimiento:** alertas de contribución, salud de los consentimientos, fechas de reporte con su estado de preparación, solicitudes de titulares de datos con temporizadores de SLA, registro de auditoría con búsqueda

### Nivel 2: recursos de soporte guiado

Contenido de autoservicio que la organización consume por su cuenta, pero que GreenGrass tiene que crear y mantener.

#### Base de conocimiento

Una base de conocimiento multilingüe con búsqueda, que cubre:

**Primeros pasos**
- Panorama de la plataforma y conceptos centrales
- Recorrido de configuración de la organización (con capturas de pantalla y video)
- Guía de configuración de roles del equipo
- Guía de configuración de la incorporación de voluntarios
- Guía para crear la primera campaña

**Guías de integración**
- Configuración del procesador de pagos — por procesador y por país
- Configuración de la WhatsApp Business API — guía paso a paso de la verificación de Meta
- Configuración del proveedor de SMS — por país (tipos de número, requisitos de registro, listas de verificación de cumplimiento)
- Configuración del proveedor de telefonía para jornadas de llamadas (fase piloto)
- Configuración de la integración con Zoom
- Configuración de Jitsi autoalojado
- Configuración del dominio de envío de correo (SPF, DKIM, DMARC)

**Manejo de datos**
- Guía de importación del padrón electoral — por país (formatos esperados, problemas comunes, consejos de mapeo de campos)
- Guías de migración de plataforma — por plataforma de origen (NationBuilder, NGP VAN, Action Network, CiviCRM)
- Guía de exportación de datos
- Guía de deduplicación y fusión
- Guía de importación de datos de demarcación electoral (GeoJSON, Shapefile, KML)

**Guías de cumplimiento**
- Reportes de financiamiento de campaña — por jurisdicción (qué radicar, cuándo, cómo generar los reportes)
- Buenas prácticas de manejo del consentimiento — por jurisdicción
- Manejo de los derechos de los titulares de datos — paso a paso para cada derecho (acceso, corrección, borrado)
- Cumplimiento sobre contribuciones extranjeras — cómo funciona el filtrado de dos niveles y qué hacer con las donaciones marcadas
- Restricciones del período de campaña — por jurisdicción, qué cambia durante el período de campaña

**Guías de seguridad**
- Manejo de llaves BYOK — generación, respaldo, rotación, recuperación, y qué pasa si pierdes tu llave
- Configuración y manejo de passkeys
- Configuración de la recuperación por contacto de confianza
- Recomendaciones de seguridad del dispositivo
- Guía para elegir el nivel de seguridad (estándar, reforzado, agresivo)
- Guía de despliegue autoalojado — paso a paso, con plantillas de configuración

**Guías de recaudación**
- Creación y optimización de formularios de donación
- Guía de pruebas A/B
- Manejo de donaciones recurrentes
- Registro de donaciones en efectivo y cadena de custodia
- Configuración de recaudación en alianza y de los repartos
- Manejo de promesas de donación
- Procesamiento de reembolsos

#### Videos tutoriales

Videos cortos (menos de 5 minutos) sobre tareas específicas, para quienes aprenden viendo:

- Recorrido por la plataforma (el equivalente en video del recorrido interactivo)
- Cómo crear tu primer formulario de donación
- Cómo importar un padrón electoral
- Cómo montar una campaña de trabajo de campo
- Cómo configurar los ajustes de cumplimiento
- Cómo manejar donaciones recurrentes
- Cómo usar el panel de cumplimiento

Todos los videos se producen primero en inglés, con subtítulos en todos los idiomas soportados, con traducción asistida por IA y revisión humana.

#### Módulo de capacitación dentro de la plataforma

Ya decidido en workflows.md: un módulo de incorporación completo, con:

- Recorrido por la plataforma (tour interactivo)
- Materiales de capacitación que la organización puede personalizar (discurso de campaña, contexto local, protocolos de seguridad)
- Verificaciones de conocimiento y cuestionarios
- Puertas de certificación antes de acceder a las herramientas de campo
- Materiales de capacitación cacheados para verlos sin conexión
- Configurable por organización (qué módulos son obligatorios y cuáles opcionales)

### Nivel 3: acompañamiento y soporte directo

Para tareas de configuración complejas que el autoservicio no alcanza a resolver del todo.

#### Acompañamiento en la puesta en marcha

**DECIDIDO: IA primero, con escalamiento a humanos.** Un acompañante de IA (chat dentro de la plataforma) atiende el primer contacto, guía por las tareas comunes de configuración y responde las preguntas estándar. Disponible 24/7 y multilingüe. Cuando la IA no puede resolver, o la organización lo pide, escala a un especialista humano. Las personas se concentran en los casos límite, las preguntas jurisdiccionales complejas y la configuración de alto riesgo (manejo de llaves BYOK, despliegue autoalojado). Escala sin perder calidad en los problemas difíciles.

**Alcance del acompañamiento — tareas complejas que se benefician de soporte guiado:**

| Tarea | Por qué es compleja | Papel del acompañamiento |
|------|------------------|---------------|
| Verificación de WhatsApp Business | El proceso de Meta es opaco y lento | Guiar la verificación, resolver rechazos, ayudar con la aprobación de plantillas |
| Configuración de llaves BYOK | Mucho en juego — perder la llave significa perder los datos para siempre | Acompañar la generación, verificar el respaldo, confirmar el plan de recuperación |
| Configuración del procesador de pagos | Varía por país, hay credenciales que manejar | Ayudar a conectar con el procesador correcto, verificar las transacciones de prueba |
| Configuración de cumplimiento en jurisdicciones nuevas | Complejidad legal, reglas propias de cada jurisdicción | Revisar la configuración, señalar posibles problemas, recomendar ajustes |
| Migración de plataforma | Complejidad del mapeo de datos, preservar las relaciones | Revisar los datos de origen, recomendar el mapeo, verificar la calidad de la importación |
| Importación de datos de demarcación electoral | Hace falta experiencia en GIS | Ayudar con la conversión de formatos, validar las demarcaciones, resolver problemas de renderizado |
| Despliegue autoalojado | Hace falta experiencia en infraestructura | Guiar el despliegue, verificar la configuración, resolver problemas de conectividad |

#### Alianzas de soporte local

Según product.md: el lanzamiento completo incluye una red de soporte local, con alianzas para dar capacitación y servicio al cliente en las regiones clave.

- **Socios de soporte por país** — organizaciones o contratistas locales que entienden el contexto político, cultural y regulatorio
- **Soporte en el idioma nativo** — soporte en el idioma de la organización, no traducido
- **Capacitación en el terreno** — sesiones presenciales para los despliegues de organizaciones grandes, sobre todo en países con baja alfabetización digital o contextos políticos complejos
- **Enlace regulatorio** — los socios locales pueden ayudar a navegar los requisitos regulatorios propios de cada país que la orientación automatizada de la plataforma no alcanza a cubrir

#### Soporte para desarrolladores

Para las organizaciones que usan la API pública:

- **Referencia de la API** — generada automáticamente desde la especificación OpenAPI, interactiva (Swagger UI o similar)
- **Documentación de webhooks** — esquemas de eventos, garantías de entrega, comportamiento de reintento
- **SDKs** — JavaScript/TypeScript (de primera clase), Python (comunitario o de primera clase, según la demanda)
- **Entorno de pruebas** — entorno de prueba por organización, con datos semilla
- **Comunidad de desarrollo** — foro o tablero de discusión donde quienes usan la API comparten integraciones, hacen preguntas y contribuyen

## Ciclo de vida del contenido de soporte

### Creación

- Todo el contenido de soporte se escribe primero en inglés
- Traducción asistida por IA a todos los idiomas soportados (según geography.md)
- Toda traducción de contenido de soporte pasa por revisión humana antes de publicarse
- El contenido crítico (guías de cumplimiento, guías de seguridad, plantillas legales) requiere revisión legal en cada jurisdicción

### Mantenimiento

- El contenido de soporte se versiona junto con las entregas de la plataforma
- Cuando cambia una funcionalidad, el contenido de soporte asociado queda marcado para actualizar
- Las guías de cumplimiento por país se revisan antes de cada ciclo electoral de ese país
- Actualizar una plantilla de jurisdicción dispara la actualización de los artículos de la base de conocimiento
- Avisos de obsolescencia cuando el contenido de soporte queda desactualizado

### Prioridad de localización

| Prioridad | Tipo de contenido | Motivo |
|----------|-------------|--------|
| P0 — antes del lanzamiento | Asistentes de puesta en marcha, configuración de cumplimiento, configuración de seguridad | Sin esto la organización no puede usar la plataforma |
| P1 — al lanzar | Artículos centrales de la base de conocimiento, guías de integración, guías de cumplimiento | La organización los necesita en la primera semana |
| P2 — dentro de 30 días | Videos tutoriales, guías avanzadas, guías de migración | Prescindibles al lanzar, necesarios para crecer |
| P3 — continuo | Contenido aportado por la comunidad, documentación de casos límite | Se va acumulando con el tiempo |

## Canales de soporte

### Dentro de la plataforma

- **Ayuda contextual** — globos de ayuda, paneles informativos, avisos de advertencia (siempre disponibles)
- **Búsqueda en la base de conocimiento** — se busca desde dentro de la plataforma
- **Acompañante de IA** — chat dentro de la plataforma para configuración guiada y resolución de problemas (según la decisión sobre acompañamiento)
- **Módulo de capacitación** — contenido estructurado de incorporación (según workflows.md)

### Fuera de la plataforma

- **Sitio de documentación** — base de conocimiento pública (alojada aparte de la plataforma)
- **Foro comunitario** — para el soporte entre organizaciones, las peticiones de funcionalidades y el intercambio de buenas prácticas
- **Soporte por correo** — para lo que no se resuelve por autoservicio
- **Página de estado** — autoalojada (según integrations.md), para ver la salud de la plataforma

### Lo que GreenGrass NO ofrece

- **Asesoría legal** — GreenGrass da orientación y plantillas de cumplimiento, no asesoría legal. Toda guía de cumplimiento incluye un descargo que aclara que la organización debe consultar a un abogado local para su situación concreta.
- **Estrategia de campaña** — GreenGrass da herramientas, no consultoría política. La plataforma ayuda a la campaña a ejecutar, no a decidir qué ejecutar.
- **Creación de contenido** — más allá de la traducción y la generación de mensajes asistidas por IA (según workflows.md), GreenGrass no crea contenido de campaña para las organizaciones.
- **Servicios de captura de datos** — la plataforma da herramientas de importación y orientación, pero cada organización maneja sus propios datos.

## Métricas de soporte

Se miden para evaluar la calidad del soporte e identificar dónde falló la UX:

- **Tasa de finalización de asistentes** — porcentaje de organizaciones que completan cada asistente de puesta en marcha sin abandonarlo
- **Tiempo hasta la primera donación** — cuánto pasa desde la creación de la organización hasta la primera donación exitosa (indicador indirecto de qué tan bien funciona la puesta en marcha)
- **Búsqueda en la base de conocimiento → resolución** — porcentaje de búsquedas que no terminan en un ticket de soporte
- **Tasa de escalamiento del acompañante** — porcentaje de conversaciones con el acompañante de IA que escalan a un humano
- **Volumen de tickets por categoría** — señala qué áreas necesitan mejor autoservicio
- **Volumen de soporte por país** — señala qué jurisdicciones necesitan más orientación localizada

## Hoja de ruta de soporte

### Alfa (Puerto Rico)

- Todos los asistentes de puesta en marcha operativos (inglés + español)
- Artículos centrales de la base de conocimiento (inglés + español)
- Guías de cumplimiento para EE. UU./FEC y para la CEE de Puerto Rico
- Acompañante de IA (según la decisión) — inglés y español
- Canal de soporte por correo
- Guía de configuración del procesador de pagos (Stripe + ATH Móvil)
- Guía de reportes a la FEC

### Piloto 1 (Brasil)

- Todo el contenido traducido al portugués
- Guías de cumplimiento específicas de Brasil (LGPD, TSE)
- Guía de configuración de PIX
- Acompañamiento para la configuración de WhatsApp Business (en portugués)
- Guía de reportes al TSE
- Vinculación con socios de soporte local (Brasil)

### Piloto 2 (Tailandia)

- Todo el contenido traducido al tailandés
- Guías de cumplimiento específicas de Tailandia (PDPA, ECT, lesa majestad)
- Guía de configuración de PromptPay
- Advertencias de contenido por lesa majestad completamente localizadas
- Orientación sobre niveles de seguridad (con énfasis en el nivel agresivo)
- Vinculación con socios de soporte local (Tailandia)

### Piloto 3 (India)

- Todo el contenido traducido al hindi + inglés (idiomas regionales según la demanda)
- Guías de cumplimiento específicas de India (DPDPA, ECI, FCRA, MCC)
- Guía de configuración de UPI
- Guía de registro DLT para SMS
- Guía de configuración de avisos de consentimiento multilingües
- Vinculación con socios de soporte local (India)

### Piloto 4 (Líbano)

- Todo el contenido traducido al árabe + francés + inglés
- Guías de cumplimiento específicas de Líbano (GDPR como base, SCE, manejo de efectivo)
- Guía de registro de OMT
- Guía de cadena de custodia del efectivo
- Guía de despliegue autoalojado (crítica dado el contexto de seguridad libanés)
- Guía de configuración del nivel de seguridad agresivo
- Vinculación con socios de soporte local (Líbano)

## Preguntas abiertas

1. **Contenido de soporte aportado por la comunidad** — ¿deberían las organizaciones poder aportar artículos o guías a la base de conocimiento? Puede ser valioso para los consejos específicos de cada jurisdicción que traen las campañas con experiencia, pero necesita moderación.

2. **SLA de soporte** — ¿los niveles de pago deberían incluir tiempos de respuesta garantizados? ¿Qué SLA son razonables con la dispersión global de husos horarios?

3. **Mercado de certificación de capacitación** — ¿podrían las personas u organizaciones certificadas por GreenGrass ofrecer servicios de capacitación pagos a través de la plataforma? ¿Con un modelo de reparto de ingresos?

4. **Contenido de soporte sin conexión** — en entornos con conectividad poco confiable (Líbano, la India rural), ¿la base de conocimiento y los materiales de capacitación deberían poder descargarse para consultarlos sin conexión?

<!-- REVISIT: The AI concierge's capabilities, training data, and escalation rules need detailed specification during implementation. This is both a product design challenge (conversation flows, persona, tone) and a technical challenge (which AI model, how to keep it current with platform changes, how to handle jurisdiction-specific questions). -->
