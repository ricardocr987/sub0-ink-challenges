// Generated by dedot cli

import type { GenericSubstrateApi } from 'dedot/types';
import type { AccountId32, Bytes } from 'dedot/codecs';
import type { GenericContractEvents, GenericContractEvent } from 'dedot/contracts';

export interface ContractEvents<ChainApi extends GenericSubstrateApi> extends GenericContractEvents<ChainApi> {
  /**
   * Event emitted when allowance by `owner` to `spender` changes.
   *
   * @signature_topic: 0x25cdb6c93882e925abbfc9a8b7c85884b73c038c03a2492f238a5e5ba3fbff8c
   **/
  Approval: GenericContractEvent<
    'Approval',
    {
      /**
       * Account providing allowance.
       *
       * @indexed: true
       **/
      owner: AccountId32;
      /**
       * Allowance beneficiary.
       *
       * @indexed: true
       **/
      spender: AccountId32;
      /**
       * New allowance amount.
       *
       * @indexed: false
       **/
      value: bigint;
    }
  >;

  /**
   * Event emitted when transfer of tokens occurs.
   *
   * @signature_topic: 0x990df076cb1e9527aa102cd100c1481efe393eeabb5825f9af1f5e58221864de
   **/
  Transfer: GenericContractEvent<
    'Transfer',
    {
      /**
       * Transfer sender. `None` in case of minting new tokens.
       *
       * @indexed: true
       **/
      from: AccountId32 | undefined;
      /**
       * Transfer recipient. `None` in case of burning tokens.
       *
       * @indexed: true
       **/
      to: AccountId32 | undefined;
      /**
       * Amount of tokens transferred (or minted/burned).
       *
       * @indexed: false
       **/
      value: bigint;
    }
  >;

  /**
   * Event emitted when a token class is created.
   *
   * @signature_topic: 0x648f9ee41e2c823d37f3266f19d1f51569aea72d7334a4a2f0989bc811444683
   **/
  Create: GenericContractEvent<
    'Create',
    {
      /**
       * The ID of the asset.
       *
       * @indexed: true
       **/
      id: number;
      /**
       * Creator of the asset.
       *
       * @indexed: true
       **/
      creator: AccountId32;
      /**
       * Admin of the asset.
       *
       * @indexed: true
       **/
      admin: AccountId32;
    }
  >;

  /**
   * Event emitted when a asset is in the process of being destroyed.
   *
   * @signature_topic: 0x92d8630513e9f47700a9bf547321d9901740aeacbad949335e89fb2aadcf2087
   **/
  StartDestroy: GenericContractEvent<
    'StartDestroy',
    {
      /**
       * The ID of the asset.
       *
       * @indexed: true
       **/
      id: number;
    }
  >;

  /**
   * Event emitted when new metadata is set for an asset.
   *
   * @signature_topic: 0xbc31e5b62fa0cb21d7fb7bc3b3c439f628020e75dd6c4c7ec3734edb9d5f441b
   **/
  SetMetadata: GenericContractEvent<
    'SetMetadata',
    {
      /**
       * The ID of the asset created.
       *
       * @indexed: true
       **/
      id: number;
      /**
       * The name of the asset.
       *
       * @indexed: true
       **/
      name: Bytes;
      /**
       * The symbol of the asset.
       *
       * @indexed: true
       **/
      symbol: Bytes;
      /**
       * The decimals of the asset.
       *
       * @indexed: false
       **/
      decimals: number;
    }
  >;

  /**
   * Event emitted when metadata is cleared for a token.
   *
   * @signature_topic: 0x4efbfedc5b1e975a70922a52d03f24912a4207e695f03701d0a71dc62f2b546d
   **/
  ClearMetadata: GenericContractEvent<
    'ClearMetadata',
    {
      /**
       * The ID of the asset.
       *
       * @indexed: true
       **/
      id: number;
    }
  >;
}
