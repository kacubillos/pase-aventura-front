<template>
    <tr>
        <th scope="row">{{ props.content.documentType }}</th>
        <td>{{ props.content.documentNum }}</td>
        <td>
            <router-link :to="{ path: '/empleados/' + props.content.employeeId }">{{ props.content.name + ' ' + props.content.lastname }}</router-link>
        </td>
        <td>{{ props.content.birthDate }}</td>
        <td>{{ props.content.role.name }}</td>
    </tr>
</template>

<script setup>
    const props = defineProps(['content']);
</script>