
var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/p2.png' );
        this.direction = 0;

        this.movingAction = this.createStandAction();
        this.stopAllActions();
        this.runAction(this.movingAction);
    },
    
    move: function(e) {
    	var pos = this.getPosition();

    	if(e == Player.DIR.UP){
            this.stopAllActions();
            this.runAction(this.createUpAction());

            if(pos.y == 550){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p( pos.x, pos.y + 100 ));
            }
	   	}

	    else if(e == Player.DIR.RIGHT){
            this.stopAllActions();
            this.runAction(this.createRightAction());

            if(pos.x == 650){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p(pos.x + 100 , pos.y));
            }
	    }

	    else if(e == Player.DIR.LEFT){
            this.stopAllActions();
            this.runAction(this.createLeftAction());

            if(pos.x == 150){
                this.setPosition(cc.p(pos.x,pos.y));
            }
            else{
                this.setPosition(cc.p(pos.x - 100 , pos.y));
            }
	    }

    	else if(e == Player.DIR.DOWN){
            this.stopAllActions();
            this.runAction(this.createDownAction());

            if(pos.y == 50){
                this.setPosition(cc.p(pos.x,pos.y));   
            }
            else{
                this.setPosition(cc.p(pos.x , pos.y - 100));
            }
	   	}
    },

    createStandAction: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile('images/hand1.png');
        animation.addSpriteFrameWithFile('images/hand2.png');
        animation.setDelayPerUnit( 0.15 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createLeftAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/left' + i + '.png');
        }
        animation.setDelayPerUnit( 0.05 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createRightAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/right' + i + '.png');
        }
        animation.setDelayPerUnit( 0.05 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createUpAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/up' + i + '.png');
        }
        animation.setDelayPerUnit( 0.05 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createDownAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/down' + i + '.png');
        }
        animation.setDelayPerUnit( 0.05 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },


});

Player.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40
};

