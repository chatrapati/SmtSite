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
            // if(data.status == 500){
            //     alert('Some issue')
            // }
            deferred.reject(data);
        });
        return deferred.promise;
    };	


//  this.getAllCategoriesOfProduct = function (categoryName,subCategoryName,fromVal,toVal) {
//         var deferred = $q.defer();
		
//         $http({
//             method: 'POST',
//             url: PRODUCT_CATEGORY_SERVICE+'/productlist',
//            //url: PRODUCT_CATEGORY_SERVICE+'/categoryproducts?category='+categoryName,
//             headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
// 			data:{"category":categoryName,"subcategory":[subCategoryName], "from":fromVal ,"to":toVal } 
           
//         }).then(function success(data) {
//             deferred.resolve(data);
//         }, function error(data) {
//             deferred.reject(data);
//         });
//         return deferred.promise;
//     };	





});	

shopMyToolsApp.service('product_subcategories_filter', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.getAllCategoriesFilterOfProduct = function (category,subCategoryName,brandName,pricerange,fromVal,toVal,val,warranty,percent,brandFlag) {
        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: PRODUCT_CATEGORY_SERVICE+'/categoryproducts',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
     data:{"category":category,"subcategory":subCategoryName,"brand":brandName,"pricerange":pricerange,"from":fromVal ,
      "to":toVal,"val":val,"warranty":warranty,"percentage":percent,"brandFlag":brandFlag} 
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	

//  this.getAllCategoriesFilterOfProduct = function (category,subCategoryName,brandName,pricerange,fromVal,toVal,val) {
//         var deferred = $q.defer();
		
//         $http({
//             method: 'POST',
//             url: PRODUCT_CATEGORY_SERVICE+'/productlist',
//             headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
// 	 data:{"category":category,"subcategory":subCategoryName,"brand":brandName,"pricerange":pricerange,"from":fromVal ,"to":toVal,val} 
           
//         }).then(function success(data) {
//             deferred.resolve(data);
//         }, function error(data) {
//             deferred.reject(data);
//         });
//         return deferred.promise;
//     };	


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


shopMyToolsApp.service('todayDealsservice', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.todaydeals = function () {
        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: PRODUCT_CATEGORY_SERVICE+'/dealsproducts?deals=Enable',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'}
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	

});




