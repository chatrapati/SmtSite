shopMyToolsApp.controller('productCategoriesCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter', '$window', '$filter',
   'DOMAIN_URL','Pagination','addToCartService','addCompareProductsService',
  function ($scope, $rootScope, product_categories_service, $location, product_subcategories_filter,
     $window, $filter, DOMAIN_URL,Pagination,addToCartService,addCompareProductsService) {
  $scope.fromVal = 0;
    $scope.toVal = 12;
    $scope.viewby = "12";
    $scope.layout = "Grid";
    $scope.subCatList = [""];
    $scope.brandList = [""];
     $scope.sort_by = "popularty";
      $scope.currentPageNumber = 1;
      $scope.pricerange = '';
       $scope.x = "Grid";
        $window.scrollTo(0, 0);
    $scope.isReadonly = true;
    $scope.showSubCat = 'true';

      if (window.localStorage['subCategoryName'] != '') {
     
      $scope.breadCrumb = window.localStorage['categoryName'];
      $scope.breadCrumb1 = window.localStorage['subCategoryName'];
    
    } else {
     
      $scope.breadCrumb = window.localStorage['categoryName'];
    }

     $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

        }

         $rootScope.showHintFlag = 'false';

       $scope.categoryName = window.localStorage['categoryName'];
$scope.getProductCategories = function (fromVal, toVal) {

     product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
     $scope.categories = data.data.subcat_count;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
            $rootScope.selectedArray = [];
          $scope.brandsData = data.data.brand_data;
           localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
          localStorage.setItem('subCategories', JSON.stringify($scope.categories))
           $scope.products = data.data.products;
        
          $rootScope.totalcount = data.data.totalcount;
         
          $scope.productsprice = $scope.products.prices;
           $scope.products.forEach(function (element) {
       
        // alert(element)
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
          // $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
          // $scope.currentPageNumber = 1;
        }
      })
         
    })
}

//$scope.getProductCategories($scope.fromVal,$scope.toVal);

 $scope.selectLayout = function(x){
  
      $scope.layout = x;
      
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
                            } else if(data.data.status == 'subcategory not matched'){
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

         $scope.goToHome = function () {

      // $location.path("/")
       window.location.href="./index.html";
    }

     $scope.pageNavigate = function (breadCrumb) {
      window.localStorage['categoryName'] = breadCrumb;
      window.localStorage['subCategoryName'] = "";
      $scope.breadCrumb1 = '';
      $scope.getProductCategories($scope.fromVal, $scope.toVal);
    }

     $rootScope.getProductDetailsCat = function (productObj) {

      // alert(JSON.stringify(productObj))

      window.localStorage['productName'] = productObj.upload_name;

      localStorage.removeItem('isReviewStatus');

      localStorage.setItem('breadCrumb', $scope.breadCrumb);

      localStorage.setItem('breadCrumb1', productObj.upload_subcategory);

      $rootScope.showHintFlag = 'false';
        // $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");

      //  $window.open("http://toolsomg.com/#!/productDetailPage");

      // $window.open(DOMAIN_URL + "#!/productDetailPage");
       $location.path('productDetailPage');


      //  $location.path("productDetailPage")

    }

$scope.getCategorywiseProductcheck = function (typeval, subCategory, from) {

    if(typeval == 'cat'){
       // alert(typeof(subCategory))
       if(typeof(subCategory) == 'object'){
           $scope.subCatList = subCategory
       }else{
 if ($scope.subCatList.indexOf(subCategory) >= 1) {
            var index = $scope.subCatList.indexOf(subCategory);
            $scope.subCatList.splice(index, 1);
          } else {
            $scope.subCatList.push(subCategory);
          }
       }
        if(from == 'left'){
            $scope.fromVal = 0;
    $scope.toVal = 12;
     $scope.currentPageNumber = 1;
        }
        
         product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
        // console.log(data.data)
          if(data.data.status=='Success'){
          $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $scope.products = data.data.products;
            $scope.fromVal = data.data.from;
            $scope.toVal = data.data.to;
             $rootScope.totalcount = data.data.totalcount;
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.products.forEach(function (element) {
       
        // alert(element)
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
          // $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
          // $scope.currentPageNumber = 1;
        }
      })
          }
        else if(data.data.status="No data avialbale"){
              $scope.products = [];
        }
        })
         
    }else if(typeval == 'brand'){
        if ($scope.brandList.indexOf(subCategory) >= 1) {
            var index = $scope.brandList.indexOf(subCategory);
            $scope.brandList.splice(index, 1);
          }
          else {
            // $scope.brandList = [];
            $scope.brandList.push(subCategory);
          }
         $scope.pricerange = '';
          product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
           
           if(data.data.status=='Success'){
            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $rootScope.brandsDataArray = $rootScope.selectedArray.brand;
           
            $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.products.forEach(function (element) {
       
        // alert(element)
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
          // $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
          // $scope.currentPageNumber = 1;
        }
      })
           }
        else if(data.data.status="No data avialbale"){
              $scope.products = [];
        }
        })
    }else if(typeval == 'price'){
         if(from == 'left'){
            $scope.fromVal = 0;
    $scope.toVal = 12;
     $scope.currentPageNumber = 1;
        }
        $scope.pricerange = subCategory;
          product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
            if(data.data.status=='Success'){
            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $rootScope.brandsDataArray = $rootScope.selectedArray.brand;
           
            $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.products.forEach(function (element) {
       
        // alert(element)
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
          // $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
          // $scope.currentPageNumber = 1;
        }
      })
          }
            else if(data.data.status="No data avialbale"){
              $scope.products = [];
        }
        
        })
    }
    
}

