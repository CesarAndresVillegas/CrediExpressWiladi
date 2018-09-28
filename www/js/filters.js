angular.module('starter')
.filter('filterVencidas', function() {
  return function(input) {
    return input ? 'item item-assertive item-divider' : 'item item-balanced item-divider';
  };
})

.filter('filterRutaCerrada', function() {
  return function(input) {
    return JSON.parse(input) == 1 ? 'item item-assertive item-divider ion-locked' : 'item item-balanced item-divider';
  };
});
