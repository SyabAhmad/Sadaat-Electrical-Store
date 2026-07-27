import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120,
  maxKeys: 500,
});

export default cache;