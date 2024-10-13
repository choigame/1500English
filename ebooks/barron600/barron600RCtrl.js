
document.write('<script src="./ebooks/barron600/read_data/barron600_read_data.js" type="text/javascript"></script>');

var app = angular.module("barron600RApp", []);
app.controller("barron600RCtrl", function($scope, $timeout) {

var kSTORIES = barron600_read_data;

$scope.fullTitles = [];
$scope.story = '';
$scope.bShowVi = 0;
$scope.acc=-1;

$scope.acc_isShow = function (id) {
	return $scope.acc===id;
};

$scope.acc_click = function (id) {
	if($scope.acc===id) $scope.acc=-1;
	else {
		$scope.acc=id;
		$scope.story = processStory(kSTORIES[id]);
	}
};

$scope.fetchStory = function () {
	for (var k = 0; k < kSTORIES.length; k++) {
		var unit = kSTORIES[k].unit;
		var title = kSTORIES[k].title;
		$scope.fullTitles.push('Unit ' + unit + ": " + title);
	}
}

$scope.loadData = function () {
	$scope.fetchStory();
};

$scope.loadData();

});
