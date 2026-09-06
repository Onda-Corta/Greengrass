# Cumplimiento y marco legal

## Propósito

Este documento define la estrategia de cumplimiento de GreenGrass en todas las jurisdicciones objetivo. Consolida las decisiones de cumplimiento tomadas en otras especificaciones (security.md, geography.md, workflows.md, users.md) y cubre los vacíos en materia de derecho electoral, protección de datos, financiamiento de campañas, restricciones al cifrado y cumplimiento operativo.

GreenGrass opera en el cruce de la organización política, el tratamiento de datos personales y las transacciones financieras: los tres dominios más regulados de cualquier jurisdicción que nos interese. El cumplimiento no es una capa que se atornilla al final. Es estructural.

## Filosofía de cumplimiento

**Cumplimiento por principio, no cumplimiento mínimo.**

El enfoque de GreenGrass:

1. **Diseñar primero para la jurisdicción más estricta.** Construir para el estándar más alto de nuestros países objetivo y relajarlo donde la ley local lo permita, en vez de construir para el estándar más débil y luego parcharlo.
2. **Cumplimiento arquitectónico.** Donde se pueda, hacer que incumplir sea técnicamente imposible (BYOK —*Bring Your Own Key*: la organización controla su propia llave de cifrado— significa que *no podemos* entregar sus datos), en vez de depender de promesas de política interna.
3. **Transparencia por defecto.** Warrant canary, informes anuales de transparencia, código de aplicación abierto, registros de consentimiento auditables.
4. **La asesoría legal local no es negociable.** Cada lanzamiento de país exige trabajar con expertos legales locales. Este documento aporta el marco; la asesoría local lo valida.
5. **El cumplimiento como funcionalidad para las organizaciones.** Reportes de financiamiento de campaña, gestión del consentimiento, declaración de donantes: son cosas que las campañas *necesitan*. Constrúyelas bien y el cumplimiento se vuelve una ventaja de producto.

## Panorama regulatorio por país

### Puerto Rico (Alfa)

**Marco normativo:** ley federal de EE. UU. + ley local de Puerto Rico.

**Derecho electoral:**
- Regulación de la Comisión Federal Electoral (FEC) para las contiendas federales
- Comisión Estatal de Elecciones de Puerto Rico (CEE) para las contiendas locales y territoriales
- Restricciones del Bipartisan Campaign Reform Act (BCRA) sobre recaudación de fondos y publicidad
- Prohibición de contribuciones de personas extranjeras (52 USC §30121): prohibición estricta de aportaciones de personas que no sean estadounidenses
- Obligación de declarar las contribuciones que superen ciertos umbrales (actualmente $200 acumulados por ciclo electoral a nivel federal)
- Requisitos de aviso legal en la publicidad política ("Paid for by…")

**Protección de datos:**
- No hay ley federal integral de privacidad en EE. UU. (a 2025)
- Puerto Rico tiene disposiciones locales limitadas de protección de datos
- La sección 5 de la FTC Act (prácticas desleales o engañosas) funciona como piso de facto de protección de datos
- Aplican las leyes estatales de notificación de brechas (Ley 111-2005 de Puerto Rico)
- Children's Online Privacy Protection Act (COPPA) si la plataforma llega a usuarios menores de 13 años
- CAN-SPAM Act para el correo comercial; Telephone Consumer Protection Act (TCPA) para llamadas y SMS

**Financiamiento de campañas:**
- Reportes a la FEC para las contiendas federales (informes trimestrales y preelectorales)
- Reportes a la CEE de Puerto Rico para las contiendas locales
- Límites de contribución (a nivel federal: límites por elección, indexados a la inflación)
- Reglas de PAC y Super PAC si las alianzas coordinan gastos
- Declaración de empleador y ocupación obligatoria para contribuciones superiores a $200 (federal)

**Riesgos clave:**
- El régimen regulatorio doble (federal y territorial) genera complejidad
- La fiscalización de la FEC ha sido irregular, pero sobre el papel las reglas son estrictas
- Las infracciones a la TCPA acarrean daños legales tasados ($500-$1,500 por infracción): el consentimiento para SMS y llamadas es crítico

### Brasil (Piloto 1)

**Marco normativo:** Constitución brasileña + Lei das Eleições (Ley 9.504/1997) + LGPD + regulación del TSE.

**Derecho electoral:**
- El Tribunal Superior Eleitoral (TSE) regula todas las elecciones
- Restricciones estrictas al periodo de campaña: solo se puede hacer campaña dentro de una ventana definida
- Restricciones a la mensajería masiva (el TSE prohíbe los envíos masivos por WhatsApp desde 2018)
- Los candidatos deben registrarse ante el TSE; las cuentas de campaña son entidades jurídicas separadas
- Restricciones a la publicidad política en determinadas plataformas y medios
- Prohibición de la publicidad política pagada en plataformas de internet (solo contenido orgánico e impulso dirigido a los seguidores de la página del propio candidato)

