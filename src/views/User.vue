<template>
  <v-container class="user app-page">
    <h1>User</h1>
    <div class="content flex-column" v-if="user">
      <v-text-field
        v-model="user.userName"
        label="user name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.address"
        label="address"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.workName"
        label="work name"
        required
      ></v-text-field>
        <v-text-field
        v-model="user.workTitle"
        label="work title"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.workAddress1"
        label="workAddress1"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.workAddress2"
        label="workAddress2"
        required
      ></v-text-field>
      <v-text-field v-model="user.phone" label="phone" required></v-text-field>
      <v-select :items="imgs" label="image" v-model="user.img"> </v-select>

      <!--<v-menu offset-y>-->
        <!--<template v-slot:activator="{ on }">-->
          <!--<v-btn color="primary" dark v-on="on">-->
            <!--Select Image-->
          <!--</v-btn>-->
        <!--</template>-->
        <!--<v-list>-->
          <!--<v-list-tile-->
            <!--v-for="(item, index) in imgs"-->
            <!--:key="index"-->
            <!--@click="selectImg(index)"-->
          <!--&gt;-->
            <!--<v-list-tile-title>-->
                <!--<div class="img">-->
                    <!--<img :src="item" alt="" />-->
                <!--</div>-->
            <!--</v-list-tile-title>-->
          <!--</v-list-tile>-->
        <!--</v-list>-->
      <!--</v-menu>-->
    </div>
    <v-btn @click="saveMe"> save me! </v-btn>
    <div class="img">
      <img :src="user.img" alt="" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "User",
  props: {
    id: { type: String }
  },
  data: () => ({
    user: {
      _id: null,
      img: "",
      workTitle: "",
      userName: "",
      address: "",
      workName: "",
      workAddress1: "",
      workAddress2: "",
      phone: ""
    },
    imgs: [
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660008/usnavwmrebxhuvtmemwp.jpg",
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660016/wqahmmfnwsm4eiokewng.jpg",
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660021/sfuzakzlydzmnstvrgap.jpg",
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660025/cvjjwsxjxzzepblr43u6.jpg",
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660032/yyowugi1usjcg4qjp6ud.jpg",
      "https://res.cloudinary.com/ilanbeyos/image/upload/v1559660038/j2nfbuwlozbt1mmqjluh.jpg"
    ]
  }),
  async created() {
    if (!this.isNew) {
     this.user = await this.getUser();
    }
  },
  methods: {
    selectImg(index){
      this.user.img = this.imgs[index]
    },
    async dispatchEvent(actionStr, data) {
      try {
        this.$loading(true);
        return await this.$store.dispatch(actionStr, data);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async saveMe() {
      if (this.isNew) {
        await this.dispatchEvent("createUser", this.user);
      } else {
        await this.dispatchEvent("editUser", this.user);
      }
      this.$router.push({name:'Users'})
    },
    async getUser() {
      return await this.dispatchEvent("getUser", this.id);
    }
  },
  computed: {
    users() {
      return this.$store.getters["users"];
    },
    isNew() {
      return this.id === "new";
    }
  }
};
</script>

<style scoped lang="scss">
.user {
}
</style>
