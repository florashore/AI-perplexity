import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomeLayout ( ){
    const {isLoaded} = useAuth()
    console.log("🚀 ~ HomeLayout ~ isLoaded:", isLoaded)
    const {user} = useUser()
    if(!isLoaded){
        return (
            <SafeAreaView className="h-full bg-white flex justify-center items-center">
                <ActivityIndicator
                    size={'large'}
                    className="text-blue-600"
                />
            </SafeAreaView>
        )
    }
    if(!user) <Redirect href={'/'} />
    return <Slot />
    
}