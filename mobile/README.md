# CU Vibes Connections Mobile App

React Native mobile app for CU Vibes Connections CRM.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Android Studio (for Android) or Xcode (for iOS)
- Expo CLI (optional, for easier development)

### Quick Start with Expo

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new Expo project
npx create-expo-app cu-vibes-mobile
cd cu-vibes-mobile

# Install dependencies
yarn install

# Start development
yarn web          # Web preview
yarn android      # Android emulator
yarn ios          # iOS simulator
```

### Directory Structure

```
mobile/
├── src/
│   ├── api/              # API service calls
│   ├── screens/          # Screen components
│   │   ├── Login.tsx
│   │   ├── Leads.tsx
│   │   ├── Deals.tsx
│   │   ├── Organizations.tsx
│   │   └── Profile.tsx
│   ├── components/       # Reusable components
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── stores/           # State management (Zustand)
│   ├── utils/            # Utilities & helpers
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Root component
│   └── theme.ts          # Design system
├── package.json
├── tsconfig.json
├── app.json              # Expo config
└── README.md
```

## Development

### Start Development Server

```bash
# With Expo
yarn expo start

# With React Native CLI
yarn start

# On Android
yarn android

# On iOS
yarn ios

# On Web
yarn web
```

### Build for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both
eas build
```

### Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

## API Integration

The mobile app connects to the Frappe backend:

```typescript
// src/api/client.ts
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.cu-vibes.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Key Features

- [x] User authentication
- [ ] Lead management
- [ ] Deal pipeline
- [ ] Organization contacts
- [ ] Call/SMS integration
- [ ] Offline support (planned)
- [ ] Push notifications

## Dependencies

Key packages:
- `react-native` - Mobile framework
- `expo` - Development framework
- `axios` - HTTP client
- `zustand` - State management
- `@react-navigation/native` - Navigation
- `react-native-vector-icons` - Icons

Install with:
```bash
yarn add axios zustand @react-navigation/native @react-navigation/stack
```

## Theme

Uses CU Vibes color scheme:
- Primary: `#4a05fc` (Purple)
- Secondary: `#b6fc0b` (Lime)
- Neutral: Black & White

Theme file: [src/theme.ts](src/theme.ts)

## Testing

```bash
# Run tests
yarn test

# With coverage
yarn test --coverage
```

## Deployment

### iOS App Store

1. Create Apple Developer account
2. Configure provisioning profiles
3. Run `eas build --platform ios --auto-submit`

### Google Play Store

1. Create Google Play Developer account
2. Configure signing
3. Run `eas build --platform android`

## Support

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Frappe API Docs](https://docs.frappe.io)

## License

Same as main CU Vibes Connections project (GPL-3.0)
