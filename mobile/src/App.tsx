import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from '@react-native-vector-icons/MaterialCommunityIcons'
import { RootStore } from './src/stores'
import { AuthContext } from './src/utils/auth'
import LoginScreen from './src/screens/Login'
import LeadsScreen from './src/screens/Leads'
import DealsScreen from './src/screens/Deals'
import OrganizationsScreen from './src/screens/Organizations'
import ProfileScreen from './src/screens/Profile'
import { colors } from './src/theme'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false)
  const { isLoggedIn } = RootStore()

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          MaterialCommunityIcons: require('@react-native-vector-icons/MaterialCommunityIcons').default,
        })
        setFontsLoaded(true)
      } catch (e) {
        console.warn(e)
      } finally {
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      {!isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName

              if (route.name === 'Leads') {
                iconName = 'lead-pencil'
              } else if (route.name === 'Deals') {
                iconName = 'handshake'
              } else if (route.name === 'Organizations') {
                iconName = 'domain'
              } else if (route.name === 'Profile') {
                iconName = 'account'
              }

              return (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              )
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray,
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen
            name="Leads"
            component={LeadsScreen}
            options={{
              title: 'Leads',
            }}
          />
          <Tab.Screen
            name="Deals"
            component={DealsScreen}
            options={{
              title: 'Deals',
            }}
          />
          <Tab.Screen
            name="Organizations"
            component={OrganizationsScreen}
            options={{
              title: 'Organizations',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
}
