# Recaudación de fondos e infraestructura de pagos

## Propósito

Este documento especifica las capacidades de recaudación de fondos y la infraestructura de pagos de GreenGrass. Parte de las decisiones tomadas en workflows.md (flujos de donación, repartos entre alianzas, analítica), compliance.md (bloqueo de contribuciones extranjeras, reportes de financiamiento de campaña, consentimiento), geography.md (métodos de pago por país) y system.md (patrón de adaptador de pagos, modelo de datos).

Recaudar fondos es una función de supervivencia para cualquier campaña política. En el Sur Global la infraestructura de pagos varía muchísimo — desde PIX en Brasil (instantáneo, gratis, omnipresente) hasta flujos basados en efectivo en Líbano (con el sistema bancario en crisis). GreenGrass tiene que manejar todo eso detrás de una interfaz consistente, y que cada transacción quede auditable, en cumplimiento y atribuida.

## Filosofía de recaudación

1. **Todo método de pago es de primera clase.** Las donaciones en efectivo no son transacciones de segunda. PIX no es un parche para las tarjetas de crédito. El método de pago dominante de cada país recibe integración nativa, no capas de compatibilidad.
2. **El cumplimiento es el producto.** Los reportes de financiamiento de campaña, la divulgación de donantes, los límites de contribución — eso no es un impuesto sobre la funcionalidad de recaudación, es la razón por la que una campaña elige una plataforma hecha a propósito en vez de herramientas de pago genéricas.
3. **Transparencia hacia el donante.** El donante ve exactamente adónde va su dinero: cargos por procesamiento, repartos, monto neto que llega a la campaña. Sin cargos ocultos, sin repartos opacos.
4. **Funciona sin conexión.** Registrar una donación en efectivo tiene que funcionar sin conectividad. La sincronización ocurre al volver a estar en línea.

## Estrategia de procesadores de pago

### Enfoque de selección de procesador

**DECIDIDO: híbrido — un procesador global como columna vertebral + procesadores locales para los métodos propios de cada país.** Un procesador global (por ejemplo, Stripe) maneja las tarjetas de crédito y aporta la infraestructura de base. Los procesadores locales manejan los métodos específicos de cada país (PIX, UPI, PromptPay, ATH Móvil, OMT) para conseguir las mejores tarifas y cobertura nativa. El patrón de adaptador de pagos de system.md soporta esto sin fricción: cada procesador es un adaptador detrás de una interfaz común.

### Plan de integración de pagos por país

| País | Métodos principales | Enfoque de procesador | Moneda de liquidación |
|---------|----------------|-------------------|-------------------|
| Puerto Rico | Tarjetas de crédito, ATH Móvil, Venmo, Zelle | Tarjetas de crédito por procesador global; ATH Móvil vía ATH Business API; Venmo/Zelle vía sus respectivas APIs o registro manual | USD |
| Brasil | PIX, Boleto, tarjetas de crédito | PIX vía procesador local (por ejemplo, Mercado Pago, PagSeguro, o integración directa con el Banco Central); tarjetas de crédito vía procesador global o local | BRL |
| Tailandia | PromptPay, TrueMoney, transferencia bancaria | PromptPay vía procesador local (por ejemplo, Omise/Opn Payments); TrueMoney vía API; transferencia bancaria vía procesador local | THB |
| India | UPI, Paytm, PhonePe, transferencia bancaria | UPI vía agregador de pagos local (por ejemplo, Razorpay, Cashfree); las demás billeteras por el mismo agregador | INR |
| Líbano | Efectivo, OMT, transferencia bancaria | Efectivo registrado dentro de la plataforma; OMT por registro manual (no hay API); transferencias bancarias donde el sistema bancario lo permita | USD (economía dolarizada de facto) o LBP |

### Puesta en marcha del procesador

Cada organización tiene que configurar al menos un procesador de pagos durante la puesta en marcha (decidido en workflows.md). La plataforma ofrece:

- **Asistente de configuración guiada** — acompaña a la organización a conectar su cuenta o cuentas de procesador
- **Opciones de procesador preconfiguradas** — lista por jurisdicción de procesadores soportados, con instrucciones de configuración
- **Modo de prueba** — la organización puede crear donaciones de prueba para verificar su configuración antes de salir en vivo
- **Seguridad de credenciales** — las llaves de API del procesador se guardan en HashiCorp Vault (según system.md), cifradas en reposo, y nunca vuelven a exponerse en la interfaz después de la carga inicial

