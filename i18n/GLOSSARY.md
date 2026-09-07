# Glosario de traducción — GreenGrass

Terminología canónica para la traducción al español de la documentación de GreenGrass.
Este archivo es el contrato: si un término aparece aquí, se traduce así en **todos** los
documentos. Cuando haga falta un término nuevo que se repita, añádelo aquí antes de usarlo.

El público es de Puerto Rico y América Latina. Español latinoamericano, no peninsular.
Registro directo y llano — el mismo que el inglés original, no el español administrativo.

## Reglas generales

- **Voseo y vosotros: nunca.** Segunda persona del plural = *ustedes*.
- **Tuteo por defecto** cuando hay que dirigirse a alguien. Nada de *usted* ceremonioso.
- **Sin pasivas burocráticas.** *Se procederá a configurar* → *configura* / *el sistema configura*.
- **Sin relleno.** Fuera *en aras de*, *a los efectos de*, *de conformidad con lo anteriormente expuesto*.
- **Vocabulario latinoamericano:** *computadora* (no *ordenador*), *celular* (no *móvil*),
  *manejar/gestionar* según contexto, *boleta* (no *papeleta*), *carro* (no *coche*).
- **Títulos en oración,** no en mayúsculas de título: *Diseño y localización*, no *Diseño Y Localización*.
- **Cada archivo empieza con un `# H1`.** Sin excepción — el generador del sitio lo necesita.

## Términos del producto — no se traducen

GreenGrass · NationBuilder · Action Network · Mobilize · WhatsApp · ATH Móvil · Venmo · Zelle
BYOK · passkey · Shamir · SMS · CRM · GOTV · webhook · API · token

**Notas de uso:**

- **passkey** — se mantiene en inglés; es el término técnico establecido. Género masculino: *el passkey*, *los passkeys*.
- **BYOK** — se mantiene la sigla. En la primera aparición de cada documento, glosarla:
  *BYOK (Bring Your Own Key — la organización controla su propia llave de cifrado)*.
- **GOTV** — se mantiene la sigla. Primera aparición por documento:
  *GOTV (Get Out The Vote — movilización del voto)*. Después, GOTV a secas.
- **CRM** — se mantiene. *el CRM*.

## Núcleo del dominio

| Inglés | Español | Nota |
|---|---|---|
| tenant | **organización** | Decidido. *Inquilino* es un calco inmobiliario que no dice nada; *arrendatario* es peor. Cuando el texto necesite distinguir la organización-como-unidad-de-facturación-y-aislamiento de la organización-como-grupo-de-personas, usar *organización cliente*. |
| tenancy | **la organización** / **el aislamiento por organización** | Según el sentido: unidad administrativa vs. propiedad de arquitectura. |
| single-tenant | **de organización única** | |
| multi-tenant | **multiorganización** | |
| campaign | **campaña** | |
| voter file | **padrón electoral** | Término estándar en PR y América Latina. |
| voter | **votante** | |
| constituent | **constituyente** | |
| supporter | **simpatizante** | No *seguidor* (redes sociales) ni *partidario* (más ideológico que operativo). |
| volunteer | **voluntario / voluntaria** | |
| donor | **donante** | |
| staff | **personal** / **equipo** | *Equipo* cuando se habla de las personas; *personal* en contexto de roles y permisos. |
| candidate | **candidato / candidata** | |
| alliance | **alianza** | |
| coalition | **coalición** | |
| jurisdiction | **jurisdicción** | |
| compliance | **cumplimiento** | Nunca *compliance*. |
| disclaimer | **aviso legal** | En contexto electoral: el texto obligatorio de atribución de pauta. |

## Trabajo de campo

| Inglés | Español | Nota |
|---|---|---|
| canvassing | **trabajo de campo** | Genérico. |
| to canvass | **hacer trabajo de campo** / **tocar puertas** | *Tocar puertas* cuando es específicamente puerta a puerta. Nunca *canvasear*. |
| door-knocking | **puerta a puerta** | |
| turf | **territorio** | La unidad geográfica asignada a un equipo. |
| walk list | **lista de recorrido** | |
| phone bank | **jornada de llamadas** | La actividad. *Banco de llamadas* para la herramienta si hace falta distinguir. |
| field mode | **modo de campo** | |
| field organizer | **organizador / organizadora de campo** | |
| script | **guion** | Sin tilde (RAE). El texto que lee quien hace contacto. |
| pledge | **compromiso de voto** | |
| turnout | **participación electoral** | |

## Datos

| Inglés | Español | Nota |
|---|---|---|
| data trust | **fideicomiso de datos** | Término consolidado; conserva la carga jurídica del inglés. |
| sharing contract | **contrato de intercambio** | |
| dedup / deduplication | **deduplicación** | Verbo: *deduplicar*. |
| merge (records) | **fusionar** | |
| record | **registro** | |
| contact | **contacto** | |
| segment | **segmento** | Verbo: *segmentar*. |
| tag | **etiqueta** | |
| import / export | **importación / exportación** | |
| audit trail | **registro de auditoría** | |
| event sourcing | **event sourcing** | Se mantiene; es un patrón de arquitectura con nombre propio. Glosarlo en la primera aparición: *event sourcing (el estado se deriva de un registro inmutable de eventos)*. |
| provenance | **procedencia** | |
| claims ledger | **libro de afirmaciones** | |
| dossier | **expediente** | |
| field-level | **a nivel de campo** | |
| default-deny | **denegación por defecto** | |

## Seguridad y acceso

| Inglés | Español | Nota |
|---|---|---|
| threat model | **modelo de amenazas** | |
| tier (isolation) | **nivel** | Los nombres de los niveles se traducen: Standard → **Estándar**, Enhanced → **Reforzado**, Maximum → **Máximo**, Self-hosted → **Autoalojado**. |
| encryption at rest / in transit | **cifrado en reposo / en tránsito** | *Cifrado*, nunca *encriptado*. |
| key | **llave** | En criptografía. *Clave* se reserva para contraseñas. |
| trusted contact | **contacto de confianza** | |
| duress | **coacción** | *Código de coacción*, *acceso bajo coacción*. |
| panic wipe | **borrado de emergencia** | |
| surveillance | **vigilancia** | |
| role | **rol** | |
| permission | **permiso** | |
| Organization Admin | **Administrador de la organización** | Los nombres de rol van en mayúscula inicial, como en inglés. |
| least privilege | **privilegio mínimo** | |
| session | **sesión** | |

## Comunicaciones y prensa

| Inglés | Español | Nota |
|---|---|---|
| outreach | **alcance** / **contacto** | Según contexto; evitar el calco *outreach*. |
| messaging | **mensajería** | El sistema. Cuando significa *el mensaje político*, usar **discurso** o **encuadre**. |
| broadcast | **difusión** | |
| opt-in / opt-out | **consentimiento expreso / baja** | Verbos: *dar de alta* / *darse de baja*. |
| press release | **comunicado de prensa** | |
| embargo | **embargo informativo** | Para no confundir con el embargo comercial o judicial. |
| endorsement | **respaldo** | |
| rapid response | **respuesta rápida** | |
| escalation | **escalamiento** | |
| talking points | **puntos de mensaje** | |

## Producto y plataforma

| Inglés | Español | Nota |
|---|---|---|
| offline-first | **con prioridad sin conexión** | En la primera aparición de cada documento: *diseñado para funcionar sin conexión primero (offline-first)*. Después, la forma en español. |
| offline | **sin conexión** | |
| sync | **sincronización** | |
| low-bandwidth | **de bajo ancho de banda** | |
| onboarding | **incorporación** | Para personas (voluntarios, personal). |
| onboarding (tenant setup) | **puesta en marcha** | Para organizaciones nuevas. |
| wizard | **asistente** | |
| dashboard | **panel** | |
| feature | **funcionalidad** | Nunca *feature* ni *característica*. |
| workflow | **flujo de trabajo** | |
| screen | **pantalla** | |
| wireframe | **wireframe** | Se mantiene; término de oficio. |
| stakeholder | **parte interesada** | |
| rollout | **despliegue** | |
| pilot | **piloto** | |
| Global South | **Sur Global** | Ambas en mayúscula. |
| grassroots | **de base** | *Campañas de base*, *organización de base*. Nunca *raíces de hierba*. |
| fundraising | **recaudación de fondos** | |
| processing fee | **cargo por procesamiento** | |
| recurring donation | **donación recurrente** | |

---

# Términos añadidos durante la traducción de `spec/`

