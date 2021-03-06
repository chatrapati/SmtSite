shopMyToolsApp.controller('product_detailed_controller',
	function ($scope, $location, product_detailed_service, notify_service, reviews_service,
		viewCartService, $scope, $window, referralEmailservice, addToCartService, $rootScope,
		 addToWishListService,addCompareProductsService,$interval,DOMAIN_URL) {
		//alert('1')
		 $rootScope.showHintFlag = 'false';
         $rootScope.showHintMsg = 'false';
		$window.scrollTo(0, 0);
		$scope.showData = 'false';
		//alert($scope.showData)
		$scope.cartItem={"qty":1};
 
		$scope.closeModal = function () {
			$("#addedToCart").modal('hide');
			$("#addedToWishList").modal('hide');
		}

		$scope.goToHome = function () {

			$location.path("/")
		}
   
		$scope.productReviewMethod = function (productObj, isReview) {
			// localStorage.setItem('isReviewStatus', isReview);
			$scope.isReview = isReview;
			$('html,body').animate({
				scrollTop: $(".second").offset().top
			}, 'slow');

		}



		  $scope.showIndex = 0;

		  $scope.reviewLogin = function(){
			 localStorage.setItem('productPageUrl', document.URL);
			  window.location.href = DOMAIN_URL+"login.html";
		  }

		  $scope.reviewRegister = function(){
			 localStorage.setItem('productPageUrl', document.URL);
			   window.location.href = DOMAIN_URL+"registration.html";
		  }

        $scope.changeIndex = function(){
        // alert($scope.brandDetailRelatedProductsArray.length)
                 $scope.showIndex = $scope.showIndex+4;
             if($scope.showIndex  >= $scope.brandDetailRelatedProductsArray.length){
                 $scope.showIndex = 0;
            }
            
         console.log('1'+$scope.showIndex)
        }

        $scope.showIndexUpsell = 0;

         $scope.changeIndexUpsell = function(){
         
                 $scope.showIndexUpsell = $scope.showIndexUpsell+4;
             if( $scope.showIndexUpsell >= $scope.brandDetailUpsellProductsArray.length){
                 $scope.showIndexUpsell = 0;
            }
            
         console.log('2'+$scope.showIndexUpsell)
		}

		$scope.showIndexRecent = 0;

         $scope.changeIndexRecent = function(){
         
                 $scope.showIndexRecent = $scope.showIndexRecent+4;
             if($scope.showIndexRecent >= $scope.brandDetailRecentlyProductsArray.length){
                 $scope.showIndexRecent = 0;
            }
            console.log('3'+$scope.showIndexRecent)
         
		}
		
		

    //        $interval(function () {
    //    $scope.changeIndex();
    // }, 10000);

    //  $interval(function () {
    //    $scope.changeIndexUpsell();
    // }, 15000);

	//  $interval(function () {
    //    $scope.changeIndexRecent();
    // }, 20000);

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
                            }  else if(data.data.status == 'subcategory not matched'){
                                alert('Compare only same Sub-category');
                            }
                        })
                    }
                }

            }else {
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

		$scope.isReadonly = true;
		//alert(localStorage.getItem('breadCrumb'))
		if (window.localStorage['subCategoryName'] != '') {
			$scope.breadCrumb = window.localStorage['categoryName'];
			$scope.breadCrumb1 = window.localStorage['subCategoryName'];
			//alert($scope.breadCrumb1)
		} else if (localStorage.getItem('breadCrumb')) {
			$scope.breadCrumb = localStorage.getItem('breadCrumb');
			$scope.breadCrumb1 = localStorage.getItem('breadCrumb1');
		}
		else {
			$scope.breadCrumb = window.localStorage['categoryName'];
		}

		if (window.localStorage['productName']) {
			$scope.breadCrumb2 = window.localStorage['productName'];
		}

		$scope.subcat = function (subCat) {
			window.localStorage['subCategoryName'] = subCat;
			window.localStorage['categoryName'] = $scope.breadCrumb;
			
            localStorage.removeItem('selectedArray');
			$location.path("categoryPage");
		}

		$scope.pageNavigate = function (breadCrumb) {
			window.localStorage['categoryName'] = breadCrumb;
			
            localStorage.removeItem('selectedArray');
			$location.path("categoryPage");
		}
	


		 $scope.restrictMinus = function(e){
	
	console.log(e)
    // if(!((e.keyCode > 95 && e.keyCode < 106)
    //   || (e.keyCode > 47 && e.keyCode < 58) 
    //   || e.keyCode == 8 )) {
    //     return false;
	// }

	if (e.which == 45 || e.which ==0 ||(e.which > 31 && (e.which < 48 || e.which > 57))) e.preventDefault();
	
  }

		$rootScope.addToWishList = function (productObj) {

			// alert('1')
			if (window.localStorage['token']) {
				addToWishListService.addToWishListMethod(window.localStorage['user_id'], productObj.upload_name).then(function (data) {



					if (data.data.status == 'product saved successfully') {



						$("#addedToWishList").modal('show');

					} else {



					}

				})
			} else {

				alert('Please Login to Add To WishList')
			}


		}


		 $scope.closeModal = function () {

            $("#addedToCart").modal('hide');

            $("#addedToWishList").modal('hide');

            $("#addedToCompareProducts").modal('hide');

            $("#outOfQty").modal('hide');

		}
		

		$rootScope.dealProductPrice = dealProductPrice;

		$scope.getProductDetails = function () {
			if (window.localStorage['user_id']) {
				$scope.userId = window.localStorage['user_id'];
			} else {
				$scope.userId = "";
			}
			
 			$scope.loading = true;
			product_detailed_service.getAllDetailsOfProduct(window.localStorage['productName'],$scope.userId).then(function (data) {
				// alert(JSON.stringify(data));
				 $scope.loading = false;
				if (data.data.status == 'success') {
					var result = data.data;
					$scope.showData = 'true';
					
					if (result.Product.product_data != '' && result.Product.product_data != undefined) {
						$scope.showMultipleProducts = true;
						$scope.attributeList = [];
						$scope.priceList = [];
						$scope.brandDetailDescArray = result.Product.product_data;
						// alert($scope.brandDetailDescArray)

						if (result.Product.products != '' && result.Product.products != undefined) {
							$scope.dealsProductsArray = result.Product.products;
							angular.forEach($scope.dealsProductsArray, function (dealsProduct) {
								$rootScope.dealProductPrice.push(dealsProduct.prices[0])
							})

						}

						$scope.productsData = result.Product.products;
						$scope.uploadWarranty = result.Product.upload_warranty;
						$scope.productsData.forEach(function (items) {
							items.attributes.forEach(function (item) {
								$scope.attributeList.push(item);
							})
						})
						$scope.productsData.forEach(function (items) {
							items.prices.forEach(function (item) {
								$scope.priceList.push(item);
							})
						})
					}
					else {
						$scope.showMultipleProducts = false;
						$scope.brandDetailDescArray = result.Product;
						$rootScope.tags=$scope.brandDetailDescArray.tags.toString();
						$rootScope.metadescription=$scope.brandDetailDescArray.metadescription.toString();
							$rootScope.keywords=$scope.brandDetailDescArray.keywords.toString();
                        //   $scope.brandDetailDescArray.manual_pdf="https://s3.ap-south-1.amazonaws.com/gstbucket1/RRB-Gropu-D-Detailed-Syllabus-2018.pdf";
							if($scope.brandDetailDescArray.manual_pdf!== null || $scope.brandDetailDescArray.manual_pdf!==undefined){
                              $rootScope.manual_pdf=$scope.brandDetailDescArray.manual_pdf;
							}
							// $scope.brandDetailDescArray.manual_video="https://s3.ap-south-1.amazonaws.com/gstbucket1/smt+coming+soon.mp4";
							if($scope.brandDetailDescArray.manual_video!== null || $scope.brandDetailDescArray.manual_video!==undefined){
                             $rootScope.manual_video=$scope.brandDetailDescArray.manual_video;
							}
							$rootScope.pagetitle=$scope.brandDetailDescArray.upload_name;	
						$scope.avgRating = $scope.brandDetailDescArray.avgrating;
						$scope.pricesInfo = result.price_info;
						$scope.attributeInfo = result.attribute_info;
						$scope.uploadWarranty = result.Product.upload_warranty;
					}
					$scope.productDetailedReviewBlock = result.product_Reviews;
					$scope.brandDetailQuantity = result.Quantity;
					$scope.availableProducts = result.avlqty;

					/* related products start here  */
					$scope.brandDetailRelatedProductsArray = result.Related_Products;
					//alert(JSON.stringify($scope.brandDetailRelatedProductsArray))
					$scope.brandDetailUpsellProductsArray = result.Upsell_Products;
						$scope.brandDetailRecentlyProductsArray = result.recent_data_list;
					

					/* upsell products end here  */


				}
				else {
					//alert('');
				}
			})
		}

			$scope.showHintFlag = 'false';
			/*   product name redirect link start here */
			$scope.getProductDetailsaa = function (productObj) {
				//$window.scrollTo(0, 0);
				window.localStorage['productName'] = productObj.upload_name;
				window.localStorage['categoryName'] = productObj.upload_category;
			 window.localStorage['subCategoryName'] = productObj.upload_subcategory;
				$scope.getProductDetails();
				$window.scrollTo(0, 0);
				location.reload();
			}

			$scope.newTab = function (productObj) {
				window.localStorage['productName'] = productObj.upload_name;
				$scope.showHintFlag = 'false';
				window.open(document.URL + "productDetailPage", '_blank');
			}
			/*   product name redirect link start here */

		if (window.localStorage['productName']) {
			$scope.getProductDetails();
		} else {
			$location.path("/");
		}


		/* getting all brands detailed data and images end here  */

		/* notify strat here */
		$scope.notify = function (emailId, uploadName) {
			notify_service.notifyMethod(emailId, uploadName).then(function (data) {
				//alert(JSON.stringify(data));

			})
		}
		/* notify end here */


		$scope.slickConfig = {
			enabled: true,
			// infinite:true,
			autoplay: true,
			autoplaySpeed: 5000,
			draggable: false,			
			responsive: [
				// {
				//     breakpoint: 1024,
				//     settings: "unslick"
				// },
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 468,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 320,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

			]
		};



		/* reviews strat here */
		$scope.showlogindiv = false;
		$scope.showReview = true;
		$scope.hideErrorMsgs = false;
		$scope.reviews = function (reviewData, productDescription) {
			//alert(productDescription)
			// if ($scope.productpageForm.$valid) {
			$scope.reviewData = reviewData;
			if (window.localStorage['token']) {
				$scope.showlogindiv = false;
				$scope.userId = window.localStorage['email'];
				//	$scope.showReview = false;

				reviews_service.reviewsMethod(reviewData.reviewRating, reviewData.reviewUserName, reviewData.reviewUserSummery, reviewData.reviewUserMobile, reviewData.reviewUserComment, productDescription, $scope.userId).then(function (data) {
					//alert(JSON.stringify(data));
					if (data.data.success == 'success') {

						//alert(JSON.stringify(reviewData))
						reviewData.reviewRating = "";
						reviewData.reviewUserName = "";
						reviewData.reviewUserSummery = "";
						reviewData.reviewUserMobile = "";
						reviewData.reviewUserComment = "";
						$scope.hideErrorMsgs = true;
						//$scope.isReview = '';

						alert('Thanks for Review.... Your comment will be updated in 48 hours.');
						//$scope.reviewData ={};

						$window.scrollTo(0, 0);

						$window.location.reload();
					} else {
						alert(data.data.success)
					}
				});
			} else {
				$scope.showlogindiv = true;
				$scope.showReview = false;
			}
			// }

		};

		$scope.showReferalEmail = false;
		$scope.showPlzLogin = false;
		$scope.checkIsCustomer = function () {
			if (window.localStorage['token']) {
				$scope.showReferalEmail = true;
				$scope.showPlzLogin = false;
			} else {
				$scope.showReferalEmail = false;
				$scope.showPlzLogin = true;
			}
		}

		$scope.decreaseValue = function (cartItem) {
			if (cartItem.qty > 1) {
				cartItem.qty--;
			}
		}

		$scope.increaseValue = function (cartItem) {
			// alert(typeof(cartItem.qty))
			cartItem.qty++;
			//alert(cartItem.qty)
		}

		$scope.emailtoFriend = function (referalEmail, product, productImg) {
			//	$scope.userEmail = window.localStorage['email'];
			referralEmailservice.sendEmailMethod(referalEmail, product, window.localStorage['email'], productImg).then(function (data) {
				if (data.data.status == 'Data Saved Successfully.') {
					alert('Email sent Successfully');
				} else {
					alert(data.data.status)
				}
				$scope.showReferalEmail = false;
			})
		}

		$rootScope.cartArray = cartArray;

		$scope.viewCartItems = function () {
			// if (localStorage.getItem('randomNumber')) {
			// 	viewCartService.cartItemsWithLoginMethod(window.localStorage['user_id'], localStorage.getItem('randomNumber')).then(function (data) {
			// 		//console.log('1'+JSON.stringify(data))
			// 		if (data.data.status == 'success') {
			// 			$rootScope.cartArray = data.data.total_item_list;
			// 			$scope.orderId = data.data.orderid;
			// 			window.localStorage['orderId'] = $scope.orderId;
			// 			localStorage.removeItem('randomNumber');
			// 		} else {
			// 			//alert(data.data.status);
			// 		}
			// 	})
			// } else {
				viewCartService.viewCartMethod(window.localStorage['user_id']).then(function (data) {
					//console.log('1'+JSON.stringify(data))
					if (data.data.status == 'success') {
						$rootScope.cartArray = data.data.item_list;
						$scope.orderId = data.data.orderid;
						window.localStorage['orderId'] = $scope.orderId;
					} else {
						//alert(data.data.status);
					}
				})
			// }

		}

		$scope.isReview = localStorage.getItem('isReviewStatus');

		$scope.token = window.localStorage['token'];

		if ($scope.isReview == 'review') {
			if (window.localStorage['token']) {
				$scope.showReviewTab = 'true';
				// 	 $('html,body').animate({
				// scrollTop: $(".second").offset().top},'slow');
			} else {
				$scope.showReviewTab = 'false';
			}

		} else {
			$scope.showReviewTab = 'false';
		}

		//alert(window.localStorage['token'])

		//alert($scope.isReview)

		$scope.reviewOpen = function () {
			$scope.isReview = 'review';
		}

		$scope.getCartItemsWithoutLogin = function () {

			viewCartService.cartItemsWithoutLoginMethod(localStorage.getItem('randomNumber')).then(function (data) {

				//console.log('1'+JSON.stringify(data))

				if (data.data.status == 'success') {

					$rootScope.cartArray = data.data.item_list;

					// localStorage.setItem('localCartArray', JSON.stringify(data.data.item_list));

					$scope.orderId = data.data.orderid;

					window.localStorage['orderId'] = $scope.orderId;

				} else {

					//alert(data.data.status);

				}

			})

		}


if(window.localStorage['user_id']){
$scope.viewCartItems();
}else{
$scope.getCartItemsWithoutLogin();
}
		
		

		$scope.productQty = function(cartItem){
			//alert(qty)
		if(cartItem.qty == 0){
			alert('Please enter valid quantity')
			cartItem.qty = 0;
		}else{
			cartItem.qty = cartItem.qty;
		}
			
		}


		$scope.changeQty = function (cartObj) {
				//console.log(cartObj)
			if ($scope.cartItem.qty != 0 && $scope.cartItem.qty !=undefined) {
				//alert($scope.qty)
				if (window.localStorage['token']) {
					$scope.productObj = {};
					$scope.productObj = cartObj;
					if ($rootScope.cartArray.length > 0) {
						$scope.orderArray = [];
						$scope.orderArray.push({ "productdescription": $scope.productObj.upload_name, "qty": JSON.stringify($scope.cartItem.qty) })
						//console.log(JSON.stringify($scope.orderArray))
						$rootScope.orderArray = $scope.orderArray.concat($rootScope.cartArray)
					} else {
						$scope.orderArray = [];
						$scope.orderArray.push({ "productdescription": cartObj.upload_name, "qty": JSON.stringify($scope.cartItem.qty) })
						$rootScope.orderArray = $scope.orderArray
					}
					console.log(JSON.stringify($rootScope.orderArray))
					addToCartService.addToCartMethod($rootScope.orderArray, window.localStorage['user_id']).then(function (data) {
						if (data.data.status == 'item added to cart') {

							$("#addedToCart").modal('show');
							window.localStorage['orderId'] = data.data.orderid;
							$scope.viewCartItems();

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
						$rootScope.cartArray.push({ "productdescription": cartObj.upload_name, "qty": JSON.stringify($scope.cartItem.qty) });
						$scope.orderArrayList = $rootScope.cartArray;
					} else {
						$scope.orderArrayList.push({ "productdescription": cartObj.upload_name, "qty": JSON.stringify($scope.cartItem.qty) });
					}
					localStorage.setItem('localCartArrayList', JSON.stringify($scope.orderArrayList));
					$scope.localCartArrayList = JSON.parse(localStorage.getItem('localCartArrayList'));
					addToCartService.initiateCartOrders($scope.userId, $scope.randomNumber, $scope.orderArrayList).then(function (data) {
						// alert(JSON.stringify(data))
						if (data.data.status == 'item added to cart') {
							$scope.random_no = data.data.random_number;
							localStorage.setItem('randomNumber', $scope.random_no);
							$("#addedToCart").modal('show');
						} else if (data.data.status == 'item added to cart..') {
							$("#addedToCart").modal('show');
						} else {
							alert(data.data.status);
						}
						$scope.getCartItemsWithoutLogin();
					})
				}

			}else if($scope.cartItem.qty == 0 || $scope.cartItem.qty == undefined){
				alert('Please enter valid quantity')
			}
			 else {
				alert('Please enter valid quantity')
			}
		}

		$scope.imgArray = {
			"img": 'https://s3.ap-south-1.amazonaws.com/gstbucket1/web/530X400/1.jpg', 'extraimages': [{ "img": 'https://s3.ap-south-1.amazonaws.com/gstbucket1/web/100X100/1.jpg' },
			{ "img": 'https://s3.ap-south-1.amazonaws.com/gstbucket1/web/100X100/2.jpg' }, { "img": 'https://s3.ap-south-1.amazonaws.com/gstbucket1/web/100X100/3.jpg' }, { "img": 'https://s3.ap-south-1.amazonaws.com/gstbucket1/web/100X100/4.jpg' }]
		}

		$scope.replaceSelectedImg = function (img) {
			//alert(JSON.stringify(img))
			$scope.brandDetailDescArray.upload_photo = img;
			$scope.showVideo = false;
		}

		$scope.showVideo = false;

		$scope.replaceSelectedVideo = function(){
			$scope.showVideo = true;
			// $scope.brandDetailDescArray.upload_photo = '../../images/movie.mp4';
		}

     // $i=$scope.brandDetailDescArray.extraimages.length;
		$scope.rightarrow=function(openimage){
			//alert("hai")
			//alert(openimage)
			$scope.brandDetailDescArray.extraimages.length;
				//  alert($scope.brandDetailDescArray.extraimages.length)
				  $scope.modelextraimages=$scope.brandDetailDescArray.extraimages;
//findIndex
//alert($scope.modelextraimages.indexOf($rootScope.openimage.replace('1000X1000','100X100')))
					if($scope.modelextraimages.indexOf(openimage.replace('1000X1000','100X100')) <= $scope.modelextraimages.length){
						alert($scope.modelextraimages.indexOf(openimage)+1)
						$scope.openimage=$scope.modelextraimages.indexOf(openimage)+1;
						alert($scope.openimage)
						$rootScope.openimage = $scope.modelextraimages[$scope.openimage].replace('100X100', '1000X1000');
						alert($rootScope.openimage)
					}
					
				//	alert($scope.openimage)
				// $scope.modelextraimages.length--;
	         //alert($scope.brandDetailDescArray.extraimages.length--)
		}

		$scope.openImg = function (img) {
		//	alert(JSON.stringify(img))
			$rootScope.openimage = img.upload_photo.replace('100X100', '1000X1000');
			//alert($rootScope.openimage)
			//$scope.openimage = $scope.openimage.replace('jpg','PNG')
			$("#openImg").modal('show');
		}


	});