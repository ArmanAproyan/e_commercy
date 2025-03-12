import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/complex/header'
import Products from './components/complex/products/products'
import ProductsItem from './components/complex/products/productsItem'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/products' element={<Products/>}/>
        <Route path='products/:id' element={<ProductsItem/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App