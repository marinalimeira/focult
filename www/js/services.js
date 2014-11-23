(function() {
    var cache = null;
    
    angular.module('starter')
    .factory('Services', function($q, $http) {
        return {
            getEvents: function() {
                var deferred = $q.defer();
                
                if (!cache) {
                    $http.get('js/data/programacao.json').success(function(data) {
                        cache = [];
                        var startEvent = new Date(2014, 10, 1);
                        var now = new Date();
                        data.forEach(function(it){
                            
                            var startHour = parseInt(it.startTime.split('h')[0], 10);
                            var startMin = parseInt(it.startTime.split('h')[1], 10);
                            
                            var endHour = parseInt(it.endTime.split('h')[0], 10);
                            var endMin  = parseInt(it.endTime.split('h')[1], 10);
                            
                            it.startTimeMillis = new Date(startEvent.getTime());        
                            it.endTimeMillis = new Date(startEvent.getTime());
                            
                            console.log(it.startTimeMillis, it.day);
                            var mom = moment(it.startTimeMillis).date(it.day).hour(startHour).minute(startMin).second(0);
                            it.startTimeMillis = mom.toDate().getTime();
                            
                            var mom2 = moment(it.endTimeMillis).date(it.day).hour(endHour).minute(endMin).second(0);
                            it.endTimeMillis = mom2.toDate().getTime();
                            
                            if (now.getTime() < it.endTimeMillis) {
                                cache.push(it);
                            }
                        });
                        
                        cache.sort(function(v1, v2) {
                            return v1.startTimeMillis - v2.startTimeMillis;
                        });
                        
                        deferred.resolve(cache);
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