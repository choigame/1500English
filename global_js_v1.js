const HELPER_FOR_TEST = false
const UNCOUNT_TAG_BEGIN = '<x1x class="_y_z">'
const UNCOUNT_TAG_END = '</x1x>'
const SAME_N_V_TAG_BEGIN = '<y1 class="_y_1z">'
const SAME_N_V_TAG_END = '</y1>'

var kNgClickTagOpen = '<kkk ng-click="Idx_n_L_WSp_($event)">';
var kNgClickTagClose = '</kkk>';
var kNgClickTagClose2 = '<\/kkk>';
var Helper_AudioPitchKey = 'AudioPitch';
var Helper_AudioRateKey = 'AudioRate';
var Helper_AdjAudioTimeKey = 'AdjAudioTime';
var Helper_SelectedVoiceIdx = 'SelectedVoiceIdx';
var Helper_Voices
var UtterEnd = true;		// prevent a word from constantly double-click

var kReplaceWords = [
	{ src: 'ms\\.*', desc: 'Ms'},
	{ src: 'mr\\.*', desc: 'Mr'},
	{ src: 'p\\.m\\.*', desc: 'pm'},
	{ src: 'a\\.m\\.*', desc: 'am'},
	{ src: 'mrs\\.*', desc: 'Mrs'},
]

function IsRegexMatch(rg, txt) {
	var matches = getRegexMatch(rg, txt)
	return matches && matches.length > 0
}

function getRegexMatch(rg, txt) {
	return txt.match(rg);
}

function fixDots(txt) {
	txt = txt.trim()
	var endCharOfSentences = ['.',',','?','!']
	let lastChar = txt.charAt(txt.length - 1); 
	if (!endCharOfSentences.includes(lastChar)) {
		txt += '.'
	}

	// 1. 2. -> 1) 2)
	var matches = txt.match(/\b\d+\./gi);
	if (matches) {
		for (var i = 0; i < matches.length; i++) {
			var src = matches[i]
			var desc  = src.replace('.',')');
			var regex = new RegExp(`\\b${src}`,'gi')
//			txt = txt.replace(regex, desc)
		}	
	}

	txt = txt.replace(".'", "'.");
	
	var rg = /\d+[\.]\d+/g;
	var mat = txt.match(rg)
	if (mat) {
		for (var i = 0; i < mat.length; i++) {
			var num = mat[i]
			var numRe = num.replace(/[\.]/gi, ',')
			txt = txt.replace(num, numRe)
		}
		
	}
	return txt.replaceAll("v.v", "vv");
}

function doReplaceWords(txt) {
	var rrr = txt
	for (var i = 0; i < kReplaceWords.length; i++) {
		var data = kReplaceWords[i]
		var regex = new RegExp(`\\b(${data.src})` , 'gi')
		rrr = rrr.replace(regex, data.desc);
	}
	return rrr;
}

var kAudioLoopSaveKey = "audioLoop";

function MYLOG(msg) {
	console.log(msg);
}

RANGE = function(min, max, step) {
	step = step || 1;
	var input = [];
	for (var i = min; i <= max; i += step) {
		input.push(i);
	}
	return input;
};

document.write('<small class="note">\
	' + UNCOUNT_TAG_BEGIN + 'uncount.n' + UNCOUNT_TAG_END + ' <br>\
	<u>u:</u> n = v<br>\
	</small>'
	);

var arrBOTH_COUNT_UNCOUNT = [];
var arrUNCOUNT_NOUNS = [];
var arrNOUN_SAME_VERBS = [];

function Helper_ArrRemoveDup(arr) {
	if (!arr) return arr;
	var result = [];
    for(i=0;i<arr.length;i++){
    	var ele = arr[i] // .toLowerCase()
      if(result.indexOf(ele) == -1){
        result.push(ele)
      }
    }
    return result
}

function longStrToArray(long_txt, deter = ',') {
	var arr  = long_txt.replace(/\s*\,\s*/g, ",");
	arr = arr.split(deter);
	return Helper_ArrRemoveDup(arr)
};

function preprocess() {
	arrUNCOUNT_NOUNS = longStrToArray(UNCOUNT_NOUNS);
	arrNOUN_SAME_VERBS = longStrToArray(NOUN_SAME_VERBS);
};

function isInArr(ele, arr) {
	return arr.includes(ele);
};

