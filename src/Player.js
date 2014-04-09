
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
    	if(e == Player.DIR.UP){
            this.moveUp();
	   	}

	    else if(e == Player.DIR.RIGHT){
            this.moveRight();
	    }

	    else if(e == Player.DIR.LEFT){
            this.moveLeft();
	    }

    	else if(e == Player.DIR.DOWN){
            this.moveDown();
	   	}
    },

    reborn: function(){
        this.setPosition(screenWidth-450, screenHeight-350);
        this.stopAllActions();
        this.runAction(this.createStandAction());
    },

    moveUp: function(){
        var pos = this.getPosition();

        this.stopAllActions();
        this.runAction(this.createUpAction());

        if(pos.y == 550){
            this.setPosition(cc.p(pos.x,pos.y));
        }
        else{
            this.setPosition(cc.p(pos.x, pos.y + 100 ));
        }
    },

    moveDown: function(){
        var pos = this.getPosition();

       this.stopAllActions();
        this.runAction(this.createDownAction());

        if(pos.y == 50){
            this.setPosition(cc.p(pos.x,pos.y));   
        }
        else{
            this.setPosition(cc.p(pos.x , pos.y - 100));
        }
    },

    moveRight: function(){
        var pos = this.getPosition();
        
        this.stopAllActions();
        this.runAction(this.createRightAction());

        if(pos.x == 650){
            this.setPosition(cc.p(pos.x,pos.y));
        }
        else{
            this.setPosition(cc.p(pos.x + 100 , pos.y));
        }   
    },

    moveLeft: function(){
        var pos = this.getPosition();

        this.stopAllActions();
        this.runAction(this.createLeftAction());

        if(pos.x == 150){
            this.setPosition(cc.p(pos.x,pos.y));
        }
        else{
            this.setPosition(cc.p(pos.x - 100 , pos.y));
        }
    },

    createStandAction: function() {
        var animation = new cc.Animation.create();

        for(var i=1 ; i<=2 ; i++){
            animation.addSpriteFrameWithFile('images/hand' + i + '.png');
        }
        animation.setDelayPerUnit(0.15);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createLeftAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/left' + i + '.png');
        }
        animation.setDelayPerUnit(0.05);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createRightAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/right' + i + '.png');
        }
        animation.setDelayPerUnit(0.05);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createUpAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/up' + i + '.png');
        }
        animation.setDelayPerUnit(0.05);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createDownAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=9 ; i++){
            animation.addSpriteFrameWithFile('images/down' + i + '.png');
        }
        animation.setDelayPerUnit(0.05);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    createDeadAction: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=11 ; i++){
            animation.addSpriteFrameWithFile('images/dead' + i + '.png');
        }
        animation.setDelayPerUnit(0.05);

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },


});

Player.DIR = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    DOWN: 40
};

