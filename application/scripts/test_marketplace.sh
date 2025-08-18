#!/bin/bash

# Marketplace Automated Test Script
# ---------------------------------
# This script will test the main flows of the marketplace canister using two identities: 'author' and 'buyer'.
# You will be prompted to enter the password for each identity when required by DFX.
# TIP: Use a simple password (e.g., 1234567890) for your test identities.
#
# If you have not created the identities, run:
#   dfx identity new author
#   dfx identity new buyer
#
# If you see a password prompt, type the password you set for the identity.

block() {
  echo ""
  echo "==================================================="
  echo "| $1"
  echo "==================================================="
}

clear

# Check if dfx is installed
block "Checking if dfx is installed"
if ! command -v dfx &> /dev/null; then
    echo "dfx could not be found. Please install it from https://internetcomputer.org/docs/building-apps/getting-started/install"
    exit 1
fi
echo "dfx found"

# Check if rust is installed
block "Checking if rust is installed"
if ! command -v rustc &> /dev/null; then
    echo "rustc could not be found. Please install it from https://www.rust-lang.org/tools/install"
    exit 1
fi
echo "rustc found"

# Check dependencies
block "Checking dependencies"
cargo check
echo "Dependencies checked"

# Build project in Rust
block "Building project in Rust"
cargo build
echo "Project built"

# Try to stop the local network if it's running
block "Stopping local network (if running)"
dfx stop
echo "Local network stopped"

set -e

CANISTER=backend
AUTHOR_IDENTITY=author
BUYER_IDENTITY=buyer

# Start local network if not running
block "Starting local network"
dfx start --background --clean

# Ensure default identity is in use before switching
block "Switching to default identity"
dfx identity use default
echo "Default identity used"

# Check if identities exist
block "Checking if test identities exist"
for ID in $AUTHOR_IDENTITY $BUYER_IDENTITY; do
  if ! dfx identity list | grep -q "$ID"; then
    echo "ERROR: Identity '$ID' does not exist. Please create it with: dfx identity new $ID"
    echo "Please recreate them manually with: dfx identity new $ID"
    exit 1
  fi
done
echo "Identities checked"

# Deploy the canister
block "Deploying canister"
dfx deploy
echo "Canister deployed"

# 1. Register author user
block "[1] Registering author user (you may be prompted for the password of identity '$AUTHOR_IDENTITY')"
dfx identity use $AUTHOR_IDENTITY
dfx canister call $CANISTER register_user '(record { username = "author"; email = "author@example.com" })'
echo "Author user registered"

# 2. Create agent as author
block "[2] Creating agent as author (you may be prompted for the password of identity '$AUTHOR_IDENTITY')"
dfx canister call $CANISTER create_agent '(record { name = "Test Agent"; description = "A test agent"; code = "def run(): pass"; price = 1000000000; category = "test"; version = "1.0.0" })' > create_agent_result.txt
AGENT_ID=$(cat create_agent_result.txt | grep -o 'data = opt [^;]*' | sed 's/data = opt "\([^"]*\)".*/\1/')
echo "Agent ID: $AGENT_ID"
echo "Agent created"

# 3. List all agents as author
block "[3] Listing all agents as author"
dfx canister call $CANISTER get_all_agents
echo "All agents listed"

# 4. Register buyer user
block "[4] Registering buyer user (you may be prompted for the password of identity '$BUYER_IDENTITY')"
dfx identity use $BUYER_IDENTITY
dfx canister call $CANISTER register_user '(record { username = "buyer"; email = "buyer@example.com" })'
echo "Buyer user registered"

# 5. Buy agent as buyer
block "[5] Buying agent as buyer (you may be prompted for the password of identity '$BUYER_IDENTITY')"
dfx canister call $CANISTER buy_agent "(record { agent_id = \"$AGENT_ID\"; buyer = \"buyer\" })"
echo "Agent bought"

# 6. Update agent as author
block "[6] Updating agent as author (you may be prompted for the password of identity '$AUTHOR_IDENTITY')"
dfx identity use $AUTHOR_IDENTITY
dfx canister call $CANISTER update_agent "(\"$AGENT_ID\", record { name = \"Test Agent Updated\"; description = \"Updated desc\"; code = \"def run(): pass\"; price = 2000000000; category = \"test\"; version = \"1.1.0\" })"
echo "Agent updated"

# 7. Toggle agent listing as author
block "[7] Toggling agent listing as author (you may be prompted for the password of identity '$AUTHOR_IDENTITY')"
dfx canister call $CANISTER toggle_agent_listing "(\"$AGENT_ID\")"
echo "Agent listing toggled"

# 8. Get agent by id as buyer
block "[8] Getting agent by id as buyer (you may be prompted for the password of identity '$BUYER_IDENTITY')"
dfx identity use $BUYER_IDENTITY
dfx canister call $CANISTER get_agent "(\"$AGENT_ID\")"
echo "Agent found"

# 9. Get active listings as buyer
block "[9] Getting active listings as buyer"
dfx canister call $CANISTER get_active_listings
echo "Active listings found"

# 10. Get user agents as author
block "[10] Getting user agents as author (you may be prompted for the password of identity '$AUTHOR_IDENTITY')"
dfx identity use $AUTHOR_IDENTITY
AUTHOR_PRINCIPAL=$(dfx identity get-principal)
dfx canister call $CANISTER get_user_agents "(\"$AUTHOR_PRINCIPAL\")"
echo "User agents found"

# 11. Get user agents as buyer
block "[11] Getting user agents as buyer (you may be prompted for the password of identity '$BUYER_IDENTITY')"
dfx identity use $BUYER_IDENTITY
BUYER_PRINCIPAL=$(dfx identity get-principal)
dfx canister call $CANISTER get_user_agents "(\"$BUYER_PRINCIPAL\")"
echo "User agents found"

# 12. Get user purchases as buyer
block "[12] Getting user purchases as buyer"
dfx canister call $CANISTER get_user_purchases "(\"$BUYER_PRINCIPAL\")"
echo "User purchases found"

# 13. Get marketplace stats as buyer
block "[13] Getting marketplace stats as buyer"
dfx canister call $CANISTER marketplace_stats
echo "Marketplace stats found"

block "All tests completed."
echo "TIP: If you want to avoid typing passwords repeatedly, use a simple password (e.g., 1234567890) for your test identities." 