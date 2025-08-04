import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface ChatItem {
  id: string;
  doctorName: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount?: number;
  isOnline?: boolean;
}

const chatData: ChatItem[] = [
  {
    id: '1',
    doctorName: 'Dr. Darlene Robertson',
    lastMessage: 'Ready to check out today?',
    timestamp: '08:20 AM',
    avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    doctorName: 'Dr. Brooklyn Simmons',
    lastMessage: 'Take care of your health...',
    timestamp: '12:00 PM',
    avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg',
    isOnline: false,
  },
  {
    id: '3',
    doctorName: 'Dr. Cristian Remarries',
    lastMessage: 'Come tomorrow in time...',
    timestamp: '10:00 AM',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    doctorName: 'Dr. Savannah Nguyen',
    lastMessage: 'Do not sleep too late...',
    timestamp: 'Yesterday',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg',
    isOnline: false,
  },
  {
    id: '5',
    doctorName: 'Dr. Ronalds Richards',
    lastMessage: 'Get well soon, Richards',
    timestamp: '20/03/2025',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    isOnline: false,
  },
  {
    id: '6',
    doctorName: 'Dr. Marvins McKinney',
    lastMessage: "That's a good news...",
    timestamp: '30/04/2025',
    avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg',
    isOnline: true,
  },
];

export default function RecentChatsScreen() {
  const router = useRouter();

  const navigateToChat = (chatItem: ChatItem) => {
    router.push({
      pathname:'/chats/[id]',
      params: {
        id: chatItem.id,
        doctorName: chatItem.doctorName,
        avatar: chatItem.avatar,
        isOnline: chatItem.isOnline?.toString(),
      },
    });
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      onPress={() => navigateToChat(item)}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-700"
    >
      <View className="relative mr-3">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800"
        />
        {item.isOnline && (
          <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
        )}
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-semibold text-black dark:text-white">
            {item.doctorName}
          </Text>
          <Text className="text-xs text-zinc-500 dark:text-zinc-400">
            {item.timestamp}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            numberOfLines={1}
            className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mr-2"
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount ? (
            <View className="bg-blue-500 min-w-[20px] h-5 px-1.5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {item.unreadCount}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="py-2"
      />
    </View>
  );
}
