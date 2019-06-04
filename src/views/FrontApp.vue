<template>
  <v-container class="home app-page">
    <h1 @click="$store.dispatch(`backApp/testConnection`)">Front App</h1>

  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({

  }),
  methods: {
    async dispatchEvent(actionStr) {
      try {
        this.$loading(true);
        await this.$store.dispatch(actionStr);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async emptyStore() {
      await this.dispatchEvent("emptyStore");
    },
  },
  computed: {
    wordsObj() {
      return this.$store.getters["wordsObj"];
    },

  }
};
</script>

<style scoped lang="scss">
.home.app-page {

}
</style>
