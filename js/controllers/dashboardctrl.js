shopMyToolsApp.controller('dashboardController',
    ['$scope', '$http', '$location', '$rootScope', 'dashBoardOrdersCountService', '$window', 'wishListService', 'userdataUpdateService',
        function ($scope, $http, $location, $rootScope, dashBoardOrdersCountService, $window, wishListService, userdataUpdateService) {
            $window.scrollTo(0, 0);

            $scope.changePassword = function(){
                window.location.href="./resetPassword.html";
            }

            $scope.getDashBoardServiceDetails = function () {
                
                $scope.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if($scope.userInfo.user_mobile.length == 12){
                     $scope.userInfo.user_mobile = $scope.userInfo.user_mobile.slice(2);
                }else{
                     $scope.userInfo.user_mobile = $scope.userInfo.user_mobile;
                }
              
                // $scope.gstNumber = JSON.parse(localStorage.getItem('gstNumber'));
                dashBoardOrdersCountService.ordersCountMethod($scope.userInfo.email, $scope.userInfo.user_mobile, window.localStorage['user_id']).then(function (data) {
                    // alert(JSON.stringify(data))
                    if (data.data.status == 'Success') {
                        // $scope.ordersCount = data.data;
                        $rootScope.wishListCountItems = data.data.wishlist_items;
                        $rootScope.invoiceCountItems = data.data.invoice_count;
                        $rootScope.yourOrdersCountItems = data.data.orders_count;
                        $rootScope.pendingOrderCountItems = data.data.pending_order_count;
                        $rootScope.customerData = data.data.cust_details
                        //alert(JSON.stringify($rootScope.customerData))
                        localStorage.setItem('userEmail',$rootScope.customerData.email)

                        $rootScope.customerData.mobile = $rootScope.customerData.mobile;
                        if($rootScope.customerData.mobile.length == 12){
                            
                          $rootScope.customerData.mobile = $rootScope.customerData.mobile.slice(2);
                        }
                        else{
                          $rootScope.customerData.mobile =  $rootScope.customerData.mobile;
                        }
                      //  $rootScope.customerData.mobile = $rootScope.customerData.mobile.slice(2);
                        window.localStorage['customermobile']=  $rootScope.customerData.mobile;
                       
                        //alert(window.localStorage($rootScope.customerData.mobile);)
                        $rootScope.couponCode = data.data.cupon_code;
                        if (data.data.reward_points == null) {
                            $rootScope.rewardPoints = 0;
                        } else {
                            $rootScope.rewardPoints = data.data.reward_points;

                        }


                    } else {
                        alert(data.data.status);
                    }
                })
            }

            if(window.localStorage['token']){
                 $scope.getDashBoardServiceDetails();
            }else{
              //  window.location.href = "./login.html";
              $location.path("/")
            }
           

          //  localStorage.setItem('wishlistBreadCrumbFlag','false');

            $scope.gotoWishList = function () {

                 localStorage.setItem('wishlistBreadCrumbFlag','true');

                $location.path("wishlist");

            }

            $scope.pageNavigate = function(){
                $location.path("dashboard");
            }

            $scope.goToHome = function(){
                $location.path("/");
            }

            $scope.gotoInvoice = function () {
                localStorage.setItem('showInvoice','true');
                localStorage.setItem('showMyOrders','false');
                localStorage.setItem('showPendingOrders','false');

                $location.path("invoiceOrders");
            }

            $scope.getOrders = function () {
                localStorage.setItem('showMyOrders','true');
                localStorage.setItem('showInvoice','false');
                localStorage.setItem('showPendingOrders','false');
                $location.path("myorders")

            }

            $scope.gotoPendingOrders = function () {
                localStorage.setItem('showPendingOrders','true');
                localStorage.setItem('showInvoice','false');
                 localStorage.setItem('showMyOrders','false');
                $location.path("pendingOrders")
            }

            $scope.goToEdit = function () {
                $location.path("editAccount");
            }

            $scope.updateEditDetails = function (userInfo) {
                window.localStorage['user_name'] = userInfo.first_name;
                userdataUpdateService.updateuserData(userInfo, window.localStorage['user_id']).then(function (data) {
                    if (data.data.status == 'success') {
                        alert('Updated Successfully');
                        $location.path("dashboard")
                    } else {
                        alert(data.data.status)
                    }
                })
            }

            $scope.goback = function () {
                $location.path("dashboard");
            }

        }]);

shopMyToolsApp.controller('wishListController', function ($scope, $rootScope,$window, $location, wishListService, removeWishListItemService) {

    $scope.getWishlistItems = function () {
        $scope.loading = true;
        wishListService.yourWishlistMethod(window.localStorage['user_id']).then(function (data) {

            if (data.data.status == 'success') {
                 $rootScope.wishlistBreadCrumbFlag = localStorage.getItem('wishlistBreadCrumbFlag');
                // alert( $rootScope.wishlistBreadCrumbFlag)
                $rootScope.yourWishlist = data.data.prod_info;
                $scope.loading = false;
                $scope.data = $rootScope.yourWishlist;
                $scope.viewby = 5;
                $scope.totalItems = $scope.data.length;
                $scope.currentPage = 1;
                $scope.itemsPerPage = $scope.viewby;
            } else {
                alert(data.data.status);
            }

        })
    }
 $scope.pageNavigate = function(){
                $location.path("dashboard");
            }

             $scope.goToHome = function(){
                $location.path("/");
            }


    


if(window.localStorage['token']){
  $scope.getWishlistItems();
}else{
  //  window.location.href = "./login.html";
  $location.path("/")
}


    $scope.removeWishListItem = function (wishListObj) {
          if ($window.confirm("Are you sure you want to delete this product from Wishlist?")) {
        removeWishListItemService.removeWishListItemMethod(window.localStorage['user_id'], wishListObj.upload_name).then(function (data) {
            if (data.data.status == 'product removed successfully') {
                $scope.getWishlistItems();
            } else {
                alert(data.data.status)
            }
        })
          }
    }

    $scope.productDetails = function (productObj) {
        window.localStorage['productName'] = productObj.upload_name;

        $location.path("productDetailPage")
    }


})