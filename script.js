//*******************   map  ******************** */ 

const apiKey = 'at_ljPows53fXGJLRddTHKKZBDUUGbQG'; 
let ipAddress = document.querySelector("#search-bar-input").value; 
let displayedIpAddress = document.querySelector("#ip-address")
let displayedLocation = document.querySelector("#location")
let displayedTimezone = document.querySelector("#timezone")
let displayedIsp = document.querySelector("#isp")

let userLatitude = null;
let userLongitude = null;

var customIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
});

// Initialize the map with some default view
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Initial map setup based on the IP address value when the page loads
updateMap();

function sendIpToServer(ip) {
    const url = `https://uat.cusutsibrodat.ro/netopia/payment/ipn?ip=${ip}`; 

    console.log(ip)
    console.log(url)
    
    fetch(url)
        .then(() => {
            console.log('GET request sent successfully');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateMap() {
    // Fetch IP information based on the provided IP address
    fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            userLatitude = data.location.lat;
            userLongitude = data.location.lng;

            //*******  changing displayed information  *** */ 
            displayedIpAddress.innerHTML = data.ip
            displayedLocation.innerHTML = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`
            displayedTimezone.innerHTML = data.location.timezone
            displayedIsp.innerHTML = data.isp
            //****************************** */ 

            // Update the map view and marker with new coordinates
            map.setView([userLatitude, userLongitude], 16);
            const marker = L.marker([userLatitude, userLongitude], {icon: customIcon}).addTo(map);

            sendIpToServer(data.ip);
        })
        .catch(error => {
            console.error('Error fetching IP information:', error);
        });
}

// Add event listener to the input field to update the map on input change
document.querySelector("#search-bar-input").addEventListener('change', function() {
    ipAddress = document.querySelector("#search-bar-input").value;
    // Remove the existing marker (if any) before updating the map
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    updateMap();
    document.querySelector("#search-bar-input").value = ""
});

//submit button functionality
document.querySelector("#button").addEventListener('click', function() {
    ipAddress = document.querySelector("#search-bar-input").value;
});

//************************************************************/ 
