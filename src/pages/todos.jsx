import React, { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { secuteaxiosobj } from "../http/axios";
import { API_END_POINT } from "../enviroment";
import {Link} from 'react-router-dom'

function Todo() {

    const clientemail = localStorage.getItem("email")

    const socket = io.connect("http://localhost:3001")

    const [items, setItems] = useState([]);

    const [bid, setBid] = useState("")

    const [state, setState] = useState({
        name: "",
        price: "",
        img: "",
        email: clientemail
    });

    const getAllItemsAsync = async () => {
        try {
            const response = await secuteaxiosobj.get(API_END_POINT + 'user/getAll');
            return response.data;
        } catch (error) {
            console.error('API error:', error);
            throw error; // Re-throw the error to handle it elsewhere if needed.
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllItemsAsync();
                if (data.success) {
                    const res = data.items.filter(x => x.status === true)
                    setItems(res)
                }
            } catch (error) {

                // Handle the error here or pass it to your error handling logic.
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {

        setState({
            ...state,
            img: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await convertToBase64(state.img)
        const obj = {
            ...state,
            img: res,
            email:clientemail,
            filename: state.img.name,
            filetype: state.img.type,
            token: localStorage.getItem("token")
        }

        socket.emit("item_insert", obj)

        // console.log("submitted", obj)
    }

    const convertToBase64 = (img) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(img);
        });
    }

    const doBid = (id) => {
        const token = localStorage.getItem("token")
        socket.emit("update_price", { price: bid, id, token })
        console.log("submit", bid)
    }

    useEffect(() => {
        socket.on("getall_item", (data) => {
            console.log("from server", data)

            if (data.success) {
                const res = data.items.filter(x => x.status === true)
                setItems(res)
            }
        })
    }, [socket])

    return (
        <>
            <h1>Todo</h1>
            <Link to="/user/myitems">Go to My Items</Link>

            {/* <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Intem Name" name="name" value={state.name} onChange={handleChange} />
                <input type="text" placeholder="Price" name="price" value={state.price} onChange={handleChange} />
                <input type="file" name="img" onChange={handleFileChange} />
                <button className="btn btn-primary" type="submit">Send Message</button>
            </form> */}

            <div className="card col-md-4" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Title</h5>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control mr-3 mt-3 mb-3" placeholder="Item Name" name="name" value={state.name} onChange={handleChange} />
                        <input type="text" className="form-control mr-3 mt-3 mb-3" placeholder="Price" name="price" value={state.price} onChange={handleChange} />
                        <input type="file" className="form-control mr-3 mt-3 mb-3" name="img" onChange={handleFileChange} />
                        <button className="btn btn-primary" type="submit">Put On Sell</button>
                    </form>
                </div>
            </div>


            <br />
            <br />


            <div className="row">
                {items.map(item => {
                    return (

                        <div className="card col-md-4 m-4" style={{ width: '20rem' }}>
                            <img src={item.img} width="200px" height="200px" className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Owner: {item.owner}</p>
                                <p className="card-text">Current Bid: {item.price}</p>
                                <p className="card-text">
                                    <input name="bid" onChange={(e) => { setBid(e.target.value) }}
                                        placeholder="Bid Amount" />
                                </p>
                                <p className="card-text">
                                    {bid ?
                                        <button className="btn btn-primary" onClick={() => doBid(item._id)}>Bid</button> :
                                        <button className="btn btn-primary" disabled>Bid</button>}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Todo;