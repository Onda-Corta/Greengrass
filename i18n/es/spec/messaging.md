# Comunicaciones internas y notificaciones

## Propósito

Este documento especifica el sistema de comunicación interna de GreenGrass: cómo el personal, los candidatos y los voluntarios se comunican entre sí dentro de la plataforma. Es distinto de las comunicaciones externas (campañas de correo, envíos masivos de SMS, contacto con votantes por WhatsApp), que se especifican en workflows.md.

Las comunicaciones internas fueron apareciendo como un hueco en varias especificaciones: workflows.md las identificó como algo que necesitaba su propio documento, security.md decidió cifrado de extremo a extremo (E2E) por defecto con custodia de llaves opcional, users.md definió la mensajería candidato-equipo como capacidad central, y gotv.md dejó clara la necesidad de coordinación en tiempo real desde el centro de mando.

Las campañas políticas tienen requisitos de comunicación propios: los mensajes pueden contener información estratégica sensible, la rotación de personal es alta, las amenazas de seguridad son reales y el ritmo varía muchísimo (tranquilo entre elecciones, frenético durante el GOTV). El sistema de comunicación tiene que aguantar todo eso.

## Filosofía de comunicación

1. **Seguridad por defecto.** Cifrado de extremo a extremo para todos los mensajes internos (decidido en security.md). La plataforma no puede leer el contenido a menos que la organización active explícitamente la custodia de llaves.
2. **Con forma de campaña, no de empresa.** Las campañas no son compañías. Los patrones de comunicación son planos, rápidos y contextuales, no cadenas jerárquicas de aprobación. Esto tiene que sentirse más como Signal que como Outlook.
3. **Rico en contexto.** Un mensaje sobre un votante, una donación, un territorio o un evento debe enlazar a ese objeto. La comunicación y la acción ocurren en el mismo lugar.
4. **Tolerante a la falta de conexión.** Los mensajes se encolan sin conexión y se entregan al reconectar. No se pierde ningún mensaje.
5. **Con el ruido bajo control.** El día de elecciones genera cientos de eventos. El sistema de notificaciones tiene que ayudar a la gente a enfocarse, no ahogarla.

## Tipos de mensaje

### Mensajes directos

Conversaciones uno a uno entre dos usuarios cualesquiera de la misma organización.

- **Entre personal** — el caso más común. Director de campo a Coordinador de voluntarios, Director de comunicaciones a Administrador de la organización, etc.
- **Candidato a personal** — los candidatos se comunican con su equipo clave por la misma interfaz de mensajería. Según users.md, la interfaz del candidato está curada: ve una versión simplificada, pero la mensajería es completa.
- **Personal a voluntarios** — los Líderes de equipo y el personal pueden escribirle a voluntarios individuales (cambios de horario, actualizaciones de asignación, seguimientos).

### Conversaciones grupales

Conversaciones de varias personas para coordinar equipos.

- **Grupos improvisados** — cualquier usuario puede crear una conversación grupal y añadir gente. No hace falta estructura formal.
- **Grupos permanentes** — grupos que duran toda la campaña (por ejemplo, "Liderazgo", "Equipo de campo", "Finanzas"). Los crea el personal; la membresía la maneja quien lo creó o los administradores de la organización.
- **Grupos ligados a equipos** — se crean automáticamente al crear un Equipo (según la estructura de equipos de users.md). Incluyen a todos sus integrantes. El Líder de equipo maneja la membresía.

**DECIDIDO: Hilos opcionales.** Por defecto los mensajes aparecen en un flujo cronológico plano, pero cualquier mensaje se puede responder como hilo. Los hilos evitan que las conversaciones laterales ensucien el flujo principal sin perder la simplicidad de un chat grupal cuando el grupo es chico. Equilibra la necesidad de velocidad de la campaña (chat plano) con la de escala (hilos cuando los grupos crecen durante el GOTV).

### Difusiones

Mensajes de uno a muchos, del personal hacia grupos grandes.

- **Anuncios a toda la organización** — el Administrador de la organización o el personal designado puede mandar un mensaje a todo el personal, a todos los voluntarios o a toda la organización. Son de solo lectura: no se puede responder a la difusión (pero sí abrir un mensaje directo con quien la envió).
- **Difusiones por rol** — envío a todos los que tienen cierto rol (todos los Líderes de equipo, todo el personal de campo).
- **Difusiones geográficas** — envío a todo el personal y voluntarios asignados a una zona (precinto, distrito, región).
- **Difusiones por turno** — envío a todos los voluntarios asignados a un turno o evento específico.

