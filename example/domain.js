const { addDomainRecord } = require('../alidns');

const domainChallengeProcess = async (domain, RR) => {
  const L = domain.split('.');
  const pre = L.slice(0, L.length - 2).join('.');
  if (pre) {
    domain = domain.replace(`${pre}.`, '');
  }
  return [domain, pre ? [RR, pre].join('.') : RR];
}

async function run () {
  const [domain, RR] = await domainChallengeProcess('*.dev.example.com', '_acme-challenge');

  const result = await addDomainRecord(domain, RR, 'TXT', 'TESTING')
  console.log('result', result);
}

run();