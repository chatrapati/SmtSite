shopMyToolsApp.controller('productCategoriesCtrl', ['$scope', '$rootScope',
  'product_categories_service', '$location', 'product_subcategories_filter', '$window', '$filter', 'DOMAIN_URL','Pagination',
  function ($scope, $rootScope, product_categories_service, $location, product_subcategories_filter, $window, $filter, DOMAIN_URL,Pagination) {
    $scope.x = "Grid";
    $scope.viewby = "12";
    $scope.sort_by = "popularty";
    $scope.currentPageNumber = 1;
    $scope.fromVal = 0;
    $scope.toVal = 12;
    $window.scrollTo(0, 0);
    $scope.isReadonly = true;
    $scope.showSubCat = 'true';

    if (window.localStorage['subCategoryName'] != '') {
      //  $scope.showSubCat = 'false';
      $scope.breadCrumb = window.localStorage['categoryName'];
      $scope.breadCrumb1 = window.localStorage['subCategoryName'];
     // alert($scope.breadCrumb1)
    } else {
      //  $scope.showSubCat = 'true';
      $scope.breadCrumb = window.localStorage['categoryName'];
    }



    $scope.getProductCategories = function (fromVal, toVal) {
      $scope.loading = true;
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        $scope.loading = false;
        if (data.data) {
        //  alert(JSON.stringify(data))
          // alert('1')
          $scope.categories = data.data.subcategories;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          // window.localStorage['categories'] = $scope.categories;
          $rootScope.selectedArray = [];
          $scope.brandsData = data.data.brand_data;
          // alert($rootScope.brandsData)
          // window.localStorage['brandsData'] = $rootScope.brandsData;
          localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
          localStorage.setItem('subCategories', JSON.stringify($scope.categories))
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.totalMinVal = data.data.totalminval;
          $scope.totalMaxVal = data.data.totalmaxval;
          // alert($scope.minrange +"<--->"+$scope.maxrange)
          localStorage.setItem('minrange', $scope.minrange);
          localStorage.setItem('maxrange', $scope.maxrange);

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
        } else {
               $scope.products = [];
        }
      })
    }


    $scope.goToHome = function () {

      $location.path("/")
    }


    $scope.nextBtn = 'true';
    $scope.setpage = function (page) {

      if ($scope.fromVal = 12) {

        $scope.fromVal = 0;
      }
      $scope.toVal = page;

      if ($rootScope.selectedArray) {
        //  alert(JSON.stringify($rootScope.selectedArray))
        if ($rootScope.selectedArray.subcategory.length > 1) {
          $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
          $scope.currentPageNumber = 1;
        }
        if ($rootScope.selectedArray.brand.length > 1) {
          $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
          $scope.currentPageNumber = 1;
        }

        if ($rootScope.selectedArray.maxrange != '' || $rootScope.selectedArray.maxrange != undefined) {
          //  alert('2')
          $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
        }
        if ($rootScope.selectedArray.pricerange != '' || $rootScope.selectedArray.pricerange != undefined && $scope.price != undefined) {
          //  alert('1')
          $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.pricerange)
        }
      } else {
        if ($scope.toVal < $rootScope.totalcount) {
          $scope.getProductCategories($scope.fromVal, $scope.toVal);
          $scope.nextBtn = 'true';
        } else {
          $scope.toVal = $rootScope.totalcount;
          $scope.getProductCategories($scope.fromVal, $scope.toVal);
          $scope.nextBtn = 'false';
        }
      }
      if ($rootScope.selectedArray1) {
        if ($rootScope.selectedArray1.sortdata != '') {

          $scope.getCategorywiseProductcheck('sort', $rootScope.selectedArray1.category)
        }

      }
      $scope.currentPageNumber = 1;

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

    $scope.getCategorywiseProductcheck = function (typeval, subCategory, from) {
      $scope.from = from;
      //alert(subCategory)
      // alert('1'+$scope.subCatList)
      $scope.loading = true;
      $scope.nextBtn = 'true';
      //  $scope.fromVal = 0;
      //       $scope.toVal = 12;
      if (typeval == "cat") {
        //alert('cat')
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
        if (localStorage.getItem('selectedArray')) {
          if (localStorage.getItem('selectedArray').pricerange == '' || localStorage.getItem('selectedArray').pricerange == undefined) {
            //  alert('1')
            if (localStorage.getItem('selectedArray').maxrange) {
              $scope.pricerange = localStorage.getItem('selectedArray').minrange + '-' + localStorage.getItem('selectedArray').maxrange;
            } else {
              $scope.pricerange = '';
            }

          } else if (localStorage.getItem('selectedArray').maxrange != '' || localStorage.getItem('selectedArray').maxrange != undefined) {
            //  alert('2')
            $scope.pricerange = localStorage.getItem('selectedArray').minrange + '-' + localStorage.getItem('selectedArray').maxrange;
          }
          else if (localStorage.getItem('selectedArray').pricerange != '') {
            //  alert('3')
            $scope.pricerange = $scope.minrange + '-' + localStorage.getItem('selectedArray').pricerange;
          }
        }
        else {

          //  alert('4')
          $scope.fromVal = 0;
          $scope.toVal = 12;
          $scope.currentPageNumber = 1;
          $scope.viewby = "12";
          $scope.pricerange = '';
        }

        if ($scope.price != undefined) {
          $scope.pricerange = $scope.price
        }

        // alert($scope.toVal)
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {

            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            // if ($scope.subCatList.length == 1) {

            //   $scope.getProductCategories($scope.fromVal, $scope.viewby);
            // }

            //  $scope.currentPageNumber = 1;
            // $scope.viewby = "12";
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
          }
          else {
            alert('Categories not available');
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

        // if($rootScope.selectedArray1){

        // }

        $scope.categoryName = subCategory;
        product_subcategories_filter.getAllCategoriesFilterOfProduct($scope.categoryName, $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
          $scope.loading = false;
          if (data.data) {

            $rootScope.selectedArray = data.data.filterdata;
            localStorage.setItem('selectedArray', JSON.stringify($rootScope.selectedArray));
            // alert(localStorage.getItem('brandsData'))

            //  $scope.currentPageNumber = 1;
            // $scope.viewby = "12";
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
            console.log(JSON.stringify($scope.products))
          }
          else {
            alert('Categories not available');
          }
        });
      }
      else if (typeval == 'price') {
        // alert('prce')
        // alert($scope.testMsg)
        // console.log(subCategory)
        $scope.maxrange = subCategory;
        if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }

        if (window.localStorage['subCategoryName']) {
          $scope.subCatList.push(window.localStorage['subCategoryName'])
        }
        // $scope.pricerange = $scope.minrange + '-' + $scope.maxrange;
        if (subCategory.includes('-')) {
          $scope.pricerange = subCategory;

        } else {
          $scope.pricerange = $scope.minrange + '-' + $scope.maxrange;
          //  $scope.fromVal = 0;
          // $scope.toVal = 12;
          //  $scope.currentPageNumber = 1;
          // $scope.viewby = "12";
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
        if (window.localStorage['categoryName'] != "") {
          $scope.categoryName = window.localStorage['categoryName'];
        } else {
          $scope.categoryName = "";
        }
        if ($rootScope.selectedArray) {
          if ($rootScope.selectedArray.pricerange == '' || $rootScope.selectedArray.pricerange == undefined) {
            // alert('1')
            if ($rootScope.selectedArray.maxrange) {
              $scope.pricerange = $rootScope.selectedArray.minrange + '-' + $rootScope.selectedArray.maxrange;
            } else {
              $scope.pricerange = localStorage.getItem('minrange') + '-' + localStorage.getItem('maxrange');
            }

          } else if ($rootScope.selectedArray.maxrange != '' || $rootScope.selectedArray.maxrange != undefined) {
            //  alert('2')
            $scope.pricerange = $rootScope.selectedArray.minrange + '-' + $rootScope.selectedArray.maxrange;
          }
          else if ($rootScope.selectedArray.pricerange != '') {
            // alert('3')
            $scope.pricerange = $scope.minrange + '-' + $rootScope.selectedArray.pricerange;
          }
        }
        else {
          // alert('4')
          $scope.fromVal = 0;
          $scope.toVal = 12;
          $scope.currentPageNumber = 1;
          $scope.viewby = "12";
          $scope.pricerange = '';
        }


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

          } else if (data.data.status == 'No data avialbale') {
            $scope.products = [];
          }
          else {
           // alert('Categories not available');
                $scope.products = [];

          }

        });

      }



    }



    $scope.previousPageMethod = function (fromVal, toVal, viewby) {
      var fromVal = JSON.parse(fromVal) - JSON.parse(viewby);
      //  alert(fromVal)
      var toVal = JSON.parse(toVal) - JSON.parse(viewby);
      $scope.nextBtn = 'true';
      $scope.loading = true;
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        $scope.loading = false;
        if (data.data) {
          $scope.categories = data.data.subcategories;
          $scope.fromVal = data.data.from;
          $scope.toVal = data.data.to;
          $scope.currentPageNumber = $scope.currentPageNumber - 1;
          //   window.localStorage['categories'] = $scope.categories;
          $scope.brandsData = data.data.brand_data;
          localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
          localStorage.setItem('subCategories', JSON.stringify($scope.categories))
          // window.localStorage['brandsData'] = $scope.brandsData;
          $scope.minrange = data.data.minprice;
          $scope.maxrange = data.data.maxprice;
          $scope.products = data.data.products;
          console.log($scope.products)
          $scope.totalcount = data.data.totalcount;
          $scope.products.forEach(function (element) {
            // alert(element)
            if ($scope.sort_by == 'price_low_high') {
              element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
              $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
            }
            else if ($scope.sort_by == 'namefilter') {
              $scope.products = $filter('orderBy')($scope.products, 'upload_name');
            } else if ($scope.sort_by == 'popularty') {
              $scope.products = $filter('orderBy')($scope.products, 'avgrating');
            } else if ($scope.sort_by == 'price_high_low') {
              element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
              $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
            } else if ($scope.sort_by == 'topselling') {
              $scope.products = $filter('orderBy')($scope.products, 'salesqty');
            }
          })
          if ($scope.price != undefined) {
            $scope.getCategorywiseProductcheck('price', $scope.price)
          }
          // alert($scope.price)
          if ($rootScope.selectedArray) {
            if ($rootScope.selectedArray.subcategory != '') {
              $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
            }
            if ($rootScope.selectedArray.brand != '') {
              $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
            }

            if ($rootScope.selectedArray.maxrange != '' && $scope.price != undefined) {
              $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
            }

            if ($rootScope.selectedArray.pricerange != '' && $rootScope.selectedArray.pricerange != undefined && $scope.price != undefined) {
              $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.pricerange)
            }

          }
        } else {

        }



      });
    }

    $scope.nextPageMethod = function (fromVal, toVal, viewby) {

      // alert("hai"+toVal);
      //alert($rootScope.totalcount);
      $scope.loading = true;
      if ($rootScope.totalcount < toVal) {
        //  alert($rootScope.totalcount);
        var fromVal = 0;
        var toVal = $rootScope.totalcount;
        $scope.nextBtn = 'false';
        $scope.loading = false;
      } else {
        var fromVal = JSON.parse(fromVal) + JSON.parse(viewby);
        var toVal = JSON.parse(toVal) + JSON.parse(viewby);
        // alert(toVal)
        product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
          $scope.loading = false;
          if (data.data.status == 'Success') {
            $scope.categories = data.data.subcategories;
            $scope.fromVal = data.data.from;
            $scope.toVal = data.data.to;
            //alert( $scope.toVal )
            //  window.localStorage['categories'] = $scope.categories;
            $scope.brandsData = data.data.brand_data;
            localStorage.setItem('brandsData', JSON.stringify($scope.brandsData))
            localStorage.setItem('subCategories', JSON.stringify($scope.categories))
            // window.localStorage['brandsData'] = $scope.brandsData;
            $scope.minrange = data.data.minprice;
            $scope.maxrange = data.data.maxprice;
            $scope.totalcount = data.data.totalcount;
            $scope.currentPageNumber = $scope.currentPageNumber + 1;
            $scope.products = data.data.products;
            //alert($scope.price)

            // alert(JSON.stringify($rootScope.selectedArray1))
            $scope.products.forEach(function (element) {
              // alert(element)

              //alert($scope.price)
              if ($scope.sort_by == 'price_low_high') {
                element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
                $scope.products = $filter('orderBy')($scope.products, 'prices[0].offer_price');
              }
              else if ($scope.sort_by == 'namefilter') {
                $scope.products = $filter('orderBy')($scope.products, 'upload_name');
              } else if ($scope.sort_by == 'popularty') {
                $scope.products = $filter('orderBy')($scope.products, 'avgrating');
              } else if ($scope.sort_by == 'price_high_low') {
                element.prices[0].offer_price = parseInt(element.prices[0].offer_price);
                $scope.products = $filter('orderBy')($scope.products, '-prices[0].offer_price');
              } else if ($scope.sort_by == 'topselling') {
                $scope.products = $filter('orderBy')($scope.products, 'salesqty');
              }
            })

            // if($scope.price != undefined){
            //  // alert('6')
            //    $scope.getCategorywiseProductcheck('price', $scope.price)
            //    $scope.testMsg = 'true';
            // }
            if ($rootScope.selectedArray) {
              // alert('1')
              if ($rootScope.selectedArray.subcategory != '') {
                //  alert('2')
                $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory, 'method')
              }
              if ($rootScope.selectedArray.brand != '') {
                // alert('3')
                $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand, 'method')
              }
              if ($scope.price != undefined) {
                $scope.testMsg = 'true';
                $scope.getCategorywiseProductcheck('price', $scope.price, 'method')
              }
              // if ($scope.price != undefined && $rootScope.selectedArray.maxrange != '') {
              //  // alert('4')
              //   $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
              // }
              // if ($rootScope.selectedArray.pricerange != '' && $rootScope.selectedArray.pricerange != undefined && $scope.price != undefined) {
              // //  alert('5')
              //   $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.pricerange)
              // }
            }

          } else if (data.data.status == 'No data avialbale') {
            $scope.products = [];
            //  $scope.nextBtn = 'false';
          }
          else {
            //alert('Categories not available');
          }
        });
      }



    }

    $scope.sortby = function (val123) {
      $scope.sort_by = val123;
      // alert($scope.sort_by)
      //$scope.loading = true;  
      $scope.products.forEach(function (element) {
        // alert(element)
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

       $scope.pageList = [0, 1, 2, 3, 4];
          $scope.pagination = Pagination.getNew($scope.viewby);
          $scope.pagination.numPages = Math.ceil($scope.products.length / $scope.pagination.perPage);
      // $scope.products = $filter('orderBy')($scope.products,'prices[0].offer_price' );
      console.log(JSON.stringify($scope.products))
      // product_subcategories_filter.getAllCategoriesFilterOfProduct(window.localStorage['categoryName'], $scope.subCatList, $scope.brandList, $scope.pricerange, $scope.fromVal, $scope.toVal, $scope.sort_by).then(function (data) {
      //   $scope.loading = false;
      //   if (data.data) {
      //     $scope.fromVal = data.data.from;
      //     $scope.toVal = data.data.to;
      //     $rootScope.categories = data.data.subcategory;
      //    // $scope.brandsData = data.data.brand_data;
      //    $rootScope.brandsData =  localStorage.getItem('brandsData')
      //    // window.localStorage['brandsData'] = $scope.brandsData;
      //     $scope.totalcount = data.data.totalcount;
      //     $scope.minrange = data.data.minprice;
      //     $scope.maxrange = data.data.maxprice;
      //     $scope.products = data.data.products;
      //     $rootScope.selectedArray1=data.data.filterdata;

      //    // alert(JSON.stringify($rootScope.selectedArray1))
      //     // alert('1')
      //     if ($rootScope.selectedArray) {
      //       // alert('2')
      //       if ($rootScope.selectedArray.subcategory != '') {
      //         //alert(hai)
      //         $scope.getCategorywiseProductcheck('cat', $rootScope.selectedArray.subcategory)
      //         // alert(hai)
      //       }
      //       if ($rootScope.selectedArray.brand != '' && $rootScope.selectedArray.subcategory != '' && $rootScope.selectedArray.category != '') {
      //         //	 alert(hai1)
      //         $scope.getCategorywiseProductcheck('brand', $rootScope.selectedArray.brand)
      //       }

      //       if ($rootScope.selectedArray.pricerange != undefined && $rootScope.selectedArray.pricerange != '') {
      //         //  alert('1'+$rootScope.selectedArray.pricerange)
      //         $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.pricerange)
      //       } else if ($rootScope.selectedArray.maxrange != '') {
      //         // alert('2'+$rootScope.selectedArray.maxrange)
      //         $scope.getCategorywiseProductcheck('price', $rootScope.selectedArray.maxrange)
      //       }
      //     }
      //   } else {

      //   }


      // });


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



    //alert(localStorage.getItem('selectedArray'))
    if (localStorage.getItem('selectedArray')) {
      $scope.selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
      // alert($scope.selectedArray.category)
      if ($scope.selectedArray.category != '' && $scope.selectedArray.subcategory == '' && $scope.selectedArray.brand == '') {
        $scope.getProductCategories($scope.fromVal, $scope.toVal);
      }
      if ($scope.selectedArray.subcategory != '' && $scope.selectedArray.category != '') {
        window.localStorage['categoryName'] = $scope.selectedArray.category;
        // alert(window.localStorage['categoryName'])
        $scope.getCategorywiseProductcheck('cat', $scope.selectedArray.subcategory)

      }
      if ($scope.selectedArray.brand != '' && $scope.selectedArray.category != '') {
        window.localStorage['categoryName'] = $scope.selectedArray.category;
        $scope.getCategorywiseProductcheck('brand', $scope.selectedArray.brand)
      }
      if ($scope.selectedArray.brand != '' && $scope.selectedArray.category != '' && $scope.selectedArray.subcategory != '') {
        window.localStorage['categoryName'] = $scope.selectedArray.category;
        $scope.getCategorywiseProductcheck('brand', $scope.selectedArray.brand)
        $scope.getCategorywiseProductcheck('cat', $scope.selectedArray.subcategory)
      }
    } else if (window.localStorage['categoryName'] || window.localStorage['subCategoryName']) {
     // alert('1')
      $scope.getProductCategories($scope.fromVal, $scope.toVal);
    } else {
      $location.path("/");
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
      $location.path("/")
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







