# Seguridad y modelo de amenazas

## Por qué importa este documento

GreenGrass es una plataforma de organización política que opera en el Sur Global. Este no es un contexto de seguridad empresarial estándar. Las personas que la usan —candidatos, organizadores, voluntarios, simpatizantes— pueden enfrentar consecuencias reales si sus datos quedan expuestos: vigilancia, hostigamiento, arresto o violencia. Una falla de seguridad no es solo un riesgo reputacional o financiero: es un riesgo para la integridad física de la gente.

Evalúa cada decisión de seguridad contra esa realidad.

---

## Actores de amenaza

### Nivel 1: actores estatales

Servicios de inteligencia y de seguridad de Estados nacionales, con capacidad técnica considerable.

**Motivación:** vigilar la actividad política de la oposición, identificar organizadores, reprimir movimientos, recabar inteligencia sobre candidatos y sus simpatizantes.

**Capacidades:**
- Interceptación del tráfico de red e inspección profunda de paquetes
- Obligar a los proveedores de internet y telecomunicaciones locales a entregar datos
- Acceso legal y extralegal a la infraestructura de nube dentro de su jurisdicción
- Compromiso dirigido de dispositivos (spyware como Pegasus)
- Ingeniería social a gran escala
- Incautación física de dispositivos

**Probabilidad:** alta en muchos de los países objetivo. Esta es la amenaza que lo define todo.

### Nivel 2: actores geopolíticos no estatales

Corporaciones multinacionales, organizaciones políticas extranjeras, industrias extractivas, ONG transnacionales y otras entidades no estatales poderosas con intereses en el resultado político.

**Motivación:** proteger intereses de negocio (minería, energía, agricultura), impulsar agendas políticas extranjeras, frenar movimientos laborales o ambientales, mantener entornos regulatorios favorables.

**Capacidades:**
- Firmas de inteligencia corporativa e investigación privada
- Herramientas comerciales de vigilancia (spyware adquirido legalmente, corredores de datos)
- Recursos financieros suficientes para contratar talento técnico
- Presión legal (demandas, medidas cautelares para forzar la entrega de datos)
- Influencia sobre los medios y las instituciones locales
- Manipulación de redes sociales y astroturfing a gran escala

**Probabilidad:** alta donde las campañas de base desafían intereses corporativos o extranjeros asentados: industrias extractivas, derechos sobre la tierra, organización laboral, movimientos ambientales.

### Nivel 3: oponentes políticos

Campañas, partidos u operadores políticos rivales.

**Motivación:** ganar ventaja competitiva —robar datos de votantes, listas de donantes, estrategia de campaña— y desacreditar o entorpecer a las campañas rivales.

**Capacidades:**
- Ingeniería social (hacerse pasar por voluntarios para conseguir acceso)
- Soborno o coerción de personas de adentro
- Contratación de hackers o uso de herramientas comerciales de vigilancia
- Uso de datos robados como arma, mediante filtraciones a la prensa

**Probabilidad:** alta, sobre todo durante los ciclos electorales.

### Nivel 4: actores criminales

Crimen organizado, operadores de ransomware, atacantes oportunistas.

**Motivación:** ganancia económica —rescate, venta de datos, fraude con la información de pago de los donantes.

**Capacidades:**
- Ransomware y extorsión
- Credential stuffing y phishing
- Explotación de vulnerabilidades conocidas
- Fraude con medios de pago

**Probabilidad:** moderada. Las campañas políticas no son el blanco principal de la mayoría de los actores criminales, pero los datos de pago de los donantes y la visibilidad pública de las campañas pueden atraer atención.

### Nivel 5: amenazas internas

Personal actual o antiguo, voluntarios o integrantes de organizaciones afiliadas.

**Motivación:** agravio personal, desacuerdo ideológico, coacción por parte de actores externos, incentivo económico.

**Capacidades:**
- Acceso legítimo a la plataforma (según su rol)
- Conocimiento de los procesos internos y de la gente
- Capacidad de exfiltrar datos poco a poco a lo largo del tiempo
- Capacidad de sabotear datos u operaciones

**Probabilidad:** moderada. Las campañas son entornos de mucha rotación y alta carga emocional, con bases de voluntarios grandes y niveles desiguales de verificación.

---

## Activos que hay que proteger

### Activos críticos (si se comprometen, causan daño directo a personas)

