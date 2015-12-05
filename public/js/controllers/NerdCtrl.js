    angular.module('NerdCtrl', []).controller('NerdController', function ($scope,$filter, maplist,ngTableParams) {

    var dataSvc = {
        MapSurveys: [],

    };
    $scope.data = dataSvc;

    $scope.selectedCategory = null;

    $scope.tableData = [];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page 
        filter: {
            address: ''       // initial filter
        },
        sorting: {
            sortOrder: 'asc'     // initial sorting
        }
    }, {
        counts: [], // hides page sizes if not necessary
        total: $scope.data.MapSurveys.length, // length of data
        getData: function ($defer, params) {
            $scope.fillTableData(params);
            $defer.resolve($scope.tableData);
        }
    });

    $scope.fillTableData = function (params) {
        // use build-in angular filter
        var orderedData = params.filter() ?
                         $filter('filter')($scope.data.MapSurveys, params.filter()) :
                         $scope.data.MapSurveys;

        orderedData = params.sorting() ?
                    $filter('orderBy')(orderedData, params.orderBy()) :
                    orderedData;

        $scope.tableData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length); // set total for recalc pagination
    };


    $scope.GetMapSurveys = function () {
        var promiseGetAllMap = maplist.getallmap();

        promiseGetAllMap.then(function (pl) { dataSvc.MapSurveys = pl.data },
        function (errorPl) {
            $scope.error = 'failure loading data', errorPl;
        });
    };

    function init() {

        $scope.GetMapSurveys();
    }

    init();
})
.service("maplist", function ($http) {

    //Function to Read All Employees
    this.getallmap = function () {
        return $http.get("/api/survey");
    };
});
