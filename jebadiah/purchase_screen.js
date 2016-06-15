purchase_screen = function(game){};
purchase_screen.prototype = {
  create:function(){
//    this.game.state.start('Kusoge');
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
//back to action    
    this.back_to_action = this.add.text(500, 50, 'Back to action!');
    this.back_to_action.inputEnabled = true;
    this.back_to_action.events.onInputDown.add(function() {
      this.game.state.start('Kusoge');
    }, this);
//buy turrets
    this.buy_turret_1 = this.add.text(50, 200, 'Buy left turret: $200');
    this.buy_turret_1.inputEnabled = true;
    this.buy_turret_1.events.onInputDown.add(function() {
      if (money >= 200 && !TURRET_1){
        TURRET_1 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_2 = this.add.text(50, 250, 'Buy right turret: $200');
    this.buy_turret_2.inputEnabled = true;
    this.buy_turret_2.events.onInputDown.add(function() {
      if (money >= 200 && !TURRET_2){
        TURRET_2 = true;
        money -= 200;
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_1_upgrade = this.add.text(50, 300, 'Buy left turret upgrade (' + TURRET_1_UPGRADE + '): $200');
    this.buy_turret_1_upgrade.inputEnabled = true;
    this.buy_turret_1_upgrade.events.onInputDown.add(function() {
      if (money >= 200 && TURRET_1){
        TURRET_1_UPGRADE += 1;
        money -= 200;
        this.buy_turret_1_upgrade.text = 'Buy left turret upgrade (' + TURRET_1_UPGRADE + '): $200';
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

    this.buy_turret_2_upgrade = this.add.text(50, 350, 'Buy right turret upgrade (' + TURRET_2_UPGRADE + '): $200');
    this.buy_turret_2_upgrade.inputEnabled = true;
    this.buy_turret_2_upgrade.events.onInputDown.add(function() {
      if (money >= 200 && TURRET_2){
        TURRET_2_UPGRADE += 1;
        money -= 200;
        this.buy_turret_2_upgrade.text = 'Buy right turret upgrade (' + TURRET_2_UPGRADE + '): $200';
        this.money_text.text = 'Money: ' + money;
      }
    }, this);

  }
};