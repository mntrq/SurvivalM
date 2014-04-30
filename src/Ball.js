var Ball = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/rock.png' );
        this.randomPosition();
        this.vX = 0;
        this.vY = 0;
        this.getDirection();

        this.movingAction = this.createAnimation();
        this.runAction(this.movingAction);
    },

    update: function(dt){
        //this.scheduleOnce(this.randomPosition,2);
        this.updatePosition();
    },

    randomPosition: function(){
    	var randomPosX = [150, 150, 150, 150, 150, 150, 250, 250, 350, 350, 450, 450, 550, 550, 650, 650, 650, 650, 650, 650];
    	var randomPosY = [50, 150, 250, 350, 450, 550, 50, 550, 50, 550, 50, 550, 50, 550, 50, 150, 250, 350, 450, 550];
        var i = Math.floor(Math.random()*20);
       	this.setPosition(cc.p(randomPosX[i],randomPosY[i]));
    },

    updatePosition: function(){
        var pos = this.getPosition();
        this.setPosition(cc.p((pos.x + this.vX) , (pos.y + this.vY)));

        if(pos.x <= 100 || pos.x >= 700 || pos.y <= 0 || pos.y >= 600){
            this.randomPosition();
            this.vX = 0;
            this.vY = 0;
            this.getDirection();
        }
    },

    pause: function(){
        this.unscheduleUpdate();
        this.stopAllActions();
    },

    resume: function(){
        this.scheduleUpdate();
        this.runAction(this.movingAction);
    },

    getDirection: function(){
    	var pos = this.getPosition();

    	if(pos.x == 150){
    		this.vX = 8;
    	}

    	else if(pos.x == 650){
    		this.vX = -8;
    	}

    	else if(pos.y == 50){
    		this.vY = 8;
    	}

    	else if(pos.y == 550){
    		this.vY = -8;
    	}
    },

    hit: function(player){
    	var ballPos = this.getPosition();
     	var playerPos = player.getPosition();
     	return this.checkPlayerBallCollision(playerPos.x , playerPos.y , ballPos.x , ballPos.y);
    },

    checkPlayerBallCollision: function(playerX, playerY, ballX, ballY) {
        if( (Math.abs(playerX - ballX) <= 20)  && (Math.abs(playerY - ballY) <= 20) ){
            return true;
        }
        return false;
    },

    createAnimation: function(){
        var animation = new cc.Animation.create();
        
        for(var i=1 ; i<=10 ; i++){
            animation.addSpriteFrameWithFile('images/world' + i + '.png');
        }
        animation.setDelayPerUnit( 0.05 );

        return cc.RepeatForever.create(cc.Animate.create(animation));
    },

    

});











