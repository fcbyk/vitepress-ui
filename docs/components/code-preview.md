# CodePreview 代码预览组件

代码预览组件，用于在预览效果和源码之间切换显示。

## 基础用法

使用 `preview` 和 `code` 两个具名插槽分别放置预览内容和源码：

<CodePreview>
  <template #preview>

这是一个 **预览效果** 的示例。

- 支持 Markdown 格式
- 可以包含列表、代码块等

```js
console.log('这是预览内容')
```

  </template>
  <template #code>

``` md
<CodePreview>
  <template #preview>
    <!-- 预览内容，支持 Markdown -->
    这是一个 **预览效果** 的示例。
  </template>
  <template #code>
    <!-- 源码内容 -->
    ```vue
    <template>
      <div>示例代码</div>
    </template>
    ```
  </template>
</CodePreview>
```
  </template>
</CodePreview>



## 默认显示源码

通过 `default-view` 属性设置默认显示源码视图：

<CodePreview default-view="code">
  <template #preview>

这是预览内容，默认不会显示。

  </template>
  <template #code>

```vue
<template>
  <CodePreview default-view="code">
    <template #preview>
      这是预览内容，默认不会显示。
    </template>
    <template #code>
      ```js
      const message = 'Hello World'
      console.log(message)
      ```
    </template>
  </CodePreview>
</template>
```

  </template>
</CodePreview>

## API

### CodePreview Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| default-view | 默认显示的视图 | `'preview' \| 'code'` | `'preview'` |

### CodePreview Slots

| 插槽名 | 说明 |
|--------|------|
| preview | 预览效果内容，支持 Markdown 格式 |
| code | 源码内容，通常使用代码块展示 |

## 注意事项

- 此组件适合用于展示组件的使用示例，让用户可以在预览效果和源码之间快速切换
- 预览插槽支持完整的 Markdown 语法
- 源码插槽通常用于展示 Vue 组件代码或其他源代码
