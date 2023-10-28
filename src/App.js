import "./App.css";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Home from "./pages/home";
import AuthRouting from "./routing/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AuthRouting />
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
