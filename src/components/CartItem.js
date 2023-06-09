import { increase, decrease, deleteItem } from "../reducers/cartReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
import {
    showNotification,
    hideNotification,
} from "../reducers/notificationReducer"
import Button from "react-bootstrap/Button"

const CartItem = ({ item }) => {
    // state to controll if quantity of items <= 1
    const [quantity, setQuantity] = useState(item.quantity)
    const dispatch = useDispatch()
    const handleItemDeleting = (item) => {
        if (
            window.confirm(
                "Are you sure you want to delete this item from the cart ? "
            )
        ) {
            dispatch(deleteItem(item.id))
            dispatch(showNotification("Item is removed"))
            setTimeout(() => {
                dispatch(hideNotification(""))
            }, 5000)
            setQuantity(quantity - item.quantity)
        }
    }

    const handleItemDecreasing = (id) => {
        dispatch(decrease(id))
        setQuantity(quantity - 1)
    }

    const handleItemIncreasing = (id) => {
        dispatch(increase(id))
        setQuantity(quantity + 1)
    }

    return (
        <div>
            <div className="cartItem">
                <div className="image">
                    <img src={item.img} alt="" />
                </div>
                <div className="details">
                    <p>{item.name}</p>
                    <p>{item.author}</p>
                    <p>
                        <span style={{ fontWeight: "bold" }}>
                            {item.price}${" "}
                        </span>
                    </p>
                    <p>
                        {quantity < 2 ? (
                            <Button
                                className="details button"
                                variant="secondary"
                                disabled={1}
                            >
                                Less
                            </Button>
                        ) : (
                            <Button
                                className="details button"
                                variant="outline-primary"
                                onClick={() => handleItemDecreasing(item.id)}
                            >
                                Less
                            </Button>
                        )}
                        quantity - {item.quantity}{" "}
                        <Button
                            variant="outline-primary"
                            onClick={() => handleItemIncreasing(item.id)}
                        >
                            More
                        </Button>
                    </p>
                    <Button
                        variant="danger"
                        onClick={() => handleItemDeleting(item)}
                    >
                        Remove from cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
