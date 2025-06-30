import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {
	const { products, search, showSearch } = useContext(ShopContext)
	const [showFilter, setShowFilter] = useState(false)
	const [filterProducts, setFilterProducts] = useState([])
	const [category, setCategory] = useState([])
	const [subCategory, setSubCategory] = useState([])
	const [sortType, setSortType] = useState('relavent')

	const toggleCategory = e => {
		if (category.includes(e.target.value)) {
			setCategory(prev => prev.filter(item => item !== e.target.value))
		} else {
			setCategory(prev => [...prev, e.target.value])
		}
	}

	const toggleSubCategory = e => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory(prev => prev.filter(item => item !== e.target.value))
		} else {
			setSubCategory(prev => [...prev, e.target.value])
		}
	}

	const applyFilter = () => {
		let productsCopy = products.slice()

		if (showSearch && search) {
			productsCopy = productsCopy.filter(item =>
				item.name.toLowerCase().includes(search.toLowerCase())
			)
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter(item =>
				category.includes(item.category)
			)
		}

		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter(item =>
				subCategory.includes(item.subCategory)
			)
		}

		setFilterProducts(productsCopy)
	}

	const sortProduct = () => {
		let fpCopy = filterProducts.slice()

		switch (sortType) {
			case 'low-high':
				setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
				break

			case 'high-low':
				setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
				break

			default:
				applyFilter()
				break
		}
	}

	useEffect(() => {
		applyFilter()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, subCategory, search, showSearch, products])

	useEffect(() => {
		sortProduct()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortType])

	return (
		<div className='max-w-[1280px] mx-auto px-6 sm:px-12 py-12 flex flex-col sm:flex-row gap-12 border-t border-gray-300'>
			{/* Sidebar filtre */}
			<aside className='sm:min-w-[260px] bg-white rounded-2xl shadow-lg p-6 sticky top-24 h-max'>
				<div
					className='flex items-center justify-between cursor-pointer mb-6 sm:hidden'
					onClick={() => setShowFilter(!showFilter)}
				>
					<h2 className='text-xl font-semibold tracking-wide uppercase text-gray-800'>
						Filtri
					</h2>
					<img
						src={assets.dropdown_icon}
						alt='Toggle filters'
						className={`h-4 w-4 transition-transform duration-300 ${
							showFilter ? 'rotate-90' : ''
						}`}
					/>
				</div>

				<div
					className={`${showFilter ? 'block' : 'hidden'} sm:block space-y-8`}
				>
					{/* Categoria */}
					<section>
						<h3 className='text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase'>
							Categorie
						</h3>
						<div className='flex flex-col gap-3 text-gray-700 font-medium text-sm'>
							{['Aquatic', 'Driftwood','Specials', 'Lavarock','Chladophlora','vitro','Aquariumplants'].map(cat => (
								<label
									key={cat}
									className='inline-flex items-center cursor-pointer select-none'
								>
									<input
										type='checkbox'
										value={cat}
										checked={category.includes(cat)}
										onChange={toggleCategory}
										className='form-checkbox h-5 w-5 text-green-600 rounded'
									/>
									<span className='ml-3'>{cat}</span>
								</label>
							))}
						</div>
					</section>

					{/* Sottocategoria */}
					<section>
						<h3 className='text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase'>
							Tipo
						</h3>
						<div className='flex flex-col gap-3 text-gray-700 font-medium text-sm'>
							{['Estivo', 'Invernale'].map(sub => (
								<label
									key={sub}
									className='inline-flex items-center cursor-pointer select-none'
								>
									<input
										type='checkbox'
										value={sub}
										checked={subCategory.includes(sub)}
										onChange={toggleSubCategory}
										className='form-checkbox h-5 w-5 text-green-600 rounded'
									/>
									<span className='ml-3'>{sub}</span>
								</label>
							))}
						</div>
					</section>
				</div>
			</aside>

			{/* Zona produse */}
			<main className='flex-1 flex flex-col'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6'>
					<Title text1='TUTTE' text2='LE COLLEZIONI' />
					<select
						onChange={e => setSortType(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition'
						value={sortType}
					>
						<option value='relavent'>Ordina per: Rilevanza</option>
						<option value='low-high'>Ordina per: Prezzo crescente</option>
						<option value='high-low'>Ordina per: Prezzo decrescente</option>
					</select>
				</div>

				{filterProducts.length === 0 ? (
					<p className='text-center text-gray-500 text-lg mt-16'>
						Nessun prodotto trovato.
					</p>
				) : (
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8'>
						{filterProducts.map((item, index) => (
							<ProductItem
								key={index}
								name={item.name}
								id={item._id}
								price={item.price}
								image={item.image}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	)
}

export default Collection
