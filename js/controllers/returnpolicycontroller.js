shopMyToolsApp.controller('returnpolicycontroller',['$scope','$rootScope',function($scope,$rootScope,$window){
    // alert("hai")

    $rootScope.seo={tags:"Return Policy | Shopmytools.com",keywords:"buy store returns, product return policy, return policies, return policy, returns, store returns",metadescription:"ShopMyTools assures a Return Policy that is flexible for our users to exchange damaged products easier. We guarantee a 100% satisfaction for purchases made with us.", metatitle:"Return Policy | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



