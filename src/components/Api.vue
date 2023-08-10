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
        <pre v-html="highlightedJson"></pre>
    </div>
</template>

<script>
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css' // Import the styling for highlight.js

export default {
  name: 'Api',
  data () {
    return {
      latitude: 58.441027,
      longitude: -134.546608,
      jsonResponse: {}
    }
  },
  computed: {
    highlightedJson () {
      return hljs.highlight('json', JSON.stringify(this.jsonResponse, null, 2)).value
    }
  },
  methods: {
    async getWeather () {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=ASK_ERICH!`
      const response = await axios.get(url)
      this.jsonResponse = response.data
    }
  }
}

</script>

  <!-- You can copy the styling from HelloWorld.vue -->
<style scoped>
h1 {
    font-weight: normal;
}

a {
    color: #42b983;
}
</style>
