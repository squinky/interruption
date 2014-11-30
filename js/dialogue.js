var grammar;
var friend, otherFriend, stranger;

function getNewLine()
{
	friend = grammar.createFlattened("#name#");
	otherFriend = grammar.createFlattened("#name#");
	stranger = grammar.createFlattened("#person#");
	
	return getLine("#startConvo#");
}

function getContinuingLine()
{
	return getLine("#continueConvo#");
}

function getLine(str)
{
	var trace = grammar.createTrace(str);
	grammar.pushRules("friend", new Array(friend), trace.id);
	grammar.pushRules("otherFriend", new Array(otherFriend), trace.id);
	grammar.pushRules("stranger", new Array(stranger), trace.id);
	return trace.expand().flatten();
}