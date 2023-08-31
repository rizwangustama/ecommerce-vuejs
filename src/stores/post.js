import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: [],
        post: null,
        loading: false,
        error: null
    }),
    actions: {
        async fetchPosts() {
            this.posts = [];
            this.loading = true;
            try {
                // this.posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
                // .then((response) => response.json()) 
                const res =  await axios.get('https://jsonplaceholder.typicode.com/posts');
                this.posts = res.data;
            } catch (error) {
                
            }
        },
        async fetchPost(id) {
            this.post = null
            this.loading = true
            try {
            //   this.post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            //   .then((response) => response.json());
              const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
              this.post = res.data;
            } catch (error) {
              this.error = error
            } finally {
              this.loading = false
            }
        }
    }
})