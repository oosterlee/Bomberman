var cols, rows;
var w = 45;
var grid = [];
var blocks = [];
var players = [];

var playerSprite;
var playerSpriteRotateA;
var playerSpriteRotateB;
var playerSpriteRotateC;
var tile;
var tileBlock;
var bombSprite;
var bombAnimation;

var current;

var stack = [];

function preload() {
    playerSprite = loadImage("sprites/player.png");
    playerSpriteRotateA = loadImage("sprites/playerA.png");
    playerSpriteRotateB = loadImage("sprites/playerB.png");
    playerSpriteRotateC = loadImage("sprites/playerC.png");
    tile = loadImage("sprites/tile.png");
    tileBlock = loadImage("sprites/tileBlock.png");
    bombSprite = loadImage("sprites/bomb.png");
    bombAnimation = loadImage("sprites/bombAnimation.png");

}

function setup() {
  createCanvas(15*w, 13*w);
  // cols = floor(15);
  // rows = floor(13);

  // for (var   j = 0; j < rows; j++) {
  //   for (var i = 0; i < cols; i++) {
  //     var cell = new Cell(i, j);
  //     grid.push(cell);
  //   }
  // }
  noStroke();
  var block;
/*
* Create array of all the blocks in the canvas.
*/
  for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 13; j++) {
          if (i % 2 && j % 2) {
              block = new Blocks(i, j, true);
              blocks.push(block);
          } else if (!(i % 2) || !(j % 2)) {
              block = new Blocks(i, j, false);
              blocks.push(block);
          }
      }
  }

  Player1 = new Man(0, 0, "Player1");
  Player2 = new Man(14, 12, "Player2");

  players.push(Player1);
  players.push(Player2);

  players[0].move(-1);

}

window.onkeyup = function(e) {
	if (/* LEFT */e.key == 'ArrowLeft') {
		Player1.move(0);
	} else if (/* RIGHT */e.key == 'ArrowRight') {
		Player1.move(1);
	} else if (/* UP */e.key == 'ArrowUp') {
		Player1.move(2);
	} else if (/* DOWN */e.key == 'ArrowDown') {
		Player1.move(3);
	} else if (/* SPACE */e.key == ' ') {
		Player1.move(4);
	} else if (e.key == "a") {
        Player2.move(0);
	} else if (e.key == "d") {
        Player2.move(1);
    } else if (e.key == "w") {
        Player2.move(2);
    } else if (e.key == "s") {
        Player2.move(3);
    } else if (e.key == "g") {
        Player2.move(4);
    } else {
        console.log(e.key);
    }
};


function showWinner() {
    for (var i = 0; i < players.length; i++) {
        winner = players[i].name;
    }

    background(51);

    function draw() {
        background(51);
        text("Winner is: "+winner, (15*w)/2, (13*w)/2);
        console.log('t');
    }

    var winP = document.querySelector('#Winner');
    winP.innerHTML = "Winner is: "+winner;
    winP.style.fontSize = "50px";
    winP.style.display = "block";

    var canvas = document.querySelector('canvas');
    canvas.style.display = "none";
}


/*
Made by: Roy Oosterlee
*/
