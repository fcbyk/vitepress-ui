export interface PasswordProtectedProps {
  /**
   * 验证密码，默认为 'coke'
   */
  password?: string
  
  /**
   * 提示文本，默认为 '输入密码才能查看参考答案噢'
   */
  promptMessage?: string
  
  /**
   * 输入框占位符文本，默认为 '点击此处输入密码'
   */
  placeholder?: string
  
  /**
   * 按钮文本，默认为 '验证'
   */
  buttonText?: string
  
  /**
   * 错误提示信息，默认为 '密码错误，请重试。'
   */
  errorMessageText?: string
}
