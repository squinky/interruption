var characters = [];
var player;
var npc = [];
var bg, table;
var speaker = -1;

var PLAYER_SPEAKING = 99;
var BUTTON_DELAY = 1000;

var buttonLastPressed;

function startGame()
{
	player.x = 863;
	player.y = 705;
	player.scaleX = -1;
	
	npc[0].x = 170;
	npc[0].y = 705;
	
	npc[1].x = 418;
	npc[1].y = 705;
	npc[1].scaleX = -1;
	
	npc[2].x = 640;
	npc[2].y = 705;
	npc[2].scaleX = -1;
	
	table.x = 512;
	table.y = 736;
	
	stage.addChild(bg);
	stage.addChild(npc[2]);
	stage.addChild(npc[1]);
	stage.addChild(npc[0]);
	stage.addChild(player);
	stage.addChild(table);
	stage.addChild(speechBubble);
	stage.addChild(clickyBox);
	
	currentScreen = "game";
}

function gameLoop(keyPressed)
{
	if (keyPressed == "space")
	{
		buttonLastPressed = createjs.Ticker.getTime();
	}
	var interval = createjs.Ticker.getTime() - buttonLastPressed;
	if (interval <= BUTTON_DELAY)
	{
		if (speaker == PLAYER_SPEAKING)
		{
			if (!currentLine) addToSpeechBubble();
		}
		else playerStartSpeaking();
		updateSpeechBubble(Math.floor(interval/(BUTTON_DELAY/5))+1);
	}
	else
	{
		if (speaker == PLAYER_SPEAKING)
		{
			currentLine = null;
			player.gotoAndPlay("neutral");
		}
		if (!currentLine) pickSpeaker();
		updateSpeechBubble(1);
	}
}

function playerStartSpeaking()
{
	currentLine = null;
	npc[speaker].gotoAndPlay("neutral");
	speaker = PLAYER_SPEAKING;
	player.gotoAndPlay("point-talk");
	turnToFaceSpeaker();
	initSpeechBubble();
}

function pickSpeaker()
{
	var lastSpeaker = speaker;
	speaker = Math.floor(Math.random()*npc.length);
	
	if (lastSpeaker == speaker)
	{
		addToSpeechBubble();
	}
	else
	{
		if (lastSpeaker >= 0 && lastSpeaker < npc.length)
		{
			npc[lastSpeaker].gotoAndPlay("neutral");
		}
		npc[speaker].gotoAndPlay("point-talk");
		turnToFaceSpeaker();
		initSpeechBubble();
	}
}

function turnToFaceSpeaker()
{
	if (speaker == 0)
	{
		npc[1].scaleX = -1;
		npc[2].scaleX = -1;
	}
	else if (speaker == 1)
	{
		npc[2].scaleX = -1;
	}
	else if (speaker == 2)
	{
		npc[1].scaleX = 1;
	}
	else
	{
		npc[1].scaleX = 1;
		npc[2].scaleX = 1;
	}
}
