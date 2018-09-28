angular.module('starter')
.controller('RecaudosCtrl', function($scope, RecaudosServices, $ionicPopup, $state, $stateParams, $rootScope, $http, SharedService, $timeout) {
	$scope.screenRecaudo = {};
	$scope.listRecaudos = [];

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.irAtras = function(){
		$state.go('menu');
	};

	$scope.consultar = function(){
		try{
			var fecha = new Date($scope.screenRecaudo.fecha);
			var year = fecha.getFullYear();
			var month = (fecha.getMonth() + 1);
			var day = fecha.getDate();

			var fechaMySQL = year + '-' + month + '-' + day;
		}
		catch(Exx){
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Por favor indique la fecha.'
			});
			return;
		}

		$rootScope.show();
		RecaudosServices.recaudo(fechaMySQL, $rootScope.rutas_id, $scope, $rootScope, $http)
		.success(function(data) {
			$rootScope.hide();
			$scope.listRecaudos = data;
		})
		.error(function(data) {
			$rootScope.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Ha ocurrido un error al consultar el recaudo',
				template: 'Error.'
			});
		});
	};

	$scope.getTotal = function(){
		var total = 0;
		for (var i = 0; i < $scope.listRecaudos.length; i++) {
			total = total + Number($scope.listRecaudos[i].valor);
		}

		return total;
	};
})
