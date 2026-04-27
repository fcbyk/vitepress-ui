# PasswordProtected 密码保护组件

密码保护组件，用于隐藏敏感内容，用户需要输入正确的密码才能查看。

## 基础用法

默认密码为 `123456`，可以直接在组件内编写 Markdown 内容：

<PasswordProtected>

这是受保护的 **Markdown** 内容。

- 支持列表
- 支持强调
- 支持代码块

```js
console.log('Hello World')
```

</PasswordProtected>

```vue
<template>
  <PasswordProtected>
    <!-- 直接写 Markdown 内容 -->
    这是受保护的 **Markdown** 内容。
    
    - 支持列表
    - 支持强调
    
    ```js
    console.log('Hello World')
    ```
  </PasswordProtected>
</template>
```

## 自定义密码

通过 `password` 属性设置自定义密码：

<PasswordProtected password="my-secret">

### 隐藏的内容标题

这是一段受保护的文本，包含 **加粗**、*斜体* 等 Markdown 格式。

> 引用块也可以正常使用

</PasswordProtected>

```vue
<template>
  <PasswordProtected password="my-secret">
    ### 隐藏的内容标题
    
    这是一段受保护的文本，包含 **加粗**、*斜体* 等 Markdown 格式。
    
    > 引用块也可以正常使用
  </PasswordProtected>
</template>
```

## 自定义提示文本

你可以通过以下属性自定义所有文本内容：

<PasswordProtected 
  password="custom"
  prompt-message="请输入访问密码以查看隐藏内容"
  placeholder="在此输入密码"
  button-text="确认"
  error-message-text="密码不正确，请重新输入"
>

**自定义提示文本示例**

这个组件使用了自定义的提示信息和按钮文字。

</PasswordProtected>

```vue
<template>
  <PasswordProtected 
    password="custom"
    prompt-message="请输入访问密码以查看隐藏内容"
    placeholder="在此输入密码"
    button-text="确认"
    error-message-text="密码不正确，请重新输入"
  >
    **自定义提示文本示例**
    
    这个组件使用了自定义的提示信息和按钮文字。
  </PasswordProtected>
</template>
```

## API

### PasswordProtected Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| password | 验证密码 | `string` | `'coke'` |
| prompt-message | 提示文本 | `string` | `'输入密码才能查看参考答案噢'` |
| placeholder | 输入框占位符文本 | `string` | `'点击此处输入密码'` |
| button-text | 按钮文本 | `string` | `'验证'` |
| error-message-text | 错误提示信息 | `string` | `'密码错误，请重试。'` |

### PasswordProtected Slots

| 插槽名 | 说明 |
|--------|------|
| default | 需要密码验证才能显示的内容 |

## 注意事项

- 此组件仅在前端进行简单的密码验证，不适合用于真正的安全场景
- 密码以明文形式存在于代码中，请勿用于保护真正敏感的信息
- 适合用于教学、演示等轻度保护场景
