//var app = angular.module("smtApp", []);

shopMyToolsApp.controller('homeController', ['$scope', '$http', '$location',

    '$rootScope', 'getHeaderService', 'getFooterService', 'getAllCategoriesService',

    'searchProductsService', 'homePageService',  'searchProductsService',  

    '$route', '$timeout', 'searchProductsMoreService',

    'logoutService', '$window', 'allOffersService', 'allNewArrivalsService',

    'product_categories_service', 

    'headerSliderService', '$window', 'DOMAIN_URL','$mdSidenav','$log','$interval',

    function ($scope, $http, $location, $rootScope, getHeaderService, getFooterService,

        getAllCategoriesService, searchProductsService, homePageService,

        searchProductsService,  $route,

        $timeout, searchProductsMoreService,

        logoutService, $window, allOffersService, allNewArrivalsService,

        product_categories_service,

        headerSliderService, $window, DOMAIN_URL,$mdSidenav,$log,$interval) {

        $window.scrollTo(0, 0);
        $scope.isReadonly = true;

      

        $scope.firstCarouselImages = ["images/banners/powertex.jpg", "images/banners/sunflower.jpg", "images/banners/bostec.jpg", "images/banners/bosch.jpg", "images/banners/jasic.jpg"];

        $scope.secondCarouselImages = ["images/banners/banner0.png", "images/banners/banner1.jpg", "images/banners/banner2.jpg", "images/banners/banner3.jpg", "images/banners/banner4.png"];

        $rootScope.seo = {
            tags: "Home | Shopmytools.com", keywords: "cheap shipping, next day delivery, tools,shop,toolshop,powertools,electricaltools,electrics,machines,tool,cutters,shipping, shipping cost, shipping prices, shipping services"
            , metadescription: "Shopmytools has built an exclusive platform to profit every tool buyer in diversifying ways. Have you wondered, we merged many major tool brands and 1000’s of varieties of tools at one place which enables you to buy what you really want, that too at affordable prices, attractive offers, and transparency in warranty & service conditions. Shopmytools has stepped to the digital platform with the motto of simplifying tool buying tasks to quite easiest ways. Exclusively, Shopmytools offers Power Bonus and Reward Point benefits for every customer for their every buy. We endeavor to make our customer happy after shopping their tool, which is the biggest satisfaction for us.", metatitle: "Home | Shopmytools.com"
        }
        $rootScope.pagetitle = $rootScope.seo.metatitle;
        $rootScope.metadescription = $rootScope.seo.metadescription;
        $rootScope.keywords = $rootScope.seo.keywords;
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
            if (!$rootScope.collections) {
                $scope.loading = true;
                homePageService.homePageMethod().then(function (data) {
                    $scope.loading = false;
                    if (data.data.status == 'Success') {
                        $rootScope.brandImages = data.data.brdfooter;
                        $rootScope.collections = data.data.collections;
                        $rootScope.topbrands = data.data.topbrands;
                        $rootScope.emergingbrands = data.data.emergingbrands;
                        $rootScope.deals = data.data.deals;
                        $rootScope.dealsCount = $scope.deals.length;
                        $scope.newarrivals = data.data.newarrivalcats;
                       // console.log($scope.newarrivals)
                         $scope.Offers = data.data.offerscats;
                        //  alert("hai"+ $scope.Offers.length)
                        // console.log($scope.Offers)
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
                      // console.log($scope.Offers);
                        $rootScope.offersArray = [];
                        for (i = 0; i < $scope.Offers.length; i++) {
                            $scope.offersObj = $scope.Offers[i];
                            for (j = 0; j < $scope.offersObj.prices.length; j++) {
                                if ($scope.offersObj.prices[j].enduser_price != 0) {
                                    $rootScope.offersArray.push($scope.offersObj)
                                }
                            }
                        }
                     // alert($rootScope.offersArray.length)

                    } else {

                    }
                })
            }else{
                 $scope.loading = false;
            }

        }



   $scope.showIndex = 0;
//   alert( $scope.Offers.length)
        $scope.changeIndex = function(){
         
                 $scope.showIndex = $scope.showIndex+4;
             if($scope.showIndex >= $scope.Offers.length){
                 $scope.showIndex = 0;
            }
            
         
        }

        $scope.showIndexNewArrivals = 0;

         $scope.changeIndexForNewArrivals = function(){
         
                 $scope.showIndexNewArrivals = $scope.showIndexNewArrivals+4;
             if($scope.showIndexNewArrivals >= $scope.newarrivals.length){
                 $scope.showIndexNewArrivals = 0;
            }
            
         
        }

           $interval(function () {
       $scope.changeIndex();
    }, 25000);

     $interval(function () {
       $scope.changeIndexForNewArrivals();
    }, 20000);







        $scope.gotomoredeal = function () {
            $location.path("deals")
        }
        $scope.coupons = function () {

            $location.path("coupons")
        }


        // $scope.subCategoryMethod = function (subCategory, categoryName) {
        //     localStorage.removeItem('selectedArray');
        //     window.localStorage['categoryName'] = "";
        //     window.localStorage['subCategoryName'] = "";
        //     window.localStorage['categoryName'] = categoryName;
        //     window.localStorage['subCategoryName'] = subCategory;
        //     $scope.categoryURL = document.URL.split("#!/");
        //     if ($scope.categoryURL[1] == 'categoryPage') {
        //         $location.path("categoryPage1");
        //     } else {
        //         $location.path("categoryPage");
        //     }
        // }

        $scope.myInterval = 5000;

        $scope.getOffers = function (categoryObj) {
            $scope.loading = true;
            allOffersService.allOffersMethod(categoryObj).then(function (data) {
                $scope.loading = false;
                // alert(productsdata.avgrating)
                if (data.data.status == 'Success') {
                    if (data.data.offerscats != []) {
                        $scope.Offers = data.data.offerscats;
                        $scope.offersArray = [];
                        for (i = 0; i < $scope.Offers.length; i++) {
                            $scope.offersObj = $scope.Offers[i];
                            for (j = 0; j < $scope.offersObj.prices.length; j++) {
                                if ($scope.offersObj.prices[j].enduser_price != 0) {
                                    $scope.offersArray.push($scope.offersObj)
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
                    $scope.newarrivalsArray = [];
                    for (i = 0; i < $scope.newarrivals.length; i++) {
                        $scope.newarrivalsObj = $scope.newarrivals[i];
                        for (j = 0; j < $scope.newarrivalsObj.prices.length; j++) {
                            if ($scope.newarrivalsObj.prices[j].enduser_price != 0) {
                                $scope.newarrivalsArray.push($scope.newarrivalsObj)
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

        // $scope.categoryBasedProducts = function (categoryName) {
        //     localStorage.removeItem('selectedArray');
        //     window.localStorage['categoryName'] = "";
        //     window.localStorage['categoryName'] = categoryName;
        //     window.localStorage['brandName'] = "";
        //     window.localStorage['subCategoryName'] = "";
        //     $scope.categoryURL = document.URL.split("#!/");
        //     localStorage.removeItem('selectedArray')
        //     if ($scope.categoryURL[1] == 'categoryPage') {
        //         $location.path("categoryPage1");
        //     } else {
        //         $location.path("categoryPage");
        //     }
        // }

  $scope.toggleRight = buildToggler('right');




  $scope.recentlyautocall=function(){

          if(window.localStorage['user_id']){
        $scope.userId = window.localStorage['user_id'];
    }else{
       $scope.userId =""; 
    }
    $scope.status = '';
            searchProductsService.recentlyviewdprodcuts($scope.userId,$scope.status).then(function(data){
                  
                if(data.data.status == 'success'){
                     $scope.prod_info=data.data.prod_info;
                    $scope.prod_infocount=$scope.prod_info.length;
                    if($scope.prod_infocount==1){
                        $scope.recentclass="reecntclass1";
                    }
                    else if($scope.prod_infocount==2){
                        $scope.recentclass="reecntclass2";
                    } 
                    else if($scope.prod_infocount==3){
                        $scope.recentclass="reecntclass3";
                    }
                     else if($scope.prod_infocount==4){
                        $scope.recentclass="reecntclass4";
                    }

                    // alert($scope.prod_infocount)
               
                }else if(data.data.status == 'fail'){
                     $scope.prod_infocount = 0;
                    
                }
               
                // console.log(data.data)

               
            })
  }

    if(window.localStorage['user_id']){
 $scope.recentlyautocall();
    }
        

   function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

           $rootScope.recentlyviewd=false;
           $rootScope.sidenavopen =  false;
           function buildToggler(navID) {
             
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            // console.log("toggle " + navID + " is done");
             if(window.localStorage['user_id']){
        $scope.userId = window.localStorage['user_id'];
    }else{
       $scope.userId =""; 
    }
    $scope.status = '';
            searchProductsService.recentlyviewdprodcuts($scope.userId,$scope.status).then(function(data){
                  
                if(data.data.status == 'success'){
                     $scope.prod_info=data.data.prod_info;
                    $scope.prod_infocount=$scope.prod_info.length;
                    // alert($scope.prod_infocount)
                  $rootScope.recentlyviewd=true;
                   $rootScope.sidenavopen =  true;
                }else if(data.data.status == 'fail'){
                     $scope.prod_infocount = 0;
                      $rootScope.recentlyviewd=false;
                   $rootScope.sidenavopen =  true;
                }
               
                // console.log(data.data)

               
            })
          });
      };
    }

        $scope.close = function () {
            if($rootScope.sidenavopen==true){
               
                  $mdSidenav('right').close().then(function () {
      
        });
                 $rootScope.sidenavopen=false;
                   $rootScope.recentlyviewd=false;
            }else{
             $rootScope.recentlyviewd=false;
              //  $rootScope.sidenavopen=true;
            }
           
      // Component lookup should always be available since we are not using `ng-if`
    
    };

     $scope.gotoviewmore=function(){
        //  alert("hai sruthi")

        $location.path("/recentlyviewd");
     }




        $rootScope.getProductDetails = function (productObj) {
          
            window.localStorage['productName'] = productObj.upload_name;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            window.localStorage['subCategoryName'] = "";
            localStorage.setItem('breadCrumb', productObj.upload_category);
            localStorage.setItem('breadCrumb1', productObj.upload_subcategory);
          
           // location.reload();
             window.location.href = DOMAIN_URL+"/productDetailPage";
           
        }

        $scope.rightClickTab = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            $location.path('productDetailPage');
        }



       

        

        $scope.newTab = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            window.open(document.URL + "productDetailPage", '_blank');
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

        $scope.goToDashboard = function () {
            if (window.localStorage['token']) {
                $location.path("dashboard");
            }
            else {
                window.location.href = "./login.html";
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
            location.reload();

            $location.path("categoryPage");

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
            autoplaySpeed: 5500,
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
        //$scope.getFooter();
        // $scope.getHeader();

        $scope.gotoFooterPage = function (page) {
            if (page == 'aboutus') {
                $location.path("aboutus")
            } else if (page == 'contactus') {
                $location.path("contact")
            } else if (page == 'termofuse') {
                $location.path("termsofuse")
            } else if (page == 'returnpolicy') {
                $location.path("returnpolicy")
            } else if (page == 'privacypolicy') {
                $location.path("privacypolicy")
            } else if (page == 'shipping') {
                $location.path("shipping")
            } else if (page == 'netbanking') {
                $location.path("netbanking")
            } else {
                $location.path("emi")
            }

        }


    }]);





