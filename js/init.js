var stage;
var loadText;
var queue;
var currentScreen;
var keys = [];
var clickyBox;
var clicked;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(30);
	resize();
	
	this.document.onkeydown = keydown;
	
	loadText = new createjs.Text();
	loadText.font = "bold italic 72px Comic Neue Angular";
	loadText.text = "LOADING...";
	loadText.color = "#ffffff";
	loadText.textAlign = "center";
	loadText.x = 512;
	loadText.y = 384-36;
	stage.addChild(loadText);
	
	clickyBox = new createjs.Shape();
	clickyBox.graphics.beginFill("#ffffff").drawRect(0, 0, 1024, 768);
	clickyBox.alpha = 0.01;
	clickyBox.addEventListener("click", handleClick);
	
	queue = new createjs.LoadQueue(true);
	queue.on("complete", loadingComplete, this);
	console.log("Reticulating splines...");
	queue.loadManifest
	([
		{ id: "title", src: "img/title.png" },
		{ id: "title-bg", src: "img/title-bg.png" },
		{ id: "arrow", src: "img/arrow.png" },
		{ id: "bg", src: "img/bg.png" },
		{ id: "table", src: "img/table.png" },
		{ id: "character-a", src: "img/character-a.png" },
		{ id: "character-a-frames", src: "data/character-a.json" },
		{ id: "character-b", src: "img/character-b.png" },
		{ id: "character-b-frames", src: "data/character-b.json" },
		{ id: "character-c", src: "img/character-c.png" },
		{ id: "character-c-frames", src: "data/character-c.json" },
		{ id: "character-d", src: "img/character-d.png" },
		{ id: "character-d-frames", src: "data/character-d.json" },
		{ id: "dialogue", src: "data/dialogue.json" }
	]);
}

function loadingComplete()
{
	stage.removeChild(loadText);
	
	title = new createjs.Bitmap(queue.getResult("title"));
	titleBg = new createjs.Bitmap(queue.getResult("title-bg"));
	leftArrow = new createjs.Bitmap(queue.getResult("arrow"));
	rightArrow = new createjs.Bitmap(queue.getResult("arrow"));
	rightArrow.scaleX = -1;
	
	bg = new createjs.Bitmap(queue.getResult("bg"));
	
	characters[0] = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-a-frames")), "neutral"
	);
	characters[0].regX = 130;
	characters[0].regY = 520;
	
	characters[1] = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-b-frames")), "neutral"
	);
	characters[1].regX = 126;
	characters[1].regY = 469;
	
	characters[2] = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-c-frames")), "neutral"
	);
	characters[2].regX = 115;
	characters[2].regY = 500;
	
	characters[3] = new createjs.Sprite(
		new createjs.SpriteSheet(queue.getResult("character-d-frames")), "neutral"
	);
	characters[3].regX = 132;
	characters[3].regY = 444;
	
	table = new createjs.Bitmap(queue.getResult("table"));
	table.regX = 327;
	table.regY = 228;
	
	showTitle();
}

function tick()
{
	var keyPressed;
	if (keys[32] || clicked == "stage") keyPressed = "space";
	if (keys[37] || clicked == "left") keyPressed = "left";
	if (keys[39] || clicked == "right") keyPressed = "right";
	
	if (currentScreen == "game") gameLoop(keyPressed);
	if (currentScreen == "select") selectLoop(keyPressed);
	if (currentScreen == "title") titleLoop(keyPressed);
	
	keys = [];
	clicked = false;
	stage.update();
}

function keydown(event)
{
    keys[event.keyCode] = true;
}

function handleClick(event)
{
	clicked = "stage";
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
