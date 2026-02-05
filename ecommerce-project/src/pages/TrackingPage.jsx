import axios from 'axios'
import { NavLink } from 'react-router'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useParams } from 'react-router'
import './TrackingPage.css'
import dayjs from 'dayjs'

export function TrackingPage({ cart }) {

    const { orderId, productId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchTrackingData = async () => {
            const responce = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(responce.data)
        }

        fetchTrackingData()
    }, [orderId])

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs

    const timePassedMs = dayjs().valueOf() - order.orderTimeMs

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100

    if (deliveryPercent > 100) {
        deliveryPercent = 100
    }

    let isPreparing;
    let isShipped;
    let isDelivered;

    if (deliveryPercent < 33) {
        isPreparing = deliveryPercent
    } else if (100 > deliveryPercent >= 33) {
        isShipped = deliveryPercent
    } else if (deliveryPercent === 100) {
        isDelivered = deliveryPercent
    }

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <NavLink className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </NavLink>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}