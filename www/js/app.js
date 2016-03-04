// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('watermark', ['ionic', 'ngCordova', 'firebase', 'ngIOS9UIWebViewPatch', 'controllers', 'services', 'factories'])

.run(function($ionicPlatform, $rootScope, $ionicHistory, $state) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$locationChangeStart', function(event, next, current) {

        $ionicHistory.clearCache();
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $ionicHistory.clearCache();
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.url == "/login" || toState.url == "/home" ||
            toState.url == "/signup" || toState.url == "/forgot") {
            $rootScope.ishidenfooterbar = true;
        } else {
            $rootScope.ishidenfooterbar = false;
        }
        $rootScope.ishiddeback = false;
        // if ($rootScope.User && (toState.url == "/login" || toState.url == "/signup")) {
        //     $state.go("propertymap");
        // }
    })
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: "templates/signup.html",
            controller: "SignupController"
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: "templates/forgot.html",
            controller: "ForgotController"
        })
        .state('login', {
            url: '/login',
            templateUrl: "templates/login.html",
            controller: "LoginController"
        })
        .state('home', {
            url: '/home',
            templateUrl: "templates/home.html",
            controller:"HomeController"
        })
        .state('gallery', {
            url: '/gallery',
            templateUrl: "templates/gallery.html",
            controller:"GalleryController"
        })
        .state('uploadimage', {
            url: '/uploadimage',
            templateUrl: "templates/uploadimage.html",
            controller:"UploadImageController"
        });



    $urlRouterProvider.otherwise('gallery');
});
