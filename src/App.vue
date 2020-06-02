<template>
	<div id="app">
		<b-navbar toggleable="lg" type="light" v-if="sessionActive">
			<b-container fluid="lg">
				<b-navbar-brand :to="{ name: 'home' }">
					<img src="~@/assets/logo_white_transparentBG.png" height="40" width="auto" class="" />
				</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav v-if="authed">
					<b-navbar-nav>
						<b-nav-item :to="{ name: 'batches' }" :active="$route.name === 'batches'">
							Batches
						</b-nav-item>
						<b-nav-item :to="{ name: 'recipients' }" :active="$route.name === 'recipients'">
							Recipients
						</b-nav-item>
						<b-nav-item :to="{ name: 'donations' }" :active="$route.name === 'donations'">
							Donations
						</b-nav-item>
						<b-nav-item :to="{ name: 'merchants' }" :active="$route.name === 'merchants'">
							Merchants
						</b-nav-item>
						<b-nav-item :to="{ name: 'team' }" :active="$route.name === 'team'" v-if="isAdmin">
							Team
						</b-nav-item>
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto" v-if="sessionActive">
						<b-nav-item-dropdown right>
							<template v-slot:button-content v-if="user">
								<!-- <b-icon-house /> -->
								{{ user.name_first }}
							</template>
							<b-dropdown-item href="#" @click.prevent="logout">Log Out</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
		<b-container class="pt-4">
			<router-view />
		</b-container>
	</div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
// import { BIconHouse } from 'bootstrap-vue';

export default {
	components: {
		// BIcon,
		// BIconHouse
	},

	computed: {
		...mapGetters({
			sessionActive: 'App/sessionActive',
			user: 'App/user',
			authed: 'App/sessionActive',
			isAdmin: 'App/isAdmin'
		})
	},

	watch: {
		sessionActive: function(x) {
			if (x) {
				this.$router.push({ name: 'home' });
			}
		}
	},

	methods: {
		logout() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push({ name: 'login' });
				});
		}
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background-color: #f3fdf2;
	// background-color: #f2f7fd;
	min-height: 100vh;

	.navbar {
		background-color: #40690a;
	}

	.navbar-light .navbar-nav .nav-link {
		color: #ffffffe5 !important;
	}
}
</style>
