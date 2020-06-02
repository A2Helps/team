<template>
	<b-card title="Merchants">
		<b-spinner v-if="loading" />
		<b-table hover small :fields="fields" :items="items" responsive="sm" v-else>
			<template v-slot:table-colgroup="scope">
				<col
					v-for="field in scope.fields"
					:key="field.key"
					:style="{ width: field.key === 'img' ? '60px' : 'auto' }"
				/>
			</template>
			<template v-slot:cell(img)="data">
				<img :src="data.item.img_url" width="40" height="auto" v-if="data.item.img_url" />
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png"
					width="30"
					height="auto"
					v-else
				/>
			</template>
			<template v-slot:cell(name)="data">
				{{ data.item.name }}
			</template>
			<template v-slot:cell(amounts)="data">
				{{ data.item.amounts.join(',') }}
			</template>
			<template v-slot:cell(custom)="data">
				<b-badge variant="success" v-if="data.item.custom_amount"> Yes </b-badge>
				<b-badge variant="info" v-else> No </b-badge>
			</template>
			<template v-slot:cell(active)="data">
				<b-badge variant="success" v-if="data.item.active"> Active </b-badge>
				<b-badge variant="warning" v-else> Hidden </b-badge>
			</template>
			<template v-slot:cell(edit)="data">
				<router-link :to="{ name: 'merchant', params: { id: data.item.id } }">
					<b-button variant="light" size="sm">
						Edit
						<b-icon-pencil />
					</b-button>
				</router-link>
			</template>
		</b-table>
		<b-button variant="light" size="sm" @click="showAdd = true" v-if="!showAdd">
			<b-icon-plus />
		</b-button>
		<template v-else>
			<b-form @submit.prevent="doAdd" class="mt-4">
				<b-row>
					<b-col xs="12" md="3">
						<b-form-group>
							<b-form-input
								type="text"
								required
								placeholder="Merchant Name"
								autocomplete="none"
								v-model="input.name"
							/>
						</b-form-group>
					</b-col>
					<b-col xs="12" md="3">
						<b-button type="submit" variant="primary" v-if="!adding">
							Add
						</b-button>
						<b-spinner v-else />
					</b-col>
				</b-row>
			</b-form>
		</template>
	</b-card>
</template>

<script>
// import log from '@/log';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { BIconPencil, BIconPlus } from 'bootstrap-vue';

export default {
	name: 'Merchants',

	components: {
		BIconPencil,
		BIconPlus
	},

	data: () => ({
		loading: true,
		showAdd: false,
		adding: false,

		input: { name: null },

		fields: ['img', 'name', 'amounts', 'custom', 'active', 'edit']
	}),

	computed: {
		...mapGetters({
			recipients: 'Merchant/all',
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
			await this.$store.dispatch('Merchant/fetchAll');
			this.loading = false;
		},

		async doAdd() {
			if (!this.input.name) {
				return;
			}

			this.adding = true;
			await this.$store.dispatch('Merchant/create', { data: this.input });

			this.showAdd = false;
			this.adding = false;
		}
	}
};
</script>
