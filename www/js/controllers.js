angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('EventsController', function($scope, Services) {
    
  Services.getEvents().then(function(data){
    $scope.items = data;
  });
})

.controller('EventController', function($scope, $stateParams, Services) {
    $scope.item = {};
    
    Services.getEvents().then(function(data) {
        
        data.forEach(function(it) {
            if (it.id == $stateParams.id) {
                $scope.item = it;
            }
        });
    });
})

.controller('BioController', function($scope, $stateParams, Services) {
    $scope.item = {};
    
    Services.getEvents().then(function(data) {
        
        data.forEach(function(it) {
            if (it.id == $stateParams.id) {
                $scope.item = it;
            }
        });
    });
});
