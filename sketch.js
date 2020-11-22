var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey, monkeyRunning;
var ground,movingGround;
var banana,obstacle,obstaclesGroup,bananaGroup,spawnBanana,spawnObstacles;
var score, survivalTime;
var gameOver;

function preload(){
  
  monkeyImage = loadImage("sprite_2.png")
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")  
  
  obstaclesImage = loadImage("obstacle.png")
  bananaImage = loadImage("banana.png")
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restartButton.png")
  
  collectingBananaSound = loadSound("collectingSound.mp3");
  crashingSound = loadSound("Crash Sound.mp3")
  
}

function setup(){
  createCanvas(480,480);
  
  monkey = createSprite(100,415,20,20);
  monkey.addAnimation("moving", monkeyRunning)
  monkey.scale = 0.12;
  
  ground = createSprite(240,420,950,12);
  //movingGround
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  gameOver = createSprite(240,240,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.2;
  restart = createSprite(240,310,20,20)
  restart.addImage(restartImage)
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
 
  monkey.setCollider("rectangle", 0,0,monkey.width,monkey.height)
  monkey.debug = false;
  
}    

score = 0;
var survivalTime = 0;

function draw(){
  
   background("lightGreen")
  
  
  
    if (gameState === PLAY){
      
      gameOver.visible = false;
      restart.visible = false;
      monkey.visible = true;
      ground.visible = true;
      
      if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
        collectingBananaSound.play();
    score = score + 1;
  }
  
   if(keyDown("space") && monkey.y>= 360){
    monkey.velocityY = -16;
    
  }    
      
    monkey.velocityY = monkey.velocityY + 0.8
      
  stroke("black")
  textSize(20);
  fill("black")
  text("Score: "+score,315,50)
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime: "+ survivalTime, 70, 50)
  
  //movingGround
  if(ground.x<0){
    ground.x = ground.width/2;
  }
 
  
    
     
}

  monkey.collide(ground);
  
  if(monkey.isTouching(obstacleGroup)){ 
     
   gameState = END;
   crashingSound.play();
    
}
  
  if (gameState === END){
    
    gameOver.visible = true;
    restart.visible = true;
    monkey.visible = false;
    ground.visible = false;
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
        
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    stroke("black")
    textSize(30);
    fill("black")
    text("Score: "+score,185,70)
    
       
  }
  
  
  
  drawSprites();
  
  spawnObstacles();
  spawnBanana();
   
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  var survivalTime = 0;
  score = 0;
  
}

function spawnObstacles(){
  
  if(frameCount % 120 === 0){
    
    var obstacle = createSprite(480,384,20,20);
    obstacle.addImage(obstaclesImage);
    obstacle.scale = 0.17;
    obstacle.velocityX = -(8+score/2);
    obstacle.lifetime = 74;
    
   obstacleGroup.add(obstacle);
    
  }
}

function spawnBanana(){
  
   if(frameCount % 60 === 0){
    
    var banana = createSprite(480,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(8+score/2);
    banana.lifetime = 74;
     
    bananaGroup.add(banana)
     
  }
}
