import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'

const Search = () => {
    const [search, setSearch] = useState<string>()
    const handleSearch = (text: string) =>{
        setSearch(text)
    }

  return (
    <View className="flex flex-row items-center justify-between mx-3 px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-4 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5 mr-3" />
      </TouchableOpacity>
    </View>
  )
}

export default Search