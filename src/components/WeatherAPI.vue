<template>
  <div class="hello">
    <h1>Welcome to the APIs!</h1>
    <form @submit.prevent="getWeather">
      <label for="latitude">Latitude:</label>
      <input type="number" v-model="latitude" id="latitude" step="any" />
      <label for="longitude">Longitude:</label>
      <input type="number" v-model="longitude" id="longitude" step="any" />
      <button type="submit">Get Weather</button>
    </form>
    <button @click="toggleJsonView">Toggle JSON View</button>
    <pre v-if="showJson" class="json-response">{{ prettyJson }}</pre>
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
/* global google */
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default defineComponent({
  name: "ApiComponent",
  setup() {
    const latitude = ref(58.441027);
    const longitude = ref(-134.546608);
    const jsonResponse = ref({});
    const showJson = ref(false);
    const map = ref<google.maps.Map | null>(null);
    const marker = ref<google.maps.Marker | null>(null);

    const prettyJson = computed(() =>
      JSON.stringify(jsonResponse.value, null, 2)
    );

    const getWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=71fb6c60182b96d0074a68bbac0628cf`;
      const response = await axios.get(url);
      jsonResponse.value = response.data;
      updateMap();
    };

    const updateMap = () => {
      const location = {
        lat: parseFloat(latitude.value.toString()),
        lng: parseFloat(longitude.value.toString()),
      };

      if (typeof google === "undefined" || !google.maps) {
        console.error("Google Maps library is not loaded yet");
        return;
      }

      const mapElement = document.getElementById("map");

      if (mapElement) {
        if (!map.value) {
          map.value = new google.maps.Map(mapElement, {
            zoom: 8,
            center: location,
            mapTypeId: "satellite",
          });
        } else {
          map.value.setCenter(location);
        }
      } else {
        console.error('Element with ID "map" not found');
      }

      if (map.value instanceof google.maps.Map) {
        if (marker.value) {
          marker.value.setMap(null);
        }

        marker.value = new google.maps.Marker({
          position: location,
          map: map.value,
        });
      } else {
        // Handle the case where map.value is null or of an unexpected type
        console.error("map.value is not an instance of google.maps.Map");
      }
    };

    const toggleJsonView = () => {
      showJson.value = !showJson.value;
    };

    onMounted(() => {
      if (!document.getElementById("google-maps-script")) {
        const scriptMapAPI = document.createElement("script");
        scriptMapAPI.id = "google-maps-script";
        scriptMapAPI.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_V4cCLfeC-wAvu6yQbY8zeRBMjVsEdgc&callback=initMap&libraries=&v=weekly";
        scriptMapAPI.defer = true;
        document.head.appendChild(scriptMapAPI);
      }

      const initMap = () => {
        updateMap();
      };

      if (typeof google !== "undefined" && google.maps) {
        initMap();
      } else {
        window.initMap = initMap;
      }
    });

    return {
      latitude,
      longitude,
      prettyJson,
      showJson,
      getWeather,
      toggleJsonView,
    };
  },
});
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