**Protección de datos:**
- Lei Geral de Proteção de Dados (LGPD): ley integral de protección de datos, modelada sobre el GDPR
- La Autoridade Nacional de Proteção de Dados (ANPD) es la autoridad de fiscalización
- Se requiere una base jurídica para el tratamiento: consentimiento, interés legítimo, obligación legal, etc.
- Derechos del interesado: acceso, corrección, eliminación, portabilidad e información sobre con quién se comparten sus datos
- Es probable que se exija una evaluación de impacto en la protección de datos (DPIA), dada la sensibilidad de los datos políticos
- Localización de datos: la LGPD expresa preferencias, pero no impone requisitos estrictos; la transferencia transfronteriza se permite con salvaguardas adecuadas
- La opinión política es dato sensible bajo la LGPD: requiere consentimiento explícito u otra base jurídica específica

**Financiamiento de campañas:**
- El TSE da seguimiento a todas las finanzas de campaña
- Todas las donaciones pasan por cuentas bancarias de campaña reguladas
- Límites individuales de contribución (un porcentaje del ingreso bruto del año anterior)
- Donaciones de empresas prohibidas (desde 2015)
- Divulgación en tiempo real a través del sistema DivulgaCandContas del TSE
- Requisitos estrictos de contabilidad y comprobantes
- Topes de gasto de campaña fijados por el TSE para cada contienda

**Riesgos clave:**
- El TSE es activo y técnicamente sofisticado: hace cumplir las reglas de campaña digital con dureza
- WhatsApp es el canal de comunicación dominante, pero el TSE ha restringido la mensajería política masiva
- Que la LGPD clasifique la opinión política como dato sensible eleva las obligaciones
- Las infracciones de financiamiento de campaña pueden llevar a la anulación de la candidatura

**DECIDIDO: gestión de canales según las reglas del TSE.** La plataforma aplica las reglas del TSE durante los periodos de campaña —límites de volumen de mensajes, restricciones de contenido, sin envíos masivos— pero permite un uso más amplio fuera de esas ventanas. WhatsApp es demasiado importante en Brasil como para deshabilitarlo por completo, y las restricciones del TSE son específicas del periodo de campaña. La plataforma codifica las reglas del TSE y las aplica según el contexto, a partir de las fechas de campaña configuradas.

### Tailandia (Piloto 2)

**Marco normativo:** Constitución de Tailandia + Ley Orgánica sobre la Elección de los Miembros de la Cámara de Representantes + PDPA + Computer Crime Act.

**Derecho electoral:**
- La Comisión Electoral de Tailandia (ECT) supervisa las elecciones
- La Ley Orgánica de Partidos Políticos regula la formación y el financiamiento de los partidos
- Prohibiciones estrictas de compra de votos (definida en términos amplios)
- Restricciones al periodo de campaña y topes de gasto
- Restricciones a la publicidad política: en algunos contextos se exige aprobación previa
- Ley de lesa majestad (sección 112 del Código Penal): difamar a la monarquía es delito; afecta a todo el contenido de la plataforma
- Computer Crime Act: disposiciones amplias sobre retirada de contenido y responsabilidad de las plataformas

**Protección de datos:**
- Personal Data Protection Act (PDPA) B.E. 2562: la ley integral de protección de datos de Tailandia (vigente desde junio de 2022)
- Inspirada de manera general en el GDPR
- Se requiere consentimiento para tratar datos sensibles (la opinión política es dato sensible bajo la PDPA)
- Derechos del interesado similares a los de la LGPD y el GDPR
- Restricciones a la transferencia transfronteriza: se exigen salvaguardas adecuadas o consentimiento
- Se exige un delegado de protección de datos (DPO) para el tratamiento a gran escala de datos sensibles

**Financiamiento de campañas:**
- El financiamiento de los partidos políticos está regulado por la Ley Orgánica
- Límites de contribución y obligaciones de declaración
- Hay financiamiento estatal disponible para los partidos que califiquen
- Topes de gasto por elección
- La ECT audita las finanzas de los partidos

**Riesgos clave:**
- La ley de lesa majestad castiga un delito grave: la plataforma debe evitar contenido que pueda interpretarse como una infracción, pero su aplicación es políticamente selectiva
- Historial de intervención militar: los datos de la plataforma podrían ser incautados durante un golpe de Estado; el nivel agresivo de seguridad es indispensable
- El Computer Crime Act le da a las autoridades amplios poderes de retirada de contenido
- La disolución de partidos políticos se usa como herramienta política: los datos de los partidos deben conservarse de forma independiente

**DECIDIDO: advertencias visibles al usuario + responsabilidad de la organización.** La plataforma muestra advertencias claras y visibles sobre las restricciones de lesa majestad cuando se crea contenido dentro de organizaciones tailandesas. Sin filtrado automático de contenido: técnicamente no es confiable y genera un efecto inhibidor. La organización y sus usuarios son responsables de su propio contenido. Esto respeta la autonomía de los usuarios y evita poner a GreenGrass en la posición de censurar discurso político.

### India (Piloto 3)

**Marco normativo:** Constitución de India + Representation of the People Act (1950, 1951) + IT Act 2000 + Digital Personal Data Protection Act (DPDPA) 2023.

