<template>
	<b-card>
		<b-spinner v-if="loading" />
		<template v-else>
			<h3>{{ merchant.name }}</h3>

			<b-form @submit.prevent="onSubmit" class="mt-4">
				<b-row>
					<b-col>
						<b-form-group label="Name">
							<b-form-input
								type="text"
								required
								placeholder="Merchant Name"
								autocomplete="none"
								v-model="input.name"
							/>
						</b-form-group>
						<b-form-group label="Image URL">
							<b-form-input type="text" autocomplete="none" v-model="input.img_url" />
						</b-form-group>
						<b-form-group label="Gift Card URL">
							<b-form-input type="text" autocomplete="none" v-model="input.gc_url" />
						</b-form-group>
						<b-form-group
							label="Amounts"
							description="Comma separated list of available amounts. Only required if custom amounts are not supported."
						>
							<b-form-input
								type="text"
								placeholder="Gift Card Amounts."
								autocomplete="none"
								v-model="input.amounts"
							/>
						</b-form-group>
						<b-form-group label="Custom Amounts">
							<b-form-checkbox-group v-model="input.custom_amount">
								<b-form-checkbox value="true">
									Merchant supports custom eGC amounts.
								</b-form-checkbox>
							</b-form-checkbox-group>
						</b-form-group>
						<b-form-group label="Active">
							<b-form-checkbox-group v-model="input.active">
								<b-form-checkbox value="true">
									Is the merchant active and should be shown to recipients?
								</b-form-checkbox>
							</b-form-checkbox-group>
						</b-form-group>
					</b-col>
				</b-row>

				<b-button type="submit" variant="primary" v-if="!processing">
					Save
				</b-button>
				<b-spinner v-else />
			</b-form>
		</template>
	</b-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Merchant',

	data: () => ({
		loading: true,
		error: null,
		processing: false,

		input: {
			name: null,
			img_url: null,
			gc_url: null,
			amounts: null,
			custom_amount: [],
			active: []
		}
	}),

	computed: {
		...mapGetters({
			sessionActive: 'App/sessionActive'
		}),

		id() {
			return this.$route.params.id;
		},

		merchant() {
			return this.$store.getters['Merchant/find'](this.id);
		}
	},

	mounted() {
		this.prep();
	},

	methods: {
		async prep() {
			if (!this.merchant) {
				let merchant = await this.$store.dispatch('Merchant/fetch', { id: this.id });

				if (!merchant) {
					this.$router.push({ name: 'merchants' });
					return;
				}
			}

			this.input.name = this.merchant.name;
			this.input.img_url = this.merchant.img_url;
			this.input.gc_url = this.merchant.gc_url;
			this.input.amounts = this.merchant.amounts.join(',');

			if (this.merchant.active) {
				this.input.active.push('true');
			}

			if (this.merchant.custom_amount) {
				this.input.custom_amount.push('true');
			}

			this.loading = false;
		},

		async onSubmit() {
			this.processing = true;

			let data = { ...this.input };

			data.active = !!data.active.length;
			data.custom_amount = !!data.custom_amount.length;

			await this.$store.dispatch('Merchant/update', {
				id: this.id,
				data
			});

			this.$router.push({ name: 'merchants' });
		}
	}
};
</script>
