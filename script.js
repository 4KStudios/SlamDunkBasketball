const gameState = {
scoreP1: 0,
scoreP2: 0,
}

function preload()
{
  //images
  this.load.image('player1img', 'images/player1img.png'); //placeholder
  this.load.image('player2img', 'images/player2img.png'); //placeholder
  this.load.image('background', 'images/court.gif');
  this.load.image('ball', 'images/Basketball2.png');
  this.load.image('Walls', 'images/Walls.png');
  this.load.image('hoop', 'images/hoop.png');
}

function create() {
  

  //Setting Background
  gameState.background = this.add.image(400, 250, 'background');
  gameState.background.setScale(1.5)
  gameState.backgroundColor = "rgba(0, 0, 0, 0.30)";

  //Creating Group for Walls
const wallL = this.physics.add.staticGroup();
const wallR = this.physics.add.staticGroup();
const wallBottom = this.physics.add.staticGroup();
const wallBaseline = this.physics.add.staticGroup();
const wallTopBackboard = this.physics.add.staticGroup();

//Putting the walls into the game
wallL.create(25, 450, 'Walls').setScale(1, 100).refreshBody();
wallR.create(750, 450, 'Walls').setScale(1, 100).refreshBody();
wallBottom.create(0, 500, 'Walls').setScale(200, 1).refreshBody();
wallBaseline.create(250, 155, 'Walls', undefined, false).setScale(100,.5).refreshBody();
wallTopBackboard.create(250, 42, 'Walls', undefined, false).setScale(100,.5).refreshBody();

// Adding Hoop Sprite
  gameState.hoop = this.physics.add.sprite(400, 100, 'hoop')
  gameState.hoop.setScale(.5)
  gameState.hoop.setImmovable();
//Adding Player and Ball Sprite
  gameState.player1 = this.physics.add.sprite(400, 250, 'player1img');
  gameState.player1.hasBall = false;
  gameState.player2 = this.physics.add.sprite(100, 250, 'player2img');
  gameState.player2.hasBall = false;
  gameState.ball = this.physics.add.sprite(200, 200, 'ball', .5);
  gameState.ball.setScale(.05);
  gameState.ball.setImmovable();
  gameState.ball.inAir = false;
//Changing Player Hitboxes
  gameState.player1.setSize(15, 45);
  gameState.player1.setOffset(6, 38);
  gameState.player2.setSize(15, 45);
  gameState.player2.setOffset(6, 38);
  gameState.ball.setCircle(275);
// Hoop Hitbox
  gameState.hoop.setSize(180, 70);
  gameState.hoop.setOffset(138, 75);

// Inputing Arrows
  gameState.cursors = this.input.keyboard.createCursorKeys();
//Inputing Letter Keys
  gameState.cursors.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  gameState.cursors.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  gameState.cursors.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  gameState.cursors.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  gameState.cursors.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  gameState.cursors.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  gameState.cursors.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  gameState.cursors.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  gameState.cursors.numPad1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
  gameState.cursors.numPad2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.NUMPAD_TWO);
  gameState.cursors.numPad3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.NUMPAD_THREE);

//Player and Wall Colliders
this.physics.add.collider(gameState.player1, wallL);
this.physics.add.collider(gameState.player2, wallL);
this.physics.add.collider(gameState.player1, wallR);
this.physics.add.collider(gameState.player2, wallR);
this.physics.add.collider(gameState.player1, wallBottom);
this.physics.add.collider(gameState.player2, wallBottom);
this.physics.add.collider(gameState.player1, gameState.ball, function(){ 
  if (gameState.player2.hasBall == false && gameState.ball.inAir == false){
  gameState.player1.hasBall = true;
  }
});
this.physics.add.collider(gameState.player2, gameState.ball, function() {
   if (gameState.player1.hasBall == false && gameState.ball.inAir == false){
  gameState.player2.hasBall = true;
  }
});
this.physics.add.collider(gameState.ball, wallBottom);
this.physics.add.collider(gameState.ball, wallL);
this.physics.add.collider(gameState.ball, wallR);
this.physics.add.collider(gameState.player1, gameState.player2);
this.physics.add.collider(gameState.player1, wallBaseline, function() {
 if (gameState.player1.hasBall == true) {
    gameState.player1.hasBall = false;
    gameState.player2.hasBall = true;
    gameState.player1.setPosition(400,375);
    gameState.player2.setPosition(400,400)
 }
});
this.physics.add.collider(gameState.player2, wallBaseline, function() {
 if (gameState.player2.hasBall == true){
 gameState.player2.hasBall = false;
 gameState.player1.hasBall = true;
 gameState.player2.setPosition(400,375);
 gameState.player1.setPosition(400,400);
}
})

this.physics.add.collider(gameState.ball, wallTopBackboard);