**Derecho electoral:**
- Comisión Electoral de India (ECI): un organismo independiente y poderoso
- Código Modelo de Conducta (MCC) durante los periodos electorales: restricciones extensas sobre lo que los partidos y candidatos pueden decir y hacer
- Código Voluntario de Ética para plataformas de redes sociales durante las elecciones (podría aplicarle a GreenGrass)
- Sistema de registro de votantes de la ECI (EPIC): puede que haga falta integrarse con él
- Certificación previa obligatoria para la publicidad política en redes sociales (desde 2019)
- La publicidad política pagada debe llevar avisos legales del tipo "Paid for by" con un formato específico

**Protección de datos:**
- Digital Personal Data Protection Act (DPDPA) 2023: la ley integral de protección de datos de India
- Tratamiento de datos personales basado en el consentimiento
- Obligaciones del fiduciario de datos
- Requisitos de localización de datos para los "fiduciarios de datos significativos": el gobierno puede exigir almacenamiento local
- Derecho de supresión, de corrección y a la reparación de reclamaciones
- La Data Protection Board of India es la autoridad de fiscalización
- Exenciones para el gobierno: excepciones amplias por seguridad nacional
- Los datos políticos no están clasificados explícitamente como sensibles (a diferencia de la LGPD y la PDPA), pero su tratamiento está por definirse en el reglamento que viene

**Financiamiento de campañas:**
- El sistema de bonos electorales fue anulado por la Corte Suprema (2024): el nuevo marco está en construcción
- Las empresas pueden donar a los partidos; existen límites para las personas
- Los partidos deben presentar estados financieros anuales ante la ECI
- Límite a las donaciones en efectivo (actualmente ₹2,000 por persona sin declarar su identidad)
- Las contribuciones extranjeras a partidos políticos están prohibidas por la Foreign Contribution (Regulation) Act (FCRA)
- La FCRA también restringe el financiamiento extranjero de ONG con actividad política: el modelo operativo de GreenGrass podría quedar bajo escrutinio

**Riesgos clave:**
- Escala: más de 900 millones de votantes habilitados, volúmenes de datos enormes, retos de rendimiento y almacenamiento
- El MCC de la ECI impone restricciones extensas de contenido y de conducta durante los periodos electorales
- La FCRA podría usarse para escrutar a GreenGrass como entidad extranjera que presta servicios a organizaciones políticas indias
- Las variaciones estatales en las reglas electorales añaden complejidad
- Las directrices para intermediarios del IT Act exigen cumplir las órdenes gubernamentales de retirada de contenido en plazos muy cortos
- Es probable que se exija localización de datos, dada la escala y la sensibilidad

**DECIDIDO: posicionamiento exclusivamente tecnológico.** GreenGrass se posiciona como proveedor de tecnología (una herramienta SaaS) que vende a precio de mercado, no como proveedor de servicios políticos. Ese argumento sostiene que la FCRA no aplica, porque se trata de una transacción comercial y no de una contribución extranjera. **Requiere una opinión legal formal de asesoría india antes de lanzar el piloto**: esta interpretación no se ha puesto a prueba y el riesgo bajo la FCRA es serio.

### Líbano (Piloto 4)

**Marco normativo:** Constitución libanesa + Ley Electoral de 2017 (Ley 44) + un panorama regulatorio fragmentado.

**Derecho electoral:**
- La Comisión de Supervisión Electoral (SCE) supervisa las elecciones
- Sistema confesional de reparto de escaños (Acuerdo de Taif): los escaños se distribuyen entre comunidades religiosas
- La Ley Electoral de 2017 introdujo la representación proporcional
- Topes de gasto de campaña por candidato
- Restricciones a la publicidad política durante el periodo oficial de campaña
- Prohibido el financiamiento extranjero de campañas
- Las listas electorales (coaliciones) son una figura jurídica formal, con requisitos de registro específicos

**Protección de datos:**
- No hay ley integral de protección de datos (a 2025)
- Se ha propuesto un anteproyecto de ley de protección de datos, pero no se ha aprobado
- La Ley de Transacciones Electrónicas y Datos Personales (Ley 81/2018) ofrece protecciones digitales limitadas
- Leyes de secreto bancario (Ley del 3 de septiembre de 1956): históricamente fuertes, pero debilitadas por la crisis bancaria
- No existe una autoridad formal de protección de datos

**Financiamiento de campañas:**
- Topes de gasto de campaña definidos por la Ley Electoral de 2017
- Los candidatos deben abrir cuentas bancarias dedicadas a la campaña
- Declaración financiera obligatoria después de la elección (dentro de 60 días)
- La SCE puede auditar las finanzas de campaña
- La crisis del sistema bancario complica gravemente el cumplimiento financiero: muchas transacciones son en efectivo
- OMT y otros servicios de transferencia de dinero funcionan como salida al colapso bancario

