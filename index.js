var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

function playSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function nextSequence(){

    level++;
    userClickedPattern = [];
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    // console.log(randomChosenColour);
    // $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // var sound = new Audio("./sounds/"+randomChosenColour+".mp3");
    // sound.play();
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}


$(document).keydown(function(event){
    if(started === false){
        $("#level-title").text("level "+level);
        nextSequence();
        console.log(event.key);
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        var wronngSound = new Audio("./sounds/wrong.mp3");
        wronngSound.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    
    console.log(currentLevel);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}