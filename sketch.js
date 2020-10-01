var monkey,Monkey,backGround,BackImage,MonkeyCollider,stone,banana;

var PLAY = 1,END = 0,GameState = PLAY,score = 0;




function preload(){
  monkey = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backGround = loadImage("jungle.jpg");
  stone = loadImage("stone.png");
  banana = loadImage("banana.png");
}

function setup() {
  createCanvas(600, 400);
  BackImage = createSprite(200,200,400,400);
  BackImage.addImage("backGround",backGround);
  BackImage.velocityX = -6;
  
  Monkey = createSprite(50,340,20,20);
  Monkey.addAnimation("monkey",monkey);
  Monkey.scale = 0.07;
  MonkeyCollider = createSprite(200,370,400,20);
  Monkey.setCollider("circle",20,20,5);
  
  
  StoneGroup = new Group();
  BananaGroup = new Group();
}

function draw() {
  background(255);
  MonkeyCollider.visible = false;
  Monkey.collide(MonkeyCollider);
  
  stroke("White");
  textSize(20);
  fill("black");
  text("SCORE:" + score,500,50);
  
  
  
  
  if (GameState === PLAY){
    
    if (frameCount%20 === 0){
      BackImage.x = 200
    }
    
    if (keyDown("space") && Monkey.y >= 339) {
    Monkey.velocityY = -18;
    
  }
  
  Monkey.velocityY = Monkey.velocityY + 1;
    
    if (BananaGroup.isTouching(Monkey)){
        score = score +2;
        BananaGroup.destroyEach();
        }
    if (frameCount%10 === 0){
      score = score+1;
    }
    SpawnObstacles();
    SpawnFood();
    if (StoneGroup.isTouching(Monkey)){
        GameState = END;
        Monkey.scale = 0.07;
        }
    
    switch(score){
      case 10: Monkey.scale = 0.09;
        break;
      case 20: Monkey.scale = 0.11;
        break;
      default: break;
    }
    
  }
  if (GameState === END){
    BackImage.velocityX = 0;
    StoneGroup.setVelocityXEach(0);
    StoneGroup.setLifeTimeEach(-1);
    BananaGroup.setVelocityXEach(0);
    BananaGroup.setLifeTimeEach(-1);
  }
  drawSprites();
}

function SpawnObstacles(){
  if (frameCount%300 === 0){
  var Stone = createSprite(600,340,20,20);
    Stone.addImage("stone",stone); 
    Stone.scale = random(0.1,0.3);
    Stone.depth = BackImage.depth+1;
    Stone.velocityX = -6;
    Stone.LifeTime = 100;
    StoneGroup.add(Stone);
  }
}

function SpawnFood(){
  if (frameCount%80 === 0){
  var Banana = createSprite(400,random(220,300),20,20);
    Banana.addImage("banana",banana);
    Banana.scale = 0.05;
    Banana.velocityX = -6;
    Banana.LifeTime = 100;
    Banana.depth = BackImage.depth +1;
    BananaGroup.add(Banana);
  }
}