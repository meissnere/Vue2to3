<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <router-link to="/api">CHECKOUT MOCK API PAGE!</router-link>
      </li>
      <li>
        <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <div id="gmp-map"></div>
  </div>
</template>

<script>
/* global google */
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Right Now, We Are Old Vue JS 2! EWWWW'
    }
  },
  mounted () {
    // Polyfill for older browsers
    if (!document.getElementById('polyfill-script')) {
      const scriptPolyfill = document.createElement('script')
      scriptPolyfill.id = 'polyfill-script'
      scriptPolyfill.src = 'https://polyfill.io/v3/polyfill.min.js?features=default'
      document.head.appendChild(scriptPolyfill)
    }

    // Google Maps API script
    if (!document.getElementById('google-maps-script')) {
      const scriptMapAPI = document.createElement('script')
      scriptMapAPI.id = 'google-maps-script'
      scriptMapAPI.src = 'https://maps.googleapis.com/maps/api/js?key=ASK_ERICH!&callback=initMap&libraries=&v=weekly'
      scriptMapAPI.defer = true
      document.head.appendChild(scriptMapAPI)
    }

    // Initialization function for the map
    window.initMap = function () {
      // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(document.getElementById('gmp-map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
    }
  }
}
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
  height: 450px;
  /* Set the height for the map container */
  width: 100%;
}
</style>
