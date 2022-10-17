/// <reference types="vite/client" />

declare module "virtual:pwa-register/react" {
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore ignore when react is not installed
  import type { Dispatch, SetStateAction } from "react";

  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterError?: (error: any) => void;
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}

interface Meta {
  count: number;
  current: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  current_page?: number;
}

interface Contract_NFT {
  tokenId: number;
  mintedBy: string; // address
  currentOwner: string; // address
  previousOwner: string; // address
  price: number;
  numberOfTransfers: number;
}

interface Contract_methods {
  address: string;
  deployed: () => void;
  collectionName: string;
  collectionNameSymbol: string;
  createAndListToken: (
    tokenURI: string,
    price: number,
    collection_id: number
  ) => number; // tokenID
  buyToken: (tokenId: number) => void;
  changeTokenPrice: (tokenId: number, newPrice: number) => void; // you must be the owner of the token
  getServiceFeesPrice: () => number;
  setServiceFeesPrice: (newPrice: number) => number;
  getTokenOwner: (tokenId: number) => string;
  getTokenURI: (tokenId: number) => string;
  getTotalNumberOfTokensOwnedByAnAddress: (owner: string) => number;
  getTokenExists: (tokenId: number) => boolean;
  burn: (tokenId: number) => void;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  collections_count: number;
  nfts_count: number;
}

interface Transactions {
  id: number;
  from: UserData;
  to: UserData;
  price: number | string;
  created_at: Date;
  type: "mint" | "set_for_sale" | "sale" | "update_price";
}
interface Nft {
  id: number;
  title: string;
  creator_address: string;
  description: string;
  file_path: string;
  collection: Collection;
  creator: UserData;
  owner: UserData;
  price: number;
  like_count: number;
  is_for_sale: boolean;
  token_id: string;
  is_liked?: boolean;
  transactions: Transactions[];
  sale_end_at: Date;
}

interface Collection {
  id: number;
  banner_image: string;
  collection_token_id: number;
  description: string;
  facebook_url: string | null;
  instagram_url: string | null;
  is_sensitive_content: boolean;
  logo_image: string;
  name: string;
  telegram_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  nfts: Nft[];
  created_by: UserData;
  nfts_count: number;
  collaborators: UserData[];
}

interface KycData {
  id: number;
  gender?: "male" | "female";
  country?: string;
  city?: string;
  address?: string;
  phone_number?: string;
  author_type?: "creator" | "collector";
  author_art_type?: string;
  passport_id?: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  wallet_address: string;
  username: string;
  email: string;
  bio: string;
  facebook_url: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  profile_photo: string;
  banner_photo: string;
  is_verified: boolean;
  status: "enabled" | "pending";
  collections?: Collection[];
  followers?: Nft[];
  following?: Nft[];
  liked_nfts?: Nft[];
  nfts?: Nft[];
  is_followed?: boolean;
  is_subscribed: boolean;
}

interface navLink {
  name: string;
  path: string;
  icon: React.ReactNode;
  isVisible: boolean;
  elements?: navLink[];
}

//  ######  CustomLink  ######## //
interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//

interface LoginCredentials {
  email: string;
  password: string;
}
