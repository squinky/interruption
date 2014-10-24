var stage;
var queue;
var bg, table, characterA, characterB, characterC, characterD;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	createjs.Ticker.addEventListener("tick", stage);
	resize();
	
	queue = new createjs.LoadQueue(true, "img/");
	queue.on("complete", handleComplete, this);
	queue.loadManifest
	([
		{ id: "bg", src: "bg.png" },
		{ id: "table", src: "table.png" },
		{ id: "character-a", src: "character-a.png" },
		{ id: "character-b", src: "character-b.png" },
		{ id: "character-c", src: "character-c.png" },
		{ id: "character-d", src: "character-d.png" }
	]);
}

function handleComplete()
{
	bg = new createjs.Bitmap(queue.getResult("bg"));
	
	characterA = new createjs.Sprite(
		new createjs.SpriteSheet(characterAFrames), "point-talk"
	);
	characterA.regX = 130;
	characterA.regY = 520;
	characterA.x = 170;
	characterA.y = 705;
	
	characterB = new createjs.Sprite(
		new createjs.SpriteSheet(characterBFrames), "bored"
	);
	characterB.regX = 126;
	characterB.regY = 469;
	characterB.x = 863;
	characterB.y = 705;
	characterB.scaleX = -1;
	
	characterC = new createjs.Sprite(
		new createjs.SpriteSheet(characterCFrames), "neutral"
	);
	characterC.regX = 115;
	characterC.regY = 500;
	characterC.x = 640;
	characterC.y = 705;
	characterC.scaleX = -1;
	
	characterD = new createjs.Sprite(
		new createjs.SpriteSheet(characterDFrames), "neutral"
	);
	characterD.regX = 132;
	characterD.regY = 444;
	characterD.x = 418;
	characterD.y = 705;
	characterD.scaleX = -1;
	
	table = new createjs.Bitmap(queue.getResult("table"));
	table.regX = 327;
	table.regY = 228;
	table.x = 512;
	table.y = 736;
	
	stage.addChild(bg);
	stage.addChild(characterC);
	stage.addChild(characterD);
	stage.addChild(characterA);
	stage.addChild(characterB);
	stage.addChild(table);
}

function tick()
{
	stage.update();
}	

function resize()
{	
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight; 
	   
	if (stage.canvas.width/stage.canvas.height < 4/3)
	{
		stage.scaleX = stage.canvas.width/1024;
		stage.scaleY = stage.scaleX;
		stage.y = (stage.canvas.height-(768*stage.scaleY))/2
		stage.x = 0;
	}
	else
	{
		stage.scaleY = stage.canvas.height/768;
		stage.scaleX = stage.scaleY;
		stage.x = (stage.canvas.width-(1024*stage.scaleX))/2
		stage.y = 0;
	}
}
