angular.module('starter')
.service('LoginServices', function($q){
	return {
		login: function(usuario, pass, miScope, miRootScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get(miRootScope._host + 'public/login/' + usuario + '/' + pass)
			.success(function (data, status, headers, config) {
				
				if(data[0] && data !== 'Error rows'){
					miRootScope.id = data[0].id;
					miRootScope.usuario = data[0].user;
					miRootScope.tipo_usuario_id = data[0].tipo_usuario_id;
					miRootScope.rutas_id = data[0].rutas_id;
					miRootScope.nombre = data[0].nombre;

					deferred.resolve('Inicio sesion.');
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