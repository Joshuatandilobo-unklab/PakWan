import React from 'react';
import CheckoutPage from './src/pages/CheckOut';
import PaymentSuccess from './src/pages/PaymentSuccess';
import PaymentFailed from './src/pages/PaymentFailed';
import SplashScreen from './src/pages/SplashScreen';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import Dashboard from './src/pages/Dashboard';
import Product from './src/pages/Product/Product';
import Cart from './src/pages/Cart';
import ProductDetail from './src/pages/ProductDetail';
import ProfilePage from './src/pages/Profile';
import ProfileSettings from './src/pages/ProfileSettings';
import {CartProvider} from './src/contexts/CartContext';
import {ProductProvider} from './src/contexts/ProductContext';
import './src/config/Firebase';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfilePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileSettings"
              component={ProfileSettings}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccess}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PaymentFailed"
              component={PaymentFailed}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
