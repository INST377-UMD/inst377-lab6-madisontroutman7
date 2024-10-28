function createMap() {
    var map = L.map('map').setView([39.50, -98.35], 4); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const cord = [];
    for (let m = 1; m <= 3; m++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);
        cord.push({ latitude, longitude });  // store coordinate 
        const marker = L.marker([latitude, longitude]).addTo(map); // Marker 

        // Fetch locality
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality; // locality
                document.getElementById(`mark${m}`).innerHTML = `
                    <b>Marker: ${m}</b>: Latitude: ${latitude}, Longitude: ${longitude} <br> Locality: ${locality} <br>
                `;
            });
    }
    map.fitBounds(cord.map(c=>[c.latitude + 1, c.longitude + 1])); //fixing view to focus on markers
}
function getRandomInRange(from, to, fixed) { // random coordinates in range
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

window.onload = createMap;
    
    


