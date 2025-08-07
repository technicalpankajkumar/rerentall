import MainHeader from '@/components/partials/MainHeader';
import { Text } from '@/components/ui/text';
import { useResponsive } from '@/hooks/useResponsive';
import {
    Bell,
    ChevronRight,
    CreditCard,
    HelpCircle,
    Home,
    MessageCircle,
    Shield,
    Trophy,
    User,
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';

export default function SettingScreen() {
    const {
        moderateScale,
        moderateVerticalScale,
        scale
    } = useResponsive();
    const colorScheme = useColorScheme();

    const settingsItems = [
        { id: 1, title: 'Personal information', icon: User, category: 'Settings' },
        { id: 2, title: 'Payments & payouts', icon: CreditCard, category: 'Settings' },
        { id: 3, title: 'League', icon: Trophy, category: 'Settings' },
        { id: 4, title: 'Notifications', icon: Bell, category: 'Settings' },
        { id: 5, title: 'Privacy and security', icon: Shield, category: 'Settings' },
        { id: 6, title: 'Get help', icon: HelpCircle, category: 'Settings' },
        { id: 7, title: 'Contact support center', icon: MessageCircle, category: 'Settings' },
    ];

    const renderSettingsItem = (item: any) => {
        const IconComponent = item.icon;

        return (
            <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                className='flex-row items-center justify-between bg-white dark:bg-background border-b border-border dark:border-border'
                style={{
                    padding: moderateScale(8),
                }}
            >
                <View className='flex-row items-center flex-1'>
                    <View
                        style={{
                            width: moderateScale(30),
                            height: moderateScale(30),
                            marginHorizontal: moderateScale(12),
                        }}
                        className='bg-secondary dark:bg-secondary-foreground items-center justify-center rounded-full'
                    >
                        <IconComponent size={18} color="#374151" />
                    </View>
                    <Text
                        size='md'
                    >
                        {item.title}
                    </Text>
                </View>
                <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
        );
    };

    const renderSection = (title: string, items: any[]) => (
        <View style={{ marginBottom: moderateVerticalScale(24) }} key={title}>
            <Text
                style={{
                    paddingHorizontal: moderateScale(8),
                    marginBottom: moderateVerticalScale(10),
                }}
                className='font-bold'
                size='lg'
            >
                {title}
            </Text>
            <View
                style={{ elevation: 1 }}
                className='bg-white/20'
            >
                {items.map(renderSettingsItem)}
            </View>
        </View>
    );

    return (
        <View className='flex-1'>
            <MainHeader />
            <View className='px-4'>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className='flex-row items-center rounded-2xl border-t border border-border dark:border-border'
                    style={{
                        paddingHorizontal: moderateScale(16),
                        paddingVertical: moderateVerticalScale(6),
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Syaiful',
                        }}
                        style={{
                            width: moderateScale(48),
                            height: moderateScale(48),
                            marginRight: moderateScale(12),
                            elevation:1
                        }}
                        className='bg-secondary dark:bg-secondary-foreground rounded-full '
                    />
                    <View className='flex-1'>
                        <View className='flex-row items-center'>
                            <Text
                                size='lg'
                                className='font-semibold'
                            >
                                Pankaj Kumar
                            </Text>
                        </View>
                        <Text
                            className='mt-0.5 ml-0.5'
                        >
                            Show my profile
                        </Text>
                    </View>
                    <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: moderateVerticalScale(4) }}
            >
                <View className='flex-1'>
                    <View style={{ paddingHorizontal: moderateScale(16),marginTop:moderateVerticalScale(10) }}>
                        <View
                            style={{elevation:1}}
                            className='bg-primary rounded-xl'
                        >
                            <View className='flex-row items-center justify-center p-4'>
                                <View style={{ flex: 1 }}>
                                    <View className='flex-row items-center mb-1'>
                                        <Text size='lg' className='font-semibold text-white'>
                                            Rent your home
                                        </Text>
                                        <Home size={20} color="white" style={{ marginLeft: 8 }} />
                                    </View>
                                    <Text size='sm' className='text-white text-justify pe-2'>
                                        Join the top 5% of millions of people who rent their best housing here
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{elevation:1}}
                                    className='bg-white rounded-3xl px-4 py-2'
                                    activeOpacity={0.8}
                                >
                                    <Text size='sm' className='font-semibold'>
                                        Start now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: moderateVerticalScale(14), paddingHorizontal: moderateScale(10) }}>
                        {renderSection(
                            'Settings',
                            settingsItems.filter((item) => item.category === 'Settings')
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
