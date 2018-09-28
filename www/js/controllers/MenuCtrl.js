angular.module('starter')
    .controller('MenuCtrl', function($scope, $rootScope, LoginServices, RutasServices, $ionicPopup, $state, $http, SharedService) {

        $scope.irAtras = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'SISTEMA',
                template: '¿ Desea salir de su sesión ?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $state.go("login");
                }
            });
        };

        $scope.irRegistroPagos = function() {
            $rootScope.show();
            $state.go("ruta");
        };

        $scope.irAdelantarPagos = function() {
            $rootScope.show();
            $state.go("rutaAll");
        };

        $scope.irEstadoRuta = function() {
            $rootScope.show();
            $state.go("estadoRuta");
        };

        $scope.irRecaudos = function() {
            $state.go("recaudos");
        };
    })