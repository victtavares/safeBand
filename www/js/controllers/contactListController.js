var safeBandCtrl = angular.module('controllers.contactList',["firebase"]);

safeBandCtrl.controller('contactListCtrl', function ($scope,$ionicModal,$rootScope,$ionicLoading,$ionicPopup,$firebase) {


    var URL = $rootScope.firebaseRef + "/contacts";
    var ref = new Firebase(URL).orderByChild("user_email").equalTo($rootScope.userEmail);
    var sync = $firebase(ref);
    var contacts = sync.$asArray();
    $scope.contacts = contacts;


    $ionicModal.fromTemplateUrl('templates/addContact.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.deleteContact = function ($user) {
        console.log($user);
        contacts.$remove($user);
    }


    // ---------------------- Modal Functions ---------------------
    $scope.openModal = function () {
        $scope.modal.show();
    }





    $scope.contactData = {
        name:"",
        email:""
    };


    $scope.closeAddContact = function () {
        $scope.modal.hide();
    }

    $scope.saveContact = function() {
        var name = $scope.contactData.name;
        var emailContact = $scope.contactData.email;

        $ionicLoading.show({
            template: 'Loading...'
        });
        if ((!emailContact) || (!name)) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Blank fields',
                template: "<p>A name and email must be entered</p>",
                okText: 'Cancel'
            });
        } else {
            $ionicLoading.hide();
            var email = $rootScope.userEmail;
            console.log(contacts);
            contacts.$add({
                user_email:email,
                contact_email:emailContact,
                contact_name:name
            });



            $scope.modal.hide();
        }

    }



});