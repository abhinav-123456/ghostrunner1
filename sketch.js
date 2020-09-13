//to make variable
var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBloackGroup;
var gameState="play"
var sound;

function preload(){
  //to load image  for the sprites
towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png")
  sound=loadSound("spooky.wav")
  
}

function setup(){
createCanvas(600,600)
  
  //creating tower
  tower=createSprite(300,300,20,20)
  tower.addImage("ghost",towerImg)
  tower.velocityY=4;

  //creating ghost
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghosts",ghostImg)
  ghost.scale=0.3
  
  sound.loop()
  
  //making new groups 
  doorsGroup=new Group();
  climberGroup=new Group();
invisibleBlockGroup=new Group();
}

function draw(){
background("black")
  //to make tower continuesly run
 
    
  
  if (gameState==="play"){
   if (tower.y>400){
  tower.y=300;
   }
    
    // to control the ghost
    if (keyDown("left_arrow")){
  ghost.x=ghost.x-3    
  }
  
   if (keyDown("right_arrow")){
  ghost.x=ghost.x+3    
  }
  
   if (keyDown("left_arrow")){
  ghost.x=ghost.x-3    
  }
  
   if (keyDown("space")){
  ghost.velocityY= -5  
     
  }
  
    //to set gravity
    ghost.velocityY=ghost.velocityY+0.8
    
  if (climberGroup.isTouching(ghost)){
  ghost.velocityY=0
  }
  
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600)  {
  gameState="end"
  }
    
    spawnDoors();
  
  drawSprites()  
  }
  
  if (gameState==="end"){
  stroke("black")    
  fill("red")     
  textSize (25)
  text("gameOver",300,300)
    
  }

  // calling new function
  
}

function spawnDoors(){
if (frameCount % 240===0){
  //making doors 
  door=createSprite(200,-50)
  door.addImage("doors",doorImg)
  door.x=Math.round(random(120,400))
  door.velocityY=4 
  door.lifetime=650
  doorsGroup.add (door)
  
  //making the ghost come over the doors
  ghost.depth=door.depth
  ghost.depth+=1
  
  //making climbers
  climber=createSprite(200,10)
  climber.addImage("climbers",climberImg) 
  climber.x=door.x 
  climber.velocityY=4
  climber.lifetime=650 
  climberGroup.add(climber)
  
  //making invisibleBlocks
  invisibleBlock=createSprite(200,15)  
  invisibleBlock.width=climber.width  
  invisibleBlock.height=2  
  invisibleBlock.x=door.x  
  invisibleBlock.velocityY=4 
  invisibleBlock.debug=true 
  invisibleBlockGroup.add(invisibleBlock) 
  invisibleBlock.lifetime=650
}
}