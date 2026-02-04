import { Header } from '../../components/Header'
import './OrdersPage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { OrdersGrid } from './OrdersGrid'

export function OrdersPage({ cart }) {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrdersData = async () => {
            const responce = await axios.get('/api/orders?expand=products')
            setOrders(responce.data);
        }
        fetchOrdersData()
    }, [])

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    )
}