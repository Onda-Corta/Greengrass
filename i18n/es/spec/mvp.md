# MVP de GreenGrass — plan de producto

**El fideicomiso de datos de la coalición: probar si organizaciones políticas soberanas van a juntar sus datos bajo las reglas correctas**

Par piloto: MVC y PIP (Puerto Rico)
Redactado: 2026-08-19

---

## 1. Contexto

GreenGrass tiene una especificación completa —12 documentos de especificación, 37 documentos de UX, 236 pantallas en wireframe, 16 ADR— y nada de código. La plataforma completa es un sistema operativo de campaña que le pide a un partido político migrar todo lo que hace a una herramienta nueva.

Debajo de ese plan hay un solo supuesto estructural que nunca se ha puesto a prueba:

> **Las organizaciones políticas soberanas van a juntar sus datos entre sí si las reglas son las correctas.**

De él dependen todas las funcionalidades de alianza de la especificación. La capa de federación, los contratos de intercambio por recurso, la deduplicación entre organizaciones, las campañas conjuntas, el reparto de la recaudación por consentimiento unánime, la rotación de llaves de la alianza — todo eso presume que partidos que cuidan sus listas como su activo institucional central las van a entregar a un arreglo compartido si la gobernanza es lo bastante buena.

Si ese supuesto es falso, más o menos un tercio del producto especificado es peso muerto y GreenGrass es un CRM de campaña de organización única compitiendo por funcionalidades con NationBuilder, NGP VAN y Action Network. Ese es un negocio mucho peor.

Todo lo demás en los 16 ADR es un problema normal de ingeniería. Este no. **Hay que probarlo primero, barato, antes de la construcción cara.**

Este plan define el producto más pequeño capaz de probarlo, y especifica cómo se corre la prueba y qué la refutaría.

---

## 2. El producto, en una frase

Dos o más partidos en una campaña conjunta suben cada uno los datos de contacto que ya tienen. La plataforma les dice a quién conocen entre todos y dónde se solapan — sin que ningún miembro vea los registros no solapados de otro, y sin que nadie se vuelva dueño del resultado fusionado.

Sin migración. Sin app de campo. Sin modo sin conexión. Los partidos siguen organizando exactamente como hoy y entregan exportaciones al ritmo al que realmente trabajan.

### La primitiva de coordinación central: la supresión mutua

El piloto lanza exactamente una funcionalidad operativa, y es angosta a propósito.

Cada partido manda sus propios mensajes, bajo su propio consentimiento, desde sus propias herramientas. Antes de enviar, le pregunta a la capa compartida: *¿algún otro miembro contactó a estas personas en los últimos N días?* La respuesta vuelve como una marca de sí/no por registro.

Es la primitiva correcta por cuatro razones:

1. **Es el mínimo que entrega valor real.** No mandarle dos veces el mismo mensaje a un simpatizante compartido es el dolor concreto e inmediato del trabajo en coalición.
2. **Es lo que la arquitectura de índice ciego te da gratis.** Sin maquinaria adicional de divulgación.
3. **Es más limpio legalmente que el envío conjunto.** Los contactos de cada partido dieron su consentimiento a *ese partido*, no a una entidad de coalición. Supresión significa que ningún dato de contacto sale de ninguno de los dos partidos y que no se manda ningún mensaje bajo consentimiento ambiguo — lo único que vuelve es una señal de «a este sáltatelo». Ver §9.6.
4. **Es direccional y revocable.** Nunca se revela nada sobre los registros no solapados, en ninguna dirección.

La cobertura por geografía y la coordinación de «no vuelvas a tocar esta puerta» son objetivos secundarios, sujetos a datos de dirección que puede que ninguno de los dos partidos tenga (§4.3).

