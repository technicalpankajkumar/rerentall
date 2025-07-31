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
    colors = ["#E0EAFC", "#CFDEF3"],
    center = false,
}) => {

    return (
        <LinearGradient
            colors={colors}
            className={cn("flex-1 px-4", center && 'justify-center')}
        >
            <SafeAreaView>
                {
                    children
                }
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SafeAreaWithGradientBg;