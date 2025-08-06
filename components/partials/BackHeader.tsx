import { useColorScheme } from "@/lib/useColorScheme"
import { router } from "expo-router"
import { ArrowLeft, Bell } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { ToggleTheme } from "../ThemeToggle"



const BackHeader = () => {
    const { isDarkColorScheme } = useColorScheme()
    return (
        <Animated.View entering={FadeInUp} className="flex-row justify-between items-end px-5 pt-2 pb-1 mb-2">
            <TouchableOpacity
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800 justify-center items-center"
                onPress={() => router.back()}
            >
                <ArrowLeft color={isDarkColorScheme ? "#FFFFFF" : "#1F2937"} size={24} strokeWidth={2} />
            </TouchableOpacity>
            <View className='flex-row gap-2'>
                <TouchableOpacity className="relative p-2">
                    <Bell color={isDarkColorScheme ? "#ffffff" : "#374151"} size={24} />
                    <View className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </TouchableOpacity>
                <ToggleTheme />
            </View>
        </Animated.View>)
}
export default BackHeader;