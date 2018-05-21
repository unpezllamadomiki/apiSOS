/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/
/*global io*/
/*global firebase*/
/*global localStorage*/
angular
    .module("ManagerApp")
    .controller("googleCtrl", ["$scope", function($scope) {
        console.log("View GoogleCtrl initialized!");
        
        var config = {
            apiKey: "AIzaSyDK9FKIA80wc-X_67fbkHc4go5Hv2asa20",
            authDomain: "sosapi-cf2e0.firebaseapp.com",
            databaseURL: "https://sosapi-cf2e0.firebaseio.com",
            projectId: "sosapi-cf2e0",
            storageBucket: "sosapi-cf2e0.appspot.com",
            messagingSenderId: "930661805486"
        };
        firebase.initializeApp(config);
        
        $scope.singInWithGoogle = function() {
            console.log("que esta pasando lol")
                var googleAuthProvider = new firebase.auth.GoogleAuthProvider
                
                firebase.auth().signInWithPopup(googleAuthProvider)
                .then(function(data){
                    console.log(data)
                    
                    var idToken = data.credential.idToken
                    localStorage.setItem('firebase_idToken', idToken)
                })
                .catch(function(error){
                    console.log(error)
                })
        }

    }]);
