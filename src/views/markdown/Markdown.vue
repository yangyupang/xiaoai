<template>
<!-- 发布文章页 -->
  <div>
    <div v-if="this.num === 1">
      <div class="markheader">
        <div>
          <el-button @click="look" type="danger" size="mini">查看</el-button>
          <el-button @click=" submitForm('ruleForm')" type="primary" size="mini">发布</el-button>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="titles" label="文章标题" prop="articletitle">
          <el-input v-model="ruleForm.articletitle"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="articleabstract">
          <el-input v-model="ruleForm.articleabstract"></el-input>
        </el-form-item>
        <div class="articlecont">
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择类目">
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
            <el-select v-model="ruleForm.source" placeholder="请选择来源">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" prop="important">
            <el-select v-model="ruleForm.important" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <span class="sps">发布时间</span>
          <el-date-picker
            v-model="ruleForm.times"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </el-form>
      <mavon-editor class="mavons" v-model="value" placeholder="请开始你的表演..." />
    </div>
    <div v-else>
      <div class="markheader">
        <div class="backbox">
          <el-button @click="backToedit" type="primary" size="mini">返回</el-button>
        </div>
      </div>
      <mavon-editor
        class="mavons"
        :value="value"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let _this = this;
    return {
      ruleForm: {
        articletitle: "",
        articleabstract: "",
        author: "",
        category: "",
        source: "",
        important: "",
        times: ""
      },
      rules: {
        articletitle: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          },
          {
            min: 0,
            max: 15,
            message: "文章标题必须在0到15个字符之间",
            trigger: "blur"
          }
        ],
        articleabstract: [
          {
            required: true,
            message: "请输入文章摘要",
            trigger: "blur"
          },
          {
            min: 0,
            max: 30,
            message: "文章摘要必须在0到30个字符之间",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur"
          },
          {
            min: 0,
            max: 10,
            message: "作者名字长度为0到10个字符",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message:'请至少选择一个类目',
            trigger: "change"
          }
        ],
        source: [
          {
            required: true,
            message:'请至少选择一个来源',
            trigger: "change"
          }
        ],
        important: [
          {
            required: true,
            message:'请选择该文章的重要性',
            trigger: "change"
          }
        ]
      },
      pickerOptions: {
        //所选择时间不能超过当前时间
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
      value: "",
      num: 1
    };
  },
  components: {},
  methods: {
    look() {
      this.num = 2;
    },
    backToedit() {
      this.num = 1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 所有内容都满足后 将数据存入数据库
        if (valid) {
          this.$axios
            .req("/article/create", {
              title: this.ruleForm.articletitle,
              abstract: this.ruleForm.articleabstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.important,
              text: this.value,
              date: this.ruleForm.times
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '发布成功',
                  type: "success"
                });
                this.$router.push("/publish");
              } else {
                this.$message({
                  message: res.message._message,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {
    // "ruleForm.times": {
    //   handler(val) {
    //     if (val > new Date()) {
    //       this.ruleForm.times = new Date();
    //       this.$message({
    //         type: "error",
    //         message: "不能超过当前时间!"
    //       });
    //     }
    //   },
    //   deep: true
    // }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.markheader {
  width: 100%;
  height: 30px;
  padding: 10px 0 10px 10px;
  background-color: rgb(133, 245, 133);
  div {
    display: flex;
    float: right;
    width: 122px;
    margin-right: 10px;
  }
  .backbox{
    width: 56px;
  }
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