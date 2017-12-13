<template>

<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
	<form v-on:submit.prevent="onSubmit" class="coop-channel-add">
    <header class="modal-card-head">
      <p class="modal-card-title">Ajouter une conversation</p>
      <a class="delete" @click="fermerModal()"></a>
    </header>
    <section class="modal-card-body">

			<div class="field">
			  <p class="control">
			    <input class="input" type="text" placeholder="Titre" v-model="topic">
			  </p>
			</div>
			<div class="field">
			  <p class="control">
			    <input class="input" type="text" placeholder="Label" v-model="label">
			  </p>
			</div>
			<div class="field">
			  <p class="control">
			  </p>
			</div>


    </section>
    <footer class="modal-card-foot">
		<button class="button is-success">
			Créer la conversation
		</button>
    	<a class="button" @click="fermerModal()">Annuler</a>
    </footer>
	</form>
  </div>
</div>
</template>

<script>

export default {
	name: 'channel-add',
		data () {
			return {
				topic : '',
				label : ''
			}
		},
		created() {

		},
		methods: {
			fermerModal() {
				console.log('fermer');
				this.$bus.$emit('toggle-afficher-creation-channel');
			},
			onSubmit() {
				axios.apiPost('channels'+this.addToken(),this.$data).then(response => {
					this.fermerModal();
				});

			}
		}
	}
</script>

<style>

</style>
