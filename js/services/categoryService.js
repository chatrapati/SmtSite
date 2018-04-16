shopMyToolsApp.service('product_categories_service', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.getAllCategoriesOfProduct = function (categoryName,subCategoryName,fromVal,toVal) {
        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: PRODUCT_CATEGORY_SERVICE+'/categoryproducts',
           //url: PRODUCT_CATEGORY_SERVICE+'/categoryproducts?category='+categoryName,
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
			data:{"category":categoryName,"subcategory":[subCategoryName], "from":fromVal ,"to":toVal } 
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('product_subcategories_filter', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.getAllCategoriesFilterOfProduct = function (category,subCategoryName,brandName,pricerange,fromVal,toVal,val) {
        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: PRODUCT_CATEGORY_SERVICE+'/categoryproducts',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
	 data:{"category":category,"subcategory":subCategoryName,"brand":brandName,"pricerange":pricerange,"from":fromVal ,"to":toVal,val} 
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('brandProductsService', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.brandProductsMethod = function (brandName) {
        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: PRODUCT_CATEGORY_SERVICE+'/brandproducts?brand='+brandName,
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'}
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

shopMyToolsApp.service('contactUsService', function ($q, $http,SERVER_URL1) {

    this.contactUSMethod = function (contactData) {
        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: SERVER_URL1+'/contactus',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
			data:{"from_":contactData.email,"message":contactData.message,"to":contactData.usertype,"subject":contactData.subject} 
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});