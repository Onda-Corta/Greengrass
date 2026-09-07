# Patrones de UX de seguridad

## Propósito

Este documento define los patrones de UX de las funcionalidades de seguridad de GreenGrass: el modo de coacción, la gestión de llaves BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado), el manejo de sesiones, el botón de pánico y los flujos de autenticación. Estas funcionalidades protegen a las personas usuarias en contextos políticamente sensibles, donde los datos equivocados en las manos equivocadas pueden ser peligrosos.

La restricción de diseño: la seguridad tiene que ser invisible en la operación normal e inequívoca ante una amenaza. Una voluntaria que hace trabajo de campo en una zona hostil no debería pensar nunca en el cifrado. Pero si necesita bloquear la app, el botón de pánico tiene que estar al alcance inmediato y ser inconfundible.

## Modo de coacción

### Qué es

El modo de coacción se activa cuando alguien inicia sesión con un passkey de coacción (un passkey aparte, dado de alta específicamente para esto). La plataforma muestra una versión saneada de la interfaz real: la navegación se ve idéntica, pero el contenido va depurado para quitar los datos políticamente sensibles.

**DECIDIDO (según navigation-model.md): Estructura real con datos saneados.** La vista de coacción presenta la navegación real con datos verosímiles pero depurados.

### Alta del passkey de coacción

Durante la configuración de seguridad, a quienes están en el nivel de seguridad agresivo se les propone dar de alta un passkey de coacción:

```
┌──────────────────────────────────────────────────────┐
│  Configurar el passkey de coacción                   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Un passkey de coacción te permite iniciar sesión    │
│  bajo coacción y ver una versión segura de la        │
│  plataforma.                                         │
│                                                      │
│  Cuando usas este passkey:                           │
│  • La plataforma se ve y funciona con normalidad     │
│  • Todos los datos sensibles quedan ocultos          │
│  • Tus datos reales no se ven afectados              │
│  • Se envía una alerta silenciosa al administrador   │
│    de tu organización                                │
│                                                      │
│  Importante: usa un dedo o un dispositivo distinto   │
│  para el passkey de coacción que para el normal.     │
│                                                      │
│  [Dar de alta el passkey de coacción]                │
│  [Omitir por ahora]                                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**El alta del passkey de coacción nunca es obligatoria** — se ofrece durante la configuración de seguridad y queda disponible en los ajustes personales de seguridad, pero es opcional.

### Reglas de saneamiento

Con el modo de coacción activo, cada área funcional muestra datos verosímiles pero seguros:

| Área funcional | Vista normal | Vista de coacción |
|-------------|-------------|-------------|
| **Contactos** | CRM completo con puntajes de apoyo y datos de identificación de votantes | 15-20 contactos inocuos. Sin puntajes de apoyo, sin datos de identificación de votantes. Nombres comunes, no identificables como activistas. |
| **Paneles** | Métricas reales | Cifras bajas y verosímiles. "47 contactos, 3 eventos, 12 voluntarios". Sin líneas de tendencia, sin termómetros de meta. |
| **Trabajo de campo** | Campañas activas, territorios, listas de recorrido | Ninguna campaña. Estado vacío: "Crea tu primera campaña". |
| **Recaudación de fondos** | Historial de donaciones, formularios, cumplimiento | Unas pocas donaciones pequeñas. Sin marcas de cumplimiento. Sin grandes donantes. |
| **Mensajes** | Conversaciones reales | 2-3 conversaciones inocuas. "Reunión de equipo mañana", "Gracias por la actualización". Sin contenido político. |
| **Eventos** | Lista completa de eventos con confirmaciones de asistencia | 1-2 eventos públicos pasados. Ningún evento próximo. |
| **Prensa** | Contactos de medios, comunicados, respaldos | Vacío. "Todavía no hay actividad de prensa". |
| **GOTV** | Operaciones del día de elecciones | Vacío. No está en modo de elecciones. |
| **Configuración** | Configuración completa | Ajustes reducidos. Sin indicadores de nivel de seguridad, sin gestión de llaves de cifrado. |
| **Registro de auditoría** | Bitácora completa de actividad | Limitado a la actividad de los datos saneados. |

**Principios clave:**
- **Verosímil, no vacío.** Una cuenta completamente vacía sería sospechosa. La vista de coacción muestra una cuenta pequeña, de poca actividad, pero con aspecto real.
- **Sin marcadores políticos.** Los nombres de contacto, los títulos de los eventos y el contenido de los mensajes no mencionan partidos, candidaturas ni temas de política pública.
- **Consistente entre sesiones.** Los datos de coacción son los mismos cada vez que se usa el passkey de coacción: no cambian entre inicios de sesión. (Si no, quien observa y fuerza dos inicios de sesión vería datos distintos y sabría que algo no cuadra).
- **Sin rastros.** La vista de coacción no deja ninguna señal de que la cuenta real tenga más datos. Sin indicadores de "elementos ocultos", sin contadores que no cuadren, sin metadatos filtrados.
- **Alerta silenciosa.** Cuando ocurre un inicio de sesión bajo coacción, se envía una notificación silenciosa al Administrador de la organización (a su correo, no a las notificaciones dentro de la app, por si el Administrador de la organización también está bajo coacción).

### Indicadores del modo de coacción

**Para quien está en modo de coacción:** NO hay ningún indicador de que el modo de coacción esté activo. El punto entero es que quien observa no pueda distinguir la vista de coacción de una sesión real. La persona usuaria sabe que usó su passkey de coacción — esa es la única señal.

**Para el Administrador de la organización:** la alerta silenciosa incluye la identidad de la persona, la hora, la información del dispositivo y la ubicación (si está disponible). A partir de ahí puede actuar como corresponda (avisar a los contactos de confianza, activar los protocolos de seguridad de la organización).

---

## Gestión de llaves BYOK

### Ceremonia de generación de llaves

El asistente de generación de llaves BYOK (WIZ-003) guía al Administrador de la organización para crear y proteger las llaves de cifrado de su organización. Es uno de los flujos de interfaz más críticos para la seguridad de toda la plataforma.

```
Paso 1: comprensión
┌─────────────────────────────────────────────────────────┐
│  BYOK: generación de llaves                 Paso 1 de 5 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Los datos de tu organización se cifrarán con una       │
│  llave que solo tú controlas.                           │
│                                                         │
│  Qué significa esto:                                    │
│  ✓ GreenGrass no puede leer tus datos                   │
│  ✓ Tus datos no se pueden entregar sin tu llave         │
│  ✓ Eres responsable de guardar una copia de seguridad   │
│                                                         │
│  ⚠ Si pierdes tu llave y tu copia de seguridad,         │
│    tus datos quedan inaccesibles para siempre.          │
│    GreenGrass no los puede recuperar.                   │
│                                                         │
│  [Entendido → Siguiente]                                │
│                                                         │
└─────────────────────────────────────────────────────────┘

