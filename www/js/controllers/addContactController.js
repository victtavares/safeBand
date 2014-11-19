var safeBandCtrl = angular.module('controllers.addContact',[]);

safeBandCtrl.controller('addContactCtrl', function ($scope,$rootScope) {

    //var allContacts =

    //$scope.contactList = allContacts;

    $scope.closeAddContact = function () {
        $scope.modal.hide();
    }

    $scope.saveContact = function() {
        if ($scope.contactData) {
            var name = $scope.contactData.name;
            var email = $scope.contactData.email;
        }
        $ionicLoading.show({
            template: 'Loading...'
        });
        if ((!email) || (!name)) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Blank fields',
                template: "<p>A name and email must be entered</p>",
                okText: 'Cancel'
            });
        } else {
            var email = $rootScope.userEmail;
            ref.child("users").set({
                
            });
        }

    }


    //// ---------------------- Loading Modal ---------------------
    //$ionicModal.fromTemplateUrl('templates/addContact.html', {
    //    scope: $scope,
    //    animation: 'slide-in-up'
    //}).then(function(modal) {
    //    $scope.modal = modal;
    //});
    //
    //// ---------------------- open Modal ---------------------
    //$scope.openModal = function () {
    //    $scope.modal.show();
    //}
    //
    //
    // ---------------------- close Modal ---------------------
    $scope.closeAddContact = function () {
        $scope.modal.hide();
    }

});