
shopMyToolsApp.service('loginService', function ($q, $http, LOGIN_URL) {
	this.userAuthentication = function (username, password,ipAddress) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/userlogin',
			headers: { 'Content-Type': 'application/json', 'Authorization': btoa(username + ':' + password), 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			data:{"ip_address":ipAddress,"user_type":"web"}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getIPService', function ($q, $http) {
	this.getIpMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: 'https://freegeoip.net/json/',
			headers: { 'Content-Type': 'application/json' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('registrationService', function ($q, $http, LOGIN_URL,) {
	this.userRegistration = function (registrationData) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/userregistration',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			data: {
				"firstname": registrationData.firstname, "lastname": registrationData.lastname,
				"mobile":  registrationData.user_mobile, "email": registrationData.email, "password": registrationData.password,
				"confirm_password": registrationData.confirm_password, "newsletter": registrationData.newsletter,
				 "gstnumber": registrationData.gstnumber,"user_type":"web"
			}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.verifyOTP = function (otp, mobile,ip) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/verifyotp',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			data: { "mobile":  mobile, "otp": otp,"user_type":"web","ip_address":ip }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};


	this.resendOTP = function (userId) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/resendotp?user_id=' + userId,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};




})

shopMyToolsApp.service('logoutService', function ($q, $http, LOGIN_URL) {
	this.userLogout = function (token) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/logout',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "token": token }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getCouponService', function ($q, $http, LOGIN_URL) {
	this.getCouponMethod = function (couponCode, mobile) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/coupondata',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": mobile, "coupon_code": couponCode}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

	this.brandBasedCouponMethod = function (couponCode, mobile,orderList) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/coupondata',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": mobile, "coupon_code": couponCode,"item_list":orderList}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

		this.maxPurchasedCouponMethod = function (couponCode, mobile,amount) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/coupondata',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "user_id": mobile, "coupon_code": couponCode,"purchase_value":amount}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getDealersListService', function ($q, $http, LOGIN_URL) {
	this.getDealersListMethod = function (latLong,pincode) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: LOGIN_URL + '/dealerlist',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "lat_long": latLong ,"pincode":pincode}

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getpayuDetailsService', function ($q, $http, LOGIN_URL) {
	this.getpayuDetailsMethod = function () {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/payudata',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'payu_secret_key': '4r5s@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('getDealersBasedOnLatLongService', function ($q, $http, LOGIN_URL) {
	this.getDealersBasedOnLatLongMethod = function (latLong) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: LOGIN_URL + '/latlong?lat_long=' + latLong,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

		}).then(function success(data) {
			deferred.resolve(data);

		}, function error(data) {
			deferred.reject(data);

		});

		return deferred.promise;
	};

})

shopMyToolsApp.service('dashBoardOrdersCountService', function ($q, $http, LOGIN_URL) {
	this.ordersCountMethod = function (email, mobile,userId) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: LOGIN_URL + '/orderscount',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "email": email, "mobile": mobile ,"user_id":userId}
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});

shopMyToolsApp.service('saveOrderService', function ($q, $http, LOGIN_URL) {
	this.saveOrderMethod = function (orderArray) {
		// alert(orderArray)
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: LOGIN_URL + '/checkout',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: orderArray
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});

shopMyToolsApp.service('getPincodeStatusService', function ($q, $http, LOGIN_URL) {
	this.getPincodeStatusMethod = function (pincode) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: LOGIN_URL + '/pincode?pincode=' + pincode,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: orderArray
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});

shopMyToolsApp.service('forgotPaswdService', function ($q, $http, LOGIN_URL) {
	this.forgotPswdMethod = function (email) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: LOGIN_URL + '/forgotpwd',
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "username": email }
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};

	this.forgotPswdOtpMethod = function (mobile,otp) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: LOGIN_URL + '/forgotpwd?username='+mobile+'&otp='+otp,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});

shopMyToolsApp.service('resetPaswdService', function ($q, $http, LOGIN_URL) {
	this.resetPswdMethod = function (userId, newPswd, confirmPswd,timeStamp) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: LOGIN_URL + '/resetpassword?user_id=' + userId,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: { "new_password": newPswd, "confirm_password": confirmPswd,"time_stamp":timeStamp }
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});



shopMyToolsApp.service('paymentStatusService', function ($q, $http, LOGIN_URL) {
	this.paymentStatusMethod = function (orderid,userId, username, password) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: LOGIN_URL + '/paymentstatus?orderid=' + orderid+'&user_id='+userId,
			headers: { 'Content-Type': 'application/json', 'Authorization': btoa(username + ':' + password), 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});

shopMyToolsApp.service('userdataUpdateService', function ($q, $http, LOGIN_URL) {
	this.updateuserData = function (editData, userId) {
		var deferred = $q.defer();
		$http({
			method: 'PUT',
			url: LOGIN_URL + '/smtaccountinfo?id='+userId,
			headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
			data: {
				"firstname": editData.first_name, "lastname": editData.last_name,
				"mobile": editData.mobile
			}
		}).then(function success(data) {
			deferred.resolve(data);
		}, function error(data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};
});



