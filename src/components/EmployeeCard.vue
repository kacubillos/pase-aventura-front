<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ props.content.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ props.content.role.name }}</h6>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['content']);
</script>