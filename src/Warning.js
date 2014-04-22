var Warning = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'arrow.png' );
       
    },

    // update: function(){
    // 	var pos = new Array();
    // 	for(var i=0 ; i<3 ; i++){
    // 		pos[i] = this.ball[i].getPosition();
    // 	}
    // 	this.setPosition(cc.p(pos[i].x , pos[i].y));
    // },

});