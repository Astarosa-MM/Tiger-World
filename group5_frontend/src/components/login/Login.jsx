import React, { useState } from 'react'; 
import './Login.css';

 function Login(){

    const [text, setText] = useState('');
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [isPasswordViewable, setIsPasswordViewable] = useState(false);

    const handleLoginButtonClick = () => {
        setText("Email or Password is invalid");    
    }

    const handleViewPasswordClick = () => {
        const newIsPasswordViewable = !isPasswordViewable;

        setIsPasswordViewable(!isPasswordViewable);

        if(newIsPasswordViewable){
            setPasswordInputType("text");
        }
        else{
            setPasswordInputType("password");
        }
    }

    const handleLoginFailMessageChange = (event) => {
        setText(event.target.value);
    }

    const handleEmailInputChange = (event) => {
        let newIsEmailEmpty;

        if(event.target.value == ''){
            newIsEmailEmpty = true;
            setIsEmailEmpty(true);
        } else
        {
            newIsEmailEmpty = false;
            setIsEmailEmpty(false);
        }
        
        if(newIsEmailEmpty || isPasswordEmpty){
            setIsButtonDisabled(true);
        }
        else{
            setIsButtonDisabled(false);
        }
    }

        const handlePasswordInputChange = (event) => {
        let newIsPasswordEmpty;
        if(event.target.value == ''){
            newIsPasswordEmpty = true;
            setIsPasswordEmpty(true);
        } else
        {
            newIsPasswordEmpty = false;
            setIsPasswordEmpty(false);
        }
        if(newIsPasswordEmpty || isEmailEmpty){
            setIsButtonDisabled(true);
        }
        else{
            setIsButtonDisabled(false);
        }
    }


    return(

        <div className="screen-container">
            <div>
                <h1 className="login-header">Login</h1>
                <p className="login-explanation">Login to your account using a valid LSU email</p>
                <p className="login-fail-message" onChange={handleLoginFailMessageChange}>{text}</p>
                <form>
                    <div className="login-field-container">
                    <div>
                    <input 
                        className="input-field"
                        type="text" 
                        name="email" 
                        id="email-input" 
                        placeholder="Email"
                        onChange={handleEmailInputChange}
                    >
                    </input>
                    </div>

                    <div>
                    <input
                        className="input-field" 
                        type={passwordInputType} 
                        name="password" 
                        id="password-input" 
                        placeholder="Password"
                        onChange={handlePasswordInputChange}
                    > 
                    </input>
                    <button className="password-toggle" type="button" onClick={handleViewPasswordClick}> Toggle View Password</button>
                    </div>
                    <div>
                        <button className="login-button" onClick={handleLoginButtonClick} type="button" disabled={isButtonDisabled}>Login </button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;