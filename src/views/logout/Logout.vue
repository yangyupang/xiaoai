<template>
  <div>
    <!-- <el-card>    </el-card> -->
    <div class="goodbye">
      <img src="../../assets/image/goodbye.gif" alt />
    </div>
    <el-button class="out" type="primary" @click="out">退出登陆</el-button>


  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    out(){
      localStorage.removeItem('adminUser')
      this.$router.push('/login')
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.goodbye {
  margin-left: 40%;
  margin-top: 10%;
}
.out {
  margin-left: 46%;
  margin-top: 5%;
}
</style>