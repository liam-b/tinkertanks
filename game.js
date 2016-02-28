// Online tank game
// Trello : https://trello.com/b/EJNPx75o/tinker-tanks
// Git : https://github.com/liam-b/tinkertanks

var canvas = document.getElementById( "myCanvas" );
var ctx = canvas.getContext( "2d" );

var myFirebaseRef = new Firebase( "https://blinding-fire-4702.firebaseio.com/" );

var moveX = 0;
var moveY = 0;

// Move to firebase

var player = {
  state : 1,
  x : 100,
  y : 0,
  rotation : 0,
  width : 65,
  height : 50,
  color : "#6C97D6",
  speed : 2,
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
    rotationSpeed : 2,
    trueRotation : 0,
    range : 10,
    color : "#5989D0",
  }
};

console.log( player );

function draw () {

  clearCanvas();

  drawWalls();

  drawPlayer();

  wallCollisions();

  keyUpdate();

  gunUpdate();

  requestAnimationFrame( draw );

}

draw();

function wallCollisions () {
  for ( i = 0; i < walls.length; i++ ) {
    if ( checkCollision( player, walls[i] ) ) {
    }
  }
}

function checkCollision ( source, target ) {
  if ( !( source.x + source.width < target.x || target.x < source.x - source.height ) && !( source.y + source.height < target.y || target.y < source.y - source.height ) ) {
    return 1;
  }
  else {
    return 0;
  }
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
  if ( key[87] == DOWN ) {
    moveY = Math.sin( player.rotation * Math.PI / 180 );
    moveX = Math.cos( player.rotation * Math.PI / 180 );
  }
  else if ( key[83] == DOWN ) {
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

  if ( key[65] == DOWN ) {
    player.rotation = ( player.rotation - player.turnSpeed + 360 ) % 360;
  }
  else if ( key[68] == DOWN ) {
    player.rotation = ( player.rotation + player.turnSpeed + 360 ) % 360;
  }
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
