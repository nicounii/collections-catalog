#!/bin/bash
set -e

# Acervo do Marvete - Start script
# Starts the development server

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
  echo "Please fill in the required environment variables in .env"
  echo "Then run ./start.sh again"
  exit 1
fi

# Start development server
echo "Starting development server..."
npm run dev
