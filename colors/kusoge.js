Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}


kusoge = function(game){};

kusoge.prototype = {

  create:function(){
    this.game.stage.backgroundColor = "#FFFFFF"; //set the background color
    this.color1 = this.add.image(20, 20, 'wall');
    this.color1.tint = Phaser.Color.HSLtoRGB(0.7, 1, 0.5).color;
    this.color2 = this.add.image(20, 100, 'wall');
    this.color2.tint = Phaser.Color.HSLtoRGB(0.2, 1, 0.5).color;
    console.log(Phaser.Color.HSLtoRGB(0.1, 1, 0.5).color);
  },

  update:function(){

  },

  render:function(){

  },
};