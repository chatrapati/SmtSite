shopMyToolsApp.controller('checkOutController', ['$scope', '$http', '$location', '$rootScope',

    'getpayuDetailsService', 'viewCartService', 'getDealersListService', '$window', '$filter',

    'saveOrderService', 'getPincodeStatusService','getCouponService','DOMAIN_URL',

    function ($scope, $http, $location, $rootScope, getpayuDetailsService,

        viewCartService, getDealersListService, $window, $filter, saveOrderService, getPincodeStatusService,getCouponService,DOMAIN_URL) {

        $window.scrollTo(0, 0);

        localStorage.removeItem('coupon');
        $scope.couponNotApplicable = 'false';
        $rootScope.couponApplied = 'false';
        $scope.couponShopMsg = 'false';
       
            if(window.localStorage['customermobile'].length == 12){
                $scope.alt_mobile = window.localStorage['customermobile'].slice(2);
            }else{
                $scope.alt_mobile = window.localStorage['customermobile'];
            }
       

       $scope.gstnumber = localStorage.getItem('gstNumber')

           $scope.shippingMethod = function(method){
            if(method == 'Pickup'){
                 $scope.dealersList = [];
            }
           }

        $scope.getCoupon = function (coupon) {
          //  alert(coupon)
                if(coupon == undefined){
                     alert(" Please enter  coupon")
                 }else{
                    if (window.localStorage['token']) {
                if (coupon.charAt(0) == 'B' || coupon.slice(0, 2) == 'SC') {
                    localStorage.setItem('coupon', coupon);
                    $scope.itemList = $rootScope.cartArray;
                    if($rootScope.couponApplied == 'false'){
                    getCouponService.brandBasedCouponMethod(coupon, window.localStorage['user_id'], $scope.itemList).then(function (data) {
                        if (data.data.status == 'cupon applicable') {
                            $scope.couponData = data.data.coupon_details;
                            $rootScope.couponApplied = 'true';
                            $scope.couponNotApplicable = 'false';
                            $rootScope.couponAmt = $scope.couponData.maxvalue;
                             $rootScope.amount1 =  $rootScope.amount-$rootScope.couponAmt;
                           // localStorage.setItem('couponAmt', $rootScope.couponAmt);
                        } else {
                            $scope.couponNotApplicable = 'true';
                            $rootScope.couponApplied = 'false';
                        }
                    })
                }
                }else if(coupon.charAt(0) == 'M'){
                    localStorage.setItem('coupon', coupon);
                     if($rootScope.couponApplied == 'false'){
                     getCouponService.maxPurchasedCouponMethod(coupon, window.localStorage['user_id'], $rootScope.amount).then(function (data) {
                        if (data.data.status == 'cupon applicable') {
                            $scope.couponData = data.data.coupon_details;
                            $rootScope.couponApplied = 'true';
                            $scope.couponNotApplicable = 'false';
                            $rootScope.couponAmt = $scope.couponData.maxvalue;
                             // localStorage.setItem('couponAmt', $rootScope.couponAmt);
                            //  alert(localStorage.getItem('couponAmt'))
                             $rootScope.amount1 =  $rootScope.amount-$rootScope.couponAmt;
                        } else {
                            $scope.couponNotApplicable = 'true';
                            $rootScope.couponApplied = 'false';
                        }
                    })
                     }
                }
                else if (coupon.charAt(0) == 'W') {
                    localStorage.setItem('coupon', coupon);
                    if ($rootScope.couponApplied == 'false') {
                        getCouponService.maxPurchasedCouponMethod(coupon, window.localStorage['user_id'], $rootScope.amount).then(function (data) {
                            if (data.data.status == 'coupon value applicable') {
                                $scope.couponData = data.data.coupon_details;
                                $rootScope.couponApplied = 'true';
                                $scope.couponNotApplicable = 'false';
                                $rootScope.couponAmt = $scope.couponData.maxvalue;
                                // alert($rootScope.couponAmt)
                                // localStorage.setItem('couponAmt', $rootScope.couponAmt);
                                //  alert(localStorage.getItem('couponAmt'))
                                $rootScope.amount1 = $rootScope.amount - $rootScope.couponAmt;
                                // alert($rootScope.amount1)
                            } else {
                                //alert("else")
                                $scope.couponNotApplicable = 'true';
                                $rootScope.couponApplied = 'false';
                            }
                        })
                    }
                }
                else {
                    localStorage.setItem('coupon', coupon);
                     if($scope.couponShopMsg == 'false'){
                    getCouponService.getCouponMethod(coupon, window.localStorage['user_id']).then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'cupon applicable') {
                            $scope.couponData = data.data.coupon_details;
                              $rootScope.couponAmt = $scope.couponData.maxvalue;
                            if ($scope.couponData.shop) {
                                $rootScope.couponShop = $scope.couponData.shop;
                                if($scope.dealerAddress == $rootScope.couponShop ){
                                     $rootScope.amount1 =  $rootScope.amount-$rootScope.couponAmt;
                                }else{
                                    $rootScope.amount =  $rootScope.amount;
                                }
                                localStorage.setItem('couponShop',$rootScope.couponShop);
                                $scope.couponShopMsg = 'true';
                                $rootScope.couponApplied = 'false';
                                $scope.couponNotApplicable = 'false';
                            } else {
                                $rootScope.couponApplied = 'true';
                                $scope.couponNotApplicable = 'false';
                                $scope.couponShopMsg = 'false';
                                 $rootScope.amount1 =  $rootScope.amount-$rootScope.couponAmt;
                            }
                         //   localStorage.setItem('couponAmt', $rootScope.couponAmt);
                        } else {
                            $scope.couponNotApplicable = 'true';
                            $rootScope.couponApplied = 'false';
                            $scope.couponShopMsg = 'false';
                        }
                    })
                     }
                }
            } else {
                alert('Please Login to Continue Checkout')
            }
                 }
           
            
        }


      $scope.getRedeem=function(redamount){
          $rootScope.redeemamount=redamount;
           $rootScope.amount=$rootScope.amount-redamount;
          
      }

            $scope.IsVisible = false;
            
            $scope.showBillingDetails = false;
              $scope.showPaymentDetails = false;
            $scope.orderType = true;
           
        $scope.showShippingDetails = true;
        $scope.showBillingDetails = false;
        $scope.showPaymentDetails = false;
        $scope.showOrderDetails = false;
        $scope.showShippingAddress = false;
        $scope.showSavedShippingAddress = false;
        $scope.showBillingAddress = false;
        $scope.disableShippingbtn = true;
        $scope.disablePaymentbtn = true;

        $scope.nextStepPayment = function (shippingData,gstnumber) {
           
            if(!shippingData.alt_mobile){
                shippingData.alt_mobile = '';
            }

            $scope.showShippingDetails = false;
            if (shippingData == 'Pickup') {

                $scope.shippingType = shippingData;

                $scope.showBillingDetails = false;

                $scope.showPaymentDetails = true;

            } else {

                $scope.shippingType = shippingData.shippingType;

                $scope.shippingAddressData = shippingData;

                if ($scope.shippingType == "Delivery") {

                    if (shippingData.remember == true) {

                        $scope.billingAddressData = shippingData;
                        $scope.billingAddress = shippingData;
                        $scope.showBillingDetails = false;

                        $scope.showPaymentDetails = true;

                    } else {

                        $scope.showBillingDetails = true;

                        $scope.showPaymentDetails = false;

                    }

                } else {

                    $scope.showBillingDetails = true;

                    $scope.showPaymentDetails = false;

                }
            }

           // console.log(JSON.stringify($scope.shippingAddressData))

        }

        $scope.saveBillingAddress = function (billingAddresss) {

            // if ($scope.billindAddressForm.$valid) {

                if (billingAddresss != '' || billingAddresss != undefined) {

                    $scope.showPaymentDetails = true;

                    $scope.showBillingDetails = false;

                     if(!billingAddresss.alt_mobile){
                billingAddresss.alt_mobile = '';
            }

                    $scope.billingAddressData = billingAddresss;

                }

            // }

        }

        $scope.saveDealerAddress = function (dealer) {

            
            $scope.disableShippingbtn = false;

            $scope.dealerAddress = dealer.shop_name;



        }

     $scope.shippingAddress = JSON.parse(localStorage.getItem('shippingAddressInfo'));
     //console.log($scope.shippingAddress)

        $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));

       

        $scope.user_info = JSON.parse(localStorage.getItem('userInfo'));

        if ($scope.shippingAddress != null || $scope.shippingAddress != undefined) {

            $scope.showSavedShippingAddress = true;
           // alert($scope.shippingAddress.alt_mobile)

            $scope.checkoutData = {
                

                "firstname": $scope.shippingAddress.firstname, "lastname": $scope.shippingAddress.lastname,

                "street_address": $scope.shippingAddress.street_address, "house_no": $scope.shippingAddress.house_no,

                "city": $scope.shippingAddress.city, "state": $scope.shippingAddress.state, "alt_mobile": $scope.shippingAddress.alt_mobile,

                "postal_code": $scope.shippingAddress.postal_code, "country": $scope.shippingAddress.country, "mobile": $scope.shippingAddress.mobile

            }

            // alert(JSON.stringify($scope.shippingAddress))
        }

        if ($scope.billingAddress != null || $scope.billingAddress != undefined) {

            $scope.showBillingAddress = true;

            $scope.billingAddress = {

                "firstname": $scope.billingAddress.firstname, "lastname": $scope.billingAddress.lastname,

                "street_address": $scope.billingAddress.street_address, "house_no": $scope.billingAddress.house_no,

                "city": $scope.billingAddress.city, "state": $scope.billingAddress.state, "alt_mobile": $scope.billingAddress.alt_mobile,

                "postal_code": $scope.billingAddress.postal_code, "country": $scope.billingAddress.country, "mobile": $scope.billingAddress.mobile

            }

        }

        $scope.viewCartItems = function () {

            viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {

                if (data.data.status == 'success') {

                    $rootScope.cartArray = data.data.item_list;

                    $scope.taxAmount = 0;

                    $rootScope.cartArray.forEach(function (cartItem) {

                        if (typeof (cartItem.tax_amount) == 'string') {
                            $scope.taxAmount += JSON.parse(cartItem.tax_amount);
                        } else {
                            $scope.taxAmount += cartItem.tax_amount;
                        }

                    })

                    $rootScope.amount = data.data.grand_total;

                     if ($rootScope.couponAmt) {
                         $rootScope.amount = $rootScope.amount-$rootScope.couponAmt;
                     }
                        if( $rootScope.redeemamount){
                          $rootScope.amount= $rootScope.amount- $rootScope.redeemamount;

                        }
                   

                    $scope.orderId = data.data.orderid;

                    window.localStorage['orderId'] = $scope.orderId;

                } else {

                }

            })

        }

         $scope.getCouponText = function(coupon){
                if(coupon.length == 0){
                    $scope.couponNotApplicable = 'false';
        $rootScope.couponApplied = 'false';
        $scope.couponShopMsg = 'false';
        $rootScope.couponAmt = 0;
        $scope.viewCartItems();
                }
            }

        $scope.getPayuDetails = function () {

            getpayuDetailsService.getpayuDetailsMethod().then(function (data) {
                if (data.data.status == 'payu data') {

                    $scope.payuData = data.data.data;

                    $scope.merchant_key = $scope.payuData.merchant_id;

                    $scope.salt_key = $scope.payuData.salt_key;

                }

            })

        }

        if(window.localStorage['token']){
              $scope.viewCartItems();

        $scope.getPayuDetails();
        }else{
            $location.path("/")
        }

      

        $scope.firstname = window.localStorage['user_name'];

        $scope.email = window.localStorage['email'];

        if(window.localStorage['mobile'].length == 12){
        $scope.phone = window.localStorage['mobile'].slice(2);
        }else{
            $scope.phone = window.localStorage['mobile'];
        }
       

        //  alert()

        $scope.checkPaymentType = function (payment) {

            $scope.disablePaymentbtn = false;

        }





        $scope.payuMoneyFunc = function ($location, $sce) {

            $scope.txnId = window.localStorage['finalOrderId'];

            $scope.string = $scope.merchant_key + '|' + $scope.txnId + '|' + $rootScope.amount + '|' + $scope.productinfo + '|' + $scope.firstname + '|' + $scope.email + '|||||||||||' + $scope.salt_key;

            $scope.encrypttext = sha512($scope.string);

            $scope.hash = $scope.encrypttext;

            //console.log($scope.hash)

        }



        $scope.paymentMethod = function (paymentType) {

            if (paymentType != undefined) {

                $scope.paymentType = paymentType;

                $scope.showOrderDetails = true;

                $scope.showPaymentDetails = false;



            }

        }



        // if ($rootScope.couponAmt) {

        //     $scope.couponAmt = $rootScope.couponAmt;

        // }





        $scope.proceed = function (orderItems) {

            // alert($scope.amount)

            if ($scope.paymentType == 'payu') {

                $location.path("payu");

            }

            $scope.billingaddress = [];

            $scope.shippingaddress = [];

            $scope.status = "Accepted";
      if(window.localStorage['mobile'].length==12){

            $scope.customermobile = window.localStorage['mobile'].slice(2);
    }
        else{
             $scope.customermobile = window.localStorage['mobile'];
        }
            // console.log($scope.customermobile)

            $scope.totalamount = $scope.subTotal;

            if ($scope.shippingType == "Delivery") {

                $scope.shippingaddress.push($scope.shippingAddressData);

                $scope.billingaddress.push($scope.billingAddressData);

            } else {

                $scope.shippingAddressArray = [];

                $scope.billingAddressArray = [];

                if ($scope.shippingAddress != undefined && $scope.billingAddress != undefined) {

                    $scope.shippingAddressArray.push($scope.shippingAddress);

                    $scope.billingAddressArray.push($scope.billingAddress);

                } else {

                    $scope.shippingAddressArray = [];

                    $scope.billingAddressArray = [];


                }

                $scope.shop = $scope.dealerAddress;

            }



            $scope.orderItemArray = [];



            $rootScope.cartArray.forEach(function (cartItem) {

                $scope.orderItemArray.push({

                    "sno": "", "productdescription": cartItem.productdescription, "qty": cartItem.qty,

                    "unitprice": cartItem.offer_price, "enduser_price": "", "total": JSON.stringify(cartItem.qty * cartItem.offer_price),

                    "tax": cartItem.tax, "tax_amount": cartItem.tax_amount, "sub_total": JSON.stringify(cartItem.sub_total)

                })

            });

            // console.log(JSON.stringify($scope.orderItemArray))

            $scope.shippingtype = $scope.shippingType;

            $scope.paymenttype = $scope.paymentType;

            $scope.totalquantity = $rootScope.cartArray.length;

            $scope.total_items = $rootScope.cartArray.length;

            if ($rootScope.couponAmt) {
                    $scope.couponId = localStorage.getItem('coupon');
                    $scope.couponAmt = $rootScope.couponAmt;
                    if($rootScope.amount1){
                        $rootScope.grandTotal = $rootScope.amount1;
                    }else{
                        $rootScope.grandTotal = $rootScope.amount;
                    }      
            } else {
                $scope.couponId = "";
                $scope.couponAmt = "0";
                $rootScope.grandTotal = $rootScope.amount;
            }

            if ($scope.shippingType == 'Pickup') {
               
                    $scope.customermobile = $scope.customermobile;
                
                $scope.orderArray = {
                    "status": $scope.status,
                    "shop": $scope.shop,
                    "alt_mobile": $scope.altMobile,
                    "pic_alt_mobile":$scope.altMobile,
                    "customermobile": $scope.customermobile,
                    "totalamount": JSON.stringify($rootScope.grandTotal),
                    "orderitems": $scope.orderItemArray,
                    "cupon_id": $scope.couponId,
                    "discount": $scope.couponAmt,
                    "user_type":"web",
                    "billingaddress": [],
                    "shippingaddress": [],
                    "shippingtype": $scope.shippingType,
                    "totalquantity": JSON.stringify($scope.totalquantity),
                    "paymenttype": $scope.paymenttype,
                    "total_items": JSON.stringify($scope.totalquantity),
                    "user_id": window.localStorage['user_id'],
                    "gst_number":$scope.gst_number
                }
            } else {
               
                 $scope.customermobile = $scope.customermobile;
                
                $scope.orderArray = {
                    "status": $scope.status,
                    "shop": $scope.shop,
                    "customermobile": $scope.customermobile,
                    "totalamount": JSON.stringify($rootScope.grandTotal),
                    "orderitems": $scope.orderItemArray,
                    "cupon_id": $scope.couponId,
                    "discount": $scope.couponAmt,
                    "user_type":"web",
                    "billingaddress": $scope.billingaddress,
                    "shippingaddress": $scope.shippingaddress,
                    "shippingtype": $scope.shippingtype,
                    "totalquantity": JSON.stringify($scope.totalquantity),
                    "paymenttype": $scope.paymenttype,
                    "total_items": JSON.stringify($scope.totalquantity),
                    "user_id": window.localStorage['user_id'],
                     "gst_number":$scope.gst_number
                }
            }

            // localStorage.setItem('shippingAddressInfo',JSON.stringify($scope.shippingAddressData))
            //  localStorage.setItem('billingAddressInfo',JSON.stringify($scope.billingAddressData))
            //console.log(JSON.stringify($scope.orderArray))
            saveOrderService.saveOrderMethod($scope.orderArray).then(function (data) {
               // alert(JSON.stringify(data))
                if (data.data.status == 'data saved') {
                    $scope.finalOrderId = data.data.orderid;
                    window.localStorage['finalOrderId'] = $scope.finalOrderId;
                     localStorage.setItem('shippingAddressInfo',JSON.stringify(data.data.shippingaddress))
                   localStorage.setItem('billingAddressInfo',JSON.stringify(data.data.billingaddress))
                    // $scope.txnId = window.localStorage['finalOrderId'];
                    if ($scope.paymentType == 'cashondelivery') {
                       window.location.href = "success.html";
                      
                    }
                }
            })
        }

        $scope.getDealersList = function (latLongArray) {

            getDealersListService.getDealersListMethod(latLongArray,$scope.pincode).then(function (data) {

                //   alert(JSON.stringify(data))

                if (data.data.status == 'success') {
                     $scope.loading = false;
                    $scope.dealersList = data.data.dealer_list;

                      var source, destination;
            //           for(i=0;i<$scope.dealersList.length;i++){
            //               source = $scope.pincode;
            // destination = $scope.dealersList[i].pincode;
            // var request = {
            //     origin: source,
            //     destination: destination,
            //     travelMode: google.maps.TravelMode.DRIVING
            // };            
            // var service = new google.maps.DistanceMatrixService();
            // service.getDistanceMatrix({
            //     origins: [source],
            //     destinations: [destination],
            //     travelMode: google.maps.TravelMode.DRIVING,
            //     unitSystem: google.maps.UnitSystem.METRIC,
            //     avoidHighways: false,
            //     avoidTolls: false
            // }, function (response, status) {
               
            //     if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            //         $scope.distance1 = response.rows[0].elements[0].distance.text;
  
            //        $scope.dealersList[i]["distance"] = $scope.distance1.split(" ")[0];
            //         //console.log(item.distance)
            //        //console.log(JSON.stringify($scope.dealersList))
            //        // distancefinel = distance.split(" ");    
            //     } else {
            //         alert("Unable to find the distance via road.");
            //     }
            // }); 
            //           }
      //  console.log(JSON.stringify($scope.dealersList))
    //   angular.forEach($scope.dealersList,function(item){
    //       source = $scope.pincode;
    //         destination = item.pincode;
    //         var request = {
    //             origin: source,
    //             destination: destination,
    //             travelMode: google.maps.TravelMode.DRIVING
    //         };            
    //         var service = new google.maps.DistanceMatrixService();
    //         service.getDistanceMatrix({
    //             origins: [source],
    //             destinations: [destination],
    //             travelMode: google.maps.TravelMode.DRIVING,
    //             unitSystem: google.maps.UnitSystem.METRIC,
    //             avoidHighways: false,
    //             avoidTolls: false
    //         }, function (response, status) {
               
    //             if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
    //                 $scope.distance = response.rows[0].elements[0].distance.text;
  
    //                item.distance = $scope.distance.split(" ")[0];
    //                 //console.log(item.distance)
    //                //console.log(JSON.stringify($scope.dealersList))
    //                // distancefinel = distance.split(" ");    
    //             } else {
    //                 alert("Unable to find the distance via road.");
    //             }
    //         });
    //   })
         

                } else {

                    alert(data.data.status);
                 //   $scope.dealersList=[];

                }

            })

        }



        $scope.getPincodeStatus = function (pincode, altMobile,gstnumber) {

            $scope.altMobile = altMobile;

             $scope.gst_number=gstnumber;

             $scope.pincode = pincode;
            // alert($scope.gst_number)

            //alert($scope.altMobile)
            $scope.loading = true;

            getPincodeStatusService.getPincodeStatusMethod(pincode).then(function (data) {

                if (data.data.status == 'Success') {
                    

                    var geocoder = new google.maps.Geocoder();

                    geocoder.geocode({ 'address': JSON.stringify(pincode) }, function (results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {

                            var latitude = results[0].geometry.location.lat();

                            var longitude = results[0].geometry.location.lng();


                            // alert("Latitude: " + latitude + "\nLongitude: " + longitude);

                            $scope.latLongArray = [];

                            $scope.latLongArray.push(longitude,latitude);

                            $scope.getDealersList($scope.latLongArray)

                        } else {

                            // alert("Request failed.")

                        }

                    });

                } else {
                    $scope.loading = false;
                    alert('Enter valid PINCODE')
                   $scope.dealersList = [];

                }

            })

        }

        $scope.pincodeChange = function(pincode){
          //  if(pincode.length == 0){
                $scope.dealersList = [];
          //  }

        }



    }])



