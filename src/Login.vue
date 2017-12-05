<template>
	<div class="modal is-active">

		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
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
			</div>
		</div>

	</div>
</template>

<script>

export default {
	name: 'login',
		data () {
			return {
			  mode: 'login',
			  token:false,
			  name:'',
			  email:'',
			  password:'',
			  password_confirm:''
			}
		},
		methods : {
			onSubmit() {
				if(this.mode == 'login') {
					axios.apiPost('members/signin',{
						email : this.email,
						password : this.password
					}).then(response => {
						this.token=response.data;
						localStorage.setItem('member', JSON.stringify(response.data));
						this.$emit('login');

					}).catch(error => {
						alert(error.response.data.error);
					});
				} else {
					if(this.password != this.password_confirm) {
						alert('Les deux mots de passe sont différents');
					} else {
						axios.apiPost('members',{
							fullname : this.name,
							email : this.email,
							password : this.password
						}).then(response => {
							alert('Compte créé avec succès');
							this.mode = 'login';
						}).catch(error => {
							alert(error.response.data.error.join("\n"));
						});
					}
					
				}
			}
		}
	}
</script>

<style>

</style>
