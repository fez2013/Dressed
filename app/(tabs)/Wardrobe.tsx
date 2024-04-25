import { YStack, H2, Separator, Theme } from 'tamagui';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal
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

interface Outfit {
  top?: ImageItem | null;
  bottom?: ImageItem | null;
  accessory?: ImageItem | null;
  jewelry?: ImageItem | null;
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

  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    const outfitData = {
        top: topItem,
        accessory: accessoryItem,
        jewelry: jewelryItem,
        ...(category !== 'dresses' && { bottom: bottomItem }),
    };

    setOutfit(outfitData);
    setModalVisible(true); // Show the modal
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
    console.log(`Selected item for ${selectedCategory}:`, randomItem);
    return randomItem as ImageItem;
  };

  const renderOutfitModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {outfit && (Object.keys(outfit) as (keyof Outfit)[]).map((key) => {
            const item = outfit[key];
            if (!item || !item.src) {
              console.log(`Missing image for ${key}`);
              return null;
            }
            return <Image key={key} source={item.src} style={styles.modalImage} />;
          })}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
      {renderOutfitModal()}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});