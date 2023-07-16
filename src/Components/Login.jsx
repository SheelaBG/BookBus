import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToasterUi from 'toaster-ui';

import '../Styles/Login.css';

const Login = () => {

    let email =  useRef();
    let password =  useRef();
    let navigate = useNavigate();
    const toaster = new ToasterUi();//declare toaster object 2

    let handleLogin = (e)=>{
        e.preventDefault();
        fetch("http://localhost:4000/users")
        .then((res)=>{return res.json()})
        .then((data)=>{
            let user = data.find((user)=>{ return user.email===email.current.value});//strings and object
            console.log(user);
            if(user==undefined)
            {
                alert("user not found");
            }
            else if(user.password !== password.current.value)
            {
                alert("invalid password");
            }
            else
            {
                toaster.addToast("login successfull...");//usage
                localStorage.setItem("userdetails" , JSON.stringify(user));
                navigate("/home");
            }
        })

    }

    return ( 
        <div className="Login-cout">
            <div className="Login-form">
                <h1>Login</h1>
                <hr />
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email id" ref={email} required/>
                    <input type="password" placeholder="Password" ref={password} required />
                    <button id="login-btn"  type="submit">Login</button>
                    <span> dont have an Account ? </span><br></br>
                    <button id="Create-Account"><Link  to="/">Create Account</Link></button>
                </form>
            </div>
        </div>
     );
}
 
export default Login;