Estos surgieron al traducir los 14 documentos. Están en uso y son vinculantes igual
que los de arriba. Donde dos traducciones chocaron, la forma elegida se marca y se
explica por qué.

## Reglas resueltas

- **Nombres de rol: mayúscula solo en la primera palabra.** *Director de campo*, no
  *Director de Campo*. Se normalizaron todos los archivos.
- **`REVISIT:` y `DECIDED:`** — `REVISIT:` se deja en inglés dentro de los comentarios
  HTML (es un marcador que se busca con grep); su prosa sí se traduce. `DECIDED:` sí se
  traduce, como **DECIDIDO:**.
- **Citas textuales entre documentos.** Cuando un documento cita a otro entre comillas o
  en blockquote, la cita debe copiarse **literalmente** de la traducción del documento
  citado, no traducirse otra vez. Si cambia el original, hay que actualizar la cita.
- **Meses abreviados en tablas:** minúscula y con punto (*sep.*, *oct.*, *ene.*).

## Roles

| Inglés | Español |
|---|---|
| Campaign Manager | **Gerente de campaña** |
| Communications Director | **Director de comunicaciones** |
| Finance Director | **Director de finanzas** |
| Field Director | **Director de campo** |
| Policy Director | **Director de política** |
| Volunteer Coordinator | **Coordinador de voluntarios** |
| Transport Coordinator | **Coordinador de transporte** |
| Data Manager | **Gestor de datos** (no *Gerente de datos*) |
| Team Leader | **Líder de equipo** |
| Platform Admin | **Administrador de la plataforma** |
| Alliance Admin | **Administrador de la alianza** |
| Alliance Steward | **Custodio de la alianza** |
| Deputy (plantilla de rol) | **Adjunto** — es un segundo al mando permanente, no un sustituto ocasional; por eso no *Suplente*. |
| Staff (categoría) | **Personal** |

## Conceptos de producto y método

| Inglés | Español | Nota |
|---|---|---|
| gate (decision gate, MVP gate) | **punto de decisión** | Elegido sobre *punto de control*. En el sentido verbal (*cheap ones gate expensive ones*) se reformula: *que las baratas condicionen a las caras*. |
| war room | **centro de mando** | Elegido sobre *sala de operaciones*. |
| load-bearing (assumption) | **estructural** | *supuesto estructural* |
| falsifiable claim / to falsify | **afirmación falsable** / **refutar** | |
| counterfactual | **contrafactual** | |
| kill criteria | **criterios de cancelación** | |
| pass bar | **umbral de aprobación** | |
| stretch goal | **objetivo secundario** | |
| readiness interview | **entrevista de preparación** | |
| Wizard-of-Oz (método) | **Mago de Oz** | |
| roadmap | **hoja de ruta** | |
| free-riding | **aprovecharse sin aportar** | Frase verbal; no hay sustantivo limpio. |
| primitive (n.) | **primitiva** | *primitiva de confianza*, *primitiva de coordinación* |
| moat | **la ventaja más defendible** | No *foso*. |
| mobile-first | **prioridad móvil** | |
| provisioning | **aprovisionamiento** | |
| scope (permisos) / unscoped | **ámbito** / **sin ámbito** | |
| sovereign tenant | **organización soberana** | |
| omni-list | **lista única** | |
| advocacy | **incidencia** | *organización de incidencia* |
| astroturfing | *astroturfing* | Se mantiene. |

## Datos y análisis

| Inglés | Español |
|---|---|
| mutual suppression / suppression list | **supresión mutua** / **lista de supresión** |
| blind index | **índice ciego** |
| contribution ledger | **libro de contribuciones** |
| overlap | **solapamiento** (no *traslape*) |
| match / match rate | **cruce** / **tasa de coincidencia** |
| data wrangling | **limpieza y preparación de datos** |
| data residency / data sovereignty | **residencia de datos** / **soberanía de datos** |
| bounce | **rebote** |
| churn (donantes) | **fuga de donantes** |

## Seguridad

| Inglés | Español | Nota |
|---|---|---|
| threat actor | **actor de amenaza** | Los niveles de amenaza son *Nivel 1..5*. |
| metadata protection tier | **nivel de protección de metadatos** | Ojo: eje distinto al de aislamiento. Sus valores son *moderado* y **agresivo**, y no se confunden con Estándar/Reforzado/Máximo/Autoalojado. |
| blast radius | **radio de impacto** |
| defense in depth | **defensa en profundidad** |
| key escrow | **custodia de llaves** |
| envelope key | **llave de sobre** |
| forward secrecy | **secreto hacia adelante** | Glosar en inglés la primera vez. |
| post-compromise security | **seguridad tras compromiso** |
| duress mode / decoy view | **modo de coacción** / **vista señuelo** |
| device attestation | **atestación de dispositivo** |
| rate limiting | **limitación de frecuencia** |
| gag order | **orden de confidencialidad** |
| air-gapped machine | **máquina aislada de la red** |
| warrant canary, domain fronting, credential stuffing | *se mantienen en inglés* | Términos de oficio sin equivalente asentado. |
| opt-in (modo arquitectónico) | **opcional** + decir quién lo activa | Distinto del *consentimiento expreso* de comunicaciones. |

## Cumplimiento y legal

| Inglés | Español |
|---|---|
| data controller / processor / sub-processor | **responsable / encargado / subencargado del tratamiento** |
| data subject | **interesado** |
| legal basis | **base jurídica** |
| retention | **conservación** |
| right to erasure | **derecho de supresión** |
| subject-access request | **solicitud de acceso del titular** |
| DPA / DPIA / DPO / SCCs | **Acuerdo de tratamiento de datos (DPA)** / **Evaluación de impacto (DPIA)** / **delegado de protección de datos (DPO)** / **Cláusulas contractuales tipo (SCC)** |
| campaign finance | **financiamiento de campañas** (no *financiación*) |
| disclosure (finanzas de campaña) | **declaración** |
| incorporation jurisdiction | **jurisdicción de constitución** |
| lawful interception | **interceptación legal** |

Los nombres de regímenes legales (GDPR, LGPD, PDPA, DPDPA, FCRA, CAN-SPAM, TCPA,
Marco Civil da Internet…) y el texto legalmente obligatorio (*"Paid for by…"*) se
mantienen en el idioma original.

## Recaudación de fondos

| Inglés | Español | Nota |
|---|---|---|
| pledge (donación) | **promesa de donación** | Distinto de *compromiso de voto*, que es el sentido de campo. |
| contribution limit | **límite de contribución** |
| disbursement | **desembolso** |
| settlement | **liquidación** |
| refund | **reembolso** |
| split (entre organizaciones) | **reparto** |
| matching gifts | **donaciones pareadas por empleadores** |
| reconciliation | **conciliación** |
| chain of custody | **cadena de custodia** |

## Operaciones de campo y día de elecciones

| Inglés | Español | Nota |
|---|---|---|
| shift | **turno** |
| check in | **registrar la entrada** |
| roster | **lista del equipo** |
| volunteer pool | **bolsa de voluntarios** |
| RSVP | **confirmación de asistencia** |
| debrief | **balance del turno** |
| support score | **puntaje de apoyo** |
| poll watcher | **observador / observadora electoral** |
| polling location / booth | **centro de votación** / **mesa de votación** |
| precinct | **precinto** |
| constituency | **circunscripción** |
| early / absentee voting | **voto adelantado** / **voto ausente** |
| rides to polls | **transporte a las urnas** |
| chase calls | **llamadas de seguimiento** |
| staging location | **punto de concentración** |
| quiet period / silence period | **veda electoral** |
| voter registration | **inscripción de votantes** |
| training | **capacitación** |
| election protection | **protección electoral** |
| fallback | **recurso / alternativa de reserva** | No *respaldo*, reservado para *endorsement*. |

## Comunicaciones, prensa e inteligencia

