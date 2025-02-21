import { Redirect, Slot } from "expo-router";
import './global.css'
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from "react";
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from "@/cache";
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    
  const [loaded, error] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
  })
  
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }

  useEffect(()=>{
    if(loaded || error){
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if(!loaded && !error) return  null;


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <ClerkLoaded>
      <Slot />
    </ClerkLoaded>
  </ClerkProvider>
  )
  
  
}
