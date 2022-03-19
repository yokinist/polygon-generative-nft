import { pagesPath } from '@/libs/$path';

export const RINKEBY_CHAIN_ID = '0x4' as const;

export const MUMBAI_TESTNET_CHAIN_ID = '0x13881' as const;

export const APP_NAME = 'polygon-generative-nft';
export const SERVICE_LOGO = 'https://placehold.jp/200x200.png' as const;

export const PAGE_PATH_AND_NAME = [{ name: 'Top', href: pagesPath.$url().pathname }] as const;

export const EMPTY_THUMBNAIL_URL = 'https://placehold.jp/300x200.png' as const;
