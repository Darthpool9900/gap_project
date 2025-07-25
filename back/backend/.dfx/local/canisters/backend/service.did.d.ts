import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Agent {
  'id' : string,
  'updated_at' : bigint,
  'code' : string,
  'name' : string,
  'description' : string,
  'created_at' : bigint,
  'author' : string,
  'version' : string,
  'category' : string,
  'rating' : number,
  'price' : bigint,
  'downloads' : bigint,
}
export interface AgentListing {
  'total_sales' : bigint,
  'agent' : Agent,
  'total_revenue' : bigint,
  'is_active' : boolean,
}
export interface BuyAgentRequest { 'agent_id' : string, 'buyer' : string }
export interface CreateAgentRequest {
  'code' : string,
  'name' : string,
  'description' : string,
  'version' : string,
  'category' : string,
  'price' : bigint,
}
export interface MarketplaceResponse {
  'status' : string,
  'data' : [] | [string],
  'message' : string,
}
export interface Purchase {
  'id' : string,
  'transaction_hash' : string,
  'seller' : string,
  'agent_id' : string,
  'timestamp' : bigint,
  'buyer' : string,
  'price' : bigint,
}
export interface RegisterUserRequest { 'username' : string, 'email' : string }
export interface User {
  'id' : string,
  'username' : string,
  'created_at' : bigint,
  'email' : string,
}
export interface _SERVICE {
  'buy_agent' : ActorMethod<[BuyAgentRequest], MarketplaceResponse>,
  'create_agent' : ActorMethod<[CreateAgentRequest], MarketplaceResponse>,
  'get_active_listings' : ActorMethod<[], Array<AgentListing>>,
  'get_agent' : ActorMethod<[string], [] | [Agent]>,
  'get_agent_listing' : ActorMethod<[string], [] | [AgentListing]>,
  'get_agents_by_category' : ActorMethod<[string], Array<Agent>>,
  'get_all_agents' : ActorMethod<[], Array<Agent>>,
  'get_user_agents' : ActorMethod<[string], Array<Agent>>,
  'get_user_purchases' : ActorMethod<[string], Array<Purchase>>,
  'marketplace_stats' : ActorMethod<[], MarketplaceResponse>,
  'register_user' : ActorMethod<[RegisterUserRequest], MarketplaceResponse>,
  'toggle_agent_listing' : ActorMethod<[string], MarketplaceResponse>,
  'update_agent' : ActorMethod<
    [string, CreateAgentRequest],
    MarketplaceResponse
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
