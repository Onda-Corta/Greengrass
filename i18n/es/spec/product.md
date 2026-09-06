# Proyecto: GreenGrass

## *Una plataforma tecnológica integrada para campañas políticas de base en el Sur Global*

## *por Pablo Defendini y Giovanni Collazo — 22 de noviembre de 2024*

# Resumen ejecutivo

Los movimientos progresistas y de izquierda funcionan con poco dinero, herramientas viejas y un montón de servicios sueltos que no se hablan entre sí — un problema en todas partes, y más agudo en el Sur Global. **GreenGrass** mete en una sola plataforma lo que una campaña de base del Sur Global realmente tiene que hacer: organizar gente, alcanzarla por los canales que usa y guardar suficientes datos para decidir dónde va el esfuerzo de la próxima semana. Tiene un precio pensado para campañas con muy poco dinero, está construida para los celulares y las conexiones que ya tienen, y está traducida a los idiomas en los que organizan. La idea es reducir la cantidad de herramientas que una campaña tiene que mantener a flote y darle más tiempo de contacto con la gente a la que quiere llegar.

---

Las campañas políticas progresistas en países del Sur Global enfrentan retos particulares, entre ellos:

* **Acceso limitado a herramientas digitales:** La mayoría de las plataformas de tecnología política están diseñadas para mercados desarrollados, con costos altos y curvas de aprendizaje empinadas que las vuelven inaccesibles para las campañas de base.
* **Canales de comunicación fragmentados:** Las campañas suelen depender de una mezcla de herramientas dispares para correo electrónico, redes sociales y SMS, lo que produce mensajes inconsistentes, uso ineficiente de los recursos y costos que se disparan.
* **Contacto ineficiente con los votantes:** Muchas campañas no pueden rastrear ni segmentar los datos de votantes de forma efectiva, así que su alcance termina siendo genérico y no conecta con sus constituyentes.
* **Restricciones de recursos:** Las campañas suelen operar con presupuestos ajustados, lo que limita cuánto pueden gastar en buen software.

Existen plataformas como NationBuilder, Action Network y Mobilize, pero están diseñadas para mercados desarrollados y sus precios suelen quedar fuera del alcance de las campañas progresistas del Sur Global.

# Proyecto: GreenGrass

**Proyecto: GreenGrass** es una plataforma tecnológica de campaña todo en uno, hecha a la medida de lo que necesitan las campañas de base en países del Sur Global. La intención es que sea una ventanilla única —con una tarifa fija— para que campañas y organizaciones usen el servicio sin depender de servicios ni costos adicionales (con la excepción de costos variables inevitables como los envíos de SMS, que el proveedor normalmente cobra por volumen).

El producto combina un gestor de relaciones con constituyentes (CRM), una base de datos de votantes, herramientas de recaudación de fondos, herramientas de comunicación y analítica de datos en un solo paquete que una campaña pequeña puede pagar, de modo que toda la operación corra sobre un sistema en lugar de cinco pegados entre sí.

GreenGrass está pensada primero para la web y el celular. La aplicación usa mejora progresiva y está optimizada para entornos de bajo ancho de banda y de uso móvil.

## Funcionalidades clave

### CRM integrado y base de datos de personas

* Un CRM que consolida los datos de candidatos, personal, voluntarios y simpatizantes, además de la información de votantes.
* Perfiles de votante personalizables, para que las campañas segmenten audiencias por demografía, historial de voto y nivel de participación.
* Una lista única y global que deduplica personas.
* Acceso con cuenta propia para *todo el mundo*, con preferencias de cuenta fáciles de manejar.

### Herramientas de recaudación de fondos

* Formularios de donación que manejan donaciones recurrentes y de una sola vez, permiten que el donante asuma el cargo por procesamiento de la tarjeta de crédito y proponen montos específicos de donación
* Varios procesadores de pago (y proveedores de pago locales —ATH Móvil, Venmo, Zelle, etc.—), que varían según la región.
* Una forma de registrar y rastrear donaciones en efectivo (sobre todo durante eventos presenciales)
* Soporte tanto para formularios de donación dentro del sistema como para formularios incrustables personalizados, para colocar en servicios y sitios de terceros.

### Suite de comunicación multicanal

* Campañas de correo electrónico: herramientas simples para diseñar, enviar y medir el contacto por correo, incluyendo seguimientos automáticos y analítica.
* Integración de SMS y WhatsApp: soporte incorporado para mensajería por SMS y WhatsApp.
* Integración con redes sociales: programa y maneja publicaciones en varias redes desde un solo lugar, con analítica para medir interacción y rendimiento.
* Perfiles públicos de usuarios, candidatos y organizaciones.

### Herramientas de contacto con votantes

