import { View, Text, Image, TouchableOpacity } from 'react-native'
import {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import * as WebBrowser from 'expo-web-browser'
import { Redirect } from 'expo-router'
import { useAuth, useOAuth  } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
// browser warm up 
export const useWarmUpBrowser = () => {
  useEffect(() => {
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  useWarmUpBrowser()
  const { isSignedIn } = useAuth()
  console.log("🚀 ~ Index ~ isSignedIn:", isSignedIn)
  if (isSignedIn) {
    return <Redirect href={'/home'} />
  }

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
 const Login = async () => {

    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'estate-sphere' }),
      })
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        return true
      } else {
        throw new Error('failed to open session')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      return false
    }
  }


  return (
    <SafeAreaView className="bg-white h-full">
      <View className='h-full'>
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Estate Sphere
          </Text>

          <Text className="text-2xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-4">
            Login to estate sphere with Google
          </Text>

          <TouchableOpacity
            onPress={Login}
            className="bg-white shadow-md shadow-black-400 rounded-full w-full py-4 mt-2"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <Text className='text-center mt-4 text-sm font-rubik-light'>&#x22C6; Developed By Binary-Shade &#x22C6;</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  
}