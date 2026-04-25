#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

# ── colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}[LexAI]${NC} $*"; }
warn()  { echo -e "${YELLOW}[LexAI]${NC} $*"; }
error() { echo -e "${RED}[LexAI]${NC} $*" >&2; }

# ── .env check ───────────────────────────────────────────────────────────────
if [ ! -f "$BACKEND/.env" ]; then
  warn "backend/.env not found — copy backend/.env.example and fill in your API keys."
fi

# ── Python venv ───────────────────────────────────────────────────────────────
VENV="$ROOT/.venv"
if [ ! -d "$VENV" ]; then
  info "Creating Python virtual environment..."
  python3 -m venv "$VENV"
fi
source "$VENV/bin/activate"

info "Installing / updating Python dependencies..."
pip install -q -r "$BACKEND/requirements.txt"

# ── Node deps ─────────────────────────────────────────────────────────────────
if [ ! -d "$FRONTEND/node_modules" ]; then
  info "Installing Node dependencies..."
  npm --prefix "$FRONTEND" install --silent
fi

# ── Start backend ─────────────────────────────────────────────────────────────
info "Starting FastAPI backend on http://localhost:8000 ..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# ── Start frontend ────────────────────────────────────────────────────────────
info "Starting Vite frontend on http://localhost:5173 ..."
npm --prefix "$FRONTEND" run dev &
FRONTEND_PID=$!

# ── Graceful shutdown on Ctrl-C ───────────────────────────────────────────────
cleanup() {
  echo ""
  info "Shutting down..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  info "Done."
}
trap cleanup INT TERM

info "Both services running. Press Ctrl-C to stop."
wait
