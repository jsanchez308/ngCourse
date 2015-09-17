angular.module('ngCourse')

.controller('DashboardCtrl', function ($scope, $state, lists) {

    $scope.lists = lists;

    $scope.newList = function () {
        var list = new ListResource({
            name: 'Untitled List',
            tasks: []
        });
        $scope.lists.push(list);
        $scope.select(list);
    };

    $scope.select = function (list) {
        $state.go('dashboard.list', {
            index: list._id
        });
    };
});
