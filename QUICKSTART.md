# CU Vibes Connections - Complete Setup Guide

Welcome to **CU Vibes Connections**, your custom branded CRM. This guide covers setup, deployment, and mobile app development.

## 🎯 What's Included

- ✅ Rebranded Frappe CRM with your company colors (Purple #4a05fc & Lime #b6fc0b)
- ✅ Full-stack deployment ready (backend + frontend)
- ✅ Mobile app structure (React Native with Expo)
- ✅ Railway deployment configuration
- ✅ Docker setup for self-hosting

---

## 📁 Project Structure

```
cu-vibes-connections/
├── crm/                    # Frappe backend (Python)
│   ├── hooks.py           # App configuration (UPDATED with CU Vibes)
│   ├── __init__.py        # Version info (UPDATED)
│   ├── www/crm.py         # Main app endpoint
│   └── fcrm/              # CRM modules
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── App.vue        # Root component
│   │   ├── index.html     # (UPDATED with CU Vibes title)
│   │   └── images/        # Logo assets (NEW cuv-logo.svg)
│   └── package.json       # Dependencies
├── mobile/                # React Native mobile app (NEW)
│   ├── src/
│   │   ├── screens/       # Login, Leads, Deals, Organizations, Profile
│   │   ├── api/           # API client
│   │   ├── stores/        # Zustand state management
│   │   ├── theme.ts       # Design tokens with CU Vibes colors
│   │   └── App.tsx        # Root component
│   └── app.json           # Expo configuration
├── docker/                # Docker compose files
├── DEPLOYMENT.md          # Complete deployment guide
├── railway.json           # Railway deployment config
├── Dockerfile.backend     # Backend container config
├── Dockerfile.frontend    # Frontend container config
└── README.md             # Original CRM documentation
```

---

## 🚀 Quick Start

### 1. Local Development

#### Backend

```bash
# Install Python 3.10+
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .
pip install frappe-bench

# Create Frappe site
bench new-site cu-vibes.local
bench install-app crm
bench use cu-vibes.local
bench start
```

Backend runs at: `http://localhost:8000`

#### Frontend

```bash
cd frontend
yarn install
yarn dev
```

Frontend runs at: `http://localhost:5173`

#### Mobile

```bash
cd mobile
npm install -g expo-cli
yarn install
yarn web          # Web preview
yarn android      # Android emulator
yarn ios          # iOS simulator
```

---

## 🌐 Web Deployment

### Option 1: Railway (Recommended - Easiest)

**Why Railway?**
- Free tier ($5 credits/month)
- Auto-deploys from GitHub
- Scales automatically
- Built-in PostgreSQL

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "CU Vibes Connections - Ready to deploy"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Railway auto-detects and builds

3. **Configure Environment**
   - Backend service: Set `FRAPPE_SITE_NAME`, `DB_PASSWORD`
   - Frontend service: Set `VITE_API_URL` to your backend URL
   - Database: Use Railway's PostgreSQL

4. **Access Your App**
   ```
   https://your-frontend-xxxxx.railway.app
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Railway setup.

### Option 2: Docker Self-Hosting

```bash
# Build images
docker build -f Dockerfile.backend -t cu-vibes-backend .
docker build -f Dockerfile.frontend -t cu-vibes-frontend .

# Run with docker-compose
docker-compose up -d

# Initialize
docker-compose exec frappe bench new-site cu-vibes.local
docker-compose exec frappe bench install-app crm
```

Access at: `http://localhost:3000`

### Option 3: Self-hosted on AWS/DigitalOcean

See [DEPLOYMENT.md](DEPLOYMENT.md#self-hosted-deployment-docker) for full VPS setup guide.

---

## 📱 Mobile App Development

The mobile app is fully set up with:

- **Login screen** - Authentication with your backend
- **Leads management** - View and create leads
- **Deals pipeline** - Track opportunities
- **Organizations** - Company contacts
- **Profile** - User settings & logout

### Run Mobile App

```bash
cd mobile

# Web preview (development)
yarn web

# iOS simulator
yarn ios

# Android emulator
yarn android

# Build for production
eas build --platform ios
eas build --platform android
```

### Mobile App Features

✅ Backend integration  
✅ JWT authentication  
✅ Persistent storage (AsyncStorage)  
✅ State management (Zustand)  
✅ CU Vibes branding (colors & fonts)  
✅ Responsive UI components  

⏳ Coming soon: Offline sync, Push notifications, QR scanning

---

## 🎨 Customization Guide

### Change Logo

Replace `/frontend/src/images/cuv-logo.svg` with your own logo.

### Change Colors

Update `mobile/src/theme.ts`:
```typescript
export const colors = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  // ...
}
```

### Change App Name

- Backend: Update `crm/hooks.py` line 2: `app_title = "Your Name"`
- Frontend: Update `frontend/index.html` title tag
- Mobile: Update `mobile/app.json` slug and name

### Change Company Info

Edit these files:
- `crm/hooks.py` - app_publisher, app_email
- `frontend/package.json` - author field
- `mobile/app.json` - author field

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
tail -f logs/frappe.log

# Reset database
rm -rf bench/sites/cu-vibes.local
bench new-site cu-vibes.local
```

### Frontend can't reach API
- Check `VITE_API_URL` environment variable
- Ensure backend is running and accessible
- Check CORS in browser console

### Mobile app build fails
```bash
# Clear cache
yarn cache clean
rm -rf node_modules

# Reinstall
yarn install

# Try again
yarn web
```

---

## 📚 Resources

- [Frappe Docs](https://docs.frappe.io)
- [Vite Docs](https://vitejs.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Railway Docs](https://docs.railway.app)

---

## 📞 Support

For issues:
1. Check logs in `crm/logs/frappe.log`
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
3. Open GitHub issues in your repository

---

## 📋 Next Steps

1. ✅ Verify branding changes look correct
2. ⏳ Set up your own logo file
3. ⏳ Configure your domain name
4. ⏳ Set up email sending (SMTP)
5. ⏳ Deploy to Railway or your preferred platform
6. ⏳ Build and submit mobile app to app stores

---

**Happy building! 🎉**

Last updated: February 22, 2026
