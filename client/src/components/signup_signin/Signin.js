import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signin_up.css"
import { Logincontext } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sign_in = () => {

    const { account, setAccount } = useContext(Logincontext);

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    // console.log(data);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
       
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
            // console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.warn("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
                setData({ ...logdata, email: "", password: "" })
            }
    
    };

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://i.pinimg.com/originals/af/5b/7f/af5b7fa2209bcc7a292823cb213f5e9d.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <button type="submit" className="signin_btn"  onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <NavLink to="/register"><button >Create your Amazon Account</button></NavLink>
                </div>
            </div>

        </section>
    )
}

export default Sign_in