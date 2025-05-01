import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HeaderHome from '../../components/moleculs/HeaderDashboard';
import MenuItem from '../../components/moleculs/MenuItem/MenuItem';
import BottomNavigator from '../../components/moleculs/BottomNavigator/BottomNavigator';
import ProductCard from '../../components/moleculs/ProductCard/ProductCard';
import {useProducts} from '../../contexts/ProductContext';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

const Dashboard = ({navigation}) => {
  const {products} = useProducts();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    photo: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getDatabase();
          const userRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              fullName: data.fullName || '',
              email: data.email || '',
              photo: data.photo || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const recommendedProducts = products.slice(0, 2);

  return (
    <View style={styles.page}>
      <ScrollView>
        <HeaderHome
          name={userData.fullName}
          email={userData.email}
          photo={userData.photo}
          welcome={`Welcome back, ${userData.fullName}`}
        />
        <View style={styles.container}>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="bag"
              title="Buy Now"
              onPress={() => navigation.navigate('Product')}
            />
            <MenuItem
              icon="shopping-cart"
              title="Your Cart"
              onPress={() => navigation.navigate('Cart')}
            />
          </View>

          <Text style={styles.sectionTitle}>Recommended Product</Text>

          <View style={styles.productContainer}>
            {recommendedProducts.map(product => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  image={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      id: product.id,
                    })
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigator navigation={navigation} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#E1EEBC',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 350,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'Inder-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#519259',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  productItem: {
    marginBottom: 20,
  },
});
