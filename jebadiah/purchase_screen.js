Shoppe = function (game, state) {
  left_shop = game.add.group();
  buy_heal_train = game.add.button(-300, 100, 'shop_frame');
  buy_heal_train.onInputDown.add(function(){
    Buy_heal_train(game, state);
  }, this);
  buy_heal_train.addChild(game.make.bitmapText(10, 10, 'font', 'Repair train: $' + (100 - structure_health) * 10, 14));

  buy_armor_train = game.add.button(-300, 160, 'shop_frame');
  buy_armor_train.onInputDown.add(function(){
    Buy_heal_train(game, state);
  }, this);
  buy_armor_train.addChild(game.make.bitmapText(10, 10, 'font', 'Upgrade train Hull: $' + 500, 14));

  buy_left_turret = game.add.button(-300, 220, 'shop_frame');
  buy_left_turret.onInputDown.add(function(){
    Buy_left_turret(game, state);
  }, this);
  buy_left_turret.addChild(game.make.bitmapText(10, 10, 'font', 'Buy back turret: $' + 500, 14));

  buy_right_turret = game.add.button(-300, 280, 'shop_frame');
  buy_right_turret.onInputDown.add(function(){
    Buy_right_turret(game, state);
  }, this);
  buy_right_turret.addChild(game.make.bitmapText(10, 10, 'font', 'Buy front turret: $' + 500, 14));

  buy_left_turret_upgrade = game.add.button(-300, 340, 'shop_frame');
  buy_left_turret_upgrade.onInputDown.add(function(){
    Buy_left_turret_upgrade(game, state);
  }, this);
  buy_left_turret_upgrade.addChild(game.make.bitmapText(10, 10, 'font', 'Upgrade back turret: $' + 500, 14));

  buy_right_turret_upgrade = game.add.button(-300, 400, 'shop_frame');
  buy_right_turret_upgrade.onInputDown.add(function(){
    Buy_right_turret_upgrade(game, state);
  }, this);
  buy_right_turret_upgrade.addChild(game.make.bitmapText(10, 10, 'font', 'Upgrade front turret: $' + 500, 14));

  left_shop.add(buy_heal_train);
  left_shop.add(buy_armor_train);
  left_shop.add(buy_left_turret);
  left_shop.add(buy_right_turret);
  left_shop.add(buy_left_turret_upgrade);
  left_shop.add(buy_right_turret_upgrade);
  left_shop.fixedToCamera = true;

  right_shop = game.add.group();
  buy_pistol = game.add.button(850, 100, 'shop_frame');
  buy_pistol.onInputDown.add(function(){
    Buy_weapon(game, state, PISTOL_SHOP, buy_pistol, 'PISTOL');
  }, this);
  buy_pistol.addChild(game.make.bitmapText(10, 10, 'font', 'Buy pistol upgrade (' + PISTOL_SHOP.upgrade +'): $' + PISTOL_SHOP.upgrade_cost, 12));
  buy_pistol.getChildAt(0).maxWidth = 240;

  buy_shotgun = game.add.button(850, 160, 'shop_frame');
  buy_shotgun.onInputDown.add(function(){
    Buy_weapon(game, state, SHOTGUN_SHOP, buy_shotgun, 'SHOTGUN');
  }, this);
  buy_shotgun.addChild(game.make.bitmapText(10, 10, 'font', 'Buy shotgun: $300', 12));
  buy_shotgun.getChildAt(0).maxWidth = 220;

  buy_mp5 = game.add.button(850, 220, 'shop_frame');
  buy_mp5.onInputDown.add(function(){
    Buy_weapon(game, state, MP5_SHOP, buy_mp5, 'MP5');
  }, this);
  buy_mp5.addChild(game.make.bitmapText(10, 10, 'font', 'Buy mp5: $650', 12));
  buy_mp5.getChildAt(0).maxWidth = 220;

  buy_rocket_launcher = game.add.button(850, 280, 'shop_frame');
  buy_rocket_launcher.onInputDown.add(function(){
    Buy_weapon(game, state, ROCKET_LAUNCHER_SHOP, buy_rocket_launcher, 'ROCKET LAUNCHER');
  }, this);
  buy_rocket_launcher.addChild(game.make.bitmapText(10, 10, 'font', 'Buy rocket launcher: $1000', 12));
  buy_rocket_launcher.getChildAt(0).maxWidth = 220;

  buy_weapon_5 = game.add.button(850, 340, 'shop_frame');
  buy_weapon_5.onInputDown.add(function(){
    Buy_weapon_5(game, state);
  }, this);
  buy_weapon_5.addChild(game.make.bitmapText(10, 10, 'font', 'Upgrade back turret: $' + 500, 12));

  buy_weapon_6 = game.add.button(850, 400, 'shop_frame');
  buy_weapon_6.onInputDown.addOnce(function(){
    Buy_weapon_6(game, state);
  }, this);
  buy_weapon_6.addChild(game.make.bitmapText(10, 10, 'font', 'Upgrade front turret: $' + 500, 14));

  right_shop.add(buy_pistol);
  right_shop.add(buy_shotgun);
  right_shop.add(buy_mp5);
  right_shop.add(buy_rocket_launcher);
  right_shop.add(buy_weapon_5);
  right_shop.add(buy_weapon_6);
  right_shop.fixedToCamera = true;

  close_shop_button = game.add.button(320, 600, 'shop_frame');
  close_shop_button.fixedToCamera = true;
  close_shop_button.onInputDown.add(function(){
    Close_shop(game, state);
  }, this);
  close_shop_button.addChild(game.make.bitmapText(10, 6, 'font', 'Close Shop', 14));

};

