var safeBandCtrl = angular.module('controllers.addContact',[]);

safeBandCtrl.controller('addContactCtrl', function ($scope,$rootScope,$ionicLoading,$ionicPopup) {
    //$scope.contactData = {
    //    name:"",
    //    email:""
    //};
    //
    //
    //$scope.closeAddContact = function () {
    //    $scope.modal.hide();
    //}
    //
    //$scope.saveContact = function() {
    //
    //    //console.log("data:" + JSON.stringify($scope));
    //
    //
    //    var name = $scope.contactData.name;
    //    var emailContact = $scope.contactData.email;
    //
    //    $ionicLoading.show({
    //        template: 'Loading...'
    //    });
    //    if ((!emailContact) || (!name)) {
    //        $ionicLoading.hide();
    //        $ionicPopup.alert({
    //            title: 'Blank fields',
    //            template: "<p>A name and email must be entered</p>",
    //            okText: 'Cancel'
    //        });
    //    } else {
    //        $ionicLoading.hide();
    //        var email = $rootScope.userEmail;
    //        console.log(email);
    //
    //        ref = $rootScope.firebaseRef + "/contacts";
    //        var sync = $firebase(ref);
    //        var contacts = sync.a
    //        $rootScope.firebaseRef.child("contacts").push({
    //            user_email:email,
    //            contact_email:emailContact,
    //            contact_name:name
    //        });
    //        $scope.modal.hide();
    //    }
    //
    //}
    //
    //
    ////// ---------------------- Loading Modal ---------------------
    ////$ionicModal.fromTemplateUrl('templates/addContact.html', {
    ////    scope: $scope,
    ////    animation: 'slide-in-up'
    ////}).then(function(modal) {
    ////    $scope.modal = modal;
    ////});
    ////
    ////// ---------------------- open Modal ---------------------
    ////$scope.openModal = function () {
    ////    $scope.modal.show();
    ////}
    ////
    ////
    //// ---------------------- close Modal ---------------------
    //$scope.closeAddContact = function () {
    //    $scope.modal.hide();
    //}

});