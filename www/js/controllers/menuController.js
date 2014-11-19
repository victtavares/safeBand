var safeBandCtrl = angular.module('controllers.menu',[]);

safeBandCtrl.controller('menuCtrl',function($scope,$state,$rootScope) {

    $scope.logout = function() {
        $rootScope.firebaseRef.unauth();
        $state.go("login");
        $rootScope.userEmail = null;
    }
});