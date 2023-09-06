<template>
    <div class="container py-[120px]">
        <div class="flex gap-10">
            <div class="w-7/12">
                <div class="grid gap-4">
                    <div>
                        <img class="h-[450px] w-full object-cover rounded-lg" :src="thumbnail" alt="">
                    </div>
                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="(data, index) in detail.images" :key="index" @click="getThumbnail(data)">
                            <img class="h-auto max-w-full rounded-lg" :src="data" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-5/12 flex flex-col gap-5 sticky top-0">
                <h1 class="text-4xl font-bold">{{ detail.title }}</h1>
                <p>{{ detail.description }}</p>
                <span
                    class="bg-blue-100 w-fit text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    v-if="detail.category">{{ detail.category.name }}</span>

                <div class="border-t-2">
                    <div class="flex flex-row py-5">
                        <div class="flex-1 border-r-2 pl-5">
                            <h2 class="text-3xl font-bold">Price {{ this.formatPrice(detail.price) }}</h2>
                            <h2>Total Stok : {{ stok }}</h2>
                            <h2>Total {{ this.formatPrice(totalPrice) }}</h2>
                        </div>
                        <div class="flex-1 flex items-center">
                            <div class="flex flex-row items-center px-5">
                                <Button color="alternative" class="h-fit w-fit flex-1" @click="removeTotal">-</Button>
                                <input v-model="total" size="xl" class="text-center h-fit py-2 bg-white" :disabled="true" />
                                <Button color="alternative" class="h-fit w-fit" @click="addTotal">+</Button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-6 border-t-2 pt-10">
                        <Button :disabled="totalPrice == 0" size="xl" @click="addToCart(detail)" color="blue"
                            outline>Buy</Button>
                        <Button @click="addToCart(detail)" color="blue">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
        <section class="py-40">
            <h1 class="text-4xl font-bold mb-10">List Product Popular</h1>
            <div class="grid grid-cols-4 gap-3 ">
                <!-- Card -->
                <div v-for="(data, index) in products" class="shadow-lg flex flex-col justify-between rounded-xl">
                    <a class="cursor-pointer p-5 rounded-t-xl " @click="view(data.id)">
                        <img class="overflow-hidden rounded-lg h-[250px] w-full object-cover" :src="data.images[0]"
                            alt="product image" />
                    </a>
                    <div class="px-5 pb-5">
                        <a class="cursor-pointer" @click="view(data.id)">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ data.title }}
                            </h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <span
                                class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{
                                    data.category.name }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ this.formatPrice(data.price)
                            }}</span>
                            <Button color="blue" @click="addToCart(data)">{{ $t('label.add_to_cart') }}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import { useProductStore } from '../stores/product';
import { storeToRefs } from 'pinia';
import { Button, Input } from 'flowbite-vue'
export default {
    name: 'Detail Product',
    components: {
        Button,
        Input
    },
    data() {
        const { error, loading, detail, products } = storeToRefs(useProductStore());
        return {
            id: this.$route.params.id,
            loading,
            error,
            detail,
            products,
            thumbnail: "",
            total: 1,

        }
    },
    computed: {
        totalPrice() {
            return this.detail.price * this.total;
        },
        stok() {
            return Math.floor(Math.random() * 100 + 1)
        }
    },
    async mounted() {
        await this.getDetail(this.id);
        if (this.thumbnail == '') {
            this.thumbnail = this.detail.images[0]
        }
    },
    methods: {
        async getDetail(id) {
            const { getDetailProduct, getProduct } = await useProductStore();
            await getDetailProduct(id);
            await getProduct(8);
        },
        productPopuler() {
            this.productPopuler = this.products.slice(1, 6);
        },
        addToCart(data) {
            const { addToCart } = useProductStore();
            addToCart(data);
        },
        getThumbnail(data) {
            const images = data;
            console.log(images)
            this.thumbnail = images;
        },
        addTotal() {
            this.total++;
            if (this.total > this.stok) {
                this.total = this.stok;
            }
        },
        removeTotal() {
            this.total--;
            if (this.total < 1) {
                this.total = 0;
            }
        }
    },
}
</script>