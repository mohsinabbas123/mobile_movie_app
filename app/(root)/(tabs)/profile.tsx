import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import React from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Props for each settings item
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

// Settings Row Component
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-6" />}
  </TouchableOpacity>
);

// --- GET INITIALS HELPER FUNCTION ---
const getInitials = (name?: string) => {
  if (!name) return '';

  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert('Success', 'You have been logged out successfully');
      refetch();
    } else {
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  // Avatar logic (fallback if invalid or empty)
  const avatarUrl = user?.avatar?.trim();
  const showAvatar = avatarUrl && avatarUrl.startsWith('http');

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Top Header */}
        <View className="flex flex-row items-center justify-between mt-15">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* Avatar + Name */}
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">

            {showAvatar ? (
              <Image
                source={{ uri: avatarUrl }}
                className="size-44 rounded-full"
              />
            ) : (
              <View className="size-44 rounded-full bg-[#0061ff] justify-center items-center">
                <Text className="text-white text-4xl font-rubik-medium">
                  {getInitials(user?.name)}
                </Text>
              </View>
            )}

            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">
              {user?.name ?? 'User'}
            </Text>
          </View>
        </View>

        {/* My Bookings + Payments */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Booking" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* Settings List */}
        <View className="flex flex-col mt-5 border-t-hairline pt-5 border-s-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Logout Button */}
        <View className="flex flex-col mt-5 border-t-hairline pt-5 border-s-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
