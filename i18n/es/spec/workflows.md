# Flujos de trabajo principales

## Resumen

Este documento define los recorridos centrales de las personas que usan la plataforma GreenGrass. Cada flujo de trabajo traduce una actividad real de campaña a una secuencia de interacciones con la plataforma, e identifica quién participa, qué pasa en cada paso y dónde aparecen las decisiones de diseño clave.

Los flujos están organizados por función de campaña, no por funcionalidad. Un mismo flujo puede tocar varias funcionalidades de la plataforma (CRM, comunicaciones, eventos, analítica).

### Asuntos transversales

Varias restricciones aplican a todos los flujos:

- **Capacidad sin conexión:** ¿Qué pasos tienen que funcionar sin conectividad? (Ver la sección de trabajo sin conexión de cada flujo)
- **Prioridad móvil:** Todo flujo tiene que poder usarse desde un celular. El escritorio es la experiencia ampliada, no la principal.
- **Multilingüe:** Todo el contenido y las interfaces de cara al usuario tienen que soportar los idiomas configurados por la organización.
- **Registro de auditoría:** Todo paso que modifique datos queda registrado (decidido en security.md).

---

## 1. Puesta en marcha de una organización

El recorrido que va de "queremos usar GreenGrass" a "estamos corriendo nuestra campaña ahí".

### Actores
- **Fundador de la organización** — quien monta la organización (gerente de campaña, líder del partido, candidato)
- **Administrador de la plataforma** — el equipo de GreenGrass (aprovisionamiento, soporte)

### Flujo

```
1. El fundador se registra en el sitio web de GreenGrass
2. Elige el tipo de entidad: Partido/Organización, Candidato o Alianza
   a. Si es Alianza: elige el modo de facturación por defecto de los servicios centrales de sus
      miembros — member_pays (por defecto) o alliance_pays (ADR-019). Cada miembro lo ve al afiliarse.
3. Elige el nivel de alojamiento (estándar / reforzado / máximo) y el país de residencia de los datos
4. Elige el modelo de cifrado (BYOK —Bring Your Own Key, la organización controla su propia
   llave de cifrado— por defecto; llaves gestionadas si lo pide)
5. El Administrador de la plataforma aprovisiona la organización
6. El fundador completa la incorporación como Administrador de la organización:
   a. Configura su passkey
   b. Configura el perfil de la organización (nombre, identidad visual, idiomas)
   c. Invita al personal inicial
   d. Configura el procesador o los procesadores de pago para recaudar
   e. Importa los datos iniciales (padrón electoral, lista de simpatizantes existente) — o empieza de cero
7. El Administrador de la organización monta las plantillas de rol (usa las de defecto o las personaliza)
8. El Administrador de la organización configura la privacidad y la visibilidad
9. La organización queda en marcha
```

### Puntos de decisión

**DECIDIDO:** Totalmente automatizado y de autoservicio.

Te registras, configuras, se aprovisiona y arrancas: sin intervención humana. La plataforma maneja el aprovisionamiento de punta a punta: levantar la infraestructura, crear la base de datos, configurar las llaves de cifrado (flujo BYOK o gestionadas) y la configuración inicial.

Es ambicioso desde lo arquitectónico, dado que hay residencia de datos por país y aislamiento de organización única, pero es la meta correcta. La cadena de aprovisionamiento tiene que ser lo bastante confiable como para crear organizaciones aisladas en el país correcto y a demanda.

**DECIDIDO:** El modo de facturación de la alianza es un ajuste de la puesta en marcha ([ADR-019](../decisions/019-central-services-and-metered-billing.md)).

Una alianza elige al ponerse en marcha si paga los costos medidos de servicios centrales que generan sus miembros (`alliance_pays`) o si cada miembro paga los suyos (`member_pays`, el valor por defecto). Cada solicitud de afiliación le muestra al miembro qué modo aplica antes de que acepte. Cambiar el modo en una afiliación activa requiere a los Administradores de la organización de la alianza y del miembro. Pagar no le da a la alianza ninguna vista de los datos ni de las consultas del miembro; recibe solo el estado de cuenta.

<!-- REVISIT: La automatización del aprovisionamiento es una pieza mayor de trabajo de infraestructura. Necesita tratamiento detallado en la especificación de arquitectura: orquestación, proveedores de alojamiento por país, manejo de fallos, reversión. Las fases tempranas (alfa/piloto) podrían usar una cadena más simple con salvaguardas mientras se construye la automatización completa. -->

### Capacidad sin conexión
- No hace falta ninguna. La puesta en marcha requiere conectividad.

---

## 2. Incorporación de voluntarios

El recorrido que va de "quiero ayudar" a "estoy listo para tocar puertas".

### Actores
- **Aspirante a voluntario** — quien se inscribe
- **Coordinador de voluntarios** — la persona del personal que maneja el voluntariado
- **Líder de equipo** — (opcional) el líder de campo al que se asigna el voluntario

### Flujo

```
1. El aspirante encuentra la campaña (sitio web, redes sociales, un evento, boca a boca)
2. Se inscribe por un formulario público de voluntariado
   a. Da sus datos básicos (nombre, teléfono, correo, idioma preferido, ubicación)
   b. Indica su disponibilidad e intereses (tocar puertas, llamadas, eventos, etc.)
3. El sistema crea una identidad de plataforma (o la enlaza a una existente si ya está en el sistema)
4. El sistema busca duplicados contra los registros existentes del CRM
   a. Si encuentra coincidencia → enlaza al registro existente y le suma la faceta de voluntario
   b. Si no hay coincidencia → crea un registro nuevo
5. El Coordinador de voluntarios revisa y aprueba la inscripción (o se aprueba sola, según la configuración)
6. El voluntario pasa por la incorporación:
   a. Configura su passkey (principal) o un método alterno de autenticación
   b. Designa sus contactos de confianza para recuperar la cuenta
   c. Recibe una orientación breve (recorrido por la plataforma, qué esperar)
   d. Se le asigna a un equipo y/o a un ámbito geográfico
7. El voluntario aparece en la lista del Coordinador de voluntarios
8. Ya puede:
   a. Ver los turnos y eventos disponibles
   b. Apuntarse a turnos
   c. Acceder a los materiales de capacitación
   d. Ver a su equipo y a su Líder de equipo (si la visibilidad está activada)
```

### Puntos de decisión

**DECIDIDO:** Configurable por organización.

