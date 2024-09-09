// include other *.js
document.write('<script src="../../global_js.js" type="text/javascript"></script>');
document.write('<script src="listen_data/bridge_cd1.js" type="text/javascript"></script>');
document.write('<script src="listen_data/bridge_cd2.js" type="text/javascript"></script>');

function MYLOG(msg) {
//	console.log(msg);
}

var app = angular.module("myApp", ['ngSanitize']);
app.controller("ctrl", function($scope, $timeout) {

var kSTORIES = bridge_cd1;
radioCDChange = function (cd) {
	switch (cd) {
		case 1: kSTORIES = bridge_cd1; break;
		case 2: kSTORIES = bridge_cd2; break;
	}
	localStorage.setItem("bri_listen_cd", cd);
	$scope.cd = cd;
	MYLOG("localStorage saved CD= " + cd);
}

$scope.cd = 1;
$scope.stories = kSTORIES; //1

$scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
        input.push(i);
    }
    return input;
};


 $scope.storyIdx = 0;
 $scope.bPlayingFull = false;
 $scope.bPause = false;
 $scope.bShowVi = 0;
 $scope.bHiddenWords = 0;
 $scope.audio;
 $scope.currentTime = 0;

$scope.units = [
	{'title':"", 'num': 1},
];

$scope.resetFlag = function () {
	$scope.bPlayingFull = false;
	$scope.bPause = false;
	$scope.bShowVi = 0;
	$scope.bHiddenWords = 0;
}	

$scope.backSound = function (sec) {
	$scope.audio.currentTime = $scope.audio.currentTime + sec;
}

$scope.resetAudioBtnUI = function()
{
	$scope.bPause=false;
    $scope.bPlayingFull=false;

    var isChkLoopChecked = false;
    if (localStorage.hasOwnProperty("bri_listen_isAudioLoop")) {
		isChkLoopChecked = localStorage.bri_listen_isAudioLoop;
	}
    if (isChkLoopChecked=='true')
    {
    	$scope.playFullSound($scope.storyIdx);
    }

    $scope.$apply();
}

$scope.playFullSound = function (index) {
	if ($scope.bPlayingFull)
	{
		$scope.stopSound();
		$scope.bPause=false;
	}
  	else
  	{
  		$scope.audio = new Audio("listen_data/cd" + $scope.cd + "/" + $scope.storyIdx + '.mp3');
	    $scope.audio.loop = false;
	    $scope.audio.play();

		$scope.audio.addEventListener("ended", function(){
		   $scope.resetAudioBtnUI();
		});

	    $scope.bPlayingFull = true;
  	}
}

$scope.pauseSound = function () {
	if (!$scope.audio) return;
	$scope.bPause = !$scope.bPause;
	if ($scope.bPause)
    {
    	$scope.audio.pause();
    	$scope.currentTime = $scope.audio.currentTime;
    }
    else
    {
    	$scope.audio.currentTime = $scope.currentTime;
    	$scope.audio.play();
    }
}

$scope.stopSound = function () {
	if (!$scope.audio) return;
	 $scope.audio.pause();
	 $scope.audio.currentTime = 0;
	 $scope.currentTime = 0;
	 $scope.bPlayingFull = false;
};

$scope.fetchStory = function (idx, reset=true) {
	MYLOG('fetchStory');
	// when click 1.2.3..40
	if (reset==true) 
	{
		$scope.resetFlag();
		$scope.stopSound();
	}

	$scope.stories = kSTORIES;
	$scope.storyIdx = idx;
	$scope.story = $scope.stories[idx];

	// save DB
	localStorage.setItem("bri_listen_unit", idx);
	MYLOG("localStorage save unit=" + idx);
	if (!$scope.story || !$scope.story.en) {MYLOG('Dont have Unit'); return;}
	
	$scope.story = processStory($scope.story);
}

function validateWord(word) 
{	
	word = word.trim();
	if (word.length < 4) return false;
	let arr = ['<br>','<b>','</b>', '!','.',',',"'",'’','unit','there','this','that','those'];
	for (var i = 0; i < arr.length; i++) {
		bList = arr[i];
		if (word.toLowerCase().indexOf(bList) >= 0) return false;
	}
	return true;
}


$scope.isLongTrack = function(idx) {
	var track = $scope.stories[idx];
	if (!track || !track.en) return 'text-muted';
	var lengthCount = track.en.length;
	let result = ''
	if (lengthCount > 800 )
	{
			result = 'font-weight-bold';
	}

//	if (track.img) result += " text-danger";
	return result;
}

$scope.loadData = function () {
	MYLOG('loadData');
	if (localStorage.hasOwnProperty("bri_listen_isAudioLoop")) {
		document.getElementById('audioLoopEle').checked = localStorage.bri_listen_isAudioLoop === 'true';
	}

	if (localStorage.hasOwnProperty("bri_listen_cd")) {
		var cd = localStorage.bri_listen_cd;
		MYLOG("localStorage load CD=" + cd);
		radioCDChange(parseInt(cd));
		document.cdForm.radioCD.value=cd;
		$scope.cd=cd;
	}

	if (localStorage.hasOwnProperty("bri_listen_unit")) {
		idx = localStorage.bri_listen_unit;
		MYLOG("localStorage load unit=" + idx);
		$scope.storyIdx = parseInt(idx);
	}


	$scope.fetchStory($scope.storyIdx, false);


};

$scope.loadData();

});
