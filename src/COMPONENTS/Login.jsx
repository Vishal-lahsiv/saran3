// src/Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../Json/Db';
import './Login.css';
import { Context } from './GlobeData';

const Login = () => {
  const [uemail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const {LogIn} = useContext(Context);
  const [data,setData]=useState([]);

  useEffect(()=>{
    const fetch = async()=>{
      const res = await getData();
      setData(res.data);
    }
    fetch();
  },[]);
  

  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');
    let hasError = false;

    if (!uemail) {
      setEmailError('Email is required');
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    
    if (hasError) return;

    try {
      // const response = await getData();
      // const user = response.data.find((user) => user.email === email);
      // const uindex = response.data.findIndex((user) => user.email === email);
      const uindex = data.findIndex(item=>item.email === uemail);
      const emails = data.map(item => item.email);
      if (!emails.includes(uemail)) {
        setLoginError('Invalid email address');
      } else if (data[uindex].password !== password) {
        console.log(data[uindex].password);
        setLoginError('Incorrect password');
      } else {
        console.log(uindex);
        LogIn(data[uindex]);
        console.log('Login successful:', data[uindex]);
        alert('Login successful');
        navigate('/');
        // Redirect or perform further actions
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoginError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Image background is set in CSS */}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={uemail}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error email-error">{emailError}</p>}
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error password-error">{passwordError}</p>}
        </div>
        {loginError && <p className="error login-error">{loginError}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