* Inscripción de votantes: una herramienta para que los equipos de campo hagan jornadas de inscripción, con capacidad sin conexión para zonas de conectividad limitada.
* Trabajo de campo: una herramienta para que los voluntarios toquen puertas, recojan datos y sincronicen la información con el CRM central en tiempo real.
* Sistema de jornadas de llamadas: jornadas de llamadas integradas, con guiones y seguimiento, para que el personal maneje a los voluntarios y sus turnos.

### Activismo y participación

* Campañas de envío de cartas por correo electrónico

### Manejo de eventos y coordinación de voluntarios

* Eventos: crea y maneja eventos de campaña, con seguimiento de confirmaciones y recordatorios por correo y SMS.
* Portal de voluntarios: un portal central donde los voluntarios se apuntan a turnos, siguen sus actividades y se comunican con el personal de la campaña. Los turnos y demás trabajo con horario deben tener vista de calendario, para que quien coordina voluntarios pueda ver y repartir la carga.
* Manejo de tareas: un sistema simple de asignación y seguimiento de tareas para coordinar actividades entre equipos.

### Analítica e informes

* Paneles de inteligencia electoral: monitorea métricas clave como el comportamiento de los simpatizantes, la actividad de los voluntarios y el rendimiento de la recaudación.
* Análisis de votantes: herramientas para analizar datos de votantes, identificar tendencias, afinar el discurso y priorizar el esfuerzo de contacto.

## Funcionalidades imprescindibles

* Accesibilidad y precio: GreenGrass ofrece un modelo de precios por niveles, con un plan freemium y un periodo de prueba sin tarjeta de crédito para campañas más pequeñas, de modo que sea accesible incluso con presupuestos mínimos.
* Soporte de idiomas locales: la plataforma soporta varios idiomas y dialectos locales, para que la gente la use en el idioma que realmente habla.
* Funcionamiento sin conexión: diseñada para zonas con internet poco confiable, las funcionalidades clave de GreenGrass operan sin conexión y sincronizan los datos cuando vuelve la conectividad.
* Diseño primero para celular: casi toda la gente en el mundo se conecta desde un celular, así que la plataforma está optimizada para dispositivos móviles.

## Notas de arquitectura general

GreenGrass se construye con un modelo de código abierto, salvo donde razones de seguridad o técnicas vuelvan inviable ese enfoque. Además usa una arquitectura de organización única. Es decir: una sola instancia de la aplicación y su infraestructura de soporte se dedica a atender a cada cliente (u organización). Cada organización opera aislada, con su propia base de datos, su aplicación y sus recursos, lo que garantiza separación completa de las demás. Este enfoque complica el despliegue y el control de versiones a nivel general, pero los sistemas de organización única priorizan la seguridad, el rendimiento y la personalización para cada usuario u organización.

## Plan de implementación

### Fase 0: conseguir respaldo (3-6 meses)

* Definir y afinar la propuesta de producto, el conjunto de funcionalidades, la hoja de ruta inicial y los modelos de negocio propuestos
* Identificar e incorporar de tres a cinco clientes alfa interesados en el producto y dispuestos a comprometerse a pagar por un MVP cuando esté listo.

### Fase 1: desarrollo del producto (10 meses)

* Cerrar el conjunto de funcionalidades y arrancar el desarrollo de los componentes centrales.
* Hacer pruebas de usuario con clientes alfa, campañas seleccionadas y partes interesadas, para recoger retroalimentación y afinar el producto.

### Fase 2: programa piloto (10 meses)

* Lanzar un programa piloto con clientes alfa y campañas aliadas en tres países objetivo, con capacitación y soporte.
* Recoger datos de uso, de rendimiento y retroalimentación de las personas usuarias para seguir mejorando la plataforma.

### Fase 3: lanzamiento completo y escalamiento (6 meses en adelante)

* Desplegar la plataforma a un público más amplio, con foco en países de África, América Latina y el sudeste asiático.
* Montar una red de soporte local, con acuerdos que den capacitación y atención al cliente en las regiones clave.

## Posibles modelos de ingresos

* Plan freemium: acceso básico a las funcionalidades centrales, para que las campañas pequeñas arranquen gratis.
* Niveles de suscripción: planes pagos con funcionalidades adicionales, pensados para campañas medianas y grandes. Explícitamente no es un modelo de precio por usuario ni ligado a ninguna otra medida de escala, aunque igual hay que pensar en alguna estructura de ingresos que acompañe la escala para manejar los costos operativos crecientes.
* Asociaciones: ingresos por acuerdos con ONG, organizaciones de formación política y grupos de incidencia que puedan licenciar la plataforma para sus redes.
* Servicios a medida: desarrollo de integraciones, creación y análisis de consultas de datos, enriquecimiento de datos, generación de informes personalizados.
