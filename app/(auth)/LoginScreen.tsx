// app/(auth)/login.tsx
import { useLoginMutation } from '@/api';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
});

  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      router.replace('/'); // Redirect to home after login
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
            className='border border-red-200'
          />
          {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <Button onPress={handleSubmit} title="Login" />
           <Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-sm native:max-w-md'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </View>
      )}
    </Formik>
    </View>
  );
}
