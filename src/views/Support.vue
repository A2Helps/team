<template>
	<div>
		<b-card title="Recipient Lookup">
			<b-row align-v="end">
				<b-col>
					<b-form-group label="Search" class="mb-0">
						<b-form-input
							type="text"
							autocomplete="none"
							v-model="input.search"
							placeholder="Search by Code, Email or Phone"
						/>
					</b-form-group>
				</b-col>
				<b-col>
					<b-button variant="primary" :disabled="searching" @click="search">
						Search
					</b-button>
				</b-col>
			</b-row>

			<b-table
				class="mt-4"
				hover
				small
				:fields="resultsFields"
				:items="results"
				responsive="sm"
				v-if="results.length"
			>
				<template v-slot:cell(actions)="data">
					<b-button variant="light" size="sm" @click.once="reset(data.item.id)">
						Reset + Resend
					</b-button>
				</template>
			</b-table>
		</b-card>

		<b-card title="Stats" class="mt-4">
			<b-table hover small :fields="fields" :items="items" responsive="sm"> </b-table>
		</b-card>
	</div>
</template>

<script>
// import log from '@/log';
// import _ from 'lodash';

export default {
	name: 'Support',

	data: () => ({
		loading: true,
		searching: false,

		resultsFields: ['name', 'email', 'phone', 'actions'],
		results: [],

		fields: ['name', 'sent', 'avail', 'redeemed'],
		items: [],

		input: {
			search: ''
		}
	}),

	mounted() {
		this.prep();
	},

	methods: {
		async prep() {
			this.stats = await this.$store.dispatch('App/fetchStats');
			this.items = this.stats.orgs;

			this.loading = false;
		},

		async search() {
			this.searching = true;

			const results = await this.$store.dispatch('Recipient/search', { search: this.input.search });

			this.results = results.map(r => ({
				id: r.id,
				name: `${r.name_first} ${r.name_last}`,
				email: r.email,
				phone: r.phone
			}));

			this.searching = false;
		},

		async reset(id) {
			let r = await this.$store.dispatch('Recipient/reset', { id });

			alert(r.error ? r.error : 'Success!');

			this.search();
		}
	}
};
</script>
