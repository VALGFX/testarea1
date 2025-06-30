import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
    const { productId } = useParams()
    const { products, currency, addToCart, isLoggedIn } = useContext(ShopContext)
    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [isImageZoomed, setIsImageZoomed] = useState(false)

    useEffect(() => {
        const found = products.find(item => item._id === productId)
        if (found) {
            setProductData(found)
            setImage(found.image[0])
        }
    }, [productId, products])

    if (!productData) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
                    {/* Skeleton image */}
                    <div className="flex-1 space-y-4">
                        <div className="h-[480px] bg-gray-200 rounded-xl"></div>
                        <div className="flex gap-4 mt-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>

                    {/* Skeleton info */}
                    <div className="flex-1 space-y-4">
                        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-40 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-white text-gray-900">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Images side */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Thumbnails */}
                    <div className="flex lg:flex-col gap-4 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                        {productData.image.map((imgUrl, idx) => (
                            <img
                                key={idx}
                                src={imgUrl}
                                alt={`${productData.name} thumbnail ${idx + 1}`}
                                onClick={() => setImage(imgUrl)}
                                className={`w-20 h-20 rounded-lg object-cover cursor-pointer transition-all duration-300 hover:scale-110 ${
                                    image === imgUrl ? 'ring-4 ring-green-500' : ''
                                }`}
                                loading="lazy"
                            />
                        ))}
                    </div>

                    {/* Main image with zoom */}
                    <div
                        className="relative flex-1 rounded-xl overflow-hidden shadow-xl cursor-zoom-in"
                        onClick={() => setIsImageZoomed(true)}
                    >
                        <img
                            src={image}
                            alt={productData.name}
                            className="w-full h-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-105"
                            loading="lazy"
                        />
                        {/* Zoom overlay */}
                        {isImageZoomed && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
                                onClick={() => setIsImageZoomed(false)}
                            >
                                <img src={image} alt="Zoomed" className="max-w-full max-h-screen object-contain" />
                                <button className="absolute top-4 right-4 text-white text-2xl">&times;</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info side */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">{productData.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center mb-6 space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
                            ))}
                            <img src={assets.star_dull_icon} alt="half star" className="w-5 h-5" />
                            <span className="text-gray-500 text-sm">(122 reviews)</span>
                        </div>

                        {/* Price & Add to Cart */}
                        {isLoggedIn ? (
                            <>
                                <p className="text-3xl font-semibold text-green-600 mb-6">
                                    {currency}
                                    {productData.price.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => addToCart(productData._id)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                >
                                    🛒 Add to Cart
                                </button>
                            </>
                        ) : (
                            <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-md font-semibold text-center text-lg select-none">
                                👤 Login to see the price and buy this product
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mt-8 whitespace-pre-line">
                            {productData.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
            </div>
        </div>
    )
}

export default Product
