<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import Message from '../components/Message.vue'

const items = ref([])
let num = ref()
const cont = useTemplateRef("cont");


const formatDate = (dateString) => {
	return new Date(dateString).toLocaleString("en-US", { timeZone: 'America/New_York' }) + " EST"
}

function getLastTime () {
	let lastTime = items.value[0].updatedAt;
	console.log(lastTime)
}

async function getNumMessages(e) {
	//e.preventDefault();
	 
	const token = localStorage.getItem("token")
	let queryParameter = items.value[0].updatedAt;
    
	const url = `https://hap-app-api.azurewebsites.net/messages/count?limit=6&after=${queryParameter}`
	
	console.log(url)

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}

	let response = await fetch(url, options)

	if (response.status === 200) {
		console.log("Success")
						
		let count = await response.json()
        
		console.log(count)

		num.value = count.total;
		getLastTime();
	
    }
}

async function getNewMessages() {
		 
		 const token = localStorage.getItem("token")
		 let queryParameter = items.value[0].updatedAt;
	 
		 const url = `https://hap-app-api.azurewebsites.net/messages?limit=6&after=${queryParameter}`;
	 
		 const options = {
			 method: "GET",
			 headers: {
				 "Content-Type": "application/json",
				 Authorization: `Bearer ${token}`,
			 },
		 }
	 
		 let response = await fetch(url, options)
	 
		 if (response.status === 200) {
			 console.log("successfully got new messages!")
					 
			 let data = await response.json()

			 items.value = [...data, ...items.value];	
		 }
	 }

	 async function getOldMessages() {
		 
		 const token = localStorage.getItem("token")

		 let queryParameter = items.value[items.value.length-1].updatedAt;
		 //items.value[items.value.length - 1]
	 
		 const url = `https://hap-app-api.azurewebsites.net/messages?limit=6&before=${queryParameter}`
	 
		 const options = {
			 method: "GET",
			 headers: {
				 "Content-Type": "application/json",
				 Authorization: `Bearer ${token}`,
			 },
		 }
	 
		 let response = await fetch(url, options)
	 
		 if (response.status === 200) {
			 console.log("successfully got old messages!")
					 
			 let data = await response.json()

			 items.value = [...items.value, ...data,];	
		 }
	 }



async function getMessages() {
		 
	const token = localStorage.getItem("token")

	const url = 'https://hap-app-api.azurewebsites.net/messages?limit=6'

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}

	let response = await fetch(url, options)

	if (response.status === 200) {
		console.log("successfully got messages!")
				
		let data = await response.json()
        
		console.log(data)
		items.value = data;

    }
}


onMounted(() => {
    getMessages();

    cont.value.addEventListener ('scroll', function() {
        if (cont.value.scrollTop === 0) {
            console.log("scrolled up")
            getNumMessages();
        }
    });

    cont.value.addEventListener('scroll', function() {
    if (cont.value.scrollTop + cont.value.offsetHeight >= cont.value.scrollHeight) {
        console.log('Scrolled to the bottom');
        getOldMessages();
    }
    });
});
</script>
<template>
    <main class="padding-block-700 cont" ref="cont">
		<div class="view">
		<!--<header>
			<h1 class="primary-heading">Header</h1>
		</header>-->

		<section class="grid-panel middle vline message-cont">
			<h1 class="primary-heading"> My Feed</h1>
			<button class="button" @click="getNewMessages">You have {{ num }} new messages</button>
			<Message v-for="item in items"
			:senderName="item.senderName"
			:text="item.text"
			:updatedAt="formatDate(item.updatedAt)"></Message>
			<!--<button class="button" @click="getMessages">Get Messages</button>-->
		</section>

           </div>

        </main> 
</template>

<style scoped>
.cont{
    overflow-y:scroll;
    overflow-x:hidden;
}
</style>