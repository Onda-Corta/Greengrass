# ADR-017: El contrato de intercambio como primitiva universal de confianza

**Estado:** Aceptada
**Fecha:** 2026-09-06
**Fuentes:** `spec/users.md`, `spec/security.md`, `spec/mvp.md`, `spec/comms-intelligence.md`

## Contexto

GreenGrass tiene dos mecanismos de control de acceso que evolucionaron por separado y nunca se conciliaron.

Dentro de una organización, la [ADR-003](003-identity-access-organization.md) da un RBAC híbrido —plantillas de rol apilables con sobrescrituras por usuario— más acotación por atributos según geografía, equipo y campaña. Entre organizaciones, esa misma ADR da los contratos de intercambio: con consentimiento expreso por recurso y por organización, revocables, auditados y subordinados al consentimiento de cada persona ([users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza)).

El segundo mecanismo queda acotado a las alianzas por la estructura del documento, no por la arquitectura. La sección que lo define se titula «Intercambio entre organizaciones dentro de una alianza» ([users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza)), pero nada en la forma del contrato es específico de una alianza. Mientras tanto, [users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa) establece que toda entidad salvo Campaña es soberana —alianza, partido, organización y candidato por igual— y [users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa) dice sin rodeos que «un partido no es dueño de los datos de un candidato».

De ahí salen tres vacíos.

**La relación partido↔candidato se declara de soberano a soberano y no hay mecanismo para expresar qué se comparte.** Los dos son organizaciones completas, la afiliación explícitamente no transfiere la propiedad, y la única maquinaria para expresar cooperación entre entidades soberanas vive bajo un encabezado de alianza. La relación tiene la afirmación de soberanía y nada que la haga operativa.

**«Hereda» no está definido para los datos.** Campaña es la única entidad no soberana ([users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa)) y hereda «la facturación y la estructura administrativa de su matriz» ([users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa)). La facturación y la administración están claras. El acceso a los datos no. Una candidatura que corre en una primaria contra un rival de su propio partido no tiene manera de representar el límite que necesita, porque el modelo no ofrece ningún límite a ese nivel.

<!-- REVISIT: El original dice "these are four capabilities" y enumera tres (listas de acceso por registro, registro de lecturas y ausencia de vía de lectura para superusuarios). La incoherencia se traduce tal cual; hay que arreglarla en el inglés. -->
**El almacenamiento compartimentado se lee como una primitiva enteramente nueva.** `spec/comms-intelligence.md` exige listas de acceso por registro, registro de lecturas y ninguna vía de lectura para superusuarios, tanto para la investigación de antecedentes de candidaturas como para la investigación de la oposición. Con el modelo actual son cuatro capacidades que la plataforma no tiene, y exigen su propia ADR y su propio esfuerzo de ingeniería.

### Conflictos que resuelve esta ADR

Siguiendo el precedente de la [ADR-016](016-cross-cutting-resolutions.md), los conflictos con decisiones ya aceptadas se nombran aquí y se resuelven más abajo.

