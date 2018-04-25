shopMyToolsApp.controller('netbankingcontroller',['$scope','$rootScope',function($scope,$rootScope){
    //  alert("hai")

    $rootScope.seo={tags:"Internet Banking | Shopmytools.com",keywords:"credit card processing, merchant services, net banking, netbank, netbank online banking, online banking, online net banking, online payment gateway, payment gateway, payment processing"
,metadescription:"ShoMyTools provides PayUmoney as a payment gateway. This helps users to make a secured and safe transaction through any of the 51 banks that are listed on our portal.", metatitle:"Internet Banking | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



