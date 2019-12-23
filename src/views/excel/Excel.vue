<template>
<!-- excel导出页 -->
  <div>
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
          <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit">修改</el-button>
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
    <!-- 下载文件 xls csv -->
    <div class="btn">
      <div>
        <download-excel
          class="export-excel-wrapper"
          :data="tableDataList.slice((currentPage-1)*pageSize,pageSize*currentPage)"
          name="filename.xls"
          :fields="json_fields"
        >
          <div>
            <el-button type="primary">导出xls</el-button>
          </div>
        </download-excel>
      </div>
      <div>
        <download-excel
          type="csv"
          class="export-excel-wrapper"
          :data="tableDataList.slice((currentPage-1)*pageSize,pageSize*currentPage)"
          name="filename.csv"
          :fields="json_fields"
        >
          <div>
            <el-button type="danger" class="btn1">导出csv</el-button>
          </div>
        </download-excel>
      </div>
    </div>
  </div>
</template>

<script>
import downloadExcel from "vue-json-excel";

export default {
  data() {
    return {
      // 自主选择要导出的字段，若不指定，默认导出全部数据中心全部字段
       json_fields: {
        名称: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf-8 "
          }
        ]
      ],
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
    // getTableData() {
    //   this.$axios.req("/tableData").then(res => {
    //     if (res.code === 0) {
    //       this.tableDataList = res.data;
    //       // console.log(this.tableDataList);
    //     }
    //   });
    // }
  },
  mounted() {
    // this.getTableData();
    this.tableDataList = JSON.parse(sessionStorage.getItem("tableDataList"));
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.btn {
  margin-top: 20px;
  display: flex;
  .btn1 {
    margin-left: 40px;
  }
}
</style>