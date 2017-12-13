<template>

	<div class="channels-list">
		<channel-add v-if="creationChannel"></channel-add>

		<div class="panel">
		  <p class="panel-heading">
		    Conversations
		  </p>
			<channel-list-item v-for="channel in channels" :key="channel.id" :channel="channel"></channel-list-item>
		</div>

	</div>
</template>

<script>

import ChannelListItem from './ChannelListItem.vue'
import ChannelAdd from './ChannelAdd.vue'

export default {
	name: 'channels-list',
	components : {ChannelListItem, ChannelAdd},
		data () {
			return {
				creationChannel:false,
				channels : []
			}
		},
		created() {
			axios.apiGet('channels'+this.addToken()).then(response => {
				this.channels = response.data;
			});

			this.$bus.$on('toggle-afficher-creation-channel',() => {
				this.creationChannel = !this.creationChannel;
			})
		}
}
</script>

<style>

</style>