**Riesgos clave:**
- El entorno de seguridad más complejo de todos los países objetivo
- Múltiples servicios de inteligencia (estatales y no estatales) con capacidad de vigilancia
- Las estructuras de gobierno paralelo de Hezbolá: hay organizaciones a ambos lados del espectro político
- Que no haya ley de protección de datos significa que no hay piso legal, pero tampoco puerto seguro
- El colapso del sistema bancario hace que los flujos de trabajo con mucho efectivo sean la norma, no la excepción
- La inestabilidad de la infraestructura (electricidad, internet) afecta el monitoreo continuo del cumplimiento
- Con un sistema político sectario, el dato mismo es políticamente sensible (saber la confesión o el distrito de alguien revela su afiliación política)

**DECIDIDO: aplicar el GDPR como línea base.** Todos los datos de usuarios libaneses se tratan como si el GDPR aplicara. El GDPR es el estándar de oro global, es bien conocido, y como ya estamos construyendo para la LGPD y la PDPA (ambas influidas por el GDPR), el costo adicional de implementación es marginal. Esto se documenta como un compromiso contractual con las organizaciones libanesas.

## Requisitos transversales de cumplimiento

### Marco de protección de datos

**DECIDIDO: tratar todos los datos políticos como sensibles, en todas partes.** Se aplican en todo el mundo las protecciones de datos sensibles del nivel LGPD/GDPR, sin importar lo que diga la ley local. GreenGrass es una plataforma de organización política: todos los datos que contiene son políticos por naturaleza. Un solo nivel de protección, sin ambigüedad y sin lógica de clasificación por jurisdicción que haya que mantener.

**Ya decidido (en security.md y system.md):**
- Cifrado BYOK por defecto: la organización custodia la llave maestra
- Residencia de datos por país
- Cifrado a nivel de aplicación para los campos sensibles
- Registro de auditoría completo de todo acceso y toda modificación de datos
- Identidad federada, con la propiedad de los datos en cada organización

**Falta especificar:**

#### Derechos del interesado

Todas las jurisdicciones objetivo (excepto Líbano) le otorgan a las personas derechos sobre sus datos personales. GreenGrass debe dar soporte a:

| Derecho | LGPD | PDPA | DPDPA | FTC/estados | Implementación en la plataforma |
|-------|------|------|-------|-----------|----------------------|
| Acceso | Sí | Sí | Sí | Limitado | Exportación autogestionada de datos desde el perfil del simpatizante |
| Corrección | Sí | Sí | Sí | Limitado | Edición autogestionada + solicitud a la organización |
| Eliminación | Sí | Sí | Sí | Limitado | Flujo de solicitud de eliminación con retenciones por obligaciones de conservación |
| Portabilidad | Sí | Sí | Sí | No | Exportación en formato estándar (JSON/CSV) |
| Oposición al tratamiento | Sí | Sí | No | No | Mecanismos de baja por cada finalidad de tratamiento |
| Retiro del consentimiento | Sí | Sí | Sí | No | Retiro en un clic, con efecto inmediato |

**DECIDIDO: decide la organización.** Las solicitudes de eliminación se le pasan al administrador de la organización, junto con orientación específica de su jurisdicción sobre sus obligaciones legales de conservación. La organización toma la decisión: GreenGrass aporta las herramientas y la orientación, pero no interpreta obligaciones legales en su nombre. El panel de cumplimiento muestra las solicitudes de eliminación pendientes, con temporizadores de SLA y notas de orientación sobre conservación.

#### Acuerdos de tratamiento de datos

GreenGrass actúa como encargado del tratamiento por cuenta de las organizaciones, que son las responsables del tratamiento. Cada relación con una organización exige:

- **Acuerdo de tratamiento de datos (DPA):** plantilla estándar que cubra categorías de datos tratados, finalidades del tratamiento, lista de subencargados, medidas de seguridad, obligaciones de notificación de brechas y derechos de auditoría
- **Divulgación de subencargados:** GreenGrass debe mantener y publicar la lista de todos sus subencargados (proveedores de alojamiento, infraestructura de correo, procesadores de pago, proveedores de servicios de IA)
- **Evaluación de impacto en la protección de datos (DPIA):** obligatoria bajo la LGPD y la PDPA para el tratamiento a gran escala de datos sensibles. GreenGrass debería ofrecer una plantilla de DPIA que las organizaciones puedan adaptar.

**DECIDIDO: la organización se encarga de todo.** Los simpatizantes contactan directamente a la campaña u organización. Los administradores de la organización procesan las solicitudes con las herramientas autogestionadas de la plataforma. Es una separación limpia entre responsable y encargado del tratamiento: la relación es entre el simpatizante y la organización con la que interactuó. GreenGrass construye las herramientas (exportación de datos, flujos de eliminación, formularios de corrección, seguimiento de SLA), pero la interacción es de la organización.

#### Transferencias transfronterizas de datos

La residencia de datos por país (ya decidida) reduce al mínimo los problemas de transferencia transfronteriza. Aun así, hay transferencias:

