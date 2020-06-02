<template>
	<b-card title="Recipients">
		<b-spinner v-if="loading" />
		<b-table hover small :fields="fields" :items="items" responsive="sm" v-else>
			<template v-slot:cell(name)="data">
				{{ data.item.name_first }} {{ data.item.name_last }}
			</template>
		</b-table>
	</b-card>
</template>

<script>
// import log from '@/log';
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
	name: 'Recipients',

	data: () => ({
		loading: true,

		fields: ['name', 'phone', 'email']
	}),

	computed: {
		...mapGetters({
			recipients: 'Recipient/all',
			user: 'App/user'
		}),

		items() {
			if (!this.recipients) {
				return [];
			}

			return _.sortBy(this.recipients, 'created_at').map(x => ({
				...x
			}));
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		async prep() {
			await this.$store.dispatch('Recipient/fetchAll');
			this.loading = false;
		}
	}
};
</script>
