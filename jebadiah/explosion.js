Explosion = function (game, state, x, y, sprite, duration, power, enemy) {
  Phaser.Sprite.call(this, game, x , y , 'explosion');
  game.add.existing(this);
  this.state = state;
  this.angle = Math.random() * 30 - 15;
  this.animations.add('explode', [0,1,2,3], 12, false);
  this.animations.play('explode');
  this.animations.currentAnim.onComplete.add(function() {this.destroy();}, this);
  this.power = power;
  this.duration = duration;
  this.enemy = enemy;
  this.smoothed = false;
  this.anchor.set(0.5);
  this.scale.set(Math.random() * 0.5 + 1);
  bullet_group.add(this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  new Explosion_smoke(this.game, this.state, this.x, this.y);
  for (var i = 0; i <= 100; i++) {
    new Impact(this.game, this.state, this.x, this.y, 'impact', Math.random() * 360, [0xFFFFFF, 0xFF0000, 0x000000], 200, 0.5);
  }
  new Howl({
    urls: ['assets/audio/explosion.ogg'],
    volume: 1,
    pos3d: [(this.x - this.game.camera.x - this.game.width * 0.5) * 0.005, 0, 0],
  }).play();
};
Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;



Explosion_smoke = function (game, state, x, y, sprite, duration, power, enemy) {
  Phaser.Sprite.call(this, game, x , y);
  game.add.existing(this);
  this.state = state;
  bullet_group.add(this);
  this.explosions = [];
  for (var i = 0; i <= 8; i++) {
    this.explosions[i] = this.addChild(game.make.sprite(0, 0, 'explosion_smoke'));
    this.explosions[i].smooth = false;
    this.explosions[i].angle = Math.random() * 360;
    this.explosions[i].anchor.set(0.5);
    this.explosions[i].scale.set(1 + Math.random());
    this.explosions[i].x += Math.random() * 80 - 40;
    this.explosions[i].y += Math.random() * 80 - 40;
    this.explosions[i].tint = Math.random() > 0.5? 0xffffff : 0xaaaaaa;
    this.explosions[i].animations.add('explode', [0,1,2,3,4], 15, false);
    this.explosions[i].animations.play('explode');
    this.explosions[i].animations.currentAnim.onComplete.add(function(a) {
      this.destroy();
    }, this);
  }
};
Explosion_smoke.prototype = Object.create(Phaser.Sprite.prototype);
Explosion_smoke.prototype.constructor = Explosion;

Explosion_smoke.prototype.update = function() {
};

Shake = function (game, state, time, intensity, interval) {
  this.state = state;
  game.time.events.repeat(interval, time, function() {
    camera_offset_x = Math.random() * intensity;
    camera_offset_y = Math.random() * intensity;
  }, this);
  game.time.events.add(interval * time + 1, function() {
    camera_offset_x = 0;
    camera_offset_y = 0;
  }, this);
}