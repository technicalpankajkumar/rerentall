import Label from "@/components/custom-ui/Label";
import SingleSelect, { SingleSelectTypeProps } from "@/components/custom-ui/SingleSelect";
import BackHeader from "@/components/partials/BackHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useResponsive } from "@/hooks/useResponsive";
import { useColorScheme } from "@/lib/useColorScheme";
import { Contact, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  View
} from "react-native";

export default function ProfileScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { moderateVerticalScale } = useResponsive()
  const [checked, setChecked] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState<SingleSelectTypeProps>();

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
          <Pressable
            onPress={() => setChecked(!checked)}
            className="flex-row items-center gap-2 my-2"
          >
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <Label title="Posted by broker" required={false} />
          </Pressable>
          <SingleSelect
            radius="xl"
            label="Choose Type"
            data={[
              { label: 'Owner', value: '1' },
              { label: 'Broker', value: '2' },
              { label: 'Builder', value: '3' },
            ]}
            value={selectedValue}
            onChange={setSelectedValue}
            required
            // prefixIconName="appstore-o"
            searchable
          />

        </View>
      </View>

    </ScrollView>
  );
}
