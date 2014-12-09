var safebandCtrl = angular.module('controllers.main',[]);

safebandCtrl.controller('mainCtrl',function($rootScope, $scope, $firebase, $http) {
    ref = new Firebase($rootScope.firebaseRef + "/contacts");
    var sync = $firebase(ref);
    var contacts = sync.$asArray();
    //$rootScope.checkSession();

    $scope.sendAlert = function() {
        var to = "";
        var message = "";
        var subject = "Possible friend in Danger!";
        //console.log(contacts);
        for(i = 0; i < contacts.length; i++) {
            if (i == contacts.length -1) {
                to += contacts[i].contact_email;
            } else {
                to += contacts[i].contact_email + ",";
                message = "Your friend with e-mail " + contacts[i].user_email + " may be in dangerous, please contact him!";
            }
        }
        console.log(to);
        console.log(subject);
        console.log(message);
        $http.post('http://sendemail-safeband.rhcloud.com/sendEmail.php',
            {to: to, subject: subject, message:message}, {timeout: 3000})
            .success(function(data) {
                console.log(data);
                console.log("foi");
            })
            .error(function (data) {
                console.log(data);

                console.log(" não foi");
            });

            }
});