(function(){
    "use strict";
    console.log("running JS");

    async function getData(){
        const bedTimes = await fetch("data/data.json");
        const data = await bedTimes.json();
        console.log(data.April13.time, data.April13.status)
        
    }
getData();

    
})()