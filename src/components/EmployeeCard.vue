<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="img-container">
                    <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                        alt="profile image">
                </div>
                <div class="mx-4">
                    <h5 class="card-title">
                        <router-link :to="{ path: '/empleados/' + props.content.employeeId }">
                            {{ props.content.name + ' ' + props.content.lastname }}
                        </router-link>
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ props.content.role.name }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['content']);
</script>

<style scoped>
.img-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px;
  cursor: pointer;
}

.img-container > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>