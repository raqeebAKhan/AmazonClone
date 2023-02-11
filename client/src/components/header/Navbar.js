import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Leftheader from './Leftheader'; 
import { Drawer } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { products } from '../home/productcontent';


function Navbar() {
    const { account, setAccount } = useContext(Logincontext);



    
    const [text, setText] = useState();
    // console.log(text)
    const [liopen, setLiopen] = useState(true);
    // only for search
    // const { products } = useSelector(state => state.getproductsdata);
    
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [dropen, setDropen] = useState(false)
    
    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("");
            setAccount(data);
        }
    }


   const handleopen = () => {
    setDropen(true);
    setLiopen(false)
}

const handledrclose = () => {
    setDropen(false)
}

const logoutuser = async () => {
    const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status !== 201) {
        console.log("error");
    } else {
        // console.log("");
        toast.success("user Logout 😃!", {
            position: "top-center"
        });
    history("/");
    setAccount(false);
   
}
}

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);


    console.log(account)
    return (
        <header>
            <nav>
                <div className='left'>
                <IconButton className="hamburgur" onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <Leftheader logclose={handledrclose} userlog={logoutuser}/>
                    </Drawer>
                    <div className='navlogo'>
                    <NavLink to="/">  <img src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg' alt='logo' /></NavLink>
                    </div>
                    <div className='nav_searchbar'>
                    <input type="text" name=""
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products" />
                        <div className='search_icon'>
                            <SearchIcon id="search" />
                        </div>
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }

                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>
                    {
                        account ? <NavLink to="/buynow">
                            <div className="cart_btn">
                                <Badge badgeContent={account.carts.length} color="secondary">
                                <ShoppingCartIcon id="icon"/>
                                </Badge>

                                <p>Cart</p>
                            </div>
                        </NavLink> : <NavLink to="/login">
                            <div className="cart_btn">
                                <Badge badgeContent={0} color="secondary">
                                  <ShoppingCartIcon id="icon"/>
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </NavLink>
                    }

{
                        account ?
                            <Avatar className="avtar2"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup = "true"
                            aria-expanded = {open ? 'true' : undefined}
                                onClick={handleClick} title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                onClick={handleClick} />
                    }

                    <div className="menu_div">
                        <Menu
                            id='basic-menu'
                            anchorEl = {anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps ={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {
                                account ?  <MenuItem onClick={handleClose} style={{ margin: 10 }}  onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem>: ""
                            }
                    
                        </Menu>
                    </div>
                    <ToastContainer/>
                </div>

            </nav>
        </header>


  )
}

export default Navbar
