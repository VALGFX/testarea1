import { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {
	const { products, currency, cartItems, updateQuantity, navigate } =
		useContext(ShopContext)
	const [cartData, setCartData] = useState([])

	useEffect(() => {
		if (products.length > 0) {
			const tempData = []
			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						tempData.push({
							_id: items,
							size: item,
							quantity: cartItems[items][item],
						})
					}
				}
			}
			setCartData(tempData)
		}
	}, [cartItems, products])

	const handleCheckout = () => {
		// Schimbă ruta local, fără Next.js
		navigate('/place-order')
	}

	return (
		<div className='max-h-screen px-4 py-12 bg-gray-0'>
			<div className='max-w-[100%] mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10 flex flex-col gap-10 md:flex-row'>
				<div className='flex-1'>
					<div className='text-3xl font-bold mb-4'>
						<Title text1='Your' text2='Cart' />
					</div>

					{cartData.length === 0 ? (
						<p className='text-gray-500 text-lg text-center mt-10'>
							Your cart is empty.
						</p>
					) : (
						<div className='space-y-6'>
							{cartData.map((item, index) => {
								const product = products.find(p => p._id === item._id)

								return (
									<div
										key={index}
										className='flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300'
									>
										<div className='flex items-start gap-5 w-full sm:w-auto'>
											<img
												src={product.image[0]}
												alt={product.name}
												className='w-20 h-20 object-cover rounded-md'
											/>
											<div>
												<h3 className='font-semibold text-lg'>
													{product.name}
												</h3>
												<div className='flex items-center gap-4 mt-2 text-sm'>
													<span className='text-gray-600'>
														{currency}
														{product.price}
													</span>
												</div>
											</div>
										</div>

										<div className='flex items-center gap-4 mt-4 sm:mt-0'>
											<input
												type='number'
												min={1}
												defaultValue={item.quantity}
												onChange={e => {
													const val = Number(e.target.value)
													if (val > 0) {
														updateQuantity(item._id, item.size, val)
													}
												}}
												className='w-16 border border-gray-300 rounded px-2 py-1 text-center'
											/>
											<button
												onClick={() => updateQuantity(item._id, item.size, 0)}
												className='text-red-600 hover:text-red-800 text-xl font-bold'
												aria-label='Remove item'
											>
												×
											</button>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>

				<div className='w-full md:w-[400px]'>
					<div className='bg-gray-100 p-6 rounded-xl shadow-md'>
						<CartTotal />
						<button
							disabled={cartData.length === 0}
							onClick={handleCheckout}
							className='mt-6 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition'
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
