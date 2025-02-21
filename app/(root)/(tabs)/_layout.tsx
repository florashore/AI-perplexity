import { View, Text, Image, ImageComponent } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'


const IconTab = ({focused, title, icon}: {focused: boolean, title: string, icon: any}) => {    
    return (
        <View className='mt-3 flex-1 flex flex-col items-center'>
            <Image
                className='size-6'
                source={icon}
                tintColor={focused ? "#0061FF" : "#666876"}
                resizeMode='contain'
            />
            <Text className={`${focused} ? "text-blue-500 font-rubik-medium" : "text-black-200 font-rubik" text-xs w-full text-center mt-1 capitalize `}>{title}</Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <Tabs 
    screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "white",
            position: 'absolute',
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            minHeight: 70
        }
    }}
    >

    <Tabs.Screen 
        name='home'
        options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <IconTab focused={focused} icon={icons.home} title='home'/>
            )
        }}
    />
    <Tabs.Screen 
        name='explore'
        options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <IconTab focused={focused} icon={icons.search} title='Explore'/>
            )
        }}
    />
    <Tabs.Screen 
        name='profile'
        options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <IconTab focused={focused} icon={icons.person} title='Profile'/>
            )
        }}
    />
    </Tabs>
  )
}

export default TabsLayout