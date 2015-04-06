angular.module('ngCourse')

.directive('addTask', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/add-task.html',
        replace: true,
        scope: { tasks: '=model' },
        link: function (scope, element, attrs, ctrl) {
            element.find('input').on('keydown', function (e) {
                if (e.keyCode == 13) {
                    scope.$apply(function () {
                        scope.tasks.push({
                            title: scope.title,
                            done: false
                        });
                        scope.title = '';
                    });
                }
            });

            scope.checkAll = function () {
                scope.tasks.forEach(function (task) {
                    if (!task.done) {
                        task.done = true;
                        scope.$emit('task-toggle', true);
                    }
                });
            };
        }
    };
});
