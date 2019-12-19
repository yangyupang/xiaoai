<template>
  <div>
    <div class="bg">
      <el-card class="log">
        <div slot="header" class="clearfix">
          <span>欢迎来到沫白后台管理</span>
        </div>
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register('ruleForm')">马上注册</el-button>
              <el-button type="primary" @click="login('/login')">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    //用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        let filter = /[\u4E00-\u9FA5]/g;
        if (filter.test(value)) {
          callback(new Error("用户名不能是中文"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    login(data) {
      this.$router.push(data);
    },
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.code === 1) {
                this.$message({
                  type: "error",
                  message: "用户已存在"
                });
                this.ruleForm.username = "";
                this.ruleForm.pass = "";
                return;
              }
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "注册成功"
                });
                this.$router.push("/login");
              }
              if (res.code === 500) {
                this.$message({
                  type: "error",
                  message: "服务器出错啦"
                });
                return;
              }
              // console.log(res);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$message({
            type: "error",
            message: "没满足条件还想注册"
          });
          this.ruleForm.username = "";
          this.ruleForm.pass = "";
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.bg {
  height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(to top right, #e6ddb1, #2edada);
}
.log {
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  left: 35%;
  top: 30%;
  width: 30%;
  box-shadow: 2px 2px 50px 1px rgb(201, 199, 199);
  .clearfix {
    width: 39%;
    margin-left: 115px;
  }
}
</style>