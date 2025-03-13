<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
let user = userStore.userName;
</script>

<template>
    <main class="padding-block-700">
		<section class="container center">
			<h1 class="fs-primary-heading">Welcome {{ user }}!</h1>
		</section>
    </main>
</template>