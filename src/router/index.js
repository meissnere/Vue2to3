import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Api from '@/components/Api' // Import the new Api component

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/api',
      name: 'Api',
      component: Api // Add the new route
    }
  ]
})
