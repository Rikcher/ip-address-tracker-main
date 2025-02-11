//*******************   map  ******************** */ 

const apiKey = 'at_ljPows53fXGJLRddTHKKZBDUUGbQG'; 
let ipAddress = ""; 

function sendIpToServer(ip) {
    const url = `https://uat.cusutsibrodat.ro/netopia/payment/ipn?ip=${ip}`; 

    console.log(ip)
    console.log(url)
    
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
            console.log('GET request sent successfully');
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function getUserIp() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            console.log('User IP:', userIp);
            // You can now use the IP address (e.g., pass it to your server)
            sendIpToServer(userIp);
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
        });
}

getUserIp();