- **Los datos de identidad de la plataforma** viven en la jurisdicción de constitución → réplicas de lectura en cada país
- **Los datos de cada organización** se quedan en su país por defecto
- **El intercambio de datos dentro de una alianza** puede cruzar fronteras cuando los miembros están en países distintos

Salvaguardas necesarias:
- Cláusulas contractuales tipo (SCC) o equivalentes para cualquier transferencia transfronteriza
- Evaluaciones de impacto de la transferencia donde se exijan (LGPD, PDPA)
- Consentimiento explícito del usuario para compartir datos a través de fronteras en el contexto de una alianza

### Cumplimiento del derecho electoral

#### Aplicación del periodo de campaña

Varias jurisdicciones limitan la actividad de campaña a periodos definidos. La plataforma debe permitir:

- **Configuración del periodo de campaña:** un ajuste por organización que defina las fechas oficiales de inicio y fin
- **Restricciones de canal durante el periodo de campaña:** reglas por jurisdicción sobre qué comunicaciones se permiten
- **Comportamiento distinto antes y durante la campaña:** puede que haya funcionalidades que deban deshabilitarse o restringirse durante el periodo oficial

**DECIDIDO: configurable, con aplicación estricta por defecto.** Cada organización elige aplicación estricta o flexible por jurisdicción. La estricta es la opción por defecto: la plataforma bloquea las acciones restringidas durante los periodos de campaña configurados. Las organizaciones sofisticadas, con asesoría legal propia, pueden pasar a la aplicación flexible (solo advertencias) si prefieren decidir por su cuenta.

#### Avisos legales en la publicidad política

Todas las jurisdicciones objetivo exigen alguna forma de aviso legal del tipo "Paid for by" en la publicidad política. La plataforma debe:

- Añadir automáticamente el aviso legal que corresponda a cada jurisdicción en las comunicaciones que lo requieran
- Permitir que cada organización configure el texto del aviso por jurisdicción
- Verificar que el aviso esté presente en todo el contenido público que sale (correos, publicaciones en redes sociales, SMS cuando aplique)
- Conservar el registro de todas las comunicaciones políticas a efectos de declaración

#### Restricciones a las contribuciones extranjeras

Todas las jurisdicciones objetivo prohíben o restringen las contribuciones extranjeras a campañas políticas. La plataforma debe:

- Recabar información de nacionalidad y residencia de los donantes
- Bloquear o marcar las contribuciones de donantes no elegibles según las reglas de cada jurisdicción
- Conservar los registros para los reportes regulatorios
- Manejar la complejidad de los donantes de la diáspora (ciudadanos estadounidenses en Puerto Rico, brasileños en el exterior, etc.)

**DECIDIDO: ambas cosas, en un enfoque de dos niveles.** Los donantes claramente no elegibles (no ciudadanos, no residentes, sin vínculo que califique) se bloquean en tiempo real al momento del pago. Los casos límite (diáspora, doble ciudadanía, información incompleta) se aceptan pero quedan retenidos en garantía, marcados para revisión de cumplimiento, y requieren aprobación manual antes de liberar los fondos a la campaña. El panel de cumplimiento muestra las donaciones retenidas y explica por qué se marcaron.

### Reportes de financiamiento de campañas

Cada jurisdicción tiene requisitos de reporte distintos. La plataforma necesita un motor de reportes capaz de generar informes específicos por jurisdicción.

**Ya decidido (en workflows.md):** registro de auditoría completo, seguimiento configurable de donaciones, reportes de cumplimiento por jurisdicción.

**Capacidades de reporte necesarias:**

| Jurisdicción | Organismo receptor | Tipo de reporte | Frecuencia | Campos clave |
|-------------|---------------|-------------|-----------|------------|
| EE. UU. (federal) | FEC | Form 3/3X | Trimestral + preelectoral | Contribuciones desglosadas >$200, gastos, efectivo disponible |
| PR (local) | CEE | Por definir según el tipo de contienda | Por ciclo electoral | Por definir — requiere asesoría legal local |
| Brasil | TSE | DivulgaCandContas | En tiempo real + final | Todas las donaciones (sin umbral), todos los gastos |
| Tailandia | ECT | Finanzas anuales del partido | Anual + por elección | Ingresos del partido, gastos, declaraciones de bienes |
| India | ECI | Reporte de contribuciones | Anual + por elección | Contribuciones >₹20,000 (desglosadas), gasto total |
| Líbano | SCE | Declaración posterior a la elección | Dentro de los 60 días de la elección | Todos los gastos de campaña, fuentes de financiamiento |

**DECIDIDO: híbrido.** Generador de reportes integrado para las jurisdicciones prioritarias (primero EE. UU./FEC, para el alfa), y exportación de datos estructurados en formatos limpios disponible en todas partes desde el primer día como alternativa. Los módulos de reporte por jurisdicción se agregan a medida que arranca cada piloto. Es lo pragmático: construimos lo que necesitamos cuando lo necesitamos.

### Consentimiento y cumplimiento en las comunicaciones

**Ya decidido (en workflows.md):**
- Consentimiento por canal y por finalidad, con valores por defecto sensatos
- Baja en un clic, con efecto inmediato
- Registro de auditoría del consentimiento
- Consentimiento verificado al momento del envío

