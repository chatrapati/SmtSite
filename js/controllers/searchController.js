
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
       
        $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

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
            // alert(productObj)
            localStorage.setItem('isReviewStatus', isReview);
            window.localStorage['productName'] = productObj.upload_name;
            $rootScope.showHintFlag = 'false';
            $location.path("productDetailPage");
            
        }

        
     $scope.goToHome = function () {
         //alert(1)

     window.location.href = "./index.html";
    }


    }]);

shopMyToolsApp.controller('contactUsCtrl', function ($scope, $window, $location, $rootScope, contactUsService) {


    
    $rootScope.seo={tags:"contactus",keywords:"contact phone number, contact us, call information phone number, customer service, phone number",metadescription:"For any queries on deals and offers for the products ordered through shopmytools.com, contact us by writing email at support@shopmytools.com or call us at 91-40-46161234.", metatitle:"Contact Us - Customer Service | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;



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
                 $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
                  $("#delCompareItem").modal('show');
                  $scope.getCompareProducts($rootScope.compareProducts)
         
            }
           
        }

        

    $scope.closeModal = function () {
        $("#delCompareItem").modal('hide');
 
  $("#addedToCart").modal('hide');
  $("#addedToWishList").modal('hide');
 
    }

});
