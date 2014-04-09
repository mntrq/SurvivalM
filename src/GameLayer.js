var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(new cc.Color4B(127, 127, 127, 255));
        this.setPosition(new cc.Point(0,0));

        this.bg = new Background();
        this.bg.setPosition(cc.p(screenWidth/2, screenHeight/2));
        this.addChild(this.bg);

        this.player = new Player();
        this.player.setPosition(cc.p(screenWidth-450, screenHeight-350));
        this.addChild(this.player);
        
        this.setKeyboardEnabled( true );
        this.startSpeed=1.5;
        //this.schedule(this.updateStartBall,1.3,Infinity,0);

        this.ball = new Array();
        this.updateStartBall();
        this.scheduleUpdate();
        this.playerDelayDead = 0;
        this.isDead = false;

        return true;
    },

    updateStartBall: function() {
        for(var i=0 ; i<3 ; i++) {
            this.ball[i] = new Ball();
            this.addChild( this.ball[i] );
            this.ball[i].scheduleUpdate();
        }
    },

    update: function(dt){
        if(this.isDead){
            this.playerDelayDead++;
        }

        if(this.isHit()){
            this.player.stopAllActions();
            this.player.runAction(this.player.createDeadAction());
            this.isDead = true;
        }

        if(this.playerDelayDead > 60){
            this.player.reborn();
            this.playerDelayDead = 0;
            this.isDead = false;
        }
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

