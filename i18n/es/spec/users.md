# Usuarios y roles

## Resumen

GreenGrass atiende a dos categorías distintas de personas:

1. **Usuarios de la plataforma** — personas que inician sesión y usan el software para dirigir una campaña o participar en ella
2. **Registros de la base de datos** — personas que existen en el CRM como contactos, votantes o constituyentes, pero que quizá nunca inicien sesión

La descripción del producto pide "acceso explícito con cuenta propia para *todo el mundo*". Eso significa que la frontera entre ambas categorías es porosa a propósito. Un registro de votante puede convertirse en usuario activo. Quien dona una vez por un formulario puede recibir después una invitación a ser voluntaria. El sistema tiene que soportar esa fluidez sin crear registros duplicados.

---

## Organizaciones

En GreenGrass, cada unidad cliente es una **organización**. Una organización puede ser:

- Una campaña política (una persona candidata a un cargo)
- Un partido político (entidad permanente que maneja varias campañas)
- Una organización de incidencia o activismo
- Una coalición o movimiento que coordina varios grupos

### Jerarquía organizativa

**DECIDIDO:** El modelo organizativo es una federación de entidades soberanas conectadas por afiliación, no por propiedad.

**Tipos de entidad:**

| Entidad | Tipo de organización | Descripción |
|--------|------------|-------------|
| Alianza | Ligera | Coalición de partidos, organizaciones o candidatos. Tiene su propia facturación, personal, bolsa de voluntarios, datos de miembros y simpatizantes, y campañas conjuntas. No duplica el conjunto completo de herramientas de CRM, recaudación y comunicaciones de sus miembros. |
| Partido / Organización | Completa | Partido político, organización de incidencia, movimiento. Acceso completo a la plataforma: CRM, recaudación de fondos, comunicaciones, analítica, facturación y cuentas propias. |
| Candidato | Completa | Persona que se postula a un cargo. Acceso completo a la plataforma: datos, facturación y cuentas propias. |
| Campaña | Ninguna (hereda) | Pertenece a su entidad matriz (candidato, partido, organización o alianza). Hereda la facturación y la estructura administrativa de su matriz. |

**Modelo de afiliación:**

```
Alianza (soberana, capa de coordinación)
├── Partido / Organización (organización soberana) ── afiliación
│   └── Campaña(s)
├── Candidato (organización soberana) ── afiliación
│   └── Campaña(s)
└── Campaña conjunta (a nivel de alianza)
```

Un candidato también puede afiliarse directamente a un partido:

```
Partido (soberano)
├── Candidato A (soberano, afiliado) ── afiliación
├── Candidato B (soberano, afiliado) ── afiliación
└── Campaña del partido
```

**Reglas:**

- **Toda entidad, salvo Campaña, es soberana.** Cada una tiene sus propios datos, facturación, cuentas de usuario y control administrativo.
- **Las afiliaciones son voluntarias y no transfieren la propiedad.** Un partido no es dueño de los datos de un candidato. Una alianza no es dueña de los datos de sus miembros. La afiliación define los límites de la cooperación, no el control.
- **Un candidato puede afiliarse a un partido u operar de forma independiente.** Un candidato independiente con una sola campaña es sencillamente una organización soberana que opera por su cuenta.
- **Las campañas pertenecen a su entidad matriz** (candidato, partido/organización o alianza). No son soberanas: heredan la facturación y la estructura administrativa de su matriz.
- **Las alianzas son organizaciones ligeras** con capacidades operativas propias: cuentas de personal, bolsas de voluntarios, datos de miembros y simpatizantes, campañas conjuntas y facturación de los costos compartidos. No replican el conjunto completo de herramientas de la plataforma (CRM completo, herramientas de recaudación, suite de comunicaciones); esas siguen en manos de cada entidad miembro.
- **Operar por cuenta propia** siempre es posible. Cualquier entidad puede funcionar sin afiliaciones.

### Intercambio entre organizaciones dentro de una alianza

Las alianzas permiten cooperar en límites definidos. Cada organización miembro elige qué comparte:

**DECIDIDO:** Todos los tipos de recurso se pueden compartir, con consentimiento expreso por recurso de cada organización miembro.

**Recursos compartibles:**

