<template>
  <div>
    <el-card>
      <!-- element组件上传图片 -->
      <h1 style="font-size: 24px">支持拖拽</h1>
      <div class="top">Element UI自带上传组件</div>
      <el-upload class="upload-demo" drag action="/api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <!-- vue-image-crop-upload图片上传 -->
      <h1 class="caijian">支持裁剪</h1>
      <div class="top">vue-image-crop-upload</div>
      <div style="margin-top: 30px">
        <el-button type="primary" class="btn" @click="toggleShow">上传图片</el-button>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="200"
          :height="200"
          img-format="png"
          url="/api/upload"
          field="file"
        ></my-upload>
        <div class="imgs">
          <div v-for="(item, index) in imgDataUrl" :key="index">
            <img :src="item" alt />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      show: false,
      imgDataUrl: []
    };
  },
  components: {
    myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      // console.log("-------- crop success --------");
      this.imgDataUrl.push(imgDataUrl);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      // console.log("-------- upload success --------");
      // console.log(jsonData);
      // console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      // console.log("-------- upload fail --------");
      // console.log(status);
      // console.log("field: " + field);
    }
  },
  mounted() {},
  created() {
    this.cropImg = this.defaultSrc;
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 90%;
  height: 60px;
  line-height: 60px;
  background: #eee;
  padding-left: 30px;
  margin: 20px 0;
}
.caijian {
  font-size: 24px;
  margin: 30px 0;
}
.imgs {
  display: flex;
  align-items: center;
  margin-top: 20px;
  div {
    margin-left: 15px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>