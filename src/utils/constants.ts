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

export const AccountType = {
  WALLET_IN_BOTH_LIST: {
    status: 'WALLET_IN_BOTH_LIST',
    msg: 'This address is on the whitelist and allowlist.'
  },
  WALLET_IN_ALLOW_LIST_ONLY: {
    status: 'WALLET_IN_ALLOW_LIST_ONLY',
    msg: 'This address is on the allowlist.'
  },
  WALLET_IN_WHITE_LIST_ONLY: {
    status: 'WALLET_IN_WHITE_LIST_ONLY',
    msg: 'This address is on the whitelist.'
  },
  WALLET_NOT_IN_BOTH_LIST: {
    status: 'WALLET_NOT_IN_BOTH_LIST',
    msg: 'Sorry, this address is not on the list.'
  }
}

export enum EWalletListType {
  ALLOW_LIST = 'ALLOW_LIST',
  WHITE_LIST = 'WHITE_LIST'
}
