import React from 'react'
import { useEffect,useState } from 'react';


const Subtotal = ({item}) => {
        const [price, setPrice] = useState(0);
    
        useEffect(() => {
            totalAmount();
        }, [item]);
    
        const totalAmount = () => {
            let price = 0
            item.map((item) => {
                price += item.price.cost
            });
            setPrice(price)
        }
    
    return (
        <div className="sub_item"> 
            <h3>Subtotal ({item.length}):<span style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</span></h3>
        </div>
    )
}

export default Subtotal