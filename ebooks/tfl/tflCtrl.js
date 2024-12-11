// include other *.js

document.write('<script src="./ebooks/tfl/tfl_b1_data.js" type="text/javascript"></script>');
document.write('<script src="./ebooks/tfl/tfl_b2_data.js" type="text/javascript"></script>');
document.write('<script src="./ebooks/tfl/tfl_b3_data.js" type="text/javascript"></script>');

var app = angular.module("tflApp", []);
app.controller("tflCtrl", function($scope, $rootScope, $timeout ) {

var kSTORIES = tfl_b1_stories;
var KBook = 1;
$scope.stories = kSTORIES; //1
$scope.storyIdx = 0;

bookChange = function (book) {
	switch (book) {
		case 1: kSTORIES = tfl_b1_stories; break;
		case 2: kSTORIES = tfl_b2_stories; break;
		case 3: kSTORIES = tfl_b3_stories; break;
	}
	Helper_saveDB("tfl_b", book);
	KBook = book;
	$scope.fetchStory($scope.storyIdx, true);
}

$scope.createAudioSrc = function() {
	return "./ebooks/tfl/tfl_b" + KBook + "/" + $scope.story.track + '.mp3';
}

$scope.$on('parent_whenAudioEnded', function(event, message) {
	$scope.whenAudioEnded();
});

$scope.whenAudioEnded = function()
{
	var nextStoryIdx = $scope.storyIdx;
    var loopRadio = Helper_loadAudioLoop();
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

	if (idx > kSTORIES.length-1) { idx = 0 }; 
	$scope.storyIdx = idx;
	$scope.story = $scope.stories[idx];

	$rootScope.audioSrc = $scope.createAudioSrc();

	// save DB
	Helper_saveDB("tfl_unit", idx);
	if (!$scope.story) {MYLOG('Dont have Unit'); return;}
	
	$scope.story = processStory($scope.story);

}

$scope.loadData = function () {
	$scope.storyIdx = Helper_loadInt('tfl_unit', 0);
	
	var cd = Helper_loadInt('tfl_b', 1);
	bookChange(cd);
	document.tfl_bForm.book.value = cd;
	KBook=cd;

	$scope.fetchStory($scope.storyIdx, false);
};

$scope.$on('$viewContentLoaded', function(){
	$scope.loadData();
});

});

