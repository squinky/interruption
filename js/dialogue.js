var grammar;
var convoLength, convoCurrent, storyteller;
var startMonologueFlag, endMonologueFlag;
var friend, otherFriend, stranger;

function startNewConvo()
{
	convoLength = 5+Math.floor(Math.random()*5);
	convoCurrent = 0;
	storyteller = speaker;
	if (storyteller != PLAYER_SPEAKING)
	{
		friend = grammar.createFlattened("#name#");
		otherFriend = grammar.createFlattened("#name#");
		stranger = grammar.createFlattened("#person#");
	}
}

function getNewLine()
{
	if (startMonologueFlag)
	{
		startMonologueFlag = false;
		if (speaker == PLAYER_SPEAKING) convoLength = 0;
		else convoLength++;
	}
	else if (!convoLength && speaker == PLAYER_SPEAKING) convoLength = convoCurrent+1;
	if (endMonologueFlag)
	{
		endMonologueFlag = false;
		if (speaker != PLAYER_SPEAKING) convoLength = 0;
		else convoLength++;
	}
	
	if (!convoLength)
	{
		startNewConvo();
		if (speaker == PLAYER_SPEAKING) return getLine("#startMonologue#");
		else return getLine("#startConvo#");
	}
	else
	{
		convoCurrent++;
		if (convoCurrent >= convoLength) convoLength = 0;
		if (storyteller == speaker)
		{
			if (speaker == PLAYER_SPEAKING)
			{
				convoLength = convoCurrent+1; // make sure the monologue goes on and on
				return getLine("#continueMonologue#");
			}
			else return getLine("#continueConvo#");
		}
		else
		{
			if (speaker == PLAYER_SPEAKING)
			{
				startMonologueFlag = true;
				return getLine("#playerRespondToConvo#");
			}
			else if (storyteller == PLAYER_SPEAKING)
			{
				endMonologueFlag = true;
				return getLine("#respondToMonologue#");
			}
			else return getLine("#respondToConvo#");
		}
	}
}

function getLine(str)
{
	var trace = grammar.createTrace(str);
	grammar.pushRules("friend", new Array(friend), trace.id);
	grammar.pushRules("otherFriend", new Array(otherFriend), trace.id);
	grammar.pushRules("stranger", new Array(stranger), trace.id);
	return trace.expand().flatten();
}