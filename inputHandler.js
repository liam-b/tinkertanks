//Key codes : http://keycode.info/

document.addEventListener( "keydown", keyDownHandler, false );
document.addEventListener( "keyup", keyUpHandler, false );
document.addEventListener( "mousemove", mouseMoveHandler, false );

var mouse = {
  x : 0,
  y : 0
};

var key = [];

function mouseMoveHandler ( e ) {
  mouse.x = e.clientX - OFFSET_X;
  mouse.y = e.clientY - OFFSET_Y;
}

function keyDownHandler ( e ) {
  key[e.keyCode] = DOWN;
}

function keyUpHandler ( e ) {
  key[e.keyCode] = UP;
}
