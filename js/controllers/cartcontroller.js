// function funup(val123,id123)
// {
//            if(val123.charCodeAt()==48)
//             {
//                 //alert(document.getElementById("id123").value);
//                 alert("You can not add Zero quantity123");
//                 return false;
//             }
// }
shopMyToolsApp.controller('cartController', ['$scope', '$http', '$location', '$rootScope',

    'viewCartService', 'deleteCartService', 'addToCartService', '$filter', '$window','DOMAIN_URL',

    function ($scope, $http, $location, $rootScope, viewCartService, deleteCartService,

        addToCartService, $filter, $window,DOMAIN_URL) {

        $window.scrollTo(0, 0);

        $scope.closeModal = function () {
            $("#outOfQty").modal('hide');
        }

        $scope.viewCartItems = function () {

            //alert($scope.orderId)

            if (localStorage.getItem('randomNumber') != undefined) {

                viewCartService.cartItemsWithoutLoginMethod(localStorage.getItem('randomNumber')).then(function (data) {

                    //console.log('1'+JSON.stringify(data))

                    if (data.data.status == 'success') {

                        $rootScope.cartArray = data.data.item_list;

                        $scope.orderId = data.data.orderid;

                        window.localStorage['orderId'] = $scope.orderId;

                        $scope.totalItems = $rootScope.cartArray.length;

                        $scope.totalAmount = 0;

                        $scope.subTotal = data.data.grand_total;

                        $scope.orderId = data.data.orderid;

                        window.localStorage['orderId'] = $scope.orderId;

                        $rootScope.cartArray.forEach(function (cartObj) {

                            //  $scope.totalItems += JSON.parse(cartObj.qty);

                            $scope.totalAmount += JSON.parse(cartObj.offer_price) * cartObj.qty;



                        })

                        $rootScope.totalItems = $scope.totalItems;

                        $rootScope.totalAmount = $scope.totalAmount;

                        $rootScope.subTotal = $scope.subTotal;

                    } else {

                        //alert(data.data.status);

                    }

                })

            } else {

                viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {

                    // alert(JSON.stringify(data))

                    if (data.data.status == 'success') {
                        $rootScope.cartArray = data.data.item_list;
                        $scope.totalItems = $rootScope.cartArray.length;
                        $scope.totalAmount = 0;
                        $scope.subTotal = data.data.grand_total;
                        $scope.orderId = data.data.orderid;
                        window.localStorage['orderId'] = $scope.orderId;
                        $rootScope.cartArray.forEach(function (cartObj) {
                            //  $scope.totalItems += JSON.parse(cartObj.qty);
                            $scope.totalAmount += JSON.parse(cartObj.offer_price) * cartObj.qty;
                        })
                        $rootScope.totalItems = $scope.totalItems;
                        $rootScope.totalAmount = $scope.totalAmount;
                        $rootScope.subTotal = $scope.subTotal;
                        // window.localStorage['cartArray'] = $rootScope.cartArray;
                    } else {
                        // alert(data.data.status);
                    }

                })

            }

        }


             if(window.localStorage['token']){
                $scope.viewCartItems();
            }else{
                window.location.href = "./login.html";
            }

        //$scope.viewCartItems();

      
            $scope.leavingInput = function(cartObj){
                if(cartObj.qty == '' || cartObj.qty == undefined){
                    alert('Please enter quantity')
                    cartObj.qty =1;
                }
            }



        $scope.changeQty = function (cartObj) {

            //console.log(JSON.stringify(cartObj.qty))

           
           //val123=cartObj.qty;
           

            if (cartObj.qty.length > 0) {
                if (cartObj.qty > 0) {
                    if (window.localStorage['token']) {

                        $rootScope.cartArray.forEach(function (cartItem) {

                            if (cartObj.productdescription == cartItem.productdescription) {

                                cartItem.qty = cartObj.qty;



                            }

                        })

                        console.log(JSON.stringify($rootScope.cartArray))

                        addToCartService.addToCartMethod($rootScope.cartArray, window.localStorage['user_id']).then(function (data) {

                            // console.log(JSON.stringify(data))

                            if (data.data.status == 'item added to cart..') {

                                window.localStorage['orderId'] = data.data.orderid;

                                $scope.viewCartItems();

                            } else if (data.data.status == 'out off stock') {

                                $rootScope.avlQty = data.data.avlqty;

                                $("#outOfQty").modal('show');

                            }

                            else {

                                // alert(data.data.status)

                            }

                        })
                    } else {

                        $scope.randomNumber = localStorage.getItem('randomNumber');

                        $rootScope.cartArray.forEach(function (cartItem) {

                            if (cartObj.productdescription == cartItem.productdescription) {

                                cartItem.qty = cartObj.qty;



                            }

                        })

                        console.log(JSON.stringify($rootScope.cartArray))

                        addToCartService.addToCartMethod($rootScope.cartArray, $scope.randomNumber).then(function (data) {

                            // console.log(JSON.stringify(data))

                            if (data.data.status == 'item added to cart..') {



                                window.localStorage['orderId'] = data.data.orderid;



                                $scope.viewCartItems();



                            } else if (data.data.status == 'out off stock') {

                                $rootScope.avlQty = data.data.avlqty;

                            }

                            else {

                                // alert(data.data.status)

                            }

                        })


                    }
                } else if (cartObj.qty == 0) {
                   // alert('Quantity shuold be atleast one');
                   if(window.confirm("Are you sure you want to delete this product from shopping cart")){

                deleteCartService.deleteCartMethod(window.localStorage['user_id'], cartObj.productdescription).then(function (data) {

                    // alert(JSON.stringify(data))

                    if (data.data.status == 'product deleted successfully') {

                        $scope.viewCartItems();

                    }

                })
                }else{
                    $scope.viewCartItems();
                }
                }
            }


        }





        $scope.gotoCheckOut = function () {

        //    if(document.getElementById('cartQty').value != null){
            if (window.localStorage['user_id']) {
                
                // $rootScope.cartArray.forEach(function(element){
                //     if(element.qty != 0 || element.qty != ''){
                //         alert('Please enter Quantity')
                //     }
                // })

                $location.path("checkout");

            } else {

                localStorage.setItem('previousUrl', document.URL);

                window.location.href = "login.html";

            }
        //    }
            



        }



        $scope.removeCartItem = function (cartObj) {

            if (window.localStorage['user_id']) {
                if(window.confirm("Are you sure you want to delete this product from shopping cart")){

                deleteCartService.deleteCartMethod(window.localStorage['user_id'], cartObj.productdescription).then(function (data) {

                    // alert(JSON.stringify(data))

                    if (data.data.status == 'product deleted successfully') {

                        $scope.viewCartItems();

                    }

                })
                }

            } else {

                deleteCartService.deleteCartMethod(localStorage.getItem('randomNumber'), cartObj.productdescription).then(function (data) {

                    // alert(JSON.stringify(data))

                    if (data.data.status == 'product deleted successfully') {

                        $scope.viewCartItems();

                    }

                })

            }



        }



        $scope.clearCart = function () {

            // alert('1')
            if(window.confirm("Are you sure you want to clear all products?"))

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

                        $scope.viewCartItems();

                    }

                })

            }

        }

         $scope.restrictMinus = function(e){
             //alert(e)
	
	console.log(e)
    // if(!((e.keyCode > 95 && e.keyCode < 106)
    //   || (e.keyCode > 47 && e.keyCode < 58) 
    //   || e.keyCode == 8 )) {
    //     return false;
	// }

	if (e.keyCode == 45 || (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57))) e.preventDefault();
	
  }


        $scope.goToHomeFromCart = function () {



            $location.path("/")

        }

        $rootScope.getProductDetails = function (productObj) {

            window.localStorage['productName'] = productObj.productdescription;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';
        //    $window.open("http://localhost/newSMTsite/index.html#!/productDetailPage");

        //   $window.open("http://toolsomg.com/#!/productDetailPage");

         $window.open(DOMAIN_URL+"#!/productDetailPage");


            //  $location.path("productDetailPage")

        }



    }])