import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Models } from 'react-native-appwrite'

interface Props {
  item: Models.Document
  onPress?: ()=>void
}

export const FeaturedCards = ({item: {name, address, price, image, rating}, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex h-80 w-60 flex-col items-start relative mx-1'>
      <Image
        source={{uri: image}}
        className='size-full rounded-2xl'
      />
      <Image
        source={images.cardGradient}
        className='rounded-2xl size-full bottom-0 absolute'
      />
      <View className='flex flex-row items-center bg-white absolute rounded-full right-5 top-5 px-3 py-1.5 gap-2'>
        <Image
          source={icons.star}
          className='size-4'
        />
        <Text className='font-rubik-semibold'>{rating}</Text>
      </View>
      <View className='absolute flex flex-col items-start bottom-5 inset-x-5'>
        <Text className='text-white font-rubik-extrabold text-xl' numberOfLines={1}>{name}</Text>
        <Text className='text-base text-white font-rubik' numberOfLines={1}>{address}</Text>
        <View className='flex flex-row w-full justify-between items-center'>
          <Text className='text-xl font-rubik-bold text-white' numberOfLines={1}>${price}</Text>
          <Image
            className='size-5'
            source={icons.heart}

          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Card = ({item: {name, address, price, image, rating},onPress}: Props) => {
    return (
      <TouchableOpacity
      className="flex-1 my-2 px-3 py-2 h-72 rounded-lg bg-white shadow-xl mx-2 shadow-black relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {rating}
        </Text>
      </View>

      <Image source={{uri: image}} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {name}
        </Text>
        <Text className="text-xs font-rubik my-2 text-black-100">
          {address}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base my-2 font-rubik-bold text-primary-300">
            ${price}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
    )
}

export default FeaturedCards;