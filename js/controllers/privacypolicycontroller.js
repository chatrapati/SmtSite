shopMyToolsApp.controller('privacypolicycontroller',['$scope','$rootScope',function($scope,$rootScope){
    //  alert("hai")

    $rootScope.seo={tags:"Privacy Policy - Terms & Conditions | Shopmytools.com",keywords:"privacy policy, privacy statement, website privacy policy, terms & conditions, privacy agreement, privacyterms, standard privacy policy for website, policy privacy, website privacy, email privacy policy, privacy policy statement, generic privacy policy, company privacy policy"
,metadescription:"ShoMyTools preserves the user information so secured after each transaction made online with standard privacy policy for website.", metatitle:"Privacy Policy - Terms & Conditions | Shopmytools.com"}
    $rootScope.pagetitle=$rootScope.seo.metatitle;
    $rootScope.metadescription=$rootScope.seo.metadescription;
    $rootScope.keywords=$rootScope.seo.keywords;

   // alert($rootScope.pagetitle)
}])



