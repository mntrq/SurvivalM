
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/p2.png' );
        this.direction = 0;
    },

	switchDirection: function( e ) {
		this.move(e)
    },

    move: function(e) {
    	var pos = this.getPosition();

    	if(e == Player.DIR.UP){
            if(pos.y == 550){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p( pos.x, pos.y + 100 ));
            }
	   	}
	    else if(e == Player.DIR.RIGHT){
            if(pos.x == 650){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p(pos.x + 100 , pos.y));
            }
	    }
	    else if(e == Player.DIR.LEFT){
            if(pos.x == 150){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p(pos.x - 100 , pos.y));
            }
	    }
    	else if(e == Player.DIR.DOWN){
            if(pos.y == 50){
                this.setPosition(cc.p(pos.x,pos.y));   
            }
            else{
                this.setPosition(cc.p(pos.x , pos.y - 100));
            }
	   	}
    }
});

Player.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40
};

