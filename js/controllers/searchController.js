
shopMyToolsApp.controller('searchPageController', ['$scope', '$http', '$location', '$rootScope',
    'searchProductsMoreService', '$window','DOMAIN_URL',
    function ($scope, $http, $location, $rootScope, searchProductsMoreService, $window,DOMAIN_URL) {
        console.log(localStorage.getItem('searchkey'))
        $window.scrollTo(0, 0);

        //     $rootScope.searchedProducts=window.localStorage['searchedProducts'];
        $scope.getSearchedCat = function () {
            searchProductsMoreService.searchProductsMoreMethod(localStorage.getItem('searchkey')).then(function (data) {
                //alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.searchedMoreProducts = data.data.product_info;
                }

            })
        }
        if(localStorage.getItem('searchkey')){
             $scope.getSearchedCat();
        }else{
            $location.path("/")
        }
       

       $rootScope.getProductDetails = function (productObj) {

            window.localStorage['productName'] = productObj.upload_name;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';
           // $window.open("http://localhost/newSMTsite/index.html#!/productDetailPage");
			
           // $window.open("http://toolsomg.com/#!/productDetailPage");
            
            //  $window.open(DOMAIN_URL+"#!/productDetailPage");
              $location.path('productDetailPage');


          //  $location.path("productDetailPage")

        }

        $rootScope.productReview = function (productObj, isReview) {
            localStorage.setItem('isReviewStatus', isReview);
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            $location.path("productDetailPage");
            
        }

        
     $scope.goToHome = function () {
         //alert(1)

      $location.path("/")
    }


    }]);

shopMyToolsApp.controller('contactUsCtrl', function ($scope, $window, $location, $rootScope, contactUsService) {

    $scope.contactus = {"email":localStorage.getItem('userEmail')};

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

shopMyToolsApp.controller('compareProductsCtrl', function ($scope, $window, $location, $rootScope, compareProductsService,addCompareProductsService) {



    

    $scope.getCompareProducts = function (compareProducts) {

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
      $scope.getCompareProducts($rootScope.compareProducts);
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
                 $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                  $("#delCompareItem").modal('show');
                  $scope.getCompareProducts($rootScope.compareProducts)
         
            }
           
        }

    $scope.closeModal = function () {
        $("#delCompareItem").modal('hide');
 
    }

});
