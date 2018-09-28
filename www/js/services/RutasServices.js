angular.module('starter')
.service('RutasServices', function($q){
	return {
		cargarRutas: function(rutas_id, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get(miRootScope._host + 'public/rutas/' + rutas_id)
			.success(function (data, status, headers, config) {
				
				if(data[0]){
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
		},
		cargarRutasAll: function(rutas_id, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get(miRootScope._host + 'public/rutasAll/' + rutas_id)
			.success(function (data, status, headers, config) {
				
				if(data[0]){
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