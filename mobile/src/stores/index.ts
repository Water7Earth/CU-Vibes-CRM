// Mobile app state management using Zustand

import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (token: string, user: User) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: async (token, user) => {
    await AsyncStorage.setItem('auth_token', token)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    set({ token, user, isLoggedIn: true })
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token')
    await AsyncStorage.removeItem('user')
    set({ token: null, user: null, isLoggedIn: false })
  },
}))

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'open' | 'converted' | 'lost'
  source?: string
}

interface LeadsStore {
  leads: Lead[]
  isLoading: boolean
  fetchLeads: () => Promise<void>
  addLead: (lead: Lead) => void
  updateLead: (id: string, lead: Lead) => void
  deleteLead: (id: string) => void
}

export const useLeadsStore = create<LeadsStore>((set) => ({
  leads: [],
  isLoading: false,

  fetchLeads: async () => {
    set({ isLoading: true })
    try {
      // API call will be implemented
      // const response = await apiClient.get('/api/leads')
      // set({ leads: response.data })
    } finally {
      set({ isLoading: false })
    }
  },

  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, lead],
    })),

  updateLead: (id, lead) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? lead : l)),
    })),

  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
    })),
}))

export const RootStore = () => {
  const auth = useAuthStore()
  const leads = useLeadsStore()

  return {
    ...auth,
    ...leads,
  }
}
