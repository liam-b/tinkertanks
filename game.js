RECTANGLE = 0;
CIRCLE = 1;

UP = false;
DOWN = true;

WALLS = 10;


var canvas = document.getElementById( "myCanvas" );
var ctx = canvas.getContext( "2d" );

var myFirebaseRef = new Firebase( "https://blinding-fire-4702.firebaseio.com/" );

var moveX = 0;
var moveY = 0;

document.addEventListener( "keydown", keyDownHandler, false );
document.addEventListener( "keyup", keyUpHandler, false );
document.addEventListener( "mousemove", mouseMoveHandler, false );

var key = {
  w : false,
  S : false
};

var mouse = {
  x : 0,
  y : 0
};

var player = {
  state : 1,
  x : 100,
  y : 0,
  rotation : 0,
  width : 65,
  height : 50,
  color : "#6C97D6",
  speed : 4,
  turnSpeed : 2,
  gun : {
    x : 0,
    y : 0,
    xOffset : 0,
    yOffset : 0,
    width : 50,
    height : 10,
    circleRadius : 18,
    rotation : 0,
    rotationSpeed : 3,
    trueRotation : 0,
    range : 10,
    color : "#5989D0",
  },
  collisions : {
    type : RECTANGLE,
    x : [
      10, -10
    ],
    y : [
      10, -10
    ]
  }
};

console.log( player );

var walls = [
  { x : 0, y : 0, rotation : 0, width : 20, height : 100, color : "#787878", collisions : { type : RECTANGLE, x : [ 10, -10 ], y : [ 10, -10 ] } },
  { x : 100, y : -200, rotation : 0, width : 20, height : 100, color : "#787878", collisions : { type : RECTANGLE, x : [ 10, -10 ], y : [ 10, -10 ] } }
];

function draw () {

  clearCanvas();

  drawWalls();

  drawPlayer();

  keyUpdate();

  gunUpdate();

  wallCollisions();

  console.log( player.gun.trueRotation );

  requestAnimationFrame( draw );

}

draw();

function wallCollisions () {
  for ( i = 0; i < walls.length; i++ ) {
    //if ( rangeIf ( player.collisions.x, wall[i].collisions.x ) )
  }
}

function rangeIf ( range1, range2 ) {
  //if ( range1[1] >  )
}

function drawPlayer () {
  drawObject( RECTANGLE, player.x, player.y, player.rotation, 0, 0, player.width, player.height, player.color, "playerTank" );
  drawObject( CIRCLE, player.x, player.y, 0, 0, 0, player.gun.circleRadius, 0, player.gun.color, "playerGunCircle" );
  drawObject( RECTANGLE, player.gun.x, player.gun.y, player.gun.rotation, player.gun.width / 2, 0, player.gun.width, player.gun.height, player.gun.color, "playerGun" );
}

function drawWalls () {
  for ( i = 0; i < walls.length; i++ ) {
    drawObject( RECTANGLE, walls[i].x, walls[i].y, walls[i].rotation, 0, 0, walls[i].width, walls[i].height, walls[i].color, "wall[" + i + "]" );
  }
}

function gunUpdate () {
  player.gun.x = player.x + Math.cos( player.rotation * Math.PI / 180 ) * player.gun.xOffset;
  player.gun.y = player.y + Math.sin( player.rotation * Math.PI / 180 ) * player.gun.yOffset;
}

function translate () {

  player.x += moveX;
  player.y += moveY;

  player.gun.trueRotation = -Math.atan2( player.y - mouse.y, mouse.x - player.x ) * 180 / Math.PI;

  updateGunRotation();
}

function updateGunRotation () {

  if ( player.gun.rotation - player.gun.trueRotation + 180 < -player.gun.rotationSpeed || player.gun.rotation - player.gun.trueRotation + 180 > player.gun.rotationSpeed ) {

    if ( player.gun.rotation - player.gun.trueRotation > 0 || player.gun.rotation - player.gun.trueRotation < -180 && !( player.gun.rotation - player.gun.trueRotation < -360 ) ) {
      player.gun.rotation += player.gun.rotationSpeed;
    }
    else {
      player.gun.rotation -= player.gun.rotationSpeed;
    }

    if ( player.gun.rotation < -360 ) {
      player.gun.rotation = 0;
    }

    if ( player.gun.rotation > 0 ) {
      player.gun.rotation = -360;
    }
  }
}

function clearCanvas () {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
}

function keyMovement () {

  if ( key.w == DOWN ) {
    moveY = Math.sin( player.rotation * Math.PI / 180 );
    moveX = Math.cos( player.rotation * Math.PI / 180 );
  }
  else if ( key.s == DOWN ) {
    moveY = -Math.sin( player.rotation * Math.PI / 180 );
    moveX = -Math.cos( player.rotation * Math.PI / 180 );
  }
  moveY *= player.speed;
  moveX *= player.speed;

  translate();

  moveX = 0;
  moveY = 0;
}

function keyUpdate () {

  keyMovement();
  keyRotation();
}

function keyRotation () {

  if ( key.a == DOWN ) {
    player.rotation = ( player.rotation - player.turnSpeed + 360 ) % 360;
  }
  else if ( key.d == DOWN ) {
    player.rotation = ( player.rotation + player.turnSpeed + 360 ) % 360;
  }
}

function keyDownHandler ( e ) {

  switch (e.keyCode) {
    case 87:
      key.w = true;
      break;
    case 83:
      key.s = true;
      break;
    case 65:
      key.a = true;
      break;
    case 68:
      key.d = true;
      break;
    }
}

function keyUpHandler ( e ) {

  switch (e.keyCode) {
    case 87:
      key.w = false;
      break;
    case 83:
      key.s = false;
      break;
    case 65:
      key.a = false;
      break;
    case 68:
      key.d = false;
      break;
    }
}

function mouseMoveHandler ( e ) {

  mouse.x = e.clientX - canvas.offsetLeft - canvas.width / 2;
  mouse.y = e.clientY - canvas.offsetTop - canvas.height / 2;
}

function drawObject ( type, x, y, rotation, rotationX, rotationY, width, height, color, comment ) {

  ctx.save();

  x += canvas.width / 2 - width / 2;
  y += canvas.height / 2 - height / 2;

  ctx.beginPath();
  ctx.translate( x + width / 2, y + height / 2 );
  ctx.rotate( rotation * Math.PI / 180 );
  ctx.translate( -rotationX, -rotationY );

  if ( type == RECTANGLE ) {
    ctx.rect( -width / 2, -height / 2, width, height );
  }
  else if ( type == CIRCLE ) {
    ctx.arc( 0, 0, width, 0, 2 * Math.PI );
  }

  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}
