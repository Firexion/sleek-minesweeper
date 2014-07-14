
/*
 * Sample Welcome page Controller
 * 
 * @package Sleek.js
 * @version 1.0
 * @author Robin <robin@cubettech.com>
 * @Date 23-10-2013
 */

var Game = require('../models/game.js');

//index function
var indexController = {
    index:function(req, res){
        var data = {
            title: "Minesweeper",
            game: Game.create()
        };
        //load index.html from home directory
        system.loadView(res,'home/index', data);
    }
};

module.exports = indexController;