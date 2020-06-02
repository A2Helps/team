<template>
	<div class="">
		Home
	</div>
</template>

<script>
export default {
	name: 'Home',
	mounted() {
		this.$router.replace({ name: 'batches' });
	}
};
</script>
