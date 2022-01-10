<template>
  <div class="page login-container">
    <el-form
      ref="loginFormRef"
      :model="loginState"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <app-language class="language" bg-color="#fff"></app-language>
      </div>
      <!-- username -->
      <el-form-item prop="username" class="form form-username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="loginState.username"
          :placeholder="$t('login.usernameTip')"
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
          :placeholder="$t('login.passwordTip')"
          name="password"
          @paste.native.capture.prevent="onStopClientCopyPasts"
          @copy.native.capture.prevent="onStopClientCopyPasts"
          @cut.native.capture.prevent="onStopClientCopyPasts"
          @contextmenu.native.capture.prevent="onStopClientCopyPasts"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- login-btn -->
      <el-button type="primary" class="btn-login" @click="onHandleLogin">{{
        $t('login.submitText')
      }}</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { validatePassword } from '@/utils/rules/rules'
import { usePasswordShowOrHide } from '@/hooks/usePasswordShowOrHide'
import { useUserStore } from '@/store/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import AppLanguage from '@/components/AppLanguage/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const loginFormRef = ref()
const loginState = ref<UserLoginRequest>({
  username: 'admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: () => t('login.usernameRuleTip')
    }
  ],
  password: [{ required: true, trigger: 'blur', validator: validatePassword() }]
})

// password-input 密文-明文显示控制
const { passwordType, onChangePwdType } = usePasswordShowOrHide()

// 登录事件触发
const onHandleLogin = () => {
  unref(loginFormRef.value).validate(async (valid: boolean) => {
    if (!valid) return
    await userStore.login(loginState.value)
  })
}

/** 禁止输入框的复制粘贴操作 */
const onStopClientCopyPasts = () => {
  return false
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.login-container {
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
      .language {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
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
