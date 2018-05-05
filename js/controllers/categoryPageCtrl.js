shopMyToolsApp.controller('productCategoriesCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter',
   '$window', '$filter', 'DOMAIN_URL','Pagination','addCompareProductsService','addToCartService',
  function ($scope, $rootScope, product_categories_service, $location,
     product_subcategories_filter, $window, $filter, DOMAIN_URL,Pagination,addCompareProductsService,addToCartService) {
    $scope.x = "Grid";
    $scope.viewby = "12";
    $scope.sort_by = "popularty";
    $scope.currentPageNumber = 1;
    $scope.fromVal = 0;
    $scope.toVal = 12;
    $window.scrollTo(0, 0);
    $scope.isReadonly = true;
    $scope.showSubCat = 'true';
 $scope.toggleval=true;
  $scope.toggleval2=true;
  $scope.toggleval3=true;

   $rootScope.showHintFlag = 'false';
         $rootScope.showHintMsg = 'false';
  
    $scope.toggleclick=function(){

      if($scope.toggleval==true){
      
       $scope.toggleval=false;
      }
      else{
      
         $scope.toggleval=true;
      }
    }
     $scope.toggleclick2=function(){

      if($scope.toggleval2==true){
       
       $scope.toggleval2=false;
      }
      else{
        
         $scope.toggleval2=true;
      }
    }

     $scope.toggleclick3=function(){

      if($scope.toggleval3==true){
       
       $scope.toggleval3=false;
      }
      else{
        
         $scope.toggleval3=true;
      }
    }



 $rootScope.seo = {pageTitle:'Category Title',pageDescription:' category ghdfhfghfg'}
     //$(".dropdown-menu.multi-level").css("display", "block");

    if (window.localStorage['subCategoryName'] != '') {
      //  $scope.showSubCat = 'false';
      $scope.breadCrumb = window.localStorage['categoryName'];
      $scope.breadCrumb1 = window.localStorage['subCategoryName'];
     // alert($scope.breadCrumb1)
    } else {
      //  $scope.showSubCat = 'true';
      $scope.breadCrumb = window.localStorage['categoryName'];
    }

     $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

        }

$scope.layout = "Grid";

    $scope.selectLayout = function(x){
     // alert(x);
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
        //  alert(JSON.stringify(data))
          // alert('1')
          $scope.categories = data.data.subcat_count;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          // window.localStorage['categories'] = $scope.categories;
          $rootScope.selectedArray = [];
          $scope.brandsData = data.data.brand_count;
         $scope.maxprice=data.data.maxprice;
         $scope.minprice=data.data.minprice;
        //  $scope.pricerange=$scope.minprice +'-' +$scope.maxprice;

        localStorage.setItem('maxprice' ,$scope.maxprice);
        localStorage.setItem('minprice' ,$scope.minprice);
          localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
          localStorage.setItem('subCategories', JSON.stringify($scope.categories))
          $scope.mainminrange = data.data.minprice;
          $scope.mainmaxrange = data.data.maxprice;
        

          $scope.value = data.data.minrange;
          $scope.products = data.data.products;
          // $scope.displayItems = $scope.products.slice(0, 5);
          $rootScope.totalcount = data.data.totalcount;
          // alert($rootScope.totalcount)
          $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;
           $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      //      if($scope.toVal < $rootScope.totalcount){
      //      $scope.pageList = [0];
      //     $scope.pagination = Pagination.getNew($scope.viewby);
      //     $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      // }
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


    $scope.nextBtn = 'true';
    $scope.setpage = function (page) {

      // if ($scope.fromVal = 12) {

      //   $scope.fromVal = 0;
      // }
      // $scope.toVal = page;

    

      // if ($rootScope.selectedArray) {
      //   //  alert(JSON.stringify($rootScope.selectedArray))
      //   if ($rootScope.selectedArray.subcategory.length > 1) {
      //     $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
      //     $scope.currentPageNumber = 1;
      //   }
      //   if ($rootScope.selectedArray.brand.length > 1) {
      //     $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
      //     $scope.currentPageNumber = 1;
      //   }

      //   if ($rootScope.selectedArray.maxrange != '' || $rootScope.selectedArray.maxrange != undefined) {
      //     //  alert('2')
      //     $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
      //   }
      //   if ($rootScope.selectedArray.pricerange != '' || $rootScope.selectedArray.pricerange != undefined && $scope.price != undefined) {
      //     //  alert('1')
      //     $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.pricerange)
      //   }
      // } else {
      //   if ($scope.toVal < $rootScope.totalcount) {
      //     $scope.getProductCategories($scope.fromVal, $scope.toVal);
      //     $scope.nextBtn = 'true';
      //   } else {
      //     $scope.toVal = $rootScope.totalcount;
      //     $scope.getProductCategories($scope.fromVal, $scope.toVal);
      //     $scope.nextBtn = 'false';
      //   }
      // }
      // if ($rootScope.selectedArray1) {
      //   if ($rootScope.selectedArray1.sortdata != '') {

      //     $scope.getCategorywiseProductcheck('sort', $rootScope.selectedArray1.category)
      //   }

      // }
      $scope.currentPageNumber = 1;
        $scope.pageList = [0,1,2,3,4];
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


    $scope.setOrder = function (id, order, reverse) {
      $scope.sorting.id = id;
      $scope.sorting.order = order;
      $scope.sorting.direction = reverse;
    };

    $scope.show_by_list = ["12", "24", "36"];

    $scope.subCatList = [""];
    $scope.brandList = [""];

    // $scope.pricefilter = ['']

    $scope.showBrandFilter = 'true';

    $scope.getCategorywiseProductcheck = function (typeval, subCategory, from,val1) {
    
      $scope.from = from;
     
      $scope.loading = true;
      $scope.nextBtn = 'true';
    
      if (typeval == "cat") {
      
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

          // alert($scope.price)
         
  if(localStorage.getItem('selectedArray')){
   
    $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'))
   
    $scope.pricerange = $scope.selectedArray.pricerange;
  }else{
     $scope.pricerange = '';
  }
      
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {

            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
           
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.products = data.data.products;
            $scope.fromVal = data.data.from;
            $scope.toVal = data.data.to;
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
            $rootScope.totalcount = data.data.totalcount;
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
     
          } else if (data.data.status == 'No data avialbale') {
            $scope.products = [];
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }
          else {
            //alert('Categories not available');
             $scope.products = [];
                $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }

        });
      } else if (typeval == 'sort') {
        // alert('sort')
        if ($rootScope.selectedArray) {
          if ($rootScope.selectedArray.pricerange == '' || $rootScope.selectedArray.pricerange == undefined) {
            $scope.pricerange = $scope.minrange + '-' + $scope.maxrange;
          } else if ($rootScope.selectedArray.pricerange != '') {
            $scope.pricerange = $scope.minrange + '-' + $rootScope.selectedArray.pricerange;
          }
        }
        else {
          //  alert('2sd')
          $scope.pricerange = '';
        }

      
        $scope.categoryName = subCategory;
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          if (data.data) {

            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
           
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.maxrange1 = $rootScope.selectedArray.maxrange;
            $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      
          
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
       
        $scope.maxrange = subCategory;
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

        } else if(subCategory == '') {
          $scope.pricerange = $scope.mainminrange + '-' + $scope.mainmaxrange;
        
        }
        if ($scope.from == 'left') {
          $scope.fromVal = 0;
          $scope.toVal = 12;
          $scope.currentPageNumber = 1;
          $scope.viewby = "12";
        }



        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          //   alert(JSON.stringify(data))
          if (data.data.status == 'Success') {
            //alert()

            $rootScope.selectedArray = data.data.filterdata;
            $rootScope.totalcount = data.data.totalcount;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));

            $scope.minrange = data.data.minprice;
            // $scope.maxrange = data.data.maxprice;
            $scope.maxrange = localStorage.getItem('maxrange');
            // $scope.currentPageNumber = 1;
            // $scope.viewby = "12";

            $scope.maxrange1 = $rootScope.selectedArray.maxrange;
            $scope.products = data.data.products;
            //alert(JSON.stringify($scope.products))
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
    
          }
          else if (data.data.status == 'No data avialbale') {
            // alert('Categories not available');
            $scope.products = [];
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
          }
        });
      }
      else if (typeval == "brand") {
        // alert('brand')
        //alert(subCategory)
        if (typeof (subCategory) == 'object') {
          $scope.brandList = subCategory;
        } else {
          if ($scope.brandList.indexOf(subCategory) >= 1) {
            // var index = $scope.brandList.indexOf(subCategory);
            $scope.brandList.splice($scope.brandList.indexOf(subCategory), 1);
          }
          else {
            // $scope.brandList = [];
            $scope.brandList.push(subCategory);
          }

        }

        if(localStorage.getItem('selectedArray')){
   
    $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'))
   
    $scope.pricerange = $scope.selectedArray.pricerange;
  }else{
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
         

        // if ($rootScope.selectedArray) {
        //   if ($rootScope.selectedArray.pricerange == '' || $rootScope.selectedArray.pricerange == undefined) {
        //     // alert('1')
        //     if ($rootScope.selectedArray.maxrange) {
        //       $scope.pricerange = $rootScope.selectedArray.minrange + '-' + $rootScope.selectedArray.maxrange;
        //     } else {
        //       $scope.pricerange = localStorage.getItem('minrange') + '-' + localStorage.getItem('maxrange');
        //     }

        //   } else if ($rootScope.selectedArray.maxrange != '' || $rootScope.selectedArray.maxrange != undefined) {
        //     //  alert('2')
        //     $scope.pricerange = $rootScope.selectedArray.minrange + '-' + $rootScope.selectedArray.maxrange;
        //   }
        //   else if ($rootScope.selectedArray.pricerange != '') {
        //     // alert('3')
        //     $scope.pricerange = $scope.minrange + '-' + $rootScope.selectedArray.pricerange;
        //   }
        // }
        // else {
        //   // alert('4')
        //   $scope.fromVal = 0;
        //   $scope.toVal = 12;
        //   $scope.currentPageNumber = 1;
        //   $scope.viewby = "12";
        //   $scope.pricerange = '';
        // }


        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {

            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            $rootScope.brandsDataArray = $rootScope.selectedArray.brand;
            // alert(localStorage.getItem('brandsData'))
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.products = data.data.products;
            $rootScope.totalcount = data.data.totalcount;
            $rootScope.brandsData = JSON.parse(localStorage.getItem('brandsData'));
            $rootScope.categories = JSON.parse(localStorage.getItem('subCategories'));
             $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      //      if($scope.toVal < $rootScope.totalcount){
      //      $scope.pageList = [0];
      //     $scope.pagination = Pagination.getNew($scope.viewby);
      //     $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      // }

          } else if (data.data.status == 'No data avialbale') {
            $scope.products = [];
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



    }


    $scope.sortby = function (val123) {
 
         
        //  $scope.viewby = "12";
      
      $scope.sort_by = val123;
      // alert($scope.sort_by)
      //$scope.loading = true;  
       $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
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

      
         // alert($scope.toVal)
      // if($scope.toVal < $rootScope.totalcount){
      //  // alert('1')
      //      $scope.pageList = [0];
      //     $scope.pagination = Pagination.getNew($scope.viewby);
      //     $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      // }
      console.log(JSON.stringify($scope.products))

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

if(localStorage.getItem('selectedArray')){
  $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
 $scope.categoryName = $scope.selectedArray.category;
 $scope.subCatList = $scope.selectedArray.subcategory;
 $scope.brandList = $scope.selectedArray.brand;
 
 $scope.minprice = localStorage.getItem('minprice');
 $scope.maxprice = localStorage.getItem('maxprice');
 if($scope.selectedArray.maxrange){
    $scope.pricerange = $scope.selectedArray.minrange + '-' +$scope.selectedArray.maxrange;
 }else{
$scope.pricerange = $scope.selectedArray.pricerange;
 }
 $scope.getCategorywiseProductcheck('cat',$scope.subCatList);
}else{
    $scope.getProductCategories($scope.fromVal,$scope.toVal);
}

    //alert(localStorage.getItem('selectedArray'))
    // if (localStorage.getItem('selectedArray')) {
    //   $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
    //   // alert($scope.selectedArray.category)
    //   if ($scope.selectedArray.category != '' && $scope.selectedArray.subcategory == '' && $scope.selectedArray.brand == '') {
    //     $scope.getProductCategories($scope.fromVal, $scope.toVal);
    //   }
    //   if ($scope.selectedArray.subcategory != '' && $scope.selectedArray.category != '') {
    //     window.localStorage['categoryName'] = $scope.selectedArray.category;
    //     // alert(window.localStorage['categoryName'])
    //     $scope.getCategorywiseProductcheck('cat', $scope.selectedArray.subcategory)

    //   }
    //   if ($scope.selectedArray.brand != '' && $scope.selectedArray.category != '') {
    //     window.localStorage['categoryName'] = $scope.selectedArray.category;
    //     $scope.getCategorywiseProductcheck('brand', $scope.selectedArray.brand)
    //   }
    //   if ($scope.selectedArray.brand != '' && $scope.selectedArray.category != '' && $scope.selectedArray.subcategory != '') {
    //     window.localStorage['categoryName'] = $scope.selectedArray.category;
    //     $scope.getCategorywiseProductcheck('brand', $scope.selectedArray.brand)
    //     $scope.getCategorywiseProductcheck('cat', $scope.selectedArray.subcategory)
    //   }
    // } else if (window.localStorage['categoryName'] || window.localStorage['subCategoryName']) {
    //  // alert('1')
    //   $scope.getProductCategories($scope.fromVal, $scope.toVal);
    // } else {
    //   $location.path("/");
    // }
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

/*shopMyToolsApp.filter('emptyFilter', function() {
  return function(brandsData) {
    var filteredArray = [];
      angular.forEach(brandsData, function(item) {
        if (item) filteredArray.push(item);
      });
    return filteredArray;  
  };
}*/







