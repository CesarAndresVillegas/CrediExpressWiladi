angular.module('starter')
.factory('SharedService', function() {
	var SharedService = {
		rutas: [],
		pagos: [],
		screenResult: {}
	};
	return SharedService;
});