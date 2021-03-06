'use-strict';

angular
    .module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, $locationProvider, jwtOptionsProvider, $qProvider) {

        authProvider.init({
            domain: "angularjs4.auth0.com",
            clientID: "5BOPjc1TzhEDdyylzwvGL1Uek7q7Bdc9"
        });

        //$qProvider.errorOnUnhandledRejections(false);

        //to get token to pass in the authorization header

        jwtInterceptorProvider.tokenGetter = function(store) {
        
            return store.get('id_token');
        }

        jwtOptionsProvider.config({
            whiteListedDomains: ['localhost']
           
        });

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.tpl.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'components/profile/profile.tpl.html',
                controller: 'profileController as user'
            });

        $httpProvider.interceptors.push('jwtInterceptor');

        $locationProvider.html5Mode(true).hashPrefix("");
    });