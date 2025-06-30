import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = props => {
	const currency = '$'
	const delivery_fee = 10
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const [search, setSearch] = useState('')
	const [showSearch, setShowSearch] = useState(false)
	const [products, setProducts] = useState([])
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const [cartItems, setCartItems] = useState(() => {
		const stored = localStorage.getItem('cartItems')
		return stored ? JSON.parse(stored) : {}
	})
	const navigate = useNavigate()

	// Salvează automat în localStorage
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

	// Adaugă în coș
	const addToCart = async itemId => {
		const updatedCart = {
			...cartItems,
			[itemId]: (cartItems[itemId] || 0) + 1,
		}
		setCartItems(updatedCart)

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/add',
					{ itemId },
					{ headers: { token } }
				)
			} catch (error) {
				console.error(error)
				toast.error(error.response?.data?.message || 'Eroare la coș')
			}
		}
	}

	// Total produse în coș
	const getCartCount = () => {
		return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0)
	}

	// Total preț produse în coș
	const getCartAmount = () => {
		let total = 0
		for (const itemId in cartItems) {
			const product = products.find(p => p._id === itemId)
			if (product) {
				total += product.price * cartItems[itemId]
			}
		}
		return total
	}

	// Modifică cantitatea
	const updateQuantity = async (itemId, quantity) => {
		const updated = { ...cartItems, [itemId]: quantity }
		setCartItems(updated)

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/update',
					{ itemId, quantity },
					{ headers: { token } }
				)
			} catch (error) {
				console.log(error)
				toast.error(error.message)
			}
		}
	}

	// Preia lista de produse
	const getProductsData = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list')
			if (response.data.success) {
				setProducts(response.data.products.reverse())
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	// Preia coșul din backend
	const getUserCart = async token => {
		try {
			const response = await axios.post(
				backendUrl + '/api/cart/get',
				{},
				{ headers: { token } }
			)
			if (response.data.success) {
				setCartItems(response.data.cartData)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	// La prima încărcare: produse + token
	useEffect(() => {
		getProductsData()
	}, [])

	useEffect(() => {
		if (token) {
			getUserCart(token)
		}
	}, [token])

	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		setCartItems,
		addToCart,
		updateQuantity,
		getCartCount,
		getCartAmount,
		navigate,
		backendUrl,
		setToken,
		token,
	}

	return (
		<ShopContext.Provider value={value}>
			{props.children}
		</ShopContext.Provider>
	)
}

export default ShopContextProvider
