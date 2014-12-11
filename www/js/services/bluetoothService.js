var safeBandService = angular.module('services.bluetooth', ['service.localStorage']);

safeBandService.factory('bluetooth', function($q) {
    var service = {};
    service.connect = function (macAddress,name,isConnect) {

        var deferred = $q.defer();
        var onConnect, errorConnect;
        onConnect = function(data) {
            deferred.resolve("Connected to "+name);
        }

        errorConnect = function(data) {
            if (!isConnect) {
                deferred.reject("Error trying to connect to the safeBand - Check if the device is paired");
            } else {
                deferred.reject("Disconnected Successfully!");
            }
        }

        bluetoothSerial.connect(macAddress,onConnect,errorConnect);
        return deferred.promise;
    }


    service.subscribe = function() {
        var deferred = $q.defer();
        var onMessage, errorSubscribe;
        onMessage = function(data) {
            console.log(data);
            deferred.resolve(data);
        }

        errorSubscribe = function(data) {
            deferred.reject("Error to subscribe - Disconnect the device and try again!");
        }


        return deferred.promise;
    }

    return service;

});