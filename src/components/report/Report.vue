<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
      <!--      为Echarts准备一个具备大小（宽度）的Dom-->
      <el-row >
        <el-col :span="11">
          <el-card>
          <div id="main" style="width: 550px;height: 400px"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card >
            <div id="main2" style="width: 550px;height: 400px"></div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
// 1.导入echarts
import * as echarts from 'echarts'
import _ from 'lodash'

export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      options2: {
        title: {
          text: '折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  created() {
  },
  // 2.此时页面上的元素已经被渲染完毕了
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'))
    const myChart2 = echarts.init(document.getElementById('main2'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      this.$message.error('获取折线图数据失败！')
    }
    // 4.准备数据和配置项 对象合并
    const result = _.merge(res.data, this.options)
    // 5.展示数据
    myChart.setOption(result)
    myChart2.setOption(this.options2)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-col{
  margin-right: 20px;
}
</style>