| Activo | Riesgo si se compromete |
|-------|-------------------|
| Identidad y datos de contacto de simpatizantes y voluntarios | Persecución selectiva, hostigamiento, arresto en entornos políticos hostiles |
| Datos de contacto de votantes con su inclinación política | Revela quién apoya a la oposición: peligroso bajo regímenes autoritarios |
| Notas de trabajo de campo y datos de campo | Registro detallado de quién dijo qué a quién, con la dirección de su casa |
| Comunicaciones privadas de los candidatos | Chantaje, manipulación política, filtraciones a la prensa |
| Identidad de los donantes e historial de donaciones | Persecución financiera, represalias políticas, extorsión |

### Activos de alto valor (si se comprometen, causan daño operativo)

| Activo | Riesgo si se compromete |
|-------|-------------------|
| Estrategia de campaña y analítica interna | La ventaja competitiva pasa a los oponentes |
| Padrón electoral y datos de segmentación | Meses de trabajo de organización, robados |
| Registros financieros y credenciales del procesador de pagos | Fraude, robo de fondos, incumplimientos normativos |
| Credenciales de la plataforma y tokens de acceso | Compromiso total del sistema, suplantación |
| Registros de auditoría | Borrar las huellas tras una brecha, socavar la confianza |

### Activos de infraestructura

| Activo | Riesgo si se compromete |
|-------|-------------------|
| Servidores de aplicación y bases de datos | Brecha total de datos, interrupción del servicio |
| Sistemas de respaldo | Destrucción de datos (ransomware), robo de datos históricos |
| Canalizaciones de despliegue | Ataque a la cadena de suministro, inyección de código malicioso |
| DNS y control de dominios | Phishing, interceptación de tráfico, secuestro del servicio |
| Infraestructura de envío de SMS y correo | Suplantación, campañas de desinformación |

---

## Principios de seguridad

1. **Asume la brecha.** Diseña cada capa dando por hecho que la capa de arriba ya está comprometida. Defensa en profundidad, no seguridad perimetral.
2. **Reduce el radio de impacto.** La arquitectura de organización única ayuda: comprometer a una organización no debe exponer a otra.
3. **Recolecta lo mínimo.** No recolectes datos que no necesitas. Cada campo que guardas es un campo que te pueden robar.
4. **Cifra todo.** En reposo y en tránsito, sin excepciones.
5. **Audita todo.** El registro de auditoría completo (decidido en users.md) es un control de seguridad, no solo una funcionalidad de cumplimiento.
6. **Privado por defecto.** Decidido en users.md: privado por defecto, y la visibilidad se activa por decisión expresa.
7. **Datos soberanos, infraestructura soberana.** Los datos de una organización deben permanecer en jurisdicciones que ella controle.
8. **Ningún punto único de compromiso.** Ninguna credencial, llave ni persona debería poder exponer la plataforma entera.

---

## Cifrado

### En tránsito

**DECIDIDO:** TLS 1.2+, con preferencia por TLS 1.3. Los clientes compatibles con 1.3 lo negocian automáticamente; los dispositivos más viejos caen a 1.2 con las suites de cifrado débiles deshabilitadas. Equilibra la seguridad con la accesibilidad de los dispositivos que hay en el Sur Global.

Toda comunicación de red debe ir cifrada:
- Cliente ↔ servidor: HTTPS con HSTS y fijación de certificados en los clientes móviles
- Servidor ↔ servidor: TLS mutuo para la comunicación entre servicios internos
- Servidor ↔ APIs de terceros: TLS con validación de certificados

### En reposo

Todos los datos almacenados deben estar cifrados en reposo:
- Cifrado de la base de datos (cifrado transparente de datos o a nivel de sistema de archivos)
- Cifrado de los respaldos, con gestión de llaves separada
- Cifrado del almacenamiento local en el dispositivo para las funcionalidades que operan sin conexión (los datos de trabajo de campo en el celular del voluntario)

**DECIDIDO:** sí. Los campos de alta sensibilidad llevan cifrado a nivel de aplicación, encima del cifrado a nivel de almacenamiento. Defensa en profundidad: comprometer la base de datos, por sí solo, no expone los datos más sensibles.

