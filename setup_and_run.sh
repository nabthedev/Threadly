#!/bin/bash

# Print a welcome message
echo "Welcome to the Threadly setup script!"

# Step 1: Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install express body-parser

# Step 3: Create the necessary folder structure
echo "Setting up the data folder..."
mkdir -p data
touch data/users.json data/posts.json

# Initialize empty JSON files
echo "[]" > data/users.json
echo "[]" > data/posts.json

# Step 4: Start the server
echo "Starting the server..."
node server.js
