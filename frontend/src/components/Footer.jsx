import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { assets } from '../assets/assets.js'

const Footer = () => {
	// Array de rețele sociale pentru a simplifica codul
	const socialLinks = [
		{
			href: '/',
			icon: <FaInstagram size={20} />,
		},
		{
			href: 'https://www.facebook.com/profile.php?id=61560695639243&locale=it_IT',
			icon: <FaFacebook size={20} />,
		},
		{ href: '/', icon: <FaTiktok size={20} /> },
	]

	return (
		<footer>
			<div className='container mx-auto flex flex-col sm:flex-row items-center justify-between'>
				{/* Logo-ul */}
				<img
					src={assets.logo}
					alt='Memories Logo'
					className='h-12 mb-4 sm:mb-0'
				/>

				{/* Text de copyright */}
				<div className='text-center text-xs sm:text-sm'>
					<p>COPYRIGHT © 2024</p>
					<p>
						<b>VIDA - S PLANTE </b>
					</p>
					<p>ALL RIGHTS ARE RESERVED</p>
				</div>

				{/* Linkuri către rețelele sociale */}
				<div className='flex space-x-4 mt-4 sm:mt-0'>
					{socialLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							className='text-black hover:text-gray-400'
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	)
}

export default Footer
