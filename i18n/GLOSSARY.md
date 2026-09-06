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
