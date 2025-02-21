import {  Text, TouchableOpacity, View, Image, ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import Search from "@/components/Search";
import  FeaturedCards, { Card }  from "@/components/Cards";
import Filters from "@/components/Filters";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import {  getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";

export default function Explore() {
  const params = useLocalSearchParams<{query ?: string, filter?: string}>()
  const {data: properties, refetch, loading} = useAppwrite({
    fn:getProperties,
    params: {
    filter: params.filter!,
    query: params.query!,
    limit: 20
  },
  skip: true
})

  const onCardPress = (id:string) =>{
    console.log(id);
    router.push(`/properties/${id}`)
    
  }

  useEffect(()=>{
    refetch({
      query: params.query!,
      filter: params.filter!,
      limit: 20
    })
  }, [params.filter, params.query])
  console.log(loading);
  
  return (   
    <SafeAreaView className="h-full bg-white">
      <FlatList
        bounces={false}
        bouncesZoom={false}
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => onCardPress(item.$id)} />
        )}
        keyExtractor={(item, index) => item.$id || index.toString()}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size={'large'} className="text-primary-300 mt-5 "/>
          ) : (
            <NoResults />
          )
        }
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex px-1"
        showsVerticalScrollIndicator={false}
      
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-1 flex-row items-center justify-between">
              <TouchableOpacity onPress={()=> router.back()} className="flex flex-row justify-center items-center bg-primary-200 rounded-full size-11">
              <Image
                source={icons.backArrow}
                className="size-5"
              />
              </TouchableOpacity>
              
              <Text className="text-lg text-black-300 font-rubik-bold capitalize" numberOfLines={1}>Search your ideal Home</Text>
              <TouchableOpacity onPress={()=> router.back()} className="flex flex-row justify-center items-center bg-slate-100 rounded-full size-11">
              <Image
                source={icons.bell}
                className="size-5"
              />
              </TouchableOpacity>
            </View>
            <Search />
            <View className="my-3">
              <Filters />
              <Text className="text-xl font-rubik-bold">Found {properties?.length} properties</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>  
  );
}
