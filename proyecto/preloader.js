preloader = function(game){};
preloader.prototype = {
    init:function() {

    },    
    preload:function(){
//        $.getJSON("data.json", function(json) {
//            game_data = json;
//        });
        this.load.audio('metro_high','assets/audio/metro_high.wav');
        this.load.audio('metro_low','assets/audio/metro_low.wav');
        this.load.audio('track_1','assets/audio/track_2.ogg');
        this.load.audio('sound_1','assets/audio/sound_1.ogg');
        this.load.spritesheet('figures', 'assets/figures.png', 100, 100);
        this.load.image('back_test', 'assets/back_test.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemy_test.png');
    },
    create:function(){
        this.game.state.start('Tempo_select');
    }
};