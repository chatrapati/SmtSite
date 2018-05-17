shopMyToolsApp.controller('dashboardController',
    ['$scope', '$http', '$location', '$rootScope', 'registrationService','dashBoardOrdersCountService', '$window', 'wishListService', 'userdataUpdateService',
        function ($scope, $http, $location, $rootScope,registrationService, dashBoardOrdersCountService, $window, wishListService, userdataUpdateService) {
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



                $scope.mobilenumbercheck=function(mobile){
    // alert(mobile)
      registrationService.mobilecheck(mobile).then(function(data){
        if(data.data.status=="email exists"){
          alert("Email id is already exists");
          $scope.registrationData.email="";

          var name =document.getElementById('email');
           if (name.value != ''){

               name.focus();
           }
                
        }else if(data.data.status=="mobile exists" ){
          alert("Mobile number is already exists");
          $scope.registrationData.user_mobile="";
           var mobileno = document.getElementById('user_mobile');
           if (mobileno.value != ''){

               mobileno.focus();
           }
        }
      
      })
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
                window.localStorage['mobile'] =userInfo.mobile;
                 $scope.userInfo = {"user_mobile": userInfo.mobile,"email": window.localStorage['email']};
                localStorage.setItem('userInfo',JSON.stringify($scope.userInfo))
                userdataUpdateService.updateuserData(userInfo, window.localStorage['user_id']).then(function (data) {
                    if (data.data.status == 'success' || data.data.status == 'details updated successfully') {
                        alert('Details updated successfully');
                        $location.path("dashboard")
                    } else if(data.data.status == 'OTP sent to requested mobile number'){
                      //  $rootScope.updatedMobile = userInfo.mobile;
                     
                         $("#otpmodal").modal('show');
                    }
                    else {
                        alert(data.data.status)
                    }
                })
            }
            $scope.editaddress=function(){
                $location.path("editaddress");
            }

            $scope.completeUpdation = function(otp,custData){
               
                userdataUpdateService.otpUpdateuserData(JSON.stringify(otp),$scope.userInfo.user_mobile,window.localStorage['user_id'],custData).then(function(data){
                   if(data.data.status == 'details updated successfully'){
                       alert('Details updated successfully')
                        $("#otpmodal").modal('hide');
                         $location.path("dashboard")
                   }else{
                       alert(data.data.status)
                   }
                })
            }

            $scope.goback = function () {
                $location.path("dashboard");
            }

        }]);

shopMyToolsApp.controller('wishListController', function ($scope, $rootScope,$window,addToCartService, $location, wishListService, removeWishListItemService) {

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


      $rootScope.addToCart = function (productObj) {
            if (window.localStorage['token']) {
                $scope.productObj = {};
                $scope.productObj = productObj;
                if ($rootScope.cartArray.length > 0) {
                    $scope.orderArray = [];
                    $scope.orderArray.push({ "productdescription": $scope.productObj.upload_name, "qty": "1" })
                    $rootScope.orderArray = $scope.orderArray.concat($rootScope.cartArray)
                } else {
                    $scope.orderArray = [];
                    $scope.orderArray.push({ "productdescription": productObj.upload_name, "qty": "1" })
                    $rootScope.orderArray = $scope.orderArray
                }
                addToCartService.addToCartMethod($rootScope.orderArray, window.localStorage['user_id']).then(function (data) {
                    if (data.data.status == 'item added to cart') {
                        if (productObj != "") {
                            $("#addedToCart").modal('show');
                            window.localStorage['orderId'] = data.data.orderid;
                            $scope.viewCartItems();
                        }
                        else {
                            window.localStorage['orderId'] = data.data.orderid;
                            $scope.viewCartItems();
                            localStorage.removeItem('localCartArray');
                        }
                    } else if (data.data.status == 'item added to cart..') {
                        //window.localStorage['orderId'] = data.data.orderid;
                        $("#addedToCart").modal('show');
                        $scope.viewCartItems();
                    }
                    else if (data.data.status == 'out off stock') {
                        $rootScope.avlQty = data.data.avlqty;
                        $("#outOfQty").modal('show');
                    }
                    else {
                        // alert(data.data.status)
                    }
                })
            } else {
                $scope.userId = "";
                if (localStorage.getItem('randomNumber') != undefined) {
                    $scope.randomNumber = localStorage.getItem('randomNumber');
                    // alert($scope.randomNumber)
                } else {
                    $scope.randomNumber = "";
                    // alert($scope.randomNumber)
                }
                $scope.orderArrayList = [];
                if ($rootScope.cartArray.length > 0) {
                    $rootScope.cartArray.push({ "productdescription": productObj.upload_name, "qty": "1" });
                    $scope.orderArrayList = $rootScope.cartArray;
                } else {
                    $scope.orderArrayList.push({ "productdescription": productObj.upload_name, "qty": "1" });
                }
                localStorage.setItem('localCartArrayList', JSON.stringify($scope.orderArrayList));
                $scope.localCartArrayList = JSON.parse(localStorage.getItem('localCartArrayList'));
                addToCartService.initiateCartOrders($scope.userId, $scope.randomNumber, $scope.orderArrayList).then(function (data) {
                    // alert(JSON.stringify(data))
                    if (data.data.status == 'item added to cart') {
                        $scope.random_no = data.data.random_number;
                        localStorage.setItem('randomNumber', $scope.random_no);
                        //  $rootScope.randomNumber = window.localStorage['randomNumber'];
                        $("#addedToCart").modal('show');
                    } else if (data.data.status == 'item added to cart..') {
                        $("#addedToCart").modal('show');
                        //  $scope.random_no = data.data.random_number;
                        // localStorage.setItem('randomNumber', $scope.random_no);
                    } else {
                        alert(data.data.status);
                    }
                    $scope.getCartItemsWithoutLogin();
                })
            }
        }

     $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

         

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