Cada organización fija su propia política de aprobación de voluntarios:
- **Aprobación automática** — el voluntario queda activo apenas se inscribe. La incorporación más rápida, buena para entornos de bajo riesgo.
- **Aprobación obligatoria** — el Coordinador de voluntarios revisa y aprueba cada inscripción antes de dar acceso. Apropiado para entornos de alto riesgo u organizaciones preocupadas por la infiltración.

El valor por defecto se fija a nivel de organización, con la opción de cambiarlo según el canal de inscripción (por ejemplo, aprobar automáticamente a quien viene referido por un voluntario y exigir aprobación para las inscripciones en frío).

**DECIDIDO:** Módulo completo de incorporación.

La plataforma trae un sistema propio de incorporación y capacitación:
- **Recorrido por la plataforma** — un tour interactivo por las herramientas que va a usar el voluntario (app de trabajo de campo, llamadas, confirmación de asistencia a eventos, etc.)
- **Contenido personalizable por la organización** — cada organización puede sumar sus propios materiales (discurso de campaña, contexto local, qué hacer y qué no, protocolos de seguridad)
- **Cuestionarios y puntos de control** — pruebas de conocimiento para confirmar que el voluntario entendió las herramientas y lo que la campaña espera de él
- **Requisitos de certificación** — la organización puede exigir completar módulos específicos antes de dar acceso a las herramientas de campo (por ejemplo, terminar la capacitación de trabajo de campo antes de recibir una lista de recorrido)
- **Materiales de capacitación en caché para verlos sin conexión** después de la descarga inicial

<!-- REVISIT: El manejo del contenido de capacitación (cómo las organizaciones redactan y organizan sus materiales), el seguimiento del progreso y si la finalización de la capacitación alimenta el registro del voluntario en el CRM deberían detallarse en la especificación de UX. -->

### Capacidad sin conexión
- La inscripción requiere conectividad.
- Después de la incorporación, los materiales de capacitación se pueden guardar en caché para verlos sin conexión.

---

## 3. Trabajo de campo (puerta a puerta)

La operación de campo por excelencia. Es el flujo con los requisitos más fuertes de trabajo sin conexión y el flujo de datos más complejo.

### Actores
- **Director de campo** — planifica y supervisa la operación
- **Coordinador de voluntarios** — maneja la programación de voluntarios
- **Líder de equipo** — dirige un grupo pequeño en la calle
- **Voluntario (quien toca puertas)** — toca puertas y registra las interacciones
- **Votante/constituyente** — la persona contactada

### Antes de la operación (personal, requiere conectividad)

```
1. El Director de campo define una campaña de trabajo de campo:
   a. Selecciona la geografía objetivo (precinto, barrio, territorio)
   b. Define las metas (identificación de votantes, persuasión, GOTV —Get Out The Vote,
      movilización del voto—, inscripción de votantes)
   c. Crea o selecciona un guion (preguntas, puntos de mensaje, opciones de respuesta)
   d. Fija las fechas y los turnos
2. El Director de campo divide el territorio:
   a. Parte la geografía objetivo en listas de recorrido (porciones manejables para una persona)
   b. Cada lista de recorrido = una secuencia de direcciones con sus registros de votante
   c. Asigna las listas de recorrido a los turnos
3. El Coordinador de voluntarios abre los turnos para inscripción:
   a. Los voluntarios ven los turnos disponibles y se apuntan
   b. O el Coordinador de voluntarios los asigna directamente
4. Se asignan Líderes de equipo a cada equipo
```

### El día de la operación

```
5. El Líder de equipo registra su entrada:
   a. Abre el modo de campo en su dispositivo
   b. Ve la lista de su equipo, el territorio asignado y las listas de recorrido
   c. Descarga los datos de las listas de recorrido para usarlos sin conexión
   d. Registra la entrada de los voluntarios que van llegando
6. El voluntario empieza a tocar puertas:
   a. Abre el modo de campo → entra en una sesión con la duración del turno
   b. Descarga su lista de recorrido (direcciones, registros de votante, guion)
   c. Camina hasta la primera puerta
7. En cada puerta:
   a. La app muestra los datos del votante de esa dirección (nombre, edad, historial de contacto previo)
   b. El voluntario sigue el guion
   c. Registra la interacción:
      - Resultado del contacto (habló con el votante, no estaba, se negó, se mudó, etc.)
      - Respuestas a las preguntas del guion (nivel de apoyo, temas clave, etc.)
      - Notas en texto libre
      - Actualización del estado de inscripción del votante (si aplica)
   d. La app marca la dirección como completada y avanza a la siguiente
   e. Todos los datos se guardan localmente en el dispositivo
8. Cada tanto (cuando hay conectividad):
   a. La app sincroniza al servidor las interacciones completadas
   b. Descarga las novedades (por ejemplo, reasignaciones de territorio del Líder de equipo)
9. El voluntario termina su lista de recorrido o se acaba el turno:
   a. Sincronización final de todos los datos pendientes
   b. Se dispara el evento de cierre de turno (decidido en users.md):
      - Sincronizar los datos que queden
      - Registrar las horas de voluntariado
      - Pedir el balance del turno
      - Liberar la asignación de territorio
      - Cerrar la sesión de modo de campo
   c. Se avisa al Líder de equipo que terminó
```

### Después de la operación (personal, requiere conectividad)

```
10. El Director de campo revisa los resultados:
    a. Puertas tocadas, tasa de contacto, datos de respuesta
    b. Mapa de avance del trabajo de campo (qué territorios están completos)
    c. Problemas señalados por Líderes de equipo o voluntarios
11. El Gestor de datos revisa la calidad de los datos:
    a. Verificación de duplicados en los registros nuevos creados en la calle
    b. Marca las entradas incompletas o sospechosas
12. Se actualiza el CRM:
    a. Los registros de votante se actualizan con los datos de la interacción
    b. Se recalculan los puntajes de apoyo
    c. Se generan acciones de seguimiento (por ejemplo, un votante necesita ayuda para
       inscribirse → se enruta al flujo de inscripción)
```

### Requisitos sin conexión

Este es el flujo que más depende del trabajo sin conexión en toda la plataforma:

