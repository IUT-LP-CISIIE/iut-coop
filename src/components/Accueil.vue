<template>

	<section class="section coop-accueil">
		<members-list v-if="section=='members'"></members-list>
		<div v-if="section=='channels'">
			<channel-add v-if="creationChannel"></channel-add>
		  	<channels-list :channels="channels"></channels-list>
		</div>
		<channel v-if="section =='channel'" :channel="channel"></channel>

	</section>
</template>

<script>
import MembersList from './MembersList.vue'
import ChannelsList from './ChannelsList.vue'
import Channel from './Channel.vue'
import ChannelAdd from './ChannelAdd.vue'

export default {
	name: 'accueil',
	components: {MembersList, ChannelsList, Channel, ChannelAdd},
		data () {
			return {
				creationChannel : false,
				section:'channels',
				channel:false,
				channels:[],
			}
		},
		created() {

			this.$bus.$on('hash-nav',() => {
				let hash = window.location.hash.replace('#','');
				let tab = hash.split('-');
				if(tab[0] == 'channel') {
					this.$bus.$emit('select-channel',hash.replace('channel-',''))
				} else {
					this.section = hash;
				}
			});

			this.$bus.$on('changer-section',(section) => {
				this.section = section;
				window.location.hash = section;
			});


			this.$bus.$on('toggle-afficher-creation-channel',() => {
				this.creationChannel = !this.creationChannel;
			});

			this.$bus.$on('afficher-channels',() => {
				this.chargerChannels();
			});

			this.$bus.$on('select-channel',(label) => {
				if(label) {
					this.channel=false;
					this.channels.forEach((channel)=>{
						if(label == channel.label) {
							this.channel = channel;
							this.section='channel';
						}
					})
				}
			});

			this.chargerChannels(() => {
				if(window.location.hash) {
					this.$bus.$emit('hash-nav');
				}
			});


		},
		methods: {
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
