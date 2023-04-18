import { useNavigate, Link, useLocation } from "react-router-dom";
import {  useEffect, useState } from "react";

const Login = () => {
const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const page = location.pathname === '/login' ? true:false;

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth){
            // navigate("/dashboard")
        }
    })
    const handleLogin= async ()=>{
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result =await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/dashboard")
        } else {
            alert("Please enter connect details")
        }
    }
  return(
    <div className="login">
      <div className="holder">
        <h1 className="text-white">Sign In</h1>
        <br/>
        <form >
          <input 
            className="login-input" 
            type='text' 
            placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
          <br/>
          <input 
            className="login-input"
            type='password' placeholder='Enter Password'  
        onChange={(e)=>setPassword(e.target.value)} value={password} />
       <br/>
          <Link className="btn-sign-in"  onClick={handleLogin} >
            Sign In
          </Link>
          
          {
            page && <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              Remember Me
            </label>
          </div>
          }
        </form>
        <br/>
        <br/>
        <div className="login-form-other">
          <div className="login-signup-now">
          New to Netflix?' &nbsp;
            <Link className="register-link" to= '/register' >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  )
}

export default Login;