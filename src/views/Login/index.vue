<template>
  <div class="page login-container">
    <el-form
      ref="loginFormRef"
      :model="loginState"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username" class="form form-username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="loginState.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password" class="form form-password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginState.password"
          placeholder="password"
          name="password"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- login-btn -->
      <el-button type="primary" class="btn-login" @click="onHandleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { validatePassword } from '@/utils/rules/rules'
import { usePasswordShowOrHide } from '@/hooks/usePasswordShowOrHide'
import { useStore } from '@/store/index'
import { UserLoginRequest } from '@/utils/interfaces/user'

const store = useStore()
const loginFormRef = ref()
const loginState = ref<UserLoginRequest>({
  username: 'admin',
  password: '123456'
})
const loginRules = ref({
  username: [{ required: true, trigger: 'blur', message: '用户名必填' }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword() }]
})

// password-input 密文-明文显示控制
const { passwordType, onChangePwdType } = usePasswordShowOrHide()

// 登录事件触发
const onHandleLogin = async () => {
  unref(loginFormRef.value).validate(async (valid: boolean) => {
    if (!valid) return

    await store.dispatch('userModule/loginHandle', loginState.value)
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $app-bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 480px;
    padding: 100px 30px 0;
    margin: 0 auto;
    overflow: hidden;

    .title-container {
      position: relative;
      padding-bottom: 10px;
      .title {
        font-size: 28px;
        font-weight: 600;
        color: $cursor;
        text-align: center;
      }
    }

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      color: #454545;
      padding: 0 10px;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 48px;
      width: calc(100% - 20px);
      input {
        height: 100%;
        background-color: transparent;
        border: 0px;
        border-radius: 0px;
        display: inline-block;
      }
    }

    .show-pwd {
      position: absolute;
      right: 22px;
      top: 5px;
      font-size: 20px;
      color: $dark-gray;
      cursor: pointer;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
