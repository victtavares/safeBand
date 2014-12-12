var safebandCtrl = angular.module('controllers.main',['services.mail','service.localStorage','services.bluetooth']);

safebandCtrl.controller('mainCtrl',function($rootScope, $scope, $firebase, $http,serviceMail,localStorage,$ionicLoading,$ionicPopup,bluetooth,$interval,$state) {

    var URL = $rootScope.firebaseRef + "/contacts";
    var ref = new Firebase(URL).orderByChild("user_email").equalTo($rootScope.userEmail);
    var sync = $firebase(ref);
    var contacts = sync.$asArray();
    $scope.data  = {};
    if ($rootScope.isConnect) {
        $scope.data.status = "Connected";
        $scope.data.buttonName = "Disconnect";
    } else {
        $scope.data.status = "Disconnected";
        $scope.data.buttonName = "Connect";
    }

    //Test if bluetooth serial exists
    var interval =  setInterval(function(){ testBluetoothSerial() }, 3000);
    var testBluetoothSerial = function () {
        try {
            bluetoothSerial.list();
            clearInterval(interval);
            //If exists, test if the bluetooth is connected sending a test message every 5 seconds
            $interval(function(){ testConnectivity() }, 5000);
        }
        catch (e) {
            console.log("Error - BluetoothSerial Not found");
        }
    }

    var testConnectivity = function () {
        bluetoothSerial.isConnected(
            function() {
                $scope.data.status = "Connected";
                $scope.data.buttonName = "Disconnect";
                $rootScope.isConnect = true;
                console.log("Bluetooth is connected");
                //$state.reload();
            },
            function() {
                $scope.data.status = "Disconnected";
                $scope.data.buttonName = "Connect";
                $rootScope.isConnect = false;
                //$state.reload();
                console.log("Bluetooth is *not* connected");
            }
        );
    }

    $scope.data.lastAlert = localStorage.get("lastAlert","No Alert");

    $scope.sendAlert = function() {


        $ionicLoading.show({
            template: 'Loading...'
        });
        var onSuccess = function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            serviceMail.sendMail(contacts,latitude,longitude)
                .success( function(data) {
                    $ionicPopup.alert({ title: 'Alert e-mail was sent to all your contacts!'});
                    var d = new Date();
                    var time = d.toLocaleString();
                    localStorage.set("lastAlert",time);
                    $scope.data.lastAlert = time;
                })
                .error(function() {
                    $ionicPopup.alert({
                        title: 'Error- Try again Later!'
                    });
                });

            $ionicLoading.hide();

        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            $ionicPopup.alert({ title: 'Error - We could not get your Location'});
            $ionicLoading.hide();
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);





    }

    //Function called when the phone receive the data from the bluetooth
    var onMessage, errorSubscribe;
    onMessage = function(data) {
        $scope.sendAlert();
    }

    errorSubscribe = function(reason) {
        $ionicPopup.alert({ title: reason });
    }

    $scope.connectBluetooth = function() {

        try {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var macAddress = "00:06:66:6A:D1:C1";
            var name = "safeBand";
            var promiseConnect = bluetooth.connect(macAddress,name,$rootScope.isConnect);
            promiseConnect.then(function(message) {
                $scope.data.status = "Connected";
                $scope.data.buttonName = "Disconnect";
                $ionicPopup.alert({ title: message });
                $rootScope.isConnect = true;
                $ionicLoading.hide();
                bluetoothSerial.subscribe("\n", onMessage, errorSubscribe);

            }, function(reason) {
                $scope.data.status = "Disconnected";
                $scope.data.buttonName = "Connect";
                $rootScope.isConnect = false;
                $ionicPopup.alert({ title: reason });
                $ionicLoading.hide();
            });
        } catch (e) {
            $ionicLoading.hide();
            $ionicPopup.alert({ title: "Your device doesn't support a bluetooth connection"});
        }


    }
});