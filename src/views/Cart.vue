<template>
    <div class="container py-10">
        <div
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">List Cart</h5>
            </div>
            <div class="flow-root">
                <ul role="list" v-for="(data, index) in cart" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" v-if="data.images" :src="data.images[0]" alt="Neil image">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ data.title }}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {{ data.description }}
                                </p>

                                <p>{{ this.formatPrice(data.price) }}</p>
                            </div>
                            <button @click="showModal(index)" type="button"
                                class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 border-red-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-red-500">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                </svg>
                                <span class="sr-only">Icon description</span>
                            </button>
                        </div>
                    </li>
                </ul>

                <div v-show="cart.length < 1" class="py-10">
                    <h1 class="text-xl font-bold text-center text-gray-500">Listing Cart Not Fould</h1>
                </div>

                <div class="flex items-center justify-between border-t border-gray-300 pt-10">
                    <div>
                        <h1 class="text-2xl font-bold">Total Price : {{ this.formatPrice(total) }}</h1>
                    </div>
                   
                    <div class="flex items-end gap-4">
                        <Button :disabled="total < 1" color="default" size="lg" class="h-fit">Checkout</Button>
                    </div>
                </div>
            </div>
        </div>

        <Modal size="lg" v-if="isShowModal" @close="closeModal">
            <template #body>
                <div class="p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                    <button @click="remove()" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Yes, I'm sure
                    </button>
                    <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>

import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product';
import { Modal, Button, Input } from 'flowbite-vue';
import { useToast } from "vue-toastification";

export default {
    components: {
        Modal,
        Button,
        Input
    },
    data() {
        const { cart } = storeToRefs(useProductStore());
        const toast = useToast();
        return {
            cart,
            isShowModal: false,
            index: '',
            toast
        }
    },

    mounted() {
        console.log(useToast)
    },  

    computed: {
        total() {
            let total = 0;
            for (let i = 0; i < this.cart.length; i++) {
                total += this.cart[i].price;
            }
            return total
        }
    },

    methods: {
        closeModal() {
            this.isShowModal = false
        },
        showModal(index) {
            this.isShowModal = true;
            this.index = index;
        },
        remove() {
            const { removeCart } = useProductStore()
            removeCart(this.index);
            this.isShowModal = false;
        },
        removeAll() {
            const { removeAll } = useProductStore();
            removeAll()
        },
        showInfoToast() {
            this.toast.info("Selamat datan di Dunia lain")
        }
    },

}
</script>