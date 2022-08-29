import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SMS from 'expo-sms';

// expo install expo-sms

export default function App() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  const sendSms = async () => {
    const {result} = await SMS.sendSMSAsync(
      recipients,
      message
    );

    console.log(result);
  };

  const addNumber = () => {
    let newRecipients = [...recipients];
    newRecipients.push(phoneNumber);
    setRecipients(newRecipients);
    setPhoneNumber(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text>No recipients added!</Text>
    }

    return recipients.map((recipient, index) => {
      return <Text key={index}>{recipient}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <TextInput value={phoneNumber} placeholder="Phone Number" onChangeText={(value) => setPhoneNumber(value)} />
      <Button title='Add Number' onPress={addNumber} />
      <TextInput value={message} placeholder="Message" onChangeText={(value) => setMessage(value)} />
      <Text>Recipients:</Text>
      {showRecipients()}
      <Button title='Clear Recipients' onPress={() => setRecipients([])} />
      {isAvailable ? <Button title="Send SMS" onPress={sendSms} /> : <Text>SMS not available</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
