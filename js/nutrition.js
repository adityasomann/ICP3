var app1= angular.module('nutritionapp', ['googleOauth','FacebookProvider']);
app1.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/home.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.html',  // allow launching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );

app1.controller('NutritionCntrl', function ($scope,$http, $rootScope,$log, $window, Token, Facebook,$http,$location) {


    $scope.myfunction = function (my) {

        $scope.text = my.recipe
        alert("You searched for " + $scope.text);
        $http.get("https://api.edamam.com/api/nutrition-data?app_id=a75fd4ac&app_key=7afb948e56228647dffb7c5e1b76b90d&ingr="+my.recipe+".json").then(function (response) {

            $scope.data1 = response.data;
            $scope.cal = response.data.calories;
            $scope.totalweight = response.data.totalWeight;

        });


        /*$http.get("https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username='a56ede08-0946-45d4-acda-e3e869326333'&password='eoHjRGyHuXID'&text=" + my.recipe).then(function(response)
        {
          //audio = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username='a56ede08-0946-45d4-acda-e3e869326333'&password='eoHjRGyHuXID'&text=" + data1;
            audio = response.data;

        });*/

        $scope.audio = {
            html: "<a href=\"https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=a56ede08-0946-45d4-acda-e3e869326333&password=eoHjRGyHuXID&text=" + my.recipe + "\" > Audio </a>"

        }//var audio = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username='a56ede08-0946-45d4-acda-e3e869326333'&password='eoHjRGyHuXID'&text=" + data1;

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


});