import { Header } from "../components/Header"
import './NotFoundPage.css'

export function NotFoundPage() {
    return (
        <>
             <Header />
            <div className="page-not-found">
                <p>Opps, page not found.</p>
            </div>
        </>
    )
}