//var app = angular.module("smtApp", []);

shopMyToolsApp.controller('recentlyviewedcontroller', ['$scope', '$http', '$location',

    '$rootScope','searchProductsService','Pagination',function ($scope, $http, $location, $rootScope,
        searchProductsService,Pagination) {
 $scope.loading = true;
            $scope.viewby = 12;
        $scope.viewmore=function(){
            if (window.localStorage['user_id']) {
                $scope.userId = window.localStorage['user_id'];
            } else {
                $scope.userId = "";
            }
            $scope.status = 'viewmore';
       searchProductsService.recentlyviewdprodcuts($scope.userId,$scope.status).then(function(data){
          $scope.loading = false;
        //    console.log(data.data)
        $scope.searchedMoreProducts = data.data.prod_info;
         $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.searchedMoreProducts.length / $scope.pagination.perPage);
                  
          

        })
        }

 $scope.abstractProcessPagination = function (position, pagination, list) {
      //next button
      if (position == 5) {
        pagination.nextPage();
        if (list[4] <= pagination.page && pagination.page != (pagination.numPages - 1)) {
          for (var i = 0; i < list.length; i++) {
            list[i] = list[i] + 1;
          }
        }
      } //prev button
      else if (position == -1) {
        pagination.prevPage();
        if (list[0] >= pagination.page && pagination.page != 0) {
          for (var i = 0; i < list.length; i++) {
            list[i] = list[i] - 1;
          }
        }
      } else {
        pagination.toPageId(list[position]);
        if (position == 4 && pagination.numPages > 5 && list[position] < pagination.numPages - 1) {
          for (var i = 0; i < list.length; i++) {
            list[i] = list[i] + 1;
          }
        } else if (position == 0 && pagination.numPages > 5 && list[0] > 0) {
          for (var i = 0; i < list.length; i++) {
            list[i] = list[i] - 1;
          }
        }
      }
    };

    $scope.processPagination = function (position) {
      $scope.abstractProcessPagination(position, $scope.pagination, $scope.pageList)
    }



        $scope.viewmore();


    }]);





