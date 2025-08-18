use ic_cdk::api::time;
use ic_cdk::{init, query, update};
use std::cell::RefCell;
use std::collections::HashMap;
use crate::models::{
    Agent, AgentListing, Purchase, MarketplaceResponse,
    CreateAgentRequest, BuyAgentRequest, RegisterUserRequest, User
};

thread_local! {
    // Marketplace Storage
    static AGENTS: RefCell<HashMap<String, Agent>> = RefCell::new(HashMap::new());
    static LISTINGS: RefCell<HashMap<String, AgentListing>> = RefCell::new(HashMap::new());
    static PURCHASES: RefCell<HashMap<String, Purchase>> = RefCell::new(HashMap::new());
    static USER_AGENTS: RefCell<HashMap<String, Vec<String>>> = RefCell::new(HashMap::new()); // user_id -> agent_ids
    static USERS: RefCell<HashMap<String, User>> = RefCell::new(HashMap::new());
}

#[init]
fn init() {
    ic_cdk::println!("🚀 Agent Marketplace initialized!");
}

fn generate_agent_id() -> String {
    format!("agent_{}", time())
}

fn generate_purchase_id() -> String {
    format!("purchase_{}", time())
}

fn generate_transaction_hash() -> String {
    format!("tx_{}", time())
}

#[update]
pub async fn create_agent(request: CreateAgentRequest) -> MarketplaceResponse {
    let caller = ic_cdk::caller().to_string();
    let timestamp = time();
    let agent_id = generate_agent_id();
    
    let agent = Agent {
        id: agent_id.clone(),
        name: request.name,
        description: request.description,
        code: request.code,
        price: request.price,
        author: caller.clone(),
        category: request.category,
        version: request.version,
        created_at: timestamp,
        updated_at: timestamp,
        downloads: 0,
        rating: 0.0,
    };
    
    let listing = AgentListing {
        agent: agent.clone(),
        is_active: true,
        total_sales: 0,
        total_revenue: 0,
    };
    
    // Store agent and listing
    AGENTS.with(|agents| {
        agents.borrow_mut().insert(agent_id.clone(), agent);
    });
    
    LISTINGS.with(|listings| {
        listings.borrow_mut().insert(agent_id.clone(), listing);
    });
    
    // Add to user's agents
    USER_AGENTS.with(|user_agents| {
        let mut user_agents = user_agents.borrow_mut();
        user_agents.entry(caller).or_insert_with(Vec::new).push(agent_id.clone());
    });
    
    MarketplaceResponse {
        status: "success".to_string(),
        message: "Agent created successfully".to_string(),
        data: Some(agent_id),
    }
}

#[update]
pub async fn buy_agent(request: BuyAgentRequest) -> MarketplaceResponse {
    let caller = ic_cdk::caller().to_string();
    let timestamp = time();
    
    // Check if agent exists and is active
    let agent_opt = AGENTS.with(|agents| {
        agents.borrow().get(&request.agent_id).cloned()
    });
    
    if agent_opt.is_none() {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Agent not found".to_string(),
            data: None,
        };
    }
    
    let agent = agent_opt.unwrap();
    
    // Check if listing is active
    let listing_opt = LISTINGS.with(|listings| {
        listings.borrow().get(&request.agent_id).cloned()
    });
    
    if listing_opt.is_none() || !listing_opt.unwrap().is_active {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Agent is not available for purchase".to_string(),
            data: None,
        };
    }
    
    // Check if user is not buying their own agent
    if agent.author == caller {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Cannot buy your own agent".to_string(),
            data: None,
        };
    }
    
    // Create purchase record
    let purchase_id = generate_purchase_id();
    let transaction_hash = generate_transaction_hash();
    
    let purchase = Purchase {
        id: purchase_id.clone(),
        agent_id: request.agent_id.clone(),
        buyer: caller.clone(),
        seller: agent.author.clone(),
        price: agent.price,
        timestamp,
        transaction_hash: transaction_hash.clone(),
    };
    
    // Store purchase
    PURCHASES.with(|purchases| {
        purchases.borrow_mut().insert(purchase_id.clone(), purchase);
    });
    
    // Update agent downloads
    AGENTS.with(|agents| {
        if let Some(agent) = agents.borrow_mut().get_mut(&request.agent_id) {
            agent.downloads += 1;
        }
    });
    
    // Update listing stats
    LISTINGS.with(|listings| {
        if let Some(listing) = listings.borrow_mut().get_mut(&request.agent_id) {
            listing.total_sales += 1;
            listing.total_revenue += agent.price;
        }
    });
    
    // Add agent to buyer's collection
    USER_AGENTS.with(|user_agents| {
        let mut user_agents = user_agents.borrow_mut();
        user_agents.entry(caller).or_insert_with(Vec::new).push(request.agent_id);
    });
    
    MarketplaceResponse {
        status: "success".to_string(),
        message: "Agent purchased successfully".to_string(),
        data: Some(format!("Purchase ID: {}, Transaction: {}", purchase_id, transaction_hash)),
    }
}

#[query]
pub fn get_agent(agent_id: String) -> Option<Agent> {
    AGENTS.with(|agents| {
        agents.borrow().get(&agent_id).cloned()
    })
}

