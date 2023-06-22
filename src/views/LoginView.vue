<template>
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login">Submit</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import AuthService from '../services/AuthService.js';

    let email = ref('');
    let password = ref('');

    const login = async () => {
        const auth = new AuthService();
        const success = await auth.login(email.value, password.value);

        if(success)
            console.log(auth.getJwt());
        else
            console.log(auth.getError());
    }
</script>