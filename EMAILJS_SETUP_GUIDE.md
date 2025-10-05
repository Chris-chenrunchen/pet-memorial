# EmailJS 设置指南

这个指南将帮助你配置 EmailJS，使 contact 页面的表单能够直接发送邮件到你的谷歌邮箱。

## 📝 步骤 1: 注册 EmailJS 账户

1. 访问 [EmailJS 官网](https://dashboard.emailjs.com/sign-up)
2. 注册一个新账户（可以使用谷歌账户登录）
3. 登录到你的 EmailJS 控制台

## ⚙️ 步骤 2: 创建邮件服务

1. 在 EmailJS 控制台中，点击 "Email Services"
2. 点击 "Add New Service"
3. 选择 "Gmail" 作为服务类型
4. 按照提示连接你的谷歌账户
5. 给服务起个名字，比如 "Pet Memorial Contact Form"
6. 记下生成的 **Service ID**

## 📧 步骤 3: 创建邮件模板

1. 在控制台中点击 "Email Templates"
2. 点击 "Create New Template"
3. 使用以下模板内容：

```html
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
      .content { background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; }
      .field { margin-bottom: 15px; }
      .label { font-weight: bold; color: #495057; }
      .value { margin-top: 5px; color: #212529; }
      .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>📧 New Contact Form Submission</h2>
        <p>You have received a new message from your Pet Memorial website.</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">From:</div>
          <div class="value">{{from_name}}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">{{from_email}}</div>
        </div>
        
        <div class="field">
          <div class="label">Subject:</div>
          <div class="value">{{subject}}</div>
        </div>
        
        <div class="field">
          <div class="label">Message:</div>
          <div class="value">{{message}}</div>
        </div>
        
        <div class="field">
          <div class="label">Date:</div>
          <div class="value">{{date}}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>This email was sent from your Pet Memorial Heaven contact form.</p>
        <p>You can reply directly to this email to respond to {{from_name}}.</p>
      </div>
    </div>
  </body>
</html>
```

4. 在模板设置中：
   - **Template Name**: "Contact Form Template"
   - **Subject**: "New Contact Form: {{subject}}"
   - **To**: 你的谷歌邮箱地址
   - **From**: "Pet Memorial Heaven <your-email@gmail.com>"

5. 点击 "Save" 保存模板
6. 记下生成的 **Template ID**

## 🔑 步骤 4: 获取 Public Key

1. 在控制台中点击 "Account"
2. 找到 "Public Key" 部分
3. 复制你的 **Public Key**

## 🚀 步骤 5: 更新环境变量

1. 在项目根目录创建 `.env.local` 文件（如不存在）
2. 添加并更新以下环境变量：

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

3. 将上述值替换为你在前面步骤中获取的实际配置（Service ID、Template ID 和 Public Key）

## ✅ 步骤 6: 测试功能

1. 重启你的开发服务器（如果正在运行）：
   ```bash
   npm run dev
   ```
2. 访问 http://localhost:3001/contact
3. 填写表单并提交
4. 检查你的邮箱是否收到测试邮件

## 🔧 环境变量说明

使用环境变量的好处：
- ✅ 安全：敏感信息不会暴露在代码中
- ✅ 灵活：可以在不同环境使用不同配置
- ✅ 便于维护：集中管理所有配置

注意：环境变量必须以 `NEXT_PUBLIC_` 开头，才能在客户端代码中访问。

## 🔒 安全提示

1. **不要在生产环境中硬编码敏感信息**，考虑使用环境变量
2. **设置 Gmail 应用专用密码**（如果使用两步验证）
3. **在 EmailJS 控制台中设置邮件发送限制**，防止滥用
4. **考虑添加 reCAPTCHA** 防止机器人提交

## 🛠️ 故障排除

如果邮件发送失败：

1. 检查 EmailJS 控制台中的错误日志
2. 确认你的 Gmail 账户允许第三方应用访问
3. 验证所有 ID 和密钥是否正确
4. 检查浏览器控制台是否有 JavaScript 错误

## 📚 额外功能（可选）

你还可以考虑添加：
- 表单验证增强
- 文件附件支持
- 自动回复功能
- 邮件发送统计

完成设置后，用户通过 contact 表单发送的消息将直接发送到你的谷歌邮箱！