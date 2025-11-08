import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TabIcon = ({focused, icon, title}:
     {
        focused: boolean,
        icon: any,
        title: string
        }) => (

    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused? '#0061ff': '#666876'} resizeMode='contain' className='size-6'/>

<Text
  className={`${
    focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'
  } text-xs w-full text-center mt-1`}
>
  {title}
</Text>

    </View>
)

const TabsLayout = () => {
  return (
   <Tabs
   screenOptions={{
    tabBarShowLabel: false, // from this line bar labels hide like index , expolore , profile
    tabBarStyle:{
        backgroundColor: 'white',
        position: 'absolute',
        borderTopColor: '#0061FF1A',
        borderTopWidth: 1, // icon top border changed
        minHeight: 70, // height lenth
    }
   }}
   >
     <Tabs.Screen
     name='index'
     options={{
        title: 'Home',
        headerShown: false,   // from this property our header remove withine our home screen
      tabBarIcon: ({ focused }) => (
  <TabIcon icon={icons.home} focused={focused} title="Home" />
)

     }}

     />

     <Tabs.Screen
     name='explore'
     options={{
        title: 'Explore',
        headerShown: false,   // from this property our header remove withine our home screen
      tabBarIcon: ({ focused }) => (
  <TabIcon icon={icons.search} focused={focused} title="Explore" />
)

     }}

     />


     <Tabs.Screen
     name='profile'
     options={{
        title: 'Profle',
        headerShown: false,   // from this property our header remove withine our home screen
      tabBarIcon: ({ focused }) => (
  <TabIcon icon={icons.person} focused={focused} title="Profile" />
)

     }}

     />
   </Tabs>
  )
}

export default TabsLayout