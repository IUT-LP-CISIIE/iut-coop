<template>

	<div class="box">
		{{ channel.topic }}
		<div class="tag">{{ channel.label }}</div>
	</div>

</template>

<script>

export default {
		name: 'channel',
		props: ['channel'],
		data () {
			return {
			}
		},
		created() {

		},
		methods: {
		}
	}
</script>

<style>

</style>
