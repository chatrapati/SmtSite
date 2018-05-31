shopMyToolsApp.controller('productCategoriesCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter',
  '$window', '$filter', 'DOMAIN_URL', 'Pagination', 'addCompareProductsService', 'addToCartService',
  function ($scope, $rootScope, product_categories_service, $location,
    product_subcategories_filter, $window, $filter, DOMAIN_URL, Pagination, addCompareProductsService, addToCartService) {
    $scope.x = "Grid";
    $scope.viewby = "12";
    $scope.sort_by = "popularty";
    $scope.currentPageNumber = 1;
    $scope.fromVal = 0;
    $scope.toVal = 12;
    $window.scrollTo(0, 0);
    $scope.isReadonly = true;
    $scope.showSubCat = 'true';
    $scope.toggleval = true;
    $scope.toggleval2 = true;
    $scope.toggleval3 = true;
    $scope.toggleval4 = true;
      $scope.toggleval5 = true;
    

    $rootScope.showHintFlag = 'false';
    $rootScope.showHintMsg = 'false';

    $scope.toggleclick = function () {

      if ($scope.toggleval == true) {

        $scope.toggleval = false;
      }
      else {

        $scope.toggleval = true;
      }
    }
    $scope.toggleclick2 = function () {

      if ($scope.toggleval2 == true) {

        $scope.toggleval2 = false;
      }
      else {

        $scope.toggleval2 = true;
      }
    }

    $scope.toggleclick3 = function () {

      if ($scope.toggleval3 == true) {

        $scope.toggleval3 = false;
      }
      else {

        $scope.toggleval3 = true;
      }
    }

    $scope.toggleclick4 = function () {

      if ($scope.toggleval4 == true) {

        $scope.toggleval4 = false;
      }
      else {

        $scope.toggleval4 = true;
      }
    }

     $scope.toggleclick5 = function () {

      if ($scope.toggleval5 == true) {

        $scope.toggleval5 = false;
      }
      else {

        $scope.toggleval5 = true;
      }
    }



    $rootScope.seo = { pageTitle: 'Category Title', pageDescription: ' category ghdfhfghfg' }

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

    $scope.layout = "Grid";

    $scope.selectLayout = function (x) {

      $scope.layout = x;
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
    }


    $scope.getProductCategories = function (fromVal, toVal) {
      $scope.loading = true;
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        $scope.loading = false;
        if (data.data.status == 'Success') {
          if(window.localStorage['subCategoryName']){
            $scope.categories = [];
          }else{
             $scope.categories = data.data.subcat_count;
          }
         
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          $rootScope.selectedArray = [];
          $scope.brandsData = data.data.brand_count;
          $scope.maxprice = data.data.maxprice;
          $scope.minprice = data.data.minprice;
          localStorage.setItem('maxprice', $scope.maxprice);
          localStorage.setItem('minprice', $scope.minprice);
          localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
          localStorage.setItem('subCategories', JSON.stringify($scope.categories))
          $scope.products = data.data.products;
          $rootScope.totalcount = data.data.totalcount;
          $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;
          $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          // location.reload();
          // $location.path('categoryPage')
        } else {
          $scope.products = [];
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
         
        } else {
          $scope.randomNumber = "";
          
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
        
          if (data.data.status == 'item added to cart') {
            $scope.random_no = data.data.random_number;
            localStorage.setItem('randomNumber', $scope.random_no);
            
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
           
              if (data.data.status == 'success') {
                $rootScope.compareProducts = data.data.prod_info;
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                $("#addedToCompareProducts").modal('show');
                $scope.getCompareProducts();
              } else if (data.data.status == 'subcategory not matched') {
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
              if ($rootScope.compareDetails == productObj.upload_subcategory) {
                $rootScope.compareProducts.push(productObj.upload_name);
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                $("#addedToCompareProducts").modal('show');
              } else {
                alert('Compare only same Sub-category');
              }

            }
          }
        }
      }

    }

    $scope.goToHome = function () {
      window.location.href = "./index.html";
    }


    $scope.nextBtn = 'true';
    $scope.setpage = function (page) {
      $scope.currentPageNumber = 1;
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);

    }

    $scope.test1 = function (val) {
      $scope.minrange = 10;
      $scope.maxrange = 1000;
      $scope.maxrange1 = val;

    }

    $scope.pageNavigate = function (breadCrumb) {
      window.localStorage['categoryName'] = breadCrumb;
      window.localStorage['subCategoryName'] = "";
      $scope.breadCrumb1 = '';
      $scope.subCatList = [""];
      $scope.pricerange = '';
      $scope.brandList = [""];
      localStorage.removeItem('selectedArray')
      location.reload();
    }

   



    $rootScope.getProductDetailsCat = function (productObj) {
      window.localStorage['productName'] = productObj.upload_name;
      localStorage.removeItem('isReviewStatus');
      localStorage.setItem('breadCrumb', $scope.breadCrumb);
      localStorage.setItem('breadCrumb1', productObj.upload_subcategory);
      $rootScope.showHintFlag = 'false';
      $location.path('productDetailPage');
    }


    $scope.setOrder = function (id, order, reverse) {
      $scope.sorting.id = id;
      $scope.sorting.order = order;
      $scope.sorting.direction = reverse;
    };

    $scope.show_by_list = ["12", "24", "36"];

    $scope.subCatList = [""];
    $scope.brandList = [""];

 

    $scope.showBrandFilter = 'true';

     

    $scope.getCategorywiseProductcheck = function (typeval, subCategory, from, val1) {
      // alert(typeof(subCategory))
      $scope.from = from;
      $scope.loading = true;
      $scope.nextBtn = 'true';
      if (typeval == "cat") {
       // alert($scope.percent)
       if(window.localStorage['subCategoryName']){
         $scope.brandFlag = "true";
       }else{
         $scope.brandFlag = "false";
       }
        //alert(typeof($scope.brandFlag))
        if (typeof (subCategory) == 'object') {
          $scope.subCatList = subCategory;
        } else {
          if ($scope.subCatList.indexOf(subCategory) >= 1) {
            $scope.subCatList.splice($scope.subCatList.indexOf(subCategory), 1);
          } else {
            $scope.subCatList.push(subCategory);
          }
        }

        if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }

        $scope.fromVal = 0;
        $scope.toVal = 12;
        $scope.currentPageNumber = 1;
        $scope.viewby = "12";


        if (localStorage.getItem('selectedArray')) {
          $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'))
          $scope.pricerange = $scope.selectedArray.pricerange;
        } else {
          $scope.pricerange = '';
        }

        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent,$scope.brandFlag).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {
            if($scope.refreshFlag == true && window.localStorage['subCategoryName']){
            $rootScope.categories = [];             
            }else if($scope.refreshFlag == true && !window.localStorage['subCategoryName']){
              $rootScope.categories = data.data.subcat_count;
               localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
            }
            else{
            
             $rootScope.categories =  JSON.parse(localStorage.getItem('subCategories'))
              localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
            }
            
           $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $scope.products = data.data.products;
            $scope.fromVal = data.data.from;
            $scope.toVal = data.data.to;
            $rootScope.totalcount = data.data.totalcount;
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            
           
          } else if (data.data.status == 'No data avialbale' || data.data.status == 'Products Not avialbale') {
            $scope.products = [];
           
           // $scope.brandsData = data.data.brand_count;
             $rootScope.selectedArray = data.data.filterdata;
             // alert($rootScope.selectedArray.percentage)
             localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
           
              if(window.localStorage['subCategoryName'] && data.data.brand_count){
               $scope.brandsData = data.data.brand_count;
               
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
             localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
            if(window.localStorage['subCategoryName']){
              $rootScope.categories = [];
            }
            else if(!window.localStorage['subCategoryName'] && data.data.subcat_count){
              $rootScope.categories = data.data.subcat_count;
            }else{
              $rootScope.categories =  JSON.parse(localStorage.getItem('subCategories'))
            }
          }
          else {
            $scope.products = [];
            
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }

        });
      } 
      else if (typeval == 'price') {
        if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }

        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }

        if (subCategory.includes('-')) {
          $scope.pricerange = subCategory;
        } else if (subCategory == '') {
          $scope.pricerange = '';

        }
        if ($scope.from == 'left') {
          $scope.fromVal = 0;
          $scope.toVal = 12;
          $scope.currentPageNumber = 1;
          $scope.viewby = "12";
        }

        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
          $scope.loading = false;
         
          if (data.data.status == 'Success') {
             if(window.localStorage['subCategoryName']){
               $rootScope.categories = [];
             }else{
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             }
            
            $rootScope.selectedArray = data.data.filterdata;
            $rootScope.totalcount = data.data.totalcount;
            // $scope.brandsData = data.data.brand_count;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
          
           localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
            //$scope.minrange = data.data.minprice;
            // $scope.maxrange = data.data.maxprice;
         
            $scope.products = data.data.products;
         
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
            if(window.localStorage['subCategoryName'] && data.data.brand_count){
               $scope.brandsData = data.data.brand_count;
                localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
           
          }
          
          else if (data.data.status == 'No data avialbale' || data.data.status == 'Products Not avialbale') {
            $scope.products = [];
             $rootScope.selectedArray = data.data.filterdata;
             if(window.localStorage['subCategoryName']){
                $rootScope.categories = [];
             }else{
              $rootScope.categories = data.data.subcat_count;
             }
             
           
               $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
                localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
           
             localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
           
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }
        });
      }
    else if (typeval == 'percent') {
      if(subCategory ==''){
        $scope.percent = '';
      }else{
         $scope.percent=parseInt(subCategory);
      }
       
        if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }

        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }

        if ($scope.from == 'left') {
          $scope.fromVal = 0;
          $scope.toVal = 12;
          $scope.currentPageNumber = 1;
          $scope.viewby = "12";
        }

        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
          $scope.loading = false;
         
          if (data.data.status == 'Success') {
             $scope.products = data.data.products;
         
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
             if(window.localStorage['subCategoryName']){
               $rootScope.categories = [];
             }else{
              $rootScope.categories = data.data.subcat_count;
             }
            
            $rootScope.selectedArray = data.data.filterdata;
            $rootScope.totalcount = data.data.totalcount;
            // $scope.brandsData = data.data.brand_count;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            // 
           //  console.log(localStorage.getItem('brandsData'))
           localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
            //$scope.minrange = data.data.minprice;
            // $scope.maxrange = data.data.maxprice;
         
           
            if(window.localStorage['subCategoryName'] && data.data.brand_count){
               $scope.brandsData = data.data.brand_count;
                localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
           
          }
          
          else if (data.data.status == 'No data avialbale' || data.data.status == 'Products Not avialbale') {
            $scope.products = [];
             $rootScope.selectedArray = data.data.filterdata;
            //  $rootScope.categories = data.data.subcat_count;
            if(window.localStorage['subCategoryName']){
               $scope.brandsData = data.data.brand_count;
               $rootScope.categories = []
                localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
             localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
           
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }
        });
      }


      else if (typeval == "brand") {
        if (typeof (subCategory) == 'object') {
          $scope.brandList = subCategory;
        } else {
          if ($scope.brandList.indexOf(subCategory) >= 1) {
            $scope.brandList.splice($scope.brandList.indexOf(subCategory), 1);
          }
          else {
            $scope.brandList.push(subCategory);
          }
        }

        if (localStorage.getItem('selectedArray')) {
          $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'))
          $scope.pricerange = $scope.selectedArray.pricerange;
        } else {
          $scope.pricerange = '';
        }
      
if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }
        $scope.fromVal = 0;
        $scope.toVal = 12;
        $scope.currentPageNumber = 1;
        $scope.viewby = "12";



        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {
             $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            if(window.localStorage['subCategoryName']){
              $scope.brandsData = data.data.brand_count;
            }
              localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
          } else if (data.data.status == 'No data avialbale' || data.data.status == 'Products Not avialbale') {
            $scope.products = [];
             $rootScope.selectedArray = data.data.filterdata;
            
            if(window.localStorage['subCategoryName']){
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
               $rootScope.categories = [];
            }else{
               $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
            }
            localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
             localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }
          else {
            // alert('Categories not available');
            $scope.products = [];

          }
        });
      }
 else if (typeval == "warranty") {
       

        if (localStorage.getItem('selectedArray')) {
          $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'))
          $scope.pricerange = $scope.selectedArray.pricerange;
        } else {
          $scope.pricerange = '';
        }
       
if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }
        $scope.fromVal = 0;
        $scope.toVal = 12;
        $scope.currentPageNumber = 1;
        $scope.viewby = "12";
        if(subCategory){
          $scope.warranty = parseInt(subCategory);
        }else{
          $scope.warranty ='';
        }
      

        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {
             $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
            if(!window.localStorage['subCategoryName']){
              $rootScope.categories =JSON.parse(localStorage.getItem('subCategories'));
            }
            
            $rootScope.selectedArray = data.data.filterdata;
            // $scope.brandsData = data.data.brand_count;
            
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
           // $rootScope.brandsDataArray = $rootScope.selectedArray.brand;
            // $scope.minrange = data.data.minprice;
            // $scope.maxrange = data.data.maxprice;
           
             if(window.localStorage['subCategoryName'] && data.data.brand_count){
               $scope.brandsData = data.data.brand_count;
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
              localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
           localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
           
          } else if (data.data.status == 'No data avialbale' || data.data.status == 'Products Not avialbale') {
            $scope.products = [];
             $rootScope.selectedArray = data.data.filterdata;
              $rootScope.categories = data.data.subcat_count;
            // $scope.brandsData = data.data.brand_count;
             localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $scope.pageList = [0, 1, 2, 3, 4];
            $scope.pagination = Pagination.getNew($scope.viewby);
            $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
             if(window.localStorage['subCategoryName'] && data.data.brand_count){
               $scope.brandsData = data.data.brand_count;
            }else{
              $scope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            }
              localStorage.setItem('brandsData',JSON.stringify($scope.brandsData))
           localStorage.setItem('subCategories',JSON.stringify($rootScope.categories))
           
          }
          else {
            // alert('Categories not available');
            $scope.products = [];

          }
        });
      }



    }


    $scope.sortby = function (val123) {
      $scope.sort_by = val123; 
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      $scope.products.forEach(function (element) {
        if ($scope.sort_by == 'price_low_high') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
        }
        else if ($scope.sort_by == 'namefilter') {
          $scope.products = $filter('orderBy')($scope.products, 'upload_name');
        } else if ($scope.sort_by == 'popularty') {
          $scope.products = $filter('orderBy')($scope.products, '-avgrating');
        } else if ($scope.sort_by == 'price_high_low') {
          element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
          $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
        } else if ($scope.sort_by == 'topselling') {
          $scope.products = $filter('orderBy')($scope.products, 'salesqty');
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

    if (localStorage.getItem('selectedArray')) {
      $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
      $scope.categoryName = $scope.selectedArray.category;
      $scope.subCatList = $scope.selectedArray.subcategory;
      $scope.brandList = $scope.selectedArray.brand;
      $scope.percent= $scope.selectedArray.percentage;
      $scope.minprice = localStorage.getItem('minprice');
      $scope.maxprice = localStorage.getItem('maxprice');
      $scope.refreshFlag = true;
      $scope.warranty = $scope.selectedArray.warranty;
      if ($scope.selectedArray.maxrange) {
        $scope.pricerange = $scope.selectedArray.minrange + '-' + $scope.selectedArray.maxrange;
      } else {
        $scope.pricerange = $scope.selectedArray.pricerange;
      }
      $scope.getCategorywiseProductcheck('cat', $scope.subCatList);
    } else {
       $scope.refreshFlag = false;
      $scope.percent= '';
       $scope.warranty = '';
       $scope.pricerange = '';
      $scope.getProductCategories($scope.fromVal, $scope.toVal);
    }

  }
]);


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
      window.location.href = "./index.html";
    }

     $scope.brandchange=function(sub){
      if(sub=='All'&& $rootScope.selectedCategory=='All'){
          $scope.getCategorywiseProductcheck($scope.fromVal,$scope.toVal);
      }else if(sub=='All'){
        $scope.getSubCat($rootScope.selectedCategory);
      }
        else{
      $scope.subCatList=[];
      $scope.brandList=[];
       $scope.pricerange="";
       $scope.warranty="";
       $scope.percent="";
      $scope.subCatList.push(sub);
       $scope.brandList.push(localStorage.getItem('brandName'));
          product_subcategories_filter.getAllCategoriesFilterOfProduct($rootScope.selectedCategory, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
 console.log(data.data);
 if (data.data.status == 'Success') {
          $rootScope.products = data.data.products;
          // $rootScope.catArray= data.data.category;
          $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
        } else if (data.data.status == 'No data avialbale') {
          $rootScope.products = [];
        }
        else {
         // alert('Categories not available');
        }

            }
        )
        }
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
          $rootScope.catArray= data.data.category;
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

    $scope.getSubCat = function(catObj){
$rootScope.selectedCategory=catObj;
      if(catObj=='All'){
$scope.subCategories=[ ];
        $scope.getCategorywiseProductcheck($scope.fromVal,$scope.toVal);
      }
      else{
    //  console.log(catObj)
   // $rootScope.selectedCategory=catObj;
    $scope.subCatList=[""];
      $rootScope.catArray.forEach(function(element){
        if(element.category == catObj){
           $scope.subCategories = element.subcategory;
        }
      })
      //$scope.selectedCat = catObj.category;

       $scope.pricerange="";
         $scope.brandList=[];
       $scope.warranty="";
       $scope.percent="";
      // $scope.subCatList.push();
       $scope.brandList.push(localStorage.getItem('brandName'));

         product_subcategories_filter.getAllCategoriesFilterOfProduct($rootScope.selectedCategory, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by,$scope.warranty,$scope.percent).then(function (data) {
 console.log(data.data);
 if (data.data.status == 'Success') {
          $rootScope.products = data.data.products;
          // $rootScope.catArray= data.data.category;
          $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
        } else if (data.data.status == 'No data avialbale' || data.data.status =='Products Not avialbale') {
          $rootScope.products = [];
        }
        else {
         // alert('Categories not available');
        }

            }
        )



      }
    }


    // $scope.searchCatSubCat = function(searchText){
    //   $rootScope.products.forEach(function(element){
    //      $rootScope.products = $filter('orderBy')($rootScope.products, 'upload_category');
    //   })

    //   console.log($rootScope.products)
    // }

  

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

    $scope.selectLayout = function (x) {
      // alert(x);
      $scope.layout = x;
      $scope.pageList = [0, 1, 2, 3, 4];
      $scope.pagination = Pagination.getNew($scope.viewby);
      $scope.pagination.numPages = Math.ceil($rootScope.products.length / $scope.pagination.perPage);
    }

    $scope.sortby = function (val123) {
   
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











