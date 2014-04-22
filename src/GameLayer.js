var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(new cc.Color4B(127, 127, 127, 255));
        this.setPosition(new cc.Point(0,0));

        this.bg = new Background();
        this.bg.setPosition(cc.p(screenWidth/2, screenHeight/2));
        this.addChild(this.bg);

        this.player = new Player();
        this.player.setPosition(cc.p(screenWidth - 450, screenHeight - 350));
        this.addChild(this.player);

        this.ball = new Array();
        this.updateStartBall();

        this.warning = new Warning();
        this.warning.setPosition(cc.p(150,50));
        this.addChild(this.warning);
        
        this.setKeyboardEnabled( true );
        this.startSpeed = 1.5;
        //this.schedule(this.updateStartBall,1.3,Infinity,0);
        // this.scheduleUpdate();

        this.playerDelayDead = 0;
        this.isDead = false;
        this.life();
        this.scoreDecreased = false;

        this.scheduleUpdate();
        return true;
    },

    updateStartBall: function() {
        for(var i=0 ; i<3 ; i++) {
            this.ball[i] = new Ball();
            this.addChild(this.ball[i]);
            this.ball[i].scheduleUpdate();
        }
    },

    // updateWarning: function(){
    //     var pos = this.ball[0].getPosition();
    //     this.warning.setPosition(cc.p(pos.x,pos.y))
    // },

    update: function(dt){

        if(this.numLife == 0){
            this.gameOver();
        }

        if(this.isHit()){
            this.player.stopAllActions();
            this.player.runAction(this.player.createDeadAction());
            this.isDead = true;
        }

        else if(this.playerDelayDead > 60){
            this.player.reborn();
            this.playerDelayDead = 0;
            this.isDead = false;
        }

        if(this.isDead){
            this.playerDelayDead++;
            if(!this.scoreDecreased && this.numLife > 0)
            {
                this.numLife--;
                this.lifeCount.setString( 'x ' + this.numLife );
                this.scoreDecreased = true;
            }
        }
        else
            this.scoreDecreased = false;
    },

    gameOver: function(){
            this.player.stopAllActions();
            this.ball.stopAllActions();
            this.player.unscheduleUpdate();
            this.ball.unscheduleUpdate();
    },

    life: function(){
        this.numLife = 5;
        this.life = cc.Sprite.create('images/life.png');
        this.life.setPosition(cc.p(730,560));
        this.addChild(this.life);

        this.lifeCount = cc.LabelTTF.create('x ' + this.numLife,'Arial',35);
        this.lifeCount.setPosition(cc.p(770,550));
        this.addChild(this.lifeCount);
    },

    isHit: function(){
        for(var i=0 ; i<this.ball.length ; i++){
            if(this.ball[i].hit(this.player))
                return true;
        }
        return false;
    },

    // changeState: function( speed ) {
    //     this.unschedule(this.updateStartBall);
    //     this.schedule(this.updateStartBall,speed,Infinity,0);
    // },

    onKeyDown: function( e ) {
        if(!this.isDead){ 
            this.player.move(e);
        }
    },

    onKeyUp: function() {
        if(!this.isDead){
            this.scheduleOnce(this.stayAction,0.05);
        }
    },

    stayAction: function(){
        this.player.stopAllActions();
        this.player.runAction(this.player.createStandAction());
    },

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

