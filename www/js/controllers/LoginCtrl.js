angular.module('starter')
.controller('LoginCtrl', function($scope, $rootScope, LoginServices, RutasServices, $ionicPopup, $state, $http, SharedService) {
	$scope.usuario = {};

    $scope.$on('$ionicView.enter', function() {
        $scope.usuario = {};
    });

    $scope.login = function(){
        $rootScope.show();
        LoginServices.login($scope.usuario.user, $scope.usuario.pwd, $scope, $rootScope, $http)
        .success(function(data) {
            $rootScope.hide();
            $state.go("menu");
        })
        .error(function(data) {
            $rootScope.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Ha ocurrido un error al iniciar sesión',
                template: 'Por favor revisa tus credenciales.'
            });
        });
    };
})