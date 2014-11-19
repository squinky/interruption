var title, titleBg, leftArrow, rightArrow;
var selectedCharacter;

function showTitle()
{
	stage.addChild(titleBg);
	stage.addChild(title);
	stage.addChild(clickyBox);
	currentScreen = "title";
}

function titleLoop(keyPressed)
{
	if (keyPressed == "space")
	{
		stage.removeChild(title);
		stage.removeChild(clickyBox);
		
		selectText = new createjs.Text();
		selectText.font = "bold italic 72px Comic Neue Angular";
		selectText.text = "WHO DO YOU WANT TO BE?";
		selectText.color = "#ffffff";
		selectText.textAlign = "center";
		selectText.x = 512;
		selectText.y = 50;
		stage.addChild(selectText);
		
		selectedCharacter = Math.floor(Math.random()*4);
		changePlayer();
		stage.addChild(player);
		stage.addChild(clickyBox);
		
		leftArrow.regX = 0;
		leftArrow.regY = 90;
		leftArrow.x = 156;
		leftArrow.y = 450;
		rightArrow.regX = 0;
		rightArrow.regY = 90;
		rightArrow.x = 1024-156;
		rightArrow.y = 450;
		stage.addChild(leftArrow);
		stage.addChild(rightArrow);
		leftArrow.addEventListener("click", clickLeft);
		rightArrow.addEventListener("click", clickRight);
		
		currentScreen = "select";
	}
}

function changePlayer()
{
	player = characters[selectedCharacter];
	player.x = 512;
	player.y = 700;
}

function selectLoop(keyPressed)
{
	if (keyPressed == "space")
	{
		var i = 0;
		for (var j = 0; j < 4; j++)
		{
			if (characters[j] != player)
			{
				npc[i] = characters[j];
				i++;
			}
		}
		
		npc.sort(function() {return 0.5 - Math.random()});
		
		stage.removeAllChildren();
		startGame();
	}
	if (keyPressed == "right")
	{
		stage.removeChild(player);
		selectedCharacter++;
		if (selectedCharacter > 3) selectedCharacter = 0;
		changePlayer();
		stage.addChild(player);
	}
	if (keyPressed == "left")
	{
		stage.removeChild(player);
		selectedCharacter--;
		if (selectedCharacter < 0) selectedCharacter = 3;
		changePlayer();
		stage.addChild(player);
	}
}

function clickLeft(event)
{
	clicked = "left";
}

function clickRight(event)
{
	clicked = "right";
}
