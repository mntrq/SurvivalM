
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/player.png' );
        this.direction = 0;
    },

	update: function( dt ) {
		var pos = this.getPosition();
	
	    	if(this.direction == Player.DIR.UP){
	    		this.setPosition( new cc.Point( pos.x, pos.y + 7 ));
	    	}
		    else if(this.direction == Player.DIR.RIGHT){
	    		this.setPosition( new cc.Point(pos.x +7 , pos.y));
	    	}

	    	else if(this.direction == Player.DIR.LEFT){
	    		this.setPosition( new cc.Point(pos.x - 7 , pos.y));
	    	}

	    	else if(this.direction == Player.DIR.DOWN){
	    		this.setPosition( new cc.Point(pos.x , pos.y - 7));
	    	}

	},

	switchDirection: function( e ) {
		this.direction = e;
    }
});

Player.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40
};