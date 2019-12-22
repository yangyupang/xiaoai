<template>
  <div>
    <el-form :model="articles" ref="articles" label-width="100px" class="demo-ruleForm">
      <el-form-item class="titles" label="文章标题" prop="articletitle">
        <el-input v-model="articles.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" prop="articleabstract">
        <el-input v-model="articles.abstract"></el-input>
      </el-form-item>
      <div class="articlecont">
        <el-form-item label="作者" prop="author">
          <el-input v-model="articles.author"></el-input>
        </el-form-item>
        <el-form-item label="类目" prop="category">
          <el-select v-model="articles.category" placeholder="请选择类目">
            <el-option label="Vue" value="Vue"></el-option>
            <el-option label="React" value="React"></el-option>
            <el-option label="Node.js" value="Node.js"></el-option>
            <el-option label="性能优化" value="性能优化"></el-option>
            <el-option label="Javascript" value="Javascript"></el-option>
            <el-option label="小程序" value="小程序"></el-option>
            <el-option label="工具类" value="工具类"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="articles.source" placeholder="请选择来源">
            <el-option label="原创" value="原创"></el-option>
            <el-option label="转载" value="转载"></el-option>
            <el-option label="与他人合作" value="与他人合作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" prop="important">
          <el-select v-model="articles.star" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <span class="sps">发布时间</span>
        <el-date-picker
          v-model="articles.date"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </el-form>
    <mavon-editor class="mavons" v-model="articles.text" placeholder="请开始你的表演..." />
    <div class="operation flex">
      <el-button @click="backToap" type="danger">返回</el-button>
      <el-button @click="getnewArticle" type="primary">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ide: "",
      pickerOptions: {
        // 限制时间不超过今天
        disabledDate(time) {
          // console.log(_this.$dayjs(time).format('HH-mm-ss'));
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      articles: {}
    };
  },
  components: {},
  methods: {
    // 更新文章
    getnewArticle() {
      this.$axios
        .req("/article/update", {
          id: this.ide,
          title: this.articles.title,
          abstract: this.articles.abstract,
          author: this.articles.author,
          category: this.articles.category,
          source: this.articles.source,
          star: this.articles.star,
          text: this.articles.text,
          date: this.articles.date
        })
        .then(res => {
          if ((res.success = true)) {
            this.$message({
              message: "更改成功！",
              type: "success"
            });
            this.$router.push("/publish");
            // console.log(res.data);
          } else {
            this.$message({
              message: "更改失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据传过来的id获取相应文章
    getArticlecont() {
      this.$axios
        .req("/article/article", {
          _id: this.ide
        })
        .then(res => {
          if (res.code === 200) {
            this.articles = res.data;
            // console.log(this.articles);
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
    backToap() {
      this.$router.push("/publish");
    }
  },
  mounted() {
    // 接收从已发布界面跳转过来时的路由
    this.ide = this.$route.params.ide;
    // 跳转至此页面时对相应文章进行获取
    this.getArticlecont();
    // console.log(this.$route.querry.ide);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.operation {
  justify-content: space-between;
  width: 12%;
  margin: 20px auto;
}
.demo-ruleForm {
  .titles {
    margin-top: 22px;
  }
  .articlecont {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .sps {
      width: 75px;
      margin-left: 20px;
      font-size: 14px;
      color: #606266;
    }
  }
}
.mavons {
  margin-top: 20px;
}
</style>