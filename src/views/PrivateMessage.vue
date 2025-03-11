<script setup>
import Header from '../components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref , reactive } from 'vue'

const router = useRouter()

const props = defineProps({ userId: String })
const privateMessages = ref([])
let message = ref("")

const route = useRoute()
console.log(route.query.name)

async function getPrivateMessages () {
    
    const token = localStorage.getItem("token")
    const url = `https://hap-app-api.azurewebsites.net/messages/${props.userId}`

    console.log(url)

    const options = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    console.log(response)

    if (response.status === 200) {
        let data = await response.json()
        data.reverse()
        
		console.log(data)
		privateMessages.value = data;
    }
}

async function sendPrivateMessage () {
    
    const token = localStorage.getItem("token")
    const url = `https://hap-app-api.azurewebsites.net/message/${props.userId}`

    console.log(url)

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({text: message.value})
    }

    let response = await fetch(url, options)

    console.log(response)

    if (response.status === 201) {
        let data = await response.json()
        
		console.log(data)
		privateMessages.value.push(data)
    }
}

onMounted(() => {
    getPrivateMessages();
})

</script>

<template>
    <RouterLink to="/main">Back</RouterLink>
    <div>Private Chat with {{ route.query.name}}</div>
    <div>
        <input type="text" v-model="message">
        <button class="button" @click="sendPrivateMessage">Send Private Message</button>
    </div>
    <!--<button class="button" @click="getPrivateMessages">Get Private Messages</button>-->
    <div v-for="message in privateMessages" :class="props.userId==message.senderId?'msg':'msg me'">
        <div class="bubble">
            {{ message.text }}
        </div>
    </div>
    
</template>

<style>
.me {
    justify-content: right;
}
.msg{
    display:flex;
}
.bubble{
    background-color: orange;
    width:max-content;
    color: black;
    border-radius: 30px;
    padding: 8px;
    margin: 5px;
}

</style>