| Paso | ¿Funciona sin conexión? | Notas |
|------|-----------------|-------|
| Descargar la lista de recorrido | Requiere conectividad inicial | Los datos quedan en caché en el dispositivo |
| Registrar interacciones | Sí, totalmente sin conexión | Todo se guarda localmente |
| Sincronizar datos | Requiere conectividad | Sincronización oportunista cuando hay red |
| Ver registros de votante | Sí, desde los datos en caché | Solo los de la lista de recorrido descargada |
| Reasignación por el Líder de equipo | Requiere conectividad | Coordinar en tiempo real necesita red |

### Resolución de conflictos

**DECIDIDO:** Fusionar y marcar.

Cuando llegan registros en conflicto desde varios dispositivos, se conservan ambos y se marcan para revisión humana. El Gestor de datos ve los dos registros lado a lado —quién registró qué, cuándo y desde qué dispositivo— y decide cómo reconciliarlos. Ningún dato se descarta en silencio. Es coherente con el enfoque de sugerir y confirmar decidido para la deduplicación en users.md.

**DECIDIDO:** Solo datos operativos.

La lista de recorrido descarga: nombre, dirección, edad, resultado del contacto previo (por ejemplo, "conversamos el 5 de marzo — se inclina a favor") y el guion. Suficiente contexto para una conversación efectiva sin exponer el registro completo del votante.

**Excluido del dispositivo:** las notas detalladas de visitas anteriores, las etiquetas y puntajes internos, el historial de donaciones, la identificación nacional y el historial completo de comunicaciones. Esos datos se quedan en el servidor: si el dispositivo se pierde o lo incautan, la exposición se limita a lo operativamente necesario.

Todos los datos en el dispositivo van cifrados y se borran al terminar la sesión (decidido en security.md).

---

## 4. Jornadas de llamadas

Contacto telefónico estructurado, desde un centro de llamadas o con gente llamando desde donde esté.

### Actores
- **Director de campo** — planifica la campaña de llamadas
- **Coordinador de voluntarios** — maneja turnos y asignaciones
- **Voluntario (quien llama)** — hace las llamadas
- **Votante/constituyente** — la persona que recibe la llamada

### Flujo

```
1. El Director de campo crea una campaña de llamadas:
   a. Define la lista objetivo (a partir de segmentos del CRM; por ejemplo, votantes
      inscritos con los que aún no se ha contactado)
   b. Crea o selecciona un guion de llamada
   c. Fija los parámetros (fechas, horarios de turno, llamadas por turno)
2. El Coordinador de voluntarios crea los turnos y los abre para inscripción
3. El voluntario empieza un turno de llamadas:
   a. Inicia sesión y entra al modo de llamadas
   b. El sistema le presenta el siguiente contacto de la lista
   c. Ve: nombre, número, guion de llamada y las notas de contactos previos
4. El voluntario hace la llamada:
   a. Marca el número (por el VoIP de la plataforma o desde su propio teléfono)
   b. Sigue el guion
   c. Registra el resultado:
      - Desenlace de la llamada (contestó, buzón de voz, ocupado, número equivocado,
        desconectado, no llamar)
      - Respuestas a las preguntas del guion
      - Notas en texto libre
   d. El sistema avanza al siguiente contacto
5. Termina el turno:
   a. Se dispara el evento de cierre de turno
   b. Se registran las horas de voluntariado
   c. Se pide el balance del turno
6. El Director de campo revisa los resultados:
   a. Llamadas hechas, tasa de contacto, datos de respuesta
   b. Se actualiza la lista de no llamar
```

### Puntos de decisión

**DECIDIDO:** BYOP para el MVP, integración híbrida para el piloto.

**MVP:** El voluntario usa su teléfono personal. La plataforma le muestra el contacto y el guion, y registra el resultado. No hace falta infraestructura de telefonía. Es el camino más simple y barato para tener jornadas de llamadas funcionando. (BYOP — Bring Your Own Phone, cada quien usa su propio teléfono.)

**Piloto:** Integrar un proveedor externo de telefonía (Twilio, Plivo o el equivalente regional) para llamar con un clic desde la plataforma. La llamada pasa por el proveedor, pero la experiencia se siente nativa: el voluntario ve el guion, oprime llamar, registra el resultado y el sistema avanza al siguiente contacto. La duración y el desenlace de la llamada se registran automáticamente.

<!-- REVISIT: La elección de proveedor de telefonía dependerá de los países objetivo y del costo. En algunas regiones hay proveedores locales más baratos y más confiables que los globales. También está la privacidad del número del voluntario: con BYOP, su número personal queda a la vista de quien recibe la llamada. La integración híbrida puede enmascararlo. -->

### Capacidad sin conexión
- Las jornadas de llamadas requieren conectividad (hay que cargar contactos y sincronizar resultados en tiempo real para no llamar dos veces).
- **No es un flujo que funcione sin conexión.**

---

## 5. Jornada de inscripción de votantes

Equipos de campo inscribiendo votantes, muchas veces en lugares públicos o puerta a puerta.

### Actores
- **Director de campo** — planifica y focaliza la jornada
- **Coordinador de voluntarios** — maneja a los voluntarios
- **Líder de equipo** — maneja al equipo en el sitio
- **Voluntario (inscriptor)** — ayuda a la gente a inscribirse
- **Persona sin inscribir** — quien se está inscribiendo

### Flujo

```
1. El Director de campo planifica la jornada de inscripción:
   a. Identifica el área o el evento objetivo (centro comunitario, plaza de mercado,
      campus universitario, puerta a puerta)
   b. Determina los requisitos de inscripción de la jurisdicción
   c. Prepara los materiales (formularios, lista de documentos de identidad requeridos)
   d. Crea los turnos y asigna voluntarios
2. En el sitio:
   a. El Líder de equipo monta el puesto y registra la entrada de los voluntarios
   b. El voluntario se acerca a alguien sin inscribir, o esa persona se le acerca
   c. El voluntario abre la herramienta de inscripción:
      - Captura los datos (nombre, dirección, fecha de nacimiento, número de
        identificación si hace falta)
      - Verifica la elegibilidad según las reglas de la jurisdicción
      - Completa el formulario digital (o asiste con el formulario en papel)
   d. Los datos se guardan localmente en el dispositivo
   e. Se sincronizan cuando hay conectividad
3. Después de la jornada:
   a. Los datos de inscripción se sincronizan al CRM
   b. Se crean los registros nuevos de votante (con verificación de duplicados)
   c. Las personas inscritas entran a un flujo de seguimiento (confirmar que la
      inscripción se procesó, contacto de GOTV)
   d. Se registran las métricas de la jornada (inscripciones completadas, voluntarios
      participantes, horas)
```

