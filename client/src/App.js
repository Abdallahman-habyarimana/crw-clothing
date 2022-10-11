
import React from 'react';
import Home from './pages/home/home.component'
import { Routes, Route } from "react-router-dom"
import Navigation from './pages/navigation/navigation.component';
import SignIn from './pages/sign-in/sign-in.component';



const Shop = () => {
  return (
    <h1>I am the shop page </h1>
  )
}

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index  element={ <Home />} />
        <Route path="shop" element={ <Shop />} /> 
        <Route path="signin" element= { <SignIn />} />
      </Route>
    </Routes>
  )
}

export default App