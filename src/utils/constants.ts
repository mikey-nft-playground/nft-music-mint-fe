export const SITE_DOMAIN_URL = 'http://localhost:3000'
export const SITE_TITLE = 'GroundUp - Genesis Pass'
export const SITE_DESC = 'GroundUp Genesis Pass'
export const SITE_KEYWORDS = [
  'GroundUp',
  'NFT',
  'erc721',
  'marketplace',
  'tokens',
  'tokenization',
  'digital goods',
  'trade',
  'crypto',
  'blockchain'
]

export const PATHS = {
  HOME: '/',
  METAMASK_DOWNLOAD: 'https://metamask.io/download/#listing'
}

export const COOKIES = {
  SIGNATURE: '_sig'
}

export const AccountType = [
  { status: 'WALLET_IN_BOTH_LIST', msg: 'Your wallet address is in both Allowlist and Whitelist.' },
  { status: 'WALLET_IN_ALLOW_LIST_ONLY', msg: 'Your wallet address is in Allowlist.' },
  { status: 'WALLET_IN_WHITE_LIST_ONLY', msg: 'Your wallet address is in Whitelist.' },
  { status: 'WALLET_NOT_IN_BOTH_LIST', msg: 'Your wallet address is not eligible to mint.' }
]

export enum EWalletListType {
  ALLOW_LIST = 'ALLOW_LIST',
  WHITE_LIST = 'WHITE_LIST'
}
