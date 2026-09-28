# ADR-021: Flujo de aprobación de contenido

**Estado:** Aceptada
**Fecha:** 2026-09-28
**Revisada:** 2026-09-28 — se acota al flujo de aprobación. La primera versión también especificaba un programa de creadores; esa parte se retira. Ver [Lo que esta ADR ya no decide](#lo-que-esta-adr-ya-no-decide).
**Fuentes:** `spec/press.md`, `spec/users.md`, `design/ux/04-wireframes/content-ops/content-ops.md`, `decisions/003-identity-access-organization.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/018-ai-agent-posture.md`, `decisions/020-central-service-line-up-and-builders.md`

## Contexto

[press.md § Flujo de aprobación de publicaciones](../spec/press.md#flujo-de-aprobación-de-publicaciones) aprueba las publicaciones de la organización en redes sociales de una sola pasada: borrador, revisión, aprobación, programar o publicar. El #22 de la [ADR-016](016-cross-cutting-resolutions.md) hizo de la aprobación el valor por defecto para toda publicación. Ninguno de los dos dice qué pasa cuando quien revisa devuelve una pieza. En la práctica, la mayoría de las piezas pasan por más de una ronda: se acorta el texto de una publicación, se cambia una foto, y la versión que por fin sale no es la que se entregó primero.

Un conjunto de wireframes de baja fidelidad que llegó junto con el tablero de servicios de la alianza que recoge la [entrada 13 del diario](../diary/13-services-a-la-carte.md) dibujó bien esa revisión ronda por ronda: el historial de rondas, una comparación entre rondas, un comentario obligatorio en cada pedido de cambios y el escalamiento a quien da la aprobación final. Los mismos wireframes estaban construidos alrededor de un programa para manejar creadores de contenido externos. Para eso no es GreenGrass, y esta ADR se queda solo con la revisión.

### Conflictos que resuelve esta ADR

1. **[ADR-016](016-cross-cutting-resolutions.md) #22** aprueba una publicación una sola vez. La revisión por rondas necesita que cada ronda se guarde, se compare y se comente.
2. **[ADR-016](016-cross-cutting-resolutions.md) #23** limita la v1 a la carga directa de archivos y hace de la Biblioteca compartida de contenidos un pilar de la v2. Las rondas de revisión necesitan recursos versionados.

## Decisión

### El flujo de contenido generaliza la aprobación de publicaciones

El contenido que publica la organización pasa por un solo flujo: pendiente, borrador, en revisión, cambios pedidos, aprobado, publicado.

- **Cada ronda se guarda.** Un pedido de cambios abre una ronda nueva. Quien revisa ve la ronda actual junto a la anterior, con las diferencias marcadas.
- **Un pedido de cambios necesita un comentario.** Una pieza nunca se devuelve sin decir por qué.
- **Un Editor puede escalar a un Aprobador** y sumarlo al hilo sin pasar la pieza a aprobación.
- **La aprobación final sigue el Flujo de aprobación de publicaciones.** Donde la organización le asigna la aprobación final al candidato, aprueba el candidato, igual que con los comunicados de prensa; si no, aprueba un Aprobador. La aprobación en bloque funciona como ya funciona para las publicaciones programadas.
- **El valor por defecto del #22 se mantiene.** Todo contenido requiere aprobación antes de publicarse. Un Administrador de la organización puede relajarlo como lo permite el #22, y la excepción de emergencia de [press.md § Flujo de aprobación de publicaciones](../spec/press.md#flujo-de-aprobación-de-publicaciones) aplica sin cambios.
- **Publicar es la acción de una persona.** Una pieza aprobada sale cuando una persona la publica o a la hora que una persona programó. Ninguna máquina publica nada ([ADR-020](020-central-service-line-up-and-builders.md)). Una persona puede redactar una pieza con el constructor de texto que aceptó la ADR-020; el borrador entra al flujo como cualquier otro.

### Dos plantillas de rol

El modelo híbrido de la [ADR-003](003-identity-access-organization.md) gana dos plantillas de personal por defecto, especificadas en [users.md § Personal](../spec/users.md#personal): **Editor**, que revisa las piezas, pide cambios y escala; y **Aprobador**, que da la aprobación final. Se suman a las plantillas existentes. En una campaña pequeña, el Director de comunicaciones tiene las dos.

### Los recursos versionados se adelantan desde la v2

Una ronda de revisión no significa nada sin el recurso que revisó. El recurso de cada ronda se guarda como una versión, con una comparación contra la ronda anterior. Ese almacenamiento es el núcleo de la Biblioteca compartida de contenidos, y pasa a la primera construcción del flujo. El resto de la biblioteca sigue siendo un pilar de la v2: etiquetado, búsqueda, seguimiento de uso, gestión de derechos, colecciones de marca y reutilización entre funcionalidades.

### La aprobación desde WhatsApp no se decide aquí

En los mercados objetivo, los candidatos viven en WhatsApp, y aprobar una pieza desde una tarjeta de WhatsApp es una superficie obvia para el último paso de este flujo. La única versión dibujada hasta ahora tiene un agente de IA que prepara las piezas y las programa, y queda reservada como el ejemplo desarrollado de la [ADR-018](018-ai-agent-posture.md). Si una persona puede aprobar desde WhatsApp sin ningún agente de por medio queda anotado como pregunta abierta en [press.md § Preguntas abiertas](../spec/press.md#preguntas-abiertas).

### Lo que esta ADR ya no decide

La primera versión de esta ADR, aceptada más temprano el mismo día, también especificaba un programa para manejar creadores de contenido. Se retira por completo, porque GreenGrass no es una herramienta para manejar creadores de contenido. Queda anotado aquí para que el cambio de rumbo se vea en vez de pasar en silencio:

- **Los creadores como registros de Contacto**, con niveles de la A a la D, y las relaciones con creadores entre organizaciones bajo un contrato de intercambio.
- **El despacho** de encargos y publicaciones a los creadores, con seguimiento de la entrega por creador y recordatorios.
- **Las rutas por nivel** hacia la aprobación en varias rondas o la simple, y la aprobación en bloque de los niveles bajos.
- **Una bandeja de WhatsApp de doble vía** para las entregas y las conversaciones con los creadores.
- **La interacción por creador**, solo para el equipo y sin orden de posiciones.
- **La plantilla de rol de Gestor de creadores.**
- **El cumplimiento para los creadores**: los avisos legales que llevaban los despachos, las etiquetas de contenido patrocinado y la pregunta sobre la contribución en especie para el asesor legal.
- **Las tres pantallas de IA del prototipo**, que la ADR-018 tenía reservadas como su ejemplo desarrollado. El ejemplo desarrollado de la ADR-018 es ahora el flujo de aprobación por WhatsApp.

Ocho de las doce pantallas de operaciones de contenido se fueron con él. Las cuatro que quedan son el panel, la revisión de contenido, la cola de aprobación y la aprobación.

### Orden interno: avisos de enmienda

Esta ADR agrega una entrada **Enmendada por** a la [ADR-016](016-cross-cutting-resolutions.md) por el #22 y el #23.

## Consecuencias

**Beneficios:**
- Una pieza que va y viene conserva su historial, y quien aprueba ve qué cambió y por qué
- La parte de la Biblioteca compartida de contenidos que la revisión necesita llega cuando llega la revisión
- El flujo es el mismo que el candidato ya usa para los comunicados de prensa y las publicaciones, con rondas añadidas

**Costos:**
- Adelantar los recursos versionados agrega almacenamiento y trabajo de comparación a la primera construcción
- Retirar el programa de creadores el mismo día en que se aceptó deja un hueco en el registro entre la entrada 14 del diario y esta revisión; la entrada 15 del diario lo recoge

**Restricciones:**
- Todo contenido requiere aprobación por defecto; ninguna máquina publica nada
- Todo pedido de cambios lleva un comentario
- La aprobación desde WhatsApp está abierta; cualquier versión con un agente espera a la ADR-018

**ADR relacionados:** [ADR-003](003-identity-access-organization.md) (dos plantillas de rol agregadas al modelo híbrido), [ADR-016](016-cross-cutting-resolutions.md) (enmendada — el #22 se generaliza al flujo de contenido; los recursos versionados del #23 se adelantan), [ADR-018](018-ai-agent-posture.md) (el flujo de aprobación por WhatsApp reservado como ejemplo desarrollado de la revisión), [ADR-020](020-central-service-line-up-and-builders.md) (ninguna máquina publica nada; el constructor de texto puede redactar una pieza)
