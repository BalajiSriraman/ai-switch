// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    googleApiKey: process.env.NUXT_GOOGLE_API_KEY,
    openaiToken: process.env.NUXT_OPENAI_TOKEN,
    perplexityToken: process.env.NUXT_PERPLEXITY_TOKEN,
    groqCloudToken: process.env.NUXT_GROQ_CLOUD_TOKEN,
    anthropicToken: process.env.NUXT_ANTHROPIC_TOKEN,
    fireworksApiKey: process.env.NUXT_FIREWORKS_API_KEY,
    deepseekToken: process.env.NUXT_DEEPSEEK_TOKEN,

    // Fauna
    faunaSecret: process.env.NUXT_FAUNA_SECRET,
    faunaEndpoint: process.env.NUXT_FAUNA_ENDPOINT,
  },

  modules: ["@nuxthub/core"],
});