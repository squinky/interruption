var grammar;
var convoLength, convoCurrent, storyteller;
var friend, otherFriend, stranger;

function startNewConvo()
{
	convoLength = 5+Math.floor(Math.random()*5);
	convoCurrent = 0;
	storyteller = speaker;
	friend = grammar.createFlattened("#name#");
	otherFriend = grammar.createFlattened("#name#");
	stranger = grammar.createFlattened("#person#");
}

function getNewLine()
{
	if (!convoLength)
	{
		startNewConvo();
		return getLine("#startConvo#");
	}
	else
	{
		convoCurrent++;
		if (convoCurrent >= convoLength) convoLength = 0;
		if (storyteller == speaker) return getLine("#continueConvo#");
		else return getLine("#respondToConvo#");
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