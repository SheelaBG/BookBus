import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Signup.css';
import { Link } from "react-router-dom";

const Signup = () => {
    
    let[verified,setverified]=useState(false)
    let[pwd,setpwd]=useState(false)

    //declare use ref
    let navigate = useNavigate();
    let username=useRef();
    let email=useRef();
    let password=useRef();
    let confirmPwd=useRef();
    let mobileno=useRef();
    let dob=useRef();
    let signup=useRef();

    useEffect(()=>{
       if(localStorage.getItem("userdetails")!=null)
       {
        navigate("/home")
       }
    },[])

    let verfiyEmail=()=>{
       
        setTimeout(()=>{
            setverified(true)
            let btn=signup.current
            btn.style.backgroundColor="Red";
        },2000)
    
    }
   let handleSignup=(e)=>{
      //1  stop auto refresh
      
      
      e.preventDefault();
      //validate some values 
      if(password.current.value!=confirmPwd.current.value)
      {
        let pwd=password.current
        setpwd(pwd.style.border="red 2px solid");
        alert("password is incorrect")
        return 
      }
      if(new Date() < new Date (dob.current.value))//here dob gives string value so we cannot compare directly
                                               //so instead we can pass in constructor of date it will convert to object and then compare
         {
            alert("date is incorrect")
           return
         } 
        //  console.log("form submitted...");

        //2   create new object
        let newUser={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
            dob:dob.current.value,
            mobileno:mobileno.current.value,
        
        }
                //3 post obj to db collection
                fetch( "http://localhost:4000/users",
                {
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify(newUser)
                })
                .then(()=>{
                    alert("user signed successfully......")
                    navigate("/Login")
                })

   } 

    return ( 
    <div className="Signup-cout">
       <h3>Sign Up</h3>
       <div id="Signup-form">
       <form onSubmit={handleSignup}>
        <input type="text" placeholder="username" ref={username} required/> 
        <input type="email" placeholder="Email" ref={email} required/>
        <input type="password" placeholder="password" ref={password} required/>
        {pwd==true && <span id="pwd_span"> *  password is incorrect</span>}
        <input type="text" placeholder="Confirm password" ref={confirmPwd} required/>
        <input type="tel" placeholder="mobile no" max="10" min="10" ref={mobileno} required/>
        <input type="date"ref={dob} required/>
        <button type="submit" id="signup-btn" value="Signup" ref={signup} disabled ={verified ==false ? true :false} >Sign up</button>
        </form>
        <br></br>
        {/* use verify outside form bcoz once e click for verify form will be submittes but we dont need that action */}
        <button  id="verify-btn"onClick={verfiyEmail} >Verify</button>
        <span id="Signup-span">Already have an Account ?</span><Link id="signin" to="/Login">Sign in</Link>
        </div>
        </div>
      
     );

}
export default Signup;
