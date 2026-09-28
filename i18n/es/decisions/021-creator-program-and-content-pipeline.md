# ADR-021: Programa de creadores y flujo de contenido

**Estado:** Aceptada
**Fecha:** 2026-09-28
**Fuentes:** `spec/press.md`, `spec/integrations.md`, `spec/users.md`, `design/ux/04-wireframes/content-ops/content-ops.md`, `decisions/003-identity-access-organization.md`, `decisions/015-product-scope.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/018-ai-agent-posture.md`, `decisions/020-central-service-line-up-and-builders.md`

## Contexto

Junto con el tablero de servicios de la alianza que recoge la [entrada 13 del diario](../diary/13-services-a-la-carte.md) llegó un conjunto de 21 wireframes de baja fidelidad para una herramienta de manejo de creadores. Describen un programa que corre sobre WhatsApp. Una lista de creadores se ordena en niveles de la A a la D. Sus entregas llegan por una bandeja de entrada y pasan por una revisión en varias rondas, con comparaciones entre rondas e hilos de comentarios. Los encargos y las piezas para publicar salen por una pantalla de despacho que da seguimiento a la respuesta de cada creador. Una cola de aprobación manda el trabajo de los niveles A y B a una aprobación en varias rondas, y el de los niveles C y D a un simple aprobar o rechazar. Alrededor hay un panel de interacción con una tabla de posiciones por creador, los ajustes de cada creador, una pantalla de equipo con cuatro roles y las notificaciones. Otras tres pantallas agregan un flujo de IA que puntúa cada elemento entrante contra un documento de estrategia y redacta instrucciones de producción. Los datos de ejemplo son comerciales: lanzamientos de producto y "Compra ya".

