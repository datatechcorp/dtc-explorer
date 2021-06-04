export const setting = {
  fullNodeHost:
    process.env.REACT_APP_FULL_NODE_HOST || 'http://localhost:16667',
  solidityHost: process.env.REACT_APP_SOLIDITY_HOST || 'http://localhost:16668',
  eventHost: process.env.REACT_APP_EVENT_HOST || 'http://localhost:16670',
  backendHost: process.env.REACT_APP_BACKEND_HOST || 'http://localhost:16670',
  utilHost: process.env.REACT_APP_UTIL_HOST || 'http://localhost:16671',
  productionMode: process.env.NODE_ENV == 'production',
  enterprise_link: process.env.REACT_APP_ENTERPRISE_LINK || '/enterprise',
  maxTickBlocks: 10,
  maxTickTxs: 20,
  symbol: 'DTC',
  blockReward: 16,
  priceInUsd: 0.1659,
  tokenTypes: ['DRC10', 'DRC20'] as const, // add DRC721 later
};
