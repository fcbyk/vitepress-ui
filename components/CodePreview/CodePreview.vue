<script setup lang="ts">
import { ref } from 'vue'
import type { CodePreviewProps } from './CodePreviewTypes'

const props = withDefaults(defineProps<CodePreviewProps>(), {
  defaultView: 'preview'
})

const currentView = ref<'preview' | 'code'>(props.defaultView)

const switchToPreview = () => {
  currentView.value = 'preview'
}

const switchToCode = () => {
  currentView.value = 'code'
}
</script>

<template>
  <div>
    <!-- 切换滑块 - 独立在上方 -->
    <div class="view-switcher">
      <div class="slider-track">
        <div 
          class="slider-indicator" 
          :style="{ transform: `translateX(${currentView === 'preview' ? '0' : '100%'})` }"
        ></div>
        <button 
          :class="['switch-btn', { active: currentView === 'preview' }]"
          @click="switchToPreview"
        >
          预览
        </button>
        <button 
          :class="['switch-btn', { active: currentView === 'code' }]"
          @click="switchToCode"
        >
          源码
        </button>
      </div>
    </div>

    <!-- 内容区域 - 完全独立，无边框无样式 -->
    <div v-if="currentView === 'preview'" class="preview-content">
      <slot name="preview"></slot>
    </div>
    <div v-else class="code-content">
      <slot name="code"></slot>
    </div>
  </div>
</template>

<style scoped>
.view-switcher {
  margin: 1rem 0;
}

.slider-track {
  position: relative;
  display: inline-flex;
  background-color: var(--vp-c-bg-mute);
  border-radius: 6px;
  overflow: hidden;
}

.slider-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgb(132, 149, 170);
  border-radius: 6px;
  transition: transform 0.3s ease;
  z-index: 0;
}

.switch-btn {
  position: relative;
  z-index: 1;
  padding: 0.5rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.switch-btn.active {
  color: white;
}
</style>
