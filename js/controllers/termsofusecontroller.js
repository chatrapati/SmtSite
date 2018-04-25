shopMyToolsApp.controller('termsofusecontroller',['$scope','$rootScope',function($scope,$rootScope){
    // alert("hai")

    $rootScope.seo={tags:"Term of Use | Shopmytools.com",keywords:"terms of use, terms and conditions, terms & conditions, terms of service, terms of agreement, terms and services",metadescription:"ShopMyTools is one stop destination for tools related to various brands. Now order and get lower prices with best discounts assured. Many deals and offers are available.", metatitle:"Term of Use | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