Paso 2: generación de la llave
┌─────────────────────────────────────────────────────────┐
│  Generando tu llave de cifrado...                       │
│                                                         │
│  ████████████████████████  100%                         │
│                                                         │
│  ✓ Llave generada en tu dispositivo                     │
│  ✓ La llave nunca sale de tu dispositivo sin cifrar     │
│                                                         │
│  [Siguiente →]                                          │
└─────────────────────────────────────────────────────────┘

Paso 3: copia de seguridad
┌─────────────────────────────────────────────────────────┐
│  Haz una copia de seguridad de tu llave                 │
│                                                         │
│  Elige uno o más métodos de copia de seguridad:         │
│                                                         │
│  [Descargar el archivo de la llave]                     │
│  Guárdalo en un lugar seguro (USB, caja fuerte)         │
│                                                         │
│  [Imprimir la hoja de recuperación]                     │
│  Una hoja imprimible con tu frase de recuperación       │
│                                                         │
│  ⚠ Guarda la copia de seguridad separada de tu          │
│    dispositivo. Si el dispositivo se ve comprometido,   │
│    la copia debe estar en otro lugar.                   │
│                                                         │
│  [Siguiente →]                                          │
└─────────────────────────────────────────────────────────┘

Paso 4: verificación
┌─────────────────────────────────────────────────────────┐
│  Verifica tu copia de seguridad                         │
│                                                         │
│  Escribe la 5.ª y la 11.ª palabra de tu frase de        │
│  recuperación para confirmar que la guardaste bien:     │
│                                                         │
│  Palabra 5:  [________]                                 │
│  Palabra 11: [________]                                 │
│                                                         │
│  [Verificar →]                                          │
└─────────────────────────────────────────────────────────┘

