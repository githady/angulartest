var demoApp = angular.module('demoApp', ['ngRoute']);

function SimpleController($scope, demoService) {
    $scope.customers = [];//[{ city: 'pune', name: 'hady' }, { city: 'mumbai', name: 'rock' }, { city: 'japan', name: 'bonjov' }];
    init();
    function init() {
        demoService.getData().then(function (data) {
            $scope.customers = data;
        });
        debugger;
    };
    $scope.addCustomer = function () {
        $scope.customers.push(
            {
                name: $scope.newCustomer.name,
                city: $scope.newCustomer.city
            }
            );
    }
}
function SimpleController1($scope) {
    $scope.customers1 = [{ city: 'pune1', name: 'hady1' }, { city: 'mumbai1', name: 'rock1' }, { city: 'japan1', name: 'bonjov1' }];
}
//function simpleFactory() {
//    var customers = [{ city: 'pune', name: 'hady' }, { city: 'mumbai', name: 'rock' }, { city: 'japan', name: 'bonjov' }];
//    var factory = {};
//    factory.getCustomers = function () {
//        return customers;
//    }
//    factory.postCustomer = function (customer) {

//    }
//    return factory;
//}

function testRoute($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'SimpleController',
            templateUrl: 'SPA1.html'
        })
        .when('/SPA2',
        {
            controller: 'SimpleController1',
            templateUrl: 'SPA2.html'
        })
    .otherwise({ redirectTo: '/' });
};


function demoService($http, $q) {
    this.data;
    var deffered = $q.defer();
    this.getData = function () {
        $http.get('../json.json').success(function (data) {
            this.data = data;
            deffered.resolve(this.data);
        })
        return deffered.promise;
    }
}

//function simpleFactory($http) {    
//    var factory = null;
//    var customers = $http.get('../json.json').success(function (data) {
//        factory = data;
//    });
    
//    return{
//        promise:customers,
//        getCustomers : function (data) {      
//            factory = data;
//        }
//        },
//        factory.postCustomer = function (customer) {

//        }
//        return factory;
//}

//demoApp.factory('simpleFactory', function ($http) {
//    return {
//        getCustomers: function () {
//            //console.log("inside function");
//            return $http.get('../json.json');
//        }
//    };
//});

demoApp.controller('SimpleController', SimpleController);
demoApp.controller('SimpleController1', SimpleController1);
//demoApp.factory('simpleFactory', simpleFactory);
demoApp.service('demoService', demoService);
demoApp.config(testRoute);

