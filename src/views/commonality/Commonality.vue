<template>
  <!-- 公共主页 -->
  <div class="el__header">
    <el-container>
      <el-header>
        <div class="head">
          <div class="head-left">欢迎{{ user.username }}来到沫白后台系统</div>
          <div class="head-right">{{hour | greetings}},亲爱的{{ user.username }}&nbsp;您的登录时间是：{{time}}</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              @click="go(item.path)"
              :index="item.path"
              v-for="(item,index) in asidelist"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive include="Markdown">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asidelist: [
        {
          title: "首页",
          icon: "el-icon-location",
          path: "/"
        },
        {
          title: "分页表格",
          icon: "el-icon-menu",
          path: "/table"
        },
        {
          title: "标签页",
          icon: "el-icon-document",
          path: "/tag"
        },
        {
          title: "图片上传",
          icon: "el-icon-check",
          path: "/upload"
        },
        {
          title: "已发表",
          icon: "el-icon-folder-checked",
          path: "/publish"
        },
        {
          title: "发布文章",
          icon: "el-icon-message",
          path: "/markdown"
        },
        {
          title: "统计",
          icon: "el-icon-help",
          path: "/statistics"
        },
        {
          title: "导出Excel",
          icon: "el-icon-download",
          path: "/excel"
        },
        {
          title: "退出系统",
          icon: "el-icon-delete",
          path: "/logout"
        }
      ],
      user: "",
      time: "",
      hour: ""
    };
  },
  components: {},
  methods: {
    go(data) {
      this.$router.push(data);
    }
  },
  mounted() {
    // this.nowtime = new Date();
    this.user = JSON.parse(localStorage.getItem("adminUser"));
    this.time = this.$dayjs(this.user.date).format(
      "YYYY年MM月DD日HH时mm分ss秒"
    );
    this.hour = this.$dayjs().format("HH");
    // console.log(this.user.username );
    // console.log(this.user);
    // console.log(this.time);
    // console.log(this.hour);
  },
  watch: {},
  computed: {},
  filters: {
    greetings(data) {
      if (data >= 6 && data < 12) {
        return "早上好";
      } else if (data >= 12 && data < 14) {
        return "中午好";
      } else if (data >= 14 && data < 18) {
        return "下午好";
      } else if (data >= 18 && data < 24) {
        return "晚上好";
      } else {
        return "该睡觉咯";
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.head {
  color: #fff;
  display: flex;
  justify-content: space-between;
  .head-left {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
  .head-right {
    height: 60px;
    line-height: 60px;
    padding-right: 20px;
  }
}
</style>