| Inglés | Español | Nota |
|---|---|---|
| earned media | **medios ganados** | Glosar en la primera aparición: *—la cobertura que no se paga—*. |
| outlet | **medio** |
| beat (periodismo) | **fuente** | En `comms-intelligence.md`, donde *fuente* ya significa *source*, se usa **área temática**. |
| sentiment (cobertura) | **tono** | No *sentimiento*. |
| pitch | **propuesta** |
| media advisory / media kit | **aviso a medios** / **kit de prensa** |
| boilerplate | **texto institucional** |
| spokesperson | **vocero / vocera** |
| endorser | **quien respalda** |
| press pool | **grupo de prensa** |
| media monitoring | **monitoreo de medios** | LatAm: *monitoreo*, no *monitorización*. |
| comms / media intelligence | **inteligencia de comunicaciones / de medios** |
| fact check | **verificación de datos** |
| candidate vetting | **investigación de antecedentes de candidaturas** | Deliberadamente no *escrutinio*: en un producto electoral eso significa el conteo de votos. |
| opposition research | **investigación de la oposición** |
| dossier store | **almacén de expedientes** |
| actor graph / media map | **grafo de actores** / **mapa de medios** |
| compartmented / compartmentation | **compartimentado** / **compartimentación** |
| scraping | **extracción automática** |
| read logging | **registro de lecturas** |
| threading / thread | **hilos** / **hilo** |
| read / delivery receipts | **confirmaciones de lectura / de entrega** |
| quiet hours / Do Not Disturb | **horas de silencio** / **No molestar** |
| drip sequence | **secuencia escalonada** |
| wave (comms) | **oleada** |

---

# Términos añadidos para `design/architecture/`, `decisions/` y `design/ux/`

Acuñados al preparar la traducción de la arquitectura, los 18 ADR y los 15 documentos
de diseño de UX que no son wireframes. Vinculantes igual que los de arriba. Cuando dos
lecturas del corpus propusieron palabras distintas para lo mismo, aquí está la que ganó
y por qué: esa discusión no se vuelve a abrir archivo por archivo.

## Reglas resueltas

- **`DECISION NEEDED:`** se trata como `REVISIT:` — el marcador queda en inglés porque se
  busca con grep, y la prosa que lo sigue se traduce.
- **Los nombres de pantalla se consultan, no se acuñan.** La forma canónica en español de
  la pantalla `AREA-NNN` es la que diga la columna *Pantalla* de
  `i18n/es/design/ux/01-information-architecture/screen-inventory.md`. Si un documento
  nombra una pantalla, se copia de ahí. Si aparece sin su ID, se busca por el nombre en
  inglés. Son 236 pantallas: nadie las reinventa.
- **Las abreviaturas de perfil (`OA CD FD FiD VC DM V TL C S`) son identificadores y
  quedan en inglés.** No hay esquema limpio en español —*Director de comunicaciones* y
  *Director de campo* dan las dos `DC`; *Director de finanzas* y *Director de campo* dan
  las dos `DF`— y los 23 documentos de wireframes, que siguen en inglés, usan `FiD`
  68 veces. `FiD` va en mayúscula y minúscula a propósito, para distinguirse de `FD`: no
  se "normaliza". Se glosa una vez por documento —*el OA (Org Admin, el Administrador de
  la organización)*— y después se usa suelta. Plural: *los OA*, no *los OAs*. Lo que **no**
  es un código de dos letras en esas columnas sí es prosa y se traduce: `Public` →
  *Público*, `All authenticated` → *Toda persona autenticada*, `All staff` → *Todo el
  personal*.
- **Los diagramas de caja se traducen y se vuelven a alinear.** El español corre entre un
  15 % y un 25 % más largo que el inglés, así que traducir una etiqueta dentro de un
  `┌─┐│└┘` sin recalcular el ancho rompe el marco. Se traduce el bloque entero y se
  reajustan los bordes, nunca fila por fila. Las etiquetas que son identificadores
  —nombres de componente, de token, de ruta, de tecnología— no se traducen y por eso
  muchas cajas de arquitectura casi no cambian. Los diagramas de árbol (`├── └──`) no
  tienen marco y se pueden alargar sin romperse, pero su contenido suele ser código.
- **Los valores de enumeración dentro de los bloques del modelo de datos son cadenas de
  base de datos.** `voter | donor | volunteer | supporter`, `draft | ai_generated |
  human_reviewed | published`, `spoke | not_home | refused | moved`, `standard | enhanced
  | maximum | self_hosted`. Son las mismas palabras que en la prosa sí se traducen, y ahí
  está la trampa.
- **La numeración `#N:` de la ADR-016 no se toca.** Son 81 encabezados numerados del 1 al
  89 con huecos en 14, 21, 27, 31, 32, 51, 52 y 84, y esa aritmética sostiene la
  afirmación final del documento. La lista del Apéndice A de `04-wireframes/audit.md` es
  posicional y se queda en inglés: `#N` es lo único que une los dos documentos. No se
  localiza (*N.º 5*), no se reordena, no se rellenan los huecos. La flecha `→` que separa
  las dos mitades de cada encabezado se conserva con sus espacios.
- **Las incoherencias del inglés se traducen tal cual y se marcan `REVISIT:`, no se
  arreglan.** Hay al menos tres: la ADR-002 mezcla el eje de protección de metadatos con
  el de aislamiento; la ADR-006 dice 48 px en un encabezado y 56 px en el cuerpo; la
  ADR-016 lista tres funcionalidades pilares en una tabla y cuatro en las consecuencias.
  Un traductor cuidadoso las "corrige" y crea una divergencia EN/ES que ninguna
  verificación estructural detecta.
- **Orden de traducción.** La ADR-017 cita literalmente a la ADR-003 y a la ADR-004, así
  que esas dos se traducen antes. El glosario en documento de `00-overview.md` copia sus
  definiciones de este archivo, no las reescribe: ahí fue donde nació el conflicto
  *centro de mando* / *sala de operaciones*.
- **`ATH Movil` sin tilde es un error del original.** En español va **ATH Móvil**, en los
  dos sitios donde aparece.
- **`global south` en minúscula es un descuido del original.** Va **Sur Global**, siempre.

## Encabezados y rótulos que se repiten

Una quinta parte de los encabezados del lote son quince cadenas que se repiten. Un
encabezado mal traducido es invisible dentro de un archivo y saltón en la barra lateral
del sitio, y además arrastra un ancla. Se fijan aquí y no se vuelven a decidir.

| Inglés | Español |
|---|---|
| Context / Decision / Consequences | **Contexto** / **Decisión** / **Consecuencias** |
| `**Status:** Accepted` | `**Estado:** Aceptada` |
| `**Date:**` / `**Sources:**` | `**Fecha:**` / `**Fuentes:**` |
| `**Alternatives considered:**` | `**Alternativas consideradas:**` |
| `**Benefits:**` / `**Costs:**` / `**Constraints:**` | `**Beneficios:**` / `**Costos:**` / `**Restricciones:**` |
| `**Related ADRs:**` | `**ADR relacionados:**` |
| Purpose | **Propósito** |
| Where It Appears | **Dónde aparece** |
| Behaviors / Common Behaviors | **Comportamientos** / **Comportamientos comunes** |
| Open Questions | **Preguntas abiertas** |
| Home Screen | **Pantalla de inicio** |
| Sidebar Sections | **Secciones de la barra lateral** |
| Mobile Experience / Mobile Variant | **Experiencia en móvil** / **Variante móvil** |
| What They Don't See | **Lo que no ven** |
| Anatomy / Rationale | **Anatomía** / **Fundamento** |
| In scope: / Out of scope: / Deferred: | **Dentro del alcance:** / **Fuera del alcance:** / **Aplazado:** |
| Notes / Action / Trigger / Example / Mechanism | **Notas** / **Acción** / **Disparador** / **Ejemplo** / **Mecanismo** |
| Blocking? / Deletable? | **¿Bloquea?** / **¿Se puede borrar?** |

Las fechas de los ADR se quedan en formato ISO (`2026-03-03`): son metadatos, no prosa,
y la regla de meses abreviados no les aplica. `ADR-001`…`ADR-017` y las referencias con
`§` tampoco cambian. *ADR* es masculino —*el ADR-004*, *los ADR relacionados*— porque es
un *registro* de decisión de arquitectura, como ya dice la portada en español.

## Sistemas distribuidos, eventos y sincronización