**Requisitos adicionales de cumplimiento:**

- **Cumplimiento de la TCPA (EE. UU./PR):** se exige consentimiento previo, expreso y por escrito para llamadas y mensajes automatizados a celulares. El alta debe ser clara y visible. La revocación debe atenderse de inmediato. Aplica al contacto por SMS y a las funcionalidades de jornadas de llamadas.
- **Cumplimiento del CAN-SPAM (EE. UU./PR):** los correos comerciales deben incluir dirección física, mecanismo de baja y asuntos veraces. Las bajas se atienden dentro de 10 días hábiles.
- **Consentimiento LGPD (Brasil):** el consentimiento debe ser libre, informado e inequívoco. Las casillas premarcadas no son consentimiento válido. Se puede retirar en cualquier momento, con la misma facilidad con que se otorgó.
- **Reglas de mensajería del TSE (Brasil):** prohibida la mensajería masiva por WhatsApp. Las campañas por SMS quedan restringidas durante el periodo electoral.
- **Consentimiento PDPA (Tailandia):** se exige consentimiento explícito para los datos sensibles (opinión política). El consentimiento debe ir separado del resto de los términos. Los menores requieren consentimiento de sus padres.
- **Consentimiento DPDPA (India):** el consentimiento debe ser libre, específico, informado, incondicional e inequívoco. El aviso debe estar en inglés o en cualquiera de los idiomas del Octavo Anexo de la Constitución.
- **Requisitos libaneses:** los requisitos formales de consentimiento son mínimos, pero GreenGrass aplica su propio estándar (ver la decisión sobre protección de datos en Líbano, más arriba).

### Registro de auditoría y conservación

**Ya decidido (en users.md):** registro de auditoría completo de todas las modificaciones de datos, cambios de permisos, transacciones financieras, inicios de sesión, exportaciones y fusiones.

**Requisitos de conservación por jurisdicción:**

**DECIDIDO: conservación uniforme, 10 años en todo el mundo.** Todos los registros de auditoría se conservan 10 años, sin importar la jurisdicción, siguiendo el requisito de registros mercantiles de Líbano, que es el más largo entre los países objetivo. Una sola regla para todos: es lo más simple de implementar, no hay riesgo de borrar antes de tiempo, y almacenar datos de eventos estructurados es barato frente al riesgo de cumplimiento que implica equivocarse con la conservación específica de cada jurisdicción.

| Jurisdicción | Registros financieros | Registros electorales | Registros de auditoría generales |
|-------------|------------------|-----------------|-------------------|
| EE. UU. (FEC) | 3 años tras la presentación | Por ciclo electoral + 3 años | Sin mandato federal |
| Brasil (TSE) | 5 años | Por ciclo electoral + requisitos del TSE | LGPD: mientras persista la finalidad |
| Tailandia | 5 años (fiscal) | Según los requisitos de la ECT | PDPA: mientras persista la finalidad |
| India | 8 años (fiscal/financiero) | Según los requisitos de la ECI | DPDPA: mientras persista la finalidad |
| Líbano | 10 años (registros mercantiles) | Según los requisitos de la SCE (60 días tras la elección para la declaración) | Sin requisito formal |

### Cifrado y acceso legal

**Ya decidido (en security.md):**
- BYOK por defecto: GreenGrass no puede descifrar los datos de una organización
- Imposibilidad arquitectónica de cumplir con exigencias de datos para las organizaciones con BYOK
- Impugnación de las exigencias excesivas o de motivación política para las organizaciones con llaves gestionadas
- Ninguna cooperación voluntaria con exigencias de gobiernos extranjeros sin un proceso legal válido en la jurisdicción de constitución

**Consideraciones sobre el cifrado por jurisdicción:**

| Jurisdicción | Restricciones al cifrado | Obligaciones de interceptación legal | Impacto en GreenGrass |
|-------------|----------------------|-------------------------------|---------------------|
| EE. UU./PR | Sin restricciones generales. CALEA aplica a las operadoras de telecomunicaciones (GreenGrass no lo es) | No aplica a las plataformas de software | Mínimo: son las protecciones legales más fuertes para el cifrado |
| Brasil | El Marco Civil da Internet protege el cifrado. Sin mandato de puertas traseras. | Una orden judicial puede obligar a los proveedores a entregar los datos que poseen | Con BYOK no poseemos las llaves. Con llaves gestionadas: cumplir con órdenes judiciales válidas. |
| Tailandia | El Computer Crime Act permite a las autoridades exigir las llaves de descifrado | Sí: las autoridades pueden obligar a entregar las llaves de cifrado | El nivel agresivo de seguridad es indispensable. BYOK es crítico para los activistas tailandeses. |
| India | La sección 69 del IT Act permite al gobierno exigir el descifrado | Sí: no colaborar con el descifrado puede sancionarse | BYOK es crítico. El gobierno indio ha impulsado el acceso por puerta trasera. |
| Líbano | Sin restricciones formales al cifrado | Múltiples servicios de inteligencia operan al margen de la ley | No hay marco legal para obligar, pero la incautación física sí es un riesgo. La opción autoalojada es importante. |

