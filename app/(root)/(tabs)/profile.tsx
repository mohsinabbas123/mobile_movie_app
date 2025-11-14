import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import React from 'react';
import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// we define below function interface to showing all props of types
interface SettingsItemProps{
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;

}


// this function return immedaitelyt and used for dispaly our list item on settings page
const SettingsItem = ({icon , title, onPress, textStyle, showArrow = true} : SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center  gap-3'>
      <Image source={icon} className='size-6'/>
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>


    {showArrow && <Image source={icons.rightArrow} className = "size-6"/>}  {/* this line is used for rightArrow displayed*/}
  </TouchableOpacity>
)

const profile = () => {

// here we are implementing a fetch real user data for avater
const {user, refetch} = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if(result){
      Alert.alert('success', 'You have been logged out successfully')
      refetch();
    }
    else{
       Alert.alert( 'Error','An error occurred while logging out')
    }
  };


  return (
   <SafeAreaView className='h-full bg-white'>
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerClassName='pb-32 px-7'
    >
      <View className='flex flex-row items-center justify-between mt-15'>
        <Text className='text-xl font-rubik-bold'>Profile </Text>
        <Image source={icons.bell} className='size-5'/>  {/* this size decrease the size bell*/}

       
      </View>



      <View className='flex-row justify-center  flex mt-5'>

    <View className='flex flex-col items-center relative mt-5'>
      <Image source={{uri: user?.avatar}} className='size-44 relative rounded-full'/>
      <TouchableOpacity className='absolute bottom-11 right-2 '>
        <Image source={icons.edit} className='size-9'/>
      </TouchableOpacity>
      <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
      
    </View>


      </View>


        {/* this css is used only for lime my booking and payments display in a line line col and mt-10 means space profile name between list items  */}
    <View className='flex flex-col mt-10'>  
      <SettingsItem icon={icons.calendar} title='My Booking' />
      <SettingsItem icon={icons.wallet} title='Payments' />
 </View>



{/* this view is used to displayed all list items and import from settings function which is present in the constants / data.ts      */}
 <View className='flex flex-col mt-5 border-t-hairline pt-5 border-s-primary-200'>
{settings.slice(2).map((item , index) => (
  <SettingsItem key={index} {...item}/>
))}
 </View>


{/* in this view we are created a logout button */}
 <View className='flex flex-col mt-5 border-t-hairline pt-5 border-s-primary-200'>
  <SettingsItem icon={icons.logout}
   title='Logout'
   textStyle='text-danger'
   showArrow={false}  
   onPress={handleLogout}/>
</View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default profile