<template>
	<div class="modal is-active">

		<div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Co'op - Identification</p>
    </header>
    	<section class="modal-card-body">
			<form v-on:submit.prevent="onSubmit" class="coop-signup" v-show="mode=='signup'">
				<div class="field">
				  <p class="control has-icons-left">
				    <input class="input" type="text" placeholder="Nom" v-model="name">
				    <span class="icon is-small is-left">
				      <i class="fa fa-user"></i>
				    </span>
				  </p>
				</div>

				<div class="field">
				  <p class="control has-icons-left">
				    <input class="input" type="email" placeholder="Email" v-model="email">
				    <span class="icon is-small is-left">
				      <i class="fa fa-envelope"></i>
				    </span>
				  </p>
				</div>

				<div class="field">
				  <p class="control has-icons-left">
				    <input class="input" type="password" placeholder="Mot de passe" v-model="password">
				    <span class="icon is-small is-left">
				      <i class="fa fa-lock"></i>
				    </span>
				  </p>
				</div>

				<div class="field">
				  <p class="control has-icons-left">
				    <input class="input" type="password" placeholder="Confirmer le mot de passe" v-model="password_confirm">
				    <span class="icon is-small is-left">
				      <i class="fa fa-check"></i>
				    </span>
				  </p>
				</div>
				<div class="field">
				  <p class="control">
				    <button class="button is-success">
				      Créer un compte
				    </button>
				    <button class="button is-text" @click.stop.prevent="mode='login'">Annuler</button>
				  </p>
				</div>

			</form>

			<form v-on:submit.prevent="onSubmit" class="coop-login" v-show="mode=='login'">
				<div class="field">
				  <p class="control has-icons-left has-icons-right">
				    <input class="input" type="email" placeholder="Email" v-model="email">
				    <span class="icon is-small is-left">
				      <i class="fa fa-envelope"></i>
				    </span>
				  </p>
				</div>
				<div class="field">
				  <p class="control has-icons-left">
				    <input class="input" type="password" placeholder="Mot de passe" v-model="password">
				    <span class="icon is-small is-left">
				      <i class="fa fa-lock"></i>
				    </span>
				  </p>
				</div>
				<div class="field">
				  <p class="control">
				    <button class="button is-success">
				      Se connecter
				    </button>
				    <button class="button is-text" @click.stop.prevent="mode='signup'">Créer un compte</button>
				  </p>
				</div>
			</form>
		</section>	
	</div>
	</div>
</template>

<script>

export default {
	name: 'login',
		data () {
			return {
			  mode: 'login',
			  name:'ok',
			  email:'ok@ok.ok',
			  password:'ok',
			  password_confirm:'ok'
			}
		},
		methods : {
			onSubmit() {
				if(this.mode == 'login') {
					window.axios.post('members/signin',{
						email : this.email,
						password : this.password
					}).then(response => {
				        this.$store.commit('setMember',response.data.member)
				        this.$store.commit('setToken',response.data.token)
						this.$bus.$emit('login');
					}).catch(error => {
						alert(error.response.data.message);
					});
				} else {
					if(this.password != this.password_confirm) {
						alert('Les deux mots de passe sont différents');
					} else {
						window.axios.post('members',{
							fullname : this.name,
							email : this.email,
							password : this.password
						}).then(response => {
							alert('Compte créé avec succès');
							this.mode = 'login';
						}).catch(error => {
							alert(error.response.data.message);
						});
					}
					
				}
			}
		}
	}
</script>

<style>

</style>
