import React from 'react';
import Avatar from '../Avatar/Avatar';
import { CryptoState } from '../../CryptoContext';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import './UserSidebar.css';

const UserSidebar = ({ showDrawer, logOut, toggleDrawer }) => {

	const { user, watchlist, coins, setAlert } = CryptoState();

  const removeFromWatchlist = async(coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try{
      await setDoc(
        coinRef,{
        coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        {merge: "merge"}
      );

      setAlert({
            open: true,
            message: `${coin.name} Removed from the Watchlist`,
            type: "success",
          });

    } catch(error){

      setAlert({
            open: true,
            message: error.message,
            type: "error",
          });

    }
  }

	let altText = "";

	if(user){
		if(!user.photURL){
			altText = user.displayName || user.email;
		}
	}

  	const drawerClasses = showDrawer ? 'side-drawer open' : 'side-drawer';

  	return (
  				<div className={drawerClasses}>
  		  	  		<div className="drawer-container">
  		  	  			<div className="profile-container">
  		  	  				<div className="avatar-container-drawer">
  	  		  	  				<Avatar toggleDrawer={toggleDrawer} />
  	  		  	  			</div>
  		  	  				<span className="profile-info">
  		  	  					{altText}
  		  	  				</span>
  		  	  				<div className="watchlist">
  		  	  					<span className="watchlist-title">
  		  	  						Watchlist
  		  	  					</span>
                      {
                        coins.map(coin =>{
                          if(watchlist.includes(coin.id))
                            return(
                              <div className="watchlist-content">
                                <span>{coin.name}</span>
                                <span style = {{display: "flex", gap: "16px"}}>
                                  {coin.current_price?.toLocaleString('en-IN', {style:'currency', currency:'INR'})}
                                  <AiFillDelete
                                    style={{cursor: "pointer", background:"none"}}
                                    fontSize="16"
                                    onClick={()=>removeFromWatchlist(coin)}
                                  />
                                </span>
                              </div>
                          )
                        })
                      }
  		  	  				</div>
  		  	  			</div>
  		  	  			<div className={`logout`} type="button" onClick={()=>logOut()}>
  		      				Logout
  		       			</div>
  		  	  		</div>
  	   	  		</div>
  	);
}

export default UserSidebar;