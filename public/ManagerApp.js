/* global angular */

angular
    .module("ManagerApp", ["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "oldindex.html"
            })
            .when("/students-an",{
                templateUrl: "studentList.html",
                controller: "studentListCtrl"
            })
            .when("/students-an/:province/:year/:gender",{
                templateUrl: "studentEdit.html",
                controller: "studentEditCtrl"
            })
             .when("/divorces-an",{
                templateUrl: "divorceList.html",
                controller: "divorceListCtrl"
            })
            .when("/divorces-an/:province/:year/",{
                templateUrl: "divorceEdit.html",
                controller: "divorceEditCtrl"
            });
            
    });