1. **[003-identity-access-organization.md § Consecuencias](003-identity-access-organization.md#consecuencias)** impone como restricción que «los límites entre organizaciones son el ámbito más externo: ningún usuario ve nunca datos de una organización a la que no pertenece». Los contratos que operan por debajo de la organización contradicen eso tal como está escrito.
2. **[security.md § Protección de metadatos](../spec/security.md#protección-de-metadatos)** convierte el no registrar en una defensa: «Evitar registrar metadatos innecesarios (no registres qué registros vio alguien si solo necesitas saber que inició sesión)». Un compartimento exige lo contrario.
3. **[security.md § Acceso del equipo de GreenGrass](../spec/security.md#acceso-del-equipo-de-greengrass)** le da al Administrador de la plataforma acceso silencioso de lectura a los datos de una organización, sin avisarle.
4. **[004-data-model-integrity.md § Registro de auditoría completo para todas las mutaciones de datos](004-data-model-integrity.md#registro-de-auditoría-completo-para-todas-las-mutaciones-de-datos)** se compromete a un registro de auditoría completo «para todas las mutaciones de datos». Las lecturas no quedan cubiertas, y en los datos compartimentados la lectura es el evento que vale la pena registrar: la exfiltración por parte de una persona con acceso legítimo no deja ninguna mutación detrás.

## Decisión

### El contrato de intercambio es el único mecanismo para el flujo de datos a través de los límites

Un contrato de intercambio rige el flujo de datos a través de cualquier límite: alianza, partido, candidatura, campaña o compartimento. Los roles rigen solo *dentro* de un límite, donde no se ha trazado ningún contrato.

La regla operativa: **existe un contrato dondequiera que alguien haya trazado un límite; donde no hay límite trazado, rigen los roles.** Una campaña de tres personas nunca se topa con un contrato, porque no ha trazado ningún límite interno y el mecanismo permanece invisible hasta que hace falta.

**Alternativas consideradas:** Se descartó generalizar los contratos solo entre unidades soberanas, dejando intacto el acceso dentro de una organización, porque deja la compartimentación como una primitiva aparte y renuncia al beneficio principal. Se descartó hacer del contrato el único mecanismo —con los roles como azúcar sintáctico que genera contratos implícitos— porque recrea la complejidad del ABAC puro que la ADR-003 rechazó explícitamente por ser «demasiado complejo de administrar para el personal de campaña».

### Las partes de un contrato

Alianza, Partido/Organización, Candidato, Campaña y Compartimento.

**Campaña asciende a parte contratante.** Su contrato por defecto con su matriz es total, y eso es lo que ahora significa para los datos el «hereda» de [users.md § Jerarquía organizativa](../spec/users.md#jerarquía-organizativa). Que sea un contrato y no un hecho estructural es lo que le permite a una campaña estrecharlo: el caso de la primaria contra un rival del propio partido.

**Las unidades suborganizativas siguen siendo ámbitos geográficos por ahora, pero el esquema no lo da por sentado.** La columna de la parte es polimórfica, así que una unidad como uno de los 78 comités municipales del PIP ([mvp.md § PIP — Partido Independentista Puertorriqueño](../spec/mvp.md#pip-partido-independentista-puertorriqueño)) puede convertirse más adelante en un nodo contratante sin ninguna migración. La estructura real del PIP es una tarea de descubrimiento ([mvp.md § PIP — Partido Independentista Puertorriqueño](../spec/mvp.md#pip-partido-independentista-puertorriqueño)), y comprometerse con maquinaria de subunidades antes de que ese descubrimiento aterrice sería especulativo. Comprometerse con un esquema que la cierre de antemano sería peor.

**Alternativas consideradas:** Se descartó por prematuro convertir de una vez a las subunidades en nodos contratantes. Se descartó restringir las partes a las entidades soberanas más los compartimentos porque deja sin representar el límite que existe dentro de una misma candidatura.

### Términos uniformes en cada peldaño

Unanimidad para ampliar una concesión; decisión unilateral para restringirla. Sin excepciones por peldaño.

- **La revocación nunca es silenciosa.** La contraparte ve quién cortó el acceso y cuándo.
- **La revocación corta el acceso continuo sin recuperar aquello sobre lo que ya se actuó**, generalizando la regla que ya existe en [users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza).
- **El estancamiento se mantiene como statu quo** y la plataforma nunca desempata, generalizando [mvp.md § 8. Qué cuesta lo «igualitario» en la arquitectura](../spec/mvp.md#8-qué-cuesta-lo-igualitario-en-la-arquitectura) desde la gobernanza de la alianza hasta todos los límites.

Esto admite un caso que unos valores por defecto distintos en cada peldaño habrían declarado ilegítimo por construcción: una campaña que se cierra frente a la matriz que la creó. Eso no es incoherente, es una primaria — y Puerto Rico tiene primarias en el ciclo del piloto ([mvp.md § 7. Fases](../spec/mvp.md#7-fases)).

**Alternativas consideradas:** Se descartaron los términos por defecto distintos en cada peldaño —unanimidad entre pares de una alianza, subordinación para matriz→campaña— porque meten en el modelo de acceso un juicio político sobre qué límites son legítimos, y porque cuestan el relato de confianza de una sola frase que hace que entrar sea seguro en cualquier peldaño.

### El aislamiento y el flujo son límites distintos

La restricción de [003-identity-access-organization.md § Consecuencias](003-identity-access-organization.md#consecuencias) confundía dos cosas. Esta ADR las separa.

**La organización sigue siendo el límite de aislamiento.** Base de datos propia, instancia de aplicación propia, llaves propias ([001-platform-architecture.md § Arquitectura de organización única con aislamiento por niveles](001-platform-architecture.md#arquitectura-de-organización-única-con-aislamiento-por-niveles)). Nada de la arquitectura de organización única cambia.

**La organización ya no es el ámbito de permisos más externo.** Los contratos rigen el flujo en los peldaños que están por encima (la alianza) y por debajo (la campaña, el compartimento). [003-identity-access-organization.md § Consecuencias](003-identity-access-organization.md#consecuencias) queda enmendada para leerse como una afirmación sobre aislamiento, no sobre permisos.

### Observabilidad: una distinción dentro de la escala de metadatos, no un peldaño nuevo

[security.md § Protección de metadatos](../spec/security.md#protección-de-metadatos) define dos niveles de protección de metadatos, Moderada y Agresiva. Los dos suprimen el registro de lecturas; ninguno lo activa. Colgar de esa escala la observabilidad de los compartimentos, tal como está escrita, no daría nada.

La escala protege los **metadatos de actividad** —el momento de los inicios de sesión, el grafo de comunicación, la geografía del trabajo de campo ([security.md § Protección de metadatos](../spec/security.md#protección-de-metadatos))— y minimizarlos defiende al movimiento del análisis de tráfico. Ese razonamiento es correcto y no cambia en ninguno de los dos niveles.

**Registrar los accesos a un registro compartimentado es otra cosa, apuntada a otra amenaza**: el Nivel 5, las amenazas internas ([security.md § Nivel 5: amenazas internas](../spec/security.md#nivel-5-amenazas-internas)). La escala actual funde las dos porque, antes de los compartimentos, no había ninguna clase de datos cuyo riesgo principal fuera que la leyera una persona con acceso legítimo.

Por lo tanto: **tanto Moderada como Agresiva siguen suprimiendo los metadatos de actividad, y las dos registran las lecturas de los registros compartimentados.** Es una propiedad de la clase de datos que se aplica de forma uniforme, no un ajuste por contrato: configurar la observabilidad contrato por contrato le pondría en las manos al personal de campaña un control cuyo mal uso construye exactamente el acervo de metadatos que la escala existe para evitar. Una organización que no quiere registro de lecturas no crea compartimentos.

Esto acota, no revierte, [security.md § Protección de metadatos](../spec/security.md#protección-de-metadatos), que siempre trató de los metadatos de actividad. Extiende [004-data-model-integrity.md § Registro de auditoría completo para todas las mutaciones de datos](004-data-model-integrity.md#registro-de-auditoría-completo-para-todas-las-mutaciones-de-datos) de las mutaciones a las lecturas, solo para los datos compartimentados. Y deja sin efecto [security.md § Acceso del equipo de GreenGrass](../spec/security.md#acceso-del-equipo-de-greengrass) para los datos bajo contrato: la plataforma no es parte de ningún contrato, así que no tiene vía de lectura, sin excepción para soporte ni depuración.

**Alternativas consideradas:** Se descartó la observabilidad como término de cada contrato por el riesgo de mal uso descrito arriba. Se descartó registrar todo cruce de límites en toda la plataforma porque revierte la escala de metadatos precisamente en los países que [geography.md § Relevancia del nivel de seguridad por país](../spec/geography.md#relevancia-del-nivel-de-seguridad-por-país) califica como más peligrosos.

### Los compartimentos son el peldaño más bajo, no una primitiva nueva

Un compartimento es un contrato cuyas partes son personas nombradas y no unidades organizativas. Los términos uniformes aplican sin excepción:

- **La creación es unilateral**, porque en el momento de crearlo hay una sola parte.
- **Crecer exige la unanimidad de los miembros actuales.** A nadie se lo agrega a un expediente a espaldas de un miembro que ya está.
- **La salida es unilateral**, y un miembro que deja la organización pierde la condición de parte, así que la rotación de personal ([press.md § Registro de interacciones con medios](../spec/press.md#registro-de-interacciones-con-medios)) no deja vetos tirados por ahí.

Dos propiedades que de otro modo habría que escribir como reglas a medida salen solas como consecuencias. Un Administrador de la organización que crea un compartimento es su primera parte y puede después **quitarse su propio acceso**, porque la restricción unilateral siempre está disponible: así, «el administrador puede otorgar pero no puede leer» queda derivado y no estipulado. Y el alcance de llave por compartimento se sigue de que el compartimento sea una parte: las llaves se acotan a los contratos, y el BYOK por organización de la [ADR-002](002-security-threat-model.md) pasa a ser el caso por defecto en vez del único.

### El esquema general es requisito antes de construir ALLY-005

[mvp.md § 4.1 Qué se construye](../spec/mvp.md#41-qué-se-construye) sitúa el contrato de intercambio como la pieza central del MVP para una alianza de dos partidos, construida en la Fase 2, de febrero a junio de 2027. Esa construcción decide ahora la forma de todo el modelo de confianza de la plataforma.

**El modelo de datos tiene que ser general —un contrato entre partes sobre recursos, con la referencia a la parte polimórfica— aunque el piloto solo ejercite el caso de la alianza.** La interfaz del piloto se queda exactamente tan angosta como especifica `spec/mvp.md`. Esquema general, interfaz angosta.

Es el mismo argumento que [mvp.md § 4.4 Lo que se conserva aunque parezca recortable](../spec/mvp.md#44-lo-que-se-conserva-aunque-parezca-recortable) ya hace con el BYOK: no puedes meterle cifrado a un fideicomiso de datos después de que los miembros ya subieron sus archivos. No puedes meterle generalidad a un contrato después de lanzarlo como funcionalidad de alianza.

## Consecuencias

**Beneficios:**
- Un mecanismo en lugar de dos, con una regla que dice cuándo aplica cada uno
- La relación partido↔candidato se vuelve expresable, y cierra un vacío donde la especificación afirmaba una soberanía que no daba manera de ejercer
- «Hereda» adquiere una definición para los datos, y una candidatura puede representar el límite de una primaria frente a su propio partido
- La compartimentación deja de ser una primitiva nueva que exige ingeniería aparte: la Iteración 4 de la hoja de ruta de inteligencia de comunicaciones pasa a ser configurar la escala en vez de construir una nueva
- Dos conflictos de larga data ([security.md § Protección de metadatos](../spec/security.md#protección-de-metadatos), [004-data-model-integrity.md § Registro de auditoría completo para todas las mutaciones de datos](004-data-model-integrity.md#registro-de-auditoría-completo-para-todas-las-mutaciones-de-datos)) se resuelven acotando y no revirtiendo, y dejan intacto el razonamiento original donde era correcto
- Costo cero para las campañas pequeñas, que nunca trazan un límite y nunca ven un contrato

**Costos:**
- Hacerlo cumplir es más difícil, no más fácil. [003-identity-access-organization.md § Consecuencias](003-identity-access-organization.md#consecuencias) ya advierte que el híbrido de RBAC y ámbitos exige hacerlo cumplir con cuidado en el servidor; un grafo de contratos convierte cada lectura en un recorrido, y un error es una fuga que cruza un límite
- El encuadre de solo alianza de [users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza) hay que reescribirlo como mecanismo general, y hay que enmendar la sección de restricciones de la ADR-003
- Ascender a Campaña a parte contratante agrega un tipo de nodo a un modelo que antes la trataba como un hecho estructural
- El registro de lecturas en los compartimentos crea un registro de accesos que es sensible en sí mismo, en organizaciones que pueden estar bajo vigilancia

**Restricciones:**
- La organización sigue siendo el límite de aislamiento; nada de esto permite bases de datos compartidas ni debilita la ADR-001
- El consentimiento de cada persona sigue prevaleciendo sobre los términos del contrato ([users.md § Intercambio entre organizaciones dentro de una alianza](../spec/users.md#intercambio-entre-organizaciones-dentro-de-una-alianza))
- La plataforma nunca es parte de un contrato y por lo tanto nunca desempata, generalizando [mvp.md § 8. Qué cuesta lo «igualitario» en la arquitectura](../spec/mvp.md#8-qué-cuesta-lo-igualitario-en-la-arquitectura)
- Los derechos iguales no igualan el poder de negociación ([mvp.md § 8. Qué cuesta lo «igualitario» en la arquitectura](../spec/mvp.md#8-qué-cuesta-lo-igualitario-en-la-arquitectura)). Una candidatura que revoca frente a su partido puede terminar perdiendo la nominación del partido. El contrato es una garantía técnica, no política, y nada en esta ADR cambia eso
- El modelo de datos de la Fase 2 de ALLY-005 tiene que ser general según la sección de arriba, o esta ADR se vuelve una migración en vez de una decisión

**ADR relacionados:** [ADR-001](001-platform-architecture.md) (modelo de federación, aislamiento por organización), [ADR-002](002-security-threat-model.md) (alcance de llave del BYOK), [ADR-003](003-identity-access-organization.md) (enmendada — modelo de permisos y la restricción del ámbito más externo), [ADR-004](004-data-model-integrity.md) (extendida — el registro de auditoría cubre las lecturas de los datos compartimentados), [ADR-016](016-cross-cutting-resolutions.md) (gobernanza de la alianza, propiedad de las campañas conjuntas)
