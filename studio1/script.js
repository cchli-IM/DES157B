(function(){
    "use strict"
    console.log('running JS')

    const fs = document.querySelector(".fa-solid");
 
    const intervalID = setInterval(checkTime, 1000);

    const poem = document.querySelector('#poem')
    const line1 = document.querySelector("#line1");
    const line2 = document.querySelector("#line2")
    const line3 = document.querySelector("#line3")
    const line4 = document.querySelector("#line4")
    const lineauthor = document.querySelector("#lineauthor")
    

    fs.addEventListener("click", function(){
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    })

    function checkTime(){
        if( myVideo.currentTime > 0 && myVideo.currentTime < 4){
            line1.className = 'show'
            
        } else {
            line1.className = 'hidden'
        }
        if( myVideo.currentTime > 4 && myVideo.currentTime < 10){
            line2.className = 'show'
        } else {
            line2.className = 'hidden'
        }
        if( myVideo.currentTime > 10 && myVideo.currentTime < 16){
            line3.className = 'show'
        } else {
            line3.className = 'hidden'
        }
        if(myVideo.currentTime > 16 && myVideo.currentTime < 22){
            line4.className = 'show'
        } else {
            line4.className = 'hidden'
        }
        if(myVideo.currentTime > 18 && myVideo.currentTime < 22){
            lineauthor.className = 'show'
        } else {
            lineauthor.className = 'hidden'
        }
    }

    

  


})()