var blabla, voices;

var VOICE_FILES = 7;

function startBlabbing()
{
	if (blabla) blabla.stop();
	var rnd = Math.ceil(Math.random()*VOICE_FILES);
	blabla = createjs.Sound.play("blabla"+voices[speaker]+"0"+rnd);
	blabla.addEventListener("complete", blabComplete);
}

function blabComplete()
{
	blabla.removeAllEventListeners();
	startBlabbing();
}

function endBlabbing()
{
	if (blabla)
	{
		blabla.stop();
		blabla.removeAllEventListeners();
	}
}