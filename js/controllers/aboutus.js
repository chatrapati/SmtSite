shopMyToolsApp.controller('aboutuscontroller',['$scope','$rootScope',function($scope,$rootScope,$window){
    // alert("hai")

    $rootScope.seo={tags:"About Us",keywords:"about us, about us page, it company about us, this is us, accessories, air tools, garden equipment, garden tools, hand tools, online tool store, power tools, power tools online, spares and accessories, tool store, tools, tools for sale, welding tools",metadescription:"Buy Power Tools, Hand Tools, Welding Tools, Garden Tools and Air tools. Spares and Accessories are also available. Get deals, offers and coupons from shopmytools.com", metatitle:"About Us - Online Tool Store|Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



