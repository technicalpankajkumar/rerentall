import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MoveVertical as MoreVertical, Phone, Send, Smile, Video } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
// import ActionSheet from '@/components/ActionSheet';
// import ReactionPicker from '@/components/ReactionPicker';
// import MessageActionsSheet from '@/components/MessageActionsSheet';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
  reactions?: string[];
}

const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'I have seen some strange redness on your fingers. How is that?',
    timestamp: '10:30 AM',
    isFromUser: false,
  },
  {
    id: '2',
    text: 'Yes, I noticed redness. No pain, just concerned.',
    timestamp: '10:40 AM',
    isFromUser: true,
  },
  {
    id: '3',
    text: 'Hand needs X-ray, looks more serious.',
    timestamp: '10:45 AM',
    isFromUser: false,
  },
  {
    id: '4',
    text: 'Okay doctor, I will get the X-ray done.',
    timestamp: '10:50 AM',
    isFromUser: true,
  },
  {
    id: '5',
    text: 'Okay, thanks for understand.',
    timestamp: '10:52 AM',
    isFromUser: false,
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const doctorName = params.doctorName as string;
  const avatar = params.avatar as string;
  const isOnline = params.isOnline === 'true';

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromUser: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleLongPress = (messageId: string) => {
    setSelectedMessage(messageId);
    setShowActions(true);
  };

  const closeActionSheet = () => {
    setShowActions(false);
    setShowReactions(false);
    setSelectedMessage(null);
  };

  const handleReaction = (emoji: string) => {
    if (selectedMessage) {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === selectedMessage
            ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
            : msg
        )
      );
    }
  };

  const handleCopy = () => {
    const message = messages.find(msg => msg.id === selectedMessage);
    if (message) {
      Alert.alert('Copied', 'Message copied to clipboard');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Message', 'Are you sure you want to delete this message?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setMessages(prevMessages =>
            prevMessages.filter(msg => msg.id !== selectedMessage)
          );
        },
      },
    ]);
  };

  const startCall = () => {
    // router.push({
    //   pathname: '/call/[id]',
    //   params: {
    //     id: params.id,
    //     doctorName,
    //     avatar,
    //     phoneNumber: '+1 (***) ***-****',
    //   },
    // });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item.id)}
      className={`my-1 px-1 ${item.isFromUser ? 'items-end' : 'items-start'}`}
    >
      <View
        className={`max-w-[80%] px-4 py-2.5 rounded-[18px] ${item.isFromUser
            ? 'bg-blue-500 dark:bg-blue-600 rounded-br-sm'
            : 'bg-white dark:bg-neutral-800 rounded-bl-sm'
          }`}
      >
        <Text
          className={`leading-5 mb-1 ${item.isFromUser ? 'text-white' : 'text-black dark:text-white'
            }`}
          size='md'
        >
          {item.text}
        </Text>
        <Text
          className={`self-end ${item.isFromUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
            }`}
          size='sm'
        >
          {item.timestamp}
        </Text>
      </View>
      {item.reactions && item.reactions.length > 0 && (
        <View className="flex-row mt-1 px-2">
          {item.reactions.map((reaction, index) => (
            <Text key={index} className="mr-1" size='md'>
              {reaction}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 dark:bg-black">
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full mr-3 bg-gray-100 dark:bg-neutral-800" />
          <View>
            <Text className="font-semibold mb-0.5" size='md'>{doctorName}</Text>
            <Text className=" text-gray-500 dark:text-gray-400" size='sm'>
              {isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={startCall} className="p-1">
            <Phone size={22} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={startCall} className="p-1">
            <Video size={22} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity className="p-1">
            <MoreVertical size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center py-4">
        <Text className=" text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-800 px-3 py-1 rounded-full" size='sm'>
          Today, December 20
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <View className="bg-white dark:bg-neutral-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <Input
          radius='xl'
          prefix={<Smile size={24} color="#8E8E93" />}
          placeholder="Type messages..."
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
          postfix={<Send
            size={20}
            color={newMessage.trim() ? '#FFFFFF' : '#8E8E93'}
          />}
        />
      </View>
      {/* 
      <ActionSheet visible={showActions} onClose={closeActionSheet} title="Message Actions">
        <MessageActionsSheet
          onReact={() => {
            setShowActions(false);
            setShowReactions(true);
          }}
          onCopy={handleCopy}
          onReply={() => Alert.alert('Reply', 'Reply feature coming soon')}
          onForward={() => Alert.alert('Forward', 'Forward feature coming soon')}
          onDelete={handleDelete}
          onClose={closeActionSheet}
        />
      </ActionSheet>

      <ActionSheet visible={showReactions} onClose={closeActionSheet} title="Choose a reaction">
        <ReactionPicker onReaction={handleReaction} onClose={closeActionSheet} />
      </ActionSheet> */}
    </View>
  );
}
