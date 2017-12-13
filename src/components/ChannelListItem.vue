<template>

  <a class="panel-block" @click="selectChannel()">
    <span class="panel-icon">
      <i class="fa fa-comment"></i>
    </span>
    <b>{{ channel.topic }}</b>  <span class="tag">{{ channel.label }}</span>
  </a>

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
				this.$bus.$emit('select-channel',this.channel);
			}
		}
	}
</script>

<style>

</style>
