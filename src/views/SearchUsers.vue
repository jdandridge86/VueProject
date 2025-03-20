<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref , reactive } from 'vue'

let query = ref ("");
const users = ref([])
let message = ref("")

const userStore = useUserStore();

async function sendMessage(e) {
	e.preventDefault();

	const token = userStore.token;

	const data = {
		text: message.value
	}

	const url = 'https://hap-app-api.azurewebsites.net/message'

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	}

	let response = await fetch(url, options)

	if (response.status === 201) {
		//store username and token in local response
		console.log("success!")
		const data = await response.json()
	}
}

async function search () {
    
    const token = userStore.token;
    const url = `https://hap-app-api.azurewebsites.net/users?search=firstName|lastName|userName:${query.value}`
    console.log(url)

    const options = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    console.log(response)

    if (response.status === 200) {
        let data = await response.json()
        
		console.log(data)
		users.value = data;
    }
}
</script>


<template>
<section class="grid-panel bottom vline">
    <div class="form">
        <h1 class="primary-heading">Message</h1>
        <div>
            <input v-model="message">
            <div class="flex justify-content">
                <button class="button" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>

    <div>
        <p>Search for a user</p>
        
        <input type="text" placeholder="Search" required id="query" v-model="query"><br /><br />

                <button class="button" @click="search">Search</button><br>
    
        <RouterLink v-for="user in users" :to="`/user/${user._id}?name=${user.userName}`">
            {{ user.firstName }} {{ user.lastName }}<br>
        </RouterLink>
    </div>
   </section>
</template>