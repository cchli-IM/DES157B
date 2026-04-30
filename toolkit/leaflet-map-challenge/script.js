(function(){
    'use strict';


    // add your script here
    const map = L.map('map').setView([34.134117, -118.321495], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker([34.134117, -118.321495]).addTo(map);
    marker.bindPopup("<div style='text-align:center;'><img src='./images/universal.png' style='width:200px;'><br><b>Universal Studios</b>").openPopup();
    
    const marker2 = L.marker([34.126632, -118.326147]).addTo(map);
    marker2.bindPopup("<div style='text-align:center;'><img src='./images/hollywood.png' style='width:200px;'><br><b>Hollywood!</b>").openPopup();

    const marker3 = L.marker([34.072848, -118.400114]).addTo(map);
    marker3.bindPopup("<div style='text-align:center;'><img src='./images/beverly.png' style='width:200px;'><br><b>Rich People Area</b>").openPopup();

    const marker4 = L.marker([34.101862, -118.340964]).addTo(map);
    marker4.bindPopup("<div style='text-align:center;'><img src='./images/walk.png' style='width:200px;'><br><b>Walk of Fame</b>").openPopup();
}());