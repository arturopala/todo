/** global jasmine, describe, it, expect */
describe('TodoApp', function(){

	beforeEach(angular.mock.module('TodoApp'));

	describe('Model',function(){

		it('should have tasks array', angular.mock.inject(function(Model){
			expect(Model.tasks).toBeDefined();
		}));
		it('should have status', angular.mock.inject(function(Model){
			expect(Model.status).toBeDefined();
		}));
		it('should have initial status.all == 0', angular.mock.inject(function(Model){
			expect(Model.status.all).toBe();
		}));
		it('should have initial status.notDone == 0', angular.mock.inject(function(Model){
			expect(Model.status.notDone).toBe();
		}));
		
	});

});
