import { StatusBar, Text } from 'react-native'; // Ensure Text is imported
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';

export default function ModalScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor='#FF5C5C'>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Separator />
        {/* <EditScreenInfo path="app/modal.tsx" /> */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>App Overview</Text>
        <Paragraph>
          {`The HOME page displays the basic pieces of the app,
          namely the weather forecast and current
          temperature and conditions for your area so you
          can pick your outfit accordingly.
          \n\nThe WARDROBE page displays 3 photos from your
          wardrobe for each category.
          \n\nThe CAMERA page allows you to use your device's
          camera to take and add photos of new clothing
          items.\n\nThe SETTINGS page allows you to change certain
          components of the app to better suite your needs.`}
        </Paragraph>
      </YStack>
    </Theme>
  );
}