| Recurso | Descripción | Nota sobre soberanía |
|----------|-------------|-----------------|
| Bolsas de voluntarios | Voluntarios disponibles para asignarse a cualquier campaña de un miembro | La identidad de plataforma del voluntario sigue siendo suya; el historial de asignaciones se registra por organización |
| Datos de contacto con votantes | Resultados del trabajo de campo compartidos para no tocar dos veces la misma puerta | Cada organización elige qué datos de contacto expone; sus etiquetas y puntajes internos quedan privados salvo que los comparta explícitamente |
| Infraestructura de eventos | Mítines conjuntos, listas de confirmación compartidas, calendarios coordinados | El evento sigue perteneciendo a la organización que lo creó; las confirmaciones llegan a todas las organizaciones coanfitrionas |
| Recaudación de fondos | Páginas de recaudación conjunta con repartos de donaciones configurables | Los registros financieros de cada organización siguen siendo soberanos; las reglas de reparto se definen a nivel de campaña |
| Listas de comunicación | Listas de simpatizantes compartidas para mensajería coordinada | Las organizaciones comparten quién está en la lista, no su segmentación interna ni sus datos de participación |
| Analítica | Paneles agregados de toda la alianza | Las organizaciones miembro ven agregados de toda la alianza; el desglose por organización requiere el consentimiento de esa organización |

**Reglas de intercambio:**

- **Consentimiento expreso por recurso y por organización.** Cada organización miembro elige explícitamente qué tipos de recurso comparte con la alianza. Nada se comparte por defecto.
- **Revocable.** Una organización puede retirar un recurso compartido. Los datos ya copiados o ya usados (por ejemplo, un voluntario que ya trabajó un turno conjunto) permanecen en el registro de auditoría, pero el acceso continuo se corta.
- **Auditado.** Toda concesión, toda revocación y todo acceso a datos entre organizaciones queda registrado.
- **Respeta el consentimiento de cada persona.** Si un simpatizante se dio de baja del intercambio de datos en sus preferencias de plataforma, su registro queda fuera de los recursos compartidos sin importar la configuración de la organización.

### Pertenencia a varias organizaciones

**DECIDIDO:** Identidad de plataforma con perfiles federados.

Una persona tiene **una sola identidad a nivel de plataforma** y **un perfil por cada organización** a la que pertenece. La plataforma sabe que es la misma persona (lo que permite deduplicar y coordinar entre organizaciones al nivel de la alianza), pero cada organización solo ve sus propios datos sobre esa persona.

**Reparto de la propiedad de los datos:**

| Pertenece a la persona (nivel de plataforma) | Pertenece a la organización |
|---|---|
| Credenciales de acceso (login, 2FA) | Rol y permisos dentro de esa organización |
| Nombre, datos de contacto, idioma preferido | Horas de voluntariado, historial de turnos |
| Preferencias de alta y baja en comunicaciones | Asignaciones de trabajo de campo y notas de campo |
| Historial de donaciones (como registro propio del donante) | Etiquetas, puntajes y segmentos internos |
| Membresías e historial de afiliaciones | Notas del personal sobre la persona |
| Preferencias globales de la cuenta | Asignaciones de tareas y eventos |

**Portabilidad:** La identidad de plataforma de una persona es independiente de cualquier organización. Puede irse de una organización, entrar a otra o existir sin afiliación. Los datos de identidad viajan con la persona; los datos operativos específicos de cada organización se quedan con la organización.

**Visibilidad de la alianza:** Cuando las organizaciones miembro participan en una alianza, la capa de alianza puede ver que una persona existe en varias organizaciones miembro para efectos de coordinación (deduplicación, bolsas de voluntarios compartidas, listas de no volver a tocar la puerta). El *contenido* de los datos que cada organización tiene sobre esa persona no se expone a la alianza sin reglas de intercambio explícitas.

<!-- REVISIT: La frontera entre los datos que pertenecen a la persona y los que pertenecen a la organización va a necesitar pruebas de estrés a medida que definamos en detalle los flujos de trabajo de campo y la coordinación a nivel de alianza. El historial de contacto en el trabajo de campo es una zona gris conocida: es dato operativo de la campaña, pero también es el registro del trabajo de esa persona, y la alianza puede necesitar acceso selectivo para coordinar. -->

---

## Roles de la plataforma

### Administrador de la organización

El administrador de más alto nivel de una organización. Normalmente el gerente de campaña, el director del partido o quien lidera la organización.

