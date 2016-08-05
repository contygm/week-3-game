var wins = 0;
var lives = 0;
var pastGuess = [];
var spaceHolder = "" ;

var StarWars = [
	"Han Solo","Chewbacca the Wookiee",
	"Obi Wan Kenobi","Jar Jar Binks",
	"Count Dooku","Jabba the Hutt",
	"Leia Organa","Kylo Ren",
	"Anakin Skywalker","Darth Vader",
	
	"Luke Skywalker","Mace Windu",
	"Padmé Amidala","The Phantom Menace",
	"Attack of the Clones","Revenge of the Sith",
	"A New Hope","The Empire Strikes Back",
	"Return of the Jedi","The Force Awakens",

	"Alderaan","Coruscant",
	"Dantooine","Naboo",
	"Tatooine","The Clone Wars",
	"George Lucas","Galactic Empire",
	"Rebel Alliance","Death Star",

	"Emperor Palpatine","Purple Lightsaber",
	"Jedi Master Yoda","Qui-Gon Jinn",
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

function checkGuess(letter) {
	for (var n = 0; n < theWord.length; n++) {
		if (letter == theWord[n].toLowerCase()){
			spaceHolder[n] = theWord[n];
			document.getElementById("word").innerHTML= spaceHolder;
			return true;
		}
	}
};

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

	// check if right
	else if (checkGuess(guess)) {
		document.getElementById("directions").innerHTML= "You got one!";
	}

	// wrong guess
	else {
		document.getElementById("directions").innerHTML= "Good Guess!";
		document.getElementById("lastGuess").innerHTML= "You're Last Guess was: <br>" + guess;
		pastGuess.push(guess);
		document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
	}


}