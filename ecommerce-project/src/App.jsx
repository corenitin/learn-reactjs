import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((responce) => {
        setCart(responce.data);

      })
  }, [])
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path='checkout' element={<CheckoutPage cart={cart} />}></Route>
        <Route path='orders' element={<OrdersPage />}></Route>
        <Route path='tracking' element={<TrackingPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App
