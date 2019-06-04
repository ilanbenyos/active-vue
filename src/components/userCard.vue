<template>
  <div class="card d-flex">
    <div class="img flex-column">
      <img :src="user.img" alt="" />
      <div class="work-title">{{ user.workTitle }}</div>
    </div>
    <div class="content flex-column">
      <div class="user-name">{{ user.userName }}</div>
      <div class="address">{{ user.address }}</div>
      <div class="work font-weight-bold">{{ user.work }}</div>
      <div class="work-adress1">{{ user.workAdress1 }}</div>
      <div class="work-adress2">{{ user.workAdress2 }}</div>
      <div class="phone">{{ user.phone }}</div>
    </div>
    <div class="actions ">
      <div class="icon edit rol-brn" @click="editMe"></div>
      <div class="icon delete rol-btn" @click="deleteMe"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userCard",
  props: {
    type: Object,
    required: true
  },
  methods: {
    editMe() {},
    deleteMe() {}
  }
};
</script>

<style scoped lang="scss">
.card {
  .actions {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
    .icon{
        width:1rem;
        height:1rem;
    }
}
</style>
