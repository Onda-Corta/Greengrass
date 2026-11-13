# ADR-026: Precios por carril

**Estado:** Aceptada
**Fecha:** 2026-11-13
**Fuentes:** `spec/product.md`, `spec/fundraising.md`, `design/architecture/system.md`, `decisions/007-fundraising-payments.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`

## Contexto

El corpus ha decidido los precios dos veces. [fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma) y [ADR-007 § Cero comisión de la plataforma sobre las donaciones](007-fundraising-payments.md#cero-comisión-de-la-plataforma-sobre-las-donaciones) decidieron niveles de suscripción fija, no atados a ninguna métrica de uso. [ADR-019 § Dos planos de facturación, y sin margen en el segundo](019-central-services-and-metered-billing.md#dos-planos-de-facturación-y-sin-margen-en-el-segundo) mantuvo la suscripción y le puso al lado un segundo plano: los costos medidos de terceros trasladados al costo, sin margen, de modo que los ingresos vinieran únicamente de la suscripción.

El modelo de dos carriles ([ADR-022](022-core-modules-and-lanes.md)) enuncia los precios en otros términos, y quien dirige el producto decidió que esos precios prevalecen sobre la especificación.

Esta ADR está `Aceptada`. Los precios están decididos. Varias definiciones que los precios necesitan no lo están, y aparecen como abiertas en [Definiciones que todavía faltan](#definiciones-que-todavía-faltan). Son vacíos, no objeciones, y nada en esta ADR los llena.

### Conflictos que resuelve esta ADR

Esta ADR revierte decisiones aceptadas. Los conflictos se nombran para que la reversión quede a la vista.

1. **[fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma)** decide una suscripción fija, de niveles «no atados al volumen de donaciones, al número de usuarios ni a ninguna métrica de uso». Queda sin efecto.
2. **[ADR-007 § Cero comisión de la plataforma sobre las donaciones](007-fundraising-payments.md#cero-comisión-de-la-plataforma-sobre-las-donaciones)** dice que los ingresos vienen «por completo de las suscripciones a la plataforma (planes fijos, no por uso)». Esa oración queda sin efecto. La decisión que le da nombre a la sección, que la plataforma no se queda con nada de las donaciones, no está entre las cosas que los nuevos precios dejan sin efecto.
3. **[ADR-019 § Dos planos de facturación, y sin margen en el segundo](019-central-services-and-metered-billing.md#dos-planos-de-facturación-y-sin-margen-en-el-segundo)** dice «GreenGrass no le carga margen a los costos medidos» y «Los ingresos de GreenGrass vienen únicamente de la suscripción». Las dos quedan sin efecto.
4. **El razonamiento de la propia ADR-019.** Descartó un margen sobre el traslado «porque le da a GreenGrass un incentivo para empujar el consumo, el incentivo que la ADR-007 rechazó para las donaciones». El precio del carril comercial contiene un margen. Esta ADR no responde a ese argumento. Deja constancia de que la decisión se tomó con el argumento a la vista.
5. **[ADR-019 § Diferido: una asignación medida en el plan gratuito](019-central-services-and-metered-billing.md#diferido-una-asignación-medida-en-el-plan-gratuito)** y [product.md](../spec/product.md) dan por sentado que existe un plan gratuito o de muy bajo costo. Si sobrevive es ahora una pregunta abierta.
6. **[ADR-018 § Lo que la propuesta responde](018-ai-agent-posture.md#lo-que-la-propuesta-responde)** tiene el traslado de la ADR-019, «al costo, sin margen», como la respuesta propuesta a su punto sobre el costo. La medición lo sigue respondiendo. El «sin margen» no se sostiene en el carril comercial.

## Decisión

### Los precios

| Carril | Precio |
|---|---|
| Político (Greengrass) | Al costo, más la comisión que cubre el costo de vender |
| Comercial (Basecamp) | El costo, más un margen de 30 % para la dueña del producto, más la comisión de la Comercializadora |

<!-- REVISIT: «la dueña del producto» (the product's owner) y «la Comercializadora» se usan tal como las dio quien dirige el producto. Ninguna de las dos está definida en ninguna parte del corpus. Las dos necesitan una definición antes de que se pueda calcular un precio. -->

Estos precios prevalecen sobre la especificación. Donde la ADR-007, la ADR-019 y `fundraising.md` dicen otra cosa, quedan sin efecto:

- La suscripción fija no atada «a ninguna métrica de uso» ([fundraising.md § Modelo de ingresos de la plataforma](../spec/fundraising.md#modelo-de-ingresos-de-la-plataforma), ADR-007).
- «GreenGrass no le carga margen a los costos medidos» y «los ingresos vienen únicamente de la suscripción» (ADR-019).

**Alternativas consideradas:** El modelo que esto reemplaza, una suscripción fija con los costos medidos trasladados sin margen, está registrado en la ADR-019 con su razonamiento. No consta ninguna otra alternativa. Los precios los fijó quien dirige el producto junto con el modelo de dos carriles.

### El precio es una regla del carril, no del Core

El Core mide solo el costo. Los eventos de uso de la ADR-019 ya llevan el costo del proveedor de cada llamada, y eso no cambia. Cada carril aplica su propia regla de precio encima del costo medido. La regla de precio de un carril es parte de su configuración ([ADR-022 § Qué le exigen los carriles al diseño](022-core-modules-and-lanes.md#qué-le-exigen-los-carriles-al-diseño)).

El estado de cuenta de un cliente debería mostrar el costo, el margen y la comisión en líneas separadas. Eso mantiene la transparencia de la ADR-019 en los dos carriles: un cliente siempre puede ver cuánto costó algo y qué se le sumó.

### Qué queda de la ADR-019

Los nuevos precios necesitan esto, y no cambia:

- **La medición por llamada del costo del proveedor.** Cada llamada a un servicio central emite un evento de uso con el costo del proveedor.
- **Los estados de cuenta desglosados.**
- **Los topes de gasto,** con un aviso y un corte.
- **Nada viene activado por defecto.**
- **El modo de facturación `alliance_pays`.** Una alianza, o una asociación ([ADR-024 § La misma forma en el carril comercial](024-event-bus-as-federation.md#la-misma-forma-en-el-carril-comercial)), puede pagar los costos de sus miembros. Pagar no es ver.

Todo lo de la ADR-019 que no trata del precio tampoco cambia: los servicios centrales, la ejecución por cliente, que no se conserve nada, el catálogo y los derechos de uso, la disponibilidad por nivel de aislamiento.

### Definiciones que todavía faltan

Abierto. Los precios no se pueden calcular hasta que cada una de estas tenga respuesta, y esta ADR no da ninguna.

1. **Qué incluye el «costo».** ¿Solo los cargos medidos de los proveedores, o también una parte del alojamiento y de construir y operar el Core y los módulos?
2. **Cómo se calcula cada comisión.** Un monto fijo o un porcentaje, y de qué.
3. **A qué se le aplica el 30 %.** A toda la factura, o solo a una parte.
4. **Cómo se reparten entre los carriles los costos compartidos.** El corpus de captura les sirve a los dos.
5. **Si el plan gratuito sobrevive.** [product.md](../spec/product.md) prometió un plan freemium, y la ADR-019 difirió la pregunta de una asignación medida dentro de él.
6. **Quiénes son «la dueña del producto» y «la Comercializadora».**

De esos vacíos se siguen dos puntos más, que se anotan para que no se pierdan:

- **Las donaciones.** La cero comisión de la plataforma sobre las donaciones de la ADR-007 sigue en pie. Si una comisión se define como un porcentaje, hay que decir sobre qué base, y una base que incluya el volumen de donaciones revertiría la ADR-007 y tendría que decirlo.
- **El chat.** Si el chat se vuelve la superficie principal, la inferencia es un costo del trabajo diario de siempre ([ADR-023 § Costo y canal](023-surfaces-chat-admin-field.md#costo-y-canal)). Lo que se defina que incluye el «costo» tiene que contemplarla.

### Orden interno: avisos de enmienda

Esta ADR amplía la línea de **Enmendada por** de la [ADR-007](007-fundraising-payments.md) y les agrega una a la [ADR-019](019-central-services-and-metered-billing.md) y a la [ADR-020](020-central-service-line-up-and-builders.md), cuyos servicios se describen trasladando los costos «al costo».

## Consecuencias

**Beneficios:**
- Cada carril tiene un precio enunciado, y los dos pueden ser distintos sin una segunda base de código ni una segunda cadena de medición
- El precio se arma sobre un número que el Core ya mide, el costo del proveedor de cada llamada
- El cliente ve el costo, el margen y la comisión en líneas separadas
- Una asociación puede pagar por sus agencias miembro con el mecanismo que ya se construyó para las alianzas

**Costos:**
- Se revierten dos decisiones de precios aceptadas, a menos de siete semanas de la segunda
- Se pierde el argumento de la previsibilidad a favor de una tarifa fija: la factura de un cliente ahora se mueve con su uso
- El carril comercial gana con el consumo, el incentivo que la ADR-019 se propuso evitar, y nada aquí reemplaza esa salvaguarda
- Los precios no se pueden cotizar hasta que existan seis definiciones
- El principio de accesibilidad, un plan gratuito o de muy bajo costo que de verdad se pueda usar, no tiene un lugar enunciado en el nuevo modelo

**Restricciones:**
- El Core mide el costo y nada más; la regla de precio de ningún carril vive en el Core
- Un estado de cuenta muestra el costo separado de cualquier cosa que se le sume
- Nada viene activado por defecto, y todo servicio medido tiene un tope de gasto
- La cero comisión de la plataforma sobre las donaciones de la ADR-007 sigue en pie mientras una decisión posterior no la revierta por su nombre
- Ninguna de las definiciones abiertas se puede dar por sentada en una cotización, un contrato o una implementación

**ADR relacionadas:** [ADR-007](007-fundraising-payments.md) (enmendada: «los ingresos vienen por completo de las suscripciones a la plataforma» queda sin efecto; la cero comisión de la plataforma sobre las donaciones sigue en pie), [ADR-018](018-ai-agent-posture.md) (su punto sobre el costo: la medición lo sigue respondiendo, el «sin margen» ya no se sostiene en el carril comercial), [ADR-019](019-central-services-and-metered-billing.md) (enmendada: los dos planos de facturación y el «sin margen» quedan sin efecto; se mantienen la medición, los estados de cuenta, los topes de gasto y `alliance_pays`), [ADR-020](020-central-service-line-up-and-builders.md) (enmendada: «al costo» es lo que mide el Core, no lo que paga un cliente), [ADR-022](022-core-modules-and-lanes.md) (los dos carriles; las reglas de precio son configuración de carril), [ADR-023](023-surfaces-chat-admin-field.md) (el costo del chat), [ADR-024](024-event-bus-as-federation.md) (una asociación paga igual que una alianza)
