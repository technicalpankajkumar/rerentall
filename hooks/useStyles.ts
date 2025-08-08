import { useResponsive } from "./useResponsive";

const useStyles = () => {
    const { moderateScale, verticalScale } = useResponsive()
    const fontSizeStyles = {
        xs: { fontSize: moderateScale(12) - 1 },
        sm: { fontSize: moderateScale(13) - 1 },
        md: { fontSize: moderateScale(14) - 1 },
        lg: { fontSize: moderateScale(16) - 1 },
    };
    const boxSizeStyles = {
        xs: { height: verticalScale(40) },
        sm: { height: verticalScale(42) },
        md: { height: verticalScale(45) },
        lg: { height: verticalScale(46) },
    }
    return {
         fontSizeStyles,
         boxSizeStyles
    }
}

export default useStyles