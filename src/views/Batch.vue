<template>
	<b-card>
		<h3>{{ merchant.name }}</h3>
		<h5>{{ batch.quantity }}x ${{ fAmount }}</h5>

		<a :href="merchant.gc_url" target="_blank" v-if="merchant.gc_url">
			<b-button variant="secondary"> Acquire </b-button>
		</a>
		<small class="text-muted" v-else>
			Merchant does not have a gift card url linked.
			<router-link :to="{ name: 'merchant', params: { id: merchant.id } }">
				Update it
			</router-link>
		</small>

		<b-form @submit.prevent="onSubmit" class="mt-4">
			<b-row v-for="(item, i) in batchItems" :key="item.id">
				<batch-item :id="item.id" :index="i + 1" />
			</b-row>

			<b-button type="submit" variant="primary" v-if="!processing" :disabled="!complete">
				Submit
			</b-button>
			<b-spinner v-else />
		</b-form>
	</b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import BatchItem from '@/components/Batch/BatchItem';

export default {
	name: 'Batch',

	components: {
		BatchItem
	},

	data: () => ({
		error: null,
		processing: false
	}),

	computed: {
		...mapGetters({
			sessionActive: 'App/sessionActive'
		}),

		id() {
			return this.$route.params.id;
		},

		batch() {
			return this.$store.getters['Batch/find'](this.id);
		},

		batchItems() {
			return this.$store.getters['BatchItem/byBatchId'](this.id);
		},

		merchant() {
			if (!this.batch) return null;

			return this.$store.getters['Merchant/find'](this.batch.merchant_id);
		},

		fAmount() {
			return Math.floor(this.batch.amount / 100);
		},

		complete() {
			return this.batchItems.filter(bi => !bi.number).length === 0;
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		prep() {
			if (!this.batch || this.batch.completed) {
				this.$router.push({ name: 'home' });
			}
		},

		async onSubmit() {
			this.processing = true;

			await this.$store.dispatch('Batch/completed', {
				id: this.id
			});

			this.$router.push({ name: 'home' });
		}
	}
};
</script>
