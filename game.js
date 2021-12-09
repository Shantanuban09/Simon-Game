
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () { 
    if(!started){

        started = true;
        nextSequence();
    }
});


$(".btn").on("click", function(){
    var userColorChosen = $(this).attr("id");
    userClickedPattern.push(userColorChosen);

    animate(userColorChosen);
    sound(userColorChosen);
    $("#" + userColorChosen).fadeOut(100).fadeIn(100);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game-Over!! Press Any Key To Restart");

        restart();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);

    $("#" + randomColorChosen).fadeOut(100).fadeIn(100);
    animate(randomColorChosen);
    sound(randomColorChosen);
}

function sound(name){
var audioToPlay = new Audio("sounds/" + name + ".mp3");
audioToPlay.play();
}
function animate(name){
    $("#" + name).addClass("pressed");
    setTimeout(function(){
        $("#" + name).removeClass("pressed");
    }, 100);
}

function restart(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
