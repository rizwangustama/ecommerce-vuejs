<template>
    <div>
        <div class="container mt-10">
            <div class="border-2 border-solid py-20 rounded-lg">
                <h1 class="text-center text-3xl font-bold text-gray-600">{{ detailCategory.name }}</h1>
            </div>
        </div>
        <!-- filter -->
        <section class="container">
            <div class="grid grid-cols-2 gap-5">
                <div class="grid grid-cols-2 gap-5 pt-20">
                    <div>
                        <label for="min_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Price</label>
                        <input @input="getProductAll(true)" v-model="search.min_price" type="number" id="min_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Minimal Price" required>
                        <!-- <p class="text-red-500">Erro Tidak boleh memasukan angka lebih dari maxprice</p> -->
                    </div>
                    <div>
                        <label for="max_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Price</label>
                        <input @input="getProductAll(true)" type="number" v-model="search.max_price" id="max_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Maximal Price" required>
                    </div>
                </div>
                <div class="flex items-end">
                    <form class="w-full">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input @input="getProductAll(true)" v-model="search.title" type="search" id="default-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required>
                        </div>
                    </form>
                </div>
                    
            </div>
           
        </section>
        <!-- List Product -->
        <section class="pt-10 pb-[120px]">
            <div class="container">
                <div class="grid grid-cols-4 gap-4">
                    <div v-for="(data, index) in listProduct" class="shadow-lg flex flex-col justify-between rounded-xl">
                        <a class="cursor-pointer p-5 rounded-t-xl " @click="view(data.id)">
                            <img class="overflow-hidden rounded-lg h-[250px] w-full object-cover" :src="data.images[0]"
                                alt="product image" />
                        </a>
                        <div class="px-5 pb-5">
                            <a class="cursor-pointer" @click="view(data.id)">
                                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ data.title
                                }}</h5>
                            </a>
                            <div class="flex items-center mt-2.5 mb-5">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span
                                    class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3" v-if="data.category">{{ data.category.name }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ this.formatPrice(data.price) }}</span>
                                <a @click="addToCart(data)"
                                    class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="products.length < 1" class="border border-gray-100 py-20">
                    <h1 class="text-2xl font-semibold text-center text-gray-500">Not Found Products</h1>
                </div>

                <div class="grid grid-cols-1 justify-items-center mt-10">
                    <button v-if="products.length >= 12" @click="nextPage" type="button"
                        class="w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Next Pages
                    </button>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product';
import { useToast } from 'vue-toastification'
export default {
    data() {
        const { products, detailCategory } = storeToRefs(useProductStore());
        const toast = useToast();
        return {
            products,
            listProduct: [],
            id: this.$route.params.id,
            search: {
                title: '',
                max_price: '',
                min_price: ''
            },
            offset: 0,
            toast,
            detailCategory,
        }
    },
    async mounted() {
        await this.getProductAll();
        this.getDetailCategory()
        if (this.getProductAll()) {
           this.listProduct = this.products;
        };
        
    },
    methods: {
        async getProductAll(option) {
            const { getProductByCategory } = await useProductStore();
            await getProductByCategory(this.id, this.search.title, this.search.max_price, this.search.min_price, this.offset);
            if (option) {
                this.listProduct = this.products;
            }
        },
        nextPage() {
            this.offset += 12;
            this.getProductAll();
            this.listProduct.push(...this.products)
        },
        view(id) {
            this.$router.push('/detail-product/' + id)
        },
        addToCart(data) {
            const { addToCart } = useProductStore();
            addToCart(data);
            this.toast.success("Add to Cart Success");
        },
        getDetailCategory(){
            const { categorySelect } = useProductStore();
            categorySelect(this.id)
        }
    },
}
</script>