import { useUser } from "@clerk/clerk-expo";
import {  Text, TouchableOpacity, View, Image, ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import Search from "@/components/Search";
import  FeaturedCards, { Card }  from "@/components/Cards";
import Filters from "@/components/Filters";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Home() {
  const {user} = useUser()
  const params = useLocalSearchParams<{query ?: string, filter?: string}>()
  const {data: LatestProperties, loading: LatestPropertiesLoading} = useAppwrite({
    fn:getLatestProperties
  })
  const {data: properties, refetch, loading} = useAppwrite({
    fn:getProperties,
    params: {
    filter: params.filter!,
    query: params.query!,
  },
  skip: true
})

  const onCardPress = (id: string) =>{
    router.push(`/properties/${id}`)
  }

  useEffect(()=>{
    refetch({
      query: params.query!,
      filter: params.filter!,
      limit: 6
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
      
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.imageUrl }}
                  className="size-12 rounded-full"
                />
 
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.fullName}
                  </Text>
                </View>
              </View>
              <Entypo name="light-up" size={20} color={'black'}/>
            </View>

            <Search />

            {
              LatestPropertiesLoading ? (
                <ActivityIndicator size={'large'} className="text-primary-300" />
              ) : !LatestProperties || LatestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                  data={LatestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCards item={item} onPress={()=>onCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item, index) => item.$id || index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-2 mt-5"
                />
              </View>
              )
            }


            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>  
  );
}
