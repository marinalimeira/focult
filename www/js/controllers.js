angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('EventsController', function($scope, Services) {
    
    $scope.classActive = function(item) {
        var now = new Date();
        
        if (now.getTime() >= item.startTimeMillis
                && now.getTime() <= item.endTimeMillis) {
            return true;
        }
        
        return false;
    };
    
    
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
})

.filter('since', function() {
    return function(value) {
        var now = new Date();
        var event = new Date(value.startTimeMillis);
        
        if (now.getDate() === event.getDate() 
                && now.getMonth() === event.getMonth()
                && now.getYear() === event.getYear()) {
            return 'Hoje';
        } else if (now.getDate() === event.getDate() + 1 
                && now.getMonth() === event.getMonth()
                && now.getYear() === event.getYear()) {
            return 'Amanhã';
        } else if (now.getDate() === event.getDate() + 2 
                && now.getMonth() === event.getMonth()
                && now.getYear() === event.getYear()) {
            return 'Depois de amanhã';
        }
        
        return moment(value).fromNow();
    };
})
