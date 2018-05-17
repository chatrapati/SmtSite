shopMyToolsApp.controller('editaddresscontroller', ['$scope', '$http', '$location', '$rootScope',

    'getpayuDetailsService', 'viewCartService', 'getDealersListService', '$window', '$filter',

    'saveOrderService', 'getPincodeStatusService','getCouponService','DOMAIN_URL',

    function ($scope, $http, $location, $rootScope, getpayuDetailsService,

        viewCartService, getDealersListService, $window, $filter, saveOrderService, getPincodeStatusService,getCouponService,DOMAIN_URL) {


            $scope.checkoutData = JSON.parse(localStorage.getItem('shippingAddressInfo'));
     //console.log($scope.shippingAddress)

        $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));

$scope.editaddress=function(){
     
       
    alert("editaddress")
}

 



}])

