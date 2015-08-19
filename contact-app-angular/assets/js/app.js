
    ///// Route between the App views amd load the Controller functions simultaniously ===========>>>
	var myApp = angular.module('MyContactApp', ['ngRoute', 'ngAnimate']);

		myApp.config(['$routeProvider', function($routeProvider) {
	  	$routeProvider.
	  	
	      when('/', {
	      	templateUrl: 'assets/ui/lists.html', 
	      	controller: 'ListCtrl'
	      }).

	      when('/add-contact', {
	      	templateUrl: 'assets/ui/add-new.html', 
	      	controller: 'AddCtrl'
	      }).

	      when('/edit/:id', {
	      	templateUrl: 'assets/ui/edit.html', 
	      	controller: 'EditCtrl'
	      }).
	      
	      when('/back' , {templateUrl: 'assets/ui/list', controller: 'ListCtrl'}).
	
	      otherwise({redirectTo: '/'});

	}]);




	///// List all the available contactss in database ======================================>>> 
	myApp.controller ('ListCtrl', function ($scope,$http,$routeParams,$location,$route) {

		var id = $routeParams.id;
	  	$scope.activePath = null;
		$http.get('http://localhost:8000/api/contact/get').success(function(data) {
			console.log(data)
		    $scope.contacts = data;
		    $scope.activePath = $location.path('/');
	  
		});
	  
	  ///// Delete an existing contact in the database from the list =======================>>>
	 	$scope.deleteList = function(contact) {

	     var deleteContact = confirm('Are you absolutely sure you want to delete?');
	     if (deleteContact) {

	     	 $scope.activePath = null;
	         $http.delete('web-service/contacts/'+contact.id);
			 $route.reload();
			 $scope.ListCtrl();
			
			};
  	  	};
	});

	///// Add a new contact to the database ================================================>>>
	myApp.controller('AddCtrl' , function ($scope, $http, $location) {
	  
	  $scope.master = {};
	  $scope.activePath = null;
	
	  $scope.add_new = function(contact, AddNewForm) {
		
		
	    $http.post('web-service/add_contact', contact).success(function(){
	      $scope.reset();
	      $scope.activePath = $location.path('/');
	    });
	
	    $scope.reset = function() {
	      $scope.contact = angular.copy($scope.master);
	    };

		$scope.reset();
		
	  };
	});
	
	///// Edit an existing contact in the database =======================================>>>
	myApp.controller('EditCtrl', function ($scope, $http, $location, $routeParams) {
	  var id = $routeParams.id;
	  $scope.activePath = null;
  	  $http.get('web-service/contacts/'+id).success(function(data) {
      $scope.contact = data;
      
  	});
	
	///// Update an existing contact in the database ====================================>>>
  	$scope.update = function(contact){
    	$http.put('web-service/contacts/'+id, contact).success(function(data) {
      	$scope.contact = data;
      	 $scope.activePath = $location.path('/');
		$scope.ListCtrl();
    	});
  	};

    ///// Delete an existing contact in the database =====================================>>>
    $scope.delete = function(contact) {
    console.log(contact);

    var deleteContact = confirm('Are you absolutely sure you want to delete?');
    if (deleteContact) {

       $http.delete('web-service/contacts/'+id, contact);
       $scope.activePath = $location.path('/');
    };
  };


});

	


