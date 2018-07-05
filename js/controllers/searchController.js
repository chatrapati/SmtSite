shopMyToolsApp.controller('searchPageController', ['$scope', '$http', '$location', '$rootScope',
    'searchProductsMoreService', '$window','DOMAIN_URL','addCompareProductsService','Pagination',
    function ($scope, $http, $location, $rootScope, searchProductsMoreService, $window,DOMAIN_URL,
        addCompareProductsService,Pagination) {
        console.log(localStorage.getItem('searchkey'))
        $window.scrollTo(0, 0);
        $scope.viewby=12;
 $rootScope.showHintFlag = 'false';
         $rootScope.showHintMsg = 'false';
        //     $rootScope.searchedProducts=window.localStorage['searchedProducts'];
        $scope.getSearchedCat = function () {
            searchProductsMoreService.searchProductsMoreMethod(localStorage.getItem('searchkey')).then(function (data) {
                //alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.searchedMoreProducts = data.data.product_info;
                     $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.searchedMoreProducts.length / $scope.pagination.perPage);
                   //  $rootScope.searchedMoreProducts = [];
                    // for (i = 0; i < $scope.searchedMoreProducts1.length; i++) {
                    //     $scope.searchedMoreProductsObj = $scope.searchedMoreProducts1[i];
                    //     for (j = 0; j < $scope.searchedMoreProductsObj.prices.length; j++) {
                    //         if ($scope.searchedMoreProductsObj.prices[j].doubleoffer_price != 0) {
                    //             $rootScope.searchedMoreProducts.push($scope.searchedMoreProductsObj)
                    //         }
                    //     }
                    // }
                }else if(data.data.status == 'successdata'){
                     $scope.searchedMoreProducts1 = data.data.product_info;
                     $rootScope.searchedMoreProducts = [];
                    for (i = 0; i < $scope.searchedMoreProducts1.length; i++) {
                        $scope.searchedMoreProductsObj = $scope.searchedMoreProducts1[i];
                        for (j = 0; j < $scope.searchedMoreProductsObj.prices.length; j++) {
                            if ($scope.searchedMoreProductsObj.prices[j].doubleoffer_price != 0) {
                                $rootScope.searchedMoreProducts.push($scope.searchedMoreProductsObj)
                            }
                        }
                    }

                     $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($rootScope.searchedMoreProducts.length / $scope.pagination.perPage);
                }

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

        	

        if(localStorage.getItem('searchkey')){
             $scope.getSearchedCat();
        }else{
            $location.path("/")
        }
       

    }]);

shopMyToolsApp.controller('contactUsCtrl', function ($scope, $window, $location, $rootScope, contactUsService) {


    
    $rootScope.seo={tags:"contactus",keywords:"contact phone number, contact us, call information phone number, customer service, phone number",metadescription:"For any queries on deals and offers for the products ordered through shopmytools.com, contact us by writing email at support@shopmytools.com or call us at 91-40-46161234.", metatitle:"Contact Us - Customer Service | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;
    // $scope.email = localStorage.getItem('emailid');
    // $scope.firstname = localStorage.getItem('firstname');
    // $scope.usertype = "12";

    $scope.contactus = {"email":localStorage.getItem('emailid'),"firstname":localStorage.getItem('firstname')};

    $scope.submitContactData = function (contactus) {
        //  alert(JSON.stringify(contactData))
        contactUsService.contactUSMethod(contactus).then(function (data) {
            //alert(JSON.stringify(data))
            if (data.data.status == 'data saved successfully.') {
                $scope.contactus = {};
                alert('Thanks for contacting us.Our team will contact you soon.')
            }
        })

    }



});

shopMyToolsApp.controller('compareProductsCtrl', function ($scope, $window,addToCartService, $location, $rootScope, compareProductsService,addCompareProductsService) {



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

    $rootScope.getCompareProducts = function (compareProducts) {

        if(window.localStorage['user_id']){
            $scope.userId = window.localStorage['user_id']
        }else{
            $scope.userId = "";
        }

 localStorage.setItem('compareProducts',JSON.stringify(compareProducts))
        compareProductsService.compareProductsMethod(compareProducts,$scope.userId).then(function (data) {

            if (data.data.status == 'success') {
                $rootScope.attributeList = [];
                $rootScope.compareProductData = data.data.prod_info;
               // alert(JSON.stringify($rootScope.compareProductData.length))
               // $location.path("compareProducts");
            } else {
                alert(data.data.status);
            }
        })
        
       

    }

    if(localStorage.getItem('compareProducts')){
    $rootScope.compareProducts = [];

    $rootScope.compareProducts = JSON.parse(localStorage.getItem('compareProducts'))
      $rootScope.getCompareProducts($rootScope.compareProducts);
    }else{
        $location.path("/")
    }
  

   $scope.removeCompareItem = function (categoryObj) {
            if(window.localStorage['user_id']){
                 if ($window.confirm("Are you sure you want to delete this product from comparison?")) {
                     $rootScope.removedProduct = categoryObj.upload_name;
                addCompareProductsService.delCompareProductsMethod(categoryObj.upload_name,window.localStorage['user_id'],'').then(function(data){
                  //  alert(JSON.stringify(data))
                   if(data.data.status == 'success'){
                        $("#delCompareItem").modal('show');
                        $rootScope.compareProducts = data.data.prod_info;
                        $scope.getCompareProducts($rootScope.compareProducts);
                   }
                })
                  }
            }else{
                 $rootScope.removedProduct = categoryObj.upload_name;
                 $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                  $("#delCompareItem").modal('show');
                  $scope.getCompareProducts($rootScope.compareProducts)
         
            }
           
        }

        

    $scope.closeModalCompare = function () {
        $("#delCompareItem").modal('hide');
 
  $("#addedToCart").modal('hide');
  $("#addedToWishList").modal('hide');
 
    }

});
