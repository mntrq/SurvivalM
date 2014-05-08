var Sound = cc.Node.extend({
	  ctor: function() {
	  	this._super();

        this.background = new cc.AudioEngine.getInstance();
        this.background.setMusicVolume(0.5);

        this.soundEffect = cc.AudioEngine.getInstance();

        this.isMute = false;
	  },

	  hit: function(){
	  	this.soundEffect.playEffect('res/hittingSound.mp3');
	  },

	  gameOver: function(){
	  	this.soundEffect.playEffect('res/gameOver.mp3');
	  },

	  startMusicPlease: function(){
	  	this.background.playMusic('res/theme.mp3',true);
	  },

	  stopMusicPlease: function(){
	  	this.background.stopMusic();
	  },

	  mute: function(){
	  	this.background.setMusicVolume(0);
	  	this.soundEffect.setEffectsVolume(0);
	  	this.isMute = true;
	  },

	  unMute: function(){
	  	this.background.setMusicVolume(0.5);
	  	this.soundEffect.setEffectsVolume(0.5);
	  	this.isMute = false;
	  }

});
