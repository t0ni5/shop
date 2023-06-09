import { Routes, Route } from "react-router-dom"
import Catalog from "./components/Catalog"
import Cart from "./components/Cart"
import NavBar from "./components/NavBar"
import { useEffect } from "react"
import products from "./products"
import { useSelector, useDispatch } from "react-redux"
import { initializeItems } from "./reducers/itemReducer"
import { addItem, setCart } from "./reducers/cartReducer"
import Notification from "./components/Notification"
import {
    showNotification,
    hideNotification,
} from "./reducers/notificationReducer"

function App() {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.items)
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(initializeItems(products))
    }, [])

    useEffect(() => {
        const usersCart = window.localStorage.getItem("usersCart")
        if (usersCart) {
            const oldCart = JSON.parse(usersCart)
            dispatch(setCart(oldCart))
        }
    }, [])

    // calculate amount of items in the Cart
    const calculateQuantity = () => {
        let quantity = 0
        cart.forEach((item) => {
            quantity = quantity + item.quantity
        })
        return quantity
    }

    //adding item to the cart
    const handleItemAdding = (item) => {
        dispatch(addItem(item))
        dispatch(showNotification("Item is added"))
        setTimeout(() => {
            dispatch(hideNotification(""))
        }, 5000)
    }

    return (
        <div className="container">
            <div>
                <NavBar calculateQuantity={calculateQuantity}></NavBar>
            </div>
            <div>
                <Notification />
            </div>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Catalog
                            products={items}
                            handleItemAdding={handleItemAdding}
                        />
                    }
                />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    )
}

export default App