**Campos que requieren cifrado a nivel de aplicación:**
- Puntuaciones de inclinación política y de nivel de apoyo
- Notas de trabajo de campo y registros de interacción en campo
- Identidad de los donantes y detalles de sus donaciones
- Comunicaciones privadas de los candidatos
- Números de identificación nacional y de identificación electoral

<!-- REVISIT: La implementación concreta (cifrado de sobre, cifrado con capacidad de búsqueda o descifrado en lectura) debe resolverse en la especificación de arquitectura. Habrá que evaluar campo por campo el equilibrio entre capacidad de consulta y seguridad. -->

### Cifrado de extremo a extremo

**DECIDIDO:** cifrado de extremo a extremo por defecto en la mensajería interna, con custodia de llaves opcional controlada por la organización.

- **Por defecto:** toda la mensajería interna (entre personal, entre candidato y jefatura de campaña) va cifrada de extremo a extremo. GreenGrass no puede leer el contenido y no tiene nada que entregar si se lo exigen.
- **Custodia opcional:** una organización puede activar la custodia de llaves del lado del servidor. Eso habilita la búsqueda de mensajes, una recuperación de dispositivos más fácil y la continuidad del historial, a cambio de que GreenGrass —y, potencialmente, quien le presente una exigencia legal— pueda acceder al contenido.
- **Transparente:** la elección se les muestra claramente a los usuarios. Si la custodia está activada, la interfaz de mensajería debe indicar que en esa organización los mensajes no van cifrados de extremo a extremo.
- **Por organización, no por persona:** es una configuración de la organización, no una elección individual. El Administrador de la organización decide el equilibrio para toda su organización.

<!-- REVISIT: La experiencia de gestión de llaves, el flujo de recuperación de dispositivos en modo extremo a extremo y el mecanismo de custodia necesitan diseño detallado en la especificación de arquitectura. -->

---

## Soberanía y residencia de los datos

### El problema

GreenGrass opera en varios países. Cada país tiene leyes distintas sobre:
- Dónde se pueden almacenar los datos
- Quién puede exigir acceso a los datos (tribunales, servicios de inteligencia, policía)
- Qué derechos de protección de datos tiene la ciudadanía
- Si los datos políticos tienen protecciones especiales

Una campaña del país A no debería tener sus datos almacenados en el país B —ni accesibles desde ahí—, sobre todo si el país B mantiene una relación adversa con el movimiento político de esa campaña.

### Residencia de los datos

**DECIDIDO:** residencia de datos por país como estándar, con una opción autoalojada.

**Residencia por país (gestionada):**
- Los datos de cada organización se almacenan dentro de su país, o de un país que ella elija explícitamente al momento del aprovisionamiento.
- GreenGrass gestiona la infraestructura: despliegue, actualizaciones, monitoreo y soporte.
- Exige que GreenGrass establezca presencia de alojamiento en cada país objetivo, ya sea con proveedores de nube locales o con centros de datos en el país.
- La arquitectura de organización única lo vuelve natural: cada organización ya está aislada, así que ubicar ese aislamiento en un país concreto es una cuestión operativa, no arquitectónica.

**Opción autoalojada:**
- Para las organizaciones más sensibles en materia de seguridad, GreenGrass entrega el software para que lo desplieguen en su propia infraestructura.
- La organización controla la seguridad física y de red, la residencia de los datos y el acceso.
- GreenGrass provee paquetes de actualización, documentación y soporte, pero no tiene acceso a la instancia de la organización salvo que esta se lo otorgue explícitamente.
- Las organizaciones autoalojadas son responsables de sus propios respaldos, de su monitoreo y del mantenimiento de su infraestructura.

<!-- REVISIT: La opción autoalojada tiene implicaciones serias para la entrega de actualizaciones, la fragmentación de versiones y el costo del soporte. Necesita tratamiento detallado en la especificación de arquitectura. Además, la estrategia de alojamiento por país necesita un plan de despliegue: qué países primero, qué proveedores de nube, modelado de costos. -->

### Jurisdicción legal

**DECIDIDO:** constituirse en una jurisdicción con protección fuerte de la privacidad. Imposibilidad arquitectónica de cumplir, donde se pueda. Medidas de transparencia.

**Constitución de la empresa:**
- GreenGrass se constituirá en una jurisdicción con leyes de privacidad y protección de datos fuertes y estables; entre las candidatas están Estonia y Suiza.
- La jurisdicción debe ofrecer: regulación fuerte de protección de datos, estabilidad política, ningún historial de coerción extralegal para obtener datos, y un marco legal que respalde el rechazo de exigencias de datos de gobiernos extranjeros.

