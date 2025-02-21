import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View className='flex items-center my-5'>
        <Image
            source={images.noResult}
            className='w-11/12 h-80'
            resizeMode='contain'
        />
      <Text className='text-2xl font-rubik-bold text-black-300'>No results</Text>
      <Text className='text-base mt-2 font-rubik text-black-300'>We couldn't find anything</Text>
    </View>
  )
}

export default NoResults