// Initialize the map centered at a default location (San Francisco)
const map = L.map('map').setView([37.7749, -122.4194], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Form submission handler
document.getElementById('tutorForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    // Get form values
    const name = document.getElementById('name').value.trim();
    const city = document.getElementById('city').value.trim();

    if (!name || !city) {
        alert('Please fill out both fields.');
        return;
    }

    // OpenCage Geocoding API URL
    const apiKey = '088fa2129c1e4e2db3ab1713d7dabc6b'; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

    try {
        // Fetch coordinates from OpenCage API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            // Get the first result's latitude and longitude
            const { lat, lng } = data.results[0].geometry;

            // Add a marker to the map
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<strong>${name}</strong><br>City: ${city}`).openPopup();

            // Clear form fields
            document.getElementById('name').value = '';
            document.getElementById('city').value = '';

            alert(`Tutor "${name}" added in ${city}!`);
        } else {
            alert('Could not find the location. Please try a different city.');
        }
    } catch (error) {
        console.error('Geocoding API error:', error);
        alert('Error fetching location. Please try again later.');
    }
});
