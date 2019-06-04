<template>
  <div class="users app-page">
    <h1 class="m-2 text-center" >All users</h1>
    <div class="users row">
      <user-card
        v-for="(user, idx) in users"
        :key="idx"
        class="col-md my-2"
        :user="user"
      >
      </user-card>
    </div>
  </div>
</template>

<script>
import userCard from "../components/userCard";
export default {
  name: "Home",
  components: { userCard },
  data: () => ({}),
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
    async deleteUser(id) {
      await this.dispatchEvent("deleteUser", id);
    }
  },
  computed: {
    users() {
      return this.$store.getters["users"];
    }
  }
};
</script>

<style scoped lang="scss">
.users.app-page {
  @media (min-width: 578px) {
    padding: 1rem;
  }
  @media (min-width: 1200px) {
    padding: 1rem;
  }
}
</style>
