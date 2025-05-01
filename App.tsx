import CheckoutPage from './src/pages/CheckOut';
import PaymentSuccess from './src/pages/payment';
import PaymentFailed from './src/pages/paymentx';
import SplashScreen from './src/pages/SplashScreen';
import SignUp from './src/pages/SignUp';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return <SignUp />;
};

export default App;
