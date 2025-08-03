import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text } from '../ui/text';

interface DescriptionSectionProps {
    text: string;
    limit?: number; // character limit before truncation
}

export function DescriptionSection({ text, limit = 200 }: DescriptionSectionProps) {
    const [expanded, setExpanded] = useState(false);

    if (!text) return null;

    const shouldTruncate = text.length > limit;
    const displayText = expanded || !shouldTruncate ? text : text.slice(0, limit) + '...';

    return (
        <Animated.View entering={FadeInDown.delay(200)}>
            <View className="mb-4">
                <Text className="font-bold mb-1" size='md'>Description</Text>
                <Text className=" leading-6" size='sm'>
                    {displayText}
                    {shouldTruncate && (
                        <TouchableOpacity onPress={() => setExpanded(pre => !pre)}>
                            <Text className=" text-blue-500 font-semibold">
                                {expanded ? ' Read Less' : ' Read More...'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </Text>
            </View>
        </Animated.View>
    );
}
