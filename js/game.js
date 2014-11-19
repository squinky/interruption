var characters = [];
var player;
var npc = [];
var bg, table;

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
	stage.addChild(clickyBox);
	
	currentScreen = "game";
}

function gameLoop(keyPressed)
{
}
