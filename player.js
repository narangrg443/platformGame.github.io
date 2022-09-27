

class Player{
  constructor(x,y,w,h){
   this.x=x;
   this.y=y;
   this.w=w;
   this.h=h;
   this.sx=0;
   this.sy=0;
   this.sh=0;
   this.sw=0;
   
  this.dead=false;
   this.life=3;
   this.prev=Date.now();
   this.jumpPrev=Date.now();
   this.diff=0;
   
   this.vel_limit=3.5;
   this.friction=0.80;
   this.iframe=0;
   this.visible=true;
   this.g=0.2;
   this.a=2;
   this.vx=0;
   this.vy=0;
   this.jump=-5;
   this.onGround=false;
   this.bounce=-0.45;
   this.v=new Vector(this.vx,this.vy);
   this.action=0;
   this.opacity=0;
    
  }
  draw(){
    ctx.save();
    ctx.fillStyle="green";
    ctx.fillRect(this.x,this.y,this.w,this.h);

ctx.restore();
  }
  
  drawSprite(img,action,sw,sh){
  this.sw=sw;
  this.sh=sh;
  let present=Date.now();
  let diff=present-this.prev;


if(diff>1000/15){
if(action==0){//run right

this.iframe++;
this.sx=this.iframe*this.sw;
  if(this.iframe>=6)this.iframe=0;
  this.sy=action*sh-4;
  
}

else if(action==1){//run left
  this.iframe++;
this.sx=this.iframe*this.sw;
  if(this.iframe>=6)this.iframe=0;
  this.sy=action*sh-4;
  
  
}else if(action==2){//idle right
//adding time


  this.iframe++;
this.sx=this.iframe*(this.sw+7);
  if(this.iframe>=5)this.iframe=0;
  this.sy=action*sh;

  
}
else if(action==3){//idle left
this.iframe++;
this.sx=this.iframe*(this.sw+7);
  if(this.iframe>=5)this.iframe=0;
  this.sy=action*sh+3;
  
  
}
if(action==4){//jump right
  
  this.iframe++;
  this.sx=this.iframe*(this.sw+8);
  if(this.iframe>1)this.iframe=0;
  this.sy=action*sh+6;
  
}
else if(action==5){//jump left
  this.iframe++;
  this.sx=this.iframe*(this.sw+8);
  if(this.iframe>1)this.iframe=0;
  this.sy=action*sh+6;
}
this.prev=present;
}
    ctx.drawImage(img,this.sx,this.sy,sw,sh,this.x,this.y,this.w,this.h)
  //  ctx.fillText("this.sx: "+this.sx,300,200);
  }
  
  blink(img,sw,sh){
    ctx.save();
    this.opacity+=0.2;
    if(this.opacity==1)this.opacity=0;
    ctx.globalAlpha=this.opacity;
    ctx.drawImage(img,this.sx,this.sy,sw,sh,this.x,this.y,this.w,this.h)
    
  ctx.restore();
  
}
}










class Box{
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.h=h;
    this.w=w;
  this.c=false;
  this.mapNo=0;
  this.type=0;
  this.visible=1;
  this.down=false;//after bottom collision with player
   this.up=true;//brick_pieces 
   this.vx=4;
   this.vy=0;
   this.boxNo=0;
  }
  draw(){
    ctx.save();
    ctx.fillStyle="brown";
    ctx.fillRect(this.x,this.y,this.w,this.h);
    ctx.restore();
  }
  drawSprite(img,sw,sh){
    
    ctx.drawImage(img,0,0,sw,sh,this.x,this.y,this.w,this.h);
  }
}


/////////////////////////////////--enemy class--------
class Bug{
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    
    this.sh;
    this.sw;
    this.sx;
    this.sy;
    
    this.vx=-2;       this.prev=Date.now(); this.fps=10;
    this.vy=0;        
    this.visible=1;         this.frame_limit=4;
     this.dead=false;            
    this.g=0.2;        this.iframe=0;
    this.jump=-3;       this.type=0;
    
  }
  drawSprite(img,sw,sh){
    
    this.sw=sw;
    this.sh=sh;
  
    let present=Date.now();
    let diff=present-this.prev;
   if(diff>1000/15){  
    this.iframe++;
    this.prev=present; 
   }
     
   this.sx=this.iframe*this.sw;
   this.sy=0;
   if(this.iframe>5)this.iframe=0;
  ctx.drawImage(img,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.w,this.h);
    
  
}

draw(){
  if(this.visible){
  ctx.fillRect(this.x,this.y,this.w,this.h);

  }
  }
  
  walk(){
    this.x+=this.vx;
    
    this.vy+=this.g;
    this.y+=this.vy;
    
  }
}

/////////////////////////constructor

class Coin{
constructor(x,y,w,h){
  this.x=x;     this.mapNo;
                 this.type;
  this.y=y;     this.visible=true;
  this.h=h;     this.prev=Date.now();
  this.w=w;       this.c=false;
                this.taken=false;
  this.sh;
  this.sw;
  this.sx;
  this.sy;

this.iframe=0;
}
  draw(img,sw,sh){
    this.sw=sw;
    this.sh=sh;
    let present=Date.now();
    let diff=present-this.prev;
    if(diff>1000/15){
    this.iframe++;
    this.prev=present;
      
    }
    this.sx=this.iframe*sw;
    this.sy=0;
    if(this.iframe>=10)this.iframe=0;
    ctx.drawImage(img,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.w,this.h);
    
  }

}


class Pieces{
  constructor(x,y,w,h,u){
    if(u===undefined)u=0;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.vx=4;
    this.vy=0;
    this.t=0;
    this.u=3;
    this.g=3;
    this.visible=true;
    this.angle=0;
    
  }
  move(){
    
    this.x+=this.vx;
    this.t+=0.25;
    
    this.y=b_dy-(this.u*this.t-(0.5*10*this.t*this.t));
    
    
    if(this.y>360)this.visible=false;
  
    
  }
  draw(img){

if(this.angle>=360)this.angle=0;
        ctx.save();

        ctx.translate(this.x+(this.w/2),this.y+(this.h/2))
        ctx.rotate(this.angle*(Math.PI/180));
        ctx.fillStyle='#c6440c';
        ctx.drawImage(img,0,0,40,40,-this.w/2,-this.h/2,this.w,this.h);
       // ctx.fillRect(this.x-this.x,this.y-this.y,this.w,this.h);
        ctx.restore();
        

  }
}

class Bullet{
  constructor(x,y,w,h){
    this.x=x;this.y=y;this.r=w/2;this.vx=7;this.vy=2;this.fired=false;this.moving=false;
    this.visible=true;
    this.w=w;this.h=h;
    this.u=0;
    this.t=-2;
    this.vt=0.15;
    this.initialH;
    this.bounceNo=0;
    this.bounceOnFloor=0;
  }
  move(){
    if(player.action%2==0 && !this.moving){
    this.vx*=1;this.moving=true;
this.initialH=player.y;
    }else if(!this.moving){
      this.vx*=-1;this.moving=true;
this.initialH=player.y;
    }
    
 this.x+=this.vx;
  this.t-=this.vt;
  this.vy=(this.u*this.t-(0.5*4*this.t*this.t))
  if(this.vy>=3)this.vy=3;
    this.y=this.initialH-this.vy;
  
  }
  draw(player){
    ctx.save();
    ctx.fillStyle="blue"
    ctx.beginPath();
    //ctx.Weight=5;
    ctx.arc(this.x+this.w/2,this.y+this.h/2,this.r,0,Math.PI*2)
    ctx.fill();
    
    ctx.stroke();
    
  }
}