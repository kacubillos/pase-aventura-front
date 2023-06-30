<template>
    <form @submit.prevent="login">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import router from '../router';
    import useAuthStore from "../store/auth.js";

    let email = ref('');
    let password = ref('');

    const login = async () => {
        const auth = useAuthStore();
        const success = await auth.login(email.value, password.value);

        if(success)
            router.push('/');
        else
            console.log('Error');
    }
</script>