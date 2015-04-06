angular.module('ngCourse')

.directive('task', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/task.html',
        scope: {
            task: '=model'
        },
        controller: function ($scope) {
            $scope.toggle = function () {
                $scope.$emit('task-toggle', $scope.task.done);
            };
        }
    };
});
