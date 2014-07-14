var constants = require('../config/defines.js');

var Spot = {
  neighbors: [],
  initialize: function(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.isRevealed = false;
    this.mine = false;
    this.minesNearby = 0;
    this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/covered.png";
  },
  create: function(x, y) {
    var spot = Object.create(Spot);
    spot.initialize(x, y);
    return spot;
  },
  reset: function() {
    this.isRevealed = false;
    this.mine = false;
    this.minesNearby = 0;
    this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/covered.png";
  },
  setNumMinesNear: function(minefield) {
    if (this.mine) {
      return;
    }
    this.neighbors = [];
    for (var x = Math.max(0, this.xCoord - 1); x <= Math.min(WIDTH - 1, this.xCoord + 1); x++) {
      for (var y = Math.max(0, this.yCoord - 1); y <= Math.min(WIDTH - 1, this.yCoord + 1); y++) {
        var checkSpot = minefield.getSpot(x, y);
        if (checkSpot !== this) {          
          this.neighbors.push({x: x, y: y});
          if (checkSpot.mine === true) {
            this.minesNearby++;
          }
        }
      }
    }
  },
  reveal: function(minefield) {
    this.isRevealed = true;
    minefield.spotsChecked++;
    if (this.mine) {
      this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/mine.png";
      return true;
    } else if (this.minesNearby > 0) {
      switch(this.minesNearby) {
        case 1:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-1.png";
          break;
        case 2:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-2.png";
          break;
        case 3:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-3.png";
          break;
        case 4:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-4.png";
          break;
        case 5:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-5.png";
          break;
        case 6:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-6.png";
          break;
        case 7:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-7.png";
          break;
        case 8:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-8.png";
          break;
      }
    } else {
      this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/empty.png";
      this.revealNeighbors(minefield);
    }
    return false;
  },
  revealNeighbors: function(minefield) {
    for (var i = 0; i < this.neighbors.length; i++) {
      var x = this.neighbors[i].x;
      var y = this.neighbors[i].y;
      var neighbor = minefield.getSpot(x, y);
      if (!neighbor.isRevealed) {
        neighbor.reveal(minefield);
      }
    }
  }
};

module.exports = Spot;