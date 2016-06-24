purchase_screen = function(game){};
purchase_screen.prototype = {
  create:function(){
    this.game.world.setBounds(0, 0, 720, 480);

    this.money_text = this.add.text(50, 50, 'Money: ' + money);

    this.recover_text = this.add.text(50, 100, 'Buy base repairment: $' + ((100 - structure_health) * 10));
    this.recover_text.inputEnabled = true;
    this.recover_text.events.onInputDown.add(function() {
      if (money >= (100 - structure_health) * 10){
        money -= (100 - structure_health) * 10;
        structure_health = 100;
        this.recover_text.text = 'Buy base repairment: $' + ((100 - structure_health) * 10);
        this.money_text.text = 'Money: ' + money;
      }
    }, this);
//weapon select
    this.pistol = this.add.text(400, 200, 'Pistol');
    this.pistol.inputEnabled = true;
    this.pistol.events.onInputDown.add(function() {
      current_weapon = pistol;
    }, this);
    this.shotgun = this.add.text(400, 250, 'Shotgun: $400');
    this.shotgun.fill = "#FF0000";
    this.shotgun.inputEnabled = true;
    this.shotgun.events.onInputDown.add(function() {
      if (SHOTGUN) {
        current_weapon = shotgun;
      }
      else if (money >= 400) {
        SHOTGUN = true;
        money -= 400;
      }
    }, this);
    this.mp5 = this.add.text(400, 300, 'MP5: $1000');
    this.mp5.fill = "#FF0000";
    this.mp5.inputEnabled = true;
    this.mp5.events.onInputDown.add(function() {
      if (MP5) {
        current_weapon = mp5;
      }
      else if (money >= 1000) {
        MP5 = true;
        money -= 1000;
      }
    }, this);

//back to action    
    this.back_to_action = this.add.text(500, 50, 'Back to action!');
    this.back_to_action.inputEnabled = true;
    this.back_to_action.events.onInputDown.add(function() {
      WAVE = WAVE +1;
      this.game.state.start('Kusoge');
    }, this);
//buy wagons
/*    this.buy_wagon_1 = this.add.text(50, 200, 'Buy left wagon: $200');
    this.buy_wagon_1.events.onInputDown.add(function() {
      if (money >= 200 && !WAGON_1){
        WAGON_1 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_wagon_2 = this.add.text(50, 250, 'Buy left wagon: $200');
    this.buy_wagon_2.events.onInputDown.add(function() {
      if (money >= 200 && !WAGON_2){
        WAGON_2 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);
*/
//buy turrets
    this.buy_turret_1 = this.add.text(50, 300, 'Buy left turret: $200');
    WAGON_1 ? this.buy_turret_1.inputEnabled = true : this.buy_turret_1.fill = "#FF0000";
    this.buy_turret_1.events.onInputDown.add(function() {
      if (money >= 200 && !TURRET_1){
        TURRET_1 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_2 = this.add.text(50, 350, 'Buy right turret: $200');
    WAGON_2 ? this.buy_turret_2.inputEnabled = true : this.buy_turret_2.fill = "#FF0000";
    this.buy_turret_2.inputEnabled = true;
    this.buy_turret_2.events.onInputDown.add(function() {
      if (money >= 200 && !TURRET_2){
        TURRET_2 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_1_upgrade = this.add.text(50, 400, 'Buy left turret upgrade (' + TURRET_1_UPGRADE + '): $200');
    TURRET_1 ? this.buy_turret_1_upgrade.inputEnabled = true : this.buy_turret_1_upgrade.fill = "#FF0000";
    this.buy_turret_1_upgrade.events.onInputDown.add(function() {
      if (money >= 200){
        TURRET_1_UPGRADE += 1;
        money -= 200;
        this.buy_turret_1_upgrade.text = 'Buy left turret upgrade (' + TURRET_1_UPGRADE + '): $200';
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_2_upgrade = this.add.text(50, 450, 'Buy right turret upgrade (' + TURRET_2_UPGRADE + '): $200');
    TURRET_2 ? this.buy_turret_2_upgrade.inputEnabled = true : this.buy_turret_2_upgrade.fill = "#FF0000";
    this.buy_turret_2_upgrade.events.onInputDown.add(function() {
      if (money >= 200){
        TURRET_2_UPGRADE += 1;
        money -= 200;
        this.buy_turret_2_upgrade.text = 'Buy right turret upgrade (' + TURRET_2_UPGRADE + '): $200';
        this.money_text.text = 'Money: ' + money;
      }
    }, this);
  },
  update: function() {
    this.money_text.text = money;
//recover_text
    if (money >= (100 - structure_health) * 10 && structure_health < 100) {
      this.recover_text.inputEnabled = true
      this.recover_text.fill = "#000000";
    }
    else {
      this.recover_text.inputEnabled = false;
      this.recover_text.fill = "#FF0000";
      this.recover_text.inputEnabled = false;
    }
//buy left wagon
/*    if (WAGON_1) {
      this.buy_wagon_1.fill = "#AAAAAA";
    }
    else if (money < 200) {
      this.buy_wagon_1.fill = "#FF0000";
      this.buy_wagon_1.inputEnabled = false;
    }
    else {
      this.buy_wagon_1.inputEnabled = true;
      this.buy_wagon_1.fill = "#000000";
    }
//buy right wagon
    if (WAGON_2) {
      this.buy_wagon_2.fill = "#AAAAAA";
    }
    else if (money < 200) {
      this.buy_wagon_2.fill = "#FF0000";
      this.buy_wagon_2.inputEnabled = false;
    }
    else {
      this.buy_wagon_2.inputEnabled = true;
      this.buy_wagon_2.fill = "#000000";
    }*/
//buy left turret
    if (TURRET_1) {
      this.buy_turret_1.fill = "#AAAAAA";
    }
    else if (money >= 200) {
      this.buy_turret_1.inputEnabled = true;
      this.buy_turret_1.fill = "#000000";
    }
    else {
      this.buy_turret_1.fill = "#FF0000";
      this.buy_turret_1.inputEnabled = false;
    }
//buy right turret
    if (TURRET_2) {
      this.buy_turret_2.fill = "#AAAAAA";
    }
    else if (money >= 200) {
      this.buy_turret_2.inputEnabled = true;
      this.buy_turret_2.fill = "#000000";
    }
    else {
      this.buy_turret_2.fill = "#FF0000";
      this.buy_turret_2.inputEnabled = false;
    }
// turret upgrade
    if (TURRET_1_UPGRADE > 4) {
      this.buy_turret_1_upgrade.fill = "#AAAAAA";
      this.buy_turret_1_upgrade.inputEnabled = false;
    }
    else if (money >= 200 && TURRET_1) {
      this.buy_turret_1_upgrade.inputEnabled = true;
      this.buy_turret_1_upgrade.fill = "#000000";  
    }
    else {
      this.buy_turret_1_upgrade.fill = "#FF0000";
      this.buy_turret_1_upgrade.inputEnabled = false;
    }
// turret upgrade
    if (TURRET_2_UPGRADE > 4) {
      this.buy_turret_2_upgrade.fill = "#AAAAAA";
      this.buy_turret_2_upgrade.inputEnabled = false;
    }
    else if (money >= 200 && TURRET_2) {
      this.buy_turret_2_upgrade.inputEnabled = true;
      this.buy_turret_2_upgrade.fill = "#000000";  
    }
    else {
      this.buy_turret_2_upgrade.fill = "#FF0000";
      this.buy_turret_2_upgrade.inputEnabled = false;
    }
    //weapons
    if (PISTOL) {
      this.pistol.fill = current_weapon === pistol? "#0000FF" : "#000000";
      this.pistol.text = "Pistol";
    }
    if (SHOTGUN) {
      this.shotgun.fill = current_weapon === shotgun? "#0000FF" : "#000000"
      this.shotgun.text = "Shotgun";
    }
    else if (money >= 400) {
      this.shotgun.fill = "#000000";
    }
    if (MP5) {
      this.mp5.fill = current_weapon === mp5? "#0000FF" : "#000000"
      this.mp5.text = "MP5";
    }
    else if (money >= 1000) {
      this.mp5.fill = "#000000";
    }
  }
};