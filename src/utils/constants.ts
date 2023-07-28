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
  HOME: '/'
}

export const COOKIES = {
  SIGNATURE: '_sig'
}

export const AccountType = [
  { status: 'WALLET_IN_BOTH_LIST', msg: 'This address is on the whitelist and allowlist.' },
  { status: 'WALLET_IN_ALLOW_LIST_ONLY', msg: 'This address is on the allowlist.' },
  { status: 'WALLET_IN_WHITE_LIST_ONLY', msg: 'This address is on the whitelist.' },
  { status: 'WALLET_NOT_IN_BOTH_LIST', msg: 'Sorry, this address is not on the list.' }
]

export enum EWalletListType {
  ALLOW_LIST = 'ALLOW_LIST',
  WHITE_LIST = 'WHITE_LIST'
}
