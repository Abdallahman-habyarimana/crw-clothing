
import React, { useEffect } from 'react';
import Home from './pages/home/home.component'
import { Routes, Route } from "react-router-dom"
import Navigation from './pages/navigation/navigation.component';
import Authentication from './pages/authentication/authentication.component';
import Shop from './pages/shop/shop.component';
import Checkout from './pages/checkout/checkout.component';
import { checkUserSession } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserSession())
}, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index  element={ <Home />} />
        <Route path="shop/*" element={ <Shop />} /> 
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element= { <Authentication />} />
      </Route>
    </Routes>
  )
}

export default App