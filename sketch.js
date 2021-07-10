var cat,catRunningImg;
var rat,ratRunningImg;
var ground;
var eatingImg;
var rod,iron_rod,rod_group;
var cheese,cheese_group;
var mud,mud_group,mudImg;
var gameState = 'play';
var score = 0;
var restart,restartImg
var cloud,cloud1,cloud2,cloud3,cloud4,cloud_group
var brick,brickImg,brick_group

function preload(){

  catRunningImg = loadAnimation('cat_first.png','cat_last.png');
  ratRunningImg = loadAnimation('rat_first.png','rat_last.png');
  eatingImg = loadImage('cat_eating_mouse.png');
  cheeseImg = loadImage('cheese.png');
  iron_rod = loadImage('iron_nail.png')
  mudImg = loadImage('mud.png')
  restartImg = loadImage('restart.png')
  brickImg = loadImage('bricks.png')

  cloud1 = loadImage('cloud1.png')
  cloud2 = loadImage('cloud2.png')
  cloud3 = loadImage('cloud3.png')
  cloud4 = loadImage('cloud4.png')

  jumpSound = loadSound('jump.wav')
  pointSound = loadSound('checkpoint.mp3')
  dieSound = loadSound('die.mp3')

}

function setup(){

  createCanvas(800,400)

  ground = createSprite(405,355,810,100);
  ground.shapeColor = rgb(186, 87, 20);

  rat = createSprite(280,280,20,20)
  rat.addAnimation('rat_running',ratRunningImg)
  rat.scale = 0.3

  cat = createSprite(70,260,20,20)
  cat.addAnimation('cat_running',catRunningImg)
  //cat.scale = 0.8

  TheEnd = createSprite(280,200)  
  TheEnd.addImage('end',eatingImg)
  TheEnd.scale = 0.4;
  TheEnd.visible = false;

  restart = createSprite(530,248)
  restart.addImage('restart',restartImg)
  restart.visible = false;
  restart.scale = 0.7

  rod_group = new Group();
  mud_group = new Group();
  cheese_group = new Group();
  cloud_group = new Group();
  brick_group = new Group();

}

function draw(){

  background(0)
    
  fill('lightblue');
  rect(0,0,810,410);

  fill('black');
  rect(0,300,800,40);

if (gameState==='play'){

  if (keyDown('space')&&rat.collide(ground)){
    rat.velocityY = -12.5;;
    jumpSound.play();
  }

  ifTouch();

  textSize(22)
  text('Score = '+score,50,50);

  rat.velocityY = rat.velocityY + 0.8;
  cat.velocityY = cat.velocityY + 1;

  brick_group.collide(ground)

  createRod();
  createMud();
  createCheese();
  createBricks();
  spawnClouds();

}

if (gameState==='end'){
  //console.log(400*1.5)
  cloud_group.destroyEach();
  rod_group.destroyEach();
  cheese_group.destroyEach();
  mud_group.destroyEach();

  cat.visible = false;
  rat.visible = false;
  //rod_group.setVelocityXEach = 0
  fill('lightgreen')
  cat.velocityY = 0
  rat.velocityY = 0
  rect(150,50,500,800)
  TheEnd.visible = true;

  fill('red')
  textSize(30)
  text('Game Over !!',330,85)
  line(150,95,650,95)
  line(400,95,400,350)
  fill('black')
  textSize(18)
  text('Score = '+score,480,137)
  text("Press below to Restart",440,211)
  text("Try Again !!....",470,174)
  restart.visible = true;
  fill('black');
  rect(0,300,800,40);   
  
  if (mousePressedOver(restart)){
    reset();
  }
  
}

  rat.collide(ground)
  cat.collide(ground)

  drawSprites();

}

function createRod(){

  if (frameCount%150===0){

    rod = createSprite(900,290)
    rod.velocityX = -8
    rod.addImage('rod',iron_rod)
    rod.scale = 0.10
    rod.lifetime = 250
    rod_group.add(rod);

  }
}

function createMud(){

  if (frameCount%300===0){

    mud = createSprite(900,300)
    mud.velocityX = -8
    mud.addImage('mud',mudImg)
    mud.lifetime = 250
    mud_group.add(mud);
    mud.scale = 0.09;

  }

}


function createCheese(){

  if (frameCount%127===0){

    cheese = createSprite(900,290)
    cheese.velocityX = -8
    cheese.addImage('cheese',cheeseImg)
    cheese.lifetime = 250
    cheese_group.add(cheese);
    cheese.scale = 0.09;

  }

}

function createBricks(){

  if (frameCount%550===0){

    brick = createSprite(770,0)
    brick.velocityX = -8
    brick.addImage('brick',brickImg)
    brick.lifetime = 250
    brick_group.add(brick);
    brick.scale = 0.098;
    brick.velocityY = 23
    brick_group.add(brick)
    

  }

}

function spawnClouds(){
  if(frameCount % 200 === 0) {
    var cloud = createSprite(900,Math.round(random(30,165)),10,40);
    //obstacle.debug = true;
    cloud.velocityX = -3;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: cloud.addImage(cloud1);
              cloud.scale = 0.05;
              break;
      case 2: cloud.addImage(cloud2);
              cloud.scale = 0.05;
              break;
      case 3: cloud.addImage(cloud3);
              cloud.scale = 0.3;
              break;
      case 4: cloud.addImage(cloud4);
              cloud.scale = 0.5;
              break;
      default: break;
    }
    cloud_group.add(cloud)
}
}


function ifTouch(){

  if (rat.isTouching(rod_group)||rat.isTouching(mud_group)||rat.collide(brick_group)){
    gameState = 'end';
    dieSound.play()
  }

  if (cat.isTouching(rod_group)||cat.isTouching(mud_group)||cat.isTouching(cheese_group)||cat.isTouching(brick_group)){
    cat.velocityY = -16;
  }

  if (rat.isTouching(cheese_group)){
    cheese.destroy();
    pointSound.play();
    score+=5;
  }  

}

function reset(){

  cat.visible = true
  rat.visible = true
  restart.visible = false
  TheEnd.visible = false
  cloud_group.destroyEach();
  rod_group.destroyEach();
  cheese_group.destroyEach();
  mud_group.destroyEach();
  brick_group.destroyEach();
  score = 0
  rat.x = 280
  cat.x = 70
  rat.y = 280
  cat.y = 260
  gameState = 'play'

}
