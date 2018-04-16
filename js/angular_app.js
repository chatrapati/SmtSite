var shopMyToolsApp = angular.module('shopMyTools', ['ngRoute', 'ui.bootstrap', 'angular.filter', 'ngMessages', 'slickCarousel','simplePagination']);

/* currency controller code start here 16-1-2018  */
shopMyToolsApp.filter('noFractionCurrency',
  ['$filter', '$locale', function (filter, locale) {
    var currencyFilter = filter('currency');
    var formats = locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      var value = currencyFilter(amount, currencySymbol);
      var sep = value.indexOf(formats.DECIMAL_SEP);
      // console.log(formats.DECIMAL_SEP);
      if (amount >= 0) {
        return value.substring(0, sep);
      }
      return value.substring(0, sep) + ')';
    };
  }]);
/* currency controller code end here 16-1-2018  */

shopMyToolsApp.filter('slice', function () {
  return function (arr, start, end) {
    return arr.slice(start, end);
  };
});

shopMyToolsApp.directive('ngElevateZoom', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      console.log("Linking")
     //  element.addClass('zoomWindowContainer x');
      //Will watch for changes on the attribute
      attrs.$observe('zoomImage', function () {
        linkElevateZoom();
      })

      function linkElevateZoom() {
        //Check if its not empty
        if (!attrs.zoomImage) return;
        element.attr('data-zoom-image', attrs.zoomImage);
        //console.log(element)
        console.log(attrs.zoomImage)
        $(element).elevateZoom();
      }

      linkElevateZoom();

    }
  };
});


shopMyToolsApp.directive('carouselNext', function () {
  return {
    restrict: 'A',
    scope: {},
    require: ['^carousel'],
    link: function (scope, element, attrs, controllers) {
      var carousel = controllers[0];
      function howIsNext() {
        if ((carousel.indexOfSlide(carousel.currentSlide) + 1) === carousel.slides.length) {
          return 0;
        } else {
          return carousel.indexOfSlide(carousel.currentSlide) + 1;
        }
      }
      element.bind('click', function () {
        carousel.select(carousel.slides[howIsNext()]);
      });
    }
  };
});

shopMyToolsApp.directive('carouselPrev', function () {
  return {
    restrict: 'A',
    scope: {},
    require: ['^carousel'],
    link: function (scope, element, attrs, controllers) {
      var carousel = controllers[0];
      function howIsPrev() {
        if (carousel.indexOfSlide(carousel.currentSlide) === 0) {
          return carousel.slides.length;
        } else {
          return carousel.indexOfSlide(carousel.currentSlide) - 1;
        }
      }
      element.bind('click', function () {
        carousel.select(carousel.slides[howIsPrev()]);
      });
    }
  };
});




    

shopMyToolsApp.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'home.html'

      })

      .when('/invoiceOrders', {
        templateUrl: 'invoiceOrders.html'
      })
      .when('/dashboard', {
        templateUrl: 'dashboard.html'
      })
      .when('/checkout', {
        templateUrl: 'checkoutPage.html'
      })
      .when('/compareProducts', {
        templateUrl: 'compareProducts.html'
      })
      .when('/brandPage', {
        templateUrl: 'brandPage.html'
      })

      .when('/searchPage', {
        templateUrl: 'search.html'
      })
      .when('/searchPage1', {
        templateUrl: 'search1.html'
      })
      .when('/payu', {
        templateUrl: 'payu_biz.html'
      })
      .when('/collections', {
        templateUrl: 'collections.html'
      })
      .when('/emergingBrands', {
        templateUrl: 'emergingBrands.html'
      })
      .when('/addressBook', {
        templateUrl: 'addressBook.html'
      })
      .when('/addAddress', {
        templateUrl: 'addAddress.html'
      })
      .when('/editAccount', {
        templateUrl: 'editAccount.html'
      })
      .when('/productDetailPage', {
        templateUrl: 'brand_Detail_Page.html'
      })
      .when('/categoryPage', {
        templateUrl: 'categories_page.html'
      })
      .when('/categoryPage1', {
        templateUrl: 'categories_page1.html'
      })
      .when('/myorders', {
        templateUrl: 'myorders.html'
      })
      .when('/pendingOrders', {
        templateUrl: 'pendingorders.html'
      })
      .when('/wishlist', {
        templateUrl: 'wishlist.html'
      })
      .when('/invoice', {
        templateUrl: 'invoice.html'
      })
      .when('/viewCart', {
        templateUrl: 'viewCart.html'
      })
      .when('/topBrands', {
        templateUrl: 'topbrands.html'
      })
      .when('/resetPassword', {
        templateUrl: 'resetPassword.html'
      })
      .when('/deals', {
        templateUrl: 'deals.html'
      })
      .when('/coupons', {
        templateUrl: 'coupons.html'
      });
    // .otherwise({
    //   redirectTo: '/'
    // });


    //      $locationProvider
    // .html5Mode(true);

    //  $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

  }]);

//     function mainController($scope) { 
//   // We will create an seo variable on the scope and decide which fields we want to populate 
//   $scope.seo = { 
//     pageTitle : '', pageDescription : '' 
//   }; 
// }


shopMyToolsApp.directive('starRating', starRating);

// function RatingController() {
//   this.rating1 = 5;
//   this.rating2 = 2;
//   this.isReadonly = true;
//   this.rateFunction = function(rating) {
//     console.log('Rating selected: ' + rating);
//   };
// }

