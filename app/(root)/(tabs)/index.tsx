import { Text, View } from "react-native";

import { Link } from "expo-router";

 
export default function App() {
  return (

   <View className="flex-1 items-center justify-center bg-pink-800">
    <Text className="text-3xl text-yellow-300 font-rubik-bold my-10 ">welcome to real state</Text>
     <Link className="text-white" href="/sign-in">sign In</Link>
     <Link className="text-white" href="/explore">explore</Link>
     <Link className="text-white" href="/profile">profile</Link>
     <Link className="text-white" href="/properties/1">Property</Link>
    </View>
  );
}
