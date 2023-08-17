<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For an interactive way to gather weather data for a set of coordinates,<br />
      check out the mock api page!
    </p>
    <!-- Google Maps container -->
    <div id="gmp-map"></div>
  </div>
</template>

<script lang="ts">
/* global google */
import { defineComponent, onMounted } from "vue"; // Importing `onMounted` lifecycle hook

// Property 'initMap' does not exist on type 'Window & typeof globalThis'
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    // Vue 3 introduces the Composition API, enabling better code organization and reusability
    onMounted(() => {
      // `onMounted` hook replaces the `mounted` lifecycle method
      // Polyfill for older browsers
      if (!document.getElementById("polyfill-script")) {
        const scriptPolyfill = document.createElement("script");
        scriptPolyfill.id = "polyfill-script";
        scriptPolyfill.src =
          "https://polyfill.io/v3/polyfill.min.js?features=default";
        document.head.appendChild(scriptPolyfill);
      }

      // Google Maps API script
      if (!document.getElementById("google-maps-script")) {
        const scriptMapAPI = document.createElement("script");
        scriptMapAPI.id = "google-maps-script";
        scriptMapAPI.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_V4cCLfeC-wAvu6yQbY8zeRBMjVsEdgc&callback=initMap&libraries=&v=weekly";
        scriptMapAPI.defer = true;
        document.head.appendChild(scriptMapAPI);
      }

      // Initialization function for the map
      window.initMap = function () {
        const mapElement = document.getElementById("gmp-map");

        if (mapElement) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const map = new google.maps.Map(mapElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
        } else {
          console.error('Element with ID "gmp-map" not found');
        }
      };
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#gmp-map {
  height: 450px; /* Set the height for the map container */
  width: 100%;
}
</style>
