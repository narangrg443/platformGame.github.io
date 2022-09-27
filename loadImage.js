
    // load images

    //allsign images

    let imageName = ["brick_1", "brick_2", "gameButtons","background","play","player","bug","bug1","heart","coin","musroom","woodenBox"];
    let filePath = ["brick_1.jpg", "brick_2.jpg",
    "gameButtons.png","background-433x262.jpg","play-200x100.png","player1-511x757.png","bug.png","bug1.png","heart.png","coin.png","musroom-100x100.png","woodenBox-100x100.png"];



        let Img=    loadImage(imageName, filePath);




    function loadImage(imageName, filePath) {

      let imageLoaded = false;

      const Images = {};
      let noOfImages = imageName.length;
      let noOfImagesLoaded = 0;
      for (let i = 0; i < imageName.length; i++) {

        Images[imageName[i]] = new Image();
   Images[imageName[i]].src = "img/"+filePath[i];

      }
  let Img1 = Images;
      
        for (let i = 0; i < noOfImages; i++) {
          Img1[imageName[i]].onload = ()=> {

  
            noOfImagesLoaded++;
         //   console.log(imageName[i], "loaded", i)

          }

      }

return Images;

    }


/*function drawButton(){
      //drawing buttons
          ctx.font = "15px Arial"
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




          B.forEach(e=> {
            e.draw();
            e.drawText(e.code);


          });

}*/

  function drawStage1(){
          ctx.drawImage(Img.background, 0, 0, 433, 262, 0, 0, canvas.width, canvas.height);



          ctx.drawImage(Img.play, 0, 0, 200, 100, canvas.width/2-50, canvas.height/2, 200, 100);
  }    
          
          
    window.addEventListener("touchstart", fullscreen);

    function fullscreen() {

      if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {

          canvas.requestFullscreen();
          screen.orientation.lock('landscape');
          canvas.width = screen.availWidth;
          canvas.height = screen.availHeight;
          //
        }
      } else {
        //after fullscrren show game menu
        STAGE = 1;
      }
    }
