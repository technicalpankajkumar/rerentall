import useStyles from "@/hooks/useStyles"
import { cn } from "@/lib/utils"
import { View } from "react-native"
import { Text } from "../ui/text"

type LabelPropsType ={
    title:string | null | undefined,
    required?:boolean,
    size?: 'xs' |'sm' |'md'|'lg'

}

const Label:React.FC<LabelPropsType>=({title,required=false,size="md"})=>{
    const {fontSizeStyles} = useStyles()

    return (<View>
        {
        title && (<View className='flex-row gap-1 mx-0.5'>
          <Text
            className={cn('mb-1 text-gray-600 dark:text-gray-300')}
            style={fontSizeStyles[size]}
          >
            {title}
          </Text>
          {required && <Text className='text-red-500' style={fontSizeStyles[size]}>
            *
          </Text>}
        </View>)
      }
    </View>)
}

export default Label