**Lo que puede hacer:**
- Acceso completo a todas las funcionalidades de la plataforma
- Manejar cuentas de personal, roles y permisos
- Configurar los ajustes de la organización (identidad visual, procesadores de pago, integraciones)
- Acceder a todos los datos (CRM, financieros, analítica)
- Manejar la facturación y la suscripción

**Usuarios típicos:** Gerente de campaña, director ejecutivo de un partido, fundador de la organización

---

### Personal

Trabajadores pagos o de alto rango de la campaña, con acceso por rol a áreas específicas de la plataforma. Personal no es un rol único: es una categoría con permisos configurables.

**Subroles posibles del personal:**

#### Director de comunicaciones
- Crear y enviar campañas de correo, SMS y mensajes de WhatsApp
- Manejar las cuentas de redes sociales y su calendario
- Acceder a la analítica de participación
- Manejar plantillas de correo y SMS y listas de contactos

#### Director de finanzas
- Manejar los formularios de donación y la configuración del procesador de pagos
- Ver y exportar informes financieros
- Procesar reembolsos y manejar donaciones recurrentes
- Llevar el control de las donaciones en efectivo y generar informes de cumplimiento

#### Director de campo
- Manejar las operaciones de trabajo de campo y la asignación de territorios
- Supervisar las jornadas de inscripción de votantes
- Manejar las campañas de llamadas y sus guiones
- Acceder a la analítica de campo (puertas tocadas, llamadas hechas, contactos con votantes)

#### Coordinador de voluntarios
- Reclutar, incorporar y manejar voluntarios
- Crear y manejar turnos, eventos y asignaciones de tareas
- Comunicarse con los voluntarios
- Llevar el control de las horas y la actividad de los voluntarios

#### Gestor de datos
- Importar, exportar y limpiar los datos del CRM
- Manejar las importaciones del padrón electoral y la segmentación de listas
- Construir informes y consultas personalizadas
- Manejar la deduplicación y la calidad de los datos

**DECIDIDO:** Híbrido — plantillas de rol como punto de partida, con permisos ajustables por usuario.

La plataforma viene con un conjunto de plantillas de rol de personal por defecto (Director de comunicaciones, Director de finanzas, Director de campo, Coordinador de voluntarios, Gestor de datos). Los administradores de la organización pueden:

- Asignar una plantilla tal cual a alguien del personal (cubre la mayoría de los casos)
- Asignar varias plantillas a una sola persona (la campaña de tres personas donde alguien hace comunicaciones y finanzas)
- Modificar permisos individuales sobre una plantilla (conceder o revocar capacidades específicas)
- Crear plantillas de rol propias para su organización

Al apilarse, las plantillas se suman: asignar Director de comunicaciones y Director de finanzas concede la unión de ambos conjuntos de permisos. Las revocaciones explícitas mandan sobre las concesiones.

---

### Voluntario

Personas que se ofrecieron a ayudar a la campaña y recibieron acceso a la plataforma. Los voluntarios son el grupo de usuarios más grande y el más variable en alfabetización tecnológica y en capacidad de sus dispositivos.

**Lo que puede hacer:**
- Ver sus turnos, tareas y eventos asignados
- Confirmar asistencia a eventos
- Usar las herramientas de trabajo de campo (móviles, funcionan sin conexión)
- Usar la interfaz de jornadas de llamadas
- Registrar su propia actividad
- Actualizar su perfil y sus preferencias de contacto

**Lo que no puede hacer:**
- Ver información personal de otros voluntarios
- Acceder a datos financieros
- Enviar comunicaciones masivas
- Exportar datos
- Modificar registros del CRM más allá de los datos de campo que le tocan

**Usuarios típicos:** Vecinos de la comunidad, activistas, estudiantes, personas jubiladas, simpatizantes con poco tiempo

**DECIDIDO:** Los voluntarios tienen dos niveles — Voluntario y Líder de equipo de voluntarios.

#### Líder de equipo de voluntarios

Un rol de liderazgo en terreno para manejar un grupo pequeño de voluntarios durante una operación (días de puerta a puerta, jornadas de llamadas, eventos). No es un rol de personal: los líderes de equipo siguen siendo voluntarios, pero con acceso adicional acotado.