<!-- REVISIT: La decisión final sobre la jurisdicción de constitución requiere asesoría legal. Factores clave: los tratados de asistencia legal mutua (MLAT) en los que participa la jurisdicción, si potencias mayores pueden presionarla, las implicaciones fiscales y las consideraciones prácticas de operar un negocio global. -->

**Respuesta a las exigencias de datos:**
- Donde se pueda, GreenGrass debe estar **arquitectónicamente imposibilitada de cumplir** con una exigencia de datos: si la organización custodia sus propias llaves de cifrado (ver la decisión sobre BYOK más abajo — BYOK, *Bring Your Own Key*: la organización controla su propia llave de cifrado), GreenGrass no puede descifrar sus datos ni siquiera bajo orden judicial.
- Para las organizaciones gestionadas, donde GreenGrass tiene las llaves, la empresa impugnará las exigencias excesivas o de motivación política con todas las protecciones legales de su jurisdicción de constitución.
- GreenGrass no cooperará voluntariamente con exigencias de datos de gobiernos distintos al de su jurisdicción de constitución, si no media un proceso legal válido reconocido por esa jurisdicción.

**Transparencia:**
- **Warrant canary:** GreenGrass mantendrá publicada una declaración, actualizada con regularidad, que confirme que no ha recibido exigencias secretas de datos por parte de ningún gobierno. Si la declaración desaparece, los usuarios pueden sacar sus propias conclusiones.
- **Informe de transparencia:** publicación periódica de todas las solicitudes de datos recibidas de gobiernos, cómo se manejaron y cuántas se cumplieron, se impugnaron o se rechazaron. Como mínimo, una vez al año.

---

## Seguridad de la infraestructura

### Aislamiento de organización única

La arquitectura de organización única (decidida en la descripción del producto) es una ventaja de seguridad:

- **Sin fuga de datos entre organizaciones**: cada organización tiene su propia base de datos, su instancia de aplicación y sus recursos
- **Comprometer a una organización no expone a las demás**: el radio de impacto se limita a una sola
- **Políticas de seguridad por organización**: cada una puede tener llaves de cifrado, residencia de datos y controles de acceso distintos

**DECIDIDO:** aislamiento por niveles, según el perfil de riesgo y las necesidades de cada organización.

| Nivel | Aislamiento | Para quién |
|------|----------------|----------|
| Estándar | Contenedores separados, clúster compartido | Campañas pequeñas, organizaciones de incidencia, entornos de baja amenaza |
| Reforzado | Clúster separado | Campañas medianas, entornos de amenaza elevada, organizaciones que manejan padrones electorales grandes |
| Máximo | Cuenta de nube separada | Campañas de alto riesgo bajo vigilancia estatal activa, partidos grandes, organizaciones que necesitan poder auditar el acceso a la infraestructura |
| Autoalojado | Infraestructura propia de la organización | Organizaciones que necesitan control físico y administrativo total |

Cada organización elige su nivel al momento del aprovisionamiento. Se admite subir de nivel sin tiempo fuera de servicio por migración de datos (con la arquitectura de organización única, mover una organización es operativamente sencillo, aunque no trivial).

<!-- REVISIT: Las implicaciones de precio por nivel, y si ciertas evaluaciones de amenaza deberían obligar a un nivel mínimo, hay que resolverlas en las especificaciones de modelo de negocio y de puesta en marcha. -->

### Seguridad de red

- Segmentación de red entre organizaciones
- Sin comunicación directa entre organizaciones (el intercambio dentro de una alianza pasa por la capa de plataforma)
- Detección de intrusiones y monitoreo
- Protección contra DDoS (las campañas son blancos visibles durante los periodos electorales)

### Gestión de secretos

- Nada de secretos en el código, en archivos de configuración ni en variables de entorno
- Gestión centralizada de secretos (por ejemplo, HashiCorp Vault o un equivalente nativo de la nube)
- Rotación automática de secretos
- Llaves de cifrado separadas por organización

**DECIDIDO:** BYOK por defecto. Llaves gestionadas por GreenGrass, como opción.