| Inglés | Español | Nota |
|---|---|---|
| event log / event store / event stream | **registro de eventos** / **almacén de eventos** / **flujo de eventos** | Tres cosas distintas. *Registro de eventos* choca de vista con *registro de auditoría*, pero el original ya explica que aquí son lo mismo: la colisión viene de arriba y se conserva. |
| append-only | **de solo adición** | Nunca se modifica ni se borra: solo se añade al final. |
| event replay / to replay | **reproducción de eventos** / **reproducir** | No *repetición*: no se repite nada, se vuelve a aplicar la secuencia para reconstruir el estado. |
| materialized view | **vista materializada** | Término de base de datos con nombre propio. No parafrasear como *vista precalculada*. |
| idempotency / idempotent | **idempotencia** / **idempotente** | Es una garantía del protocolo, no una cualidad vaga: reenviar el mismo evento no cambia nada. |
| last-write-wins | **gana la última escritura** | Frase fija; también *gana el servidor* y *gana el cliente*. No *el último gana*, que suena a juego. |
| merge-and-flag / suggest-and-confirm | **fusionar y marcar** / **sugerir y confirmar** | Nombres propios de dos políticas de resolución. Siempre idénticos. |
| to flag / flagged | **marcar** / **marcado** | Deliberadamente no *etiquetar*: *etiqueta* ya es `tag`. Un registro marcado espera revisión humana; una etiqueta la pone una persona. |
| to unmerge | **deshacer la fusión** | No *desfusionar*. |
| fuzzy matching | **cruce aproximado** | Coherente con `match → cruce`. No *coincidencia difusa*. |
| confidence threshold | **umbral de confianza** | Distinto del *umbral de aprobación*, que es un criterio humano; este es un número del motor de deduplicación. |
| eventual consistency | **consistencia eventual** | Término asentado. No *coherencia final*. |
| read replica / replication lag | **réplica de lectura** / **retraso de replicación** | No *demora*, que en América Latina suena a incumplimiento. |
| failover | **conmutación ante fallos** | No *tolerancia a fallos*, que es otra cosa. No se deja en inglés. |
| checkpoint (sincronización) | **punto de control** | Queda libre porque el glosario descartó *punto de control* para `gate`. El *checkpoint* pedagógico de la ADR-014 es otra cosa: **verificación de conocimiento**. |
| snapshot | **instantánea** | No *captura* ni *copia*. |
| backup | **copia de seguridad** | Deliberadamente no *respaldo*, reservado para `endorsement`. Mismo razonamiento que la nota de `fallback`. |
| queue / to queue | **cola** / **quedar en cola** | No *fila*: en América Latina la fila es de personas. El verbo es *quedan en cola*, no *hacen fila*. Hay al menos cinco colas distintas en el corpus y todas son *cola de …*. |
| pending changes queue | **cola de cambios pendientes** | El documento dice *Pending Changes Queue*, no *sync queue*. Se traduce lo que dice. |
| cache / cached | **caché** / **en caché** | Femenino, de *memoria caché*: *la caché*, *la capa de caché*. No *memoria oculta*. |
| stale / stale data | **desactualizado** / **datos desactualizados** | Da nombre a un estado: *Connected (stale)* → **Conectado (desactualizado)**. No *obsoleto*, que es `deprecated`; no *rancio*. |
| data freshness / freshness indicator | **actualidad de los datos** / **indicador de actualidad** | No *frescura*: en español la frescura es de los alimentos. No *vigencia*, que es jurídico. |
| conflict resolution | **resolución de conflictos** | Los tres botones del panel: *Keep Mine / Keep Theirs / Both* → **Quedarme con la mía / Quedarme con la suya / Ambas**. |
| downtime | **tiempo de inactividad** | No *caída*, que implica falla; aquí es una interrupción planificada que precisamente no ocurre. |
| batch | **por lotes** | *Canal por lotes*, *procesamiento por lotes*, frente al de tiempo real. |

## Infraestructura y despliegue

| Inglés | Español | Nota |
|---|---|---|
| deployment | **despliegue** | El glosario ya fija `rollout → despliegue` y las dos palabras convergen aquí. Es deliberado: en el original son casi sinónimas. Cuando la frase necesita distinguir el plan de la instancia desplegada, la instancia es una **instalación** (*instalaciones autoalojadas*). |
| cluster | **clúster** | Con tilde. No *grupo*, que se confunde con equipos de personas. |
| node pool | **grupo de nodos** | El nivel Reforzado se define exactamente por esto; si se traduce mal, deja de distinguirse del Estándar. |
| namespace | **espacio de nombres** | |
| container orchestration | **orquestación de contenedores** | |
| cloud account | **cuenta de proveedor de nube** | *Cuenta de nube* a secas se lee como una cuenta de almacenamiento personal. |
| -agnostic (cloud-, provider-, client-) | **independiente de…** | Nunca *agnóstico*: además de calco, es ruido en un producto que opera en contextos religiosamente sensibles. |
| object storage | **almacenamiento de objetos** | |
| adapter / adapter layer / adapter slot | **adaptador** / **capa de adaptadores** / **punto de conexión para adaptadores** | Es el patrón estructural de todo el sistema: pagos, comunicaciones, IA, integraciones, datos electorales. El *adapter slot* es una ranura prevista pero todavía vacía. |
| integration hub | **centro de integraciones** | No se deja *hub*. |
| pipeline | **cadena de procesamiento** | En el sentido comercial (*endorsement pipeline*) es **flujo de respaldos**. No usar *flujo de trabajo* para el sentido técnico: eso ya es `workflow`. |
| rollback / to roll back | **reversión** / **revertir** | No *retroceso*. |
| maintenance window | **ventana de mantenimiento** | |
| window (temporal, genérico) | **ventana** | *Ventana de respuesta*, *de silencio*, *de reembolso*, *de envío*. Una sola palabra para todas: si alterna con *plazo* y *período*, se pierde que son el mismo mecanismo. |
| cooling-off period | **período de espera** | Es fricción deliberada, no un trámite. No *enfriamiento*. |
| health check | **verificación de estado** | No *chequeo de salud*. |
| graceful degradation | **degradación controlada** | Nunca *degradación elegante*. |
| hydration / progressive enhancement | **hidratación** / **mejora progresiva** | |
| server-side rendering (SSR) | **renderizado en el servidor (SSR)** | |
| service worker | **service worker** | Se mantiene, masculino. |
| IP warm-up | **calentamiento de IP** | Jerga de entregabilidad. No *precalentamiento*. |
| deliverability | **entregabilidad** | Término del oficio. No *capacidad de entrega*, que se confunde con el volumen de envío. |
| federation layer / federated identity | **capa de federación** / **identidad federada** | |
| human in the loop | **intervención humana** | *Sin intervención humana*. No *humano en el bucle*. |
| vendor lock-in | **dependencia del proveedor** | No se deja *lock-in*, no *cautiverio*. |
| map tile | **tesela de mapa** | Nunca *azulejo* ni *baldosa*. |
| geocoding / routing engine | **geocodificación** / **motor de cálculo de rutas** | El *routing* de mapas no es el `channel router`, que es el **enrutador de canales**. |
| API key | **llave de API** | Ni contraseña ni llave criptográfica, pero se alinea con la regla existente `key → llave`. |
| rate limit (sustantivo, API) | **límite de solicitudes** | El proceso sigue siendo *limitación de frecuencia*, que ya está fijado. |
| frequency cap | **tope de frecuencia** | Deliberadamente distinto del anterior: lo configura el AO, no la infraestructura. Si los dos se llaman "frecuencia", la sección de orquestación entre canales se vuelve ilegible. |
| lazy loading / code splitting | **carga diferida** / **división de código** | |
| bundle | **paquete** | |
| performance budget | **presupuesto de rendimiento** | |

## Confianza, contratos y compartimentos

