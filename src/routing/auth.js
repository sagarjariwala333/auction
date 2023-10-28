import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Signup from "../pages/signup";
import Login from "../pages/login";
import { useSelector } from "react-redux";
import PrivateRoute from "./user";
import Home from "../pages/home";
import Todo from "../pages/todos";
import MyItems from "../pages/myitems";


function AuthRouting() {

  const { account } = useSelector(state => {
    return {
      account: state.account
    }
})
  
  return (
    <Routes>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/user/" element={<Todo />}></Route>
      <Route exact path="/user/todo" element={<Todo />}></Route>
      <Route exact path="/user/myitems" element={<MyItems />}></Route>

      {/* {account.isAuthenticated ?
      <Route exact path="/user/" element={<Home />}></Route> : 
      <Route path="/user" element={<Navigate to="/login" />} />
      } */}
    </Routes>
  );
}

export default AuthRouting;
