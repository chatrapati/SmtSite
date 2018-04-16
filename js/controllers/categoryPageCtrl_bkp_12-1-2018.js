shopMyToolsApp.controller('productCategoriesCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter',
  function ($scope, $rootScope, product_categories_service, $location, product_subcategories_filter) {
    $scope.x = "Grid";
    $scope.currentPageNumber = 1;
    $scope.fromVal = 0;
    $scope.toVal = 12;
    $scope.getProductCategories = function (fromVal, toVal) {
      
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        if (data.data) {
          $scope.categories = data.data.subcategories;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          window.localStorage['categories'] = $scope.categories;
          $scope.brandsData = data.data.brand_data;
          window.localStorage['brandsData'] = $scope.brandsData;
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.value = data.data.minrange;
          $scope.products = data.data.products;
          $scope.displayItems = $scope.products.slice(0, 5);
          $rootScope.totalcount = data.data.totalcount;
          $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;
        } else {

        }
      })
    }

   

$scope.nextBtn = 'true';
 $scope.setpage = function (page) {
      $scope.toVal = page;
      if($scope.toVal < $rootScope.totalcount){
        $scope.getProductCategories($scope.fromVal, $scope.toVal);
       
      }else{
        $scope.toVal = $rootScope.totalcount;
         $scope.getProductCategories($scope.fromVal, $scope.toVal);
       $scope.nextBtn = 'false';
      }
     
      
    }

    $scope.test1 = function (val) {
      $scope.minrange = 10;
      $scope.maxrange = 1000;
      $scope.maxrange1 = val;

    }



    $scope.getProductDetails = function (productObj) {
      window.localStorage['productName'] = productObj.upload_name;

      $location.path("productDetailPage")
    }


    $scope.setOrder = function (id, order, reverse) {
      $scope.sorting.id = id;
      $scope.sorting.order = order;
      $scope.sorting.direction = reverse;
    };


    $scope.subCatList = [""];
    $scope.brandList = [""];
    $scope.pricerange = $scope.maxrange;
    $scope.getCategorywiseProductcheck = function (typeval, subCategory) {

      $scope.nextBtn = 'true';
      if (typeval == "cat") {
        if (typeof (subCategory) == 'object') {
          $scope.subCatList = subCategory;
        } else {
          if ($scope.subCatList.indexOf(subCategory) >= 1) {
            var index = $scope.subCatList.indexOf(subCategory);
            $scope.subCatList.splice(index, 1);
          } else {
            $scope.subCatList.push(subCategory);
          }
        }
        if(window.localStorage['categoryName'] != ""){
          $scope.categoryName = window.localStorage['categoryName'];
        }else{
          $scope.categoryName = "";
        }
        product_subcategories_filter.getAllCategoriesFilterOfProduct( $scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal).then(function (data) {
          if (data.data) {
            $rootScope.categories = window.localStorage['categories'];
            $rootScope.selectedArray = data.data.filterdata;
            $scope.brandsData = data.data.brand_data;
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
          }
          else {
            alert('Categories not available');
          }

        });
      } else if (typeval == 'price') {
        if(window.localStorage['categoryName'] != ""){
          $scope.categoryName = window.localStorage['categoryName'];
        }else{
          $scope.categoryName = "";
        }
        $scope.pricerange = $scope.minrange + '-' + subCategory;
        product_subcategories_filter.getAllCategoriesFilterOfProduct( $scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal).then(function (data) {
           if (data.data) {
            $rootScope.categories = data.data.subcategory;
            $rootScope.selectedArray = data.data.filterdata;
            $rootScope.brandsData = window.localStorage['brandsData'];
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.maxrange1 = $rootScope.selectedArray.maxrange;
            $scope.products = data.data.products;
          }
          else {
            alert('Categories not available');
          }
        });
      }
      else if (typeval == "brand") {
        //alert(subCategory)
        if (typeof (subCategory) == 'object') {
          $scope.brandList = subCategory;
        } else {
          if ($scope.brandList.indexOf(subCategory) == 1) {
            var index = $scope.brandList.indexOf(subCategory);
            $scope.brandList.splice(index, 1);
          }
          else {
            $scope.brandList = [];
            $scope.brandList.push(subCategory);
          }

        }
        if(window.localStorage['categoryName'] != ""){
          $scope.categoryName = window.localStorage['categoryName'];
        }else{
          $scope.categoryName = "";
        }
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal).then(function (data) {
          if (data.data) {
            $rootScope.categories = data.data.subcategory;
            //alert()
            $rootScope.selectedArray = data.data.filterdata;
            $rootScope.brandsData = $rootScope.selectedArray.brand;
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.products = data.data.products;
          }
          else {
            alert('Categories not available');
          }

        });

      }



    }



    $scope.previousPageMethod = function (fromVal, toVal) {
       var fromVal = JSON.parse(fromVal)-12;
         var toVal = JSON.parse(toVal)-12;
         $scope.nextBtn = 'true';
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        if (data.data) {
          $scope.categories = data.data.subcategories;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          $scope.currentPageNumber = $scope.currentPageNumber - 1;
          window.localStorage['categories'] = $scope.categories;
          $scope.brandsData = data.data.brand_data;
          window.localStorage['brandsData'] = $scope.brandsData;
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.products = data.data.products;
          $scope.totalcount = data.data.totalcount;
          if ($rootScope.selectedArray) {
            if ($rootScope.selectedArray.subcategory != undefined) {
              $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
            }
            if ($rootScope.selectedArray.brand != undefined) {
              $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
            }

            if ($rootScope.selectedArray.maxrange != undefined) {
              $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
            }
          }
          } else {

        }



      });
    }

    $scope.nextPageMethod = function (fromVal, toVal) {
      if($rootScope.totalcount < toVal){
       var fromVal = 0;
       var toVal = $rootScope.totalcount;
       $scope.nextBtn = 'false';
       //alert(fromVal)
      }else{
        var fromVal = JSON.parse(fromVal)+12;
         var toVal = JSON.parse(toVal)+12;
         product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal,toVal).then(function (data) {
       if (data.data) {
          $scope.categories = data.data.subcategories;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          window.localStorage['categories'] = $scope.categories;
          $scope.brandsData = data.data.brand_data;
          window.localStorage['brandsData'] = $scope.brandsData;
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.totalcount = data.data.totalcount;
          $scope.currentPageNumber = $scope.currentPageNumber + 1;
          $scope.products = data.data.products;
          if ($rootScope.selectedArray) {
            if ($rootScope.selectedArray.subcategory != undefined) {

              $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
            }
            if ($rootScope.selectedArray.brand != undefined) {
              $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
            }
            if ($rootScope.selectedArray.maxrange != undefined) {
              $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
            }
          }
        } else {
          //alert('Categories not available');
        }
      });
      }
       
      

    }

    $scope.sortby = function (val123) {
      $scope.val = val123;
      product_subcategories_filter.getAllCategoriesFilterOfProduct(window.localStorage['categoryName'], $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.val).then(function (data) {
        if (data.data) {
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          $rootScope.categories =  window.localStorage['categories'] ;
         // $scope.brandsData = data.data.brand_data;
          window.localStorage['brandsData'] = $scope.brandsData;
          $scope.totalcount = data.data.totalcount;
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.products = data.data.products;
         if ($rootScope.selectedArray) {
            if ($rootScope.selectedArray.subcategory != undefined) {
              $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
            }
            if ($rootScope.selectedArray.brand != undefined) {
              $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
            }

            if ($rootScope.selectedArray.maxrange != undefined) {
              $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
            }
          }          
        } else {
         
        }


      });


    }

if(window.localStorage['brandName'] != ""){
 // alert('1')
  $scope.getCategorywiseProductcheck('brand',window.localStorage['brandName']);
}else{
  //alert('2')
   $scope.getProductCategories($scope.fromVal, $scope.toVal);
}

  }
]);