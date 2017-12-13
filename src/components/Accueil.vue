<template>

	<section class="section coop-accueil">
	    <div class="container">
			<div class="columns">
			  <div class="column">
			    <members-list></members-list>
			  </div>
			  <div class="column is-three-quarters">
				<channel v-if="channel" :channel="channel"></channel>
			  	<channels-list v-else></channels-list>
			  </div>
			</div>  
		</div>  

	</section>
</template>

<script>
import MembersList from './MembersList.vue'
import ChannelsList from './ChannelsList.vue'
import Channel from './Channel.vue'

export default {
	name: 'accueil',
	components: {MembersList, ChannelsList, Channel},
		data () {
			return {
				member:false,
				channel:false
			}
		},
		created() {
			this.member = JSON.parse(localStorage.getItem('member'));
			this.$bus.$on('select-channel',(channel) => {
				this.channel = channel;
			});

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
