import { pagesPath } from '@/libs/$path';

export const PER_MAX_SUPPLY = 3;
export const MAX_SUPPLY = 30;
export const PRICE = 0.03;
export const RINKEBY_CHAIN_ID = '0x4' as const;

export const MUMBAI_TESTNET_CHAIN_ID = '0x13881' as const;

export const APP_NAME = 'polygon-generative-nft';
export const PAGE_PATH_AND_NAME = [{ name: 'Top', href: pagesPath.$url().pathname }] as const;

export const EMPTY_THUMBNAIL_URL = 'https://placehold.jp/300x200.png' as const;

export const OPENSEA_URL = 'https://testnets.opensea.io/collection/nft-collectible-ejsqsl9d3c' as const;
