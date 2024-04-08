/* I WANT TO DISPLAY ITEMS FROM EACH CATEGORY ON THIS WARDROBE SCREEN.
  I CURRENTLY HAVE CREATED THE HEADERS AND FOUND 3 IMAGES OF TOPS TO USE AS TESTS.
  I WANT TO EVENTUALLY MAKE IT WHERE IT WILL DISPLAY THE USER'S ACTUAL WARDROBE,
  BUT FOR NOW I JUST WANTED IT TO TEST IT. UNFORTUNATELY, THE HEADERS ALL EXIST
  BUT THE IMAGES ARE NOT DISPLAYING. NEED TO WORK ON THAT
*/

import { YStack, H2, Separator, Theme } from 'tamagui';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';

/*export default function TabWardrobeScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Wardrobe</H2>
        <Separator />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </YStack>
    </Theme>
  );
}*/

interface Item {
  id: string;
  title: string;
  images?: { src: any; tag: string }[];
}

export default function TabWardrobeScreen() {
  const DATA = [
    { 
      id: 'tops',
      title: 'Tops',
      images: [
        { src: require('./WardrobeTestImages/top1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/top2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/top3.png'), tag: 'Formal' },
      ],
    },
    {
      id: 'pants',
      title: 'Pants',
    },
    {
      id: 'skirts',
      title: 'Skirts',
    },
    {
      id: 'dresses',
      title: 'Dresses',
    },
    {
      id: 'accessories',
      title: 'Accessories',
    },
    {
      id: 'jewelry',
      title: 'Jewelry',
    }
  ];

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      {item.images && item.images.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={image.src} style={styles.image} />
          <Text style={styles.tag}>{image.tag}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#FF5C5C', // A pinkish-red color
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, // Gives a boxed-in look
  },
  title: {
    fontSize: 18, // Smaller font size
    alignSelf: 'flex-start', // Left-aligned
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginRight: 10,
  },
  tag: {
    fontSize: 14,
  },
});