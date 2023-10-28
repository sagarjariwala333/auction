import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupReq } from '../redux/account/actions';

function Signup() {

  const dispatch=useDispatch()

  const [state, setState] = useState({
    "email":"",
    "password":""
  });

  const handleChnage=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(signupReq(state))
    console.log("submitted...", state)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h3>Signup</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" 
                  value={state.email}
                  onChange={handleChnage}
                  className="form-control" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" 
                  value={state.password}
                  onChange={handleChnage}
                  className="form-control" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
