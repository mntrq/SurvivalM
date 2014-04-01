var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.bg = new Background();
        this.bg.setPosition(new cc.Point (screenWidth / 2, screenHeight / 2 ));
        this.addChild(this.bg);

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth-450, screenHeight-350 ) );
        this.addChild( this.player );

        this.ball = new Ball();
        this.addChild( this.ball );
        this.ball.scheduleUpdate();
        
        this.setKeyboardEnabled( true );

        return true;
    },

    onKeyDown: function( e ) {    
        this.player.switchDirection( e );
    },

    onKeyUp: function() {
        this.player.switchDirection(0);
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

