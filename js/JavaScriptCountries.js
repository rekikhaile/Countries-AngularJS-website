/*jslint browser:true*/
/*global console*/
/*global window*/
/*global $*/
/* The lines above are for the www.jslint.com JavaScript "validator" */
/* Just keep them like they are. Also start your functions with "use strict"; */
/* And remove extra spaces after every code or comment line. */

// No objects defined this time

//  Running Angular script that will create a module + controller 
// and attach and define the AJAX functions

var app = angular.module("CountryApp", []);

app.controller("countryController", function ($scope,$http) {

    $http.get("http://localhost:3000/3000/Info/listCountries")
        .success(function (data) { $scope.countries = data; })
        .error(function (data) { console.log("Sorry, error!") });

    
});

