const resolve = require('path').resolve;
const env = process.env || {};

const { CERTBOT_DOMAIN, CERTBOT_VALIDATION } = env;

const { addDomainRecord } = require(resolve(__dirname, 'alidns.js'));

const sleep = async (sec) => {
  return new Promise(resolve => setTimeout(resolve, sec));
}

// 转换为二级域名和子域名 ['dev.example.com', 'app'] => ['example.com', 'app.dev']
const domainChallengeProcess = async (domain, RR) => {
  const L = domain.split('.');
  const pre = L.slice(0, L.length - 2).join('.');
  if (pre) {
    domain = domain.replace(`${pre}.`, '');
  }
  return [domain, pre ? [RR, pre].join('.') : RR];
}

async function start () {

  const [domain, RR] = await domainChallengeProcess(CERTBOT_DOMAIN, '_acme-challenge');
  const result = await addDomainRecord(domain, RR, 'TXT', CERTBOT_VALIDATION);
  if (result && result.RecordId) {
    // 打印输出格式 `domain,RecordId` 清理脚本使用
    console.log(`${domain},${result.RecordId}`);
    await sleep(5000);
  }
}

start();