**Lo que puede hacer (además del rol base de Voluntario):**
- Ver la lista de su equipo (nombres y datos de contacto para coordinar)
- Registrar la entrada de los integrantes del equipo a turnos y eventos
- Ver el territorio asignado a su equipo y el avance del trabajo de campo
- Reasignar puertas o llamadas dentro de su equipo durante una operación
- Reportar problemas al personal o señalar fallas en la calidad de los datos
- Usar un panel ligero de equipo (asistencia, tasas de cumplimiento)

**Lo que no puede hacer:**
- Ver equipos que no sean el suyo
- Crear o modificar turnos, eventos o asignaciones de territorio (eso le toca al Coordinador de voluntarios o al Director de campo)
- Acceder a los datos del CRM, los datos financieros o la analítica de toda la organización
- Enviar comunicaciones masivas

---

### Simpatizante

Alguien que expresó apoyo a la campaña —se inscribió en el sitio web, donó, fue a un evento, firmó una petición— pero no está haciendo voluntariado activo. Puede tener cuenta o no tenerla.

**Si inicia sesión, puede:**
- Ver su propio perfil y su historial de donaciones
- Actualizar sus preferencias de contacto y sus altas en comunicaciones
- Confirmar asistencia a eventos públicos
- Ver los perfiles públicos del candidato o de la organización
- Donar

**Usuarios típicos:** Donantes, firmantes de peticiones, suscriptores del boletín, asistentes a eventos

---

### Candidato

La persona que se postula al cargo. En algunas campañas el candidato usa la plataforma a fondo; en otras, no la toca.

**Lo que puede hacer:**
- Ver paneles e informes (de solo lectura o vistas curadas)
- Manejar su propio perfil público
- Ver totales de recaudación y asistencia a eventos
- Comunicarse con el equipo (mensajería interna)

**DECIDIDO:** Candidato es una plantilla de rol, no un tipo de rol aparte.

La plantilla Candidato ofrece por defecto una interfaz curada y simplificada:
- Paneles de campaña y métricas clave (recaudación, actividad de voluntarios, eventos)
- Manejo del perfil público
- Totales de recaudación y panorama de donantes (sin la administración financiera completa)
- Asistencia a eventos y agenda próxima
- Mensajería interna con el equipo

La plantilla deja fuera a propósito la complejidad operativa (manejo de datos, programación de turnos de voluntarios, herramientas de comunicación), pero como es una plantilla, los permisos se pueden ajustar para candidatos que quieran meter mano y tener acceso completo.

**Nota de diseño:** El sistema de plantillas es un patrón central de toda la plataforma. Todos los roles —los subroles del personal, los niveles de voluntariado y el candidato— están implementados como plantillas de permisos que se pueden asignar tal cual, apilar o personalizar. Así la plataforma trae buenos valores por defecto para las configuraciones más comunes y a la vez deja que cada organización ajuste el acceso a su estructura real.

---

## Tipos de registro del CRM (sin cuenta)

Estas son personas que existen en la base de datos pero que quizá no tengan cuenta en la plataforma.

### Votante / constituyente

Una persona del padrón electoral o de la base de constituyentes. Es el registro central del CRM.

**Datos típicos:**
- Nombre, dirección, datos de contacto
- Precinto electoral / distrito electoral
- Estado de inscripción como votante
- Historial de votación (en qué elecciones participó, no por quién votó)
- Datos demográficos (edad, idioma preferido)
- Puntaje de apoyo o simpatía (a partir del trabajo de campo)
- Historial de comunicaciones (correos abiertos, puertas tocadas, llamadas hechas)
- Etiquetas y segmentos
- Relaciones dentro del hogar

### Donante

Una persona que hizo una aportación económica. Puede coincidir con cualquier otro tipo de registro.

**Datos adicionales:**
- Historial de donaciones (montos, fechas, métodos)
- Estado de donación recurrente
- Información de cumplimiento (empleador, ocupación — varía según la jurisdicción)

### Contacto

Un registro de uso general para personas que no encajan bien como votante ni como donante. Puede tratarse de contactos de prensa, líderes de organizaciones aliadas, cargos electos o quienes dan su respaldo.

---

## La lista única y la deduplicación

La descripción del producto pide "una lista única que deduplica personas". En la práctica, eso significa:

- Una persona debe tener un solo registro canónico, sin importar cuántas veces aparezca en distintas fuentes de datos
- Un votante que además dona y además hace voluntariado es **un registro** con varias facetas, no tres registros separados
- El rol o tipo se suma: un registro se etiqueta como votante + donante + voluntario, no se encasilla en una sola categoría

### Estrategia de deduplicación

**DECIDIDO:** Coincidencia compuesta, con el número de celular como identificador principal.

El motor de deduplicación usa coincidencia ponderada sobre varios campos, con pesos configurables por despliegue para dar cuenta de la calidad y la disponibilidad de datos de cada país.

**Campos de coincidencia por prioridad:**

1. **Número de celular (principal)** — el de mayor peso. Es un identificador fuerte en contextos donde el celular manda y la penetración en el Sur Global es alta. Se normaliza a formato internacional (E.164).
2. **Correo electrónico** — secundario. Útil donde existe, pero no se asume universal.
3. **Identificación nacional / de votante** — coincidencia definitiva donde exista. Se trata como dato sensible, con las protecciones de almacenamiento correspondientes. Su disponibilidad y formato varían según el país.
4. **Nombre + dirección** — coincidencia difusa como señal de apoyo. Sirve para corroborar o sacar a la luz coincidencias posibles, no como criterio único.

**Configurable por despliegue:** Los pesos de coincidencia, los umbrales de confianza requeridos y qué campos están disponibles o son relevantes se pueden ajustar por organización o según el contexto del país. Un despliegue en un país con identificación nacional universal puede darle mucho peso a ese campo; uno donde es común compartir teléfono puede bajar el peso del celular y exigir un segundo campo coincidente.

### Comportamiento de la fusión

**DECIDIDO:** Sugerir y confirmar.

El sistema marca los posibles duplicados y los pone en una cola de revisión. Una persona con los permisos adecuados (Gestor de datos o Administrador de la organización) revisa y decide si fusiona, descarta o pospone. Nada se fusiona automáticamente: en un contexto político, el riesgo de atribuir mal una donación o perder historial de trabajo de campo es demasiado alto.

La interfaz de revisión debe mostrar una comparación lado a lado de los registros candidatos, con el puntaje de confianza y qué campos coincidieron.

---

## Autenticación y acceso

La descripción del producto especifica "acceso explícito con cuenta propia para todo el mundo, con preferencias de cuenta fáciles de manejar".

### Métodos de autenticación

**DECIDIDO:** Passkeys como método principal. Nada de inicio de sesión con redes sociales.

**Métodos de autenticación por prioridad:**

1. **Passkeys / WebAuthn (principal)** — lo más seguro, resistente al phishing, sin secretos compartidos. Encaja muy bien en celulares, donde el desbloqueo biométrico (huella, rostro) convierte crear y usar un passkey en un solo gesto. Sin costo por inicio de sesión. Elimina el riesgo de secuestro de SIM.
2. **Enlace mágico por correo (secundario)** — alternativa para dispositivos o contextos donde no hay soporte para passkeys. Más simple que las contraseñas, sin credenciales que recordar ni que robar.
3. **Teléfono + código OTP por SMS (terciario)** — alternativa para quienes no tienen correo. Es accesible, pero tiene costo por inicio de sesión y riesgo de secuestro de SIM. Debe acompañarse de una invitación a configurar un passkey.
4. **Correo + contraseña (alternativa heredada)** — disponible, pero no promovida. Para usuarios o contextos donde los métodos anteriores no son viables.

**Excluido explícitamente:** Inicio de sesión con redes sociales (Google, Facebook, etc.). Atar la actividad política a una identidad comercial crea riesgo de vigilancia y dependencia de plataforma. No es apropiado en este contexto.

**Nota de seguridad:** Para los roles de personal y administración, el passkey debe recomendarse con fuerza o exigirse. Para voluntarios y simpatizantes, el sistema debe proponer el passkey por defecto durante la incorporación, pero permitir los métodos alternativos sin pasos extra.

### Manejo de sesiones

**DECIDIDO:** Duración de sesión según el rol, con revocación remota y ciclo de vida ligado al turno.

**Duración de la sesión por rol:**