| Inglés | Español | Nota |
|---|---|---|
| party (de un contrato) | **parte** | Trampa mayor: en el mismo documento *Party* también es **partido político**, y las dos acepciones aparecen con tres líneas de distancia. Traducirlo todo como *parte* borra al partido; traducirlo todo como *partido* rompe el ADR entero. |
| counterparty | **contraparte** | Quien está del otro lado del contrato, no un adversario político. |
| to contract (verbo) | **restringir** | *Unanimidad para ampliar una concesión; decisión unilateral para restringirla.* En un documento sobre contratos, el verbo *to contract* significa lo contrario de lo que parece. |
| compartment | **compartimento** | No *compartimiento*, para que cuadre con *compartimentado* y *compartimentación*, ya fijados. |
| rung / ladder | **peldaño** / **escala** | Es la metáfora estructural de la ADR-017. Si se disuelve en *nivel*, choca con `tier` y el argumento deja de leerse. |
| grant (n.) / to grant | **concesión** / **otorgar** | Nunca *subvención*: en un producto de recaudación de fondos eso es dinero de una fundación. |
| to revoke / revocation | **revocar** / **revocación** | *La revocación nunca es silenciosa.* No *anular* ni *retirar*. |
| unanimity / unilateral | **unanimidad** / **unilateral** | |
| deadlock | **estancamiento** | No *interbloqueo* (informático) ni *bloqueo*, que se confunde con bloquear el acceso. |
| tiebreaker | *(se reformula)* | **La plataforma nunca desempata.** No hay sustantivo limpio, y *árbitro* introduce una autoridad que el ADR niega expresamente. |
| standing (to lose standing) | **la condición de parte** | Es un concepto jurídico —el derecho a participar en el contrato—, no *posición* ni *reputación*. |
| boundary | **límite** | No *frontera*, que arrastra connotación geopolítica en un producto que además habla de países de verdad. |
| observability | **observabilidad** | |
| insider threat / insider | **amenaza interna** / **persona con acceso legítimo** | El punto entero es que no es un intruso; *interno* a secas se pierde. |
| footgun | *(se reformula)* | **El riesgo de mal uso descrito arriba.** Cualquier calco rompe el registro. |
| leverage (negociación) | **poder de negociación** | Nunca *apalancamiento*, que es financiero. |
| candidacy | **candidatura** | El ADR-017 distingue sistemáticamente la *candidate* (la persona) de la *candidacy* (la campaña como entidad soberana). Hay que mantener las dos. |
| to be deselected | *(se reformula)* | **Perder la nominación del partido.** Término del sistema británico sin verbo equivalente. No *deseleccionado*. |
| supersedes | **deja sin efecto** | Convención de los ADR. Importa que la decisión anterior queda anulada, no sustituida por algo equivalente. |
| compelled / compulsion (legal) | **verse obligado por vía legal** / **requerimiento legal** | Nunca *coacción*: eso ya es `duress`, y confundirlos borra la diferencia entre una orden judicial y una pistola en la sien. |
| assume-breach | **arquitectura que da por hecho el compromiso** | Coherente con *seguridad tras compromiso*, ya fijado. |
| chilling effect | **efecto inhibidor** | No *efecto escalofriante*. |
| lèse-majesté | **lesa majestad** | Existe en español jurídico. Se glosa la primera vez: es un delito penal grave en Tailandia. |

## Estructura de navegación

| Inglés | Español | Nota |
|---|---|---|
| shell / navigation shell | **marco** / **marco de navegación** | También *marco de modo de campo*, *marco del asistente*, *marco del portal*. No *caparazón*, no *estructura* —`load-bearing` ya es *estructural* y chocarían en el mismo párrafo—, no *shell*. |
| universal chrome | **elementos permanentes de la interfaz** | Forma corta después de la primera aparición: *los elementos permanentes*. No *cromo*: en español eso es el metal o el navegador. Tampoco *elementos universales*, que se lee como "estándar de la industria" y no como "están siempre". |
| persona (arquetipo de usuario) | **arquetipo (de usuario)** | No *persona*: la traducción publicada satura esa palabra con su sentido corriente —*«personas que inician sesión»*, *«los datos viajan con la persona»*— y estos documentos ponen las dos acepciones en la misma oración. Tampoco *perfil*: `profile` ya es **perfil**, y la columna quedaría encabezada *Perfiles* justo encima de la fila `PROF-001 | Perfil personal`. El original da la salida al definir la persona como *«archetypal users»*. El archivo sigue llamándose `persona-views.md`. |
| settings / setting / configuration | **ajustes** / **ajuste** / **configuración** | El inglés ya distingue las tres y el inventario de pantallas lo respeta: `Settings` es el área y la sección de la barra lateral (*Ajustes y administración*, *Ajustes de seguridad*, *Centro de ajustes*), un `setting` suelto es un **ajuste**, y `Configuration` es una pantalla concreta (*Configuración de cumplimiento*, *Configuración del dominio de correo*). Sin el desdoblamiento sale *«la configuración de la configuración»*. |
| role template | **plantilla de rol** | Ya aparece dentro de este glosario, en la nota de `Deputy`, y tres veces en `spec/users.md`: se formaliza, no se decide. |
| sidebar | **barra lateral** | |
| header bar / top bar | **barra superior** | El original alterna las dos formas para el mismo elemento; el español usa una. |
| bottom tab bar | **barra de pestañas inferior** | No *tabs*, no *solapas*. |
| detail panel | **panel de detalle** | Nunca acortado a *panel*: `dashboard` ya es **panel**, así que *panel* a secas siempre significa el tablero. |
| drawer | **panel lateral** | Tres cosas distintas que el original distingue con cuidado: el *drawer* entra desde un borde y se cierra, el *panel de detalle* vive dentro de la maquetación de escritorio, la *barra lateral* es navegación permanente. |
| notification drawer | **bandeja de notificaciones** | Ya publicado así en `spec/messaging.md`. |
| split view | **vista dividida** | |
| breadcrumb | **ruta de navegación** | No *migas de pan*: es folclore de traducción, no lenguaje de producto. |
| layout group | **layout group** *(no se traduce)* | Concepto de SvelteKit atado a nombres literales del código —`(public)`, `(auth)`, `(app)`, `(field-mode)`, `(portal)`, `(wizard)`, `+layout.svelte`—. Glosa en la primera aparición de cada documento: *layout group (grupo de rutas que comparten un marco, sin afectar la URL)*. |
| layout (general) | **maquetación** / **disposición** | *Maquetación* cuando es el oficio (*la maquetación se rompe*); *disposición* cuando es el arreglo concreto de una pantalla. |
| layout shift | **saltos de maquetación** | Nada de *turno*, que ya es `shift`. |
| full-screen takeover | **pantalla completa exclusiva** | En forma verbal se reformula: *el modo de campo se apodera de toda la pantalla*. |
| sticky header | **encabezado fijo** | |

## Sistema de diseño

| Inglés | Español | Nota |
|---|---|---|
| design token | **token de diseño** | `token` ya está entre los términos que no se traducen. Masculino. Los **nombres** de token (`--space-4`, `--color-surface-raised`) nunca se traducen. |
| primitive palette / Primitives | **paleta primitiva** / **Primitivas** | Se reutiliza `primitive → primitiva`, ya fijado en sentido conceptual: es la misma metáfora, y una segunda palabra solo abre la puerta a una tercera. |
| semantic token / semantic color | **token semántico** / **color semántico** | |
| surface | **superficie** | El verbo inglés *to surface* no es esto: es **mostrar** o **destacar**. Nunca *superficializa*. |
| elevation | **elevación** | La profundidad de sombra que comunica qué está encima de qué. No *relieve* ni *altura*. |
| type scale / line height | **escala tipográfica** / **interlineado** | No *altura de línea*. |
| contrast ratio | **relación de contraste** | Las cifras van tal cual: *4.5:1*, *3:1*. No *tasa* ni *ratio*. |
| hue | **matiz** | Deliberadamente no *tono*: el glosario reserva *tono* para el `sentiment` de la cobertura de prensa. |
| grid (maquetación) | **cuadrícula** | *Cuadrícula de 12 columnas*. No *grilla* ni *rejilla*. `CSS grid` y `Layout/Grid` se quedan. |
| column gap | **separación entre columnas** | El corpus nunca dice *gutter*; dice *column gap*. |
| padding / margin / radius | **relleno** / **margen** / **radio** | Los nombres de propiedad CSS y los tokens `--radius-*` no se tocan. |
| card | **tarjeta** | No *ficha*: eso sugiere registro de datos, y ya es la `door card`. |
| overlay / backdrop | **superposición** / **fondo de la superposición** | No *capa*, reservada para las capas del sistema de color. |
| modal | **ventana modal** | Primera aparición completa; después *modal* (m.) a secas. |
| bottom sheet | **hoja inferior** | No *ficha*, no *sábana*. |
| dropdown | **desplegable** | Masculino. *Menú desplegable* cuando haga falta desambiguar de una lista. |
| popover / tooltip | **globo contextual** / **globo de ayuda** | *Globo de ayuda* ya está publicado en `spec/support.md`. Son familia: el popover lleva contenido, no solo texto. |
| toast | **aviso emergente** | Ya publicado así en `spec/messaging.md`. No *tostada*; tampoco *notificación emergente*, que choca con `push notification`. |
| snackbar / banner | **snackbar** / **banner** | Los dos se mantienen, masculinos. *Snackbar* aparece una sola vez, junto a *toasts*, y traducirlo borraría la distinción que esa línea hace. |
| skeleton / spinner | **esqueleto de carga** / **indicador de carga** | Los componentes `Skeleton` y `Spinner` no se traducen. |
| progress bar / divider / avatar | **barra de progreso** / **separador** / **avatar** | |
| step indicator | **indicador de pasos** | |
| command palette | **paleta de comandos** | |
| focus ring | **anillo de foco** | No *anillo de enfoque*: *enfoque* es óptica o estrategia. |
| chip / filter chip | **chip** / **chip de filtro** | Masculino, se mantiene. No *etiqueta*, que ya es `tag`; tampoco *ficha*, que ya es la `door card`. |
| label (de formulario) | **rótulo** | `tag` ya es *etiqueta*, y los dos aparecen en la misma pantalla en el CRM y en la búsqueda. |
| breakpoint | **punto de quiebre** | No *punto de interrupción*, que es de depuración. Los tokens `--bp-*` no se tocan. |
| viewport | **viewport** | Masculino, se mantiene. Glosa en la primera aparición de cada documento: *viewport (el área visible de la pantalla)*. |
| density | **densidad** | Los dos modos son prosa, no identificadores: Default → **Predeterminada**, Compact → **Compacta**. |
| touch target | **área táctil** | No *objetivo táctil*, que es calco. Las medidas van tal cual: *44x44px*. |
| tap / swipe / pull-to-refresh | **tocar** / **deslizar** / **deslizar para actualizar** | |
| drag-and-drop | **arrastrar y soltar** | |
| scroll / infinite scroll | **desplazamiento** / **desplazamiento infinito** | Nunca *scrollear*. |
| virtualized list | **lista virtualizada** | No *virtualización* a secas: suena a máquinas virtuales. |
| truncation | **truncamiento** | |
| safe area | **área segura** | Término de iOS y Android. `env(safe-area-inset-top)` no se toca. |
| theme / theming | **tema** / **aplicación de temas** | *Estrategia de temas*. Rechazado *tematización*: es exactamente el español administrativo que prohíben las reglas generales. En prosa, preferir la forma verbal: *los temas se aplican sobrescribiendo tokens*. |
| theme override | **override de tema** / **sobrescritura de tema** | *Override* cuando acompaña a un nombre de token literal; *sobrescritura* en prosa corrida. |
| dark / light / color mode | **modo oscuro** / **modo claro** / **modo de color** | El atributo `data-color-mode` no se toca. |
| branding (por organización) | **identidad visual** | *Identidad visual por organización*. Nunca *por inquilino*: `tenant` es **organización**. |
| brand color / brand palette | **color de marca** / **paleta de marca** | |
| high contrast / large text mode | **modo de alto contraste** / **modo de texto grande** | |
| reduced motion | **movimiento reducido** | La media query `prefers-reduced-motion` no se traduce. |
| white-label | **marca blanca** | |
| role-adaptive | **adaptable al rol** | |
| collapsible / collapsed / expanded (prosa) | **plegable** / **plegado** / **desplegado** | Solo en prosa; como valores de estado son identificadores y se quedan en inglés. |