Las difusiones no van cifradas de extremo a extremo: usan cifrado del lado del servidor (la llave de sobre de la organización), porque apuntan a grupos grandes y el intercambio individual de llaves no es práctico. Esto se advierte en la interfaz.

### Mensajes contextuales

Mensajes adjuntos a objetos específicos de la plataforma, para conversar en contexto.

- **Notas de votante o contacto** — ya especificadas en workflows.md (notas de trabajo de campo). Son datos, no mensajes, y se cifran según el modelo de datos.
- **Comentarios de evento** — el personal puede discutir un evento (logística, problemas) en un hilo adjunto al evento.
- **Comentarios de turno** — los Líderes de equipo y el personal pueden hablar de un turno específico (voluntarios que no aparecieron, problemas de materiales) en un hilo adjunto al turno.
- **Hilos de incidente** — los incidentes reportados por observadores electorales (gotv.md) tienen sus propios hilos de comentarios para discutir el escalamiento.
- **Donaciones marcadas** — las donaciones marcadas por cumplimiento (fundraising.md) pueden tener hilos de discusión para su revisión.

**DECIDIDO: Heredan la configuración de la organización.** Los mensajes contextuales siguen el modo de cifrado de la organización. Si la organización tiene custodia de llaves activada, usan cifrado del lado del servidor (buscables, accesibles para cualquiera con permiso sobre el objeto padre). Si la organización está en modo E2E, los mensajes contextuales también son E2E (con la contrapartida de que no hay búsqueda del lado del servidor y el acceso requiere intercambio de llaves con cada participante).

## Notificaciones

### Fuentes de notificaciones

La plataforma genera notificaciones desde muchos subsistemas:

| Fuente | Ejemplos |
|--------|----------|
| **Mensajería** | Mensaje directo nuevo, mensaje nuevo de grupo, @mención, difusión recibida |
| **Asignaciones** | Turno nuevo, reasignación de territorio, cambio de punto de concentración |
| **GOTV** | Sugerencia de reasignación, solicitud de transporte, escalamiento de incidente de observador |
| **Recaudación de fondos** | Donación marcada por cumplimiento, fallo de donación recurrente, solicitud de reembolso |
| **Cumplimiento** | Límite de contribución cerca, vencimiento de consentimiento, fecha límite de reporte, solicitud de un titular de datos |
| **Voluntarios** | Alta de voluntario nuevo, capacitación completada, vencimiento de certificación |
| **Eventos** | Confirmación de asistencia, recordatorio de evento, cancelación de evento |
| **Sistema** | Alerta de seguridad, fallo de sincronización, aviso de actualización, notificación de brecha |

### Canales de notificación

Las notificaciones se pueden entregar por varios canales:

- **En la app** — contadores, bandeja de notificaciones, aviso emergente o banner para lo urgente. Siempre disponible.
- **Notificación push** — push móvil vía Capacitor. Requiere permiso del dispositivo.
- **Resumen por correo** — resumen configurable de notificaciones (inmediato, cada hora, diario o apagado). Para quien no vive dentro de la app.
- **SMS** — reservado solo para alertas críticas (brechas de seguridad, escalamientos urgentes de GOTV). Requiere consentimiento expreso.

### Prioridad de las notificaciones

**DECIDIDO: Prioridad configurable por el usuario.** Cada persona configura sus preferencias por fuente: qué canal de entrega (en la app, push, correo, SMS), qué nivel de prioridad, y silenciar o no. Control total sobre la propia experiencia de notificaciones. Las alertas de seguridad y las notificaciones de brecha son la única excepción: siempre se entregan con prioridad crítica y no se pueden silenciar.

### No molestar y horas de silencio

- **Modo No molestar** — suprime todas las notificaciones no críticas. Solo pasan las alertas de seguridad y los incidentes de observadores con severidad de emergencia.
- **Horas de silencio** — configurables por usuario. Durante esas horas no se entrega nada salvo alertas críticas. Lo encolado se entrega cuando terminan.
- **Anulación del día de elecciones** — durante las operaciones de GOTV activas, las horas de silencio quedan suspendidas para las notificaciones de GOTV (con consentimiento del usuario al configurar el día de elecciones).

## Comunicación del candidato

La persona candidata (users.md) tiene necesidades de comunicación propias:

### Interfaz curada