$scope.previousPageMethod = function (from, to) {
    if($scope.currentPageNumber != 1){
  $scope.fromVal = JSON.parse(from)-JSON.parse($scope.viewby);
        $scope.toVal = JSON.parse(to)-JSON.parse($scope.viewby);
        $scope.currentPageNumber = $scope.currentPageNumber - 1;
        if(localStorage.getItem('selectedArray')){
   
     $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 $scope.pricerange = $scope.selectedArray.pricerange;
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
   
$scope.getProductCategories($scope.fromVal,$scope.toVal);
}
    }
   

}

$scope.nextPageMethod = function(from,to,viewby){
  //alert($scope.viewby)
//   if($scope.viewby == 12){
// $scope.fromVal = JSON.parse(from)+12;
//         $scope.toVal = JSON.parse(to)+12;
//   }else{
      $scope.fromVal = JSON.parse(from)+JSON.parse($scope.viewby);
        $scope.toVal = JSON.parse(to)+JSON.parse($scope.viewby);
//   }
    
 $scope.currentPageNumber = $scope.currentPageNumber + 1;
if(localStorage.getItem('selectedArray')){
   
     $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 $scope.pricerange = $scope.selectedArray.pricerange;
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
   
$scope.getProductCategories($scope.fromVal,$scope.toVal);
}
}


if(localStorage.getItem('selectedArray')){
  $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 $scope.pricerange = $scope.selectedArray.pricerange;
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
    $scope.getProductCategories($scope.fromVal,$scope.toVal);
}

$scope.sortby = function (val123) {
       
      $scope.sort_by = val123;
       $scope.fromVal = 0;
    $scope.toVal = 12;
     $scope.currentPageNumber = 1;
      $scope.products.forEach(function (element) {
       
        // alert(element)
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
          // $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
         //  $scope.currentPageNumber = 1;
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
          // $scope.currentPageNumber = 1;
        }
      })
}

 $scope.setpage = function (page) {
    // alert($rootScope.totalcount)
      $scope.toVal = page;
      if($scope.toVal < $rootScope.totalcount){

       if(localStorage.getItem('selectedArray')){
  $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 $scope.pricerange = $scope.selectedArray.pricerange;
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
    $scope.getProductCategories($scope.fromVal,$scope.toVal);
}
       
      }else{
        $scope.toVal = $rootScope.totalcount;
       if(localStorage.getItem('selectedArray')){
  $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 $scope.pricerange = $scope.selectedArray.pricerange;
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
    $scope.getProductCategories($scope.fromVal,$scope.toVal);
}
       $scope.nextBtn = 'false';
      }
     
      
 }

}])


shopMyToolsApp.controller('brandProductsCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter', '$window', '$filter', 'brandProductsService', 'Pagination',
  function ($scope, $rootScope, product_categories_service, $location, product_subcategories_filter,
    $window, $filter, brandProductsService, Pagination) {
    $scope.brandList = [""]
    $scope.x = "Grid";
    $scope.viewby = "12";
    $scope.sort_by = "popularty";
    $scope.currentPageNumber = 1;
    $scope.fromVal = 0;
    $scope.toVal = 12;
    $window.scrollTo(0, 0);

    if (window.localStorage['brandName']) {
      $scope.brandBreadCrumb = window.localStorage['brandName'];
    }
    $scope.goToHome = function () {
      // $location.path("/")
      window.location.href="./index.html";
    }

     $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

        }

    $scope.getCategorywiseProductcheck = function (fromVal, toVal) {
      $scope.nextBtn = 'true';
      $scope.brandName = localStorage.getItem('brandName');
      $scope.categoryName = "";
      $scope.subCatList = [""]
      brandProductsService.brandProductsMethod($scope.brandName).then(function (data) {
        // alert(JSON.stringify(data))
        if (data.data.status == 'Success') {
          $rootScope.products = data.data.products_info;
          $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
        } else if (data.data.status == 'No data avialbale') {
          $rootScope.products = [];
        }
        else {
          alert('Categories not available');
        }
      });
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

$scope.layout = "Grid";

    $scope.selectLayout = function(x){
     // alert(x);
      $scope.layout = x;
        $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
    }

    $scope.sortby = function (val123) {
      // $scope.fromVal = 0;
      //     $scope.toVal = 12;
      //     $scope.currentPageNumber = 1;
      //     $scope.viewby = "12";
      $scope.sort_by = val123;
      $rootScope.products.forEach(function (element) {
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $rootScope.products = $filter('orderBy')($rootScope.products, 'prices[0].offer_price');
        }
        else if ($scope.sort_by == 'namefilter') {
          $rootScope.products = $filter('orderBy')($rootScope.products, 'upload_name');
        } else if ($scope.sort_by == 'popularty') {
          $rootScope.products = $filter('orderBy')($rootScope.products, '-avgrating');
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $rootScope.products = $filter('orderBy')($rootScope.products, '-prices[0].offer_price');
        } else if ($scope.sort_by == 'topselling') {
          $rootScope.products = $filter('orderBy')($rootScope.products, 'salesqty');
        }
      })
      // alert($scope.viewby)
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
    }

    $scope.setpage = function (page) {
     // alert(page)

    
          $scope.currentPageNumber = 1;
       
      $scope.viewby = page;
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
    }
    if (localStorage.getItem('brandName') != "") {
      $scope.getCategorywiseProductcheck($scope.fromVal, $scope.toVal);
    }
  }])
