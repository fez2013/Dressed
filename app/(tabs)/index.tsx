import { YStack, H2, Separator, Theme, Image } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';

export default function TabOneScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        {/*<H2>HOME</H2>*/}
        <Separator />
        <Image source={require('./dressedLogo.png')} style={{ width: '100%', height: '100%' }} />
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </YStack>
    </Theme>
  );
}