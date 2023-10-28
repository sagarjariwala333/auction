import { LOGIN_ERR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_REQUEST, TEST } from "./types"

export const test=()=>{
    console.log("action test")
    return {
        type:TEST
    }
}

export const signupReq=(req, navigate)=>{
    return {
        type: SIGNUP_REQUEST,
        req,
        navigate
    }
}

export const signupSuccess=(data)=>{
    return {
        type: SIGNUP_REQUEST,
        data
    }
}

export const signupErr=(error)=>{
    return {
        type: SIGNUP_REQUEST,
        error
    }
}

export const loginReq=(req,navigate)=>{
    return {
        type: LOGIN_REQUEST,
        req,
        navigate
    }
}

export const loginSuccess=(data)=>{
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export const loginErr=(error)=>{
    return {
        type: LOGIN_ERR,
        error
    }
}

export const logout=(navigate)=>{
    return {
        type: LOGOUT,
        navigate
    }
}