## Manejo de múltiples monedas

**DECIDIDO: se aceptan varias monedas, se liquida en una sola.** La organización acepta donaciones en varias monedas, pero todas se liquidan en su moneda principal. La plataforma registra moneda original, monto original, tasa de conversión y monto liquidado. El donante da en su propia moneda (crítico para recaudar en la diáspora) y la campaña recibe todo en su moneda principal. Limpio para la contabilidad, sin necesidad de cuentas bancarias multimoneda.

Implementación:
- **Cada donación registra:** moneda original, monto original, tasa de conversión (si hubo), moneda de liquidación, monto de liquidación, cargos del procesador, monto neto
- **Las tasas de conversión** se capturan en el momento de la transacción y se guardan de forma inmutable — no hay recálculo retroactivo
- **La moneda de visualización** se configura por organización para paneles y reportes, y la moneda original siempre queda visible en el registro de cada transacción
- **Los repartos entre alianzas** (decididos en workflows.md) se calculan sobre el monto de liquidación, no sobre el original, para evitar discrepancias de conversión

## Tipos de donación y flujos

### Donaciones únicas

Ya especificadas en workflows.md. Adiciones clave:

- **Monto mínimo de donación** — configurable por organización, con pisos específicos por jurisdicción donde apliquen
- **Monto máximo de donación** — se aplican los límites de contribución de cada jurisdicción (compliance.md), con verificación en tiempo real contra el acumulado del donante
- **Donaciones anónimas** — permitidas donde la jurisdicción lo autorice, con registro aparte para cumplimiento (algunas jurisdicciones exigen identidad para donaciones por encima de cierto umbral aunque a la campaña se le muestren como "anónimas")

### Donaciones recurrentes

Workflows.md estableció que existen las donaciones recurrentes. Especificación detallada:

#### Configuración
- El donante elige la frecuencia: mensual (por defecto), semanal, trimestral, anual
- El donante fija el monto por período
- El método de pago tiene que soportar cargos recurrentes (tarjeta de crédito, autopago UPI, algunas configuraciones de PIX; no efectivo, no OMT, no Venmo/Zelle)
- El donante recibe una confirmación con términos claros: monto, frecuencia, fecha del próximo cargo, cómo cancelar

#### Manejo
- **Portal de autoservicio para donantes** — el donante puede ver, modificar, pausar o cancelar sus donaciones recurrentes sin contactar a la campaña
- **Opciones de modificación:** cambiar monto, cambiar frecuencia, cambiar método de pago, pausar (con fecha de reanudación), cancelar
- **Manejo del lado de la campaña:** el Director de finanzas puede ver todos los donantes recurrentes, filtrar por estado (activo, pausado, fallido, cancelado) y exportar

#### Procesamiento de pagos
- La plataforma dispara los cargos recurrentes a través del procesador según el calendario
- **Lógica de reintento ante fallo:**

**DECIDIDO: reintento inteligente.** Reintentar en los momentos óptimos que recomiende el procesador cuando esa información esté disponible (hasta 4 intentos en 14 días), y caer a un calendario simple (día 1, 3, 7) con los procesadores que no dan datos de reintento inteligente. Tras el fallo final, se marca como fallida y se notifica tanto al donante (con enlace para actualizar el método de pago) como a la campaña.

- **En el fallo final:** la donación recurrente se marca como fallida, se notifica al donante con enlace para actualizar el método de pago, y se notifica a la campaña en el panel de cumplimiento
- **Cargo exitoso:** se genera el recibo, se actualiza el registro del donante, se crea una entrada en el registro de auditoría

#### Notificaciones
- **Recordatorio previo al cargo** (opcional, configurable por la organización) — avisar al donante X días antes del próximo cargo
- **Confirmación de cargo exitoso** — recibo por correo o SMS, según la preferencia del donante
- **Aviso de cargo fallido** — notificación inmediata al donante con enlace para resolverlo
- **Método de pago por vencer** — avisar al donante cuando la tarjeta se acerca a su vencimiento (si el procesador da ese dato)

### Promesas de donación

