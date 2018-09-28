angular.module('starter')
.controller('RutaAllCtrl', function($scope, RutasServices, PagosServices, $ionicPopup, $state, $stateParams, $rootScope, $http, SharedService, $timeout) {

	$scope.misRutas = [];

	$scope.irAtras = function (){
		$state.go("menu");
	};

	$scope.cargarPagosDe = function(idPrestamo){
		$rootScope.show();

		var miRutaActual = $scope.getRuta(idPrestamo);

		// Datos del cliente seleccionado
		$rootScope.clientes_documento = miRutaActual.documento;
		$rootScope.clientes_nombre = miRutaActual.nombre;

		PagosServices.cargarPagos(idPrestamo, $scope, $rootScope, $http)
		.success(function(data) {
			
			var newData = $scope.convertirValoresNumericos(data);
			SharedService.pagos = newData;
			$rootScope.fromForm = "rutaAll";

			$state.go('pagos');
		})
		.error(function(data) {
			$rootScope.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Ha ocurrido un error al cargar las rutas',
				template: '.'
			});
		});
	};

	$scope.getRuta = function(idPrestamo){
		for (var i = 0; i < $scope.misRutas.length; i++) {
			if ($scope.misRutas[i].id == idPrestamo) {
				return $scope.misRutas[i];
			}
		}
	};

	$scope.convertirValoresNumericos = function(data){
		var hoy = new Date();
		for (var i = 0; i < data.length; i++) {
			data[i].abono = Number(data[i].abono);

			data[i].vencida = false;

			if(new Date(data[i].fecha_pago) < hoy){
				data[i].vencida = true;
			}
		}
		return data;
	};

	$scope.cargarRutasAll = function (){
		RutasServices.cargarRutasAll($rootScope.rutas_id, $scope,$rootScope, $http)
		.success(function(data) {
			$rootScope.hide();
			SharedService.rutas = data;
			$scope.misRutas = SharedService.rutas;
		})
		.error(function(data) {
			$rootScope.hide();
			$state.go("menu");
			var alertPopup = $ionicPopup.alert({
				title: 'SISTEMA',
				template: 'No se han encontrado clientes en la ruta.'
			});
		});
	};

	$scope.$on('$ionicView.enter', function() {
		$scope.cargarRutasAll();
		$rootScope.hide();
	});
})