import { Actor, HttpAgent } from '@dfinity/agent';

const CANISTER_ID = 'uxrrr-q7777-77774-qaaaq-cai';

const idlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({
    create_agent: IDL.Func([
      IDL.Record({
        name: IDL.Text,
        description: IDL.Text,
        code: IDL.Text,
        price: IDL.Nat64,
        category: IDL.Text,
        version: IDL.Text,
      })
    ], [
      IDL.Record({
        status: IDL.Text,
        message: IDL.Text,
        data: IDL.Opt(IDL.Text),
      })
    ], ['update']),

    buy_agent: IDL.Func([
      IDL.Record({ agent_id: IDL.Text })
    ], [
      IDL.Record({
        status: IDL.Text,
        message: IDL.Text,
        data: IDL.Opt(IDL.Text),
      })
    ], ['update']),

    get_agent: IDL.Func([
      IDL.Text
    ], [
      IDL.Opt(IDL.Record({
        id: IDL.Text,
        name: IDL.Text,
        description: IDL.Text,
        code: IDL.Text,
        price: IDL.Nat64,
        author: IDL.Text,
        category: IDL.Text,
        version: IDL.Text,
        created_at: IDL.Nat64,
        updated_at: IDL.Nat64,
        downloads: IDL.Nat64,
        rating: IDL.Float64,
      }))
    ], ['query']),

    get_all_agents: IDL.Func([], [IDL.Vec(IDL.Record({
      id: IDL.Text,
      name: IDL.Text,
      description: IDL.Text,
      code: IDL.Text,
      price: IDL.Nat64,
      author: IDL.Text,
      category: IDL.Text,
      version: IDL.Text,
      created_at: IDL.Nat64,
      updated_at: IDL.Nat64,
      downloads: IDL.Nat64,
      rating: IDL.Float64,
    }))], ['query']),

    get_agents_by_category: IDL.Func([
      IDL.Text
    ], [IDL.Vec(IDL.Record({
      id: IDL.Text,
      name: IDL.Text,
      description: IDL.Text,
      code: IDL.Text,
      price: IDL.Nat64,
      author: IDL.Text,
      category: IDL.Text,
      version: IDL.Text,
      created_at: IDL.Nat64,
      updated_at: IDL.Nat64,
      downloads: IDL.Nat64,
      rating: IDL.Float64,
    }))], ['query']),

    get_user_agents: IDL.Func([
      IDL.Text
    ], [IDL.Vec(IDL.Record({
      id: IDL.Text,
      name: IDL.Text,
      description: IDL.Text,
      code: IDL.Text,
      price: IDL.Nat64,
      author: IDL.Text,
      category: IDL.Text,
      version: IDL.Text,
      created_at: IDL.Nat64,
      updated_at: IDL.Nat64,
      downloads: IDL.Nat64,
      rating: IDL.Float64,
    }))], ['query']),

    get_agent_listing: IDL.Func([
      IDL.Text
    ], [IDL.Opt(IDL.Record({
      agent: IDL.Record({
        id: IDL.Text,
        name: IDL.Text,
        description: IDL.Text,
        code: IDL.Text,
        price: IDL.Nat64,
        author: IDL.Text,
        category: IDL.Text,
        version: IDL.Text,
        created_at: IDL.Nat64,
        updated_at: IDL.Nat64,
        downloads: IDL.Nat64,
        rating: IDL.Float64,
      }),
      is_active: IDL.Bool,
      total_sales: IDL.Nat64,
      total_revenue: IDL.Nat64,
    }))], ['query']),

    get_active_listings: IDL.Func([], [IDL.Vec(IDL.Record({
      agent: IDL.Record({
        id: IDL.Text,
        name: IDL.Text,
        description: IDL.Text,
        code: IDL.Text,
        price: IDL.Nat64,
        author: IDL.Text,
        category: IDL.Text,
        version: IDL.Text,
        created_at: IDL.Nat64,
        updated_at: IDL.Nat64,
        downloads: IDL.Nat64,
        rating: IDL.Float64,
      }),
      is_active: IDL.Bool,
      total_sales: IDL.Nat64,
      total_revenue: IDL.Nat64,
    }))], ['query']),

    get_user_purchases: IDL.Func([
      IDL.Text
    ], [IDL.Vec(IDL.Record({
      id: IDL.Text,
      agent_id: IDL.Text,
      buyer: IDL.Text,
      seller: IDL.Text,
      price: IDL.Nat64,
      timestamp: IDL.Nat64,
      transaction_hash: IDL.Text,
    }))], ['query']),

    update_agent: IDL.Func([
      IDL.Text,
      IDL.Record({
        name: IDL.Text,
        description: IDL.Text,
        code: IDL.Text,
        price: IDL.Nat64,
        category: IDL.Text,
        version: IDL.Text,
      })
    ], [IDL.Record({
      status: IDL.Text,
      message: IDL.Text,
      data: IDL.Opt(IDL.Text),
    })], ['update']),

    toggle_agent_listing: IDL.Func([
      IDL.Text
    ], [IDL.Record({
      status: IDL.Text,
      message: IDL.Text,
      data: IDL.Opt(IDL.Text),
    })], ['update']),

    marketplace_stats: IDL.Func([], [IDL.Record({
      status: IDL.Text,
      message: IDL.Text,
      data: IDL.Opt(IDL.Text),
    })], ['query']),

    register_user: IDL.Func([
      IDL.Record({
        username: IDL.Text,
        email: IDL.Text,
      })
    ], [IDL.Record({
      status: IDL.Text,
      message: IDL.Text,
      data: IDL.Opt(IDL.Text),
    })], ['update']),
  });
};

const agent = new HttpAgent({
  host: 'http://127.0.0.1:4943',
});

agent.fetchRootKey().catch(() => {
  console.warn('Warning: unable to fetch root key, running outside localhost?');
});

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID,
});

export const createAgent = async (payload: any) => await actor.create_agent(payload);
export const buyAgent = async (payload: any) => await actor.buy_agent(payload);
export const getAgent = async (agentId: any) => await actor.get_agent(agentId);
export const getAllAgents = async () => await actor.get_all_agents();
export const getAgentsByCategory = async (category: any) => await actor.get_agents_by_category(category);
export const getUserAgents = async (userId: any) => await actor.get_user_agents(userId);
export const getAgentListing = async (agentId: any) => await actor.get_agent_listing(agentId);
export const getActiveListings = async () => await actor.get_active_listings();
export const getUserPurchases = async (userId: any) => await actor.get_user_purchases(userId);
export const updateAgent = async (agentId: any, payload: any) => await actor.update_agent(agentId, payload);
export const toggleAgentListing = async (agentId: any) => await actor.toggle_agent_listing(agentId);
export const getMarketplaceStats = async () => await actor.marketplace_stats();
export const registerUser = async (payload: any) => await actor.register_user(payload);
