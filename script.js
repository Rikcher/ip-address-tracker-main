//*******************   map  ******************** */ 

const apiKey = 'at_ljPows53fXGJLRddTHKKZBDUUGbQG'; 
let ipAddress = ""; 

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
        .then(data => sendIpToServer(data.ip);
        )
        .catch(error => {
            console.error('Error fetching IP information:', error);
        });
}

updateMap()

//************************************************************/ 
