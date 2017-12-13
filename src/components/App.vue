<template>
	<div class="coop" v-if="isLoaded">
    <navbar></navbar>
    <accueil v-on:logout="logOut()" v-if="isLogged"></accueil>
		<login v-on:login="logIn()" v-else></login>
	</div>

</template>

<script>
import Login from './Login.vue'
import Accueil from './Accueil.vue'
import Navbar from './Navbar.vue'





export default {
  name: 'app',
  components: {Navbar, Login, Accueil},
  data : function() {
      return {
      active:false,
      member:false,
      isLogged:false,
      isLoaded:false
    }
  },
  created() {
    const coop = this;
    this.logIn();

    if(this.member && this.member.token) {
      axios.apiGet('members/'+this.member._id+'/signedin?token='+this.member.token).then(function(response) {
        coop.active = 'ok';
        coop.member = response.data;
        coop.isLogged = true;
        coop.isLoaded = true;
      }).catch(function(error) {
        coop.isLoaded = true;
        coop.member = false;
        coop.isLogged = false;
      });
    } else {
        coop.isLoaded = true;
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
      var member = JSON.parse(localStorage.getItem('member'));
      if(member) {
        this.member=member;
        this.isLogged=true;
      }
    }
  }
}
</script>

<style>

</style>
