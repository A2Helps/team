<template>
	<b-row class="justify-content-center">
		<b-col md="4">
			<b-card>
				<div class="d-flex justify-content-center mb-3">
					<img src="~@/assets/logo_fullColor_transparentBG.png" height="90" width="auto" />
				</div>

				<b-form @submit.prevent="onSubmit" @reset="onReset">
					<b-form-group label="Email" label-for="email">
						<b-form-input
							id="email"
							v-model="form.email"
							type="email"
							required
							placeholder="Email"
							autocomplete="username"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Password" label-for="password">
						<b-form-input
							id="password"
							v-model="form.password"
							type="password"
							required
							placeholder="Password"
							autocomplete="current-password"
						></b-form-input>
					</b-form-group>

					<b-button type="submit" variant="primary" v-if="!processing"> Login </b-button>
					<b-spinner v-else />
				</b-form>
				<span class="text-danger" v-if="error">
					{{ error }}
				</span>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
	name: 'Login',

	data: () => ({
		// form: {
		// 	email: 'patrick@a2helps.test',
		// 	password: 'password'
		// },

		form: {
			email: null,
			password: null
		},

		error: null,
		processing: false
	}),

	computed: {
		...mapGetters({
			sessionActive: 'App/sessionActive'
		})
	},

	mounted() {
		this.prep();
	},

	methods: {
		prep() {
			if (this.sessionActive) {
				this.$router.push({ name: 'home' });
			}
		},

		onSubmit() {
			this.processing = true;

			firebase
				.auth()
				.signInWithEmailAndPassword(this.form.email, this.form.password)
				.then(() => {
					// this.$router.push({ name: 'home' });
				})
				.catch(() => {
					this.error = 'Username or password is incorrect.';
					// this.error = err.message;
				})
				.finally(() => {
					this.processing = false;
				});
		},

		onReset() {}
	}
};
</script>
