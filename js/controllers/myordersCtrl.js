shopMyToolsApp.controller('myOrdersController',
['$scope', '$http', '$window', '$rootScope', '$location', 'myOrdersService', 'inVoiceService', 'Pagination',
        function ($scope, $http, $window, $rootScope, $location, myOrdersService, inVoiceService, Pagination) {

           $window.scrollTo(0, 0);
            $scope.loading = true;
            $scope.getOrders = function () {
                myOrdersService.myOrdersMethod(window.localStorage['user_id']).then(function (data) {
                    // alert(JSON.stringify(data))

                    if (data.data.status == 'success') {
                        $rootScope.myOrdersList = data.data.order_info;
                        $scope.loading = false;
                        $scope.data = $rootScope.myOrdersList;

                        $scope.serialNo = 1;
                        $scope.data.forEach(function (element) {
                            element.s_no = $scope.serialNo;
                            $scope.serialNo++
                        }, this);

//                        for(var i = 1; i = $scope.data.length; i++){
//     $scope.data[i] = { s_no: i }
//   }

                        $scope.viewby = 10;
                        $scope.totalItems = $scope.data.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewby;

                        $scope.pageList = [0, 1, 2, 3, 4];
                        $scope.pagination = Pagination.getNew($scope.viewby);
                        $scope.pagination.numPages = Math.ceil($scope.data.length / $scope.pagination.perPage);

                        
                    }
                })
            }




            if (window.localStorage['token']) {
                $scope.getOrders();
            } 

  

            if(window.localStorage['token']){
                 $scope.getOrders();
            }else{

                $location.path("/")
            }


            $scope.gotoOrderDetails = function (orderId) {
                window.localStorage['orderId'] = orderId;
                $location.path("invoice");

            }

            $scope.pageNavigate = function () {
                $location.path("dashboard");
            }

            $scope.goToHome = function () {
                $location.path("/");
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


        }])


shopMyToolsApp.controller('myOrderDetailsCtrl', function ($scope, $rootScope, $location, $window, inVoiceService, myOrdersService) {
 $window.scrollTo(0, 0);
    $scope.getMyOrderDetails = function () {

$scope.orderId = window.localStorage['orderId'];

        inVoiceService.completeOrdersMethod(window.localStorage['orderId']).then(function (data) {
            if (data.data.status == 'success') {
                $rootScope.taxAmount = data.data.user_info.tax_amount;
                $rootScope.grandTotal = data.data.user_info.grand_total;
                $rootScope.custDetails = data.data.user_info.cust_details;
                $rootScope.status = $rootScope.custDetails.status;
                if ($rootScope.custDetails.gst_number) {
                    $rootScope.gstnumber = $rootScope.custDetails.gst_number;
                } else {
                    $rootScope.gstnumber = 'No data Available';
                }

                $rootScope.shippingaddress = data.data.user_info.cust_details.shippingaddress;
                $rootScope.billingaddress = data.data.user_info.cust_details.billingaddress;
                $rootScope.shopAddress = data.data.user_info.cust_details.pickup_address;
                $rootScope.shop_name = data.data.user_info.cust_details.shop;
                $rootScope.shippingtype = $rootScope.custDetails.shippingtype;
                $rootScope.discountAmt = $rootScope.custDetails.discount_amount;
                 $rootScope.redeem_amount = $rootScope.custDetails.redeem_amount;
                $rootScope.paymenttype = $rootScope.custDetails.paymenttype;
                $rootScope.orderDetails = data.data.user_info.order_data;
                $rootScope.amtPayable = JSON.parse($rootScope.grandTotal) + JSON.parse($rootScope.discountAmt);

            }

        });
    }

    $scope.test = function () {
        //  alert('1')
        $location.path("myorders");
    }


    $scope.invoicebredcrumb = function () {
        $location.path("invoiceOrders");
    }

    $scope.showInvoice = localStorage.getItem('showInvoice');

    $scope.showMyOrders = localStorage.getItem('showMyOrders');

    $scope.showPendingOrders = localStorage.getItem('showPendingOrders');




    $scope.pageNavigate = function () {
        $location.path("dashboard");
    }

    $scope.goToHome = function () {
        $location.path("/");
    }



    $scope.pendingOrdersbredcrumb = function () {
        $location.path("pendingOrders");
    }



    if (window.localStorage['token']) {
        $scope.getMyOrderDetails();
    } else {
        $location.path("/")
    }


    $scope.cancelOrder = function (orderId) {

        $rootScope.orderId = orderId;
        if ($window.confirm("Sure, Are you want to cancel?")) {
            myOrdersService.cancelOrderMethod($rootScope.orderId).then(function (data) {
                // alert(JSON.stringify(data))
                console.log(data)
                if (data.data.status == 'success') {
                    $("#cancelOrderModal").modal('show');
                    // $location.path("myorders")
                } else if(data.data.status == 'please contact customer support') {
                  //  alert(data.data.status);
                  $("#cancelOrderDelayModal").modal('show');
                }
            })
        }

    }

    $scope.closeCancelModal = function () {
        $("#cancelOrderModal").modal('hide');
         $("#cancelOrderDelayModal").modal('hide');
        $location.path("myorders");
    }

    $scope.gotoOrders = function () {
        $location.path("myorders")
    }


    $scope.showPrintSection = 'false';
    $scope.printSection = function (textId) {

        var printContents = document.getElementById("textId").innerHTML;

        var popupWin = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');

        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><style>.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{padding:3px;}@media print{#printBtn {display: none;  }}	</style></head><body >' + printContents + '</body></html>'); popupWin.document.close();
    }
})

shopMyToolsApp.controller('pendingOrdersController',
    ['$scope', '$http', '$location', '$rootScope', 'pendingOrdersService', 'inVoiceService',
     'myOrdersService','Pagination','$window',
     function ($scope, $http, $location, $rootScope, pendingOrdersService,
         inVoiceService, myOrdersService,Pagination,$window) {
        $window.scrollTo(0, 0);
        $scope.getOrders = function () {
            $scope.loading = true;
            pendingOrdersService.pendingOrdersMethod(window.localStorage['user_id']).then(function (data) {
                if (data.data.status == 'success') {
                    $rootScope.pendingOrdersList = data.data.user_info;
                    $scope.loading = false;
                    $scope.data = $rootScope.pendingOrdersList;
                      $scope.serialNo = 1;
                        $scope.data.forEach(function (element) {
                            element.s_no = $scope.serialNo;
                            $scope.serialNo++
                        }, this);
                    $scope.viewby = 10;
                    $scope.totalItems = $scope.data.length;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = $scope.viewby;
                     $scope.pageList = [0, 1, 2, 3, 4];
                        $scope.pagination = Pagination.getNew($scope.viewby);
                        $scope.pagination.numPages = Math.ceil($scope.data.length / $scope.pagination.perPage);

                }
            })
        }

        if (window.localStorage['token']) {
            $scope.getOrders();
        } else {
            $location.path("/")
        }


        $scope.gotoPendingOrderDetails = function (orderId) {
            window.localStorage['orderId'] = orderId;
            $location.path("invoice");
            $scope.view = true;
        }

        $scope.pageNavigate = function () {
            $location.path("dashboard");
        }

        $scope.goToHome = function () {
            $location.path("/");
        }

        $scope.myOrdersList = [];
        $scope.cancelOrder = function (orderId) {
            $rootScope.orderId = orderId;
            if ($window.confirm("Sure, Are you want to cancel?")) {
                myOrdersService.cancelOrderMethod($rootScope.orderId).then(function (data) {
                    // alert(JSON.stringify(data))
                    if (data.data.status == 'success') {
                        $location.path("pendingorders")
                    } else {
                        alert(data.data.status);
                    }
                })
            }

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

    }])


shopMyToolsApp.controller('invoiceOrdersController',
    ['$scope', '$http', '$location', '$rootScope', 'pendingOrdersService', 'inVoiceService', '$window',
    function ($scope, $http, $location, $rootScope, pendingOrdersService, inVoiceService,$window) {
       $window.scrollTo(0, 0);
        $scope.getOrders = function () {
            $scope.loading = true;
            inVoiceService.inVoiceMethod(window.localStorage['user_id']).then(function (data) {
                // alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $rootScope.invoiceOrderlist = data.data.user_info;
                    $scope.loading = false;
                    $scope.data = $rootScope.invoiceOrderlist;
                    $scope.viewby = 10;
                    $scope.totalItems = $scope.data.length;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = $scope.viewby;
                } else {
                    alert(data.data.status);
                }
            })
        }

        if (window.localStorage['token']) {
            $scope.getOrders();
        } else {
            $location.path("/")
        }


        $scope.gotoOrders = function () {
            $location.path("invoiceOrders");
        }

        $scope.gotoInvoiceOrdersList = function (orderId) {
            window.localStorage['orderId'] = orderId;
            $location.path("invoice");
        }

        $scope.pageNavigate = function () {
            $location.path("dashboard");
        }

        $scope.goToHome = function () {
            $location.path("/");
        }
    }])





