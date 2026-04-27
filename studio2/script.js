(function(){
    "use strict";
    console.log("running JS");

   
// 0 = energized  1 = normal  2 = groggy  3 = very tired
    const status = [
        "images/energized.png",
        "images/normal.png",
        "images/tired.png",
        "images/exhausted.png"
    ]
    const desc = [
        'ENERGIZED',
        'NORMAL', 
        'TIRED', 
        'EXHAUSTED!!!'
    ]
    const imgContainer = document.querySelector('#statusIMG')
    const descContainer = document.querySelector('#statusDESC');
    const labelContainer = document.querySelector("#bed-time");

    const buttons = document.querySelectorAll('#selections button');

    async function getData(){
        const bedTimes = await fetch("data/data.json");
        const data = await bedTimes.json();
        
        buttons.forEach(function(button, index){
            button.addEventListener('click', function() {
                const dayKey = 'Day' + (index + 1);
                const dayData = data[dayKey];
                const statusIndex = parseInt(dayData.status);

                imgContainer.innerHTML = `<img src="${status[statusIndex]}" alt="${desc[statusIndex]}">`;
                descContainer.textContent = desc[statusIndex];
                labelContainer.textContent = "Bed Time: " + dayData.time;
            })
        })

  
    }
    getData();

    









    
})()