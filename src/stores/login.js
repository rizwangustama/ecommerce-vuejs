import { defineStore } from 'pinia'
import axios from 'axios';
import API from '../api';
import router from '../router';
import { useToast } from 'vue-toastification'

const toast = useToast();

export const useLoginStore = defineStore({
    id: 'login',
    state: () => ({
        email : null,
        password : null,
        detailUser: {
            token: null,
            isLogin: false
        },
    }),

    actions: {
        async login(email, password) {
            const payload = {
                email : email,
                password : password
            }
            try {
                const res =  await API.post('/auth/login', payload);
                // this.detailUser.token = await res.data.refresh_token;
                console.log(res.data.access_token);
                this.detailUser.token = await res.data.access_token;
                
                const token = await res.data.access_token;
                const replaceToken = token.replace(/^"(.*)"$/, '$1');
                await localStorage.setItem("token", replaceToken)
                // await localStorage.setItem("isLogin", true)
                
                if (this.detailUser.token) {
                    this.detailUser.isLogin = await true;
                    await router.push('/home');
                    await toast.success('Success Login', {
                        timeout: 2000
                    })
                } else {
                    toast.error("Login error")
                }
            } catch (error) {
                router.push('/login');
                toast.error("Login error");
            }
           
        },

        async logout() {
            this.detailUser = await {},
            this.detailUser.isLogin = await false;
            await localStorage.removeItem('token');
            await router.push('/login');
            await toast.success("Success logout")
        }
    },

    mutations: {
        setLoginStatus(status) {
            this.detailUser.isLogin = status;
          },
    }
})

export const useRegisterStore = defineStore({
    id: 'register',
    state: () => ({
        name: "",
        email : "",
        password : "",
        detail: "",
    }),

    actions: {
        async register(email, password, username) {
            const payload = {
                name: username,
                email: email,
                password: password,
                avatar: "https://picsum.photos/640/640?r=1352"
            }

            await API.post('/users', payload)
            .then((res) => {
                this.detail = res;
                console.log(res);
                router.push('/login');
                toast.success("Register Success");
                // window.location.reload();
            }).catch ((error) => {
                // alert(error);
                console.log(error)
                toast.error("Register Error")
                this.detail = error;
            })
        }
    }
}) 