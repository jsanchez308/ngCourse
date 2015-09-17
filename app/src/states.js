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
                    return ListResource.query().$promise;
                }
            }
        })
        .state('dashboard.list', {
            url: ':list',
            templateUrl: 'views/list.html',
            controller: 'ListCtrl',
            resolve: {
                list: function (ListResource, $stateParams) {
                    if (!$stateParams.list)
                        return new ListResource({
                            name: 'Nueva Lista',
                            tasks: []
                        });
                    return ListResource.get({}, {
                        _id: $stateParams.list
                    }).$promise;
                }
            }
        });
});
