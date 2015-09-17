angular.module('ngCourse')

.factory('ListResource', function ($resource) {
    var res = $resource('http://localhost:3000/lists/:list', {
        list: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    res.prototype.greeting = function () {
        this.name = this.name + '1';
        this.$update();
    };

    return res;
});
