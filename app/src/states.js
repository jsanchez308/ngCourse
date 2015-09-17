angular.module('ngCourse')

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                lists: function (ListResource) {
                    return ListResource.query();
                }
            }
        })
        .state('dashboard.list', {
            url: '/:index',
            templateUrl: 'views/list.html',
            controller: 'ListCtrl',
            resolve: {
                list: function (ListResource, $stateParams) {
                    return ListResource.get({}, {
                        _id: $stateParams.index
                    })
                }
            }
        });
});
