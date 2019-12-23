<template>
<!-- 统计页 -->
  <div class="statistics">
    <!-- 统计头部 -->
    <div class="top">
      <div class="item1 t-item">
        <div class="t-desc">
          <div>今日发布</div>
          <div>{{newCreate}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-finished"></i>
        </div>
      </div>
      <div class="item2 t-item">
        <div class="t-desc">
          <div>原创文章</div>
          <div>{{original}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-tickets"></i>
        </div>
      </div>
      <div class="item3 t-item">
        <div class="t-desc">
          <div>新留言</div>
          <div>{{newComment}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-bell"></i>
        </div>
      </div>
      <div class="item4 t-item">
        <div class="t-desc">
          <div>新消息</div>
          <div>{{newMessage}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-phone-outline"></i>
        </div>
      </div>
    </div>
    <!-- 展示数据 -->
    <div v-if="chartData3.rows.length > 0">
      <div class="content1">
        <!-- 类型 饼状图 -->
        <ve-pie :data="chartData1"></ve-pie>
        <!-- 来源 环图 -->
        <ve-ring :data="chartData2" :settings="chartSettings1"></ve-ring>
      </div>
      <div class="content1">
        <!-- 总量 瀑布图 -->
        <ve-waterfall :data="chartData3"></ve-waterfall>
      </div>
    </div>
    <div v-else>
      <el-card>暂无发布文章数据！</el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "statistics",
  data() {
    return {
      chartSettings1: {
        roseType: "radius"
      },
      // <!-- 类型 饼状图 数据 -->
      chartData1: {
        columns: ["类目", "数量"],
        rows: []
      },
      // <!-- 来源 环图 数据-->
      chartData2: {
        columns: ["来源", "数量"],
        rows: []
      },
      // <!-- 总量 瀑布图 数据-->
      chartData3: {
        columns: ["日期", "数量"],
        rows: []
      },
      newCreate: 0, //今日发布
      original: 0, // 原创文章
      newComment: 0,
      newMessage: 0
    };
  },
  methods: {
    getArticle() {
      this.$axios.req("article/allArticle").then(res => {
        // console.log(res.data);
        res.data.map(item => {
          item.date = this.$dayjs(item.date).format("YYYY-MM-DD");
          // console.log(item.date);
        });
        let chartData1 = [];
        let chartData2 = [];
        let chartData3 = [];
        // lodash.groupBy 处理数组对象按需分组
        // let a = [{id:1,name:'me'},{id:1,name:'you'},{id:2,name:'her'}];
        //this.$lodash.groupBy(a,'id'); //就可以实现按id分组了。

        //获取 类型 饼状图 数据
        let categoryArr = this.$lodash.groupBy(res.data, item => {
          // console.log(item);
          // console.log(item.category);
          return item.category;
        });
        for (let i in categoryArr) {
          chartData1.push({
            类目: i,
            数量: categoryArr[i].length
          });
        }
        //获取 来源 环图 数据
        let sourceArr = this.$lodash.groupBy(res.data, item => {
          // console.log(item.source);
          return item.source;
        });
        for (let i in sourceArr) {
          chartData2.push({
            数量: sourceArr[i].length,
            来源: i
          });
        }
        //获取 总量 瀑布图 数据
        let dateArr = this.$lodash.groupBy(res.data, item => {
          // console.log(item.date);
          return item.date.substring(0, 11);
        });
        for (let i in dateArr) {
          chartData3.push({
            数量: dateArr[i].length,
            日期: i
          });
        }
        // forEach列出数组的每个元素：

        //求出来源中  原创的个数
        chartData2.forEach(item => {
          if (item["来源"] === "原创") {
            this.original = item["数量"];
          }
        });

         //求出总量中  当前日期创建文章个数
        chartData3.forEach(item => {
          let date = this.$dayjs(item.date).format("YYYY-MM-DD");
          let now = this.$dayjs(new Date().getTime()).format("YYYY-MM-DD");
          if (date === now) {
            this.newCreate = item["数量"];
          }
        });
        this.chartData1.rows = chartData1;
        this.chartData2.rows = chartData2;
        this.chartData3.rows = chartData3;
      });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>

<style scoped lang="scss">
.statistics {
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 22px;
    }
    .t-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      color: #fff;
      position: relative;
      .t-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
          margin: 3px 0;
        }
      }
      .icon {
        position: absolute;
        top: 30%;
        right: 10%;
      }
    }
    .item1 {
      background: #7ccabf;
    }
    .item2 {
      background: #e88a87;
    }
    .item3 {
      background: #8375a3;
    }
    .item4 {
      background: #9fcec1;
    }
  }
  .content1 {
    display: flex;
    margin: 30px 0;
    div {
      flex: 1;
    }
  }
}
</style>
