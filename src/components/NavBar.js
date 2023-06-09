import React from "react"
import { Link } from "react-router-dom"

const NavBar = ({ calculateQuantity }) => {
    return (
        <nav className="nav">
            <Link to="/" className="siteTitle">
                Online Shop
            </Link>

            <ul>
                <li>
                    <Link to="/cart" className="link">
                        Cart
                    </Link>
                </li>
                <li>
                    <span className="link"> {calculateQuantity()} </span>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
