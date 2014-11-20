var characters = [];
var player;
var npc = [];
var bg, table;
var speaker = -1;

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
	if (!currentLine)
	{
		pickSpeaker();
	}
	updateSpeechBubble();
}

function pickSpeaker()
{
	var lastSpeaker = speaker;
	speaker = Math.floor(Math.random()*3);
	
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
	else if (speaker == 3)
	{
		npc[1].scaleX = 1;
		npc[2].scaleX = 1;
	}
}