**DECIDIDO: las promesas de donación son de primera clase.** El donante puede prometer una donación futura. La plataforma sigue el estado de la promesa (pendiente, cumplida, vencida), envía recordatorios configurables y conecta el cumplimiento con el pago real cuando llega. Las promesas son un tipo de donación formal con su propio ciclo de vida: se crean durante una jornada de llamadas o trabajo de campo, se envía el recordatorio según calendario, se cumplen cuando el donante completa el pago y vencen tras un plazo configurable. Conectan la operación de campo con el embudo de recaudación.

### Recaudación entre pares

**DECIDIDO: aplazado.** No entra en el alfa ni en los primeros pilotos. Por ahora todas las páginas de donación las controla la campaña. Aun así, el modelo de datos debe dejar espacio para la recaudación entre pares (páginas creadas por simpatizantes y vinculadas a campañas, con seguimiento de atribución) para poder añadirla después sin una migración dolorosa.

## Formularios de donación

### Tipos de formulario

1. **Página de donación alojada** — formulario a página completa en el subdominio GreenGrass de la organización (o en un dominio propio). Con la marca de la campaña, optimizado para celular, multilingüe.
2. **Widget incrustable** — embebido de JavaScript para sitios de terceros. Muestra un formulario en línea o un modal. Respeta el estilo de la página anfitriona en lo posible.
3. **Por enlace** — URL compartible que abre la página de donación alojada. Funciona en SMS, WhatsApp, correo y redes sociales.

### Configuración del formulario

La organización configura sus formularios de donación con:

- **Montos sugeridos** — hasta 5 montos predefinidos + opción de monto libre
- **Monto por defecto** — cuál de los predefinidos viene preseleccionado (si alguno)
- **Opción recurrente** — si se muestra el interruptor de recurrencia, y si lo recurrente o lo único es el valor por defecto
- **Opción de cargo por procesamiento** — si se le ofrece al donante la opción de cubrir los cargos por procesamiento
- **Campos obligatorios** — los datos del donante que exige cada jurisdicción (nombre, correo/teléfono, empleador/ocupación)
- **Campos personalizados** — campos adicionales definidos por la organización (por ejemplo, "¿Cómo te enteraste de nosotros?", talla de camiseta para donaciones de eventos)
- **Métodos de pago** — cuáles de los métodos configurados se muestran en este formulario
- **Idioma** — el idioma del formulario (de los idiomas configurados por la organización), con detección automática según el idioma del navegador o dispositivo de quien visita
- **Marca** — logo, colores, imagen principal, mensaje de agradecimiento
- **Designación** — asignación opcional a un fondo o campaña si la organización usa contabilidad por fondos

### Traslado del cargo por procesamiento

**DECIDIDO: casilla de consentimiento expreso.** "Agrega $X.XX para cubrir los cargos por procesamiento y que el 100% de tu donación llegue a [campaña]." El cargo se calcula en tiempo real según la tarifa del procesador para el método de pago elegido, y se muestra antes de que el donante confirme. Que la casilla venga marcada o desmarcada por defecto lo configura la organización. Funcionalidad de MVP — es lo mínimo que se espera de una plataforma de recaudación para campañas.

### Analítica del formulario

Cada formulario de donación registra:
- Vistas, inicios (el donante empezó a llenar datos), completados, tasa de abandono
- Conversión por método de pago, tipo de dispositivo y fuente de referencia
- Monto promedio de donación
- Resultados de pruebas A/B (si se configuraron)

**DECIDIDO: pruebas A/B integradas.** La organización puede crear variantes del formulario (distintos montos sugeridos, textos, diseños), repartir el tráfico entre ellas y medir la conversión de cada una. La plataforma declara ganadora una variante según la métrica de éxito configurada (tasa de conversión, donación promedio, ingreso total). Es una capacidad central de optimización de recaudación.

## Cargos por procesamiento

### Estructura de cargos

**DECIDIDO: cero comisión de plataforma.** GreenGrass no se queda con nada de las donaciones. La organización paga solo los cargos del procesador de pagos. Cada dólar llega a la campaña. El ingreso viene enteramente de suscripciones y servicios de la plataforma. Es la alineación más fuerte con la misión y el posicionamiento más limpio — los incentivos financieros de GreenGrass están atados a la calidad de la plataforma, no al volumen de donaciones.

### Transparencia de cargos

