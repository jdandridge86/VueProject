<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, useTemplateRef } from 'vue'
import Modal from '@/components/Modal.vue';

// Modal
const modal = useTemplateRef('name-modal')


function cancel(e) {
	modal.value.close(e)
}

function save(e) {
    saveProfile()
	modal.value.close(e)
}

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');


const firstName2 = ref('');
const lastName2 = ref('');
const userName2 = ref('');
const email2 = ref('');
const password = ref('');

async function saveProfile() {

	const token = localStorage.getItem("token")

	const url = 'https://hap-app-api.azurewebsites.net/user'

    const data = {
			email: email2.value,
			userName: userName2.value,
			password: password.value,
			firstName: firstName2.value,
			lastName: lastName2.value
		}

	const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}

	let response = await fetch(url, options)

	//console.log(response.status)
			
	if (response.status === 200) {
		loadProfile();
		
			
	}
	else if (response.status === 400) {
	
			
	}
}

async function loadProfile() {

	const token = localStorage.getItem("token")

	const url = 'https://hap-app-api.azurewebsites.net/user'

    const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
			},
		}

	let response = await fetch(url, options)

	//console.log(response.status)
			
	if (response.status === 200) {
		//store username and token in local response
        let data = await response.json()
        data.firstName

        firstName.value = data.firstName;
        lastName.value = data.lastName;
        userName.value = data.userName;
        email.value = data.email;


        firstName2.value = data.firstName;
        lastName2.value = data.lastName;
        userName2.value = data.userName;
        email2.value = data.email;
        password.value = data.password;	
    
			
	}
	else if (response.status === 400) {
	
			
	}
}

const router = useRouter()

function backButton (event) {
	event.preventDefault()
    router.push({name: 'main'})
}

onMounted(()=>{
    loadProfile()
})

</script>

<template>
    <div class="menu">
        <span class="menu-section">Account Settings</span>

        <ul class="secondary-heading">
            <li>
                <RouterLink to="/profile">
                    <!--"/settings/account/subscriptions"-->
                    <div class="flex align-center justify-between">
                    <section>
                        <fieldset>
                            <p>
                                First Name:<br> 
                                {{ firstName }}<br>
                                Last Name:<br>
                                {{ lastName }}<br>
                                Username:<br>
                                {{ userName }}<br>
                                Email:<br>
                                {{ email }}<br>

                                <button class="button" @click="backButton">Back</button>
                                <button class="button" @click="modal.open">Edit</button>
                            </p>
                            
                        </fieldset>
                    </section>
                    </div>
                </RouterLink>
            </li>
        </ul>

    </div>


    <Modal ref="name-modal">
        <template #header>
            <h1 class="primary-heading">Edit Profile</h1>
        </template>
        <template #main>
            <input v-model="firstName2" type="text" placeholder="First Name"><br>
            <input v-model="lastName2" type="text" placeholder="Last Name"><br>
            <input v-model="userName2" type="text" placeholder="Username"><br>
            <input v-model="email2" type="text" placeholder="Email"><br>
            <input v-model="password" type="text" placeholder="password"><br>
        </template>
        <template #footer>
            <button @click.stop="cancel">Cancel</button>
            <button @click.stop="save">Save</button>
        </template>
	</Modal>
</template>

<style>
p {
    color: orange;
    font-size: 30px;
}
</style>
