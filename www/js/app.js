// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $rootScope, $ionicLoading) {

  // HOSTS
  //$rootScope._host = "http://localhost:88/";
  //$rootScope._host = "http://nash-ti.com/";
  $rootScope._host = "http://nash-ti.com/CrediexpressServer/";

  // Template para pantalla de carga.
  $rootScope.show = function() {
    $ionicLoading.show({
      template: 'Cargando...'
    });
  };
  
  $rootScope.hide = function(){
    $ionicLoading.hide();
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
})