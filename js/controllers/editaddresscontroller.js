shopMyToolsApp.controller('editaddresscontroller', ['$scope', '$http', '$location', '$rootScope',

    'getpayuDetailsService', 'viewCartService', 'getDealersListService', '$window', '$filter',

    'saveOrderService', 'getPincodeStatusService', 'getCouponService', 'DOMAIN_URL','editaddressservice',

    function ($scope, $http, $location, $rootScope, getpayuDetailsService,

        viewCartService, getDealersListService, $window, $filter, saveOrderService, getPincodeStatusService, getCouponService, DOMAIN_URL,editaddressservice) {


        $scope.checkoutData = JSON.parse(localStorage.getItem('shippingAddressInfo'));
        // console.log($scope.checkoutData)

        $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));

           $scope.pageNavigate = function () {
            $location.path("dashboard");
        }

      $scope.sameaddress=function(checkoutData){
        //   alert("hai");
          console.log(checkoutData.remember);
          if(checkoutData.remember==true){
           $scope.billingAddress=checkoutData;
          }
        else{
                $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));
        }
          //  localStorage.setItem('billingAddressInfo',JSON.stringify(checkoutData));
      }


        if (window.localStorage['user_id']) {
            $scope.userId = window.localStorage['user_id'];
             

               $scope.saveBillingAddress = function (shipping,billing) {
                //    alert("hai")
                localStorage.setItem('shippingAddressInfo',JSON.stringify(shipping));
                 localStorage.setItem('billingAddressInfo',JSON.stringify(billing));


                   editaddressservice.editaddress($scope.userId,shipping,billing).then(function(data){
                    //    console.log(data.data)
                    if(data.data.status="updated successfully"){
                        alert("Address Updated Successfully")
                   window.location.href = "#!/dashboard";
                    }

                   })

        }
        } 

     





    }])

