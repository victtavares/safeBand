var safeBandCtrl = angular.module('controllers.contactList',[]);

safeBandCtrl.controller('contactListCtrl', function ($scope,$ionicModal) {

    //var allContacts =

    //$scope.contactList = allContacts;



    // ---------------------- Loading Modal ---------------------
    $ionicModal.fromTemplateUrl('templates/addContact.html', function(modal) {
        $scope.modal = modal;
    }, {});



    // ---------------------- open Modal ---------------------
    $scope.openModal = function () {
        $scope.modal.show();
    }



});