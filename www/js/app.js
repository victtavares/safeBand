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
  'controllers.menu'
  ]);



app.run(function($ionicPlatform,$rootScope,$state) {



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

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
    $rootScope.firebaseURL = "https://safeband.firebaseio.com";
    $rootScope.firebaseRef = new Firebase($rootScope.firebaseURL);

    if (toState.name == 'login') {
      $rootScope.firebaseRef.onAuth(function(authData) {
        if (authData) {
          // user authenticated with Firebase
          console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
          event.preventDefault();
          $state.go('app.main');
        } else {
          console.log("user is logout");
        }
      });
    }

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
      });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});

