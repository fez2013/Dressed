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
      images: [
        { src: require('./WardrobeTestImages/pants1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/pants2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/pants3.png'), tag: 'Sport' },
      ],
    },
    {
      id: 'skirts',
      title: 'Skirts',
      images: [
        { src: require('./WardrobeTestImages/skirt1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/skirt2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/skirt3.png'), tag: 'Evening' },
      ],
    },
    {
      id: 'dresses',
      title: 'Dresses',
      images: [
        { src: require('./WardrobeTestImages/dress1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/dress2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/dress3.png'), tag: 'Evening' },
      ],
    },
    {
      id: 'accessories',
      title: 'Accessories',
      images: [
        { src: require('./WardrobeTestImages/accessory1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/accessory2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/accessory3.png'), tag: 'Sport' },
      ],
    },
    {
      id: 'jewelry',
      title: 'Jewelry',
      images: [
        { src: require('./WardrobeTestImages/jewelry1.png'), tag: 'Casual' },
        { src: require('./WardrobeTestImages/jewelry2.png'), tag: 'Formal' },
        { src: require('./WardrobeTestImages/jewelry3.png'), tag: 'Elegant' },
      ],
    }
  ];

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.imageContainer}>
        {item.images && item.images.map((image, index) => (
          <Image key={index} source={image.src} style={styles.image} />
        ))}
      </View>
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
  title: {
    fontSize: 16, // Adjusted font size to make titles smaller
    alignSelf: 'flex-start',
  },
  image: {
    flex: 1, // Keeps the image flexible
    width: null, // Ensures width is dynamically adjusted
    height: '100%', // Increase height to fill the container
    resizeMode: 'contain', // Ensures the image fits within the view without stretching
    marginHorizontal: 5, // Keeps a small horizontal margin
    marginVertical: 2, // Reduces top and bottom margins to increase image size
  },
  item: {
    backgroundColor: '#FF5C5C',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 200, // Keeps the container's height fixed
  },
  imageContainer: {
    flex: 1, // Ensures the container takes up the full height of its parent
    flexDirection: 'row', // Keeps images side by side
    justifyContent: 'space-around', // Distributes space evenly around the images
    alignItems: 'center', // Centers images vertically
    marginTop: 10,
  },
});
