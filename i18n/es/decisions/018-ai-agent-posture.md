# ADR-018: Postura ante los agentes de IA

**Estado:** Propuesta
**Fecha:** 2026-09-07
**Fuentes:** `spec/security.md`, `spec/compliance.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`

## Contexto

GreenGrass ha decidido sobre IA cinco veces, y cada decisión dibujó una funcionalidad acotada con una persona haciendo de compuerta a la salida.

1. La [ADR-013](013-analytics-ai.md) genera un mensaje de activismo personalizado; quien apoya lo edita, lo aprueba, y esa aprobación queda como registro de consentimiento.
2. La [ADR-010](010-internationalization-localization.md) redacta borradores de traducción para que los apruebe una persona, con revisión obligatoria para los avisos de seguridad, los textos legales y el lenguaje de consentimiento.
3. La [ADR-014](014-volunteer-onboarding.md) pone un concierge de IA en el primer contacto de soporte, que escala a una persona en cuanto hay algo delicado.
4. La [ADR-016](016-cross-cutting-resolutions.md) §38 eligió BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA): la organización aporta su proveedor, su endpoint y sus credenciales.
5. [system.md § Integración de IA](../design/architecture/system.md#integración-de-ia) implementa las cuatro detrás de una capa de abstracción independiente del proveedor, con salvaguardas de contenido.

Cada una es sólida por separado. Ninguna hace la pregunta de fondo: qué cambia si los agentes de IA operan *a lo largo de todo* el producto y no dentro de cinco cajas —leyendo entre funcionalidades, con credenciales propias, invocando herramientas y actuando entre un punto de control humano y el siguiente.

Esa pregunta no está hecha, y los documentos que tendrían que responderla callan. [security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza) y la [ADR-002](002-security-threat-model.md) no mencionan la IA ni una sola vez. [compliance.md § Acuerdos de tratamiento de datos](../spec/compliance.md#acuerdos-de-tratamiento-de-datos) contiene la única mención a la IA de todo el marco de cumplimiento, y es como obligación de declarar subencargados.

Mientras tanto, la puerta ya está abierta. [integrations.md § Principios de integración](../spec/integrations.md#principios-de-integración) establece que «las organizaciones traen sus propias llaves de API y sus propias cuentas de servicios externos», y [system.md § Arquitectura BYOM](../design/architecture/system.md#arquitectura-byom) ya admite que los datos del prompt en BYOM «salen de su frontera de cifrado». La plataforma tiene la fontanería para los agentes y no tiene la postura.

### Vacíos que esta ADR nombra

**El modelo de amenazas no modela a un actor no humano.** [security.md § Principios de seguridad](../spec/security.md#principios-de-seguridad) dice que «ninguna credencial, llave o persona por sí sola debería poder exponer toda la plataforma». Un agente que sostiene credenciales acotadas repartidas entre varias áreas del producto es exactamente esa concentración, y no es una credencial, ni una llave, ni una persona. No hay tratamiento alguno de la inyección de prompts, de la exfiltración de modelo ni de la autoridad de un agente en [security.md § Seguridad de la aplicación](../spec/security.md#seguridad-de-la-aplicación).

**Cumplimiento no tiene sección sobre decisiones automatizadas ni sobre elaboración de perfiles.** La plataforma asigna puntajes de apoyo del 1 al 5 a votantes identificables ([users.md § La lista única y la deduplicación](../spec/users.md#la-lista-única-y-la-deduplicación), [security.md § En reposo](../spec/security.md#en-reposo)) en jurisdicciones regidas por el artículo 22 del RGPD y el artículo 20 de la LGPD. Un prompt que lleva datos personales de votantes a un endpoint externo es una transferencia según [compliance.md § Transferencias transfronterizas de datos](../spec/compliance.md#transferencias-transfronterizas-de-datos), y esa sección no lo contempla. La [ADR-009](009-compliance-legal.md) ya rechazó el filtrado automático de contenido por lesa majestad por poco fiable y por su efecto inhibidor; un agente con acceso de lectura al contenido de una organización tailandesa contradice ese rechazo.

**El modelo de auditoría tampoco tiene un actor no humano.** La [ADR-004](004-data-model-integrity.md) registra las mutaciones por usuario; [settings.md § SET-018: Visor del registro de auditoría](../design/ux/04-wireframes/settings/settings.md#set-018-audit-trail-viewer) muestra actor, IP y user agent. No hay tipo de actor para un agente, ni relación de «actuando en nombre de», ni modelo de retención para prompts y respuestas. La [ADR-016](016-cross-cutting-resolutions.md) §49 se compromete a que «el personal pueda ver exactamente por qué se hizo una sugerencia», una garantía de explicabilidad que un modelo de lenguaje no puede cumplir tal como está escrita.

**El trabajo sin conexión es una restricción fundacional que los agentes no pueden cumplir.** La [ADR-005](005-offline-first-sync.md) existe porque el trabajo de campo ocurre donde no hay señal. Toda funcionalidad mediada por un agente exige conectividad por construcción, como ya dice [settings-help-patterns.md § Concierge de IA](../design/ux/02-global-patterns/settings-help-patterns.md#concierge-de-ia).

**El modelo de costos contradice al modelo de precios.** [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) decidió niveles de suscripción planos, «no atados al volumen de donaciones, a la cantidad de usuarios ni a ninguna métrica de uso». El costo por token de inferencia es una métrica de uso. Nada en el corpus concilia las dos frases.

**Hay una doctrina sin nombre haciendo trabajo de carga.** *La máquina propone, la persona dispone* aparece por separado en [ADR-006 § Constructor automático del universo GOTV](006-field-operations-gotv.md#constructor-automático-del-universo-gotv), [gotv.md § Reasignación dinámica de recursos](../spec/gotv.md#reasignación-dinámica-de-recursos), [ADR-010 § Localización asistida por IA con revisión humana](010-internationalization-localization.md#localización-asistida-por-ia-con-revisión-humana), [ADR-013 § Mensajes personalizados generados por IA para el activismo](013-analytics-ai.md#mensajes-personalizados-generados-por-ia-para-el-activismo) y [ADR-004 § Deduplicación con sugerir y confirmar](004-data-model-integrity.md#deduplicación-con-sugerir-y-confirmar). Está enunciada cinco veces y ni una sola como principio.

**Una decisión anterior ya responde a la pregunta, en sentido contrario.** La [ADR-012](012-external-integrations.md) eligió alojar los mosaicos de mapa por cuenta propia para que ningún tercero vea los patrones del trabajo de campo. [comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención) exige que «el Administrador de la organización no pueda leer» y que «el Administrador de la plataforma no pueda leer en absoluto». Un agente con alcance de lectura entre funcionalidades es una vía de lectura de superusuario, que ese documento prohíbe por diseño.

### Inconsistencias registradas, no corregidas

Al armar esta ADR aparecieron tres contradicciones. Siguiendo la práctica establecida para la traducción, quedan nombradas y no corregidas en silencio, para que corregirlas sea una decisión que alguien tome a propósito.

1. La [ADR-013](013-analytics-ai.md) sigue con `**Estado:** Aceptada` y sin aviso de sustitución, aunque [system.md § Integración de IA](../design/architecture/system.md#integración-de-ia) dice que su decisión sobre el modelo de IA quedó sustituida por la [ADR-016](016-cross-cutting-resolutions.md) §38.
2. [dashboards.md § Centro de mando — diferencias clave con los demás paneles](../design/ux/04-wireframes/dashboards/dashboards.md#war-room-key-differences-from-other-dashboards) describe las sugerencias de reasignación como «generadas por IA», después de que la [ADR-016](016-cross-cutting-resolutions.md) §49 las hiciera basadas en reglas para la v1.
3. La [ADR-016](016-cross-cutting-resolutions.md) enumera como capacidad nueva requerida una capa de abstracción de proveedores BYOM *y una pantalla de configuración*. Esa pantalla no existe ni en [settings.md](../design/ux/04-wireframes/settings/settings.md) (de SET-001 a SET-022) ni en [screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md).

## Decisión

### Ninguna capacidad de agente llega a producción hasta que se acepte esta ADR

Las cinco decisiones enumeradas arriba salen tal como están especificadas. Son acotadas, están revisadas y este punto de decisión no las toca.

Todo lo que vaya más allá queda condicionado. En concreto, una capacidad queda condicionada si tiene alguna de estas características:

- **Alcance de lectura más amplio que una sola funcionalidad** — acceso a contactos, registros de votantes, mensajes, donaciones o datos de auditoría fuera de la frontera de la funcionalidad acotada que la invoca.
- **Capacidad de invocar herramientas** — poder ejecutar operaciones de la plataforma en lugar de devolver texto para que una persona actúe.
- **Acción autónoma** — cualquier cambio de estado, envío o llamada externa que ninguna persona aprobó en el momento en que ocurrió.
- **Amplitud de credenciales** — una llave con alcance mayor que la única integración a la que sirve.

**Alternativas consideradas:** Dejar que el trabajo con agentes avance en paralelo a la revisión se descartó porque las decisiones de arquitectura que un agente implica —modelo de actores, alcance de credenciales, esquema de auditoría— son justamente las caras de revertir, y las fija la construcción de la Fase 2 del piloto ([mvp.md § 7. Fases](../spec/mvp.md#7-fases)). Escribir ahora una postura completa sobre agentes, antes de la revisión, se descartó porque los vacíos abarcan seguridad, cumplimiento, auditoría, trabajo sin conexión y precios, y resolverlos de una sentada repetiría el error de decidir funcionalidad por funcionalidad que esta ADR existe para corregir.

### La revisión condiciona la producción, no la experimentación

Nada de esto restringe experimentar con datos sintéticos en un entorno de desarrollo. El punto de decisión está sobre producción y sobre cualquier despliegue que contenga registros reales de votantes, donantes o afiliados. La distinción importa porque el piloto es el primer lugar donde las dos cosas convergen.

## Qué tiene que resolver esta ADR

Aceptarla exige una respuesta a cada uno de estos puntos, registrada aquí o en el documento que se nombra.

1. **Extensión del modelo de amenazas** — un actor no humano en [security.md § Actores de amenaza](../spec/security.md#actores-de-amenaza), que cubra la inyección de prompts, la exfiltración de modelo y el problema de concentración del principio 8 de [security.md § Principios de seguridad](../spec/security.md#principios-de-seguridad).
2. **Decisiones automatizadas y elaboración de perfiles** — una sección nueva en [compliance.md § Requisitos transversales de cumplimiento](../spec/compliance.md#requisitos-transversales-de-cumplimiento) que cubra el artículo 22 del RGPD, el artículo 20 de la LGPD, el estatus de los puntajes de apoyo y los datos del prompt como transferencia internacional.
3. **Modelo de auditoría** — un tipo de actor no humano, una relación de «en nombre de» y una regla de retención para prompts y respuestas coherente con la retención por niveles de la [ADR-016](016-cross-cutting-resolutions.md) §4.
4. **Postura sin conexión** — qué ve una persona en campo cuando una capacidad mediada por un agente no está disponible, y si alguna de esas capacidades puede siquiera situarse en un camino que la [ADR-005](005-offline-first-sync.md) exige que funcione sin conexión.
5. **Costo** — conciliación del costo por token de inferencia con [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma), incluido quién paga bajo BYOM y qué pasa en el nivel con modelo por defecto de la plataforma.
6. **El principio de la compuerta humana** — elevar *la máquina propone, la persona dispone* a principio transversal enunciado, con sus excepciones enumeradas en lugar de quedar implícitas.
7. **Datos compartimentados** — si un agente puede llegar a leer datos regidos por un contrato de intercambio bajo la [ADR-017](017-sharing-contract-trust-model.md), dado que la plataforma nunca es parte de un contrato.
8. **Pantalla de configuración de BYOM** — la pantalla a la que la [ADR-016](016-cross-cutting-resolutions.md) ya se comprometió, incorporada a los wireframes y al inventario de pantallas, con la advertencia sobre la frontera de cifrado ya especificada en [system.md § Arquitectura BYOM](../design/architecture/system.md#arquitectura-byom).

## Consecuencias

**Beneficios:**
- La revisión es un ejercicio de lectura ahora y una migración después. El corpus son 89 documentos en inglés y nada de código; después del piloto es un sistema vivo con un padrón electoral, registros de donaciones y notas de trabajo de campo sobre la política de personas identificables
- El punto de decisión es explícito y citable, así que el trabajo con agentes no puede llegar a cuentagotas por cinco decisiones de producto separadas, que es exactamente como llegó la IA
- Las cinco funcionalidades de IA aceptadas quedan desbloqueadas, así que nada de lo ya especificado espera por esto
- Tres inconsistencias de larga data quedan registradas donde se ven

**Costos:**
- El proyecto declaró terminadas la especificación y el diseño. Esto los reabre, y el estado de fase en `README.md` y `CLAUDE.md` tiene que decirlo
- Cualquier capacidad basada en agentes se retrasa lo que dure la revisión
- Una ADR `Propuesta` es un estado nuevo en este corpus —todas las demás están `Aceptada`— y hay que impedir que se lea como si estuviera zanjada

**Restricciones:**
- La plataforma nunca es parte de un contrato de intercambio ([ADR-017](017-sharing-contract-trust-model.md)), así que a ningún agente se le puede dar una vía de lectura que un contrato no conceda
- La regla de que no existe vía de lectura de superusuario en [comms-intelligence.md § 8.5 Acceso y retención](../spec/comms-intelligence.md#85-acceso-y-retención) obliga a cualquier diseño futuro de agentes, sin excepción por soporte ni por depuración
- Que las organizaciones sean dueñas de sus credenciales ([integrations.md § Principios de integración](../spec/integrations.md#principios-de-integración)) vale para los proveedores de modelos igual que para cualquier otra integración
- Esta ADR no agrega ninguna capacidad nueva ni revierte ninguna decisión aceptada. Deja registrado un punto de decisión y las preguntas que hay detrás

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (modelo de amenazas por extender), [ADR-004](004-data-model-integrity.md) (registro de auditoría por extender), [ADR-005](005-offline-first-sync.md) (restricción de trabajo sin conexión), [ADR-009](009-compliance-legal.md) (filtrado automático rechazado), [ADR-010](010-internationalization-localization.md) (traducción con IA y revisión), [ADR-012](012-external-integrations.md) (precedente de no dar visibilidad a terceros), [ADR-013](013-analytics-ai.md) (mensajes con IA; elección de modelo sustituida), [ADR-014](014-volunteer-onboarding.md) (concierge de IA), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, reasignación basada en reglas §49, retención por niveles §4), [ADR-017](017-sharing-contract-trust-model.md) (los contratos rigen toda frontera)