- Para el candidato la mensajería es una funcionalidad principal: es una de las cosas para las que más usa la plataforma.
- Su lista de mensajes muestra de forma prominente las conversaciones con el equipo clave (Gerente de campaña, Director de comunicaciones, Director de finanzas).
- Las conversaciones grupales en las que participa (por ejemplo, "Liderazgo") están a mano.
- No ve todo el panorama de chats de la organización: solo las conversaciones en las que está.

### Patrones propios del candidato

- **Mensajes de informe** — el equipo puede mandar informes estructurados (puntos de mensaje, cambios de agenda, resúmenes de encuestas) que se ven distintos de la conversación casual. Son mensajes con plantilla propia, no chat libre.
- **Solicitudes de aprobación** — el equipo puede mandar cosas para que el candidato apruebe (borrador de comunicado de prensa, publicación en redes, correo de recaudación). El candidato aprueba, rechaza o comenta. Queda registrado para auditoría.
- **Integración con la agenda** — los mensajes pueden referirse a eventos del calendario. "Tu evento de las 3pm en [lugar] se movió a las 4pm", con enlace al evento.

## Comunicación en alianzas

Las alianzas (workflows.md) necesitan comunicación entre organizaciones:

- **Canal de coordinación de la alianza** — una conversación grupal compartida con representantes designados de cada organización miembro. Opera en la capa de federación.
- **Mensajes directos entre organizaciones** — el personal de la alianza puede escribirle directamente a personal de otras organizaciones miembro (sujeto a las reglas de intercambio de la alianza).
- **Difusiones de la alianza** — quien coordina la alianza puede mandar anuncios a todas las organizaciones miembro.

**DECIDIDO: Negociación de llaves por organización.** Los mensajes de la alianza usan una llave de grupo generada de forma independiente, distribuida a cada organización miembro cifrada con su llave pública. La llave rota en cada cambio de membresía (cuando una organización entra o sale), lo que garantiza secreto hacia adelante (forward secrecy: los nuevos no pueden leer el historial) y seguridad tras compromiso (quien se va no puede leer lo que viene). Rotar la llave es una ceremonia de verdad, y eso hace que entrar o salir de la alianza se sienta como el acto consecuente que es, además de darle al flujo de entrada y salida un momento concreto sobre el cual construir. Es más complejo que cifrar en la capa de federación, pero es consistente con el modelo de soberanía: no se introduce ninguna frontera de confianza nueva.

## Comunicación del centro de mando

Los centros de mando del día de elecciones (gotv.md) tienen necesidades de comunicación especializadas:

### Canal del centro de mando

- **Canal dedicado** — se crea automáticamente al activar las operaciones de GOTV para una elección. Incluye a todo el equipo del centro de mando (Administrador de la organización, Directores de campo, Coordinador de transporte, Director de comunicaciones, contactos del equipo legal).
- **Actualizaciones estructuradas** — el canal recibe actualizaciones automáticas: hitos de participación, sugerencias de reasignación, alertas de acumulación de solicitudes de transporte, escalamientos de observadores.
- **Información fijada** — la información de referencia queda fijada arriba: horas de cierre de los centros, contactos de emergencia, números de la línea legal, procedimientos de escalamiento.

### Comunicación de campo durante el GOTV

- **Líder de equipo → centro de mando** — los Líderes de equipo pueden escalar incidentes del terreno directamente al canal del centro de mando.
- **Centro de mando → campo** — el equipo del centro de mando puede difundir a todos los voluntarios activos en campo (por ejemplo: "A todo el equipo de campo: pasen a los territorios de la tarde ahora").
- **Mensajes de coordinación de transporte** — las solicitudes de transporte y las asignaciones de conductores generan notificaciones en el hilo de coordinación de transporte.

## Requisitos técnicos

### Implementación del cifrado de extremo a extremo

Según lo decidido en security.md y system.md:

