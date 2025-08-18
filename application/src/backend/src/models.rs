use candid::{CandidType, Deserialize};
use serde::Serialize;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct Agent {
    pub id: String,
    pub name: String,
    pub description: String,
    pub code: String, // Agent code for local execution
    pub price: u64, // Price in ICP cycles (nano ICP)
    pub author: String, // Author's principal ID
    pub category: String,
    pub version: String,
    pub created_at: u64,
    pub updated_at: u64,
    pub downloads: u64,
    pub rating: f64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct AgentListing {
    pub agent: Agent,
    pub is_active: bool,
    pub total_sales: u64,
    pub total_revenue: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct Purchase {
    pub id: String,
    pub agent_id: String,
    pub buyer: String,
    pub seller: String,
    pub price: u64,
    pub timestamp: u64,
    pub transaction_hash: String,
}

#[derive(CandidType, Serialize, Clone, Debug)]
pub struct MarketplaceResponse {
    pub status: String,
    pub message: String,
    pub data: Option<String>,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct CreateAgentRequest {
    pub name: String,
    pub description: String,
    pub code: String,
    pub price: u64,
    pub category: String,
    pub version: String,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct BuyAgentRequest {
    pub agent_id: String,
    pub buyer: String,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct User {
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct RegisterUserRequest {
    pub username: String,
    pub email: String,
}