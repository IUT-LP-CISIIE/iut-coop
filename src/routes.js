import VueRouter from 'vue-router'

const routes = [
  { 
  	path: '/channels', 
  	component: require('./components/Channels').default
  },
  { 
    name: 'channel', 
  	path: '/channel/:id', 
  	component: require('./components/Channel').default
  },
  { 
  	path: '/members', 
  	component: require('./components/MembersList').default 
  },
  { path: '*', redirect: '/channels' }
]

export default new VueRouter({
  routes
})