El corpus tiene la mayoría de las piezas y ninguna del conjunto. [press.md § Los contactos de medios son registros del CRM](../spec/press.md#los-contactos-de-medios-son-registros-del-crm) modela a los periodistas como registros de Contacto con campos de prensa. [press.md § Flujo de aprobación de publicaciones](../spec/press.md#flujo-de-aprobación-de-publicaciones) aprueba las publicaciones de las cuentas propias de la organización. [integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api) es de salida y depende de plantillas. Nada modela a las personas que publican en sus propias cuentas a pedido de una campaña, que es donde vive hoy buena parte del alcance de una campaña en los mercados objetivo. El tablero las llama "prensa e influencers". Los wireframes las llaman creadores.

### Conflictos que resuelve esta ADR

1. **[ADR-016](016-cross-cutting-resolutions.md) #22** aprueba las publicaciones que la organización publica ella misma. El flujo aprueba contenido que los creadores publican en sus propias cuentas, por rondas y con rutas por nivel.
2. **[ADR-016](016-cross-cutting-resolutions.md) #23** limita la v1 a la carga directa de archivos y hace de la Biblioteca compartida de contenidos un pilar de la v2. Las rondas de revisión necesitan recursos versionados con comparaciones.
3. **[ADR-015 § Fuera del alcance: gamificación del voluntariado](015-product-scope.md#fuera-del-alcance-gamificación-del-voluntariado)** descarta las tablas de posiciones. La pantalla de interacción de los wireframes ordena a los creadores por posición.
4. **[integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api)** permite mensajes de formato libre solo dentro de las 24 horas siguientes a que la otra persona escriba. Los wireframes tratan WhatsApp como un chat abierto.

## Decisión

### Los creadores se tratan exactamente como los contactos de prensa y los influencers

Un creador es un registro de Contacto con campos de creador, igual que un periodista es un registro de Contacto con campos de prensa ([users.md § Contacto](../spec/users.md#contacto)). No es un tipo de registro nuevo ni un segundo CRM. Una persona de la militancia, un vocero, un voluntario o un candidato que además crea contenido es la misma Persona en la lista única, con una faceta más.

- **Los influencers son creadores.** Una persona independiente con público propio que publica en sus propias cuentas recibe el mismo perfil. El corpus nunca especificó a los influencers; aquí es donde viven.
- **Cualquier organización los tiene, como cualquier organización tiene contactos de medios.** Un partido, una candidatura o una alianza puede llevar un programa de creadores. Ninguna regla les da los creadores a los partidos y la prensa a la alianza.
- **Una relación con un creador cruza el límite de una organización solo bajo un contrato de intercambio** ([ADR-017](017-sharing-contract-trust-model.md)), como cualquier otro contacto. El caso que lo vuelve real: una alianza que le da encargos al candidato de un partido miembro, en la cuenta propia del candidato, es una relación entre dos organizaciones, regida por su contrato, y cualquiera de las dos partes puede restringirla de forma unilateral.

**Alternativas consideradas:** Se descartó un tipo de registro propio para los creadores porque duplica a la Persona y convierte a un ser humano que hace voluntariado, dona y publica en tres registros. Se descartó asignar los programas de creadores a los partidos y las relaciones de prensa a la alianza por la misma razón por la que la ADR-017 descartó los valores por defecto por peldaño: mete en el modelo de datos un juicio político sobre qué organización hace qué.

### Tres plantillas de rol

El modelo híbrido de la [ADR-003](003-identity-access-organization.md) gana tres plantillas de personal por defecto, especificadas en [users.md § Personal](../spec/users.md#personal): **Editor**, que revisa las entregas, pide cambios y despacha; **Aprobador**, que da la aprobación final; y **Gestor de creadores**, que mantiene la lista y los niveles. Se suman a las plantillas existentes. En una campaña pequeña, el Director de comunicaciones tiene las tres.

### El flujo de contenido generaliza la aprobación de publicaciones

El contenido pasa por un solo flujo, sea una publicación propia de la organización o de un creador: pendiente, borrador, en revisión, cambios pedidos, aprobado, publicado.

- **El nivel decide la ruta.** El trabajo de los niveles A y B pasa por una aprobación en varias rondas: cada ronda se guarda, pedir cambios exige un comentario, y un Editor puede escalar a un Aprobador. El trabajo de los niveles C y D recibe una aprobación simple, aprobar o rechazar, y se puede aprobar en bloque.
- **El valor por defecto del #22 se mantiene.** Todo contenido requiere aprobación antes de publicarse. Un Administrador de la organización puede relajarlo como lo permite el #22, y la excepción de emergencia de [press.md § Flujo de aprobación de publicaciones](../spec/press.md#flujo-de-aprobación-de-publicaciones) aplica sin cambios.
- **Un despacho es el envío de una persona.** Un despacho es una pieza para publicar o un encargo. Va a creadores con nombre o a un nivel, se sigue la entrega y la respuesta de cada creador, y los recordatorios van solo a quienes no han respondido. Ninguna máquina despacha nada ([ADR-020](020-central-service-line-up-and-builders.md)).

### Los recursos versionados se adelantan desde la v2

Una ronda de revisión no significa nada sin el recurso que revisó. El recurso de cada ronda se guarda como una versión, con una comparación contra la ronda anterior. Ese almacenamiento es el núcleo de la Biblioteca compartida de contenidos, y pasa a la primera construcción del programa de creadores. El resto de la biblioteca sigue siendo un pilar de la v2: etiquetado, búsqueda, seguimiento de uso, gestión de derechos, colecciones de marca y reutilización entre funcionalidades.

### La interacción por creador es solo para el equipo y nunca se ordena por posiciones

La interacción por creador se informa igual que ya se informa la interacción por publicación, con los mismos adaptadores de plataforma. La ve solo el equipo cuyas plantillas la incluyen, nunca se les muestra a los creadores y no lleva posición, puesto ni insignia. Eso la mantiene del lado de la analítica en la línea que traza la [ADR-015](015-product-scope.md#fuera-del-alcance-gamificación-del-voluntariado): el incentivo perverso que crea una tabla de posiciones viene de que los creadores vean dónde quedan. La asimetría que el piloto señala para el libro de contribuciones ([mvp.md § Apéndice — Hipótesis más allá del supuesto central](../spec/mvp.md#apéndice-hipótesis-más-allá-del-supuesto-central), H8) aplica aquí también, y es una razón para mantener esta vista acotada.

### WhatsApp es una bandeja de doble vía dentro de las reglas de la Business API

Los mensajes que envía un creador llegan a la bandeja de la organización, y el equipo puede responder libremente mientras la ventana de conversación está abierta: 24 horas desde el último mensaje del creador. Fuera de la ventana, solo se puede enviar una plantilla preaprobada. Un encargo despachado fuera de la ventana sale como una plantilla que lo anuncia, y su contenido llega cuando el creador responde. Las pantallas de despacho y de seguimiento muestran el estado de la ventana de cada creador. Los detalles están en [integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api).

**Alternativas consideradas:** Se descartó el teléfono propio de alguien del equipo porque saca la conversación de la organización, del registro de auditoría y del perímetro de cifrado. Se descartó mover los encargos solo al correo electrónico porque WhatsApp es donde ya están los creadores en los mercados objetivo.

### Las tres pantallas de IA no forman parte de esta decisión

El flujo de IA de los wireframes queda reservado para la revisión de la [ADR-018](018-ai-agent-posture.md) como su ejemplo desarrollado. Incluye una puntuación de afinidad estratégica al llegar cada elemento, un panel de análisis que recomienda redes y cita un documento de estrategia, e instrucciones de producción generadas. La bandeja de entrada se especifica aquí sin esas marcas de afinidad. La parte que más necesita la revisión es la clasificación de cada elemento entrante al llegar, que es una lectura en segundo plano que ninguna persona inició. Una persona sí puede redactar un encargo con el constructor de texto que aceptó la [ADR-020](020-central-service-line-up-and-builders.md).

### Cumplimiento

- **Avisos legales.** El contenido que un creador publica a pedido de una campaña es comunicación política. Le aplican las reglas de [press.md § Avisos legales de publicidad política en redes sociales](../spec/press.md#avisos-legales-de-publicidad-política-en-redes-sociales), y un despacho lleva consigo el aviso legal obligatorio.
- **Creadores pagados.** El pago a un creador es un gasto de campaña, que se informa según [compliance.md § Reportes de financiamiento de campañas](../spec/compliance.md#reportes-de-financiamiento-de-campañas), y la publicación lleva la etiqueta de contenido patrocinado de la plataforma.
- **Creadores no pagados.** El contenido producido para una campaña sin pago puede contar como contribución en especie en algunas jurisdicciones. Esa pregunta va al asesor legal y queda anotada en [press.md § Preguntas abiertas](../spec/press.md#preguntas-abiertas).

### Orden interno: avisos de enmienda

Esta ADR agrega una entrada **Enmendada por** a la [ADR-016](016-cross-cutting-resolutions.md) por el #22 y el #23.

## Consecuencias

**Beneficios:**
- Un solo flujo para las publicaciones de la organización y las de los creadores, y un solo modelo de contacto para periodistas, influencers y creadores
- El alcance que vive en las cuentas propias de las personas recibe la misma disciplina de aprobación y de aviso legal que el de la organización
- Las relaciones con creadores entre organizaciones heredan el modelo de confianza en vez de necesitar uno propio
- La parte de la Biblioteca compartida de contenidos que la revisión necesita llega cuando llega la revisión

**Costos:**
- La bandeja depende de la ventana de conversación de WhatsApp, lo que hace el despacho más lento de lo que suponían los wireframes
- Adelantar los recursos versionados agrega almacenamiento y trabajo de comparación a la primera construcción del programa
- Una interacción solo para el equipo les da a los creadores menos retroalimentación que una tabla de posiciones pública

**Restricciones:**
- Los creadores son registros de Contacto; no hay un tipo de registro de creador
- Cualquier organización puede llevar un programa de creadores; las relaciones con creadores entre organizaciones necesitan un contrato de intercambio
- Todo contenido requiere aprobación por defecto; ninguna máquina despacha
- La interacción por creador nunca se les muestra a los creadores y nunca se ordena por posiciones
- Las pantallas de IA y la clasificación de lo entrante esperan a la ADR-018

**ADR relacionadas:** [ADR-003](003-identity-access-organization.md) (tres plantillas de rol agregadas al modelo híbrido), [ADR-015](015-product-scope.md) (sin gamificación, lo que se respeta haciendo la interacción solo para el equipo), [ADR-016](016-cross-cutting-resolutions.md) (enmendada — el #22 se generaliza al flujo de contenido; los recursos versionados del #23 se adelantan), [ADR-017](017-sharing-contract-trust-model.md) (relaciones con creadores entre organizaciones), [ADR-018](018-ai-agent-posture.md) (las pantallas de IA reservadas como ejemplo desarrollado de la revisión), [ADR-020](020-central-service-line-up-and-builders.md) (ninguna máquina despacha; el constructor de texto puede redactar un encargo)
