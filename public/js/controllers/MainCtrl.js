    angular.module('MainCtrl', []).controller('MainController', function ($scope, SinglePageCRUDService) {


    $scope.doSearch = function () {
        //if ($scope.lat === 0) {
        //    alert('Directive did not update the location property in parent controller.');
        //} else {
        //    alert('Yay. Location: ' + $scope.lat, $scope.long);
        //}
    };

    $scope.save = function () {
        if ($scope.lat && $scope.maxwater) {
            var survey = {
                address: $scope.address,
                lat: $scope.lat,
                long: $scope.long,
                maxwater: $scope.maxwater
            };

            var promisePost = SinglePageCRUDService.post(survey);


            promisePost.then(function (pl) {

                alert("Thanks for your valuable time");
                $scope.address = '';
                $scope.maxwater = '';
            },
            function (errorPl) {
                $scope.error = 'failure loading Employee', errorPl;
            });
        }

    };


})
.service("SinglePageCRUDService", function ($http) {

    //Function to Read All Employees
    this.getEmployees = function () {
        return $http.get("/api/survey");
    };

    //Fundction to Read Employee based upon id
    this.getEmployee = function (id) {
        return $http.get("/api/survey/" + id);
    };

    //Function to create new Employee
    this.post = function (Employee) {
        var request = $http({
            method: "post",
            url: "/api/survey",
            data: Employee
        });
        return request;
    };

    //Function  to Edit Employee based upon id 
    this.put = function (id, Employee) {
        var request = $http({
            method: "put",
            url: "/api/survey/" + id,
            data: Employee
        });
        return request;
    };

    //Function to Delete Employee based upon id
    this.delete = function (id) {
        var request = $http({
            method: "delete",
            url: "/api/survey/" + id
        });
        return request;
    };

})
.directive('googlePlaces', function () {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: { lat: '=', long: '=', address: '=',maxwater:'=' },
        template: '<input ng-model="address" ng-blur="doSearch()" id="google_places_ac" name="google_places_ac" type="text" class="input-block-level form-control text-center" placeholder="Type Address here..." />',
        link: function ($scope, elm, attrs) {
            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $scope.lat = place.geometry.location.lat();
                $scope.long = place.geometry.location.lng();
                $scope.address = place.formatted_address;
                $scope.maxwater = '';
                $scope.$apply();
            });
        }
    }
});