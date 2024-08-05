import React from 'react';
import { CryptoState } from '../../CryptoContext';
import './Avatar.css';

const Avatar = ({toggleDrawer}) => {

	const { user } = CryptoState();
	let altText = "";

	if(user){
		if(!user.photURL){
			altText = user.email.charAt(0).toUpperCase();
		}
	}

	return (
		<div className="avatar" onClick={()=>toggleDrawer()}>
			{altText}
		</div>
	)
}

export default Avatar