## Estados, listas y búsqueda

| Inglés | Español | Nota |
|---|---|---|
| empty state / loading state / error state | **estado vacío** / **estado de carga** / **estado de error** | *Estado vacío* ya se usa así en `spec/security.md`: se confirma, no se recoina. |
| greyed out / to grey out | **atenuado** / **atenuar** | No *griseado*. Tampoco *deshabilitado*: eso es `disabled`, un estado distinto. Aparece dentro de un `DECIDED:` que se cita en otros dos documentos, así que las tres apariciones dicen lo mismo palabra por palabra. |
| inline validation | **validación en línea** | *En línea* para toda la familia: *errores en línea*, *ayuda en línea*. |
| confirmation dialog | **diálogo de confirmación** | |
| undo | **deshacer** | Verbo, no sustantivo: *deshacer*, no *el deshacer*. |
| retry | **reintentar** / **reintento** | Verbo en los botones, sustantivo en la estrategia de reintentos. |
| bulk action | **acción masiva** | Fijado ahora para que no derive a *acción en lote* o *en bloque*. |
| drill-down / to drill down | **desglose** / **desglosar** | No *profundizar*, que es vago y metafórico. |
| dead end | **callejón sin salida** | Las dos apariciones son metáforas y las dos importan. Se traduce como metáfora, no se neutraliza. |
| deep link | **enlace directo** | No *enlace profundo*: en español no significa nada. |
| type-ahead | **búsqueda predictiva** | No *anticipación de escritura*. |
| scoped search | **búsqueda acotada a…** | *Ámbito* ya está tomado por los permisos; aquí *scoped to* es adjetival y se resuelve con *acotada*. |
| saved filter / saved search | **filtro guardado** / **búsqueda guardada** | |
| progressive disclosure | **revelación progresiva** | No *divulgación*: divulgar es hacer público, y aquí se trata de mostrar campos poco a poco. Ver el desdoblamiento de `disclosure` más abajo. |
| auto-refresh / auto-save | **actualización automática** / **guardado automático** | El *auto-save* produce un `draft` → **borrador**. |
| polling (técnico) | **sondeo periódico** | Deliberadamente nada con *encuesta* ni *votación*: en el mismo corpus *poll watcher* es **observador electoral** y *polling location* es **centro de votación**. Los paneles consultan al servidor cada 30 segundos; no encuestan a nadie. |

## Analítica, IA y producto

| Inglés | Español | Nota |
|---|---|---|
| guardrails | **salvaguardas** | Las reglas que impiden que la IA se salga del mensaje. No *barandillas* ni *barandas*. |
| grounded / grounding | **anclado en fuentes** / **anclaje en fuentes** | No *fundamentado*, demasiado débil: el punto es que no puede salirse. Acompaña *respuesta inventada* para `hallucinated answer`. |
| concierge (AI concierge) | **concierge** *(se mantiene)*, masculino | No *conserje*, que es el portero de un edificio. Y sobre todo no *asistente*: eso ya es `wizard`. *AI Concierge* → **concierge de IA**. |
| AI (en nombres de producto) | **IA** | La única sigla de producto que sí se traduce, porque en español existe y se usa. |
| BYOM / BYOP | **BYOM** / **BYOP** | Se mantienen, como BYOK. Glosa en la primera aparición de cada documento: *BYOM (Bring Your Own Model — la organización configura su propio proveedor de IA)*, *BYOP (Bring Your Own Phone — se usan los celulares personales de los voluntarios)*. |
| knowledge base (KB) | **base de conocimiento** | |
| widget | **widget** | Masculino, se mantiene: *el widget*, *los widgets*. Ninguna perífrasis española aguanta *widget builder*, *widget vocabulary* ni `Dashboard/WidgetGrid`. |
| in scope / out of scope | **dentro del alcance** / **fuera del alcance** | No *ámbito*: eso está reservado para `scope` de permisos. |
| scope creep | **expansión descontrolada del alcance** | |
| deferred | **aplazado** | Marcador de estado en encabezados. No *diferido*, que en finanzas significa otra cosa, ni alternar con *pospuesto*. |
| revisit criteria | **criterios de reevaluación** | El marcador `REVISIT:` de los comentarios HTML sigue en inglés; esto es la prosa. |
| first-class | **de pleno derecho** | *Capacidad de pleno derecho.* No *de primera clase*, que suena a avión. El sentido es "no es un añadido posterior". |
| tentpole | **pilar** | *(pilar de la v2)*. |
| v2 forward reference | **referencia anticipada a la v2** | Rótulo en negrita repetido cinco veces; idéntico en las cinco. |
| universe (GOTV) | **universo** | Término de oficio de campaña: el conjunto de votantes objetivo. No *público objetivo* (eso es `audience`) ni *lista de contacto*. |
| resource reallocation | **reasignación de recursos** | No *redistribución*, que sugiere equidad; aquí es mover gente de un precinto a otro. |
| gamification / leaderboard / badge (gamificación) | **gamificación** / **tabla de posiciones** / **insignia** | La ADR-015 las rechaza explícitamente. *Gamificación*, no *ludificación*. *Tabla de posiciones*, no *de clasificación*. La `insignia` de gamificación no es el `distintivo` de estado ni el `contador` numérico: tres cosas. |
| walkthrough / interactive tour | **recorrido guiado** | |
| enforcement / to enforce | **aplicación** / **hacer cumplir** | *Aplicación estricta* frente a *aplicación flexible*. No *imposición*. |
| chase list | **lista de seguimiento** | Coherente con *llamadas de seguimiento* y con la familia *lista de recorrido / de supresión / única*. |

## Pagos, cumplimiento y legal

