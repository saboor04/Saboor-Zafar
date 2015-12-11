var app = angular.module('task', []);


app.factory('tasks', ['$http', function($http){
	var o = {
		tasks: []
	};
	o.get = function(id) {
		  return $http.get('/tasks/' + id).then(function(res){
		    return res.data;
		  });
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
	o.update = function(task) {
		return $http.put('/tasks/'+task._id, task).success(function(data){
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

		if(!$scope.id || $scope.id === '') { 
			tasks.create({
			    title: $scope.title,
			    description: $scope.description,
			  });
		}else{
			tasks.update({
			    _id : $scope.id,
			    title: $scope.title,
			    description: $scope.description
			});
			$scope.id = '';

			tasks.getAll();
		}
		$scope.title = '';
		$scope.description = '';
		$scope.isOpen=false;
		
	};
	
	$scope.init = function () {
		tasks.getAll();
	};
	$scope.deleteTask = function(task) {
		tasks.remove(task);
		tasks.getAll();
	};

	$scope.editTask = function(task) {
		$scope.title = task.title;
		$scope.description = task.description;
		$scope.id = task._id;
		$scope.isOpen=true;
		$scope.isAdd=false;
	};
	$scope.clearForm = function(task) {
		$scope.title = '';
		$scope.description = '';
		$scope.id = '';
		$scope.isOpen=false;
	};
	$scope.openForm = function(task) {
		$scope.title = '';
		$scope.description = '';
		$scope.id = '';
		$scope.isAdd=true;
		$scope.isOpen=true;
	};

}]);

