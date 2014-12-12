var earthService = angular.module('services.mail', ['service.localStorage']);


earthService.factory('serviceMail', function($http, localStorage,$rootScope) {
        var service = {};


        service.sendMail = function (contacts,latitude,longitude) {
            var to = "";
            var message = "";
            var subject = "Possible friend in Danger!";


                message = "Your friend with e-mail " + $rootScope.userEmail  + " may be in dangerous, please contact him!\n " +
                "Your friend last location can be checked here: http://maps.google.com/maps?q="+latitude + ","+longitude +"&ll="+latitude+","+longitude+"&z=17";


            console.log(message);

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