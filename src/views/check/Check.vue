<template>
<!-- 文章详情页 -->
  <div>
      <el-button @click="backToalready" type="primary">返回</el-button>
      <h3 class="hs textcenter">{{articlec.title}}</h3>
      <p class="ps textcenter pts">作者:{{articlec.author}}</p>
      <p class="ps textcenter">摘要:{{articlec.abstract}}</p>
      <p class="ps textcenter pt">发布时间:{{articlec.date}}</p>
      <el-card class="box-card textcenter">{{articlec.text}}</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idc: "",
      articlec: {}
    };
  },
  components: {},
  methods: {
    // 根据传过来的id获取相应文章
    getArticlecont() {
      this.$axios
        .req("/article/article", {
          _id: this.idc
        })
        .then(res => {
          if (res.code === 200) {
            this.articlec = res.data;
            this.articlec.date = this.$dayjs(this.articlec.date).format(
              "YYYY年MM月DD日HH时mm分ss秒"
            );
            // console.log(this.articlec);
          } else
            return this.$message({
              message: "请求失败",
              type: "error"
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 返回按钮
    backToalready() {
      this.$router.push("/publish");
    }
  },
  mounted() {
    // 接收从已发布界面跳转过来时的路由
    this.idc = this.$route.params.idc;
    // 跳转至此页面时对相应文章进行获取
    this.getArticlecont();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.hs {
  margin: 5px auto 30px;
}
.ps {
  margin: 0 auto 20px;
}
.pts {
  font-size: 18px;
}
.pt {
  font-size: 12px;
  color: rgb(129, 127, 127);
}
</style>