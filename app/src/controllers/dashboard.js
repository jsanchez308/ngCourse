angular.module('ngCourse')

.controller('DashboardCtrl', function ($scope, $state) {
    $scope.lists = $state.current.data.lists;

    $scope.newList = function () {
        var list = {
            title: 'Untitled List',
            tasks: [],
            index: $scope.lists.length
        };
        $scope.lists.push(list);
        $scope.select(list);
    };

    $scope.select = function (list) {
        $scope.list = list;
        $state.go('dashboard.list', $scope.list);
    };
});
