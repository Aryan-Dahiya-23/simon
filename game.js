
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(300).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




















//  Another way to find out which button is pressed =>

// $(".btn").click(function(e){
//     var idClicked = e.target.id;

//     alert(idClicked + " is pressed");
// });