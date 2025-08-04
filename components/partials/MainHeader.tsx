import { useColorScheme } from "@/lib/useColorScheme";
import * as Location from 'expo-location';
import { Bell, ChevronDown, MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ToggleTheme } from "../ThemeToggle";
import { Text } from "../ui/text";

const MainHeader = () => {
    const { isDarkColorScheme } = useColorScheme();
    const [location, setLocation] = useState('Lucknow, India');

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            const location = await Location.getCurrentPositionAsync({});
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (address[0]) {
                setLocation(`${address[0].city}, ${address[0].country}`);
            }
        } catch (error) {
            console.log('Error getting location:', error);
        }
    };
    return (
        <Animated.View entering={FadeInUp} className="flex-row justify-between items-end px-5 pt-2 pb-1 mb-2">
            <View className="flex-1">
                <Text className="font-medium mb-1 ms-1" size='lg'>Location</Text>
                <TouchableOpacity className="flex-row items-center justify-start">
                    <MapPin color="#3B82F6" size={16} />
                    <Text className=" font-semibold  mx-1" size='md'>{location}</Text>
                    <ChevronDown color="#9CA3AF" size={16} />
                </TouchableOpacity>
            </View>
            <View className='flex-row gap-2'>
                <TouchableOpacity className="relative p-2">
                    <Bell color={isDarkColorScheme ? "#ffffff" : "#374151"} size={24} />
                    <View className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </TouchableOpacity>
                <ToggleTheme />
            </View>
        </Animated.View>
    )
}

export default MainHeader;