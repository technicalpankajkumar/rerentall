import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { FC, ReactNode } from "react";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface SafeAreaWithGradientBgProps {
    children: ReactNode,
    colors?: [ColorValue, ColorValue, ...ColorValue[]],
    center?:boolean
}


const SafeAreaWithGradientBg: FC<SafeAreaWithGradientBgProps> = ({
    children,
    colors = ["#ffffff", "#ffffff"],
    center = false,
}) => {
     const {isDarkColorScheme} = useColorScheme()
    return (
        <LinearGradient
            colors={isDarkColorScheme ?  ["#000000", "#000000"] :colors}
            className={cn("flex-1", center && 'justify-center')}
        >
            <SafeAreaView className="flex-1">
                {
                    children
                }
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SafeAreaWithGradientBg;