import React, { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { secuteaxiosobj } from "../http/axios";
import { API_END_POINT } from "../enviroment";
import {Link} from 'react-router-dom'

function MyItems() {

    const clientemail = localStorage.getItem("email")

    const socket = io.connect("http://localhost:3001")


    const [items, setItems] = useState([]);

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
                if(data.success)
                {
                    console.log("before",data.items)
                    const res = data.items.filter(x => x.status === true && x.owner === clientemail)
                    console.log(res) 
                    setItems(res)
                }
            } catch (error) {
                
                // Handle the error here or pass it to your error handling logic.
            }
        };
        fetchData();
    }, []);

    const handleSell=(id)=>{
        const token = localStorage.getItem("token")
        socket.emit("sell_item", {id, token})
    }

    useEffect(() => {
        socket.on("getall_item", (data) => {
            console.log("from server", data)

            if (data.success) {
                const res = data.items.filter(x => x.status === true && x.owner === clientemail) 
                setItems(res)
            }
        })
    }, [socket])

    return (
        <>
           <h1>My Items</h1>
           <Link to="/user/todo">Go to Todo</Link>

            <div className="row">
            {items.map(item => {
                return (
                    <div className="card col-md-4 m-4" style={{ width: '20rem' }}>
                        <img src={item.img} width="200px" height="200px" className="card-img-top" alt={item.name} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Owner: {item.owner}</p>
                            <p className="card-text">Current Bid: {item.price}</p>
                            <button className="btn btn-primary" onClick={()=>handleSell(item._id)}>Sell</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </>
    )
}

export default MyItems;