**La supresión mutua es además el primer servicio central de la plataforma.** Según la [ADR-019](../decisions/019-central-services-and-metered-billing.md), es la primera entrada del catálogo de servicios: una verificación que cada miembro activa para sí, que corre para el miembro que pregunta y para nadie más, y que no guarda nada entre llamadas. En el producto completo está en la ruta de envío de todos los canales, después de los topes de frecuencia y la ventana de silencio del propio miembro, así que se consulta antes de cada envío en vez de correrse como un paso aparte ([system.md § Motor de orquestación entre canales](../design/architecture/system.md#motor-de-orquestación-entre-canales)). Nada de esto cambia el piloto. Los miembros siguen enviando desde sus propias herramientas, y la marca sigue siendo lo único que cruza. Una cosa queda explícita: el libro compartido contra el que opera la Fase 3 no es una copia común guardada en ningún lado. Es el registro que cada miembro lleva de a quién contactó, consultado en cada llamada, porque un servicio central no conserva nada. En el piloto ese registro se alimenta de lo que sube cada miembro; en el producto completo lo escribe el enrutador de canales. Lo que gana este replanteamiento es continuidad: la verificación que construye el piloto es la que lanza la plataforma.

---

## 3. Los partidos

### MVC — Movimiento Victoria Ciudadana

- Fundado en 2019. Más nuevo, y organizativamente más joven.
- **Usa NationBuilder.** Eso es un regalo: la exportación de personas en CSV de NationBuilder tiene nombres de campo estables y documentados — `nationbuilder_id`, `first_name`, `last_name`, `email`, `phone_number`, `mobile_number`, `primary_address1`, `city`, `state`, `zip`, `tags`, `support_level`, `is_volunteer`, `do_not_contact`, `email_opt_in`, `mobile_opt_in`.
- Las marcas de consentimiento viajan con la exportación, y eso importa — el consentimiento a nivel de persona prevalece sobre la configuración de intercambio a nivel de organización ([users.md § Intercambio entre organizaciones dentro de alianzas](users.md#intercambio-entre-organizaciones-dentro-de-una-alianza)).
- **`support_level` y `tags` son justamente los campos que nunca deben entrar en la vista compartida.** La evaluación que el MVC hace de un votante es su activo más sensible. El primer trabajo del contrato de intercambio es hacer que excluirlos sea obvio y venga por defecto.

### PIP — Partido Independentista Puertorriqueño

- Fundado en 1946. Mucho más viejo, con una estructura profunda de comités municipales en los 78 *municipios* de la isla.
- **Herramientas desconocidas.** Esto es una tarea de descubrimiento, no un supuesto que se pueda tapar. Estados plausibles, más o menos en orden de probabilidad: Excel y Google Sheets fragmentados que mantienen voluntarios; una base de datos local heredada; listas de comités municipales repartidas en pedazos entre distintas personas; registros casi en papel.
- Cuenta con fragmentos heterogéneos, formatos inconsistentes y varios custodios que tienen que decir que sí cada uno por su lado.

### La asimetría es el hecho más importante de este plan

El MVC llega con datos limpios y estructurados desde una herramienta moderna. El PIP probablemente llegue con fragmentos. Esa asimetría trae tres consecuencias, y cada una necesita una respuesta diseñada:

| Consecuencia | Respuesta |
|---|---|
| Las tasas de coincidencia van a caer por la calidad de los datos del lado del PIP, no del lado del MVC | Presupuesta apoyo práctico de limpieza y preparación de datos para el PIP (§7). No se puede permitir que la fricción con las herramientas se disfrace de falta de voluntad — esa es, de lejos, la forma más probable de que este piloto produzca un falso negativo. |
| El PIP va a vivir el producto como más trabajo que el MVC | Adelanta el esfuerzo del PIP a las Fases 0 y 1, donde una persona hace el trabajo por ellos. |
| La vista compartida puede quedar dominada por lo que aporta el MVC, y hacer que el PIP parezca que se aprovecha sin aportar aunque no sea así | **El libro de contribuciones puede ser un pasivo cuando los participantes son desiguales.** Ver el Apéndice, H8. |

### Punto de partida

En lo operativo, los dos partidos parten de cero: no hay infraestructura de datos compartida, no hay listas juntadas, no hay nada que heredar. El piloto se construye sobre una hoja en blanco.

**Los ciclos anteriores quedan fuera de alcance.** Los arreglos pasados entre estos partidos no son objeto de investigación de este proyecto y no se sacan a relucir — ni en entrevistas, ni en materiales, ni en el encuadre del piloto. Todo el descubrimiento es prospectivo: qué haría falta para juntar datos de aquí en adelante (§6.4).

Una consecuencia de planificación que vale anotar internamente: como no hay una relación heredada de intercambio de datos, no hay que diseñar alrededor de un factor de confusión por cooperación previa. MVC/PIP es una prueba limpia del supuesto.

---

## 4. Alcance

### 4.1 Qué se construye

Unas 12 pantallas. Esta construcción sirve al experimento, no al mercado — es a propósito más delgada de lo que sería una v1 general del producto de coalición.

| Área | Pantallas | Reutilización |
|---|---|---|
| Autenticación | Inicio de sesión con passkey + alternativas | AUTH-001–007 tal como están dibujadas |
| Puesta en marcha | Configuración de la organización (recortada), ceremonia BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) | WIZ-001, WIZ-003 |
| Importación | Carga → mapeo de columnas → vista previa → confirmación; historial de importaciones | CRM-008–012 |
| Contrato de intercambio | A nivel de campo, denegación por defecto, por miembro | ALLY-005, la pieza central |
| Miembros | Lista de miembros, solicitud de afiliación + aprobación | ALLY-002–004 |
| Universo compartido | Resumen de solapamiento, lista de supresión, exportación | Nuevo |
| Auditoría | Registro de auditoría multilateral, visible para todos los miembros | SET-018, extendido |
| Libro de contribuciones | Qué puso y qué sacó cada miembro | Nuevo — y bajo prueba, ver H8 |

Genuinamente nuevo y sin wireframe: el flujo de consulta y respuesta de supresión, el libro de contribuciones y el flujo de salida y disolución.

### 4.2 Qué se recorta

Toda la recaudación de fondos (20 pantallas), comunicaciones, eventos, prensa, activismo, redes sociales, la centro de mando de GOTV (Get Out The Vote — movilización del voto) (21), el modo de campo y las operaciones de campo (29 pantallas, y de lejos la ingeniería más difícil — SQLite sin conexión, sincronización, resolución de conflictos, teselas de mapa), el portal de simpatizantes, la mensajería, la ayuda y la capacitación, casi todos los paneles, casi todos los ajustes.

Solo Puerto Rico. Español e inglés. La corrección de RTL se mantiene en el CSS según el ADR-010, pero no se lanza el árabe.

### 4.3 La bifurcación según la forma de los datos de entrada

El piso esperado de ambos partidos es un CSV de correos y teléfonos. Planifica para las dos ramas, porque producen productos distintos:

**Rama A — solo identificadores (correo + teléfono).** El cruce se vuelve *más fácil*: coincidencia exacta sobre identificadores normalizados, sin ningún problema de nombres aproximados. Pero la cobertura por geografía es imposible, y el producto se reduce a detección de solapamiento más supresión mutua. **Aun así, esto es el piloto entero** — prueba el supuesto por completo. Construye para esta rama.

**Rama B — identificadores más dirección y geografía.** Habilita mapas de cobertura, análisis de brechas y coordinación de territorios. Trátala como objetivo secundario. Requiere geocodificación al menos a nivel de *municipio*; a nivel de precinto sería mejor, pero es poco probable que los datos den para eso.

No dejes que el atractivo de la Rama B retrase la Rama A. El supuesto bajo prueba no necesita un mapa.

### 4.4 Lo que se conserva aunque parezca recortable

- **BYOK desde el día uno** (ADR-002). No puedes meterle cifrado a un fideicomiso de datos después de que los miembros ya subieron sus archivos, y «la plataforma misma no puede leer tu lista» es la mayor parte de por qué un socio desconfiado dice que sí.
- **El registro de auditoría inmutable desde el día uno** (ADR-004). Es el producto, no la plomería.
- Se conserva el event sourcing (el estado se deriva de un registro inmutable de eventos) para procedencia y auditoría, porque de todos modos es la forma correcta para eso. El cliente sin conexión no se construye en absoluto — al ser solo ingesta no hay dispositivo de campo, así que la justificación de sincronización del ADR-005 queda dormida.
- **Un esquema general de contrato de intercambio, aunque el piloto solo necesite el caso de la alianza** (ADR-017). El contrato del §4.1 es la primitiva de confianza de la plataforma en cada frontera —alianza, partido, candidatura, campaña y compartimento—, no una funcionalidad de alianza. La Fase 2 es donde esa forma se decide en la práctica. Mantén la referencia a la parte como polimórfica y los términos generales; mantén la interfaz exactamente tan angosta como especifica este plan. Esquema general, interfaz angosta. El mismo argumento que con BYOK arriba: no puedes meterle generalidad a un contrato después de lanzarlo como funcionalidad de alianza.

---

## 5. El supuesto, descompuesto

«Van a juntar sus datos bajo las reglas correctas» es demasiado grueso para probarlo. Se descompone en siete afirmaciones falsables, ordenadas de modo que las baratas condicionen a las caras.

| # | Afirmación | Se mide con | Umbral de aprobación |
|---|---|---|---|
| **A1** | Suben algo — en la práctica, no en principio | Archivo recibido | Ambos partidos entregan dentro de los 30 días de firmado el acuerdo |
| **A2** | Suben algo real, no una muestra simbólica | Cantidad de filas contra el tamaño declarado de la lista | Cada archivo ≥50% del total declarado |
| **A3** | Los datos coinciden a una tasa útil | Coincidencia determinista sobre correo y teléfono normalizados | Solapamiento en la banda de 5–60% |
| **A4** | Ver el solapamiento no los espanta | Retiro o endurecimiento del contrato después del informe | Ninguno se retira dentro de las 2 semanas |
| **A5** | Actúan sobre la vista compartida | Decisiones operativas documentadas que cambiaron | ≥1 por partido, con evidencia |
| **A6** | Lo vuelven a hacer | Cargas repetidas voluntarias | ≥2 por partido después de la primera |
| **A7** | **Las reglas son lo que lo hizo posible** | Entrevistas ciegas por separado, antes y después | Los dos dicen que *no* le habrían mandado el archivo directamente al otro partido |

**A7 es la tesis.** A1–A6 pueden pasar todas mientras A7 falla, y si A7 falla el producto es una utilidad de deduplicación y no infraestructura de confianza. Esa es otra empresa, más chica — no necesariamente fatal, pero hay que saberlo antes de financiar la construcción completa.

Sobre la banda de A3: por debajo de 5%, la deduplicación no justifica el costo de integración. Por encima de 60%, los dos partidos tienen en la práctica una sola lista, y el problema de coordinación es otro distinto del especificado. Los dos resultados son informativos; ninguno es aprobación.

---

## 6. Instrumentación

### 6.1 Señales de conducta — la confianza se mide por lo que hacen, no por lo que dicen en una encuesta

En las entrevistas la gente exagera su disposición a compartir. Registra la conducta en su lugar:

- **Tiempo desde el acuerdo hasta la carga.** La vacilación es dato.
- **Qué se guardan.** Campos excluidos del contrato de intercambio. Columnas eliminadas antes de subir el archivo — en el caso del MVC eso se mide directamente comparando el esquema del archivo entregado contra el esquema de exportación por defecto de NationBuilder. Las eliminaciones son visibles y significan algo.
- **Cantidad de filas contra el tamaño declarado de la lista.**
- **Si alguien abre alguna vez el registro de auditoría.** Si nadie lo lee, la maquinaria de confianza puede ser decorativa — confiaron en la contraparte, no en el sistema. Se sondea directamente en A7.
- **Si el contrato de intercambio cambia después de que llegan los resultados.** Aflojarlo indica confianza ganada. Apretarlo indica un susto, y ese susto hay que perseguirlo en la entrevista.
- **Quién obtiene acceso.** ¿Una persona por organización, o un equipo? Delegar el acceso es una conducta de confianza.

### 6.2 Entrevistas

Estructuradas, **por separado, nunca en conjunto.** En una sesión conjunta ninguno de los dos partidos va a decir lo incómodo. Tres momentos: antes de que se mueva ningún archivo, después del informe de solapamiento y después de que cierre la ventana del piloto.

### 6.3 El contrafactual, registrado antes de la exposición

Pregúntales a los dos, en la Fase 0, antes de que hayan visto nada: *«Si GreenGrass no existiera, ¿cómo coordinarías listas con un socio de coalición?»* Registra la respuesta textual. Este es el control de A7 y no sirve de nada si se recoge después de que ya usaron el producto.

### 6.4 La entrevista de preparación — solo prospectiva

Antes de construir nada, entrevista a los dos partidos por separado sobre qué haría falta para juntar datos **de aquí en adelante**. No preguntes nada sobre ciclos pasados (§3).

El encuadre hacia adelante no es solo diplomático, es mejor investigación. «¿Qué haría falta?» consigue una respuesta que se puede diseñar; «¿por qué no lo hicieron?» consigue una defensa.

Seis preguntas, cada una apuntando a una clase distinta de obstáculo:

| Pregunta | Qué saca a la luz |
|---|---|
| ¿Qué tendría que ser cierto para que pusieras tu lista de contactos en un arreglo compartido con un socio de coalición? | La forma general de la objeción |
| ¿Quién tendría que aprobar eso? | **Autorización** — cuántos sí hacen falta, y a qué nivel |
| Si lo decidieras hoy, ¿qué te frenaría la semana que viene? | **Capacidad** — los obstáculos prácticos y poco glamorosos |
| ¿Sabes si los consentimientos de tus simpatizantes cubrirían el contacto por parte de la coalición? | **Legal** (§9.6) — y si siquiera lo han pensado |
| ¿Cuánto te tomaría producir una exportación limpia? | **Calidad de datos** — y calibra cuánto apoyo necesita el lado del PIP (§3) |
| ¿Qué no incluirías bajo ninguna regla, jamás? | **Los requisitos reales del contrato de intercambio** |

Esa última pregunta es lo más directamente útil de este plan para la construcción. Define la lista de campos de denegación por defecto de ALLY-005 con las palabras de los propios partidos y no con nuestras suposiciones.

**Por qué esto importa más allá de levantar requisitos:** varios de estos obstáculos no son «confianza» en el sentido que supone la especificación. La capa de federación, los contratos de intercambio por recurso y la gobernanza por consentimiento unánime están todos diseñados contra un modelo de *sospecha*. Si la restricción real es la capacidad, la legalidad o la autorización, toda esa maquinaria elaborada de consentimiento resuelve un problema que estos partidos no tienen. Ver §9.2.

**Hazla antes de que cierre la Fase 0.** Puede reordenar todo lo que viene después.

### 6.5 El par de contraste

Un segundo par sin historia de coalición — solo conversación, sin construir nada. Uno que diga «de ninguna manera, bajo ninguna regla» acota el mercado; uno que diga «bajo esas reglas, quizás» es evidencia fuerte a favor de la tesis. Dos reuniones, mucha información por hora.

---

## 7. Fases

Ancladas al calendario electoral de Puerto Rico. La próxima elección general es en noviembre de 2028, con primarias alrededor de mediados de 2028.

### El problema de calendario: puede que no haya ninguna campaña conjunta en curso

El MVP se define como organizar datos *en el contexto de una campaña conjunta*. Como no hay ninguna coalición operando ahora mismo, **puede que no haya a qué engancharle el piloto durante 2026–2027.** Eso rompe A5 — si no hay ninguna operación compartida en marcha, no hay decisión que la vista compartida pueda cambiar, y A5 es el punto de decisión que separa el intercambio real del teatro.

Tres opciones, en orden de preferencia:

1. **Apuntar a la ventana de formación de coalición de 2028 (recomendado).** Si se negocia una coalición para 2028, esa negociación pasa a lo largo de 2027 — antes de las primarias, antes de la campaña propiamente dicha. Ese es el punto dulce: los partidos están decidiendo activamente qué compartir, la motivación es alta y el riesgo electoral es bajo porque todavía no se están persiguiendo votos. El producto aparece justo cuando la pregunta está viva.
2. **Engancharlo a una actividad conjunta no electoral.** Un empujón de incidencia compartido, una recaudación conjunta, una jornada de inscripción de votantes. Hay menos en juego, pero es una operación real, y con eso alcanza para A5.
3. **Correrlo como un simulacro explícito.** Encuadrado como construcción de infraestructura de cara a 2028. Lo más barato, pero con el riesgo más alto de que la cosa se disperse y de que A5 quede sin probar — nadie cambia una decisión porque no hay decisión que cambiar.

No corras el primer piloto durante la campaña de 2028 misma. Convertirse en una variable del resultado de una elección en curso es a la vez un problema ético y una garantía de datos ininterpretables.

| Fase | Ventana | Qué pasa | Puntos de control |
|---|---|---|---|
| **0 — Consentimiento y encuadre** | sep.–oct. 2026 | Ambos firman el acuerdo de participación y el DPA (acuerdo de tratamiento de datos). Se registran las entrevistas de preparación y de contrafactual. Descubrimiento de las herramientas del PIP. Revisión legal del consentimiento entre partidos (§9.6). | — |
| **1 — Mago de Oz manual** | nov. 2026 – ene. 2027 | Los dos partidos mandan un archivo. El cruce se corre **a mano**, sin conexión, en una máquina aislada de la red. Se devuelve el informe. | **A1, A2, A3, A4** |
| **2 — Construcción** | feb. – jun. 2027 | Las ~12 pantallas. Solo si se superan los puntos de control de la Fase 1. | — |
| **3 — Piloto en vivo** | jul. 2027 – ene. 2028 | Sincronizado con la ventana de formación de coalición. Rebanada acotada — un distrito senatorial o unos pocos municipios, no la isla entera. Los dos partidos operan la supresión mutua contra el libro compartido. | **A5, A6, A7** |
| **4 — Prueba de retiro** | feb. 2028 | Ejercicio programado y consentido de revocación y salida por parte de uno de los partidos. | Integridad de la salida |
| **Punto de decisión** | mar. 2028 | Financiar la construcción completa, reposicionar o parar. | — |

### Sobre la Fase 1 — y su limitación honesta

La primera prueba de A1–A4 no necesita producto alguno. Dos semanas de Python en lugar de cuatro meses de ingeniería.

Pero hay una trampa que hay que decirles de frente a los dos partidos: **en la versión manual, nosotros vemos los dos archivos.** La afirmación central del producto es que nadie —ni siquiera la plataforma— ve los datos del otro lado. La prueba manual, entonces, valida *la disposición a juntar datos a través de un intermediario humano de confianza*, que es una afirmación más débil que la que hace el producto.

Es aceptable, porque es un **punto de decisión necesario pero no suficiente**: si no juntan datos ni siquiera con un intermediario de confianza, con software menos todavía. La Fase 1 prueba el piso. Si no pasan el piso, para antes de gastar el presupuesto de construcción.

### Sobre la Fase 4 — la prueba que nadie hace

Ejercer la salida a propósito, en una fecha programada, con todo el mundo tranquilo, es la hora más informativa del plan. Si la revocación es ambigua o la exportación queda incompleta, te enteras ahora y no durante una disputa real, cuando la relación ya se está rompiendo. Ofrecer la prueba es, en sí misma, una señal de confianza.

### Equipo y costo

- Fase 1: una persona, ~3 semanas. Prácticamente gratis.
- Fase 2: 2 personas de ingeniería + 1 de diseño, ~4 meses.
- Fase 3: 1 persona de ingeniería + **1 persona dedicada al soporte de los socios.** Ese rol de soporte no es opcional — es el control contra los falsos negativos que produce la fricción de datos del lado del PIP (§3).

---

## 8. Qué cuesta lo «igualitario» en la arquitectura

La gobernanza es de N partes con consentimiento unánime. Aquí es donde la especificación existente tiene que doblarse.

- **Sin organización líder.** El ADR-016 §80 le da el registro de la campaña conjunta a una organización líder; la unanimidad rompe eso. Hace falta un rol de **Custodio de la alianza** ejercido de forma simétrica, un asiento por miembro — lo que obliga a que la pregunta abierta de [alliance.md § Preguntas abiertas](../design/ux/04-wireframes/alliance/alliance.md#open-questions) se resuelva como *sí, un rol dedicado*.
- **Unánime para ampliar el intercambio; unilateral para reducirlo.** Otorgar necesita a todos los miembros. Revocar es decisión de cualquiera de ellos, con efecto inmediato. Esa asimetría *es* el modelo de confianza: significa que entrar nunca es una trampa.
- **El bloqueo es una funcionalidad.** Con unanimidad no hay mayoría que desempate. El statu quo se mantiene: sin vencimientos, sin aprobación automática. La especificación ya acertó con esto para las solicitudes de afiliación (ADR-016 §82, «el silencio significa no») — generalízalo.
- **La plataforma nunca desempata.** Nada de «contacta a soporte para resolver la disputa». Si los miembros no se ponen de acuerdo, no pasa nada. Ese compromiso es lo que hace que el arreglo sea seguro para la parte *más débil* de una coalición desigual — que, en madurez de datos, es el PIP.
- **Vista compartida, no maestro compartido.** Según el ADR-016 §80, no hay deduplicación forzada entre organizaciones. Los registros se quedan en los sistemas de cada miembro; el universo compartido es una vista.
- **La salida se ensaya, no es teórica.** Te vas con una exportación completa de tus propios datos, más el registro de auditoría que cubre tu participación; tu aporte sale de la vista en vivo de ahí en adelante.

**El límite honesto:** los derechos iguales no igualan el poder. El partido con más registros aprende más de la intersección que el partido con menos. El libro de contribuciones lo hace visible, y aportar solo identificadores lo mitiga, pero no se puede eliminar por diseño.

---

## 9. Riesgos

**9.1 No hay campaña conjunta en curso contra la cual probar.** *Probabilidad: alta. Gravedad: alta — vuelve A5 imposible de probar, y A5 es lo que separa el intercambio real del teatro.* Mitigación: apuntar a la ventana de formación de coalición, o engancharlo a una actividad conjunta no electoral (§7).

**9.2 El obstáculo puede no ser la confianza.** *Probabilidad: media. Gravedad: estratégica.* Si las entrevistas de preparación (§6.4) muestran que la restricción real es la capacidad, la legalidad o la autorización política, y no la sospecha, entonces la maquinaria elaborada de consentimiento de la especificación —la capa de federación, los contratos de intercambio por recurso, la gobernanza por consentimiento unánime— resuelve un problema que estos partidos no tienen. Eso no mata el producto, pero le cambia el alcance de forma sustancial y baja el valor de la superficie de alianzas del ADR-016 §78–82.

**9.3 La madurez desigual de los datos produce un falso negativo.** *Probabilidad: alta. Gravedad: alta.* La fricción del PIP se lee mal como falta de voluntad del PIP. Mitigación: una persona dedicada al soporte de los socios; hacerles el trabajo de limpieza *a ellos* en la Fase 1; medir la voluntad por las decisiones tomadas, no por los archivos bien formateados.

**9.4 Calidad de los datos en Puerto Rico.** *Probabilidad: certeza. Gravedad: media bajo la Rama A, alta bajo la Rama B.*

- **Dos apellidos.** Con apellido paterno y materno, `last_name` puede traer uno, los dos, o un revoltijo con guion. Devastador para la coincidencia aproximada de nombres — y un argumento fuerte para quedarse en la Rama A, donde los nombres no se usan para cruzar.
- **Formato de teléfono.** +1 787 y +1 939 sirven ambos a PR; el formato local varía. Normalizar a E.164 es obligatorio y resuelve casi todo.
- **Direcciones.** Las convenciones de *urbanización* / *barrio* / ruta rural rompen los analizadores de direcciones con estándar estadounidense. No asumas que la normalización del USPS funciona.
- **Diáspora.** Muchos donantes y votantes vinculados a PR cargan teléfonos y direcciones de Estados Unidos. Es una arruga entre jurisdicciones, tanto para el cruce como para el consentimiento.
- **Geografía electoral.** 78 municipios, 8 distritos senatoriales, 40 distritos representativos, precintos y unidades, con la CEE como autoridad. Si ninguno de los dos archivos trae precinto o municipio, la funcionalidad de cobertura se muere — de ahí que la Rama A sea el plan oficial.

**9.5 Sensibilidad política.** *Probabilidad: baja. Gravedad: severa.* Una filtración acá no es un incidente de cumplimiento, es un escándalo entre partidos con víctimas con nombre y apellido. La postura de BYOK y de que la plataforma no tiene acceso es un seguro sobre la reputación de la propia GreenGrass tanto como sobre la de ellos.

**9.6 El consentimiento entre partidos puede ser legalmente inadmisible.** *Probabilidad: media. Gravedad: alta si no se atiende.* Puerto Rico es una jurisdicción estadounidense: la TCPA rige los SMS y la CAN-SPAM rige el correo electrónico. Los contactos de cada partido dieron su consentimiento a *ese partido*, no a una coalición. Si el consentimiento original cubre el contacto conjunto es una pregunta real y **hay que responderla en la Fase 0, no descubrirla en la Fase 3.**

Este riesgo es la razón directa de que la operación del piloto sea la supresión mutua y no el envío conjunto. La supresión no requiere consentimiento nuevo: cada partido contacta solo a su propia gente que dio consentimiento expreso, y lo único que cruza la frontera es una marca de supresión.

**9.7 Esto puede ser una funcionalidad, no una empresa.** *Probabilidad: media. Gravedad: estratégica.* Una capa de coordinación sin app de campo es fácil de describir y fácil de copiar. Lo defendible vive en la postura de confianza y en los datos de frontera acumulados, no en el cruce en sí.

---

## 10. Criterios para parar o pivotar

Decididos por adelantado, para que la decisión no se tome bajo la presión de los costos hundidos.

| Señal | Lectura | Acción |
|---|---|---|
| Cualquiera de los dos partidos se niega a subir después de firmar | La tesis es falsa para este par | **Parar.** Diagnostica por qué antes de generalizar — la razón de la negativa es el dato más valioso que el piloto puede producir |
| Los dos dicen que simplemente le habrían mandado el archivo al otro por correo (A7 falla) | No es infraestructura de confianza; es una utilidad de deduplicación | **Reposicionar.** Otro producto, otro precio, una superficie de alianzas mucho más chica en la construcción completa |
| Tasa de coincidencia <2% sobre identificadores limpios | La restricción real es la calidad de los datos, no la confianza | **Pivotar** hacia la calidad y la normalización de datos como producto |
| Los dos ponen el intercambio al máximo en el primer intento | Los controles granulares están sobrediseñados para este segmento | **Simplificar** el contrato de intercambio — un «éxito» que en realidad es un hallazgo en contra del diseño |
| Llegan los archivos, se calcula el solapamiento, nadie cambia ninguna decisión (A5 falla) | Juntar los datos es teatro | **Parar.** Datos que no cambian ninguna conducta no tienen valor que vender |

---

## 11. Preguntas abiertas para resolver con los partidos

Todas prospectivas. Nada de acá pregunta por ciclos anteriores.

1. ¿Se está contemplando una coalición para 2028, y en qué plazo se decide eso? (Fija la ventana de la Fase 3, §7 — hoy es la incógnita estructural del calendario.)
2. ¿Qué usa el PIP en realidad, y quiénes son los custodios de cada fragmento?
3. ¿Quién puede decir que sí en cada partido — y es el mismo nivel de autoridad de los dos lados? (La estructura de comités municipales del PIP puede implicar que hacen falta muchos sí.)
4. ¿El texto de consentimiento que ya usa alguno de los dos partidos contempla el contacto de coalición? (§9.6)
5. ¿Qué consideraría cada uno el aporte *mínimo* útil — solo identificadores, o irían más allá?
6. ¿Qué no incluiría cada uno bajo ninguna regla? (Define la lista de campos de denegación por defecto de ALLY-005.)
7. ¿Aceptaría alguno que el libro de contribuciones sea visible para todos los miembros, o tiene que ser privado para cada uno? (Prueba H8 directamente.)

---

## Apéndice — Hipótesis más allá del supuesto central

**H8 — El libro de contribuciones es un pasivo cuando los participantes son desiguales.** Se diseñó para hacer legible quién se aprovecha sin aportar y, con eso, hacer justo el arreglo. Con el MVC aportando volumen limpio y estructurado y el PIP aportando fragmentos, puede en cambio publicitar la debilidad relativa del PIP y dañar la relación. Mitigaciones a probar: normalizar por tamaño de lista; reportar *cobertura entregada* en vez de conteos crudos de registros; hacer que el libro sea privado para cada miembro por defecto.

**H9 — El registro de auditoría es decorativo.** Si ninguno de los dos partidos lo abre nunca, la confianza estaba en la contraparte y no en el sistema, y la inversión en el registro inmutable no se paga sola para este segmento. Se sondea directamente en A7.

**H10 — La supresión sola justifica la adopción.** Si la supresión mutua alcanza para generar uso repetido sin mapa, sin coordinación de trabajo de campo y sin envío conjunto, el producto construible es mucho más chico que el especificado — y llega al mercado mucho antes.
