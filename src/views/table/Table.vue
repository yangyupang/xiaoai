<template>
  <div>
    <!-- 搜索 -->
    <div style="margin: 20px 0;">
      <el-input placeholder="请输入您想搜索的商品" style="width: 300px" v-model="searchValue" clearable></el-input>
    </div>
    <el-table
      :data="tableDataList.slice((currentPage-1)*pageSize,pageSize*currentPage)"
      style="width: 100%"
    >
      <el-table-column prop="NAME" label="名称"></el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号"></el-table-column>
      <el-table-column prop="ORI_PRICE" label="原价"></el-table-column>
      <el-table-column prop="PRESENT_PRICE" label="现价"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" >修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div></div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataList.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataList: [],
      //分页时显示的第几页
      currentPage: 1,
      //每一页有多少条数据
      pageSize: 10,
      searchValue: ""
    };
  },
  components: {},
  methods: {
    //每一页有多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    //当前是第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(val);
    },
    getTableData() {
      this.$axios.req("/tableData").then(res => {
        if (res.code === 0) {
          this.tableDataList = res.data;
          console.log(this.tableDataList);
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>