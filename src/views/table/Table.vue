<template>
  <!-- 分页表格页 -->
  <div>
    <!-- 搜索 -->
    <div style="margin: 20px 0;">
      <el-input placeholder="请输入您想搜索的商品" style="width: 300px" v-model="searchValue" clearable></el-input>
    </div>
    <el-table
      :data="tableDataList.slice((currentPage-1)*pageSize,pageSize*currentPage)"
      style="width: 100%"
    >
      <!-- 数据展示的表头 名称 编号 原价 现价 -->
      <el-table-column prop="NAME" label="名称"></el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号"></el-table-column>
      <el-table-column prop="ORI_PRICE" label="原价"></el-table-column>
      <el-table-column prop="PRESENT_PRICE" label="现价"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="alterGoods(scope.row)" type="primary" icon="el-icon-edit">修改</el-button>
          <el-button
            @click="deleteGoods(scope.$index, tableDataList)"
            type="danger"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :show-close="false"
      :append-to-body="true"
      :modal-append-to-body="false"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <!-- 修改操作的弹出框 -->
      <div>
        <div class="item">
          <div class="name">名称:</div>
          <el-input v-model="currentGood.NAME"></el-input>
        </div>
        <div class="item">
          <div class="name">原价:</div>
          <el-input v-model.number="currentGood.ORI_PRICE"></el-input>
        </div>
        <div class="item">
          <div class="name">现价:</div>
          <el-input v-model.number="currentGood.PRESENT_PRICE"></el-input>
        </div>
      </div>
      <!-- 点击取消或确定修改 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </span>
    </el-dialog>
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
      searchValue: "",
      dialogVisible: false,
      currentGood: {}
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
    //点击展示修改窗口
    alterGoods(row) {
      // console.log(row);
      // 将点击项的数据赋值给currentGood
      this.currentGood = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    sureEdit() {
      // 确认修改并隐藏修改窗口
      if (this.currentGood.NAME === "") {
        this.currentGood.NAME = "空";
      }
      if (this.currentGood.ORI_PRICE === "") {
        this.currentGood.ORI_PRICE = 0;
      }
      if (this.currentGood.PRESENT_PRICE === "") {
        this.currentGood.PRESENT_PRICE = 0;
      }
      if (
        String(Number(this.currentGood.ORI_PRICE)) !== "NaN" &&
        String(Number(this.currentGood.PRESENT_PRICE)) !== "NaN"
      ) {
        // console.log(this.currentGood.ORI_PRICE);
        this.tableDataList = this.tableDataList.map(item => {
          // console.log(item);
          return this.currentGood.GOODS_SERIAL_NUMBER ===
            item.GOODS_SERIAL_NUMBER
            ? this.currentGood
            : item;
        });
        this.dialogVisible = false;
        sessionStorage.setItem("tableDataList", JSON.stringify(this.tableDataList));
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        this.$message.error("价格要是数字呦");
      }
    },
    deleteGoods(index, rows) {
      // 删除当前列
      rows.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    // 获取展示数据
    getTableData() {
      this.$axios.req("/tableData").then(res => {
        if (res.code === 0) {
          this.tableDataList = res.data;
          // console.log(this.tableDataList);
          sessionStorage.setItem("tableDataList", JSON.stringify(res.data));
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  },
  watch: {
    //模糊搜索
    searchValue(val) {
      this.$axios.req("/tableData").then(res => {
        this.tableDataList = res.data.filter(item => {
          return JSON.stringify(
            item.NAME +
              item.GOODS_SERIAL_NUMBER +
              item.ORI_PRICE +
              item.PRESENT_PRICE
          ).includes(val);
        });
      });
    }
  },
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.item {
  display: flex;
  align-items: center;
  margin: 20px 0;
  .name {
    width: 60px;
  }
}
</style>