Sea cual sea la estructura de cargos:
- El donante ve el total que se le va a cobrar, incluyendo cualquier cargo que haya elegido cubrir
- La campaña ve: donación bruta, cargo del procesador, monto neto
- El recibo muestra el monto completo de la donación (bruto), no el neto — el donante dio el monto completo; los cargos son un costo de operación de la campaña (a menos que el donante haya elegido cubrirlos)

### Cargos esperados por método

| Método de pago | Cargo típico del procesador | Notas |
|---------------|----------------------|-------|
| Tarjeta de crédito | 2.9% + $0.30 (varía) | El cargo más alto, el método más universal |
| PIX (Brasil) | 0-1% | Costo muy bajo, liquidación instantánea |
| UPI (India) | 0% (subsidiado por el gobierno, puede cambiar) | Hoy es gratis para los comercios |
| PromptPay (Tailandia) | 0-0.25% | Costo muy bajo |
| ATH Móvil (PR) | ~1-2% | Más bajo que las tarjetas de crédito |
| Venmo/Zelle | Varía | Persona a persona puede ser gratis; las cuentas de negocio tienen cargos |
| OMT (Líbano) | Cargo fijo por transacción | Basado en efectivo, la estructura de cargos varía |
| Efectivo | 0% de cargo por procesamiento | Pero tiene el costo administrativo de registrarlo y conciliarlo |

## Manejo de donaciones en efectivo

Workflows.md estableció el flujo básico del efectivo. Especificación detallada:

### Registro

- **Funciona sin conexión** — las donaciones en efectivo se pueden registrar sin conectividad (crítico en eventos y trabajo de campo)
- **Campos obligatorios:** monto, fecha, quien recibió (el miembro del equipo o voluntario que recibió el efectivo)
- **Campos opcionales:** nombre del donante, datos de contacto del donante, contexto del evento, designación, foto del recibo
- **Registro de anónimos:** si el donante no quiere identificarse, se registra como anónimo con la constancia de quien recibió. Se aplican las reglas de la jurisdicción sobre límites a donaciones anónimas (por ejemplo, el límite de ₹2,000 en efectivo sin identidad en India)

### Cadena de custodia

**DECIDIDO: cadena de custodia completa.** La plataforma registra quién recogió el efectivo, cada traspaso (voluntario → líder de equipo → personal de finanzas), cuándo se depositó y de qué depósito bancario forma parte. Cada traspaso es un evento registrado con quien entrega, quien recibe, marca de tiempo y monto. Crítico para el cumplimiento y la prevención de fraude en entornos con mucho efectivo, como Líbano.

### Conciliación

- El Director de finanzas cruza los registros de donaciones en efectivo contra los registros de depósitos bancarios
- La plataforma resalta las discrepancias (donaciones registradas sin depósito que las respalde, depósitos sin registros que los expliquen)
- El estado de conciliación se registra por donación: sin conciliar, cuadrada, en disputa
- Los reportes de conciliación quedan disponibles para las presentaciones de cumplimiento

## Recaudación en alianza

Ya decidido en workflows.md: repartos de donación configurables por campaña. Especificación detallada:

### Configuración del reparto

- El administrador de la alianza define las reglas de reparto para cada campaña de recaudación conjunta
- **Tipos de reparto:**
  - **Por porcentaje** — cada organización miembro recibe un porcentaje configurado (tienen que sumar 100%)
  - **Monto fijo primero** — una organización recibe un monto fijo por donación y el resto se reparte por porcentaje entre las demás
  - **Por umbral** — los porcentajes cambian una vez que se alcanza una meta de recaudación (por ejemplo, 60/40 hasta que la organización A llegue a $50k, y después 40/60)

**DECIDIDO: consentimiento unánime.** Todos los administradores de las organizaciones miembro tienen que aprobar cualquier cambio de reparto. El reparto del dinero es demasiado sensible para modificarlo de forma unilateral. La plataforma envía solicitudes de aprobación a todos los administradores, registra las respuestas y solo aplica el nuevo reparto cuando todos aprobaron. Los términos acordados originalmente siguen vigentes hasta que todos acepten los nuevos.

### Ejecución del reparto

- La donación se procesa a través del procesador de pagos de la alianza
- La plataforma calcula los montos del reparto según las reglas configuradas
- El reparto se calcula sobre el monto neto (después de los cargos del procesador), salvo que se configure de otra forma
- La parte de cada organización miembro se registra como un asiento contable aparte
- **Momento del desembolso:**

