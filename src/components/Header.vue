<template>
    <section class="sticky top-3 z-40 w-full mt-3">
    <header class="container">
        <nav class="bg-white rounded-lg shadow border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="/home" class="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div class="flex items-center lg:order-2 gap-5">
                    <div class="relative" @click="goToCart">
                        <svg class="w-5 h-5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                        </svg>
                        <span class="sr-only">Notifications</span>
                        <div v-if="totalCart >= 1" class="absolute inline-flex items-center justify-center w-5 h-5 text-[8px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-3 dark:border-gray-900">{{ totalCart }}</div>
                    </div>

                    <div @click="showProfile" class="relative">
                        <Avatar size="sm" status="online" :img="user.avatar" rounded/>
                    </div>
                   
                    <Button color="default" @click="changeLanguage(!changeBahasa ? 'fr': 'en')">{{ changeBahasa ? 'Indonesia' : 'English'}}</Button>
                    <!-- <Button color="alternative" v-else @click="changeLanguage('fr')">Indonesia</Button> -->
                    <Button @click="logout" class="hover:text-black" color="alternative">
                        Logout
                    </Button>
                  
                    <button data-collapse-toggle="mobile-menu-2" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <RouterLink to="/home"
                                class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                aria-current="page">{{ $t('label.home') }}
                            </RouterLink>
                        </li>
                        <li id="category">
                            <a class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{{ $t('label.category') }}</a> 

                            <div id="categoryHover" class="z-10 absolute top-0 pt-[80px]">
                                <div  class="top-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                        <li v-for="(item , index) in categoryList">
                                            <a @click="goToCategori(item.id, item.name)" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ item.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li>
                            <a href="#"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{{ $t('label.features') }}</a>
                        </li>
                        <li>
                            <a href="/ourteam"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{{ $t('label.team') }}</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{{ $t('label.contact') }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <Modal size="lg" v-if="isShowModal" @close="closeModal">
            <template #header>
                <div class="flex items-center text-lg">
                Information Profile
                </div>
            </template>
            <template #body>
                <div class="flex flex-col items-center gap-5">
                    <Avatar size="xl" rounded :img="temp_user.avatar"/>
                </div>
                <div size="sm" class="flex flex-col gap-2.5 mt-10">
                    <Input disabled v-model="temp_user.name" label="Full Name"/>
                    <Input disabled v-model="temp_user.email" label="Email"/>
                    <Input disabled v-model="temp_user.role" label="Role Bussiness" />
                    <Input type="password" disabled label="Password" placeholder="••••••••"/>
                </div>
               
            </template>
            <template #footer>
                <div class="flex justify-between">
                <button @click="closeModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cencel
                </button>
                <Button disabled @click="closeModal">
                    Save
                </Button>
                </div>
            </template>
    </Modal>
</section>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product'
import { useProfileStore } from '../stores/profile';
import { useLoginStore } from '../stores/login'
import { Button, Avatar, Modal, Input } from 'flowbite-vue'
import FlagIndonesia from '../components/icons/FlagIndonesia.vue'
export default {
    components: {
        Button,
        Avatar,
        Modal,
        Input,
        FlagIndonesia,
    },

    data() {
        const { cart, categoryList } = storeToRefs(useProductStore()) 
        const { user } = storeToRefs(useProfileStore());
        return {
            cart,
            categoryList,
            user,
            isShowModal: false,
            temp_user: {},
            changeBahasa: false,
        }
    },

    mounted() {
        const { getCategory } = useProductStore();
        const { getUser } = useProfileStore();
        getCategory();
        getUser()
    },
    
    computed: {
        totalCart() {
        return this.cart.length;
        }
    },

    methods: {
        changeLanguage(locale) {
            this.changeBahasa = !this.changeBahasa;
            this.$i18n.locale = locale;
        },
        logout() {
            const { logout } = useLoginStore();
            logout();
        },
        async goToCategori(id, name) {
            await this.$router.push(`/category/${id}`);
            window.location.reload()
            // window.location.href(`/category/${id}`)
        },
        goToCart() {
            this.$router.push('/cart')
        },
        showProfile(){
            this.isShowModal = true;
            this.temp_user = this.user;
        },
        closeModal() {
            this.isShowModal = false;
            this.temp_user = {};
        }
    },
}
</script>

<style>
#category #categoryHover{
    display: none;
}
#category:hover #categoryHover{
    display: block;
}
</style>