shopMyToolsApp.controller('paymentSuccessCtrl', 
function ($scope, $window, $rootScope, inVoiceService,viewCartService,logoutService,
     paymentStatusService,getHeaderService,getFooterService,getAllCategoriesService,searchProductsService,deleteCartService,DOMAIN_URL) {

    $scope.finalOrderId = window.localStorage['finalOrderId'];
    $scope.goToHomeFromCart = function () {
        window.location.href = "./index.html";
    }

     $scope.goToHomeFromLogin = function(){
            window.location.href = "./index.html";
        }

     $rootScope.logincategoryBasedProducts = function(categoryName){
             window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
           
         $scope.categoryURL = document.URL.split("#!/");
            localStorage.removeItem('selectedArray')
            if ($scope.categoryURL[1] == 'categoryPage') {
                 $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"#!/categoryPage1";
             
            } else {
               
                $(".dropdown-menu.multi-level").css("display", "none");
               window.location.href = DOMAIN_URL+"#!/categoryPage";
            }
        }

         $scope.loginsubCategoryMethod = function(subCategory, categoryName){
             localStorage.removeItem('selectedArray');
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            $scope.categoryURL = document.URL.split("#!/");
           if ($scope.categoryURL[1] == 'categoryPage') {
                $(".dropdown-menu.multi-level").css("display", "none");
              
               window.location.href = DOMAIN_URL+"#!/categoryPage1";
            } else {
                 $(".dropdown-menu.multi-level").css("display", "none");
               
               window.location.href = DOMAIN_URL+"#!/categoryPage";
            }
        }

     $scope.user_name = window.localStorage['user_name'];
        $scope.token = window.localStorage['token'];
        $rootScope.cartArray = cartArray;

    $scope.showPrintSection = 'false';

    $scope.printSection = function (printSectionId) {
       // alert('1')

        var innerContents = document.getElementById("printSectionId").innerHTML;

        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');

        popupWinindow.document.open();

        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><style>.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{padding:3px;}@media print{#printBtn {display: none;  }}	</style></head><body >' + innerContents + '</body></html>');
        popupWinindow.document.close();

    }


     $scope.clearCart = function () {
            // alert('1')
            if (window.confirm("Are you sure you want to clear cart? ")) {
              if (window.localStorage['user_id']) {
                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], "all").then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                            $scope.viewCartItems();
                        }
                    })
                } else {
                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), "all").then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'all products deleted successfully') {
                            $rootScope.cartArray = [];
                            // localStorage.removeItem('randomNumber');
                            $scope.getCartItemsWithoutLogin();
                        }
                    })
                }
            }
        }

     $rootScope.viewCartItems = function () {
                viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {
                // console.log('1'+JSON.stringify(data))
                $scope.qtyCountt = 0;
                    if (data.data.status == 'success') {
                        $rootScope.cartArray = data.data.item_list;
                    $scope.qtyCountt = 0;
                        for(var i = 0; i < $rootScope.cartArray.length; i++){
                           $scope.qtyCount= $rootScope.cartArray[i].qty;
                          
                            $scope.qtyCountt+=  parseInt($scope.qtyCount);
                         //alert($scope.qtyCount)
                        }
                        $rootScope.quantityshoppingcart=$scope.qtyCountt;
                    } else {
                        //alert(data.data.status);
                    }
                })
                    }

    $scope.gotoOrderDetails = function () {
          $scope.loading = true;
        inVoiceService.completeOrdersMethod($scope.finalOrderId).then(function (data) {
            if (data.data.status == 'success') {
                $scope.loading = false;
                $rootScope.orderitems = [];
                $rootScope.taxAmount = data.data.user_info.tax_amount;
                $rootScope.grandTotal = data.data.user_info.grand_total;
                $rootScope.custDetails = data.data.user_info.cust_details;
                $scope.shopname= $rootScope.custDetails.shop;
                //alert($scope.shopname)
                if($rootScope.custDetails.gst_number){
                    $rootScope.gstnumber = $rootScope.custDetails.gst_number;
                }else{
                    $rootScope.gstnumber = 'No Data Available';
                }
                $rootScope.status = $rootScope.custDetails.status;
                $rootScope.shippingaddress = $rootScope.custDetails.shippingaddress;
                $rootScope.billingaddress = $rootScope.custDetails.billingaddress;
                $rootScope.shippingtype = $rootScope.custDetails.shippingtype;
                $rootScope.shopAddress = $rootScope.custDetails.pickup_address;
                $rootScope.paymenttype = $rootScope.custDetails.paymenttype;
                $rootScope.orderDetails = data.data.user_info.order_data;
                $rootScope.discountAmt = $rootScope.custDetails.discount_amount;
                $rootScope.netTotal = JSON.parse($rootScope.grandTotal)+JSON.parse($rootScope.discountAmt);
            }
        });
    }

    $scope.checkPaymentStatus = function () {
        paymentStatusService.paymentStatusMethod($scope.finalOrderId,window.localStorage['user_id'],).then(function (data) {
            if (data.data.status == 'status changed') {
                $scope.gotoOrderDetails();
            $rootScope.viewCartItems();
            }
        })
    }

     $scope.coupons=function(){
            //   window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/coupons";
              window.location.href = DOMAIN_URL+"#!/coupons";
              // $window.open("DOMAIN_URLproductDetailPage");
		}

        $scope.goToWishList = function () {
            if (window.localStorage['token']) {
                // $location.path("wishlist");
                //   window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/wishlist";
                window.location.href = DOMAIN_URL+"#!/wishlist";
            } else {
                window.location.href = "./login.html"
            }

        }

        $scope.goToCheckout = function () {
            if (window.localStorage['user_id']) {
                if ($rootScope.cartArray.length != 0) {
                    //  $location.path("checkout");
                    // window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/checkout";
                   window.location.href = DOMAIN_URL+"#!/checkout";
                }
            }
        }

         $scope.removeCompareItem = function (categoryObj) {
            if ($window.confirm("Are you sure you want to delete this product from comparison?")) {
                $rootScope.compareProducts.splice(JSON.parse(localStorage.getItem('compareProducts')).indexOf(categoryObj.upload_name), 1);
                //alert(JSON.stringify($rootScope.compareProducts))
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts))
            }
        }

         $scope.clearCompareProducts = function () {
            if ($window.confirm("Are you sure you want to clear all products?")) {
                $rootScope.compareProducts = localStorage.getItem('compareProducts');
                $rootScope.compareProducts = [];
                localStorage.setItem('compareProducts', JSON.stringify($rootScope.compareProducts));
            }
        }

         $scope.compareProductsMethod = function () {
            //alert("1")
            if ($rootScope.compareProducts.length > 1) {
               // $location.path("compareProducts");
            //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/compareProducts";
            window.location.href =DOMAIN_URL+"#!/compareProducts"
            } else {
                alert('Please add one more Product to Compare')
            }
        }
         $scope.getProductDetailsFromCompare = function (productObj) {
            window.localStorage['productName'] = productObj;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
        //    $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");
            $window.open(DOMAIN_URL+"#!/productDetailPage");
            //  $location.path("productDetailPage")
        }

         $scope.categoryBasedProducts = function (categoryName) {
            window.localStorage['categoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['brandName'] = "";
            window.localStorage['subCategoryName'] = "";
            //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/categoryPage";
           window.location.href = DOMAIN_URL+"#!/categoryPage";
        }

         $rootScope.getProductDetailsFromCart = function (productObj) {
            //  alert(productObj)
            window.localStorage['productName'] = productObj.productdescription;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            // $window.open("http://localhost/smtwithpython/SmtSite/index.html#!/productDetailPage");
             $window.open(DOMAIN_URL+"#!/productDetailPage");
            //  $location.path("productDetailPage")
        }

         $scope.removeCartItem = function (cartObj) {
           //alert(cartObj)
            if (window.confirm("Are you sure you want to delete product from shopping cart")) {
                if (window.localStorage['user_id']) {
                    deleteCartService.deleteCartMethod(window.localStorage['user_id'], cartObj.productdescription).then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'product deleted successfully') {
                            $scope.viewCartItems();
                        } else if (data.data.status == 'success') {
                            //alert('1')
                            $scope.viewCartItems();
                        }
                    })
                } else {
                    deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), cartObj.productdescription).then(function (data) {
                        // alert(JSON.stringify(data))
                        if (data.data.status == 'product deleted successfully') {
                            // $scope.viewCartItems();
                            $scope.getCartItemsWithoutLogin();
                        } else if (data.data.status == 'success') {
                            $scope.getCartItemsWithoutLogin();
                        }
                    })
                }
            }
        }
      
         $rootScope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.productdescription;
            localStorage.removeItem('isReviewStatus');
            $rootScope.showHintFlag = 'false';
            window.location.href = DOMAIN_URL+"#!/productDetailPage"
     
        }

        $scope.getFooter = function () {
            getFooterService.footerMethod().then(function (data) {
                // alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.paymentArray = data.data.payment_methods_data;
                    $scope.custServiceArray = data.data.customer_service_data;
                    $scope.shopMyToolsArray = data.data.shopmytools_data;
                    $scope.addressArray = data.data.address;
                } else {
                    //  alert(data.data.status)
                }
            });
        }

        $scope.getFooter();

        $scope.getCategories = function () {
            getAllCategoriesService.getCategoriesMethod().then(function (data) {
                if (data.data.status == 'success') {
                    $scope.categoryArray = data.data.categories;
                    // alert(JSON.stringify($scope.categoryArray))
                } else {
                    //  alert(data.data.status)
                }
            })
        }

        $scope.logintest = function(searchKey){
              if (searchKey.length > 0) {
                localStorage.setItem('searchkey', searchKey);
                $rootScope.showHintFlag = 'false';
              
                $scope.searchPageURL = document.URL.split("#!/");
                if ($scope.searchPageURL[1] == 'searchPage') {
                  //  $location.path("searchPage1");
                  window.location.href =DOMAIN_URL+"#!/searchPage1";
                }
                else {
                    window.location.href =DOMAIN_URL+"#!/searchPage";
                }
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
                $location.path("/")
            }

        }

        $scope.getCategories();

        $scope.subCategoryMethod = function (subCategory, categoryName) {
            //alert('1')
            window.localStorage['categoryName'] = "";
            window.localStorage['subCategoryName'] = "";
            window.localStorage['categoryName'] = categoryName;
            window.localStorage['subCategoryName'] = subCategory;
            //  window.location.href ="http://localhost/smtwithpython/SmtSite/index.html#!/categoryPage";
           window.location.href = DOMAIN_URL+"#!/categoryPage";
        }
        $rootScope.showHintFlag = 'false';
        $rootScope.showHint = function (searchKey) {
            //$scope.showHintFlag = 'true';
            //alert(searchKey.length)
            if (searchKey.length >= '3') {
                searchProductsService.searchProductsMethod(searchKey).then(function (data) {
                    //alert(JSON.stringify(data))
                    if (data.data.status == 'success') {
                        $rootScope.searchedProducts = data.data.product_info;
                        $rootScope.recommendedList = data.data.recommended;
                        $rootScope.showHintFlag = 'true';
                    } else if(data.data.status == 'fail') {
                        alert(data.data.data)
                    }
                })
            } else if (searchKey.length == '0') {
                $rootScope.showHintFlag = 'false';
            }

        }


        if (localStorage.getItem('compareProducts')) {
            $rootScope.compareProducts = JSON.parse(localStorage.getItem('compareProducts'));
        } else {
            $rootScope.compareProducts = compareProducts;
        }

        $scope.goToLogin = function () {
            // $location.path("login");
            window.location.href = "./login.html";
        }

        $scope.goToAddressBook = function () {
            $location.path("addressBook");
        }

        $scope.goToLogout = function () {
            logoutService.userLogout(window.localStorage['token']).then(function (data) {
                if (data.data.status == 'success') {
                    $window.localStorage.clear();
                    $scope = $scope.$new(true);
                    $rootScope = $rootScope.$new(true);
                    window.location.href = "./login.html";
                } else {
                }
            })
        }

        $scope.goToHome = function () {
            window.location.href = "./index.html";
        }

         $scope.goToDashboard = function () {
            // alert("hai")
            if (window.localStorage['token']) {
                //    window.location.href="http://localhost/smtwithpython/SmtSite/index.html#!/dashboard";
               window.location.href = DOMAIN_URL+"#!/dashboard";
            }
            else {
                window.location.href = "./login.html";
            }
        }

         $scope.getHeader = function () {
            getHeaderService.headerMethod().then(function (data) {
                // alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.headerArray = data.data.header_data;

                } else {
                    // alert(data.data.status)
                }
            });
        }
           $scope.getHeader();

           $rootScope.hideDiv = function () {
            $rootScope.showHintFlag = !$rootScope.showHintFlag;
        }


         $scope.gotoFooterPage = function(page){
            if(page == 'aboutus'){
               // $location.path("aboutus")
               window.location.href = DOMAIN_URL+"#!/aboutus";
            }else if(page == 'contactus'){
                //  $location.path("contact")
                   window.location.href = DOMAIN_URL+"#!/contact";
            }else if(page == 'termofuse'){
                //  $location.path("termsofuse")
                   window.location.href = DOMAIN_URL+"#!/termsofuse";
            }else if(page == 'returnpolicy'){
                // $location.path("returnpolicy")
                  window.location.href = DOMAIN_URL+"#!/returnpolicy";
            }else if(page == 'privacypolicy'){
                // $location.path("privacypolicy")
                  window.location.href = DOMAIN_URL+"#!/privacypolicy";
            }else if(page == 'shipping'){
                // $location.path("shipping")
                  window.location.href = DOMAIN_URL+"#!/shipping";
            }else if(page == 'netbanking'){
                // $location.path("netbanking")
                  window.location.href = DOMAIN_URL+"#!/netbanking";
            }else {
                // $location.path("emi")
                 window.location.href = DOMAIN_URL+"#!/emi";
            }
            
        }




if(window.localStorage['token']){
$scope.checkPaymentStatus();
}else{
 
$location.path("/")
}



})

