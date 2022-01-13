<template>
  <div class="user-manage">
    <span hidden>员工管理</span>
    <el-card class="header">
      <div class="header-search">
        <el-input class="search-input"></el-input>
        <el-button class="search-btn" type="primary">搜索</el-button>
      </div>
      <div class="hearder-btns">
        <el-button type="success">Excel导入</el-button>
        <el-button>Excel导出</el-button>
      </div>
    </el-card>
    <!-- 表格展示 -->
    <el-card class="container">
      <el-table :data="userList" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" label="#" width="36"></el-table-column>
        <!-- 头像 -->
        <el-table-column prop="avatar" label="头像">
          <template #default="{ row }">
            <el-avatar shape="circle" :size="36" :src="row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <!-- 昵称 -->
        <el-table-column prop="nickname" label="昵称" />
        <!-- 手机号 -->
        <el-table-column prop="mobble" label="手机号" />
        <!-- 角色 -->
        <el-table-column prop="roles" label="角色">
          <template #default="{ row }">
            <div class="roles" v-if="row.roles && row.roles.length">
              <el-tag
                class="role"
                v-for="item in row.roles"
                :key="item"
                size="mini"
                >{{ item }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="actions" label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <div class="actions">
              <el-button type="primary" size="mini" v-show="row.actions[0]"
                >查看</el-button
              >
              <el-button size="mini" v-show="row.actions[1]">角色</el-button>
              <el-button type="warning" size="mini" v-show="row.actions[0]"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="create_time" label="创建时间" width="180" />
        <!-- 更新时间 -->
        <el-table-column prop="update_time" label="更新时间" />
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 10, 20]"
        layout="total,prev,pager,next,jumper"
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
        @prev-click="onPrevClick"
        @next-click="onNextClick"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getUserList } from '@/api/admin'
import { UserListResponse } from '@/utils/interfaces/admin'
import { ElMessage } from 'element-plus'

const page = ref(1)
const size = ref(2)
const userListResponse = ref(<UserListResponse>{})
const userList = computed(() => {
  return userListResponse.value.list
})
const total = computed(() => {
  return userListResponse.value.total || 0
})

onMounted(async () => {
  const result = await getUserList(page.value, size.value)
  if (result.data) {
    userListResponse.value = result.data
  }
})

const onCurrentChange = () => {
  ElMessage.info('未处理')
}
const onSizeChange = () => {
  ElMessage.info('未处理')
}
const onPrevClick = () => {
  ElMessage.info('未处理')
}
const onNextClick = () => {
  ElMessage.info('未处理')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.user-manage {
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    margin: 10px 0;
    width: 100%;
    :deep(.el-card__body) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .header-search {
        width: 320px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-input {
          width: 240px;
          display: inline-block;
        }
      }
      .header-btns {
        width: 160px;
      }
    }
  }
  .container {
    :deep(.cell) {
      .roles {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .role {
          margin: 4px;
        }
      }
      .actions {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .el-button {
          margin: 4px;
        }
      }
    }
  }
}
</style>
