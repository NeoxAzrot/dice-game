export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    }
  },
  css: [
    "@/styles/main.scss"
  ],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts']
})
