<script setup>

const props = defineProps({ senderName: String, updatedAt: String, text: String })

</script>

<template>
    <div class="card">
        <h1 class="primary-heading">{{ senderName }} {{ updatedAt }}</h1>
        <span>{{ text }}</span>
    </div>

</template>

<style scoped>

.card {

    background-color: var(--clr-accent-400);
    color: var(--clr-neutral-100);

    width: 100%;
    min-height: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>