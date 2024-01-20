
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

$(".btn").click(function(){
    //console.log(this);                                    //<div type="button" id="red" class="btn red"></div>
    //console.log($(this).attr("id"));                      //red
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
            userClickedPattern = [];
            level++;
            $("#level-title").text("level "+level);
            var randomNumber = Math.floor(Math.random()*4);
                //console.log(randomNumber);
            var randomChosenColour = buttonColours[randomNumber];
                //console.log(randomChosenColour);
            gamePattern.push(randomChosenColour);

            $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
            
            //    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
            //    audio.play();
                playSound(randomChosenColour);


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed"); //or $("#"+currentColour)
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

    function checkAnswer(currentLevel){
        // console.log("Game Patter :" +gamePattern)
        // console.log("User Clicked Pattern :" +userClickedPattern)

   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                nextSequence();
                }, 1000);
        }
   }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
   }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}