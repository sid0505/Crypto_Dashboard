import React from 'react';
import Carousel from '../Carousel/Carousel';
import './Banner.css'

const Banner = () => {	
	return (
		<div className="banner">
			<div className="banner-content">
				<p className="banner-desc">Get all the info regarding your favorite Crypto Currency</p>
			</div>
			<Carousel />
		</div>
	)
}

export default Banner;