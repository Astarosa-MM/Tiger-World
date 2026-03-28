 function Login(){
    return(
        <>
            <div>
                <h1>Login</h1>
                <p>Login to your account using a valid LSU email</p>
                <form>
                    <div>
                    <input 
                        type="text" 
                        name="email" 
                        id="email-input" 
                        placeholder="Email"
                    >
                    </input>
                    </div>

                    <div>
                    <input 
                        type="password" 
                        name="password" 
                        id="password-input" 
                        placeholder="Password"
                    > 
                    </input>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;