	shopMyToolsApp.controller('product_detailed_controller', 
	function($scope,product_detailed_service,notify_service,reviews_service,
		viewCartService,addToCartService,$rootScope) {
	//alert('1')
		$scope.getProductDetails = function () {
			product_detailed_service.getAllDetailsOfProduct(window.localStorage['productName']).then(function (data) {
				//alert(JSON.stringify(data));
				
				if (data.data.status == 'success') {
				
					var result=data.data;
					$scope.brandDetailDescArray = result.Product;
					$scope.productDetailedReviewBlock = result.product_Reviews;
					$scope.brandDetailPriceArray = result.price_info;
					$scope.brandDetailSpecAttrArray = result.attribute_info;
					$scope.brandDetailQuantity = result.Quantity;
					$scope.brandDetailRelatedProductsArray = result.Related_Products;
						var i=0; var ind=1; var cntr=1;
					angular.forEach($scope.brandDetailRelatedProductsArray, function(value, key) {
					 
							
							if(cntr>4) {ind++; cntr=1}
							$scope.brandDetailRelatedProductsArray[i].ind=ind;
							cntr++;							
						i++;
					});
				
					$scope.brandDetailUpsellProductsArray = result.Upsell_Products	
						var i=0; var ind=1; var cntr=1;
					angular.forEach($scope.brandDetailUpsellProductsArray, function(value, key) {
					 
							
							if(cntr>4) {ind++; cntr=1}
							$scope.brandDetailUpsellProductsArray[i].ind=ind;
							cntr++;							
						i++;
					});
					
				} 
				else 
				{
					//alert('');
				}
			})
		}
	
		
			$scope.getProductDetails();
	

		/*  getting all brands detailed data and images end here  */

		/*   notify strat here */
		$scope.notify = function(emailId,uploadName){
			notify_service.notifyMethod(emailId,uploadName).then(function(data){
			//alert(JSON.stringify(data));
			
			})
		}
		/*   notify end here */
		
		/*   reviews strat here */
		$scope.reviews = function(productDescription,riviewRating,mobileNumber,ratingComments,userName){
			reviews_service.reviewsMethod(productDescription,riviewRating,mobileNumber,ratingComments,userName).then(function(data){
			//alert(JSON.stringify(data));
			//alert(userName);
			});
		};
		/*   reviews end here */


		 $scope.viewCartItems = function () {
             //alert($scope.orderId)
          
            viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {
                 //alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.cartArray = data.data.data;
                    $scope.totalItems =  $scope.cartArray.length;
                    $scope.totalAmount = 0; 
                    $scope.orderId = data.data.orderid;
                    window.localStorage['orderId'] = $scope.orderId;
                    $scope.cartArray.forEach(function(cartObj){
                      //  $scope.totalItems += JSON.parse(cartObj.qty);
                        $scope.totalAmount += JSON.parse(cartObj.unitprice);
                    })
                    $rootScope.totalItems =  $scope.totalItems;
                    $rootScope.totalAmount = $scope.totalAmount;
                   // window.localStorage['cartArray'] = $scope.cartArray;
                  
                } else {
                   // alert(data.data.status);
                }
            })
		}
		
		$scope.viewCartItems();

		  $rootScope.localCartArray = localCartArray;

     //  $scope.cartArray = window.localStorage['cartArray']

       $scope.addToCart = function (productObj) {
         // alert(productObj)
            if (window.localStorage['token']) {
               
               if(productObj == ""){

                 $rootScope.localCartArray =  JSON.parse(localStorage.getItem('localCartArray'));
               
                $scope.orderArray = [] ;
                $rootScope.localCartArray.forEach(function (cartObj) {
                    
                   $scope.orderArray.push({"productdescription":cartObj.upload_name,"qty":cartObj.qty})
                   
                 
                  console.log(JSON.stringify($scope.orderArray))
                 })
              
                  $rootScope.orderArray = $scope.orderArray;
                 

               }else{
               
                 $scope.pricesList = productObj.prices;
                  $scope.orderArray = [] ;

                  $scope.orderArray.push({"productdescription":productObj.upload_name,"qty":productObj.qty})

               
               }

              
                addToCartService.addToCartMethod($rootScope.orderArray,window.localStorage['user_id']).then(function (data) {
                    // alert(JSON.stringify(data))
                    if (data.data.status == 'item added to cart') {
                      
                        $("#addedToCart").modal('show');
                        window.localStorage['orderId'] = data.data.orderid;
                      
                        $scope.viewCartItems();
                    } else if (data.data.status == 'order item updated with qty') {
                        $("#addedToCart").modal('show');
                        $scope.viewCartItems();
                    } else if (data.data.status == 'item added to cart..') {
                        $("#addedToCart").modal('show');
                      
                        $scope.viewCartItems();
                    }
                    else {
                        // alert(data.data.status)
                    }
                })
            } else {
                //alert(JSON.stringify(productObj))
                if(JSON.parse(localStorage.getItem('localCartArray'))){

                   $rootScope.localCartArray =  JSON.parse(localStorage.getItem('localCartArray'));
                    
                     $rootScope.localCartArray.forEach(function (cartObj) {
                    if(cartObj.upload_name == productObj.upload_name){
                        cartObj.qty++;
                    }else{
                         $rootScope.localCartArray.push(productObj);
                    }
                     })

                      localStorage.setItem('localCartArray',JSON.stringify($rootScope.localCartArray));

                }else{
                    productObj.qty = 1;
                     $rootScope.localCartArray.push(productObj);
                  
                }
                $("#addedToCart").modal('show');
                $scope.totalItems =  $rootScope.localCartArray.length;
                $scope.totalAmount = 0;
                 $rootScope.localCartArray.forEach(function (cartObj) {
                   
                    cartObj.prices.forEach(function (item) {
                        $scope.totalAmount += item.dealer_price;
                    })

                })
                $rootScope.totalItems = $scope.totalItems;
                $rootScope.totalAmount = $scope.totalAmount;

                localStorage.setItem('localCartArray',JSON.stringify($rootScope.localCartArray)); 
               
               
            }

        }

        $scope.closeModal = function () {
            $("#addedToCart").modal('hide');
            $("#addedToWishList").modal('hide');
        }
	
	});