**DECIDIDO: configurable.** La alianza elige desembolso inmediato o por lotes en cada campaña. El inmediato exige que cada organización miembro tenga su propia cuenta de pagos conectada; el de lotes acumula en la cuenta de la alianza y desembolsa según un calendario configurado (semanal, mensual). La alianza elige lo que le sirva a la campaña.

### Reportes de la alianza

- Vista de la alianza: total recaudado, atribución por organización, montos del reparto, superposición de donantes entre organizaciones
- Vista de la organización miembro: solo su parte, con el detalle de las donaciones de los donantes que le fueron atribuidos
- Cumplimiento: la parte de cada organización se reporta por separado a efectos de financiamiento de campaña — una donación a una alianza no es una donación, son varias donaciones repartidas en el momento de la entrada

## Flujos de reembolso

### Quién puede iniciarlo

- **Director o Director de finanzas** — puede iniciar reembolsos desde la plataforma
- **Autoservicio del donante** — el donante no puede iniciar reembolsos directamente en la plataforma (tiene que usar el proceso de disputa de su procesador de pagos o contactar a la campaña)
- **Administrador de la plataforma** — puede iniciar reembolsos en casos de fraude o problemas a nivel de plataforma

### Tipos de reembolso

- **Reembolso total** — se devuelve el monto completo de la donación
- **Reembolso parcial** — se devuelve una parte de la donación (por ejemplo, si el donante pagó de más o quiere reducir una promesa)

### Proceso de reembolso

1. El Director de finanzas inicia el reembolso, elige la donación e ingresa el motivo
2. La plataforma verifica: ¿esta donación es parte de un reparto de alianza? Si lo es, calcula los montos a reembolsar por organización
3. Se envía el reembolso al procesador de pagos
4. Al confirmar el procesador: se actualiza el registro de la donación, se actualiza el registro del donante, se crea la entrada en el registro de auditoría y se ajustan los reportes de cumplimiento
5. Se notifica al donante del reembolso

### Restricciones del reembolso

- Solo se puede reembolsar por el método de pago original
- Las donaciones en efectivo no se pueden "reembolsar" desde la plataforma — se manejan manualmente y se registran como ajuste manual
- Reembolsar una donación recurrente no cancela automáticamente el calendario de recurrencia — el Director de finanzas tiene que cancelarlo aparte si corresponde
- Por lo general el procesador no devuelve sus cargos — ese costo lo absorbe la campaña

## Experiencia del donante

### Recibo de donación

Toda donación (incluyendo las de efectivo) genera un recibo que contiene:
- Nombre del donante (o "Donante anónimo")
- Monto de la donación (bruto — lo que dio el donante, no el neto)
- Fecha
- Nombre de la campaña u organización e información de la entidad legal
- Constancia de deducibilidad fiscal si aplica (depende de la jurisdicción — en muchos de los países objetivo las donaciones políticas no son deducibles)
- Número de referencia de la transacción
- Para las recurrentes: fecha del próximo cargo e instrucciones para cancelar

Los recibos se entregan por el canal preferido del donante (correo o SMS) y quedan disponibles en el portal de autoservicio.

### Portal de autoservicio del donante

Un donante con cuenta (o que crea una desde el enlace de un recibo) puede:
- Ver su historial de donaciones
- Descargar recibos
- Manejar sus donaciones recurrentes (modificar, pausar, cancelar)
- Actualizar métodos de pago
- Actualizar su información personal
- Manejar sus preferencias de comunicación (consentimiento)

**DECIDIDO: ambas — acceso por niveles.** Enlace mágico para acceso rápido (ver historial de donaciones, descargar recibos). Cuenta completa (passkey o correo) para las acciones de manejo (modificar donaciones recurrentes, actualizar el método de pago, cambiar datos personales). Poca fricción para lo común, autenticación en serio para todo lo que toque dinero.

### Estados de cuenta anuales del donante

Al cierre de cada año calendario (o fiscal, es configurable), la plataforma genera un estado de cuenta consolidado del donante:
- Todas las donaciones hechas en el período
- Monto total
- Desglose por campaña
- Información fiscalmente relevante según la jurisdicción
- Se envía automáticamente a todos los donantes que dieron durante el período

## Analítica de recaudación

Ya decidido en workflows.md: termómetro de recaudación en tiempo real, panel del Director de finanzas con ingresos por canal, campaña y período, retención de donantes, salud de las recurrentes y desglose de efectivo contra digital.

