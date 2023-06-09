import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const setStateToLocalStorage = (newState) => {
    window.localStorage.setItem("usersCart", JSON.stringify(newState))
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const itemToAdd = state.find(
                (item) => item.id === action.payload.id
            )
            if (itemToAdd) {
                const updatedItem = {
                    ...itemToAdd,
                    quantity: itemToAdd.quantity + 1,
                }

                const newState = state.map((item) =>
                    item.id === itemToAdd.id ? updatedItem : item
                )
                window.localStorage.setItem(
                    "usersCart",
                    JSON.stringify(newState)
                )
                return newState
            }

            const newState = state.concat({ ...action.payload, quantity: 1 })
            setStateToLocalStorage(newState)
            return newState
        },
        deleteItem(state, action) {
            const itemToDelete = state.find(
                (item) => item.id === action.payload
            )

            const newState = state.filter((item) => item.id !== itemToDelete.id)

            setStateToLocalStorage(newState)
            return newState
        },
        setCart(state, action) {
            return state.concat(action.payload)
        },
        increase(state, action) {
            const itemToChange = state.find(
                (item) => item.id === action.payload
            )

            const changedItem = {
                ...itemToChange,
                quantity: itemToChange.quantity + 1,
            }

            const newState = state.map((item) =>
                item.id === action.payload ? changedItem : item
            )

            setStateToLocalStorage(newState)

            return newState
        },
        decrease(state, action) {
            const itemToChange = state.find(
                (item) => item.id === action.payload
            )

            const changedItem = {
                ...itemToChange,
                quantity: itemToChange.quantity - 1,
            }

            const newState = state.map((item) =>
                item.id === action.payload ? changedItem : item
            )

            setStateToLocalStorage(newState)

            return newState
        },
    },
})

export const { addItem, setCart, increase, decrease, deleteItem } =
    cartSlice.actions
export default cartSlice.reducer
