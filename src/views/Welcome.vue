<script setup>
let user = localStorage.getItem("user");
</script>

<template>
    <main class="padding-block-700">
		<section class="container center">
			<h1 class="fs-primary-heading">Welcome {{ user }}!</h1>
		</section>
    </main>
</template>