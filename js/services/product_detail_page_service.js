shopMyToolsApp.service('product_detailed_service', function ($q, $http, PRODUCT_DETAIL_SERVICE) {

    this.getAllDetailsOfProduct = function (productName) {

        var deferred = $q.defer();
      
        $http({
            method: 'GET',
          	url: PRODUCT_DETAIL_SERVICE+'/productdetails?product_name='+productName,
            headers: { 'Content-Type': 'application/json' ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',"secret_key":"4r5t@W"}          
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('notify_service', function ($q, $http,PRODUCT_DETAIL_SERVICE) {

    this.notifyMethod = function (email,uploadName) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
			url: PRODUCT_DETAIL_SERVICE+'/notify',			
            headers: { 'Content-Type': 'application/json' ,"secret_key":"4r5t@W",'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:{"productname":uploadName,"email":email}
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('reviews_service', function ($q, $http,PRODUCT_DETAIL_SERVICE) {

    this.reviewsMethod = function (riviewRating,userName,reviewSummery,mobileNumber,ratingComments,productDescription,userId) {

        var deferred = $q.defer();
		
	
        $http({
            method: 'POST',
			url: PRODUCT_DETAIL_SERVICE+'/reviews',			
            headers: { 'Content-Type': 'application/json' ,"secret_key":"4r5t@W",'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:{"rating":riviewRating,"user_name":userName,"review":reviewSummery,"mobile_number":mobileNumber,"rating_comments":ratingComments,"user_id":userId,"prod_desc":productDescription}
			//alert(url);
		
			
        }).then(function success(data) {			
			deferred.resolve(data);
        }, function error(data) {
			deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('referralEmailservice', function ($q, $http,PRODUCT_DETAIL_SERVICE) {

    this.sendEmailMethod = function (referalEmail,product,userEmail,productImg) {

        var deferred = $q.defer();
		
	
        $http({
            method: 'POST',
			url: PRODUCT_DETAIL_SERVICE+'/refer',			
            headers: { 'Content-Type': 'application/json' ,"secret_key":"4r5t@W",'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:{"prod_name":product,"email":userEmail,"refer_email":referalEmail,"prod_photo":productImg}
			
        }).then(function success(data) {			
			deferred.resolve(data);
        }, function error(data) {
			deferred.reject(data);
        });
        return deferred.promise;
    };	
});