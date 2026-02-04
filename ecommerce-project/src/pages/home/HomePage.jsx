import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import './HomePage.css'
import { ProductsGrid } from './ProductsGrid'


export function HomePage({ cart }) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getHomeData = async () => {
            const responce = await axios.get('/api/products')
            setProducts(responce.data);
        }
        getHomeData()
    }, [])


    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="image.png" />

            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )
}