// API Client for CU Vibes Mobile App

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.cu-vibes.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      await AsyncStorage.removeItem('auth_token')
      // Navigation logic will be handled in context
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/api/auth/login', { email, password }),
  logout: () => apiClient.post('/api/auth/logout'),
  getCurrentUser: () => apiClient.get('/api/auth/me'),
}

export const leadsAPI = {
  getLeads: (filters?: object) =>
    apiClient.get('/api/leads', { params: filters }),
  getLead: (id: string) => apiClient.get(`/api/leads/${id}`),
  createLead: (data: object) => apiClient.post('/api/leads', data),
  updateLead: (id: string, data: object) =>
    apiClient.put(`/api/leads/${id}`, data),
  deleteLead: (id: string) => apiClient.delete(`/api/leads/${id}`),
}

export const dealsAPI = {
  getDeals: (filters?: object) =>
    apiClient.get('/api/deals', { params: filters }),
  getDeal: (id: string) => apiClient.get(`/api/deals/${id}`),
  createDeal: (data: object) => apiClient.post('/api/deals', data),
  updateDeal: (id: string, data: object) =>
    apiClient.put(`/api/deals/${id}`, data),
  deleteDeal: (id: string) => apiClient.delete(`/api/deals/${id}`),
}

export const organizationsAPI = {
  getOrganizations: (filters?: object) =>
    apiClient.get('/api/organizations', { params: filters }),
  getOrganization: (id: string) =>
    apiClient.get(`/api/organizations/${id}`),
  createOrganization: (data: object) =>
    apiClient.post('/api/organizations', data),
  updateOrganization: (id: string, data: object) =>
    apiClient.put(`/api/organizations/${id}`, data),
  deleteOrganization: (id: string) =>
    apiClient.delete(`/api/organizations/${id}`),
}

export default apiClient
