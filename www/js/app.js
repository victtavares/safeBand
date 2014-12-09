// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
/*
angular.module('safeBand', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

*/


var app = angular.module('safeBand', [
  'ionic',
  "firebase",
  'controllers.login',
  'controllers.register',
  'controllers.main',
  'controllers.menu',
  'controllers.contactList',
  'controllers.addContact'
  ]);



app.run(function($ionicPlatform,$rootScope,$state,$http) {



  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  // for form inputs)
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //Convert the HTTP method to a format that php can understand
  //http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $http.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
    if (!$rootScope.firebaseURL && !$rootScope.userEmail) {
      $rootScope.firebaseURL = "https://safeband.firebaseio.com";
      $rootScope.firebaseRef = new Firebase($rootScope.firebaseURL);
      $rootScope.userEmail = null;
    }


    $rootScope.firebaseRef.onAuth(function(authData) {
      if (authData) {
        var email = authData.password.email;
        $rootScope.userEmail = email;
        if (toState.name == "login") {
          event.preventDefault();
          $state.go('app.main');
        }
      } else {
        $rootScope.userEmail = null;
      }
    });



  });

});




app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('login', {
        url:"/",
        templateUrl:"templates/login.html",
        controller:"loginCtrl"
      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller:"menuCtrl"
      })


      .state('app.main', {
        url: "/main",
        views: {
          "menuContent" :{
            templateUrl: "templates/main.html",
            controller:'mainCtrl'
          }
        }
      })


      .state('app.contactList', {
        url: "/contactList",
        views: {
          "menuContent" :{
            templateUrl: "templates/contactList.html",
            controller:'contactListCtrl'
          }
        }
      });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});

