# CU Vibes Connections Deployment Guide

This guide covers deploying **CU Vibes Connections** on the web and creating a mobile app.

## Table of Contents
- [Web Deployment (Railway)](#web-deployment-railway)
- [Mobile App Setup](#mobile-app-setup)
- [Self-Hosted Deployment](#self-hosted-deployment)

---

## Web Deployment (Railway)

[Railway](https://railway.app) is the easiest way to deploy the full stack (backend + frontend) with free tier support.

### Prerequisites
- GitHub account (to connect your repo)
- Railway account (signup at https://railway.app)

### Step 1: Push Code to GitHub

```bash
cd crm
git init
git add .
git commit -m "Initial commit: CU Vibes Connections"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cu-vibes-connections.git
git push -u origin main
```

### Step 2: Set Up Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your `cu-vibes-connections` repository
4. Choose deployment method: **Docker** or **Custom Service**

### Step 3: Configure Services on Railway

Railway will auto-detect the project. Configure these services:

#### Backend Service (Frappe)
- **Name**: `frappe-backend`
- **Root Directory**: `/crm` (if monorepo)
- **Dockerfile**: Use the existing [docker-compose.yml](docker-compose.yml)
- **Environment Variables**:
  ```
  ENVIRONMENT=production
  FRAPPE_SITE_NAME=cu-vibes.railway.app
  DB_PASSWORD=<generate-strong-password>
  ADMIN_PASSWORD=<generate-strong-password>
  ```

#### Frontend Service (React + Vite)
- **Name**: `frontend`
- **Root Directory**: `/frontend`
- **Build Command**: `yarn install && yarn build`
- **Start Command**: `yarn serve` or `npx serve -s dist`
- **Port**: `3000` (or auto-detected)
- **Environment Variables**:
  ```
  VITE_API_URL=https://frappe-backend-RANDOM.railway.app
  ```

### Step 4: Configure Database

Railway supports PostgreSQL or MySQL:

1. Create a new Database service (PostgreSQL recommended)
2. Connect it to the Backend service
3. Set environment vars on Backend:
   ```
   DB_HOST=postgres-service
   DB_PORT=5432
   DB_NAME=frappe_db
   DB_USER=frappe
   DB_PASSWORD=<password>
   ```

### Step 5: Deploy & Verify

1. Click **"Deploy"** on Railway
2. Monitor logs in Railway Dashboard
3. Once deployed, get your public URLs:
   - Backend: `https://frappe-backend-XXXXX.railway.app`
   - Frontend: `https://frontend-XXXXX.railway.app`

4. Test the app:
   ```
   https://frontend-XXXXX.railway.app
   ```

### Step 6: Custom Domain (Optional)

In Railway Project Settings:
1. Go to **Domains**
2. Add custom domain: `cu-vibes-connections.com`
3. Update DNS records at your domain registrar

---

## Mobile App Setup

### Option A: React Native (Recommended)

Create a native mobile app using Expo:

```bash
cd crm
npx create-expo-app cuv-mobile
cd cuv-mobile
```

### Option B: PWA (Progressive Web App)

The frontend is already PWA-enabled. Users can:

1. Visit `https://your-deployed-app.com`
2. Click **Install** (Chrome) or **Add to Home Screen** (Safari)
3. App runs like native mobile app

**Mobile app is already configured in**:
- [frontend/index.html](frontend/index.html) - PWA meta tags
- [frontend/vite.config.js](frontend/vite.config.js) - PWA plugin enabled

To enhance PWA:
```bash
cd frontend
yarn add vite-plugin-pwa
```

### Option C: React Native with Shared Code

Create a mobile app sharing code with web:

```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init CUVibesMobile

# Or use Expo for easier setup
npx create-expo-app cu-vibes-mobile
cd cu-vibes-mobile

# Install shared dependencies
yarn add axios pinia socket.io-client
```

Create shared API layer:
```
frontend/src/
├── api/          # Shared API calls
├── stores/       # Shared Pinia stores
├── utils/        # Shared utilities
└── mobile/       # Mobile-specific code (React Native)
```

---

## Self-Hosted Deployment (Docker)

### Prerequisites
- Ubuntu/Linux server or cloud VM
- Docker & Docker Compose installed

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/cu-vibes-connections.git
cd cu-vibes-connections
```

### Step 2: Configure Environment

Create `.env` file:
```
ENVIRONMENT=production
FRAPPE_SITE_NAME=cu-vibes.yourserver.com
ADMIN_PASSWORD=changeme123!
DB_PASSWORD=dbchangeme456!
DOMAIN=cu-vibes.yourserver.com
```

### Step 3: Start Services

```bash
docker-compose up -d
```

### Step 4: Initialize Database

```bash
docker-compose exec frappe bench new-site cu-vibes.yourserver.com
docker-compose exec frappe bench install-app crm
```

### Step 5: Configure SSL (Let's Encrypt)

```bash
docker-compose exec frappe certbot certonly --standalone \
  -d cu-vibes.yourserver.com
```

### Step 6: Access Your App

```
https://cu-vibes.yourserver.com
```

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker logs frappe-backend

# Reset database
docker-compose down
docker volume rm crm_db_data
docker-compose up -d
```

### Frontend can't reach API
- Check VITE_API_URL environment variable
- Ensure backend service is running
- Check CORS settings in [crm/config/security.json](crm/config)

### Mobile app installation issues
- Ensure PWA manifest.json is served correctly
- Test on: https://web.dev/installing-a-web-app-on-windows/

---

## Support

For issues:
1. Check [Frappe Docs](https://docs.frappe.io)
2. Open GitHub issue: https://github.com/yourusername/cu-vibes-connections/issues
3. Email: support@cu-vibes.com

---

**Happy Deploying! 🚀**
