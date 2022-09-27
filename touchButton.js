let dx=0;
let dy=0;
 let bounce=-0.5;
 
   

  class TouchButton{
    constructor(x,y,r,type){
if(type===undefined)this.type="button";
this.type=type;

      this.x=x;
      this.y=y;
      this.r=r;
      this.opacity=1;
      this.color="black";
      this.R=Math.round(this.r*3.5);
      this.X=this.x;
      this.Y=this.y;
      this.id=undefined;
      this.pressed=false;
      this.code=undefined;
    
       this.a=new Vector(0,0);
    }
  draw(){
    if(this.type=="analog"){
this.a.x=this.x-this.X; this.a.y=this.y-this.Y
    
    //restrict the button (inner circle)  within outer circle
    let dist_x=Math.abs(this.X-this.x); let dist_y=Math.abs(this.Y-this.y);
    let const_dist=this.R;
    let active_dist=Math.sqrt(dist_x*dist_x+dist_y*dist_y);
    
    if(active_dist>const_dist){
  
    /*
      let offset=    Math.abs(const_dist-active_dist);
      let offsetX=offset*this.a.dx;
      let offsetY=offset*this.a.dy;
      
      this.x-=offsetX;
      this.y-=offsetY;
    */
    //this specicif code helps inner circle to liment within big circle
    // innder circle radius=this.r,this.x,this.Y-this
    //bigger circle this.R,this.x,this.y;
    
    
    let activeVector=new Vector(this.X-this.x,this.Y-this.y);
    activeVector.update();
    let offsetX=activeVector.dx*this.R;
    let offsetY=activeVector.dy*this.R;
    this.x=this.X-offsetX;
    this.y=this.Y-offsetY;
      }
      ctx.save();
    ctx.globalAlpha=.4;
    //inner circle for analog
    
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
    ctx.globalAlpha=this.opacity;
    ctx.fillStyle=this.color;
    ctx.strokeStyle=this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath()
    ctx.arc(this.X,this.Y,this.R,0,Math.PI*2)
    ctx.alpha=this.opacity;
    ctx.fillStyle=this.color;
    ctx.strokeStyle=this.color;
    
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    
  }else if(this.type=="button"){
    ctx.beginPath();
    ctx.globalAlpha=this.opacity;
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }else{
    console.log("please put correct text analog or button");
  }
  

  }//draw
    drawText(t){
    if(this.type==="button"){
      ctx.font=`${this.r}px Arial`;
      ctx.fillText(t,this.x-10,this.y+10);
    }
  }
    //draw Buttons
    
  }
  
       
       
       
      
    function touchEvent(B,key){  
      
   canvas.addEventListener('touchstart',e=>{


for(let i=0; i<e.touches.length;i++){
  let tx=e.touches[i].clientX ;let ty=e.touches[i].clientY;
 //find whdih button is pressed 
B.forEach(btn=>{
  if(btn.type==='analog'){
    //find weather analog is preseed widthin its radius
      let active_dist=Math.sqrt((btn.X-tx)*(btn.X-tx)+(btn.Y-ty)*(btn.Y-ty));
      if(active_dist<btn.R){
        //analog is pressed width ints radius
     // initialixw a vector which give direction of joystick  dx and dy
     
        btn.pressed=true;
        btn.id=e.touches[i].identifier;
        
        btn.x=e.touches[i].clientX;
        btn.y=e.touches[i].clientY;
             
        let a=new Vector(btn.x-btn.X,btn.y-btn.Y);
        //now update vector to get rormalized unit vector component dx and dy
        
        a.update();
         dx=a.dx;
         dy=a.dy;
         
         //conditon for arrow keys events 
        if( a.dx<1 && a.dx>0.7){key.right=true;}else{key.right=false;}
        if(a.dx>-1 && a.dx<-0.7){key.left=true}else{key.left=false}
       if( a.dy<1 && a.dy>0.7){key.down=true;}else{key.down=false;}
      if( a.dy>-1 && a.dy<-0.7){key.up=true;}else{key.up=false;}
        
        
        
        
        
        //end of arrow key event
        
          }
    //when button is pressed  assign button pressed to true;
       }else if(btn.type==='button'){
    let active_dist=Math.sqrt((btn.X-tx)*(btn.X-tx)+(btn.Y-ty)*(btn.Y-ty));
    
    if(active_dist<btn.r){
      // button is pressed
      btn.pressed=true;
      btn.id=e.touches[i].identifier;
     if(btn.code=="A"){key.space=true}else{key.space=false};
     if(btn.code=="B"){key.enter=true}else{key.enter=false;};
    }
    
    
  }else{
    
  }
})

  
  
}

   })
   
   //////////////////////////////////////////////////////////////////////move
   
   
   
   canvas.addEventListener('touchmove',e=>{
     e.preventDefault();
        for(let b=0; b<e.touches.length;b++){
             B.forEach(btn=>{
             if(btn.type==='analog'&& btn.pressed){
      
             if(btn.id==e.touches[b].identifier){
                 btn.x=e.touches[b].clientX;
                 btn.y=e.touches[b].clientY;
           
                 let a=new Vector(btn.x-btn.X,btn.y-btn.Y);
        //now update vector to get rormalized unit vector component dx and dy
        
          a.update();
          dx=a.dx;dy=a.dy;
            
      if( a.dx<1 && a.dx>0.7 || a.dx<0.7 && a.dx>0.3){key.right=true;}else{key.right=false;}
      if(a.dx>-1 && a.dx<-0.7 ||a.dx>-0.7 && a.dx<-0.3){ key.left=true}else{key.left=false}
      if( a.dy<1 && a.dy>0.7 || a.dy<0.7&& a.dy>0.3){key.down=true;}else{key.down=false;}
      if( a.dy>-1 && a.dy<-0.7 || a.dy>-0.7 && a.dy<-0.3){key.up=true;}else{key.up=false;}
            
        
      }
    }
  })



}
     
   })
   /////////////////////////////////////////----------
   canvas.addEventListener('touchend',e=>{
    e.preventDefault();
    for(let i=0;i<e.changedTouches.length;i++){
  
     B.forEach(btn=>{
      if(btn.type==='analog'){
         if(btn.id==e.changedTouches[i].identifier){
           btn.pressed=false;
           btn.x=btn.X;
           btn.y=btn.Y;
          //make all the keys false;
          
          key.right=false;
          key.up=false;
          key.down=false;
          key.left=false;
          
         }
        
      }else if(btn.type==='button'){
                if(btn.id==e.changedTouches[i].identifier){
                  btn.pressed=false;
                   if(btn.code=="A"){key.space=false};
                   if(btn.code=="B"){key.enter=false;};
    
                }
      }else{
        
      }
       
     })
  
}
     
     
   })
    
    
    }
    
    

    
   
  /*  function rect_C(r1,r2){
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
    
      r1.s_color="red"
    r2.s_color="red";
      
  let overlapX=totalX-dist_x;
  let overlapY=totalY-dist_y;
      
  if(overlapY>=overlapX){
    //its left side or right side collidion
    if(r1.x<=r2.x){
      //left collidions
      r1.x-=overlapX;
      collisionSide="left"
    }else{
      r1.x+=overlapX;
      collisionSide="right"
    }
  }else{
    //overlaop in top or bottom
    if(r1.y<=r2.y){
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
        r1.s_color="white"
    r2.s_color="white";
      collisionSide="none"
      return collisionSide;
    }
    
    
    
     }*/
    
  
  
  function drawButton(){
      //drawing buttons
          
          B.forEach(e=> {
            e.draw();
            e.drawText(e.code);


          });

}