### Requisitos sin conexión
- **Tiene que funcionar completamente sin conexión.** Las jornadas de inscripción suelen ocurrir donde la conectividad es mala (zonas rurales, eventos al aire libre).
- Los datos de inscripción se guardan en el dispositivo, cifrados, y se sincronizan cuando vuelve la conexión.
- Rigen los mismos principios de resolución de conflictos y de minimización de datos en el dispositivo que en el trabajo de campo.

### Consideraciones de cumplimiento
**DECIDIDO:** Las dos cosas — plantillas por jurisdicción donde existan, configuración propia donde no.

- **Plantillas por jurisdicción:** GreenGrass construye y mantiene plantillas de formulario de inscripción para los países objetivo, con los requisitos de elegibilidad, los campos obligatorios, las reglas de documentación y los procedimientos de radicación. La organización elige su jurisdicción y obtiene un formulario listo para usar.
- **Constructor de formularios propios:** Para países o regiones sin plantilla, cada organización puede configurar sus propios formularios con reglas de validación, lógica de campos obligatorios y configuración del flujo de radicación.
- **Aporte de la comunidad:** A medida que organizaciones en jurisdicciones nuevas construyan formularios propios, esas configuraciones pueden devolverse a GreenGrass como plantillas candidatas para otras organizaciones de la misma jurisdicción.

<!-- REVISIT: Qué plantillas de jurisdicción construir primero depende de la geografía objetivo (siguiente pasada de especificación). El mantenimiento de plantillas es continuo: las leyes electorales cambian. Hace falta un proceso para mantenerlas al día. -->

---

## 6. Recaudación de fondos

El ciclo de la donación, desde la primera aportación hasta la relación continua con el donante.

### Actores
- **Director de finanzas** — configura la recaudación y maneja las operaciones financieras
- **Director de comunicaciones** — crea las convocatorias de recaudación
- **Donante** — quien aporta
- **Administrador de la organización** — vela por el cumplimiento

### Flujo de donación en línea

```
1. El donante se topa con una invitación a donar:
   a. El sitio web de la campaña (formulario de donación embebido)
   b. Una convocatoria por correo (enlace a la página de donación)
   c. Un mensaje de SMS o WhatsApp con enlace de donación
   d. Una publicación en redes sociales con enlace de donación
   e. La página de donación dentro de la app (para simpatizantes con cuenta)
2. El donante llega al formulario de donación:
   a. Elige el monto (sugeridos o libre)
   b. Elige si es única o recurrente
   c. Opción de cubrir el cargo por procesamiento
   d. Elige el método de pago (opciones según el país)
   e. Da los datos requeridos (nombre, correo o teléfono, empleador y ocupación si la
      jurisdicción lo exige)
   f. Confirma y envía
3. Se procesa el pago:
   a. El procesador de pagos maneja la transacción
   b. La plataforma recibe la confirmación
   c. Se genera el recibo y se le envía al donante (correo o SMS)
   d. Se crea o actualiza el registro del donante en el CRM (con verificación de duplicados)
   e. La donación queda registrada con auditoría completa
4. Después de la donación:
   a. Se envía el agradecimiento (automático, configurable)
   b. El donante entra a un flujo de seguimiento (próximas convocatorias, invitaciones a
      eventos, reclutamiento de voluntarios)
   c. Si es recurrente: se manejan los pagos programados, con avisos de éxito o de fallo
```

### Flujo de donación en efectivo

```
1. En un evento presencial, alguien dona en efectivo
2. Alguien del personal o un voluntario con los permisos adecuados abre la herramienta de
   donación en efectivo:
   a. Registra los datos del donante (nombre, contacto — o anónimo si la jurisdicción lo permite)
   b. Registra el monto
   c. Registra el contexto del evento
   d. Toma foto del recibo o formulario físico (opcional)
3. La donación en efectivo queda registrada en el sistema con auditoría
4. El Director de finanzas revisa y concilia las donaciones en efectivo
```

### Manejo de campañas de recaudación

```
1. El Director de finanzas crea una campaña de recaudación:
   a. Fija la meta y la fecha límite
   b. Configura el formulario de donación (montos sugeridos, mensajes, métodos de pago)
   c. Crea un formulario embebible para sitios externos
2. El Director de comunicaciones crea las convocatorias:
   a. Redacta el mensaje de correo, SMS o WhatsApp
   b. Enlaza al formulario de donación
   c. Programa los envíos a los segmentos objetivo
3. Analítica:
   a. Panel de recaudación en tiempo real (total recaudado, cantidad de donantes, donación
      promedio, avance hacia la meta)
   b. Segmentación de donantes (primera vez vs. recurrentes, rangos de monto, distribución
      geográfica)
   c. Rendimiento por canal (qué convocatoria trajo más donaciones)
```

### Puntos de decisión

**DECIDIDO:** Configurable por campaña.

La alianza define las reglas de reparto de las donaciones al crear cada campaña de recaudación conjunta. Campañas distintas pueden tener repartos distintos: una jornada de inscripción de votantes podría repartir por partes iguales, mientras que una campaña centrada en un candidato podría inclinar el reparto hacia la organización de ese candidato.

Las reglas de reparto las fija el Administrador de la alianza con el acuerdo de las organizaciones miembro participantes. Los registros financieros de cada organización reflejan su porción, con un registro de auditoría que traza el reparto desde la donación original hasta la distribución.

### Capacidad sin conexión
- Las donaciones en línea requieren conectividad (hay que procesar el pago).
- El registro de donaciones en efectivo debería funcionar sin conexión y sincronizarse después.

---

## 7. Comunicaciones multicanal

Contacto por correo, SMS, WhatsApp y redes sociales.

### Actores
- **Director de comunicaciones** — crea y maneja las campañas
- **Administrador de la organización** — aprueba las comunicaciones delicadas
- **Gestor de datos** — maneja las listas de contactos y los segmentos

### Flujo de campaña por correo

