import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data'

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedCategory, setSelectedCategory] = useState<string>(params.filter || 'All')

    const HandlePress = (category: string) =>{
        if(selectedCategory === category){
            setSelectedCategory('All')
            router.setParams({filter: 'All'})
            return;
        }
        setSelectedCategory(category)
        router.setParams({filter: category})
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 w-full'>
    {
        categories.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => HandlePress(item.category)} className='flex flex-col items-start mb-3'>
                <View className={`ml-4 rounded-full px-5 py-1 ${selectedCategory === item.category ? "bg-primary-300": "bg-black-100 border border-primary-200"}`}>
                    <Text className={` text-sm mt-0.5 ${selectedCategory === item.category ? "text-white font-rubik-bold": "text-black font-rubik-medium"}`}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        ))
    }
    

    </ScrollView>
  )
}

export default Filters