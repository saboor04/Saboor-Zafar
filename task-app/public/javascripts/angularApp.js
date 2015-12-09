var app = angular.module('task', []);


app.factory('tasks', ['$http', function($http){
	var o = {
		tasks: []
	};
	o.getAll = function() {
		return $http.get('/tasks').success(function(data){
			angular.copy(data, o.tasks);
		});
	};
	o.create = function(task) {
	  return $http.post('/tasks', task).success(function(data){
	    o.tasks.push(data);
	  });
	};
	o.remove = function(task) {
	  	return $http.delete('/tasks/'+task._id).success(function(data){
		});
    	};

  return o;
}]);


app.controller('MainCtrl', [
'$scope',
'tasks',
function($scope,tasks){

	$scope.tasks = tasks.tasks;

	$scope.addTask = function(){
		if(!$scope.title || $scope.title === '') { return; }
		if(!$scope.description || $scope.description === '') { return; }

		tasks.create({
		    title: $scope.title,
		    description: $scope.description,
		  });
		$scope.title = '';
		$scope.description = '';
	};
	$scope.init = function () {
		tasks.getAll();
	};
	$scope.deleteTask = function(task) {
		tasks.remove(task);
		tasks.getAll();
	};

}]);

