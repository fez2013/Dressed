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
  Dimensions,
  TouchableOpacity
} from 'react-native';

interface Item {
  id: string;
  title: string;
  images?: { src: any; tag: string }[];
}

interface ImageItem {
  src: any; // Consider using a more specific type for src, like ImageSourcePropType from 'react-native'
  tag?: string;
  id: string; // Add the id property to ImageItem
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
        //{ src: require('./WardrobeTestImages/top4.png'), tag: 'Casual' },
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

  const renderImageItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity onPress={() => generateOutfit(item)}>
      <Image source={item.src} style={styles.image} />
    </TouchableOpacity>
  );

  const generateOutfit = (selectedItem: ImageItem) => {
    const category = getCategory(selectedItem); // Function to determine the category of the selected item


    let topItem = null;
    let bottomItem = null;
    let accessoryItem = null;
    let jewelryItem = null;
    
    // Logic to randomly select items from other categories
    if(category === 'tops') {
      bottomItem = getRandomItem('pants', 'skirts');
      accessoryItem = getRandomItem('accessories');
      jewelryItem = getRandomItem('jewelry');
      topItem = selectedItem;
    }
    else if(category === 'dresses') {
      accessoryItem = getRandomItem('accessories');
      jewelryItem = getRandomItem('jewelry');
      topItem = selectedItem;
    }
    else if(category === 'pants' || category === 'skirts') {
      topItem = getRandomItem('tops');
      accessoryItem = getRandomItem('accessories');
      jewelryItem = getRandomItem('jewelry');
      bottomItem = selectedItem;
    }

    // Ensure the selected item is part of the outfit
    const outfit = {
        top: topItem,
        accessory: accessoryItem,
        jewelry: jewelryItem,
        // idk why but do NOT erase the 3 dots in front of the next code line
        // it does not work without them
        ...(category !== 'dresses' && { bottom: bottomItem }),
    };

    // Display the generated outfit to the user
    console.log(outfit);
};

const getCategory = (selectedItem: ImageItem): string => {
  return selectedItem.id;
};

let categoryIndex = 0;

const getRandomItem = (...categories: string[]): ImageItem => {
  const selectedCategory = categories[categoryIndex];
  categoryIndex = (categoryIndex + 1) % categories.length; // Cycle through categories
  const selectedItems = DATA.find(item => item.id === selectedCategory)?.images;
  const randomItem = selectedItems ? selectedItems[Math.floor(Math.random() * selectedItems.length)] : { src: null, tag: '', id: selectedCategory };
  return randomItem as ImageItem;
};


  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          data={item.images?.slice(0, 3) as ImageItem[]}
          renderItem={renderImageItem}
          keyExtractor={(image, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageContainer}
        />
      </View>
    );
  };

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
    backgroundColor: '#FFC7CC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 200, // Keeps the container's height fixed
  },
  title: {
    fontSize: 16, // Adjusted font size to make titles smaller
    alignSelf: 'flex-start',
  },
  imageContainer: {
    justifyContent: 'space-around', // Distributes space evenly around the images
    alignItems: 'center', // Centers images vertically
  },
  image: {
    width: Dimensions.get('window').width / 4, // Adjusted from /3 to /4 to fit more images
    height: 200, // Increased the height value to make the images bigger
    resizeMode: 'contain',
    marginHorizontal: 2,
  },
});