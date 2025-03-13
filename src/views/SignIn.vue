<script setup>

import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
import { ref , reactive } from 'vue'
//import { storeToRefs } from 'pinia';
//import { useUserStore } from '@/stores/user';

//const userStore = useUserStore()
//const { email, password } = storeToRefs(userStore)

const router = useRouter()


let email = ref ("");
let password = ref("");


async function signIn (event) {
	event.preventDefault()
	//let email = document.querySelector("#email").value;
	//let password = document.querySelector("#password").value;
	let errorMsg = document.querySelector("#errorMsg");

	if (email.value !== '' && password.value !== ''){
		
		const data = { 
			email: email.value, 
			password: password.value 
		}
		console.log(data)

		const url = 'https://hap-app-api.azurewebsites.net/user/login'

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}

		let response = await fetch(url, options)	
		
		if (response.status === 200) {
			const data = await response.json()

			localStorage.setItem("token", data.token)
			localStorage.setItem("user", data.user.userName)
			console.log(data.user.userName)
			//TODO: Store username in localStorage as well

			router.push({
				name: 'main'
			})
		}
		else if (response.status === 400) {
			// TODO: Display error message to screen
			console.log("Invalid email or password.")
			errorMsg.textContent = "Invalid email or password";
		}
	} else {
		errorMsg.textContent = "Please complete all field"
	}

}


</script>

<template class="body">
	<Header class="header">
		<nav>
			<RouterLink to="/">Home</RouterLink>
		</nav>
	</Header>

	<main class="padding-block-700">
		<section id="main" class="container center">
			<form>
				<fieldset>
					<label>Email:   </label>
					<input type="email" required id="email" v-model="email"><br /><br />
					<label>Password:   </label>
					<input type="password" minlength="8" required id="password" v-model="password"><br /><br />
					<div id="errorMsg"></div>
					<button class="button" @click="signIn">Sign In</button>
				</fieldset>
			</form>

		</section>
	</main>
</template>

<style scoped>
:deep(a) {
	text-decoration: none;
}
</style>