import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {
	const [list, setList] = useState([])

	const fetchList = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list')
			if (response.data.success) {
				setList(response.data.products.reverse())
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	const removeProduct = async id => {
		try {
			const response = await axios.post(
				backendUrl + '/api/product/remove',
				{ id },
				{ headers: { token } }
			)

			if (response.data.success) {
				toast.success(response.data.message)
				await fetchList()
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	useEffect(() => {
		fetchList()
	}, [])

	return (
		<section className='w-full max-w-6xl mx-auto px-4 py-8'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
				📦 Elenco completo dei prodotti
			</h2>

			<div className='flex flex-col gap-2'>
				{/* Intestazioni */}
				<div className='hidden md:grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center py-3 px-4 bg-gray-100 text-sm rounded-md shadow-sm font-medium text-gray-700'>
					<span>Immagine</span>
					<span>Nome</span>
					<span>Categoria</span>
					<span>Prezzo</span>
					<span className='text-center'>Azione</span>
				</div>

				{/* Lista produse */}
				{list.map((item, index) => (
					<div
						key={index}
						className='grid grid-cols-[80px_2fr_1fr] md:grid-cols-[80px_2fr_1fr_1fr_80px] items-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-md shadow-sm text-sm hover:shadow-md transition'
					>
						<img
							src={item.image[0]}
							alt={item.name}
							className='w-24 h-24 object-cover rounded-md w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
						/>
						<p className='font-medium text-gray-800 truncate'>{item.name}</p>
						<p className='text-gray-600'>{item.category}</p>
						<p className='text-gray-700 font-semibold'>
							{currency}
							{item.price}
						</p>
						<button
							onClick={() => removeProduct(item._id)}
							title='Elimina'
							className='text-red-500 hover:text-red-700 transition mx-auto'
						>
							<FaTrashAlt />
						</button>
					</div>
				))}
			</div>
		</section>
	)
}

export default List
