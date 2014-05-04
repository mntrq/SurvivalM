var Sound = cc.Node.extend({
	  ctor: function() {
	  	this._super();
	  	//this.background = cc.AudioEngine.getInstance();
        // this.background.playMusic('res/bg.wav',true);

        this.background = new cc.AudioEngine.getInstance();
        this.background.setMusicVolume(0.5);

        this.soundEffect = cc.AudioEngine.getInstance();
	  },

	  hit: function(){
	  	this.soundEffect.playEffect('res/hittingSound.mp3');
	  },

	  gameOver: function(){
	  	this.soundEffect.playEffect('res/gameOver.mp3');
	  },

	  startMusicPlease: function(){
	  	this.background.playMusic('res/bg.wav',true);
	  },

	  pauseMusicPlease: function(){
	  	this.background.stopMusic();
	  },

	
});