Paso 5: listo
┌─────────────────────────────────────────────────────────┐
│  ✓ Tus llaves de cifrado están configuradas             │
│                                                         │
│  Los datos de tu organización ya están cifrados         │
│  con llaves que solo tú controlas.                      │
│                                                         │
│  Recordatorios importantes:                             │
│  • Mantén segura tu copia de seguridad                  │
│  • Considera rotar tus llaves periódicamente            │
│  • Si sospechas un compromiso, rota de inmediato        │
│                                                         │
│  [Ir al panel]                                          │
└─────────────────────────────────────────────────────────┘
```

### Rotación de llaves

La rotación de llaves está en Configuración > Seguridad > Gestión de llaves de cifrado:

```
┌────────────────────────────────────────────────────────┐
│  Gestión de llaves de cifrado                          │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Estado de la llave actual: activa                     │
│  Creada: 15 de enero de 2026                           │
│  Última rotación: nunca                                │
│                                                        │
│  Recomendación: rota las llaves después de un evento   │
│  de seguridad (salida de personal, sospecha de         │
│  compromiso, pérdida de un dispositivo)                │
│                                                        │
│  [Rotar la llave]                                      │
│                                                        │
│  La rotación vuelve a cifrar todos los datos con una   │
│  llave nueva. El proceso corre en segundo plano y      │
│  puede tardar varias horas con conjuntos de datos      │
│  grandes.                                              │
│                                                        │
│  Llaves anteriores: 0 llaves rotadas conservadas       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Disparadores de rotación de llaves** (sugeridos, no obligatorios):
- Alguien del personal deja la organización
- Dispositivo perdido o robado
- Sospecha de incidente de seguridad
- Rotación periódica (se recomienda anual)

La plataforma le sugiere al Administrador de la organización considerar la rotación después de eventos relevantes (por ejemplo, "María López salió del personal. Considera rotar tus llaves de cifrado"), pero nunca la impone.

---

## Botón de pánico

### Qué hace

El botón de pánico bloquea la app de inmediato y exige autenticarse otra vez. Es la parada de emergencia para las situaciones en las que hay que asegurar la app al instante.

### Ubicación

- **Modo de campo:** visible en la barra de acciones de campo, al pie de la pantalla. Con un icono de candado. Siempre a un toque de distancia.
- **App estándar:** no está siempre visible. Se llega con un atajo de teclado (`Cmd+Shift+L` en escritorio) o con un gesto rápido (por ejemplo, tocar tres veces el icono de la app en móvil).

### Comportamiento

```
Al tocar el botón de pánico:

1. La pantalla se pone en blanco de inmediato (blanca o negra, sin destello de contenido)
2. Se borran todos los datos en memoria
3. La app muestra la pantalla de inicio de sesión
4. No queda ninguna indicación de lo que se estaba viendo
5. Se envía una alerta silenciosa al Administrador de la organización (si está configurada)

Si la persona estaba en modo de campo:
- Los datos del turno se guardan localmente antes del bloqueo (no se pierde nada)
- Al autenticarse otra vez, el turno se retoma donde quedó
- Si se usa el passkey de coacción para volver a entrar: los datos del turno quedan ocultos
```

### Consideraciones de diseño

- **Sin diálogo de confirmación.** Un "¿Estás seguro?" arruina el propósito. El botón de pánico es para emergencias: actúa de inmediato.
- **Sin animación.** La pantalla se pone en blanco al instante. Sin desvanecido, sin transición. La velocidad es una funcionalidad de seguridad.
- **Silencioso.** Sin sonido, sin vibración. El bloqueo no debe llamar la atención.
- **Accesible pero no accidental.** En el modo de campo, el botón de bloqueo está donde no se dispara con toques accidentales (en una esquina de la pantalla, exige un toque deliberado). El gesto en móvil exige tres toques rápidos seguidos.

---

## Patrones de autenticación

### Flujo de inicio de sesión

El flujo principal de inicio de sesión usa passkeys:

```
┌────────────────────────────────────────┐
│                                        │
│  [Logo de GreenGrass]                  │
│                                        │
│  [Iniciar sesión con passkey]          │
│                                        │
│  ─────── o ───────                     │
│                                        │
│  [Iniciar sesión con enlace mágico]    │
│  [Iniciar sesión con código por SMS]   │
│                                        │
│  [Recuperar la cuenta →]               │
│                                        │
└────────────────────────────────────────┘
```

**Flujo con passkey:**
1. La persona toca "Iniciar sesión con passkey"
2. Aparece la solicitud biométrica del dispositivo (huella, rostro, PIN)
3. La autenticación se completa y entra a la app
4. Tiempo total: ~2 segundos

