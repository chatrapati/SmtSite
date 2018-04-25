shopMyToolsApp.controller('shippingcontroller',['$scope','$rootScope',function($scope,$rootScope){
    //  alert("hai")

    $rootScope.seo={tags:"Shipping | Shopmytools.com",keywords:"cheap shipping, next day delivery, shipping, shipping cost, shipping prices, shipping services"
,metadescription:"ShopMyTools delivers products at cheap shipping prices purchased through our online tools platform.", metatitle:"Shipping | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



