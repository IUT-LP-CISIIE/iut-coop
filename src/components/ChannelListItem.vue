<template>

  <div class="panel-block channel-list-item">
    <span class="panel-icon">
      <i class="fa fa-comment"></i>
    </span>
	<router-link exact :to="{ name: 'channel', params : {id:channel.id} }">
    <b>{{ channel.topic }}</b>  <span class="tag">{{ channel.label }}</span>
	</router-link>
    <a class="panel-icon effacer-channel" @click="effacerChannel">
      <i class="fa fa-trash has-text-dark"></i>
    </a>

  </div>

</template>

<script>

export default {
		name: 'channel-list-item',
		props: ['channel'],
		data () {
			return {
			}
		},
		created() {

		},
		methods: {
			selectChannel() {
				this.$bus.$emit('select-channel',this.channel.label);
			},
			effacerChannel() {
				if(confirm('Effacer ce channel ?')) {
					if(confirm('Vous êtes vraiment sûr ?')) {
						window.axios.delete('channels/'+this.channel.id).then(() => {
							this.$bus.$emit('afficher-channels');
						});
					}
				}

			}
		}
	}
</script>

<style scoped>
	.channel-list-item .effacer-channel {
		visibility: hidden;
	}	
	.channel-list-item:hover .effacer-channel {
		visibility: visible;
	}	
</style>