```
1. El Director de comunicaciones crea una campaña:
   a. Elige el segmento de audiencia del CRM (por ejemplo, simpatizantes del Distrito 5
      que fueron a un evento)
   b. Diseña el correo con el constructor de plantillas (visual, con prioridad móvil)
   c. Escribe el contenido (asunto, cuerpo, llamada a la acción)
   d. Define la identidad del remitente y la dirección de respuesta
   e. Previsualiza y hace un envío de prueba
2. Programa o envía:
   a. Envía de inmediato o programa para el mejor momento
   b. El sistema verifica: estado de alta, lista de rebotes, lista de supresión
   c. Verificación de supresión mutua, en una alianza cuyo contrato incluye el término:
      se omiten los destinatarios que otro miembro contactó en los últimos N días
   d. Envía por tandas (manejo de la entregabilidad)
3. Seguimiento:
   a. Tasa de apertura, de clics y de bajas
   b. Los rebotes y las quejas se procesan automáticamente
   c. Los datos de participación vuelven al CRM (se actualiza el registro de contacto)
4. Seguimientos automáticos:
   a. Reglas configurables (por ejemplo, "si no se abrió en 3 días, reenviar con otro asunto")
   b. Secuencias escalonadas para incorporación, recaudación y GOTV
```

### Flujo de SMS / WhatsApp

```
1. El Director de comunicaciones crea un mensaje:
   a. Elige el segmento de audiencia
   b. Escribe el mensaje (límite de caracteres en SMS, contenido más rico en WhatsApp)
   c. Incluye enlaces, contenido multimedia (WhatsApp) u opciones de respuesta rápida
2. Verificación de cumplimiento:
   a. Verificación del alta (¿esta persona consintió recibir mensajes por este canal?)
   b. Restricciones de horario (nada de mensajes a las 3 de la mañana)
   c. Topes de frecuencia (no saturar)
   d. Verificación de supresión mutua, en una alianza cuyo contrato incluye el término:
      se omiten los destinatarios que otro miembro contactó en los últimos N días
3. Envío y seguimiento:
   a. Estado de entrega, confirmaciones de lectura (WhatsApp), respuestas
   b. Las respuestas se enrutan a la persona del equipo que corresponda
   c. Los datos de participación vuelven al CRM
```

