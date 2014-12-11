var safeBandCtrl = angular.module('controllers.login',[]);


safeBandCtrl.controller('loginCtrl', function ($scope,$ionicModal,$state,$ionicPopup,$ionicLoading,$rootScope)//,$rootScope,$ionicLoading,$ionicPopup,$state)
{


    //$scope.login = function() {
    //    console.log($scope.loginData);
    //    //$state.go('app.main');
    //};

    $scope.login = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        if ($scope.loginData) {
            var email = $scope.loginData.username;
            var password = $scope.loginData.password;
        }

        if (!email || !password) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Blank fields',
                template: "<p>A username and password must be entered</p>",
                okText: 'Cancel'
            });
        } else {
            $ionicLoading.hide();
            $rootScope.firebaseRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error === null) {
                    $state.go('app.main');
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: error.code,
                        template: error.message,
                        okText: 'Cancel'
                    });
                }
            });
        }
    }



    // ---------------------- Loading Modal ---------------------
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // ---------------------- open Modal ---------------------
    $scope.openModal = function () {
        $scope.modal.show();
    }


    // ---------------------- close Modal ---------------------
    $scope.closeSignUp = function () {
        $scope.modal.hide();
    }

    $scope.registerData = {};
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
                    //Authenticating the user
                    $rootScope.firebaseRef.authWithPassword({
                        email: email,
                        password: password
                    }, function (error, authData) {
                        if (error === null) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                            $state.go('app.main');
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: error.code,
                                template: error.message,
                                okText: 'Cancel'
                            });
                        }
                    });

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