| Inglés | Español | Nota |
|---|---|---|
| payfac / payment facilitator | **facilitador de pagos (payfac)** | Categoría regulatoria; se glosa la sigla en la primera aparición y se conserva porque así se nombra en la regulación. |
| direct merchant model | **modelo de comercio directo** | Cada organización firma directamente con el procesador. |
| escrow (aportaciones) | **retención en custodia** | Distinto de `key escrow → custodia de llaves`. Aquí el dinero queda retenido hasta la revisión de cumplimiento; son mecanismos sin relación. |
| screening (aportaciones) | **filtrado** | No *escrutinio*, que en un producto electoral es el conteo de votos; no *investigación de antecedentes*, reservado para `candidate vetting`. |
| A/B testing / variant | **pruebas A/B** / **variante** | |
| breach | **brecha** | |
| campaign period | **período de campaña** | El período en que aplican las restricciones del TSE. No confundir con `quiet period → veda electoral`, que es su opuesto. |
| subsidiary | **filial** | No *subsidiaria*. |
| do-not-call / click-to-call / preview dialer | **lista de no llamar** / **llamada con un clic** / **marcador con vista previa** | *Lista de no llamar* no es la `suppression list`, que ya está fijada como **lista de supresión**. |
| number masking | **enmascaramiento de números** | Oculta el celular personal del voluntario. |
| purpose (consentimiento) | **finalidad** | Término del RGPD y de la LGPD. No *propósito*, que no tiene peso jurídico. |

## Un inglés, dos españoles

Además de los desdoblamientos que el glosario ya registra para `opt-in` y `pledge`:

| Inglés | Español | Nota |
|---|---|---|
| party | **partido** (político) / **parte** (de un contrato) | Aparecen con tres líneas de distancia en la ADR-017, y una de las dos es además una columna de la base de datos. |
| primary | **primaria** (elección) / **principal** (infraestructura, identificador, moneda) | |
| scope | **ámbito** (permisos) / **alcance** (producto) / **acotar** (verbo) | Cuatro lecturas de la misma palabra, todas correctas. Los identificadores `geographic_scope`, `scope_ids` no se traducen. |
| reconciliation | **conciliación** (recaudación) / **cómo se concilia con…** (encabezado de ADR) / **resolver** (registros en conflicto) | |
| conversion rate | **tasa de cambio** (divisa) / **tasa de conversión** (analítica) | |
| migration | **migración** (esquema) / **mudanza desde otra plataforma** (soporte) | |
| gate / gating | **punto de decisión** (método) / **requisito bloqueante** (acceso) | Un *punto de decisión de certificación* no significa nada. La capacitación incompleta **bloquea**. |
| checkpoint | **punto de control** (sincronización) / **verificación de conocimiento** (capacitación) | |
| disclosure | **declaración** (finanzas de campaña) / **revelación** (interfaz) | Nunca *divulgación*. |
| badge | **contador** (numérico) / **distintivo** (de estado) / **insignia** (gamificación) | El contador se topa en `99+`; el distintivo dice *sin conexión*; la insignia es la medalla que la ADR-015 rechaza. |
| default | **por defecto** / **predeterminada** / `default` | *By default* → *por defecto*; el modo de densidad y la columna *Default Value* → *predeterminada* y *valor predeterminado*; el estado `default` es un identificador. |
| placeholder | **texto de ejemplo** (campo de formulario) / **marcador de posición** (mapa sin cachear) | |
| issue | **problema** / **incidente** | Nunca *incidencia*: eso ya es `advocacy`. Los *poll watcher issue threads* son *hilos de problemas reportados*. |
| log | **registro** / **bitácora** | *Registro* ya carga con `record`, `audit trail` y `read logging`. Cuando dos sentidos caen en la misma frase, el segundo es **bitácora**. |
| field | **campo** (dato) / **de campo** (trabajo) | Convergen en español y es tolerable, pero *una llave derivada del token de sesión de campo* tiene que leerse como el turno, no como la columna. |
| tier | **nivel** (aislamiento, metadatos, conservación, autenticación, analítica, filtrado) / **plan** (suscripción) | Seis escalas distintas usan la misma palabra inglesa. Los *flat tiers* de precio son **planes**; si todo es "nivel", se cruzan. |

## Acuñados durante la traducción

Todo lo que los traductores tuvieron que inventar sobre la marcha, incluido lo que no
chocó con nada. Se recoge aquí para que quien traduzca los wireframes empiece con un
contrato más fuerte del que tuvo esta ronda.

### Pantallas, artefactos y acciones

| Inglés | Español | Nota |
|---|---|---|
| builder (de segmentos, guiones, comunicados, universo…) | **constructor de…** | Una sola palabra para los doce constructores. Ya publicado como *Constructor de comunicados* en `spec/press.md`. |
| composer | **redactor de…** | Deliberadamente distinto de *constructor*: el redactor escribe un mensaje, el constructor arma un artefacto reutilizable. No *compositor*, que es de música. |
| check-in (sustantivo) | **registro de entrada** | Forma nominal de `check in → registrar la entrada`. |
| drive (de inscripción, de llamadas) | **jornada** | Ya publicado en `spec/workflows.md`. |
| dispatcher | **despachador** | Ya publicado en `spec/gotv.md`. |
| turf cutting | **corte de territorios** | Ya publicado en `spec/gotv.md`. |
| magic link | **enlace mágico** | Ya publicado en `spec/users.md` y `spec/fundraising.md`. No se deja en inglés. |
| login fallback | **inicio de sesión alternativo** | La rama *alternativa* de `fallback`; *de reserva* se lee raro como título de pantalla. |
| tenant switcher | **selector de organización** | |
| permission override | **ajuste de permisos** | No *override*, que aquí queda reservado para los tokens de diseño. |
| quiz | **cuestionario** | Se califica; la *verificación de conocimiento* no. |
| report (documento generado) | **informe** | El corpus usa *reporte* para la presentación regulatoria y *informe* para el documento generado. |
| year-end statement | **estado de cuenta anual** | Ya publicado en `spec/fundraising.md`. |
| delivery event (de una petición) | **acto de entrega** | No *evento*: eso es la funcionalidad de Eventos. |
| embed config | **configuración de incrustación** | |
| signup page | **página de inscripción** | Evita *registro*, ya sobrecargado con `record` y `log`. |
| feature area | **área funcional** | |
| Settings Hub | **Centro de ajustes** | |
| ticket (de evento) | **entrada** | No *boleto*: *boleta* es la papeleta electoral y *Boleto* es un método de pago brasileño que ya aparece en el corpus. Los campos `ticket_type` / `ticket_quantity` no se tocan. |
| attendee | **persona asistente** | Forma larga a propósito: *asistente* solo ya es `wizard`. |
| town hall | **asamblea comunitaria** | |
| Event Manager | **Gerente de eventos** | Nombre de rol: mayúscula solo en la primera palabra. |
| target (de una acción de activismo) | **destinatario** | La persona legisladora o el organismo al que se le escribe. |

### Interfaz

| Inglés | Español | Nota |
|---|---|---|
| chevron | **chevrón** | En plural, *chevrones*. |
| hamburger menu | **menú hamburguesa** | |
| overflow menu (⋯) | **menú de desbordamiento** | |
| sidebar footer | **pie de la barra lateral** | |
| shift timer | **cronómetro del turno** | |
| phone bank call card | **ficha de llamada** | Familia de *ficha de puerta*. |
| dirty state | **cambios sin guardar** | *Estado sucio* es inusable. El rótulo en negrita se lee **Cambios sin guardar**. |
| debounced | **con retardo entre pulsaciones** | Forma corta después de la primera aparición: *con retardo*. No hay sustantivo limpio; se reformula. |
| standard app | **app estándar** | Se opone a *modo de campo*. |
| enrollment / to enroll (passkey) | **alta** / **dar de alta** | Evita *registro*, ya cargado por `record` y `log`, e *inscripción*, reservada para `voter registration`. |
| battery / data awareness | **adaptación a la batería** / **al consumo de datos** | *Awareness* no tiene sustantivo limpio; lo que el texto describe es adaptación. |
| exponential backoff | **espera exponencial** | |
| sync receipt | **acuse de recibo de sincronización** | |
| placeholder value | **valor provisional** | Tercer sentido: ni *texto de ejemplo* (campo de formulario) ni *marcador de posición* (mapa sin cachear). |
| full-table scan | **recorrido completo de tabla** | |
| metered connection | **conexión con límite de datos** | |
| key generation ceremony / recovery phrase | **ceremonia de generación de llaves** / **frase de recuperación** | |
| breadcrumbs (la metáfora, *no breadcrumbs*) | **sin rastros** | Deliberadamente **no** `breadcrumb → ruta de navegación`: aquí son las migas de Hansel y Gretel, no el componente de navegación. |
| user agent | **user agent** *(se mantiene)* | |

