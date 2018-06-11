shopMyToolsApp.controller('headerController', ['$scope', '$http', '$location',
    '$rootScope', 'getHeaderService', 'getFooterService', 'getAllCategoriesService',
    'searchProductsService', 'homePageService',
    'compareProductsService', 'addToWishListService',
    'searchProductsService', 'addToCartService', 'viewCartService',
    '$route', '$timeout', 'searchProductsMoreService', '$window', 'deleteCartService','DOMAIN_URL',
    'addCompareProductsService','logoutService','$mdSidenav','$log',
    function ($scope, $http, $location, $rootScope, getHeaderService, getFooterService,
        getAllCategoriesService, searchProductsService, homePageService,
        compareProductsService, addToWishListService,
        searchProductsService, addToCartService, viewCartService,
        $route, $timeout, searchProductsMoreService, $window, deleteCartService,
        DOMAIN_URL,addCompareProductsService,logoutService, $mdSidenav,$log) {



        $window.scrollTo(0, 0);
        $scope.user_name = window.localStorage['user_name'];
        $scope.token = window.localStorage['token'];
        $rootScope.cartArray = cartArray;

        $scope.getHeader = function () {
            getHeaderService.headerMethod().then(function (data) {
               
                if (data.data.status == 'success') {
                    $scope.headerArray = data.data.header_data;

                } else {
                    // alert(data.data.status)
                }
            });
        }
      
         $rootScope.seo = { pageTitle : 'Header Conteroller', pageDescription : 'Header controller description'}; 
      

         $scope.coupons=function(){
          
              window.location.href = DOMAIN_URL+"/coupons";
        }
            

        $scope.todaydeals=function(){

            $location.path("todaydeals");
             // $scope.deals();
        }



       

        $scope.goToWishList = function () {
            if (window.localStorage['token']) {
                localStorage.setItem('wishlistBreadCrumbFlag', 'false');
                $location.path("wishlist");
            }
        }

        $scope.goToCheckout = function () {

            if (window.localStorage['user_id']) {
                if ($rootScope.cartArray.length != 0) {
                   window.location.href = DOMAIN_URL+"/checkout";
                }

            }

        }

        $rootScope.addToWishList = function (productObj) {

            // alert('1')
            if (window.localStorage['token']) {
                addToWishListService.addToWishListMethod(window.localStorage['user_id'], productObj.upload_name).then(function (data) {
                    if (data.data.status == 'product saved successfully') {
                        $("#addedToWishList").modal('show');
                    } else if(data.data.status == 'product already existed in your wishlist') {
                        alert('product already existed in your wishlist')
                    }
                })
            } else {
                alert('Please Login to Add To WishList')
            }
        }

         $rootScope.compareProducts = compareProducts;

        $rootScope.getCompareProducts = function () {
            addCompareProductsService.getCompareProductsMethod(window.localStorage['user_id']).then(function (data) {
                // alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $rootScope.compareProducts = data.data.prod_info;
                    localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                    // alert(localStorage.getItem('compareProducts'))
                }
            })
        }

        if (window.localStorage['user_id']) {
            $scope.getCompareProducts();
        } else {
            if (localStorage.getItem('compareProducts')) {
                $rootScope.compareProducts = JSON.parse(localStorage.getItem('compareProducts'));
            } else {
                $rootScope.compareProducts = [];
            }
        }


        $rootScope.addToCompare = function (productObj) {
            // alert(productObj)
            if (window.localStorage['user_id']) {
                for (var i = 0; i < $rootScope.compareProducts.length; i++) {
                    if ($rootScope.compareProducts[i] == productObj.upload_name) {
                        $scope.match = true;
                        break;
                    }
                    else {
                        $scope.match = false;
                    }
                }
                if ($scope.match) {
                    alert('This Product Already Existed in Compare Products');
                } else {
                    if ($rootScope.compareProducts.length == 3) {
                        alert('More than 3 products are not allowed for Comparision')
                    } else {
                        addCompareProductsService.compareProductsMethod(productObj.upload_name, window.localStorage['user_id']).then(function (data) {
                            //alert(JSON.stringify(data))
                            if (data.data.status == 'success') {
                                $rootScope.compareProducts = data.data.prod_info;
                                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                                $("#addedToCompareProducts").modal('show');
                                $scope.getCompareProducts();
                            }  else if(data.data.status == 'subcategory not matched'){
                                alert('Compare only same Sub-category');
                            }
                        })
                    }
                }

            } else {
                if ($rootScope.compareProducts.length == 0) {
                    $rootScope.compareProducts.push(productObj.upload_name);
                    $rootScope.compareDetails = productObj.upload_subcategory;
                    localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                    $("#addedToCompareProducts").modal('show');
                } else {
                    if ($rootScope.compareProducts.length == 3) {
                        alert('More than 3 products are not allowed for Comparision')
                    } else {
                        for (var i = 0; i < $rootScope.compareProducts.length; i++) {
                            if ($rootScope.compareProducts[i] == productObj.upload_name) {
                                $scope.match = true;
                                break;
                            }
                            else {
                                $scope.match = false;
                            }
                        }
                        if ($scope.match) {
                            alert('This Product Already Existed in Compare Products');
                        } else {
                            if($rootScope.compareDetails == productObj.upload_subcategory){
                                $rootScope.compareProducts.push(productObj.upload_name);
                            localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                            $("#addedToCompareProducts").modal('show');
                            }else{
                                alert('Compare only same Sub-category'); 
                            }
                            
                        }
                    }
                }
            }

        }

         $rootScope.getProductDetails = function (productObj) {
           //alert('1')
       
            window.localStorage['productName'] = productObj.upload_name;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';

            localStorage.setItem('breadCrumb', productObj.upload_category);

            localStorage.setItem('breadCrumb1', productObj.upload_subcategory);

            location.reload();

            window.location.href = DOMAIN_URL+"/productDetailPage";

        //    alert("hai")

        }


          $rootScope.productReview = function (productObj, isReview) {
            localStorage.setItem('isReviewStatus', isReview);
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            $scope.productDetailedUrl = document.URL.split("/");
            if ($scope.productDetailedUrl[$rootScope.productReview.length-1] == 'productDetailPage') {
               // window.localStorage['productName'] = productObj.upload_name;
                location.reload();
                $window.scrollTo(0, 0);
                $location.path("productDetailPage");
            } else {
                $location.path("productDetailPage");
            }
        }

          $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

        }

      $scope.getProductDetailsFromCompare = function (productObj) {
            window.localStorage['productName'] = productObj;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            $location.path('productDetailPage');
        }

        $scope.gotoCartPage = function () {
      
             window.location.href = DOMAIN_URL+"viewCart";
      
        }


    

        $scope.getFooter = function () {
            getFooterService.footerMethod().then(function (data) {
              
                if (data.data.status == 'success') {
                    $scope.paymentArray = data.data.payment_methods_data;
                    $scope.custServiceArray = data.data.customer_service_data;
                    $scope.shopMyToolsArray = data.data.shopmytools_data;
                    $scope.addressArray = data.data.address;


                } else {
                    //  alert(data.data.status)
                }
            });
        }

       // $scope.getFooter();

        $scope.getCategories = function () {
            getAllCategoriesService.getCategoriesMethod().then(function (data) {
                if (data.data.status == 'success') {
                    $scope.categoryArray = data.data.categories;
                  
                } else {
                    //  alert(data.data.status)
                }
            })
        }

          $rootScope.test = function (searchKey) {
            if (searchKey.length > 0) {
                localStorage.setItem('searchkey', searchKey);
                $rootScope.showHintFlag = 'false';
                $location.path("searchPage");
                $scope.searchPageURL = document.URL.split("/");
                if ($scope.searchPageURL[$scope.searchPageURL.length - 1] == 'searchPage') {
                    $location.path("searchPage1");
                }
                else {
                    $location.path("searchPage");
                }
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
                $location.path("/")
            }
        }

        $scope.logintest = function(searchKey){
              if (searchKey.length > 0) {
                localStorage.setItem('searchkey', searchKey);
                $rootScope.showHintFlag = 'false';
                $scope.searchPageURL = document.URL.split("/");
                if ($scope.searchPageURL[$scope.searchPageURL.length - 1] == 'searchPage') {
                  window.location.href =DOMAIN_URL+"/searchPage1";
                }
                else {
                    window.location.href =DOMAIN_URL+"/searchPage";
                }
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
                $location.path("/")
            }

        }

        $scope.getCategories();

         $scope.subCategoryMethod = function (subCategory, categoryName) {
            localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            location.reload();
            $scope.categoryURL = document.URL.split("/");

                     if(navigator.userAgent.indexOf("Firefox") != -1 ){
                          window.location.reload();
                         $location.path("categoryPage");
           // alert('1')
            // if ($scope.categoryURL[$scope.categoryURL.length - 1] == 'categoryPage') {
 //window.location.reload();
            //      $(".dropdown-menu.multi-level").css("display", "none");
            //  window.location.href = DOMAIN_URL+"/categoryPage";
              
            // } else {
            //     window.location.href = DOMAIN_URL+"#!/categoryPage";
            //     $(".dropdown-menu.multi-level").css("display", "none");
            //     window.location.reload();
            // }
         }else{
           
            window.location.reload();
            // if ($scope.categoryURL[$scope.categoryURL.length - 1] == 'categoryPage') {
            //      $(".dropdown-menu.multi-level").css("display", "none");
              $location.path("categoryPage");
            // } else {
            //     $location.path("categoryPage");
            //     $(".dropdown-menu.multi-level").css("display", "none");
            // }
         }
        //    if ($scope.categoryURL[1] == 'categoryPage') {
        //         $(".dropdown-menu.multi-level").css("display", "none");
        //        $location.path("categoryPage1");
        //     } else {
        //          $(".dropdown-menu.multi-level").css("display", "none");
        //         $location.path("categoryPage");
        //     }
        }

        $scope.loginsubCategoryMethod = function(subCategory, categoryName){
            localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            $scope.categoryURL = document.URL.split("/");
           if ($scope.categoryURL[$scope.categoryURL.length-1] == 'categoryPage') {
                $(".dropdown-menu.multi-level").css("display", "none");
              
               window.location.href = DOMAIN_URL+"/categoryPage1";
            } else {
                 $(".dropdown-menu.multi-level").css("display", "none");
               
               window.location.href = DOMAIN_URL+"/categoryPage";
            }
        }
        $rootScope.showHintFlag = 'false';
         $rootScope.showHintMsg = 'false';
      
      $rootScope.showHint = function (searchKey) {
    if(window.localStorage['user_id']){
        $scope.userId = window.localStorage['user_id'];
    }else{
       $scope.userId =""; 
    }
            if (searchKey.length >= '3') {
                searchProductsService.searchProductsMethod(searchKey,$scope.userId).then(function (data) {
                    if (data.data.status == 'success') {
                         $rootScope.showHintMsg = 'false';
                        $rootScope.searchedProducts = data.data.product_info;   
                        if ($rootScope.searchedProducts.length == 1 ) {
                              $rootScope.searchClass = "data_ctrl_search3";
                           
                        } else if ($rootScope.searchedProducts.length == 2) {
                              $rootScope.searchClass = "data_ctrl_search4";
                           
                        }
                        else if ($rootScope.searchedProducts.length == 4) {
                         $rootScope.searchClass = "data_ctrl_search5";
                         
                        }
                        else if ($rootScope.searchedProducts.length == 3) {
                           
                         $rootScope.searchClass = "data_ctrl_search6";
                           
                        }
                        else if ($rootScope.searchedProducts.length >= 6) {
                           
                         $rootScope.searchClass = "data_ctrl_search7";
                          
                        }
                         else if ($rootScope.searchedProducts.length == 5) {
                           
                         $rootScope.searchClass = "data_ctrl_search8";
                           
                        }
                        $rootScope.recommendedList = data.data.recommended;
                        $rootScope.showHintFlag = 'true';
                        localStorage.setItem('searchedProducts',JSON.stringify($rootScope.searchedProducts));
                    }else if(data.data.status == 'successdata'){
                         $rootScope.showHintMsg = 'false';
                        $rootScope.searchedProducts1 = data.data.product_info;
                     
                        $rootScope.searchedProducts = [];
                    for (i = 0; i < $rootScope.searchedProducts1.length; i++) {
                        $scope.searchedProductsObj = $rootScope.searchedProducts1[i];
                        for (j = 0; j < $scope.searchedProductsObj.prices.length; j++) {
                            if ($scope.searchedProductsObj.prices[j].doubleoffer_price != 0) {
                                $rootScope.searchedProducts.push($scope.searchedProductsObj)
                            }
                        }
                    }
                        if ($rootScope.searchedProducts.length == 1 ) {
                            $rootScope.searchClass = "data_ctrl_search3";
                           
                        } else if ($rootScope.searchedProducts.length == 2) {
                             $rootScope.searchClass = "data_ctrl_search4";
                           
                        }else if ($rootScope.searchedProducts.length >= 6) {
                            $rootScope.searchClass = "data_ctrl_search7";
                          
                        }
                        else if ($rootScope.searchedProducts.length == 3) {
                           
                           $rootScope.searchClass = "data_ctrl_search6";
                          
                        }
                        else if ($rootScope.searchedProducts.length == 4) {
                           
                           $rootScope.searchClass = "data_ctrl_search5";
                           
                        }
                          else if ($rootScope.searchedProducts.length == 5) {
                           
                         $rootScope.searchClass = "data_ctrl_search8";
                           
                        }
                        $rootScope.recommendedList = data.data.recommended;
                        $rootScope.showHintFlag = 'true';
                         localStorage.setItem('searchedProducts',JSON.stringify($rootScope.searchedProducts));
                    }
                     else if (data.data.status == 'fail') {

                        $rootScope.searchedProducts = JSON.parse(localStorage.getItem('searchedProducts'));
                       
                      
                        $rootScope.showHintMsg = 'true';
                         $rootScope.showHintFlag = 'false';
                         if ($rootScope.searchedProducts.length == 1 ) {
                            $rootScope.searchClass = "suggestionsCls1";
                          
                        } else if ($rootScope.searchedProducts.length == 2) {
                             $rootScope.searchClass = "suggestionsCls2";
                            
                        }else if ($rootScope.searchedProducts.length >=  6) {
                           
                            $rootScope.searchClass = "suggestionsCls6";
                          
                        }
                        else if ($rootScope.searchedProducts.length == 3) {
                           
                           $rootScope.searchClass = "suggestionsCls3";
                           
                        }
                         else if ($rootScope.searchedProducts.length == 5) {
                           
                           $rootScope.searchClass = "suggestionsCls5";
                           
                        }else if ($rootScope.searchedProducts.length ==  4) {
                            $rootScope.searchClass = "suggestionsCls4";
                           
                        }
                    }
                })
            } else if (searchKey.length == '0') {
             
                $rootScope.showHintFlag = 'false';
                 $rootScope.showHintMsg = 'false';
               
            }
        }


        if (localStorage.getItem('compareProducts')) {

            $rootScope.compareProducts = JSON.parse(localStorage.getItem('compareProducts'));
        } else {
            $rootScope.compareProducts = compareProducts;
        }

         $rootScope.clearCompareProducts = function () {
            if(window.localStorage['user_id']){
                 if ($window.confirm("Are you sure you want to delete this product from comparison?")) {
                addCompareProductsService.delCompareProductsMethod('',window.localStorage['user_id'],'all').then(function(data){
                   if(data.data.status == 'success'){
                        $rootScope.compareProductData = [];
                        localStorage.removeItem('compareProducts');
                         $rootScope.compareProducts = [];
                     
                   }
                })
                  }
            }else{
                  $rootScope.compareProductData = [];
                   $rootScope.compareProducts = [];
                localStorage.removeItem('compareProducts');
             
            }

        }

        $scope.goToLogin = function () {
          
            window.location.href = "./login.html";
        }

        $scope.goToAddressBook = function () {
            $location.path("addressBook");
        }

       
         $scope.goToLogout = function () {
            logoutService.userLogout(window.localStorage['token']).then(function (data) {
                if (data.data.status == 'success') {
                    $window.localStorage.clear();
                    $scope = $scope.$new(true);
                    $rootScope = $rootScope.$new(true);
                    window.location.href = "./login.html";
                } else {
                }
            })
        }

              var timeout;
document.onmousemove = function(){
    if(window.localStorage['token']){
        clearTimeout(timeout);
  timeout = setTimeout(function(){
       $scope.goToLogout();
  }, 600000);
    }
  
}


        $scope.goToHome = function () {
       
            $location.path("/");
        }

        $scope.goToHomeFromLogin = function(){
            window.location.href = "./";
        }
        $scope.goToLogin=function(){
            window.location.href = "./login.html";
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

    



        $rootScope.viewCartItems = function () {

            if (localStorage.getItem('randomNumber')) {

                viewCartService.cartItemsWithLoginMethod(window.localStorage['user_id'], localStorage.getItem('randomNumber')).then(function (data) {

                 

                    if (data.data.status == 'success') {

                        $rootScope.cartArray = data.data.total_item_list;

                        $scope.orderId = data.data.orderid;

                        window.localStorage['orderId'] = $scope.orderId;

                        localStorage.removeItem('randomNumber');
                        //   if($rootScope.cartArray.length == 0){
                        //     $location.path("/");
                        // }

                    } else {

                        //alert(data.data.status);

                    }

                })

            } else {

                viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {

                    // console.log('1'+JSON.stringify(data))

                    if (data.data.status == 'success') {

                        $rootScope.cartArray = data.data.item_list;

                        $scope.orderId = data.data.orderid;

                        $rootScope.grandTotal = data.data.grand_total;

                        window.localStorage['orderId'] = $scope.orderId;

                        // if($rootScope.cartArray.length == 0){
                        //     $location.path("/");
                        // }

                    } else {

                        //alert(data.data.status);

                    }

                })

            }



        }


        if (window.localStorage['user_id']) {

            $scope.viewCartItems();
        }


        $scope.getCartItemsWithoutLogin = function () {
            viewCartService.cartItemsWithoutLoginMethod(localStorage.getItem('randomNumber')).then(function (data) {
              
                if (data.data.status == 'success') {
                    $rootScope.cartArray = data.data.item_list;
                    $scope.orderId = data.data.orderid;
                    window.localStorage['orderId'] = $scope.orderId;
                } else {
                    //alert(data.data.status);
                }
            })
        }



        $scope.clearCart = function () {
            if (window.confirm("Are you sure you want to clear cart? ")) {
                if (window.localStorage['user_id']) {
                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], "all").then(function (data) {
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                             $location.path("/");
                            $scope.viewCartItems();
                           
                        }
                    })
                } else {
                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), "all").then(function (data) {
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                              $location.path("/");
                            $scope.getCartItemsWithoutLogin();
                           
                        }
                    })
                }
            }
        }
          $scope.removeCompareItem = function (categoryObj) {
            if (window.localStorage['user_id']) {
                if ($window.confirm("Are you sure you want to delete this product from comparison?")) {
                    addCompareProductsService.delCompareProductsMethod(categoryObj, window.localStorage['user_id'], '').then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'success') {
                            $scope.getCompareProducts();
                        }
                    })
                }
            } else {
                $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))

            }

        }
 $scope.supplierfun = function () {
            window.open('http://hub.shopmytools.com/', '_blank')
            //    window.open('http://192.168.20.21:8000/', '_blank')
        }

          $rootScope.compareDetails =[];

        $scope.compareProductsMethod = function () {
            if ($rootScope.compareProducts.length > 1) {
            window.location.href =DOMAIN_URL+"/compareProducts"
            } else {
                alert('Please add one more Product to Compare')
            }

        }

        if (localStorage.getItem('randomNumber')) {
            $scope.getCartItemsWithoutLogin();
        }


        $scope.searchProductsMore = function (searchKey) {
            localStorage.setItem('searchkey', searchKey);
            window.location.href = DOMAIN_URL+"/searchPage";
        }

        $scope.goToDashboard = function () {

            if (window.localStorage['token']) {
                window.location.href = DOMAIN_URL+"/dashboard";
            }
            else {

                window.location.href = "./login.html";
            }
        }

        $rootScope.hideDiv = function () {
            $rootScope.showHintFlag = !$rootScope.showHintFlag;
        }

        $scope.categoryBasedProducts = function (categoryName) {
            window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
         $scope.categoryURL = document.URL.split("/");
       //  console.log($scope.categoryURL)
         
          localStorage.removeItem('selectedArray')
         if(navigator.userAgent.indexOf("Firefox") != -1 ){
           // alert('1')
           $(".dropdown-menu.multi-level").css("display", "none");
            window.location.reload();
            $location.path("categoryPage");
            // if ($scope.categoryURL[$scope.categoryURL.length - 1] == 'categoryPage') {

            //      $(".dropdown-menu.multi-level").css("display", "none");
            //   window.location.href = DOMAIN_URL+"/categoryPage1";
            //    window.location.reload();
            // } else {
            //     window.location.href = DOMAIN_URL+"/categoryPage";
            //     $(".dropdown-menu.multi-level").css("display", "none");
            //     window.location.reload();
            // }
         }else{
           
           // window.location.reload();
              $location.path("categoryPage");
                $(".dropdown-menu.multi-level").css("display", "none");
            // if ($scope.categoryURL[$scope.categoryURL.length - 1] == 'categoryPage') {
            //      $(".dropdown-menu.multi-level").css("display", "none");
            //   $location.path("categoryPage1");
            // } else {
            //     $location.path("categoryPage");
            //     $(".dropdown-menu.multi-level").css("display", "none");
            // }
         }

        }
 $rootScope.localCartArray = localCartArray;

        $scope.orderArray = [];

        $rootScope.logincategoryBasedProducts = function(categoryName){
             window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
           
         $scope.categoryURL = document.URL.split("/");
            localStorage.removeItem('selectedArray')
            if ($scope.categoryURL[$scope.categoryURL.length-1] == 'categoryPage') {
                 $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"/categoryPage1";
             
            } else {
               
                $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"/categoryPage";
            }
        }

        $scope.categoryHover = function(){
          $(".dropDownToggle").click(function(){
               $(this).parent().removeClass("dropdown dropdown-submenu ng-scope open");
               $(this).parent().addClass("dropdown dropdown-submenu");

          });
            $(".dropdown-menu.multi-level").css("display", "block");
        }

        $scope.categoryHide = function(){
             $(".dropdown-menu.multi-level").css("display", "none");
        }

        $rootScope.getProductDetailsFromCart = function (productObj) {
            window.localStorage['productName'] = productObj.productdescription;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            $location.path('productDetailPage');
        }

       $scope.removeCartItem = function (cartObj) {
           //alert(cartObj)
            if (window.confirm("Are you sure you want to delete product from shopping cart")) {
                if (window.localStorage['user_id']) {

                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], cartObj.productdescription).then(function (data) {

                        // alert(JSON.stringify(data))

                        if (data.data.status == 'product deleted successfully') {

                            $scope.viewCartItems();

                        } else if (data.data.status == 'success') {
                            //alert('1')
                            $scope.viewCartItems();
                        }

                    })
                } else {
                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), cartObj.productdescription).then(function (data) {

                        // alert(JSON.stringify(data))

                        if (data.data.status == 'product deleted successfully') {

                            // $scope.viewCartItems();

                            $scope.getCartItemsWithoutLogin();

                        } else if (data.data.status == 'success') {
                            $scope.getCartItemsWithoutLogin();
                        }

                    })
                }
            }


        }

        $scope.gotoFooterPage = function(page){
            if(page == 'aboutus'){
              $window.scrollTo(0, 0);
               window.location.href = DOMAIN_URL+"/aboutus";
            }else if(page == 'contactus'){
               $window.scrollTo(0, 0);
                   window.location.href = DOMAIN_URL+"/contact";
            }else if(page == 'termofuse'){
              $window.scrollTo(0, 0);
                   window.location.href = DOMAIN_URL+"/termsofuse";
            }else if(page == 'returnpolicy'){
               $window.scrollTo(0, 0);
                  window.location.href = DOMAIN_URL+"/returnpolicy";
            }else if(page == 'privacypolicy'){
               $window.scrollTo(0, 0);
                  window.location.href = DOMAIN_URL+"/privacypolicy";
            }else if(page == 'shipping'){
                $window.scrollTo(0, 0);
                  window.location.href = DOMAIN_URL+"/shipping";
            }else if(page == 'netbanking'){
             $window.scrollTo(0, 0);
                  window.location.href = DOMAIN_URL+"/netbanking";
            }else {
               $window.scrollTo(0, 0);
                 window.location.href = DOMAIN_URL+"/emi";
            }
            
        }


    }]);