import React, { useContext, useEffect, useState } from 'react'
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import "./cart.css";
import CircularProgress from '@mui/material/CircularProgress';
import { Logincontext } from '../context/Context';


const Cart = () => {
        const {id} = useParams("");
        // console.log(id);

        const history = useNavigate("")

        const {account, setAccount} = useContext(Logincontext)

        const [indata, setIndata] = useState("");

        const getindata = async () => {
            const res = await fetch(`/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
    
            });
    
            const data = await res.json();
            // console.log(data);
    
            if (res.status !== 201) {
                alert("no data available")
            } else {
                // console.log("get data");
                setIndata(data);
            }
        };
    
        useEffect(() => {
            setTimeout(getindata, 1000)
        }, [id]);
    
    
        // Add to cart

        const addtocart = async (id) => {
            console.log(id);
            const check = await fetch(`/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    indata
                }),
                credentials: "include"
            });
            // console.log(check);
            const data1 = await check.json();
            // console.log(data1 +  'ok');
    
                    if (check.status === 401 || !data1) {
                alert("no data available")
            } else {
                // alert ("data added in your cart")
                history("/buynow")
                setAccount(data1)
            }
        }
    

    return (

        <div className="cart_section">
             {indata && Object.keys(indata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={indata.detailUrl} alt="cart" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(indata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3>{indata.title.shortTitle}</h3>
                        <h4>{indata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{indata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{indata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{indata.price.mrp - indata.price.cost} ({indata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{indata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{indata.description}</span></p>
                </div>
            </div>
}

{!indata ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div>
    )
}

export default Cart