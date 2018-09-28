angular.module('starter')
.controller('CierreDiaCtrl', function($scope, $rootScope, CierreDiaServices, RutasServices, $ionicPopup, $state, $http, SharedService) {
	
	$scope.miCierre = {
		recaudo_esperado: "re",
		recaudo_sistema: "rs",
		pendiente: "pend",
		incumplimientos: "incumplimientos",
		gastos: "gastos",
		entrega_caja: "entrega_caja",
		saldo: "saldo"
	};

	$scope.misDatos = [];

	$scope.$on('$ionicView.enter', function() {
		$scope.cargarCierre();
	});

	$scope.cargarCierre = function(){
		var fecha = new Date().toISOString().slice(0, 10).replace('T', ' ');

		CierreDiaServices.cierre(fecha, $rootScope.rutas_id, $scope, $rootScope, $http)
		.success(function(data) {
			$scope.misDatos = data;
			$scope.calcularValores();
			$rootScope.hide();
		})
		.error(function(data) {
			$rootScope.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Ha ocurrido un error calcular el cierre del dia',
				template: 'Por favor comuniquese con el administrador.'
			});
		});
	};

	$scope.calcularValores = function(){
		var fechaHoy = new Date().toISOString().slice(0, 10).replace('T', ' ');
		var recaudo_esperado = 0;
		var recaudo_sistema = 0;
		var gastos = 0;
		var entrega_caja = 0;
		var saldo = 0;
		var pendientes = 0;
		var incumplimientos = 0;
		var abono_total = 0;
		var abono_dia = 0;
		var deudaTotal = 0;
		
		for (var i = 0; i < $scope.misDatos.length; i++) {
			deudaTotal = deudaTotal + Number($scope.misDatos[i].valor);
			abono_total = abono_total + Number($scope.misDatos[i].abono);

			if(Number($scope.misDatos[i].saldo) == 0){
				
			}
			else if((new Date($scope.misDatos[i].fecha_pago).toISOString().slice(0, 10).replace('T', ' ')) == fechaHoy){
				incumplimientos = incumplimientos + Number($scope.misDatos[i].saldo);
			}
			else
			{
				pendientes = pendientes + Number($scope.misDatos[i].saldo);
			}

			
			if((new Date($scope.misDatos[i].fecha_registro).toISOString().slice(0, 10).replace('T', ' ')) == fechaHoy){
				abono_dia = abono_dia + Number($scope.misDatos[i].abono_dia);
			}

			recaudo_esperado = deudaTotal - abono_total + abono_dia;
			recaudo_sistema = abono_dia;
			saldo = abono_dia;
		}

		// Actualizar objeto
		$scope.miCierre = {
			recaudo_esperado: recaudo_esperado,
			recaudo_sistema: recaudo_sistema,
			pendiente: pendientes,
			incumplimientos: incumplimientos,
			gastos: gastos,
			entrega_caja: entrega_caja,
			saldo: saldo
		};
	};

	$scope.irAtras = function(){
		$state.go("menu");
	};
})
