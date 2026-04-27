# Collapse 折叠面板

折叠面板组件，用于展示可折叠的内容区域。

## 基础用法

<CCollapse title="基础折叠面板">
<p>这是折叠面板的内容区域。可以放置任何内容。</p>
</CCollapse>

```vue
<template>
  <CCollapse title="基础折叠面板">
    <p>这是折叠面板的内容区域。可以放置任何内容。</p>
  </CCollapse>
</template>
```

## 默认展开

<CCollapse title="默认展开的面板" :default-open="true">
  <p>这个面板默认是展开状态</p>
</CCollapse>

```vue
<template>
  <CCollapse title="默认展开的面板" :default-open="true">
    <p>这个面板默认是展开状态</p>
  </CCollapse>
</template>
```

## 自定义徽章

<CCollapse title="自定义徽章文本" badge="NEW" :margin-bottom="8">
  <p>使用自定义徽章文本</p>
</CCollapse>

<CCollapse title="自定义徽章颜色" badge="HOT" badge-color="#ff6b6b" :margin-bottom="8">
  <p>使用自定义徽章颜色</p>
</CCollapse>

<CCollapse title="自定义徽章内容">
  <template #badge>
    <span style="font-size: 12px;">问</span>
  </template>
  <p>使用插槽自定义徽章内容</p>
</CCollapse>

```vue
<template>
  <CCollapse title="自定义徽章文本" badge="NEW" :margin-bottom="8">
    <p>使用自定义徽章文本</p>
  </CCollapse>
  
  <CCollapse title="自定义徽章颜色" badge="HOT" badge-color="#ff6b6b" :margin-bottom="8">
    <p>使用自定义徽章颜色</p>
  </CCollapse>
  
  <CCollapse title="自定义徽章内容">
    <template #badge>
      <span style="font-size: 12px;">🔥</span>
    </template>
    <p>使用插槽自定义徽章内容</p>
  </CCollapse>
</template>
```

## 禁用状态

<CCollapse title="禁用的面板" :disabled="true">
  <p>这个面板被禁用了，无法点击</p>
</CCollapse>

```vue
<template>
  <CCollapse title="禁用的面板" :disabled="true">
    <p>这个面板被禁用了，无法点击</p>
  </CCollapse>
</template>
```

## 底部间距

当多个折叠面板需要垂直排列时，可以使用 `margin-bottom` 属性设置间距：

<CCollapse title="第一个面板" :margin-bottom="16">
  <p>这个面板有 16px 的底部间距</p>
</CCollapse>

<CCollapse title="第二个面板" :margin-bottom="24">
  <p>这个面板有 24px 的底部间距</p>
</CCollapse>

<CCollapse title="第三个面板">
  <p>这个面板没有底部间距</p>
</CCollapse>

```vue
<template>
  <CCollapse title="第一个面板" :margin-bottom="16">
    <p>这个面板有 16px 的底部间距</p>
  </CCollapse>
  
  <CCollapse title="第二个面板" :margin-bottom="24">
    <p>这个面板有 24px 的底部间距</p>
  </CCollapse>
  
  <CCollapse title="第三个面板">
    <p>这个面板没有底部间距</p>
  </CCollapse>
</template>
```

你也可以使用 CSS 单位字符串：

```vue
<template>
  <!-- 使用像素值 -->
  <CCollapse title="面板" :margin-bottom="16" />
  
  <!-- 使用 rem 单位 -->
  <CCollapse title="面板" margin-bottom="1rem" />
  
  <!-- 使用 em 单位 -->
  <CCollapse title="面板" margin-bottom="2em" />
</template>
```

## 插槽使用

<CCollapse title="使用插槽的面板">
  <template #title>
    <span style="color: #409eff;">自定义标题</span>
  </template>
  
  <template #extra>
    <span style="background: #f0f9ff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
      额外信息
    </span>
  </template>
  
  <template #toggle-icon>
    <span style="font-size: 16px;">▼</span>
  </template>
  
  <p>使用各种插槽自定义面板内容</p>
</CCollapse>

```vue
<template>
  <CCollapse title="使用插槽的面板">
    <template #title>
      <span style="color: #409eff;">自定义标题</span>
    </template>
    
    <template #extra>
      <span style="background: #f0f9ff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
        额外信息
      </span>
    </template>
    
    <template #toggle-icon>
      <span style="font-size: 16px;">▼</span>
    </template>
    
    <p>使用各种插槽自定义面板内容</p>
  </CCollapse>
</template>
```

## 事件处理

```vue
<template>
  <CCollapse 
    title="事件处理示例" 
    @change="handleCollapseChange"
    @title-click="handleTitleClick"
  >
    <p>点击标题或切换状态时会触发相应事件</p>
  </CCollapse>
</template>

<script setup>
const handleCollapseChange = (isOpen) => {
  console.log('面板状态改变:', isOpen)
}

const handleTitleClick = (event) => {
  console.log('标题被点击:', event)
}
</script>
```

## 方法调用

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <button @click="togglePanel">切换面板</button>
      <button @click="openPanel">展开面板</button>
      <button @click="closePanel">收起面板</button>
    </div>
    
    <CCollapse ref="collapseRef" title="可控制的面板">
      <p>通过方法控制的面板</p>
    </CCollapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const collapseRef = ref()

const togglePanel = () => {
  collapseRef.value?.toggle()
}

const openPanel = () => {
  collapseRef.value?.open()
}

const closePanel = () => {
  collapseRef.value?.close()
}
</script>
```

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题文本 | `string` | - |
| defaultOpen | 是否默认展开 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| badge | 自定义徽章文本 | `string` | - |
| badgeColor | 自定义徽章颜色 | `string` | - |
| bordered | 是否显示边框 | `boolean` | `true` |
| shadow | 是否显示阴影 | `boolean` | `true` |
| marginBottom | 底部外边距 | `number \| string` | `0` |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 展开/收起状态改变时触发 | `(isOpen: boolean)` |
| title-click | 点击标题时触发 | `(event: MouseEvent)` |

### Collapse Slots

| 插槽名 | 说明 |
|--------|------|
| default | 面板内容 |
| title | 自定义标题 |
| badge | 自定义徽章 |
| extra | 标题右侧额外内容 |
| toggle-icon | 自定义切换图标 |

### Collapse Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| toggle | 切换展开/收起状态 | - |
| open | 展开面板 | - |
| close | 收起面板 | - |
| isOpen | 获取当前展开状态 | - |
