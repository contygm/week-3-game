var wins = 0;
var lives = 10;
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
	"May the Force Be With You","The Jedi Order"
]

function checkRepeat(letter) {
	for (var i = 0; i <= pastGuess.length; i++){
		if (letter == pastGuess[i]) {
			return true;
		} 
	}
};

var theWord = StarWars[Math.floor(Math.random() * 36)];

function printWord() {
	for (var n = 0; n < theWord.length; n++) {
		if (/[a-zA-Z]/.test(theWord[n])){
			spaceHolder += "_";
		} else {
			spaceHolder += "\u00A0";
		}
	}
	document.getElementById("word").innerHTML= spaceHolder;
};

function resetWord (){
	theWord = StarWars[Math.floor(Math.random() * 36)];
	pastGuess = [];
	spaceHolder = "";
	printWord();
	lives = 10;
	document.getElementById("lives").innerHTML= lives + " Lives Left";
	document.getElementById("directions").innerHTML= "You Won!";
	document.getElementById("lastGuess").innerHTML= "You're Last Guess was: <br>";
	document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
};

function checkGuess(letter) {
	var correct = 0;
	for (var n = 0; n < theWord.length; n++) {
		
		if (letter == theWord[n].toLowerCase()){
			console.log(spaceHolder[n]);
			console.log(theWord[n]);
			console.log(spaceHolder);
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
			resetWord();
			console.log(theWord);
		}
	}
};

function updateLives(){
	lives--;
	if (lives < 1) {
		document.getElementById("directions").innerHTML= "Oops! Looks like you lost! Hit a key for your next guess!";
		resetWord();
	} else {
		document.getElementById("directions").innerHTML= "Nope! Try Again!";
		document.getElementById("lives").innerHTML= lives + " Lives Left";
	};
}

window.onload = printWord;
console.log(theWord);

document.onkeyup = function(event) {
	var guess = String.fromCharCode(event.keyCode).toLowerCase();
	
	// is it an alpha key?
	if (!/[a-z]/.test(guess)) {
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
		document.getElementById("directions").innerHTML= "Nope! Try Again!";
		document.getElementById("lastGuess").innerHTML= "You're Last Guess was: <br>" + guess;
		pastGuess.push(guess);
		document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
		updateLives();
	}


}