# Geografía objetivo

## Secuencia de despliegue

| Fase | País | Idiomas | Medios de pago | Consideraciones clave |
|-------|---------|-----------|--------------|-------------------|
| Alfa | Puerto Rico | Español, inglés | ATH Móvil, Venmo, Zelle, tarjetas de crédito (sistema financiero de EE. UU.) | Base de origen de los fundadores. Territorio de EE. UU. — ley electoral estadounidense, cumplimiento con la FEC. Bilingüe. Buena conectividad, con huecos en zonas rurales. El entorno más pequeño y controlado para la validación inicial. |
| Piloto 1 | Brasil | Portugués | PIX (dominante), Boleto, tarjetas de crédito | La democracia más grande de América Latina. Movimientos de base activos. PIX es un sistema de pago instantáneo dominante y exige una integración de primera clase. Buena conectividad urbana, variable en zonas rurales. |
| Piloto 2 | Tailandia | Tailandés | PromptPay, TrueMoney, transferencia bancaria | Soporte de escritura tailandesa. Buena penetración móvil. Entorno político complejo, con historial de intervención militar — ahí las funcionalidades de nivel de seguridad se vuelven relevantes. |
| Piloto 3 | India | Hindi, inglés + idiomas regionales | UPI (dominante), Paytm, PhonePe, transferencia bancaria | La democracia más grande del mundo. Prueba de estrés de escala masiva. Varios idiomas dentro de un mismo despliegue. Padrones electorales enormes. Panorama regulatorio diverso entre estados. La integración con UPI es indispensable. |
| Piloto 4 | Líbano | Árabe, francés, inglés | Mucho efectivo, OMT, transferencias bancarias (sistema bancario en crisis) | **Soporte RTL obligatorio.** Tres idiomas por despliegue. El contexto de seguridad más exigente — las funcionalidades del nivel agresivo (modo de coacción, resistencia al análisis de tráfico) son necesidades prácticas. La crisis económica afecta la infraestructura de pagos. Sistema político sectario. |

## Hoja de ruta de idiomas

| Fase | Idiomas añadidos | Requisitos de escritura |
|-------|----------------|-------------------|
| Alfa | Español, inglés | Latina (LTR) |
| Piloto 1 | Portugués | Latina (LTR) |
| Piloto 2 | Tailandés | Escritura tailandesa (LTR) |
| Piloto 3 | Hindi + idiomas regionales (por definir) | Devanagari + otras (LTR) |
| Piloto 4 | Árabe, francés | Escritura árabe (**RTL**), latina (LTR) |

**Implicación de arquitectura:** el soporte RTL tiene que estar diseñado dentro del framework de interfaz desde el principio, aunque el árabe no haga falta hasta el Piloto 4. Meterle RTL a una interfaz LTR ya madura sale bastante más caro que construir soporte bidireccional desde el día uno.

## Hoja de ruta de integración de pagos

| Fase | Sistemas de pago | Tipo |
|-------|----------------|------|
| Alfa | Tarjetas de crédito, ATH Móvil, Venmo, Zelle | Sistema financiero de EE. UU. — APIs bien documentadas, cumplimiento conocido |
| Piloto 1 | PIX, Boleto | Pago instantáneo brasileño (regulado por el Banco Central), boleto bancario |
| Piloto 2 | PromptPay, TrueMoney | Pago instantáneo tailandés, billetera electrónica |
| Piloto 3 | UPI, Paytm, PhonePe | Ecosistema de pago instantáneo indio (escala masiva) |
| Piloto 4 | OMT, flujos con mucho efectivo | Servicio de transferencia de dinero, con énfasis en el seguimiento de donaciones en efectivo por la crisis bancaria |

**Implicación de arquitectura:** la capa de pagos tiene que ser modular — una interfaz común con adaptadores de pago por país. El panorama de pagos de cada país es fundamentalmente distinto. El seguimiento de donaciones en efectivo del flujo de recaudación (decidido en workflows.md) se vuelve crítico para Líbano.

## Hoja de ruta de cumplimiento

| Fase | Áreas clave de cumplimiento |
|-------|---------------------|
| Alfa | Ley electoral de EE. UU. y de la FEC, protección de datos en EE. UU., regulaciones propias de Puerto Rico |
| Piloto 1 | Ley electoral brasileña (regulaciones del TSE), LGPD (ley de protección de datos de Brasil) |
| Piloto 2 | Ley electoral tailandesa, PDPA (ley de protección de datos de Tailandia), restricciones a la actividad política |
| Piloto 3 | Ley electoral india (regulaciones de la ECI), IT Act, variaciones a nivel estatal |
| Piloto 4 | Ley electoral libanesa (reglas de representación sectaria), sin ley integral de protección de datos (al 2024), sistema legal multiconfesional complejo |

