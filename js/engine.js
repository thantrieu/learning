function addDAPI(con) {
	return con.replace(/<!--DAPI-->/gi, DAPI);
}

function getText(url){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			var type = request.getResponseHeader('Content-Type');
			if (type.indexOf("text") !== 1) {
				console.log(request.responseText);
				return request.responseText;
			}
		}
	}
}

function addVLM(con) {
	var res = con.replace(/\/\/VLM/gi, VLM);
	return res;
}

function addWONLOAD(con) {
	let start1 = 0;
	let end1 = con.indexOf('//WONLOAD_S');
	let start2 = con.indexOf('//WONLOAD_E');
	var res = con.substring(start1, end1) + WONLOAD + DISACT + con.substring(start2);;
	return res;
}

function addDIS(con) {
	var res = con.replace('//DIS', DIS);
	return res;
}

function removeComment(con) {
	con = con.replace('/*IMPORTANT_S', '');
	con = con.replace('IMPORTANT_E*/', '');
	return con;
}

function removeLoadingScreen(con) {
	let start1 = 0;
	let end1 = con.indexOf('//LOADING_S');
	let start2 = con.indexOf('//LOADING_E');
	var res = con.substring(start1, end1) + LOADING + con.substring(start2 + 11);
	return res;
}

function irAddInteracted(con) {
	con = con.replace('//IR_INTERACTED', IR_INTERACTED);
	return con;
}

function irAddEndGame(con) {
	con = con.replace('//IR_END_GAME', IR_END_GAME);
	return con;
}

function irAddLevelStatus(con, status, replaceStatus) {
	con = con.replace(status, replaceStatus);
	return con;
}

function genIS(con) {
	con = irAddInteracted(con);
	con = irAddEndGame(con);
	con = addCTA(con, CTA);
	con = addWONLOAD(con);
	con = irAddLevelStatus(con, '//IR_START_LEVEL', IR_START_LEVEL);
	con = irAddLevelStatus(con, '//IR_END_LEVEL', IR_END_LEVEL);
	con = removeComment(con);
	con = removeLoadingScreen(con);
	var res = addDIS(con);
	return res;
}

function removeSound(con) {
	let start1 = 0;
	var res;
	let end1 = con.indexOf('//SOUND_S');
	let start2 = con.indexOf('//SOUND_E');
	while(start2 != -1) {
		con = con.substring(start1, end1) + ' ' + con.substring(start2 + 9);
		end1 = con.indexOf('//SOUND_S');
		start2 = con.indexOf('//SOUND_E');
	}
	
	return con;
}

function genFb(con) {
	con = removeDAPI(con);
	con = addCTA(con, FbCTA);
	con = removeSound(con);
	return con;
}

function updateTime(con) {
	if(con.indexOf('/*GO_DURATION_S*/600/*GO_DURATION_E*/') > -1) {
		con = con.replace('/*GO_DURATION_S*/600/*GO_DURATION_E*/', GoDURATION);
	}
	return con;
}

function updateRepetition(con) {
	if(con.indexOf('/*GO_REPEAT_S*/-1/*GO_REPEAT_E*/') > -1) {
		con = con.replace('/*GO_REPEAT_S*/-1/*GO_REPEAT_E*/', GoREPEAT);
	} // else do nothing
	return con;
}

function removeBtnTween(con) {
	let start1 = 0;
	let end1 = con.indexOf('//BTN_TWN_S');
	let start2 = con.indexOf('//BTN_TWN_E');
	if(end1 != -1 && start2 != -1) {
		con = con.substring(start1, end1) + ' ' + con.substring(start2 + 11);
	}
	return con;
}

function addGLink(con) {
	var res = con.replace('<!--GG_CTA_LINK-->', GG_CTA_LINK);
	return res;
}

function genGo(con) {
	con = addGLink(con);
	con = removeDAPI(con);
	con = removeBtnTween(con);
	con = removeSound(con);
	con = updateRepetition(con);
	con = updateTime(con);
	con = addCTA(con, GoCTA);
	return con;
}

function addAdLib(con) {
	let start1 = 0;
	let end1 = con.indexOf('//LIB_S');
	let start2 = con.indexOf('//LIB_E');
	var res = con.substring(start1, end1) + AdLIB + con.substring(start2);
	return res;
}

function addWONLOADAd(con) {
	let start1 = 0;
	let end1 = con.indexOf('//WONLOAD_S');
	let start2 = con.indexOf('//WONLOAD_ADE');
	var res = con.substring(start1, end1) + AdWONLOAD + con.substring(start2);
	return res;
}

function changeLib(con, lib) {
	let start1 = 0;
	let end1 = con.indexOf('//LIB_S');
	let start2 = con.indexOf('//LIB_E');
	var res = con.substring(start1, end1) + lib + con.substring(start2 + 7);
	return res;
}

function genAd(con) {
	con = removeDAPI(con);
	con = removeSound(con);
	con = addCTA(con, AdCTA);
	con = addWONLOADAd(con);
	return con;
}

function addCTA(con, cta) {
	let start1 = 0;
	let end1 = con.indexOf('//CTA_S');
	let start2 = con.indexOf('//CTA_E');
	var res = con.substring(start1, end1) + cta + con.substring(start2);
	return res;
}

function genVu(con) {
	con = removeDAPI(con);
	con = con.replace('//VU_INTERACTED', VU_INTERACTED);
	con = addCTA(con, VU_CTA);
	con = con.replace('//VU_END', VU_END);
	return con;
}

function miniFier1(con) {
	var start2 = con.indexOf('//HTML_E1') + 9;
	var res = UH1 + con.substring(start2);
	return res;
}

function genUnity(con) {
	con = removeDAPI(con);
	con = miniFier1(con);
	return con;
}

function minifyJs() { // minify the code

}

function minLoad(con) {
	let start1 = 0;
	let end1 = con.indexOf('//MINLOAD_S');
	let start2 = con.indexOf('//MINLOAD_E');
	var res = con.substring(start1, end1) + MIN_READY + con.substring(start2 + 11);
	return res;
}

function addMinGameControl(con) {
	con = con.replace("//VU_END", MIN_END);
	con = minLoad(con);
	return con;
}

function addSound(con) {
	var fileNameToSaveAs = document.getElementById('fName').value;
	// console.log(fileNameToSaveAs);
	var sound = ALIEN_BG_SOUND;
	if(fileNameToSaveAs.search(/invader/i) > -1) {
		console.log('go invader');
		sound = INVADER_BG_SOUND;
	} else if(fileNameToSaveAs.search(/infinity/i) > -1) {
		sound = INFI_BG_SOUND;
	} else {
		
	}
	con = con.replace('//ADD_SND', sound + MIN_OPCL);
	return con;
}

function addMinLib(con) {
	con = con.replace('//ADD_MSOUNDLIB', MIN_SNDLIB);
	return con;
}

function genMin(con) {
	con = removeLoadingScreen(con);
	con = removeDAPI(con);
	con = removeSound(con);
	con = addSound(con);
	con = addCTA(con, MIN_CTA);
	con = addMinGameControl(con);
	con = addMinLib(con);
	return con;
}

function removeDAPI(con) {
	let start1 = 0;
	let end1 = con.indexOf('//DAPI_S');
	let start2 = con.indexOf('//DAPI_E');
	var res = con.substring(start1, end1) + ' ' + con.substring(start2 + 8);
	return res;
}