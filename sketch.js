var mc,mcIMG;
var ground;
var backgroundIMG;
var startButton;
var gameState = 0;
var germ, germGroup,germIMG;
var block,blockGroup;
var weapon1;
var ammo,ammoGroup;
var playAgain;
var score = 0;
var time = 0;

function preload(){
  backgroundIMG = loadImage("Images/sidewalk.jpg")
  germIMG = loadImage("Images/germImage3.png");
  mcIMG = loadImage("Images/whiteBloodCellMain.png");
  //backgroundIMG2 = loadImage("Images/schoolBG.jpg");
}

function setup() {
  createCanvas(displayWidth-200,displayHeight-130);

  backgroundSprite = createSprite(displayWidth/2,displayHeight/2-300);
  backgroundSprite.addImage(backgroundIMG);
  backgroundSprite.scale = 12; 

  ground = createSprite(displayWidth/2,displayHeight/2+400,2000,40);

  mc = createSprite(400, 200, 50, 50);
  mc.shapeColor = "green";
  mc.addImage(mcIMG);
  mc.scale = 0.5;

  startButton = createSprite(displayWidth/2,displayHeight/2,1000,200);
  startButton.shapeColor = "yellow";

  weapon1 = createSprite(12,12,20,0.1);
  weapon1.shapeColor = "darkblue";

  germGroup = createGroup();

  blockGroup = createGroup();

  ammoGroup = createGroup();

  playAgain = createSprite(ground.x-120,ground.y-110,300,75)
  playAgain.shapeColor = "yellow";
}

function draw() {
  background(0,255,255); 
  //console.log(gameState);

  playAgain.visible = false;
  weapon1.visible = false;

  time = time+1;

  if(gameState === 0){
    startButton.visible = true
    
    if(keyCode === 32){
      gameState = 1;
    }
  }

  if(gameState === 1){
    //playing game
    startButton.visible = false

    weapon1.x = mc.x+25;
    weapon1.y = mc.y+10;

    shoot();

  //console.log(time);
  //if(time > 500){
    //backgroundSprite.addImage(backgroundIMG2);
    //backgroundSprite.scale = 6;
  //}

    backgroundSprite.velocityX = -10;

    if (backgroundSprite.x < 100){
      backgroundSprite.x = backgroundSprite.width/0.2;
    }
    //infinite stuff

    mc.y = mc.y + 40;
    mc.collide(ground);
    mc.collide(blockGroup);

    //console.log(mc.y)
    if(keyDown("space")  && mc.y > 649){
      mc.y = mc.y - 300
    }
    //jump

    if(keyDown("right")){
      mc.x= mc.x + 50
    }
    if(keyDown("left")){
      mc.x= mc.x - 50
    }
    //slight left or right adjustment

    for(i = 0; i < germGroup.length; i++){
      for(a = 0; a < ammoGroup.length; a++){
        if(germGroup.get(i).isTouching(ammoGroup.get(a))){
          score = score + 1;
          germGroup.get(i).destroy();
          ammoGroup.get(a).destroy();
    }
  }
}
  
  if(mc.x < 0 || mc.isTouching(germGroup) || mc.x > displayWidth-200){
    gameState = 2;
  }
    backgroundSprite.visible = true;
    mc.visible = true;
    weapon1.visible = true;
    ground.visible = true;
    playAgain.visible = false;

    spawnEnemies();
    //creates enemies regularly
    spawnBlocks();
    //create block regularly
  }

  if(gameState === 2){
    germGroup.destroyEach();
    ammoGroup.destroyEach();
    blockGroup.destroyEach();

    backgroundSprite.visible = false;
    mc.visible = false;
    weapon1.visible = false;
    ground.visible = false;
    playAgain.visible = true;

    if(mousePressedOver(playAgain)){
      gameState = 1;

      //backgroundSprite.addImage(backgroundIMG);

      mc.x = 400;
      mc.y = 200;

      score = 0;

      germGroup.destroyEach();
      ammoGroup.destroyEach();
      blockGroup.destroyEach();
    }
  }

  drawSprites();

  if(gameState === 0){
    textSize(25);
    fill("blue")
    text("Press 'space' to Start", 300, 300);

    textSize(50)
    text("Shoot as Many Germs as Possible", displayWidth/2-400,displayHeight/2+20);

    textSize(20);
    text("Press 'F' to shoot",20,50);
    text("Press 'space' to jump",20,100);

    textSize(20)
    fill("blue")
    text("Score: "+ score, 20,120)
  }
  if(gameState === 1){
    textSize(20);
    fill("blue");
    stroke("black")
    text("Score: "+ score,20,100)
  }
  if(gameState === 2){
    textSize(40);
    fill("blue");

    text("Nice Job!",ground.x+400,displayHeight-600);
    text("Nice Job!",ground.x,displayHeight-700);
    text("Nice Job!",ground.x-400,displayHeight-700);
    text("Nice Job!",ground.x-800,displayHeight-600);

    textSize(30)
    text("You scored "+ score + " points!",ground.x-250,displayHeight/2-100);

    text("Play Again?",ground.x-200,ground.y-100);

  }

}


function spawnEnemies(){
  if(frameCount % 70 === 0){
    
    germ = createSprite(displayWidth,random(500,900),random(50,150),random(50,150))
    germ.velocityX = -10;

    germ.shapeColor= "red"
    germ.addImage(germIMG);
    germ.scale = 0.25;

    germ.lifetime = 200;
    germGroup.add(germ);
  }
}

function spawnBlocks(){
  if(frameCount % 50 === 0){

    block = createSprite(displayWidth,random(600,800),random(100,300),50)
    block.velocityX = -10;

    block.lifetime = 200;

    blockGroup.add(block);
  }
}

function shoot(){
  if(keyCode === 70){
    if(frameCount % 30 === 0){
      ammo = createSprite(weapon1.x,weapon1.y,10,10);
      ammo.velocityX = 6;
      ammo.lifetime = 175;
      ammo.shapeColor = "lightblue"

      ammoGroup.add(ammo);
    }
  }
}