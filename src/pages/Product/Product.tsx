import React, {useState} from 'react';
import {View, TextInput, FlatList, StyleSheet, Text} from 'react-native';
import {Search} from 'lucide-react-native';
import ProductCard from '../../components/moleculs/ProductCard/ProductCard';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import {useProducts} from '../../contexts/ProductContext';

const Product = ({navigation}) => {
  const {products} = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log('Produk dari context:', products);

  const renderItem = ({item}) => (
    <View style={styles.productItem}>
      <ProductCard
        image={item.imageUrl}
        name={item.name}
        price={item.price}
        stock={item.stock}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            id: item.id,
          })
        }
      />
    </View>
  );
  console.log('Filtered Products:', filteredProducts);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search product..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Search size={20} color="black" />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No products found</Text>
          </View>
        }
      />

      <BottomNavigator navigation={navigation} />
    </View>
  );
};

export default Product;
