<template>
<!-- 已发表文章页 -->
  <div>
    <div v-if="this.articles.length > 0">
      <div class="block">
        <el-table :data="tableData0" style="width: 100%" border>
          <el-table-column prop="number" type="index" label="#" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
          <el-table-column prop="author" label="作者" width="85" align="center"></el-table-column>
          <el-table-column prop="category" label="类目" width="120" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.category === 'Vue'">Vue</el-tag>
              <el-tag type="success" v-if="scope.row.category === 'React'">React</el-tag>
              <el-tag type="info" v-if="scope.row.category === 'Node.js'">Node.js</el-tag>
              <el-tag type="warning" v-if="scope.row.category === '性能优化'">性能优化</el-tag>
              <el-tag type="danger" v-if="scope.row.category === 'Javascript'">JavaScript</el-tag>
              <el-tag type="success" v-if="scope.row.category === '小程序'">小程序</el-tag>
              <el-tag type="info" v-if="scope.row.category === '工具类'">工具类</el-tag>
              <el-tag type="warning" v-if="scope.row.category === '其他'">其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="来源" width="85" align="center"></el-table-column>
          <el-table-column prop="star" label="重要性" width="155" align="center">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.star"
                disabled
                text-color="#ff9900"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row._id)" type="primary" size="mini">编辑</el-button>
              <el-button @click="delarticle(scope.row._id)" type="danger" size="mini">删除</el-button>
              <el-button @click="check(scope.row._id)" class="delbtn" type="success" size="mini">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 内容层分页组件（element-ui） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40,60]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articles.length"
      ></el-pagination>
    </div>
    <el-card class="box-card" v-else>
      <div>暂无文章，快去发布一篇属于你自己的文章吧！！！</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      pagesize: 10,
      currentPage: 1
    };
  },
  components: {},
  methods: {
    // 获取全部文章
    getAllarticle() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.articles = res.data;
          // console.log(this.articles);
          this.articles.map(item => {
            item.date = this.$dayjs(item.date).format(
              "YYYY年MM月DD日HH时mm分ss秒"
            );
            item.star = Number(item.star);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 以下两个方法为分页组件内置方法
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(val);
      // this.currentPage = Number(val)
    },
    // 删除文章
    delarticle(ida) {
      this.$axios
        .req("/article/delete", { _id: ida })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getAllarticle();
          } else {
            this.$message({
              message: "删除失败！",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑文章
    edit(ide) {
      this.$router.push({ name: "detail", params: { ide: ide } });
    },
    // 查看文章
    check(idc) {
      this.$router.push({ name: "check", params: { idc: idc } });
    }
  },
  mounted() {
    this.getAllarticle();
  },
  watch: {},
  computed: {
    tableData0() {
      return this.articles.slice(
        this.pagesize * (this.currentPage - 1),
        this.pagesize * this.currentPage
      );
    }
  }
};
</script>

<style scoped lang='scss'>
</style>