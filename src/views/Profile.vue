<template>
    <div>
        <h1>Ini adalah halaman Profile</h1>
        <h1>{{ user }}</h1>
    </div>
</template>

<script>
import { useProfileStore } from '../stores/profile'
import { storeToRefs } from 'pinia';
export default {
    data() {
        const { user } = storeToRefs(useProfileStore());
        return {
            user
        }
    },
    mounted() {
        const { getUser } = useProfileStore()
        getUser()
    },
}
</script>