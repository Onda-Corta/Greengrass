/* Demostraciones que se cargan desde la barra lateral de /wf/demos y de la app de /wf/app.
   nombre/corto en español, name/short en inglés; corto/short se usan en la barra inferior del móvil.
   Cambia aquí el cliente y las direcciones; también se pueden cambiar
   desde la propia pantalla (se guardan en el navegador) o con parámetros:
   ?cliente=Nombre&logo=https://…/logo.png&monitor=https://…&constructor=https://…  */
window.GG_DEMOS = {
  cliente: { nombre: 'Partido Verde', logo: '' },
  demos: [
    { id: 'monitor', nombre: 'Monitor de difusión', corto: 'Monitor', name: 'Broadcast monitor', short: 'Monitor', icono: 'tv', url: 'https://onda-corta-ui.onda-corta.workers.dev' },
    { id: 'constructor', nombre: 'Constructor', corto: 'Constructor', name: 'Builder', short: 'Builder', icono: 'hammer', url: 'https://demo.ondacorta.net/operator' }
  ]
};
