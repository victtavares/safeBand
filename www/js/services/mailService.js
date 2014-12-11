var earthService = angular.module('services.mail', ['service.localStorage']);


earthService.factory('serviceMail', function($http, localStorage) {
        var service = {};


        service.sendMail = function (contacts) {
            var to = "";
            var message = "";
            var subject = "Possible friend in Danger!";

            if (contacts[0]) {
                message = "Your friend with e-mail " + contacts[0].user_email + " may be in dangerous, please contact him!";
            }

            for(i = 0; i < contacts.length; i++) {
                if (i == contacts.length -1) {
                    to += contacts[i].contact_email;
                } else {
                    to += contacts[i].contact_email + ",";

                }
            }


             return $http.post('http://sendemail-safeband.rhcloud.com/sendEmail.php',
                {to: to, subject: subject, message:message}, {timeout: 3000});

        }

        return service;
    });