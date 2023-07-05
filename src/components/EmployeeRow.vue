<template>
    <tr>
        <td class="d-flex align-items-center">
            <div class="img-container m-0">
                <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                    alt="profile image">
            </div>
            <router-link class="mx-3" :to="{ path: '/empleados/' + props.content.employeeId }">
                {{ props.content.name + ' ' + props.content.lastname }}
            </router-link>
        </td>
        <td>{{ props.content.documentType + ' ' + props.content.documentNum }}</td>
        <td>{{ props.content.birthDate.split('T')[0] }}</td>
        <td>
            <span class="badge" :class="{ 'bg-admin': props.content.role.roleId == 1, 'bg-emp': props.content.role.roleId == 2 }">{{ props.content.role.name }}</span>
        </td>
    </tr>
</template>

<script setup>
const props = defineProps(['content']);
</script>

<style scoped>
td {
    padding: 1rem;
    border: none;
    border-top: 1px solid rgba(229, 231, 235, 0.5);
    ;
}

.img-container {
  width: 40px;
  height: 40px;
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

.bg-admin {
    color: var(--red-500);
    background-color: var(--red-100);
}

.bg-emp {
    color: var(--green-500);
    background-color: var(--green-100);
}
</style>