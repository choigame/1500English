
document.write('<script src="../global_js.js" type="text/javascript"></script>');

function MYLOG(msg) {
//	console.log(msg);
}
function hightlightTypeOfWord(txt) {
	txt = txt.replaceAll(' n ', '<label class="text-info">&nbsp;&nbsp;n&nbsp;</label>');
	txt = txt.replaceAll(' a ', '<label class="text-success">&nbsp;&nbsp;a&nbsp;</label>');
	txt = txt.replaceAll(' adv ', '<label class="text-success font-weight-bold">&nbsp;&nbsp;adv&nbsp;</label>');
	txt = txt.replaceAll(' v ', '<label class="text-warning">&nbsp;&nbsp;v&nbsp;</label>');
	return txt;
}

var app = angular.module("myApp", ['ngSanitize']);
app.controller("ctrl", function($scope, $timeout) {

var kDATA = GRAMMER_DATA;

$scope.stories = kDATA; //1
$scope.storyId = -1;
$scope.acc = -1;

$scope.acc_isShow = function (id) {
	return $scope.acc===id;
};

$scope.acc_click = function (id) {
	if($scope.acc===id) {
		$scope.acc = -1; 
		return;
	}
	else {
			$scope.acc = id;
	}

	story = kDATA[$scope.acc];
	
	var words = story.en.split('<br>');
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		var textEn = word.split('|')[0];
		story.en = hightlightTypeOfWord(story.en);
		story.en = story.en.replace(textEn, hLightWords(textEn.trim()));
	}

	_scrollIntoView(id);
};


$scope.searchData = [];
$scope.searchDataResult = [];
$scope.search = "";
$scope.story = '';

$scope.searchTyping = function() {
    if ($scope.searchData.length==0) return true;       
	$scope.searchDataResult = [];
	if ($scope.search.length <= 2) return;
    var search = removeVietnameseTones($scope.search.toLowerCase());
    for (var i = 0; i < $scope.searchData.length; i++) {
    	var dataVN = $scope.searchData[i];
    	data = removeVietnameseTones(dataVN.toLowerCase());
    	if (data.includes(search)) {
			dataVN = hightlightTypeOfWord(dataVN)
    		$scope.searchDataResult.push(dataVN);
    	}
    }
};

$scope.clearSearch = function () {
	$scope.search = '';
	$scope.searchDataResult = [];
};

$scope.preProcess = function () {
	for (var k = 0; k < kDATA.length; k++) {
		story = $scope.stories[k];
		if (story.en) {	
			var words = story.en.split('<br>');
			story.numOfWords = words.length;
			$scope.searchData = $scope.searchData.concat(words);
		}	
	}
}

$scope.loadData = function () {
	$scope.preProcess();
};

$scope.loadData();

});