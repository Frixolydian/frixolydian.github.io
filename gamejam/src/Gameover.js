Doge.Gameover = function(game) {};
Doge.Gameover.prototype = {
    preload: function() {

    },
    create: function() {
		this.audio=this.add.audio('gamejam3');
		this.audio.loopFull();
    	this.death=this.add.image(220,270,'death');
    	this.death.anchor.set(0.5);
  		this.restart=this.add.button(220,420,'option3',this.playgame,this);
   		this.restart.anchor.set(0.5);
   		this.highscoretext=this.add.text(220,550,'Highscore: '+highscore, { font: '36px Arial', fill: '#FF0000' });
   		this.highscoretext.anchor.set(0.5);
    },
    playgame: function() {
    	this.audio.destroy();
    	this.state.start('Game');
    }
};