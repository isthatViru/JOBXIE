import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // ✅ Use your exported instances


const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [phone, setPhone] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return;
  }

  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Save extra details in Firestore
    const userData = {
      uid: user.uid,
      name,
      email,
      phone,
      role,
    };

    await addDoc(collection(db, "users"), userData);

    alert("✅ User registered successfully!");

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setPassword("");
    setConfirmPassword("");

  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    alert("⚠️ Registration failed: " + error.message);
  }
};

  return (
    <>
    <style>
      {
        
          `.text-dark-blue{
                    color: #1e3a8a;
}`
        
      }
    </style>
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light mt-5 " style={{marginLeft:'25rem'}}>
      <div className="col-lg-6 col-md-8 col-sm-10 bg-white p-5 rounded shadow " style={{  width: '50rem' }}>
        <h2 className="mb-4 text-center fw-bold text-primary">Create an Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-primary">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-primary">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
            onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
     <div className="mb-3">
            <label htmlFor="phone" className="form-label text-primary">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
            onChange={(e)=>setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label text-primary">Role</label>
            <select
              className="form-select"
              id="role"
              value={role}
             onChange={(e)=>setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select Your Role</option>
              <option value="Student">Student</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-primary">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
                 onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label text-primary">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-danger">
          <small>
            Already have an account? <NavLink to="/Login" className="text-decoration-none text-primary">Login</NavLink>
          </small>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
