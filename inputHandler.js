//Key codes : http://keycode.info/

document.addEventListener( "keydown", keyDownHandler, false );
document.addEventListener( "keyup", keyUpHandler, false );
document.addEventListener( "mousemove", mouseMoveHandler, false );
document.addEventListener( "mousedown", mouseDownHandler, false );
document.addEventListener( "mouseup", mouseUpHandler, false );

var mouse = {
  click : UP,
  x : 0,
  y : 0
};

var key = [];

function mouseMoveHandler ( e ) {
  mouse.x = e.clientX - OFFSET_X;
  mouse.y = e.clientY - OFFSET_Y;
}

function mouseDownHandler ( e ) {
  mouse.click = DOWN;
}

function mouseUpHandler ( e ) {
  mouse.click = UP;
}

function keyDownHandler ( e ) {
  key[e.keyCode] = DOWN;
}

function keyUpHandler ( e ) {
  key[e.keyCode] = UP;
}
