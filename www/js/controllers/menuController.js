var safeBandCtrl = angular.module('controllers.menu',[]);

safeBandCtrl.controller('menuCtrl',function($scope,$state) {

    $scope.logout = function() {
       $state.go("login");
    }
});