**DECIDIDO: declarar la imposibilidad + impugnar.** GreenGrass responde que no posee las llaves de descifrado y no puede cumplir, y remite a la autoridad a la organización. Además, GreenGrass impugna activamente la base legal de la exigencia aunque cumplirla sea técnicamente imposible: para sentar precedente, para dejar clara su postura ante los usuarios y para aportar al ecosistema legal más amplio en torno a los derechos de cifrado. Se le avisa a la organización, salvo que una orden de confidencialidad lo prohíba. Todas las exigencias y las respuestas se incluyen en el informe anual de transparencia.

## Infraestructura de cumplimiento

### Configuración de cumplimiento por organización

Cada organización debe configurar:

- **Jurisdicción:** qué leyes de qué país aplican a su operación
- **Tipo de contienda:** federal, estatal/provincial o local (afecta los requisitos de reporte)
- **Fechas del periodo de campaña:** inicio y fin oficiales del periodo de campaña
- **Reglas de contribución:** límites, fuentes prohibidas, umbrales de declaración (precargadas desde plantillas por jurisdicción, personalizables)
- **Reglas de comunicación:** restricciones de canal, requisitos de aviso legal (precargadas desde plantillas por jurisdicción)
- **Política de conservación:** cuánto tiempo conservar cada tipo de registro (por defecto, lo que marque la jurisdicción; la organización puede extenderlo, pero no acortarlo)

### Panel de cumplimiento

Los administradores de cada organización necesitan una vista de cumplimiento que muestre:

- **Alertas de contribuciones:** donaciones marcadas (cerca de los límites, con estatus extranjero, con información obligatoria faltante)
- **Salud del consentimiento:** porcentaje de contactos con consentimiento válido por canal, consentimientos próximos a vencer
- **Fechas límite de reporte:** próximas fechas de presentación con su estado de preparación
- **Solicitudes de los interesados:** solicitudes pendientes de acceso, eliminación o corrección, con temporizadores de SLA
- **Acceso al registro de auditoría:** registro de auditoría con búsqueda y capacidad de exportación

### Verificaciones automáticas de cumplimiento

La plataforma debería correr verificaciones de cumplimiento continuas:

- **En tiempo real:** verificación de límites de contribución, filtro de donantes extranjeros, verificación del consentimiento al momento del envío, presencia del aviso legal en las comunicaciones salientes
- **Por lotes:** contribuciones que se acercan a los límites (advertencias), alertas de vencimiento de consentimiento, información obligatoria faltante de donantes, aplicación de las restricciones del periodo de campaña
- **Antes de reportar:** verificaciones de completitud de los datos antes de las fechas límite de presentación, conciliación de los registros de donaciones contra los datos del procesador de pagos

### Motor de reportes de cumplimiento

**Nota de arquitectura:** el motor de reportes sigue el enfoque híbrido decidido más arriba: generadores integrados que se agregan por jurisdicción a medida que arrancan los pilotos, con la exportación de datos estructurados como alternativa universal. Por dentro, los reportes específicos por jurisdicción se implementan como módulos por jurisdicción que se cargan según la configuración de cada organización, siguiendo el mismo patrón de adaptadores que usa todo el sistema (pagos, SMS, redes sociales).

## Estructura corporativa y jurisdicción

**Ya decidido (en security.md):** constituirse en una jurisdicción con protección fuerte de la privacidad (Estonia o Suiza como candidatas).

**Consideraciones estructurales:**

**DECIDIDO: entidad única con opción de filiales.** Empezar con una sola empresa en la jurisdicción de constitución, operando globalmente mediante contratos con proveedores de servicios locales. Si alguna jurisdicción exige presencia local (el escrutinio de la FCRA en India, los requisitos del TSE en Brasil), se constituyen filiales locales de propiedad total según haga falta. La arquitectura ya lo soporta: con residencia de datos por país e infraestructura modular, montar una filial no exige rearquitecturar nada, solo sumar una entidad legal y contratos locales.

Factores a considerar:
- **FCRA (India):** las entidades extranjeras que prestan servicios a organizaciones políticas quedan bajo escrutinio. Es probable que haga falta una filial local.
- **TSE (Brasil):** los proveedores de tecnología de campaña pueden tener que registrarse. Conviene tener presencia local.
- **Implicaciones fiscales:** precios de transferencia, impuestos a los servicios digitales, IVA o impuestos equivalentes en cada jurisdicción.
- **Banca:** cada país necesita capacidad local de procesamiento de pagos. Las filiales pueden tener cuentas bancarias locales.
- **Responsabilidad:** las filiales locales pueden limitar la exposición de la matriz a acciones legales locales.

## Hoja de ruta de cumplimiento

### Alfa (Puerto Rico)

