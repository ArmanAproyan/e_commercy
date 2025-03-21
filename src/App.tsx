import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/complex/header';
import Products from './components/complex/products/products';
import ProductsItem from './components/complex/products/productsItem';
import Basket from './components/complex/basket';
import { useEffect, useState } from 'react';
import Product from './types/products';

interface IbasketData extends Product {
  count: number;
}

const App = () => {
  const [isOpenBasket, setIsOpenBasket] = useState<boolean>(false);
  const [basketData, setBasketData] = useState<IbasketData[] | []>([]);

  useEffect(() => {
    const getBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    if (getBasket && Array.isArray(getBasket)) {
      setBasketData(getBasket);
    } else {
      setBasketData([]);
    }
  }, []); 

  const handleAddToBasket = (product: Product) => {
    const updateBasket = [...basketData];
    const isActiveItem = updateBasket.findIndex((val) => val.id === product.id);

    if (isActiveItem !== -1) {
      updateBasket[isActiveItem].count += 1;
    } else {
      const updatedProduct = { ...product, count: 1 };
      updateBasket.push(updatedProduct);
    }

    localStorage.setItem('basket', JSON.stringify(updateBasket));
    setBasketData(updateBasket);
  };

  const handleDeleteToBasket = (id: number) => {
    const updateBasket = basketData.filter((item) => item.id !== id);
    localStorage.setItem('basket', JSON.stringify(updateBasket));
    setBasketData(updateBasket); 
  };


  const handleDecrementCount = (id: number) => {
    const updateData = basketData.map((val) => {
      if(id === val.id && val.count > 1) {
        return {...val, count: val.count - 1 }
      }
      return val
    });
    localStorage.setItem('basket', JSON.stringify(updateData))
    setBasketData(updateData);

  
  }



  const handleOpenBasketModale = () => {
    setIsOpenBasket(!isOpenBasket);
  };

  return (
    <div>
      <Basket
        handleBasketModale={handleOpenBasketModale}
        isOpen={isOpenBasket}
        basketData={basketData}
        deleteProduct={handleDeleteToBasket}
        incrementCount={handleAddToBasket}
        decrementCount={handleDecrementCount}
      />
      <BrowserRouter>
        <Header basketData={basketData} handleBasketModale={handleOpenBasketModale} />
        <Routes>
          <Route path="/products" element={<Products addToBasket={handleAddToBasket} />} />
          <Route path="products/:id" element={<ProductsItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
