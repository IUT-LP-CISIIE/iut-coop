<template>
	<div class="coop">
		<login v-show="!isLogged" v-on:login="logIn()"></login>

		<appli v-show="isLogged" v-on:logout="logOut()"></appli>
	</div>

</template>

<script>
import Login from './Login.vue'
import Appli from './Appli.vue'
import {Bus} from './bus.js';





export default {
  name: 'app',
  components: {Login, Appli},
  data : function() {
      return {
      active:false,
      member:false,
      isLogged:false
    }
  },
  created() {
    const coop = this;
    this.logIn();
    if(this.member.token) {
      axios.apiGet('members/'+this.member.id+'/signedin?token='+this.member.token).then(function(response) {
        coop.active = 'ok';
        coop.member = response.data;
        coop.isLogged = true;
      }).catch(function(error) {
        coop.member = false;
        coop.isLogged = false;
      });
    }
  },
  methods : {
    logOut() {
      const coop = this;
      axios.apiDelete('members/signout?token='+coop.member.token).then(function() {
          coop.isLogged=false;
          coop.member=false;
          localStorage.setItem('member',false);
        })
    },
    logIn() {
      this.member = JSON.parse(localStorage.getItem('member'));
      this.isLogged=true;
    }
  }
}
</script>

<style>

</style>
