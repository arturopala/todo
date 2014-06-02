/** global jasmine, describe, it, expect */
describe('TodoApp', function(){

	beforeEach(module('TodoApp'));

	describe('Model',function(){

		it('should have tasks array', inject(function(Model){
			expect(Model.tasks).toBeDefined();
		}));
		it('should have status', inject(function(Model){
			expect(Model.status).toBeDefined();
		}));
		it('should have initial status.all == 0', inject(function(Model){
			expect(Model.status.all).toBe(0);
		}));
		it('should have initial status.notDone == 0', inject(function(Model){
			expect(Model.status.notDone).toBe(0);
		}));
		
	});

	describe('TasksService',function(){

		it('should load tasks from backend service', inject(function(TasksService,Model,$httpBackend){
			Model.tasks = undefined;
			$httpBackend.when('POST','/tasks').respond(200);
			$httpBackend.when('GET','/tasks').respond({foo:'bar'});
			TasksService.loadTasks();
			$httpBackend.flush();
			expect(Model.tasks).toBeDefined();
			expect(Model.tasks.foo).toBe('bar');
		}));

	});

});
