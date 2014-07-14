var Minefield = {
  rows: [],
  initialize: function() {
    this.spotsChecked = 0;
    for (var i = 0; i < WIDTH; i++) {
      var row = {};
      row.spots = [];

      for (var j = 0; j < WIDTH; j++) {
        var spot = Spot.create(i,j);
        row.spots.push(spot);
      }

      this.rows.push(row);
    }

    this.placeRandomMines();
    this.calculateAllNumbers();

  },
  create: function() {
    var mineField = Object.create(Minefield);
    mineField.initialize();
    return mineField;
  },
  reset: function() {
    this.spotsChecked = 0;
    this.rows.forEach(function(row) {
      row.spots.forEach(function(spot) {
        spot.reset();
      });
    });
    this.placeRandomMines();
    this.calculateAllNumbers();
  },
  placeRandomMines: function() {
    var minesPlaced = 0;
    while (minesPlaced < MINES) {
      if (this.placeRandomMine()) {
        minesPlaced++;
      }
    }
  },
  placeRandomMine: function() {
    var row = Math.floor(Math.random() * WIDTH);
    var column = Math.floor(Math.random() * WIDTH);
    var spot = this.getSpot(row, column);
    if (!spot.mine) {
      spot.mine = true;
      return true;
    }
    return false;
  },
  getSpot: function(row, column) {
    var thisRow = this.rows[row];
    return thisRow.spots[column];
  },
  calculateAllNumbers: function() {
    for (var i = 0; i < WIDTH; i++) {
      for (var j = 0; j < WIDTH; j++) {
        var spot = this.getSpot(i, j);
        spot.setNumMinesNear(this);
      }
    }
  }
};

module.exports = Minefield;