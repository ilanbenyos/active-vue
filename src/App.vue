<template>
  <v-app class="app">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Users' }" class="ml-2">Users</router-link>
      <router-link :to="{ name: 'User', params: { id: 'new' } }" class="ml-2"
        >New User</router-link
      >
      <router-link to="/about" class="ml-2">About Ilan</router-link>
    </v-toolbar>
    <router-view></router-view>
    <transition name="fade">
      <div class="loader w-100 h-100 " v-if="isLoading"></div>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  created() {
    this.$store.dispatch("initUsers");
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
<style lang="scss">
.app {
  .rol-btn {
    cursor: pointer;
  }
    .app-flex{
        display: flex;
    }
  .img {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .app-page {
    height: 90vh;
    margin-top: 5rem;
  }
  .loader {
    z-index: 2;
    background-color: #4e555b;
    opacity: 0.8;
    position: absolute;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .router-link-exact-active.router-link-active {
    color: lightseagreen;
  }
    .icon-delete{
        background: url(assets/sprite.png) 1rem 0;
    }
    .icon-edit{
        background: url(assets/sprite.png) 0 6.2rem;
    }
}
</style>
