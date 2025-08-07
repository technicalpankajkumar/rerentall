import BackHeader from "@/components/partials/BackHeader";
import { DropdownSelect } from "@/components/ui/dropdownselect";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useResponsive } from "@/hooks/useResponsive";
import { useColorScheme } from "@/lib/useColorScheme";
import { Contact, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  View
} from "react-native";

export default function ProfileScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { moderateVerticalScale } = useResponsive()
  const [selected, setSelected] = useState('');
  return (
    <ScrollView
      className="flex-1 "
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: moderateVerticalScale(10) }}
    >
      <View className="flex-1">
        <BackHeader />
        <View className="px-6 py-2 gap-2">
          <View className="bg-slate-400 dark:bg-dark/20 py-2 rounded-sm">
            <Text size="xl" className="font-bold text-white text-center">Fill the Form</Text>
          </View>
          <Input
            label="Name"
            placeholder="Enter owner name"
            size="md"
            radius="xl"
            prefix={<User size={18} color={'gray'} />}
          />
          <Input
            label="Contact No."
            placeholder="Enter contact no."
            size="md"
            radius="xl"
            prefix={<Contact size={18} color={'gray'} />}
          />
          <Input
            label="Email ID"
            placeholder="Enter email"
            size="md"
            radius="xl"
            prefix={<Mail size={18} color={'gray'} />}
          />
          <DropdownSelect
            searchable={false}
            label="Choose an option"
            // required
            value={selected}
            radius="xl"
            onChange={(item)=>setSelected(item.value)}
            data={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
            // error={!selected && 'Required'}
          />
        </View>
      </View>

    </ScrollView>
  );
}
