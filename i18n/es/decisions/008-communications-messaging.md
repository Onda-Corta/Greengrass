# ADR-008: Comunicaciones y mensajería

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/messaging.md`, `spec/workflows.md`

## Contexto

La mensajería interna de una campaña política lleva información estratégica delicada —planes de campaña, inteligencia sobre votantes, comunicaciones del candidato— que puede causar daño real si se filtra. Al mismo tiempo, las campañas necesitan una comunicación rápida, plana y contextual, que se sienta más como Signal que como Outlook. El sistema de mensajería tiene que cumplir tanto los requisitos de seguridad (cifrado de extremo a extremo, sin acceso de la plataforma al contenido de los mensajes) como los operativos (mensajes contextuales asociados a votantes, eventos y turnos; difusiones a cientos de voluntarios de campo; coordinación del centro de mando el día de elecciones).

Las comunicaciones externas (campañas de correo, SMS, contacto por WhatsApp con votantes) requieren un modelo de consentimiento distinto: seguimiento por canal y por finalidad para cumplir las leyes de protección de datos de todas las jurisdicciones objetivo.

## Decisión

### Cifrado de extremo a extremo por defecto en los mensajes internos

Toda la mensajería interna (mensajes directos, conversaciones de grupo) va cifrada de extremo a extremo (E2E) con el Signal Protocol (Double Ratchet) o equivalente. GreenGrass no puede leer el contenido de los mensajes y no tiene nada que entregar si se ve obligada por vía legal. La custodia de llaves del lado del servidor es opcional y la activa la organización, no cada usuario: habilita la búsqueda del lado del servidor y facilita la recuperación de dispositivos, a cambio de que GreenGrass pueda acceder al contenido mediante un proceso legal válido.

La decisión se muestra con claridad: si la custodia está activada, la interfaz de mensajería indica que los mensajes no van cifrados de extremo a extremo. La custodia de llaves es una decisión de la organización que toma el Administrador de la organización, no una elección de cada usuario.

**Alternativas consideradas:** Cifrar solo del lado del servidor se descartó porque convierte a GreenGrass en blanco de requerimientos legales de datos. Solo E2E, sin opción de custodia, se descartó porque algunas organizaciones prefieren poder buscar y recuperar dispositivos con facilidad antes que la seguridad máxima.

### Seguimiento del consentimiento por canal y por finalidad

El consentimiento para las comunicaciones externas se registra por cada combinación de canal (correo, SMS, WhatsApp) y finalidad (transaccional, relacionada con eventos, recaudación de fondos, GOTV (Get Out The Vote — movilización del voto), activismo e incidencia, boletín). Unos valores predeterminados inteligentes infieren un consentimiento inicial razonable a partir del contexto en que se dio el consentimiento expreso: dar un número de celular para confirmar asistencia a un evento implica consentimiento de SMS transaccional y de eventos, pero no de recaudación de fondos.

El consentimiento es revocable (baja con un clic y efecto inmediato), auditable (se registran las marcas de tiempo de otorgamiento y revocación), accesible (los simpatizantes manejan sus preferencias desde su perfil) y se hace cumplir (el sistema de comunicaciones verifica el consentimiento al momento de enviar: ningún mensaje sale sin consentimiento válido para ese canal y esa finalidad).

**Alternativas consideradas:** Un consentimiento expreso o una baja globales y simples se descartaron porque no cumplen con la LGPD, la PDPA ni la TCPA, que exigen consentimiento granular. El consentimiento por mensaje se descartó por ser tan granular que resulta impracticable, tanto para las personas como para el sistema.

### Hilos opcionales

Por defecto los mensajes aparecen en un flujo cronológico plano, pero a cualquier mensaje se le puede responder en un hilo. Eso equilibra la velocidad de la campaña (chat plano para equipos pequeños) con la escala (hilos cuando los grupos crecen durante el GOTV). Los hilos evitan que las conversaciones paralelas atiborren el flujo principal.

### Las difusiones usan cifrado del lado del servidor

Las difusiones (de uno a muchos, del personal a grupos grandes: toda la organización, por rol, por geografía, por turno) usan cifrado del lado del servidor con la llave de sobre de la organización, no E2E. Intercambiar llaves individuales con cada destinatario de una difusión es impracticable a escala. La interfaz revela el modo de cifrado de la difusión. Quien recibe no puede responder a una difusión: puede abrir un mensaje directo con quien la envió.

### Los mensajes contextuales heredan la configuración de cifrado de la organización

Los mensajes asociados a objetos de la plataforma (comentarios de eventos, hilos de turno, discusiones sobre donaciones marcadas, hilos de problemas reportados por observadores electorales) siguen el modo de cifrado de la organización. Las organizaciones en modo E2E tienen mensajes contextuales E2E (con la contrapartida de que no hay búsqueda del lado del servidor). Las organizaciones con custodia los tienen buscables. Así se evita un modelo de cifrado mixto y confuso dentro de una misma organización.

Los mensajes de la alianza usan una llave de grupo generada de forma independiente para la alianza, distribuida a cada organización miembro cifrada con la llave pública de esa organización. Las llaves rotan cada vez que cambia la membresía de la alianza, lo que asegura el secreto hacia adelante (forward secrecy) y la seguridad tras compromiso.

## Consecuencias

**Beneficios:**
- Con el cifrado de extremo a extremo por defecto, GreenGrass no tiene nada que revelar ante un requerimiento legal para la mayoría de las organizaciones
- El seguimiento del consentimiento por canal y por finalidad satisface los requisitos de protección de datos más estrictos (LGPD, PDPA, TCPA)
- Los hilos opcionales llevan la comunicación desde equipos de campaña pequeños hasta cientos de voluntarios de GOTV sin imponerles complejidad a los grupos chicos
- Los mensajes contextuales mantienen la conversación pegada a los datos de los que trata, y así se cambia menos de contexto
- La rotación de llaves de la alianza garantiza que quien se va no pueda leer los mensajes futuros

**Costos:**
- El cifrado de extremo a extremo elimina la búsqueda del lado del servidor: una pérdida real de experiencia de uso para las organizaciones que dependen de buscar en los mensajes
- Implementar el Signal Protocol exige una auditoría de seguridad cuidadosa (recomendación: usar la biblioteca establecida libsignal, no una implementación propia)
- Los archivos cifrados de extremo a extremo no se pueden deduplicar del lado del servidor, lo que encarece el almacenamiento
- Rotar las llaves de la alianza en cada cambio de membresía añade la sobrecarga de una ceremonia criptográfica

**Restricciones:**
- Sin confirmaciones de lectura: solo confirmaciones de entrega (enviado al servidor, entregado al dispositivo), en línea con una filosofía de privacidad ante todo
- Sin mensajes que desaparecen: todos persisten hasta que se borran a mano o vence la política de conservación, lo que evita problemas de cumplimiento
- Los mensajes de voz están acotados a las conversaciones de campo (canales de líder de equipo, hilos de turno, centro de mando de GOTV), donde escribir no es práctico
- Las alertas de seguridad y las notificaciones de brecha no se pueden silenciar: siempre se entregan con prioridad crítica

**ADR relacionados:** [ADR-002](002-security-threat-model.md) (arquitectura de cifrado, E2E como control de seguridad), [ADR-003](003-identity-access-organization.md) (comunicación en la alianza, mensajería entre organizaciones), [ADR-009](009-compliance-legal.md) (aplicación del consentimiento, restricciones del TSE a la mensajería)
