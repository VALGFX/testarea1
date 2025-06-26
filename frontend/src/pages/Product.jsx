import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
	const { productId } = useParams()
	const { products, currency, addToCart } = useContext(ShopContext)
	const [productData, setProductData] = useState(null)
	const [image, setImage] = useState('')

	useEffect(() => {
		const found = products.find(item => item._id === productId)
		if (found) {
			setProductData(found)
			setImage(found.image[0])
		}
	}, [productId, products])

	return productData ? (
		<div className='border-t-2 pt-12 px-4 md:px-10 lg:px-20 bg-white text-gray-900'>
			{/* Product Content */}
			<div className='flex flex-col lg:flex-row gap-12 transition-opacity duration-500'>
				{/* Images */}
				<div className='flex-1 flex flex-col-reverse lg:flex-row gap-4'>
					<div className='flex lg:flex-col gap-3 lg:overflow-y-auto max-h-[500px]'>
						{productData.image.map((item, index) => (
							<img
								key={index}
								src={item}
								alt=''
								onClick={() => setImage(item)}
								className={`rounded-lg w-20 h-20 object-cover cursor-pointer border transition-transform duration-300 hover:scale-105 ${
									image === item ? 'ring-2 ring-green-600' : ''
								}`}
							/>
						))}
					</div>
					<div className='flex-1'>
						<img
							src={image}
							alt=''
							className='w-full rounded-xl shadow-md animate-pulse transition duration-500 ease-in-out'
						/>
					</div>
				</div>

				{/* Product Info */}
				<div className='flex-1'>
					<h1 className='text-3xl font-bold mb-3'>{productData.name}</h1>

					<div className='flex items-center gap-1 mb-4'>
						{[...Array(4)].map((_, i) => (
							<img
								key={i}
								src={assets.star_icon}
								alt='star'
								className='w-4 h-4'
							/>
						))}
						<img
							src={assets.star_dull_icon}
							alt='half-star'
							className='w-4 h-4'
						/>
						<p className='ml-2 text-sm text-gray-500'>(122 reviews)</p>
					</div>

					<p className='text-3xl font-semibold text-green-600 mb-4'>
						{currency}
						{productData.price}
					</p>

					<p className='text-gray-600 mb-6 leading-relaxed'>
						{productData.description}
					</p>

					<button
						onClick={() => addToCart(productData._id)}
						className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full text-base font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-2'
					>
						🛒 Add to Cart
					</button>

					<hr className='my-8' />

					<div className='text-sm text-gray-500 space-y-1'>
						<p>✅ 100% Original product</p>
						<p>🚚 Cash on delivery available</p>
						<p>🔁 Easy return/exchange within 7 days</p>
					</div>
				</div>
			</div>

			{/* Description & Reviews */}
			<div className='mt-20'>
				<div className='flex text-sm border-b font-medium'>
					<span className='px-6 py-3 border-t border-l border-r rounded-t-lg bg-gray-100 text-gray-900'>
						Description
					</span>
					<span className='px-6 py-3 text-gray-500'>Reviews (122)</span>
				</div>
				<div className='border px-6 py-6 text-sm text-gray-600 leading-relaxed'>
					<p className='mb-4'>
						An e-commerce website is an online platform that facilitates the
						buying and selling of products or services over the internet. It
						serves as a virtual marketplace where businesses and individuals can
						showcase their products and conduct transactions without a physical
						presence.
					</p>
					<p>
						These websites typically display products or services along with
						descriptions, images, prices, and available options. Each product
						usually has its own dedicated page with relevant information.
					</p>
				</div>
			</div>

			{/* Related Products */}
			<RelatedProducts
				category={productData.category}
				subCategory={productData.subCategory}
			/>
		</div>
	) : (
		<div className='opacity-0 h-20' />
	)
}

export default Product