**Flujos de reserva** (para dispositivos sin soporte de passkey, o por preferencia):
- **Enlace mágico:** escribe su correo → recibe un enlace → lo toca → queda autenticada
- **OTP por SMS:** escribe su número de celular → recibe un código → lo escribe → queda autenticada

**No hay flujo con contraseña.** La plataforma no admite contraseñas. Es una decisión de seguridad deliberada: las contraseñas se pueden robar con phishing, los passkeys no.

### Gestión de sesiones

| Perfil | Duración de la sesión | Disparadores de reautenticación |
|---------|--------------|-----------------|
| Administrador de la organización | Corta (horas) | Acciones sensibles (gestión de llaves, cambios de rol, facturación) |
| Personal (todo) | Media (jornada laboral) | Acciones sensibles |
| Voluntario / Líder de equipo | Media (jornada laboral) / duración del turno (campo) | Al terminar el turno, al volver desde segundo plano (>30 min) |
| Candidato | Media (jornada laboral) | Estándar |
| Simpatizante | Larga (semanas) | Cambios de pago, actualización de datos personales |

### Reautenticación

Cuando una sesión exige autenticarse otra vez (por una acción sensible o porque expiró):

```
┌────────────────────────────────────────────────┐
│                                                │
│  Verifica tu identidad                         │
│                                                │
│  Esta acción requiere autenticarse otra vez.   │
│                                                │
│  [Verificar con passkey]                       │
│                                                │
│  [Usar otro método →]                          │
│                                                │
└────────────────────────────────────────────────┘
```

La reautenticación es una sola comprobación biométrica: debería tomar menos de 3 segundos. La persona se queda en la misma pantalla y puede seguir con su acción justo después de verificarse.

### Expiración de la sesión

Cuando una sesión expira:

```
┌────────────────────────────────────────────┐
│                                            │
│  Tu sesión expiró                          │
│                                            │
│  Por tu seguridad, cerramos tu sesión      │
│  tras un período de inactividad.           │
│                                            │
│  [Iniciar sesión]                          │
│                                            │
│  Los cambios sin guardar se conservaron.   │
│                                            │
└────────────────────────────────────────────┘
```

**Comportamientos:**
- **Conservación de los datos sin guardar.** Si estaba llenando un formulario, los datos se guardan localmente y se restauran al volver a iniciar sesión.
- **Redirección tras iniciar sesión.** Al autenticarse otra vez, vuelve exactamente a la pantalla en la que estaba.
- **Sin exposición de datos.** La pantalla de sesión expirada no muestra nada sobre lo que la persona estaba haciendo.

---

## Recuperación con contactos de confianza

### Configuración

Durante la incorporación (o en los ajustes personales de seguridad), se configuran contactos de confianza para recuperar la cuenta:

