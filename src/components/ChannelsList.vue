<template>

	<div class="channels-list">

		<div class="panel">
		  <p class="panel-heading">
		    Conversations
		  </p>
			<div v-if="noChannels" class="box">Aucune conversation disponible. <a class="" @click="$bus.$emit('toggle-afficher-creation-channel')">Créez-en une tout de suite</a></div>
			<channel-list-item v-else v-for="channel in channels" :key="channel.id" :channel="channel"></channel-list-item>
		</div>

	</div>
</template>

<script>

import ChannelListItem from './ChannelListItem.vue'

export default {
	name: 'channels-list',
	components : {ChannelListItem},
	props : ['channels'],
		data () {
			return {
			}
		},
		computed : {
			noChannels() {
				this.channels.length == 0
			}
		},
		methods : {
		}
}

</script>

<style>

</style>
