<template>
	<div class="coop" v-if="isLoaded">
    <navbar v-if="isLogged"></navbar>
    <accueil v-on:logout="logOut()" v-if="isLogged"></accueil>
		<login v-on:login="logIn()" v-else></login>
	</div>

</template>

<script>
import Login from './components/Login.vue'
import Accueil from './components/Accueil.vue'
import Navbar from './components/Navbar.vue'





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
    this.logIn();

    axios.apiGet('members/'+this.member._id+'/signedin').then((response) => {
      this.active = 'ok';
      this.member = response.data;
      this.isLogged = true;
      this.isLoaded = true;
    }).catch((error) => {
      this.isLoaded = true;
      this.member = false;
      this.isLogged = false;
    });

    this.$bus.$on('logout',() => {
      this.logOut();
    });

  },
  methods : {
    logOut() {
      axios.apiDelete('members/signout').then(() => {
          this.isLogged=false;
          this.member=false;
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