**Requisitos previos al lanzamiento:**
- Módulo de cumplimiento EE. UU./FEC completamente construido y probado
- Requisitos de la CEE de Puerto Rico validados con asesoría legal local
- Mecanismos de consentimiento TCPA/CAN-SPAM operativos
- Formato de reporte de la FEC validado
- Verificación de límites de contribución operativa
- Generación de avisos legales para las comunicaciones políticas
- Panel de cumplimiento básico

### Piloto 1 (Brasil)

**Requisitos previos al lanzamiento:**
- Evaluación de cumplimiento de la LGPD completada
- Registro o notificación ante el TSE (si se requiere)
- Registro ante el TSE completado (si se requiere; pendiente de la determinación de la asesoría legal)
- Integración de pagos con PIX, con verificaciones de cumplimiento de las donaciones
- Formato de reporte del TSE implementado
- Restricciones del canal de WhatsApp implementadas según las reglas del TSE
- Mecanismos de consentimiento LGPD (separados del consentimiento general)
- Evaluación de impacto en la protección de datos completada
- Textos legales en portugués revisados por asesoría brasileña

### Piloto 2 (Tailandia)

**Requisitos previos al lanzamiento:**
- Evaluación de cumplimiento de la PDPA completada
- Registro o notificación ante la ECT (si se requiere)
- Marco de riesgo de contenido para lesa majestad implementado
- Filial o alianza tailandesa establecida
- Integración con PromptPay, con verificaciones de cumplimiento de las donaciones
- Formato de reporte de la ECT implementado
- Mecanismos de consentimiento PDPA operativos
- Nivel agresivo de seguridad totalmente operativo (crítico para Tailandia)
- Textos legales en tailandés revisados por asesoría tailandesa

### Piloto 3 (India)

**Requisitos previos al lanzamiento:**
- Evaluación de cumplimiento de la DPDPA completada
- Registro o interlocución con la ECI
- Opinión legal sobre la FCRA obtenida, que valide el posicionamiento como proveedor de tecnología (con filial constituida si la asesoría lo recomienda)
- Integración con UPI, con verificaciones de cumplimiento de las donaciones
- Formato de reporte de la ECI implementado
- Reglas de aplicación del MCC implementadas (periodo de campaña)
- Avisos de consentimiento multilingües (hindi + inglés + lenguas regionales)
- Infraestructura de localización de datos operativa en India
- Textos legales en lenguas indias revisados por asesoría india

### Piloto 4 (Líbano)

**Requisitos previos al lanzamiento:**
- Línea base de cumplimiento establecida (estándar GDPR / jurisdicción de constitución, según la decisión anterior)
- Registro o notificación ante la SCE (si se requiere)
- Seguimiento de donaciones en efectivo totalmente operativo
- Integración con OMT, con verificaciones de cumplimiento de las donaciones
- Formato de reporte de la SCE implementado
- Sistema confesional de escaños contemplado en las funcionalidades de campaña
- Textos legales en árabe, francés e inglés revisados por asesoría libanesa
- Nivel agresivo de seguridad + opción autoalojada disponibles (crítico para Líbano)
- Plan de resiliencia de infraestructura ante la inestabilidad eléctrica y de internet

## Preguntas abiertas para la asesoría legal

Lo siguiente requiere trabajar con profesionales del derecho antes de implementarlo:

1. **Selección final de la jurisdicción de constitución:** Estonia, Suiza u otras candidatas. Análisis de tratados de asistencia legal mutua (MLAT), implicaciones fiscales, viabilidad operativa.
2. **Estructura corporativa:** según la decisión anterior, requiere el aporte de asesores legales y fiscales.
3. **Evaluación del riesgo bajo la FCRA (India):** ¿puede GreenGrass operar como proveedor de tecnología? ¿Basta con una filial?
4. **Registro de la plataforma ante el TSE (Brasil):** ¿tiene GreenGrass que registrarse como plataforma tecnológica de campaña?
5. **Defensa legal del BYOK:** ¿se ha puesto a prueba la "imposibilidad arquitectónica de cumplir" en alguna jurisdicción objetivo? Hace falta una opinión legal.
6. **Responsabilidad de la plataforma por el contenido de los usuarios:** en especial en materia de lesa majestad (Tailandia), infracciones al MCC (India) y contenido sectario (Líbano).
7. **Requisitos de delegado de protección de datos:** ¿qué jurisdicciones exigen un DPO, y puede una sola persona cubrir varias jurisdicciones?
8. **Legalidad del warrant canary:** ¿son legalmente defendibles los warrant canaries en cada jurisdicción objetivo?
9. **Legalidad del cifrado de extremo a extremo:** ¿es admisible ofrecer mensajería cifrada de extremo a extremo a organizaciones políticas en todas las jurisdicciones objetivo?
10. **Seguros:** seguro de responsabilidad cibernética, seguro de riesgo político y seguro de directores y funcionarios en cada jurisdicción.

<!-- REVISIT: Este documento aporta el marco. Cada lanzamiento de país requiere un cuaderno de cumplimiento dedicado, desarrollado con asesoría legal local. Ese cuaderno debe validar cada supuesto que hay aquí e identificar cualquier requisito que se nos haya escapado. -->
