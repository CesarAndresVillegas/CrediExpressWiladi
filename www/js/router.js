angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  $stateProvider
  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  });

  $stateProvider
  .state('estadoRuta', {
    url: '/estadoRuta',
    templateUrl: 'templates/cierreDia.html',
    controller: 'CierreDiaCtrl'
  });

  $stateProvider
  .state('ruta', {
    url: '/ruta',
    templateUrl: 'templates/rutas.html',
    controller: 'RutaCtrl'
  });

  $stateProvider
  .state('rutaAll', {
    url: '/rutaAll',
    templateUrl: 'templates/rutasAll.html',
    controller: 'RutaAllCtrl'
  });

  $stateProvider
  .state('pagos', {
    url: '/pagos',
    templateUrl: 'templates/pagos.html',
    controller: 'PagosCtrl'
  });

  $stateProvider
  .state('pagoExitoso', {
    url: '/pagoExitoso',
    templateUrl: 'templates/pagoExito.html',
    controller: 'PagoExitoCtrl'
  });

  $stateProvider
  .state('recaudos', {
    url: '/recaudos',
    templateUrl: 'templates/recaudos.html',
    controller: 'RecaudosCtrl'
  });

  $urlRouterProvider.otherwise('/login');
})