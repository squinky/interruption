var characters = [];
var player;
var npc = [];
var bg, table;
var speaker;
var bgm;

var PLAYER_SPEAKING = 99;
var BUTTON_DELAY = 1000;
var START_FADING = 10000;
var CHARACTER_FADE_TIME = 20000;
var SCREEN_FADE_TIME = 5000;
var BG_FADE_TIME = 600000;

var lastTickTime, buttonLastPressed, buttonPressInterval, continuousMashingTime;
var playerFade, npcFade, screenFade, bgFade;
var gameOver;

function startGame()
{
	speaker = -1;
	currentLine = null;
	convoLength = 0;
	lastTickTime = createjs.Ticker.getTime();
	buttonLastPressed = createjs.Ticker.getTime()-BUTTON_DELAY;
	buttonPressInterval = 0;
	continuousMashingTime = 0;
	playerFade = 0;
	npcFade = 0;
	screenFade = 0;
	bgFade = 0;
	gameOver = false;
	
	speechBubble.alpha = 0;
	
	player.x = 863;
	player.y = 705;
	player.alpha = 1;
	player.scaleX = -1;
	player.gotoAndPlay("neutral");
	
	npc[0].x = 170;
	npc[0].y = 705;
	npc[0].alpha = 1;
	npc[0].scaleX = 1;
	npc[0].gotoAndPlay("neutral");
	
	npc[1].x = 418;
	npc[1].y = 705;
	npc[1].alpha = 1;
	npc[1].scaleX = -1;
	npc[1].gotoAndPlay("neutral");
	
	npc[2].x = 640;
	npc[2].y = 705;
	npc[2].alpha = 1;
	npc[2].scaleX = -1;
	npc[2].gotoAndPlay("neutral");
	
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
	
	bgm = createjs.Sound.play("ipanema", {loop: -1});
	
	currentScreen = "game";
}

function gameLoop(keyPressed)
{
	var timeSinceLastTick = createjs.Ticker.getTime() - lastTickTime;
	lastTickTime = createjs.Ticker.getTime();
	
	bgFade += timeSinceLastTick;
	bg.alpha = (BG_FADE_TIME-bgFade)/BG_FADE_TIME;
	
	if (gameOver)
	{
		screenFade += timeSinceLastTick;
		clickyBox.alpha = screenFade/SCREEN_FADE_TIME;
		createjs.Sound.setVolume(1-clickyBox.alpha);
		if (clickyBox.alpha >= 1)
		{
			endGame();
			return;
		}
	}
	
	if (!gameOver &&
		(keyPressed == "space" || keyPressed == "right" || keypressed == "left"))
	{
		if (playerFade)
		{
			playerFade = 0;
			player.alpha = 1;
		}
		buttonLastPressed = createjs.Ticker.getTime();
	}
	
	buttonPressInterval = createjs.Ticker.getTime() - buttonLastPressed;
	
	if (buttonPressInterval <= BUTTON_DELAY || (gameOver && speaker == PLAYER_SPEAKING))
	{
		if (speaker == PLAYER_SPEAKING)
		{
			if (!currentLine) addToSpeechBubble();
			
			continuousMashingTime += timeSinceLastTick;
			if (continuousMashingTime >= START_FADING)
			{
				npcFade += timeSinceLastTick;
				for (var i = 0; i < npc.length; i++)
				{
					npc[i].gotoAndPlay("bored");
					npc[i].alpha = (CHARACTER_FADE_TIME-npcFade)/CHARACTER_FADE_TIME;
				}
				if (npc[0].alpha <= 0) gameOver = true;
			}
		}
		else playerStartSpeaking();
		
		if (gameOver) updateSpeechBubble(0);
		else updateSpeechBubble(Math.floor(buttonPressInterval/(BUTTON_DELAY/5)));
	}
	else
	{
		if (speaker == PLAYER_SPEAKING)
		{
			continuousMashingTime = 0;
			npcFade = 0;
			for (var i = 0; i < npc.length; i++)
			{
				npc[i].alpha = 1;
				npc[i].gotoAndPlay("neutral");
			}
			currentLine = null;
			player.gotoAndPlay("neutral");
		}
		if (!currentLine) pickSpeaker();
		updateSpeechBubble(0);
		
		if (buttonPressInterval >= START_FADING)
		{
			player.gotoAndPlay("bored");
			playerFade += timeSinceLastTick;
			player.alpha = (CHARACTER_FADE_TIME-playerFade)/CHARACTER_FADE_TIME;
			if (player.alpha <= 0) gameOver = true;
		}
	}
}

function playerStartSpeaking()
{
	currentLine = null;
	npc[speaker].gotoAndPlay("bored");
	speaker = PLAYER_SPEAKING;
	player.gotoAndPlay("point-talk");
	startBlabbing();
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
		startBlabbing();
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

function endGame()
{
	stage.removeAllChildren();
	clickyBox.alpha = 0.01;
	bgm.stop();
	endBlabbing();
	showTitle();
}
