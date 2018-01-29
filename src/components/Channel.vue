<template>

<div class="channel">
	<nav class="navbar is-primary is-fixed-top">
		<div class="navbar-item">
			<router-link exact to="/channels" class="button is-small">
			    <span class="icon">
			      <i class="fa fa-arrow-left"></i>
			    </span>
			    <span>Retour</span>
			</router-link>
		</div>
		<div class="navbar-item edit-channel" v-if="editerChannel">
			<div class="field">
			<p class="control">
				<input class="input" v-show="editerChannel" v-focus v-model="channel.topic" @keyup.enter="enregistrerChannel">
			</p>
		</div>
		</div>
		<div class="navbar-item titre-channel" v-else>
			{{ topic }}
	        <a class="icon" @click="toggleEdit">
	          <i class="fa fa-pencil has-text-dark"></i>
	        </a>
		</div>

		<div class="navbar-end">
		      <div class="navbar-item">
		      	<button class="button is-small is-danger" :class="{ 'is-loading' : !chargementTermine }" @click="chargerMessages">
	          		<i class="fa fa-refresh"></i>
		      		Rafraichir
		      	</button>
		      </div>
		      <div class="navbar-item is-small has-text-dark">
				<span class="tag">{{ channel.label }}</span>
		      </div>
		</div>		
	</nav>

	<div class="panel">
		<div v-if="noMessages" class="box">Aucun message dans cette conversation.</div>
		<channel-message v-else v-for="message in messages" :message="message"></channel-message>

	</div>

	<nav class="navbar has-shadow is-fixed-bottom">
		<div class="navbar-item field saisie-message">
		  <div class="control">
		    <input class="input" @keyup.enter="envoyerMessage" v-model="message" type="text" placeholder="Entrez votre message ici et appuyez sur entrée">
		  </div>
		</div>
	</nav>

</div>


</template>

<script>
import ChannelMessage from './ChannelMessage.vue'

export default {
		name: 'channel',
		components : {ChannelMessage},
		data () {
			return {
				channel : false,
				message : '',
				messages  :  [],
				members : false,
				editerChannel : false,
				chargementTermine:false
			}
		},
		created() {
			window.axios.get('channels/'+this.$route.params.id).then(response => {
				this.channel = response.data;

				window.axios.get('members').then(response => {
					this.members = response.data;
					this.chargerMessages(true);
				});

			});
			this.$bus.$on('charger-message',() => {
				this.chargerMessages(true);
			})
			setInterval(() => {
				if(this.channel) {
					this.chargerMessages();
				}
			},30000);
						
		},
		methods : {
			toggleEdit() {
				this.editerChannel=!this.editerChannel;
			},
			retour() {
				this.$bus.$emit('changer-section','channels');				
			},
			chargerMessages(scroll=false) {
				this.chargementTermine=false;
				window.axios.get('channels/'+this.channel._id+'/posts').then(response => {
					this.messages = response.data;

					this.messages.forEach((message, cle) => {
						message.member = this.getMembre(message.member_id);
						var updated_at = new Date(message.updated_at);
						var today = new Date();
						message.depuis = Math.round((((today - updated_at) % 86400000) % 3600000) / 60000);
						if(message.depuis==0) {
							message.depuis='à l\'instant';
						} else {
							message.depuis+='m';
						}
						message.last=cle == this.messages.length-1;
						this.messages[cle] = message;
					});
					if(scroll)  {
						setTimeout(function() {
							window.scrollTo(0,document.body.scrollHeight);
						},100);
					}
					setTimeout(() => {
						this.chargementTermine=true;
					},1000);
				});
			},
			getMembre(id) {
				for(var i=0;i<this.members.length;i++) {
					if(this.members[i]._id == id) {
						return this.members[i];
					}
				}
			},
			envoyerMessage () {
				if(this.message) {
					let message=this.message;
					this.message='';
					window.axios.post('channels/'+this.channel._id+'/posts',{message: message}).then(response => {
						this.$bus.$emit('charger-message');
					});

				}
			},
			enregistrerChannel() {
				window.axios.put('channels/'+this.channel._id,{
					topic:this.channel.topic,
					label:this.channel.label 
				}).then(() => {
					this.editerChannel=false;
				});
			}
		},
		computed: {
			noMessages () {
				return this.chargementTermine && this.messages.length == 0;
			},
			topic() {
				return this.channel.topic ? this.channel.topic : 'Sans titre';
			}
		}
	}
</script>

<style>
	.saisie-message, .saisie-message .control{
		width: 100%;
	}

	.channel, .channel .navbar {
	    margin-top: 3.25rem;
	}

	.titre-channel .icon{
		visibility: hidden;
	}
	.titre-channel:hover .icon{
		visibility: visible;
	}
	.edit-channel {
		width: 50%;
	}
	.edit-channel .control, .edit-channel .field{
		width: 100%;
	}

</style>
