/*jslint browser:true*/
/*global console*/
/*global window*/
/*global $*/
/* The lines above are for the www.jslint.com JavaScript "validator" */
/* Just keep them like they are. Also start your functions with "use strict"; */
/* And remove extra spaces after every code or comment line. */


// Defining one JavaScript "Array"   (Array is the least correct name for this dynamic collection type)
/* This time we are not going to create an array, but get it from the server */


// A. Running a jQuery script that will attach and define the AJAX functions

$("#addCountryWithAjaxButton").click(function () {
    "use strict";
    $.ajax({
        type: "POST",
        url: $("form").attr("action"),
        data: $("form").serialize(),
        success: function (response) {
            //Code to process the response
            var parentElement;
            var element1;
            parentElement = document.getElementById("addCountryResultList");

            element1 = document.createElement("li");
            element1.innerHTML = response;
            parentElement.appendChild(element1);
        }
    });
}); 

