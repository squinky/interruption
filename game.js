var stage;
var bg;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	createBG();
	createjs.Ticker.addEventListener("tick", stage);
	resize();
}

function createBG()
{
	bg = new createjs.Bitmap("img/bg.png");
	stage.addChild(bg);
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
