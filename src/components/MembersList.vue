<template>

	<div class="panel">
	  <p class="panel-heading">
	    Membres ({{ members.length }} membre(s))
	  </p>
		<member v-for="member in members" :key="member._id" :member="member"></member>
    </div>

</template>

<script>
import Member from './Member.vue'

export default {
	name: 'members-list',
	components : {Member},
		data () {
			return {
				members:[]
			}
		},
		created() {
			this.chargerMembres();
			this.$bus.$on('chargement-membres', () => {
				console.log('chargement-membres')
				this.chargerMembres();
			})
		},
		methods: {
			chargerMembres() {
				let coop = this;
				let member = JSON.parse(localStorage.getItem('member'));
				axios.apiGet('members'+this.addToken()).then(response => {
					coop.members = response.data;
				});
			}
		}
	}

</script>

<style>

</style>