| Rol | Duración de la sesión | Justificación |
|------|-----------------|-----------|
| Administrador de la organización | Corta (horas) | Es el acceso de mayor privilegio, con datos sensibles |
| Personal | Media (jornada laboral) | Acceso operativo, uso habitual |
| Voluntario (general) | Media (jornada laboral) | Acceso general a la plataforma |
| Voluntario (modo de campo) | Lo que dure el turno | Se mantiene mientras dure el turno asignado y luego termina |
| Simpatizante | Larga (semanas) | Poco privilegio; la comodidad importa para que participe |

**Revocación remota de sesiones:** Los roles de personal (Coordinador de voluntarios, Director de campo, Administrador de la organización) pueden revocar cualquier sesión activa de las personas que manejan. Esto es crítico si un dispositivo se pierde o lo roban durante una operación de campo. La revocación debe ser inmediata y forzar una nueva autenticación.

**El ciclo del turno como frontera de evento:** Cerrar un turno de trabajo de campo o de llamadas es un evento de primera clase en la plataforma, y dispara:

- La sincronización de todos los datos pendientes al servidor
- El cierre de la sesión de modo de campo
- El registro de las horas de voluntariado del turno
- Una solicitud de balance del turno (notas, problemas encontrados)
- La liberación de las asignaciones de territorio o de lista de llamadas
- El aviso de finalización al Coordinador de voluntarios o al Líder de equipo

<!-- REVISIT: El modelo de eventos del ciclo del turno debería ampliarse en la especificación de flujos de trabajo. Es un gancho natural para analítica, gamificación (si se quisiera) y control de calidad (marcar rutas de campo incompletas). -->

---

## Modelo de permisos

**DECIDIDO:** Híbrido — base RBAC con ámbitos por atributos geográficos y de equipo.

**Cómo funciona:**

- Las **plantillas de rol** determinan *qué acciones* puede hacer una persona (crear eventos, enviar correos, manejar voluntarios, ver finanzas)
- Las **asignaciones de ámbito** determinan *sobre qué datos* aplican esas acciones

**Tipos de ámbito:**

| Ámbito | Descripción | Ejemplo |
|-------|-------------|---------|
| Geográfico | Limita el acceso a una región, distrito, precinto o territorio | Un Director de campo asignado a la zona norte solo ve los datos de la zona norte |
| Equipo | Limita el acceso a un equipo o grupo específico | Un Líder de equipo solo ve la lista y el avance de su propio equipo |
| Campaña | Limita el acceso a una campaña específica dentro de la organización | Alguien del personal que trabaja solo en la contienda municipal, no en la gubernatorial |
| Sin ámbito | Acceso completo dentro de la organización (el valor por defecto del Administrador de la organización) | El Administrador de la organización lo ve todo |

**Reglas de ámbito:**

- Los ámbitos se **asignan por persona**, no por plantilla de rol. Dos Directores de campo pueden tener ámbitos geográficos distintos.
- Los ámbitos **se suman**: alguien asignado al Distrito 5 y al Distrito 6 ve los dos.
- **El Administrador de la organización no tiene ámbito por defecto**: ve todo lo de su organización. Se le puede acotar si conviene (por ejemplo, un partido grande donde los administradores regionales manejan su propia zona).
- Los ámbitos actúan como **filtro sobre el acceso a los datos**, no sobre el acceso a las funcionalidades. Un Director de campo acotado tiene las mismas herramientas que uno sin ámbito; simplemente ve otra porción de los datos.
- Los ámbitos **se componen con el modelo de federación**: los límites entre organizaciones son el ámbito más externo, y dentro de una organización el ámbito geográfico, de equipo o de campaña estrecha aún más.

<!-- REVISIT: El ámbito geográfico depende del modelo de datos geográficos (cómo se estructuran y anidan precintos, distritos, territorios y regiones). Eso debería definirse en la especificación de arquitectura. -->

---

## Preguntas abiertas

