# ADR-010: Internacionalización y localización

**Estado:** Aceptada
**Fecha:** 2026-03-03
**Fuentes:** `spec/geography.md`, `design/architecture/system.md`, `design/ux/03-design-system/theming-strategy.md`, `spec/integrations.md`

## Contexto

GreenGrass tiene que dar soporte a siete idiomas en cinco países, con tres sistemas de escritura (latino, tailandés, devanagari) y dos direcciones de texto (LTR y RTL para el árabe). La superficie de idiomas crece con cada piloto: español e inglés para el alfa, portugués para Brasil, tailandés para Tailandia, hindi y lenguas regionales para India, árabe, francés e inglés para Líbano. El soporte de RTL no hace falta hasta el Piloto 4 (Líbano), pero adaptar RTL a una interfaz LTR ya madura sale mucho más caro que construir el soporte bidireccional desde el principio.

Los datos de límites electorales —distritos, precintos, circunscripciones— son la base del trabajo de campo y del GOTV (Get Out The Vote — movilización del voto), pero están fragmentados y son difíciles de conseguir en el Sur Global. Cada país tiene una geografía administrativa y una disponibilidad de datos completamente distintas.

## Decisión

### RTL y multilingüe desde el primer día

El soporte de texto bidireccional está integrado en el framework de la interfaz desde el principio, aunque el árabe no haga falta hasta el Piloto 4. Cada componente, cada disposición y cada patrón de interacción se diseñan para mostrarse tanto en LTR como en RTL.

**Alternativas consideradas:** Añadir RTL cuando hiciera falta (Piloto 4) se descartó porque adaptarlo a una aplicación ya madura sale mucho más caro que construirlo desde el principio. Se consideraron compilaciones separadas para RTL, pero se descartaron por imposibles de mantener.

### RTL con propiedades lógicas de CSS

Una sola hoja de estilos maneja las dos direcciones de texto con propiedades lógicas de CSS (`inline-start`/`inline-end`, `text-align: start`). Sin hojas de estilo duplicadas, sin archivos CSS por dirección. El atributo `dir` en la raíz del HTML controla la dirección de toda la maquetación.

Algunos elementos quedan exentos del volteo en RTL: números de teléfono, direcciones de correo, URL, montos de dinero, fragmentos de código, interfaces de mapas, controles de reproducción y marcas de verificación; todos se muestran siempre en LTR, sin importar la dirección de la interfaz. Los iconos direccionales (flechas, chevrones de navegación) se reflejan automáticamente en RTL.

**Alternativas consideradas:** Las hojas de estilo duplicadas para LTR y RTL se descartaron porque duplican el costo de mantenimiento y se van desincronizando. La transformación de RTL con JavaScript se descartó por frágil y lenta.

### Localización asistida por IA con revisión humana

La IA genera las traducciones iniciales en todos los idiomas admitidos. Personas revisoras las aprueban antes de que salgan en vivo. Los flujos críticos —avisos de seguridad, texto legal, formularios de donación, textos de consentimiento— requieren la aprobación de una persona. Los equipos de campaña locales pueden aportar correcciones desde una interfaz de revisión dentro de la plataforma. Una memoria de traducción acumula las traducciones revisadas para mejorar la consistencia con el tiempo.

Se admite tanto la localización de la interfaz (botones, rótulos, navegación, mensajes del sistema) como la del contenido (plantillas de correo, guiones para tocar puertas, textos de los formularios de donación). Los objetos de contenido guardan variantes en varios idiomas, y la cadena de procesamiento asistida por IA ayuda al equipo a generar traducciones de su contenido de campaña.

**Alternativas consideradas:** Usar solo servicios profesionales de traducción se descartó por lento y caro para la cantidad de idiomas que hacen falta. Solo IA, sin revisión humana, se descartó porque los avisos de seguridad, el texto legal y los textos de consentimiento son demasiado delicados para una traducción automática sin revisar.

### Datos de límites electorales híbridos: mantenidos por GreenGrass e importados por las organizaciones

GreenGrass consigue, limpia y mantiene conjuntos de datos curados de límites electorales para los cinco países objetivo, actualizados en cada ciclo electoral. Las organizaciones de otros países importan sus propios datos con las herramientas de importación de la plataforma (GeoJSON, Shapefile, KML). Un modelo de contribución comunitaria permite que las organizaciones devuelvan a GreenGrass los conjuntos que importaron para incluirlos en la biblioteca curada.

El formato de almacenamiento interno es GeoJSON (estándar, bien soportado, legible por personas). Sistema de coordenadas WGS 84 (coordenadas GPS estándar, universales).

**Alternativas consideradas:** Que solo importaran las organizaciones se descartó porque conseguir y limpiar datos de límites electorales requiere una experiencia en SIG (sistemas de información geográfica) que la mayoría de las campañas no tiene, y tener los datos fragmentados entre organizaciones significa duplicar el esfuerzo. Que solo los mantuviera GreenGrass se descartó porque no escala a países más allá de los cinco iniciales.

## Consecuencias

**Beneficios:**
- Con RTL desde el primer día, dar soporte al árabe en el Piloto 4 es una tarea de contenido, no un proyecto de ingeniería
- Una sola hoja de estilos con propiedades lógicas elimina la carga de mantener CSS por dirección
- La traducción asistida por IA con revisión humana equilibra velocidad y costo en siete idiomas con control de calidad en los flujos críticos
- Los datos curados de límites electorales quitan una barrera de adopción grande para las campañas del Sur Global, donde esos datos son difíciles de conseguir

**Costos:**
- Diseñar con RTL por delante complica cada componente de la interfaz, incluso antes de que haga falta el árabe
- La traducción con IA exige infraestructura (alojar el modelo o pagar una API) y capacidad permanente de revisión humana
- Mantener los conjuntos de datos de límites electorales de cinco países es trabajo geográfico permanente, que se actualiza en cada ciclo electoral
- Localizar el contenido significa que toda pantalla donde se redacta contenido necesita admitir variantes en varios idiomas

**Restricciones:**
- Cada componente de la interfaz tiene que probarse en modo LTR y en modo RTL
- La calidad de traducción del texto legal, de seguridad y de consentimiento tiene que estar al nivel de una traducción profesional
- La importación de datos de límites electorales tiene que aguantar la variedad de formatos de origen y sistemas de coordenadas que hay en el Sur Global
- La selección de idioma del contenido va en cascada: preferencia de quien recibe → configuración del voluntario → idioma del navegador o del dispositivo → sobrescritura manual

**ADR relacionados:** [ADR-011](011-design-system-ux.md) (pila de fuentes del sistema para cubrir los sistemas de escritura, propiedades lógicas de CSS), [ADR-006](006-field-operations-gotv.md) (datos de límites electorales para manejar los territorios), [ADR-009](009-compliance-legal.md) (avisos de consentimiento localizados, texto legal específico por jurisdicción)
