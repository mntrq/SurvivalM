var Sound = cc.Node.extend({
	  ctor: function() {
	  	this._super();
	  	this.background = cc.AudioEngine.getInstance();
        this.background.playMusic('res/bgSound.mp3',true);
        this.background.setMusicVolume(0.5);

        this.soundEffect = cc.AudioEngine.getInstance();
	  },

	  hit: function(){
	  	this.soundEffect.playEffect('res/hittingSound.mp3');
	  }

	
});
