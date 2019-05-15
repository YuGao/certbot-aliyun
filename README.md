# Certbot Aliyun DNS

## 实现原理

### DNS 验证规则
- 需要在 DNS 配置一条 TXT 记录, 值为一个随机字符串
- 记录名称为 _acme-challenge.${domain}

### 需要使用阿里云 DNS 解析接口

- [云解析 DNS 接口文档](https://help.aliyun.com/document_detail/29740.html?spm=a2c4g.11186623.6.585.QkQjtG)

### 验证钩子, 可以从环境变量中获取到参数
- env.CERTBOT_DOMAIN 验证域名
- env.CERTBOT_VALIDATION 验证字符串

> 调用阿里云解析接口添加 TXT 记录, 值为 env.CERTBOT_VALIDATION

### 清理钩子, 环境变量
- env.CERTBOT_AUTH_OUTPUT 验证钩子脚本中的输出内容

> 调用阿里云解析接口删除对应的记录

## 使用方式

### 下载项目

> git clone https://github.com/YuGao/certbot-aliyun.git

### 配置阿里云 DNS 密钥

访问阿里云 [访问控制 RAM 控制台](https://ram.console.aliyun.com/?spm=5176.12818093.aliyun_sidebar.aliyun_sidebar_ram.488716d0l7XKRH#/overview)

添加用户, 授权 AliyunDNSFullAccess

> 修改配置文件 config/aliyun.js
```javascript
module.exports = {
  AccessKeyID: 'AccessKeyID',
  AccessKeySecret: 'AccessKeySecret'
}
```

### 生成证书命令
> certbot certonly --manual-public-ip-logging-ok --agree-tos \
--email gaoyu@hexdo.com \
--preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual \
--manual-auth-hook 'node /path/to/auth.js' \
--manual-cleanup-hook 'node /path/to/cleanup.js' \
-d T.example.com

### 通配符域名 / 泛域名
certbot certonly --manual-public-ip-logging-ok --agree-tos \
--email gaoyu@hexdo.com \
--preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual \
--manual-auth-hook 'node /path/to/auth.js' \
--manual-cleanup-hook 'node /path/to/cleanup.js' \
-d *.dev.example.com

### 删除证书

- 查看列表 certbot certificates
- 删除命令 certbot delete --cert-name T.example.com

### 更新证书配置

> 证书更新配置文件目录 /etc/letsencrypt/renewal

- manual_auth_hook = node /path/to/DNS/auth.js
- manual_cleanup_hook = node /path/to/DNS/cleanup.js

### 更新执行命令
> certbot renew

### 配置自动更新证书

crontab -e

> 0 2 * * * /usr/bin/certbot renew >> /mnt/certbot-renew.log

service crond restart