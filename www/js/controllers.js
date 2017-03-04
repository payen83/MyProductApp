angular.module('app.controllers', [])
  
.controller('listingCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

	$scope.doRefresh = function(){
		$http.get('js/product.json').then(function(response){
		      $scope.products = response.data;
		      $scope.$broadcast('scroll.refreshComplete');
		});
	};


}])
   
.controller('addNewCtrl', ['$scope', '$stateParams', 
	'$ionicPopup', '$state', 

function ($scope, $stateParams, $ionicPopup, $state) {

	$scope.saveProduct = function(){

		$scope.item.id = $scope.products.length + 1;

		$scope.products.push($scope.item);

		var stringify = JSON.stringify($scope.products);

		localStorage.setItem('products', stringify);

		var alertPopup = $ionicPopup.alert({
	     title: 'Successful',
	     template: 'Data Added Successfully!'
	   	});

	   alertPopup.then(function(res) {
	     	$state.go('listing');
	   });

	};

}])
   
.controller('detailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.item = $scope.products.filter(function(item){
		return item.id == $stateParams.id;
	}).pop();

}])
 