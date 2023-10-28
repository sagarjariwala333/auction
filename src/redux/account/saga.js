import { takeEvery, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST, SIGNUP_REQUEST, TEST } from "./types";
import { SignIn, SignUp } from "../../services/dbservice";
import { toast } from "react-toastify";

function* test(action) {
  console.log("saga test");
}

function* signup(action) {
  const { req, navigate } = action;

  const data = yield call(SignUp, req)

  if(data.data.message === "User already exists")
  {
    toast.error("User already exist")
  }
  else if(data.data.message === "User signed up successfully")
  {
    toast.success("Registered successfully")
    navigate("/login")
  }
  else
  {
    toast.error("Something went wrong")
  }
}

function* signin(action) {
  const { req, navigate } = action;

  const data = yield call(SignIn, req)

  if(data.data.message === "User logged in successfully")
  {
    toast.success("Loged In Successully")
    navigate('/user/')
    localStorage.setItem("token",data.data.token)
  }
  else if(data.data.message === "Incorrect password or email")
  {
    toast.error("Wrong Credentials")
  }
  else
  {
    toast.error("Something went wrong")
  }
}

function* logout(action) {
  const {navigate} = action
  navigate('/login')
  localStorage.removeItem("token")
}

function* accountSaga() {
  yield takeEvery(TEST, test);
  yield takeEvery(SIGNUP_REQUEST, signup);
  yield takeEvery(LOGIN_REQUEST, signin);
}

export default accountSaga;
