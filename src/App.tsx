import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/complex/header'
import Products from './components/complex/products/products'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App