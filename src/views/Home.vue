<template>
  <div class="home">
    <div class="top">
      <!-- 人的数据 -->
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/image/people.svg" alt />
          </div>
          <div class="desc">
            <div class="title">New Visits</div>
            <div class="num">
              <countTo :startVal="startVal" :endVal="datalist.visits" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 信息的数据 -->
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/image/news.svg" alt />
          </div>
          <div class="desc">
            <div class="title">Messages</div>
            <div class="num">
              <countTo :startVal="startVal" :endVal="datalist.messages" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 钱的数据 -->
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/image/money.svg" alt />
          </div>
          <div class="desc">
            <div class="title">Purchases</div>
            <div class="num">
              <countTo :startVal="startVal" :endVal="datalist.purchases" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 购物数据 -->
      <el-card>
        <div class="content">
          <div class="img">
            <img src="../assets/image/car.svg" alt />
          </div>
          <div class="desc">
            <div class="title">Shopping</div>
            <div class="num">
              <countTo :startVal="startVal" :endVal="datalist.shopping" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 折线图 -->
    <div class="chats">
      <el-card>
        <ve-line :data="charts" :colors="colors"></ve-line>
      </el-card>
    </div>

    <div class="chat">
      <el-card>
        <ve-radar :data="radarChat"></ve-radar>
      </el-card>
      <el-card>
        <ve-ring :data="ringChat" :settings="chartSettings"></ve-ring>
      </el-card>
      <el-card>
        <ve-histogram :data="charts"></ve-histogram>
      </el-card>
    </div>

    <div class="foot">
      <!-- 订单表 -->
      <el-card class="table">
        <el-table :data="orderData" style="width: 100%">
          <el-table-column prop="num" label="Order_No" width="300" align="center"></el-table-column>
          <el-table-column prop="price" label="Price" width="140" align="center"></el-table-column>
          <el-table-column prop="status" label="Status" align="center">
            <template slot-scope="scope">
              <div>
                <el-tag type="danger" v-if="scope.row.status === 0">pending</el-tag>
                <el-tag type="success" v-if="scope.row.status === 1">success</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- todolist -->
      <el-card>
        <div class="todo-container">
          <div class="todo-wrap">
            <div class="top">
              <div class="top-left" @click="checkAll"></div>
              <div class="top-right">Todo List</div>
            </div>
            <div class="middle">
              <div v-for="(item,index) in show(num)" :key="index">
                <div class="dv1" @click="item.checked=!item.checked">
                  <img v-if="item.checked" src="../assets/checked.png" alt />
                </div>
                <div class="dv2">{{item.name}}</div>
                <div class="dv3" @click="clickDelete(item)">
                  <img src="../assets/wrong.png" alt class="del" />
                </div>
              </div>
              <div v-if="show(num).length === 0">暂无数据</div>
            </div>
            <div class="bottom">
              <div class="count">{{ sum }}item left</div>
              <div :class="{'bor':num === 0}" @click="show(0)">All</div>
              <div :class="{'bor':num === 1}" @click="show(1)">Active</div>
              <div :class="{'bor':num === 2}" @click="show(2)">Complete</div>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 进度条 -->
      <el-card>
        <img src="../assets/image/s1.png" alt style="width: 100%" />
        <div class="progress-bar">
          <div v-for="(item,index) in progressList" :key="index" class="progress">
            <div>{{item.name}}</div>
            <el-progress v-if='item.progress === 1' :percentage="(item.progress)*100" status="success"></el-progress>
            <el-progress v-else-if="item.progress === 0" :percentage="(item.progress)*100" status="exception"></el-progress>
            <el-progress v-else :percentage="(item.progress)*100"></el-progress>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  data() {
    return {
      datalist: [],
      startVal: 0,
      colors: ["#3C88F7", "#FD1A5E"],
      charts: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      radarChat: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "marketing",
          "delelopmer"
        ],
        rows: []
      },
      ringChat: {
        columns: ["name", "data"],
        rows: []
      },
      chartSettings: {
        roseType: "radius"
      },
      orderData: [],
      list: [],
      num: 0,
      checkall: false,
      progressList: []
    };
  },
  components: {
    countTo
  },
  methods: {
    checkAll() {
      if (this.num === 0) {
        this.checkall = !this.checkall;
        this.list.map(item => {
          item.checked = this.checkall;
        });
      }
    },
    clickDelete(item0) {
      this.list = this.list.filter(item => {
        return item !== item0;
      });
    },
    show(x) {
      this.num = x;
      if (x === 0) {
        return this.list;
      } else if (x === 1) {
        return this.list.filter(item => !item.checked);
      } else if (x === 2) {
        return this.list.filter(item => item.checked);
      }
    },
    //  计数器
    getData() {
      this.$axios.req("/homeData").then(res => {
        if (res.code === 0) {
          this.datalist = res.data;
          // console.log(this.datalist);
        }
      });
    },
    // 折线图: /homeChat (get请求)
    //  柱状图: /homeChat (get请求)
    getChat() {
      this.$axios.req("/homeChat").then(res => {
        if (res.code === 0) {
          this.charts.rows = res.data;
          // console.log(this.charts.rows);
        }
      });
    },
    // - 雷达图: /radarChat (get请求)
    getRadarChat() {
      this.$axios.req("/radarChat ").then(res => {
        if (res.code === 0) {
          this.radarChat.rows = res.data;
          // console.log(this.charts.rows);
        }
      });
    },
    // - 饼图: /ringChat (get请求)
    getRingChat() {
      this.$axios.req("/ringChat ").then(res => {
        if (res.code === 0) {
          this.ringChat.rows = res.data;
          // console.log(this.charts.rows);
        }
      });
    },
    // - 订单: /orderData (get请求)
    getOrderData() {
      this.$axios.req("/orderData").then(res => {
        if (res.code === 0) {
          res.data.map(item => {
            item.price = "￥" + item.price;
          });
          this.orderData = res.data;
          // console.log(this.charts.rows);
        }
      });
    },
    // - todolist: /todoList (get请求)
    getToDoList() {
      this.$axios.req("/todoList").then(res => {
        if (res.code === 0) {
          this.list = res.data;
          // console.log(this.list );
        }
      });
    },
    // - 进度条: /progress (get请求)
    getProgressList() {
      this.$axios.req("/progress").then(res => {
        if (res.code === 0) {
          this.progressList = res.data;
          // console.log(this.progressList);
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.getChat();
    this.getRadarChat();
    this.getRingChat();
    this.getOrderData();
    this.getToDoList();
    this.show(0);
    this.getProgressList();
  },
  watch: {},
  computed: {
    sum() {
      return this.list.filter(item => !item.checked).length;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.home {
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    .el-card {
      flex: 1;
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .img {
          position: relative;
          left: 20px;
        }

        .desc {
          position: relative;
          right: 20px;
          cursor: pointer;

          .title {
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
            margin-bottom: 12px;
          }

          .num {
            font-size: 20px;
            color: #666;
            font-weight: 700;
          }
        }
      }
    }
  }
  .chats {
    margin-top: 50px;
    width: 100%;
  }
  .chat {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;

    .el-card {
      flex: 1;
      margin-left: 15px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
  .foot {
    margin-top: 30px;
    display: flex;
    .el-card {
      flex: 1;
      margin-left: 15px;

      &:first-child {
        margin-left: 0;
        flex: 2;
      }
    }
    .progress-bar{
      margin-top:30px; 
      .progress{
        margin: 10px 0;
      }
    }
  }
}

.todo-container {
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.todo-wrap {
  .top {
    // height: 50px;
    border-bottom: 1px solid #ddd;
    display: flex;
    position: relative;

    .top-left {
      width: 30px;
      height: 30px;
      background-image: url("../assets/downarrow.png");
    }

    .top-right {
      position: absolute;
      right: 0;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #1d1b1d;
    }
  }

  .middle {
    height: 400px;
    overflow: auto;

    div {
      display: flex;
      margin-top: 10px;

      &:hover {
        .del {
          display: block;
        }
      }

      .dv1 {
        width: 52px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #5f585f;
        margin: 10px 0;
        margin-right: 20px;
      }

      .dv2 {
        width: 280px;
        height: 44px;
        line-height: 35px;
      }

      .dv3 {
        width: 32px;
        height: 32px;

        img {
          display: none;
        }
      }
    }
  }

  .bottom {
    border-top: 1px solid #ddd;
    height: 50px;
    display: flex;
    font-size: 13px;
    div {
      width: 85px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: relative;
      top: 10px;
    }
  }
}

.bor {
  border-radius: 5px;
  background-color: skyblue;
}
</style>