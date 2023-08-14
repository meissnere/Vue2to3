<template>
  <div class="hello">
    <h1>Welcome to the APIs!</h1>
    <form @submit.prevent="getWeather">
      <label for="latitude">Latitude:</label>
      <input type="number" v-model="latitude" id="latitude" step="any">
      <label for="longitude">Longitude:</label>
      <input type="number" v-model="longitude" id="longitude" step="any">
      <button type="submit">Get Weather</button>
    </form>
    <button @click="toggleJsonView">Toggle JSON View</button> <!-- Toggle Button -->
    <pre v-if="showJson" class="json-response">{{ prettyJson }}</pre> <!-- Conditionally render JSON -->
    <div id="map"></div>
  </div>
</template>

<script>
/* global google */
import axios from 'axios'

export default {
  name: 'Api',
  data () {
    return {
      latitude: 58.441027,
      longitude: -134.546608,
      jsonResponse: {},
      showJson: false, // Added to control JSON view
      map: null,
      marker: null
    }
  },
  computed: {
    prettyJson () {
      return JSON.stringify(this.jsonResponse, null, 2) // Pretty print JSON
    }
  },
  methods: {
    async getWeather () {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=ASK_ERICH!`
      const response = await axios.get(url)
      this.jsonResponse = response.data
      this.updateMap()
    },
    updateMap () {
      const location = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) } // Parsing as float

      if (typeof google === 'undefined' || !google.maps) {
        console.error('Google Maps library is not loaded yet')
        return
      }

      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: location,
          mapTypeId: 'satellite'
        })
      } else {
        this.map.setCenter(location)
      }

      if (this.marker) {
        this.marker.setMap(null) // Remove the previous marker
      }

      this.marker = new google.maps.Marker({
        position: location,
        map: this.map
      })
    },
    toggleJsonView () {
      this.showJson = !this.showJson // Toggle JSON view
    }
  },
  mounted () {
    // Load the Google Maps API script if it hasn't been loaded yet
    if (!document.getElementById('google-maps-script')) {
      const scriptMapAPI = document.createElement('script')
      scriptMapAPI.id = 'google-maps-script'
      scriptMapAPI.src = 'https://maps.googleapis.com/maps/api/js?key=ASK_ERICH!&callback=initMap&libraries=&v=weekly'
      scriptMapAPI.defer = true
      document.head.appendChild(scriptMapAPI)
    }

    // Initialization function for the map
    const initMap = () => {
      this.updateMap()
    }

    // If the Google Maps library has already been loaded, call initMap directly
    if (typeof google !== 'undefined' && google.maps) {
      initMap()
    } else {
      // Otherwise, set initMap as the global callback function to be executed when the library finishes loading
      window.initMap = initMap
    }
  }

}
</script>

<style scoped>
h1 {
  font-weight: normal;
}

a {
  color: #42b983;
}

#map {
  height: 400px;
  width: 100%;
}

.json-response {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}
</style>