- **Por defecto:** cada organización genera y custodia sus propias llaves de cifrado. GreenGrass no puede descifrar sus datos. Es el modelo de confianza más fuerte: a GreenGrass no se le puede exigir que exponga datos que no puede leer.
- **Llaves gestionadas, como opción:** las organizaciones que prefieran explícitamente la comodidad por encima de la soberanía pueden optar por llaves gestionadas por GreenGrass. Eso permite que el soporte de GreenGrass ayude a recuperar datos y simplifica la operación de las organizaciones con menos capacidad técnica.
- **La elección es transparente:** durante la puesta en marcha se le explica claramente a cada organización qué implica cada opción. BYOK se presenta como el valor por defecto recomendado, no como una funcionalidad para expertos.
- **La experiencia de gestión de llaves:** la carga que gestionar llaves supone para las organizaciones es un problema de UX que hay que resolver, no una razón para centralizar el control. La plataforma debe ofrecer generación guiada de llaves, flujos seguros de respaldo y documentación clara de recuperación.
- **Pérdida de la llave:** si una organización con BYOK pierde su llave, sus datos son irrecuperables. Eso es una funcionalidad, no un defecto: significa que también son igual de irrecuperables para cualquier otro. El flujo de puesta en marcha debe dejar esta consecuencia absolutamente clara.

<!-- REVISIT: La experiencia de respaldo de llaves, los procedimientos de rotación y la recuperación de llaves entre varias personas (por ejemplo, esquema de Shamir repartido entre varios administradores de la organización) deben diseñarse en la especificación de arquitectura. -->

---

## Seguridad de la aplicación

### Seguridad de la autenticación
(Ver users.md para las decisiones sobre métodos de autenticación: passkeys como método principal, sin inicio de sesión con redes sociales)

- Limitación de frecuencia en todos los endpoints de autenticación
- Bloqueo de la cuenta tras varios intentos fallidos (con aviso a la persona y a sus contactos de confianza)
- Protección contra credential stuffing
- Seguridad de los tokens de sesión (cookies secure, httpOnly y sameSite; tokens de acceso de vida corta con rotación del token de refresco)

### Seguridad de la autorización

- Verificación de autorización del lado del servidor en cada petición (nunca confíes en las verificaciones de rol del lado del cliente)
- Privilegio mínimo en todas las plantillas de rol
- Aplicación del alcance en la capa de consulta de datos, no solo en la capa de API
- Las decisiones de autorización quedan en el registro de auditoría

### Validación de entradas y prevención de inyecciones

- Toda entrada de usuario se valida y se sanea en el servidor
- Consultas parametrizadas (nada de concatenar cadenas en las consultas a la base de datos)
- Cabeceras de Content Security Policy
- Protección contra XSS en todo el contenido renderizado
- Validación y aislamiento de los archivos que se suben

### Seguridad de la API

- Autenticación obligatoria en todos los endpoints de la API
- Limitación de frecuencia por usuario, por organización y global
- Límites de tamaño de las peticiones
- Versionado de la API para evitar problemas de seguridad derivados de la compatibilidad
- Nada de datos sensibles en las URLs ni en los parámetros de consulta

### Seguridad de las dependencias

- Escaneo automático de dependencias en busca de vulnerabilidades conocidas
- Huella mínima de dependencias: cada dependencia es superficie de ataque
- Archivos de bloqueo para compilaciones reproducibles
- Verificación de la cadena de suministro (paquetes firmados donde estén disponibles)

---

## Seguridad operativa

### Acceso del equipo de GreenGrass

- El acceso de Administrador de la plataforma exige autenticación fuerte (passkey + segundo factor)
- Todas las acciones de Administrador de la plataforma quedan en un registro de auditoría separado e inmutable
- El acceso a los sistemas de producción exige justificación y tiene duración limitada
- Sin acceso permanente a los datos de las organizaciones: el acceso de solo lectura se otorga por incidente, se registra y se revoca automáticamente
- Verificación de antecedentes para los miembros del equipo con acceso a la infraestructura

**DECIDIDO:** acceso silencioso. El Administrador de la plataforma puede leer los datos de una organización para dar soporte y depurar, sin avisarle a la organización. Todo acceso queda en el registro de auditoría inmutable de Administrador de la plataforma. Es el enfoque operativo estándar: mantiene el soporte rápido y sin trabas durante los incidentes.

### Respuesta a incidentes

**DECIDIDO:** notificación rápida; ante la duda, velocidad antes que exhaustividad.

