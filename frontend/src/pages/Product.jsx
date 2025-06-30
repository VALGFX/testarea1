import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
	const { productId } = useParams()
	const { products } = useContext(ShopContext)
	const [productData, setProductData] = useState(null)
	const [image, setImage] = useState('')

	useEffect(() => {
		const found = products.find(item => item._id === productId)
		if (found) {
			setProductData(found)
			setImage(found.image[0])
		}
	}, [productId, products])

	if (!productData) {
		return <div className="flex justify-center items-center h-40 text-gray-400">Loading product...</div>
	}

	return (
		<div className="max-w-7xl mx-auto px-6 py-12 bg-white text-gray-900">
			<div className="flex flex-col lg:flex-row gap-12">
				{/* Images side */}
				<div className="flex-1 flex flex-col lg:flex-row gap-6">
					{/* Thumbnails */}
					<div className="flex lg:flex-col gap-4 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
						{productData.image.map((imgUrl, idx) => (
							<img
								key={idx}
								src={imgUrl}
								alt={productData.name}
								onClick={() => setImage(imgUrl)}
								className={`w-20 h-20 rounded-lg object-cover cursor-pointer transition-transform duration-300 hover:scale-110 ${
									image === imgUrl ? 'ring-4 ring-green-500' : ''
								}`}
								loading="lazy"
							/>
						))}
					</div>
					{/* Main image */}
					<div className="flex-1 rounded-xl overflow-hidden shadow-lg">
						<img
							src={image}
							alt={productData.name}
							className="w-full h-auto object-contain transition-transform duration-500 ease-in-out"
							loading="lazy"
						/>
					</div>
				</div>

				{/* Info side */}
				<div className="flex-1 flex flex-col justify-between">
					<div>
						<h1 className="text-4xl font-extrabold mb-4">{productData.name}</h1>

						{/* Rating */}
						<div className="flex items-center mb-6 space-x-2">
							{[...Array(4)].map((_, i) => (
								<img
									key={i}
									src={assets.star_icon}
									alt="star"
									className="w-5 h-5"
								/>
							))}
							<img
								src={assets.star_dull_icon}
								alt="half star"
								className="w-5 h-5"
							/>
							<span className="text-gray-500 text-sm">(122 reviews)</span>
						</div>

						{/* NO PRICE */}

						{/* Description */}
						<p className="text-gray-700 leading-relaxed mb-10 whitespace-pre-line">
							{productData.description}
						</p>
					</div>

					{/* Message for login */}
					<div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-md font-semibold text-center text-lg select-none">
						👤 Login to see the price and buy this product
					</div>
				</div>
			</div>

			{/* Related products */}
			<div className="mt-20">
				<h2 className="text-2xl font-bold mb-6">Related Products</h2>
				<RelatedProducts
					category={productData.category}
					subCategory={productData.subCategory}
				/>
			</div>
		</div>
	)
}

export default Product
