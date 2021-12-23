<template>
  <el-container>
    <el-header>
      <!--      顶部-->
      <el-row type="flex" justify="end">
        <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
          <el-dropdown>
  <span class="el-dropdown-link">
    测试菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1">
          <div>
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
<!--      侧栏暂时隐藏-->
<!--     <el-aside>-->
<!--      <h1>aside</h1>-->
<!--     </el-aside>-->
      <el-container class="main-container">
        <el-main>
          <el-row class="blog-row" type="center">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-row>
          <el-row class="blog-row" type="center">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-row>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      currentPage3: 5
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eaecef;
  z-index: 20;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  position: fixed;
  top: 0;
  left: 0;
}

.box-card {
  width: 600px;
  height: 400px;
  margin: auto;
}

.block{
  width: 600px;
  margin: auto;
}

.blog-row{
  padding-top: 30px;
}

.el-main {
  padding: 0;
  margin: 0;
  height: 960px;
  background: cornsilk;
}

.main-container{
  padding-top: 60px;
}

.el-container {
  font-size: .95rem;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.toggle-button, .el-aside {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //间距
  letter-spacing: 0.2em;
  //鼠标移上去展示小手
  cursor: pointer;
}
//.el-aside{
//  width: 50px !important;
//  color: #fff;
//}

</style>
