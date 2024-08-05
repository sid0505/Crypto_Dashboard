import React,{ useState } from 'react';
import Input from '../Input/Input';
import Alert from '../Alert/Alert';
import { auth } from '../../firebase';
import './SignUp.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from '../../CryptoContext';

const SignUp = ({ handleClose }) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmpassword] = useState("");

	const{ alert, setAlert } = CryptoState();


	const handleSubmit = async () => {
    if (password !== confirmpassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      console.log(result);
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

	return (
		<div className="signup-container">
			<div className="signup-items">
				<Input
    			id={3}
    			type="text"
    			val={email}
    			labelledAs="Email Address"
    			locked={false}
    			active={false}
    			setVal={(value)=>{setEmail(value)}}
  			/>
			</div>
			<div className="signup-items">
				<Input
    			id={4}
    			type="password"
    			val={password}
    			labelledAs="Password"
    			locked={false}
    			active={false}
    			setVal={(value)=>{setPassword(value)}}
  			/>
			</div>
			<div className="signup-items">
				<Input
    			id={5}
    			type="password"
    			val={confirmpassword}
    			labelledAs="Confirm Password"
    			locked={false}
    			active={false}
    			setVal={(value)=>{setConfirmpassword(value)}}
  			/>
			</div>
			<div className="signup-items">
				<button onClick={handleSubmit}>Sign Up</button>
			</div>
  		</div>
	)
}

export default SignUp