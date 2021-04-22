//App Created Using angular module
const app = angular.module('manageMeetings', ['ngSanitize', 'ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal']);


//Controller Created For Angular App
/**
 * $scope for data of controller
 * $http for AJAX
 * $uibModal for Modal Popup
 */
app.controller('manageMeetingsController', ['$scope', '$http', '$uibModal', ($scope, $http, $uibModal) => {
    //Data Used For Controller
    $scope.meetings = [];

    //Method To Init Controller
    $scope.init = function () {
        $scope.getAllMeetings();
        $scope.getAllUsers();
    }

    //Method To Get All Products
    $scope.getAllMeetings = () => {
        $http.get('/meetings/getAllMeetings').then((res) => {
            console.log(res);
            $scope.meetings = res.data;
        }).catch((err) => {
            console.log(err);
        })
    };

    //Method To Delete Product
    $scope.deleteMeeting = (productId, index) => {
        $http.delete('/meetings/deleteMeeting/' + productId).then((res) => {
            $scope.meetings.splice(index, 1);
        }).catch((err) => {
            console.log(err);
        })
    }

    //Method To Open Create or Edit Product Modal
    $scope.openModal = (mode, data, index) => {
        let modalData = {};

        if (mode == 'edit') {
            modalData = data;
            modalData.index = index;
        }
        modalData.mode = mode
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "modal.html",
            controller: "meetingModalController",
            scope: $scope,
            backdrop: false,
            size: "lg",
            windowClass: "show",
            resolve: {
                record: function () {
                    return modalData;
                },
            },
        })
    }
}]);


app.controller('meetingModalController', ['$scope', '$http', 'record', '$window', ($scope, $http, record, $window) => {
    //Controller Data Variables Declared Here
    $scope.newMeeting = {};

    //Method To Init Controller
    function init() {
        console.log(record)
        $scope.newMeeting = record;
    }


    init();

    //Method To Add Product
    $scope.addMeeting = () => {
        $http.post('/meetings/createMeeting', $scope.newMeeting).then((res) => {
            console.log("Success", res);
            //Disable Comment If You Want To Refresh Page
            // $window.location.reload();
            $scope.meetings.push(res.data);
            $scope.close();
        }).catch((err) => {
            console.log(err);
        })
    };

    //Method to edit product
    $scope.editMeeting = function () {
        
        $http.post('/meetings/editMeeting/' + $scope.newMeeting._id, $scope.newMeeting).then((res) => {
            console.log(res)
            $scope.meetings[$scope.newMeeting.index] = res.data;
            $scope.close();
        }).catch((err) => {
            console.log(err);
        })
    }

    $scope.close = () => { $scope.modalInstance.close() };
}]);