this.physics.add.collider(gameState.ball, gameState.hoop, function(){
  if(gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 500){
    gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
    gameState.ball.setVelocityX(0);
    gameState.ball.setVelocityY(30);
    gameState.cursors.keyQ.duration = 0;
    gameState.scoreP1 = gameState.scoreP1 + 2;
    //Need a Timer
    gameState.player1.hasBall = false;
    gameState.player2.hasBall = true;
    gameState.player1.setPosition(400,375);
    gameState.player2.setPosition(400,400)
  } else {
    gameState.cursors.keyQ.duration = 0;
    gameState.ball.setVelocityY(50);
    gameState.ball.setVelocityX(Phaser.Math.Between(-50, 50));
    gameState.ball.inAir = false;
  }

if(gameState.cursors.numPad1.duration > 250 && gameState.cursors.numPad1.duration < 500){
    gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
    gameState.ball.setVelocityX(0);
    gameState.ball.setVelocityY(30);
    gameState.cursors.numPad1.duration = 0;
    gameState.scoreP2 = gameState.scoreP2 + 2;
    gameState.player2.hasBall = false;
    gameState.player1.hasBall = true;
    gameState.player2.setPosition(400,375);
    gameState.player1.setPosition(400,400);
  } else {
    gameState.cursors.numPad1.duration = 0;
    gameState.ball.setVelocityY(50);
    gameState.ball.setVelocityX(Phaser.Math.Between(-50, 50));
    gameState.ball.inAir = false;
  }
})

}
function update() {

  //Player 1 Movement
  if (gameState.cursors.keyA.isDown) {
    gameState.player1.setVelocityX(-100);
  } else if (gameState.cursors.keyD.isDown) {
    gameState.player1.setVelocityX(100);
  } else {
    gameState.player1.setVelocityX(0);
  };

  if (gameState.cursors.keyW.isDown) {
    gameState.player1.setVelocityY(-100);
  } else if (gameState.cursors.keyS.isDown){
    gameState.player1.setVelocityY(100);
  } else {
    gameState.player1.setVelocityY(0);
  }

  //Player 2 Movement 
  if (gameState.cursors.right.isDown) {
    gameState.player2.setVelocityX(100);
  } else if (gameState.cursors.left.isDown) {
    gameState.player2.setVelocityX(-100);
  }   else {
    gameState.player2.setVelocityX(0);
}

 if (gameState.cursors.up.isDown) {
    gameState.player2.setVelocityY(-100);
  } else if (gameState.cursors.down.isDown){
    gameState.player2.setVelocityY(100);
  } else {
    gameState.player2.setVelocityY(0);
  }
  
  //Dribbling Player 1
  if (gameState.player1.hasBall == true) { 
  gameState.ball.setPosition(gameState.player1.x, gameState.player1.y + 10);
  gameState.ball.setVelocityX(0);
  gameState.ball.setVelocityY(0);
  }

  //Dribbling Player 2
  if (gameState.player2.hasBall == true) { 
  gameState.ball.setPosition(gameState.player2.x, gameState.player2.y + 10);
  gameState.ball.setVelocityX(0);
  gameState.ball.setVelocityY(0);
  }

  //Shooting Player 1
  if (gameState.cursors.keyQ.duration > 0 && gameState.cursors.keyQ.duration < 1000 && gameState.player1.hasBall == true) {
    gameState.ball.inAir = true;
    gameState.ball.setPosition(gameState.player1.x, gameState.player1.y - 30);
    gameState.player1.hasBall = false
    console.log(gameState.cursors.keyQ.duration);
    if (gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 1000){
     this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
      //if (gameState.hoop.touching.down){
       //gameState.ball.setPosition(gameState.hoop.x, //gameState.hoop.y);
     //}
    } 
    else {
      this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
    }
     //gameState.cursors.keyQ.duration = 0
  }
  
  //stealing player1
  if (gameState.player2.hasBall == true) {
    if (gameState.player1.x <= gameState.player2.x + 30 && gameState.player1.x >=            gameState.player2.x - 30 ){
      if (gameState.cursors.keyE.isDown) {
        gameState.player1.hasBall = true;
        gameState.player2.hasBall = false;
      }
    }
  }
  
  //Shooting player2
  if (gameState.cursors.numPad1.duration > 0 && gameState.cursors.numPad1.duration < 1000 && gameState.player2.hasBall == true) {
    gameState.ball.inAir = true;
    gameState.ball.setPosition(gameState.player2.x, gameState.player2.y - 30);
    gameState.player2.hasBall = false;
    console.log(gameState.cursors.numPad1.duration);
    if (gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 1000){
     this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
    }
    else {
      this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
    }
  }

  //Stealing player2
  if (gameState.player1.hasBall == true) {
    if (gameState.player1.x <= gameState.player2.x + 30 && gameState.player1.x >= gameState.player2.x - 30){
      if(gameState.cursors.numPad3.isDown) {
        gameState.player2.hasBall = true;
        gameState.player1.hasBall = false;
        
      }
    }
  }

this.add.text(150, 100, `Score: ${gameState.scoreP1} - ${gameState.scoreP2}` , { fontSize: '15px', fill: '#000', backgroundColor: '#f9f9f9' });

if(gameState.scoreP1 >= 21){
  this.physics.pause();
  this.add.text(375, 50, `Player 1 Wins!` , { fontSize: '15px', fill: '#000' });
} else if(gameState.scoreP2 >= 21){
  this.physics.pause();
  this.add.text(375, 50, `Player 2 Wins!` , { fontSize: '15px', fill: '#000' });
}

}
  //var isDown = scene.input.keyboard.checkDown(keyObj, duration);


function randomNumber(){
  const value = Phaser.Math.Between(0,1);
  console.log(value);
}

function swish(){
  if (gameState.ball.body.touching.up && gameState.hoop.body.touching.down) {
    gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
  }   
}

//Phaser Library
const config = 
{
  type: Phaser.AUTO,
  width: 750,
  height: 500,
  backgroundColor: '#f9f9f9',
  scene: 
  {
      preload: preload,
      create: create,
      update: update,
  },
  physics: {
  default: 'arcade',
  arcade: {
    enableBody: true,
    
  },
  }
};

const game = new Phaser.Game(config);
