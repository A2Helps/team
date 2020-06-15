<template>
	<b-col cols="3" class="">
		<b-form-group :label="'Card ' + index">
			<b-form-input
				type="text"
				required
				:placeholder="'Card ' + index"
				autocomplete="none"
				v-model="input.number"
				@keyup="update"
			/>
		</b-form-group>
		<!-- <span class="text-success" v-if="saved"> Saved </span> -->
	</b-col>
</template>

<script>
import _ from 'lodash';

export default {
	name: 'BatchItem',

	props: {
		id: { required: true, type: String },
		index: { required: true, type: Number }
	},

	data: () => ({
		input: {
			number: null
		},

		timer: {
			update: null,
			saved: null
		},

		saved: false
	}),

	computed: {
		bi() {
			return this.$store.getters['BatchItem/find'](this.id);
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		prep() {
			this.input.number = this.bi.number;
		},

		update() {
			if (this.timer.update) clearTimeout(this.timer.update);

			this.input.number = this.input.number.trim();

			if (!this.input.number) {
				this.input.number = null;
			}

			this.timer.update = _.delay(() => {
				this.$store
					.dispatch('BatchItem/update', {
						id: this.id,
						data: { number: this.input.number }
					})
					.then(() => {
						this.saved = true;
						this.timer.saved = _.delay(() => {
							this.saved = false;
						}, 1500);
					})
					.catch(e => {
						console.error(e);
					});
			}, 500);
		}
	}
};
</script>
