import React,{ useState } from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import AuthModal from '../AuthModal/AuthModal';
import UserSidebar from '../UserSidebar/UserSidebar';
import Avatar from '../Avatar/Avatar';
import { CryptoState } from '../../CryptoContext';
import { signOut } from "@firebase/auth";
import { auth } from '../../firebase';
import './Header.css';

const Header = () => {
	
	const { user, setAlert } = CryptoState();
	const [show, setShow] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);

	const showModal = () => {
    	setShow(true);
  	};
 
	const hideModal = () => {
    	setShow(false);
  	};

  	const toggleDrawer = () => {
  		setShowDrawer(!showDrawer);
  	}

  	const logOut = () => {
    	signOut(auth);

    	setAlert({
        	open: true,
        	message: `Logout Successful`,
        	type: "success",
      	});

      	toggleDrawer();
  	};

	const navigate = useNavigate();

	return (
		<div className="app-bar">
			<div className="container">
				<div className="toolbar ">
					<p className="title" onClick={() => navigate (`/crypto-dashboard-v2/`)}>Crypto Dashboard</p>
				</div>
				<AuthModal show={show} handleClose={hideModal} />
				<UserSidebar showDrawer={showDrawer} toggleDrawer={toggleDrawer} logOut={logOut}/>
				{ user?
					<div className="avatar-container-header">
						<Avatar toggleDrawer={toggleDrawer} />
					</div>:
					<div className={`login ${show ? "active" : "inactive"}`} type="button" onClick={()=>showModal()}>
          				Login/SignUp
          			</div>
          		}	
   			</div>
		</div>
	)
}

export default Header