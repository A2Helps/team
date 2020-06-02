<template>
	<b-card title="Donors">
		<b-spinner v-if="loading" />

		<b-table hover small :fields="fields" :items="items" responsive="sm" v-else>
			<template v-slot:cell(email)="data">
				<b class="text-info">{{ data.value }}</b>
			</template>

			<template v-slot:cell(name)="data"> {{ data.value }} </template>
			<template v-slot:cell(amount)="data"> ${{ Math.floor(data.value / 100) }} </template>

			<template v-slot:cell(public)="data">
				<span v-if="!data.item.public" class="text-success">
					-
				</span>
				<span class="text-secondary" v-else>
					{{ data.item.public_name }}
				</span>
			</template>
		</b-table>
	</b-card>
</template>

<script>
// import log from '@/log';
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
	name: 'Donations',

	data: () => ({
		loading: true,

		fields: ['email', 'name', 'amount', 'public']
	}),

	computed: {
		...mapGetters({
			donations: 'Donation/allCompleted',
			user: 'App/user'
		}),

		items() {
			if (!this.donations) {
				return [];
			}

			return _.orderBy(this.donations, 'created_at', ['desc']).map(x => ({
				...x,
				name: x.wired_from
			}));
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		async prep() {
			await this.$store.dispatch('Donation/fetchAll');
			this.loading = false;
		}
	}
};
</script>