En los dos flujos, la verificación de supresión mutua va última, sobre los destinatarios que pasaron todas las demás verificaciones, así que un miembro les pregunta a sus socios solo por las personas a las que está a punto de escribirles. Es la primitiva del piloto ([mvp.md § La primitiva de coordinación central: la supresión mutua](mvp.md#la-primitiva-de-coordinación-central-la-supresión-mutua)) funcionando dentro del flujo de envío, y es distinta de la lista de supresión propia de la organización, que son sus bajas y sus rebotes duros. Cómo cruza, qué atraviesa el límite y qué pasa cuando un miembro no responde está en [system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales).

### Flujo de redes sociales

```
1. El Director de comunicaciones crea una publicación:
   a. Escribe el contenido, adjunta multimedia
   b. Elige las plataformas (Facebook, Instagram, Twitter/X, TikTok, etc.)
   c. Adapta el contenido a cada plataforma (límites de caracteres, proporciones de imagen)
   d. Programa o publica de inmediato
2. Seguimiento:
   a. Métricas de participación por plataforma (reacciones, veces compartida, comentarios, alcance)
   b. Panel de analítica multiplataforma
   c. Herramientas de monitoreo y respuesta de comentarios
```

### Puntos de decisión

**DECIDIDO:** Programación de publicaciones y analítica, con la arquitectura abierta a integraciones más profundas más adelante.

- **Dentro del alcance:** Programación, publicación y analítica de rendimiento en varias plataformas (métricas de participación, alcance, crecimiento). Enlaza a las plataformas nativas para la interacción (comentarios, mensajes directos, respuestas).
- **Fuera del alcance por ahora:** Manejo de comentarios, manejo de mensajes directos y herramientas de interacción dentro de la plataforma.
- **Arquitectura:** La capa de integración con redes sociales debe ser modular —adaptadores por plataforma detrás de una interfaz común— para poder sumar funcionalidades de interacción más profundas plataforma por plataforma, según la demanda, sin rehacer la arquitectura.

**DECIDIDO:** Por canal y por propósito, con valores por defecto inteligentes.

**Granularidad:** El consentimiento se registra por cada combinación de canal (correo, SMS, WhatsApp) y propósito (transaccional, eventos, recaudación, GOTV, activismo e incidencia, boletín).

**Valores por defecto inteligentes:** El sistema infiere un consentimiento inicial razonable según el contexto en que la persona se dio de alta:
- Dar el teléfono para confirmar asistencia a un evento → SMS transaccional y de eventos: sí. SMS de recaudación: no (requiere un alta explícita aparte).
- Inscribirse como voluntario → correo transaccional y de eventos: sí. Correo de recaudación y boletín: se preguntan, no se asumen.
- Donar → correo transaccional (el recibo): sí. Correo de recaudación: se pregunta.

**Requisitos:**
- **Revocable** — baja con un solo clic en cada mensaje, con efecto inmediato.
- **Auditable** — el sistema registra cuándo se otorgó el consentimiento, por qué mecanismo y cuándo se revocó. Queda en el registro de auditoría.
- **Accesible** — cada simpatizante puede ver y manejar todas sus preferencias de consentimiento desde su perfil.
- **Aplicado** — el sistema de comunicaciones verifica el consentimiento al momento de enviar. Ningún mensaje sale sin consentimiento válido para esa combinación de canal y propósito.

### Capacidad sin conexión
- **No funciona sin conexión.** Las comunicaciones necesitan conectividad para enviarse y medirse.
- La redacción de mensajes sí podría funcionar sin conexión, dejándolos en cola para enviarse cuando vuelva la conectividad.

---

## 8. Manejo de eventos

Eventos de campaña: mítines, asambleas comunitarias, actividades de recaudación, capacitaciones de voluntarios, lanzamientos de trabajo de campo.

### Actores
- **Coordinador de voluntarios** (o un rol de personal de Organizador de eventos) — crea y maneja los eventos
- **Director de comunicaciones** — promueve los eventos
- **Voluntario / simpatizante** — asiste a los eventos
- **Líder de equipo** — maneja el registro de entrada en el sitio

### Flujo

```
1. Crear el evento:
   a. Datos del evento (nombre, fecha y hora, lugar, descripción, capacidad)
   b. Tipo de evento (mitin, asamblea comunitaria, recaudación, capacitación, lanzamiento
      de trabajo de campo, jornada de llamadas, virtual)
   c. Ajustes de confirmación de asistencia (abierta, solo por invitación, con aprobación)
   d. Asignar roles del personal (quién lo maneja, quién registra las entradas)
2. Promover el evento:
   a. Enviar invitaciones por correo, SMS o WhatsApp a los segmentos objetivo
   b. Publicar en redes sociales
   c. Página pública del evento (enlace para compartir)
   d. Integración con calendarios (exportar al calendario personal)
3. Confirmaciones de asistencia:
   a. Los simpatizantes confirman por formulario, enlace de correo o desde la app
   b. Los datos de confirmación llegan al CRM
   c. Se envían recordatorios automáticos antes del evento (con la anticipación configurada)
   d. Manejo de capacidad (lista de espera si se llena)
4. El día del evento:
   a. Herramienta de registro de entrada (el Líder de equipo o alguien del personal escanea
      un código QR, busca por nombre o marca la asistencia a mano)
   b. Registro de quienes llegan sin confirmar
   c. Los datos de asistencia se registran en tiempo real
   d. Recolección de donaciones en efectivo en eventos de recaudación (conecta con el flujo
      de donación en efectivo)
5. Después del evento:
   a. Los datos de asistencia se sincronizan al CRM
   b. Se envían mensajes de seguimiento a quienes asistieron (agradecimiento, próximos pasos,
      reclutamiento de voluntarios)
   c. Se envían mensajes a quienes no llegaron (lamentamos no verte, enlace a la grabación
      si fue virtual)
   d. Se registran las métricas del evento (confirmaciones, asistencia, tasa de conversión,
      donaciones recaudadas)
   e. Encuesta posterior al evento (opcional)
```

### Eventos virtuales

**DECIDIDO:** Integración externa con puente de registro.

- GreenGrass maneja todo el ciclo del evento: creación, promoción, confirmaciones, recordatorios, seguimiento y analítica.
- Para los eventos virtuales, la plataforma se integra con proveedores externos de video (Zoom, Google Meet, Jitsi, etc.).
- Se genera un enlace único por persona registrada, lo que permite rastrear la asistencia a través de la integración: GreenGrass sabe quién apareció de verdad, no solo quién confirmó.
- Los datos de asistencia vuelven automáticamente a los registros del CRM.
- Alojar el video queda explícitamente fuera del alcance: construir infraestructura de transmisión es otro producto.

### Capacidad sin conexión
- Crear y promover eventos requiere conectividad.
- **El registro de entrada debe funcionar sin conexión**: los eventos pueden ocurrir donde la conectividad es mala. Los datos de asistencia se sincronizan cuando vuelve la conexión.

---

## 9. Campañas de activismo y participación

Acción coordinada más allá de las elecciones: campañas de presión, escritura de cartas, peticiones, comentarios públicos.

### Actores
- **Gerente de campaña / Administrador de la organización** — define la campaña de acción
- **Director de comunicaciones** — promueve la acción
- **Simpatizante / voluntario** — toma la acción
- **Objetivo** — la persona o institución sobre la que se presiona (un cargo electo, un regulador, una empresa)

### Campaña de correos y cartas

```
1. El personal crea una campaña de acción:
   a. Define el objetivo (cargo electo, ente regulador, etc.)
   b. Aporta los datos de contacto del objetivo (correo, dirección postal, teléfono)
   c. Escribe una carta o correo modelo que los simpatizantes puedan personalizar
   d. Fija los puntos de mensaje y las ideas clave
   e. Define la petición concreta (votar a favor o en contra, firmar una resolución,
      responder a sus constituyentes)
2. Promover la acción:
   a. Enviar la convocatoria a los simpatizantes por correo, SMS o WhatsApp
   b. Publicar en redes sociales
   c. Página pública de la acción (enlace para compartir)
3. El simpatizante toma la acción:
   a. Llega a la página de la acción
   b. Lee la carta modelo
   c. Si quiere, personaliza el mensaje
   d. Da sus datos de contacto (para que el objetivo vea que viene de un constituyente real)
   e. Envía — el sistema le hace llegar la carta o el correo al objetivo
4. Seguimiento:
   a. Total de acciones tomadas
   b. Distribución geográfica de quienes participan (importa para la presión basada en
      constituyentes)
   c. Historial de acciones por simpatizante (fluye al CRM)
```

### Campaña de petición

```
1. El personal crea una petición:
   a. Define el texto de la petición y lo que se pide
   b. Fija una meta de firmas
   c. Configura qué datos se le piden a quien firma
2. Promoción:
   a. Contacto multicanal (igual que arriba)
   b. Página pública de la petición con contador de firmas
3. El simpatizante firma:
   a. Da su nombre, su ubicación y un comentario opcional
   b. La firma se registra y se cuenta
   c. Quien firma se suma al CRM (con verificación de duplicados)
4. Entrega:
   a. La petición se entrega al objetivo (en digital o impresa)
   b. La entrega se documenta (foto, cobertura de prensa)
```

### Envío de comentarios públicos

```
1. El personal identifica un periodo de comentarios de un ente regulador:
   a. Define el tema, la fecha límite y el mecanismo de envío
   b. Aporta información de contexto y puntos de mensaje
   c. Crea un comentario modelo
2. Promover y movilizar:
   a. Contacto multicanal
   b. Contenido explicativo (por qué importa, cómo comentar)
3. El simpatizante envía su comentario:
   a. Lee el modelo y lo personaliza
   b. Lo envía desde la plataforma (si el ente regulador acepta envíos electrónicos)
      o lo descarga o copia para enviarlo por su cuenta
4. Seguimiento:
   a. Comentarios enviados desde la plataforma
   b. Se actualiza el historial de acciones del simpatizante
```

### Puntos de decisión

**DECIDIDO:** La plataforma envía en nombre del simpatizante, con un mensaje generado por IA que la propia persona aprueba.

**Flujo:**
1. El personal crea la campaña de acción con puntos de mensaje, ideas clave y la petición concreta.
2. El simpatizante llega a la página de la acción y da sus datos (nombre, ubicación y, si quiere, su conexión personal con el tema).
3. Un agente de IA genera un mensaje único y personalizado a partir de los puntos de mensaje de la campaña y de lo que aportó la persona: no hay dos mensajes iguales.
4. El simpatizante lee el mensaje generado en la interfaz, puede editarlo y lo aprueba antes de que se envíe.
5. La plataforma le envía el mensaje aprobado al objetivo, en nombre del simpatizante.

**Ventajas:**
- Alta tasa de finalización (se aprueba con un clic, sin acrobacias con el cliente de correo)
- Cada mensaje está redactado de verdad: el objetivo no puede descartarlos como astroturfing idéntico
- El simpatizante mantiene el control: nada sale sin su aprobación
- La IA se apoya en los puntos de mensaje de la campaña para mantener la coherencia, variando tono, estructura y encuadre personal

<!-- REVISIT: La elección del modelo de IA, el diseño del prompt de generación, las salvaguardas de contenido (que la IA no se salga del mensaje) y el costo por generación hay que abordarlos en la especificación de arquitectura. Además, la aprobación del simpatizante crea un registro de consentimiento en la auditoría. -->

### Capacidad sin conexión
- Las páginas de acción y la firma de peticiones requieren conectividad (conteo en tiempo real, entrega).
- **No funciona sin conexión.**

---

## 10. Coordinación de alianzas

Flujos propios de la operación a nivel de alianza, entre organizaciones miembro.

### Lanzamiento de una campaña conjunta

```
1. El Administrador de la alianza crea una campaña conjunta:
   a. Define el alcance de la campaña (GOTV, inscripción de votantes, incidencia temática)
   b. Invita a las organizaciones miembro a participar
   c. Los Administradores de cada organización aceptan y configuran qué comparten
2. Se activa el intercambio de recursos:
   a. Se puebla la bolsa de voluntarios compartida (con los voluntarios de las organizaciones
      participantes)
   b. Se fusionan los datos de contacto con votantes (con deduplicación, respetando las
      reglas de intercambio de cada organización)
   c. Se dividen territorios conjuntos que cruzan las fronteras entre organizaciones
   d. Se crea un panel de analítica compartido
3. Operación:
   a. El trabajo de campo, las llamadas y los eventos corren dentro de las organizaciones
      miembro, pero con coordinación a nivel de alianza
   b. La lista de "no volver a tocar" se comparte entre las organizaciones participantes
   c. Las asignaciones de voluntarios pueden cruzar organizaciones (con el consentimiento
      del voluntario)
4. Informes:
   a. Métricas agregadas de toda la alianza
   b. Desglose por organización (visible solo para esa organización y el administrador
      de la alianza)
```

### Recaudación de la alianza

```
1. La alianza crea una campaña de recaudación conjunta:
   a. Configura las reglas de reparto de las donaciones
   b. Crea un formulario de donación compartido con la identidad visual de la alianza
   c. Las organizaciones miembro lo promueven por sus propios canales
2. Se procesan las donaciones:
   a. El pago va al procesador de pagos de la alianza
   b. Se aplica el reparto según las reglas configuradas
   c. Cada organización recibe su porción
   d. La auditoría captura todo el recorrido
3. Informes:
   a. Totales de la alianza
   b. Atribución por organización
```

### Manejo de afiliaciones

```
1. Un candidato o una organización pide afiliarse a un partido o a una alianza:
   a. La solicitud se envía por la plataforma
   b. El Administrador del partido o de la alianza revisa y aprueba
   c. Queda establecida la afiliación — se habilitan las opciones de intercambio
2. Desafiliación:
   a. Cualquiera de las dos partes puede iniciarla
   b. Se revocan los recursos compartidos
   c. Los datos que pertenecen a cada organización se quedan con esa organización
   d. Las identidades de plataforma de las personas de ambas organizaciones no se ven afectadas
   e. La auditoría captura el cambio de afiliación
```

### Puntos de decisión

**DECIDIDO:** Configurable por campaña.

La alianza elige el modelo de gobernanza al crear cada campaña conjunta:

- **Dirigida por la alianza** — el Administrador de la alianza dirige la operación. Las organizaciones miembro aportan recursos, pero la alianza lleva la batuta. Para esfuerzos muy coordinados, como un empujón nacional de GOTV.
- **Dirigida por cada organización** — cada organización miembro corre su parte por su cuenta. La alianza aporta coordinación (deduplicación, listas compartidas, informes agregados) pero no dirige la operación. Para coaliciones sueltas o alineamientos temáticos.
- **Gobernanza compartida** — la campaña conjunta tiene su propia estructura de roles, con personal de varias organizaciones colaborando bajo permisos compartidos. Para campañas donde varias organizaciones son de verdad pares.

Dentro de una misma alianza, cada campaña conjunta puede usar un modelo distinto. Una coalición puede dirigir centralmente una jornada de inscripción de votantes y a la vez coordinar de forma suelta una campaña de recaudación.

### Capacidad sin conexión
- La coordinación de alianzas requiere conectividad.
- Los flujos de cada organización dentro de una campaña conjunta siguen sus propias reglas de trabajo sin conexión (el trabajo de campo funciona sin conexión, las jornadas de llamadas no, etc.)

---

## 11. Importación y manejo de datos

Meter los datos al sistema, mantenerlos limpios y poder sacarlos.

### Importación del padrón electoral

```
1. El Gestor de datos inicia una importación del padrón electoral:
   a. Sube el archivo (CSV, con mapeo de columnas configurable)
   b. El sistema valida el formato y la calidad de los datos
   c. Previsualización de la importación (registros de muestra, confirmación del mapeo)
   d. El sistema busca coincidencias contra los registros existentes
   e. Los registros coincidentes se marcan para revisión (sugerir y confirmar)
   f. El Gestor de datos confirma la importación
2. Después de importar:
   a. Se crean los registros nuevos y se actualizan los existentes
   b. La importación queda en el registro de auditoría (quién importó qué, cuándo, desde
      qué archivo)
   c. Se genera un informe de calidad de datos (registros incompletos, duplicados que quedan)
```

### Exportación de datos

```
1. Una persona autorizada (Gestor de datos, Administrador de la organización) inicia una
   exportación:
   a. Elige el conjunto de datos (contactos, donantes, voluntarios, asistentes a eventos, etc.)
   b. Aplica filtros (segmento, geografía, rango de fechas)
   c. Elige qué campos incluir
   d. Elige el formato (CSV, JSON)
2. Verificaciones de seguridad:
   a. La persona tiene permiso de exportación para ese ámbito de datos
   b. La exportación queda en el registro de auditoría (quién exportó qué, cuándo)
   c. Los campos sensibles pueden ir tachados o excluidos según el rol
3. Se genera y se entrega la exportación:
   a. Enlace de descarga (con tiempo límite) o descarga directa
   b. Opcional: archivo de exportación cifrado
```

### Puntos de decisión

**DECIDIDO:** Exportación completa con los datos relacionales, como garantía contractual.

- **Alcance:** Todo lo que le pertenece a la organización — contactos, registros de donantes, historial de donaciones, historial de comunicaciones, datos de trabajo de campo, registros y horas de voluntariado, datos de eventos, analítica, etiquetas, segmentos, notas y los registros de auditoría de su organización.
- **Se conservan las relaciones:** Se incluyen las referencias cruzadas — qué donantes fueron a qué eventos, qué voluntarios trabajaron qué territorios, qué simpatizantes abrieron qué correos. Los datos conservan su valor relacional, no son tablas planas.
- **Formatos estándar:** Se exporta en formatos abiertos y estándar (CSV, JSON) con documentación del esquema. Nada de encierro propietario.
- **Garantía contractual:** La portabilidad de los datos es un derecho garantizado en los términos de servicio, no solo una funcionalidad. Está documentada, se prueba con regularidad y es exigible. Si GreenGrass cierra, si la compran o si la organización simplemente quiere irse, sus datos son suyos y se los lleva.
- **A tiempo:** La exportación tiene que estar disponible a demanda, sin colas ni procesos de aprobación. La organización no tiene que explicar por qué.

### Capacidad sin conexión
- Importar y exportar requiere conectividad.

---

## 12. Informes y analítica

Cómo entiende lo que está pasando quien dirige la campaña, y cómo decide.

### Actores
- **Administrador de la organización / gerente de campaña** — visión estratégica
- **Candidato** — vista curada de alto nivel
- **Director de campo** — métricas de la operación de campo
- **Director de finanzas** — métricas financieras
- **Director de comunicaciones** — métricas de participación

### Jerarquía de paneles

```
Panorama de la campaña (Administrador de la organización / Candidato):
├── Recaudación: total recaudado, avance hacia la meta, cantidad de donantes, donación promedio
├── Campo: puertas tocadas, contactos con votantes, tasa de contacto, puntajes de apoyo
├── Comunicaciones: correos enviados, tasa de apertura, SMS entregados, participación en redes
├── Voluntarios: activos, horas registradas, turnos cubiertos vs. disponibles
└── Eventos: próximos, asistencia reciente, confirmaciones pendientes

Operación de campo (Director de campo):
├── Mapa de avance del trabajo de campo (territorios completos vs. pendientes)
├── Tasa de contacto por territorio, equipo y voluntario
├── Distribución de los puntajes de apoyo
├── Métricas de las jornadas de inscripción de votantes
└── Métricas de las jornadas de llamadas (llamadas hechas, tasa de contacto, desenlaces)

Recaudación (Director de finanzas):
├── Ingresos por canal, campaña y periodo
├── Retención y fuga de donantes
├── Salud de las donaciones recurrentes
├── Desglose de efectivo vs. digital
├── Informes de cumplimiento (según los requisitos de cada jurisdicción)
└── Estado del procesador de pagos

Comunicaciones (Director de comunicaciones):
├── Rendimiento del correo (aperturas, clics, rebotes, bajas)
├── Entrega y participación en SMS / WhatsApp
├── Rendimiento en redes sociales por plataforma
├── Crecimiento de la audiencia en el tiempo
└── Comparación de efectividad entre canales
```

### Puntos de decisión

**DECIDIDO:** Híbrido — tiempo real para la operación activa, por lotes para el análisis histórico.

- **Tiempo real:** Paneles del día de campo (puertas tocadas, tasa de contacto, avance del equipo), paneles de jornadas de llamadas (llamadas hechas, desenlaces), tablero del día de elecciones, termómetro de recaudación en vivo durante una convocatoria. Los datos se actualizan según van llegando desde la calle.
- **Por lotes:** Informes de tendencias históricas (recaudación en el tiempo, crecimiento del voluntariado, tendencias de participación), comparaciones entre campañas, informes de cumplimiento. Se agregan según un calendario definido (cada hora o cada día, según la métrica).

La actualidad justa para cada contexto: un Director de campo en día de puerta a puerta necesita datos en vivo; un gerente de campaña que revisa el trimestre pasado puede esperar al consolidado.

<!-- REVISIT: La cadena de analítica en tiempo real (streaming de eventos, agregación, envío a los paneles) es una decisión de arquitectura importante. Necesita tratamiento en la especificación de arquitectura. -->

### Capacidad sin conexión
- **No funciona sin conexión.** Los paneles y los informes requieren conectividad.

---

## Preguntas abiertas — resueltas

1. ~~**Flujo de GOTV**~~ — **RESUELTO.** Especificación aparte. Las operaciones del día de elecciones (transporte a los centros de votación, monitoreo de mesas, seguimiento en tiempo real de quién ya votó) son un flujo distinto y de alto riesgo que amerita su propio documento detallado.
2. ~~**Flujo de mensajería interna**~~ — **RESUELTO.** Necesita su propia pasada de especificación. Los flujos de comunicación entre el candidato y el equipo, y dentro del equipo, necesitan definirse en detalle, sobre todo en cómo interactúan con el cifrado de extremo a extremo (decidido en security.md) y con la interfaz curada del candidato.
3. ~~**Flujos de prensa y medios**~~ — **RESUELTO.** Dentro del alcance. El manejo de contactos de prensa, las listas de medios, la distribución de comunicados, los eventos de entrega y el seguimiento de la cobertura están dentro del alcance de la plataforma. Necesita su propia especificación.
4. ~~**Gamificación del voluntariado**~~ — **RESUELTO.** Fuera del alcance. Hay mejores maneras de lograr que los voluntarios vuelvan que la gamificación barata. Nada de tablas de posiciones, insignias ni sistemas de logros.
5. ~~**Coordinación de varias campañas dentro de una misma organización**~~ — **RESUELTO.** Ya lo resuelve el ámbito por campaña del modelo de permisos (decidido en users.md). El personal, los datos y las operaciones se pueden acotar a campañas específicas dentro de una organización. No hace falta una especificación de flujo adicional mientras las definiciones a nivel de campaña se mantengan consistentes.

## Especificaciones futuras identificadas

- `spec/gotv.md` — Operaciones del día de elecciones / Get Out The Vote
- `spec/messaging.md` — Comunicaciones internas (entre el equipo, y entre el candidato y el equipo)
- `spec/press.md` — Flujos de prensa, medios y relaciones públicas
