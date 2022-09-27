
    let canvas=document.querySelector("canvas")
    let ctx=canvas.getContext('2d');
    
/*class Player{
      constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.vx=2;
        this.vy=2;
        this.c=false;
        this.v=new Vector(this.vx,this.vy);
        
        this.diff=0;
        
        
      }
      this.draw(){
        
      }
      this.drawSprite(){
        
      }
    }
    
    */
    
       class Vector{
      constructor(x,y){
        this.x=x;
        this.y=y;
        this.mag=0;
        this.dx=0;
        this.dy=0;
        this.getMag();
        this.normalVector();
      }
      update(){
        this.getMag();
        this.normalVector();
      }
      getMag(){
        this.mag=Math.sqrt(this.x*this.x+this.y*this.y);
        return this.mag;
      }
      
      
      //run this functin before accesing naorma vecorts
      normalVector(){
        this.dx=this.x/this.mag;
        this.dy=this.y/this.mag;
        
      
      }
      add(v){
        let temp=new Vector(0,0);
        temp.x=this.x+v.x; temp.y=this.y+v.y;
        return temp;
      }
      
      sub(v){
       let temp=new Vector(0,0);
       temp.x=this.x-v.x; temp.y=this.y-v.y;
       return temp;
      }
      
      addMag(magnitude){
        this.x=this.dx*magnitude;
        this.y=this.dy*magnitude;
        
      }
      rightNormal(){
      let temp=new Vector(this.y,-this.x);
      return temp;
      }
      leftNormal(){
        let temp=new Vector(-this.y,this.x);
      }
    }
    
  
      class Circle{
      constructor(x,y,r){
        this.x=x;this.y=y;this.r=r;this.vx=1.2;this.vy=1.2;this.c=false;this.color="red";
        this.mag=0;this.mass=2*Math.PI*this.r;this.visible=true;
        this.myVel=new Vector(this.vx,this.vy);
        
        this.s_color="blue";  
        
      }
      move(){
        this.x+=this.vx;
        this.y+=this.vy;
        
        if(this.x>=canvas.width-this.r){this.x=canvas.width-this.r;this.vx*=-1;}
       else if(this.x<=this.r){this.x=this.r;this.vx*=-1};
       if(this.y>=canvas.height-this.r){this.y=canvas.height-this.r;this.vy*=-1;}
       else if(this.y<=this.r){this.y=this.r;this.vy*=-1;}
        
      }
      find_returnVel(c){
        
      this.return_vel.x=this.x-c.x; this.return_vel.y=this.y-c.y;
        return this.return_vel;
      }
      draw(){
        ctx.save();
        ctx.beginPath();
        
      
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.strokeStyle=this.s_color;
        ctx.stroke();
        ctx.restore();
      }
      drawVector(){
        ctx.beginPath();
        ctx.arc(this.x+this.vx*10,this.y+this.vy*10,1,0,Math.PI*2);
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+this.vx*10,this.y+this.vy*10);
        ctx.stroke();
        ctx.closePath();
      }
    
    }
    
  class Rectangle{
    constructor(x,y,w,h){
      this.x=x;
      this.y=y;
      this.h=h;
      this.w=w;
      this.s_color="white";
      this.c=false;
      this.onGround=false;
      this.vx=0;
      this.vy=0;
      this.m=0;
      this.v=new Vector(0,0);
      
    }
    drawVector(mag){
      if(mag==undefined)mag=4;
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.arc(this.x+this.w/2+(this.vx*mag),this.y+this.h/2+(mag*this.vy),1,0,Math.PI*2);
      ctx.moveTo(this.x+this.w/2,this.y+this.h/2);
      ctx.lineTo(this.x+this.w/2+(this.vx*mag),this.y+this.h/2+(mag*this.vy));
      ctx.stroke();
      
    }
    
    draw(){
      ctx.save();
      ctx.beginPath();
      ctx.rect(this.x,this.y,this.w,this.h);
      ctx.strokeStyle=this.s_color;
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    move(){
      this.x+=this.vx;
      this.y+=this.vy;
      
    }
  }  
    
    
    
     function draw(circle){
    
              ctx.save();
            
              ctx.beginPath();
              ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2);
              ctx.strokeStyle="white"
              ctx.stroke();ctx.fillStyle=circle.color;ctx.fill()
               ctx.restore();
    }
    
    
    
      function collisionDetect(c1,c2){
          let total_r=c1.r+c2.r;
    let active_dist=0;
    let overlap=0;
    let px=0;
    let py=0;
    let dx=0;
    let dy=0;
    let p_mag=0;
    let overlapX=0;
    let overlapY=0;
    
    let reverse_vx=0;
    let reverse_vy=0;
    
    let new_velocityvx,new_velocityvy;
    let  new_mag;
    let unit_new_magX,unit_new_magY;
    
    //c2////////////////////////
    let reverse_vx_c2;
    let reverse_vy_c2
    let unit_new_magX_c2;
    let unit_new_magY_c2;
    let resultant_c2_vx;let resultant_c2_vy;
     let mag_c2;let c2_magnitude;




      active_dist=Math.sqrt((c2.x-c1.x)*(c2.x-c1.x)+(c2.y-c1.y)*(c2.y-c1.y));
      
      if(active_dist<total_r){
        c1.collision=true;
        c2.collision=true;
        //collision
         overlap=total_r-active_dist;
              
         px=c2.x-c1.x;       py=c2.y-c1.y;
         
         //normal vector of px nad py
         
         //magnituee of px and py
         p_mag=Math.sqrt(px*px+py*py);
         
        //unit vectors or normal vectors
        dx=px/p_mag;   dy=py/p_mag;
        
        //reverse the px and py direction
        dx*=-1;         dy*=-1;
        
    //find overlap cordinatres    
      overlapX=overlap*dx;         overlapY=overlap*dy;  
        
    // make the circle outside
    c1.x+=overlapX;         c1.y+=overlapY;
    c2.x-=overlapX;         c2.y-+overlapY; 
        
        //add magnitueeto dx and dy
    c1.mag  = Math.sqrt(c1.vx*c1.vx+c1.vy*c1.vy) 
    
    //reverse velocity of a circle
    
    reverse_vx=dx*c1.mag;       reverse_vy=dy*c1.mag;
    
    //resultant velocity where ball is going to change directin after collision
    //collision with no velocity loss
   
    new_velocityvx=c1.vx+reverse_vx;    new_velocityvy=c1.vy+reverse_vy;
    
    
    
              
    // unit vector of new velocity
    
    new_mag=Math.sqrt((new_velocityvy*new_velocityvy+new_velocityvx*new_velocityvx));
    
    
    unit_new_magX=new_velocityvx/new_mag;    unit_new_magY=new_velocityvy/new_mag;
    
   //changing the direction of c1 by multiplying width unit vectors 
    c1.vx=c1.mag*unit_new_magX;        c1.vy=unit_new_magY*c1.mag;
    
    
    //
    //adding vectors c2 and reverse vector
    let  new_velocityvx1=c2.vx-reverse_vx; let new_velocityvy1=c2.vx-reverse_vy;
    
    //magnitudei of reverse vector for unit vector
   let  new_mag1=Math.sqrt((new_velocityvy1*new_velocityvy1)+(new_velocityvx1*new_velocityvx1));
    
    
    let unit_new_magX1=new_velocityvx1/new_mag1;  let unit_new_magY1=new_velocityvy1/new_mag1;
        c2.mag  = Math.sqrt(c2.vx*c2.vx+c2.vy*c2.vy) 
  c2.vx=unit_new_magX1*c2.mag;                     c2.vy=c2.mag*unit_new_magY1;
   
   
   
   //colldiosn for c2
   /*
   
   reverse_vx_c2=c2.vx*(-dx);                   reverse_vy_c2=(-dy)*c2.vy;
   resultant_c2_vx=reverse_vx_c2+c2.vx;           resultant_c2_vy=reverse_vy_c2+c2.vy;
  mag_c2=Math.sqrt(resultant_c2_vx*resultant_c2_vx+resultant_c2_vy*resultant_c2_vy);
  
  unit_new_magX_c2=resultant_c2_vx/mag_c2;   unit_new_magY_c2=resultant_c2_vy/mag_c2;
  
  c2_magnitude=Math.sqrt(c2.vx*c2.vx+c2.vy*c2.vy);
  
  c2.vx=unit_new_magX_c2*c2_magnitude; c2.vy=unit_new_magY_c2*c2_magnitude;
  */
      }else{
        
      }
      
      }
    
    
    
  
    //export {canvas,ctx,Circle,draw,Vector,collisionDetect,Rectangle}
    //import {canvas,ctx,Circle,draw,Vector,collisionDetect,Rectangle} from "./canvas.js"
    