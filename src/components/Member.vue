<template>

  <p class="panel-block">
    <span class="panel-icon">
      <i class="fa fa-user"></i>
    </span>
    <span class="panel-icon">
    	<img :src="avatar">
	</span>
    <b>{{ member.fullname }}</b>  <span class="tag">{{ member.email }}</span>
    <a class="panel-icon" @click="effacerMembre()">
      <i class="fa fa-trash"></i>
    </a>
    
  </p>

</template>

<script>
export default {
	name: 'member',
		props : ['member'],
		methods : {
			effacerMembre() {
				if(this.getMembreId() == this.member._id) {
					alert('Vous ne pouvez pas effacer votre compte membre.');
				} else if(confirm('Effacer ce membre ?')) {
					axios.apiDelete('members/'+this.member._id).then(response => {
						this.$bus.$emit('chargement-membres');
					});
				}

			}
		},
		computed : {
			avatar() {
				return this.urlAvatar(this.member.email);
			}
		}
	}

</script>

<style>

</style>
