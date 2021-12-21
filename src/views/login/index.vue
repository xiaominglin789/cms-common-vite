<template>
  <div class="page login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">
          用户登录
        </h3>
      </div>
      <!-- username -->
      <el-form-item class="form form-username">
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item class="form form-password">
        <span class="svg-container">
          <el-icon><Lock /></el-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
        />
        <el-icon class="show-pwd">
          <Lock />
        </el-icon>
      </el-form-item>
      <!-- login-btn -->
      <el-button
        type="primary"
        class="btn-login"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Avatar, Lock } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
@import '../../styles/color.scss';

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
      right: 10px;
      top: 10px;
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
