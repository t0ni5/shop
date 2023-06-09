import { useSelector } from "react-redux"
import CartItem from "./CartItem"
import Button from "react-bootstrap/Button"

const Cart = () => {
    const cartItems = useSelector((state) => state.cart)
    const calculateTotal = () => {
        let total = 0
        cartItems.forEach(
            (item) => (total = total + item.price * item.quantity)
        )
        return total
    }

    return (
        <div>
            {!cartItems.length && (
                <h2 className="h2Cart">Your cart is empty</h2>
            )}
            <div className="cart">
                {cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))}
                <div className="checkout">
                    {" "}
                    <h2>Total: {calculateTotal()}$</h2>
                    <Button
                        variant="success"
                        onClick={() => console.log("checkout page")}
                    >
                        CHECKOUT
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
