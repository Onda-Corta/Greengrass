# El arnés de agentes

**Un arnés por cliente, que actúa solo como las manos de una persona, y llega a un modelo solo por el enrutador de ese cliente**

Estado: aceptado en la revisión de la [ADR-018](../decisions/018-ai-agent-posture.md), 2026-11-26. Este documento especifica el mecanismo que la revisión decidió; el registro de la revisión, y lo que deja abierto, está en [ADR-018 § The review](../decisions/018-ai-agent-posture.md#la-revisión).
Redactado: 2026-11-26

---

## Propósito

El Core es un arnés de agentes por cliente. Cada capacidad de IA del producto —el chat, los coaches, los constructores, la traducción, el concierge— corre dentro de un solo conjunto de reglas sobre qué puede leer un modelo, qué puede hacer, quién responde por ello y adónde van sus llamadas. Este documento enuncia esas reglas una sola vez, para que ninguna funcionalidad invente las suyas.

La postura en un párrafo: el arnés nunca actúa por su cuenta. Lee lo que la persona que lo usa puede leer, más lo que la organización designó para él. No hace nada en segundo plano salvo el trabajo que una persona programó. Cada escritura la confirma una persona en el momento en que ocurre, y nada de lo que produce llega a un destinatario salvo por el envío de una persona. Cada llamada a un modelo pasa por el enrutador del propio cliente, bajo la política de proveedores de ese cliente. Y en el registro de auditoría nunca hay una entrada cuya autora sea un modelo.

## Qué es el arnés

Un arnés por instancia, dentro del enclave de la propia organización ([ADR-025](../decisions/025-identity-per-client.md)). Nunca es de varias organizaciones. Solo tiene las credenciales para las que la organización tiene derechos de uso —uno por servicio central por organización ([ADR-019](../decisions/019-central-services-and-metered-billing.md))— y llega a la acción solo a través de **operaciones declaradas**: operaciones que el manifiesto de un módulo nombra, cada una marcada como de lectura o de escritura ([ADR-022 § The module contract](../decisions/022-core-modules-and-lanes.md#el-contrato-de-módulo)). El modelo elige entre operaciones declaradas y no puede inventar otras.

Las cinco funcionalidades de IA que el corpus aceptó antes del arnés —la redacción de mensajes de activismo ([ADR-013](../decisions/013-analytics-ai.md)), la traducción ([ADR-010](../decisions/010-internationalization-localization.md)), el concierge ([ADR-014](../decisions/014-volunteer-onboarding.md)), BYOM ([ADR-016](../decisions/016-cross-cutting-resolutions.md) §38) y los constructores de texto ([ADR-020](../decisions/020-central-service-line-up-and-builders.md))— son configuraciones acotadas del arnés. Sus límites no cambian.

Una capacidad que se mantiene dentro de esta postura —el alcance de la persona, operaciones declaradas, escrituras confirmadas, credenciales con derecho de uso, el enrutador de modelos— no necesita ninguna revisión más. Cualquier cosa más allá es una ADR nueva.

## La compuerta humana

*La máquina propone, la persona dispone* es un principio transversal enunciado, con tres formas:

1. **Ningún agente despacha.** Nada llega a un destinatario salvo por el envío de una persona o una programación que una persona fijó. El arnés no tiene credencial para el transporte por canal.
2. **Cada escritura se confirma en el momento en que ocurre.** Las lecturas no necesitan confirmación; las escrituras siempre. La persona confirma con un toque en una tarjeta que muestra la operación y su destino en lenguaje llano.
3. **Las excepciones se enumeran, no se dejan implícitas.** Las compuertas humanas de las cinco funcionalidades aceptadas —revisión antes de enviar, visto bueno antes de publicar, escalamiento a una persona— son la enumeración. Nada más es una excepción.

Una programación que una persona fijó es un acto de esa persona, no una excepción: la persona eligió la cosa y el momento una vez, y el arnés lo ejecuta. Todo lo que el arnés hace se remonta a la petición de una persona, al toque de una persona o a la programación de una persona.

## Alcance de lectura

Decidido por fuente en la revisión.

- **El alcance de la persona que lo invoca.** El arnés lee lo que la persona que lo usa puede leer, en el momento en que lo pide: el CRM, los puntajes de apoyo, los totales de donaciones, todo lo que su rol y sus contratos incluyen. El arnés no tiene alcance de lectura propio.
- **Fuentes designadas: un acto de la organización, no de una persona.** El OA (Org Admin, el Administrador de la organización) designa los corpus en los que el arnés se puede anclar sin importar el alcance de quien lo invoca —los documentos de estrategia, la base de conocimiento, la capa de contexto de la organización ([spec/coaching.md § The organization's context layer](coaching.md#la-capa-de-contexto-de-la-organización)), los datos geográficos— por audiencia: para toda la organización, por rol, por coach. La designación queda registrada, y la lista completa está en un solo lugar que el cliente puede auditar. Un documento bajo un contrato de intercambio nunca se puede designar, porque la plataforma nunca es parte de un contrato ([ADR-017](../decisions/017-sharing-contract-trust-model.md)).
- **Datos compartimentados.** El arnés lee datos bajo un contrato de intercambio solo bajo el contrato de la persona que lo invocó, nunca más de lo que esa persona podría leer, y nunca en segundo plano. La lectura queda registrada como una lectura de esa persona a través del arnés. La regla de la vía de lectura de superusuario prohibida de [comms-intelligence.md § 8.5](comms-intelligence.md#85-acceso-y-retención) vincula al arnés de forma absoluta —operadores y personal de soporte incluidos.
- **Lecturas en segundo plano: solo para programaciones que una persona fijó.** Un resumen del día o un resumen programado puede prepararse en segundo plano, leyendo solo fuentes designadas y lo que la persona suscriptora puede leer, evaluado bajo su alcance en el momento de la preparación. Nunca datos compartimentados.
- **Exclusiones.** El arnés nunca lee credenciales, llaves ni secretos; los mensajes privados de una persona que no están dirigidos a quien lo invoca ni compartidos con ella; nada que la política de un carril marque como prohibido.
- **Entre organizaciones: nunca un alcance, solo una entrega.** El arnés nunca se mete en la instancia de otra organización. El material entre organizaciones llega solo como eventos filtrados por contrato en el bus ([ADR-024](../decisions/024-event-bus-as-federation.md)) —filtrado en el origen, campo por campo, denegación por defecto, opaco en tránsito. Una vez entregado, queda en esta instancia bajo el contrato con el que llegó, y el arnés lo lee solo bajo la regla de datos compartimentados de arriba. El arnés de una alianza lee la propia instancia de la alianza —sus registros más lo que entregaron los contratos de los miembros— y nunca el enclave de un miembro.

## El enrutador de modelos

Cada llamada a un modelo en una instancia pasa por el **enrutador de modelos** de esa organización. Ninguna funcionalidad llama directamente a un proveedor. El enrutador es el único punto de paso donde se hace cumplir la soberanía de proveedores y donde se mide el uso.

- **La política de proveedores es por organización.** La organización elige BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA), con su propio proveedor, endpoint y credenciales ([ADR-016](../decisions/016-cross-cutting-resolutions.md) §38), o el proveedor por defecto de la plataforma. BYOM llega a cualquier endpoint que la organización nombre, incluido un modelo autoalojado, así que la inferencia puede quedarse por completo dentro de la infraestructura propia de la organización.
- **Reglas de enrutado por clase de datos.** La organización, partiendo de los valores por defecto que pone el carril, dice qué proveedores pueden llevar qué clases de datos: el material de corpus público (prensa, difusión) puede ir a una API externa; los prompts que llevan datos personales solo van a proveedores que cumplen las reglas de residencia de la organización; los datos compartimentados nunca salen de la frontera de cifrado de la organización y solo llegan a endpoints dentro de esa frontera.
- **Requisitos permanentes para cualquier proveedor,** BYOM o de la plataforma: no entrenar con los prompts ni los datos de la organización; límites de conservación declarados; declarado como subencargado del tratamiento donde la ley lo exija ([spec/compliance.md § Automated processing and the harness](compliance.md#procesamiento-automatizado-y-el-arnés)).
- **La advertencia de la frontera.** Cuando una organización nombra un endpoint externo, la pantalla de ajustes muestra la advertencia de [system.md § The harness and the model router](../design/architecture/system.md#el-arnés-y-el-enrutador-de-modelos) en lenguaje llano: los datos del prompt salen de la frontera de cifrado.
- **Medición de uso.** Cada llamada es un evento de uso con actor bajo [ADR-019](../decisions/019-central-services-and-metered-billing.md), con precio según la regla del carril ([ADR-026](../decisions/026-two-lane-pricing.md)). Con BYOM el proveedor le factura directamente a la organización y nada se traslada.
- **La pantalla de ajustes.** Proveedores, credenciales, reglas de enrutado por clase de datos, la advertencia de la frontera y la medición actual se configuran en una pantalla de la UI de administración, debida por la [ADR-016](../decisions/016-cross-cutting-resolutions.md) y por el punto 8 de la revisión. Las credenciales viven en el almacén de llaves de la organización como cualquier otra credencial propia de la organización.

## Personas

Una **persona del arnés** es el arnés con un nombre, instrucciones, contexto designado y un conjunto de operaciones declaradas. Hay un solo arnés; las personas son cómo se presenta.

- **El chat** es el caso general: la interfaz principal del arnés, que actúa como las manos de la persona, con las operaciones de cada módulo activado ([ADR-023](../decisions/023-surfaces-chat-admin-field.md)).
- **Un coach** es una persona con las instrucciones de un rol y documentos de contexto. El coach acotado —lee la conversación, los adjuntos y sus documentos designados, no tiene operaciones, nunca habla primero— no tiene ninguna de las cuatro características condicionadas y sale fuera del punto de decisión ([spec/coaching.md](coaching.md)). Un coach con operaciones declaradas es el chat con otro nombre y sigue las mismas reglas.
- **El Agente de Campaña** es el chat con los módulos de contenido activados: una persona y un conjunto de módulos, no un módulo.

## Auditoría y conservación

La regla del modelo de auditoría: **la persona es el actor; el arnés es el canal.** No existe ningún tipo de actor no humano, y ninguna entrada del registro tiene a un modelo como autor.

- Cada lectura y escritura mediada por el arnés registra: la persona como actor; el componente del arnés como canal (el chat, un coach nombrado, un constructor); la operación del manifiesto invocada; y para las escrituras la referencia de confirmación —el toque, o la programación que la persona fijó.
- **El disparador** registra a qué respondía el arnés: la petición de una persona, un toque de confirmación o la programación de una persona. Un resumen del día programado registra a la persona suscriptora como actor, al arnés como canal y a su programación como disparador.
- **La conservación sigue los niveles de la [ADR-016](../decisions/016-cross-cutting-resolutions.md) §4, sin nivel nuevo.** Los cuerpos de prompts y respuestas son contenido del nivel Operacional: configurable por el OA entre 90 días y 5 años, 2 años por defecto, purgado como los cuerpos de mensajes, cubierto por la supresión y la exportación. Los metadatos de la llamada son del nivel de registro de auditoría, indefinidos: quién preguntó, canal, proveedor y modelo, versión de la política del enrutador, tokens y costo, operación, referencia de confirmación.
- **Procedencia, no explicación.** La salida de un modelo muestra en qué se apoyó —las fuentes designadas y el contexto usado, la operación, el modelo y el proveedor, citas para las afirmaciones de hecho— adaptando [comms-intelligence.md § 8.2](comms-intelligence.md#82-la-procedencia-es-obligatoria). Las sugerencias basadas en reglas siguen mostrando su regla y sus entradas.

## Seguridad

El arnés entra al modelo de amenazas como una superficie de ataque, no como principal: el delegado confundido que un atacante dirige a través del contenido que lee. El tratamiento completo está en [spec/security.md § The agent harness](security.md#el-arnés-de-agentes) y [§ Prompt injection](security.md#inyección-de-prompts). Las reglas estructurales:

- **El contenido no confiable es dato, nunca instrucciones.** Los artículos y publicaciones monitoreados, los mensajes y correos entrantes, las importaciones de CSV, las páginas web y los eventos del bus se marcan como no confiables al ingresar y nunca entran al canal de instrucciones. Los documentos designados y las instrucciones de coach escritas por la organización son confiables por designación, y los cambios de designación quedan registrados.
- **La inyección puede proponer, nunca disponer.** Un arnés dirigido por un atacante sigue teniendo solo operaciones declaradas, y cada escritura necesita el toque de una persona. La tarjeta de confirmación es el cable trampa.
- **La exfiltración está acotada por el enrutado.** Los datos compartimentados nunca llegan a un endpoint externo, pida lo que pida un arnés dirigido.

## Sin conexión

Ningún paso del arnés está en un camino que la [ADR-005](../decisions/005-offline-first-sync.md) exige que funcione sin conexión —trabajo de campo, inscripción de votantes, registro de entrada a eventos, resultados de observadores electorales, sincronización. Un manifiesto no puede declarar una capacidad de campo que dependa de una llamada a un modelo. Sin conexión, las superficies del arnés lo dicen claramente y ofrecen las conversaciones en caché; la UI de administración y la app de campo no se ven afectadas. Ninguna escritura queda en cola: cada escritura se confirma en vivo, así que no hay nada que encolar.

## Costo

La inferencia es un evento de uso medido, con precio según la regla de cada carril; con BYOM el proveedor le factura directamente a la organización. Con el chat como superficie principal, la inferencia es un costo del trabajo diario ordinario, no uno marginal, y las reglas de precio de los carriles la tratan como una línea del estado de cuenta. Qué incluye el «costo», qué lleva el proveedor por defecto de la plataforma y si algún plan gratuito tiene saldo medido son preguntas abiertas de la [ADR-026](../decisions/026-two-lane-pricing.md), no de este documento.

## Preguntas abiertas

- **Las pantallas debidas.** La pantalla de ajustes de proveedores (punto 8 de la revisión), la faceta de canal del visor de auditoría, y sus entradas en el inventario de pantallas y en los wireframes.
- **La aritmética de los precios,** en la [ADR-026](../decisions/026-two-lane-pricing.md).
- **Quién puede escribir un coach,** en [spec/coaching.md § Open questions](coaching.md#preguntas-abiertas) —también una pregunta de seguridad, porque las instrucciones escritas por la organización son confiables por designación.