**Notificación:**
- Se avisa a las organizaciones afectadas lo antes posible: en horas, no en días. Si puede haber gente en riesgo, esperar 72 horas para redactar una divulgación pulida es inaceptable.
- El primer aviso puede ser incompleto ("detectamos una brecha que afecta a tu organización; esto es lo que sabemos hasta ahora y esto es lo que estamos haciendo"), seguido de actualizaciones detalladas a medida que avanza la investigación.
- El aviso llega a todos los Administradores de la organización y a los Adjuntos de las organizaciones afectadas, por varios canales (en la aplicación, correo, SMS), para asegurar que se reciba aunque uno de los canales esté comprometido.

**Aislamiento de la organización:**
- Las organizaciones comprometidas se aíslan de inmediato para evitar más exposición de datos. Interrumpir una campaña es un costo serio, pero la exfiltración continua de datos es peor.
- Se le informa al Administrador de la organización sobre el aislamiento y se le da un plazo para la restauración.

**Análisis forense externo:**
- GreenGrass mantiene una relación preestablecida con al menos una firma de seguridad externa para el análisis forense de incidentes. La capacidad interna no alcanza ante una brecha seria: hacen falta la experiencia y la credibilidad de un tercero.

<!-- REVISIT: Un plan completo de respuesta a incidentes (niveles de severidad, procedimientos de escalamiento, plantillas de comunicación, proceso de revisión posterior) debe desarrollarse como documento operativo aparte. -->

### Divulgación de vulnerabilidades

**DECIDIDO:** las dos cosas. Política de divulgación responsable desde el primer día; programa de recompensas cuando la plataforma esté madura.

- **Política de divulgación (día uno):** contacto de seguridad publicado, llave PGP para reportes cifrados, lineamientos claros de divulgación responsable, compromiso de no emprender acciones legales contra investigadores de buena fe, y un plazo de respuesta definido.
- **Recompensas por vulnerabilidades (después del piloto):** programa pagado para vulnerabilidades verificadas, escalonado por severidad. Se lanza cuando la plataforma sea lo bastante estable para absorber el volumen de reportes. Atrae pruebas de seguridad activas de la comunidad investigadora, algo especialmente valioso para una plataforma política de código abierto.

---

## Seguridad de dispositivos y puntos finales

### Dispositivos de los voluntarios

Los voluntarios usan sus celulares personales para el trabajo de campo. GreenGrass no puede controlar esos dispositivos.

**Protecciones:**
- Los datos que quedan en el dispositivo para uso sin conexión deben estar cifrados
- La sesión en modo de campo expira al terminar el turno (decidido en users.md)
- Revocación remota de sesión (decidido en users.md)
- No se guarda en caché más dato sensible que el necesario para el turno en curso
- Los datos se borran del dispositivo al terminar o al revocar la sesión

**DECIDIDO:** advertir, pero no bloquear.

- La plataforma detecta indicios de compromiso del dispositivo (jailbreak, root, firmas de spyware conocido) y le muestra una advertencia a la persona: "Tu dispositivo podría estar comprometido. Evita usarlo para trabajo sensible de campaña."
- La advertencia también le llega al Administrador de la organización o al Coordinador de voluntarios, para que puedan dar seguimiento.
- **No se bloquea el acceso.** Quienes usan dispositivos viejos, modificados o con ROMs personalizadas —algo común en el Sur Global— no quedan fuera. Cada persona decide qué hacer con la información.
- La detección es de mejor esfuerzo y así se comunica: no es garantía de seguridad.

### Dispositivos del personal

**DECIDIDO:** lineamientos recomendados por defecto, con aplicación obligatoria opcional mediante atestación del dispositivo.

- **Por defecto:** todo el personal recibe lineamientos recomendados de seguridad del dispositivo durante la incorporación (activar el bloqueo de pantalla, mantener el sistema operativo actualizado, activar el cifrado del dispositivo). La plataforma muestra recordatorios suaves si detecta protecciones faltantes, pero no bloquea el acceso.
- **Aplicación obligatoria opcional:** los Administradores de la organización pueden activar la atestación de dispositivos para su organización, ya sea para toda ella o por rol. Cuando está activa, la plataforma verifica el estado del dispositivo (versión del sistema operativo, bloqueo de pantalla, cifrado) y niega el acceso si no cumple los mínimos.
- **La decisión es de la organización.** Una campaña que opera en un entorno de alta amenaza puede exigir requisitos estrictos de dispositivo. Una organización de incidencia pequeña, que usa los dispositivos que la gente tenga a mano, puede quedarse con los lineamientos. La plataforma admite las dos cosas sin imponer ninguna.

