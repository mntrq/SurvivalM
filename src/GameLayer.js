var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.bg = new Background();
        this.bg.setPosition(cc.p(screenWidth / 2, screenHeight / 2 ));
        this.addChild(this.bg);

        this.player = new Player();
        this.player.setPosition(cc.p( screenWidth-450, screenHeight-350 ) );
        this.addChild( this.player );
        
        this.setKeyboardEnabled( true );
        this.startSpeed=1.5;
        this.schedule(this.updateStartBall,1.3,Infinity,0);

        this.ball = new Array();
        this.scheduleUpdate();

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
        if(this.isHit()){
            console.log("AON HAAD");
            //this.endGame();
        }
    },

    isHit: function(){
        for(var i=0 ; i<this.ball.length ; i++){
            if(this.ball[i].hit(this.player))
                return true;
        }
        return false;
    },

    changeState: function( speed ) {
        this.unschedule(this.updateStartBall);
        this.schedule(this.updateStartBall,speed,Infinity,0);
    },

    onKeyDown: function( e ) {    
        this.player.switchDirection( e );
    },

    onKeyUp: function() {
        this.player.switchDirection(0);
    },

    endGame: function(){
        this.player.stop();
        if(this.ball){
            this.ball.unscheduleUpdate();
        }
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

