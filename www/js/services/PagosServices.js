angular.module('starter')
.service('PagosServices', function($q){
	return {
		cargarPagos: function(idPrestamo, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get(miRootScope._host + 'public/pagosDe/' + idPrestamo)
			.success(function (data, status, headers, config) {
				
				if(data[0] && data != 'Error rows'){
					deferred.resolve(data);
				}else{
					deferred.reject('Error: ' + data);
					console.log("Error al realizar la peticion.");
				}
			})
			.error(function (data, status, header, config) {
				deferred.reject('Error: ' + data);
				console.log(JSON.stringify(data));
				console.log("Error al realizar la peticion.");
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		pagar:function(objPagos, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			var data = objPagos;

			miHttp.post(miRootScope._host + 'public/pagar', data)
			.success(function (data, status, headers, config) {
				if(data[0] == "Exito"){
					deferred.resolve(data[1]);
				}else{
					deferred.reject('Error: ' + data);
					console.log("Error al realizar la peticion.");
				}
			})
			.error(function (data, status, header, config) {
				deferred.reject('Error: ' + data);
				console.log("Error al realizar la peticion.");
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})