var SPEECH_TEXT_WIDTH = 18;
var SPEECH_TEXT_HEIGHT = 4;

var PUNCTUATION_PAUSE_TIME = 4;
var PUNCTUATION = ".,!?";

var speechBubble, bubbleSprite, speechText;
var lastLine, currentLine, currentChar, currentHeight, paused;

function initSpeechBubble()
{
	var newLine = getNewLine();
	lastLine = newLine;
	currentLine = lastLine.toUpperCase();
	currentLine = wordwrap(currentLine, SPEECH_TEXT_WIDTH);
	currentChar = 0;
	currentHeight = 0;
	paused = 0;
	speechText.text = "";
	
	if (speaker == 0)
	{
		speechBubble.x = 10;
		speechBubble.y = 10;
		bubbleSprite.x = 0;
		bubbleSprite.scaleX = 1;
	}
	else if (speaker == 1)
	{
		speechBubble.x = 290;
		speechBubble.y = 10;
		bubbleSprite.x = 0;
		bubbleSprite.scaleX = 1;
	}
	else if (speaker == 2)
	{
		speechBubble.x = 330;
		speechBubble.y = 10;
		bubbleSprite.x = 451;
		bubbleSprite.scaleX = -1;
	}
	else
	{
		speechBubble.x = 560;
		speechBubble.y = 10;
		bubbleSprite.x = 451;
		bubbleSprite.scaleX = -1;
	}
}

function addToSpeechBubble()
{
	var newLine = getContinuingLine();
	lastLine = lastLine+" "+newLine;
	currentLine = lastLine.toUpperCase();
	currentLine = wordwrap(currentLine, SPEECH_TEXT_WIDTH);
}

function updateSpeechBubble(speedModifier)
{
	if (!paused)
	{
		speechText.text += currentLine[currentChar];
	
		if (currentLine[currentChar] == '\n')
		{
			currentHeight++;
			if (currentHeight >= SPEECH_TEXT_HEIGHT)
			{
				speechText.text = speechText.text.slice(speechText.text.indexOf('\n')+1);
				currentHeight--;
			}
		}
	}
	
	var pauseTime = speedModifier;
	if (PUNCTUATION.indexOf(currentLine[currentChar]) >= 0)
	{
		pauseTime = PUNCTUATION_PAUSE_TIME*(speedModifier+1);
	}
	if (paused < pauseTime)
	{
		paused++;
		return;
	}
	else paused = 0;
	
	currentChar++;
	if (currentChar >= currentLine.length) currentLine = null;
}
