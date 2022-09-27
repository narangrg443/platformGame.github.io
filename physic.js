
//rect_c  


function rect_C(r1,r2,c){ // r2 collsison side is returned 
let col=c;
if(col==undefined)col=1;

    let collisionSide="";
    
    let totalX=r1.w/2+r2.w/2;
    let totalY=r1.h/2+r2.h/2;
    
    
    let r1CenterX=r1.x+r1.w/2;
    let r1CenterY=r1.y+r1.h/2;
    
    let r2CenterX=r2.x+r2.w/2;
    let r2CenterY=r2.y+r2.h/2;
    
    let dist_x=Math.abs(r1CenterX-r2CenterX);
    let dist_y=Math.abs(r1CenterY-r2CenterY);
    
    
    if(dist_x<=totalX && dist_y<=totalY){
  
      
  let overlapX=totalX-dist_x;
  let overlapY=totalY-dist_y;
      
  if(overlapY>overlapX){
    //its left side or right side collidion
    if(r1.x<r2.x){
      //left collidions
     r1.x-=overlapX;
      collisionSide="left"
    }else{
    r1.x+=overlapX;
      collisionSide="right"
    }
  }else{
    //overlaop in top or bottom
    if(r1.y<r2.y ){
      //collidion on top;
    
       r1.y-=overlapY;
      collisionSide="top";
    }else{
      //ocllision on buttom
     r1.y+=overlapY;
      collisionSide="bottom";
    }
  }    
     return collisionSide; 
      
    }else{
        

      collisionSide="none"
      return collisionSide;
    }
    
    
    
     }
  
  
  
  function gravity(obj){
    obj.vy+=obj.g;
  obj.y+=obj.vy;
    
  
  }
  
  
  function jump(p){
    
    
    player=p;
    if(key.space && player.onGround){
    player.onGround=false;
  
      player.vy+=player.jump;
    
    }
    
      player.y+=player.vy;

    //limit the jump
    
  
    if(player.vy<=player.jump){
      player.vy=player.jump;
    }
    
    }
  function keyControl(){
  
          if (key.right) {
           player.action = 0;
            player.vx += player.a;


            if (player.x < 400 || MapNo == Map1.length-1) {
              //condition to move player

              player.x += player.vx;
            } else {
              //else move bricks; also track map no

              point1 -= player.vx; //point is equal to 851; position
              dist -= player.vx; // startin point value is 0
            
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@move enemy as weee 
                 Brick.forEach(e=> {
                 e.x -= player.vx;

                });

              Enemy.forEach(e=>{
                e.x-=player.vx;
              })

//move coins 
              Coins.forEach(e=>{
              e.x-=player.vx;
              })
              
              Bulet.forEach(bullet=>{
                bullet.x-=player.vx;
              })
              
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            

              if (point1 <= 0) {
                point1 = 851;
                MapNo++;
              }

            }


          }


          if (key.left) {
      player.action = 1;

player.vx+=player.a
            if (player.x<400 || MapNo==0 ) {
              //condition to move player
              player.x -= player.vx;
            } else {
              //else move bricks; also track map no

              point1 += player.vx; //point is equal to 851; position
              dist += player.vx; // startin point value is 0
             
             
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             
              Brick.forEach(e=> {//Brick
                e.x += player.vx;
                });
              
              Enemy.forEach(e=>{
                e.x+=player.vx;
              })

             Coins.forEach(e=>{
             e.x+=player.vx;
             });
             
             Bulet.forEach(bullet=>{
               bullet.x+=player.vx;
             })
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
              if (point1 >= 851) {
                point1 = 0;
                MapNo--;
              }

            }
          }


          //limieting player width canvas x axis
          if (player.x <= 0) {
            player.x = 0;
          } else if (player.x+player.w >= 851) {
            player.x = 851-player.w;
          }

          if (player.vx > player.vel_limit) {
            player.vx = player.vel_limit;
          }



          if (key.space) {
            
            if (player.action == 0 || player.action == 2) {
              player.action = 4;
            } else if (player.action == 1 || player.action == 3) {
              player.action = 5;
            }


          } else if (!key.right &&!key.left) {
          // player.vx*=.85;
            if (player.action == 0 || player.action == 4) {
              player.action = 2; //using friction
            } else if (player.action == 1 || player.action == 5) {
              player.action = 3;
            }
          }
          //assign 2 maps

  }
  //666666666666666666666666666666666666666666666666666666666666666666666666666666666666
  
  //666666666666666666666666666666666666666666666666666666666666666666666666666666666666
  //666666666666666666666666666666666666666666666666666666666666666666666666666666666666
          //colldiiosns\
          
          function collisionCheck(player,Brick,enemy,Coins){
            enemy.forEach(enemy_1=>{                     //bullet enemy
                Bulet.forEach(bullet=>{
                  let collisionSide=rect_C(bullet,enemy_1);
                  if(collisionSide==="none"){}else{enemy_1.dead=true;bullet.visible=false;}
                })
               })
            
              Brick.forEach(brick=>{//BULLET BRICK COLLISIN
                if(brick.x>-64&& brick.x<851 && brick.type==1 || brick.type==3){
                    Bulet.forEach(bullet=>{
                    let collisionSide=rect_C(bullet,brick);
                      if(collisionSide=="top" ){
                         bullet.u*0.97;
                    bullet.vt*=-1;
                       }
                       else if(collisionSide=="right" || collisionSide=="left"){
                         bullet.vx*=-1;bullet.bounceNo++;
                       }else if(collisionSide==="top"){
                        bullet.bounceOnFloor++;
                       }
                  
                    })
                 }
              })   
            //////////////////////////////////////////////////
            if(enemy==="undefined")enemy=null;
          
            if(!player.dead){
                 for (let [index,e] of Brick.entries()) {
                   
                  if (e.x >= -64 && e.x <= 851 && e.visible) {
                    if(e.type==3){
                     let collisionSide= rect_C(player,e);
                     
                     if(collisionSide==="top"){player.vy*=-0.5;   player.onGround = true;
                   player.vy*= -.5;
                   if(Math.abs(player.vy)<0.14 )player.vy=0;
                   break;
                }
                     if(collisionSide==="bottom")player.vy*=-0.5;
                    }
                   if (e.type == 1 ) {
                      if(!e.down){
                      collisionSide = rect_C(player, e)
                      
                  
                   if (collisionSide == "top") {
                   player.onGround = true;
                   player.vy*= -.5;
                   if(Math.abs(player.vy)<0.14 )player.vy=0;
              
                  break;
                }
                if (collisionSide === "bottom") {
                  player.vy*=player.bounce;
                //  e.y-=50;//moves box up little bit
                  e.down=true;
                  b_dx=e.x; b_dy=e.y;
                  Brick_animate=true;
                  e.visible=0;
                  
                //  Brick_animate=true;
                //  e.visible=false;
                  break;
                }}

              

              }
            }
          }
            }
          
          for(const [index,b] of Brick.entries()){
            if(!b.visible && b.type==1){// nidden and unddden brick is there 
              Brick.splice(index,1);
              
            }
          }
          //make sure player is not dead befor colliding width enemy
                 for(const [index,e] of Enemy.entries()){
                   
                   if(e.x> 0 && e.x<855){
                     e.visible=true;
                  
                   }else{
                    e.visible= false;
                   }
                   if(e.y>390){e.visible=0;bug1No++;   Enemy.splice(index,1);break;
                  }
                   if( e.visible && !e.dead ){
                   
                   Brick.forEach(b=>{//collsiiosn width vrick and enemy
                     if(b.visible && b.type==1 ||b.type==2 && !b.visible || b.type==3 && b.visible==1){
                     let collisionSide_1=rect_C(e,b);
                     if(b.type==2||b.typ==1){
                     if(collisionSide_1==="left" || collisionSide_1==="right")e.vx*=-1;
                       
                     }
                     if(collisionSide_1==="top")e.vy=0;
                     if(collisionSide_1==="bottom")e.dead=true;
                     }
                   })  
                   
                   if(!player.dead){
                       let collisionSide=rect_C(player,e);//collsiiosn width enemuy and player
                        if(collisionSide==="top" && !player.dead){
                        player.vy*=player.bounce;//bounce 
                        e.dead=true;//enemy dead
                        
                        if(e.y>390)e.visible=0;
                   }else if(collisionSide==="left" || collisionSide==="right"){
                     player.dead=true;//playef dead
                     key.space=true;
                   }
                  }
                   }
                }
//coin Player collision           /////////////////-----------------coin player collidion

for(let [index,e] of Coins.entries()){
  if(e.y<0){e.visible=false;coinsNo++;coins_No++;}//coin is smaller than y then invidi
  if(!e.visible)Coins.splice(index,1);//whien coin is not vissible delete it 
  if(e.c){e.y-=7;}
   let collisionSide;
    
    if(!e.taken ){
    collisionSide=rect_C(player,e);
  
    
     }
      
   if(collisionSide==="left" || collisionSide==="right"|| collisionSide==="top" || collisionSide==="bottom"){
   e.taken=true;
  e.c=true;
     break;
   }
  
}

          }// end of collisions
   ///////////////////////////////       ///////////////////////////////////////
   //brick Brick_animate
   function BrickAnimate(){
  if(Brick_animate){

    for(let i=0;i<2;i++){
      for(let j=0;j<2;j++){
       
        let w=boxX/2-10; let h=boxY/2-5;
        let posX=b_dx+(j*w);  let posY=b_dy+(i*h);
        P.push(new Pieces(posX,posY,w,h-5));
      
      }
    }
    Brick_animate=false;
   // console.log(P.length);
  } 
  
     for(const [index,p] of P.entries()){
p.vx=Math.random()*3;
   if(index%2==0){p.vx=-p.vx;p.angle-=2;}else{p.angle+=2;}
   if(index==1 || index==0){p.u=10;}
//p.u=Math.random()*10+10;


       p.move();
if(p.y>380){
  P.splice(index,1);
}      
    
     }
     
   }//close main 