LeftShopUnfold = function (game, state) {
  SHOP_OPEN = true;
  left_shop.forEach(function(item) {
    game.time.events.add((item.y - 100) * 2, function() {
      game.add.tween(item).to( { x: 20 }, 200, Phaser.Easing.Exponential.Out, true);
    }, this);
  }, this);
  right_shop.forEach(function(item) {
    game.time.events.add((item.y - 100) * 2, function() {
      game.add.tween(item).to( { x: 500 }, 200, Phaser.Easing.Exponential.Out, true);
    }, this);
  }, this);
  game.add.tween(close_shop_button.cameraOffset).to( { y: 400 }, 300, Phaser.Easing.Exponential.Out, true);
};

Close_shop = function (game, state) {
  game.time.events.add(500, function() {
    SHOP_OPEN = false;
  }, this)
  left_shop.forEach(function(item) {
    game.time.events.add((item.y - 100) * 2, function() {
      game.add.tween(item).to( { x: -300 }, 200, Phaser.Easing.Exponential.Out, true);
    }, this);
  }, this);
  right_shop.forEach(function(item) {
    game.time.events.add((item.y - 100) * 2, function() {
      game.add.tween(item).to( { x: 850 }, 200, Phaser.Easing.Exponential.Out, true);
    }, this);
  }, this);
  game.add.tween(close_shop_button.cameraOffset).to( { y: 600 }, 300, Phaser.Easing.Exponential.Out, true);
  shop_wagon.goAway();
};

Buy_left_turret = function (game, state) {
  if (!TURRET_1 && money >= 500) {
    terrain_group.create(-250, 479, 'turret_stand').anchor.set(0.5);
    back_turret = new Turret(game, state, -250, 464, 'turret', TURRET_1_UPGRADE).angle = 180;
    TURRET_1 = true;
    money -= 500;
    playa.hud_money.text = '$$$: ' + money;
    buy_left_turret.getChildAt(0).text = 'BACK TURRET BOUGHT';
    buy_left_turret.getChildAt(0).tint = 0xFF0000;
    buy_left_turret.inputEnabled = false;
  }
};

Buy_right_turret = function (game, state) {
  if (!TURRET_2 && money >= 500) {
    terrain_group.create(250, 479, 'turret_stand').anchor.set(0.5);
    front_turret = new Turret(game, state, 250, 464, 'turret', TURRET_2_UPGRADE);
    TURRET_2 = true;
    money -= 500;
    playa.hud_money.text = '$$$: ' + money;
    buy_right_turret.getChildAt(0).text = 'BACK TURRET BOUGHT';
    buy_right_turret.getChildAt(0).tint = 0xFF0000;
    buy_right_turret.inputEnabled = false;
  }
};

Buy_weapon = function (game, state, weapon, target, name) {
  if (weapon.bought) {
    if (weapon.upgrade < 5 && money >= weapon.upgrade_cost) {
      weapon.upgrade += 1;
      money -= weapon.upgrade_cost;
      playa.hud_money.text = '$$$: ' + money;
      weapon.upgrade_cost = Math.floor(weapon.upgrade_cost * 1.5);
      target.getChildAt(0).text = 'Buy '+ name.toLowerCase() + ' upgrade (' + weapon.upgrade +'): $' + weapon.upgrade_cost;
      if (weapon.upgrade === 5) {
        target.getChildAt(0).destroy();
        target.addChild(game.make.bitmapText(10, 10, 'font', name + ' MAXED', 14)).tint = 0xFF0000;
        target.inputEnabled = false;
      }
    }
  }
  else if (money >= weapon.cost) {
    money -= weapon.cost;
    playa.hud_money.text = '$$$: ' + money;
    weapon.bought = true;
    target.getChildAt(0).text = 'Buy '+ name.toLowerCase() + ' upgrade (' + weapon.upgrade +'): $' + weapon.upgrade_cost;
  }
};