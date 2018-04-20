shopMyToolsApp.controller('headerController', ['$scope', '$http', '$location',
    '$rootScope', 'getHeaderService', 'getFooterService', 'getAllCategoriesService',
    'searchProductsService', 'homePageService',
    'compareProductsService', 'addToWishListService',
    'searchProductsService', 'addToCartService', 'viewCartService',
    '$route', '$timeout', 'searchProductsMoreService', '$window', 'deleteCartService','DOMAIN_URL','addCompareProductsService',
    function ($scope, $http, $location, $rootScope, getHeaderService, getFooterService,
        getAllCategoriesService, searchProductsService, homePageService,
        compareProductsService, addToWishListService,
        searchProductsService, addToCartService, viewCartService,
        $route, $timeout, searchProductsMoreService, $window, deleteCartService,DOMAIN_URL,addCompareProductsService) {

        $window.scrollTo(0, 0);
        $scope.user_name = window.localStorage['user_name'];
        $scope.token = window.localStorage['token'];
        $rootScope.cartArray = cartArray;

        $scope.getHeader = function () {
            getHeaderService.headerMethod().then(function (data) {
                // alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.headerArray = data.data.header_data;

                } else {
                    // alert(data.data.status)
                }
            });
        }
        
         $scope.seo = { 
    pageTitle : '', pageDescription : '' 
  }; 

         $scope.coupons=function(){
              //window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/coupons";
              window.location.href = DOMAIN_URL+"#!/coupons";
		}

        $scope.goToWishList = function () {
            if (window.localStorage['token']) {
                // $location.path("wishlist");
                 //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/wishlist";
                window.location.href = DOMAIN_URL+"#!/wishlist";
            } else {
                window.location.href = "./login.html"
            }

        }

        $scope.goToCheckout = function () {

            if (window.localStorage['user_id']) {

                if ($rootScope.cartArray.length != 0) {

                    //  $location.path("checkout");

                    // window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/checkout";

                   window.location.href = DOMAIN_URL+"#!/checkout";
                }

            }

        }

        $rootScope.addToWishList = function (productObj) {

            // alert('1')
            if (window.localStorage['token']) {
                addToWishListService.addToWishListMethod(window.localStorage['user_id'], productObj.upload_name).then(function (data) {



                    if (data.data.status == 'product saved successfully') {
                        $("#addedToWishList").modal('show');
                    } else {
                    }
                })
            } else {
                alert('Please Login to Add To WishList')
            }
        }

         $rootScope.getProductDetails = function (productObj) {
        console.log(productObj)
            window.localStorage['productName'] = productObj.upload_name;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';

            localStorage.setItem('breadCrumb', productObj.upload_category);

            localStorage.setItem('breadCrumb1', productObj.upload_subcategory);

            window.location.href = DOMAIN_URL+"#!/productDetailPage";

        //  $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");

            //  $window.open(DOMAIN_URL+"#!/productDetailPage");


            // $location.path("productDetailPage")

        }

        $scope.getProductDetailsFromCompare = function (productObj) {
            window.localStorage['productName'] = productObj;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';
        //    $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");
            $window.open(DOMAIN_URL+"#!/productDetailPage");
            //  $location.path("productDetailPage")
        }

        $scope.gotoCartPage = function () {
            //alert("1")
        //    window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/viewCart";
            window.location.href = DOMAIN_URL+"#!/viewCart";
        }


       // $scope.getHeader();

        $scope.getFooter = function () {
            getFooterService.footerMethod().then(function (data) {
                // alert(JSON.stringify(data))
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

        $scope.getFooter();

        $scope.getCategories = function () {
            getAllCategoriesService.getCategoriesMethod().then(function (data) {
                if (data.data.status == 'success') {
                    $scope.categoryArray = data.data.categories;
                    // alert(JSON.stringify($scope.categoryArray))
                } else {
                    //  alert(data.data.status)
                }
            })




        }

        $rootScope.test = function (searchKey) {
            if (searchKey.length > 0) {
                localStorage.setItem('searchkey', searchKey);
                $rootScope.showHintFlag = 'false';
                //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/searchPage";
                window.location.href = DOMAIN_URL+"#!/searchPage";
            }

        }

        $scope.getCategories();

         $scope.subCategoryMethod = function (subCategory, categoryName) {
            localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            $scope.categoryURL = document.URL.split("#!/");
           if ($scope.categoryURL[1] == 'categoryPage') {
                $(".dropdown-menu.multi-level").css("display", "none");
               $location.path("categoryPage1");
              // window.location.href = DOMAIN_URL+"#!/categoryPage1";
            } else {
                 $(".dropdown-menu.multi-level").css("display", "none");
                $location.path("categoryPage");
             //  window.location.href = DOMAIN_URL+"#!/categoryPage";
            }
        }

        $scope.loginsubCategoryMethod = function(subCategory, categoryName){
             localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            $scope.categoryURL = document.URL.split("#!/");
           if ($scope.categoryURL[1] == 'categoryPage') {
                $(".dropdown-menu.multi-level").css("display", "none");
              
               window.location.href = DOMAIN_URL+"#!/categoryPage1";
            } else {
                 $(".dropdown-menu.multi-level").css("display", "none");
               
               window.location.href = DOMAIN_URL+"#!/categoryPage";
            }
        }
        $rootScope.showHintFlag = 'false';
        $rootScope.showHint = function (searchKey) {
            //$scope.showHintFlag = 'true';
            //alert(searchKey.length)
            if (searchKey.length >= '3') {
                searchProductsService.searchProductsMethod(searchKey).then(function (data) {
                    //alert(JSON.stringify(data))
                    if (data.data.status == 'success') {
                        $rootScope.searchedProducts = data.data.product_info;
                        $rootScope.recommendedList = data.data.recommended;
                        $rootScope.showHintFlag = 'true';
                    } else if(data.data.status == 'fail') {
                        alert(data.data.data)
                    }
                })
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
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
                        // $rootScope.getCompareProducts('');
                   }
                })
                  }
            }else{
                  $rootScope.compareProductData = [];
                   $rootScope.compareProducts = [];
                localStorage.removeItem('compareProducts');
                // $rootScope.getCompareProducts('');
            }

        }

        $scope.goToLogin = function () {
            // $location.path("login");
            window.location.href = "./login.html";
        }

        $scope.goToAddressBook = function () {
            $location.path("addressBook");
        }

        $scope.goToLogout = function () {
            // $location.path('login')
            window.location.href = "./login.html";
        }

        $scope.goToHome = function () {
          // window.location.href = "./index.html";
            $location.path("/");
        }

        $scope.goToHomeFromLogin = function(){
            window.location.href = "./index.html";
        }



        $rootScope.viewCartItems = function () {

            if (localStorage.getItem('randomNumber')) {

                viewCartService.cartItemsWithLoginMethod(window.localStorage['user_id'], localStorage.getItem('randomNumber')).then(function (data) {

                    //console.log('1'+JSON.stringify(data))

                    if (data.data.status == 'success') {

                        $rootScope.cartArray = data.data.total_item_list;

                        $scope.orderId = data.data.orderid;

                        window.localStorage['orderId'] = $scope.orderId;

                        localStorage.removeItem('randomNumber');

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

                        window.localStorage['orderId'] = $scope.orderId;

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
                //console.log('1'+JSON.stringify(data))
                if (data.data.status == 'success') {
                    $rootScope.cartArray = data.data.item_list;
                    // localStorage.setItem('localCartArray', JSON.stringify(data.data.item_list));
                    $scope.orderId = data.data.orderid;
                    window.localStorage['orderId'] = $scope.orderId;
                } else {
                    //alert(data.data.status);
                }
            })
        }


        $scope.clearCart = function () {

            // alert('1')
            if (window.confirm("Are you sure you want to clear cart? ")) {

                if (window.localStorage['user_id']) {

                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], "all").then(function (data) {

                        // alert(JSON.stringify(data))

                        if (data.data.status == 'all products deleted successfully') {

                            $rootScope.cartArray = [];

                            $scope.viewCartItems();

                        }

                    })

                } else {

                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), "all").then(function (data) {

                        // alert(JSON.stringify(data))

                        if (data.data.status == 'all products deleted successfully') {

                            $rootScope.cartArray = [];

                            // localStorage.removeItem('randomNumber');

                            $scope.getCartItemsWithoutLogin();

                        }

                    })

                }
            }

        }
          $scope.removeCompareItem = function (categoryObj) {

            if ($window.confirm("Are you sure you want to delete this product from comparison?")) {

                $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
            }
        }

        //  $scope.clearCompareProducts = function () {
        //     if ($window.confirm("Are you sure you want to clear all products?")) {
        //         $rootScope.compareProducts = localStorage.getItem('compareProducts');
        //         $rootScope.compareProducts = [];
        //         localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts));
        //     }

        // }

 $scope.supplierfun = function () {
            window.open('http://hub.shopmytools.com/', '_blank')
        }

        $scope.compareProductsMethod = function () {
            //alert("1")

            if ($rootScope.compareProducts.length > 1) {
               // $location.path("compareProducts");
            //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/compareProducts";
            window.location.href =DOMAIN_URL+"#!/compareProducts"
            } else {
                alert('Please add one more Product to Compare')
            }

        }

        if (localStorage.getItem('randomNumber')) {
            $scope.getCartItemsWithoutLogin();
        }


        $scope.searchProductsMore = function (searchKey) {
            localStorage.setItem('searchkey', searchKey);
            console.log(localStorage.getItem('searchkey'))
            // window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/searchPage";

           window.location.href = DOMAIN_URL+"#!/searchPage";
        }

        $scope.goToDashboard = function () {

            if (window.localStorage['token']) {
                //    window.location.href="http://localhost/smtwithpython/SmtSite/index.html#!/dashboard";
                window.location.href = DOMAIN_URL+"#!/dashboard";

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
         $scope.categoryURL = document.URL.split("#!/");
            localStorage.removeItem('selectedArray')
            if ($scope.categoryURL[1] == 'categoryPage') {
                 $(".dropdown-menu.multi-level").css("display", "none");
              $location.path("categoryPage1");
            } else {
                $location.path("categoryPage");
                $(".dropdown-menu.multi-level").css("display", "none");
            }

        }


        $rootScope.logincategoryBasedProducts = function(categoryName){
             window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
           
         $scope.categoryURL = document.URL.split("#!/");
            localStorage.removeItem('selectedArray')
            if ($scope.categoryURL[1] == 'categoryPage') {
                 $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"#!/categoryPage1";
             
            } else {
               
                $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"#!/categoryPage";
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

            //  alert(productObj)

            window.localStorage['productName'] = productObj.productdescription;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';
            // $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");

             $window.open(DOMAIN_URL+"#!/productDetailPage");


            //  $location.path("productDetailPage")

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
               // $location.path("aboutus")
               window.location.href = DOMAIN_URL+"#!/aboutus";
            }else if(page == 'contactus'){
                //  $location.path("contact")
                   window.location.href = DOMAIN_URL+"#!/contact";
            }else if(page == 'termofuse'){
                //  $location.path("termsofuse")
                   window.location.href = DOMAIN_URL+"#!/termsofuse";
            }else if(page == 'returnpolicy'){
                // $location.path("returnpolicy")
                  window.location.href = DOMAIN_URL+"#!/returnpolicy";
            }else if(page == 'privacypolicy'){
                // $location.path("privacypolicy")
                  window.location.href = DOMAIN_URL+"#!/privacypolicy";
            }else if(page == 'shipping'){
                // $location.path("shipping")
                  window.location.href = DOMAIN_URL+"#!/shipping";
            }else if(page == 'netbanking'){
                // $location.path("netbanking")
                  window.location.href = DOMAIN_URL+"#!/netbanking";
            }else {
                // $location.path("emi")
                 window.location.href = DOMAIN_URL+"#!/emi";
            }
            
        }


    }]);