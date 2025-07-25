export const idlFactory = ({ IDL }) => {
  const BuyAgentRequest = IDL.Record({
    'agent_id' : IDL.Text,
    'buyer' : IDL.Text,
  });
  const MarketplaceResponse = IDL.Record({
    'status' : IDL.Text,
    'data' : IDL.Opt(IDL.Text),
    'message' : IDL.Text,
  });
  const CreateAgentRequest = IDL.Record({
    'code' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'version' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Nat64,
  });
  const Agent = IDL.Record({
    'id' : IDL.Text,
    'updated_at' : IDL.Nat64,
    'code' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'author' : IDL.Text,
    'version' : IDL.Text,
    'category' : IDL.Text,
    'rating' : IDL.Float64,
    'price' : IDL.Nat64,
    'downloads' : IDL.Nat64,
  });
  const AgentListing = IDL.Record({
    'total_sales' : IDL.Nat64,
    'agent' : Agent,
    'total_revenue' : IDL.Nat64,
    'is_active' : IDL.Bool,
  });
  const Purchase = IDL.Record({
    'id' : IDL.Text,
    'transaction_hash' : IDL.Text,
    'seller' : IDL.Text,
    'agent_id' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'buyer' : IDL.Text,
    'price' : IDL.Nat64,
  });
  const RegisterUserRequest = IDL.Record({
    'username' : IDL.Text,
    'email' : IDL.Text,
  });
  return IDL.Service({
    'buy_agent' : IDL.Func([BuyAgentRequest], [MarketplaceResponse], []),
    'create_agent' : IDL.Func([CreateAgentRequest], [MarketplaceResponse], []),
    'get_active_listings' : IDL.Func([], [IDL.Vec(AgentListing)], ['query']),
    'get_agent' : IDL.Func([IDL.Text], [IDL.Opt(Agent)], ['query']),
    'get_agent_listing' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(AgentListing)],
        ['query'],
      ),
    'get_agents_by_category' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Agent)],
        ['query'],
      ),
    'get_all_agents' : IDL.Func([], [IDL.Vec(Agent)], ['query']),
    'get_user_agents' : IDL.Func([IDL.Text], [IDL.Vec(Agent)], ['query']),
    'get_user_purchases' : IDL.Func([IDL.Text], [IDL.Vec(Purchase)], ['query']),
    'marketplace_stats' : IDL.Func([], [MarketplaceResponse], ['query']),
    'register_user' : IDL.Func(
        [RegisterUserRequest],
        [MarketplaceResponse],
        [],
      ),
    'toggle_agent_listing' : IDL.Func([IDL.Text], [MarketplaceResponse], []),
    'update_agent' : IDL.Func(
        [IDL.Text, CreateAgentRequest],
        [MarketplaceResponse],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
