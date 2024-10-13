// include other *.js

document.write('<script src="./lptd/cd1_data.js" type="text/javascript"></script>');
document.write('<script src="./lptd/cd2_data.js" type="text/javascript"></script>');
document.write('<script src="./lptd/cd3_data.js" type="text/javascript"></script>');

var app = angular.module("lptdApp", []);
app.controller("lptdCtrl", function($scope, $rootScope, $timeout ) {

var kSTORIES = lptd_cd1_stories;
$scope.cd = 1;
$scope.stories = kSTORIES; //1
$scope.storyIdx = 0;

radioCDChange = function (cd) {
	switch (cd) {
		case 1: kSTORIES = lptd_cd1_stories; break;
		case 2: kSTORIES = lptd_cd2_stories; break;
		case 3: kSTORIES = lptd_cd3_stories; break;
		case 4: kSTORIES = []; break;
	}
	localStorage.setItem("lptd_cd", cd);
	$scope.cd = cd;
}

$scope.range = function(min, max, step) {
    return RANGE(min, max, step);
};


$scope.createAudioSrc = function() {
	return "./lptd/cd" + $scope.cd + "/" + $scope.storyIdx + '.mp3';
}

$scope.$on('parent_whenAudioEnded', function(event, message) {
	$scope.whenAudioEnded();
});

$scope.units = [
	{'title':"Nature", 'num': 1},
	{'title':"Science", 'num':6},
	{'title':"Art", 'num': 11},
	{'title':"Leisure", 'num':16},
	{'title':"School", 'num':21},
	{'title':"People", 'num':26},
	{'title':"Sports", 'num':31},
	{'title':"Travel", 'num':36},
];

$scope.whenAudioEnded = function()
{
	var nextStoryIdx = $scope.storyIdx;
    var loopRadio = $rootScope[kAudioLoopSaveKey];
    if (loopRadio === 2) // play next
    {
    	nextStoryIdx = $scope.storyIdx + 1;
    	if (nextStoryIdx > kSTORIES.length-1) { nextStoryIdx = 0 }; 
    	$scope.storyIdx = nextStoryIdx;
    	$scope.fetchStory($scope.storyIdx, true);
    }
    if (loopRadio !== 0) // loop
    {
    	$scope.$broadcast('child_playFullSound')  
    }

}

$scope.fetchStory = function (idx, reset=true) 
{
	if (reset==true) 
	{
		$scope.$broadcast("child_stopSound");
	}

	$scope.stories = kSTORIES;
	$scope.storyIdx = idx;
	$scope.story = $scope.stories[idx];

	$rootScope.audioSrc = $scope.createAudioSrc();

	// save DB
	localStorage.setItem("lptd_unit", idx);
	if (!$scope.story) {MYLOG('Dont have Unit'); return;}
	
	$scope.story = processStory($scope.story);

}

$scope.loadData = function () {
	if (localStorage.hasOwnProperty("lptd_cd")) {
		var cd = localStorage.lptd_cd;
		radioCDChange(parseInt(cd));
		document.lptd_cdForm.radioCD.value=cd;
		$scope.cd=cd;
	}

	if (localStorage.hasOwnProperty("lptd_unit")) {
		$scope.storyIdx = parseInt(localStorage.lptd_unit);
	}

	$scope.fetchStory($scope.storyIdx, false);
};

$scope.$on('$viewContentLoaded', function(){
	$scope.loadData();
});

});

