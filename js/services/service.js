shopMyToolsApp.service('getHeaderService', function ($q, $http, SERVER_URL1) {
	this.headerMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/headerservice',
			headers: { 'Content-Type': 'application/json', "secret_key": "4r5t@W", 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getFooterService', function ($q, $http, SERVER_URL1) {
	this.footerMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/footerservice',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getAllCategoriesService', function ($q, $http, SERVER_URL1) {
	this.getCategoriesMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/categories',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('searchProductsService', function ($q, $http, SERVER_URL1) {
	this.searchProductsMethod = function (productName) {
		// alert(productName)
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: SERVER_URL1 + '/matchprod',
			// url: SERVER_URL1 +'/match_product_test',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			 data:{"product_name":productName}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('searchProductsMoreService', function ($q, $http, SERVER_URL1) {
	this.searchProductsMoreMethod = function (productName) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: SERVER_URL1 + '/searchproduct',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data:{"product_name":productName}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

// shopMyToolsApp.service('searchCategoryService',function($q, $http,SERVER_URL1){
//     this.searchCategoryMethod = function (category) {
// 			var deferred = $q.defer();

// 			$http({
// 				method: 'GET',
// 				url:SERVER_URL1+'/searchproductsservice?category='+category,
// 				headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}		

// 			}).then(function success(data) {
// 				deferred.resolve(data);

// 			}, function error(data) {
// 				deferred.reject(data);

// 			});

// 			return deferred.promise;
// 		};

// })

shopMyToolsApp.service('homePageService', function ($q, $http, SERVER_URL) {
	this.homePageMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL + '/homepage',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('allOffersService', function ($q, $http, SERVER_URL) {
	this.allOffersMethod = function (subCatObj) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL + '/offerscats?upload_subcategory=' + subCatObj,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('allNewArrivalsService', function ($q, $http, SERVER_URL) {
	this.allNewArrivalsMethod = function (subCatObj) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL + '/newarrivalcats?upload_subcategory=' + subCatObj,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})





shopMyToolsApp.service('compareProductsService', function ($q, $http, SERVER_URL1) {
	this.compareProductsMethod = function (compareProductList,userID) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: SERVER_URL1 + '/productdetails',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "product_name": compareProductList ,"user_id":userID}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('addCompareProductsService', function ($q, $http, SERVER_URL1) {
	this.compareProductsMethod = function (compareProductList,userID) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: SERVER_URL1 + '/add_compare_product',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "product_name": compareProductList ,"user_id":userID}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.getCompareProductsMethod = function (userID) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: SERVER_URL1 + '/comp_prod_details?user_id='+userID,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }
		//	data: { "product_name": compareProductList ,"user_id":userID}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.delCompareProductsMethod = function (productName,userID,clear) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: SERVER_URL1 + '/comp_prod_delete?compare_products='+clear,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "product_name": productName ,"user_id":userID}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};



})

shopMyToolsApp.service('addToWishListService', function ($q, $http, SERVER_URL1) {
	this.addToWishListMethod = function (userId, productName) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: SERVER_URL1 + '/wishlist',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": userId, "product_name": productName }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('removeWishListItemService', function ($q, $http, SERVER_URL1) {
	this.removeWishListItemMethod = function (userId, productName) {
		var deferred = $q.defer();

		$http({
			method: 'DELETE',
			url: SERVER_URL1 + '/delproduct',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": userId, "product_name": productName }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});



shopMyToolsApp.service('addToCartService', function ($q, $http, LOGIN_URL) {
	this.addToCartMethod = function (orderArray, userId) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/initiateorder',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "orderitem": orderArray, "order_status": "init", "user_id": userId }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.initiateCartOrders = function (userId, randomNo, orderArray) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/initiateorder',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": userId, "random_no": randomNo, "orderitem": orderArray }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('viewCartService', function ($q, $http, LOGIN_URL) {
	this.viewCartMethod = function (userid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/initiateorder?userid=' + userid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.cartItemsWithoutLoginMethod = function (randomNo) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/initiateorder?random_no=' + randomNo,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.cartItemsWithLoginMethod = function (userId, randomNo) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/initiateorder?userid=' + userId + '&random_no=' + randomNo,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('deleteCartService', function ($q, $http, LOGIN_URL) {
	this.deleteCartMethod = function (userid, productName) {
		var deferred = $q.defer();

		$http({
			method: 'DELETE',
			url: LOGIN_URL + '/initiateorder?userid=' + userid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "product": productName }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('myOrdersService', function ($q, $http, SERVER_URL1) {
	this.myOrdersMethod = function (userid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/yourorders?user_id=' + userid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.cancelOrderMethod = function (orderid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/cancel_order?orderid=' + orderid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('pendingOrdersService', function ($q, $http, SERVER_URL1) {
	this.pendingOrdersMethod = function (userid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/pendingorders?user_id=' + userid + '&status=pending',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('inVoiceService', function ($q, $http, SERVER_URL1, $rootScope, $location) {
	this.inVoiceMethod = function (userid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/invoices?user_id=' + userid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.completeOrdersMethod = function (orderId) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/order_data?orderid=' + orderId,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);


		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});


shopMyToolsApp.service('wishListService', function ($q, $http, SERVER_URL1) {
	this.yourWishlistMethod = function (userid) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL1 + '/yourwishlist?user_id=' + userid,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

});

shopMyToolsApp.service('headerSliderService', function ($q, $http, SERVER_URL) {
	this.slidersfun = function (subCatObj) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: SERVER_URL + '/homepage',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

// shopMyToolsApp.service('userdataUpdateService', function ($q, $http, SERVER_URL1) {
// 	this.updateuserData = function (editData, userId) {
// 		var deferred = $q.defer();

// 		$http({
// 			method: 'POST',
// 			url: SERVER_URL1 + '/user_data_update',
// 			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
// 			data: {
// 				"firstname": editData.first_name, "lastname": editData.last_name,
// 				"mobile": editData.mobile, "user_id": userId
// 			}

// 		}).then(function success(data) {
// 			deferred.resolve(data);

// 		}, function error(data) {
// 			deferred.reject(data);

// 		});

// 		return deferred.promise;
// 	};

// })




