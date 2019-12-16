<template>

<article class="media channel-message">
  <figure class="media-left">
    <p class="image is-32x32">
      <img :src="avatarMembre">
    </p>
  </figure>
  <div class="media-content">
    <strong>{{ message.member.fullname }}</strong> <small>{{ message.member.email }}</small> <span class="date" :title="message.updated_at"> {{ message.depuis }}</span>
    <br>
    <div v-if="editerMessage">

		<div class="field">
		<p class="control">
			<input v-show="editerMessage" v-focus type="text" v-model="messageTemporaire" class="input" @keyup.enter="enregistrerMessage" @keyup.escape="enregistrerMessage">
		</p>
		</div>
	</div>
	<div v-else>
		{{ message.message }}
	</div>
  </div>
  <div class="media-right ">
	<div v-show="monMessage">
		<a class="icon" @click="toggleEdit">
		<i class="fa fa-pencil has-text-dark"></i>
		</a>

		<a class="icon" @click="deleteMessage">
		<i class="fa fa-trash has-text-dark"></i>
		</a>
	</div>
  </div>
</article>

</template>


<script>

export default {
		name: 'channel-message',
		props: ['message'],
		data () {
			return {
				editerMessage:false,
				messageTemporaire:''
			}
		},
		created() {
		},
		methods : {
			toggleEdit() {
				if(this.editerMessage) {
					this.editerMessage=false;
				} else {
					this.messageTemporaire=this.message.message;
					this.editerMessage=true;
				}

			},
			deleteMessage() {
				if(confirm('Effacer ce message ?')) {
					window.axios.delete('channels/'+this.message.channel_id+'/posts/'+this.message.id).then(() => {
						this.$bus.$emit('charger-message');
					});
				}
			},
			enregistrerMessage() {
				window.axios.patch('channels/'+this.message.channel_id+'/posts/'+this.message.id,{message:this.messageTemporaire}).then(() => {
					this.editerMessage=false;
				});
			}
		},
		computed : {
			avatarMembre() {
				return this.urlAvatar(this.message.member.email);
			},
			monMessage() {

				return this.$store.state.member.id == this.message.member_id;
			}
		}
	}
</script>

<style>
	.channel-message .date {
		color:#ccc;
		font-size: 12px;
	}

	.channel-message {
		position: relative;
	}
	.channel-message .media-right {
		visibility: hidden;
	}
	.channel-message:hover .media-right {
		visibility: visible;
	}


</style>