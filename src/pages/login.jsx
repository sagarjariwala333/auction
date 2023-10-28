import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginReq } from '../redux/account/actions';
import { useNavigate } from 'react-router-dom';

function Login() {

    const dispatch=useDispatch();
    const navigate = useNavigate()

    const [state,setState]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("login", state)
        dispatch(loginReq(state, navigate))
    }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" 
                  name='email'
                  value={state.email}
                  onChange={handleChange}
                  className="form-control" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" 
                  name='password'
                  value={state.password}
                  onChange={handleChange}
                  className="form-control" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
