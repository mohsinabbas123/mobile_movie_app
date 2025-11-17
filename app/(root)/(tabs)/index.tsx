import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";

import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { getInitials } from "./profile";

export default function Index() {
  const { user } = useGlobalContext();

  // Prepare avatar URL safely
  const avatarUrl = user?.avatar?.trim() || "";
  const showAvatar = avatarUrl.startsWith("http");

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListHeaderComponent={
          <View className="px-5">

            {/* HEADER */}
            <View className="flex flex-row items-center justify-between mt-5">
              
              {/* Avatar + Name */}
              <View className="flex flex-row items-center">

                {/* Avatar */}
                {showAvatar ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-12 h-12 rounded-full bg-[#0061ff] justify-center items-center">
                    <Text className="text-white text-lg font-rubik-medium">
                      {getInitials(user?.name)}
                    </Text>
                  </View>
                )}

                {/* User Name */}
                <View className="flex flex-col items-start ml-3 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>

                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>

              {/* Bell Icon */}
              <Image source={icons.bell} className="size-6" />
            </View>

            {/* Search Component */}
            <Search />

            {/* Featured Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>

                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={({ item }) => <FeaturedCard />}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.toString()}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            {/* Our Recommendation */}
            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>

              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Filters Component */}
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}