<!-- REVISIT: Cada país necesita una evaluación de cumplimiento dedicada antes de lanzar el piloto. Debería ser una especificación de cumplimiento aparte por país, desarrollada con asesoría legal local. -->

## Implicaciones de residencia de datos

Según la especificación de seguridad, la residencia de datos es por país. Eso significa que GreenGrass necesita presencia de alojamiento en o cerca de:

| Fase | Ubicación de alojamiento necesaria |
|-------|----------------------|
| Alfa | EE. UU. (Puerto Rico es territorio estadounidense) |
| Piloto 1 | Brasil (la LGPD tiene preferencias de localización de datos) |
| Piloto 2 | Tailandia o Singapur (centro regional) |
| Piloto 3 | India (requisitos de localización de datos en discusión o implementación) |
| Piloto 4 | Líbano o una ubicación europea respetuosa de la privacidad (dada la inestabilidad bancaria y de infraestructura) |

## Relevancia del nivel de seguridad por país

| País | Nivel de seguridad que se espera que demanden | Notas |
|---------|------------------------------|-------|
| Puerto Rico | Estándar | Entorno político estadounidense estable |
| Brasil | De Estándar a Reforzado | Polarización política, pero instituciones en general estables |
| Tailandia | De Reforzado a Agresivo | Historial de golpes militares, represión política, leyes de lesa majestad |
| India | De Reforzado a Agresivo | Capacidad de vigilancia estatal, presión política sobre la oposición, escala de los datos |
| Líbano | Agresivo | Tensiones sectarias, múltiples servicios de inteligencia, presiones geopolíticas regionales, consideraciones sobre Hezbolá y actores estatales |

## Estrategia de localización

**DECIDIDO:** traducción asistida por IA con revisión humana.

La IA genera las traducciones iniciales; los equipos locales revisan y corrigen. La IA mantiene manejables el costo y los tiempos en una superficie de idiomas amplia (español, portugués, tailandés, hindi, árabe, francés, inglés); lo que mantiene la exactitud son los revisores locales.

- Las traducciones generadas por IA quedan marcadas como borradores hasta que una persona revisora las apruebe.
- Los flujos críticos (avisos de seguridad, texto legal, formularios de donación, textos de consentimiento) necesitan visto bueno humano antes de salir en vivo.
- Los equipos de campaña locales pueden aportar correcciones y mejoras desde una interfaz de revisión dentro de la plataforma.
- La memoria de traducción va acumulando las traducciones revisadas para mejorar la consistencia y bajar la carga de revisión con el tiempo.

**DECIDIDO:** se localizan tanto la interfaz como el contenido.

**Localización de la interfaz:** la interfaz de la plataforma (botones, etiquetas, navegación, mensajes del sistema, estados de error) se traduce a todos los idiomas soportados.

**Localización del contenido:** el contenido de campaña —plantillas de correo, guiones de trabajo de campo, textos de formularios de donación, descripciones de eventos, textos de páginas de acción— se puede escribir en varios idiomas dentro de una misma campaña. La versión correcta se sirve según:
- La preferencia de idioma de quien recibe (guardada en su identidad dentro de la plataforma)
- El idioma configurado por el voluntario (para herramientas de campo, como los guiones de trabajo de campo)
- El idioma del navegador o dispositivo de quien visita (para páginas públicas, con opción de cambiarlo a mano)

**Implicación de arquitectura:** toda superficie de creación de contenido en la plataforma necesita soporte multilingüe — no como agregado tardío, sino como capacidad central. Los objetos de contenido guardan varias variantes de idioma, y el proceso de traducción asistida por IA (decidido arriba) puede ayudar al personal a generar traducciones iniciales de su contenido en los idiomas que la organización tenga configurados.

<!-- REVISIT: El modelo de datos de la localización de contenido (cómo se guardan, versionan y sirven las variantes de idioma) necesita tratamiento en la especificación de arquitectura. Además, la traducción asistida por IA podría ofrecerse como herramienta dentro de la plataforma para el contenido de campaña, no solo para los textos de la interfaz. -->
