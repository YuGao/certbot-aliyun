## Certbot Aliyun DNS

### 配置文件地址
> config/aliyun.js
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
--manual-auth-hook 'node /root/DNS/auth.js' \
--manual-cleanup-hook 'node /root/DNS/cleanup.js' \
-d T.example.com

### 通配符域名 / 泛域名
certbot certonly --manual-public-ip-logging-ok --agree-tos \
--email gaoyu@hexdo.com \
--preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual \
--manual-auth-hook 'node /root/DNS/auth.js' \
--manual-cleanup-hook 'node /root/DNS/cleanup.js' \
-d *.dev.example.com

### 删除证书
- 查看列表 certbot certificates
- 删除命令 certbot delete --cert-name test.spider.hexyou.com

### 更新证书

> 证书更新配置文件目录 /etc/letsencrypt/renewal

- manual_auth_hook = node /path/to/DNS/auth.js
- manual_cleanup_hook = node /path/to/DNS/cleanup.js

### 更新执行命令
> certbot renew