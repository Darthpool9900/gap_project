use ic_cdk::export_candid;

mod models;
mod routes;

pub use routes::*;
use models::*;

export_candid!();
