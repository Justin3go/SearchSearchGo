<template>
  <div>
    <v-dialog v-model="isAuthDialogShow" persistent width="500">
      <v-card title="访问验证（三月之内验证一次）">
        <v-card-text>
          <p class="mb-2">请输入4位访问密码</p>
          <v-text-field
            v-model="password"
            label="密码"
            type="password"
            maxlength="4"
            hint="请输入4位数字密码"
            variant="outlined"
            :rules="[(value: string | any[]) => (value && value.length === 4) || '请输入4位密码']"
          ></v-text-field>
          
          <div class="text-center my-4">
            <p>可扫码获取（扫码->验证码->SSGO）</p>
            <div class="qrcode-container">
              <img src="/qrcode.jpg" alt="扫码获取验证码" class="qrcode-image" />
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="verifyPassword">验证</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const isAuthDialogShow = ref(false);
const password = ref('');

const checkAuth = async () => {
  // 从localStorage获取password
  const storedPassword = localStorage.getItem('password');
  
  if (storedPassword) {
    try {
      // 请求API验证密码
      const response = await fetch(`/api/auth?password=${storedPassword}`);
      const isAuthorized = await response.json();
      
      // 根据返回结果决定是否显示弹窗
      if (!isAuthorized) {
        isAuthDialogShow.value = true;
      }
    } catch (error) {
      console.error('验证请求失败:', error);
      isAuthDialogShow.value = true;
    }
  } else {
    // 没有存储的密码，显示弹窗
    isAuthDialogShow.value = true;
  }
};

const verifyPassword = async () => {
  if (password.value.length === 4) {
    try {
      // 请求API验证输入的密码
      const response = await fetch(`/api/auth?password=${password.value}`);
      const isAuthorized = await response.json();
      
      if (isAuthorized) {
        // 验证成功，保存密码并关闭弹窗
        localStorage.setItem('password', password.value);
        isAuthDialogShow.value = false;
      } else {
        // 验证失败，提示用户
        alert('密码错误，请重新输入');
        password.value = '';
      }
    } catch (error) {
      console.error('验证请求失败:', error);
    }
  }
};

onMounted(() => {
  // 组件挂载5秒后执行验证
  setTimeout(checkAuth, 3000);
});
</script>

<style>
.qrcode-image {
  max-width: 200px;
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

.qrcode-container {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>