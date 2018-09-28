angular.module('starter')
.controller('PagosCtrl', function(SharedService, $scope, $rootScope, PagosServices, $ionicPopup, $state, $http, $filter, $timeout, $ionicLoading) {
	$scope.usuario = {};
    $scope.misPagos = [];
    $scope.valorActual = 0;

    $scope.objPagar = {};
    $scope.numeroCuotas = 0;
    $scope.nombre_cliente = '';

    // Pantalla de resultados
    $scope.screenResult = {
        numero_registro: -1,
        fecha: new Date(),
        nombre_cliente: $rootScope.clientes_nombre,
        documento_cliente: $rootScope.clientes_documento,
        nombre_cobrador: $rootScope.nombre,
        cantidad_cuotas: 0, // Se llena en el for que hace el conteo de cuotas "pagosValidos"
        valor: 0 // Se llena en el for que hace el conteo de cuotas "pagosValidos"
    };

    $scope.$on('$ionicView.enter', function() {
        $scope.nombre_cliente = $rootScope.clientes_nombre;
        $scope.misPagos = SharedService.pagos;
        $rootScope.hide();
    });

    $scope.realizarPago = function(){
        if(!$scope.pagosValidos()){
            var alertPopup = $ionicPopup.alert({
                title: 'SISTEMA',
                template: 'El abono no puede ser mayor que el valor de la cuota, por favor revise.'
            });

            return;
        }

        var confirmPopup = $ionicPopup.confirm({
            title: 'SISTEMA',
            template: '¿ Desea realizar el pago por valor de: <b>' + $scope.valorActual + '</b> ?'
        });

        confirmPopup.then(function(res) {
           if(res) {
            $rootScope.show();
            // Listado de pagos
            var objPagos = [];
            var pagoActual = {};
            var fechaHoy = new Date().toISOString().slice(0, 10).replace('T', ' ');

            for (var i = 0; i < $scope.misPagos.length; i++) {
                if(Number($scope.misPagos[i].abono) > 0){
                    pagoActual = $scope.misPagos[i];
                    // Formar el objPagar
                    var objPagar = {
                        // Primer query 
                        pago_id: pagoActual.id,
                        finalizada: pagoActual.abono == pagoActual.valor_cuota ? 1 : 0,
                        abono: pagoActual.abono,
                        abono_dia: pagoActual.abono_dia,

                        // Para la segunda query
                        valor: $scope.valorActual,
                        clientes_documento: $rootScope.clientes_documento,
                        cuotas: $scope.numeroCuotas,
                        users_id: $rootScope.id,
                        rutas_id: $rootScope.rutas_id
                    };
                    
                    if(pagoActual.fecha_registro == fechaHoy){
                        objPagar.abono_dia = Number(objPagar.abono_dia) + Number(pagoActual.abono);
                    }
                    else{
                        objPagar.abono_dia = Number(pagoActual.abono);
                    }

                    objPagos.push(objPagar);
                }
            }

            PagosServices.pagar(objPagos, $scope, $rootScope, $http)
            .success(function(data) {                
                $rootScope.hide();
                $timeout(function() {
                    $scope.screenResult.numero_registro = data;

                    $scope.usuario = {};
                    $scope.misPagos = [];

                    $scope.objPagar = {};
                    $scope.numeroCuotas = 0;


                    var alertPopup = $ionicPopup.alert({
                        title: 'Se ha realizado el pago correctamente',
                        template: 'Exito !!'
                    });

                    $scope.$apply();

                    SharedService.screenResult = $scope.screenResult;

                    $state.go("pagoExitoso");
                    $rootScope.hide();
                }, 100);


            })
            .error(function(data) {
                $rootScope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error al realizar el pago',
                    template: 'Error: ' + JSON.stringify(data) + '.'
                });
            });
        }
    });
    }; 

    $scope.pagosValidos = function(id){
        $scope.numeroCuotas = 0;
        $scope.valorActual = 0;

        for (var i = 0; i < $scope.misPagos.length; i++) {
            $scope.valorActual = Number($scope.valorActual) + Number($scope.misPagos[i].abono);
            $scope.screenResult.valor = $scope.valorActual;

            if (Number($scope.misPagos[i].abono) > Number($scope.misPagos[i].valor_cuota)) {
                return false;
            }

            if (Number($scope.misPagos[i].abono) == Number($scope.misPagos[i].valor_cuota)) {
                $scope.numeroCuotas++;
                $scope.screenResult.cantidad_cuotas = $scope.numeroCuotas;
            }
        }
        return true;
    };

    $scope.getTotalAbono = function(){
        var totalAbono = 0;
        
        for (var i = 0; i < $scope.misPagos.length; i++) {
            totalAbono = totalAbono + Number($scope.misPagos[i].abono);
        }

        return totalAbono;
    };

    $scope.irAtras = function(){
        $rootScope.show();
        $state.go($rootScope.fromForm);
    };

    $scope.abonoCompleto = function(indice){
        $scope.misPagos[indice].abono = $scope.misPagos[indice].valor_cuota;
        $ionicLoading.show({ template: 'Cuota No: ' + $scope.misPagos[indice].numero_cuota +'\n Abono completo: ' + $scope.misPagos[indice].abono, noBackdrop: true, duration: 1300 });
    };

    $scope.getAbonoEnabled = function(indice){
        if(indice != 0){
            var deshabilitarCampo = false;

            for (var i = 0; i < indice; i++) {
                if ($scope.misPagos[i].abono != $scope.misPagos[i].valor_cuota) {
                    deshabilitarCampo = true;
                }
            }
            if(deshabilitarCampo){
                return true;
            }
        }
        return false;
    };
})