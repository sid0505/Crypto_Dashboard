import React,{ useState } from 'react';
import Input from '../Input/Input';
import './Login.css';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from '../../CryptoContext';

const Login = ({ handleClose }) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const{ alert, setAlert } = CryptoState();

	const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
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
}

	return (
		<div className="login-container">
			<div className="login-items">
				<Input
    			id={1}
    			type="text"
    			val={email}
    			labelledAs="Email Address"
    			locked={false}
    			active={false}
    			setVal={(value)=>{setEmail(value)}}
  			/>
			</div>
			<div className="login-items">
				<Input
    			id={2}
    			type="password"
    			val={password}
    			labelledAs="Password"
    			locked={false}
    			active={false}
    			setVal={(value)=>{setPassword(value)}}
  			/>
			</div>
			<div className="login-items">
				<button onClick={handleSubmit}>Login</button>
			</div>
  		</div>
	)
}

export default Login;