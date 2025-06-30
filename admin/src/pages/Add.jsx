import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Add = ({ token }) => {
	const [image1, setImage1] = useState(false)
	const [image2, setImage2] = useState(false)
	const [image3, setImage3] = useState(false)
	const [image4, setImage4] = useState(false)

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('Acquario')
	const [subCategory, setSubCategory] = useState('Estivo')
	const [bestseller, setBestseller] = useState(false)
	const [sizes, setSizes] = useState([])

	const onSubmitHandler = async e => {
		e.preventDefault()

		try {
			const formData = new FormData()
			formData.append('name', name)
			formData.append('description', description)
			formData.append('price', price)
			formData.append('category', category)
			formData.append('subCategory', subCategory)
			formData.append('bestseller', bestseller)
			formData.append('sizes', JSON.stringify(sizes))

			image1 && formData.append('image1', image1)
			image2 && formData.append('image2', image2)
			image3 && formData.append('image3', image3)
			image4 && formData.append('image4', image4)

			const response = await axios.post(
				`${backendUrl}/api/product/add`,
				formData,
				{
					headers: { token },
				}
			)

			if (response.data.success) {
				toast.success(response.data.message)
				setName('')
				setDescription('')
				setImage1(false)
				setImage2(false)
				setImage3(false)
				setImage4(false)
				setPrice('')
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	return (
		<form
			onSubmit={onSubmitHandler}
			className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6'
		>
			<h2 className='text-2xl font-bold text-gray-800 mb-4'>
				Aggiungi nuovo prodotto
			</h2>

			{/* Image upload */}
			<div>
				<p className='mb-2 font-medium text-gray-700'>Carica immagini</p>
				<div className='flex flex-wrap gap-4'>
					{[image1, image2, image3, image4].map((img, i) => (
						<label
							key={i}
							htmlFor={`image${i + 1}`}
							className='cursor-pointer w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-500 transition'
						>
							<img
								src={!img ? assets.upload_area : URL.createObjectURL(img)}
								alt=''
								className='object-cover w-full h-full rounded-lg'
							/>
							<input
								type='file'
								id={`image${i + 1}`}
								hidden
								onChange={e => {
									const file = e.target.files[0]
									if (i === 0) setImage1(file)
									else if (i === 1) setImage2(file)
									else if (i === 2) setImage3(file)
									else if (i === 3) setImage4(file)
								}}
							/>
						</label>
					))}
				</div>
			</div>

			{/* Name */}
			<div>
				<p className='mb-1 font-medium text-gray-700'>Nome del prodotto</p>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					required
					placeholder='Scrivi qui...'
					className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black'
				/>
			</div>

			{/* Description */}
			<div>
				<p className='mb-1 font-medium text-gray-700'>Descrizione</p>
				<textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					required
					placeholder='Scrivi contenuto qui...'
					className='w-full border border-gray-300 rounded-md px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black'
				/>
			</div>

			{/* Category / Subcategory / Price */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<div>
					<p className='mb-1 font-medium text-gray-700'>Categoria</p>
					<select
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-4 py-2'
					>
						<option value='Aquatic'>Aquatic plants</option>
						<option value='Driftwood'>Plants on driftwood</option>
						<option value='Specials'>Specials</option>
						<option value='Lavarock'>Plants on lavarock</option>
						<option value='Chladophlora'>Chladophlora</option>
						<option value='vitro'>In vitro plants in 100cc cup</option>
						<option value='vitro'>In vitro plants in 100cc cup</option>
						<option value='Aquariumplants'>Aquariumplants (bunch with lead)</option>
						<option value='Aquariumplanten'>Aquariumplanten in Terra Cotta pot</option>
						<option value='Steel'>Plants on steel net </option>
						<option value='mat'>Plants on mat 40x60 cm</option>
						<option value='5'>Aquatic plants in 5 cm pot</option>
						<option value='Terrarium'>Terrarium</option>
						<option value='Aquatic'>Aquatic plants in 9 cm pot</option>
						<option value='Anubias'>Anubias  P9</option>
						<option value='Cryptocoryne'>Cryptocoryne  P9</option>
						<option value='40x60'>Plants on mat 40x60 cm</option>
						<option value='Echinodorus'>Echinodorus P9</option>
						<option value='Microsorum'>Microsorum  p9</option>
						<option value='Assorted'>Assorted plants p5</option>
						<option value='20'>Packages of 20 plants</option>
						<option value='loose'>Floating plants loose</option>
						<option value='cup'>Floating plants in cup</option>
						<option value='Oxygen'>Oxygen plants in cup</option>
						<option value='bundle'>Oxygen bundle plants</option>
						<option value='Nice'>Nice to have</option>
					</select>
				</div>

				<div>
					<p className='mb-1 font-medium text-gray-700'>Sottocategoria</p>
					<select
						value={subCategory}
						onChange={e => setSubCategory(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-4 py-2'
					>
						<option value='Estivo'>Estivo</option>
						<option value='Invernale'>Invernale</option>
					</select>
				</div>

				<div>
					<p className='mb-1 font-medium text-gray-700'>Prezzo (€)</p>
					<input
						type='number'
						value={price}
						onChange={e => setPrice(e.target.value)}
						placeholder='25'
						className='w-full border border-gray-300 rounded-md px-4 py-2'
					/>
				</div>
			</div>

			{/* Bestseller */}
			<div className='flex items-center gap-2 mt-2'>
				<input
					id='bestseller'
					type='checkbox'
					checked={bestseller}
					onChange={() => setBestseller(prev => !prev)}
					className='w-4 h-4 text-black border-gray-300 rounded focus:ring-black'
				/>
				<label htmlFor='bestseller' className='text-gray-700 cursor-pointer'>
					Aggiungi ai bestseller
				</label>
			</div>

			{/* Submit */}
			<button
				type='submit'
				className='bg-black hover:bg-gray-800 transition text-white px-6 py-3 rounded-md font-semibold shadow'
			>
				AGGIUNGI
			</button>
		</form>
	)
}

export default Add
