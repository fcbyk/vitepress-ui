<template>
  <div 
    :class="collapseClasses"
    :style="collapseStyles"
  >
    <div 
      :class="headerClasses"
      @click="handleToggle"
    >
      <div
        :class="badgeClasses"
        :style="badgeStyles"
      >
        <slot name="badge">
          {{ badge || 'Q' }}
        </slot>
      </div>
      <p :class="titleClasses">
        <slot name="title">
          {{ title }}
        </slot>
      </p>
      <div
        v-if="$slots.extra"
        :class="extraClasses"
      >
        <slot name="extra" />
      </div>
      <div 
        :class="toggleClasses"
        :title="isOpen ? '收起' : '展开'"
      >
        <slot name="toggle-icon">
          {{ isOpen ? '−' : '+' }}
        </slot>
      </div>
    </div>
    <Transition name="collapse">
      <div
        v-show="isOpen"
        :class="contentClasses"
      >
        <div :class="innerContentClasses">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CollapseProps, CollapseEmits } from './types'

const props = withDefaults(defineProps<CollapseProps>(), {
  defaultOpen: false,
  disabled: false,
  bordered: true,
  shadow: true,
  marginBottom: 0
})

const emit = defineEmits<CollapseEmits>()

// 初始状态
const isOpen = ref(props.defaultOpen)

// 监听 defaultOpen 变化
watch(() => props.defaultOpen, (newVal) => {
  isOpen.value = newVal
})

const collapseClasses = computed(() => {
  return [
    'c-collapse',
    {
      'c-collapse--open': isOpen.value,
      'c-collapse--disabled': props.disabled,
      'c-collapse--bordered': props.bordered,
      'c-collapse--shadow': props.shadow
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'c-collapse__header',
    {
      'c-collapse__header--disabled': props.disabled
    }
  ]
})

const badgeClasses = computed(() => {
  return 'c-collapse__badge'
})

const badgeStyles = computed(() => {
  if (props.badgeColor) {
    return {
      backgroundColor: props.badgeColor,
      borderColor: props.badgeColor
    }
  }
  return {}
})

const titleClasses = computed(() => {
  return [
    'c-collapse__title',
    {
      'c-collapse__title--disabled': props.disabled
    }
  ]
})

const extraClasses = computed(() => {
  return 'c-collapse__extra'
})

const toggleClasses = computed(() => {
  return [
    'c-collapse__toggle',
    {
      'c-collapse__toggle--open': isOpen.value,
      'c-collapse__toggle--disabled': props.disabled
    }
  ]
})

const contentClasses = computed(() => {
  return 'c-collapse__content'
})

const innerContentClasses = computed(() => {
  return 'c-collapse__inner'
})

const collapseStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // 底部外边距
  if (props.marginBottom !== undefined && props.marginBottom !== 0) {
    styles.marginBottom = typeof props.marginBottom === 'number' 
      ? `${props.marginBottom}px` 
      : props.marginBottom
  }
  
  // 徽章颜色（CSS 变量）
  if (props.badgeColor) {
    styles['--collapse-primary-color'] = props.badgeColor
  }
  
  return styles
})

const handleToggle = (event: MouseEvent) => {
  if (props.disabled) return
  
  emit('title-click', event)
  
  isOpen.value = !isOpen.value
  emit('change', isOpen.value)
}

// 暴露方法给父组件
defineExpose({
  toggle: () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
      emit('change', isOpen.value)
    }
  },
  open: () => {
    if (!props.disabled && !isOpen.value) {
      isOpen.value = true
      emit('change', isOpen.value)
    }
  },
  close: () => {
    if (!props.disabled && isOpen.value) {
      isOpen.value = false
      emit('change', isOpen.value)
    }
  },
  isOpen: () => isOpen.value
})
</script>

<style scoped>
.c-collapse {
  position: relative;
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.c-collapse--bordered {
  border: 1px solid var(--collapse-border-color, #e4e7ed);
}

.c-collapse--shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1);
}

.c-collapse--open {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.15);
}

.c-collapse--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


/* 默认样式 */
.c-collapse {
  --collapse-primary-color: #409eff;
  --collapse-border-color: rgba(64, 158, 255, 0.25);
}

.c-collapse--open {
  border-color: var(--collapse-primary-color);
}

/* 头部 */
.c-collapse__header {
  padding: 1rem;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, 
    rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.1), 
    rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.04)
  );
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  /* user-select: none; */
}

.c-collapse--open .c-collapse__header {
  border-bottom-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.2);
}

.c-collapse__header:hover:not(.c-collapse__header--disabled) {
  background: linear-gradient(to right, 
    rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.15), 
    rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.06)
  );
}

.c-collapse__header--disabled {
  cursor: not-allowed;
}

/* 徽章 */
.c-collapse__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  border-radius: 4px;
  background-color: var(--collapse-primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.4);
}


/* 标题 */
.c-collapse__title {
  margin: 0;
  font-weight: 600;
  flex: 1;
  line-height: 1.5;
}

.c-collapse__title--disabled {
  color: var(--collapse-text-disabled-color, #c0c4cc);
}

/* 额外内容 */
.c-collapse__extra {
  margin-left: 10px;
}

/* 切换图标 */
.c-collapse__toggle {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--collapse-primary-color);
  background-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.1);
  transition: all 0.3s ease;
  margin-left: 12px;
  border: 1px solid rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.2);
}


.c-collapse__toggle:hover:not(.c-collapse__toggle--disabled) {
  background-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.2);
}

.c-collapse__toggle--open {
  transform: rotate(180deg);
}

.c-collapse__toggle--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 内容区域 */
.c-collapse__content {
  background-color: none;
}

.c-collapse__inner {
  padding: 1.25rem;
  border-top: 1px solid rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.15);
  /* color: var(--collapse-text-color, #606266); */
  line-height: 1.6;
}

/* 动画 */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 1000px;
  opacity: 1;
}

/* 响应式 */
@media (max-width: 768px) {
  .c-collapse__header {
    padding: 0.75rem;
  }
  
  .c-collapse__inner {
    padding: 1rem;
  }
  
  .c-collapse__badge {
    min-width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  
  .c-collapse__toggle {
    width: 24px;
    height: 24px;
    margin-left: 8px;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .c-collapse {
    --collapse-bg-color: #1a1a1a;
    /* --collapse-text-color: #e5e5e5; */
    --collapse-text-disabled-color: #666666;
    --collapse-border-color: rgba(255, 255, 255, 0.1);
  }
  
  .c-collapse--bordered {
    border-color: var(--collapse-border-color);
  }
  
  .c-collapse__header {
    background: linear-gradient(to right, 
      rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.15), 
      rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.05)
    );
  }
  
  .c-collapse__header:hover:not(.c-collapse__header--disabled) {
    background: linear-gradient(to right, 
      rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.2), 
      rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.08)
    );
  }
  
  .c-collapse__badge {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .c-collapse__toggle {
    background-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.15);
    border-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.3);
  }
  
  .c-collapse__toggle:hover:not(.c-collapse__toggle--disabled) {
    background-color: rgba(var(--collapse-primary-color-rgb, 64, 158, 255), 0.25);
  }
}
</style>
