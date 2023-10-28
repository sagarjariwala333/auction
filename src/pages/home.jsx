import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { test } from "../redux/account/actions";

function Home()
{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(test())
    },[])
    return(
        <>
        <h1>Home Page</h1>
        </>
    )
}

export default Home