---

## Consideraciones antivigilancia

### Protección de metadatos

Aunque el contenido esté cifrado, los metadatos revelan patrones:
- Quién inicia sesión y cuándo (los patrones de actividad revelan los ciclos de organización)
- Quién se comunica con quién (el grafo social del movimiento)
- Patrones geográficos (dónde se hace trabajo de campo revela la estrategia)
- Momento y frecuencia de las donaciones

**DECIDIDO:** protección de metadatos por niveles. Moderada por defecto; agresiva disponible para organizaciones de alto riesgo.

**Moderada (por defecto):**
- Minimizar los periodos de conservación de metadatos: purgar los registros de acceso detallados según un calendario definido y conservar solo agregados
- Quitar la información identificatoria de la analítica donde se pueda (tendencias agregadas, no líneas de tiempo de la actividad de cada persona)
- Evitar registrar metadatos innecesarios (no registres qué registros vio alguien si solo necesitas saber que inició sesión)
- Separar el almacenamiento de metadatos del de contenido, para que una brecha en uno no exponga automáticamente el otro

**Agresiva (opcional, para organizaciones de alto riesgo):**
- Relleno de tráfico para enmascarar los patrones reales de uso
- Ofuscación temporal de las peticiones, para impedir la correlación de actividad
- Registro mínimo del lado del servidor: solo lo estrictamente necesario para la seguridad y la operación
- Acceso compatible con Tor (ver la decisión sobre análisis de tráfico más abajo)

<!-- REVISIT: El calendario de conservación del nivel moderado (cuánto tiempo pasa antes de purgar o agregar los metadatos) hay que definirlo en la especificación de arquitectura. Debe equilibrarse con el requisito de registro de auditoría completo: los registros de auditoría y los de metadatos sirven para cosas distintas y pueden tener reglas de conservación distintas. -->

### Resistencia al análisis de tráfico

**DECIDIDO:** domain fronting y acceso por Tor, ambos disponibles, ninguno obligatorio. Forman parte del nivel agresivo de protección de metadatos.

- **Domain fronting / entrega por CDN:** el tráfico aparenta ir hacia una CDN genérica, lo que dificulta que la vigilancia a nivel de red identifique el uso de GreenGrass. Disponible para las organizaciones en el nivel agresivo de metadatos.
- **Acceso compatible con Tor:** se puede acceder a la plataforma a través de Tor para máximo anonimato. Es más lento y puede estar bloqueado en algunos países, pero está disponible para quien lo necesite.
- **El acceso estándar siempre funciona.** La plataforma opera con normalidad sobre HTTPS estándar. El domain fronting y Tor son opciones adicionales, no requisitos.
- **Va con el nivel agresivo:** estas funcionalidades están disponibles para las organizaciones que optan por la protección agresiva de metadatos, lo que mantiene coherente el modelo de seguridad: quien necesita resistir el análisis de tráfico probablemente también necesita el resto de las protecciones de ese nivel.

### Consideraciones de seguridad física

En algunos contextos, los dispositivos pueden ser incautados físicamente en retenes, protestas o allanamientos.

**Protecciones:**
- Mecanismo de bloqueo rápido (un botón de pánico que bloquea la aplicación de inmediato y exige volver a autenticarse)
- Retención de datos configurable en el dispositivo (opción de no guardar nada localmente)
- Modo de coacción (un passkey secundario que da entrada a una vista saneada o señuelo de la aplicación)

**DECIDIDO:** dentro del alcance, como parte del nivel agresivo de protección de metadatos.

- Un passkey secundario inicia sesión en una vista saneada de la aplicación: parece funcional, pero no contiene datos sensibles. Los datos reales quedan ocultos e inaccesibles.
- El inicio de sesión bajo coacción es indistinguible de uno normal para quien observa. Sin señales visuales, sin diferencias en la carga, sin detalles delatores en la interfaz.
- Un inicio de sesión bajo coacción dispara una alerta silenciosa a los contactos de confianza de la persona y al Administrador de la organización, para que la organización sepa que puede estar ocurriendo un episodio de coacción.
- **Disponible solo en el nivel agresivo.** Las organizaciones que operan en entornos políticos estables no necesitan esa complejidad. Las que están en entornos hostiles pueden activarlo.

