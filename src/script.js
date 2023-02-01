// JavaScript Code
// Get the user's current location using the HTML5 Geolocation API
navigator.geolocation.getCurrentPosition(function(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   
   // Send a GET request to the geoapify API to retrieve the time zone information
   fetch(`https://api.geoapify.com/v1/geocode/timezone/${latitude},${longitude}?limit=1&apiKey=<API_KEY>`)
     .then(response => response.json())
     .then(data => {
       // Display the time zone information in the UI
       document.getElementById("timezone").innerHTML = data.timezoneId;
     })
     .catch(error => {
       console.error("Error fetching time zone information:", error);
     });
 });
 
 // Handle the user entering an address
 document.getElementById("submit-button").addEventListener("click", function() {
   const address = document.getElementById("address-input").value;
   
   // Send a GET request to the geoapify API to retrieve the latitude and longitude information for the entered address
   fetch(`https://api.geoapify.com/v1/geocode/search?q=${address}&limit=1&apiKey=<API_KEY>`)
     .then(response => response.json())
     .then(data => {
       if (data.features.length > 0) {
         const feature = data.features[0];
         const latitude = feature.geometry.coordinates[1];
         const longitude = feature.geometry.coordinates[0];
         
         // Send a GET request to the geoapify API to retrieve the time zone information
         return fetch(`https://api.geoapify.com/v1/geocode/timezone/${latitude},${longitude}?limit=1&apiKey=<API_KEY>`);
       } else {
         throw new Error("Address not found");
       }
     })
     .then(response => response.json())
     .then(data => {
       // Display the time zone information in the UI
       document.getElementById("timezone").innerHTML = data.timezoneId;
       document.getElementById("error-message").innerHTML = "";
     })
     .catch(error => {
       console.error("Error fetching time zone information:", error);
       document.getElementById("timezone").innerHTML = "";
       document.getElementById("error-message").innerHTML = "Time zone could not be found.";
     });
 });
 