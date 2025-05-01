import React, {createContext, useContext, useState} from 'react';
import {getDatabase, ref, get} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = item => {
    const price = Number(item.price);
    if (isNaN(price)) {
      console.error('Invalid item price:', item);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i,
        );
      } else {
        return [
          ...prevItems,
          {
            id: item.id,
            name: item.name,
            price: price,
            quantity: 1,
            image: item.imageUrl,
          },
        ];
      }
    });
  };

  const removeFromCart = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const increaseQuantity = async id => {
    try {
      const db = getDatabase();
      const productRef = ref(db, 'products/' + id);
      const snapshot = await get(productRef);

      if (snapshot.exists()) {
        const productData = snapshot.val();
        const stock = productData.stock;

        setCartItems(prevItems =>
          prevItems.map(item => {
            if (item.id === id) {
              const newQuantity = item.quantity + 1;
              if (newQuantity > stock) {
                showMessage({
                  message: 'Jumlah melebihi stok tersedia',
                  type: 'warning',
                });
                return item;
              }
              return {...item, quantity: newQuantity};
            }
            return item;
          }),
        );
      } else {
        console.error('Produk tidak ditemukan di database');
      }
    } catch (error) {
      console.error('Gagal mengambil data stok:', error);
    }
  };

  const decreaseQuantity = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {...item, quantity: Math.max((item.quantity || 1) - 1, 1)}
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
