import { useRouter } from 'expo-router';
import { Phone, PhoneCall, PhoneOff } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface CallRequest {
  id: string;
  doctorName: string;
  specialty: string;
  requestTime: string;
  avatar: string;
  type: 'incoming' | 'missed' | 'outgoing';
}

const callRequests: CallRequest[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    requestTime: '2 hours ago',
    avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
    type: 'incoming',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    requestTime: '4 hours ago',
    avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg',
    type: 'missed',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Johnson',
    specialty: 'Dermatology',
    requestTime: 'Yesterday',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    type: 'outgoing',
  },
  {
    id: '4',
    doctorName: 'Dr. David Martinez',
    specialty: 'Orthopedics',
    requestTime: '2 days ago',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg',
    type: 'incoming',
  },
];

export default function CallRequestsScreen() {
  const router = useRouter();

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneCall size={20} color="#34C759" />;
      case 'missed':
        return <PhoneOff size={20} color="#FF3B30" />;
      case 'outgoing':
        return <Phone size={20} color="#007AFF" />;
      default:
        return <Phone size={20} color="#8E8E93" />;
    }
  };

  const startCall = (item: CallRequest) => {
    // router.push({
    //   pathname: '/call/[id]',
    //   params: {
    //     id: item.id,
    //     doctorName: item.doctorName,
    //     avatar: item.avatar,
    //     phoneNumber: '+1 (***) ***-****',
    //   },
    // });
  };

  const renderCallItem = ({ item }: { item: CallRequest }) => (
    <TouchableOpacity className="flex-row px-4 py-3 items-center border-b border-gray-200 dark:border-gray-700">
      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full mr-3 bg-gray-200 dark:bg-gray-800"
      />

      <View className="flex-1">
        <Text className="text-base font-semibold text-black dark:text-white">{item.doctorName}</Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">{item.specialty}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-500">{item.requestTime}</Text>
      </View>

      <View className="flex-row items-center space-x-3">
        {getCallIcon(item.type)}
        <TouchableOpacity
          onPress={() => startCall(item)}
          className="w-10 h-10 bg-green-500 rounded-full justify-center items-center"
        >
          <Phone size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={callRequests}
        renderItem={renderCallItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