### Analítica adicional

- **Segmentación de donantes:** primera vez contra repetidos, únicos contra recurrentes, tramos de monto, método de pago, canal de adquisición
- **Valor de vida del donante:** contribuciones totales a lo largo del tiempo, frecuencia promedio, valor futuro proyectado
- **Identificación de donantes inactivos:** donantes cuyas donaciones recurrentes terminaron o que no dan desde hace X meses
- **Retorno de la campaña:** ingresos de recaudación contra el costo de las apelaciones (envíos de correo, costos de SMS, etc.)
- **Embudo de conversión:** vista del formulario → inicio del formulario → intento de pago → donación exitosa, con análisis de abandono en cada paso
- **Distribución geográfica:** donaciones mapeadas por ubicación del donante (donde el dato exista)

## Modelo de ingresos de la plataforma

**DECIDIDO: dos planos de facturación — una suscripción fija y un traslado al costo, medido por uso.** Enmendado por la [ADR-019](../decisions/019-central-services-and-metered-billing.md). La decisión original decía: niveles de suscripción fija, no atados al volumen de donaciones, al número de usuarios ni a ninguna métrica de uso. Eso sigue siendo cierto para la suscripción. Dejó de serlo para el modelo entero cuando la plataforma ganó servicios centrales cuyos costos de terceros no se pueden volver fijos.

**Plano 1 — Suscripción fija.** Precio mensual o anual fijo según el plan (básico, profesional, empresarial). Cubre la instancia de la organización, cada módulo interno que el plan incluya y el costo propio de GreenGrass por construir y operar los servicios centrales. Predecible para las campañas, simple de entender, sin sorpresas. Tiene que existir un plan gratuito o de costo muy bajo que sea genuinamente usable para campañas con pocos recursos.

**Plano 2 — Traslado al costo, medido por uso.** Los servicios centrales ([ADR-019](../decisions/019-central-services-and-metered-billing.md)) cargan costos variables de terceros que GreenGrass no puede evitar: tokens de inferencia de un proveedor de modelos, cargos por mensaje de las pasarelas de SMS y de WhatsApp, cargos por generación de los proveedores de generación de medios, cuotas por fuente de los proveedores de datos. Esos costos se trasladan a la organización que los generó.

**GreenGrass no le carga margen a los costos medidos.** El precio del proveedor es el precio de la organización: sin recargo, sin redondeo hacia arriba, sin empaquetar en unidades opacas, sin consumo mínimo. Cuando un proveedor le factura a GreenGrass en conjunto y no por organización, el método de reparto se publica y la organización paga su parte y nada más. Cuando las condiciones de un proveedor hacen imposible el traslado exacto, se usa la aproximación más cercana alcanzable y la desviación queda documentada en la entrada del servicio en el catálogo. Los ingresos de GreenGrass vienen únicamente de la suscripción, por la misma razón por la que no se queda con nada de las donaciones: la plataforma gana por la calidad de la plataforma, nunca por el volumen.

Lo que nunca se mide: el cómputo, el almacenamiento y el tiempo del personal de GreenGrass para correr un servicio central. Eso es costo de la suscripción. Un servicio sin costo variable de terceros no tiene plano medido en absoluto.

**Obligaciones de transparencia de los servicios medidos.** Nada viene activado por defecto. Antes de activar un servicio, la organización ve su precio unitario, el proveedor del que viene y una estimación con números. La organización puede fijar un tope de gasto por servicio, con un aviso y un corte. Un estado de cuenta mensual detalla cada servicio medido por unidades y por costo.

