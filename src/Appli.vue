<template>
	<div class="coop_appli">
		vous êtes connecté en tant que <b>{{ nom }}</b>
		<button class="button is-text" @click="logOut()">Se déconnecter</button>
	</div>
</template>

<script>
export default {
	name: 'appli',
		data () {
			return {
				nom:''
			}
		},
		created() {
			var member = JSON.parse(localStorage.getItem('member'));
			this.nom = member.fullname;

		},
		methods: {
			logOut() {
				this.$emit('logout');
			}
		}
	}
</script>

<style>

</style>
