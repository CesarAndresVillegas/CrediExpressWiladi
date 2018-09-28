angular.module('starter')
.service('CierreDiaServices', function($q){
	return {
		cierre: function(fecha_pago, rutas_id, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get(miRootScope._host + 'public/cierreDia/' + fecha_pago + '/' + rutas_id)
			.success(function (data, status, headers, config) {
				if(data[0] && data !== 'Error rows'){
					deferred.resolve(data);
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