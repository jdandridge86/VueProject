<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref , reactive } from 'vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore();

let firstName = ref ("")
let lastName = ref("")
let email = ref("")
let userName = ref("")

const token = userStore.token;
const user = userStore.userName;


async function profile(e) {
	e.preventDefault()

	const token = userStore.token;

	const url = 'https://hap-app-api.azurewebsites.net/user'

	const options = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	let response = await fetch(url, options)

	//console.log(response.status)
			
	if (response.status === 200) {
		//store username and token in local response
		const data = await response.json()

		userStore.setUser(
				data.firstName,
				data.lastName,
				data.userName,
				data.email,
				data.token ?? userStore.token
		)
			
		
		userName.value = data.userName;
		email.value = data.email;
		firstName.value = data.firstName;
		lastName.value = data.lastName;		

	}
	else if (response.status === 401) {
	// TODO: Display error message to screen
	console.log("Invalid email or password.")
			
	}
	
	router.push({
		name:"profile"
	})
}

function signOut(event) {
	// maybe remove something from localStorage?
	userStore.$reset();
	
	
	console.log("clicked")

	router.push({
		name: 'home'
	})
}

async function deleteUser (event) {
	event.preventDefault()

	const token = userStore.token;
	const url = 'https://hap-app-api.azurewebsites.net/user'

	let result = confirm("Please confirm you want to delete your account?")

	const options = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	if (result) {
		let response = await fetch(url, options)	
		
		if (response.status === 200) {
			//const data = await response.json()
			
			userStore.$reset();
						
			//TODO: Store username in localStorage as well

			router.push({
				name: 'home'
			})
		} else {
			console.log("HTTP-Error: " + response.status)
			console.log(`Bearer ${token}`)
			console.log(token)
		}
	}
	else {
		console.log("No was clicked")
	}
}

</script>

<template>
	<Header class="header" id="header">
			<div class="dropdown">
				<button class="dropbtn">Account</button>
				<div class="dropdown-content">
					<a @click="profile">Profile</a>
					<a @click="signOut">Sign Out</a>
					<a @click="deleteUser">Delete Account</a>
					<a @click="PrivateMessage">PrivateMessage</a>
				</div>
			<!--<a @click="signOut">Sign Out</a>-->
			<!--<a @click="deleteUser">Delete</a>-->
			</div>
	</Header>

	

		<main>
			<div>
				<RouterView name="leftSidebar" class="grid-panel"></RouterView>
			</div>
			<div>
				<RouterView name="focus" class="grid-panel vline"></RouterView>
			</div>
			<div>
				<RouterView name="rightSidebar" class="grid-panel vline"></RouterView>
			</div>
		</main>

	
</template>

<style scoped>
.view {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	height: 100%;
}

.grid-panel {
	padding: var(--size-300);
	margin: var(--size-300);
}

header, footer {
	margin: 0 auto;
}

.middle {
	grid-column-start: 2;
}

.bottom {
	grid-column-start: 3;
}

main > *{
	width:33.3vw;
	height:calc(100vh - 154px);
}

@media (min-width: 50em) {
	main {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
	}

	.vline {
		border-left: 1px lightgrey solid;		
	}
}

</style>