<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图表管理</el-breadcrumb-item>
      <el-breadcrumb-item>图表列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
        <el-row type="flex" justify="center">
          <el-card>
            <div id="main" style="height: 500px;width: 1000px"></div>
          </el-card>
        </el-row>
        <el-row type="flex" justify="center">
          <el-card>
            <div id="main2" style="height: 500px;width: 1000px"></div>
          </el-card>
        </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

    const chartDom = document.getElementById('main')
    const chartDom2 = document.getElementById('main2')
    const myChart = echarts.init(chartDom)
    const myChart2 = echarts.init(chartDom2)

    const weatherIcons = {
      Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
      Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
      Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
    }
    const options = {
      title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {
              value: 1548,
              name: '幽州',
              label: {
                formatter: [
                  '{title|{b}}{abg|}',
                  '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                  '{hr|}',
                  '  {Sunny|}{value|202}{rate|55.3%}',
                  '  {Cloudy|}{value|142}{rate|38.9%}',
                  '  {Showers|}{value|21}{rate|5.8%}'
                ].join('\n'),
                backgroundColor: '#eee',
                borderColor: '#777',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  title: {
                    color: '#eee',
                    align: 'center'
                  },
                  abg: {
                    backgroundColor: '#333',
                    width: '100%',
                    align: 'right',
                    height: 25,
                    borderRadius: [4, 4, 0, 0]
                  },
                  Sunny: {
                    height: 30,
                    align: 'left',
                    backgroundColor: {
                      image: weatherIcons.Sunny
                    }
                  },
                  Cloudy: {
                    height: 30,
                    align: 'left',
                    backgroundColor: {
                      image: weatherIcons.Cloudy
                    }
                  },
                  Showers: {
                    height: 30,
                    align: 'left',
                    backgroundColor: {
                      image: weatherIcons.Showers
                    }
                  },
                  weatherHead: {
                    color: '#333',
                    height: 24,
                    align: 'left'
                  },
                  hr: {
                    borderColor: '#777',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  value: {
                    width: 20,
                    padding: [0, 20, 0, 30],
                    align: 'left'
                  },
                  valueHead: {
                    color: '#333',
                    width: 20,
                    padding: [0, 20, 0, 30],
                    align: 'center'
                  },
                  rate: {
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  },
                  rateHead: {
                    color: '#333',
                    width: 40,
                    align: 'center',
                    padding: [0, 10, 0, 0]
                  }
                }
              }
            },
            {
              value: 735,
              name: '荆州'
            },
            {
              value: 510,
              name: '兖州'
            },
            {
              value: 434,
              name: '益州'
            },
            {
              value: 335,
              name: '西凉'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const options2 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            {
              value: 1548,
              name: '搜索引擎'
            },
            {
              value: 775,
              name: '直达'
            },
            {
              value: 679,
              name: '营销广告',
              selected: true
            }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: [
            {
              value: 1048,
              name: '百度'
            },
            {
              value: 335,
              name: '直达'
            },
            {
              value: 310,
              name: '邮件营销'
            },
            {
              value: 251,
              name: '谷歌'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 147,
              name: '必应'
            },
            {
              value: 135,
              name: '视频广告'
            },
            {
              value: 102,
              name: '其他'
            }
          ]
        }
      ]
    }

    options && myChart.setOption(options)
    options2 && myChart2.setOption(options2)
  },
  methods: {}
}
</script>

<style scoped>
.el-row{
  margin-bottom: 15px;
}
</style>
