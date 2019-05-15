const { resolve } = require('path')
const env = process.env || {};
const { deleteDomainRecord } = require(resolve(__dirname, 'alidns.js'));

console.log("开始清理验证DNS记录");

async function start () {
  const AUTH_OUTPUT = env.CERTBOT_AUTH_OUTPUT;
  try {
    const [domain, RecordId] = AUTH_OUTPUT.split(',');
    console.log('domain', domain, 'RecordId', RecordId);
    const result = await deleteDomainRecord(domain, RecordId);
    console.log('cleanup-result', result);
  } catch (error) {
    console.log('error', error);
  }
}

start();