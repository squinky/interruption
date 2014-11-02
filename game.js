var stage;
var queue;
var bg, table, characterA, characterB, characterC, characterD;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	createjs.Ticker.addEventListener("tick", stage);
	resize();
	
	queue = new createjs.LoadQueue(true);
	queue.on("complete", handleComplete, this);
	queue.loadManifest
	([
		{ id: "bg", src: "img/bg.png" },
		{ id: "table", src: "img/table.png" },
		{ id: "character-a", src: "img/character-a.png" },
		{ id: "character-a-frames", src: "data/character-a.json" },
		{ id: "character-b", src: "img/character-b.png" },
		{ id: "character-b-frames", src: "data/character-b.json" },
		{ id: "character-c", src: "img/character-c.png" },
		{ id: "character-c-frames", src: "data/character-c.json" },
		{ id: "character-d", src: "img/character-d.png" },
		{ id: "character-d-frames", src: "data/character-d.json" }
	]);
}

function handleComplete()
{
	bg = new createjs.Bitmap(queue.getResult("bg"));
	
	characterA = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-a-frames")), "point-talk"
	);
	characterA.regX = 130;
	characterA.regY = 520;
	characterA.x = 170;
	characterA.y = 705;
	
	characterB = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-b-frames")), "bored"
	);
	characterB.regX = 126;
	characterB.regY = 469;
	characterB.x = 863;
	characterB.y = 705;
	characterB.scaleX = -1;
	
	characterC = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-c-frames")), "neutral"
	);
	characterC.regX = 115;
	characterC.regY = 500;
	characterC.x = 640;
	characterC.y = 705;
	characterC.scaleX = -1;
	
	characterD = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-d-frames")), "neutral"
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
