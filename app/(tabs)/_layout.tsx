import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Wardrobe"
        options={{
          title: 'Wardrobe',
          tabBarIcon: ({ color }) => <AntDesign name='skin' color={color} size={19} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <TabBarIcon name='camera' color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
         <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name='gear' color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
