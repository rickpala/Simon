var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level  = 0;

$(document).on("keydown", function(){
	if (!started){
		$("h1").text("Level 0");
		setTimeout(function() {
			nextSequence();
		}, 1000);

		started = true;
	}
});

function nextSequence(){
	//new turn
	userClickedPattern = [];
	level++;
	$("h1").text("Level " + level);

	//choose random color for game pattern
	var randomNumber = Math.floor(Math.random() * 10) % 4;
	var randomColor = buttonColors[randomNumber];
	gamePattern.push(randomColor);
	$("#" + randomColor).fadeOut(100).fadeIn(100);
	var audio = new Audio("sounds/" + randomColor + ".mp3");
	audio.play();


}

$(".btn").on("click", function() {
	//grab user input and validate move
	var userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);
	animatePress(userChosenColor);
	playSound(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel){

	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
		console.log("success");
		if (userClickedPattern.length === gamePattern.length){
			return setTimeout(function(){
				nextSequence();
			}, 1000);
		}
	}
	else {
		playSound("wrong");
		return endGame();
		console.log("wrong");
	}	
}

function endGame(){
	started = false;
	gamePattern = [];
	level = 0;
	$("h1").text("Game Over, Press Any Key to Restart");
	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over");
	}, 400);


	// $("body").fadeIn("slow", function() {
	// 	$(this).addClass("game-over");
	// }).fadeOut("slow", function() {
	// 	$(this).removeClass("game-over");
	// }).fadeIn("slow", function() {
	// 	$(this).addClass("game-over")
	// });
}

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}