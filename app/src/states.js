angular.module('ngCourse')

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            data: {
                lists: []
            }
        })
        .state('dashboard.list', {
            url: ':index',
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        });
});
