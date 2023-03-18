export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      APP_URL: process.env.APP_URL,
      API_ENDPOINT: process.env.API_ENDPOINT,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
  },
  css: [
    "@/styles/main.scss"
  ],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-svgo', '@nuxt/image-edge'],
  googleFonts: {
    families: {
      Poppins: true,
    }
  }
})
