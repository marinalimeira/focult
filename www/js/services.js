(function() {
    var cache = null;
    
    angular.module('starter')
    .factory('Services', function($q, $http) {
        return {
            getEvents: function() {
                var deferred = $q.defer();
                
                if (!cache) {
                    $http.get('js/data/programacao.json').success(function(data) {
                        cache = data;
                        deferred.resolve(data);
                    });
                }
                
                else {
                    deferred.resolve(cache);
                }
                
                return deferred.promise;
            }
        };
    });
})();