//funcrion fire

function fire(brust){
  
  if(key.enter && fired==false){
  
  Bulet.push(new Bullet(player.x+player.w/2,player.y+player.h/2,10,10));
  fired=true;
      }
      delay++;
      if(brust){
      if(delay==20){fired=false;delay=0;}//brust bullet 
      }else{
        if(!key.enter)fired=false;//single bullet 
      }
      for(const [index,b] of Bulet.entries()){
         
        if(b.visible) b.move()
        
        if(b.x>851 || b.x<0 || b.bounceNo>=1|| b.bounceOnFloor>1){
          b.visible=false;
          if(!b.visible ){
          Bulet.splice(index,1);
            
          }
        }
        //move bullet 
       
      }
    }

  
   
   ///////////////---------------------RENDER---------
   
function renderImage(){
          ctx.drawImage(Img.background, 0, 0, 300, 150, 0, 0, canvas.width, canvas.height);
        
        
          for(const [index,e] of Brick.entries()) {
            if (e.x>=-64 && e.x <= 851 && e.visible) {
              if (e.type == 2)e.drawSprite(Img.brick_2, 30, 30);
              if (e.type == 1)e.drawSprite(Img.brick_1, 100, 100)
              if(e.type==3)e.drawSprite(Img.woodenBox,100,100);
              //draw border in brick_1

            }else if(e.type==1 && !e.visible){
              Brick.splice(index,1);
            }
          }
          
          //draw enemy
        
          for(let e of Enemy){
            
          if(e.visible){
        
          e.walk();
          e.drawSprite(Img.bug1,20.85,20);    
          }
          }
          //draw player
if(player.dead){
 player.blink(Img.player,51,82); 
}else{
          player.drawSprite(Img.player,
            player.action,
            51,
            82);
            
}      
            
            
            Coins.forEach(e=>{
      if(e.visible)e.draw(Img.coin,100,98);
            })
            
            
      P.forEach(e=>{
  if(  e.visible){
 //  console.log(e.x,e.y,e.w,e.h)
    e.draw(Img.brick_1);
  }
  })
         
////////////////////
Bulet.forEach(e=>{
  if(e.visible){
  e.draw(player);
  }
});
  
}

