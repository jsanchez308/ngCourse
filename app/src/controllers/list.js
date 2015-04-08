angular.module('ngCourse')

.controller('ListCtrl', function ($scope, $state) {
    if (!$scope.list) return $state.go('dashboard');

    $scope.addTask = function (title) {
        $scope.list.tasks.push({
            done: false,
            name: title
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
