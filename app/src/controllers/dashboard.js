angular.module('ngCourse')

.controller('DashboardCtrl', function ($scope, $state, lists, ListResource) {

    $scope.lists = lists;

    $scope.newList = function () {
        var list = {
            name: 'Lista Nueva',
            tasks: []
        };
        $scope.lists.push(list);
        $scope.select(list);
    };

    $scope.select = function (list) {
        $state.go('dashboard.list', {
            list: list._id
        });
    };
});
