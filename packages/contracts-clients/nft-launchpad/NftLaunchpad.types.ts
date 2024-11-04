/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Addr = string;
export interface InstantiateMsg {
  config: Config;
  [k: string]: unknown;
}
export interface Config {
  launchpad_admin: Addr;
  name: string;
  nft_code_id?: number | null;
  owner: Addr;
  supported_networks: string[];
}
export type ExecuteMsg = {
  update_config: {
    changes: ConfigChanges;
    [k: string]: unknown;
  };
} | {
  submit_collection: {
    collection: Collection;
    [k: string]: unknown;
  };
} | {
  update_merkle_root: {
    collection_id: string;
    merkle_root: string;
    [k: string]: unknown;
  };
} | {
  deploy_collection: {
    collection_id: string;
    [k: string]: unknown;
  };
};
export type Uint128 = string;
export interface ConfigChanges {
  launchpad_admin?: string | null;
  name: string;
  nft_code_id?: number | null;
  owner?: string | null;
  supported_networks: string[];
}
export interface Collection {
  artwork_desc: string;
  base_token_uri?: string | null;
  contact_email: string;
  cover_img_uri: string;
  dao_whitelist_count: number;
  deployed_address?: string | null;
  desc: string;
  escrow_mint_proceeds_period: number;
  expected_mint_date: number;
  expected_public_mint_price: number;
  expected_supply: number;
  investment_desc: string;
  investment_link: string;
  is_applied_previously: boolean;
  is_dox: boolean;
  is_project_derivative: boolean;
  is_ready_for_mint: boolean;
  metadatas_merkle_root?: string | null;
  mint_periods: MintPeriod[];
  name: string;
  owner?: string | null;
  partners: string;
  project_desc: string;
  project_type: string;
  reveal_time?: number | null;
  royalty_address?: Addr | null;
  royalty_percentage?: number | null;
  symbol: string;
  target_network: string;
  team_desc: string;
  tokens_count: number;
  website_link: string;
}
export interface MintPeriod {
  end_time?: number | null;
  limit_per_address?: number | null;
  max_tokens?: number | null;
  price?: Coin | null;
  start_time: number;
  whitelist_info?: WhitelistInfo | null;
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export interface WhitelistInfo {
  addresses_count: number;
  addresses_ipfs: string;
  addresses_merkle_root: string;
}
export type QueryMsg = {
  get_collection_by_id: {
    collection_id: string;
    [k: string]: unknown;
  };
} | {
  get_config: {
    [k: string]: unknown;
  };
};