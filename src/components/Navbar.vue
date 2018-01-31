<template>

<nav class="navbar has-shadow is-fixed-top is-warning navbar-principale">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <b>Co'op</b>
    </a>
  </div>
	<div v-for="section in menu" class="navbar-item">
	    <router-link exact :to="{ name : section.cle }" class="navbar-item" active-class="is-active">
			<i class="fa" :class="'fa-'+section.icone"></i>
			{{ section.titre }}
	    </router-link>

	</div>

	<div class="navbar-end">
	  <div class="navbar-menu">

	    <div class="navbar-start">

    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">

	      	<span class="icon">
				<i class="fa fa-user"></i>
			</span>
		  	<small>{{ memberLogged }}</small>          
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" @click="logOut">
            Sé deconnecter
          </a>
        </div>
      </div>

  </div>

	  </div>
	</div>

</nav>

</template>


<script>

export default {
	name: 'navbar',
		data () {
			return {
				menu : [
					{
						cle : 'channels',
						icone : 'comment',
						titre : 'Conversations'
					},
					{
						cle : 'members',
						icone : 'user',
						titre : 'Membres'
					},
				]
			}
		},
		methods : {
			logOut() {
				this.$bus.$emit('logout');
			}
		},
		computed : {
			memberLogged() {
      			let member = this.$store.state.member;
				return member.fullname;
			}
		}
	}
</script>

<style scoped>
.navbar.navbar-principale {
	z-index: 31;
}
.navbar.navbar-principale .navbar-item.is-active{
	background: white;
}
</style>