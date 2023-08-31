import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../api';
import router from '../router';

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        user: ""
    }),
    actions: {
        async getUser() {
            try {
                const response = await API.get('/auth/profile');
                console.log(response);
                this.user = response.data
            } catch (error) {
                
            }
        }
    }
})