function scoreboard(){
  ctx.save();
  ctx.drawImage(Img.coin,0,0,100,98,10,30,30,28);
  ctx.drawImage(Img.bug1,0,0,20.85,20,10,64,30,28);
ctx.font="16px Arial"
ctx.fillText("   x "+coinsNo,35,47);
ctx.fillText("  x "+bug1No,35,85);

 
}

function showText(showText) {
            if (showText) {

/*
          ctx.fillStyle = "black"
          ctx.fillText("analog Pressed:"+B[0].pressed, 33, 33)
          ctx.font = "15px Arial"
          ctx.fillText("dx:"+dx, 33, 63)
          ctx.fillText("dy:"+dy, 33, 93)
          ctx.fillText("key.left"+key.left, 300, 50);
          ctx.fillText("key.right"+key.right, 300, 33)
          ctx.fillText("key.up"+key.up, 400, 33)
          ctx.fillText("key.down"+key.down, 400, 50)


          ctx.fillText("key.space"+key.space, 400, 133)
          ctx.fillText("key.enter"+key.enter, 400, 150)
*/


ctx.fillStyle="black";
              ctx.font = "20px Arial"
              ctx.fillText("p.length "+P.length,
                100,
                40);
            if(Bulet.length)  ctx.fillText("bounceNo"+Bulet[Bulet.length-1].bounceOnFloor,
                100,
                60);
              ctx.fillText("brick.length"+Brick.length,
                100,
                80);
              
                ctx.fillText("No of bullet fired: "+Bulet.length,
                400,
                40);
                
            
            }


}


  function drawHeart(no_of_life){
    for(let i=0;i<no_of_life;i++){
      ctx.drawImage(Img.heart,10,10,200,200,i*30+10,0,30,30);
    }
  }
  