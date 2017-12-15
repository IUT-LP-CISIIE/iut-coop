<template>

<div class="channels">
	<channel-add v-show="channelAdd"></channel-add>
  	<channels-list :channels="channels"></channels-list>
</div>


</template>

<script>
import ChannelsList from './ChannelsList.vue'
import ChannelAdd from './ChannelAdd.vue'

export default {
		name: 'channels',
		components : {ChannelsList, ChannelAdd},
		data () {
			return {
				channels : [],
				channelAdd : false
			}
		},
		created() {
			this.chargerChannels();

			this.$bus.$on('afficher-channels',() => {
				this.chargerChannels();
			});
			this.$bus.$on('toggle-afficher-creation-channel',() => {
				this.channelAdd = !this.channelAdd;
			});

		},
		methods : {
			chargerChannels(callback=false) {
				axios.apiGet('channels').then(response => {
					this.channels =  response.data;
					if(callback) {
						callback();				
					}
				});
			}
		}
	}
</script>

<style>

</style>
