<template>
	<b-card title="Batches">
		<b-spinner v-if="loading" />
		<b-table hover small :fields="fields" :items="items" responsive="sm" v-else>
			<template v-slot:cell(merchant)="data">
				<b class="text-info">{{ data.value }}</b>
			</template>

			<template v-slot:cell(amount)="data"> ${{ Math.floor(data.value / 100) }} </template>

			<template v-slot:cell(status)="data">
				<span v-if="data.item.completed" class="text-success">
					Complete
				</span>

				<router-link
					:to="{ name: 'batch', params: { id: data.item.id } }"
					v-else-if="data.item.assigned_to_me"
				>
					<b-button variant="warning">
						Fulfill
						<b-icon-chevron-right />
					</b-button>
				</router-link>

				<span class="text-secondary" v-else-if="data.item.assigned_to">
					Assigned
				</span>

				<b-button variant="outline-primary" @click="assign(data.item.id)" v-else>
					Assign to Me
				</b-button>
			</template>
		</b-table>
	</b-card>
</template>

<script>
// import log from '@/log';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { BIconChevronRight } from 'bootstrap-vue';
import Batch from '@/models/Batch';

export default {
	name: 'Batches',

	components: {
		BIconChevronRight
	},

	data: () => ({
		loading: true,

		fields: ['merchant', 'quantity', 'amount', 'status']
	}),

	computed: {
		...mapGetters({
			batches: 'Batch/all',
			user: 'App/user'
		}),

		items() {
			if (!this.batches) {
				return [];
			}

			return _.orderBy(this.batches, ['created_at', 'id']).map(b => ({
				id: b.id,
				quantity: b.quantity,
				amount: b.amount,
				merchant: this.$store.getters['Merchant/nameById'](b.merchant_id),
				assigned_to: b.assigned_to,
				assigned_to_me: b.assigned_to_me,
				completed: b.completed
			}));
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		async prep() {
			await this.$store.dispatch('Batch/fetchAll');
			this.loading = false;
		},

		clicked() {
			console.log('clicked!');
		},

		async assign(id) {
			let batch = new Batch({ id, assigned_to: this.user.id });
			await batch.save();

			this.$store.commit('Batch/SET', { batch });
			this.$router.push({ name: 'batch', params: { id } });
		}
	}
};
</script>
