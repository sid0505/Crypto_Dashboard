import React,{ useState, useEffect } from 'react';
import { tabsList } from '../../config/tabs';
import SelectTab from '../SelectTab/SelectTab';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp'
import './Alert.css';
import { CryptoState } from '../../CryptoContext';

const Alert = () => {

  const{ alert, setAlert } = CryptoState();

  const showHideClassName = alert.open ? 'display-block' : 'display-none';
  // console.log(alert.open);

  const handleClose=()=>{
    setAlert({open:false});
  }

  useEffect(() => {
    setTimeout(() => {
      setAlert({open:false});
    }, 3000);
}, [alert.open]);

  return (
      <div className={showHideClassName}>
          <div id="myModal" className="alert-modal">
            <div className={`alert-modal-content ${alert.type === "success"? "success":"error"}`}>
                <div className="alert-modal-message">
                {alert.message}
                </div>
                <div className={`alert-close ${alert.type === "success"? "success":"error"}`} onClick={handleClose}>×</div>
            </div>
          </div>
        </div>
  )
}

export default Alert;