//var app = angular.module("smtApp", []);

shopMyToolsApp.controller('homeController', ['$scope', '$http', '$location',

    '$rootScope', 'getHeaderService', 'getFooterService', 'getAllCategoriesService',

    'searchProductsService', 'homePageService',

    'compareProductsService', 'addToWishListService',

    'searchProductsService', 'addToCartService', 'viewCartService',

    '$route', '$timeout', 'searchProductsMoreService',

    'logoutService', '$window', 'allOffersService', 'allNewArrivalsService',

    'product_categories_service', 'deleteCartService', 'inVoiceService',

    'dashBoardOrdersCountService', 'headerSliderService', '$window', 'addCompareProductsService', 'DOMAIN_URL',

    function ($scope, $http, $location, $rootScope, getHeaderService, getFooterService,

        getAllCategoriesService, searchProductsService, homePageService,

        compareProductsService, addToWishListService,

        searchProductsService, addToCartService, viewCartService, $route,

        $timeout, searchProductsMoreService,

        logoutService, $window, allOffersService, allNewArrivalsService,

        product_categories_service, deleteCartService, inVoiceService,

        dashBoardOrdersCountService, headerSliderService, $window, addCompareProductsService, DOMAIN_URL) {

        $window.scrollTo(0, 0);
        $scope.isReadonly = true;
      
        $scope.firstCarouselImages = ["images/banners/powertex.jpg", "images/banners/sunflower.jpg", "images/banners/bostec.jpg", "images/banners/bosch.jpg", "images/banners/jasic.jpg"];

        $scope.secondCarouselImages = ["images/banners/banner0.png", "images/banners/banner1.jpg", "images/banners/banner2.jpg", "images/banners/banner3.jpg","images/banners/banner4.png"];

        if (localStorage.getItem('userInfo')) {
            $scope.user_info = JSON.parse(localStorage.getItem('userInfo'));
        }


        $scope.user_name = window.localStorage['user_name'];
      
        $scope.token = window.localStorage['token'];

        $scope.getHeader = function () {
            getHeaderService.headerMethod().then(function (data) {
                if (data.data.status == 'success') {
                    $scope.headerArray = data.data.header_data;
                } else {
                }
            });
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
                    $location.path("checkout");
                }
            }
        }

        $scope.clearCart = function () {
            if (window.confirm("Are you sure you want to clear cart? ")) {
                if (window.localStorage['user_id']) {
                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], "all").then(function (data) {
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                            $scope.viewCartItems();
                     }
                    })
                } else {
                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), "all").then(function (data) {
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                            $scope.getCartItemsWithoutLogin();
                        }
                    })
                }
            }
        }

        $scope.showShippingAddress = function () {
            $scope.showShippingAddress = 'true';
        }
        $scope.getFooter = function () {
            getFooterService.footerMethod().then(function (data) {
                if (data.data.status == 'success') {
                    $scope.paymentArray = data.data.payment_methods_data;
                    $scope.custServiceArray = data.data.customer_service_data;
                    $scope.shopMyToolsArray = data.data.shopmytools_data;
                    $scope.addressArray = data.data.address;
                } else {
                }
            });
        }

        $scope.homePageDetails = function () {
            $scope.loading = true;
            homePageService.homePageMethod().then(function (data) {
                $scope.loading = false;
                if (data.data.status == 'Success') {
                    $scope.brandImages = data.data.brdfooter;
                    $scope.collections = data.data.collections;
                    $scope.topbrands = data.data.topbrands;
                    $scope.emergingbrands = data.data.emergingbrands;
                    $scope.deals = data.data.deals;
                    $rootScope.dealsCount = $scope.deals.length;
                     $scope.newarrivals = data.data.newarrivalcats;
                    $rootScope.newarrivalsArray = [];
                    for (i = 0; i < $scope.newarrivals.length; i++) {
                        $scope.newarrivalsObj = $scope.newarrivals[i];
                        for (j = 0; j < $scope.newarrivalsObj.prices.length; j++) {
                            if ($scope.newarrivalsObj.prices[j].enduser_price != 0) {
                                $rootScope.newarrivalsArray.push($scope.newarrivalsObj)
                            }
                        }
                    }
                     $scope.Offers = data.data.offerscats;
                        $rootScope.offersArray = [];
                        for (i = 0; i < $scope.Offers.length; i++) {
                            $scope.offersObj = $scope.Offers[i];
                            for (j = 0; j < $scope.offersObj.prices.length; j++) {
                                if ($scope.offersObj.prices[j].enduser_price != 0) {
                                    $rootScope.offersArray.push($scope.offersObj)
                                }
                            }
                        }
                } else {

                }
            })
        }
     


        $scope.gotomoredeal = function () {
            $location.path("deals")
        }
        $scope.coupons = function () {

            $location.path("coupons")
        }


        $rootScope.productReview = function (productObj, isReview) {
            localStorage.setItem('isReviewStatus', isReview);
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            $scope.productDetailedUrl = document.URL.split("#!/");
            if ($scope.productDetailedUrl[1] == 'productDetailPage') {
                window.localStorage['productName'] = productObj.upload_name;
                location.reload();
                $window.scrollTo(0, 0);
                $location.path("productDetailPage");
            } else {
                $location.path("productDetailPage");
            }
        }



        $scope.subCategoryMethod = function (subCategory, categoryName) {
            localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            $scope.categoryURL = document.URL.split("#!/");
            if ($scope.categoryURL[1] == 'categoryPage') {
                $location.path("categoryPage1");
            } else {
                $location.path("categoryPage");
            }
        }

        $scope.myInterval = 5000;

        $scope.getOffers = function (categoryObj) {
            $scope.loading = true;
            allOffersService.allOffersMethod(categoryObj).then(function (data) {
                $scope.loading = false;
                // alert(productsdata.avgrating)
                if (data.data.status == 'Success') {
                    if (data.data.offerscats != []) {
                        $scope.Offers = data.data.offerscats;
                        $rootScope.offersArray = [];
                        for (i = 0; i < $scope.Offers.length; i++) {
                            $scope.offersObj = $scope.Offers[i];
                            for (j = 0; j < $scope.offersObj.prices.length; j++) {
                                if ($scope.offersObj.prices[j].enduser_price != 0) {
                                    $rootScope.offersArray.push($scope.offersObj)
                                }
                            }
                        }
                    } else {
                        $rootScope.offersArray = [];
                    }

                } else {
                    //  alert(data.data.status)
                }
            })
        }

        $scope.getNewArrivals = function (categoryObj) {
            $scope.loading = true;
            allNewArrivalsService.allNewArrivalsMethod(categoryObj).then(function (data) {
                $scope.loading = false;
                if (data.data.status == 'Success') {
                    $scope.newarrivals = data.data.newarrivalcats;
                    $rootScope.newarrivalsArray = [];
                    for (i = 0; i < $scope.newarrivals.length; i++) {
                        $scope.newarrivalsObj = $scope.newarrivals[i];
                        for (j = 0; j < $scope.newarrivalsObj.prices.length; j++) {
                            if ($scope.newarrivalsObj.prices[j].enduser_price != 0) {
                                $rootScope.newarrivalsArray.push($scope.newarrivalsObj)
                            }
                        }
                    }
                } else {
                    //  alert(data.data.status)
                }
            })
        }



      


        $scope.getCategories = function () {
            $scope.loading = true;
            getAllCategoriesService.getCategoriesMethod().then(function (data) {
                $scope.loading = false;
                if (data.data.status == 'success') {
                    $scope.categoryArray = data.data.categories;
                } else {
                }

            })

        }

          $scope.categoryBasedProducts = function (categoryName) {
            localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
            $scope.categoryURL = document.URL.split("#!/");
            localStorage.removeItem('selectedArray')
            if ($scope.categoryURL[1] == 'categoryPage') {
                $location.path("categoryPage1");
            } else {
                $location.path("categoryPage");
            }
        }



        $rootScope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            localStorage.setItem('breadCrumb', productObj.upload_category);
            localStorage.setItem('breadCrumb1', productObj.upload_subcategory);
           $location.path('productDetailPage');
        }

        $scope.rightClickTab = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
             $location.path('productDetailPage');
        }



        $rootScope.getProductDetailsFromCart = function (productObj) {
   window.localStorage['productName'] = productObj.productdescription;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
              $location.path('productDetailPage');
        }

        $scope.getProductDetailsFromCompare = function (productObj) {
            window.localStorage['productName'] = productObj;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
             $location.path('productDetailPage');
            }

        $scope.newTab = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            window.open(document.URL + "productDetailPage", '_blank');
        }

        $scope.goToEdit = function () {
            $location.path("editAccount")
        }

        $scope.goToAddNewAddress = function () {
            $location.path("addAddress")
        }

        $scope.getCategories();

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

        $scope.goToLogin = function () {
            $location.path("login");
        }

        $scope.goToAddressBook = function () {
            $location.path("addressBook");
        }

        $rootScope.showHintFlag = 'false';

        $rootScope.showHint = function (searchKey) {
            if (searchKey.length >= '3') {
                searchProductsService.searchProductsMethod(searchKey).then(function (data) {
                    if (data.data.status == 'success') {
                        $rootScope.searchedProducts = data.data.product_info;
                        $rootScope.recommendedList = data.data.recommended;
                        $rootScope.showHintFlag = 'true';
                    } else if (data.data.status == 'fail') {
                        $rootScope.searchedProducts = [];
                        $rootScope.showHintFlag = 'true';
                    }
                })
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
                $location.path("/")
            }
        }

        $rootScope.test = function (searchKey) {
            if (searchKey.length > 0) {
                localStorage.setItem('searchkey', searchKey);
                $rootScope.showHintFlag = 'false';
                $location.path("searchPage");
                $scope.searchPageURL = document.URL.split("#!/");
                if ($scope.searchPageURL[1] == 'searchPage') {
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

        $rootScope.cartArray = cartArray;
       
        $rootScope.viewCartItems = function () {
            if (localStorage.getItem('randomNumber')) {
                viewCartService.cartItemsWithLoginMethod(window.localStorage['user_id'], localStorage.getItem('randomNumber')).then(function (data) {
                    if (data.data.status == 'success') {
                        $rootScope.cartArray = data.data.total_item_list;
                        $rootScope.amount = data.data.grand_total;
                        localStorage.removeItem('randomNumber');
                    } else if (data.data.status == 'no data available of this user') {
                        $rootScope.cartArray = [];
                    } else {
                        //alert(data.data.status);
                    }
                })
            } else {
                viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {
                    $scope.qtyCountt = 0;
                    if (data.data.status == 'success') {
                        $rootScope.cartArray = data.data.item_list;
                        $rootScope.amount = data.data.grand_total;
                        $scope.qtyCountt = 0;
                        for (var i = 0; i < $rootScope.cartArray.length; i++) {
                            $scope.qtyCount = $rootScope.cartArray[i].qty;
                            $scope.qtyCountt += parseInt($scope.qtyCount);
                            //alert($scope.qtyCount)
                        }
                        $rootScope.quantityshoppingcart = $scope.qtyCountt;
                    } else {
                        //alert(data.data.status);
                    }
                })
            }
        }

        if (window.localStorage['user_id']) {
            $scope.viewCartItems();
        }

        $scope.goToDashboard = function () {
            if (window.localStorage['token']) {
                $location.path("dashboard");
            }
            else {
                window.location.href = "./login.html";
            }
        }

        $rootScope.localCartArray = localCartArray;

        $scope.orderArray = [];

        $scope.getCartItemsWithoutLogin = function () {
            viewCartService.cartItemsWithoutLoginMethod(localStorage.getItem('randomNumber')).then(function (data) {
                if (data.data.status == 'success') {
                  $rootScope.cartArray = data.data.item_list;
                   $scope.orderId = data.data.orderid;
                    window.localStorage['orderId'] = $scope.orderId;
                } else {
               }
            })

        }

        $scope.getCartItemsWithoutLogin();

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
                    } else {
                        alert(data.data.status);
                    }
                    $scope.getCartItemsWithoutLogin();
                })
            }
        }

        $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

        }

        $rootScope.hideDiv = function () {

            $rootScope.showHintFlag = !$rootScope.showHintFlag;

        }

        $scope.searchProducts = function (searchKey) {

            $rootScope.showHint(searchKey)
        }


        $rootScope.compareProducts = compareProducts;

        $scope.getCompareProducts = function () {
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
            }else{
                $rootScope.compareProducts =[];
            }
        }


        $rootScope.addToCompare = function (productObj) {
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
                            } else {

                            }
                        })
                    }
                }

            } else {
                if ($rootScope.compareProducts.length == 0) {
                    $rootScope.compareProducts.push(productObj.upload_name);
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
                            $rootScope.compareProducts.push(productObj.upload_name);
                            localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                            $("#addedToCompareProducts").modal('show');
                        }
                    }
                }
            }

        }

        $scope.supplierfun = function () {
            window.open('http://hub.shopmytools.com/', '_blank')
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

        $scope.clearCompareProducts = function () {
            if (window.localStorage['user_id']) {
                if ($window.confirm("Are you sure you want to clear all products?")) {
                    addCompareProductsService.delCompareProductsMethod(localStorage.getItem('compareProducts'), window.localStorage['user_id'], 'all').then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'success') {
                            // $scope.getCompareProducts();\
                            $rootScope.compareProducts = [];
                            location.reload();
                        }
                    })
                }
            } else {
                $rootScope.compareProducts = localStorage.getItem('compareProducts');
                $rootScope.compareProducts = [];
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts));

            }


        }



        $scope.compareProductsMethod = function () {

            if ($rootScope.compareProducts.length > 1) {
                $location.path("compareProducts");
            } else {
                alert('Please add one more Product to Compare')
            }

        }



        $scope.goToCollections = function () {

            $location.path("collections");
             $scope.loading = true;

        }



        $scope.goToTopBrands = function () {
             $scope.loading = true;

            $location.path("topBrands");

        }



        $scope.gotoDashBoards = function () {

            $location.path("dashboard");

        }



        $scope.goToEmergingBrands = function () {
             $scope.loading = true;

            $location.path("emergingBrands");

        }



        $scope.goToHome = function () {

            window.location.href = "./index.html";

        }



        $rootScope.addToWishList = function (productObj) {

            // alert('1')
            if (window.localStorage['token']) {
                addToWishListService.addToWishListMethod(window.localStorage['user_id'], productObj.upload_name).then(function (data) {



                    if (data.data.status == 'product saved successfully') {



                        $("#addedToWishList").modal('show');

                    } else {

                        alert(data.data.status);

                    }

                })
            } else {

                alert('Please Login to Add To WishList')
            }


        }



        $scope.gotoCartPage = function () {

            $location.path("viewCart")

        }



        $scope.getCategoryBasedOnBrands = function (brandObj) {

            window.localStorage['categoryName'] = "";

            localStorage.setItem('brandName', brandObj.brandname)

            // window.localStorage['brandName'] = brandObj.brandname;

            $location.path("brandPage");

        }



        $scope.gotoCategory = function (categoryObj) {

            window.localStorage['brandName'] = "";

            //alert(window.localStorage['brandName'])
            window.localStorage['categoryName'] = "";

            window.localStorage['categoryName'] = categoryObj.name;

            window.localStorage['subCategoryName'] = "";

            // alert(window.localStorage['categoryName'])

            localStorage.removeItem('selectedArray');

            $location.path("categoryPage");

        }



        $scope.removeCartItem = function (cartObj) {
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



        $scope.gotoMyOrders = function () {

            $location.path("myorders")

        }

        $scope.homesliderfun = function () {
            headerSliderService.slidersfun().then(function (data) {
                //alert(JSON.stringify(data))
                $scope.homesliderimage = data.data.coupons;

                //alert(JSON.stringify($scope.homesliderimage))
            })
        }

        $scope.homesliderfun();


        $scope.slickConfigBrands = {
            enabled: true,
            autoplay: true,
            draggable: false,
            autoplaySpeed: 5000,
            responsive: [
                // {
                //     breakpoint: 1024,
                //     settings: "unslick"
                // },
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 1
					}
				},
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 468,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        };

           $scope.homePageDetails();
            $scope.getFooter();
            $scope.getHeader();

        $scope.gotoFooterPage = function(page){
            if(page == 'aboutus'){
                $location.path("aboutus")
            }else if(page == 'contactus'){
                 $location.path("contact")
            }else if(page == 'termofuse'){
                 $location.path("termsofuse")
            }else if(page == 'returnpolicy'){
                $location.path("returnpolicy")
            }else if(page == 'privacypolicy'){
                $location.path("privacypolicy")
            }else if(page == 'shipping'){
                $location.path("shipping")
            }else if(page == 'netbanking'){
                $location.path("netbanking")
            }else {
                $location.path("emi")
            }
            
        }

       

    }]);





