
var checkPlayerBallCollision = function( playerX, playerY, ballX, ballY ) {
	if( (playerX == ballX) && (Math.abs(playerY - ballY) <= 20) ){
		return true;
	}
	else if( (playerY == ballY) && (Math.abs(playerX - ballX) <= 20) ){
		return true;
	}
};