function hLightWord(word, arr, graph, tagOpen, tagClose) {
	if (isInArr(word, arr)) {
		var regex = new RegExp(`\\b${word}\\b` , 'g')
		return graph.replace(regex, tagOpen + word + tagClose);
	}
	return graph;
}


function ngClickOnWord(word, graph) {
	if (word.trim().length == 0) return graph // safe
	if (ValidateWord(word) 
		&& word !=='br'
		&& word !=='hr'
		&& UNCOUNT_TAG_BEGIN.indexOf(word) === -1
		&& kNgClickTagOpen.indexOf(word) === -1
		) 
	{
		regex = new RegExp(`\\b${word}\\b` , 'g')
		return graph.replace(regex, kNgClickTagOpen + word + kNgClickTagClose);
	} // else  console.log("ngClickOnWord ignore: " + word)
	return graph
}

// for Reading fullTitles
function showStoryTitles(data) {
	var r = []
	for (var k = 0; k < data.length; k++) {
		var unit = data[k].unit ? ('U' + data[k].unit) : '';
		var title = data[k].title ? (' - ' + data[k].title ) : '';
		r.push(unit + title);
	}
	return r
}

function processStory (story, isAlert = true) {
	if (!story || !story.en || story.en.trim().length == 0) return story;
	
	story.enShow = story.en;
	let enShow = story.enShow
	let viShow = story.vi
	enShow = doReplaceWords(enShow)
	enShow = fixDots(enShow)
	if (viShow) viShow= fixDots(viShow)

	if (story.voca) {
		var vocas = story.voca.split(',');
		for (var i = 0; i < vocas.length; i++) {
			voca = vocas[i].trim();
			if (voca.length===0) continue;
			voca = voca.replace(/\[.*\]/g, '').trim();
			var regex = new RegExp(`\\b${voca}\\b` , 'g')
			if (voca!='event')
				enShow = enShow.replace(regex, '<b>' + voca + '</b>');
		}
	}

	var words = IRR_FindPhraVerb(story.en).words
	var dones = []
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		if (!isInArr(word, dones)) 
		{
			enShow = hLightWord(word, arrUNCOUNT_NOUNS, enShow , UNCOUNT_TAG_BEGIN, UNCOUNT_TAG_END );
			enShow = hLightWord(word, arrNOUN_SAME_VERBS, enShow , SAME_N_V_TAG_BEGIN, SAME_N_V_TAG_END );
			enShow = ngClickOnWord(word, enShow);
			dones.push(word);
		}
	}


	var kBrTag = '<br>'
	var rgSen = /.*?((\.*\s*(<br>|<hr>))|(\!*\s*(<br>|<hr>))|(\?*\s*(<br>|<hr>))|('*\s*(<br>|<hr>))|("*\s*(<br>|<hr>))|[\.]+|\!|\?'")/gi
	var enAndVi = ''
	var viii = ''
	var sentencesEn = enShow.match(rgSen);
	var sentencesVi = '';
	if (viShow) sentencesVi = viShow.match(rgSen);
	if (sentencesEn.length === sentencesVi.length) {
	
	} else if (isAlert) alert('sentencesEn.length !== sentencesVi.length')
		for (var i = 0; i < sentencesEn.length; i++) {
			var enSen = sentencesEn[i]
			var viSen = sentencesVi[i]
			if (viSen)
			{
				var rep = viSen.trim().replace(/^\w*(B|G|W|M)*\d*\s*\:+\s*/gi, '')
				{
					rep = rep.replace(/<\/*(b>)/,'');  // don't bold text in Vietnamese
					viii = '(' + rep + ')'
					if (viii.indexOf(kBrTag)!==-1) {
						viii = viii.replace(kBrTag,'');
						viii += kBrTag
					}
				}
				if (viii.indexOf('()')!==-1) viii=viii.replace('()','')
				if (viii.indexOf('(<hr>)')!==-1) viii=''
				if (enSen.indexOf(kBrTag)!==-1) {
					enSen = enSen.replace(kBrTag,'');
				}
				enAndVi += enSen + ' <i class="text-primary">' + viii  + '</i>'
			}
		}
	story.viShow = enAndVi
	story.enShow = enShow

	var UI_FullTitle = ''
	var deter = ' - '
	if (story.track || story.idx) UI_FullTitle += (story.track || story.idx)
	if (story.unit) UI_FullTitle += deter + 'U' + story.unit
	if (story.title) UI_FullTitle += deter + story.title
	story.UI_FullTitle = UI_FullTitle

	return story;
}

