var userClickedPatter = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = (Math.random() * 4);
    var randomNumber = Math.floor(randomNumber);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;

    $("#level-title").text("Level " + level);

    userClickedPatter = [];
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); 
    
    userClickedPatter.push(userChosenColour); 

    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));

    checkAnswer(userClickedPatter.length - 1);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3"); 
    audio.play(); 
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

var level = 0;

$(document).keydown(function () {
    var started = false;

    if (started === false) {
    nextSequence();
    started = true
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPatter[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPatter.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}