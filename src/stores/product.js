import { defineStore } from 'pinia'
import axios from 'axios';
import { useToast } from 'vue-toastification'

import API from '../api';

const toast = useToast();

export const useProductStore = defineStore({
    id:'product',
    state: () => ({
        products: [],
        error: null,
        loading: false,
        detail: {},
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        categoryList: [],
        detailCategory: {},
    }),
    actions: {
        async getProduct(setOff, title) {
            this.products = [];
            this.loading = true;
            // const params = {
            //     offset: setOff,
            //     limit: 12,
            //     title: title
            // }
            let getOffset = '';
            let limit = 12;
            let getTitle = '';

            if (setOff) {
                getOffset = `offset=${setOff}`;
            }

            if (title) {
                getTitle = `&title=${title}`;
            }

            // if (setOff) {
            //     const offset = `offset=${setOff}`;
            //     alert("hadeuh")
            // }

            // if (title) {
            //     const setTitle = `&title=${title}`;
            // }

            try {
                const res = await API.get(`/products?${getOffset}&limit=${limit}${getTitle}`);
                this.products = res.data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async getProductByCategory(category, title, max, min, offset) {
            this.products = [];
            this.loading = true;
            let getTitle = '';
            let getMax = '';
            let getMin = '';
            let limit = 12;

            if (title) {
                getTitle = `&title=${title}`;
            }

            if(max) {
                getMax = `&price_max=${max}`;
            }

            if(min) {
                getMin = `&price_min=${min}`
            }
            try {
                const res = await API.get(`/products/?categoryId=${category}${getTitle}${getMin}${getMax}&offset=${offset}&limit=${limit}`);
                this.products = res.data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false
            }
        },
        async getDetailProduct(id) {
            this.loading = true;
            try {
                const res = await API.get(`/products/${id}`);
                this.detail = res.data;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        addToCart(data) {
            this.cart.push(data);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeCart(index) {
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            toast.success("Remove Success")
        },

        removeAll() {
            this.cart = [],
            alert("akan di delete semua")
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        async getCategory() {
            try {
                const res = await API.get(`/categories`)
                this.categoryList = res.data;
            } catch (error) {
                
            }
        },
        async categorySelect(id) {
            try {
                const res = await API.get(`/categories/${id}`);
                await console.log(res);
                this.detailCategory = res.data;
            } catch (error) {
                
            }
           
        }
    }
})