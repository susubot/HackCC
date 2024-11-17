// Hardcoded tutor data
const hardcodedTutors = [
  {
      name: "Alice",
      city: "Costa Mesa",
      coords: [33.6411, -117.9187],
      subjects: ["Math", "Physics"],
      experience: "3 years",
      availability: "Weekdays 4 PM - 6 PM"
  },
  {
      name: "Bob",
      city: "Newport Beach",
      coords: [33.6189, -117.9298],
      subjects: ["English", "History"],
      experience: "5 years",
      availability: "Weekends 10 AM - 2 PM"
  },
  {
      name: "Charlie",
      city: "Santa Ana",
      coords: [33.7455, -117.8677],
      subjects: ["Computer Science", "Programming"],
      experience: "2 years",
      availability: "Weekdays 6 PM - 8 PM"
  }
];

// Initialize map
const map = L.map('map').setView([33.6411, -117.9187], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Â© OpenStreetMap contributors'
}).addTo(map);

const cityMarkers = {};

// Add hardcoded markers to the map
hardcodedTutors.forEach((tutor) => {
  if (!cityMarkers[tutor.city]) {
      const marker = L.marker(tutor.coords).addTo(map);
      marker.on('click', () => openSidebar(tutor.city));
      cityMarkers[tutor.city] = { marker, tutors: [] };
  }
  cityMarkers[tutor.city].tutors.push(tutor);
});

// Handle new tutor submissions
document.getElementById('tutorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const city = document.getElementById('city').value.trim();
  const subjects = document.getElementById('subjects').value.trim().split(",");
  const experience = document.getElementById('experience').value.trim();
  const availability = document.getElementById('availability').value.trim();

  if (!name || !city || !subjects || !experience || !availability) {
      alert('Please fill out all fields.');
      return;
  }

  const apiKey = '088fa2129c1e4e2db3ab1713d7dabc6b';
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results.length === 0) {
          alert('City not found.');
          return;
      }

      const { lat, lng } = data.results[0].geometry;

      if (!cityMarkers[city]) {
          const marker = L.marker([lat, lng]).addTo(map);
          marker.on('click', () => openSidebar(city));
          cityMarkers[city] = { marker, tutors: [] };
      }

      cityMarkers[city].tutors.push({ name, subjects, experience, availability });
      alert(`Tutor ${name} added for ${city}!`);
      document.getElementById('tutorForm').reset();
  } catch (error) {
      console.error('Error fetching geolocation:', error);
      alert('Error adding tutor.');
  }
});

// Function to open the sidebar
function openSidebar(city) {
  const sidebar = document.getElementById('sidebar');
  const cityName = document.getElementById('cityName');
  const tutorList = document.getElementById('tutorList');

  cityName.textContent = city;
  tutorList.innerHTML = '';

  cityMarkers[city].tutors.forEach((tutor) => {
      const profile = document.createElement('div');
      profile.className = 'tutor-profile';
      profile.innerHTML = `
          <strong>${tutor.name}</strong>
          <p><strong>Subjects:</strong> ${tutor.subjects.join(", ")}</p>
          <p><strong>Experience:</strong> ${tutor.experience}</p>
          <p><strong>Availability:</strong> ${tutor.availability}</p>
      `;
      tutorList.appendChild(profile);
  });

  sidebar.classList.add('active');
}

// Function to close the sidebar
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('active');
}