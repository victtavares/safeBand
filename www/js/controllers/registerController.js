var safeBandCtrl = angular.module('controllers.register',[]);


safeBandCtrl.controller('registerCtrl', function ($scope,$ionicModal,$rootScope,$ionicLoading,$ionicPopup,$state) {
    //Creating user
    $scope.signUp = function () {

        if ($scope.registerData) {
            var email = $scope.registerData.username;
            var password= $scope.registerData.password;
        }
        $ionicLoading.show({
            template: 'Loading...'
        });
        if ((!email) || (!password)) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Blank fields',
                template: "<p>A username and password must be entered</p>",
                okText: 'Cancel'
            });
        } else {
            $rootScope.firebaseRef.createUser({
                email    : email,
                password : password
            }, function(error) {
                if (error === null) {
                    $ionicLoading.hide();
                    $scope.modal.hide();
                    $state.go('app.main');
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: error.code,
                        template:error.message,
                        okText: 'Cancel'
                    });
                }
            });
        }
    };





});