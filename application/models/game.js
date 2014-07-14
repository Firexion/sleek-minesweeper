var Game = {
  initialize: function() {
    this.minefield = Minefield.create();
  },
  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game;
  },
  reset: function() {
    this.minefield.reset();
    this.won = null;
  },
  revealSpot: function(spot) {
    if(spot.reveal(this.minefield)) {
      this.won = false;
      return true;
    }
    if (this.minefield.spotsChecked === WIDTH * WIDTH - MINES) {
      this.won = true;
      return true;
    }
    return false;
  }
};

module.exports = Game;