function starRating() {
  return {
    restrict: 'EA',
    template:
      '<div class="star-rating" ng-class="{readonly: readonly}">' +
      '  <span ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
      '    <i class="fa fa-star"></i>' + // or &#9733
      '  </span>' +
      '</div>',
    scope: {
      ratingValue: '=ngModel',
      max: '=?', // optional (default is 5)
      onRatingSelect: '&?',
      readonly: '=?'
    },
    link: function (scope, element, attributes) {
      if (scope.max == undefined) {
        scope.max = 5;
      }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };
      scope.toggle = function (index) {
        if (scope.readonly == undefined || scope.readonly === false) {
          scope.ratingValue = index + 1;
          scope.onRatingSelect({
            rating: index + 1
          });
        }
      };
      scope.$watch('ratingValue', function (oldValue, newValue) {
        if (newValue || newValue === 0) {
          updateStars();
        }
      });
    }
  };
}
shopMyToolsApp.directive("outsideClick", ['$document', '$parse', function ($document, $parse) {
  return {
    link: function ($scope, $element, $attributes) {

      var scopeExpression = $attributes.outsideClick,
        onDocumentClick = function (event) {

          // check for flag
          if (!$scope.closeFlag) {
            $scope.closeFlag = true;
            return;
          }


          var parent = event.target;

          while (parent && parent !== $element[0]) {
            parent = parent.parentNode;
          }

          if (!parent) {
            $scope.$apply(scopeExpression);
          }
        }

      $document.on("click", onDocumentClick);

      $element.on('$destroy', function () {
        $document.off("click", onDocumentClick);
      });
    }
  }
}]);

shopMyToolsApp.filter('titleCase', function () {
  return function (input) {
    input = input || '';
    return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };
});

shopMyToolsApp.directive('myEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.myEnter);
        });

        event.preventDefault();
      }
    });
  };
});

shopMyToolsApp.directive('ngRightClick', function ($parse) {
  return function (scope, element, attrs) {
    var fn = $parse(attrs.ngRightClick);
    element.bind('contextmenu', function (event) {
      scope.$apply(function () {
        event.preventDefault();
        fn(scope, { $event: event });
      });
    });
  };
});

shopMyToolsApp.directive('loading', function () {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="loading"><img class="loading_img" src="./images/loadingImg.gif" width="100" height="100" /></div>',
    link: function (scope, element, attr) {
      scope.$watch('loading', function (val) {
        if (val)
          $(element).show();
        else
          $(element).hide();
      });
    }
  }
})

var cartArray = [], compareProducts = [], dealProductPrice = [];

var localCartArray = [];

var orderArray = [];

/*!
	ZoomPan
	license: MIT
*/
// var zoomPan =
// 	angular.module('zoomPanApp',[]);
	
/*
***************************************
***********ZOOMPAN DIRECTIVE**************
***************************************
*/
shopMyToolsApp.directive('zoom', function($window) {

	function link(scope, element, attrs) {

		//SETUP

		var frame, image, zoomlvl, fWidth, fHeight, rect, rootDoc, offsetL, offsetT, xPosition, yPosition, pan;
		//Template has loaded, grab elements.
        scope.$watch('$viewContentLoaded', function()
        {
           frame = angular.element(document.querySelector("#"+scope.frame))[0];
           image = angular.element(document.querySelector("#"+scope.img))[0];
           
           zoomlvl = (scope.zoomlvl === undefined) ? "2.5" : scope.zoomlvl
        });



		//MOUSE TRACKER OVER IMG
		scope.trackMouse = function($event) {
					
			fWidth = frame.clientWidth;
			fHeight = frame.clientHeight;
			
			rect = frame.getBoundingClientRect();
			rootDoc = frame.ownerDocument.documentElement;
			
			//calculate the offset of the frame from the top and left of the document
			offsetT = rect.top + $window.pageYOffset - rootDoc.clientTop
			offsetL = rect.left + $window.pageXOffset - rootDoc.clientLeft

			//calculate current cursor position inside the frame, as a percentage
			xPosition = (($event.pageX - offsetL) / fWidth) * 100
			yPosition = (($event.pageY - offsetT) / fHeight) * 100

			pan = xPosition + "% " + yPosition + "% 0";
			image.style.transformOrigin = pan;

		}
        
		//MOUSE OVER | ZOOM-IN
		element.on('mouseover', function(event) {
			image.style.transform = 'scale('+zoomlvl+')'
		})

		//MOUSE OUT | ZOOM-OUT
		element.on('mouseout', function(event) {
			image.style.transform = 'scale(1)'
		})


	}

	return {
		restrict: 'EA',
		scope: {
			src: '@src',
			frame: '@frame',
			img: '@img',
			zoomlvl: '@zoomlvl'
		},
		template: [
			'<div id="{{ frame }}" class="zoomPanFrame" >',
			'<img id="{{ img }}" class="zoomPanImage" ng-src= "{{ src }}" ng-mousemove="trackMouse($event)"></img>',
			'</div>'
		].join(''),
		link: link
	};
});




//facebook login oath\


// window.fbAsyncInit = function () {
//   FB.init({
//     appId: '165647687572004',
//     autoLogAppEvents: true,
//     xfbml: true,
//     version: 'v2.3',
//     status: true
//   });
// };

// (function (d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) { return; }
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
