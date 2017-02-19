Doge.Intro = function(game) {};
Doge.Intro.prototype = {
    preload: function() {

    },
    create: function() {
      this.audio=this.add.audio('gamejam');
      this.audio2=this.add.audio('sfx2');
//      this.audio.loopFull();
    	this.portada=this.add.image(240,320,'porta');
    	this.portada.anchor.set(0.5);
    	this.titulo=this.add.image(240,80,'titulo');
  		this.titulo.anchor.set(0.5);
  		this.siguiente=this.add.button(147,240,'option1',this.playgame,this);
  		this.siguiente.anchor.set(0.5);
   		this.siguiente.scale.set(0.5);
  		this.siguiente2=this.add.button(147,450,'option2',this.playgame,this);
   		this.siguiente2.anchor.set(0.5);
   		this.siguiente2.scale.set(0.5);
    },
    playgame: function() {
//      this.audio2.play();
      this.audio.destroy();
    	this.state.start('Game');
    }
};