**Alianzas que pagan por sus miembros.** Una alianza puede absorber los costos medidos que genera el uso de servicios centrales por parte de sus miembros. Es un ajuste de la afiliación, `member_pays` (por defecto) o `alliance_pays`, que se elige al poner en marcha la alianza y que cada miembro ve antes de aceptar la afiliación ([workflows.md § 1. Puesta en marcha de una organización](workflows.md#1-puesta-en-marcha-de-una-organización)). Cambiarlo en una afiliación activa requiere a los Administradores de la organización de los dos lados, la misma regla que rige los cambios en el reparto de donaciones. Pagar no es ver: los resultados aterrizan en la organización miembro bajo las llaves del miembro, y la alianza recibe el estado de cuenta, nunca el contenido.

### Principios de precios (de product.md, se preservan sin importar el modelo)

- **No es precio por usuario** — explícitamente rechazado. Una campaña no debería pagar más por tener más voluntarios.
- **No es precio por transacción** — GreenGrass no se queda con nada de las donaciones (decidido arriba).
- **Accesible para campañas con pocos recursos** — tiene que existir un plan gratuito o de costo muy bajo, y tiene que ser genuinamente usable, no una versión mutilada.
- **Transparente** — sin cargos ocultos, sin cobros sorpresa.
- **Sin margen sobre los costos trasladados** — añadido por la ADR-019. Los costos variables de terceros llegan a la organización al costo. GreenGrass nunca gana con el consumo de una organización.

### Diferido: asignación medida en el plan gratuito

Si el plan gratuito o de costo muy bajo incluye alguna asignación medida —un saldo inicial de uso de servicios centrales y, de ser así, cuánto y para qué servicios— queda diferido. El principio de accesibilidad se mantiene tal como está escrito. Queda registrado aquí para que no se lea como decidido en ningún sentido; el piloto debería informarlo.

## Prevención de fraude

### Indicadores de fraude en donaciones

La plataforma vigila:
- **Donaciones pequeñas y rápidas** desde la misma fuente (fraccionamiento para esquivar los umbrales de divulgación)
- **Información del donante que no cuadra** (el nombre en el método de pago no coincide con los datos que dio el donante)
- **Patrones geográficos inusuales** (donaciones desde un país donde la campaña no opera, salvo que se espere aporte de la diáspora)
- **Verificaciones de velocidad** (pico inusual de donaciones desde una sola IP o un solo dispositivo)
- **Actores conocidos** (señales de fraude que provee el procesador)

### Respuesta ante fraude

- Las donaciones marcadas quedan retenidas para revisión del Director de finanzas (similar al depósito en garantía de contribuciones extranjeras)
- El Director de finanzas puede aprobar, reembolsar o escalar
- Los patrones de fraude repetidos disparan alertas y pueden llevar al bloqueo del método de pago
- Todas las marcas de fraude y sus resoluciones quedan en el registro de auditoría

## Sincronización de donaciones sin conexión

Las donaciones en efectivo registradas sin conexión siguen el protocolo de sincronización por event sourcing (system.md):

1. La donación se registra en el dispositivo y se guarda en SQLCipher
2. Se crea el evento: `DonationRecorded { amount, donor_info, collector, timestamp, event_context }`
3. Al haber conectividad: el evento se sincroniza con el servidor
4. El servidor valida: verificación de duplicados (mismo colector, mismo monto, misma marca de tiempo = probable duplicado) y aplica las reglas de la jurisdicción
5. La donación aparece en la cola de conciliación del Director de finanzas
6. Si hay conflicto (la misma donación registrada por dos personas): fusionar y marcar, según las reglas de conflicto del trabajo de campo (workflows.md)

## Preguntas abiertas resueltas

1. **Modelo de relación con el procesador de pagos**

**DECIDIDO: comercio directo.** Cada organización firma su propio acuerdo con el procesador de pagos. GreenGrass facilita la conexión (asistente de configuración guiada, opciones de procesador preconfiguradas) pero no es parte de la relación financiera. Es la separación de responsabilidad más limpia — GreenGrass es una plataforma de software, no un intermediario financiero. Evita la carga regulatoria de ser facilitador de pagos en cinco países.

2. **Donaciones en criptomonedas**

**DECIDIDO: aplazado.** No entra en el alfa ni en los pilotos. Si una organización acepta cripto por su propio procesador externo, la plataforma puede registrarlo como donación manual o externa. Ni se impide activamente ni se soporta activamente. Se revisa cuando haya claridad regulatoria en alguna de las jurisdicciones objetivo.

3. **Donaciones pareadas por empleadores**

**DECIDIDO: aplazado.** Es sobre todo una funcionalidad estadounidense y corporativa, poco relevante para la mayoría de las jurisdicciones del Sur Global en las fases tempranas. Se revisa cuando la plataforma madure y crezca el mercado estadounidense.

<!-- REVISIT: Integration with specific payment processors (API contracts, webhook formats, settlement timing) will need detailed technical specs per processor during implementation. Each processor adapter is its own mini-integration project. -->
