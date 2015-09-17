angular.module('ngCourse')

.controller('ListCtrl', function ($scope, $state, list) {
    $scope.list = list;

    $scope.saveList = function () {
        $scope.list.$save();
    };

    $scope.addTask = function (title) {
        $scope.list.tasks.push({
            done: false,
            text: title
        });
    };

    $scope.completedCount = $scope.list.tasks.filter(function (task) {
        return task.done;
    }).length;

    $scope.$on('task-toggle', function (e, status) {
        var delta = !!status ? 1 : -1;
        $scope.completedCount += delta;
    });
});
