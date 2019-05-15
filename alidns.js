const Core = require('@alicloud/pop-core');

const config = require('./config/aliyun');

const client = new Core({
  accessKeyId: config.AccessKeyID,
  accessKeySecret: config.AccessKeySecret,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
});

const requestOptions = {
  method: 'POST'
};

// 获取域名列表
async function getDomainList () {
  const ACTION = 'DescribeDomains';
  const params = {};
  const result = await client.request(ACTION, params, requestOptions);
  if (result && result.Domains && result.Domains.Domain) {
    return result.Domains.Domain;
  }
  return [];
}

// 获取域名信息
async function getDomainInfo (domain) {
  const ACTION = 'DescribeDomainInfo';
  const params = { DomainName: domain };
  const info = await client.request(ACTION, params, requestOptions);
  return info;
}

// 获取域名解析记录列表
async function getDomainRecords (domain) {
  const ACTION = 'DescribeDomainRecords';
  const params = { DomainName: domain };
  const result = await client.request(ACTION, params, requestOptions);
  if (result && result.DomainRecords && result.DomainRecords.Record) {
    return result.DomainRecords.Record;
  }
  return [];
}

/**
 * 添加解析记录
 * @param {*} DomainName 域名
 * @param {*} RR 主机记录 @ | * | code
 * @param {*} Type 解析类型 A 指向IPV4 | CNAME 指向另外的域名 | AAAA IPV6 | TXT 文本
 * @param {*} Value 解析值
 */
async function addDomainRecord (DomainName, RR, Type, Value) {
  const ACTION = 'AddDomainRecord';
  const params = { DomainName, RR, Type, Value }

  const result = await client.request(ACTION, params, requestOptions).catch(error => {
    return { ok: 0, msg: error.name, code: error.code }
  })
  return result;
}

/**
 * 删除解析记录
 */
async function deleteDomainRecord (DomainName, RecordId) {
  const ACTION = 'DeleteDomainRecord';
  const params = { DomainName, RecordId };
  const result = await client.request(ACTION, params, requestOptions).catch(error => {
    return { ok: 0, msg: error.name, code: error.code }
  });
  return result;
}

module.exports = {
  getDomainList,
  getDomainInfo,
  getDomainRecords,
  addDomainRecord,
  deleteDomainRecord
}