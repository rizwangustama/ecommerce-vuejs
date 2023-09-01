<template>
    <div class="container py-[120px]">
        <div class="flex gap-10">
            <div class="w-7/12">
                <div class="grid gap-4">
                    <div>
                        <img class="h-[450px] w-full object-cover rounded-lg" :src="thumbnail" alt="">
                    </div>
                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="(data, index) in detail.images"  :key="index" @click="getThumbnail(data)">
                            <img class="h-auto max-w-full rounded-lg" :src="data" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-5/12 flex flex-col gap-5 sticky top-0">
                <h1 class="text-4xl font-bold">{{ detail.title }}</h1>
                <p>{{ detail.description }}</p>
                <span class="bg-blue-100 w-fit text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300" v-if="detail.category">{{ detail.category.name }}</span>

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
                                <input v-model="total" size="xl" class="text-center h-fit py-2 bg-white" :disabled="true"/>
                                <Button color="alternative" class="h-fit w-fit" @click="addTotal">+</Button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-6 border-t-2 pt-10">
                        <Button :disabled="totalPrice == 0" size="xl" @click="addToCart(detail)" color="blue" outline>Buy</Button>
                        <Button @click="addToCart(detail)" color="blue">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-3">
            <template v-for="(product, index) in productTop">
                <div class="shadow-md p-4">
                    <h4 class="text-lg font-bold">{{ product.title }}</h4>
                    <p>$ {{ product.price }}</p>
                </div>
            </template>
        </div>
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
        productTop() {
            return this.products.slice(1, 6);
        },
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
            this.thumbnail =  this.detail.images[0]
        }
    },
    methods: {
        async getDetail(id) {
            const { getDetailProduct, getProduct } = await useProductStore();
            await getDetailProduct(id);
            await getProduct();
        },

        addToCart(data) {
            const { addToCart } = useProductStore();
            addToCart(data);
        },
        getThumbnail(data) {
            const images  = data;
            console.log(images)
            this.thumbnail = images;
        },
        addTotal(){
            this.total ++;
            if (this.total > this.stok) {
                this.total = this.stok;
            }
        },
        removeTotal(){
            this.total --;
            if (this.total < 1) {
                this.total = 0;
            }
        }
    },
}
</script>