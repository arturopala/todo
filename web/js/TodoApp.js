angular.module('TodoApp',[])
.value('Model',{
	tasks: [],
	status: {
		all: 0,
		notDone: 0,
		flag: 'APP_STARTED'
	}
})
.factory('TasksService', ['$http','$filter','Model',function($http,$filter,Model){
	return {
		loadTasks: function(){
			return $http.get('/tasks').success(function(tasks){
				Model.tasks = tasks;
			});
		},
		saveTasks: function(){
			return $http.post('/tasks', Model.tasks || []);
		},
		updateStatus: function(){
			Model.status.all = Model.tasks && Model.tasks.length;
			Model.status.notDone = Model.tasks && $filter('filter')(Model.tasks,function(task){return !task.done;}).length;
			Model.status.flag = $filter('tasksStatus')(Model.status.notDone, Model.status.all);
		}
	};
}])
.filter('tasksStatus', function(){
	return function(notDone,all){
		if(all<1) {
			return 'EMPTY';
		} else if (notDone>1 && notDone === all){
			return 'ABOUT_TO_START';
		} else if (notDone>1 && notDone/all < 0.35){
			return 'IN_PROGRESS_HIGH';
		} else if (notDone>1 && notDone/all >= 0.65){
			return 'IN_PROGRESS_LOW';
		} else if (notDone>1 && notDone/all < 0.65){
			return 'IN_PROGRESS_MIDDLE';
		} else if (notDone === 1){
			return 'ONE_LEFT';
		} else {
			return "COMPLETED"
		}
}})
.run(['$rootScope','Model','TasksService',function($rootScope,Model,TasksService){
	$rootScope.$watch(
		function(){return Model.tasks;},
		function(fresh,old){
			TasksService.updateStatus();
			TasksService.saveTasks();
			$rootScope.$broadcast('tasksListChanged');
		}, true
	);

	TasksService.loadTasks();
}])
.controller('HeaderController', ['$scope','$filter','Model',function($scope,$filter,Model) {
	$scope.$on('tasksListChanged',function(){
		$scope.status = Model.status;
	});
}])
.controller('TasksController', ['$scope','Model',function($scope,Model) {
	$scope.addTask = function(){
		var tasks = $scope.taskTitle.split(',')
		angular.forEach(tasks, function(value, key){
			Model.tasks.push({title:value, date: new Date()});
		})
		$scope.taskTitle = '';
		$scope.addTaskForm.taskTitleInput.$dirty = false;
	};

	$scope.$on('tasksListChanged',function(){
		$scope.tasks = Model.tasks;
	});

	$scope.removeTask = function(index){
		Model.tasks.splice(index,1);
	};

	$scope.editOrCopyTask = function(index){
		if(Model.tasks[index].done){
			$scope.taskTitle = Model.tasks[index].title;
			document.getElementById('taskTitleInput').focus();
		}
	};
}])
;
