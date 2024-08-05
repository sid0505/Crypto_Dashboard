import React,{ useState } from 'react';
import { tabsList } from '../../config/tabs';
import SelectTab from '../SelectTab/SelectTab';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { CryptoState } from '../../CryptoContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from '../../firebase';
import './AuthModal.css';

const AuthModal = ({ handleClose, show  }) => {

  const {setAlert} = CryptoState();

  const [selectedTab, setSelectedTab] = useState(0);

  const showHideClassName = show ? 'display-block' : 'display-none';

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () =>{
    signInWithPopup(auth, googleProvider).then(result =>{

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    }).catch(error =>{

      setAlert({
        open: true,
        message: `${error.message}`,
        type: "error",
      });

    })
  }

  return (
      <div className={showHideClassName}>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="tab-list">
                {tabsList.map(tab=>(
                  <SelectTab
                    key={tab.value}
                    onClick={() => setSelectedTab(tab.value)}
                    selected={tab.value === selectedTab}>
                    {tab.label}
                  </SelectTab>
                ))}
                <div className="close" onClick={handleClose}>×</div>
              </div>
            </div>
            <div className="modal-body">
              {selectedTab===0&& <Login handleClose={handleClose} />}
              {selectedTab===1&& <SignUp handleClose={handleClose} />}
              <div className="google">
                <span className="spanning">OR</span>
                <GoogleButton
                  style={{width: "100%", outline: "none"}}
                  onClick={signInWithGoogle}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default AuthModal;