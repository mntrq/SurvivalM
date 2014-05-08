var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(new cc.Color4B(127, 127, 127, 255));
        this.setPosition(new cc.Point(0,0));

        this.sound = new Sound();
        this.sound.startMusicPlease();

        this.numBall = 10;
        this.deployedBall = 1;
        this.runner = 0;

        this.initBG();
        this.initPlayer();
        this.initBall();

        this.score();
        this.scoreCount = 0;
        
        this.setKeyboardEnabled(true);
        this.startSpeed = 1.5;

        this.playerDelayDead = 0;
        this.isDead = false;
        this.life();
        this.scoreDecreased = false;

        this.isPause = false;
        this.isGameOver = false;

        this.scheduleUpdate();
        return true;
    },

    initBG: function(){
        this.bg = new Background();
        this.bg.setPosition(cc.p(screenWidth/2, screenHeight/2));
        this.addChild(this.bg);
    },

    initPlayer: function(){
        this.player = new Player();
        this.player.setPosition(cc.p(screenWidth - 450, screenHeight - 350));
        this.addChild(this.player);
    },

    initBall: function(){
        this.ball = new Array();
        for(var i=0 ; i<this.numBall ; i++) {
            this.ball[i] = new Ball();
        }
        this.updateStartBall();
    },

    updateStartBall: function() {
        for(var i=0 ; i<this.deployedBall ; i++) {
            this.addChild(this.ball[i]);
            this.ball[i].scheduleUpdate();
        }
    },

    updateNumBall: function(){
        this.runner++;

        if(this.runner%400 == 0 && this.deployedBall < 10){
            this.deployedBall++;
            this.startSpeed += 1.5;
            this.updateStartBall();
        }
    },

    update: function(dt){
        if(!this.isGameOver && !this.isPause){
            this.updateNumBall();

            if(this.runner%20 == 0){
                this.scoreCount += 10;
                this.scoreLabel.setString('Score\n ' + this.scoreCount);
            }
        }

        if((this.numLife == 0) && (this.isGameOver == false)){
            this.scheduleOnce(this.gameOver,0.4);
        }

        if(this.isHit()){
            this.player.stopAllActions();
            this.player.runAction(this.player.createDeadAction());
            this.isDead = true;
        }

        else if((this.playerDelayDead > 40) && (this.numLife > 0)){
            this.player.reborn();
            this.playerDelayDead = 0;
            this.isDead = false;
        }

        if(this.isDead){
            this.playerDelayDead++;

            if(!this.scoreDecreased && this.numLife > 0){
                this.numLife--;
                this.lifeCount.setString( 'x ' + this.numLife );
                this.scoreDecreased = true;
                this.sound.hit();
            }
        }
        else{
            this.scoreDecreased = false;
        }
    },

    pause: function(){
        for(var i=0 ; i<this.numBall ; i++){
            this.ball[i].pause();
        }

        this.player.pause();
        this.stopAllActions();
        this.isPause = true;
    },

    resume: function(){
        for(var i=0 ; i<this.numBall ; i++){
            this.ball[i].resume();
        }
        this.player.resume();
        this.isPause = false;
    },

    restart: function(){
        cc.Director.getInstance().replaceScene(new myApp.startScene());
    },

    gameOver: function(){
        this.gameOverScreen();
        this.player.unscheduleUpdate();
        this.player.stopAllActions();
        this.stopAllActions();

        this.sound.stopMusicPlease();
        this.sound.gameOver();

        for(var i=0 ; i<this.numBall ; i++){
            this.ball[i].stopAllActions();
            this.ball[i].unscheduleUpdate();
        }

        this.isGameOver = true;
    },

    gameOverScreen: function(){
        this.blackScreeen = cc.Sprite.create('images/black.png');
        this.blackScreeen.setPosition(cc.p(screenWidth/2, screenHeight/2));
        this.addChild(this.blackScreeen);

        this.restartLabel = cc.LabelTTF.create('       Game Over \n Press R to restart.','Arial',50);
        this.restartLabel.setPosition(cc.p(screenWidth/2, screenHeight/2));
        this.addChild(this.restartLabel);
    },

    score: function(){
        this.scoreLabel = cc.LabelTTF.create('Score \n    0', 'Arial', 30);
        this.scoreLabel.setPosition(cc.p(50,540));
        this.addChild(this.scoreLabel);
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
        for(var i=0 ; i<this.deployedBall ; i++){
            if(this.ball[i].hit(this.player))
                return true;
        }
        return false;
    },

    onKeyDown: function(e) {
        if((e == GameLayer.KEY.P) && (this.isPause == false)){
            if(!this.isDead){
                this.sound.stopMusicPlease();
                this.pause();
            }
        }
        else if((e == GameLayer.KEY.P) && (this.isPause == true)){
            this.sound.startMusicPlease();
            this.resume();
        }
        else if(e == GameLayer.KEY.R){
            this.restart();
        }

        if(!this.isDead && !this.isGameOver){ 
            this.player.move(e);
        }
    },

    onKeyUp: function() {
        if(!this.isDead && this.isPause == false){
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
        this.addChild(layer);
    }
});

GameLayer.KEY = {
    P: 80,
    R: 82,
};

