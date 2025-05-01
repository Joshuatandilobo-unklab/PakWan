import React, {createContext, useContext, useEffect, useState} from 'react';
import {onValue, ref, update} from 'firebase/database';
import {getDatabase} from 'firebase/database';
import {getApp} from 'firebase/app';

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const db = getDatabase(getApp());

  useEffect(() => {
    const productsRef = ref(db, 'products');

    const unsubscribe = onValue(productsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setProducts(productList);
      }
    });

    return () => unsubscribe();
  }, [db]);

  const getProductById = id => products.find(p => p.id === id);

  const reduceStock = id => {
    const product = getProductById(id);
    if (product && product.stock > 0) {
      const updatedStock = product.stock - 1;
      update(ref(db, `products/${id}`), {stock: updatedStock});
    }
  };

  return (
    <ProductContext.Provider value={{products, getProductById, reduceStock}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
