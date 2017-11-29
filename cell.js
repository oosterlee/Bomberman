function Man(x, y, name) {
  this.x = x ? x : 0;
  this.y = y ? y : 0;
  // console.log(this.x, this.y);
  this.oldLoc = [x ? x : 0, y ? y : 0];
  self = this;
  this.bombs = [];
  this.bombAmount = 2;
  this.name = name;

  for (var i = 0; i < blocks.length; i++) {
      if (this.x == blocks[i].x && this.y == blocks[i].y && blocks[i].isSolid !== true) {
          blocks.splice(i, 1);
      } else if (blocks[i].x == 0 && blocks[i].y == 1) {
          blocks.splice(i, 1);
      } else if (blocks[i].x == 1 && blocks[i].y == 0) {
          blocks.splice(i, 1);
      } else if (blocks[i].x == 13 && blocks[i].y == 12) {
          blocks.splice(i, 1);
      } else if (blocks[i].x == 14 && blocks[i].y == 11) {
          blocks.splice(i, 1);
      }
  }

  this.check = function() {
      if (this.x == -1) {
          this.x = 0;
      }
      if (this.y == -1) {
          this.y = 0;
      }
      if (this.x == 15) {
          this.x = 14;
      }
      if (this.y == 13) {
          this.y = 12;
      }
    //   blocks.find(function(value, index) {
    //       if (value.x == self.x && value.y == self.y && value.isBroken !== true) {
    //           console.log(value.x, self.x, value.y, self.y);
    //           return true;
    //       } else {
    //           return false;
    //       }
    //   })

        this.a = [];
        for (var i = 0; i < blocks.length; i++) {
            if (this.x == blocks[i].x && this.y == blocks[i].y && blocks[i].isBroken !== true) {
                // console.log(true);
                // a.push(true);
                this.a.push(true);
            } else {
                this.a.push({tX: this.x, tY: this.y, bX: blocks[i].x, bY: blocks[i].y, block: blocks[i]});
                // console.log(false);
            }
        }
      if (this.a.indexOf(true) >= 0) {
          this.x = this.oldLoc[0];
          this.y = this.oldLoc[1];
          this.oldLoc = [this.x, this.y];
      } else {
          this.oldLoc = [this.x, this.y];
      }
  };

  this.move = function(to) {
      this.an = 0;
      if (to == 0) { // LEFT
          this.x -= 1;
          this.check();
          this.an = 45;
      } else if (to == 1) { // RIGHT
          this.x += 1;
          this.check();
          this.an = 90;
      } else if (to == 2) { // UP
          this.y -= 1;
          this.check();
          this.an = 135;
      } else if (to == 3) { // DOWN
          this.y += 1;
          this.check();
          this.an = 180;
      } else if (to == 4 && this.bombAmount > 0) { // PLACE BOMB
          this.bombAmount--;
          this.bomb = new Bomb(this.x, this.y, this.name);
          this.bombs.push(this.bomb);
          this.an = this.an;
      } else {
          this.an = 0;
      }

    //   var t = grid.findIndex(function(cell) {
    //       if (cell.i == self.x && cell.j == self.y) {
    //           return true;
    //       } else {
    //           return false;
    //       }
    //   });
    //   lastGrid = grid[t];
    //   grid[t].visited = true;
    background(51);
    for (var d = 0; d < players.length; d++) {
        players[d].show(this.an);
    }
  };

  this.show = function(angle) {
      if (this.bombs.length >= 1) {
        for (var j = 0; j < this.bombs.length; j++) {
            this.bombs[j].show();
        }
      }

    //   fill(255, 0, 255, 100);
    //   rect(this.x*w, this.y*w, w, w);
    console.log(this.an);
    // rotate(angle ? angle : 0);

    if (this.an == 45) {
        image(playerSpriteRotateC, this.x*w, this.y*w, w, w);
    } else if (this.an == 90) {
        image(playerSpriteRotateB, this.x*w, this.y*w, w, w);
    } else if (this.an == 135) {
        image(playerSprite, this.x*w, this.y*w, w, w);
    } else if (this.an == 180) {
        image(playerSpriteRotateA, this.x*w, this.y*w, w, w);
    } else {
        image(playerSprite, this.x*w, this.y*w, w, w);
    }

      for (var i = 0; i < blocks.length; i++) {
    		blocks[i].show();
    	  }
  };

}



function Blocks(x, y, isSolid, isBroken) {
    this.x = x;
    this.y = y;
    this.isSolid = isSolid;
    this.isBroken = isBroken;

    this.show = function() {
        if (this.isSolid) {
            // noStroke();
            // fill(255, 255, 255, 100);
            image(tile, this.x*w, this.y*w, w, w);
        } else {
            // noStroke();
            // fill(0, 0, 255, 100);
            image(tileBlock, this.x*w, this.y*w, w, w);
        }
        if (this.isBroken == true) {
            noStroke();
            fill(0, 0, 0, 0);
        }
        // rect(this.x*w, this.y*w, w, w);
    };
}


function Bomb(x, y, name) {
    this.x = x;
    this.y = y;
    self = this;
    console.log("Bomb:", this.x, this.y);

    this.showBombing = function() {

        var bombArr = [
            {x: (this.x)*w, y: (this.y)*w},
             {x: (this.x+1)*w, y: (this.y)*w},
              {x: (this.x-1)*w, y: (this.y)*w},
               {x: (this.x)*w, y: (this.y-1)*w},
                {x: (this.x)*w, y: (this.y+1)*w}
            ];

        self.time = 10;
        self.num = 0;

        self.interval = setInterval(function() {
            if (self.num >= 50) {
                clearInterval(self.interval);
            }
            for (var i = 0; i < bombArr.length; i++) {
                image(bombAnimation, bombArr[i].x, bombArr[i].y, w, w);
            }
            self.num++;
        }, self.time);

        // image(bombAnimation, (this.x)*w, (this.y)*w, w, w);
        // image(bombAnimation, (this.x+1)*w, (this.y)*w, w, w);
        // image(bombAnimation, (this.x-1)*w, (this.y)*w, w, w);
        // image(bombAnimation, (this.x)*w, (this.y+1)*w, w, w);
        // image(bombAnimation, (this.x)*w, (this.y-1)*w, w, w);


        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < bombArr.length; j++) {
                xx = bombArr[j].x/w;
                yy = bombArr[j].y/w;

                if (players[i].x == xx && players[i].y == yy) {
                    console.log(players[i].name);
                    players.splice(i, 1);
                    showWinner();
                }
            }
        }

        for (var i = 0; i < blocks.length; i++) {
            for (var j = 0; j < bombArr.length; j++) {
                xx = bombArr[j].x/w;
                yy = bombArr[j].y/w;

                if (blocks[i].x == xx && blocks[i].y == yy && blocks[i].isSolid !== true) {
                    blocks.splice(i, 1);
                }
            }
        }
    };

    this.timeout = setTimeout(function() {
        self.showBombing();
    }, 2000);

    this.secondTimeout = setTimeout(function() {
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == name) {
                clearInterval(self.interval);
                players[i].bombs.shift();
                players[i].move(-1);
                players[i].bombAmount++;
            }
        }
    }, 3000);

    this.show = function() {
        // fill(100, 50, 255, 100);
        // rect(this.x*w, this.y*w, w, w);
        image(bombSprite, this.x*w, this.y*w, w, w);
    };

}
