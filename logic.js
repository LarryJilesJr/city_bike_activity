// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {
    // Initialize the map over New York City
    let map = L.map('map-id').setView([40.73, -74.0059], 12);

    // Create the tile layer for the background of the map
    let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Add the tile layer to the map
    lightmap.addTo(map);

    // Create a layer group for bike markers
    let bikeMarkers = L.layerGroup();

    // Add bike markers to the layer group
    createMarkers(bikeStations, bikeMarkers);

    // Add the bike markers to the map as an overlay
    bikeMarkers.addTo(map);

    // Add layer control to toggle the bike markers overlay
    L.control.layers(null, { "Bike Stations": bikeMarkers }).addTo(map);
}

// Create the createMarkers function
function createMarkers(response, bikeMarkers) {
    // Loop through stations in the response data
    response.data.stations.forEach(station => {
        // Create a marker for each station
        let marker = L.marker([station.lat, station.lon])
            .bindPopup(`<b>${station.name}</b><br>Capacity: ${station.capacity}`);
        
        // Add the marker to the bikeMarkers layer group
        bikeMarkers.addLayer(marker);
    });
}

// Fetch data from the Citi Bike API and call createMarkers
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
    .then(response => {
        createMap(response);
    })
    .catch(error => console.error("Error fetching data:", error));

// Define the fetchStationInfo function to fetch station information
// function fetchStationInfo() {
//     return fetch("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
//         .then(response => response.json())
//         .then(data => data.data.stations);
// }

// // Define the fetchStationStatus function to fetch station status
// function fetchStationStatus() {
//     return fetch("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")
//         .then(response => response.json())
//         .then(data => data.data.stations);
// }

// // Define the createMarkers function to create markers based on station status
// function createMarkers(response, bikeMarkers) {
//     // Define icon types for different station statuses
//     let iconTypes = {
//         comingSoon: L.ExtraMarkers.icon({
//             icon: 'fa-exclamation',
//             markerColor: 'yellow',
//             shape: 'circle'
//         }),
//         empty: L.ExtraMarkers.icon({
//             icon: 'fa-bicycle',
//             markerColor: 'red',
//             shape: 'circle'
//         }),
//         outOfOrder: L.ExtraMarkers.icon({
//             icon: 'fa-wrench',
//             markerColor: 'black',
//             shape: 'circle'
//         }),
//         low: L.ExtraMarkers.icon({
//             icon: 'fa-bicycle',
//             markerColor: 'orange',
//             shape: 'circle'
//         }),
//         healthy: L.ExtraMarkers.icon({
//             icon: 'fa-bicycle',
//             markerColor: 'green',
//             shape: 'circle'
//         })
//     };

//     // Loop through stations in the response data
//     response.forEach(station => {
//         // Determine marker icon based on station status
//         let icon;
//         if (!station.is_installed) {
//             icon = iconTypes.comingSoon;
//         } else if (!station.is_renting) {
//             icon = iconTypes.outOfOrder;
//         } else if (station.num_bikes_available === 0) {
//             icon = iconTypes.empty;
//         } else if (station.num_bikes_available < 5) {
//             icon = iconTypes.low;
//         } else {
//             icon = iconTypes.healthy;
//         }

//         // Create a marker for each station with the determined icon
//         let marker = L.marker([station.lat, station.lon], { icon: icon })
//             .bindPopup(`<b>${station.name}</b><br>Available Bikes: ${station.num_bikes_available}`);

//         // Add the marker to the bikeMarkers layer group
//         bikeMarkers.addLayer(marker);
//     });
// }

// // Define the createMap function to create the map with layers
// function createMap(bikeStations, stationStatus) {
//     // Initialize the map over New York City
//     let map = L.map('map-id').setView([40.73, -74.0059], 12);

//     // Create the tile layer for the background of the map
//     let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     // Add the tile layer to the map
//     lightmap.addTo(map);

//     // Create layer groups for different station statuses
//     let comingSoon = L.layerGroup();
//     let empty = L.layerGroup();
//     let outOfOrder = L.layerGroup();
//     let low = L.layerGroup();
//     let healthy = L.layerGroup();

//     // Add markers to the appropriate layer group based on station status
//     createMarkers(stationStatus, comingSoon);
//     createMarkers(stationStatus, empty);
//     createMarkers(stationStatus, outOfOrder);
//     createMarkers(stationStatus, low);
//     createMarkers(stationStatus, healthy);

//     // Add layer control to toggle the station status layers
//     let overlayMaps = {
//         "Coming Soon": comingSoon,
//         "Empty Stations": empty,
//         "Out of Order": outOfOrder,
//         "Low Stations": low,
//         "Healthy Stations": healthy
//     };
//     L.control.layers(null, overlayMaps).addTo(map);
// }

// // Fetch data from both Citi Bike APIs and call createMap function
// Promise.all([fetchStationInfo(), fetchStationStatus()])
//     .then(([stationInfo, stationStatus]) => {
//         createMap(stationInfo, stationStatus);
//     })
//     .catch(error => console.error("Error fetching data:", error));

