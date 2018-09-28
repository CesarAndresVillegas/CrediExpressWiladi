angular.module('starter')
.controller('PagoExitoCtrl', function($scope, PagosServices, $ionicPopup, $state, $stateParams, $rootScope, $http, SharedService, $timeout) {
	$scope.screenResult = {};

	$scope.$on('$ionicView.enter', function() {
		$scope.screenResult = SharedService.screenResult;
	});

	$scope.irAtras = function(){
		$rootScope.show();
		$state.go('ruta');
	};
})
