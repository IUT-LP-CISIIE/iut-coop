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
			    <input class="input" type="text" placeholder="Description" v-model="label">
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
				this.$bus.$emit('toggle-afficher-creation-channel');
			},
			// syncLabel() {
			// 	this.label = this.topic;
			// 	this.slugify();
			// },
			// slugify() {
			// 	let str = this.label.replace(/^\s+|\s+$/g, ''); // trim
			// 	str = str.toLowerCase();

			// 	// remove accents, swap ñ for n, etc
			// 	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
			// 	var to   = "aaaaeeeeiiiioooouuuunc------";

			// 	for (var i=0, l=from.length ; i<l ; i++)
			// 	str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));


			// 	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			// 	.replace(/\s+/g, '-') // collapse whitespace and replace by -
			// 	.replace(/-+/g, '-'); // collapse dashes

			// 	this.label = str;
			// },
			onSubmit() {
				window.axios.post('channels',this.$data).then(response => {
					this.$bus.$emit('afficher-channels');
					this.fermerModal();
				});

			}
		}
	}


</script>

<style>

</style>