- **Protocolo:** Signal Protocol (Double Ratchet) o equivalente. Bien auditado, ampliamente implementado, maneja bien varios dispositivos.
- **Generación de llaves:** cada usuario genera un par de llaves pública/privada durante la incorporación ([system.md § Autenticación en modo de campo](../design/architecture/system.md#autenticación-en-modo-de-campo)). Las llaves privadas nunca salen del dispositivo.
- **Varios dispositivos:** una persona puede tener varios dispositivos (celular y computadora). La distribución de llaves entre dispositivos usa el patrón establecido (un dispositivo nuevo se autoriza desde uno existente o por recuperación con contactos de confianza).
- **Cifrado de grupo:** protocolo Sender Keys para mensajes grupales (cada emisor tiene una llave compartida con todos los integrantes del grupo — eficiente, una sola operación de cifrado por envío sin importar el tamaño del grupo).
- **Custodia de llaves (opcional):** cuando la organización activa la custodia, una copia de la llave privada del usuario se cifra con la llave de sobre de la organización y se guarda en el servidor. Habilita la búsqueda del lado del servidor y la recuperación de dispositivos sin contactos de confianza.

### Almacenamiento de mensajes

- **En el dispositivo:** los mensajes se guardan en la base de datos local cifrada (SQLCipher). Disponibles sin conexión.
- **En el servidor (modo E2E):** el servidor guarda bloques cifrados. No puede leer el contenido. Guarda metadatos (emisor, destinatario, fecha y hora, ID del mensaje) para poder entregarlos.
- **En el servidor (modo custodia):** el servidor puede descifrar e indexar los mensajes para búsqueda. Misma política de retención que el resto de los datos de la organización.
- **Retención:** los mensajes siguen la política de retención configurada por la organización. Al vencer, se borran del servidor. Las copias en el dispositivo quedan hasta que el usuario las borre o se limpie el dispositivo.

### Entrega de mensajes

- **Entrega en línea:** los mensajes se entregan en tiempo real por conexión WebSocket.
- **Encolado sin conexión:** si el destinatario está desconectado, el mensaje se encola en el servidor y se entrega en la próxima conexión. La cola sigue el mismo protocolo de sincronización que el resto de los datos (event sourcing, system.md).
- **Confirmaciones de entrega:** quien envía ve cuándo el mensaje llegó al servidor y cuándo llegó al dispositivo del destinatario. Se muestra con marcas de cotejo (una = enviado, dos = entregado).

**DECIDIDO: Sin confirmaciones de lectura.** La plataforma no registra ni muestra cuándo se leyó un mensaje. Solo confirmaciones de entrega (llegó al servidor, llegó al dispositivo). Privacidad primero, consistente con una filosofía de mensajería centrada en la seguridad.

### Búsqueda

- **Modo E2E (sin custodia):** la búsqueda es solo del lado del cliente. La app busca en la base local del dispositivo. Se limita a los mensajes que ese dispositivo sincronizó. No hay búsqueda del lado del servidor.
- **Modo custodia:** búsqueda completa del lado del servidor sobre todos los mensajes. Los resultados respetan el acceso de cada persona: solo se busca en conversaciones en las que participa.
- **Mensajes contextuales:** si usan cifrado del lado del servidor (según la decisión de arriba), siempre son buscables desde el servidor.

### Comportamiento sin conexión

- **Lectura:** todos los mensajes sincronizados están disponibles sin conexión. Se puede leer el historial completo.
- **Redacción:** se pueden escribir y enviar mensajes sin conexión. Se encolan localmente y salen cuando vuelve la conectividad.
- **Recepción:** los mensajes enviados mientras la persona estaba desconectada se encolan y se entregan al reconectar. No se pierde nada.
- **Sincronización de grupos:** al volver en línea, la app sincroniza en orden cronológico los mensajes grupales que se perdió.

### Multimedia y archivos

- **Formatos admitidos:** imágenes, clips cortos de video, mensajes de voz, documentos PDF.
- **Límites de tamaño:** configurables por organización (por defecto: 25MB por adjunto).
- **Almacenamiento:** los adjuntos se guardan cifrados (E2E en modo sin custodia, llave de sobre en modo custodia). Cuentan contra la cuota de almacenamiento de la organización.
- **Miniaturas:** para las imágenes se genera una miniatura cifrada para vista previa. En modo E2E, la miniatura se cifra con la misma llave que la imagen completa.

**DECIDIDO: Mensajes de voz limitados a contextos de campo.** Los mensajes de voz están disponibles en conversaciones de campo — canales de Líder de equipo, hilos de turno, centro de mando de GOTV y difusiones a campo — donde el equipo no puede escribir con facilidad (caminando entre puertas, manejando). No es una funcionalidad general para todas las conversaciones. La transcripción automática (para búsqueda y accesibilidad) queda para cuando exista la infraestructura de IA.

## Moderación y seguridad

### Políticas de contenido

- GreenGrass no modera el contenido de los mensajes internos: son comunicaciones privadas dentro de una organización política. La organización (su Administrador) es responsable de sus propios estándares de comunicación.
- **Excepción:** la plataforma escanea contra hashes conocidos de CSAM (material de abuso sexual infantil), como exige la ley en casi todas las jurisdicciones, y bloquea ese contenido. El escaneo opera sobre hashes, no sobre el contenido, y funciona incluso en modo E2E.

### Reporte de abuso

- Cualquier persona puede reportar un mensaje o una conversación al Administrador de la organización. El reporte incluye el contenido del mensaje (lo aporta quien reporta: la plataforma no rompe el E2E para extraerlo).
- Los Administradores pueden sacar gente de las conversaciones grupales y desactivarle la mensajería a usuarios específicos.
- No hay moderación a nivel de plataforma (GreenGrass) de los mensajes internos. Aplica la autonomía de la organización.

### Borrado de mensajes

- **Quien envía puede borrar** — se puede borrar el mensaje propio. En modo E2E, eso manda una solicitud de borrado a los dispositivos de todos los destinatarios (con el mejor esfuerzo: si un dispositivo está desconectado, el mensaje puede seguir ahí hasta que sincronice el borrado).
**DECIDIDO: Sin mensajes que desaparecen.** Todos los mensajes persisten hasta que quien los envió los borre a mano o hasta que venza la política de retención de datos de la organización. Más simple, y evita posibles problemas de cumplimiento en jurisdicciones que exijan retener las comunicaciones de campaña.

## Modos de comunicación específicos del GOTV

### Modo día de elecciones

Cuando se activan las operaciones de GOTV:

- **Cambian las prioridades de notificación** — las notificaciones de GOTV (participación, sugerencias de reasignación, solicitudes de transporte, escalamientos de observadores) suben a prioridad alta.
- **El canal del centro de mando pasa a ser el principal** — queda fijado arriba en la lista de mensajes de cada integrante del centro de mando.
- **Difusión a campo** — el equipo del centro de mando gana un botón de un toque para difundir a todos los voluntarios activos en campo.
- **Actualizaciones automáticas de estado** — el sistema publica resúmenes periódicos de participación en el canal del centro de mando (por ejemplo, cada 30 minutos).

### Cierre después de la elección

- El modo día de elecciones se desactiva cuando cierran los centros (o a mano, por el Administrador de la organización).
- El canal del centro de mando sigue existiendo para la coordinación posterior, pero pierde su estatus de prioridad.
- Las prioridades de notificación vuelven a la normalidad.
- El historial de mensajes del día se conserva según la política de retención.

## Preguntas abiertas

1. **Llamadas de voz y video** — ¿debería la plataforma soportar llamadas de voz o video entre usuarios (no las llamadas a votantes, que están en workflows.md)? Añadiría bastante complejidad, pero podría reemplazar la necesidad de herramientas externas como Signal o WhatsApp para coordinarse internamente. La integración con Jitsi (integrations.md) podría cargar con eso.

2. **Reacciones a mensajes** — ¿debería la gente poder reaccionar a un mensaje con emoji? Es una forma barata de acusar recibo sin responder. Habitual en la mensajería moderna. Cuesta poco implementarlo, pero añade complejidad a la interfaz.

3. **Reenvío de mensajes** — ¿debería poderse reenviar un mensaje de una conversación a otra? Útil para compartir información entre equipos. Tiene implicaciones de privacidad: quien lo escribió puede no haberlo escrito para una audiencia más amplia.

4. **Mensajes de bots y automatizaciones** — ¿deberían los sistemas automatizados poder publicar en los canales (por ejemplo, "Nuevo voluntario: [nombre]" en el canal #volunteers)? Útil para estar al tanto, pero puede volverse ruidoso.

5. **Puente con mensajería externa** — parte del personal de campaña puede preferir sus herramientas de siempre (Signal, WhatsApp, Telegram) para la comunicación interna. ¿Debería la plataforma ofrecer un puente que refleje los mensajes internos en plataformas externas? Tiene implicaciones serias de seguridad y cumplimiento.

<!-- REVISIT: La implementación del Signal Protocol necesita una auditoría de seguridad cuidadosa antes del lanzamiento. Considerar usar una biblioteca establecida (libsignal) en vez de implementarlo desde cero. -->
<!-- REVISIT: Hay que analizar los costos de almacenamiento de los adjuntos multimedia en modo E2E. Los archivos cifrados de extremo a extremo no se pueden deduplicar del lado del servidor, lo que encarece el almacenamiento frente al cifrado del lado del servidor. -->
