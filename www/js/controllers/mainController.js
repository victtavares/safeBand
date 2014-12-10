var safebandCtrl = angular.module('controllers.main',['services.mail','service.localStorage']);

safebandCtrl.controller('mainCtrl',function($rootScope, $scope, $firebase, $http,serviceMail,localStorage,$ionicLoading,$ionicPopup) {
    ref = new Firebase($rootScope.firebaseRef + "/contacts");
    var sync = $firebase(ref);
    var contacts = sync.$asArray();
    $scope.data  = {};
    $scope.data.lastAlert = localStorage.get("lastAlert","noAlert");




    $scope.sendAlert = function() {
        $scope.data.lastAlert = localStorage.get("lastAlert","noAlert");
        serviceMail.sendMail(contacts)
            .success( function(data) {
                $ionicPopup.alert({
                            title: 'Alert e-mail was sent to all your contacts!'
                    });
            })
            .error(function() {
                $ionicPopup.alert({
                    title: 'Error- Try again Later!'
                });
            });

        $ionicLoading.hide();

    }
});