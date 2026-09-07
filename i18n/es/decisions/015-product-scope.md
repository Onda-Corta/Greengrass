# ADR-015: Límites del alcance del producto

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/workflows.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/messaging.md`, `spec/press.md`

## Contexto

A medida que avanzó la definición del producto, varias áreas de capacidad exigieron decidir su alcance de forma explícita: ¿esto va en la plataforma, se aplaza o queda fuera del alcance para siempre? Estas decisiones definen el límite del producto y evitan la expansión descontrolada del alcance sin dejar fuera capacidades críticas. Cada decisión se tomó según el mercado objetivo (campañas de base del Sur Global), los recursos de ingeniería disponibles y si la capacidad es central para la misión de la plataforma o tangencial.

## Decisión

### Dentro del alcance: operaciones de GOTV (especificación aparte)

Las operaciones del día de elecciones / GOTV (Get Out The Vote — movilización del voto) son una capacidad de pleno derecho de la plataforma, con su propia especificación detallada. El GOTV incluye: construcción automatizada del universo, seguimiento del voto adelantado y del voto ausente, puerta a puerta con listas de recorrido dinámicas, llamadas de seguimiento, transporte a las urnas, observación electoral con reporte de problemas, seguimiento de la participación electoral en tiempo real, reasignación dinámica de recursos, coordinación del centro de mando y análisis poselectoral.

**Fundamento:** El día de elecciones es el día operativamente más intenso de cualquier campaña: el momento en que converge todo el resto del trabajo. Una plataforma para campañas políticas de base que no aguanta el día de elecciones está incompleta.

### Dentro del alcance: mensajería interna con cifrado E2E (especificación aparte)

Mensajería interna (entre miembros del personal, entre el candidato y el personal, coordinación del centro de mando) con cifrado E2E por defecto, hilos opcionales, difusiones, mensajes contextuales adjuntos a objetos de la plataforma y comunicación entre las organizaciones de una alianza.

**Fundamento:** Las campañas generan comunicaciones estratégicas sensibles que hay que proteger de la vigilancia. Obligarlas a usar herramientas externas (Signal, WhatsApp) para su comunicación interna fragmenta el flujo de trabajo y hace perder la posibilidad de adjuntar los mensajes al contexto operativo (votantes, eventos, turnos).

### Dentro del alcance: gestión de prensa y medios (especificación aparte)

Manejo de contactos de prensa, listas de medios, distribución de comunicados de prensa, creación de avisos a medios, distribución de declaraciones, seguimiento de la cobertura mediática, gestión del flujo de respaldos, gestión de voceros, biblioteca de puntos de mensaje, programación y analítica de redes sociales, y alojamiento del perfil público.

**Fundamento:** Los medios ganados —la cobertura que no se paga— hacen un trabajo que una campaña con pocos recursos no puede pagar. Que las operaciones de prensa funcionen para campañas sin secretario de prensa dedicado vale lo que cuesta construirlas.

### Fuera del alcance: gamificación del voluntariado

Nada de tablas de posiciones, insignias, sistemas de logros ni incentivos por puntos para los voluntarios.

**Fundamento:** Hay mejores maneras de lograr que los voluntarios vuelvan que la gamificación barata. Las tablas de posiciones pueden crear incentivos perversos (velocidad antes que calidad en el trabajo de campo), las insignias trivializan un trabajo importante y los sistemas de logros distraen de la misión de verdad. En las campañas políticas, la motivación del voluntariado viene de la causa, no de las mecánicas de juego. La plataforma registra la actividad de los voluntarios para reconocerla (horas, turnos completados, contactos hechos), pero no la gamifica.

### Aplazado: donaciones en criptomonedas

No se soportan ni en el alfa ni en los pilotos. Si una organización acepta cripto por su propio procesador externo, la plataforma puede registrarlo como una donación manual o externa. Ni se impide activamente ni se soporta activamente.

**Fundamento:** No hay claridad regulatoria sobre las donaciones en criptomonedas a campañas políticas en la mayoría de las jurisdicciones objetivo. Construir soporte ahora sería construir marcos de cumplimiento contra reglas que no están definidas. Reevaluar cuando aparezca claridad regulatoria en alguna jurisdicción objetivo.

### Aplazado: donaciones pareadas por empleadores

No se soportan ni en el alfa ni en los pilotos.

**Fundamento:** Las donaciones pareadas por empleadores son sobre todo una funcionalidad estadounidense y corporativa, poco relevante para la mayoría de las jurisdicciones del Sur Global. Construir esa infraestructura antes de que el mercado estadounidense sea una parte significativa de la base de usuarios sería invertir demasiado pronto. Reevaluar cuando la plataforma madure y el mercado estadounidense crezca.

### Aplazado: recaudación de fondos entre pares

Todas las páginas de recaudación las controla la campaña. Las páginas de recaudación creadas por simpatizantes y vinculadas a una campaña quedan aplazadas.

**Fundamento:** La recaudación entre pares añade complejidad de cumplimiento (¿quién responde por el contenido de una página creada por un simpatizante?) y carga de moderación. El modelo de datos ya la contempla (páginas creadas por simpatizantes con seguimiento de atribución), así que se puede añadir después sin dolores de migración.

### Aplazado: monitoreo automatizado de medios

El seguimiento de la cobertura mediática es solo registro manual. El monitoreo automatizado de medios (rastrear publicaciones en busca de menciones) queda aplazado como oportunidad estratégica.

**Fundamento:** Los servicios de monitoreo de medios existentes (Meltwater, Cision) son caros, están centrados en Occidente y cubren mal los medios regionales y locales del Sur Global. Una capacidad de monitoreo de medios propia de GreenGrass, que cubra los medios en lengua local de los países objetivo, podría ser un gran diferenciador, pero merece una inversión seria como iniciativa de producto dedicada, no una integración añadida.

## Consecuencias

**Beneficios:**
- Unos límites de alcance claros evitan la proliferación descontrolada de funcionalidades en una fase de desarrollo ya de por sí ambiciosa
- Las decisiones de lo que queda dentro del alcance aseguran que la plataforma cubra el ciclo de vida completo de la campaña (incluidos los momentos de más riesgo, como el día de elecciones)
- Lo aplazado tiene criterios de reevaluación claros; no es una exclusión permanente
- Dejar la gamificación fuera del alcance es una posición de principio que define el carácter de la plataforma

**Costos:**
- No soportar donaciones en cripto puede dejar fuera a algunos donantes potenciales en jurisdicciones donde se están volviendo comunes
- El monitoreo manual de medios genera trabajo para el equipo de prensa que se podría automatizar
- Sin recaudación entre pares, las campañas no pueden pedirles a sus simpatizantes que recauden dinero en sus propias redes

**Restricciones:**
- De lo aplazado hay que considerar desde ahora sus implicaciones en el modelo de datos, para evitar dolores de migración cuando por fin se construya
- Los criterios de «reevaluar cuando…» de lo aplazado tienen que quedar anotados y revisarse periódicamente

**ADR relacionados:** [ADR-006](006-field-operations-gotv.md) (detalles del GOTV dentro del alcance), [ADR-007](007-fundraising-payments.md) (alcance de la recaudación, cripto y donaciones pareadas aplazadas), [ADR-008](008-communications-messaging.md) (detalles de la mensajería interna dentro del alcance)
