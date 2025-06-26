import { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const About = () => {
	const [hoveredCard, setHoveredCard] = useState(null)

	const cards = [
		{
			icon: '🌱',
			title: 'Crescente',
			description:
				'Coltiviamo in condizioni ottimali per offrirti piante splendide e un assortimento completo in ogni stagione.',
		},
		{
			icon: '📦',
			title: 'Imballaggi',
			description:
				'Imballaggi studiati per proteggere al meglio ogni pianta e prodotto, dalla nostra serra a casa tua.',
		},
		{
			icon: '🚚',
			title: 'Trasporto',
			description:
				'Consegniamo i nostri prodotti con i nostri mezzi per fornirvi un servizio veloce e affidabile.',
		},
	]

	return (
		<div>
			<div className='text-2xl text-center pt-8 border-t'>
				<Title text1={'CHI'} text2={'SIAMO'} />
			</div>

			<div className='my-10 flex flex-col md:flex-row gap-16'>
				<img
					className='w-full md:max-w-[450px]'
					src={assets.about_img}
					alt=''
				/>
				<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
					<p>
						Siamo un’azienda appassionata della bellezza e dell’equilibrio degli
						ecosistemi acquatici. Specializzati nella vendita di piante per
						acquari e laghetti, offriamo una selezione accurata di specie sane e
						adatte a qualsiasi tipo di ambiente.
					</p>

					<b className='text-gray-800'> La nostra missione</b>
					<p>
						🌱 Qualità garantita <br /> Tutte le nostre piante sono coltivate e
						selezionate con cura per offrire vitalità e bellezza naturale al
						vostro habitat acquatico. <br /> <br />
						🤝 Supporto personalizzato <br />
						Il nostro team di esperti è sempre a vostra disposizione per
						aiutarvi a scegliere le piante ideali e fornirvi consigli pratici
						per la loro cura. <br /> <br /> 🌊 La nostra visione <br />
						Crediamo che ogni acquario o laghetto rappresenti un angolo di
						natura viva. Il nostro obiettivo è ispirarvi a creare spazi
						acquatici belli, sani e ricchi di vita.
					</p>
				</div>
			</div>

			<div className='max-w-[100%] px-6 md:px-20 lg:px-0 '>
				<div className='text-left text-2xl md:text-3xl font-semibold py-6 mb-10'>
					<Title text1='PERCHÉ' text2='SCEGLIERE NOI?' />
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{cards.map((card, i) => (
						<div
							key={i}
							onMouseEnter={() => setHoveredCard(i)}
							onMouseLeave={() => setHoveredCard(null)}
							className={`bg-white rounded-xl p-7 flex flex-col items-center gap-5 cursor-pointer
                transition-shadow duration-300
                ${
									hoveredCard === i
										? 'shadow-2xl shadow-gray-400'
										: 'shadow-md shadow-gray-200'
								}
              `}
							style={{ minHeight: '230px' }}
						>
							<span className='text-5xl'>{card.icon}</span>
							<b className='text-lg font-bold text-gray-900 text-center'>
								{card.title}
							</b>
							<p className='text-gray-600 text-center text-sm leading-relaxed'>
								{card.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default About
