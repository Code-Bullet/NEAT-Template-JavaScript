//this is a template to add a NEAT ai to any game
//note //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
//this means that there is some information specific to the game to input here


var nextConnectionNo = 1000;
var population;
var speed = 60;


var showBest = true; //true if only show the best of the previous generation
var runBest = false; //true if replaying the best ever game
var humanPlaying = false; //true if the user is playing

var humanPlayer;


var showBrain = false;
var showBestEachGen = false;
var upToGen = 0;
var genPlayerTemp; //player

var showNothing = false;


//--------------------------------------------------------------------------------------------------------------------------------------------------

function setup() {
  window.canvas = createCanvas(1280, 720);
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  population = new Population(500);
  humanPlayer = new Player();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function draw() {
  drawToScreen();
  if (showBestEachGen) { //show the best of each gen
    showBestPlayersForEachGeneration();
  } else if (humanPlaying) { //if the user is controling the ship[
    showHumanPlaying();
  } else if (runBest) { // if replaying the best ever game
    showBestEverPlayer();
  } else { //if just evolving normally
    if (!population.done()) { //if any players are alive then update them
      population.updateAlive();
    } else { //all dead
      //genetic algorithm
      population.naturalSelection();
    }
  }
}
//-----------------------------------------------------------------------------------
function showBestPlayersForEachGeneration() {
  if (!genPlayerTemp.dead) { //if current gen player is not dead then update it

    genPlayerTemp.look();
    genPlayerTemp.think();
    genPlayerTemp.update();
    genPlayerTemp.show();
  } else { //if dead move on to the next generation
    upToGen++;
    if (upToGen >= population.genPlayers.length) { //if at the end then return to the start and stop doing it
      upToGen = 0;
      showBestEachGen = false;
    } else { //if not at the end then get the next generation
      genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
    }
  }
}
//-----------------------------------------------------------------------------------
function showHumanPlaying() {
  if (!humanPlayer.dead) { //if the player isnt dead then move and show the player based on input
    humanPlayer.look();
    humanPlayer.update();
    humanPlayer.show();
  } else { //once done return to ai
    humanPlaying = false;
  }
}
//-----------------------------------------------------------------------------------
function showBestEverPlayer() {
  if (!population.bestPlayer.dead) { //if best player is not dead
    population.bestPlayer.look();
    population.bestPlayer.think();
    population.bestPlayer.update();
    population.bestPlayer.show();
  } else { //once dead
    runBest = false; //stop replaying it
    population.bestPlayer = population.bestPlayer.cloneForReplay(); //reset the best player so it can play again
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//draws the display screen
function drawToScreen() {
  if (!showNothing) {
    //pretty stuff
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    drawBrain();
    writeInfo();
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function drawBrain() { //show the brain of whatever genome is currently showing
  var startX = 0; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  var startY = 0;
  var w = 0;
  var h = 0;

  if (runBest) {
    population.bestPlayer.brain.drawGenome(startX, startY, w, h);
  } else
  if (humanPlaying) {
    showBrain = false;
  } else if (showBestEachGen) {
    genPlayerTemp.brain.drawGenome(startX, startY, w, h);
  } else {
    population.players[0].brain.drawGenome(startX, startY, w, h);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//writes info about the current player
function writeInfo() {
  fill(200);
  textAlign(LEFT);
  textSize(30);
  if (showBestEachGen) {
    text("Score: " + genPlayerTemp.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    text("Gen: " + (genPlayerTemp.gen + 1), 1150, 50);
  } else
  if (humanPlaying) {
    text("Score: " + humanPlayer.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  } else
  if (runBest) {
    text("Score: " + population.bestPlayer.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    text("Gen: " + population.gen, 1150, 50);
  } else {
    if (showBest) {
      text("Score: " + population.players[0].score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      text("Gen: " + population.gen, 1150, 50);
      text("Species: " + population.species.length, 50, canvas.height / 2 + 300);
      text("Global Best Score: " + population.bestScore, 50, canvas.height / 2 + 200);
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function keyPressed() {
  switch (key) {
    case ' ':
      //toggle showBest
      showBest = !showBest;
      break;
      // case '+': //speed up frame rate
      //   speed += 10;
      //   frameRate(speed);
      //   prvarln(speed);
      //   break;
      // case '-': //slow down frame rate
      //   if(speed > 10) {
      //     speed -= 10;
      //     frameRate(speed);
      //     prvarln(speed);
      //   }
      //   break;
    case 'B': //run the best
      runBest = !runBest;
      break;
    case 'G': //show generations
      showBestEachGen = !showBestEachGen;
      upToGen = 0;
      genPlayerTemp = population.genPlayers[upToGen].clone();
      break;
    case 'N': //show absolutely nothing in order to speed up computation
      showNothing = !showNothing;
      break;
    case 'P': //play
      humanPlaying = !humanPlaying;
      humanPlayer = new Player();
      break;
  }
  //any of the arrow keys
  switch (keyCode) {
    case UP_ARROW: //the only time up/ down / left is used is to control the player
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case DOWN_ARROW:
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case LEFT_ARROW:
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case RIGHT_ARROW: //right is used to move through the generations

      if (showBestEachGen) { //if showing the best player each generation then move on to the next generation
        upToGen++;
        if (upToGen >= population.genPlayers.length) { //if reached the current generation then exit out of the showing generations mode
          showBestEachGen = false;
        } else {
          genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
        }
      } else if (humanPlaying) { //if the user is playing then move player right

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      }
      break;
  }
}
