import React from 'react'
import './SelectButton.css'

const SelectButton = ({ children, selected, onClick }) => {
	return (
		<div className={`selectbutton ${selected ? "active" : "inactive"}`} onClick={onClick}>
			 {children}
		</div>
	)
}

export default SelectButton;