| activity feed | **flujo de actividad** | |
| feed (del centro de mando) | **feed** *(se mantiene, m.)* | Como `snackbar` y `widget`: *flujo continuo* choca con `stream → flujo`. |
| acknowledgment (modal) | **acuse de recibo** | No *confirmación*, ya tomada por `confirmation dialog`. |
| thermometer (widget) | **termómetro** | |
| Overview (sección) | **Resumen** | Coherente con `spec/users.md` y `spec/workflows.md`. |
| My Stuff (sección) | **Lo mío** | |
| Help Center | **Centro de ayuda** | No choca con *centro de notificaciones* ni con *centro de mando*. |
| no-show | **ausencia sin aviso** | Forma corta después: *ausencia*. *Inasistencia* pierde el matiz de "confirmó y no apareció". |
| Keep Left / Keep Right | **Quedarme con la izquierda / con la derecha** | Familia de *Quedarme con la mía / con la suya / Ambas*. |
| merge field / merge tag | **campo de combinación** | Término asentado de combinación de correspondencia; deja libre `tag → etiqueta`. |
| vanity URL | **URL personalizada** | Femenino; plural *las URL*. |
| catch-all route | **ruta comodín** | |
| auth guard | **guardia de autenticación** | También *guardia de turno activo*. |
| **Override:** (rótulo de excepción) | **Excepción:** | No es el `theme override`; aquí rotula una excepción documentada a un valor por rol. |

### Sistema de diseño y plataforma web

| Inglés | Español | Nota |
|---|---|---|
| responsive | **adaptable** | *Estrategia de diseño adaptable*, *imágenes adaptables*. Ni el calco *responsive* ni *adaptativo*. |
| tablet | **tableta** | Forma de la RAE. En Puerto Rico se oye *tablet*, pero el registro escrito pide *tableta*. |
| hover (en prosa) | **al pasar el cursor** | Como valor de estado, `hover` es identificador y no se toca. |
| mouse | **mouse** | LatAm y Puerto Rico. No *ratón*. |
| font stack | **pila de fuentes** | |
| easing | **curva de aceleración** | Los valores `ease-out` / `ease-in-out` no se tocan. |
| splash screen | **pantalla de bienvenida** | No *pantalla de inicio*, reservada para `Home Screen`. |
| Feedback (categoría de componentes) | **Retroalimentación** | |
| slot / Slot Pattern | **slot** / **Patrón de slots** | Las claves `[slot: default]` quedan intactas. |
| deferred loading | **carga aplazada** | Deliberadamente distinto de `lazy loading → carga diferida`: aparecen en el mismo documento. |
| chunk (por ruta) | **fragmento** | Distinto de `bundle → paquete`. |
| gzipped | **comprimido con gzip** | |
| CTA | **llamada a la acción** | Se desarrolla; no se deja la sigla. |
| First Contentful Paint / Time to Interactive | *(se mantienen en inglés)* | Nombres propios de métricas web, como `WCAG`. |
| custom domain | **dominio personalizado** | |
| SLA | **SLA** *(se mantiene)* | |

### Arquitectura y datos

| Inglés | Español | Nota |
|---|---|---|
| technology stack | **stack tecnológico** | `stack` ya se usa suelto en `spec/integrations.md`. No *pila tecnológica*. |
| envelope encryption | **cifrado de sobre** | Deriva de `envelope key → llave de sobre`. |
| to hash | **hashear** | |
| certificate pinning | **fijación de certificados** | |
| Shamir's secret sharing | **reparto de secretos de Shamir** | El apellido no se traduce; el resto sí. |
| attribute scoping | **acotación por atributos** | Se apoya en `scope → ámbito` y `scoped → acotada`. |
| additive merge | **fusión aditiva** | Distinto de `merge-and-flag`. |
| battery-aware sync | **sincronización consciente de la batería** | |
| push + pull (refresco de listas) | **push y pull** | Nombres del mecanismo; el verbo sí se traduce (*el servidor envía*). |
| bootstrap problem | **el problema del arranque** | |
| feedback loop | **bucle de retroalimentación** | |
| ward | **barrio** | Nivel de la jerarquía geográfica, junto a *precinto* y *centro de votación*. |
| adapter shim | **capa de compatibilidad mínima** | El punto de la frase es que el adaptador nativo no es un remiendo. |
| framework | **framework** *(se mantiene, m.)* | *Marco* ya es `shell` y chocarían en el mismo párrafo. |
| SMS gateway | **pasarela de SMS** | No *puerta de enlace*. |
| purge | **purga / purgar** | |
| timestamp | **marca de tiempo** | Salvo dentro de listas de campos de metadatos, donde `spec/messaging.md` ya publica *fecha y hora*. |
| buffer (geográfico) | **margen** | |
| data feed | **flujo de datos** | No *fuente*, reservada para `source` y `beat`. |
| GIS | **SIG** | Sigla española asentada; se glosa en la primera aparición. |
| NLP | **PLN (procesamiento de lenguaje natural)** | Se glosa en la primera aparición. |
| electoral boundary data | **datos de límites electorales** | Aplica `boundary → límite`. |
| translation memory | **memoria de traducción** | |
| settlement currency / amount | **moneda de liquidación** / **monto liquidado** | |
| sentiment score (de un votante) | **puntaje de inclinación política** | Ya publicado así en `spec/security.md`. Distinto del `support score → puntaje de apoyo` y del *puntaje de identificación de votantes*. |
| voter ID score | **puntaje de identificación de votantes** | El resultado del proceso de identificación, no la escala de apoyo. |

### Método, negocio y cumplimiento

| Inglés | Español | Nota |
|---|---|---|
| metadata trove | **acervo de metadatos** | No *tesoro*, que suena a hallazgo feliz; no *botín*, que mete un ladrón que la frase no nombra. |
| gap | **vacío** | *Brecha* está tomada por `breach`; *laguna* suena jurídico. |
| to draw a boundary | **trazar un límite** | Frase fija. |
| to narrow (un contrato) | **estrechar** | Distinto de `to contract → restringir`, el término de arte de la regla unánime/unilateral. |
| to operationalize | **hacer operativa** | |
| contract graph / traversal | **grafo de contratos** / **recorrido** | Coherente con `actor graph → grafo de actores`. |
| status quo | **statu quo** | |
| syntactic sugar | **azúcar sintáctico** | |
| feature creep | **proliferación descontrolada de funcionalidades** | Deliberadamente distinto de `scope creep → expansión descontrolada del alcance`: aparecen en el mismo documento. |
| headcount | **plantilla** | |
| cold signups | **inscripciones espontáneas** | No *en frío*, que es calco. |
| curated | **curado** | |
| scrutiny (regulatoria) | **fiscalización** | No *escrutinio*, que en un producto electoral es el conteo de votos: la misma razón que `candidate vetting`. |
| rollup (analítica) | **consolidado** | Ya usado en `spec/workflows.md`. |
| appeal (recaudación) | **convocatoria** | Ya usado en `spec/workflows.md`. |
| outcomes (de llamadas) | **desenlaces** | Ya usado en `spec/workflows.md`. |
| engagement (redes) | **interacción** | |
| asset | **recurso** | *Biblioteca compartida de recursos*. |
| checklist | **lista de verificación** | |
| capacity (de un local) | **aforo** | |
| date/time slot | **franja de fecha y hora** | |
| timeout (plazo) | **plazo** | |
| approval routing | **enrutamiento a aprobación** | Distinto de `channel router → enrutador de canales`. |
| crash recovery | **recuperación tras un fallo** | |
| mockup | **mockup** *(se mantiene)* | Como `wireframe`. |
| exemplar | **ejemplo de referencia** | |

### Tres sentidos más que hay que desdoblar

| Inglés | Español | Nota |
|---|---|---|
| roster | **lista del equipo** (Team Roster, del líder de equipo) / **lista de voluntarios** (Roster, del coordinador de voluntarios) | El inglés distingue las dos con un calificador; en español la misma cadena en los dos sitios borraría la distinción. En `url-structure.md`, *Volunteer Roster* es **Lista del equipo de voluntarios**, con el calificador completo. |
| script | **guion** (texto de contacto) / **sistema de escritura** (latino, tailandés, devanagari) | No hay ningún `script` de JavaScript en el corpus. |
| pipeline | **cadena de procesamiento** (técnico) / **flujo de respaldos** (endorsement) / **flujo de etapas** (vista kanban) | |
| override | **sobrescritura** (ajustes, temas) / **Excepción:** (rótulo de excepción a un valor por rol) | |
