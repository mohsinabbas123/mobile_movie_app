import { Text, View } from "react-native";
import "./global.css"; // path must match metro.config.js input

 
export default function App() {
  return (
   <View className="flex-1 items-center justify-center bg-blue-800">
      <Text className="text-white text-lg">Hello</Text>
      <Text className="text-white text-amber-400">mohsin abbas</Text>
    </View>
  );
}
