import { StatusBar, Text, ScrollView } from 'react-native'; // Ensure ScrollView is imported
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';

export default function ModalScreen() {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor='#FFC7CC'>
          <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
          <Separator />
          {/* <EditScreenInfo path="app/modal.tsx" /> */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>App Overview</Text>
          {/* spacing looks weird here but looked good when displayed */}
          <Paragraph>
            {`The HOME page displays the basic pieces of the app,
            namely the weather forecast and current
            temperature and conditions for your area so you
            can pick your outfit accordingly.
            \n\nThe WARDROBE page displays 3 photos from your
            wardrobe for each category. When working
            properly, this page will also
            allow you to select one item in the
            tops, skirts, pants, or dresses
            categories and randomly generate an outfit
            including some set of either a top and bottom or
            dress, as well as 1 accessory and 1 piece or set
            of jewelry.
            \n\nThe CAMERA page allows you to use your device's
            camera to take and add photos of new clothing
            items.\n\nThe SETTINGS page allows you to change certain
            components of the app to better suite
            your needs.`}
          </Paragraph>
        </YStack>
      </ScrollView>
    </Theme>
  );
}
