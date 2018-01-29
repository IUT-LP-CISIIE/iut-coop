<template>
	<div class="coop" v-if="isLoaded">
		<login v-if="!isLogged"></login>
    <div v-else>
      <navbar></navbar>
      
      <section class="section coop-accueil">
        <router-view></router-view>
      </section>

    </div>
	</div>

</template>

<script>
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'


export default {
  name: 'app',
  components: {Navbar, Login},
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
    window.axios.get('members/'+this.member._id+'/signedin').then((response) => {
      this.active = 'ok';
      this.member = response.data;
      this.$store.commit('setMember',this.member)
      this.$store.commit('setToken',this.member.token)
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

    this.$bus.$on('login',() => {
      this.logIn();
    });

  },
  methods : {
    logOut() {
      axios.apiDelete('members/signout').then(() => {
          this.isLogged=false;
          this.member=false;
          this.$store.commit('setMember',false)
          this.$store.commit('setToken',false)
        })
    },
    logIn() {
      var member = this.$store.state.member;
      if(member) {
        this.member=member;
        this.isLogged=true;
        window.axios.defaults.params.token = this.$store.state.token;
      }
    }
  }
}
</script>

<style>

</style>
