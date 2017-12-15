var app = angular.module('myapp', []);

	app.controller('getBuses',['$scope', '$http', '$window', function($scope, $http, $window) {


		$scope.getBuses=function(){
			console.log('going to..' + url);
			$scope.buses=[];
			var url='/searchBus?source='+$scope.from+'&destination='+$scope.to;
			console.log('going to..' + url);
			$http.get(url)
			.then(function(response){
				$scope.buses=response.data;
			})

		};

		$scope.bookTicket=function(index){
			var bus=$scope.buses[index];
			var user_id=$scope.currUser._id;
			var data={
				bus_id:bus.bus_id,
				owner_id:user_id,
				bus_name:bus.bus_name,
				source:bus.source,
				destination:bus.destination,
				seat_no:bus.seats_available
			}
			$http.post('/bookTicket',data)
			.then(function(response){

			});
			
		};

		$scope.cancelTicket=function(index){
			var ticket=$scope.userTickets[index];
			console.log(ticket);
			var ticket_id=ticket._id;
			var url='/cancelTicket?ticket_id='+ticket_id;
			$http.get(url)
			.then(function(response){
				console.log("Ticket cancelled Succesfully!");

			});
			
		};



		$scope.loadTickets=function(){
			$scope.userTickets=[];
			var url='/getTickets?user_id='+$scope.currUser._id;
			$http.get(url)
			.then(function(response){
				$scope.userTickets=response.data;
			});


		};

		$scope.getBusDetails=function(index){
			var bus_id=$scope.buses[index]._id;
			var url='/getBusDetails?bus_id='+bus_id;
			$scope.busStops=[];
			$http.get(url)
			.then(function(response){
				$scope.busDetails=response.data;
				$scope.busStops=$scope.busDetails.stops;
				console.log("bus busDetails: "+ $scope.busDetails);
				console.log("bus stops: "+ $scope.busStops);
			});


		};

		// $scope.loadTickets();

		
	}]);

	

