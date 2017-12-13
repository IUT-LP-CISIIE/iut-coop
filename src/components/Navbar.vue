<template>

<nav class="navbar has-shadow is-fixed-top is-warning">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <b>Co'op</b>
    </a>
  </div>
	<div v-for="section in menu" class="navbar-item">
		<a :href="'#'+section.cle" class="navbar-item" :class="{ 'is-active' : section.actif }" @click="changerSection(section)">
			<i class="fa" :class="'fa-'+section.icone"></i>
			{{ section.titre }}
		</a>
	</div>

	<div class="navbar-end">
	  <div class="navbar-item">
	    <div class="field is-grouped">
	      <p class="control">
	        <a class="button" @click="$bus.$emit('toggle-afficher-creation-channel')">
			  <span class="icon">
				<i class="fa fa-plus"></i>
			  </span>
			  <span>
				Nouvelle conversation
			  </span>
			</a>

	      </p>
	    </div>
	  </div>
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
						actif : true,
						icone : 'comment',
						titre : 'Conversations'
					},
					{
						cle : 'members',
						actif : false,
						icone : 'user',
						titre : 'Membres'
					},
				]
			}
		},
		methods : {
			changerSection(section) {
				this.$bus.$emit('changer-section',section.cle)
			},
			logOut() {
				this.$bus.$emit('logout');
			}
		},
		computed : {
			memberLogged() {
				let member = JSON.parse(localStorage.getItem('member'));
				return member.fullname;
			}
		}
	}
</script>

