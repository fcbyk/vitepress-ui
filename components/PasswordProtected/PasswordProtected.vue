<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PasswordProtectedProps } from './PasswordProtectedTypes'

const props = withDefaults(defineProps<PasswordProtectedProps>(), {
  password: '123456',
  promptMessage: '输入密码才能查看参考答案噢',
  placeholder: '点击此处输入密码',
  buttonText: '验证',
  errorMessageText: '密码错误，请重试。'
})

const passwordInput = ref('')
const isAuthenticated = ref(false)
const errorMessage = ref('')

const checkPassword = () => {
  if (passwordInput.value === props.password) {
    isAuthenticated.value = true
    errorMessage.value = ''
  } else {
    errorMessage.value = props.errorMessageText
  }
}

watch(passwordInput, () => {
  errorMessage.value = ''
})
</script>

<template>
  <div v-if="isAuthenticated" class="password-protected-content">
    <slot></slot>
  </div>
  <div v-else>
    <div class="custom-prompt">
      <p class="prompt-message">{{ promptMessage }}</p>
      <div class="input-wrapper">
        <input 
          v-model="passwordInput" 
          class="password-input" 
          @keydown.enter="checkPassword"
          :placeholder="placeholder" 
        />
        <button @click="checkPassword" class="verify-button">{{ buttonText }}</button>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.custom-prompt {
  padding: 1rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  font-size: 1rem;
  margin: 1rem 0;
}

.password-input {
  border-bottom: 1px var(--vp-c-text-1) solid;
  margin-right: 1rem;
}

.error-message {
  color: rgb(187, 6, 6);
}
</style>
