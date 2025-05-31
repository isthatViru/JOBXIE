import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const nav=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
    const handleLogin = async (e) => {
    e.preventDefault();
  try {
    const usercred=await signInWithEmailAndPassword(auth,email,password);
    const {user}=usercred;
        console.log("✅ Login successful:", user);
  alert("Login Successfull✅")
  nav('/');
} catch (error) {
  console.error("❌ Login failed:", error.code, error.message);
  alert(`⚠️ ${error.code.replace("auth/", "").replaceAll("-", " ")}`);
}
  };
  return (
    <>
   
   <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <form onSubmit={handleLogin} className='p-4 shadow bg-white rounded'style={{width:'30rem'}}>
      <h3 className="mb-4 text-center text-warning">Login</h3>
      <div className="mb-3">
        <label htmlFor="email"className='form-label text-dark'>Email</label>
        <input type='email'id='email' className='form-control'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        />
      </div>
      <div className="mb-3">
         <label htmlFor="password" className='form-label text-dark'>Password</label>
        <input type="password" id='password' className='form-control'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        
        />
     
        
      </div>
         <button
          type="submit"
          className="btn btn-success"
        >
         Login
        </button>
    </form>
   </div>
   </>
  )
}

export default Login