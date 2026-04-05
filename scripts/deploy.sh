#!/usr/bin/env bash
# deploy.sh — Idempotent deployment script for Bookish
# Safe to run multiple times: same result every execution

set -euo pipefail

# ── Configuration ───────────────────────────────────────────────────────────
APP_DIR="${APP_DIR:-/home/ubuntu/bookish}"
REPO_URL="${REPO_URL:-https://github.com/nyxsky404/Bookish}"
BRANCH="${BRANCH:-main}"
LOG_DIR="$APP_DIR/logs"

echo "🚀 Bookish Deploy — $(date)"
echo "   App dir : $APP_DIR"
echo "   Branch  : $BRANCH"

# ── Step 1: Clone or pull repository ───────────────────────────────────────
if [ -d "$APP_DIR/.git" ]; then
  echo "✔ Repo exists — pulling latest..."
  git -C "$APP_DIR" fetch origin
  git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  echo "✔ Cloning repo..."
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

# ── Step 2: Ensure log directory exists ────────────────────────────────────
mkdir -p "$LOG_DIR"
echo "✔ Directories ready"

cd "$APP_DIR"
echo "✔ Code is up to date"

# ── Step 3: Ensure Docker is running ───────────────────────────────────────
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker first."
  exit 1
fi
echo "✔ Docker is running"

# ── Step 4: Stop existing services (safe even if no containers running) ─────
docker compose down --remove-orphans 2>/dev/null || true
echo "✔ Old services stopped"

# ── Step 5: Build and start services ────────────────────────────────────────
docker compose up -d --build
echo "✔ Services started"

# ── Step 6: Verify services are up ──────────────────────────────────────────
sleep 5
echo ""
echo "📊 Container status:"
docker compose ps

# ── Step 7: Health check ──────────────────────────────────────────────────
API_PORT="${API_PORT:-3000}"
if curl -sf "http://localhost:$API_PORT/" > /dev/null; then
  echo "✅ API health check passed"
else
  echo "⚠️  API health check failed — check logs with: docker compose logs backend"
fi

echo ""
echo "🎉 Deployment complete at $(date)"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:80"
