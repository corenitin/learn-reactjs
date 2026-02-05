import { Header } from "../components/Header"
import './NotFoundPage.css'

export function NotFoundPage({cart}) {
    return (
        <>
             <Header cart={cart} />
            <div className="page-not-found">
                <p>Opps, page not found.</p>
            </div>
        </>
    )
}