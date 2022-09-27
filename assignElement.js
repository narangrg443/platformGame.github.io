  function done(m, b,e,w) {
      Map1 = m;
      Brick = b;
      Enemy=e;
      WoodenBox=w;
      if (!objAssigned) {
    player.vy=0;
    player.dead=false;
    while(Bulet.length){
      Bulet.pop();
    }
    while(WoodenBox.length){
      WoodenBox.pop();
    }
    while(Coins.length){
      Coins.pop();
    }
        while (Brick.length) {
          Brick.pop();
        }
        while(Enemy.length){
          Enemy.pop();
        }
        for (let m = 0; m < Map1.length; m++) {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              posX = (m*Map_width)+(j*boxX); //multipy 851 by Map no to get posx;
              posY = i*boxY;
              if (Map1[m][i][j] == 1) {
                Brick.push(new Box(posX, posY, boxX, boxY));//brick
                Brick[Brick.length-1].mapNo = m;
                Brick[Brick.length-1].type = 1;
              } else if (Map1[m][i][j] == 3) {              //wooden box
                Brick.push(new Box(posX, posY, boxX, boxY));//brick
                Brick[Brick.length-1].mapNo = m;
                Brick[Brick.length-1].type = 3;
              } else if (Map1[m][i][j] == 9) {                //player 
                player.x = posX; player.y = posY
              } else if (Map1[m][i][j] == 2) {

                Brick.push(new Box(posX, posY, boxX, boxY));
                Brick[Brick.length-1].mapNo = m;
                Brick[Brick.length-1].type = 2;               //invisilble box
                Brick[Brick.length-1].visible= 0;
              
              } else if (Map1[m][i][j] == 8) {               //bug enemy

                Enemy.push(new Bug(posX, posY, boxX-10, boxY-15)); //reduce bug size
                Enemy[Enemy.length-1].mapNo = m;
                Enemy[Enemy.length-1].type = 8;

              }else if(Map1[m][i][j]==6){                     //coins 
                  Coins.push(new Coin(posX, posY, boxX, boxY)); 
                Coins[Coins.length-1].mapNo = m;
                Coins[Coins.length-1].type = 6;
                
              }
            }
          }

        }
      }
      objAssigned = true;
    }
