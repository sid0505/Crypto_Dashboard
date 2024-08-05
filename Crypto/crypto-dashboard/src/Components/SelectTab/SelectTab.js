import React from 'react'
import './SelectTab.css'

const SelectTab = ({ children, selected, onClick }) => {
	return (
		<div className={`tab-list-item ${selected ? "active" : "inactive"}`} onClick={onClick}>
			 {children}
		</div>
	)
}

export default SelectTab;