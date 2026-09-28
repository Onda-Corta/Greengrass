# ADR-007: Recaudación de fondos y pagos

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/fundraising.md`, `spec/workflows.md`
**Enmendada por:** [ADR-019](019-central-services-and-metered-billing.md) — el modelo de ingresos gana un segundo plano de facturación, medido por uso, para los servicios centrales, trasladado al costo y sin margen. «Planes fijos, no por uso», más abajo, describe ahora solo el plano de la suscripción.

## Contexto

La recaudación de fondos es una función de supervivencia para las campañas políticas. En el Sur Global, la infraestructura de pagos varía muchísimo: PIX en Brasil es instantáneo, gratuito y está en todas partes; UPI en India está subsidiado por el gobierno y no cuesta nada; el sistema bancario de Líbano colapsó y la mayoría de las transacciones son en efectivo, a través de servicios de transferencia de dinero como OMT. La plataforma tiene que manejar todo esto detrás de una interfaz consistente y, al mismo tiempo, garantizar que cada transacción sea auditable, cumpla con la ley y sea atribuible. Además, las campañas van desde operaciones pequeñas de una sola candidatura hasta grandes alianzas con requisitos complejos de reparto de donaciones.

## Decisión

### Estrategia híbrida de procesadores de pago globales y locales

Un procesador global (por ejemplo, Stripe) maneja las tarjetas de crédito y aporta la infraestructura de base. Los procesadores locales manejan los métodos de pago propios de cada país (PIX, UPI, PromptPay, ATH Móvil, OMT), con las mejores tarifas y cobertura nativa. Cada procesador es un adaptador detrás de una interfaz común: el patrón de adaptador de pagos permite cambiar o añadir procesadores sin rehacer la arquitectura.

Cada organización firma su propio acuerdo directamente con los procesadores de pago (modelo de comercio directo). GreenGrass facilita la conexión con asistentes de configuración guiada y opciones de procesador preconfiguradas, pero no es parte de la relación financiera. Así se separan las responsabilidades de la forma más limpia y se evita la carga regulatoria de facilitador de pagos (payfac) en cinco países.

**Alternativas consideradas:** Un único procesador global se descartó porque ninguno cubre todos los métodos de pago de los países objetivo con tarifas competitivas. GreenGrass como facilitador de pagos (payfac) se descartó porque obligaría a cumplir la regulación financiera en cada jurisdicción objetivo.

### Aceptación multimoneda, liquidación en una sola moneda

Las organizaciones aceptan donaciones en varias monedas, pero todas se liquidan en la moneda principal de la organización. Cada donación registra: moneda original, monto original, tasa de cambio al momento de la transacción (guardada de forma inmutable), moneda de liquidación, monto liquidado, cargos del procesador y monto neto. Los repartos de la alianza se calculan sobre el monto liquidado, no sobre el original, para evitar discrepancias de conversión.

**Alternativas consideradas:** La liquidación multimoneda se descartó porque obligaría a las campañas a mantener cuentas bancarias en varias monedas, algo poco práctico para la mayoría de las organizaciones objetivo.

### Reintentos inteligentes para las donaciones recurrentes

Cuando falla el cobro de una donación recurrente, la plataforma reintenta en los momentos óptimos que recomiende el procesador, cuando los ofrece (hasta 4 intentos en 14 días), y recurre a un calendario simple (día 1, 3 y 7) con los procesadores que no dan datos de reintento inteligente. Tras el fallo final, la donación se marca como fallida y se notifica tanto al donante (con un enlace para actualizar el método de pago) como a la campaña.

### Promesas de donación de pleno derecho

Las promesas de donación son un tipo formal de donación con su propio ciclo de vida: se crean durante una jornada de llamadas o tocando puertas, se envía un recordatorio según un calendario configurable, se cumplen cuando el donante completa el pago y caducan tras un plazo configurable. Esto conecta la cadena de procesamiento del trabajo de campo con la de recaudación de fondos: una promesa de donación hecha en una puerta se convierte en un compromiso registrado con seguimiento.

**Alternativas consideradas:** Tratar las promesas de donación como notas o etiquetas en los registros de contacto se descartó porque tienen implicaciones financieras y de cumplimiento que exigen un seguimiento estructurado.

### Pruebas A/B integradas para los formularios de donación

Las organizaciones pueden crear variantes de formulario (montos sugeridos, textos y disposiciones distintos), repartir el tráfico entre ellas y medir la conversión de cada variante. La plataforma declara ganadora a una variante según métricas de éxito configurables (tasa de conversión, donación promedio, ingreso total). Es una capacidad central de optimización de la recaudación, no un añadido.

### Cero comisión de la plataforma sobre las donaciones

GreenGrass no se queda con nada de las donaciones. Las organizaciones pagan solo los cargos de su procesador de pagos. Los ingresos vienen por completo de las suscripciones a la plataforma (planes fijos, no por uso). Eso mantiene honestos los incentivos: GreenGrass gana por la calidad de la plataforma, no por el volumen de donaciones.

**Alternativas consideradas:** Cobrar un porcentaje sobre las donaciones se descartó porque desalinea los incentivos y castiga a las campañas que recaudan bien. Un cargo por transacción se descartó por lo mismo.

### Reglas de reparto de donaciones configurables para las campañas de alianza

La recaudación a nivel de alianza admite varios tipos de reparto: por porcentaje, monto fijo primero (una organización recibe una cantidad fija y el resto se reparte) y por umbral (los porcentajes de reparto cambian cuando se alcanza una meta). Los administradores de todas las organizaciones miembro tienen que aprobar por unanimidad cualquier cambio de reparto: el reparto del dinero es demasiado delicado para modificarlo de forma unilateral. El momento del desembolso se configura por campaña: inmediato (cada organización tiene sus cuentas de pago conectadas) o por lotes (se acumula y se desembolsa según un calendario).

## Consecuencias

**Beneficios:**
- El método de pago dominante de cada país recibe integración nativa, no una capa de compatibilidad mínima
- El modelo de comercio directo evita la regulación de intermediario financiero en cinco países
- Sin comisión de la plataforma, a la campaña le llega todo menos lo que se queda el procesador, y desaparece cualquier incentivo para empujar el volumen de donaciones
- El seguimiento de las promesas de donación conecta las operaciones de campo con la recaudación de fondos de forma estructurada
- Las pruebas A/B les dan a las campañas con pocos recursos acceso a optimización profesional de la recaudación

**Costos:**
- Mantener adaptadores para más de 10 procesadores de pago en cinco países es trabajo de integración permanente
- Manejar varias monedas complica los informes financieros y el cumplimiento
- Manejar donaciones en efectivo (cadena de custodia completa: quien recauda → líder de equipo → personal de finanzas → depósito bancario) exige diseñar el flujo de trabajo con cuidado
- Las reglas de reparto de la alianza con consentimiento unánime pueden frenar los cambios operativos

**Restricciones:**
- Las donaciones en efectivo tienen que funcionar sin conexión y sincronizarse después (ver [ADR-005](005-offline-first-sync.md))
- Cada donación tiene que ser auditable de extremo a extremo para el cumplimiento en financiamiento de campañas
- Los reembolsos solo son posibles por el método de pago original
- El filtrado de contribuciones extranjeras (bloqueo en tiempo real de lo evidentemente inelegible, retención en custodia para los casos límite) tiene que integrarse con las verificaciones de cumplimiento

**ADR relacionados:** [ADR-004](004-data-model-integrity.md) (registro de auditoría completo de las transacciones financieras), [ADR-009](009-compliance-legal.md) (informes de financiamiento de campañas, bloqueo de contribuciones extranjeras), [ADR-003](003-identity-access-organization.md) (gobernanza de la alianza para las reglas de reparto), [ADR-005](005-offline-first-sync.md) (registro de donaciones en efectivo sin conexión)
