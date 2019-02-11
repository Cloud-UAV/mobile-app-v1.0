describe('LoginCtrl', function() {

    beforeEach(module('starter'));

    var $controller;
    
    beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    	$controller = _$controller_;
  	}));
    

	describe('$scope.grade', function() {
	
	    var LoginService;
        beforeEach(module('starter'));

        beforeEach(inject(function (_LoginService_) {
            LoginService = _LoginService_;
        }));

        it('can get an instance of LoginService', function () {
            expect(LoginService).toBeDefined();
        });


	});

});  