```
┌───────────────────────────────────────────────────────┐
│  Contactos de confianza                               │
├───────────────────────────────────────────────────────┤
│                                                       │
│  Si pierdes el acceso a tu cuenta, tus contactos      │
│  de confianza pueden ayudarte a recuperarla.          │
│                                                       │
│  Recomendamos 2-3 contactos de confianza que:         │
│  • Merezcan tu confianza para acceder a tu cuenta     │
│  • No sea probable que se vean comprometidos a la vez │
│  • Tengan su propia cuenta de GreenGrass              │
│                                                       │
│  Contactos de confianza:                              │
│  ┌───────────────────────────────────────────────┐    │
│  │  1. María López (Gerente de campaña)      [✗] │    │
│  │  2. Carlos Reyes (Director de campo)      [✗] │    │
│  └───────────────────────────────────────────────┘    │
│                                                       │
│  [+ Añadir contacto de confianza]                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Flujo de recuperación

Cuando alguien necesita recuperar su cuenta:

1. Toca "Recuperar la cuenta" en la pantalla de inicio de sesión
2. Escribe su correo o su celular para identificar su cuenta
3. El sistema avisa a sus contactos de confianza: "Ana necesita ayuda para recuperar su cuenta. Si confías en esta solicitud, apruébala en la app".
4. Los contactos de confianza reciben una notificación dentro de la app con las opciones de aprobar o denegar
5. Cuando aprueba el número requerido de contactos de confianza (configurable, 2 de 3 por defecto), la persona puede dar de alta un passkey nuevo
6. Queda autenticada con su passkey nuevo

**Consideraciones de seguridad:**
- Las notificaciones de recuperación incluyen la identidad de quien solicita y su ubicación aproximada (para que los contactos de confianza puedan verificar)
- Hay un período de espera (configurable, 24 horas por defecto) antes de que la recuperación se complete, para dar tiempo a detectar ingeniería social
- Los intentos fallidos de recuperación quedan registrados y visibles para el Administrador de la organización
- El passkey anterior se invalida cuando la recuperación se completa

---

## Autorización de dispositivos

### Gestión de varios dispositivos

Las personas usuarias gestionan sus dispositivos autorizados en los ajustes personales de seguridad:

```
┌──────────────────────────────────────────┐
│  Tus dispositivos                        │
├──────────────────────────────────────────┤
│                                          │
│  ● Este dispositivo                      │
│    iPhone 14 · Última actividad: ahora   │
│                                          │
│  ○ MacBook Pro                           │
│    Última actividad: hace 2 horas        │
│    [Quitar]                              │
│                                          │
│  ○ iPad Air                              │
│    Última actividad: hace 3 días         │
│    [Quitar]                              │
│                                          │
│  [+ Añadir dispositivo]                  │
│                                          │
└──────────────────────────────────────────┘
```

**Comportamientos:**
- **Quitar dispositivo** — revoca de inmediato el passkey de ese dispositivo. Si el dispositivo tiene la sesión abierta, la sesión se termina.
- **Añadir dispositivo** — genera un código QR o un enlace con tiempo limitado para dar de alta un passkey nuevo en otro dispositivo.
- **Nombre del dispositivo** — los dispositivos se nombran solos a partir de su user agent (se pueden renombrar a mano para mayor claridad).

---

## Indicadores de seguridad

### Estado del cifrado

Visible en los hilos de mensajes (según messaging.md):

```
│  🔒 Los mensajes están cifrados de extremo a extremo│
│  Solo tú y los miembros de esta conversación        │
│  pueden leerlos.                                    │
```

En las organizaciones con BYOK, hay un indicador adicional en la configuración:

```
│  🔑 Tus datos están cifrados con las llaves de tu      │
│     organización. GreenGrass no puede acceder a ellos. │
```

### Indicador de seguridad de la sesión

En los ajustes personales de seguridad, un resumen de la seguridad de la sesión actual:

```
┌─────────────────────────────────────────────────────────┐
│  Seguridad de la sesión                                 │
├─────────────────────────────────────────────────────────┤
│  ✓ Autenticación con passkey (biométrica)               │
│  ✓ Conexión cifrada (TLS 1.3)                           │
│  ✓ Datos cifrados en reposo (BYOK)                      │
│  ✓ 2 contactos de confianza configurados                │
│  ○ Passkey de coacción sin configurar  [Configurar →]   │
└─────────────────────────────────────────────────────────┘
```

Es informativo: en la operación normal no hay que hacer nada con esto. Está disponible para quien quiera verificar su postura de seguridad.

---

## Preguntas abiertas

1. **Pruebas de verosimilitud del modo de coacción.** ¿Cómo validamos que la vista de coacción resulta convincente? Pruebas con personas que no conocen la funcionalidad de coacción: ¿pueden distinguir entre una cuenta real de poca actividad y una cuenta de coacción?

2. **Opción de custodia de llaves.** Para las organizaciones en el nivel Estándar que no quieren la responsabilidad de BYOK, ¿debería existir una opción de llaves gestionadas en la que GreenGrass las custodie? Eso significaría que GreenGrass *sí* puede leer sus datos, pero algunas organizaciones pueden preferir la comodidad a la soberanía.

3. **Bloqueo biométrico en las pantallas sensibles.** Además de la reautenticación a nivel de sesión, ¿ciertas pantallas (configuración de cifrado, registro de auditoría, cumplimiento) deberían exigir una comprobación biométrica cada vez que se abren? Añade fricción, pero aumenta la seguridad en los dispositivos compartidos.

4. **Incorporación en seguridad para voluntarios.** Los voluntarios en contextos de alto riesgo tienen que entender el botón de pánico y las funcionalidades de coacción sin abrumarse. ¿Cuánta incorporación en seguridad es razonable para alguien cuya tarea principal es tocar puertas?

<!-- REVISIT: La estrategia de generación de los datos de coacción (cómo se crean y se mantienen los datos saneados) necesita una especificación detallada durante la implementación. ¿Datos estáticos? ¿Generados por procedimiento? ¿Mantenidos a mano por el Administrador de la organización? Cada opción tiene compensaciones distintas en verosimilitud y en carga de mantenimiento. -->
