import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const firstName = ref(localStorage.getItem("firstName") ?? "");
  const lastName = ref(localStorage.getItem("lastName") ?? "");
  const userName = ref(localStorage.getItem("userName") ?? "");
  const email = ref(localStorage.getItem("email") ?? "");
  const token = ref(localStorage.getItem("token") ?? "");


  watch(firstName, (v)=>{
    localStorage.setItem("firstName", v);
  });

  watch(lastName, (v)=>{
    localStorage.setItem("lastName", v);
  });

  watch(userName, (v)=>{
    localStorage.setItem("userName", v);
  });

  watch(email, (v)=>{
    localStorage.setItem("email", v);
  });

  watch(token, (v)=>{
    localStorage.setItem("token", v);
  });

  
  function setUser(fName, lName, uName, email1, token1) {
    firstName.value = fName ?? ''
    lastName.value = lName ?? ''
    userName.value = uName ?? ''
    email.value = email1 ?? ''
    token.value = token1 ?? ''
  }

  function $reset() {
    firstName.value = ''
    lastName.value = ''
    userName.value = ''
  }

  return { firstName, lastName, userName, email, token, setUser, $reset }
})