1. ~~**Pertenencia a varias organizaciones**~~ — **RESUELTO.** Perfiles federados. Ver la sección Pertenencia a varias organizaciones más arriba.
2. ~~**Jerarquía organizativa**~~ — **RESUELTO.** Federación multinivel de entidades soberanas. Ver la sección Jerarquía organizativa más arriba.
3. ~~**Cambios de rol**~~ — **RESUELTO.** Las plantillas se suman. Pasar de simpatizante a voluntario y de ahí a personal significa agregar plantillas, no reemplazarlas. Todo el historial de actividad previo viaja con la identidad de plataforma. Las autorizaciones son proporcionales al rol: un simpatizante puede pasar solo a voluntario (apuntándose a un turno), pero los roles de personal los tiene que conceder el Administrador de la organización.
4. ~~**Visibilidad de datos entre roles**~~ — **RESUELTO.** Configuración por organización, privado por defecto. Cada organización decide sus propias reglas de visibilidad (por ejemplo, si los voluntarios ven a sus compañeros de turno, o si los nombres de los donantes se muestran públicamente). La plataforma arranca con la visibilidad mínima: para abrir más, la organización tiene que activarlo. Esto responde a la variedad de contextos de seguridad política entre despliegues.
5. ~~**Delegación**~~ — **RESUELTO.** Dos mecanismos:
   - **Delegación con fecha de vencimiento:** El Administrador de la organización puede conceder acceso elevado temporal a otra persona con una fecha de expiración explícita. El acceso se revoca solo cuando termina el periodo. Cubre licencias, viajes y emergencias.
   - **Plantilla Adjunto:** Una plantilla de rol permanente con acceso casi de administrador (manejar personal, dirigir operaciones, ver todos los datos) pero sin las capacidades más sensibles (manejo de facturación, revocar a otros administradores, eliminar la organización). Cubre la necesidad continua de un segundo al mando.
6. ~~**Registro de auditoría**~~ — **RESUELTO.** Auditoría completa. Todo cambio de datos queda registrado: quién, qué, cuándo y desde dónde. Esto incluye ediciones del CRM, transacciones financieras, cambios de permisos, inicios de sesión, exportaciones de datos, fusiones de registros, operaciones masivas y eventos de sesión. La integridad electoral y la confianza son el corazón de la plataforma; un registro de auditoría completo no es negociable.
   <!-- REVISIT: Las políticas de retención y la estrategia de almacenamiento (almacenamiento por niveles, archivo, infraestructura de auditoría compartida o por organización) deberían abordarse en la especificación de arquitectura. Los requisitos de cumplimiento sobre retención de auditoría varían según la jurisdicción. -->
7. ~~**Recuperación de cuentas**~~ — **RESUELTO.** Recuperación por contacto de confianza, dentro de la app.
   - Durante la incorporación, la persona designa uno o más contactos de confianza dentro de su organización (su líder de equipo, el coordinador de voluntarios o alguien del personal).
   - Si queda fuera de su cuenta, inicia una solicitud de recuperación desde la app (en un dispositivo nuevo o desde una pantalla de acceso web).
   - El contacto de confianza recibe la solicitud en la app, verifica la identidad de la persona (en persona, por teléfono, como le convenza) y aprueba la recuperación.
   - El sistema abre un flujo para crear una credencial nueva (un passkey nuevo en el dispositivo nuevo).
   - Todo el proceso de recuperación queda en el registro de auditoría: quién lo pidió, quién lo aprobó, cuándo y desde qué dispositivo.
   - **Salvaguarda:** Un contacto de confianza solo puede aprobar la recuperación de las personas para las que fue designado explícitamente, no de cuentas cualesquiera. Los Administradores de la organización pueden intervenir como último recurso, también con registro completo.
8. ~~**Administración a nivel de plataforma**~~ — **RESUELTO.** Rol de Administrador de la plataforma, sin suplantación de usuarios.

   El **Administrador de la plataforma** existe fuera del modelo de organizaciones. Es el rol operativo del equipo de GreenGrass para manejar la plataforma misma.

   **Lo que puede hacer:**
   - Aprovisionar organizaciones y manejar su ciclo de vida (crear, suspender, dar de baja)
   - Manejar la facturación y las suscripciones de todas las organizaciones
   - Monitorear el sistema, ver paneles de salud y manejar la infraestructura
   - Manejar despliegues (empujar actualizaciones a todas las organizaciones en la arquitectura de organización única)
   - Ver en modo lectura todos los datos de una organización, para soporte y depuración
   - Manejar las afiliaciones de alianza a nivel de plataforma

   **Excluido explícitamente:** La suplantación de usuarios. Un Administrador de la plataforma no puede iniciar sesión ni actuar como usuario de una organización. El soporte y la depuración se hacen con visibilidad de solo lectura, no asumiendo la identidad de otra persona. Así se preservan la confianza de las organizaciones y la integridad del registro de auditoría.