#[query]
pub fn get_all_agents() -> Vec<Agent> {
    AGENTS.with(|agents| {
        agents.borrow().values().cloned().collect()
    })
}

#[query]
pub fn get_agents_by_category(category: String) -> Vec<Agent> {
    AGENTS.with(|agents| {
        agents.borrow()
            .values()
            .filter(|agent| agent.category == category)
            .cloned()
            .collect()
    })
}

#[query]
pub fn get_user_agents(user_id: String) -> Vec<Agent> {
    USER_AGENTS.with(|user_agents| {
        let agent_ids = user_agents.borrow().get(&user_id).cloned().unwrap_or_default();
        AGENTS.with(|agents| {
            let agents_ref = agents.borrow();
            agent_ids.into_iter()
                .filter_map(|id| agents_ref.get(&id).cloned())
                .collect()
        })
    })
}

#[query]
pub fn get_agent_listing(agent_id: String) -> Option<AgentListing> {
    LISTINGS.with(|listings| {
        listings.borrow().get(&agent_id).cloned()
    })
}

#[query]
pub fn get_active_listings() -> Vec<AgentListing> {
    LISTINGS.with(|listings| {
        listings.borrow()
            .values()
            .filter(|listing| listing.is_active)
            .cloned()
            .collect()
    })
}

#[query]
pub fn get_user_purchases(user_id: String) -> Vec<Purchase> {
    PURCHASES.with(|purchases| {
        purchases.borrow()
            .values()
            .filter(|purchase| purchase.buyer == user_id)
            .cloned()
            .collect()
    })
}

#[update]
pub async fn update_agent(agent_id: String, request: CreateAgentRequest) -> MarketplaceResponse {
    let caller = ic_cdk::caller().to_string();
    let timestamp = time();
    
    // Check if agent exists and user is the author
    let agent_opt = AGENTS.with(|agents| {
        agents.borrow().get(&agent_id).cloned()
    });
    
    if agent_opt.is_none() {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Agent not found".to_string(),
            data: None,
        };
    }
    
    let mut agent = agent_opt.unwrap();
    
    if agent.author != caller {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Only the author can update this agent".to_string(),
            data: None,
        };
    }
    
    // Update agent
    agent.name = request.name;
    agent.description = request.description;
    agent.code = request.code;
    agent.price = request.price;
    agent.category = request.category;
    agent.version = request.version;
    agent.updated_at = timestamp;
    
    // Store updated agent
    AGENTS.with(|agents| {
        agents.borrow_mut().insert(agent_id.clone(), agent.clone());
    });
    
    // Update listing
    LISTINGS.with(|listings| {
        if let Some(listing) = listings.borrow_mut().get_mut(&agent_id) {
            listing.agent = agent;
        }
    });
    
    MarketplaceResponse {
        status: "success".to_string(),
        message: "Agent updated successfully".to_string(),
        data: Some(agent_id),
    }
}

#[update]
pub async fn toggle_agent_listing(agent_id: String) -> MarketplaceResponse {
    let caller = ic_cdk::caller().to_string();
    
    // Check if agent exists and user is the author
    let agent_opt = AGENTS.with(|agents| {
        agents.borrow().get(&agent_id).cloned()
    });
    
    if agent_opt.is_none() {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Agent not found".to_string(),
            data: None,
        };
    }
    
    let agent = agent_opt.unwrap();
    
    if agent.author != caller {
        return MarketplaceResponse {
            status: "error".to_string(),
            message: "Only the author can toggle this agent".to_string(),
            data: None,
        };
    }
    
    // Toggle listing status
    LISTINGS.with(|listings| {
        if let Some(listing) = listings.borrow_mut().get_mut(&agent_id) {
            listing.is_active = !listing.is_active;
        }
    });
    
    let status = LISTINGS.with(|listings| {
        listings.borrow().get(&agent_id).map(|l| l.is_active).unwrap_or(false)
    });
    
    MarketplaceResponse {
        status: "success".to_string(),
        message: format!("Agent listing {} successfully", if status { "activated" } else { "deactivated" }),
        data: Some(agent_id),
    }
}

#[query]
pub fn marketplace_stats() -> MarketplaceResponse {
    let total_agents = AGENTS.with(|agents| agents.borrow().len());
    let total_listings = LISTINGS.with(|listings| listings.borrow().len());
    let active_listings = LISTINGS.with(|listings| {
        listings.borrow().values().filter(|l| l.is_active).count()
    });
    let total_purchases = PURCHASES.with(|purchases| purchases.borrow().len());
    
    MarketplaceResponse {
        status: "success".to_string(),
        message: format!(
            "Total agents: {}, Total listings: {}, Active listings: {}, Total purchases: {}",
            total_agents, total_listings, active_listings, total_purchases
        ),
        data: None,
    }
}

#[update]
pub async fn register_user(request: RegisterUserRequest) -> MarketplaceResponse {
    let principal = ic_cdk::caller().to_string();
    let timestamp = time();
    let user = User {
        id: principal.clone(),
        username: request.username,
        email: request.email,
        created_at: timestamp,
    };
    USERS.with(|users| {
        users.borrow_mut().insert(principal.clone(), user);
    });
    MarketplaceResponse {
        status: "success".to_string(),
        message: "User registered successfully".to_string(),
        data: Some(principal),
    }
}
