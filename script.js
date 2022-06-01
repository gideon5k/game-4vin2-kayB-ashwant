/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = UITLEG;

var spelerX = 600; // x-positie van speler
var spelerY = 720-25; // y-positie van speler
var vijandX = 600; // x-positie van vijand
var vijandY = 200; // y-positie van vijand
var springSnelheid = 0; // snelheid van sprong
var aanHetSpringen = false // sprong
var img // plaatje
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
 var beweegAlles = function () {
  // speler
  var speed = 6
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
     spelerX = spelerX + speed
  };
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){
    spelerX = spelerX - speed
 };
 


  if (keyIsDown(68) && keyIsDown(16)){
    spelerX = spelerX + speed * 2
  };
  if (keyIsDown(65) && keyIsDown(16)){
    spelerX = spelerX - speed * 2
  };
  if (keyIsDown(LEFT_ARROW) && keyIsDown(16)){
    spelerX = spelerX - speed * 2
  };
  if (keyIsDown(RIGHT_ARROW) && keyIsDown(16)){
    spelerX = spelerX + speed * 2
  };


  if (aanHetSpringen === false && keyIsDown(32)) { // start met springen
    springSnelheid = 10;
    aanHetSpringen = true;
  }
  if (aanHetSpringen === true) { // bezig met springen
    spelerY = spelerY - springSnelheid ;
    springSnelheid = springSnelheid - 0.2 ;
  }
  if (aanHetSpringen === true && spelerY > 720-30) { // klaar met springen
    aanHetSpringen = false;
    spelerY = 720-25;
  }

  
  //platorm
  if (spelerX > 130 &&
      spelerX < 230 &&
      spelerY < 650 &&
      spelerY > 650 -20) 
      {
        spelerY = 630
        console.log("SPRING")
       aanHetSpringen = false
        if (spelerX < 130 || 
           spelerX > 230) 
          { aanHetSpringen = true
          
        }
      }


  
  // vijand
  var vijandSpeed = 4

  if (spelerX > vijandX) {
    vijandX = vijandX + vijandSpeed
  };
  if (spelerY > vijandY) {
      vijandY = vijandY + vijandSpeed
  };
  if (spelerX < vijandX) {
    vijandX = vijandX - vijandSpeed
  };
  if (spelerY < vijandY) {
    vijandY = vijandY - vijandSpeed
};
  // kogel

 };
/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand
  

  if (spelerY - vijandY < 62 &&
    spelerY - vijandY > -40 &&
    spelerX - vijandX < 53 &&
    spelerX - vijandX > -52
  )
  (spelStatus = SPELEN)
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
    fill('blue')
     rect(0,0,1280,720)
     
 // vijand
 fill('black')
 rect(vijandX -50/2, vijandY -50/2 +10, 100/2, 100/2);
 fill('red')
 ellipse(vijandX - 30/2, vijandY - 10/2, 30/2,30/2)
 fill('red')
 ellipse(vijandX + 30/2 +2, vijandY - 10/2, 30/2,30/2)
 fill('green')
 ellipse(vijandX, vijandY + 30, 80/2,10/2)
 fill('white')
 triangle(vijandX -25,vijandY + 26, vijandX - 15, vijandY +40, vijandX +1, vijandY +26)
 triangle(vijandX +1,vijandY + 26, vijandX + 15, vijandY +40, vijandX +26, vijandY +26)
  
   // platform
   fill("red")
   rect(130, 650, 100, 20);
   
   
  // speler
  

    /*fill("white"); rect(spelerX - 25, spelerY - 25, 50, 50); 
    fill("black"); 
    ellipse(spelerX, spelerY, 10, 10); */
    image(img, spelerX-50, spelerY-50, 100,77)
    
  // punten en health
  

};
/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

  function preload() {
  img = loadImage('plaatjes/Goomba-icon.png');
  }
  


  
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280,720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
    console.log("Spelen")
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("Game over")
     textSize(50);
     fill(0,0,0);
    text('verloren, klik BACKSPACE voor uitleg',100,100);
    if (keyIsDown(8)) { // Backspace
      spelStatus = UITLEG;
    }
  }



if (spelStatus === UITLEG) {
  // teken uitleg scherm
  console.log("Uitleg");
   rect(0,0,1280,720);
  fill(0,0,0);
  text('Druk "enter" voor spelen', 100,100);
  textSize(50);
  fill(0,0,255);
  if (keyIsDown(13)){ // enter
    spelerX = 350
    spelerY = 695
    vijandX = 900
    vijandY = 200
spelStatus = SPELEN;
  }
}
}


