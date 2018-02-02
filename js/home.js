/**
 * Created by user on 24/02/2016.
 */
var myapp = angular.module( 'homeModule', ['googleOauth','FacebookProvider'] );

myapp.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/home.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.html',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );
myapp.controller( 'homeController', function ($scope, $http,$rootScope,$log, $window, Token, Facebook,$http,$location) {
    $scope.accessToken = Token.get()
    //  https://api.edamam.com/diet?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free
    $scope.recipelist = new Array();
    $scope.venueList = new Array();
    $scope.mostRecentReview;
    $scope.findRecipe = function () {
        //var end = document.getElementById('endlocation').value;
        alert( "hello" + $scope.recipe );
        $http.get( 'https://api.edamam.com/search?q=' + $scope.recipe + '&app_id=a75fd4ac&app_key=7afb948e56228647dffb7c5e1b76b90d&from=0&to=3' ).success( function (data1) {
            console.log( data1 );
            for (var i = 0; i < data1.hits.length; i++) {
                $scope.recipelist[i]= {

                    "name": data1.hits[i].recipe.label,
                    "url": data1.hits[i].recipe.url,
                    "icon": data1.hits[i].recipe.image
                };
            }

        } )

    };



    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
        $rootScope.session = "hello";

    };

    $rootScope.updateSession();


    // button functions
    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();

    };

    $scope.login = function () {
        Facebook.login();
    };

    $scope.logout = function () {
        Facebook.logout();
        console.log("inside");
        $rootScope.facebook_id = "";
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }

    $scope.getInfo = function () {
        FB.api( '/' + $rootScope.facebook_id, function (response) {
            console.log( 'Good to see you, ' + response.name + '.' + $rootScope.facebook_id );

        } );
        $rootScope.info = $rootScope.session;

    };


} );


