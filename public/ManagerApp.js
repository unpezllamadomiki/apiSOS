/* global angular */

angular
    .module("ManagerApp", ["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "oldindex.html"
            })
            .when("/analytics",{
                templateUrl: "analytics.html"
            })
            .when("/students-an/registration",{
                templateUrl: "google.html",
                controller: "googleCtrl"
            })
            .when("/students-an",{
                templateUrl: "studentList.html",
                controller: "studentListCtrl"
            })
            .when("/students-an/stadistics",{
                templateUrl: "studentView.html",
                controller: "studentViewCtrl"
            })
            .when("/students-an/:province/:year/:gender",{
                templateUrl: "studentEdit.html",
                controller: "studentEditCtrl"

            }).when("/students-an/search",{
                templateUrl: "studentSearch.html",
                controller: "studentSearchCtrl"
                
            }).when("/students-an/partner",{
                templateUrl: "studentPartner.html",
                controller: "studentPartnerCtrl"
                
            });
    });
