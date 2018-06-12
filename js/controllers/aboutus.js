shopMyToolsApp.controller('aboutuscontroller',['$scope','$rootScope',function($scope,$rootScope,$window){
    // alert("hai")

    $rootScope.seo={tags:"About Us",keywords:"about us, about us page, it company about us, this is us, accessories, air tools, garden equipment, garden tools, hand tools, online tool store, power tools, power tools online, spares and accessories, tool store, tools, tools for sale, welding tools",metadescription:"Buy Power Tools, Hand Tools, Welding Tools, Garden Tools and Air tools. Spares and Accessories are also available. Get deals, offers and coupons from shopmytools.com", metatitle:"About Us - Online Tool Store|Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

    
    
   // alert($rootScope.pagetitle)
}])


shopMyToolsApp.controller('todaydealscontroller',['$scope','$rootScope','todayDealsservice','Pagination',function($scope,$rootScope,todayDealsservice,Pagination){
        $scope.viewby = 10;
        $scope.deals=function(){

         
          
        todayDealsservice.todaydeals().then(function(data){
            // console.log(data.data)
        //    alert(JSON.stringify(data))
            $rootScope.products = data.data.products_info;
   $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);


        })
        }
     $scope.deals();

 $scope.x = "Grid";
  $scope.layout = "Grid";


    $scope.selectLayout = function (x) {
      // alert(x);
      $scope.layout = x;
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
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


   // alert($rootScope.pagetitle)
}])







