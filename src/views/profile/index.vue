<template>
  <div class="profile">
    <el-row class="boxs info-boxs">
      <el-card class="info-box">
        <template #header>
          <span>个人中心</span>
        </template>
        <el-row>
          <el-col :span="5">
            <div class="avatar-box">
              <el-avatar
                :size="100"
                shape="square"
                :src="userInfo.avatar"
              />
            </div>
          </el-col>
          <el-col
            :span="19"
            class="des-box"
          >
            <h3 class="title">
              早安 午安 晚安! {{ userInfo.nickname }} 加油！
            </h3>
            <p class="username">
              <span>昵称:</span> {{ userInfo.nickname }}
            </p>
            <p class="user-role">
              <span>身份:</span> {{ userInfo.role }}
            </p>
            <p class="user-ip">
              <span>登录ip:</span> {{ userInfo.ip }}
            </p>
            <p class="user-login-time">
              <span>登录时间:</span>
              <span v-if="userInfo.loginTime">{{
                formatTimeStamp(userInfo.loginTime)
              }}</span>
            </p>
          </el-col>
        </el-row>
      </el-card>
      <!-- 其他 -->
      <el-card class="msg-box">
        <template #header>
          <div class="card-header">
            <span>消息通知</span>
            <!-- <el-button class="button" type="text">更多&nbsp;&gt;</el-button> -->
          </div>
        </template>
      </el-card>
    </el-row>
    <!-- 统计入口 -->
    <el-card class="boxs info-enters">
      <template #header>
        <span>推荐入口</span>
      </template>
    </el-card>
    <!-- 更新信息 -->
    <el-card class="boxs info-update">
      <template #header>
        <span>更新信息</span>
      </template>
      <el-form
        ref="formRef"
        class="update-form"
      >
        <el-form-item
          label="基本信息"
          class="title"
        />
        <el-form-item>
          <el-row gutter="10">
            <el-col :span="8">
              <span class="inline-flex">新昵称:</span>
              <el-input
                v-model="userNickname"
                placeholder="输入新昵称"
              />
            </el-col>
            <el-col :span="8">
              <span>新邮箱:</span>
              <el-input
                v-model="userEmail"
                placeholder="输入新Email"
              />
            </el-col>
            <el-col :span="8">
              <span>新手机号:</span>
              <el-input
                v-model="userPhone"
                placeholder="输入新手机号"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onUpdateUserInfo"
            class="btn-update"
          >
            更新个人信息
          </el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <el-form class="accout-safe-form">
        <el-form-item
          label="账户安全"
          class="title"
        />
        <el-form-item class="safe-item safe-pwd">
          <span>
            <p>账户密码</p>
            <p>当前密码强度: 强</p>
          </span>
          <router-link to="/">
            修改密码
          </router-link>
        </el-form-item>
        <el-divider />
        <el-form-item class="safe-item safe-pwd">
          <span>
            <p>绑定手机号</p>
            <p>已绑手机号: 135xxxxx0000</p>
          </span>
          <router-link to="/">
            更换手机号
          </router-link>
        </el-form-item>
        <el-divider />
        <el-form-item class="safe-item safe-email">
          <span>
            <p>绑定邮箱</p>
            <p>已绑邮箱: 1230@qq.com</p>
          </span>
          <router-link to="/">
            更换新手机号
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSystemStore } from '@/store/system'
import { useUserStore } from '@/store/user'
import { formatTimeStamp } from '@/utils/utils'

const systemStore = useSystemStore()
const userStore = useUserStore()
const test = ref('')
const userNickname = ref('')
const userPhone = ref('')
const userEmail = ref('')

const userInfo = computed(() => userStore.hasUserInfo)

const onUpdateUserInfo = () => {}
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;

  .boxs {
    margin: 16px auto;
  }

  &:deep(.el-card:hover) {
    box-shadow: 2px 4px 16px -4px grey !important;
  }

  .info-boxs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .info-box {
      flex: 1;
      .avatar-box {
        cursor: pointer;
      }
      .des-box {
        p span {
          color: grey;
        }
        .title {
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
    .msg-box {
      width: 300px;
    }
  }

  .info-update {
    .title {
      text-indent: 16px;
      font-weight: 600;
      position: relative;
      cursor: text;
    }
    .title::before {
      content: '';
      position: absolute;
      top: 48%;
      left: 4px;
      transform: translateY(-48%);
      width: 4px;
      height: 14px;
      background-color: blue;
      border-radius: 4px;
    }

    .update-form {
    }
    .accout-safe-form {
      .safe-item:deep(.el-form-item__content) {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
