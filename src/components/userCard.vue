<template>
  <div class="user-card card flex-row p-3 col-md-3 col-12 col-lg-3">
    <div class="img-wrapper flex-grow-0">
      <div class="img flex-column111">
        <img :src="user.img" alt="" />
        <div class="work-title text-center">{{ user.workTitle }}</div>
      </div>
    </div>
    <div class="content flex-column px-3">
      <div class="user-name font-weight-bold h5">{{ user.userName }}</div>
      <div class="address">{{ user.address }}</div>
      <div class="work font-weight-bold">{{ user.workName }}</div>
      <div class="work-adress1">{{ user.workAddress1 }}</div>
      <div class="work-adress2">{{ user.workAddress2 }}</div>
      <div class="phone">P:{{ user.phone }}</div>
    </div>
    <div class="actions d-flex flex-row">
      <div class="icon icon-edit rol-brn" @click="editMe" title="edit"></div>
      <div class="icon icon-delete rol-btn" @click="deleteMe" title="delete"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userCard",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    async editMe() {
      await this.$router.push({ name: "User", params: { id: this.user._id } });
    },
    async deleteMe() {
      try {
        this.$loading(true);
        await this.$store.dispatch('deleteUser',this.user._id);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.user-card {
    min-width:25rem;
  .img-wrapper {
    max-width: 140px;
      height: 140px;
  }
  .actions {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .icon {
    width: 15px;
    height: 15px;
  }

}
</style>
