var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var isStart = 1;

var level = 0;

$(document).on("keydown",function(){
    if(isStart === 1){
        $("#level-title").html("Level "+level);
        nextSequence();
    }
    isStart = 0;
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // Animation (flash and sound)
    $("."+randomChosenColour).fadeOut(50).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("#level-title").html("Level "+level);
}

// for chosen clicked button
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

// function for sound
function playSound(name){
    var chosenColourSound = new Audio("./sounds/"+name+".mp3");
    chosenColourSound.play();
}

// flash animation for button click
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// checker if pattern is right or wrong
function checkAnswer(){
    var userPatternLength = userClickedPattern.length;
    userPatternLength--;

    if(userClickedPattern[userPatternLength] === gamePattern[userPatternLength]){
        console.log("correct");
        if((userClickedPattern.length) === (gamePattern.length)){
            userClickedPattern = [];
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        wrongClick();
        startOver();
    }
}

// animation when clicked wrong button
function wrongClick(){
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");

    playSound("wrong");
}

// will reset variables
function startOver(){
    isStart = 1;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
