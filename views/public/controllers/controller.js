var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
var refresn = function () {

    $http.get('/sectionlist').success(function (response) {
        $scope.sectionlist = response;
        $scope.section = "";
    });
};
refresn();

$scope.addSection = function () {         //click ทำฟังชันนี้
    console.log($scope.section);
    $http.post('/sectionlist', $scope.section).success(function (response) {
        console.log(response);
        refresn();
        $.smkAlert({ text: "success insert", type:'success', position:'bottom-right'});
    });
};

$scope.remove =  function(id) {
    $.smkConfirm({
        text:'want delete?',
        accept:'yes',
        cancel:'no'
    },function(res) {
        if(res) {
            console.log(id);
            $http.delete('/sectionlist/' + id).success(function (response) {
                refresn();
            });
        }
    });
};

$scope.edit = function (id) {
    console.log(id);
    $http.get('/sectionlist/' + id).success(function (response) {
        $scope.section = response;    //คือค่า form ที่จะอัพเด
    });
};

$scope.update = function () {
    console.log($scope.section._id);
    $http.put('/sectionlist/'+ $scope.section._id, $scope.section).success(function (response) {
       refresn();
        $.smkAlert({ text: "success Update", type:'warning', position:'bottom-right'});
    });
};

$scope.deselect = function () {
    $scope.section = "";
};


}]);
