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
			<input v-show="editerMessage" v-focus type="text" v-model="message.message" class="input" @keyup.enter="enregistrerMessage" @keyup.escape="enregistrerMessage">
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
				editerMessage:false
			}
		},
		created() {
			if(this.message.last) {
				setTimeout(function() {
					window.scrollTo(0,document.body.scrollHeight);
				},100);
			}
		},
		methods : {
			toggleEdit() {
				this.editerMessage=!this.editerMessage;
			},
			deleteMessage() {
				if(confirm('Effacer ce message ?')) {
					axios.apiDelete('channels/'+this.message.channel_id+'/posts/'+this.message._id).then(() => {
						this.$bus.$emit('charger-message');
					});
				}
			},
			enregistrerMessage() {
				axios.apiPatch('channels/'+this.message.channel_id+'/posts/'+this.message._id,{message:this.message.message}).then(() => {
					this.editerMessage=false;
				});
			}
		},
		computed : {
			avatarMembre() {
				return this.urlAvatar(this.message.member.email);
			},
			monMessage() {
				return this.getMembreId() == this.message.member_id;
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