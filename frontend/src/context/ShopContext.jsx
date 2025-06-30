import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // 🔑 Starea utilizatorului
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    // 🛒 Coșul de cumpărături
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems')
        return savedCart ? JSON.parse(savedCart) : {}
    })

    // 🔍 Căutare
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    // 📦 Produse
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    // 🔁 Salvăm coșul în localStorage la fiecare schimbare
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // 🔐 Obținem datele coșului de la server dacă suntem logați
    useEffect(() => {
        if (token) {
            getUserCart(token)
        }
    }, [token])

    // 🔄 La mount, preluăm toate produsele
    useEffect(() => {
        getProductsData()
    }, [])

    // 🔗 Funcția care sincronizează coșul local (anonim) cu cel de pe server
    const syncCartWithServer = async (newToken) => {
        try {
            await axios.post(
                backendUrl + '/api/cart/sync',
                { cartData: cartItems },
                { headers: { token: newToken } }
            )
            toast.success('Coșul tău a fost sincronizat cu contul!')
            getUserCart(newToken) // Reîncărcăm coșul din server
        } catch (error) {
            console.error('Eroare la sincronizarea coșului:', error)
            toast.error('Nu s-a putut sincroniza coșul. Încearcă din nou.')
        }
    }

    // 🛒 Adaugă un produs în coș
    const addToCart = async (itemId) => {
        let cartData = { ...cartItems }

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId },
                    { headers: { token } }
                )
            } catch (error) {
                console.error(error)
                toast.error(error.response?.data?.message || 'Eroare la adăugarea în coș')
            }
        }
    }

    // 🧮 Numără totalul produselor din coș
    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
    }

    // 💰 Calculează suma totală a coșului
    const getCartAmount = () => {
        let totalAmount = 0
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId)
            if (product && cartItems[itemId] > 0) {
                totalAmount += product.price * cartItems[itemId]
            }
        }
        return totalAmount
    }

    // 🔄 Actualizează cantitatea unui produs (dacă există variante - ex: dimensiune)
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        if (!cartData[itemId]) cartData[itemId] = {}

        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                )
            } catch (error) {
                console.log(error)
                toast.error('Eroare la actualizarea cantității')
            }
        }
    }

    // 📦 Preia produsele de la backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('Eroare la încărcarea produselor')
        }
    }

    // 🧾 Preia coșul de pe server pentru userul autentificat
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token: userToken } }
            )
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error('Eroare la preluarea coșului')
        }
    }

    // 👤 Setează token-ul și sincronizează coșul local dacă e cazul
    const handleSetToken = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)

        if (Object.keys(cartItems).length > 0) {
            syncCartWithServer(newToken)
        }
    }

    // 🔽 Curăță coșul local și din localStorage
    const clearCart = () => {
        setCartItems({})
        localStorage.removeItem('cartItems')
    }

    // Valoarea oferită contextului
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken: handleSetToken, // Folosim funcția personalizată
        isLoggedIn: !!token,
        clearCart,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
