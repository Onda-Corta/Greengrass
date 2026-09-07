# Inteligencia de comunicaciones — hoja de ruta post-MVP

**Inteligencia de medios sistemática e investigación con acceso controlado, secuenciadas como las primeras iteraciones después de que se valide el fideicomiso de datos de la coalición**

Redactado: 2026-09-01
Estado: Hoja de ruta. Depende de que `spec/mvp.md` pase su punto de decisión de marzo de 2028. No se ha modificado ninguna especificación existente.

---

## 1. Qué es esto y qué no es

Siete capacidades, pedidas como una sola herramienta:

monitoreo de medios · verificación de datos · puntos de mensaje · mapa de medios · perfiles de analistas · investigación de antecedentes de candidaturas · investigación de la oposición

El calificativo que obliga es *"todo de forma sistemática, con acceso controlado"*. Esas dos palabras —*sistemática* y *controlado*— pesan más que cualquiera de las siete funcionalidades, y buena parte de este documento trata sobre ellas.

**Esto no es un MVP alternativo.** `spec/mvp.md` pone a prueba la única pregunta del proyecto que no es un problema de ingeniería normal —si organizaciones políticas soberanas van a poner sus datos en común bajo las reglas adecuadas— y [mvp.md § 1. Contexto](mvp.md#1-contexto) tiene razón en que hay que probarla primero y barato, antes de la construcción cara. Nada de lo que sigue desplaza eso. El piloto queda como está especificado: MVC y PIP, solo ingesta, supresión mutua, las fases de [mvp.md § 7. Fases](mvp.md#7-fases).

Este documento es lo que se construye **después** de que esa pregunta tenga respuesta: las primeras iteraciones de producto real, ordenadas por dependencia, cada una con el punto de decisión que la libera.

De la secuencia se desprenden dos cosas. El §2 explica por qué este dominio va primero entre todos los que podrían ir. El §3, qué hereda del MVP — que resulta ser más que un supuesto validado.

---

## 2. Por qué este dominio va primero

La plataforma completa es grande: recaudación de fondos, operaciones de campo, GOTV (Get Out The Vote — movilización del voto), eventos, activismo, el portal de simpatizantes. Cualquiera de esos dominios podría seguir al piloto. Cuatro razones por las que este va al frente.

**La especificación ya lo había agendado.** [press.md § Registro de cobertura](press.md#registro-de-cobertura) aplaza el monitoreo automatizado de medios con un lenguaje que mira hacia adelante de una manera poco común:

> El monitoreo automático de medios se aplaza no por falta de importancia, sino porque merece una inversión seria y no una integración pegada con cinta adhesiva. Los servicios de monitoreo que existen (Meltwater, Cision, etc.) son caros, están centrados en Occidente y cubren mal a los medios regionales y locales del Sur Global. Ahí hay un hueco de mercado grande. […] Retomarlo como iniciativa de producto dedicada, no como añadido.

El ADR-015 lleva la misma decisión al registro de arquitectura. Este pedido no llegó de afuera del proyecto: lo dejó en pausa el propio proyecto, con una nota para volver a él.

**Ya hay evidencia de demanda en la geografía del piloto.** `puntos-ds.pages.dev` —un sitio de puntos de mensaje hecho a mano por Democracia Socialista en Puerto Rico— existe. Filtro por tema, búsqueda por palabra clave, copiar al portapapeles, marcas de verificación y un pie de página que advierte que el material se desactualiza. Sin plataforma, sin presupuesto, y con suficiente necesidad sostenida como para justificar mantenerlo. Una herramienta interna hecha a mano es la señal de demanda más fuerte que hay después de los ingresos, y esta está en el mercado objetivo, resuelve una séptima parte del pedido y nadie la encargó.

**No les pide nada nuevo a los partidos.** El piloto es solo de ingesta: los partidos entregan archivos y reciben de vuelta una marca de supresión. Cualquier otro dominio de la plataforma les pide migrar operaciones. La inteligencia de comunicaciones no pide importación, ni app de campo, ni cliente sin conexión, ni visto bueno de un custodio, ni una nueva pregunta de consentimiento. Es el paso más corto desde donde el piloto los deja.

**Le da al fideicomiso algo que hacer.** El piloto termina con dos partidos que ya demostraron que ponen datos en común y con una sola funcionalidad operativa estrecha. Si no viene nada rápido detrás, la relación no tiene superficie donde vivir. Una imagen compartida del panorama mediático es la segunda cosa natural que coordinan los socios de una coalición, y tiene mucho menos en juego que juntar listas de simpatizantes — que es justamente lo que la hace un buen segundo pedido y no un buen primero.

---

## 3. Qué hereda del MVP

El piloto no es solo una validación. Construye cuatro cosas de las que depende esta hoja de ruta, y una de ellas es una sorpresa genuina.

| Lo que construye el MVP | Por qué esta hoja de ruta lo necesita |
|---|---|
| **BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado) desde el primer día** ([mvp.md § 4.4 Se mantienen aunque parezcan recortables](mvp.md#44-lo-que-se-conserva-aunque-parezca-recortable)) | La afirmación central del almacén de expedientes es que la plataforma no puede leer el material. El BYOK hace que eso sea cierto y no solo contractual |
| **Registro de auditoría inmutable desde el primer día** ([mvp.md § 4.4 Se mantienen aunque parezcan recortables](mvp.md#44-lo-que-se-conserva-aunque-parezca-recortable)) | La cadena de custodia sobre los hallazgos de investigación es la misma maquinaria |
| **Event sourcing (el estado se deriva de un registro inmutable de eventos) para la procedencia** ([mvp.md § 4.4 Se mantienen aunque parezcan recortables](mvp.md#44-lo-que-se-conserva-aunque-parezca-recortable)) | El libro de afirmaciones *es* una estructura de procedencia — misma forma, otro tema |
| **El contrato de intercambio, ALLY-005** ([mvp.md § 4.1 Qué se construye](mvp.md#41-qué-se-construye)) | A nivel de campo, con denegación por defecto, por miembro. Ver abajo |
| **Una respuesta validada sobre si fueron las reglas las que lo hicieron posible** (A7) | Determina si algo de lo que sigue puede compartirse en coalición siquiera |

### 3.1 El contrato de intercambio resulta ser la respuesta para el mapa de medios

Lo más útil que deja el MVP es lo que se construyó para otra cosa.

Una pregunta abierta que de otro modo sería difícil: ¿de quién es el grafo de actores — el mapa de los medios, su propiedad, su financiamiento y su alineación? Por organización significa que cada campaña lo reconstruye desde cero, un esfuerzo duplicado enorme justo en las organizaciones con menos capacidad. Mantenido por GreenGrass es la ventaja más defendible de toda la propuesta y también un riesgo compartido: una etiqueta de alineación equivocada sobre un medio pasa a ser la etiqueta equivocada de todas las organizaciones.

Si el MVP pasa, hay una tercera respuesta: **compartido por la coalición, bajo el mismo contrato a nivel de campo y con denegación por defecto que el piloto ya construyó.** Cada miembro aporta lo que sabe del panorama mediático, ve la suma de lo aportado y se guarda lo que decida guardarse — la misma primitiva, apuntada al conocimiento institucional en vez de a los registros de simpatizantes.

Y es un segundo uso *más seguro* de esa maquinaria que el primero. Un mapa de medios no contiene datos personales de simpatizantes, ni pregunta de consentimiento, ni un campo `support_level` que un partido cuide como su activo central ([mvp.md § MVC — Movimiento Victoria Ciudadana](mvp.md#mvc-movimiento-victoria-ciudadana)). Si el contrato de intercambio funciona en algún lado, funciona aquí. Eso convierte a este dominio en un lugar natural para ampliar el fideicomiso, no para ponerlo a prueba.

**Esto solo queda disponible si el MVP pasa.** Si A7 falla y resulta que los partidos confiaban entre ellos y no en las reglas ([mvp.md § 5. El supuesto, descompuesto](mvp.md#5-el-supuesto-descompuesto)), el grafo de actores vuelve a ser por organización y la versión compartida por la coalición se descarta.

---

## 4. Lo que GreenGrass ya tiene

El conjunto de especificaciones va en parte por delante del pedido y en parte no lo cubre.

| Capacidad | Estado | Evidencia |
|---|---|---|
| **Monitoreo de medios** | Aplazado **como oportunidad estratégica explícita** | [press.md § Registro de cobertura](press.md#registro-de-cobertura), `decisions/015-product-scope.md` |
| **Puntos de mensaje** | **Existen** — versionados, organizados por tema, compartidos con el equipo | [press.md § Puntos de mensaje](press.md#puntos-de-mensaje); PRESS-014 en [press.md § PRESS-014: Biblioteca de puntos de mensaje](../design/ux/04-wireframes/press/press.md#press-014-talking-points-library) |
| **Mapa de medios** | Parcial — los contactos llevan medio, área temática y zona de cobertura; el panorama en sí es prosa | [press.md § Contactos de medios como registros del CRM](press.md#los-contactos-de-medios-son-registros-del-crm), [press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios) |
| **Perfiles de analistas** | Parcial — los periodistas son registros de Contacto con estado de relación; los analistas son otro objeto | [press.md § Contactos de medios como registros del CRM](press.md#los-contactos-de-medios-son-registros-del-crm), [users.md § Contacto](users.md#contacto) |
| **Verificación de datos** | Ausente | — |
| **Investigación de antecedentes de candidaturas** | Ausente. Lo más cercano es la aprobación configurable de voluntarios por riesgo de infiltración, ADR-003 | — |
| **Investigación de la oposición** | Ausente — solo aparece en el modelo de amenazas, como algo que se le hace *a* la campaña | [security.md § Nivel 1: actores estatales](security.md#nivel-1-actores-estatales), [security.md § Nivel 3: oponentes políticos](security.md#nivel-3-oponentes-políticos) |

### Qué aporta la referencia de puntos de mensaje

`puntos-ds.pages.dev` tiene tres cosas que PRESS-014 no tiene:

1. **El par *lo que decimos / lo que contestamos*.** Ataque y defensa como una sola unidad. PRESS-014 guarda afirmaciones; la referencia guarda afirmaciones *y sus réplicas*, que es como se usa el material de verdad cuando te están preguntando.
2. **Copiar al portapapeles, punto por punto.** Un detalle chico que revela el caso de uso real: alguien está redactando una respuesta ahora mismo, en un celular, en medio de una discusión. PRESS-014 está diseñada para revisar, no para usar en vivo.
3. **Estado de verificación por punto** — *"Sin verificar."* El pie de página dice: *"Uso interno. Los puntos cambian; verifica la fecha antes de citar públicamente."*

La tercera es la importante, y es la juntura donde dos de las siete funcionalidades pedidas resultan ser una sola. Un punto de mensaje con estado de verificación *es* un registro de verificación de datos. Ver §5.

---

## 5. Siete funcionalidades son tres primitivas

Tratar el pedido como siete funcionalidades produce siete herramientas a medio construir. Son tres estructuras de datos, y de ellas se desprende el orden de iteraciones del §9.

### 5.1 El grafo de actores

Medios, periodistas, analistas y objetivos de monitoreo son una sola estructura, no cuatro. La unidad que falta hoy es **el medio como registro de primera clase**: propiedad, financiamiento, alineación política o confesional, alcance, línea editorial, medios hermanos y quién escribe qué dentro de él.

[press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios) describe exactamente esto —el *"panorama mediático confesional (medios alineados con grupos políticos o religiosos)"* del Líbano, la fragmentación por lenguas regionales de India, la división bilingüe de Puerto Rico— en prosa, en una sección titulada "Diferencias del panorama mediático", y no modela nada de eso. Hoy, cada medio de la plataforma existe únicamente como un campo de texto en el registro de contacto de un periodista ([press.md § Contactos de medios como registros del CRM](press.md#los-contactos-de-medios-son-registros-del-crm)).

Los perfiles de analistas salen del mismo grafo. A un periodista le ofreces una historia. A un analista o comentarista lo *predices*: sus posiciones previas, su alineación, qué dijo la última vez que salió este tema. El mismo grafo, otra arista.

### 5.2 El libro de afirmaciones

Una afirmación, sus fuentes, su estado de verificación, su respuesta aprobada, su historial.

La verificación de datos, la marca de verificación en un punto de mensaje y una coincidencia entrante del monitoreo son tres vistas de un mismo registro. Un ataque aparece en el monitoreo; se convierte en una afirmación; la afirmación recibe fuentes y se dictamina; el dictamen se convierte en una respuesta aprobada; la respuesta aprobada es un punto de mensaje. Hoy esos cuatro pasos viven en cuatro lugares, tres de los cuales no existen.

Esta es la primitiva que hace que la herramienta sea *sistemática* y no una carpeta de documentos. Es también la única que no tiene análogo en ninguna parte de la especificación actual — aunque, como señala el §3, estructuralmente es la misma forma de procedencia que ya produce el event sourcing del MVP.

### 5.3 El expediente compartimentado

La investigación de antecedentes de candidaturas y la investigación de la oposición son la misma maquinaria apuntada en dos direcciones: un sujeto, un conjunto de hallazgos con fuente, una cadena de custodia, una lista de acceso.

Investigarse a uno mismo se vende más fácil y es el producto más defendible: encontrar el punto vulnerable de tu propia candidatura antes de que lo encuentre el otro bando. Es el mismo almacén, y es la razón por la que el §9 pone la investigación propia antes que la de la oposición.

---

## 6. El "acceso controlado" todavía no existe

Esta es la parte del pedido que la plataforma hoy no puede satisfacer, y no se arregla ajustando permisos. Es la razón por la que las iteraciones de expedientes van últimas en el §9.

El ADR-003 da un RBAC híbrido —plantillas de rol apilables con excepciones por usuario— más alcance por atributos de geografía, equipo y campaña. Responde *"qué puede hacer un Director de comunicaciones, y sobre qué región"*. No tiene respuesta para *"solo estas cuatro personas, con nombre y apellido, pueden abrir este archivo, y el Administrador de la organización no es una de ellas"*.

Los wireframes de prensa hacen concreta la brecha: todas las pantallas de PRESS-001 a PRESS-015 están marcadas como visibles para **OA, CD** — Administrador de la organización y Director de comunicaciones ([press.md § Alcance](../design/ux/04-wireframes/press/press.md#scope)). A nivel de rol, para toda la organización, sin ningún grano más fino en todo el dominio.

Un almacén de expedientes compartimentado necesita cuatro cosas que la plataforma no tiene:

| Requisito | Estado actual |
|---|---|
| Listas de acceso por registro (personas con nombre, no roles) | No está modelado |
| Registro de lecturas | **Rechazado explícitamente** |
| Sin vía de lectura de superusuario | **Rechazado explícitamente** |
| Alcance de llave por compartimento | El BYOK es por organización (ADR-002) |

Dos de esas no son brechas sino contradicciones activas, y hay que resolverlas en vez de taparlas:

- **[004-data-model-integrity.md § Registro de auditoría completo para todas las mutaciones de datos](../decisions/004-data-model-integrity.md#registro-de-auditoría-completo-para-todas-las-mutaciones-de-datos)** se compromete a un registro de auditoría completo *"para todas las mutaciones de datos"*. Las lecturas no se registran. En un almacén de expedientes, la lectura *es* el evento que vale la pena registrar: la exfiltración desde adentro no deja ninguna mutación atrás.
- **[security.md § Protección de metadatos](security.md#protección-de-metadatos)** va más lejos y convierte el no registrar en una *defensa*: *"Evita registrar metadatos innecesarios (no anotes qué registros específicos vio una persona si solo necesitas saber que inició sesión)."* Ese es el razonamiento correcto de minimización de metadatos para una app de trabajo de campo bajo vigilancia estatal, y es exactamente el inverso del que necesita un compartimento de investigación.
- **[security.md § Acceso del equipo de GreenGrass](security.md#acceso-del-equipo-de-greengrass)** le da al Administrador de la plataforma *"acceso silencioso… para leer los datos de la organización con fines de soporte y depuración, sin notificar a la organización"*. Defendible para un CRM. No defendible para un expediente sobre un funcionario en ejercicio.

Hay además un efecto colateral sobre el diseño de coacción. [security.md § Consideraciones de seguridad física](security.md#consideraciones-de-seguridad-física) especifica un passkey señuelo que abre una vista saneada. Hoy esa funcionalidad es un extra deseable para el nivel más alto. Agrega un almacén de expedientes y pasa a ser estructural: ahora hay algo concreto que un inicio de sesión bajo coacción no debe revelar.

**La compartimentación es su propio ADR y su propio esfuerzo de ingeniería, no una configuración del ADR-003.** Es la Iteración 4.

---

## 7. El riesgo de factibilidad que podría rehacer todo el plan

El pilar de monitoreo se apoya en un supuesto que nadie ha probado, y probarlo es barato y se puede hacer temprano.

### 7.1 ¿"No quieren" o "no pueden"?

Meltwater y Cision no cubren estos mercados. [press.md § Registro de cobertura](press.md#registro-de-cobertura) lee eso como un hueco de mercado. Es igual de compatible con una *imposibilidad* de mercado, y una cosa y la otra implican productos completamente distintos:

- **No quieren** — los mercados son reales, pero demasiado chicos y fragmentados como para que a un proveedor occidental le compense el costo de integrarlos. Entonces la estructura de costos más baja de GreenGrass y su foco en las lenguas locales sí son una ventaja real.
- **No pueden** — la cobertura no es alcanzable digitalmente a ningún costo razonable. Entonces ningún grado de foco alcanza, y el producto termina monitoreando la franja de medios que da la casualidad de que se puede extraer automáticamente, y se pierde la parte que decide elecciones.

Nada en el conjunto de especificaciones responde esto. El §7.4 lo responde en tres semanas.

### 7.2 Las noticias no circulan por la web

En tres de los cinco mercados objetivo, la especificación dice que el canal de noticias dominante es una red de mensajería cerrada:

- **Brasil** — *"WhatsApp es el canal de comunicación dominante (incluso para compartir noticias)"* ([press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios))
- **India** — *"WhatsApp y YouTube son los canales digitales dominantes. Los medios en lenguas regionales son críticos"* ([press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios))
- **Líbano** — *"WhatsApp es dominante para mensajería"* ([press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios))

Monitorear redes de mensajería cerradas significa vigilar grupos privados. **La línea, dicha como compromiso al mismo nivel que el §8: este producto no hace eso.** Y no por una limitación técnica. Una herramienta de inteligencia política que ingiere chats de grupos privados es un producto de vigilancia, y construir uno para organizaciones de base justo en los países donde esa capacidad se volvería contra ellas no es algo que GreenGrass deba sacar.

Ese compromiso tiene un costo, y es el costo honesto de toda la idea: en los mercados donde la plataforma hace más falta, un producto de monitoreo con principios ve una minoría de lo que de verdad circula.

La radio y la televisión lo agravan. [press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios) pone *"TV y radio locales fuertes"* en el centro del mercado de Puerto Rico, y [press.md § Diferencias del panorama mediático](press.md#diferencias-en-el-panorama-de-medios) señala el *horário eleitoral* obligatorio de Brasil. Nada de eso se puede buscar como texto sin infraestructura de transcripción: se puede construir, es una línea de costo real y hoy no está en el estimado de nadie.

### 7.3 Puerto Rico va a maquillar el resultado

Los partidos del piloto están en Puerto Rico: un mercado chico, bilingüe, bien digitalizado, con un número manejable de medios y una presencia web pegada a la de Estados Unidos. Plausiblemente el entorno mediático *más fácil* de todo el conjunto objetivo.

Que el monitoreo funcione en San Juan no te dice casi nada sobre Recife o Chennai. Es la imagen espejo de la situación que [mvp.md § Punto de partida](mvp.md#punto-de-partida) describe para el fideicomiso de datos: para ese experimento, PR es una prueba limpia; para la factibilidad del monitoreo es el caso más amable posible y va a exagerar cuánto de esto se generaliza.

**Mitigación:** el sondeo de corpus se hace sobre Brasil y un mercado más, aunque el primer despliegue sea en Puerto Rico. La factibilidad y la adopción se miden en lugares distintos, a propósito.

### 7.4 El sondeo de corpus — hazlo temprano, cuesta tres semanas

Una persona, tres semanas, y **no necesita esperar al punto de decisión del MVP**. No requiere ingeniería ni un partido del piloto, así que puede correr en paralelo a la Fase 0 o 1 del propio piloto sin competirle a nadie.

1. Elige dos mercados. **Brasil y uno entre India y Líbano** — Puerto Rico no.
2. Toma una semana de noticias políticas, definidas como las definiría alguien que conoce el tema.
3. Intenta armarla a partir de fuentes alcanzables: RSS, sitemaps, APIs públicas, archivos abiertos, cuentas públicas de redes sociales.
4. Mide: qué fracción se puede recuperar sin trabajo a la medida para cada medio; qué fracción queda detrás de muros de pago, distribución solo por app, radio, TV o mensajería cerrada; cuánto cuesta sumar la cola larga de medios en lenguas regionales.

El resultado es un número por mercado y una curva de costos. Si la cobertura alcanzable en Brasil es escasa, la Iteración 3 se reposiciona o se elimina y la hoja de ruta se acorta al libro, el grafo y el almacén de expedientes: un producto más chico y distinto, sabido años antes de que alguien lo construya. Ese es todo el valor de hacerlo temprano.

---

## 8. La doctrina

La investigación de la oposición y la investigación de antecedentes de candidaturas entran en alcance con capacidad completa. Es una posición defendible, y es defendible **solo** con una doctrina explícita adosada. Estos son compromisos, no consideraciones, y tienen que existir por escrito antes de que empiece la Iteración 5.

### 8.1 Fuentes

**Solo fuentes lícitas.** Registros públicos, material publicado, declaraciones hechas para ser citadas, documentos judiciales y presentaciones ante reguladores, informes de financiamiento de campaña, datos de proveedores con licencia y procedencia documentada.

**Prohibido, por diseño y no solo por política:** material hackeado o filtrado, hacerse pasar por otra persona o falsear el motivo para conseguir registros, datos personales de origen dudoso, cuentas privadas extraídas automáticamente, y cualquier cosa obtenida de un grupo de mensajería cerrado.

### 8.2 La procedencia es obligatoria

Cada hallazgo lleva fuente, fecha, quién lo recogió y con qué método. No hay campo de texto libre para una afirmación sin fuente, porque en el momento en que lo haya, es de eso que se llena el almacén.

Esto es lo que separa la investigación del rumor. Y es además la protección frente a la responsabilidad legal: un expediente donde cada línea se rastrea hasta un registro público es defendible de una manera en que un documento de afirmaciones nunca lo es.

### 8.3 Límite de alcance

**Conducta pública de figuras públicas.** Candidaturas, quienes ocupan cargos, y su conducta política y financiera.

Excluidos por defecto: familiares, menores, asuntos médicos y sexuales privados. La excepción exige justificación escrita, queda registrada y es visible para quien administra el compartimento. El valor por defecto es la posición del producto; la excepción existe porque hay casos reales y pretender lo contrario solo mueve el trabajo fuera de la plataforma.

### 8.4 El choque con los derechos del titular de los datos

La pregunta sin resolver más grande de este documento.

[compliance.md § Marco de protección de datos](compliance.md#marco-de-protección-de-datos) compromete a GreenGrass a *"protecciones de datos sensibles al nivel de LGPD/GDPR aplicadas globalmente, sin importar la ley local"*, con el razonamiento de que todos los datos de una plataforma política son políticos por naturaleza. [compliance.md § Derechos del titular de los datos](compliance.md#derechos-del-interesado) enumera después los derechos de acceso, rectificación, supresión, portabilidad y oposición.

**Un oponente es un titular de datos.** Bajo la LGPD, la PDPA y la DPDPA tiene derechos sobre un expediente que se guarda sobre él, incluidos el de acceso y el de supresión. Una solicitud de acceso contra un expediente de investigación de la oposición no es un caso extremo: es una táctica obvia y barata, y la primera campaña que la use contra una organización de GreenGrass fija el precedente para el producto.

Tres respuestas parciales, ninguna suficiente por sí sola:

1. **Excepciones periodísticas y de interés legítimo.** Existen, pero son estrechas, específicas de cada jurisdicción y en general están escritas para la prensa, no para operaciones políticas.
2. **La organización como responsable del tratamiento, con una plataforma genuinamente ciega.** GreenGrass es encargada del tratamiento ([compliance.md § Acuerdos de tratamiento de datos](compliance.md#acuerdos-de-tratamiento-de-datos)); la solicitud va a la organización. El BYOK —que el MVP ya entrega ([mvp.md § 4.4 Se mantienen aunque parezcan recortables](mvp.md#44-lo-que-se-conserva-aunque-parezca-recortable))— hace que la ceguera de la plataforma sea *cierta* y no meramente contractual, y choca de frente con la vía de lectura silenciosa del Administrador de la plataforma en [security.md § Acceso del equipo de GreenGrass](security.md#acceso-del-equipo-de-greengrass).
3. **Alcance limitado a registros públicos.** Donde los hechos de fondo ya son públicos, la posición del titular es la más débil. La respuesta más limpia y también el producto más estrecho.

**Esto va a asesoría legal en cada jurisdicción antes de que se escriba una línea de código de expedientes**, y pertenece a la lista de [compliance.md § Preguntas abiertas para la asesoría legal](compliance.md#preguntas-abiertas-para-la-asesoría-legal). Es una razón plausible para que el módulo de expedientes salga en algunos mercados y en otros no.

### 8.5 Acceso y retención

- **Compartimentado por defecto.** Sellado a una lista de acceso con personas nombradas, nunca a un rol. Agregar a alguien es un evento, queda registrado y es visible para quien administra el compartimento.
- **Las lecturas se registran y el registro es visible para quien administra el compartimento.** Invierte [security.md § Protección de metadatos](security.md#protección-de-metadatos) solo para esta clase de datos, y la inversión tiene que quedar acotada con precisión para que no se filtre de vuelta a las operaciones de campo, donde el razonamiento original sigue valiendo.
- **Sin vía de lectura de superusuario.** El Administrador de la organización puede dar acceso; no puede leer. El Administrador de la plataforma no puede leer en absoluto — la decisión de acceso silencioso de [security.md § Acceso del equipo de GreenGrass](security.md#acceso-del-equipo-de-greengrass) queda anulada para esta clase de datos, sin excepción por soporte ni por depuración.
- **Caducidad forzosa.** Los expedientes caducan al final del ciclo electoral salvo que se renueven con justificación escrita.

### 8.6 El modelo de amenazas se invierte

`spec/security.md` está construido sobre la premisa de que la campaña es el blanco de la vigilancia. Un almacén de expedientes convierte a la campaña en un blanco de alto valor por una razón completamente distinta — y una filtración no es un incidente de cumplimiento, sino un escándalo entre partidos con víctimas con nombre y apellido. [mvp.md § 9. Riesgos](mvp.md#9-riesgos) ya hace exactamente este argumento sobre el fideicomiso de datos; aquí aplica con más fuerza, porque un expediente es *sobre* alguien, no simplemente lo contiene.

Consecuencias que hay que diseñar: alcance de cifrado separado, y un argumento serio para ofrecer el módulo de expedientes **solo autoalojado**, de modo que GreenGrass nunca tenga el material.

### 8.7 La posición para contextos autoritarios

[geography.md § Relevancia del nivel de seguridad por país](geography.md#relevancia-del-nivel-de-seguridad-por-país) califica a Tailandia e India como *"de Reforzado a Agresivo"* y al Líbano como *"Agresivo"* — por capacidad de vigilancia estatal y presión política sobre la oposición.

Un almacén de investigación compartimentado es exactamente lo que un Estado hostil más quiere incautar, y la incautación pone en peligro a las **fuentes**, no solo a la campaña. A quien habló con un investigador bajo la condición de que hubiera discreción lo expone el mismo almacén construido para proteger al investigador.

**La posición dura, dicha como política de producto: el módulo de expedientes no está disponible, o funciona solo en el dispositivo local, en las jurisdicciones de mayor amenaza.** Negarse a llevar una capacidad a un mercado donde se convierte en una lista de objetivos es la decisión correcta, aunque un competidor tome la contraria.

---

## 9. Las iteraciones

Ordenadas por dependencia, no por atractivo. Cada una sale solo cuando pasa su punto de decisión.

| # | Iteración | Contiene | Requisito para empezar | Costo aproximado |
|---|---|---|---|---|
| **0** | **Sondeo de corpus** | §7.4. Dos mercados, una semana de cobertura, medir alcanzabilidad | Ninguno — corre en paralelo a la Fase 0/1 del MVP | 1 persona, 3 semanas |
| **1** | **Puntos de mensaje + libro de afirmaciones** | PRESS-014 ampliada con los tres agregados del §4; registros de afirmación con fuentes, estado y respuesta aprobada | Pasó el punto de decisión del MVP ([mvp.md § 7. Fases](mvp.md#7-fases)) | 2 ing. + 1 diseñador, ~6 semanas |
| **2** | **El grafo de actores** | El medio como registro de primera clase; perfiles de periodistas y analistas; vistas del mapa de medios | La Iteración 1 en uso real | ~8 semanas |
| **3** | **Ingesta de monitoreo** | Configuración de fuentes, bandeja de monitoreo, promoción de coincidencia → cobertura que alimenta PRESS-010/011 | **Resultado de la Iteración 0** — ver criterios de cancelación | ~12 semanas, más operación continua del corpus |
| **4** | **Primitiva de compartimentación** | El ADR del §6, más listas de acceso por registro, registro de lecturas y alcance de llaves | Iteraciones 1–3 entregadas; ningún trabajo de expedientes empieza antes de esto | ~8 semanas, transversal |
| **5** | **Investigación de antecedentes de candidaturas** | Expedientes de investigación propia bajo la doctrina del §8 | Iteración 4 completa; doctrina escrita y adoptada | ~6 semanas |
| **6** | **Investigación de la oposición** | El mismo almacén, sujetos externos | **Revisión legal completa en cada jurisdicción** (§8.4) | ~4 semanas sobre la 5 |

### 9.1 Por qué este orden

**La Iteración 1 va primero porque no necesita nada.** Los puntos de mensaje y el libro de afirmaciones no requieren ninguna primitiva nueva de control de acceso, ni tubería de ingesta, ni revisión legal. Amplían una pantalla que ya tiene wireframe. Es el camino más rápido desde el punto de decisión del MVP hasta algo que una campaña use a diario.

**La Iteración 3 depende de la Iteración 0 y de nada más.** El monitoreo es el pilar más caro y el único cuya factibilidad es genuinamente desconocida. Hacer el sondeo años antes de la construcción es la reducción de riesgo más barata que hay en todo este plan.

**La Iteración 4 antes que la 5 y la 6, sin excepción.** Sacar un almacén de expedientes montado sobre permisos por rol sería peor que no sacarlo: crearía la apariencia de compartimentación sin la sustancia, que es el modo de fallo con más probabilidad de que alguien salga lastimado.

**La Iteración 5 antes que la 6** porque investigarse a uno mismo es la misma maquinaria con mucha menos exposición legal, y prueba que el compartimento funciona sobre material donde un error se sobrevive.

### 9.2 Se mantienen desde el principio, aunque parezcan aplazables

- **Procedencia en cada afirmación, desde la Iteración 1.** Agregarle fuentes después a un libro que ya contiene afirmaciones sin fuente no funciona; esas afirmaciones nunca reciben fuentes.
- **Estado de verificación en los puntos de mensaje, desde la Iteración 1.** Un solo campo, y es lo que une el libro y la biblioteca en un producto en vez de dos.

### 9.3 Reutilización de pantallas

La mayor parte de esto no es dibujo nuevo. La Iteración 1 amplía PRESS-014. La Iteración 2 reutiliza los patrones de CRM-001/002 para el grafo y PRESS-001/002 para las vistas de personas. La Iteración 3 alimenta PRESS-010 y PRESS-011, que ya tienen wireframe como pantallas de captura manual y pasan a llenarse automáticamente. Genuinamente nuevo y sin wireframe: la bandeja de monitoreo, el libro de afirmaciones, el registro del medio y la superficie de administración de compartimentos.

---

## 10. Puntos de decisión y criterios de cancelación

Decididos por adelantado, para que las decisiones no se tomen bajo la presión de lo ya invertido.

| Señal | Lectura | Acción |
|---|---|---|
| El punto de decisión del MVP dice parar o reposicionar ([mvp.md § 7. Fases](mvp.md#7-fases)) | Cambió la premisa sobre la que se apoya esta hoja de ruta | **Volver a derivar.** Las iteraciones 1–3 todavía pueden sostenerse solas como producto de organización única; el grafo de actores compartido por la coalición (§3.1) no |
| A7 falla — se tenían confianza entre ellos, no a las reglas | El contrato de intercambio no es el activo que parecía | **El grafo de actores pasa a ser por organización.** Todo lo demás sigue |
| El sondeo de corpus devuelve <30% de cobertura alcanzable en Brasil | El hueco es de "no pueden", no de "no quieren" | **Eliminar la Iteración 3.** La hoja de ruta se acorta a libro, grafo y expedientes — y eso se sabe años antes |
| Sale la Iteración 1 y nadie escribe un punto de mensaje en 6 semanas | Consumo sin autoría: es un documento, no un sistema | **Parar antes de la Iteración 2.** Averiguar si en la organización hay alguien cuyo trabajo sea este |
| Nunca inicia sesión más que una sola persona | La costumbre de alguien del equipo, no una capacidad de la organización | **Investigar.** Las herramientas de un solo usuario se abandonan cuando esa persona se va, y la rotación en campañas es alta ([press.md § Seguimiento de interacciones con medios](press.md#registro-de-interacciones-con-medios)) |
| La revisión legal dice que los expedientes son inadmisibles en 3 o más mercados objetivo | El pilar de investigación queda acotado regionalmente | **Sacar las iteraciones 1–4 y parar.** No construir un módulo que solo se pueda vender en dos países |
| Cualquier presión para sacar la Iteración 5 antes que la 4 | El modo de fallo que termina lastimando a alguien | **Negarse.** Es la única línea de este documento que no admite excepción |

---

## 11. Qué empezar ahora

Nada del §9 empieza antes del punto de decisión del MVP, con una excepción.

**Haz el sondeo de corpus (Iteración 0) durante el piloto.** Cuesta una persona por tres semanas, no necesita ingeniería, no necesita un partido del piloto y no compite con la Fase 1 del propio fideicomiso de datos — que [mvp.md § Equipo y costo](mvp.md#equipo-y-costo) presupuesta en una persona por tres semanas y que queda exactamente como está especificada. Hacer las dos cosas son unas seis semanas-persona en total y responde dos preguntas independientes años antes de que se financie cualquiera de las dos construcciones.

El sondeo de corpus es además el único punto de esta lista cuya respuesta podría reestructurar la hoja de ruta en vez de solo calendarizarla. Si el monitoreo resulta inviable en Brasil, eso cambia lo que GreenGrass está vendiendo — y es mucho mejor enterarse en 2027 que en 2029.

Todo lo demás espera a marzo de 2028.

---

## 12. Preguntas abiertas

### Para la asesoría legal — antes de la Iteración 5

1. ¿Alguna jurisdicción objetivo ofrece una excepción que cubra la investigación de la oposición como base lícita, y qué tan estrecha es? (§8.4.)
2. ¿La organización como responsable del tratamiento, con ceguera real de la plataforma, satisface una solicitud de acceso del titular bajo la LGPD o la DPDPA, o la obligación de la organización simplemente se traspasa?
3. ¿La ingesta automatizada de contenido noticioso publicado genera exposición por derechos de autor o por derechos sobre bases de datos en algún mercado objetivo, y cambia la respuesta si se guarda el texto completo en vez de titular más enlace?

### Para producto

4. Si el grafo de actores compartido por la coalición (§3.1) es viable, ¿aportar a él crea el mismo problema de legibilidad del aprovechamiento gratuito que el libro de contribuciones de [mvp.md § Apéndice — Hipótesis más allá del supuesto central](mvp.md#apéndice-hipótesis-más-allá-del-supuesto-central)? ¿Y se transfiere la mitigación de H8?
5. ¿El libro de afirmaciones se conecta con la generación de mensajes de activismo con IA del ADR-013, que ya se nutre de los puntos de mensaje? Si la respuesta aprobada de una afirmación puede sembrar un mensaje generado, los dos sistemas están más cerca de lo que este documento supone.
6. ¿La investigación de antecedentes propios se vende sola, sin la investigación de la oposición adosada? La misma maquinaria, mucha menos exposición, posiblemente el producto más honesto.

### Para los partidos del piloto, una vez que pase el punto de decisión

7. ¿Pagarían MVC, PIP o DS por esto, y en qué nivel?
8. ¿Quién es responsable de este trabajo hoy en una campaña de diez personas, y es el trabajo real de alguien? Si la respuesta es "nadie, pasa en un grupo de WhatsApp", eso es a la vez la oportunidad y el problema de adopción.
