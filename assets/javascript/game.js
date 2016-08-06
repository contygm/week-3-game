var wins = 0;
var lives = 7;
var pastGuess = [];
var spaceHolder = "" ;

var StarWars = [
	"Han Solo","Chewbacca the Wookiee",
	"Obi Wan Kenobi","Jar Jar Binks",
	"Count Dooku","Jabba the Hutt",
	"Leia Organa","Kylo Ren",
	"Anakin Skywalker","Darth Vader",
	
	"Luke Skywalker","Mace Windu",
	"Padme Amidala","The Phantom Menace",
	"Attack of the Clones","Revenge of the Sith",
	"A New Hope","The Empire Strikes Back",
	"Return of the Jedi","The Force Awakens",

	"Alderaan","Coruscant",
	"Dantooine","Naboo",
	"Tatooine","The Clone Wars",
	"George Lucas","Galactic Empire",
	"Rebel Alliance","Death Star",

	"Emperor Palpatine","Purple Lightsaber",
	"Jedi Master Yoda","Qui Gon Jinn",
	"May the Force Be With You","The Jedi Order",
	"There is no try","Never tell me the odds",
	"In a galaxy far far away","I am your Father",

	"Fear is the path to the dark side","Be mindful of your thoughts",
	"I sense great fear in you Skywalker","You were the chosen one",
	"Now I am the master","I find your lack of faith disturbing",
	"A powerful Sith you will become","I am C3PO Human Cyborg Relations",
	"Hard to see the Dark Side is","Laugh it up fuzz ball"
]

function checkRepeat(letter) {
	for (var i = 0; i <= pastGuess.length; i++){
		if (letter == pastGuess[i]) {
			return true;
		} 
	}
};

var theWord = StarWars[Math.floor(Math.random() * 50)];

function printWord() {
	for (var n = 0; n < theWord.length; n++) {
		if (/[a-zA-Z]/.test(theWord[n])){
			spaceHolder += "_";
		} else {
			spaceHolder += "\u00A0";
		}
	}
	document.getElementById("word").innerHTML= spaceHolder;
	document.getElementById("hangman").src = "assets/images/Hangman-7.png";
};

function resetWord (){
	theWord = StarWars[Math.floor(Math.random() * 50)];
	pastGuess = [];
	spaceHolder = "";
	lives = 7;
	document.getElementById("lives").innerHTML= lives + " Errors";
	document.getElementById("lastGuess").innerHTML= "Your last guess was: <br>";
	document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
};

function checkGuess(letter) {
	var correct = 0;
	for (var n = 0; n < theWord.length; n++) {
		if (letter == theWord[n].toUpperCase()){
			spaceHolder = spaceHolder.substr(0, n) + theWord[n] + spaceHolder.substr(n+1);
			correct++;
		}
	}
	document.getElementById("word").innerHTML= spaceHolder;
	if (correct > 0) {return true};
};

function checkSpaceHolder (letter) {
	for (var n = 0; n < theWord.length; n++) {
		if (letter == spaceHolder[n]){
			return true;
		}
	}	
};

function checkWin(){
	for(var n = 0; n < spaceHolder.length; n++){
		if (spaceHolder.includes("_") != true){
			wins++;
			document.getElementById("wins").innerHTML= "Wins: "+ wins;
			document.getElementById("directions").innerHTML= "You won!";
			document.getElementById("hangman").src = "assets/images/win.gif";
			var audioWin = new Audio('assets/images/force.mp3');
			audioWin.play();
			resetWord();
			setTimeout(printWord, 3000);
			
		}
	}
};

function updateLives(){
	lives--;
	if (lives < 1) {
		document.getElementById("directions").innerHTML= "Oops! Looks like you lost! Hit a key for your next round!";
		document.getElementById("hangman").src = "assets/images/lose.gif";
		var audioLose = new Audio('assets/images/do_or_do_not.wav');
		audioLose.play();
		resetWord();
		setTimeout(printWord, 3000);

	} else {
		document.getElementById("directions").innerHTML= "Nope! Try again!";
		document.getElementById("lives").innerHTML= lives + " Errors";
		document.getElementById("hangman").src = "assets/images/Hangman-" + lives + ".png";
		var audioWrong = new Audio('assets/images/lightsaber_01.wav');
		audioWrong.play();
	}
};

window.onload = printWord;

document.onkeyup = function(event) {
	var guess = String.fromCharCode(event.keyCode).toUpperCase();
	
	// is it an alpha key?
	if (!/[A-Z]/.test(guess)) {
		document.getElementById("directions").innerHTML= "Select an alpha key.";
	} 

	// have they guessed that already?
	else if (checkRepeat(guess)){
		document.getElementById("directions").innerHTML= "You guessed that already! Try again.";
	} 

	else if (checkSpaceHolder(guess)) {
		document.getElementById("directions").innerHTML= "You got that one right already!";
	}

	// check if right
	else if (checkGuess(guess)) {
		document.getElementById("directions").innerHTML= "You got one!";
		checkWin();
	}

	// wrong guess
	else {
		document.getElementById("directions").innerHTML= "Nope! Try again!";
		document.getElementById("lastGuess").innerHTML= "Your last guess was: <br>" + guess.toUpperCase() ;
		pastGuess.push(guess);
		document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
		updateLives();
	}

}