<!-- REVISIT: La vista señuelo necesita un diseño cuidadoso: tiene que verse lo bastante realista para aguantar una inspección superficial. ¿Debería mostrar datos falsos plausibles, o el estado vacío de una "cuenta nueva"? Necesita aporte de diseño de UX. Además, el mecanismo de alerta silenciosa no puede ser detectable por monitoreo de red: la alerta misma no puede ser lo que delate la coacción. -->

---

## Modelo de seguridad y código abierto

La descripción del producto dice que GreenGrass es de código abierto "excepto donde razones de seguridad o técnicas hagan inviable ese enfoque".

**DECIDIDO:** abrir el código de la aplicación y mantener privadas las configuraciones de seguridad operativa.

**Código abierto:**
- Código de la aplicación (servidor, cliente, móvil)
- Modelos de datos y APIs
- Implementaciones de cifrado
- Aplicaciones cliente
- Lógica de autenticación y autorización

Que cualquiera pueda auditarlo genera confianza e invita a la revisión de seguridad. En una plataforma política, donde la confianza lo es todo, los usuarios y sus asesores técnicos tienen que poder verificar que el código es sólido.

**Código cerrado:**
- Configuraciones de monitoreo de seguridad y de detección de intrusiones
- Detalles de implementación de las medidas antivigilancia (donde revelar el método comprometa su eficacia)
- Aprovisionamiento de organizaciones y automatización de la infraestructura
- Manuales de operación y herramientas de respuesta a incidentes

El principio: la gente debe poder verificar *qué hace el software*. No necesita saber *qué trampas están puestas* para atrapar atacantes.

---

## Cumplimiento y regulación

Esta sección es un marcador de posición: depende mucho de los países objetivo y se desarrollará en una especificación de cumplimiento dedicada.

**Áreas clave a resolver por jurisdicción:**
- Leyes de protección de datos (equivalentes al GDPR)
- Requisitos de reporte de finanzas de campaña
- Regulación sobre el manejo de datos políticos
- Restricciones a la transferencia transfronteriza de datos
- Obligaciones de interceptación legal
- Restricciones al cifrado (algunos países limitan el cifrado fuerte)

<!-- REVISIT: Esto necesita una especificación de cumplimiento dedicada por país o región objetivo. -->

---

## Hoja de ruta de seguridad

La seguridad no se atornilla al final: se construye desde el principio. Pero no toda medida tiene que salir en la v1.

### Imprescindible para el MVP
- TLS 1.2+ con preferencia por 1.3, en todas partes
- Cifrado en reposo a nivel de almacenamiento
- Cifrado a nivel de aplicación para los campos de alta sensibilidad
- BYOK por defecto, llaves gestionadas como opción
- Autenticación con passkey, con métodos alternativos
- Aislamiento de organización única (nivel Estándar: por contenedor)
- Registro de auditoría completo
- Autorización del lado del servidor en cada petición
- Validación de entradas y prevención de inyecciones
- Gestión de secretos con llaves por organización
- Almacenamiento cifrado en el dispositivo para las funcionalidades sin conexión
- Revocación remota de sesión
- Plan de respuesta a incidentes con relación forense externa
- Política de divulgación responsable
- Detección de compromiso del dispositivo que advierte sin bloquear
- Lineamientos recomendados de seguridad del dispositivo

### Deseable para el piloto
- Niveles de aislamiento Reforzado y Máximo
- Residencia de datos por país (países objetivo iniciales)
- Cifrado de extremo a extremo en la mensajería, con custodia de llaves opcional
- Protección moderada de metadatos (nivel por defecto)
- Protección contra DDoS
- Escaneo automático de dependencias
- Programa de recompensas por vulnerabilidades
- Aplicación opcional de la atestación de dispositivos
- Warrant canary e informe de transparencia

### Futuro / nivel agresivo
- Nivel agresivo de protección de metadatos
- Resistencia al análisis de tráfico (domain fronting, acceso compatible con Tor)
- Modo de coacción (inicio de sesión señuelo)
- Opción de despliegue autoalojado
- Implementaciones de cumplimiento por país
