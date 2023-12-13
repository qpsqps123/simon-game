const buttonColors = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let level = 0;
let started = false; 

$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSquence();  
    started = true;
  }
});

$(".btn").click(function (){
  
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("right! (-: well done.");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(() => {
        userClickedPattern = [];
        nextSquence();
      }, 1000);

    }
  } else {

    console.log("wrong...! Try again!");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")

    $("body").addClass("game-over");    

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){

  gamePattern = [];
  userClickedPattern = [];
  
  level = 0;
  started = false;
}

function nextSquence() {

  level++;

  $("#level-title").text("Level " + level);
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  };

  const randomNumber = getRandomIntInclusive(0, 3);

  const randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).addClass("." + randomChosenColor).fadeIn(100);

  playSound(randomChosenColor);

}

function playSound(name) {
  name = new Audio("./sounds/" + name + ".mp3");
  name.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}