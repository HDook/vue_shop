<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片区域-->
    <el-card>
      <!--        搜索与添加区域-->
      <el-row :gutter='20'>
        <el-col :span='8'>
          <el-input placeholder='请输入内容' v-model='queryInfo.query' clearable @clear='getUserList'>
            <el-button slot='append' icon='el-icon-search' @click='getUserList'></el-button>
          </el-input>
        </el-col>
        <el-col :span='4'>
          <el-button type='primary' @click='addDialogVisible = true'>添加用户</el-button>
        </el-col>
      </el-row>

      <!--     用户列表区域 -->
      <el-table
        :data='userList'
        border stripe>
        <el-table-column
          type='index' label='序号'>
        </el-table-column>
        <el-table-column
          label='姓名'
          prop='username'>
        </el-table-column>
        <el-table-column
          label='邮箱'
          prop='email'>
        </el-table-column>
        <el-table-column
          label='电话'
          prop='mobile'>
        </el-table-column>
        <el-table-column
          label='状态'>
          <!--          作用域插槽,拿到数据-->
          <template slot-scope='scope'>
            <el-switch
              v-model='scope.row.mg_state' @change='userStateChanged(scope.row)'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label='操作' width='230'>
          <template slot-scope='scope'>
            <el-button type='primary' icon='el-icon-edit' @click='showEditDialog(scope.row.id)' siz='mini'></el-button>
            <el-button type='danger' icon='el-icon-delete' siz='mini'></el-button>
            <el-tooltip effect='dark' content='分配角色' placement='top' :enterable='false'>
              <el-button type='warning' icon='el-icon-setting' siz='mini'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page='queryInfo.pagenum'
        :page-sizes='[1, 2, 5, 10]'
        :page-size='queryInfo.pagesize'
        layout='total, sizes, prev, pager, next, jumper'
        :total='total'>
      </el-pagination>
    </el-card>
    <!--    添加用户对话框-->
    <el-dialog
      title='添加用户'
      :visible.sync='addDialogVisible'
      width='50%' @close='addDialogClosed'>
      <el-form ref='addFormRef' :model='addForm' :rules='addFormRules' label-width='80px'>
        <el-form-item label='用户名' prop='username'>
          <el-input v-model='addForm.username'></el-input>
        </el-form-item>
        <el-form-item label='用户密码' prop='password'>
          <el-input v-model='addForm.password' type='password'></el-input>
        </el-form-item>
        <el-form-item label='用户邮箱' prop='email'>
          <el-input v-model='addForm.email'></el-input>
        </el-form-item>
        <el-form-item label='用户手机' prop='mobile'>
          <el-input v-model='addForm.mobile'></el-input>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
    <el-button @click='addDialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click='addUser'>确 定</el-button>
  </span>
    </el-dialog>

    <!--    修改用户对话框-->
    <el-dialog
      title='修改用户信息'
      :visible.sync='editDialogVisible'
      width='50%' @close='editDialogClosed'
    >
      <el-form ref='editFormRef' :model='editForm' :rules='addFormRules' label-width='70px'>
        <el-form-item label='用户名'>
          <el-input v-model='editForm.username' disabled></el-input>
        </el-form-item>
        <el-form-item label='邮箱'>
          <el-input v-model='editForm.email' prop='email'></el-input>
        </el-form-item>
        <el-form-item label='手机'>
          <el-input v-model='editForm.mobile' prop='mobile'></el-input>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
    <el-button @click='editDialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click='editUserInfo'>确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) return cb
      return cb(new Error('邮箱不合法'))
    }

    // 验证手机号的规则
    const checkMobil = (rule, value, cb) => {
      const regMobil = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (regMobil.test(value)) return cb
      return cb(new Error('手机号码不合法'))
    }
    return {
      // 获取用户对象列表的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制添加用户选择的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '用户名的长度在3-15之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入用户密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '用户密码的长度在6-15之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入用户邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入用户手机',
            trigger: 'blur'
          },
          {
            validator: checkMobil,
            trigger: 'blur'
          }
        ]

      },
      editFormRules: {}
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听switch开关状态的改变
    async userStateChanged(userInfo) {
      console.log(userInfo)
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    async addUser() {
      const valid = this.$refs.addFormRef.validate()
      if (!valid) return null
      // 发起表单的网络请求
      const { data: res } = await this.$http.post('users', this.addForm)
      console.log(res)
      if (res.meta.status !== 201) return this.$message.error('添加用户失败')
      this.$message.success('添加用户成功')
      this.addDialogVisible = false
      this.getUserList()
    },
    async showEditDialog(id) {
      console.log(id)
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户数据出错！')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
