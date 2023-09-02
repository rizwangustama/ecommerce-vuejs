<template>
  <section
    class="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-44 z-10 relative">
      <a href="#"
        class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
        <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span
          class="text-sm font-medium">Jumbotron component was launched! See what's new</span>
        <svg class="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        </svg>
      </a>
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        We invest in the world’s potential</h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Here at Flowbite
        we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic
        growth.</p>
    </div>
    <div class="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0">
    </div>
  </section>
  <main>

    <section class="bg-white dark:bg-gray-900 container">
      <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <h2
          class="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
          You’ll be in good company
        </h2>
        <Vue3Marquee :gradient="true" duration="10" gradient-length="30%">
          <div class="flex gap-[100px] mr-[100px]">
            <IconAinbn />
            <IconGoogle />
            <IconMicrosoft />
            <IconSportify />
            <IconMailchim />
            <IconMashable />
          </div>
        </Vue3Marquee>
      </div>
    </section>

    <!-- Search -->
    <section class="container pt-20">
      <div class="flex flex-row gap-6 items-end">
          <div class="w-2/12">
            <label for="min_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Price</label>
            <input @input="getProductAll" v-model="search.min_price" type="number" id="min_price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Minimal Price" required>
          </div>
          <div class="w-2/12">
            <label for="max_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Price</label>
            <input @input="getProductAll" type="number" v-model="search.max_price" id="max_price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Maximal Price" required>
          </div>
          <div class="w-3/12">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Price</label>
            <select @change="getProductAll" v-model="search.category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected disabled>Category</option>
              <option v-for="(item, index) in categoryList" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <form class="w-5/12">
            <label for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input @input="getProductAll" v-model="search.title" type="search" id="default-search"
                class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products..." required>
            </div>
          </form>
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
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ data.title }}</h5>
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
                  class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{ data.category.name }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ this.formatPrice(data.price) }}</span>
                <Button color="blue" @click="addToCart(data)">Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>

        <div v-show="products.length < 1" class="border border-gray-100 py-20">
          <h1 class="text-2xl font-semibold text-center text-gray-500">Not Found Products</h1>
        </div>

        <div class="grid grid-cols-1 justify-items-center mt-10">
          <button v-if="products.length >= 12" @click="nextPage" type="button"
            class="w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Next
            Pages</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product';
import { useLoginStore } from '../stores/login';
import { Button, Input } from 'flowbite-vue';
import { useToast } from "vue-toastification";
import { Vue3Marquee } from 'vue3-marquee';
import IconAinbn from '../components/icons/IconAinbn.vue';
import IconGoogle from '../components/icons/IconGoogle.vue';
import IconMicrosoft from '../components/icons/IconMicrosoft.vue';
import IconSportify from '../components/icons/IconSportify.vue';
import IconMailchim from '../components/icons/IconMailchim.vue';
import IconMashable from '../components/icons/IconMashable.vue'

export default {
  name: 'home',
  components: {
    Button,
    Vue3Marquee,
    IconAinbn, IconGoogle, IconMicrosoft, IconSportify, IconMailchim, IconMashable
  },
  data() {
    const { products, error, loading, cart, categoryList } = storeToRefs(useProductStore());
    const { detailUser } = useLoginStore();
    const toast = useToast()
    return {
      products,
      error,
      loading,
      cart,
      detailUser,
      listProduct: [],
      offset: 0,
      categoryList,
      search: {
        category: '',
        title: '',
        max_price: '',
        min_price: ''
      },
      isActive: false,
      toast,
    }
  },

  watch: {
    filterCategory: 'getProduct'
  },
  async mounted() {
    await this.getProductAll();
    this.listProduct = this.products;
  },
  methods: {
    async getProductAll() {
      const offset = this.offset;
      const title = this.search.title;
      const { getProduct, getProductByCategory, getCategory } = await useProductStore();
      await getProductByCategory(this.search.category, this.search.title, this.search.max_price, this.search.min_price, this.offset);
      await getCategory();
    },
    showDropdown() {
      this.isActive = !this.isActive;
    },
    nextPage() {
      this.offset += 12;
      this.getProductAll();
      this.listProduct.push(...this.products);
    },
    view(id) {
      this.$router.push('detail-product/' + id);
    },
    addToCart(data) {
      const { addToCart } = useProductStore();
      addToCart(data);
      this.toast.success("Added to shopping cart");
    }
  },
}
</script>
