shopMyToolsApp.controller('loginController', ['$scope', '$http', '$location',
  '$rootScope', 'loginService', 'registrationService', '$window', 'resetPaswdService', 'forgotPaswdService','DOMAIN_URL','getIPService',
  function ($scope, $http, $location, $rootScope, loginService, registrationService, $window, resetPaswdService,
     forgotPaswdService,DOMAIN_URL,getIPService) {
    

    if(localStorage.getItem('previousUrl')){
    //  alert(localStorage.getItem('previousUrl'))
      $scope.previousUrlArray = localStorage.getItem('previousUrl').split("#!/");

      $scope.previousUrl = $scope.previousUrlArray[1];
    
    }

    $scope.mobilenumbercheck=function(mobile){
    // alert(mobile)
      registrationService.mobilecheck(mobile).then(function(data){
        if(data.data.status=="email exists"){
          alert("Email id is already exists");
          $scope.registrationData.email="";

          var name =document.getElementById('email');
           if (name.value != ''){

               name.focus();
           }
                
        }else if(data.data.status=="mobile exists" ){
          alert("Mobile number is already exists");
          $scope.registrationData.user_mobile="";
           var mobileno = document.getElementById('user_mobile');
           if (mobileno.value != ''){

               mobileno.focus();
           }
        }
      
      })
    }

    $scope.forgetpasscheck=function(mobile){

      registrationService.mobilecheck(mobile).then(function(data){
        if(data.data.status=="email exists"){
        
              
        }else{
                alert("User is does't existed");
                var forgotPwdEmail =document.getElementById('forgotPwdEmail');
                $scope.forgotPwdEmail="";
               
              }
                
      
      })
    }


    $scope.doSomething=function(mobile){
       registrationService.mobilecheck(mobile).then(function(data){
        if(data.data.status=="email exists"){
             
        }else{
                alert("User is does't existed");
                var forgotPwdEmail =document.getElementById('forgotPwdEmail');
                $scope.forgotPwdEmail="";
                
              }
                
      
      })
    }
  
// $scope.fblogin=function(){

// //alert("hai");

//   FB.login(function(response) {

//     if (response.authResponse) {

//      console.log('Welcome!  Fetching your information.... ');

//      FB.api('/me','GET',{fields:'email,first_name,name,picture'}, function(response) {

//        console.log('Good to see you, ' + response.name + '.');

//        console.log("hai"+response.email);

//       console.log(response.picture);

//        console.log(response)

//      });

//     } else {

//      console.log('User cancelled login or did not fully authorize.');

//     }

// });

  

// }



 

  

    $scope.gmail={

      username:"",

      email:""



    }

    $scope.onGoogleLogin = function() {

     // alert("hai")



//     var loginFinished = function (authResult) {

//         alert("callback")

//         if (authResult) {

//         // alert( JSON.stringify(authResult));

//         }

// //alert("else")

//         // gapi.client.load('oauth2', 'v2', function () {

//         //   gapi.client.oauth2.userinfo.get()

//         //     .execute(function (resp) {

//         //       // Shows user email

//         //       console.log(resp.email);

//         //     });

//         // });



//       };



      

     var params={

        'clientid': '841631508277-30thh8fk90hkd129n2imk2lbhbcsatb7.apps.googleusercontent.com',

             'cookiepolicy': 'single_host_origin',

             // 'callback': loginFinished,

            // 'cookiepolicy': 'single_host_origin'

                'callback':function(result){

                  console.log(result);

                // alert(result);

                  if(result['status']['signed_in']){

                    var request= gapi.client.plus.people.get(

                      {

                        'userId':'me'

                      }

                    );

                    request.execute(function(response){

                     // alert(response)

                      $scope.$apply(function(){

                        $scope.gmail.username=response.displayName;

                        $scope.gmail.email=response.emails[0].value;

                        alert($scope.gmail.username)



                      })

                    })

                  }

                },

             

               'approvalprompt':'force',

                //  'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'

              'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

//  'requestvisibleactions': 'http://schemas.google.com/CommentActivity http://schemas.google.com/ReviewActivity',



            };

           gapi.auth.signIn(params);

    }


  $scope.getIpAddress = function(){
    $window.scrollTo(0, 0);
 getIPService.getIpMethod().then(function(data){
   // alert(JSON.stringify(data))
    $rootScope.ip = data.data.ip;
    //alert($rootScope.ip)
  })
  }

  $scope.getIpAddress();
 
  

    $scope.login = function (loginData) {
      if ($scope.loginForm.$valid) {
        if($rootScope.ip == undefined){
          $rootScope.ip = '';
        }
        loginService.userAuthentication(loginData.username, loginData.password, $rootScope.ip).then(function (data) {

          if (data.data.status == 'Success') {
            window.localStorage['token'] = data.data.token;
            window.localStorage['user_id'] = data.data.user_id;
            $scope.userName = data.data.username;
            window.localStorage['email'] = data.data.userinfo.email;
            window.localStorage['mobile'] = data.data.userinfo.user_mobile;
            window.localStorage['customermobile'] = data.data.userinfo.user_mobile;
            localStorage.setItem('userInfo', JSON.stringify(data.data.userinfo));
            // alert(data.data.GSTnumber)
            if(data.data.GSTnumber != null){
               localStorage.setItem('gstNumber',data.data.GSTnumber);
            }else if(data.data.GSTnumber==null){
              // alert("sruthi")
              localStorage.setItem('gstNumber','');
            }
           
            localStorage.setItem('shippingAddressInfo', JSON.stringify(data.data.shipping_address));
            localStorage.setItem('billingAddressInfo', JSON.stringify(data.data.billing_address));
            window.localStorage['user_name'] = $scope.userName;
            if($scope.previousUrl == 'viewCart'){
             $scope.currentUrl =  $scope.previousUrlArray[0].concat("#!/checkout");
             //alert($scope.currentUrl)
              window.location.href = $scope.currentUrl;
            }else{
               // window.location.href = "./index.html";
               window.location.href = DOMAIN_URL +"#!/dashboard";
            }
           

          } else {
            alert(data.data.status)
          }
        })
      }

    }

    $scope.backToLogin = function () {
      window.location.href = "login.html";
    }

    $scope.createAccount = function () {
      window.location.href = "registration.html";

    }

 

    $scope.register = function (registrationData) {

      $scope.otp = '';
if(!registrationData.gstnumber){
  registrationData.gstnumber = "";
}
   
     localStorage.setItem('userInfo', JSON.stringify(registrationData));
  
        if (registrationData.newsletter == true) {
          registrationData.newsletter = "checked";
        } else {
          registrationData.newsletter = "unchecked";
        }
     
        $rootScope.registrationData = registrationData;
         window.localStorage['mobile'] = $rootScope.registrationData.user_mobile;
       window.localStorage['customermobile'] = $rootScope.registrationData.user_mobile;
       
        registrationService.userRegistration($rootScope.registrationData).then(function (data) {
         
          if (data.data.status == 'Data saved successfully') {
            $("#otpmodal").modal('show');
           
          } else {
            alert(data.data.status)
          }
        })
     

    }

    $scope.gotoLogin = function () {
      $location.path("login");
    }

    $scope.goToHome = function () {

      window.location.href = "./index.html";
    }

    $scope.goToDashboard = function () {

      if (window.localStorage['token']) {
        $location.path("dashboard");

      }
      else {

        window.location.href = "./login.html";
      }
    }


    $scope.completeRegistrtion = function (otp) {
      if (otp == undefined) {
        $scope.error = true;
      } else {
        $scope.error = false;
        if(typeof($scope.otp) == 'string'){
           $scope.otp = otp
        }else{
          $scope.otp = JSON.stringify(otp)
        }
        
        registrationService.verifyOTP($scope.otp, window.localStorage['mobile'],$rootScope.ip).then(function (data) {
          if (data.data.status == 'Data saved successfully') {
             window.localStorage['token'] = data.data.token;
            window.localStorage['user_id'] = data.data.user_id;
        window.localStorage['email'] = $rootScope.registrationData.email;
        window.localStorage['user_name'] = $rootScope.registrationData.firstname;
        if($rootScope.registrationData.gstnumber != ''){
          localStorage.setItem('gstNumber', $rootScope.registrationData.gstnumber);
        }
            $("#otpmodal").modal('hide');
            window.location.href = "./index.html";
          } else if(data.data.status == 'Mobile no / email already exists..'){
            alert(data.data.status+'Please Login');
          }
          else {
            alert('Enter valid OTP')
          }
        })
      }

    }


    $scope.resendOTP = function () {
      registrationService.resendOTP(window.localStorage['user_id']).then(function (data) {
           alert(data.data.return)

      })
    }

    $scope.forgotPaswd = function (forgotPwdUsername) {
      window.localStorage['forgotPwdUsername'] = forgotPwdUsername;
      forgotPaswdService.forgotPswdMethod(forgotPwdUsername).then(function (data) {
      
        if(data.data.status == 'otp sent'){
          $("#forgotOtpModal").modal('show');
        }else if(data.data.status == 'email sent'){
          window.localStorage['time_stamp'] = data.data.time_stamp;
           alert(data.data.status)
        }
          else if(data.data.status=="email/mobile does not exists"){
            alert("User does't existed.Please register.")
          }
       

      })



    }



    $scope.otpForgotPwd = function(otp){
      forgotPaswdService.forgotPswdOtpMethod(window.localStorage['forgotPwdUsername'],otp).then(function(data){
       
       if(data.data.status == 'success'){
      
      localStorage.setItem('userId',data.data.user_id); 
         window.location.href = DOMAIN_URL+"resetPassword.html#!/";
       }else{
         alert(data.data.status)
       }
      })
    }





     $scope.inputType = 'password';
  $scope.inputType1 = 'password';
  $scope.inputType2='password';
  // Hide & show password function
    $scope.eye='fa fa-eye';
  $scope.toggleShowPassword = function(){
  //alert("asdf");
    if ($scope.inputType == 'password'){
      $scope.inputType = 'text';
        $scope.eye='fa fa-eye-slash';
    }
    else{
      $scope.inputType = 'password';
      $scope.eye='fa fa-eye';
    }
  };

 $scope.eye1='fa fa-eye';
   $scope.toggleShowPassword1 = function(){
  //alert("asdf");
    if ($scope.inputType1 == 'password'){
      $scope.inputType1 = 'text';
      $scope.eye1='fa fa-eye-slash';
    }
    else{
      $scope.inputType1 = 'password';
       $scope.eye1='fa fa-eye';
    }
  };



   $scope.eye2='fa fa-eye';
$scope.toggleShowPassword3=function(){
   if ($scope.inputType2 == 'password'){
      $scope.inputType2 = 'text';
      $scope.eye2='fa fa-eye-slash';
    }
    else{
      $scope.inputType2 = 'password';
       $scope.eye2='fa fa-eye';
    }
}




    $scope.resetPassword = function (data) {
 
      $scope.newPswd = data.newPassword;
  
      $scope.confirmPswd = data.confirmPassword;
      if(window.localStorage['user_id']){
          $scope.userId = window.localStorage['user_id'];
          $scope.timeStamp = "";
      }else{
         $rootScope.urlString = window.location.href;
      $rootScope.url = $rootScope.urlString;
      $scope.userArray = $rootScope.url.split("#!/");
         
         if($scope.userArray[1] != ''){
          $scope.userId = $scope.userArray[1];
          $scope.mobile = '';
          $scope.timeStamp = window.localStorage['time_stamp'];
         }else{
           $scope.userId  = '';
            $scope.mobile =  window.localStorage['forgotPwdUsername'];
            $scope.timeStamp = '';
         }
           
      }
     
      if($scope.resetForm.$valid){
        if ($scope.newPswd == $scope.confirmPswd) {
          resetPaswdService.resetPswdMethod($scope.userId, $scope.newPswd, $scope.confirmPswd,$scope.timeStamp,$scope.mobile).then(function (data) {
            if(data.data.status == 'password changed successfully'){
               window.location.href = "./index.html";
            }else{
              alert(data.data.status)
            }
           
           
          })
        } else {
          alert('New Password and Confirm Password should be same');
        }
      }

    }


  }]);
